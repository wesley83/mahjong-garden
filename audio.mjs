import {LatestTask,bounded} from './operations.mjs';
export const defaultAudio=()=>({version:1,revision:0,music:true,sound:true,musicVolume:35,soundVolume:65});
export function validateAudio(value){const keys=Object.keys(defaultAudio());if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).length!==keys.length||keys.some(k=>!Object.hasOwn(value,k))||value.version!==1||!Number.isSafeInteger(value.revision)||value.revision<0||typeof value.music!=='boolean'||typeof value.sound!=='boolean'||['musicVolume','soundVolume'].some(k=>!Number.isInteger(value[k])||value[k]<0||value[k]>100))throw Error('Unsupported audio settings.');return structuredClone(value);}
const phrase=[60,64,67,72,71,67,64,62,57,60,64,69,67,64,62,60,53,57,60,65,64,60,57,55,55,59,62,67,65,62,59,55];
export function musicNotes(step){const n=step%32,notes=[{midi:phrase[n],offset:0,duration:1.8,peak:.07}];if(n%4===0)notes.push({midi:[48,45,41,43][Math.floor(n/8)],offset:0,duration:3.8,peak:.045});return notes;}
export function effectNotes(kind){return(kind==='celebrate'?[72,76,79,84,79,84,88]:[76,79]).map((midi,i)=>({midi,offset:i*(kind==='celebrate'?.14:.07),duration:kind==='celebrate'?.95:.27,peak:kind==='celebrate'?.10:.09}));}
// Shared by real-time playback and offline signal verification.
export function scheduleTone(context,bus,note,start){
 const oscillator=context.createOscillator(),gain=context.createGain(),end=start+note.duration;
 oscillator.type='sine';oscillator.frequency.setValueAtTime(440*2**((note.midi-69)/12),start);
 gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(note.peak,start+.012);gain.gain.exponentialRampToValueAtTime(.0001,end-.025);gain.gain.linearRampToValueAtTime(0,end);
 oscillator.connect(gain);gain.connect(bus);oscillator.start(start);oscillator.stop(end+.005);
 return{oscillator,gain,end};
}
export class GardenAudio{
 constructor({createContext=()=>new (window.AudioContext||window.webkitAudioContext)(),later=(fn,ms)=>setTimeout(fn,ms),cancel=id=>clearTimeout(id),status=()=>{},resumeTimeout=3500}={}){Object.assign(this,{createContext,later,cancel,status,resumeTimeout,resumes:new LatestTask(),settings:defaultAudio(),active:false,unlocked:false,generation:0,voices:new Set(),timer:0,step:0,next:0,pending:null});}
 configure(settings){this.settings=validateAudio(settings);if(this.context){const now=this.context.currentTime;for(const [group,enabled,volume]of [['music',settings.music,settings.musicVolume],['effects',settings.sound,settings.soundVolume]]){const param=this[group].gain;param.cancelScheduledValues(now);param.setTargetAtTime(enabled?volume/100:0,now,.015);if(!enabled||volume===0)this.stopGroup(group);}this.pump();}}
 async unlock(){
  if(!this.settings.music&&!this.settings.sound)return false;
  if(this.unlocked&&this.context?.state==='running'){this.pump();return true;}
  if(this.pending)return this.pending;
  const generation=this.generation,ticket=this.resumes.begin();
  const job=(async()=>{try{
   if(!this.context||this.context.state==='closed'){this.context=this.createContext();for(const group of ['music','effects']){this[group]=this.context.createGain();this[group].connect(this.context.destination);}this.configure(this.settings);}
   await bounded(this.context.resume(),{signal:ticket.signal,milliseconds:this.resumeTimeout,label:'Starting audio',dispose:()=>{if(!this.active)void this.context.suspend().catch(()=>{});}});
   if(generation!==this.generation){if(!this.active)void this.context.suspend().catch(()=>{});return false;}
   if(this.context.state!=='running')throw Error('Audio is waiting for permission');
   this.unlocked=true;this.status('Audio ready.');this.pump();return true;
  }catch{if(generation===this.generation){this.unlocked=false;this.status('Audio could not start. Tap Preview celebration to retry.');}return false;}})();
  this.pending=job;void job.then(()=>{if(this.pending===job)this.pending=null;});return job;
 }
 setActive(active){if(active===this.active)return;this.active=active;if(!active)this.pause();else if(this.unlocked){if(this.context?.state==='running')this.pump();else void this.unlock();}}
 pause(){this.active=false;this.generation++;this.resumes.cancel();this.pending=null;this.cancel(this.timer);this.timer=0;this.next=0;this.stopGroup();if(this.context?.state==='running')void this.context.suspend().catch(()=>{});}
 stopGroup(group){for(const v of [...this.voices])if(!group||v.group===group){try{v.oscillator.stop();}catch{}v.oscillator.disconnect();v.gain.disconnect();this.voices.delete(v);}}
 tone(group,note,start){if(this.voices.size>=20)return;const v={...scheduleTone(this.context,this[group],note,start),group};this.voices.add(v);v.oscillator.onended=()=>{v.oscillator.disconnect();v.gain.disconnect();this.voices.delete(v);};}
 pump(){
  this.cancel(this.timer);this.timer=0;
  if(!this.active||!this.unlocked||this.context?.state!=='running'||!this.settings.music||!this.settings.musicVolume)return;
  const now=this.context.currentTime;if(!this.next||this.next<now-.3)this.next=now+.025;
  let count=0;while(this.next<now+.18&&count++<2){for(const note of musicNotes(this.step++))this.tone('music',note,this.next);this.next+=.75;}
  this.timer=this.later(()=>this.pump(),100);
 }
 effect(kind){if(!this.active||!this.unlocked||this.context?.state!=='running'||!this.settings.sound||!this.settings.soundVolume)return false;this.stopGroup('effects');const now=this.context.currentTime+.01;for(const note of effectNotes(kind))this.tone('effects',note,now+note.offset);return true;}
 inspect(){return{state:this.context?.state||'locked',unlocked:this.unlocked,active:this.active,voices:this.voices.size,musicVoices:[...this.voices].filter(v=>v.group==='music').length,effectVoices:[...this.voices].filter(v=>v.group==='effects').length,timer:!!this.timer};}
}
