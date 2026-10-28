// Decorative home motion. Never captures a pointer or changes game state.
export function homeParallax(root,{enabled=()=>true,window:win=globalThis.window,document:doc=root.ownerDocument}={}){
 const lifetime=new AbortController(),media=win.matchMedia('(prefers-reduced-motion: reduce)'),options={passive:true,signal:lifetime.signal};
 let layers=[],active=false,focused=true,present=true,frame=0,last=0,x=0,y=0,tx=0,ty=0,contact=null;
 function paint(){for(const layer of layers){const depth=Number(layer.dataset.parallaxDepth);layer.style.transform=`translate(${(x*depth).toFixed(3)}px, ${(y*depth).toFixed(3)}px)`;}}
 function reset(){if(frame)win.cancelAnimationFrame(frame);frame=last=0;x=y=tx=ty=0;contact=null;for(const layer of layers)layer.style.removeProperty('transform');root.dataset.parallaxMotion='idle';}
 function sync(){const next=!!enabled()&&focused&&present&&!doc.hidden&&!media.matches;if(next===active)return;active=next;reset();root.dataset.parallax=active?'ready':'off';}
 function tick(now){frame=0;if(!active)return;const delta=last?Math.min(64,Math.max(0,now-last)):16;last=now;const blend=1-Math.exp(-delta/100);x+=(tx-x)*blend;y+=(ty-y)*blend;
  if(Math.abs(tx-x)+Math.abs(ty-y)<.015){x=tx;y=ty;last=0;paint();root.dataset.parallaxMotion='idle';return;}paint();frame=win.requestAnimationFrame(tick);
 }
 function aim(nx,ny){tx=nx;ty=ny;if(!frame&&(Math.abs(tx-x)+Math.abs(ty-y)>.015)){last=0;root.dataset.parallaxMotion='moving';frame=win.requestAnimationFrame(tick);}}
 function sample(event){if(!active||event.isPrimary===false)return;if(event.pointerType==='touch'&&event.pointerId!==contact)return;if(!Number.isFinite(event.clientX)||!Number.isFinite(event.clientY))return;const clamp=n=>Math.max(-1,Math.min(1,n));aim(-clamp(event.clientX/Math.max(1,win.innerWidth)*2-1)*20,-clamp(event.clientY/Math.max(1,win.innerHeight)*2-1)*12);}
 function down(event){if(event.isPrimary===false||!active)return;if(event.target?.closest?.('button,input,select,textarea,a,summary'))return;if(event.pointerType==='touch')contact=event.pointerId;sample(event);}
 function up(event){if(event.pointerType==='touch'&&event.pointerId===contact){contact=null;aim(0,0);}}
 function cancel(event){if(event.pointerType==='touch'&&event.pointerId!==contact)return;reset();}
 function refresh(){reset();layers=[...root.querySelectorAll('[data-parallax-depth]')];sync();}
 win.addEventListener('pointerdown',down,options);win.addEventListener('pointermove',sample,options);win.addEventListener('pointerup',up,options);win.addEventListener('pointercancel',cancel,options);
 win.addEventListener('pointerout',event=>{if(!event.relatedTarget&&active){contact=null;aim(0,0);}},options);
 win.addEventListener('resize',reset,options);win.addEventListener('blur',()=>{focused=false;sync();},options);win.addEventListener('focus',()=>{focused=true;sync();},options);
 win.addEventListener('pagehide',()=>{present=false;sync();},options);win.addEventListener('pageshow',()=>{present=true;sync();},options);doc.addEventListener('visibilitychange',sync,options);media.addEventListener('change',sync,{signal:lifetime.signal});
 root.dataset.parallax='off';refresh();return{sync,refresh,destroy(){lifetime.abort();active=false;reset();root.dataset.parallax='off';}};
}
