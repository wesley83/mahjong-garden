import {validateImages,validateRun} from './core.mjs';

export function fields(value,names,label='data') {
 if(!value||typeof value!=='object'||Array.isArray(value)||![Object.prototype,null].includes(Object.getPrototypeOf(value))||Object.keys(value).length!==names.length||names.some(k=>!Object.hasOwn(value,k))||Object.keys(value).some(k=>!names.includes(k)))throw Error(`Unsupported or missing ${label} fields.`);
}
export function validateDraft(studio) {
 fields(studio,['layout','images'],'studio');
 const layout=studio.layout;fields(layout,['id','name','revision','positions'],'layout');
 if(typeof layout.id!=='string'||!/^custom-[a-zA-Z0-9-]{1,70}$/.test(layout.id)||typeof layout.name!=='string'||layout.name.length>60||layout.revision!==1||!Array.isArray(layout.positions)||layout.positions.length>144)throw Error('Invalid saved studio draft.');
 const ids=new Set();
 for(const p of layout.positions){fields(p,['id','x','y','z'],'position');if(!Number.isInteger(p.x)||p.x<0||p.x>7||!Number.isInteger(p.y)||p.y<0||p.y>5||!Number.isInteger(p.z)||p.z<0||p.z>2||p.id!==`t-${p.x}-${p.y}-${p.z}`||ids.has(p.id))throw Error('Invalid studio position.');ids.add(p.id);}
 validateImages(studio.images);return structuredClone(studio);
}
export function validateProfile(profile,levels) {
 fields(profile,['version','revision','settings','progress','run','studio'],'game backup');
 if(profile.version!==1||!Number.isSafeInteger(profile.revision)||profile.revision<0)throw Error('This game backup version is not supported.');
 const s=profile.settings;fields(s,['theme','sound','largeTiles','reduceMotion'],'settings');
 if(!['traditional','animals','emoji','custom'].includes(s.theme)||['sound','largeTiles','reduceMotion'].some(k=>typeof s[k]!=='boolean'))throw Error('Invalid game settings.');
 const progress=profile.progress;if(!progress||typeof progress!=='object'||Array.isArray(progress)||Object.keys(progress).length>60)throw Error('Invalid journey progress.');
 for(const [id,n]of Object.entries(progress))if(!levels.some(l=>l.id===id)||!Number.isInteger(n)||n<1||n>3)throw Error('Invalid garden progress.');
 validateDraft(profile.studio);if(s.theme==='custom'&&profile.studio.images.length<2)throw Error('Personal tiles need at least two images.');
 if(profile.run!==null)validateRun(profile.run,levels);return structuredClone(profile);
}
export function parseGameBackup(text,levels) {
 if(typeof text!=='string'||new TextEncoder().encode(text).length>18000000)throw Error('Game backup exceeds 18 MB.');
 const envelope=JSON.parse(text);fields(envelope,['format','version','profile'],'backup envelope');
 if(envelope.format!=='mahjong-garden-backup'||envelope.version!==1)throw Error('Unsupported game backup.');
 return validateProfile(envelope.profile,levels);
}
