const frame=document.querySelector('#app'),out=document.querySelector('#results'),d=()=>frame.contentDocument,w=()=>frame.contentWindow;
const wait=ms=>new Promise(r=>setTimeout(r,ms)),assert=(v,m)=>{if(!v)throw Error(m);};
const click=async s=>{d().querySelector(s).click();await wait(200);};
document.querySelector('#touch').onclick=async()=>{
 const row={name:'rapid taps and independent tile contacts',utc:new Date().toISOString(),candidate:d().querySelector('meta[name="mg-release"]').content},outcomes={};
 try{
  if(d().querySelector('#play-screen').hidden)await click('#continue-game');
  frame.width=1280;frame.height=720;await wait(100);await click('.journey-button');await click('#level-library .level-card:first-child');if(d().querySelector('#confirm-dialog').open)await click('#confirm-ok');
  await click('#nav-studio');const name=d().querySelector('#layout-name'),savedName=name.value;name.value=savedName+' touch fixture';name.dispatchEvent(new (w().Event)('input',{bubbles:true}));const cells=d().querySelectorAll('#studio-source li').length;await click('#editor-grid button[data-x="0"][data-y="0"]');assert(d().querySelectorAll('#studio-source li').length===cells-1,'Renaming left stale editor callbacks');await click('#editor-undo');name.value=savedName;name.dispatchEvent(new (w().Event)('input',{bubbles:true}));await click('#studio-close');
  await click('#hint');const [a,b]=d().querySelectorAll('#board .hinted'),before=+d().querySelector('#remaining').textContent;
  a.click();const stable=b.isConnected;b.click();
  assert(stable&&+d().querySelector('#remaining').textContent===before-2,'Rapid tap target replaced: second pre-existing tile reference rejected');
  outcomes['TOUCH-RAPID']='passed';await click('#undo');
  frame.width=1280;frame.height=720;await wait(100);
  const count=()=>+d().querySelector('#remaining').textContent;
  const center=b=>{const r=b.querySelector('.tile-top').getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2};};
  const send=(b,type,id,options={})=>{const p=center(b);b.dispatchEvent(new (w().PointerEvent)(type,{bubbles:true,pointerType:'touch',pointerId:id,isPrimary:id===1,button:0,clientX:p.x,clientY:p.y,...options}));};
  const pair=async()=>{await click('#hint');return [...d().querySelectorAll('#board .hinted')];};
  const clear=()=>d().dispatchEvent(new (w().KeyboardEvent)('keydown',{key:'Escape',bubbles:true}));
  const orders=[];for(const order of [[0,1],[1,0]]){const p=await pair(),n=count();const tops=p.map(b=>b.querySelector('.tile-top'));send(p[0],'pointerdown',1);send(p[1],'pointerdown',2);for(const i of order){send(p[i],'pointerup',i+1);send(p[i],'click',i+1,{detail:1});}assert(count()===n-2,'Overlapping contacts lost/doubled a match');assert(tops.every(t=>!t.isConnected),'Removed face unexpectedly connected');orders.push(order);await click('#undo');}
  {const [a]=await pair(),n=count();send(a,'pointerdown',1);send(a,'pointerdown',2);const held=w().getComputedStyle(a).transform;send(a,'pointerup',1);assert(w().getComputedStyle(a).transform===held,'Held tile moved under second contact');send(a,'pointerup',2);assert(count()===n,'Same-tile contact removed tiles');clear();}
  outcomes['TOUCH-MULTI']='passed';
  const cancellations=[];for(const mode of ['pointercancel','lostpointercapture','drag','outside','scroll','blur','resize','menu','dialog','pagehide','undo','shuffle']){if(mode==='undo'){const prior=await pair();prior[0].click();prior[1].click();assert(!d().querySelector('#undo').disabled,'Undo fixture needs history');}const [a,b]=await pair(),n=count();send(a,'pointerdown',1);send(b,'pointerdown',2);
   if(mode==='drag')send(a,'pointermove',1,{clientX:center(a).x+20});
   else if(mode==='outside'){} // Release is tested below, away from any tile.
   else if(mode==='scroll')d().querySelector('#board-scroll').dispatchEvent(new (w().Event)('scroll'));
   else if(mode==='blur'||mode==='resize')w().dispatchEvent(new (w().Event)(mode));
   else if(mode==='dialog'){await click('[data-open="settings-dialog"]');await click('#settings-dialog [data-close]');}
   else if(mode==='pagehide'){w().dispatchEvent(new (w().Event)('pagehide'));w().dispatchEvent(new (w().Event)('pageshow'));}
   else if(mode==='undo'||mode==='shuffle'){await click(mode==='undo'?'#undo':'#shuffle');}
   else if(mode==='menu'){await click('#nav-play');await click('#continue-game');}
   else send(a,mode,1);
   const expected=count();send(a,'pointerup',1,mode==='outside'?{clientX:0,clientY:0}:{});send(b,'pointerup',2);
   assert(count()===expected,'Canceled gesture mutated game: '+mode);clear();
   const fresh=['undo','shuffle'].includes(mode)?await pair():[a,b];fresh[0].click();fresh[1].click();assert(count()===expected-2,'Fresh action after cancellation failed: '+mode);await click('#undo');cancellations.push(mode);
  }outcomes['TOUCH-CANCEL']='passed';
  const geometry=[];for(const [width,height]of [[320,568],[390,844],[568,320],[844,390],[1280,720]]){frame.width=width;frame.height=height;await wait(150);const board=d().querySelector('#board'),scroller=d().querySelector('#board-scroll');
   assert(parseFloat(board.style.getPropertyValue('--tilew'))>=48,'Tile source width too small');
   const samples=[];for(const b of board.children){const t=b.querySelector('.tile-top'),r=t.getBoundingClientRect(),p=center(b),hit=d().elementFromPoint(p.x,p.y);if(hit?.closest('[data-tile]')!==b)continue;
    assert(w().getComputedStyle(t).pointerEvents==='auto','Raised face not interactive');assert(r.width>=44&&r.height>=44,'Rendered narrow tile below 44px');samples.push({tile:b.dataset.tile,width:r.width,height:r.height});
   }assert(samples.length>=2,'No visible tile samples');assert(w().getComputedStyle(board.querySelector('.tile')).touchAction==='manipulation','Browser gestures disabled');geometry.push({width,height,visibleFaces:samples.length,minWidth:Math.min(...samples.map(s=>s.width)),scrollWidth:scroller.scrollWidth,clientWidth:scroller.clientWidth});
  }frame.width=1280;frame.height=720;await wait(150);
  const edges=[],sides=[];for(const b of d().querySelector('#board').children){for(const side of ['top','right','bottom','left']){const plane=b.querySelector('.tile-'+side),r=plane.getBoundingClientRect();for(const [fx,fy]of side==='top'?[[.1,.5],[.9,.5],[.5,.1],[.5,.9]]:[[.5,.5]]){const x=r.x+r.width*fx,y=r.y+r.height*fy,hit=d().elementFromPoint(x,y);if(hit!==plane)continue;assert(hit.closest('[data-tile]')===b,'Visible plane resolved to different owner');(side==='top'?edges:sides).push({tile:b.dataset.tile,side,x,y});}}}
  assert(edges.length>=4&&sides.length>=1,'No rendered edge/side samples');outcomes['TOUCH-HIT']='passed';
  row.observations={outcomes,stableSecondTarget:stable,before,orders,cancellations,geometry,edgeSamples:edges.length,sideSamples:sides.length,method:'Synthetic PointerEvents on actual app + rendered hit testing; not trusted hardware multi-touch or Android Edge certification'};row.status='passed';
 }catch(e){row.status='failed';row.error=e.message;}
 let rows=[];try{rows=JSON.parse(out.textContent||'[]');}catch{}rows.push(row);out.textContent=JSON.stringify(rows,null,2);
};
