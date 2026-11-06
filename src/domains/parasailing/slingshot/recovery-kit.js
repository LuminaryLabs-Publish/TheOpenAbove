// Parasailing Domain / Slingshot Service / Recovery Kit.
// Pure transition detection; one event per genuine held-collapse/recovery cycle.
export const DIVE_RECOVERY_KIT_ID="open-above:parasailing:slingshot:recovery";
export const SLINGSHOT_BONUS=8;
const clamp=(value,lo,hi)=>Math.max(lo,Math.min(hi,value));
export function createDiveRecoveryState(){
  return Object.freeze({phase:"idle",armed:false,awards:0,lastEvent:null});
}
export function advanceDiveRecovery(previous,flight,{held=false}={}){
  if(!flight || !Number.isFinite(flight.canopyCollapse) || !Number.isFinite(flight.vy))
    throw new TypeError("Slingshot requires valid canopy and vertical flight state");
  const state=previous||createDiveRecoveryState();
  const collapse=clamp(flight.canopyCollapse,0,1);
  const updraft=Number.isFinite(flight.wind?.y)?flight.wind.y:0;
  let phase=state.phase;
  let event=null;
  // A real downward dive under a held-in canopy is required to arm.
  if(phase==="idle" && held && collapse>=0.8 && flight.vy<=-4)
    phase="armed";
  else if(phase==="armed" && !held)
    phase="recovering";
  else if(phase==="recovering"){
    if(held)phase="cancelled";
    else if(collapse<0.15){
      if(updraft>0.5){
        event=Object.freeze({kind:"dive-to-lift-slingshot",bonus:SLINGSHOT_BONUS,
          updraft,descentArmed:true,awardNumber:state.awards+1});
      }
      phase="spent";
    }
  }
  // A completed/cancelled cycle cannot award again without a fresh collapse.
  if((phase==="spent"||phase==="cancelled") && !held && collapse<0.08)
    phase="idle";
  return Object.freeze({
    phase,armed:phase==="armed"||phase==="recovering",
    awards:state.awards+(event?1:0),lastEvent:event||state.lastEvent,
    event
  });
}
