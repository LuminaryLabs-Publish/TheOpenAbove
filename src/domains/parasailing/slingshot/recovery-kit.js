// Parasailing Domain / Slingshot Service / Dive-Recovery Kit (TOA-014 rework).
// Progression is deliberate: sustained dive -> release -> pull back in rising wind.
export const DIVE_RECOVERY_KIT_ID="open-above:parasailing:slingshot:recovery";
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const MIN_DIVE_DISTANCE=7;
export const MIN_UPDRAFT=0.55;
export function createDiveRecoveryState(){
  return Object.freeze({phase:"idle",armed:false,awards:0,diveDistance:0,
    peakDescent:0,lastEvent:null});
}
export function advanceDiveRecovery(previous,flight,{held=false,pullBack=0,dt=1/60}={}){
  if(!flight||!Number.isFinite(flight.canopyCollapse)||!Number.isFinite(flight.vy))
    throw new TypeError("Slingshot requires valid canopy and vertical flight state");
  const state=previous||createDiveRecoveryState();
  const collapse=clamp(flight.canopyCollapse,0,1);
  const updraft=Number.isFinite(flight.wind?.y)?flight.wind.y:0;
  const d=clamp(Number(dt)||0,0,.05);
  let {phase,diveDistance,peakDescent}=state;
  let event=null;
  if(phase==="idle"&&held&&collapse>=.8&&flight.vy<=-5){
    phase="diving";
    diveDistance=0;peakDescent=-flight.vy;
  }else if(phase==="diving"){
    if(held){
      diveDistance+=Math.max(0,-flight.vy)*d;
      peakDescent=Math.max(peakDescent,-flight.vy);
    }else{
      phase="recovering";
    }
  }else if(phase==="recovering"){
    if(held){phase="cancelled";}
    else if(collapse<=.46&&diveDistance>=MIN_DIVE_DISTANCE&&
      peakDescent>=8&&updraft>MIN_UPDRAFT&&Number(pullBack)>=.5){
      // Earn only from a real controlled dive. A stronger descent/updraft pays more.
      const bonus=clamp(Math.round((3.2+peakDescent*.25+
        diveDistance*.16+updraft*1.55)*10)/10,7,18);
      event=Object.freeze({kind:"dive-to-lift-slingshot",bonus,updraft,
        diveDistance:+diveDistance.toFixed(2),
        peakDescent:+peakDescent.toFixed(2),pullBack:true,
        liftSeconds:1.5,awardNumber:state.awards+1});
      phase="spent";
    }else if(collapse<.08){
      // Fully reinflated with no successful recovery: that dive is spent.
      phase="spent";
    }
  }
  if((phase==="spent"||phase==="cancelled")&&!held&&collapse<.07)
    phase="idle";
  return Object.freeze({phase,armed:phase==="diving"||phase==="recovering",
    diveDistance,peakDescent,awards:state.awards+(event?1:0),
    lastEvent:event||state.lastEvent,event});
}
