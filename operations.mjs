export function abortError(message='This operation was canceled.') {return new DOMException(message,'AbortError');}
export class LatestTask {
 constructor(){this.generation=0;this.controller=null;}
 begin(){this.cancel();this.controller=new AbortController();return{generation:this.generation,signal:this.controller.signal};}
 current(ticket){return ticket.generation===this.generation&&!ticket.signal.aborted;}
 assert(ticket){if(!this.current(ticket))throw abortError();}
 cancel(){this.controller?.abort();this.controller=null;this.generation++;}
}
export function bounded(promise,{milliseconds=10000,signal,label='Operation',dispose=()=>{}}={}) {
 return new Promise((resolve,reject)=>{
  let finished=false;
  const finish=(error,value)=>{if(finished){if(!error)try{dispose(value);}catch{}return;}finished=true;clearTimeout(timer);signal?.removeEventListener('abort',cancel);error?reject(error):resolve(value);};
  const cancel=()=>finish(abortError());
  const timer=setTimeout(()=>finish(Error(`${label} timed out. Please try again.`)),milliseconds);
  signal?.addEventListener('abort',cancel,{once:true});if(signal?.aborted)cancel();
  Promise.resolve(promise).then(value=>finish(null,value),error=>finish(error));
 });
}
export class StudioHistory {
 constructor({limit=20,bytes=16000000}={}){this.past=[];this.future=[];this.limit=limit;this.bytes=bytes;}
 copy(draft){return{layout:structuredClone(draft.layout),images:draft.images.map(i=>({...i}))};}
 trim(){const cost=()=>[...new Set([...this.past,...this.future].flatMap(s=>s.images.map(i=>i.data)))].reduce((n,s)=>n+s.length,0);while(this.past.length+this.future.length>this.limit||cost()>this.bytes){if(this.past.length)this.past.shift();else this.future.shift();}}
 push(draft){this.past.push(this.copy(draft));this.future=[];this.trim();}
 undo(current){if(!this.past.length)return null;this.future.push(this.copy(current));const next=this.past.pop();this.trim();return next;}
 redo(current){if(!this.future.length)return null;this.past.push(this.copy(current));const next=this.future.pop();this.trim();return next;}
 clear(){this.past=[];this.future=[];}
}
export function advanceElapsed(run,seconds){if(!run||run.complete)return run;return{...run,elapsed:Math.min(31536000,run.elapsed+Math.max(0,Math.min(5,seconds)))};}
