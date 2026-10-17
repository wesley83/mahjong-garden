import fs from 'node:fs/promises';import path from 'node:path';import {createRequire} from 'node:module';import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const require=createRequire(process.env.MG_IMAGE_RUNTIME?path.join(process.env.MG_IMAGE_RUNTIME,'package.json'):import.meta.url);
const sharp=require('sharp');if(sharp.versions.sharp!=='0.35.5')throw Error('Asset authoring uses sharp 0.35.5. Frozen PNG exports are already committed; this optional command is not part of build.');
await sharp(path.join(root,'assets/social-card.svg')).png().toFile(path.join(root,'assets/social-card.png'));
await sharp(path.join(root,'favicon.svg')).resize(180,180).png().toFile(path.join(root,'assets/apple-touch-icon.png'));
await fs.mkdir(path.join(root,'.local/icons'),{recursive:true});for(const size of[16,32,48])await sharp(path.join(root,'favicon.svg')).resize(size,size).png().toFile(path.join(root,`.local/icons/favicon-${size}.png`));
console.log(JSON.stringify({renderer:'sharp 0.35.5',social:[1200,630],touch:[180,180],favicon:[16,32,48]}));
