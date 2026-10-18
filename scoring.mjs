export const SCORE_RULES='mg-rules-1-content-1-score-2';
export function balancedScore({complete=true,pairs,hints=0,shuffles=0}){
 if(typeof complete!=='boolean'||!Number.isInteger(pairs)||pairs<2||pairs>72||!Number.isInteger(hints)||hints<0||hints>100000||!Number.isInteger(shuffles)||shuffles<0||shuffles>100000)throw Error('Invalid scoring inputs.');
 return complete?Math.max(1000,10000-Math.ceil(4000*hints/pairs)-2000*shuffles):0;
}
export const scoreRun=run=>balancedScore({complete:run.complete,pairs:run.original.length/2,hints:run.hints,shuffles:run.shuffles});
