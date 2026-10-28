const timeout=5000;
export function openStore({milliseconds=timeout}={}) {
 return new Promise((resolve,reject)=>{
  let settled=false;const request=indexedDB.open('mahjong-garden',1);
  const finish=(error,db)=>{if(settled){db?.close();return;}settled=true;clearTimeout(timer);if(error)reject(error);else{db.onversionchange=()=>db.close();resolve(db);}};
  const timer=setTimeout(()=>finish(Error('Opening local storage timed out. Export your work or retry.')),milliseconds);
  request.onupgradeneeded=()=>{if(!request.result.objectStoreNames.contains('profiles'))request.result.createObjectStore('profiles');};
  request.onsuccess=()=>finish(null,request.result);request.onerror=()=>finish(request.error);request.onblocked=()=>finish(Error('Close another Mahjong Garden tab and retry.'));
 });
}
export function readProfile(db,{milliseconds=timeout,key='local'}={}) {
 return new Promise((resolve,reject)=>{
  const transaction=db.transaction('profiles','readonly'),request=transaction.objectStore('profiles').get(key);let value,finished=false;
  const finish=error=>{if(finished)return;finished=true;clearTimeout(timer);error?reject(error):resolve(value??null);};
  const timer=setTimeout(()=>{try{transaction.abort();}catch{}finish(Error('Reading local storage timed out.'));},milliseconds);
  request.onsuccess=()=>{value=request.result;};transaction.oncomplete=()=>finish();transaction.onabort=()=>finish(transaction.error||Error('Read was interrupted.'));transaction.onerror=()=>{};
 });
}
export function writeProfile(db,value,expectedRevision,{milliseconds=timeout,baseline,audio,audioRevision,audioBaseline,garden,gardenRevision,gardenBaseline}={}) {
 return new Promise((resolve,reject)=>{
  const transaction=db.transaction('profiles','readwrite'),store=transaction.objectStore('profiles'),request=store.get('local');let failure,finished=false;
  const finish=error=>{if(finished)return;finished=true;clearTimeout(timer);error?reject(error):resolve(expectedRevision+1);};
  const timer=setTimeout(()=>{failure=Error('Saving local storage timed out. Your working copy is still available.');try{transaction.abort();}catch{}finish(failure);},milliseconds);
  const fail=error=>{failure=error;try{transaction.abort();}catch{};};
  request.onsuccess=()=>{try{
   const conflict=baseline!==undefined?JSON.stringify(request.result)!==JSON.stringify(baseline):(request.result?.revision??0)!==expectedRevision;
   if(conflict)throw Error('Another tab saved changes. Export your work, then reload to continue.');if(!Number.isSafeInteger(expectedRevision)||expectedRevision<0)throw Error('Invalid save revision.');
   const extras=[...(audio?[{key:'audio',value:audio,revision:audioRevision,baseline:audioBaseline}]:[]),...(garden?[{key:'garden',value:garden,revision:gardenRevision,baseline:gardenBaseline}]:[])];
   const check=index=>{if(index===extras.length){for(const extra of extras)store.put({...structuredClone(extra.value),revision:extra.revision+1},extra.key);store.put({...structuredClone(value),revision:expectedRevision+1},'local');return;}
    const extra=extras[index];if(!Number.isSafeInteger(extra.revision)||extra.revision<0)throw Error('Invalid '+extra.key+' revision.');const read=store.get(extra.key);read.onsuccess=()=>{try{if(extra.baseline!==undefined?JSON.stringify(read.result)!==JSON.stringify(extra.baseline):(read.result?.revision??0)!==extra.revision)throw Error('Another tab changed '+extra.key+' settings. Reload to continue.');check(index+1);}catch(error){fail(error);}};};check(0);
  }catch(error){fail(error);}};
  transaction.oncomplete=()=>finish();transaction.onabort=()=>finish(failure||transaction.error||Error('Save was interrupted.'));transaction.onerror=()=>{};
 });
}
