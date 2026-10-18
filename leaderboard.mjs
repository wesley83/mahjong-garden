import {openStore,readProfile} from './storage.mjs';
import {stars,validateRun} from './core.mjs';

export const ENDPOINT='/mahjong-scores.html',TYPE='https://grab-lead-8328.onpagelove.com/MahjongResultV1';
const keys=['runKey','player','level','stars','seconds','rules'],MAX_BYTES=2000000;
export function playerName(value){const name=String(value).trim();if(!/^[A-Za-z0-9 ._'\-]{1,24}$/.test(name)||!/[A-Za-z0-9]/.test(name))throw Error('Use 1–24 letters A–Z, numbers, spaces, period, apostrophe, dash or underscore.');return name;}
export function validateScore(row){
 if(!row||typeof row!=='object'||Array.isArray(row)||Object.keys(row).length!==keys.length||keys.some(k=>!Object.hasOwn(row,k)))throw Error('Invalid score fields.');
 if(!/^[a-f0-9]{64}$/.test(row.runKey)||typeof row.player!=='string'||playerName(row.player)!==row.player||!Number.isInteger(row.level)||row.level<1||row.level>60||!Number.isInteger(row.stars)||row.stars<1||row.stars>3||!Number.isInteger(row.seconds)||row.seconds<1||row.seconds>31536000||row.rules!=='mg-rules-1-content-1')throw Error('Unsupported score.');return structuredClone(row);
}
export const sameScore=(a,b)=>keys.every(k=>a[k]===b[k]);
export function scoreHTML(row){validateScore(row);return `<li itemscope itemtype="${TYPE}">`+keys.map(k=>`<meta itemprop="${k}" content="${row[k]}">`).join('')+'</li>';}
export function parseScores(text,document){
 if(new TextEncoder().encode(text).length>MAX_BYTES)throw Error('This leaderboard is too large to load safely.');
 const inert=document.createElement('template');inert.innerHTML=text;const list=inert.content.querySelector('#scores');if(!list||list.localName!=='ul'||inert.content.querySelectorAll('#scores').length!==1||list.children.length>5000)throw Error('Leaderboard data is unavailable or too large.');
 const seen=new Set();return [...list.children].map(li=>{if(li.localName!=='li'||li.getAttribute('itemtype')!==TYPE||li.children.length!==keys.length)throw Error('Invalid leaderboard entry.');const row={};for(const meta of li.children){const key=meta.getAttribute('itemprop');if(meta.localName!=='meta'||!keys.includes(key)||Object.hasOwn(row,key))throw Error('Invalid leaderboard fields.');row[key]=meta.getAttribute('content');}for(const k of ['level','stars','seconds']){if(!/^[0-9]+$/.test(row[k]))throw Error('Invalid score number.');row[k]=Number(row[k]);}validateScore(row);if(seen.has(row.runKey))throw Error('Duplicate leaderboard identity.');seen.add(row.runKey);return row;});
}
export function rankedScores(rows,level){
 const sorted=rows.filter(r=>r.level===level&&r.rules==='mg-rules-1-content-1').sort((a,b)=>b.stars-a.stars||a.seconds-b.seconds||a.runKey.localeCompare(b.runKey));let rank=0;
 return sorted.map((r,i)=>{if(!i||r.stars!==sorted[i-1].stars||r.seconds!==sorted[i-1].seconds)rank=i+1;return{...r,rank};}).slice(0,25);
}
export async function resultFor(run,levels,crypto=globalThis.crypto){
 validateRun(run,levels);if(run.custom||!run.complete)throw Error('Clear an official garden to submit a result.');const level=levels.find(l=>l.id===run.levelId);
 const identity=JSON.stringify([run.rules,run.levelRevision,run.levelId,run.seed,[...run.original].sort((a,b)=>a.id.localeCompare(b.id))]);const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(identity));
 return{runKey:[...new Uint8Array(bytes)].map(n=>n.toString(16).padStart(2,'0')).join(''),level:level.number,stars:stars(run),seconds:Math.max(1,Math.floor(run.elapsed)),rules:'mg-rules-1-content-1'};
}
export const emptyLocal=()=>({version:1,revision:0,name:'',pending:null,accepted:[]});
export function validateLocal(value){
 if(!value||value.version!==1||Object.keys(value).sort().join()!=='accepted,name,pending,revision,version'||!Number.isSafeInteger(value.revision)||value.revision<0||typeof value.name!=='string'||value.name&&playerName(value.name)!==value.name||!Array.isArray(value.accepted)||value.accepted.length>100||value.accepted.some(k=>typeof k!=='string'||!/^[a-f0-9]{64}$/.test(k)))throw Error('Saved leaderboard details are unsupported. They were kept intact.');if(value.pending!==null)validateScore(value.pending);return structuredClone(value);
}
export function writeLocal(db,value,revision,{milliseconds=5000}={}){
 validateLocal(value);return new Promise((resolve,reject)=>{const tx=db.transaction('profiles','readwrite'),store=tx.objectStore('profiles'),request=store.get('leaderboard');let error,done=false;const finish=e=>{if(done)return;done=true;clearTimeout(timer);e?reject(e):resolve({...value,revision:revision+1});};const timer=setTimeout(()=>{error=Error('Saving leaderboard details timed out.');try{tx.abort();}catch{}finish(error);},milliseconds);
 request.onsuccess=()=>{try{if((request.result?.revision??0)!==revision)throw Error('Another tab changed leaderboard details. Close and reopen the leaderboard.');store.put({...structuredClone(value),revision:revision+1},'leaderboard');}catch(e){error=e;tx.abort();}};tx.oncomplete=()=>finish();tx.onabort=()=>finish(error||tx.error||Error('Leaderboard details could not be saved.'));tx.onerror=()=>{};});
}
export async function fetchScores({fetcher=globalThis.fetch,document=globalThis.document,signal}={}){
 const response=await fetcher(ENDPOINT+'?fresh='+Date.now(),{cache:'no-store',redirect:'error',signal,headers:{Accept:'text/html'}});if(!response.ok)throw Error('Leaderboard unavailable ('+response.status+'). Try Refresh.');if(!response.headers.get('content-type')?.includes('text/html'))throw Error('Unexpected leaderboard response.');
 if(Number(response.headers.get('content-length'))>MAX_BYTES)throw Error('This leaderboard is too large to load safely.');
 const reader=response.body.getReader();let size=0,chunks=[];try{for(;;){const {value,done}=await reader.read();if(done)break;size+=value.length;if(size>MAX_BYTES)throw Error('This leaderboard is too large to load safely.');chunks.push(value);}}finally{await reader.cancel().catch(()=>{});}const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}return parseScores(new TextDecoder().decode(bytes),document);
}
export async function sendScore(row,{fetcher=globalThis.fetch,document=globalThis.document,signal}={}){
 validateScore(row);const lookup=()=>fetchScores({fetcher,document,signal});const reconcile=rows=>{const found=rows.find(r=>r.runKey===row.runKey);if(found&&!sameScore(found,row))throw Error('This deal already has different public details. Its original entry was kept.');return !!found;};
 if(reconcile(await lookup()))return;
 let failure;try{const response=await fetcher(ENDPOINT,{method:'POST',headers:{'Content-Type':'text/html; charset=utf-8',Range:'selector=#scores'},body:scoreHTML(row),redirect:'error',signal});if(!response.ok)failure=Error('Submission was not confirmed ('+response.status+'). Retry to check before sending again.');}catch(error){failure=error;}
 // A lost response or duplicate response may still represent a committed write.
 try{if(reconcile(await lookup()))return;}catch(error){if(error.message.includes('different public'))throw error;failure??=error;}
 throw failure||Error('Submission is not confirmed yet. Your result is kept for Retry.');
}
export function mountLeaderboard({levels,getRun,document=globalThis.document}){
 const $=id=>document.getElementById(id),dialog=$('leaderboard-dialog');let local=emptyLocal(),db,localOK=false,writeBusy=false,sendBusy=false,generation=0,readAbort=null,currentResult=null,currentLevel=1,cache=new Map(),loadGeneration=0;
 const status=text=>{$('leaderboard-status').textContent=text;},submission=text=>{$('leaderboard-submit-status').textContent=text;};
 const option=level=>{const el=document.createElement('option');el.value=String(level.number);el.textContent=`${String(level.number).padStart(2,'0')} · ${level.name}`;return el;};$('leaderboard-level').replaceChildren(...levels.map(option));
 function controls(){const pending=local.pending;const accepted=currentResult&&local.accepted.includes(currentResult.runKey);$('leaderboard-submit').disabled=writeBusy||sendBusy||!localOK||!currentResult||!!pending||!!accepted;$('leaderboard-retry').hidden=!pending;$('leaderboard-retry').disabled=writeBusy||sendBusy||!localOK;$('leaderboard-forget').hidden=!pending;$('leaderboard-forget').disabled=writeBusy||sendBusy||!localOK;$('leaderboard-name').disabled=writeBusy||sendBusy||!!pending||!!accepted;$('leaderboard-result').textContent=pending?`Pending: level ${pending.level}, ${pending.stars} stars, ${pending.seconds}s, ${pending.player}. Retry keeps these original details.`:accepted?'This deal has already been submitted.':currentResult?`Your clear: level ${currentResult.level}, ${currentResult.stars} stars, ${currentResult.seconds}s.`:'Clear an official garden to submit. Custom studio layouts are practice.';}
 function render(rows){const body=$('leaderboard-rows');body.replaceChildren();for(const row of rankedScores(rows,currentLevel)){const tr=document.createElement('tr');for(const value of [row.rank,row.player+(local.accepted.includes(row.runKey)?' (you on this device)':''),'★'.repeat(row.stars),`${row.seconds}s`]){const td=document.createElement('td');td.textContent=String(value);tr.append(td);}body.append(tr);}$('leaderboard-empty').hidden=body.children.length!==0;$('leaderboard-table').hidden=body.children.length===0;}
 async function refresh(){const owner=++generation,level=Number($('leaderboard-level').value);currentLevel=level;readAbort?.abort();readAbort=new AbortController();const controller=readAbort,timer=setTimeout(()=>controller.abort(),10000);$('leaderboard-scope').textContent=`Level ${level} · all-time top 25`;$('leaderboard-empty').hidden=true;$('leaderboard-table').hidden=true;if(cache.has(level))render(cache.get(level));status(cache.has(level)?'Refreshing · showing the previous confirmed results for this level.':'Loading shared results…');dialog.setAttribute('aria-busy','true');
 try{const rows=await fetchScores({document,signal:controller.signal});if(owner!==generation||!dialog.open)return;cache.delete(level);cache.set(level,rows);if(cache.size>2)cache.delete(cache.keys().next().value);render(rows);status('Up to date. Equal stars and seconds share a rank.');}catch(error){if(owner!==generation||!dialog.open)return;status((cache.has(level)?'Showing older results. ':'')+(error.name==='AbortError'?'Leaderboard request timed out. Try Refresh.':error.message));}finally{clearTimeout(timer);if(owner===generation)dialog.setAttribute('aria-busy','false');}}
 async function save(next){if(writeBusy)throw Error('Leaderboard details are still saving.');writeBusy=true;controls();try{if(!db)db=await openStore();local=await writeLocal(db,next,local.revision);return true;}finally{writeBusy=false;controls();}}
 async function send(){if(sendBusy||!local.pending||!localOK)return;sendBusy=true;controls();const row=structuredClone(local.pending),owner=loadGeneration,controller=new AbortController(),timer=setTimeout(()=>controller.abort(),20000);submission('Sending your saved result…');
 try{await sendScore(row,{document,signal:controller.signal});if(owner!==loadGeneration)return;const next={...local,pending:null,accepted:[row.runKey,...local.accepted.filter(k=>k!==row.runKey)].slice(0,100)};await save(next);submission('Your result is on the shared leaderboard.');if(dialog.open)void refresh();}
 catch(error){if(owner===loadGeneration)submission('Not confirmed · your result is saved here for Retry. '+(error.name==='AbortError'?'The request timed out.':error.message));}finally{clearTimeout(timer);sendBusy=false;controls();}}
 async function open(){generation++;readAbort?.abort();const owner=++loadGeneration;localOK=false;controls();submission('Loading your leaderboard details…');
 try{if(!db)db=await openStore();const saved=await readProfile(db,{key:'leaderboard'});if(owner!==loadGeneration)return;local=saved===null?emptyLocal():validateLocal(saved);localOK=true;$('leaderboard-name').value=local.pending?.player||local.name;currentResult=null;const run=getRun();if(run?.complete&&!run.custom)currentResult=await resultFor(structuredClone(run),levels);if(owner!==loadGeneration)return;submission(local.pending?'A result is saved here, waiting for Retry.':'Your name and result become public only when you submit.');}
 catch(error){if(owner===loadGeneration)submission(error.message+' Play can continue.');}finally{if(owner===loadGeneration){const level=levels.find(l=>l.id===getRun()?.levelId);$('leaderboard-level').value=String(local.pending?.level||level?.number||1);controls();if(dialog.open)void refresh();}}}
 $('leaderboard-level').onchange=()=>void refresh();$('leaderboard-refresh').onclick=()=>void refresh();
 $('leaderboard-submit').onclick=async()=>{if(writeBusy||sendBusy||!currentResult||local.pending||!localOK)return;try{const name=playerName($('leaderboard-name').value);$('leaderboard-name').value=name;const pending=validateScore({...currentResult,player:name});await save({...local,name,pending});submission('Result saved on this device. Sending…');await send();}catch(error){submission(error.message);$('leaderboard-name').focus();}};
 $('leaderboard-retry').onclick=()=>void send();$('leaderboard-forget').onclick=async()=>{if(writeBusy||sendBusy)return;try{await save({...local,pending:null});submission('Local retry removed. An earlier uncertain request may already be public.');}catch(error){submission(error.message);}};
 $('leaderboard-name').oninput=()=>{$('leaderboard-name').setCustomValidity('');};
 dialog.addEventListener('close',()=>{generation++;readAbort?.abort();dialog.setAttribute('aria-busy','false');});
 return{open:()=>{if(sendBusy){controls();void refresh();}else void open();}};
}
