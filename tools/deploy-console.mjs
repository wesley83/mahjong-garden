import {backup,deploy} from './deploy.mjs';
if(!process.stdin.isTTY)throw Error('Hidden input requires a TTY');
process.stdin.setRawMode(true);process.stdin.setEncoding('utf8');let buffer='',busy=false;
console.log('Ready for hidden deployment commands. Updates retain all previous files.');
process.stdin.on('data',async c=>{if(c.includes('\u0003'))process.exit(0);buffer+=c;if(buffer.length>4096){buffer='';return;}const i=buffer.search(/[\r\n]/);if(i<0)return;const line=buffer.slice(0,i).trim();buffer=buffer.slice(i+1);if(!line||busy)return;busy=true;try{const command=JSON.parse(line);if(command.op==='quit')process.exit(0);console.log(JSON.stringify(await(command.op==='backup'?backup(command.key):command.op==='deploy'?deploy():Promise.reject(Error('Unknown command; updates do not wipe data')))));}catch(e){console.log(JSON.stringify({error:e.message,cause:e.cause?.code}));}finally{busy=false;}});
