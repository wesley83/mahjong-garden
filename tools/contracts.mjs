import fs from 'node:fs/promises';import path from 'node:path';import {createHash} from 'node:crypto';
export const ORIGIN='https://grab-lead-8328.onpagelove.com';
export const RUNTIME=['boot.mjs','app.mjs','core.mjs','profile.mjs','operations.mjs','image-input.mjs','tile-input.mjs','faces.mjs','storage.mjs','scenery.mjs','style.css','game.css','favicon.svg','content/levels.html'];
export const ASSETS=[{role:'link-preview',path:'assets/social-card.png',source:'assets/social-card.svg',width:1200,height:630,initial:false},{role:'touch-icon',path:'assets/apple-touch-icon.png',source:'favicon.svg',width:180,height:180,initial:false}];
export const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
export async function sourceIdentity(root){
 const paths=[];
 for(const dir of ['','tools','tests','assets','content'])for(const entry of await fs.readdir(path.join(root,dir),{withFileTypes:true})){if(!entry.isFile())continue;const name=path.posix.join(dir,entry.name);if(/\.(mjs|html|css|svg|png)$/.test(name)||['package.json','pnpm-lock.yaml','.node-version'].includes(name))paths.push(name);}
 paths.sort();const files=[];for(const name of paths)files.push({path:name,sha256:hash(await fs.readFile(path.join(root,name)))});
 return{digest:hash(JSON.stringify(files)),files};
}
export function pngSize(bytes){if(bytes.length<24||bytes.subarray(0,8).toString('hex')!=='89504e470d0a1a0a'||bytes.subarray(12,16).toString()!=='IHDR')throw Error('Invalid PNG export');return{width:bytes.readUInt32BE(16),height:bytes.readUInt32BE(20)};}
