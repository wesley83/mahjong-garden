import {CHALLENGE_ENDPOINT,CHALLENGE_TYPE,CHALLENGE_RULES,challengeKey,validChallengeId,validReceipt,bindChallenge,challengeWon} from './garden-core.mjs';
import {openStore,readProfile} from './storage.mjs';
import {stars,validateRun} from './core.mjs';
import {balancedScore,timeAdjustedScore,SCORE_RULES} from './scoring.mjs';

export const LEGACY_ENDPOINT='/mahjong-scores.html',ENDPOINT='/mahjong-scores-v2.html',LEGACY_TYPE='https://grab-lead-8328.onpagelove.com/MahjongResultV1',TYPE='https://grab-lead-8328.onpagelove.com/MahjongResultV2';
const legacyKeys=['runKey','player','level','stars','seconds','rules'],keys=[...legacyKeys.slice(0,5),'score','pairs','hints','shuffles','rules'],MAX_BYTES=2000000;
const isChallenge=row=>row?.rules===CHALLENGE_RULES;
const isLegacy=row=>row?.rules==='mg-rules-1-content-1',challengeKeys=[...keys,'challenge'],fields=row=>isLegacy(row)?legacyKeys:isChallenge(row)?challengeKeys:keys;
export function playerName(value){const name=String(value).trim();if(!/^[A-Za-z0-9 ._'\-]{1,24}$/.test(name)||!/[A-Za-z0-9]/.test(name))throw Error('Use 1–24 letters A–Z, numbers, spaces, period, apostrophe, dash or underscore.');return name;}
export function validateScore(row){
 const allowed=fields(row);if(!row||typeof row!=='object'||Array.isArray(row)||Object.keys(row).length!==allowed.length||allowed.some(k=>!Object.hasOwn(row,k)))throw Error('Invalid score fields.');
 if(!(isChallenge(row)?validChallengeId(row.challenge)&&row.runKey===challengeKey(row.challenge,row.player):/^[a-f0-9]{64}$/.test(row.runKey))||typeof row.player!=='string'||playerName(row.player)!==row.player||!Number.isInteger(row.level)||row.level<1||row.level>60||!Number.isInteger(row.stars)||row.stars<1||row.stars>3||!Number.isInteger(row.seconds)||row.seconds<1||row.seconds>31536000||!isLegacy(row)&&!isChallenge(row)&&row.rules!==SCORE_RULES)throw Error('Unsupported score.');if(!isLegacy(row)&&(row.score!==balancedScore(row)||row.stars!==(row.shuffles?1:row.hints?2:3)))throw Error('Inconsistent points or stars.');return structuredClone(row);
}
export const sameScore=(a,b)=>fields(a).every(k=>a[k]===b[k]);
export function scoreHTML(row){validateScore(row);return `<li itemscope itemtype="${isLegacy(row)?LEGACY_TYPE:isChallenge(row)?CHALLENGE_TYPE:TYPE}">`+fields(row).map(k=>`<meta itemprop="${k}" content="${row[k]}">`).join('')+'</li>';}
export function parseScores(text,document){
 if(new TextEncoder().encode(text).length>MAX_BYTES)throw Error('This leaderboard is too large to load safely.');
 const inert=document.createElement('template');inert.innerHTML=text;const list=inert.content.querySelector('#scores');if(!list||list.localName!=='ul'||inert.content.querySelectorAll('#scores').length!==1||list.children.length>5000)throw Error('Leaderboard data is unavailable or too large.');
 const seen=new Set();return [...list.children].map(li=>{const allowed=li.getAttribute('itemtype')===LEGACY_TYPE?legacyKeys:li.getAttribute('itemtype')===CHALLENGE_TYPE?challengeKeys:keys;if(li.localName!=='li'||![TYPE,LEGACY_TYPE,CHALLENGE_TYPE].includes(li.getAttribute('itemtype'))||li.children.length!==allowed.length)throw Error('Invalid leaderboard entry.');const row={};for(const meta of li.children){const key=meta.getAttribute('itemprop');if(meta.localName!=='meta'||!allowed.includes(key)||Object.hasOwn(row,key))throw Error('Invalid leaderboard fields.');row[key]=meta.getAttribute('content');}for(const k of allowed.filter(k=>!['runKey','player','rules','challenge'].includes(k))){if(!/^[0-9]+$/.test(row[k]))throw Error('Invalid score number.');row[k]=Number(row[k]);}validateScore(row);if(seen.has(row.runKey))throw Error('Duplicate leaderboard identity.');seen.add(row.runKey);return row;});
}
export function rankedScores(rows,level,legacy=false,limit=25){
 if(!Number.isInteger(limit)||limit<1||limit>5000)throw Error('Invalid score limit.');
 const sorted=rows.filter(r=>r.level===level&&(legacy?isLegacy(r):r.rules===SCORE_RULES)).map(r=>legacy?r:{...r,score:timeAdjustedScore(r)}).sort((a,b)=>legacy?b.stars-a.stars||a.seconds-b.seconds||a.runKey.localeCompare(b.runKey):b.score-a.score||a.runKey.localeCompare(b.runKey));let rank=0;
 return sorted.map((r,i)=>{if(!i||(legacy?r.stars!==sorted[i-1].stars||r.seconds!==sorted[i-1].seconds:r.score!==sorted[i-1].score))rank=i+1;return{...r,rank};}).slice(0,limit);
}
export function scoreSheetRows(rows,level,accepted=[],legacy=false){
 const all=rankedScores(rows,level,legacy,5000),mine=new Set(accepted),byId=new Map(all.map(r=>[r.runKey,r])),top=all.slice(0,10),latest=accepted.map(id=>byId.get(id)).find(Boolean);
 if(latest&&!top.some(r=>r.runKey===latest.runKey))top.push(latest);
 return top.map((r,i)=>({...r,mine:mine.has(r.runKey),extra:i===10}));
}
export function rankedPlayerTotals(rows){
 const groups=new Map();for(const row of rows){if(row.rules!==SCORE_RULES)continue;const key=row.player.toLowerCase();let group=groups.get(key);if(!group){group={playerKey:key,player:row.player,firstKey:row.runKey,best:new Map()};groups.set(key,group);}if(row.runKey<group.firstKey){group.player=row.player;group.firstKey=row.runKey;}group.best.set(row.level,Math.max(group.best.get(row.level)??0,timeAdjustedScore(row)));}
 const sorted=[...groups.values()].map(group=>({playerKey:group.playerKey,player:group.player,total:[...group.best.values()].reduce((sum,score)=>sum+score,0),boards:group.best.size})).sort((a,b)=>b.total-a.total||a.playerKey.localeCompare(b.playerKey));let rank=0;return sorted.map((row,i)=>{if(!i||row.total!==sorted[i-1].total)rank=i+1;return{...row,rank};});
}
export function overallSheetRows(rows,accepted=[],rankings=rankedPlayerTotals(rows)){
 const all=rankings,current=rows.filter(r=>r.rules===SCORE_RULES),byId=new Map(current.map(r=>[r.runKey,r.player.toLowerCase()])),owned=new Set(accepted.map(id=>byId.get(id)).filter(Boolean)),latest=accepted.map(id=>byId.get(id)).find(Boolean),top=all.slice(0,10),extra=all.find(r=>r.playerKey===latest);if(extra&&!top.some(r=>r.playerKey===latest))top.push(extra);return top.map((row,i)=>({...row,mine:owned.has(row.playerKey),extra:i===10}));
}
export function createScoreCache({load,now=Date.now,maxAge=30000,timeoutMs=10000}){
 const entries=new Map(),key=legacy=>legacy==='challenge'?'challenge':legacy?'legacy':'current',peek=(legacy=false)=>entries.get(key(legacy))?.rows;
 const fresh=(legacy=false)=>{const e=entries.get(key(legacy));return !!e?.rows&&now()-e.at<maxAge;};
 function read({legacy=false,force=false}={}){const id=key(legacy),old=entries.get(id);if(!force&&old?.pending)return old.pending;if(!force&&fresh(legacy))return Promise.resolve(old.rows);old?.controller?.abort();const controller=new AbortController(),entry={rows:old?.rows,at:old?.at??-Infinity,controller,pending:null};entries.set(id,entry);let cancel;
  const canceled=new Promise((resolve,reject)=>{cancel=()=>reject(new DOMException('Score request canceled or timed out.','AbortError'));controller.signal.addEventListener('abort',cancel,{once:true});}),timer=setTimeout(()=>controller.abort(),timeoutMs);
  entry.pending=Promise.race([Promise.resolve().then(()=>load({legacy,signal:controller.signal})),canceled]).then(rows=>{if(entries.get(id)!==entry||controller.signal.aborted)throw new DOMException('Superseded score request.','AbortError');entry.rows=rows;entry.at=now();return rows;}).catch(error=>{if(entries.get(id)===entry)entry.at=-Infinity;throw error;}).finally(()=>{clearTimeout(timer);controller.signal.removeEventListener('abort',cancel);if(entries.get(id)===entry){entry.pending=null;entry.controller=null;}});return entry.pending;
 }
 function seed(rows,legacy=false){const id=key(legacy);entries.get(id)?.controller?.abort();entries.set(id,{rows,at:now(),pending:null,controller:null});}
 return{peek,fresh,read,seed,loading:(legacy=false)=>!!entries.get(key(legacy))?.pending};
}
export async function resultFor(run,levels,crypto=globalThis.crypto,challenge=null){
 validateRun(run,levels);const spec=challenge?bindChallenge(run,challenge.id,levels):null;if(run.custom||!(spec?challengeWon(run,spec):run.complete))throw Error('Clear an official garden or its challenge objective to submit a result.');const level=levels.find(l=>l.id===run.levelId);
 const identity=JSON.stringify([SCORE_RULES,run.rules,run.levelRevision,run.levelId,run.seed,[...run.original].sort((a,b)=>a.id.localeCompare(b.id))]),bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(identity));
 return{runKey:spec?challengeKey(spec.id,'Pending'):[...new Uint8Array(bytes)].map(n=>n.toString(16).padStart(2,'0')).join(''),level:level.number,stars:spec?(run.shuffles?1:run.hints?2:3):stars(run),seconds:Math.max(1,Math.floor(run.elapsed)),score:balancedScore({pairs:run.original.length/2,hints:run.hints,shuffles:run.shuffles}),pairs:run.original.length/2,hints:run.hints,shuffles:run.shuffles,rules:spec?CHALLENGE_RULES:SCORE_RULES,...(spec?{challenge:spec.id}:{})};
}
export function namedResult(result,name){name=playerName(name);return validateScore({...result,player:name,...(isChallenge(result)?{runKey:challengeKey(result.challenge,name)}:{})});}
export function challengeSheetRows(rows,id,accepted=[]){const all=rows.filter(r=>isChallenge(r)&&r.challenge===id).map(r=>({...r,score:timeAdjustedScore(r)})).sort((a,b)=>b.score-a.score||a.runKey.localeCompare(b.runKey));let rank=0;const ranked=all.map((r,i)=>{if(!i||r.score!==all[i-1].score)rank=i+1;return{...r,rank};}),top=ranked.slice(0,10),mine=new Set(accepted),latest=accepted.map(key=>ranked.find(r=>r.runKey===key)).find(Boolean);if(latest&&!top.some(r=>r.runKey===latest.runKey))top.push(latest);return top.map((r,i)=>({...r,mine:mine.has(r.runKey),extra:i===10}));}
export const emptyLocal=()=>({version:2,revision:0,name:'',pending:null,queue:[],accepted:[]});
export function validateLocal(value){
 const old=value?.version===1,shape=old?'accepted,name,pending,revision,version':'accepted,name,pending,queue,revision,version';
 if(!value||![1,2].includes(value.version)||Object.keys(value).sort().join()!==shape||!Number.isSafeInteger(value.revision)||value.revision<0||typeof value.name!=='string'||value.name&&playerName(value.name)!==value.name||!Array.isArray(value.accepted)||value.accepted.length>100||value.accepted.some(k=>!validReceipt(k)))throw Error('Saved leaderboard details are unsupported. They were kept intact.');
 const next=structuredClone({...value,version:2,queue:old?[]:value.queue});if(!Array.isArray(next.queue)||next.queue.length>120||!next.pending&&next.queue.length)throw Error('Saved score queue is unsupported. It was kept intact.');if(next.pending!==null)validateScore(next.pending);for(const row of next.queue)validateScore(row);const ids=new Set();for(const row of [next.pending,...next.queue].filter(Boolean)){if(ids.has(row.runKey)||next.accepted.includes(row.runKey))throw Error('Duplicate saved score identity.');ids.add(row.runKey);}return next;
}
export function enqueueScore(local,row){
 validateLocal(local);validateScore(row);if(local.accepted.includes(row.runKey)||[local.pending,...local.queue].some(r=>r?.runKey===row.runKey))return local;
 if(!local.pending)return{...local,pending:structuredClone(row)};if(local.queue.length>=120)throw Error('Saved score queue is full. Open the leaderboard and retry before saving more results.');return{...local,queue:[...local.queue,structuredClone(row)]};
}
export function acknowledgeScore(local,row){
 validateLocal(local);if(!local.pending||!sameScore(local.pending,row))throw Error('Saved score changed in another tab. Reopen the leaderboard to retry.');return{...local,pending:local.queue[0]??null,queue:local.queue.slice(1),accepted:[row.runKey,...local.accepted.filter(id=>id!==row.runKey)].slice(0,100)};
}
export function writeLocal(db,value,revision,{milliseconds=5000}={}){
 validateLocal(value);return new Promise((resolve,reject)=>{const tx=db.transaction('profiles','readwrite'),store=tx.objectStore('profiles'),request=store.get('leaderboard');let error,done=false;const finish=e=>{if(done)return;done=true;clearTimeout(timer);e?reject(e):resolve({...value,revision:revision+1});};const timer=setTimeout(()=>{error=Error('Saving leaderboard details timed out.');try{tx.abort();}catch{}finish(error);},milliseconds);
 request.onsuccess=()=>{try{if((request.result?.revision??0)!==revision)throw Error('Another tab changed leaderboard details. Close and reopen the leaderboard.');store.put({...structuredClone(value),revision:revision+1},'leaderboard');}catch(e){error=e;tx.abort();}};tx.oncomplete=()=>finish();tx.onabort=()=>finish(error||tx.error||Error('Leaderboard details could not be saved.'));tx.onerror=()=>{};});
}
export async function fetchScores({fetcher=globalThis.fetch,document=globalThis.document,signal,legacy=false}={}){
 const response=await fetcher((legacy==='challenge'?CHALLENGE_ENDPOINT:legacy?LEGACY_ENDPOINT:ENDPOINT)+'?fresh='+Date.now(),{cache:'no-store',redirect:'error',signal,headers:{Accept:'text/html'}});if(!response.ok)throw Error('Leaderboard unavailable ('+response.status+'). Try Refresh.');if(!response.headers.get('content-type')?.includes('text/html'))throw Error('Unexpected leaderboard response.');
 if(Number(response.headers.get('content-length'))>MAX_BYTES)throw Error('This leaderboard is too large to load safely.');
 const reader=response.body.getReader();let size=0,chunks=[];try{for(;;){const {value,done}=await reader.read();if(done)break;size+=value.length;if(size>MAX_BYTES)throw Error('This leaderboard is too large to load safely.');chunks.push(value);}}finally{await reader.cancel().catch(()=>{});}const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}return parseScores(new TextDecoder().decode(bytes),document);
}
export async function sendScore(row,{fetcher=globalThis.fetch,document=globalThis.document,signal}={}){
 validateScore(row);const lookup=()=>fetchScores({fetcher,document,signal,legacy:isChallenge(row)?'challenge':isLegacy(row)});const reconcile=rows=>{const found=rows.find(r=>r.runKey===row.runKey);if(found&&!sameScore(found,row))throw Error('This deal already has different public details. Its original entry was kept.');return !!found;};
 const existing=await lookup();if(reconcile(existing))return existing;
 let failure;try{const response=await fetcher(isChallenge(row)?CHALLENGE_ENDPOINT:isLegacy(row)?LEGACY_ENDPOINT:ENDPOINT,{method:'POST',headers:{'Content-Type':'text/html; charset=utf-8',Range:'selector=#scores'},body:scoreHTML(row),redirect:'error',signal});if(!response.ok)failure=Error('Submission was not confirmed ('+response.status+'). Retry to check before sending again.');}catch(error){failure=error;}
 // A lost response or duplicate response may still represent a committed write.
 try{const confirmed=await lookup();if(reconcile(confirmed))return confirmed;}catch(error){if(error.message.includes('different public'))throw error;failure??=error;}
 throw failure||Error('Submission is not confirmed yet. Your result is kept for Retry.');
}
export function mountLeaderboard({levels,getRun,showBoard=()=>{},getChallenge=()=>null,document=globalThis.document}){
 const $=id=>document.getElementById(id),dialog=$('leaderboard-dialog'),cache=createScoreCache({load:options=>fetchScores({...options,document})}),summaries=new WeakMap();let competition=null,availableCompetition=null,local=emptyLocal(),db,localOK=false,writeBusy=0,writeTail=Promise.resolve(),sendBusy=false,generation=0,currentResult=null,preparedRun=null,currentLevel=1,loadGeneration=0,scoreError='',overall=false;
 const legacy=()=>competition?'challenge':$('leaderboard-edition').value==='legacy';
 const status=text=>{$('leaderboard-status').textContent=text;};
 const submission=text=>{$('leaderboard-submit-status').textContent=text;$('leaderboard-pending-status').textContent=text;};
 $('leaderboard-level').replaceChildren(...levels.map(level=>{const el=document.createElement('option');el.value=String(level.number);el.textContent=`${String(level.number).padStart(2,'0')} · ${level.name}`;return el;}));
 function controls(){
  const pending=local.pending,eligible=!!currentResult&&getRun()===preparedRun,accepted=eligible&&local.accepted.includes(currentResult.runKey),queued=eligible&&[pending,...local.queue].some(r=>r?.runKey===currentResult.runKey);
  $('leaderboard-entry').hidden=!eligible||!!queued||!!accepted;
  $('leaderboard-submit').disabled=!!writeBusy||!localOK||!eligible||!!queued||!!accepted;
  $('leaderboard-name').disabled=!!writeBusy||!localOK||!!queued||!!accepted;
  $('leaderboard-pending').hidden=!pending;
  $('leaderboard-retry').disabled=!!writeBusy||sendBusy||!localOK;$('leaderboard-forget').disabled=!!writeBusy||sendBusy||!localOK;
  $('leaderboard-pending-details').textContent=pending?`${local.queue.length?local.queue.length+1+' saved scores · Next: ':''}${pending.player} · Garden ${pending.level} · ${isLegacy(pending)?pending.stars+' stars':timeAdjustedScore(pending).toLocaleString('en-US')+' points'}`:'';
  const text=scoreError||(accepted?'Score saved.':queued?(sendBusy?'Saving score…':'Score saved on this device. Open the leaderboard to retry.'):eligible&&local.name?`Scores save automatically as ${local.name}.`:'');
  $('leaderboard-result').textContent=text;$('leaderboard-result').hidden=!text;
 }
 function render(rows){
  const body=$('leaderboard-rows');body.replaceChildren();$('leaderboard-points-label').textContent=overall?'Total':legacy()===true?'Result':'Points';let summary=summaries.get(rows);if(!summary){const rankings=rankedPlayerTotals(rows);summary={rankings,totals:new Map(rankings.map(r=>[r.playerKey,r.total]))};summaries.set(rows,summary);}const totals=summary.totals;
  for(const row of overall?overallSheetRows(rows,local.accepted,summary.rankings):competition?challengeSheetRows(rows,competition,local.accepted):scoreSheetRows(rows,currentLevel,local.accepted,legacy())){const tr=document.createElement('tr');tr.classList.toggle('your-score',row.mine);tr.classList.toggle('extra-score',row.extra);if(overall)tr.dataset.playerKey=row.playerKey;else tr.dataset.runKey=row.runKey;
   for(const value of [row.rank,row.player+(row.mine?(overall?' · Your name':' · You'):''),overall?row.total.toLocaleString('en-US'):isLegacy(row)?`${row.stars}★ · ${row.seconds}s`:row.score.toLocaleString('en-US')]){const td=document.createElement('td');td.textContent=String(value);tr.append(td);}if(overall||row.rules===SCORE_RULES){const detail=document.createElement('small');detail.className='player-total';detail.textContent=overall?`${row.boards} ${row.boards===1?'board':'boards'}`:`Total ${totals.get(row.player.toLowerCase()).toLocaleString('en-US')}`;tr.lastChild.append(detail);}body.append(tr);}
  $('leaderboard-empty').hidden=body.children.length!==0;$('leaderboard-table').hidden=body.children.length===0;
 }
 function viewControls(){document.querySelector('.leaderboard-views').hidden=!!competition;$('leaderboard-competition-menu').hidden=!availableCompetition;$('leaderboard-competition').value=competition?'challenge':'journey';for(const id of ['leaderboard-board','leaderboard-overall'])$(id).disabled=false;$('leaderboard-board').setAttribute('aria-pressed',String(!overall));$('leaderboard-overall').setAttribute('aria-pressed',String(overall));$('leaderboard-filters').hidden=overall||!!competition;}
 async function refresh({force=false}={}){
  const owner=++generation,level=Number($('leaderboard-level').value);currentLevel=level;const edition=legacy(),name=levels.find(l=>l.number===level)?.name||'Garden';viewControls();
  $('score-sheet-note').textContent=competition?'Same deal · First saved result per name':overall?'Best time-adjusted score on each board':edition?'Earlier stars & time rankings':'Time bonus included · Equal points share a rank';$('leaderboard-scope').textContent=competition?availableCompetition.name+(availableCompetition.date?' · '+availableCompetition.date:''):overall?'All 60 boards':`${edition?'History · ':''}Level ${level} · ${name}`;$('leaderboard-empty').textContent=overall?'No totals yet. Clear a board to get started.':'Be the first to set a score.';$('leaderboard-table').caption.textContent=overall?'Combined best scores across boards, including your acknowledged name when available':'Scores for the selected garden, including your latest result when available';$('leaderboard-empty').hidden=true;$('leaderboard-table').hidden=true;$('leaderboard-refresh').hidden=true;
  const saved=cache.peek(edition);if(saved)render(saved);if(!force&&cache.fresh(edition)&&!cache.loading(edition)){status('');dialog.setAttribute('aria-busy','false');return;}status(saved?'Refreshing…':'Loading scores…');dialog.setAttribute('aria-busy','true');
  try{const rows=await cache.read({legacy:edition,force});if(owner!==generation||!dialog.open)return;render(rows);status('');}
  catch(error){if(owner!==generation||!dialog.open)return;status((cache.peek(edition)?'Showing older scores. ':'')+'Scores could not load. Try again.');$('leaderboard-refresh').hidden=false;}
  finally{if(owner===generation)dialog.setAttribute('aria-busy','false');}
 }
 function change(transform){
  writeBusy++;controls();const task=writeTail.catch(()=>{}).then(async()=>{if(!db)db=await openStore();const saved=await readProfile(db,{key:'leaderboard'}),latest=saved===null?emptyLocal():validateLocal(saved),next=transform(latest);local=next===latest?latest:await writeLocal(db,next,latest.revision);localOK=true;return local;}).catch(error=>{localOK=false;throw error;}).finally(()=>{writeBusy--;controls();});writeTail=task;return task;
 }
 async function send(){
  if(sendBusy||!local.pending||!localOK)return;sendBusy=true;scoreError='';controls();
  try{await change(v=>v);while(local.pending){const row=structuredClone(local.pending),controller=new AbortController(),timer=setTimeout(()=>controller.abort(),20000);submission('Sending saved scores…');try{const confirmed=await sendScore(row,{document,signal:controller.signal});await change(latest=>acknowledgeScore(latest,row));cache.seed(confirmed,isChallenge(row)?'challenge':isLegacy(row));}finally{clearTimeout(timer);}if(dialog.open)void refresh();}submission('Score saved.');}
  catch(error){scoreError='Your saved scores are kept here for Retry. '+(error.name==='AbortError'?'The request timed out.':error.message);submission(scoreError);}
  finally{sendBusy=false;controls();}
 }
 async function prepare(automatic=false,run=getRun(),context=getChallenge()){
  const current=getRun()===run,owner=current?++loadGeneration:loadGeneration,frozen=run?structuredClone(run):null,draft=current&&run===preparedRun?$('leaderboard-name').value:null;if(current){currentResult=null;preparedRun=null;scoreError='';controls();}
  try{await change(v=>v);const result=frozen&&!frozen.custom&&(context?challengeWon(frozen,context):frozen.complete)?await resultFor(frozen,levels,globalThis.crypto,context):null;if(result&&isChallenge(result)&&local.name)result.runKey=challengeKey(result.challenge,local.name);
   if(automatic&&result)await change(latest=>latest.name?enqueueScore(latest,namedResult(result,latest.name)):latest);
   if(current&&owner===loadGeneration&&getRun()===run){currentResult=result;preparedRun=run;$('leaderboard-name').value=draft??local.name;submission('');controls();}if(automatic&&local.pending)void send();}
  catch(error){if(current&&owner===loadGeneration&&getRun()===run){scoreError='Your score could not be saved. '+error.message+' Open the leaderboard to retry.';submission(scoreError);controls();}}
 }
 async function open({challenge=getChallenge()}={}){competition=challenge?.id||null;availableCompetition=challenge||null;
  overall=false;viewControls();$('leaderboard-options').open=false;$('leaderboard-level').value=String(challenge?.level||levels.find(l=>l.id===getRun()?.levelId)?.number||1);$('leaderboard-edition').value='balanced';
  void refresh();await prepare();if(dialog.open){const rows=cache.peek(legacy());if(rows)render(rows);}
 }
 $('leaderboard-competition').onchange=()=>{competition=$('leaderboard-competition').value==='challenge'?availableCompetition?.id:null;overall=false;void refresh();};
 $('leaderboard-level').onchange=()=>void refresh();$('leaderboard-edition').onchange=()=>void refresh();$('leaderboard-refresh').onclick=()=>void refresh({force:true});$('leaderboard-reload').onclick=()=>void refresh({force:true});
 $('leaderboard-board').onclick=()=>{if(!overall)return;overall=false;void refresh();};$('leaderboard-overall').onclick=()=>{if(overall)return;overall=true;$('leaderboard-edition').value='balanced';void refresh();};
 $('leaderboard-submit').onclick=async()=>{
  if(writeBusy||!currentResult||getRun()!==preparedRun||!localOK)return;
  try{const name=playerName($('leaderboard-name').value);$('leaderboard-name').value=name;const pending=namedResult(currentResult,name),owner=preparedRun;currentResult={...currentResult,runKey:pending.runKey};await change(latest=>enqueueScore({...latest,name},pending));
   if(getRun()===owner&&$('win-dialog').open){overall=false;if(isChallenge(pending)){competition=pending.challenge;availableCompetition=getChallenge();}viewControls();showBoard();$('leaderboard-options').open=false;$('leaderboard-level').value=String(pending.level);$('leaderboard-edition').value='balanced';void refresh();}await send();}
  catch(error){submission(error.message);if(!$('leaderboard-entry').hidden)$('leaderboard-name').focus();}
 };
 $('leaderboard-retry').onclick=async()=>{try{await change(v=>v);await send();}catch(error){submission(error.message);}};$('leaderboard-forget').onclick=async()=>{if(writeBusy||sendBusy)return;try{await change(latest=>({...latest,pending:latest.queue[0]??null,queue:latest.queue.slice(1)}));scoreError='';submission('Local retry removed. An earlier request may already be public.');controls();}catch(error){submission(error.message);}};
 dialog.addEventListener('close',()=>{generation++;dialog.setAttribute('aria-busy','false');});
 document.defaultView?.addEventListener('online',()=>{void change(v=>v).then(send).catch(error=>submission(error.message));});
 return{open:options=>void open(options),prepareResult:(run,context=getChallenge())=>void prepare(true,run,context),rememberName:async()=>{await change(v=>v);return local.name;},saveChallenge:async(run,context,name)=>{const row=namedResult(await resultFor(structuredClone(run),levels,globalThis.crypto,context),name);await change(latest=>enqueueScore({...latest,name:row.player},row));await send();return local.accepted.includes(row.runKey);},warm:context=>{void cache.read({legacy:context?'challenge':false}).catch(()=>{});}};
}
