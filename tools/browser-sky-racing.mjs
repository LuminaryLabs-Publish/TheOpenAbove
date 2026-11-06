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
  assert.equal(startState.mode,"sky-racing");
  assert.equal(startState.race.total,12);
  await page.getByRole("button",{name:"START FLIGHT"}).click();
  await page.keyboard.down("KeyW");
  await page.keyboard.down("KeyD");
  await page.keyboard.down("Space");
  await page.waitForTimeout(1100);
  await page.keyboard.up("KeyW");
  await page.keyboard.up("KeyD");
  await page.keyboard.up("Space");
  const endState=await page.evaluate(()=>window.GameHost.getState());
  assert.equal(endState.race.started,true);
  assert.ok(endState.flight.z<startState.flight.z-20,
    "Glider must advance after player starts.");
  assert.ok(endState.flight.x>startState.flight.x,
    "Steering must move the glider horizontally.");
  assert.ok(endState.flight.y>startState.flight.y,
    "Climb input must raise the glider.");
  assert.ok(endState.flight.boost<1,
    "Boost must consume energy.");
  assert.equal(errors.length,0,"Browser JavaScript errors: "+errors.join("\n"));
  mkdirSync("artifacts",{recursive:true});
  await page.screenshot({path:"artifacts/sky-racing-smoke.png"});
  console.log(JSON.stringify({status:"passed",url:base,start:startState.flight,
    end:endState.flight,checkpoint:endState.race.gate,browserErrors:errors,
    screenshot:"artifacts/sky-racing-smoke.png"},null,2));
} finally {
  if(browser)await browser.close();
  server.kill("SIGTERM");
}
