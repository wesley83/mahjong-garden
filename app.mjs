import {scoreRun,balancedScore} from './scoring.mjs';
import {gardenSVG,gardens} from './scenery.mjs';
import {newRun,match,undo,reshuffle,isFree,pairs,stars,validateLayout,validateImages,validateImport,parseCampaign,solveGeometry} from './core.mjs';
import {traditional,renderFace,faceName} from './faces.mjs';
import {openStore,readProfile,writeProfile} from './storage.mjs';
import {validateProfile,parseBackup} from './profile.mjs';
import {LatestTask,StudioHistory,bounded,advanceElapsed,abortError} from './operations.mjs';
import {imageDimensions} from './image-input.mjs';
import {tileInput} from './tile-input.mjs';
import {GardenAudio,defaultAudio,validateAudio} from './audio.mjs';
import {homeParallax} from './parallax.mjs';

const $=id=>document.getElementById(id),$$=s=>[...document.querySelectorAll(s)];
const chapters=['The first path','By the water','Above the clouds','Autumn whispers','Under the stars','The hidden garden'];
const words=['ONE','TWO','THREE','FOUR','FIVE','SIX'];
const themeInfo=[['traditional','Traditional','A timeless classic'],['animals','Animals','A little wild at heart'],['emoji','Emoji','Everyday happiness']];
const template=()=>Array.from({length:32},(_,i)=>({id:`t-${i%8}-${Math.floor(i/8)}-0`,x:i%8,y:Math.floor(i/8),z:0}));
const freshProfile=()=>({version:1,revision:0,settings:{theme:'traditional',sound:true,largeTiles:false,reduceMotion:false},progress:{},run:null,studio:{layout:{id:'custom-'+crypto.randomUUID(),name:'My little garden',revision:1,positions:template()},images:[]}});
let levels=[],profile=freshProfile(),run=null,selected=null,hintIds=[],db=null,storageError=false,saveChain=Promise.resolve(true),saveTimer,editorReady=false,layer=0,editorImages=[],editorGeneration=0,editorBusy=false,confirmAction=null,lastTick=performance.now(),clockSave=0,originalRecovery=null,memoryOnly=false;
let workingGeneration=0,contextGeneration=0,transitionBusy=false,ready=false,clockActive=false,pendingSaves=0,hasRecovery=false,boardRevision=0;
const imageTask=new LatestTask(),restoreTask=new LatestTask(),history=new StudioHistory();
let mixer=defaultAudio(),pagePresent=true,audioRecovery;
const soundscape=new GardenAudio({status:text=>{$('audio-status').textContent=text;}});
let soundFrame=0,soundTimer=0,screen='title',sceneChapter=0,renderedOriginal;
let cancelTileContacts=()=>{};
let homeMotion;
let leaderboardUI,leaderboardPromise;
function ensureLeaderboard(){if(leaderboardUI)return Promise.resolve(leaderboardUI);leaderboardPromise??=import('./leaderboard.mjs').then(module=>{leaderboardUI=module.mountLeaderboard({levels,getRun:()=>run,showBoard:()=>openDialog('leaderboard-dialog')});return leaderboardUI;}).catch(error=>{leaderboardPromise=null;throw error;});return leaderboardPromise;}
function warmLeaderboard(){if(ready)void ensureLeaderboard().then(ui=>ui.warm()).catch(()=>{});}
async function openLeaderboard(){if(transitionBusy)return;openDialog('leaderboard-dialog');$('leaderboard-status').textContent='Loading scores…';$('leaderboard-load-retry').hidden=true;try{const ui=await ensureLeaderboard();if($('leaderboard-dialog').open)ui.open();}catch{$('leaderboard-status').textContent='Scores could not load. Try again.';$('leaderboard-load-retry').hidden=false;}}
async function prepareWinScore(){const owner=run;$('leaderboard-entry').hidden=true;$('win-score-retry').hidden=true;$('leaderboard-result').hidden=false;$('leaderboard-result').textContent='Preparing your score…';try{const ui=await ensureLeaderboard();ui.prepareResult(owner);}catch{if(run===owner){$('leaderboard-result').textContent='Your score could not be prepared. You can keep playing.';$('win-score-retry').hidden=false;}}}
function showScreen(next,{focus=true}={}){cancelTileContacts();updateElapsed();stopEffects();screen=next;document.body.dataset.screen=next;$('title-screen').hidden=next!=='title';$('play-screen').hidden=next!=='play';$('app-header').hidden=next!=='play';if(next==='play')fitBoard();syncClock();if(focus)(next==='title'?$('continue-game'):$('board').querySelector('.tile[aria-disabled="false"]'))?.focus({preventScroll:true});}
function renderScene(chapter){if(sceneChapter===chapter)return;sceneChapter=chapter;document.body.dataset.chapter=String(chapter);$('world-backdrop').innerHTML=gardenSVG(chapter);$('world-backdrop').dataset.scene=String(chapter);$('scene-label').textContent=gardens[chapter-1].place.toUpperCase();homeMotion?.refresh();}
const activeImages=()=>editorReady?editorImages:profile.studio.images;
function message(text){$('game-message').textContent=text;}
function status(text){$('studio-status').textContent=text;}
function warn(error){storageError=true;$('save-warning').hidden=false;$('save-warning-text').textContent='Progress is in memory only. '+error.message;$('studio-temporary').hidden=false;}
function clearWarning(){storageError=false;$('save-warning').hidden=true;$('studio-temporary').hidden=true;}
function saveState(text){$('save-state').textContent=text;}
function draftFromDOM(){const root=$('studio-source');return{layout:{id:root.dataset.id,name:root.querySelector('h2').textContent,revision:1,positions:[...root.querySelectorAll('li')].map(n=>({id:n.dataset.tile,x:+n.dataset.x,y:+n.dataset.y,z:+n.dataset.z}))},images:structuredClone(editorImages)};}
function gameBackup(){return{format:'mahjong-garden-backup',version:2,profile:snapshot(),audio:structuredClone(mixer)};}
function snapshot(){return{...structuredClone(profile),run:run?structuredClone(run):null,studio:editorReady?draftFromDOM():structuredClone(profile.studio)};}
function persistNow({retry=false,replaceRecovery=false,resetAudio=false}={}){
 if(pendingSaves>=2)return saveChain.then(()=>persistNow({retry,replaceRecovery,resetAudio}));
 clearTimeout(saveTimer);updateElapsed();const owner=profile,mixerOwner=mixer,generation=workingGeneration,frozen=snapshot(),frozenAudio=structuredClone(mixer);pendingSaves++;saveState('Saving on this device…');
 saveChain=saveChain.catch(()=>false).then(async()=>{
  if(owner!==profile)return false;
  if(memoryOnly&&!retry){saveState('Temporary play · export a backup to keep it');return true;}
  if(storageError&&!retry){saveState('Not saved · retry or export a backup');return false;}
  try{validateProfile(frozen,levels);validateAudio(frozenAudio);if(!db)db=await openStore();const revision=await writeProfile(db,frozen,owner.revision,{...(replaceRecovery?{baseline:originalRecovery}:{}),audio:frozenAudio,audioRevision:mixerOwner.revision,...(resetAudio&&audioRecovery!==undefined?{audioBaseline:audioRecovery}:{})});owner.revision=revision;mixerOwner.revision++;if(resetAudio)audioRecovery=undefined;
   if(owner!==profile)return false;memoryOnly=false;clearWarning();saveState(generation===workingGeneration?'Saved on this device':'Newer changes are waiting to save');return true;
  }catch(error){if(error.name==='InvalidStateError')db=null;if(owner===profile){warn(error);saveState('Not saved · your working copy is still here');}return false;}
 }).finally(()=>{pendingSaves--;});return saveChain;
}
function scheduleSave(){workingGeneration++;contextGeneration++;saveState(memoryOnly?'Temporary play · export a backup to keep it':'Changes waiting to save');clearTimeout(saveTimer);saveTimer=setTimeout(()=>{if(!storageError&&!transitionBusy)void persistNow();},200);}
async function transition(action){
 cancelTileContacts();
 if(transitionBusy)return false;updateElapsed();transitionBusy=true;restoreTask.cancel();contextGeneration++;
 const focus=document.activeElement,roots=[$('app-header'),$('game-shell'),...$$('dialog')],previous=roots.map(el=>el.inert);roots.forEach(el=>{el.inert=true;});$('operation-state').hidden=false;clockActive=false;syncAudio();
 try{return await action();}catch(error){if($('studio-dialog').open)status(error.message);else message(error.message);return false;}
 finally{transitionBusy=false;roots.forEach((el,i)=>{el.inert=previous[i];});$('operation-state').hidden=true;lastTick=performance.now();syncClock();
  if(focus?.isConnected&&focus.getClientRects().length&&!focus.disabled)focus.focus({preventScroll:true});else $('board').querySelector('.tile[aria-disabled="false"]')?.focus({preventScroll:true});}
}
function syncAudio(){soundscape.setActive(ready&&pagePresent&&!document.hidden&&!transitionBusy);}
function syncClock(){clockActive=ready&&screen==='play'&&!!run&&!run.complete&&!document.hidden&&!transitionBusy&&!document.querySelector('dialog[open]');syncAudio();homeMotion?.sync();}
function updateElapsed(){const now=performance.now(),diff=(now-lastTick)/1000;lastTick=now;if(clockActive)run=advanceElapsed(run,diff);syncClock();}
function stopEffects(){cancelAnimationFrame(soundFrame);clearTimeout(soundTimer);soundFrame=soundTimer=0;soundscape.stopGroup('effects');}
function stopAudio(){stopEffects();soundscape.pause();}
function openDialog(id){cancelTileContacts();updateElapsed();const d=$(id);if(!d.open)d.showModal();stopEffects();syncClock();}
function closeDialog(d){updateElapsed();d.close();lastTick=performance.now();syncClock();}
function confirm(title,description,action){$('confirm-title').textContent=title;$('confirm-description').textContent=description;confirmAction=action;openDialog('confirm-dialog');}
function formatTime(seconds){const n=Math.floor(seconds);return `${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`;}
function activeLevel(){return run.custom||levels.find(l=>l.id===run.levelId);}
function applySettings(){const s=profile.settings;document.body.classList.toggle('reduced-motion',s.reduceMotion);$('sound').checked=mixer.sound;$('music').checked=mixer.music;for(const [id,key]of [['music-volume','musicVolume'],['sound-volume','soundVolume']]){$(id).value=String(mixer[key]);$(id+'-value').textContent=mixer[key]+'%';}soundscape.configure(mixer);$('large-tiles').checked=s.largeTiles;$('reduce-motion').checked=s.reduceMotion;}
function makeFaceButton(tile,textView=false,existing){
 const b=existing||document.createElement('button');b.dataset.tile=tile.id;const free=isFree(tile,run.tiles),name=faceName(tile.face,profile.settings.theme,activeImages());
 b.setAttribute('aria-label',`${name}, column ${tile.x+1}, row ${tile.y+1}, layer ${tile.z+1}, ${free?'open':'blocked'}`);b.setAttribute('aria-pressed',String(selected===tile.id));b.setAttribute('aria-disabled',String(!free));
 if(textView)b.textContent=`${name} · ${tile.x+1},${tile.y+1},${tile.z+1}${free?' · open':' · blocked'}`;
 else{b.className='tile'+(free?'':' tile-blocked')+(hintIds.includes(tile.id)?' hinted':'');b.style.left=`calc(${tile.x} * (var(--tilew) + 4px) + ${tile.z*3}px)`;b.style.top=`calc(${tile.y} * (var(--tileh) + 4px) - ${tile.z*4}px + 10px)`;b.style.zIndex=String(tile.z*10+1);b.style.setProperty('--layer',tile.z);
  if(!existing){for(const side of ['back','right','bottom','left']){const plane=document.createElement('span');plane.className='tile-plane tile-'+side;plane.setAttribute('aria-hidden','true');b.append(plane);}const top=document.createElement('span');top.className='tile-plane tile-top';const f=document.createElement('span');f.className='tile-face';top.append(f);b.append(top);}
  if(b._face!==tile.face||b._theme!==profile.settings.theme||b._images!==activeImages()){renderFace(b.querySelector('.tile-face'),tile.face,profile.settings.theme,activeImages());b._face=tile.face;b._theme=profile.settings.theme;b._images=activeImages();}b.title=b.getAttribute('aria-label');}
 if(!existing&&textView)b.addEventListener('click',()=>{if(b.isConnected)choose(tile.id);});
 if(!existing&&!textView)b.addEventListener('keydown',e=>{if(!e.key.startsWith('Arrow'))return;e.preventDefault();const axis=['ArrowLeft','ArrowRight'].includes(e.key)?'x':'y',direction=['ArrowLeft','ArrowUp'].includes(e.key)?-1:1;const candidates=run.tiles.filter(t=>t.id!==tile.id&&Math.sign(t[axis]-tile[axis])===direction).sort((a,b)=>{const cost=t=>Math.abs(t[axis]-tile[axis])+Math.abs(t[axis==='x'?'y':'x']-tile[axis==='x'?'y':'x'])*5+Math.abs(t.z-tile.z);return cost(a)-cost(b);});if(candidates[0])$('board').querySelector(`[data-tile="${candidates[0].id}"]`)?.focus();});return b;
}
function renderBoard(){
 boardRevision++;
 const focused=document.activeElement?.closest('[data-tile]'),focus=focused?.dataset.tile,view=focused?.closest('#text-tiles')?'text-tiles':'board';
 if(renderedOriginal!==run.original){cancelTileContacts();$('board').replaceChildren();$('text-tiles').replaceChildren();renderedOriginal=run.original;}
 for(const [id,textView]of [['board',false],['text-tiles',true]]){const root=$(id),existing=new Map([...root.children].map(b=>[b.dataset.tile,b]));for(const t of run.tiles){const b=makeFaceButton(t,textView,existing.get(t.id));existing.delete(t.id);if(!b.parentNode)root.append(b);}for(const b of existing.values())b.remove();}
 $('remaining').textContent=run.tiles.length;const n=pairs(run.tiles).length;$('pair-count').textContent=n===1?'1 open pair':`${n} open pairs`;
 $('undo').disabled=!run.history.length;$('hint').disabled=run.complete;$('shuffle').disabled=run.complete;$('clock').textContent=formatTime(run.elapsed);
 fitBoard();if(focus){const same=$(view).querySelector(`[data-tile="${focus}"]`),next=$(view).querySelector('[data-tile][aria-disabled="false"]');(same||next)?.focus({preventScroll:true});}
}
function fitBoard(){
 if(!run||$('play-screen').hidden)return;
 const positions=run.original,cols=Math.max(...positions.map(t=>t.x))+1,rows=Math.max(...positions.map(t=>t.y))+1;
 const viewport=$('board-scroll'),available=Math.max(1,viewport.clientWidth-46),heightAvailable=Math.max(80,viewport.clientHeight-42);
 const width=profile.settings.largeTiles?74:Math.max(48,Math.min(74,Math.floor((available-16)/cols)-4,Math.floor((heightAvailable-22)/rows/1.28)-4)),height=Math.round(width*1.28),board=$('board');
 if(board.style.getPropertyValue('--tilew')!==width+'px')cancelTileContacts();
 board.style.setProperty('--tilew',width+'px');board.style.setProperty('--tileh',height+'px');board.style.width=(cols*(width+4)+16)+'px';board.style.height=(rows*(height+4)+30)+'px';
 $('board-size-label').textContent=board.offsetWidth>available?'Scroll to explore the full garden.':'No rush. One pair at a time.';
}
function renderThemes(){const focused=document.activeElement?.closest('.theme-choice')?.getAttribute('aria-label');const themes=[...themeInfo];if(activeImages().length>=2)themes.push(['custom','My images',`${activeImages().length} personal favorites`]);$('theme-choices').replaceChildren(...themes.map(([id,name,description])=>{const b=document.createElement('button');b.className='theme-choice'+(profile.settings.theme===id?' selected':'');b.setAttribute('aria-pressed',String(profile.settings.theme===id));b.setAttribute('aria-label',name+' tile collection');const text=document.createElement('span'),strong=document.createElement('strong'),small=document.createElement('small');strong.textContent=name;small.textContent=description;text.append(strong,small);const preview=document.createElement('span');preview.className='theme-preview';for(let i=0;i<3;i++){const f=document.createElement('span');renderFace(f,id==='traditional'?[28,14,31][i]:i,id,activeImages());preview.append(f);}const radio=document.createElement('span');radio.className='theme-radio';radio.setAttribute('aria-hidden','true');b.append(text,preview,radio);b.onclick=()=>{profile.settings.theme=id;selected=null;hintIds=[];renderThemes();renderBoard();message(`${name} tiles selected. Your board and pairs stay the same.`);scheduleSave();};return b;}));if(focused)$('theme-choices').querySelector('[aria-label="'+focused+'"]')?.focus({preventScroll:true});}
function renderJourney(){const level=activeLevel(),chapter=level.chapter||1,chapterLevels=levels.filter(l=>l.chapter===chapter),completed=chapterLevels.filter(l=>profile.progress[l.id]).length;renderScene(chapter);$('resume-detail').textContent=level.number?'LEVEL '+String(level.number).padStart(2,'0')+' · '+level.name:level.name;$('continue-label').textContent=profile.run?'Continue journey':'Begin journey';$('chapter-name').textContent=chapters[chapter-1];$('chapter-progress').textContent=`${completed} of 10 gardens explored`;$('chapter-bar').style.width=completed*10+'%';$('chapter-dots').replaceChildren(...chapterLevels.map(l=>{const b=document.createElement('button');b.textContent=String(l.number).padStart(2,'0');b.className=(profile.progress[l.id]?'done ':'')+(l.id===run.levelId?'current':'');b.setAttribute('aria-label',`${l.number}. ${l.name}${profile.progress[l.id]?', completed':''}`);b.onclick=()=>requestLevel(l);return b;}));$('level-number').textContent=level.number?String(level.number).padStart(2,'0'):'✧';$('level-name').textContent=level.name;$('chapter-eyebrow').textContent=level.number?`CHAPTER ${words[chapter-1]} / ${chapters[chapter-1].toUpperCase()}`:'YOUR OWN LITTLE GARDEN';renderLibrary();}
function renderLibrary(){const groups=chapters.map((name,index)=>{const section=document.createElement('section');section.className='chapter-group';const title=document.createElement('h3');title.textContent=`${String(index+1).padStart(2,'0')} / ${name}`;const grid=document.createElement('div');grid.className='level-grid';for(const l of levels.filter(x=>x.chapter===index+1)){const b=document.createElement('button');b.className='level-card'+(run.levelId===l.id?' active':'');b.setAttribute('aria-label',`Level ${l.number}: ${l.name}, ${l.positions.length} tiles, ${profile.progress[l.id]||0} stars`);const mini=document.createElement('span');mini.className='mini-board';for(let x=0;x<8;x++){const bar=document.createElement('span');bar.style.height=8+l.positions.filter(p=>p.x===x).length*1.7+'px';mini.append(bar);}const num=document.createElement('small');num.textContent=`LEVEL ${String(l.number).padStart(2,'0')} · ${l.positions.length} TILES`;const label=document.createElement('strong');label.textContent=l.name;const st=document.createElement('span');st.className='card-stars';st.textContent=profile.progress[l.id]?'★'.repeat(profile.progress[l.id]):'○ ○ ○';b.append(mini,num,label,st);b.onclick=()=>requestLevel(l);grid.append(b);}section.append(title,grid);return section;});$('level-library').replaceChildren(...groups);}
async function startLevel(level){if(editorBusy||transitionBusy)return false;const candidate=newRun(level,crypto.getRandomValues(new Uint32Array(1))[0],level.number===1?6:Math.min(24,8+Math.floor((level.number||20)/3)));return transition(async()=>{if(!await persistNow())return false;run=candidate;selected=null;hintIds=[];for(const d of $$('dialog[open]'))closeDialog(d);workingGeneration++;renderJourney();renderBoard();showScreen('play',{focus:false});message(level.goal||'Your personal garden is ready. Match two identical open tiles.');return persistNow();});}
function requestLevel(level){if(run?.levelId===level.id){closeDialog($('levels-dialog'));showScreen('play');return;}if(run&&!run.complete&&(run.matches>0||run.shuffles>0))confirm('Follow a new path?','Your current board will be replaced. Your completed gardens and studio draft stay saved.',()=>startLevel(level));else void startLevel(level);}
function queueSound(kind='match'){const owner=boardRevision;cancelAnimationFrame(soundFrame);clearTimeout(soundTimer);soundFrame=requestAnimationFrame(()=>{soundTimer=setTimeout(()=>{soundFrame=soundTimer=0;if(owner===boardRevision&&!document.hidden&&!transitionBusy&&(kind==='celebrate'?run.complete&&$('win-dialog').open:canPlay()))soundscape.effect(kind);},0);});}

const canPlay=()=>ready&&screen==='play'&&run&&!transitionBusy&&!document.hidden&&!document.querySelector('dialog[open]');
function choose(id){if(!canPlay()||run.complete)return;const tile=run.tiles.find(t=>t.id===id);if(!tile)return;if(!isFree(tile,run.tiles)){message(run.tiles.some(t=>t.x===tile.x&&t.y===tile.y&&t.z>tile.z)?'This tile is covered. Clear the tile above it first.':'Both sides of this tile are blocked. Open its left or right side first.');return;}hintIds=[];if(selected===id){selected=null;message('Selection cleared. Take your time.');renderBoard();return;}if(!selected){selected=id;message(`${faceName(tile.face,profile.settings.theme,activeImages())} selected. Find its open match.`);renderBoard();return;}
 updateElapsed();const next=match(run,selected,id);if(next===run){selected=id;message('Different symbols. This tile is selected; find its exact match.');renderBoard();return;}
 run=next;selected=null;renderBoard();scheduleSave();if(run.complete)complete({celebrate:true});else{queueSound();if(!pairs(run.tiles).length)message('No open pairs. Undo a move or reshuffle to find a fresh path.');else message(`${run.matches} ${run.matches===1?'pair':'pairs'} cleared. Keep going, one pair at a time.`);}}
function complete({celebrate=false}={}){const rating=stars(run);if(!run.custom)profile.progress[run.levelId]=Math.max(profile.progress[run.levelId]||0,rating);renderJourney();$('win-description').textContent=`${activeLevel().name} is complete. Take a breath; you earned it.`;$('win-stars').textContent='★'.repeat(rating)+'☆'.repeat(3-rating);$('win-stars').setAttribute('aria-label',`${rating} of 3 stars`);$('win-stats').textContent=`${scoreRun(run)} points · ${run.matches} pairs · ${formatTime(run.elapsed)} · ${run.hints} hints · ${run.shuffles} reshuffles`;const base=balancedScore({pairs:run.original.length/2,hints:run.hints,shuffles:run.shuffles});$('win-score-detail').textContent=`${base.toLocaleString('en-US')} base + ${(scoreRun(run)-base).toLocaleString('en-US')} time bonus`;$('next-level').textContent=activeLevel().number===60?'Explore the gardens again →':run.custom?'Return to the main garden →':'On to the next garden →';message('Garden cleared. A little more space to breathe.');openDialog('win-dialog');if(!run.custom)void prepareWinScore();else{$('leaderboard-entry').hidden=true;$('leaderboard-result').hidden=true;$('win-score-retry').hidden=true;}if(celebrate)queueSound('celebrate');void persistNow();}
function doHint(){cancelTileContacts();if(!canPlay()||run.complete)return;const options=pairs(run.tiles);if(!options.length){message('No open pairs. Undo or reshuffle to open a fresh path.');return;}const nextHint=options[0].map(t=>t.id);if(hintIds.length===2&&nextHint.every(id=>hintIds.includes(id))){message('This pair is already highlighted. No extra hint cost.');return;}run={...run,hints:Math.min(100000,run.hints+1)};selected=null;hintIds=nextHint;renderBoard();message(`Try the two highlighted ${faceName(options[0][0].face,profile.settings.theme,activeImages())} tiles. One hint reduces points by about ${Math.ceil(4000/(run.original.length/2))}; this run can earn two stars.`);scheduleSave();}
function doUndo(){cancelTileContacts();if(!canPlay())return;updateElapsed();const next=undo(run);if(next===run){message('No moves to undo yet.');return;}run=next;selected=null;hintIds=[];renderBoard();message('Your last move is restored. Hint and reshuffle use still counts toward stars.');scheduleSave();}
function doShuffle(){cancelTileContacts();if(!canPlay()||run.complete)return;try{updateElapsed();run=reshuffle(run);selected=null;hintIds=[];renderBoard();message('A fresh, solvable arrangement. Reshuffle costs 2,000 points; this run can earn one star.');scheduleSave();}catch(e){message(e.message+' Undo your last move, or restart this garden.');}}
function writeEditor(layout,{resetHistory=false}={}) {
 const source=$('studio-source');source.dataset.id=layout.id;source.querySelector('h2').textContent=layout.name;$('layout-name').value=layout.name;
 source.querySelector('ul').replaceChildren(...layout.positions.map(p=>{const li=document.createElement('li');li.dataset.tile=p.id;li.dataset.x=p.x;li.dataset.y=p.y;li.dataset.z=p.z;li.textContent=`Column ${p.x+1}, row ${p.y+1}, layer ${p.z+1}`;return li;}));
 if(resetHistory)history.clear();editorGeneration++;renderEditor();
}
function changeEditor(mutator){if(editorBusy||transitionBusy)return;history.push(draftFromDOM());const layout=draftFromDOM().layout;mutator(layout);writeEditor(layout);status('Draft changed. Saving on this device…');scheduleSave();}
function renderEditor(){
 const generation=editorGeneration,editingLayer=layer,focused=document.activeElement?.closest('#editor-grid button'),focus=focused?{x:focused.dataset.x,y:focused.dataset.y}:null,positions=draftFromDOM().layout.positions;
 $$('[data-layer]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.layer===layer)));
 $('editor-grid').replaceChildren(...Array.from({length:48},(_,i)=>{
  const x=i%8,y=Math.floor(i/8),current=positions.find(p=>p.x===x&&p.y===y&&p.z===layer),under=positions.some(p=>p.x===x&&p.y===y&&p.z===layer-1),above=positions.some(p=>p.x===x&&p.y===y&&p.z>layer);
  const b=document.createElement('button');b.className='editor-cell'+(current?' occupied':'')+(under&&!current?' supported':'')+(above?' covered':'');b.dataset.x=x;b.dataset.y=y;b.setAttribute('aria-label',`Column ${x+1}, row ${y+1}, layer ${layer+1}, ${current?'tile present':'empty'}${above?', supports upper tile':''}`);b.setAttribute('aria-pressed',String(!!current));b.disabled=editorBusy;
  b.onclick=()=>{if(editorBusy||transitionBusy||generation!==editorGeneration||editingLayer!==layer)return;if(!current&&layer>0&&!under){status('Add a tile on the layer below first.');return;}if(current&&above){status('Remove the tile above before removing its support.');return;}changeEditor(layout=>{if(current)layout.positions=layout.positions.filter(p=>p.id!==current.id);else layout.positions.push({id:`t-${x}-${y}-${layer}`,x,y,z:layer});});};
  b.onkeydown=e=>{const delta={ArrowLeft:-1,ArrowRight:1,ArrowUp:-8,ArrowDown:8}[e.key];if(delta){e.preventDefault();$('editor-grid').children[Math.max(0,Math.min(47,i+delta))]?.focus();}};return b;
 }));
 $('editor-count').textContent=`${positions.length} tiles · ${positions.length%2?'add one for an even pair count':positions.length/2+' pairs'}`;$('editor-undo').disabled=editorBusy||!history.past.length;$('editor-redo').disabled=editorBusy||!history.future.length;
 if(focus&&!editorBusy)$('editor-grid').querySelector(`[data-x="${focus.x}"][data-y="${focus.y}"]`)?.focus({preventScroll:true});
}
function openStudio(){if(transitionBusy)return;contextGeneration++;restoreTask.cancel();if(!editorReady){editorImages=structuredClone(profile.studio.images);editorReady=true;writeEditor(profile.studio.layout,{resetHistory:true});}renderImages();status('Use an even number of supported tiles to play. Drafts can be saved unfinished.');openDialog('studio-dialog');}
function renderImages(){
 $('image-previews').replaceChildren(...editorImages.map((image,i)=>{const figure=document.createElement('figure'),img=document.createElement('img'),caption=document.createElement('figcaption'),remove=document.createElement('button');img.src=image.data;img.alt=image.name;caption.textContent=image.name;remove.textContent='×';remove.disabled=editorBusy;remove.setAttribute('aria-label','Remove '+image.name);remove.onclick=()=>{if(editorBusy||transitionBusy)return;history.push(draftFromDOM());editorImages=editorImages.filter((_,n)=>n!==i).map((im,n)=>({...im,id:`image-${n}`}));imageChanged();};figure.append(img,caption,remove);return figure;}));
 $('image-count').textContent=editorImages.length?`${editorImages.length} personal images · ${Math.round(editorImages.reduce((a,i)=>a+i.data.length,0)/1024)} KB on this device`:'No personal images yet.';$('use-images').disabled=editorImages.length<2||editorBusy;$('clear-images').disabled=!editorImages.length||editorBusy;$('image-upload').disabled=editorBusy;
}
function imageChanged(){editorGeneration++;if(editorImages.length<2&&profile.settings.theme==='custom')profile.settings.theme='traditional';renderImages();renderEditor();renderThemes();renderBoard();scheduleSave();}
let busyControls=[];
function setEditorBusy(value){
 editorBusy=value;$('studio-dialog').setAttribute('aria-busy',String(value));$('cancel-import').hidden=!value;
 if(value){busyControls=[...$('studio-dialog').querySelectorAll('input,button')].filter(el=>!['studio-close','cancel-import','studio-backup','studio-temporary'].includes(el.id)).map(el=>[el,el.disabled]);busyControls.forEach(([el])=>{el.disabled=true;});}
 else{busyControls.forEach(([el,disabled])=>{if(el.isConnected)el.disabled=disabled;});busyControls=[];renderEditor();renderImages();}
}
function cancelImageWork(text='Import canceled. Your previous draft and images are intact.'){imageTask.cancel();if(editorBusy)setEditorBusy(false);status(text);}
async function editorJob(work){
 if(editorBusy||transitionBusy)return;const ticket=imageTask.begin(),generation=editorGeneration;setEditorBusy(true);status('Preparing your file on this device… You can cancel this operation.');
 const timer=setTimeout(()=>cancelImageWork('Import timed out. Your previous draft and images are intact.'),45000);
 try{await work(ticket,generation);}catch(error){if(imageTask.current(ticket))status('Your previous draft is intact. '+error.message);}
 finally{clearTimeout(timer);if(imageTask.current(ticket))setEditorBusy(false);}
}
async function convertImage(file,ticket){
 if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>5*1024*1024)throw Error('Choose PNG, JPEG or WebP images, up to 5 MB each.');
 const bytes=await bounded(file.arrayBuffer(),{signal:ticket.signal,label:'Reading image'});imageDimensions(bytes,file.type);imageTask.assert(ticket);
 const bitmap=await bounded(createImageBitmap(file),{signal:ticket.signal,label:'Decoding image',dispose:bitmap=>bitmap.close()});
 try{imageTask.assert(ticket);if(bitmap.width*bitmap.height>16000000)throw Error('Image exceeds 16 megapixels.');const scale=Math.min(1,160/bitmap.width,160/bitmap.height),canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(bitmap.width*scale));canvas.height=Math.max(1,Math.round(bitmap.height*scale));canvas.getContext('2d').drawImage(bitmap,0,0,canvas.width,canvas.height);const data=canvas.toDataURL('image/png');if(data.length>250000)throw Error('This image is too detailed; choose a smaller image.');return{id:'',name:file.name.replace(/\.[^.]+$/,'').slice(0,80)||'My image',data};}finally{bitmap.close();}
}
async function validateDecodedImages(images,signal){
 for(const image of images){const bytes=Uint8Array.from(atob(image.data.slice(22)),c=>c.charCodeAt(0)),blob=new Blob([bytes],{type:'image/png'}),bitmap=await bounded(createImageBitmap(blob),{signal,label:'Decoding saved image',dispose:bitmap=>bitmap.close()});const valid=bitmap.width>0&&bitmap.width<=160&&bitmap.height>0&&bitmap.height<=160;bitmap.close();if(!valid)throw Error('Imported image must be at most 160 × 160 pixels.');}
}
function download(name,value){const blob=new Blob([JSON.stringify(value,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
async function readFile(input,max=8500000,signal){const file=input.files[0];if(!file)return null;if(file.size>max)throw Error(`File is too large. Maximum size is ${max/1000000} MB.`);return bounded(file.text(),{signal,label:'Reading file'});}
async function closeStudio(){
 if(transitionBusy)return;if(editorBusy)cancelImageWork();
 return transition(async()=>{if(await persistNow()){closeDialog($('studio-dialog'));message(memoryOnly?'Your draft is in memory. Export a backup before closing this tab.':'Your studio draft is saved. A little space to make your own.');return true;}status('Your draft is still here. Select Save draft to retry, or Export game backup to keep a copy.');return false;});
}
function studioPlayable(){const data=draftFromDOM();try{const layout=validateLayout(data.layout),solved=solveGeometry(layout.positions);if(solved.status!=='solved')throw Error(solved.status==='budget'?'Search limit reached. Simplify this layout before playing.':'This layout cannot be cleared. Open the upper layers or outside edges.');$('layout-name').removeAttribute('aria-invalid');return layout;}catch(error){$('layout-name').setAttribute('aria-invalid',String(!data.layout.name.trim()));throw error;}}

function bind(){
 $('win-score-retry').onclick=()=>void prepareWinScore();$('leaderboard-load-retry').onclick=()=>void openLeaderboard();
 $('leaderboard-dialog').addEventListener('close',()=>{const win=$('win-dialog'),focus=document.activeElement;if(win.open&&(!win.contains(focus)||focus.disabled||!focus.getClientRects().length))$('next-level').focus();});
 $$('[data-leaderboard]').forEach(b=>{b.onclick=()=>void openLeaderboard();for(const event of ['pointerenter','pointerdown','focus'])b.addEventListener(event,warmLeaderboard,{passive:true});});
 $$('[data-open]').forEach(b=>b.onclick=()=>{if(!transitionBusy)openDialog(b.dataset.open);});$$('[data-close]').forEach(b=>b.onclick=()=>{if(!transitionBusy)closeDialog(b.closest('dialog'));});
 $$('dialog').forEach(d=>{const title=d.querySelector('h2');if(title){title.id||=d.id+'-title';d.setAttribute('aria-labelledby',title.id);d.removeAttribute('aria-label');}d.addEventListener('close',()=>{lastTick=performance.now();if(d.id==='settings-dialog')restoreTask.cancel();if(d.id==='confirm-dialog')confirmAction=null;syncClock();});});
 $('studio-dialog').addEventListener('cancel',event=>{event.preventDefault();void closeStudio();});$('studio-close').onclick=()=>void closeStudio();$('cancel-import').onclick=()=>cancelImageWork();
 $('nav-studio').onclick=openStudio;$('studio-callout').onclick=openStudio;$('nav-play').onclick=()=>{if(!transitionBusy){showScreen('title');void persistNow();}};$('continue-game').onclick=()=>{if(!transitionBusy)showScreen('play');};$('title-studio').onclick=openStudio;
 $('confirm-cancel').onclick=()=>{confirmAction=null;closeDialog($('confirm-dialog'));};$('confirm-ok').onclick=()=>{const action=confirmAction;confirmAction=null;closeDialog($('confirm-dialog'));void action?.();};
 $('hint').onclick=doHint;$('undo').onclick=doUndo;$('shuffle').onclick=doShuffle;
 $('restart').onclick=()=>{if(canPlay())confirm('Start this garden afresh?','The clock, hints and moves for this board will reset. Your completed gardens and studio stay saved.',()=>startLevel(activeLevel()));};
 $('next-level').onclick=()=>void startLevel(levels[(activeLevel().number||0)%60]);
 document.addEventListener('keydown',event=>{if(!ready||transitionBusy||document.hidden||document.querySelector('dialog[open]')||event.ctrlKey||event.metaKey||event.altKey||event.repeat||/INPUT|TEXTAREA|SELECT/.test(event.target.tagName)||event.target.isContentEditable)return;if(event.key.toLowerCase()==='h'){event.preventDefault();doHint();}else if(event.key.toLowerCase()==='u'){event.preventDefault();doUndo();}else if(event.key==='Escape'){cancelTileContacts();selected=null;hintIds=[];renderBoard();message('Selection cleared.');}});
 for(const [id,key]of [['large-tiles','largeTiles'],['reduce-motion','reduceMotion']])$(id).onchange=()=>{if(transitionBusy)return;profile.settings[key]=$(id).checked;applySettings();fitBoard();scheduleSave();};
 for(const [id,key]of [['music','music'],['sound','sound'],['music-volume','musicVolume'],['sound-volume','soundVolume']])$(id).addEventListener('input',()=>{if(transitionBusy)return;mixer[key]=$(id).type==='checkbox'?$(id).checked:Number($(id).value);applySettings();scheduleSave();void soundscape.unlock();});
 $('audio-reset').onclick=()=>{if(transitionBusy)return;mixer={...defaultAudio(),revision:mixer.revision};applySettings();if(hasRecovery){$('audio-status').textContent='Audio reset in memory. Export your existing game recovery before saving fresh.';return;}void transition(()=>persistNow({retry:true,resetAudio:true}));};
 $('audio-preview').onclick=()=>{if(!mixer.sound||!mixer.soundVolume){$('audio-status').textContent='Turn on sound effects and raise their volume to preview.';return;}void soundscape.unlock().then(ok=>{if(ok&&$('settings-dialog').open&&!document.hidden)soundscape.effect('celebrate');});};
 const unlockAudio=e=>{if(e.isTrusted&&(e.type!=='keydown'||['Enter',' '].includes(e.key)))void soundscape.unlock();};
 for(const type of ['click','pointerup','keydown'])document.addEventListener(type,unlockAudio,{capture:true});
 $('retry-save').onclick=()=>{if(hasRecovery)confirm('Save a fresh game?','The old record is incompatible. Export its original backup first. Saving fresh replaces it with your current temporary game.',()=>transition(async()=>{if(await persistNow({retry:true,replaceRecovery:true})){hasRecovery=false;originalRecovery=null;$('retry-save').textContent='Retry save';return true;}return false;}));else void transition(()=>persistNow({retry:true}));};
 $('recovery-export').onclick=()=>download('mahjong-garden-recovery.json',{format:'mahjong-garden-backup',version:1,profile:hasRecovery?originalRecovery:snapshot()});
 $('memory-play').onclick=()=>{memoryOnly=true;saveState('Temporary play · export a backup to keep it');$('save-warning-text').textContent='Playing without saving. Export a backup before closing this tab.';message('Temporary play is ready. Your existing stored data stays intact.');};
 $('studio-temporary').onclick=()=>{cancelImageWork();memoryOnly=true;saveState('Temporary play · export a backup to keep it');closeDialog($('studio-dialog'));$('save-warning-text').textContent='Playing without saving. Export a backup before closing this tab.';};
 $('studio-backup').onclick=()=>{download('mahjong-garden-backup.json',gameBackup());status('Game backup exported, including your unfinished draft and personal images.');};
 $('export-profile').onclick=()=>{download('mahjong-garden-backup.json',gameBackup());$('settings-status').textContent='Game backup exported. It includes your progress, layout and personal images.';};
 $('import-profile').onchange=async()=>{
  const ticket=restoreTask.begin(),context=contextGeneration,current=()=>restoreTask.current(ticket)&&context===contextGeneration&&$('settings-dialog').open;
  $('settings-status').textContent='Checking the backup. Your current game is still intact.';
  try{const text=await readFile($('import-profile'),18000000,ticket.signal);if(!text)return;const imported=parseBackup(text,levels),candidate=imported.profile;await validateDecodedImages(candidate.studio.images,ticket.signal);if(!current())return;
   confirm('Restore this game backup?','This replaces your current local progress, board, studio draft and personal images. Export your current backup first if you want to keep it.',()=>{
    if(!current()){ $('settings-status').textContent='The game changed while reading this backup. Choose the file again.';return;}
    return transition(async()=>{
     if(!await persistNow())return false;
     const owner=profile,prepared=structuredClone(candidate);prepared.run??=newRun(levels[0]);prepared.revision=owner.revision;const preparedAudio=imported.audio?{...imported.audio,revision:mixer.revision}:structuredClone(mixer);
     try{validateProfile(prepared,levels);if(!memoryOnly){if(!db)db=await openStore();prepared.revision=await writeProfile(db,prepared,owner.revision,{audio:preparedAudio,audioRevision:mixer.revision});preparedAudio.revision++;}}
     catch(error){warn(error);$('settings-status').textContent='Restore failed. The previous working game and draft are intact.';return false;}
     if(owner!==profile)return false;profile=prepared;mixer=preparedAudio;run=prepared.run;editorReady=false;selected=null;hintIds=[];workingGeneration++;applySettings();renderThemes();renderJourney();renderBoard();closeDialog($('settings-dialog'));message(memoryOnly?'Your backup is restored for temporary play. Export before closing this tab.':'Your game backup is restored. Welcome back.');saveState(memoryOnly?'Temporary play · export a backup to keep it':'Saved on this device');if(run.complete)complete();return true;
    });
   });
  }catch(error){if(current()&&error.name!=='AbortError')$('settings-status').textContent=error.message;}
  finally{if(restoreTask.current(ticket))$('import-profile').value='';}
 };
 $$('[data-layer]').forEach(b=>b.onclick=()=>{if(!editorBusy&&!transitionBusy){layer=+b.dataset.layer;renderEditor();}});
 $('layout-name').oninput=()=>{if(editorBusy||transitionBusy)return;$('studio-source').querySelector('h2').textContent=$('layout-name').value;editorGeneration++;renderEditor();scheduleSave();};
 const restoreStudio=draft=>{if(!draft)return;editorImages=draft.images;writeEditor(draft.layout);imageChanged();status('The layout and personal image collection have been restored.');};
 $('editor-undo').onclick=()=>{if(!editorBusy&&!transitionBusy)restoreStudio(history.undo(draftFromDOM()));};$('editor-redo').onclick=()=>{if(!editorBusy&&!transitionBusy)restoreStudio(history.redo(draftFromDOM()));};
 $('editor-template').onclick=()=>changeEditor(layout=>{layout.positions=template();});
 $('editor-save').onclick=()=>{if(editorBusy||transitionBusy)return;if(hasRecovery){status('Your original incompatible save is retained. Export a game backup or choose temporary play; Save fresh game in the recovery banner replaces it deliberately.');return;}void transition(async()=>{const result=await persistNow({retry:true});status(result?'Draft saved on this device.':'Save failed. Your draft remains here; export a game backup to keep it.');return result;});};
 $('editor-play').onclick=async()=>{if(editorBusy||transitionBusy)return;try{const layout=studioPlayable();if(run&&!run.complete&&run.matches>0)confirm('Play your personal garden?','Your current board will be replaced. Completed levels and your layout draft stay saved.',()=>startLevel(layout));else await startLevel(layout);}catch(error){status(error.message);}};
 $('editor-export').onclick=()=>{if(editorBusy||transitionBusy)return;try{const layout=studioPlayable();download('mahjong-garden-studio.json',{format:'mahjong-garden-studio',version:1,layout,images:editorImages});status('Studio file exported, including your layout and personal images.');}catch(error){status(error.message+' Export a game backup to preserve an unfinished draft.');}};
 $('editor-import').onchange=()=>void editorJob(async(ticket,generation)=>{
  try{const text=await readFile($('editor-import'),8500000,ticket.signal);if(!text)return;const candidate=validateImport(text);await validateDecodedImages(candidate.images,ticket.signal);imageTask.assert(ticket);if(generation!==editorGeneration)throw abortError('Your draft changed while importing. Import again.');history.push(draftFromDOM());editorImages=structuredClone(candidate.images);writeEditor(candidate.layout);imageChanged();status('Studio file imported. Undo restores the previous layout and images.');if(!await persistNow())status('Imported into your working draft. Saving failed; retry or export to keep it.');}finally{if(imageTask.current(ticket))$('editor-import').value='';}
 });
 $('image-upload').onchange=()=>void editorJob(async(ticket,generation)=>{
  try{const files=[...$('image-upload').files];if(editorImages.length+files.length>36)throw Error('Use no more than 36 images in a collection.');const converted=[];for(const file of files){converted.push(await convertImage(file,ticket));imageTask.assert(ticket);}if(generation!==editorGeneration)throw abortError('Your draft changed while preparing images.');const candidate=[...editorImages,...converted].map((image,i)=>({...image,id:`image-${i}`}));validateImages(candidate);history.push(draftFromDOM());editorImages=candidate;imageChanged();status(`${converted.length} images added. Choose Use my image tiles. Undo restores the previous collection.`);if(!await persistNow())status('Images are in your working draft. Saving failed; retry or export to keep them.');}finally{if(imageTask.current(ticket))$('image-upload').value='';}
 });
 $('use-images').onclick=()=>{if(editorBusy||transitionBusy||editorImages.length<2)return;profile.settings.theme='custom';renderThemes();renderBoard();status('Your personal images are now the active tile collection.');scheduleSave();};
 $('clear-images').onclick=()=>{if(editorBusy||transitionBusy)return;confirm('Clear your personal images?','This removes the collection from this browser. Export a studio file first to keep a copy.',()=>{history.push(draftFromDOM());editorImages=[];imageChanged();status('Personal image collection cleared. Undo can restore it.');});};
 cancelTileContacts=tileInput($('board'),{activate:choose,enabled:canPlay});
 homeMotion=homeParallax($('world-backdrop'),{enabled:()=>ready&&screen==='title'&&!profile.settings.reduceMotion&&!transitionBusy&&pagePresent&&!document.querySelector('dialog[open]')});
 window.addEventListener('blur',()=>cancelTileContacts());
 $('board-scroll').addEventListener('scroll',()=>cancelTileContacts(),{passive:true});
 window.addEventListener('resize',()=>cancelTileContacts());
 const observer=typeof ResizeObserver==='function'?new ResizeObserver(()=>{cancelTileContacts();fitBoard();}):null;observer?.observe($('board-scroll'));if(!observer)window.addEventListener('resize',fitBoard);
 let timer;const startTimer=()=>{if(!timer)timer=setInterval(()=>{updateElapsed();if(run)$('clock').textContent=formatTime(run.elapsed);if(clockActive&&!transitionBusy&&++clockSave>=15){clockSave=0;if(!storageError)void persistNow();}},1000);};startTimer();
 window.addEventListener('pagehide',()=>{pagePresent=false;cancelTileContacts();updateElapsed();stopAudio();imageTask.cancel();restoreTask.cancel();contextGeneration++;clearInterval(timer);timer=null;observer?.disconnect();if(!transitionBusy)void persistNow();});
 window.addEventListener('pageshow',()=>{pagePresent=true;if(editorBusy)setEditorBusy(false);lastTick=performance.now();syncClock();observer?.observe($('board-scroll'));startTimer();});
 document.addEventListener('visibilitychange',()=>{updateElapsed();if(document.hidden){cancelTileContacts();stopAudio();selected=null;hintIds=[];imageTask.cancel();restoreTask.cancel();contextGeneration++;if(editorBusy)setEditorBusy(false);if(!transitionBusy)void persistNow();}else if(ready)renderBoard();syncClock();});
}
async function loadLibrary(){
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),10000);
 try{const response=await fetch(new URL('./content/levels.html',import.meta.url),{signal:controller.signal,redirect:'error'});if(!response.ok)throw Error('Level library could not load.');const reader=response.body.getReader(),chunks=[];let bytes=0;while(true){const {value,done}=await reader.read();if(done)break;bytes+=value.length;if(bytes>1000000){await reader.cancel();throw Error('Level library exceeds its size limit.');}chunks.push(value);}const content=new Uint8Array(bytes);let offset=0;for(const chunk of chunks){content.set(chunk,offset);offset+=chunk.length;}return parseCampaign(new DOMParser().parseFromString(new TextDecoder().decode(content),'text/html'));}
 finally{clearTimeout(timer);}
}
async function init(){
 $('load-retry').onclick=()=>location.reload();$('app-header').inert=true;$('game-shell').inert=true;document.body.setAttribute('aria-busy','true');
 try{
  levels=await loadLibrary();
  try{db=await openStore();const saved=await readProfile(db);if(saved!==null){try{const candidate=validateProfile(saved,levels),ticket=restoreTask.begin();try{await bounded(validateDecodedImages(candidate.studio.images,ticket.signal),{milliseconds:45000,signal:ticket.signal,label:'Preparing saved images'});restoreTask.assert(ticket);profile=candidate;}finally{restoreTask.cancel();}}catch(error){profile.revision=Number.isSafeInteger(saved?.revision)&&saved.revision>=0?saved.revision:0;hasRecovery=true;originalRecovery=structuredClone(saved);warn(Error('Your existing saved data was kept intact. '+error.message+' Export a backup before saving fresh.'));$('retry-save').textContent='Save fresh game';}}}catch(error){warn(error);}
  if(db){try{const savedAudio=await readProfile(db,{key:'audio'});if(savedAudio!==null){audioRecovery=structuredClone(savedAudio);mixer=validateAudio(savedAudio);audioRecovery=undefined;}}catch(error){warn(Error('Audio preferences were kept intact. '+error.message));}}
  renderScene(1);run=profile.run||newRun(levels[0],crypto.getRandomValues(new Uint32Array(1))[0],6);ready=true;applySettings();renderThemes();renderJourney();renderBoard();bind();void import('./pwa.mjs').then(({startUpdates})=>startUpdates({beforeUpdate:async()=>{if(!ready||transitionBusy||editorBusy||memoryOnly||hasRecovery||audioRecovery!==undefined)throw Error('Finish or cancel the current operation, then save or export your game before updating.');if(!await persistNow()||storageError||memoryOnly)throw Error('Your game could not be saved. Use Retry save or Export backup before updating.');cancelTileContacts();stopAudio();transitionBusy=true;clockActive=false;document.body.inert=true;$('operation-state').textContent='Your game is saved. Updating…';$('operation-state').hidden=false;return true;}})).catch(()=>{$('update-status').textContent='Update checks are unavailable. Reload when your game is saved.';});$('app-header').inert=false;$('game-shell').inert=false;$('load-state').hidden=true;document.body.removeAttribute('aria-busy');lastTick=performance.now();syncClock();if(profile.run)message('Welcome back. Your garden is just as you left it.');if(run.complete)complete();if(!storageError)await persistNow();
 }catch(error){ready=false;clockActive=false;document.body.removeAttribute('aria-busy');$('load-title').textContent='The garden could not load.';$('load-description').textContent=error.name==='AbortError'?'Loading timed out. Check your connection and try again.':error.message;$('load-retry').hidden=false;$('load-state').setAttribute('role','alert');}
}
void init();
