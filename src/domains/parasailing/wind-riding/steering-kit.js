// Open Above / Parasailing Domain / Wind-Riding Service / Steering Kit.
// Controls orientation and sink; it never manufactures upward motion in still air.
export const WIND_RIDING_STEERING_KIT_ID = "open-above:parasailing:wind-riding:steering";
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const approach=(a,b,k,dt)=>a+(b-a)*(1-Math.exp(-k*dt));

export function resolveWindRidingSteering({state,turn=0,pullBack=0,flare=false,wind={},dt=0}={}){
  if(!state)throw new TypeError("Steering requires a flight state");
  const d=clamp(Number(dt)||0,0,1/20);
  const steer=clamp(Number(turn)||0,-1,1);
  const pull=clamp(Number(pullBack)||0,-1,1);
  const verticalWind=Number.isFinite(wind.y)?wind.y:0;
  // Strong progressive brake-line response instead of sluggish airplane yaw.
  const yaw=state.yaw+steer*(flare?.79:.72)*d;
  const bank=approach(state.bank,-steer*.48,2.65,d);
  const pitch=approach(state.pitch,pull*.33+(flare?.13:0),2.2,d);
  const airspeed=approach(state.airspeed,flare?14:22-3.2*Math.max(0,pull)+1.1*Math.max(0,-pull),1.7,d);
  // Pitch-back trades forward motion for a better sink rate; climbing requires rising air.
  const stillAirSink=-2.6-(airspeed-20)*.04+1.1*Math.max(0,pull)
    -.35*Math.max(0,-pull)+(flare?.75:0);
  const verticalTarget=clamp(stillAirSink+verticalWind*(pull>0?1.17:.84),-8,7);
  return Object.freeze({yaw,bank,pitch,airspeed,verticalTarget,steer,pullBack:pull,flare});
}
