import assert from "node:assert/strict";
import {createDiveSlingshotService} from "../src/domains/parasailing/slingshot/slingshot-service.js";
import {createDiveRecoveryState,advanceDiveRecovery,SLINGSHOT_BONUS} from "../src/domains/parasailing/slingshot/recovery-kit.js";
import {advanceParasail,createParasailState} from "../src/parasail/parasail-flight-sim.js";

function sample(collapse,vy,windY=1){
  return {canopyCollapse:collapse,vy,wind:{y:windY}};
}
assert.equal(SLINGSHOT_BONUS,8);
assert.throws(()=>advanceDiveRecovery(null,{}),/valid canopy/);
const service=createDiveSlingshotService();
assert.deepEqual(service.snapshot(),{phase:"idle",armed:false,awards:0,lastEvent:null});
assert.equal(service.update(sample(.9,-7,2),{held:false}),null,
  "high collapse without held input cannot arm");
assert.equal(service.update(sample(.6,-7,2),{held:true}),null,
  "insufficient collapse must not arm");
assert.equal(service.update(sample(.9,-2,2),{held:true}),null,
  "lack of substantial descent must not arm");
assert.equal(service.update(sample(.9,-8,2),{held:true}),null);
assert.equal(service.snapshot().phase,"armed");
assert.equal(service.update(sample(.7,-8,2),{held:false}),null);
assert.equal(service.update(sample(.16,-5,2),{held:false}),null);
const prize=service.update(sample(.14,-4,2),{held:false});
assert.equal(prize.kind,"dive-to-lift-slingshot");
assert.equal(prize.bonus,SLINGSHOT_BONUS);
assert.equal(prize.awardNumber,1);
for(let i=0;i<60;i++)
  assert.equal(service.update(sample(.03,-2,2),{held:false}),null,
    "same recovery must not give repeated rewards");
assert.equal(service.snapshot().awards,1);

// Abort if Space is re-pressed before the threshold.
service.reset();
service.update(sample(.9,-8,2),{held:true});
service.update(sample(.6,-6,2),{held:false});
service.update(sample(.5,-6,2),{held:true});
assert.equal(service.update(sample(.09,-3,2),{held:false}),null);
assert.equal(service.snapshot().awards,0);

// No reward in still air or downdraft, even for a complete dive.
for(const wind of [0,-3,.5]){
  service.reset();
  service.update(sample(.9,-8,wind),{held:true});
  service.update(sample(.4,-7,wind),{held:false});
  assert.equal(service.update(sample(.14,-5,wind),{held:false}),null);
  assert.equal(service.snapshot().awards,0);
}

// A fresh, independently held dive is eligible after the prior one completes.
service.reset();
for(let cycle=0;cycle<2;cycle++){
  service.update(sample(.9,-8,2),{held:true});
  service.update(sample(.45,-7,2),{held:false});
  assert.equal(service.update(sample(.14,-6,2),{held:false})?.awardNumber,cycle+1);
  service.update(sample(.01,-2,2),{held:false});
}
assert.equal(service.snapshot().awards,2);
service.reset();
assert.equal(service.snapshot().awards,0);

// End-to-end integration: real collapse, real atmospheric field, no injected updraft.
let flight=createParasailState();
service.reset();
const events=[];
for(let step=0;step<260;step++){
  const held=step<100;
  flight=advanceParasail(flight,{collapse:held},1/60);
  const event=service.update(flight,{held});
  if(event){
    events.push(event);
    flight={...flight,chainVelocity:Math.min(80,flight.chainVelocity+event.bonus),
      vx:flight.vx+Math.sin(flight.yaw)*event.bonus,
      vz:flight.vz-Math.cos(flight.yaw)*event.bonus};
  }
}
assert.equal(events.length,1,"one genuine Space-held dive and updraft recovery");
assert.equal(flight.chainVelocity,8,"earned speed must persist after release");
assert.ok(flight.wind.y>.5,"recovery fixture must sample rising air");
assert.equal(service.snapshot().awards,1);
console.log("TOA-014 recovery service, negative cases, one-shot timing and live wind integration passed.");
