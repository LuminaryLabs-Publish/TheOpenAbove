export const SKY_RACE_SIM_VERSION = "1.0.0";
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const smooth=(s,t,k,dt)=>s+(t-s)*(1-Math.exp(-k*dt));
export function createFlightState() {
  return {x:0,y:230,z:130,yaw:0,pitch:0,bank:0,speed:94,boost:1,elapsed:0,distance:0,verticalSpeed:0};
}
export function advanceFlight(state,input={},dt=1/60) {
  const d=clamp(Number(dt)||0,0,1/20);
  const turn=clamp(Number(input.turn)||0,-1,1);
  const lift=clamp(Number(input.lift)||0,-1,1);
  const boost=Boolean(input.boost)&&state.boost>0.012;
  const brake=Boolean(input.brake);
  const targetSpeed=boost?174:brake?55:103;
  const speed=smooth(state.speed,targetSpeed,boost?1.55:0.72,d);
  const energy=clamp(state.boost+(boost?-0.25:0.09)*d,0,1);
  const pitch=smooth(state.pitch,lift*0.39,2.05,d);
  const yaw=state.yaw+turn*(0.47+0.4*(94/Math.max(60,speed)))*d;
  const bank=smooth(state.bank,-turn*0.56,2.65,d);
  const dx=Math.sin(yaw)*Math.cos(pitch)*speed*d;
  const dy=Math.sin(pitch)*speed*d;
  const dz=-Math.cos(yaw)*Math.cos(pitch)*speed*d;
  const y=clamp(state.y+dy,42,610);
  return {x:state.x+dx,y,z:state.z+dz,yaw,pitch,bank,speed,boost:energy,
    elapsed:state.elapsed+d,distance:state.distance+Math.hypot(dx,dy,dz),
    verticalSpeed:d>0?(y-state.y)/d:0};
}
export function makeRaceGates(count=12) {
  return Array.from({length:count},(_,i)=>{
    const n=i+1;
    return {id:n,x:175*Math.sin(n*0.54)+38*Math.sin(n*1.27),
      y:235+65*Math.sin(n*0.55)+26*Math.cos(n*0.32),
      z:-n*380,radius:i<3?92:78};
  });
}
export function segmentDistanceToPoint(a,b,p) {
  const dx=b.x-a.x,dy=b.y-a.y,dz=b.z-a.z;
  const len=dx*dx+dy*dy+dz*dz;
  const f=len>0?clamp(((p.x-a.x)*dx+(p.y-a.y)*dy+(p.z-a.z)*dz)/len,0,1):0;
  return Math.hypot(a.x+dx*f-p.x,a.y+dy*f-p.y,a.z+dz*f-p.z);
}
export function evaluateGate(previous,current,gate) {
  const near=segmentDistanceToPoint(previous,current,gate)<gate.radius;
  const crossed=previous.z>=gate.z&&current.z<gate.z;
  return {passed:near,crossed,missed:crossed&&!near};
}
export function formatTime(seconds) {
  const s=Math.max(0,Math.floor(seconds)),m=Math.floor(s/60);
  return String(m).padStart(2,"0")+":"+String(s%60).padStart(2,"0");
}
