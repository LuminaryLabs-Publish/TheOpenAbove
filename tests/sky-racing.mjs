import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { createFlightState, advanceFlight, makeRaceGates, evaluateGate, formatTime } from "../src/racing/flight-sim.js";

const initial=createFlightState();
assert.equal(initial.y,230);
const forward=advanceFlight(initial,{},1/60);
assert.ok(forward.z<initial.z);
assert.ok(forward.elapsed>0);
const climbing=advanceFlight(initial,{lift:1,boost:true},1/20);
assert.ok(climbing.pitch>0);
assert.ok(climbing.boost<1);
const turning=advanceFlight(initial,{turn:1},1/20);
assert.ok(turning.x>initial.x);
assert.notEqual(turning.yaw,0);
const lower=advanceFlight(initial,{lift:-1},1/20);
assert.ok(lower.pitch<0);
assert.ok(lower.verticalSpeed<=0);
const gates=makeRaceGates();
assert.equal(gates.length,12);
assert.ok(gates.every((gate,i)=>gate.id===i+1&&gate.z<0&&gate.radius>0));
assert.equal(evaluateGate({x:gates[0].x,y:gates[0].y,z:gates[0].z+1},
  {x:gates[0].x,y:gates[0].y,z:gates[0].z-1},gates[0]).passed,true);
assert.equal(evaluateGate({x:1000,y:gates[0].y,z:gates[0].z+1},
  {x:1000,y:gates[0].y,z:gates[0].z-1},gates[0]).missed,true);
assert.equal(formatTime(125.9),"02:05");
for(const file of ["src/racing/flight-sim.js","src/racing/sky-racing-app.js","src/main.js"]){
  execFileSync(process.execPath,["--check",file]);
}
const app=readFileSync("src/racing/sky-racing-app.js","utf8");
const entry=readFileSync("src/main.js","utf8");
assert.match(app,/new THREE.WebGLRenderer/);
assert.match(app,/requestAnimationFrame/);
assert.match(app,/renderer.render/);
assert.match(app,/startSkyRacing/);
assert.doesNotMatch(entry,/createMeadowLiftScene|worldPreparation.prepare/);
console.log("Sky racing flight, checkpoint geometry, startup and syntax passed.");
