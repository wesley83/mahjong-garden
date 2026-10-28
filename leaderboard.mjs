import {openStore,readProfile} from './storage.mjs';
import {stars,validateRun} from './core.mjs';
import {balancedScore,SCORE_RULES} from './scoring.mjs';

export const LEGACY_ENDPOINT='/mahjong-scores.html',ENDPOINT='/mahjong-scores-v2.html',LEGACY_TYPE='https://grab-lead-8328.onpagelove.com/MahjongResultV1',TYPE='https://grab-lead-8328.onpagelove.com/MahjongResultV2';
const legacyKeys=['runKey','player','level','stars','seconds','rules'],keys=[...legacyKeys.slice(0,5),'score','pairs','hints','shuffles','rules'],MAX_BYTES=2000000;
const isLegacy=row=>row?.rules==='mg-rules-1-content-1',fields=row=>isLegacy(row)?legacyKeys:keys;
export function playerName(value){const name=String(value).trim();if(!/^[A-Za-z0-9 ._'\-]{1,24}$/.test(name)||!/[A-Za-z0-9]/.test(name))throw Error('Use 1–24 letters A–Z, numbers, spaces, period, apostrophe, dash or underscore.');return name;}
export function validateScore(row){
 const allowed=fields(row);if(!row||typeof row!=='object'||Array.isArray(row)||Object.keys(row).length!==allowed.length||allowed.some(k=>!Object.hasOwn(row,k)))throw Error('Invalid score fields.');
 if(!/^[a-f0-9]{64}$/.test(row.runKey)||typeof row.player!=='string'||playerName(row.player)!==row.player||!Number.isInteger(row.level)||row.level<1||row.level>60||!Number.isInteger(row.stars)||row.stars<1||row.stars>3||!Number.isInteger(row.seconds)||row.seconds<1||row.seconds>31536000||!isLegacy(row)&&row.rules!==SCORE_RULES)throw Error('Unsupported score.');if(!isLegacy(row)&&(row.score!==balancedScore(row)||row.stars!==(row.shuffles?1:row.hints?2:3)))throw Error('Inconsistent points or stars.');return structuredClone(row);
}
export const sameScore=(a,b)=>fields(a).every(k=>a[k]===b[k]);
export function scoreHTML(row){validateScore(row);return `<li itemscope itemtype="${isLegacy(row)?LEGACY_TYPE:TYPE}">`+fields(row).map(k=>`<meta itemprop="${k}" content="${row[k]}">`).join('')+'</li>';}
export function parseScores(text,document){
 if(new TextEncoder().encode(text).length>MAX_BYTES)throw Error('This leaderboard is too large to load safely.');
 const inert=document.createElement('template');inert.innerHTML=text;const list=inert.content.querySelector('#scores');if(!list||list.localName!=='ul'||inert.content.querySelectorAll('#scores').length!==1||list.children.length>5000)throw Error('Leaderboard data is unavailable or too large.');
 const seen=new Set();return [...list.children].map(li=>{const allowed=li.getAttribute('itemtype')===LEGACY_TYPE?legacyKeys:keys;if(li.localName!=='li'||![TYPE,LEGACY_TYPE].includes(li.getAttribute('itemtype'))||li.children.length!==allowed.length)throw Error('Invalid leaderboard entry.');const row={};for(const meta of li.children){const key=meta.getAttribute('itemprop');if(meta.localName!=='meta'||!allowed.includes(key)||Object.hasOwn(row,key))throw Error('Invalid leaderboard fields.');row[key]=meta.getAttribute('content');}for(const k of allowed.filter(k=>!['runKey','player','rules'].includes(k))){if(!/^[0-9]+$/.test(row[k]))throw Error('Invalid score number.');row[k]=Number(row[k]);}validateScore(row);if(seen.has(row.runKey))throw Error('Duplicate leaderboard identity.');seen.add(row.runKey);return row;});
}
export function rankedScores(rows,level,legacy=false,limit=25){
 if(!Number.isInteger(limit)||limit<1||limit>5000)throw Error('Invalid score limit.');
 const sorted=rows.filter(r=>r.level===level&&(legacy?isLegacy(r):r.rules===SCORE_RULES)).sort((a,b)=>legacy?b.stars-a.stars||a.seconds-b.seconds||a.runKey.localeCompare(b.runKey):b.score-a.score||a.runKey.localeCompare(b.runKey));let rank=0;
 return sorted.map((r,i)=>{if(!i||(legacy?r.stars!==sorted[i-1].stars||r.seconds!==sorted[i-1].seconds:r.score!==sorted[i-1].score))rank=i+1;return{...r,rank};}).slice(0,limit);
}
export function scoreSheetRows(rows,level,accepted=[],legacy=false){
 const all=rankedScores(rows,level,legacy,5000),mine=new Set(accepted),byId=new Map(all.map(r=>[r.runKey,r])),top=all.slice(0,10),latest=accepted.map(id=>byId.get(id)).find(Boolean);
 if(latest&&!top.some(r=>r.runKey===latest.runKey))top.push(latest);
 return top.map((r,i)=>({...r,mine:mine.has(r.runKey),extra:i===10}));
}
export async function resultFor(run,levels,crypto=globalThis.crypto){
 validateRun(run,levels);if(run.custom||!run.complete)throw Error('Clear an official garden to submit a result.');const level=levels.find(l=>l.id===run.levelId);
 const identity=JSON.stringify([SCORE_RULES,run.rules,run.levelRevision,run.levelId,run.seed,[...run.original].sort((a,b)=>a.id.localeCompare(b.id))]);const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(identity));
 return{runKey:[...new Uint8Array(bytes)].map(n=>n.toString(16).padStart(2,'0')).join(''),level:level.number,stars:stars(run),seconds:Math.max(1,Math.floor(run.elapsed)),score:balancedScore({pairs:run.original.length/2,hints:run.hints,shuffles:run.shuffles}),pairs:run.original.length/2,hints:run.hints,shuffles:run.shuffles,rules:SCORE_RULES};
}
export const emptyLocal=()=>({version:1,revision:0,name:'',pending:null,accepted:[]});
export function validateLocal(value){
 if(!value||value.version!==1||Object.keys(value).sort().join()!=='accepted,name,pending,revision,version'||!Number.isSafeInteger(value.revision)||value.revision<0||typeof value.name!=='string'||value.name&&playerName(value.name)!==value.name||!Array.isArray(value.accepted)||value.accepted.length>100||value.accepted.some(k=>typeof k!=='string'||!/^[a-f0-9]{64}$/.test(k)))throw Error('Saved leaderboard details are unsupported. They were kept intact.');if(value.pending!==null)validateScore(value.pending);return structuredClone(value);
}
export function writeLocal(db,value,revision,{milliseconds=5000}={}){
 validateLocal(value);return new Promise((resolve,reject)=>{const tx=db.transaction('profiles','readwrite'),store=tx.objectStore('profiles'),request=store.get('leaderboard');let error,done=false;const finish=e=>{if(done)return;done=true;clearTimeout(timer);e?reject(e):resolve({...value,revision:revision+1});};const timer=setTimeout(()=>{error=Error('Saving leaderboard details timed out.');try{tx.abort();}catch{}finish(error);},milliseconds);
 request.onsuccess=()=>{try{if((request.result?.revision??0)!==revision)throw Error('Another tab changed leaderboard details. Close and reopen the leaderboard.');store.put({...structuredClone(value),revision:revision+1},'leaderboard');}catch(e){error=e;tx.abort();}};tx.oncomplete=()=>finish();tx.onabort=()=>finish(error||tx.error||Error('Leaderboard details could not be saved.'));tx.onerror=()=>{};});
}
export async function fetchScores({fetcher=globalThis.fetch,document=globalThis.document,signal,legacy=false}={}){
 const response=await fetcher((legacy?LEGACY_ENDPOINT:ENDPOINT)+'?fresh='+Date.now(),{cache:'no-store',redirect:'error',signal,headers:{Accept:'text/html'}});if(!response.ok)throw Error('Leaderboard unavailable ('+response.status+'). Try Refresh.');if(!response.headers.get('content-type')?.includes('text/html'))throw Error('Unexpected leaderboard response.');
 if(Number(response.headers.get('content-length'))>MAX_BYTES)throw Error('This leaderboard is too large to load safely.');
 const reader=response.body.getReader();let size=0,chunks=[];try{for(;;){const {value,done}=await reader.read();if(done)break;size+=value.length;if(size>MAX_BYTES)throw Error('This leaderboard is too large to load safely.');chunks.push(value);}}finally{await reader.cancel().catch(()=>{});}const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}return parseScores(new TextDecoder().decode(bytes),document);
}
export async function sendScore(row,{fetcher=globalThis.fetch,document=globalThis.document,signal}={}){
 validateScore(row);const lookup=()=>fetchScores({fetcher,document,signal,legacy:isLegacy(row)});const reconcile=rows=>{const found=rows.find(r=>r.runKey===row.runKey);if(found&&!sameScore(found,row))throw Error('This deal already has different public details. Its original entry was kept.');return !!found;};
 if(reconcile(await lookup()))return;
 let failure;try{const response=await fetcher(isLegacy(row)?LEGACY_ENDPOINT:ENDPOINT,{method:'POST',headers:{'Content-Type':'text/html; charset=utf-8',Range:'selector=#scores'},body:scoreHTML(row),redirect:'error',signal});if(!response.ok)failure=Error('Submission was not confirmed ('+response.status+'). Retry to check before sending again.');}catch(error){failure=error;}
 // A lost response or duplicate response may still represent a committed write.
 try{if(reconcile(await lookup()))return;}catch(error){if(error.message.includes('different public'))throw error;failure??=error;}
 throw failure||Error('Submission is not confirmed yet. Your result is kept for Retry.');
}
export function mountLeaderboard({levels,getRun,showBoard=()=>{},document=globalThis.document}){
 const $=id=>document.getElementById(id),dialog=$('leaderboard-dialog');let local=emptyLocal(),db,localOK=false,writeBusy=false,sendBusy=false,generation=0,readAbort=null,currentResult=null,preparedRun=null,currentLevel=1,cache=new Map(),loadGeneration=0;
 const legacy=()=>$('leaderboard-edition').value==='legacy';
 const status=text=>{$('leaderboard-status').textContent=text;};
 const submission=text=>{$('leaderboard-submit-status').textContent=text;$('leaderboard-pending-status').textContent=text;};
 $('leaderboard-level').replaceChildren(...levels.map(level=>{const el=document.createElement('option');el.value=String(level.number);el.textContent=`${String(level.number).padStart(2,'0')} · ${level.name}`;return el;}));
 function controls(){
  const pending=local.pending,eligible=!!currentResult&&getRun()===preparedRun,accepted=eligible&&local.accepted.includes(currentResult.runKey);
  $('leaderboard-entry').hidden=!eligible||!!pending||!!accepted;
  $('leaderboard-submit').disabled=writeBusy||sendBusy||!localOK||!eligible||!!pending||!!accepted;
  $('leaderboard-name').disabled=writeBusy||sendBusy||!localOK||!!pending||!!accepted;
  $('leaderboard-pending').hidden=!pending;
  $('leaderboard-retry').disabled=writeBusy||sendBusy||!localOK;$('leaderboard-forget').disabled=writeBusy||sendBusy||!localOK;
  $('leaderboard-pending-details').textContent=pending?`${pending.player} · Garden ${pending.level} · ${isLegacy(pending)?pending.stars+' stars':pending.score.toLocaleString('en-US')+' points'}`:'';
  const text=pending?'Your score is saved on this device. Open the leaderboard to send it.':accepted?'Score saved.':'';
  $('leaderboard-result').textContent=text;$('leaderboard-result').hidden=!text;
 }
 function render(rows){
  const body=$('leaderboard-rows');body.replaceChildren();$('leaderboard-points-label').textContent=legacy()?'Result':'Points';
  for(const row of scoreSheetRows(rows,currentLevel,local.accepted,legacy())){const tr=document.createElement('tr');tr.classList.toggle('your-score',row.mine);tr.classList.toggle('extra-score',row.extra);tr.dataset.runKey=row.runKey;
   for(const value of [row.rank,row.player+(row.mine?' · You':''),isLegacy(row)?`${row.stars}★ · ${row.seconds}s`:row.score.toLocaleString('en-US')]){const td=document.createElement('td');td.textContent=String(value);tr.append(td);}body.append(tr);}
  $('leaderboard-empty').hidden=body.children.length!==0;$('leaderboard-table').hidden=body.children.length===0;
 }
 async function refresh(){
  const owner=++generation,level=Number($('leaderboard-level').value);currentLevel=level;const edition=legacy(),scope=(edition?'legacy':'balanced')+':'+level;readAbort?.abort();readAbort=new AbortController();const controller=readAbort,timer=setTimeout(()=>controller.abort(),10000),name=levels.find(l=>l.number===level)?.name||'Garden';
  $('score-sheet-note').textContent=edition?'Earlier stars & time rankings':'Top 10 · Equal points share a rank';$('leaderboard-scope').textContent=`${edition?'History · ':''}Level ${level} · ${name}`;$('leaderboard-empty').hidden=true;$('leaderboard-table').hidden=true;$('leaderboard-refresh').hidden=true;
  if(cache.has(scope))render(cache.get(scope));status(cache.has(scope)?'Refreshing…':'Loading scores…');dialog.setAttribute('aria-busy','true');
  try{const rows=await fetchScores({document,signal:controller.signal,legacy:edition});if(owner!==generation||!dialog.open)return;cache.delete(scope);cache.set(scope,rows);if(cache.size>2)cache.delete(cache.keys().next().value);render(rows);status('');}
  catch(error){if(owner!==generation||!dialog.open)return;status((cache.has(scope)?'Showing older scores. ':'')+'Scores could not load. Try again.');$('leaderboard-refresh').hidden=false;}
  finally{clearTimeout(timer);if(owner===generation)dialog.setAttribute('aria-busy','false');}
 }
 async function save(next){if(writeBusy)throw Error('Your score is still saving.');writeBusy=true;controls();try{if(!db)db=await openStore();local=await writeLocal(db,next,local.revision);}finally{writeBusy=false;controls();}}
 async function send(){
  if(sendBusy||!local.pending||!localOK)return;sendBusy=true;controls();const row=structuredClone(local.pending),controller=new AbortController(),timer=setTimeout(()=>controller.abort(),20000);submission('Sending score…');
  try{await sendScore(row,{document,signal:controller.signal});if(!local.pending||!sameScore(local.pending,row))return;await save({...local,pending:null,accepted:[row.runKey,...local.accepted.filter(k=>k!==row.runKey)].slice(0,100)});submission('Score saved.');if(dialog.open)void refresh();}
  catch(error){submission('Your score is saved here for Retry. '+(error.name==='AbortError'?'The request timed out.':error.message));}
  finally{clearTimeout(timer);sendBusy=false;controls();if($('win-dialog').open&&getRun()!==preparedRun)void prepare();}
 }
 async function prepare(){
  const owner=++loadGeneration,run=getRun(),draft=run===preparedRun?$('leaderboard-name').value:null;currentResult=null;preparedRun=null;if(sendBusy){controls();return;}localOK=false;controls();
  try{if(!db)db=await openStore();const saved=await readProfile(db,{key:'leaderboard'});if(owner!==loadGeneration||getRun()!==run)return;local=saved===null?emptyLocal():validateLocal(saved);localOK=true;
   const result=run?.complete&&!run.custom?await resultFor(structuredClone(run),levels):null;if(owner!==loadGeneration||getRun()!==run)return;currentResult=result;preparedRun=run;$('leaderboard-name').value=local.pending?.player??draft??local.name;submission('');controls();}
  catch(error){if(owner===loadGeneration){submission(error.message+' You can keep playing.');$('leaderboard-result').hidden=false;$('leaderboard-result').textContent='Your score could not be prepared. Open the leaderboard to retry.';}}
 }
 async function open(){
  $('leaderboard-options').open=false;$('leaderboard-level').value=String(levels.find(l=>l.id===getRun()?.levelId)?.number||1);$('leaderboard-edition').value='balanced';
  await prepare();if(dialog.open)void refresh();
 }
 $('leaderboard-level').onchange=()=>void refresh();$('leaderboard-edition').onchange=()=>void refresh();$('leaderboard-refresh').onclick=()=>void refresh();$('leaderboard-reload').onclick=()=>void refresh();
 $('leaderboard-submit').onclick=async()=>{
  if(writeBusy||sendBusy||!currentResult||getRun()!==preparedRun||local.pending||!localOK)return;
  try{const name=playerName($('leaderboard-name').value);$('leaderboard-name').value=name;const pending=validateScore({...currentResult,player:name}),owner=preparedRun;await save({...local,name,pending});
   if(getRun()===owner&&$('win-dialog').open){showBoard();$('leaderboard-options').open=false;$('leaderboard-level').value=String(pending.level);$('leaderboard-edition').value='balanced';void refresh();}await send();}
  catch(error){submission(error.message);if(!$('leaderboard-entry').hidden)$('leaderboard-name').focus();}
 };
 $('leaderboard-retry').onclick=()=>void send();$('leaderboard-forget').onclick=async()=>{if(writeBusy||sendBusy)return;try{await save({...local,pending:null});submission('Local retry removed. An earlier request may already be public.');controls();}catch(error){submission(error.message);}};
 dialog.addEventListener('close',()=>{generation++;readAbort?.abort();dialog.setAttribute('aria-busy','false');});
 return{open:()=>void open(),prepareResult:()=>void prepare()};
}
