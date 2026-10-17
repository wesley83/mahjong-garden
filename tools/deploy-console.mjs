import {backup,wipe,deploy} from './deploy.mjs';
if(process.stdin.isTTY)process.stdin.setRawMode(true);
process.stdin.setEncoding('utf8');let buffer='',busy=false;
console.log('Ready for hidden deployment commands.');
process.stdin.on('data',async c=>{if(c.includes('\u0003'))process.exit(0);buffer+=c;const i=buffer.search(/[\r\n]/);if(i<0)return;const line=buffer.slice(0,i).trim();buffer=buffer.slice(i+1);if(!line)return;if(busy)return;busy=true;try{const command=JSON.parse(line);if(command.op==='quit')process.exit(0);console.log(JSON.stringify(await(command.op==='backup'?backup(command.key):command.op==='wipe'?wipe():command.op==='deploy'?deploy():Promise.reject(Error('Unknown command')))));}catch(e){console.log(JSON.stringify({error:e.message,cause:e.cause?.code}));}finally{busy=false;}});
