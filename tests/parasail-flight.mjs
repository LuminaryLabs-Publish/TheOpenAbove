import assert from "node:assert/strict";
import {execFileSync} from "node:child_process";
import {readFileSync} from "node:fs";
import {
  createParasailState,advanceParasail,terrainHeight,windAt,makeAirRoutes,crossAirRoute
} from "../src/parasail/parasail-flight-sim.js";

const state=createParasailState();
assert.equal(state.y,500);
const forward=advanceParasail(state,{},1/60);
assert.ok(forward.z<state.z,"parasail should glide forward");
assert.ok(forward.elapsed>0);
const control=advanceParasail(state,{turn:1,lift:1},1/20);
assert.ok(control.yaw>state.yaw,"right brake line should turn canopy");
assert.ok(control.pitch>state.pitch,"pitch input should change canopy attitude");
const brake=advanceParasail(state,{brake:true},1/20);
assert.ok(brake.airspeed<forward.airspeed,"flare should reduce airspeed");
assert.ok(Number.isFinite(brake.vy));
const ridge=terrainHeight(3500,-1800);
const valley=terrainHeight(350,-1800);
assert.ok(ridge-valley>1100,"mountain relief should exceed 1100 meters");
const samples=[-4500,-1800,0,2000,4500].map(x=>terrainHeight(x,-2200));
assert.ok(samples.every(Number.isFinite));
const wind=windAt(1100,600,-1200,13);
assert.ok(wind.z<0);
assert.ok(Number.isFinite(wind.x)&&Number.isFinite(wind.y));
assert.ok(wind.lift>=0,"ridge and thermal lift cannot be negative");
const routes=makeAirRoutes();
assert.equal(routes.length,9);
assert.ok(routes.every((route,index)=>route.id===index+1&&route.radius>0));
const r=routes[0];
assert.ok(crossAirRoute({x:r.x,y:r.y,z:r.z+5},
  {x:r.x,y:r.y,z:r.z-5},r).passed);
assert.ok(!crossAirRoute({x:r.x+1000,y:r.y,z:r.z+5},
  {x:r.x+1000,y:r.y,z:r.z-5},r).passed);
for(const file of ["src/main.js","src/parasail/parasail-flight-sim.js","src/parasail/parasail-app.js"]){
  execFileSync(process.execPath,["--check",file]);
}
const app=readFileSync("src/parasail/parasail-app.js","utf8");
assert.match(app,/createCanopyRider/);
assert.match(app,/createWindStreaks/);
assert.match(app,/new THREE.InstancedMesh/);
assert.match(app,/PerspectiveCamera\(67,innerWidth\/innerHeight,0\.4,47000\)/);
assert.match(app,/requestAnimationFrame/);

// Domain / Service / Kit steering acceptance: stronger response and wind-supported climb.
const source=createParasailState();
const steering=advanceParasail(source,{turn:1,lift:1},1/20);
assert.ok(steering.yaw>0.03,"steering should respond promptly");
assert.ok(steering.pitch>0,"pulling back should tilt the canopy");
const ridgeX=1200,ridgeZ=-900,ridgeY=terrainHeight(ridgeX,ridgeZ)+400;
assert.ok(windAt(ridgeX,ridgeY,ridgeZ,20).y>1,"fixture must supply ridge lift");
let neutral={...source,x:ridgeX,y:ridgeY,z:ridgeZ,vy:0};
let pulled={...neutral};
for(let step=0;step<180;step++){
  neutral=advanceParasail(neutral,{lift:0},1/60);
  pulled=advanceParasail(pulled,{lift:1},1/60);
}
assert.ok(pulled.y>neutral.y+2,"pitch-back must improve altitude in rising wind");
assert.ok(pulled.vy>neutral.vy,"pitch-back must improve vertical response");

console.log("Parasailing steering, ridge lift and terrain integration passed.");
