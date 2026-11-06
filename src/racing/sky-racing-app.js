import * as THREE from "three";
import { createFlightState, advanceFlight, makeRaceGates, evaluateGate, formatTime } from "./flight-sim.js";

const $=id=>document.getElementById(id);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const hash=(x,z)=>{const v=Math.sin(x*127.1+z*311.7)*43758.5453;return v-Math.floor(v);};
function field(x,z){
  const ridge=Math.pow(clamp((Math.abs(x)-260)/1500,0,1),1.4);
  const broad=75*Math.sin(x*0.0042+z*0.0008)+58*Math.cos(z*0.0033-x*0.002);
  const detail=22*Math.sin(x*0.017+z*0.021)*Math.cos(z*0.016);
  return 11+ridge*(410+broad+detail)+11*Math.sin(x*0.003+z*0.005)+16*Math.sin(z*0.004);
}
function buildTerrain(scene) {
  const xN=100,zN=136,width=7600,length=6800;
  const positions=[],colors=[],indices=[];
  for(let zi=0;zi<=zN;zi++)for(let xi=0;xi<=xN;xi++){
    const x=(xi/xN-.5)*width,z=800-zi/zN*length;
    const y=field(x,z);
    positions.push(x,y,z);
    const t=clamp((y+20)/390,0,1);
    const dune=new THREE.Color(t>.65?"#647577":t>.28?"#56716d":"#3d6664");
    dune.lerp(new THREE.Color("#acb5a4"),Math.max(0,t-.68)*0.7);
    dune.multiplyScalar(0.86+hash(xi,zi)*0.2);
    colors.push(dune.r,dune.g,dune.b);
  }
  for(let z=0;z<zN;z++)for(let x=0;x<xN;x++){
    const a=z*(xN+1)+x,b=a+1,c=a+xN+1,d=c+1;
    indices.push(a,b,c,b,d,c);
  }
  const geo=new THREE.BufferGeometry();
  geo.setAttribute("position",new THREE.Float32BufferAttribute(positions,3));
  geo.setAttribute("color",new THREE.Float32BufferAttribute(colors,3));
  geo.setIndex(indices);geo.computeVertexNormals();
  const mat=new THREE.MeshStandardMaterial({vertexColors:true,roughness:0.96,metalness:0,side:THREE.DoubleSide});
  const terrain=new THREE.Mesh(geo,mat);terrain.receiveShadow=true;scene.add(terrain);
  const water=new THREE.Mesh(new THREE.PlaneGeometry(7500,6800),
    new THREE.MeshStandardMaterial({color:"#2e6574",roughness:0.28,metalness:0.08,transparent:true,opacity:0.77}));
  water.rotation.x=-Math.PI/2;water.position.set(0,-8,-2500);scene.add(water);
  return {terrain,water};
}
function buildClouds(scene){
  const mat=new THREE.MeshLambertMaterial({color:"#f5f5ed",transparent:true,opacity:0.70,depthWrite:false});
  const mesh=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1,1),mat,410);
  const dummy=new THREE.Object3D();let n=0;
  for(let i=0;i<82;i++){
    const seed=i*13.17,centerX=(hash(i,11)-.5)*4400;
    const centerZ=600-hash(i,23)*6100;
    const centerY=155+hash(i,17)*280;
    // Keep the racing corridor readable while cloud clusters emphasize depth.
    for(let j=0;j<5;j++){
      const x=centerX+(hash(i,j*3+29)-.5)*145;
      const z=centerZ+(hash(j+3,i)-.5)*120;
      const y=centerY+(hash(i+5,j+7)-.5)*25;
      dummy.position.set(x,y,z);
      const r=32+hash(i+2,j+1)*63;
      dummy.scale.set(r*1.65,r*.39,r*.77);
      dummy.updateMatrix();mesh.setMatrixAt(n++,dummy.matrix);
    }
  }
  mesh.instanceMatrix.needsUpdate=true;mesh.frustumCulled=false;scene.add(mesh);
  return mesh;
}
function buildGlider(){
  const craft=new THREE.Group();
  const bodyMat=new THREE.MeshStandardMaterial({color:"#e1eced",metalness:0.60,roughness:0.24,flatShading:false});
  const accent=new THREE.MeshStandardMaterial({color:"#ffad62",metalness:0.55,roughness:0.27,emissive:"#c15b2a",emissiveIntensity:0.23});
  const dark=new THREE.MeshStandardMaterial({color:"#132d3c",metalness:0.70,roughness:0.22});
  function geom(points,faces){
    const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute(points.flat(),3));
    g.setIndex(faces.flat());g.computeVertexNormals();return g;
  }
  const hull=new THREE.Mesh(new THREE.ConeGeometry(3.6,23,10),bodyMat);
  hull.rotation.x=-Math.PI/2;hull.position.z=-1;craft.add(hull);
  const cockpit=new THREE.Mesh(new THREE.SphereGeometry(3.2,16,10),dark);
  cockpit.scale.set(.68,.4,2);cockpit.position.set(0,1,-3);craft.add(cockpit);
  const wings=geom([
    [0,0,-8],[-27,-.8,8],[-31,-.6,15],[-3,0,8],
    [0,0,-8],[27,-.8,8],[31,-.6,15],[3,0,8]
  ],[[0,1,2],[0,2,3],[4,6,5],[4,7,6]]);
  craft.add(new THREE.Mesh(wings,new THREE.MeshStandardMaterial({color:"#d7e4e4",metalness:.55,roughness:.3,side:THREE.DoubleSide})));
  for(const sign of [-1,1]){
    const stripe=new THREE.Mesh(new THREE.BoxGeometry(16,.22,2.2),accent);
    stripe.position.set(sign*17,-.45,9.5);stripe.rotation.y=sign*.12;craft.add(stripe);
    const tip=new THREE.Mesh(new THREE.BoxGeometry(1,3,7),dark);
    tip.position.set(sign*29,1.0,11);craft.add(tip);
    const tail=new THREE.Mesh(new THREE.BoxGeometry(9,.36,3.6),bodyMat);
    tail.position.set(sign*6,0,10);craft.add(tail);
  }
  const fin=new THREE.Mesh(new THREE.BoxGeometry(.8,7,5.5),accent);fin.position.set(0,3,10);craft.add(fin);
  const exhaust=new THREE.Mesh(new THREE.CylinderGeometry(1.4,2.4,4,12),dark);
  exhaust.rotation.x=Math.PI/2;exhaust.position.z=10;craft.add(exhaust);
  const glow=new THREE.Mesh(new THREE.ConeGeometry(2.4,12,12,1,true),
    new THREE.MeshBasicMaterial({color:"#71ddf3",transparent:true,opacity:.72,depthWrite:false,side:THREE.DoubleSide}));
  glow.rotation.x=Math.PI/2;glow.position.z=18;craft.add(glow);
  craft.userData.exhaust=glow;
  return craft;
}
function buildGates(scene,data){
  const bright=new THREE.MeshBasicMaterial({color:"#8df0f5",transparent:true,opacity:.88,depthWrite:false});
  const secondary=new THREE.MeshBasicMaterial({color:"#f5b76e",transparent:true,opacity:.68,depthWrite:false});
  const group=new THREE.Group();scene.add(group);
  const records=data.map(g=>{
    const holder=new THREE.Group();holder.position.set(g.x,g.y,g.z);holder.name="RACE GATE "+g.id;
    const ring=new THREE.Mesh(new THREE.TorusGeometry(g.radius,4,8,64),bright.clone());
    const inner=new THREE.Mesh(new THREE.TorusGeometry(g.radius-9,1.25,6,64),secondary.clone());
    holder.add(ring,inner);
    for(let j=0;j<4;j++){
      const a=j*Math.PI/2+Math.PI/4;
      const tick=new THREE.Mesh(new THREE.BoxGeometry(4,12,2),secondary.clone());
      tick.position.set(Math.cos(a)*(g.radius+3),Math.sin(a)*(g.radius+3),0);
      tick.rotation.z=a-Math.PI/2;holder.add(tick);
    }
    group.add(holder);return holder;
  });
  return {group,records,update(index,elapsed){
    for(let i=0;i<records.length;i++){
      const holder=records[i],active=i===index;
      holder.visible=i>=index;
      const ring=holder.children[0];
      ring.material.color.set(active?"#bafff2":"#699ca7");
      ring.material.opacity=active?0.96:0.4;
      holder.rotation.z=Math.sin(elapsed*.4+i)*.035;
      holder.scale.setScalar(active?1+.012*Math.sin(elapsed*4):1);
    }
  }};
}
function createInput() {
  const keys=new Set();
  const keydown=e=>{
    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space"].includes(e.code))e.preventDefault();
    keys.add(e.code);
  };
  const keyup=e=>keys.delete(e.code);
  const blur=()=>keys.clear();
  addEventListener("keydown",keydown);addEventListener("keyup",keyup);addEventListener("blur",blur);
  const pointer=new Map();
  for(const button of document.querySelectorAll("[data-control]")){
    const type=button.dataset.control;
    const down=e=>{e.preventDefault();button.setPointerCapture?.(e.pointerId);pointer.set(type,true);button.classList.add("active");};
    const up=e=>{e.preventDefault();pointer.delete(type);button.classList.remove("active");};
    button.addEventListener("pointerdown",down);
    button.addEventListener("pointerup",up);
    button.addEventListener("pointercancel",up);
    button.addEventListener("lostpointercapture",up);
  }
  return {read:()=>({
    turn:Number(keys.has("KeyD")||keys.has("ArrowRight")||pointer.has("right"))-
      Number(keys.has("KeyA")||keys.has("ArrowLeft")||pointer.has("left")),
    lift:Number(keys.has("KeyW")||keys.has("ArrowUp")||pointer.has("up"))-
      Number(keys.has("KeyS")||keys.has("ArrowDown")||pointer.has("down")),
    boost:keys.has("Space")||pointer.has("boost"),
    brake:keys.has("ShiftLeft")||keys.has("ShiftRight")||pointer.has("brake")
  }),dispose(){removeEventListener("keydown",keydown);removeEventListener("keyup",keyup);removeEventListener("blur",blur);}};
}
export function startSkyRacing() {
  const canvas=$("game");
  const renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:"high-performance",alpha:false});
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.75));
  renderer.setSize(innerWidth,innerHeight,false);
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.16;
  const scene=new THREE.Scene();
  scene.background=new THREE.Color("#85adbe");
  scene.fog=new THREE.FogExp2("#8bb5bd",.00024);
  const camera=new THREE.PerspectiveCamera(67,innerWidth/innerHeight,.5,11500);
  const sun=new THREE.DirectionalLight("#ffe7b9",3.15);
  sun.position.set(-750,1400,-1700);
  scene.add(sun,new THREE.HemisphereLight("#cce6fa","#627369",2.15));
  const terrain=buildTerrain(scene);
  const clouds=buildClouds(scene);
  const gates=makeRaceGates(12);
  const gateWorld=buildGates(scene,gates);
  const craft=buildGlider();scene.add(craft);
  const input=createInput();
  const race={state:createFlightState(),index:0,penalty:0,started:false,paused:false,finished:false,lastEvent:"",best:null};
  const target=new THREE.Vector3(),wantCamera=new THREE.Vector3();
  let disposed=false,raf=0,lastTime=performance.now(),acc=0,hudTime=0;
  const message=(text)=>{race.lastEvent=text;$("toast").textContent=text;$("toast").classList.add("show");};
  function reset(){
    race.state=createFlightState();race.index=0;race.penalty=0;race.started=false;race.paused=false;race.finished=false;
    $("menuTitle").textContent="THE OPEN ABOVE";
    $("menuSubtitle").textContent="A new kind of sky racing.";
    $("startButton").textContent="START FLIGHT";
    $("menu").hidden=false;
    $("result").hidden=true;
    message("COURSE READY · 12 SKY GATES");
    gateWorld.update(0,0);
  }
  function start(){
    if(race.finished)reset();
    race.started=true;race.paused=false;$("menu").hidden=true;$("result").hidden=true;
    message("GO · FOLLOW THE LUMINOUS GATES");
  }
  function complete(){
    race.finished=true;race.started=false;
    const seconds=race.state.elapsed+race.penalty;
    let best=null;
    try{best=Number(localStorage.getItem("the-open-above-race-best"));}catch{}
    if(!best||seconds<best){best=seconds;try{localStorage.setItem("the-open-above-race-best",String(seconds));}catch{}}
    $("resultTime").textContent=formatTime(seconds);
    $("resultBest").textContent=formatTime(best);
    $("result").hidden=false;
    $("menu").hidden=false;
    $("menuTitle").textContent="FINISH LINE";
    $("menuSubtitle").textContent="An open sky. A faster way through.";
    $("startButton").textContent="RACE AGAIN";
    message("FINISH · ROUTE COMPLETE");
  }
  function tick(dt){
    const before=race.state;
    race.state=advanceFlight(before,input.read(),dt);
    const current=race.state;
    const terrainHeight=field(current.x,current.z);
    if(current.y<terrainHeight+18) {
      race.penalty+=5;
      current.y=terrainHeight+70;
      current.pitch=0;
      current.speed=Math.min(current.speed,78);
      message("TERRAIN CONTACT · +5 SEC");
    }
    const gate=gates[race.index];
    if(gate){
      const outcome=evaluateGate(before,current,gate);
      if(outcome.passed){
        race.index++;
        message(race.index===gates.length?"ALL GATES CLEARED":("GATE "+race.index+" / "+gates.length+" · CLEAN"));
        if(race.index===gates.length)complete();
      }else if(outcome.missed){
        race.penalty+=5;
        current.x=gate.x;current.y=gate.y;current.z=gate.z+175;
        current.yaw=0;current.pitch=0;current.bank=0;current.speed=82;
        message("GATE MISSED · +5 SEC · RESET POSITION");
      }
    }
  }
  function render(dt){
    const s=race.state;
    craft.position.set(s.x,s.y,s.z);
    craft.rotation.order="YXZ";
    craft.rotation.y=-s.yaw;craft.rotation.x=s.pitch;craft.rotation.z=s.bank;
    craft.userData.exhaust.scale.set(1,1,(input.read().boost&&race.started)?2.2:.85);
    const back=87,fwd=120;
    wantCamera.set(s.x-Math.sin(s.yaw)*back,s.y+33-Math.sin(s.pitch)*18,s.z+Math.cos(s.yaw)*back);
    camera.position.lerp(wantCamera,1-Math.exp(-2.9*dt));
    target.set(s.x+Math.sin(s.yaw)*fwd,s.y+12+Math.sin(s.pitch)*fwd,s.z-Math.cos(s.yaw)*fwd);
    camera.lookAt(target);
    camera.fov=lerp(camera.fov,67+(s.speed-95)*.095,1-Math.exp(-2*dt));
    camera.updateProjectionMatrix();
    gateWorld.update(race.index,s.elapsed);
    renderer.render(scene,camera);
  }
  function hud(){
    const s=race.state,gate=gates[race.index];
    $("speedValue").textContent=String(Math.round(s.speed*3.6));
    $("altValue").textContent=String(Math.round(s.y));
    $("progressValue").textContent=String(race.index).padStart(2,"0")+" / "+gates.length;
    $("timeValue").textContent=formatTime(s.elapsed+race.penalty);
    $("boostFill").style.width=(s.boost*100).toFixed(1)+"%";
    if(gate){
      const bearing=Math.atan2(gate.x-s.x,s.z-gate.z);
      const delta=Math.atan2(Math.sin(bearing-s.yaw),Math.cos(bearing-s.yaw));
      $("direction").style.transform="rotate("+(delta*180/Math.PI)+"deg)";
      $("gateDistance").textContent=Math.round(Math.hypot(gate.x-s.x,gate.y-s.y,gate.z-s.z))+" M TO GATE "+(race.index+1);
    }else{$("gateDistance").textContent="COURSE COMPLETE";}
  }
  function animate(now){
    if(disposed)return;
    let dt=Math.min((now-lastTime)/1000,.1);lastTime=now;
    if(!Number.isFinite(dt)||dt<0)dt=0;
    if(race.started&&!race.paused){
      acc=Math.min(acc+dt,.2);
      let steps=0;
      while(acc>=1/60&&steps++<12){tick(1/60);acc-=1/60;if(!race.started)break;}
    }else acc=0;
    render(Math.max(.001,dt));
    if(now-hudTime>45){hudTime=now;hud();}
    raf=requestAnimationFrame(animate);
  }
  function onResize(){renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.75));
    renderer.setSize(innerWidth,innerHeight,false);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();}
  function onKey(e){if(e.code==="KeyR"){reset();start();}
    else if(e.code==="KeyP"&&race.started){race.paused=!race.paused;message(race.paused?"PAUSED · P TO RESUME":"RACE RESUMED");}}
  addEventListener("resize",onResize);addEventListener("keydown",onKey);
  $("startButton").addEventListener("click",start);
  $("retryButton").addEventListener("click",()=>{reset();start();});
  reset();
  render(1/60);
  $("boot").hidden=true;
  raf=requestAnimationFrame(animate);
  return {getState:()=>({mode:"sky-racing",race:{gate:race.index,total:gates.length,started:race.started,finished:race.finished,penalty:race.penalty},flight:{...race.state}}),
    dispose(){disposed=true;cancelAnimationFrame(raf);input.dispose();removeEventListener("resize",onResize);removeEventListener("keydown",onKey);renderer.dispose();
      scene.traverse(obj=>{if(obj.geometry)obj.geometry.dispose();if(obj.material){const mats=Array.isArray(obj.material)?obj.material:[obj.material];mats.forEach(mat=>mat.dispose());}});}};
}
