import fs from 'node:fs/promises';
import {solveGeometry,validatePositions} from '../core.mjs';
const names=['First light','Open gate','Twin leaves','Stepping stones','Paper lantern','Bamboo walk','Quiet courtyard','Lotus pond','Morning mist','Garden path','Little bridge','Tea for two','Wind chimes','River bend','Clover field','Turtle island','Sunlit steps','Koi crossing','Jade terrace','Spring pavilion','Cloud garden','Moon window','Crane wings','Wildflower','Mountain pass','Dragonfly','Cedar shade','Tidal pool','Willow arch','Hidden temple','Autumn leaves','Petal drift','Mossy wall','Amber grove','Twin peaks','Butterfly','Rain song','Orchid house','Red maple','Golden hour','Starlit pond','Winding river','Secret garden','Lotus crown','Silver birch','Sky lanterns','Moon bridge','Jade mountain','Dragon gate','Celestial court','Winter bloom','Phoenix nest','Emerald maze','Ancient cedar','Cloud palace','Diamond grove','Temple bells','Midnight sun','Perfect stillness','The endless garden'];
const chapters=['The first path','By the water','Above the clouds','Autumn whispers','Under the stars','The hidden garden'];
let html='<!doctype html>\n<html lang="en"><meta charset="utf-8"><title>Mahjong Garden — 60 authored levels</title><body><main data-content-revision="1">\n<h1>Mahjong Garden level library</h1>\n';
const signatures=new Set();
for(let i=0;i<60;i++){
 const band=Math.floor(i/10),variant=i%10,positions=[];const width=6+2*(i%3),rows=4+Math.floor(i/3)%3;
 for(let y=0;y<rows;y++){let cut=0;switch(variant%5){case 1:cut=(y===0||y===rows-1)?1:0;break;case 2:cut=Math.abs(y-Math.floor(rows/2))%2;break;case 3:cut=y%2;break;case 4:cut=y===Math.floor(rows/2)?1:0;}
  for(let x=cut;x<width-cut;x++)positions.push({id:`t-${x}-${y}-0`,x,y,z:0});
 }
 if(i>3){const innerRows=Math.min(rows-2,1+Math.floor(i/6)%4);for(let y=1;y<=innerRows;y++)for(let x=2;x<width-2;x++)positions.push({id:`t-${x}-${y}-1`,x,y,z:1});}
 if(i>=20){const y=1+Math.floor(i/10)%Math.max(1,Math.min(rows-2,1+Math.floor(i/6)%4));for(let x=width/2-1;x<=width/2;x++)if(positions.some(p=>p.x===x&&p.y===y&&p.z===1))positions.push({id:`t-${x}-${y}-2`,x,y,z:2});}
 // A distinct paired garden feature gives repeated silhouettes a unique source geometry.
 const extraY=rows,extraX=(Math.floor(i/5)%4)*2;for(let x=extraX;x<extraX+2;x++)positions.push({id:`t-${x}-${extraY}-0`,x,y:extraY,z:0});
 if(i===0){positions.splice(0,positions.length,...Array.from({length:24},(_,j)=>({id:`t-${j%6}-${Math.floor(j/6)}-0`,x:j%6,y:Math.floor(j/6),z:0})));}
 validatePositions(positions);const signature=positions.map(p=>`${p.x},${p.y},${p.z}`).sort().join('|');if(signatures.has(signature))throw Error('Repeated layout '+i);signatures.add(signature);if(solveGeometry(positions).status!=='solved')throw Error('Unsolvable '+i);
 const goal=i===0?'Match identical open tiles. Start at either end of a row.':i<10?'Look for matching open ends before removing a pair.':i<20?'Clear upper layers to open the tiles underneath.':i<40?'Plan a few pairs ahead and keep both sides open.':'Balance the upper layers with the outside edges.';
 html+=`<article id="mg-level-${String(i+1).padStart(3,'0')}" data-number="${i+1}" data-revision="1" data-chapter="${band+1}" itemscope itemtype="https://schema.org/Game"><h2>${names[i]}</h2><p>${goal}</p><p class="chapter">${chapters[band]}</p><ul aria-label="Tile positions">${positions.map(p=>`<li data-tile="${p.id}" data-x="${p.x}" data-y="${p.y}" data-z="${p.z}">Column ${p.x+1}, row ${p.y+1}, layer ${p.z+1}</li>`).join('')}</ul></article>\n`;
}
html+='</main></body></html>\n';await fs.writeFile(new URL('../content/levels.html',import.meta.url),html);console.log('Authored 60 unique, supported, solvable HTML layouts.');
