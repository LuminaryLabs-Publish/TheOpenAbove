import assert from "node:assert/strict";
import {createDiveSlingshotService} from "../src/domains/parasailing/slingshot/slingshot-service.js";
import {createDiveRecoveryState,advanceDiveRecovery,MIN_DIVE_DISTANCE,MIN_UPDRAFT}
  from "../src/domains/parasailing/slingshot/recovery-kit.js";
import {advanceParasail,createParasailState} from "../src/parasail/parasail-flight-sim.js";

const sample=(collapse,vy,windY=1)=>({
  canopyCollapse:collapse,vy,wind:{y:windY}
});
const dt=1/60;
assert.equal(MIN_DIVE_DISTANCE,7);
assert.ok(MIN_UPDRAFT>0);
assert.throws(()=>advanceDiveRecovery(null,{}),/valid canopy/);
const service=createDiveSlingshotService();
assert.equal(service.snapshot().awards,0);
assert.equal(service.update(sample(.9,-8,2),{held:false,dt}),null,
  "unheld canopy cannot arm");
assert.equal(service.update(sample(.6,-8,2),{held:true,dt}),null,
  "a partial collapse cannot arm");
assert.equal(service.update(sample(.9,-3,2),{held:true,dt}),null,
  "a shallow descent cannot arm");
// Direct samples advance one second of genuine falling distance.
const sustainedDive=(windY=2,pullBack=1,down=-12)=>{
  service.reset();
  service.update(sample(.9,down,windY),{held:true,dt});
  for(let i=0;i<55;i++)
    service.update(sample(.95,down,windY),{held:true,dt});
  service.update(sample(.85,down,windY),{held:false,dt});
  service.update(sample(.52,-7,windY),{held:false,pullBack,dt});
  return service.update(sample(.42,-6,windY),{held:false,pullBack,dt});
};
const first=sustainedDive();
assert.equal(first.kind,"dive-to-lift-slingshot");
assert.ok(first.bonus>=7 && first.bonus<=18);
assert.ok(first.diveDistance>=MIN_DIVE_DISTANCE);
assert.ok(first.peakDescent>=12);
assert.equal(first.pullBack,true);
assert.equal(service.snapshot().awards,1);
for(let i=0;i<90;i++)
  assert.equal(service.update(sample(.04,-1,2),{held:false,pullBack:1,dt}),null,
    "repeated frames cannot award again");
assert.equal(service.snapshot().awards,1);

const stronger=sustainedDive(3,1,-15);
assert.ok(stronger.bonus>first.bonus,"a stronger dive and updraft must earn more speed");
for(const wind of [0,-2,MIN_UPDRAFT]){
  const event=sustainedDive(wind,1);
  assert.equal(event,null,"still/downward/borderline wind must not award");
}
assert.equal(sustainedDive(2,0),null,"recovery must require intentional W pull-back");
// Re-pressing Space during recovery must cancel the attempt.
service.reset();
service.update(sample(.9,-12,2),{held:true,dt});
for(let i=0;i<60;i++)service.update(sample(.96,-12,2),{held:true,dt});
service.update(sample(.75,-6,2),{held:false,dt});
service.update(sample(.4,-5,2),{held:true,pullBack:1,dt});
assert.equal(service.update(sample(.04,-2,2),{held:false,pullBack:1,dt}),null);
assert.equal(service.snapshot().awards,0);
// Too-short collapse is not a high-quality dive.
service.reset();
service.update(sample(.9,-12,2),{held:true,dt});
service.update(sample(.8,-10,2),{held:false,dt});
assert.equal(service.update(sample(.4,-6,2),{held:false,pullBack:1,dt}),null);
assert.equal(service.snapshot().awards,0);

// Integration: real wind sampler, canopy collapse, keyboard-equivalent input.
// No injected updraft or reward state.
service.reset();
let flight=createParasailState(),events=[],awardedY=0,climbFrames=0;
for(let step=0;step<330;step++){
  const collapse=step<115,lift=step>=115?1:0;
  flight=advanceParasail(flight,{collapse,lift},dt);
  const event=service.update(flight,{held:collapse,pullBack:lift,dt});
  if(event){
    events.push(event);awardedY=flight.y;
    const bonus=Math.min(event.bonus,80-flight.chainVelocity);
    flight={...flight,chainVelocity:flight.chainVelocity+bonus,
      vx:flight.vx+Math.sin(flight.yaw)*bonus,
      vz:flight.vz-Math.cos(flight.yaw)*bonus,
      vy:Math.max(flight.vy,4.5),recoveryLift:event.liftSeconds};
  }
  if(flight.recoveryLift>0&&flight.vy>0)climbFrames++;
}
assert.equal(events.length,1,"real world recovery must award once");
assert.ok(events[0].updraft>MIN_UPDRAFT);
assert.ok(climbFrames>=20,"recovery must cause sustained upward motion, not just a number");
assert.ok(flight.y>awardedY,"flight must climb after the slingshot, not keep falling");
assert.ok(flight.chainVelocity>=7,"earned speed persists");
assert.equal(service.snapshot().awards,1);
service.reset();
assert.equal(service.snapshot().awards,0);
console.log("TOA-014 V2: deliberate dive/pull-up, stronger-energy rewards, no-false-awards, sustained real upward flight passed.");
