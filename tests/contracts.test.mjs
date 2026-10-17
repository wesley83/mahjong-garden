import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs/promises';import {execFileSync} from 'node:child_process';import {DOMParser} from 'linkedom';
import {parseCampaign,validateImages,newRun,match,pairs} from '../core.mjs';import {validateProfile,validateDraft,parseGameBackup} from '../profile.mjs';import {imageDimensions} from '../image-input.mjs';import {LatestTask,bounded,StudioHistory,advanceElapsed} from '../operations.mjs';
const library=await fs.readFile(new URL('../content/levels.html',import.meta.url),'utf8'),parse=s=>parseCampaign(new DOMParser().parseFromString(s,'text/html')),levels=parse(library);
const draft=()=>({layout:{id:'custom-test',revision:1,name:'Test',positions:structuredClone(levels[0].positions)},images:[]});const profile=()=>({version:1,revision:0,settings:{theme:'traditional',sound:false,largeTiles:false,reduceMotion:false},progress:{},run:newRun(levels[0],42,6),studio:draft()});
test('semantic campaign accessors accept reordered attributes and reject ambiguous definitions',()=>{
 assert.equal(parse(library.replace('data-x="0" data-y="0"','data-y="0" data-x="0"')).length,60);
 for(const change of [s=>s.replace('data-revision="1"','data-revision="2"'),s=>s.replace('data-chapter="1"','data-chapter="6"'),s=>s.replace('<h2>First light</h2>','<h2>First light</h2><h2>Duplicate</h2>'),s=>s.replace('data-x="0"','data-x=""'),s=>s.replace('data-number="1"','data-number="1" data-code="unknown"'),s=>s.replace('</main>','<script>alert(1)</script></main>')])assert.throws(()=>parse(change(library)));
});
test('profile and unfinished studio round trips preserve live values and strictly reject future data',()=>{
 const p=profile();p.studio.layout.name='مرحبا — <b>plain text</b>';p.studio.layout.positions.pop();assert.deepEqual(validateProfile(p,levels),p);assert.equal(parseGameBackup(JSON.stringify({format:'mahjong-garden-backup',version:1,profile:p}),levels).studio.layout.positions.length,23);
 for(const edit of [p=>delete p.run,p=>p.extra=true,p=>p.settings.reduceMotion='yes',p=>p.progress.unknown=3,p=>p.studio.layout.positions[0].effect='script',p=>p.run.original.at(-1).face=99,p=>p.version=2]){const bad=profile();edit(bad);assert.throws(()=>validateProfile(bad,levels));}
 for(const bad of [null,0,false,[],{layout:[],images:[]}])assert.throws(()=>validateDraft(bad));assert.throws(()=>parseGameBackup(' '.repeat(18000001),levels));
});
test('image headers enforce format, bytes and pixel bounds before a browser decoder runs',()=>{
 const png=Buffer.alloc(24);Buffer.from('89504e470d0a1a0a0000000d49484452','hex').copy(png);png.writeUInt32BE(160,16);png.writeUInt32BE(120,20);assert.deepEqual(imageDimensions(png,'image/png'),{width:160,height:120});png.writeUInt32BE(8000,16);png.writeUInt32BE(8000,20);assert.throws(()=>imageDimensions(png,'image/png'));assert.throws(()=>imageDimensions(png,'image/jpeg'));assert.throws(()=>imageDimensions(Buffer.alloc(5242881),'image/png'));
 const jpeg=Uint8Array.from([255,216,255,192,0,17,8,0,100,0,200,3,1,17,0,2,17,0,3,17,0]);assert.deepEqual(imageDimensions(jpeg,'image/jpeg'),{width:200,height:100});
 const webp=Buffer.alloc(30);webp.write('RIFF',0);webp.write('WEBP',8);webp.write('VP8X',12);webp[24]=99;webp[27]=49;assert.deepEqual(imageDimensions(webp,'image/webp'),{width:100,height:50});assert.throws(()=>validateImages([{id:'image-0',name:'truncated',data:'data:image/png;base64,'+Buffer.from('89504e470d0a1a0a0000000d49484452','hex').toString('base64')}]));
});
test('cancellation and timeouts dispose late image results and do not revive older jobs',async()=>{
 const scope=new LatestTask(),first=scope.begin();let release,disposed=0;const delayed=new Promise(r=>{release=r;});const promise=bounded(delayed,{signal:first.signal,milliseconds:100,dispose:()=>disposed++});const second=scope.begin();await assert.rejects(promise,{name:'AbortError'});release({bitmap:true});await Promise.resolve();assert.equal(disposed,1);assert.equal(scope.current(first),false);assert.equal(scope.current(second),true);
 let late;const timed=bounded(new Promise(r=>{late=r;}),{milliseconds:5,dispose:()=>disposed++});await assert.rejects(timed,/timed out/);late({});await Promise.resolve();assert.equal(disposed,2);
});
test('studio history includes layout and images and remains bounded',()=>{
 const h=new StudioHistory({limit:2,bytes:100}),a=draft(),b=draft();b.layout.name='Changed';b.images=[{id:'image-0',name:'One',data:'image-a'}];h.push(a);const restored=h.undo(b);assert.deepEqual(restored,a);assert.deepEqual(h.redo(a),b);for(let n=0;n<8;n++){const s=draft();s.layout.name=String(n);h.push(s);}assert.equal(h.past.length,2);assert.deepEqual(h.undo(b).layout.name,'7');
});
test('elapsed time is incorporated before matching and cannot advance a complete or invalid interval',()=>{
 const run=newRun(levels[0],42,6),[a,b]=pairs(run.tiles)[0],timed=advanceElapsed(run,.75),next=match(timed,a.id,b.id);assert.equal(next.elapsed,.75);assert.equal(run.elapsed,0);assert.equal(advanceElapsed(next,-10).elapsed,.75);assert.equal(advanceElapsed(next,100).elapsed,5.75);assert.equal(advanceElapsed({...next,complete:true},3).elapsed,.75);
});
test('baseline version-one checkpoints and rollback reader remain compatible',async()=>{
 const source=execFileSync('git',['show','0cbfa62:core.mjs'],{cwd:new URL('../',import.meta.url),encoding:'utf8'}),baseline=new URL('../.local/compat/baseline-core.mjs',import.meta.url);await fs.mkdir(new URL('../.local/compat/',import.meta.url),{recursive:true});await fs.writeFile(baseline,source);const old=await import(baseline.href);
 let previous=old.newRun(levels[0],78,6);const [a,b]=old.pairs(previous.tiles)[0];previous=old.match(previous,a.id,b.id);const p=profile();p.run=previous;assert.deepEqual(validateProfile(p,levels).run,previous);const current=newRun(levels[2],123);assert.deepEqual(old.validateRun(current,levels),current);
});
