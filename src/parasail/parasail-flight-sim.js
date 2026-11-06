// Renderer-neutral wind and parasail dynamics.
import {resolveWindRidingSteering} from "../domains/parasailing/wind-riding/steering-kit.js";
import {advanceCanopyCollapse} from "../domains/parasailing/canopy/collapse-kit.js";
export const PARASAIL_MODEL_VERSION = "1.0.0";
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const smooth=(from,to,rate,dt)=>from+(to-from)*(1-Math.exp(-rate*dt));
export function terrainHeight(x,z){
  const ax=Math.abs(x);
  const wall=clamp((ax-420)/2150,0,1);
  const mountain=Math.pow(wall,1.53)*(1150+380*Math.sin(z*.00055+x*.00045)+170*Math.sin(z*.0022-x*.0019));
  const asymmetric=225*Math.pow(clamp((x+700)/2600,0,1),2)*Math.pow(Math.sin(z*.00071+.3),2);
  const folds=135*Math.sin(x*.0018+z*.00075)*Math.cos(z*.0014-x*.00053);
  const ridges=75*Math.sin(x*.0061+z*.0044)*Math.sin(x*.0031-z*.006);
  const breakups=32*Math.sin(x*.017)*Math.sin(z*.012);
  const basin=95*Math.exp(-Math.pow((x-350)/1050,2))*Math.cos(z*.0016);
  return Math.max(-110,24+mountain+asymmetric+folds*(.28+.72*wall)+ridges*(.23+.77*wall)+breakups*(.18+.82*wall)+basin);
}
export function windAt(x,y,z,time=0){
  const offset=Math.sin(z*.00043+time*.025)*.48+Math.cos(x*.00071-time*.018)*.28;
  const direction=-.07+offset;
  const speed=10.6+2.7*Math.sin(y*.0037+time*.031)+1.6*Math.cos(z*.00051);
  const rise=clamp((terrainHeight(x+90,z)-terrainHeight(x-90,z))/180,-3,3);
  const ridgeLift=Math.max(0,rise)*3.3;
  const thermal=Math.max(0,Math.sin((x+230)*.0012)*Math.cos((z-430)*.00095))*
    (2.8+1.4*Math.sin(time*.09))*Math.exp(-Math.pow((y-420)/1100,2));
  const downdraft=Math.max(0,-rise)*1.2;
  return {x:Math.sin(direction)*speed+2.3*Math.sin(z*.0008+time*.043),
    y:ridgeLift+thermal-downdraft-.65,
    z:-Math.cos(direction)*speed,
    lift:ridgeLift+thermal,
    speed,
    slope:rise};
}
export function createParasailState(){
  return {x:0,y:500,z:180,yaw:0,bank:0,pitch:0,airspeed:20.5,
    vx:0,vy:-.2,vz:-18.8,elapsed:0,distance:0,glide:0,sway:0,wind:null,canopyCollapse:0,chainVelocity:0,recoveryLift:0};
}
export function advanceParasail(state,control={},dt=1/60){
  const d=clamp(Number(dt)||0,0,1/20);
  const w=windAt(state.x,state.y,state.z,state.elapsed);
  const canopy=advanceCanopyCollapse({fraction:state.canopyCollapse,held:control.collapse,dt:d});
  const controlState=resolveWindRidingSteering({state,wind:w,turn:(Number(control.turn)||0)*canopy.steeringAuthority,
    pullBack:control.lift,flare:Boolean(control.brake),dt:d});
  const {airspeed,yaw,bank,pitch:canopyPitch}=controlState;
  // Cloud combo velocity is persistent: no timer, air drag or transition silently resets it.
  const chainVelocity=Math.min(80,Math.max(0,Number(state.chainVelocity)||0,Number(control.chainVelocity)||0));
  const forwardX=Math.sin(yaw)*(airspeed+chainVelocity);
  const forwardZ=-Math.cos(yaw)*(airspeed+chainVelocity);
  const drag=controlState.flare?2.5:1.7;
  const targetVx=forwardX+w.x*.88;
  const targetVz=forwardZ+w.z*.85;
  let vx=smooth(state.vx,targetVx,drag,d);
  let vz=smooth(state.vz,targetVz,drag,d);
  // Preserve all earned horizontal speed while steering; only deliberate flare can slow the glide.
  if(!controlState.flare){
    const retained=Math.max(Math.hypot(state.vx,state.vz),Math.hypot(targetVx,targetVz));
    const resolved=Math.hypot(vx,vz);
    if(resolved>1e-6){const factor=retained/resolved;vx*=factor;vz*=factor;}
  }
  const collapsedTarget=controlState.verticalTarget - canopy.extraSink - Math.max(0,w.y)*.6*(1-canopy.liftFraction);
  // A successful dive recovery temporarily converts stored descent energy to climb.
  // The impulse belongs to TOA-014; base updraft and steering are unchanged.
  const recoveryLift=Math.max(0,(Number(state.recoveryLift)||0)-d);
  const recoveryAssist=recoveryLift>0?5.2*Math.min(1,recoveryLift/.55):0;
  const vy=smooth(state.vy,clamp(collapsedTarget+recoveryAssist,-16,8),
    recoveryLift>0?2.5:canopy.fraction>.2?2.7:1.55,d);
  const x=state.x+vx*d,z=state.z+vz*d;
  const minHeight=terrainHeight(x,z)+19;
  const y=Math.max(minHeight,state.y+vy*d);
  const sway=smooth(state.sway,controlState.steer*.24+Math.sin(state.elapsed*1.08)*.023,2.3,d);
  return {x,y,z,yaw,bank,pitch:canopyPitch,airspeed,vx,vy:y===minHeight?0:vy,vz,
    elapsed:state.elapsed+d,distance:state.distance+Math.hypot(vx*d,vy*d,vz*d),
    glide:Math.max(0,y-terrainHeight(x,z)),sway,wind:w,pullBack:controlState.pullBack,
    canopyCollapse:canopy.fraction,canopyMode:canopy.mode,chainVelocity,recoveryLift};
}
export function makeAirRoutes(){
  return Array.from({length:9},(_,i)=>{
    const n=i+1,z=180-n*510,x=210*Math.sin(n*.63)-80*Math.cos(n*.27);
    return {id:n,x,y:terrainHeight(x,z)+365+105*Math.sin(n*.68),z,radius:155};
  });
}
export function segmentDistance(a,b,p){
  const dx=b.x-a.x,dy=b.y-a.y,dz=b.z-a.z;
  const l2=dx*dx+dy*dy+dz*dz;
  const t=l2>0?clamp(((p.x-a.x)*dx+(p.y-a.y)*dy+(p.z-a.z)*dz)/l2,0,1):0;
  return Math.hypot(a.x+dx*t-p.x,a.y+dy*t-p.y,a.z+dz*t-p.z);
}
export function crossAirRoute(a,b,route){
  return {passed:segmentDistance(a,b,route)<route.radius,
    ahead:Math.hypot(route.x-b.x,route.y-b.y,route.z-b.z)};
}
