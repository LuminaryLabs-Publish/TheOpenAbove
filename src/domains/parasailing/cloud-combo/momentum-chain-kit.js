// Open Above / Parasailing / Cloud Combo Service / Momentum Chain Kit.
// Earned velocity never decays on a timer or after leaving a cloud.
export const MOMENTUM_CHAIN_KIT_ID="open-above:parasailing:cloud-combo:momentum";
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
export function awardCloudMomentum(state={combo:0,momentum:0,score:0},event={}){
  if(!event.id)throw new TypeError("Combo event must identify a cloud");
  const combo=Math.max(0,Math.floor(state.combo||0))+1;
  const bonus=4+Math.min(combo,12)*1.35;
  const momentum=Math.min(80,Math.max(0,Number(state.momentum)||0)+bonus);
  const score=Math.max(0,Math.floor(state.score||0))+Math.round(bonus*100*combo);
  return Object.freeze({combo,momentum,score,lastEvent:Object.freeze({
    id:event.id,kind:event.kind||"cloud-skim",bonus,combo,score
  })});
}
export function retainEarnedVelocity(previousBonus=0,nextBonus=0){
  return clamp(Math.max(Number(previousBonus)||0,Number(nextBonus)||0),0,80);
}
