import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {validatePositions,deal,isFree} from '../core.mjs';
const root=new URL('../',import.meta.url),hash=b=>createHash('sha256').update(b).digest('hex');
const files=['app.mjs','core.mjs','faces.mjs','storage.mjs','style.css','favicon.svg','content/levels.html'];
const source=await fs.readFile(new URL('content/levels.html',root),'utf8');
const articles=[...source.matchAll(/<article id="([^"]+)"[^>]*>([\s\S]*?)<\/article>/g)];
if(articles.length!==60)throw Error('Release requires exactly 60 campaign levels.');
const signatures=new Set();for(const [i,a]of articles.entries()){
 if(a[1]!==`mg-level-${String(i+1).padStart(3,'0')}`)throw Error('Invalid permanent level identity');
 if(!a[0].includes(`data-number="${i+1}"`)||!a[0].includes('data-revision="1"')||!a[0].includes(`data-chapter="${Math.floor(i/10)+1}"`))throw Error('Invalid content metadata');
 const positions=[...a[2].matchAll(/<li data-tile="([^"]+)" data-x="(\d+)" data-y="(\d+)" data-z="(\d+)"/g)].map(m=>({id:m[1],x:+m[2],y:+m[3],z:+m[4]}));validatePositions(positions);
 const signature=positions.map(p=>p.id).sort().join('|');if(signatures.has(signature))throw Error('Duplicate campaign geometry');signatures.add(signature);
 const d=deal(positions,12345);let remaining=d.tiles;for(const [a,b]of d.solution){const ta=remaining.find(t=>t.id===a),tb=remaining.find(t=>t.id===b);if(!ta||!tb||ta.face!==tb.face||!isFree(ta,remaining)||!isFree(tb,remaining))throw Error('Solution validation failed');remaining=remaining.filter(t=>t.id!==a&&t.id!==b);}if(remaining.length)throw Error('Incomplete solution');
}
const bytes=await Promise.all(files.map(f=>fs.readFile(new URL(f,root))));const index=await fs.readFile(new URL('index.html',root),'utf8');const id='mg-'+hash(Buffer.concat([...bytes,Buffer.from(index)])).slice(0,14);
const output=new URL('dist/',root);await fs.mkdir(new URL(`releases/${id}/content/`,output),{recursive:true});const manifest=[];
for(let i=0;i<files.length;i++){const name=`releases/${id}/${files[i]}`;await fs.writeFile(new URL(name,output),bytes[i]);manifest.push({path:name,sha256:hash(bytes[i]),bytes:bytes[i].length});}
const published=index.replace('content="development"',`content="${id}"`).replaceAll('./style.css',`./releases/${id}/style.css`).replaceAll('./app.mjs',`./releases/${id}/app.mjs`).replaceAll('./favicon.svg',`./releases/${id}/favicon.svg`);await fs.writeFile(new URL('index.html',output),published);manifest.push({path:'index.html',sha256:hash(published),bytes:Buffer.byteLength(published)});
const release={id,version:'1.0.0',rules:'mg-rules-1',contentRevision:1,levels:60,files:manifest};await fs.writeFile(new URL('release.json',output),JSON.stringify(release,null,2));console.log(JSON.stringify({release:id,levels:60,files:manifest.length,initialBytes:manifest.reduce((n,f)=>n+f.bytes,0)}));
