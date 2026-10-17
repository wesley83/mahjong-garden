import fs from 'node:fs/promises';import path from 'node:path';import {spawnSync} from 'node:child_process';import {buildProject,ROOT} from './build.mjs';import {sourceIdentity,hash} from './contracts.mjs';
try{
 const release=await buildProject();const tests=(await fs.readdir(path.join(ROOT,'tests'))).filter(n=>n.endsWith('.test.mjs')).sort().map(n=>'tests/'+n);
 const result=spawnSync(process.execPath,['--test','--test-reporter=tap',...tests],{cwd:ROOT,encoding:'utf8',maxBuffer:10*1024*1024});process.stdout.write(result.stdout||'');process.stderr.write(result.stderr||'');
 if(result.error)throw result.error;if(result.status!==0)throw Error('Unit verification failed');if((await sourceIdentity(ROOT)).digest!==release.sourceDigest)throw Error('Source changed during verification');
 const count=Number(result.stdout.match(/# tests (\d+)/)?.[1]);if(!count)throw Error('Test count was not recorded');await fs.mkdir(path.join(ROOT,'audit/current'),{recursive:true});
 await fs.writeFile(path.join(ROOT,'audit/current/node.json'),JSON.stringify({utc:new Date().toISOString(),candidate:release.id,sourceDigest:release.sourceDigest,node:process.versions.node,command:['node','--test','--test-reporter=tap',...tests],tests:count,exitCode:0,outputSha256:hash(result.stdout)},null,2));await fs.writeFile(path.join(ROOT,'audit/current/node-tests.tap'),result.stdout);
 console.log(JSON.stringify({candidate:release.id,tests:count,exitCode:0,initialBytes:release.initialBytes}));
}catch(error){console.error(error.message);process.exitCode=1;}
