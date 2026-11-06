// Open Above / Parasailing Domain / Canopy Service / Collapse Kit.
// In-game collapse is progressive, visually observable and reversible.
export const CANOPY_COLLAPSE_KIT_ID="open-above:parasailing:canopy:collapse";
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
export function advanceCanopyCollapse({fraction=0,held=false,dt=0}={}){
  const d=clamp(Number(dt)||0,0,1/20);
  const from=clamp(Number(fraction)||0,0,1);
  const target=held?1:0;
  const rate=held?3.6:2.25;
  const collapse=from+(target-from)*(1-Math.exp(-rate*d));
  // Less inflated wing, less lifting surface and more freefall tendency.
  return Object.freeze({fraction:collapse,canopyScale:1-.72*collapse,
    liftFraction:Math.pow(1-collapse,2),
    extraSink:11*collapse,
    steeringAuthority:1-.62*collapse,
    mode:held?"pulling-in":collapse>.05?"reinflating":"open"});
}
