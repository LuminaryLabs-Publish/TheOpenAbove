import { chromium } from "playwright";
import { spawn, spawnSync } from "node:child_process";
import { mkdir, copyFile, writeFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";

const base="http://127.0.0.1:4179/TheOpenAbove/";
const ffmpeg=(args)=>{const r=spawnSync("ffmpeg",args,{encoding:"utf8",maxBuffer:8*1024*1024});
  if(r.error)throw new Error("ffmpeg launch failed: "+r.error.message);
  if(r.status!==0)throw new Error("ffmpeg exit "+r.status+": "+String(r.stderr||r.stdout||"(no process output)").slice(-4200));};
const probe=(path)=>{
  const r=spawnSync("ffprobe",["-v","error","-show_entries","format=duration:stream=width,height,r_frame_rate","-of","json",path],{encoding:"utf8"});
  if(r.status!==0)throw new Error("ffprobe failed: "+r.stderr);
  return JSON.parse(r.stdout);
};
const server=spawn("./node_modules/.bin/vite",
  ["preview","--host","127.0.0.1","--port","4179","--strictPort"],
  {stdio:["ignore","pipe","pipe"]});
let serverLog="";
server.stdout.on("data",v=>{serverLog+=v.toString();});
server.stderr.on("data",v=>{serverLog+=v.toString();});
async function waitReady(){
  for(let i=0;i<120;i++){
    if(server.exitCode!==null)throw new Error("Preview exited: "+serverLog);
    try{const r=await fetch(base);if(r.ok)return;}catch{}
    await new Promise(resolve=>setTimeout(resolve,250));
  }
  throw new Error("Preview failed to open: "+serverLog);
}
const mediaDir="media/the-open-above-2026-11-06";
await mkdir(mediaDir,{recursive:true});
await mkdir(mediaDir+"/source",{recursive:true});
let browser=null,context=null;
try{
  await waitReady();
  browser=await chromium.launch({headless:true,args:[
    "--no-sandbox","--enable-webgl","--use-gl=angle","--use-angle=swiftshader",
    "--enable-unsafe-swiftshader"
  ]});
  context=await browser.newContext({
    viewport:{width:1280,height:720},deviceScaleFactor:1,
    recordVideo:{dir:mediaDir+"/source",size:{width:1280,height:720}}
  });
  const recordingStart=Date.now();
  const page=await context.newPage();
  const errors=[],consoleErrors=[];
  page.on("pageerror",error=>errors.push(String(error)));
  page.on("console",message=>{if(message.type()==="error")consoleErrors.push(message.text());});
  const res=await page.goto(base,{waitUntil:"domcontentloaded",timeout:45000});
  assert.equal(res.status(),200);
  await page.waitForFunction(()=>window.GameHost?.getState?.().mode==="parasailing"&&
    document.getElementById("boot")?.hidden===true,null,{timeout:45000});
  const initial=await page.evaluate(()=>window.GameHost.getState());
  await page.getByRole("button",{name:"BEGIN FLIGHT"}).click();
  await page.mouse.move(1275,715);
  const offset=(Date.now()-recordingStart)/1000;
  const shots=[];
  const segments=[
    {name:"steer-into-lift",keys:["KeyW","KeyD"],ms:1200},
    {name:"first-cloud-skim",keys:[],ms:8500},
    {name:"canopy-collapse",keys:["Space"],ms:3800},
    {name:"recover-wing",keys:["KeyW"],ms:6700},
    {name:"carve-across-wind",keys:["KeyA"],ms:3900},
    {name:"cloud-chain",keys:[],ms:10400},
    {name:"second-freefall",keys:["Space"],ms:4300},
    {name:"reinflate-and-bank",keys:["KeyD"],ms:7100},
    {name:"ride-updraft",keys:["KeyW"],ms:10100},
    {name:"open-sky-finish",keys:[],ms:9200}
  ];
  // Approximately 65 seconds of genuine player-controlled runtime, selected to 60 seconds.
  let seconds=0;
  for(const segment of segments){
    for(const key of segment.keys)await page.keyboard.down(key);
    await page.waitForTimeout(segment.ms);
    for(const key of segment.keys)await page.keyboard.up(key);
    seconds+=segment.ms/1000;
    const state=await page.evaluate(()=>window.GameHost.getState());
    shots.push({at:seconds,action:segment.name,
      x:state.flight.x,y:state.flight.y,z:state.flight.z,
      combo:state.combo?.combo,score:state.combo?.score,
      momentum:state.combo?.momentum,canopyCollapse:state.flight.canopyCollapse});
    if([1,3,5,7,9].includes(shots.length)){
      await page.screenshot({path:mediaDir+"/source/shot-"+String(shots.length).padStart(2,"0")+".png"});
    }
  }
  const finalState=await page.evaluate(()=>window.GameHost.getState());
  assert.equal(errors.length,0,"Page errors during capture: "+errors.join(";"));
  assert.equal(finalState.mode,"parasailing");
  await context.close();
  const videoPath=await page.video().path();
  await copyFile(videoPath,mediaDir+"/source/parasail-original.webm");
  const output=mediaDir+"/TheOpenAbove-WindCombo-60s.mp4";
  ffmpeg(["-y","-ss",String(offset),"-i",videoPath,"-t","60",
    "-vf","fps=30,scale=1280:720:flags=lanczos,format=yuv420p",
    "-c:v","libx264","-preset","fast","-crf","22",
    "-movflags","+faststart","-an",output]);
  const info=probe(output);
  const duration=Number(info.format?.duration)||0;
  assert.ok(duration>=59.4&&duration<=60.3,"Expected 60 second MP4; got "+duration);
  ffmpeg(["-y","-i",output,"-vf","fps=1/10,scale=384:-1,tile=3x2",
    "-frames:v","1",mediaDir+"/contact-sheet.png"]);
  const sha256=createHash("sha256").update(readFileSync(output)).digest("hex");
  const manifest={
    schema:"luminary-media-pack/1",project:"The Open Above",
    kind:"internal-review-gameplay",published:false,
    sourceCommit:process.env.GITHUB_SHA||"unknown",
    sourceUrl:base,date:new Date().toISOString(),
    viewport:"1280x720",browser:browser.version(),captureSeconds:seconds,
    master:output,masterDuration:duration,sha256,
    recordingNote:"Actual headless Chromium WebGL gameplay; 60-second continuous excerpt, silent; no synthetic replacement footage.",
    initial:initial.flight,final:finalState.flight,
    finalCombo:finalState.combo,shotLog:shots,
    pageErrors:errors,consoleErrors
  };
  await writeFile(mediaDir+"/manifest.json",JSON.stringify(manifest,null,2)+"\n");
  console.log(JSON.stringify({
    status:"passed",sourceCommit:manifest.sourceCommit,duration,sha256,
    finalCombo:manifest.finalCombo,output,contactSheet:mediaDir+"/contact-sheet.png"
  },null,2));
}catch(error){
  console.error(error);
  process.exitCode=1;
}finally{
  if(context)await context.close().catch(()=>{});
  if(browser)await browser.close().catch(()=>{});
  server.kill("SIGTERM");
}
