import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import assert from "node:assert/strict";

const base="http://127.0.0.1:4173/TheOpenAbove/";
const server=spawn("./node_modules/.bin/vite",
  ["preview","--host","127.0.0.1","--port","4173","--strictPort"],
  {stdio:["ignore","pipe","pipe"]});
let output="";
server.stdout.on("data",data=>{output+=data.toString();});
server.stderr.on("data",data=>{output+=data.toString();});
async function ready() {
  for(let n=0;n<90;n++){
    if(server.exitCode!==null)throw new Error("Vite preview exited: "+output);
    try {const response=await fetch(base);if(response.ok)return;}catch{}
    await new Promise(resolve=>setTimeout(resolve,250));
  }
  throw new Error("Preview startup exceeded 22.5 seconds: "+output);
}
let browser;
try {
  await ready();
  browser=await chromium.launch({
    headless:true,
    args:["--no-sandbox","--enable-webgl","--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader"]
  });
  const page=await browser.newPage({viewport:{width:1280,height:800},deviceScaleFactor:1});
  const errors=[];
  page.on("pageerror",error=>errors.push(String(error?.stack||error)));
  const response=await page.goto(base,{waitUntil:"domcontentloaded",timeout:45000});
  assert.equal(response.status(),200);
  await page.waitForFunction(()=>
    Boolean(window.GameHost?.getState?.()) && document.getElementById("boot")?.hidden===true,
    null,{timeout:45000}
  );
  const startState=await page.evaluate(()=>window.GameHost.getState());
  assert.equal(startState.mode,"parasailing");
  assert.equal(startState.combo.totalClouds,13);
  assert.ok(startState.atmosphere.drawDistance>=40000);
  assert.ok(startState.terrain.sampleHeight<startState.flight.y);
  await page.getByRole("button",{name:"BEGIN FLIGHT"}).click();
  await page.keyboard.down("KeyW");
  await page.keyboard.down("KeyD");
  await page.keyboard.down("Space");
  await page.waitForTimeout(1100);
  await page.keyboard.up("KeyW");
  await page.keyboard.up("KeyD");
  await page.keyboard.up("Space");
  const endState=await page.evaluate(()=>window.GameHost.getState());
  assert.equal(endState.route.started,true);
  assert.ok(endState.flight.z<startState.flight.z-10,
    "Parasail must drift downwind after player starts.");
  assert.ok(endState.flight.yaw>startState.flight.yaw,
    "Brake-line steering must rotate the parasail.");
  assert.ok(endState.flight.pitch>startState.flight.pitch,
    "Pitch input must adjust the canopy rather than force an unrealistic climb.");
  assert.ok(endState.flight.wind && Number.isFinite(endState.flight.wind.y),
    "Terrain-aware wind must be available.");
  await page.keyboard.down("Space");
  await page.waitForTimeout(1000);
  const collapsed=await page.evaluate(()=>window.GameHost.getState());
  assert.ok(collapsed.flight.canopyCollapse>.65,"Holding Space must pull in canopy");
  assert.ok(collapsed.flight.vy<endState.flight.vy-2,"Holding Space must accelerate descent");
  assert.match(await page.locator("#canopyStatus").textContent(),/PULLED IN/);
  await page.keyboard.up("Space");
  await page.waitForTimeout(1100);
  const reopened=await page.evaluate(()=>window.GameHost.getState());
  assert.ok(reopened.flight.canopyCollapse<collapsed.flight.canopyCollapse*.3,
    "Canopy must reinflate on release");
  await page.waitForFunction(()=>window.GameHost.getState().combo.combo>=1,
    null,{timeout:20000});
  const chained=await page.evaluate(()=>window.GameHost.getState());
  assert.ok(chained.combo.momentum>0,"Cloud skim must award persistent speed");
  assert.match(await page.locator("#comboScore").textContent(),/PTS/);
  // TOA-014 V2 real browser input: Space alone cannot trigger a reward.
  await page.keyboard.press("KeyR");
  await page.keyboard.down("Space");
  await page.waitForTimeout(1850);
  const dive=await page.evaluate(()=>window.GameHost.getState());
  assert.ok(dive.flight.canopyCollapse>=.8,"Space must collapse canopy");
  assert.equal(dive.slingshot.awards,0,"Holding Space must never award early");
  await page.keyboard.up("Space");
  await page.waitForTimeout(780);
  assert.equal((await page.evaluate(()=>window.GameHost.getState())).slingshot.awards,0,
    "Without W pull-back the dive must not trigger an automatic speed reward");

  // New flight: hold Space for a sustained dive, then release and pull back with W.
  await page.keyboard.press("KeyR");
  await page.keyboard.down("Space");
  await page.waitForTimeout(1850);
  const armed=await page.evaluate(()=>window.GameHost.getState());
  assert.ok(armed.slingshot.diveDistance>=7,
    "Dive must accumulate real downward distance before earning a slingshot");
  await page.keyboard.down("KeyW");
  await page.keyboard.up("Space");
  await page.waitForFunction(()=>window.GameHost.getState().slingshot.awards===1,
    null,{timeout:18000});
  const slingshot=await page.evaluate(()=>window.GameHost.getState());
  assert.equal(slingshot.slingshot.lastEvent?.kind,"dive-to-lift-slingshot");
  assert.ok(slingshot.slingshot.lastEvent.updraft>.55,
    "Slingshot requires measured rising air");
  assert.ok(slingshot.slingshot.lastEvent.diveDistance>=7);
  assert.ok(slingshot.flight.chainVelocity>=7,"Earned speed must persist");
  assert.ok(slingshot.flight.vy>0,
    "A real slingshot must generate upward motion, not just a speed number");
  const recoveryHeight=slingshot.flight.y;
  await page.waitForTimeout(650);
  const recovered=await page.evaluate(()=>window.GameHost.getState());
  await page.keyboard.up("KeyW");
  assert.ok(recovered.flight.y>recoveryHeight+.6,
    "The rider must visibly climb during the recovery window");
  assert.equal(recovered.slingshot.awards,1,
    "An unbroken recovery cannot repeat the reward");
  assert.equal(errors.length,0,"Browser JavaScript errors: "+errors.join("\n"));
  mkdirSync("artifacts",{recursive:true});
  await page.screenshot({path:"artifacts/parasail-smoke.png"});
  console.log(JSON.stringify({status:"passed",url:base,start:startState.flight,
    end:endState.flight,combo:chained.combo.combo,browserErrors:errors,
    screenshot:"artifacts/parasail-smoke.png"},null,2));
} finally {
  if(browser)await browser.close();
  server.kill("SIGTERM");
}
