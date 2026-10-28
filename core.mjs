export const RULES='mg-rules-1';
export const LIMITS={tiles:144,images:36,imageBytes:250000,importBytes:8500000};
const int=(n,a,b)=>Number.isInteger(n)&&n>=a&&n<=b;
export function rng(seed){let n=seed>>>0;return()=>{n+=0x6d2b79f5;let t=Math.imul(n^n>>>15,1|n);t^=t+Math.imul(t^t>>>7,61|t);return((t^t>>>14)>>>0)/4294967296;};}
export function shuffled(a,random){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export function validatePositions(positions,{studio=false}={}){
 if(!Array.isArray(positions)||positions.length<4||positions.length>144||positions.length%2)throw Error('Use an even number of tiles, from 4 to 144.');
 const ids=new Set(),coords=new Set();
 for(const p of positions){if(!p||Object.keys(p).some(k=>!['id','x','y','z'].includes(k))||!int(p.x,0,studio?7:11)||!int(p.y,0,studio?5:9)||!int(p.z,0,2)||typeof p.id!=='string'||!/^t-\d+-\d+-\d+$/.test(p.id)||p.id!==`t-${p.x}-${p.y}-${p.z}`||ids.has(p.id))throw Error('Invalid or duplicate tile identity.');const c=`${p.x},${p.y},${p.z}`;if(coords.has(c))throw Error('Two tiles occupy one space.');ids.add(p.id);coords.add(c);}
 for(const p of positions)if(p.z>0&&!coords.has(`${p.x},${p.y},${p.z-1}`))throw Error('Every upper tile needs a tile directly underneath.');
 return positions.map(p=>({id:p.id,x:p.x,y:p.y,z:p.z}));
}
export function isFree(tile,tiles){return !tiles.some(p=>p.id!==tile.id&&p.x===tile.x&&p.y===tile.y&&p.z>tile.z)&&(!tiles.some(p=>p.z===tile.z&&p.y===tile.y&&p.x===tile.x-1)||!tiles.some(p=>p.z===tile.z&&p.y===tile.y&&p.x===tile.x+1));}
export function freeTiles(tiles){return tiles.filter(t=>isFree(t,tiles));}
export function pairs(tiles){const free=freeTiles(tiles),result=[];for(let i=0;i<free.length;i++)for(let j=i+1;j<free.length;j++)if(free[i].face===free[j].face)result.push([free[i],free[j]]);return result;}
export function solveGeometry(positions,budget=30000,random=null){
 if(!Array.isArray(positions)||positions.length>144||!Number.isInteger(budget)||budget<0||budget>30000)throw Error('Search input exceeds its supported bounds.');
 let nodes=0,exhausted=false;const failed=new Set();
 function solve(remaining){if(!remaining.length)return[];if(++nodes>budget){exhausted=true;return null;}const key=remaining.map(t=>t.id).join('|');if(failed.has(key))return null;
  const ordered=freeTiles(remaining).sort((a,b)=>b.z-a.z||a.y-b.y||a.x-b.x),free=random?shuffled(ordered,random):ordered;
  for(let i=0;i<free.length;i++)for(let j=i+1;j<free.length;j++){
   const a=free[i],b=free[j];const next=remaining.filter(t=>t.id!==a.id&&t.id!==b.id);const tail=solve(next);if(tail)return[[a.id,b.id],...tail];if(exhausted)return null;
  }failed.add(key);return null;
 }
 const path=solve([...positions]);return{status:path?'solved':exhausted?'budget':'impossible',path,nodes};
}
export function deal(positions,seed,variety=18){
 let solution=solveGeometry(positions,1200,rng(seed));if(solution.status!=='solved')solution=solveGeometry(positions);if(solution.status!=='solved')throw Error(solution.status==='budget'?'This layout needs more search. Try a simpler arrangement.':'This layout cannot be cleared in pairs.');
 const random=rng(seed),faces=shuffled(Array.from({length:36},(_,i)=>i),random).slice(0,Math.max(2,Math.min(36,variety))),assign=new Map();
 solution.path.forEach((pair,i)=>pair.forEach(id=>assign.set(id,faces[i%faces.length])));
 return{tiles:positions.map(p=>({...p,face:assign.get(p.id)})),solution:solution.path};
}
export function newRun(level,seed=Date.now()>>>0,variety=18){if(!int(seed,0,4294967295)||!int(variety,2,36))throw Error('Invalid deal settings.');const positions=validatePositions(level.positions);const d=deal(positions,seed,variety);return{version:1,rules:RULES,levelId:level.id,levelRevision:level.revision||1,seed,tiles:d.tiles,original:d.tiles.map(t=>({...t})),history:[],hints:0,shuffles:0,matches:0,elapsed:0,complete:false,custom:level.id.startsWith('custom-')?{id:level.id,name:level.name,revision:1,positions}:null};}
export function match(run,aId,bId){if(run.complete||aId===bId)return run;const a=run.tiles.find(t=>t.id===aId),b=run.tiles.find(t=>t.id===bId);if(!a||!b||a.face!==b.face||!isFree(a,run.tiles)||!isFree(b,run.tiles))return run;const tiles=run.tiles.filter(t=>t.id!==aId&&t.id!==bId);return{...run,tiles,history:[...run.history,{tiles:run.tiles.map(t=>({...t})),matches:run.matches,complete:run.complete}].slice(-100),matches:run.matches+1,complete:tiles.length===0};}
export function undo(run){if(!run.history.length)return run;const previous=run.history.at(-1);return{...run,...previous,history:run.history.slice(0,-1)};}
export function reshuffle(run){if(run.tiles.length===0)return run;const {tiles}=deal(run.tiles,run.seed+run.shuffles+1,Math.min(18,run.tiles.length/2));return{...run,tiles,shuffles:Math.min(100000,run.shuffles+1),history:[...run.history,{tiles:run.tiles.map(t=>({...t})),matches:run.matches,complete:false}].slice(-100)};}
export const stars=run=>run.complete?run.shuffles?1:run.hints?2:3:0;
function exactKeys(o,keys){if(!o||typeof o!=='object'||Array.isArray(o)||Object.keys(o).length!==keys.length||keys.some(k=>!Object.hasOwn(o,k))||Object.keys(o).some(k=>!keys.includes(k)))throw Error('Unsupported or missing data fields.');}
export function validateImages(images){if(!Array.isArray(images)||images.length>36)throw Error('Use at most 36 images.');let bytes=0;for(const [i,img]of images.entries()){exactKeys(img,['id','name','data']);if(img.id!==`image-${i}`||typeof img.name!=='string'||img.name.length>80||typeof img.data!=='string'||!/^data:image\/png;base64,[A-Za-z0-9+/]+=*$/.test(img.data)||img.data.length>LIMITS.imageBytes)throw Error('Invalid image. Use the image picker for PNG, JPEG or WebP.');const header=atob(img.data.slice(22,62));const dimension=offset=>((header.charCodeAt(offset)*16777216)+(header.charCodeAt(offset+1)<<16)+(header.charCodeAt(offset+2)<<8)+header.charCodeAt(offset+3));if(header.length<24||header.slice(0,8)!=='\x89PNG\r\n\x1a\n'||header.slice(12,16)!=='IHDR'||dimension(16)<1||dimension(16)>160||dimension(20)<1||dimension(20)>160)throw Error('Image dimensions must be between 1 and 160 pixels.');bytes+=img.data.length;}if(bytes>8000000)throw Error('Image collection exceeds 8 MB.');return images;}
export function validateLayout(layout){exactKeys(layout,['id','name','revision','positions']);if(typeof layout.id!=='string'||!/^custom-[a-zA-Z0-9-]{1,70}$/.test(layout.id)||typeof layout.name!=='string'||!layout.name.trim()||layout.name.length>60||layout.revision!==1)throw Error('Invalid layout details.');return{...layout,positions:validatePositions(layout.positions,{studio:true})};}
export function validateImport(text){if(typeof text!=='string'||text.length>LIMITS.importBytes)throw Error('Import exceeds 8.5 MB.');const data=JSON.parse(text);exactKeys(data,['format','version','layout','images']);if(data.format!=='mahjong-garden-studio'||data.version!==1)throw Error('Unsupported studio file version.');const result={format:data.format,version:1,layout:validateLayout(data.layout),images:validateImages(data.images)};const solved=solveGeometry(result.layout.positions);if(solved.status!=='solved')throw Error('Imported layout cannot be verified solvable.');return result;}
export function validateRun(run,levels){
 exactKeys(run,['version','rules','levelId','levelRevision','seed','tiles','original','history','hints','shuffles','matches','elapsed','complete','custom']);
 if(!run||run.version!==1||run.rules!==RULES||!int(run.seed,0,4294967295)||!int(run.hints,0,100000)||!int(run.shuffles,0,100000)||!int(run.matches,0,72)||!Number.isFinite(run.elapsed)||run.elapsed<0||run.elapsed>31536000||typeof run.complete!=='boolean')throw Error('Saved run is incompatible.');
 const level=run.custom?validateLayout(run.custom):levels.find(l=>l.id===run.levelId);if(!level||run.levelId!==level.id||run.levelRevision!==(level.revision||1))throw Error('Saved level is unavailable.');
 const source=new Map(level.positions.map(p=>[p.id,p]));
 const check=(tiles,full=false)=>{if(!Array.isArray(tiles)||tiles.length>144||tiles.length%2||full&&tiles.length!==source.size)throw Error('Invalid saved tiles.');const ids=new Set();for(const t of tiles){exactKeys(t,['id','x','y','z','face']);const p=source.get(t.id);if(!p||t.x!==p.x||t.y!==p.y||t.z!==p.z||!int(t.face,0,35)||ids.has(t.id))throw Error('Invalid saved tile.');ids.add(t.id);}for(const t of tiles)if(t.z>0&&!ids.has(`t-${t.x}-${t.y}-${t.z-1}`))throw Error('Saved tile is missing its support.');const count=new Map();tiles.forEach(t=>count.set(t.face,(count.get(t.face)||0)+1));if([...count.values()].some(n=>n%2))throw Error('Saved tiles are not paired.');};
 check(run.original,true);check(run.tiles);if(run.matches!==(source.size-run.tiles.length)/2||run.complete!==(run.tiles.length===0)||!Array.isArray(run.history)||run.history.length>100)throw Error('Inconsistent checkpoint.');
 for(const h of run.history){exactKeys(h,['tiles','matches','complete']);check(h.tiles);if(!int(h.matches,0,72)||h.matches!==(source.size-h.tiles.length)/2||h.complete!==(h.tiles.length===0))throw Error('Invalid undo history.');}
 return structuredClone(run);
}
export function parseLevelElement(article,{packed=false}={}){
 const integer=(element,key)=>{const raw=element.getAttribute('data-'+key);if(raw===null||!/^(0|[1-9]\d*)$/.test(raw))throw Error('Missing or invalid '+key+' at '+(element.id||element.getAttribute('data-tile')||'tile'));return Number(raw);};
 const direct=tag=>[...article.children].filter(n=>n.localName===tag),headings=direct('h2'),paragraphs=direct('p').filter(p=>!p.classList.contains('chapter')),lists=direct('ul');
 const n=integer(article,'number'),revision=integer(article,'revision'),chapter=integer(article,'chapter');
 if(!int(n,1,60)||article.id!==`mg-level-${String(n).padStart(3,'0')}`||revision!==1||chapter!==Math.floor((n-1)/10)+1||headings.length!==1||paragraphs.length!==1||lists.length!==1||[...article.attributes].some(a=>a.name.startsWith('data-')&&!['data-number','data-revision','data-chapter'].includes(a.name)))throw Error('Invalid or ambiguous campaign level '+article.id);
 const name=headings[0].textContent,goal=paragraphs[0].textContent;if(!name.trim()||name.length>80||!goal.trim()||goal.length>300)throw Error('Missing or oversized level text.');
 const positions=[...lists[0].children].map(el=>{if(el.localName!=='li'||[...el.attributes].some(a=>!(packed?['data-p']:['data-tile','data-x','data-y','data-z']).includes(a.name)))throw Error('Invalid tile markup at '+article.id);if(packed){const raw=el.getAttribute('data-p');if(!/^[0-9ab][0-9][0-2]$/.test(raw??''))throw Error('Invalid packed position at '+article.id);const [x,y,z]=[...raw].map(n=>parseInt(n,36));return{id:`t-${x}-${y}-${z}`,x,y,z};}return{id:el.getAttribute('data-tile'),x:integer(el,'x'),y:integer(el,'y'),z:integer(el,'z')};});
 return{id:article.id,number:n,revision,chapter,name,goal,positions:validatePositions(positions)};
}
export function parseCampaign(doc){
 const roots=doc.querySelectorAll('main[data-content-revision]');if(roots.length!==1||roots[0].getAttribute('data-content-revision')!=='1'||doc.querySelector('script,iframe,img,object,embed,link,base,style'))throw Error('Invalid campaign document.');
 const pack=roots[0].getAttribute('data-runtime-pack');if(pack!==null&&pack!=='1')throw Error('Unsupported runtime pack.');const articles=[...roots[0].children].filter(e=>e.localName==='article'),levels=articles.map(article=>parseLevelElement(article,{packed:pack==='1'})).sort((a,b)=>a.number-b.number);
 if(levels.length!==60||levels.some((l,i)=>l.number!==i+1))throw Error('The campaign requires exactly 60 permanent level identities.');
 return levels;
}
