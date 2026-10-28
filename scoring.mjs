export const SCORE_RULES='mg-rules-1-content-1-score-2';
export const POINTS_VIEW='mg-time-points-1';
export function balancedScore({complete=true,pairs,hints=0,shuffles=0}){
 if(typeof complete!=='boolean'||!Number.isInteger(pairs)||pairs<2||pairs>72||!Number.isInteger(hints)||hints<0||hints>100000||!Number.isInteger(shuffles)||shuffles<0||shuffles>100000)throw Error('Invalid scoring inputs.');
 return complete?Math.max(1000,10000-Math.ceil(4000*hints/pairs)-2000*shuffles):0;
}
export function timeAdjustedScore({complete=true,pairs,hints=0,shuffles=0,seconds}){
 if(!Number.isInteger(seconds)||seconds<1||seconds>31536000)throw Error('Invalid scoring time.');
 const base=balancedScore({complete,pairs,hints,shuffles});return base+Math.floor(base*pairs/(10*pairs+seconds));
}
export const scoreRun=run=>timeAdjustedScore({complete:run.complete,pairs:run.original.length/2,hints:run.hints,shuffles:run.shuffles,seconds:Math.max(1,Math.floor(run.elapsed))});
