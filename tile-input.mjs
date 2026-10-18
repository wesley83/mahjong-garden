// Touch/pen activation is per contact and on release. Native click owns other inputs.
export function tileInput(root,{activate,enabled,hitTest=(x,y)=>root.ownerDocument.elementFromPoint(x,y)}){
 const contacts=new Map(),compat=new Map();
 const tile=target=>{const b=target?.closest?.('[data-tile]');return b&&root.contains(b)?b:null;};
 function cancel(id){const c=contacts.get(id);contacts.delete(id);if(c&&!([...contacts.values()].some(v=>v.button===c.button)))delete c.button.dataset.contact;}
 function reset(){for(const id of contacts.keys())cancel(id);}
 root.addEventListener('pointerdown',e=>{
  if(e.pointerType==='mouse'){compat.clear();return;}
  if(!['touch','pen'].includes(e.pointerType)||e.button!==0||!enabled())return;
  const button=tile(e.target);if(!button)return;cancel(e.pointerId);compat.delete(e.pointerId);
  button.style.setProperty('--contact-transform',root.ownerDocument.defaultView.getComputedStyle?.(button).transform||'none');
  contacts.set(e.pointerId,{button,x:e.clientX,y:e.clientY});button.dataset.contact='true';
 });
 root.ownerDocument.addEventListener('pointermove',e=>{const c=contacts.get(e.pointerId);if(c&&Math.hypot(e.clientX-c.x,e.clientY-c.y)>14)cancel(e.pointerId);});
 root.ownerDocument.addEventListener('pointerup',e=>{
  if(!['touch','pen'].includes(e.pointerType))return;
  const c=contacts.get(e.pointerId),inside=c&&tile(hitTest(e.clientX,e.clientY))===c.button;cancel(e.pointerId);
  // Keep only a bounded, short-lived compatibility-click ledger, including canceled taps.
  for(const [id,v]of compat)if(Date.now()-v.time>800)compat.delete(id);
  compat.set(e.pointerId,{button:c?.button||tile(e.target),time:Date.now()});if(compat.size>16)compat.delete(compat.keys().next().value);
  if(c&&enabled()&&c.button.isConnected&&Math.hypot(e.clientX-c.x,e.clientY-c.y)<=14&&inside)activate(c.button.dataset.tile);
 });
 for(const event of ['pointercancel','lostpointercapture'])root.addEventListener(event,e=>cancel(e.pointerId));
 root.addEventListener('click',e=>{
  const b=tile(e.target);if(!b)return;
  if(['touch','pen'].includes(e.pointerType))return;
  if(e.detail&&e.pointerType!=='mouse'&&[...compat.values()].some(c=>c.button===b&&Date.now()-c.time<=800))return;
  if(enabled())activate(b.dataset.tile);
 });
 root.addEventListener('contextmenu',reset);
 return reset;
}
