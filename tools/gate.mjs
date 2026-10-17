import fs from 'node:fs/promises';import path from 'node:path';import {fileURLToPath} from 'node:url';import {DOMParser} from 'linkedom';
import {RUNTIME,ASSETS,hash,sourceIdentity,pngSize} from './contracts.mjs';import {parseCampaign} from '../core.mjs';
export const REQUIRED_BROWSER=['responsive layout matrix','atomic storage conflict, failure and next action','studio editing, personal image conversion and failed import preservation','studio failed save stays recoverable, retry then close','ordinary controls through match, undo, shuffle, win, retry and reload','game backup export/import round-trip','delayed saves, stale restores, cancellation and image undo','text enlargement, safe insets, long labels and focus','loading, image and audio failure recovery','version-one checkpoint compatibility'];
const rootDefault=fileURLToPath(new URL('../',import.meta.url));
export async function verifyGate({root=rootDefault,output=path.join(root,'dist'),receiptDirectory=path.join(root,'audit/current')}={}){
 const release=JSON.parse(await fs.readFile(path.join(output,'release.json'),'utf8'));
 if(!/^mg-[a-f0-9]{14}$/.test(release.id)||release.rules!=='mg-rules-1'||release.contentRevision!==1||release.saveVersion!==1||release.levels!==60)throw Error('Unsupported release manifest');
 const identity=await sourceIdentity(root);if(identity.digest!==release.sourceDigest||release.id!=='mg-'+identity.digest.slice(0,14))throw Error('Source changed after the candidate was built');
 const expected=['index.html',...[...RUNTIME,...ASSETS.map(a=>a.path)].map(p=>`releases/${release.id}/${p}`)].sort();
 if(!Array.isArray(release.files)||JSON.stringify(release.files.map(f=>f.path).sort())!==JSON.stringify(expected))throw Error('Required asset inventory mismatch');
 for(const file of release.files){if(file.path.includes('..')||path.isAbsolute(file.path))throw Error('Invalid artifact path');const bytes=await fs.readFile(path.join(output,file.path));if(bytes.length!==file.bytes||hash(bytes)!==file.sha256)throw Error('Artifact changed: '+file.path);}
 const initial=release.files.filter(f=>f.initial).reduce((n,f)=>n+f.bytes,0);if(initial>400000||initial!==release.initialBytes)throw Error('Initial gameplay budget mismatch');
 for(const asset of ASSETS){const size=pngSize(await fs.readFile(path.join(output,`releases/${release.id}/${asset.path}`)));if(size.width!==asset.width||size.height!==asset.height)throw Error('Wrong public image dimensions');}
 const html=await fs.readFile(path.join(output,'index.html'),'utf8'),doc=new DOMParser().parseFromString(html,'text/html');if(doc.querySelector('meta[name="mg-release"]')?.getAttribute('content')!==release.id||!doc.querySelector(`script[src="./releases/${release.id}/boot.mjs"]`))throw Error('Entry does not pin the required graph');
 parseCampaign(new DOMParser().parseFromString(await fs.readFile(path.join(output,`releases/${release.id}/content/levels.html`),'utf8'),'text/html'));
 const node=JSON.parse(await fs.readFile(path.join(receiptDirectory,'node.json'),'utf8')),browser=JSON.parse(await fs.readFile(path.join(receiptDirectory,'browser.json'),'utf8')),native=JSON.parse(await fs.readFile(path.join(receiptDirectory,'native.json'),'utf8'));
 for(const receipt of [node,browser,native])if(receipt.candidate!==release.id||receipt.sourceDigest!==release.sourceDigest||!receipt.utc)throw Error('Receipt does not match this exact candidate');
 if(node.exitCode!==0||!Number.isInteger(node.tests)||node.tests<15||node.node!==release.node)throw Error('Unit verification is incomplete');
 if(!Array.isArray(browser.results)||REQUIRED_BROWSER.some(name=>!browser.results.some(r=>r.name===name&&r.status==='passed'))||browser.results.some(r=>r.status!=='passed'||r.candidate!==release.id))throw Error('Browser verification is incomplete');
 for(const key of ['keyboardClear','textFocus','editorFocus','modalReturn','mismatchRefused'])if(native.checks?.[key]!==true)throw Error('Native input evidence missing: '+key);
 return{passed:true,candidate:release.id,sourceDigest:release.sourceDigest,files:release.files.length,initialBytes:initial,nodeTests:node.tests,browserGroups:REQUIRED_BROWSER.length,release};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){try{const result=await verifyGate();console.log(JSON.stringify({...result,release:undefined}));}catch(error){console.error('Release refused: '+error.message);process.exitCode=1;}}
