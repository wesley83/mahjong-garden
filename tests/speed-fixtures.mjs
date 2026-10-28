export function holdLeaderboardRead(win){
 const proto=win.IDBDatabase.prototype,original=proto.transaction;let release=null,released=false;
 proto.transaction=function(...args){const tx=original.apply(this,args);if(args[1]!=='readonly')return tx;let board=false;return new Proxy(tx,{get(target,key){if(key==='objectStore')return name=>{const store=target.objectStore(name);return new Proxy(store,{get(s,k){if(k==='get')return id=>{if(id==='leaderboard')board=true;return s.get(id);};const value=Reflect.get(s,k,s);return typeof value==='function'?value.bind(s):value;}});};const value=Reflect.get(target,key,target);return typeof value==='function'?value.bind(target):value;},set(target,key,value){if(key==='oncomplete'){target.oncomplete=event=>{if(board&&!released)release=()=>value.call(target,event);else value.call(target,event);};return true;}return Reflect.set(target,key,value,target);}});};
 return{ready:()=>!!release,release(){released=true;proto.transaction=original;release?.();}};
}
