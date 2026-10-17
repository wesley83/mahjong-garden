import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const dav='https://dav-grab-lead-8328.onpagelove.com';
const origin='https://grab-lead-8328.onpagelove.com';
const hash=b=>createHash('sha256').update(b).digest('hex');
let key='',backupPath='',inventory=[];
const decode=s=>s.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&apos;/g,"'");
async function req(name,options={},publicRead=false){
 if(!name.startsWith('/')||name.includes('..')||name.includes('?')||name.includes('#'))throw Error('Unsafe remote path');
 const r=await fetch((publicRead?origin:dav)+name,{...options,headers:{...(!publicRead?{Authorization:'Bearer '+key}:{}),...options.headers},redirect:'manual',cache:'no-store',signal:AbortSignal.timeout(30000)});
 if(r.status>=300&&r.status<400)throw Error('Redirect refused');
 return{status:r.status,etag:r.headers.get('etag'),type:r.headers.get('content-type'),bytes:Buffer.from(await r.arrayBuffer())};
}
async function list(dir){
 const r=await req(dir,{method:'PROPFIND',headers:{Depth:'1','Content-Type':'application/xml'},body:'<?xml version="1.0"?><d:propfind xmlns:d="DAV:"><d:prop><d:resourcetype/><d:getetag/><d:getcontentlength/></d:prop></d:propfind>'});
 if(r.status!==207)throw Error('List failed '+r.status);
 const entries=[];
 for(const m of r.bytes.toString().matchAll(/<(?:\w+:)?response\b[^>]*>([\s\S]*?)<\/(?:\w+:)?response>/gi)){
  const text=m[1],href=text.match(/<(?:\w+:)?href[^>]*>([\s\S]*?)<\/(?:\w+:)?href>/i)?.[1];if(!href)throw Error('Invalid DAV response');
  const url=new URL(decode(href),dav);if(url.origin!==dav)throw Error('DAV returned another host');
  const name=url.pathname;if(name===dir||name.replace(/\/$/,'')===dir.replace(/\/$/,''))continue;
  if(!name.startsWith(dir)||decodeURIComponent(name).includes('..'))throw Error('Out-of-scope DAV path');
  entries.push({path:name,directory:/<(?:\w+:)?collection\b/i.test(text)});
 }
 if(!r.bytes.toString().includes('response'))throw Error('Unrecognized DAV listing');
 return entries;
}
async function walk(dir='/'){
 const out=[];for(const e of await list(dir)){out.push(e);if(e.directory)out.push(...await walk(e.path.endsWith('/')?e.path:e.path+'/'));if(out.length>10000)throw Error('Backup inventory limit');}return out;
}
export async function backup(secret){
 if(typeof secret!=='string'||!secret.startsWith('pk_'))throw Error('Missing owner credential');key=secret;
 inventory=await walk();backupPath=path.join(root,'.local','server-backup',new Date().toISOString().replace(/[:.]/g,'-'));await fs.mkdir(backupPath,{recursive:true});
 let total=0;for(const e of inventory.filter(x=>!x.directory)){
  const r=await req(e.path);if(r.status!==200)throw Error('Backup read failed '+e.path+' '+r.status);
  total+=r.bytes.length;if(total>500*1024*1024)throw Error('Backup exceeds bounded 500 MB operation');
  const local=path.resolve(backupPath,'.'+decodeURIComponent(e.path));if(!local.startsWith(backupPath+path.sep))throw Error('Unsafe backup path');
  await fs.mkdir(path.dirname(local),{recursive:true});await fs.writeFile(local,r.bytes);
  e.hash=hash(r.bytes);e.bytes=r.bytes.length;e.etag=r.etag;
  if(hash(await fs.readFile(local))!==e.hash)throw Error('Local backup verification failed');
 }
 await fs.writeFile(path.join(backupPath,'manifest.json'),JSON.stringify({utc:new Date().toISOString(),dav,origin,entries:inventory,verified:true},null,2));
 return{backedUp:true,files:inventory.filter(e=>!e.directory).length,directories:inventory.filter(e=>e.directory).length,bytes:total,backupPath};
}
export async function wipe(){
 if(!backupPath)throw Error('Verified backup required');
 const now=await walk();const names=x=>x.map(e=>e.path).sort().join('\n');if(names(now)!==names(inventory))throw Error('Remote inventory changed since backup');
 for(const e of inventory.filter(e=>!e.directory)){const r=await req(e.path);if(r.status!==200||hash(r.bytes)!==e.hash||r.etag!==e.etag)throw Error('Remote content changed since backup: '+e.path);}
 const deleted=[];
 for(const e of [...inventory].sort((a,b)=>b.path.length-a.path.length)){
  if(e.directory&&(await list(e.path.endsWith('/')?e.path:e.path+'/')).length)throw Error('Concurrent new content appeared in '+e.path);
  const r=await req(e.path,{method:'DELETE',headers:e.etag?{'If-Match':e.etag}:{}});
  if(![200,204,404].includes(r.status))throw Error('Delete failed '+e.path+' '+r.status);deleted.push({path:e.path,status:r.status});
 }
 const remaining=await walk();if(remaining.length)throw Error('Wipe did not empty the host');
 await fs.writeFile(path.join(root,'audit/wipe.json'),JSON.stringify({utc:new Date().toISOString(),dav,backupVerified:true,backupLocation:'Ignored .local/server-backup',deleted,remaining:0},null,2));
 return{wiped:true,deleted:deleted.length};
}
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.json':'application/json'};
async function upload(name,bytes){
 const before=await req(name);if(![200,404].includes(before.status))throw Error('Pre-write read failed');
 const r=await req(name,{method:'PUT',headers:{'Content-Type':types[path.extname(name)]||'application/octet-stream',...(before.status===200?{'If-Match':before.etag}:{'If-None-Match':'*'})},body:bytes});
 if(![200,201,204].includes(r.status))throw Error('Upload failed '+name+' '+r.status);
 const after=await req(name);if(after.status!==200)throw Error('Authoring readback failed');
 // Pagelove serializes HTML; compare critical source identity and references separately below.
 if(!name.endsWith('.html')&&!after.bytes.equals(bytes))throw Error('Readback byte mismatch '+name);
 return{path:name,status:r.status,sourceSha256:hash(bytes),authoringSha256:hash(after.bytes)};
}
export async function deploy(){
 if(!key||!backupPath)throw Error('Authenticate and back up first');
 const release=JSON.parse(await fs.readFile(path.join(root,'dist/release.json'),'utf8'));
 const dir='/releases/'+release.id+'/';for(const d of ['/releases/',dir,dir+'content/']){const r=await req(d,{method:'MKCOL'});if(![201,405].includes(r.status))throw Error('Collection creation failed');}
 const written=[];for(const f of release.files.filter(f=>f.path!=='index.html')){const bytes=await fs.readFile(path.join(root,'dist',f.path));if(hash(bytes)!==f.sha256)throw Error('Candidate hash changed');written.push(await upload('/'+f.path,bytes));}
 for(const f of release.files.filter(f=>f.path!=='index.html')){const r=await req('/'+f.path,{},true);const bytes=await fs.readFile(path.join(root,'dist',f.path));if(r.status!==200||(!f.path.endsWith('.html')&&!r.bytes.equals(bytes)))throw Error('Public dependency mismatch '+f.path);if(f.path.endsWith('.html')&&!r.bytes.toString().includes('mg-level-060'))throw Error('Public content incomplete');}
 const index=await fs.readFile(path.join(root,'dist/index.html'));written.push(await upload('/index.html',index));
 const live=await req('/',{},true);if(live.status!==200||!live.bytes.toString().includes(release.id)||!live.bytes.toString().includes('Mahjong Garden'))throw Error('Public release identity mismatch');
 const receipt={utc:new Date().toISOString(),origin,dav,release:release.id,verifiedPublicFiles:release.files.length,publication:'Dependencies staged and publicly verified before entry promotion',sourceEntrySha256:hash(index),servedEntrySha256:hash(live.bytes),htmlSerializationObserved:!index.equals(live.bytes),written,credentialStored:false};
 await fs.writeFile(path.join(root,'audit/deployment.json'),JSON.stringify(receipt,null,2));return{deployed:true,origin,release:release.id,verifiedPublicFiles:release.files.length};
}
