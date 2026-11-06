import * as THREE from "three";
import {createParasailState,advanceParasail,terrainHeight,windAt,makeAirRoutes,crossAirRoute} from "./parasail-flight-sim.js";
const $=id=>document.getElementById(id);
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const hash=(x,z)=>{const r=Math.sin(x*127.1+z*311.7)*43758.5453;return r-Math.floor(r);};

function createMountains(scene){
  const geometry=new THREE.BufferGeometry();
  const verts=[],colors=[],idx=[];
  const nx=160,nz=220,width=17800,depth=27000;
  const green=new THREE.Color("#315b55"),rock=new THREE.Color("#858d83"),snow=new THREE.Color("#c6cdc4");
  for(let z=0;z<=nz;z++)for(let x=0;x<=nx;x++){
    const wx=(x/nx-.5)*width,wz=2400-z/nz*depth,h=terrainHeight(wx,wz);
    verts.push(wx,h,wz);
    const color=green.clone();
    color.lerp(rock,clamp((h-440)/1400,0,1));
    color.lerp(snow,clamp((h-1550)/1100,0,1)*.9);
    color.multiplyScalar(.85+hash(x,z)*.22);
    colors.push(color.r,color.g,color.b);
    if(x<nx&&z<nz){const a=z*(nx+1)+x,b=a+1,c=a+nx+1,d=c+1;idx.push(a,b,c,b,d,c);}
  }
  geometry.setAttribute("position",new THREE.Float32BufferAttribute(verts,3));
  geometry.setAttribute("color",new THREE.Float32BufferAttribute(colors,3));
  geometry.setIndex(idx);geometry.computeVertexNormals();
  const mountain=new THREE.Mesh(geometry,new THREE.MeshStandardMaterial({
    vertexColors:true,roughness:.96,metalness:0,side:THREE.DoubleSide
  }));
  mountain.receiveShadow=true;scene.add(mountain);
  const sea=new THREE.Mesh(new THREE.PlaneGeometry(17800,27000),
    new THREE.MeshStandardMaterial({color:"#426c73",roughness:.43,transparent:true,opacity:.83,depthWrite:false}));
  sea.rotation.x=-Math.PI/2;sea.position.set(0,-80,-11000);
  scene.add(sea);
  // Three distant mountainous silhouettes prevent the geography from ending at a hard horizon.
  const far=[];
  for(let layer=0;layer<3;layer++){
    const points=[],tris=[];
    const count=85,width=22000;
    for(let i=0;i<count;i++){
      const x=(i/(count-1)-.5)*width;
      const h=920+layer*420+310*Math.sin(i*.22+layer*1.1)+180*Math.sin(i*.47+layer);
      points.push(x,-400,-25000-layer*4400,x,h,-25000-layer*4400);
      if(i<count-1){const a=i*2;tris.push(a,a+1,a+2,a+1,a+3,a+2);}
    }
    const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute(points,3));g.setIndex(tris);g.computeVertexNormals();
    const m=new THREE.Mesh(g,new THREE.MeshLambertMaterial({color:["#8da3a1","#aab8b5","#c2c9c3"][layer],side:THREE.DoubleSide}));
    scene.add(m);far.push(m);
  }
  return {mountain,sea,far};
}
function createClouds(scene){
  const clouds=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1,1),
    new THREE.MeshLambertMaterial({color:"#f7f2e4",transparent:true,opacity:.55,depthWrite:false}),420);
  const object=new THREE.Object3D();let i=0;
  for(let c=0;c<84;c++){
    const cx=(hash(c,9)-.5)*12500,cz=1500-hash(c,18)*24000,cy=600+hash(c,21)*1650;
    for(let j=0;j<5;j++){
      object.position.set(cx+(hash(c,j+11)-.5)*250,cy+(hash(c+5,j)-.5)*55,cz+(hash(c,j+41)-.5)*230);
      const s=45+hash(c+16,j+19)*110;
      object.scale.set(s*1.8,s*.36,s*.8);object.updateMatrix();clouds.setMatrixAt(i++,object.matrix);
    }
  }
  clouds.instanceMatrix.needsUpdate=true;clouds.frustumCulled=false;scene.add(clouds);
  return clouds;
}
function createCanopyRider(){
  const root=new THREE.Group();
  const canopy=new THREE.Group();canopy.name="parasail-wing";
  const vertices=[],colors=[],indices=[];
  const nx=28,nz=10;
  for(let ix=0;ix<=nx;ix++)for(let iz=0;iz<=nz;iz++){
    const u=ix/nx*2-1,v=iz/nz*2-1;
    const chord=Math.sqrt(Math.max(.08,1-u*u));
    const x=u*23,y=16+7*chord-6*Math.pow(Math.abs(u),1.8)+1.8*Math.cos(v*Math.PI/2);
    const z=v*(8.2*chord)+3.3*Math.abs(u);
    vertices.push(x,y,z);
    const palette=["#f3d59a","#f2a369","#ea704e","#e4ece5","#75bbc0"];
    const band=Math.min(4,Math.floor((u+1)*2.5));
    const color=new THREE.Color(palette[band]);
    color.multiplyScalar(.86+.14*chord);
    colors.push(color.r,color.g,color.b);
    if(ix<nx&&iz<nz){
      const a=ix*(nz+1)+iz,b=a+1,c=a+nz+1,d=c+1;
      indices.push(a,b,c,b,d,c);
    }
  }
  const fabric=new THREE.BufferGeometry();fabric.setAttribute("position",new THREE.Float32BufferAttribute(vertices,3));
  fabric.setAttribute("color",new THREE.Float32BufferAttribute(colors,3));fabric.setIndex(indices);fabric.computeVertexNormals();
  canopy.add(new THREE.Mesh(fabric,new THREE.MeshStandardMaterial({
    vertexColors:true,side:THREE.DoubleSide,roughness:.91,metalness:0,emissive:"#402719",emissiveIntensity:.07
  })));
  for(const x of [-20,-14,-7,0,7,14,20]){
    const topY=16+7*Math.sqrt(Math.max(.08,1-x*x/529))-6*Math.pow(Math.abs(x/23),1.8);
    const rope=new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(x,topY,0),new THREE.Vector3(Math.sign(x)*2.1,-3.3,0.6)
    ]);
    canopy.add(new THREE.Line(rope,new THREE.LineBasicMaterial({color:"#eef1e1",transparent:true,opacity:.72})));
  }
  const rider=new THREE.Group();
  const suit=new THREE.MeshStandardMaterial({color:"#1e394a",roughness:.82});
  const vest=new THREE.MeshStandardMaterial({color:"#f2a16b",roughness:.75});
  const skin=new THREE.MeshStandardMaterial({color:"#b88c72",roughness:.8});
  const helmet=new THREE.MeshStandardMaterial({color:"#e9eddf",roughness:.36});
  const torso=new THREE.Mesh(new THREE.CapsuleGeometry(1.8,4.4,5,10),suit);
  torso.position.y=-6;rider.add(torso);
  const harness=new THREE.Mesh(new THREE.BoxGeometry(4.5,2.7,3),vest);harness.position.y=-5.2;rider.add(harness);
  const head=new THREE.Mesh(new THREE.SphereGeometry(1.8,12,10),helmet);head.position.y=-.6;rider.add(head);
  const visor=new THREE.Mesh(new THREE.BoxGeometry(2.6,1.2,.4),suit);visor.position.set(0,-.4,-1.5);rider.add(visor);
  for(const sign of [-1,1]){
    const arm=new THREE.Mesh(new THREE.CapsuleGeometry(.6,4.4,3,7),skin);
    arm.position.set(sign*2.3,-5,0);arm.rotation.z=sign*.45;rider.add(arm);
    const leg=new THREE.Mesh(new THREE.CapsuleGeometry(.74,4.4,3,7),suit);
    leg.position.set(sign*1.1,-11,1);leg.rotation.x=-.26;leg.rotation.z=sign*.12;rider.add(leg);
  }
  root.add(canopy,rider);
  return {root,canopy,rider};
}
function createWindStreaks(scene){
  const count=300;
  const cylinder=new THREE.CylinderGeometry(.26,.67,1,5,1,true);
  const material=new THREE.MeshBasicMaterial({color:"#ffffff",transparent:true,opacity:.7,depthWrite:false});
  const mesh=new THREE.InstancedMesh(cylinder,material,count);
  mesh.frustumCulled=false;
  const colors=[new THREE.Color("#bcefe9"),new THREE.Color("#91d9ed"),new THREE.Color("#f2c38c")];
  const dummy=new THREE.Object3D(),axis=new THREE.Vector3(0,1,0),vector=new THREE.Vector3();
  for(let i=0;i<count;i++)mesh.setColorAt(i,colors[i%3]);
  scene.add(mesh);
  function update(state){
    for(let i=0;i<count;i++){
      const a=i*11.71,t=state.elapsed*14;
      const angle=hash(i,1)*Math.PI*2;
      const radius=40+Math.sqrt(hash(i,2))*(i<130?1100:4000);
      const x=state.x+Math.cos(angle)*radius;
      const z=state.z+Math.sin(angle)*radius-420-(t%200)+100;
      const ground=terrainHeight(x,z);
      const height=i<130?(65+hash(i,3)*550):(25+hash(i,3)*180);
      const y=Math.max(ground+height,state.y+(hash(i,4)-.5)*550);
      const w=windAt(x,y,z,state.elapsed);
      vector.set(w.x,w.y*(i%4===0?3:1.8),w.z).normalize();
      dummy.position.set(x,y,z);
      dummy.quaternion.setFromUnitVectors(axis,vector);
      const length=20+hash(i,5)*76+(Math.max(0,w.lift)*7);
      dummy.scale.set(i<130?.85:1.5,length,1);
      dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate=true;
  }
  return {mesh,update};
}
function createRouteVisuals(scene,routes){
  const records=[];
  for(const route of routes){
    const marker=new THREE.Group();marker.position.set(route.x,route.y,route.z);
    const glow=new THREE.Mesh(new THREE.TorusGeometry(route.radius,3.4,7,60),
      new THREE.MeshBasicMaterial({color:"#c4f0dc",transparent:true,opacity:.67,depthWrite:false}));
    const inner=new THREE.Mesh(new THREE.TorusGeometry(route.radius*.77,1.0,6,60),
      new THREE.MeshBasicMaterial({color:"#f0d69d",transparent:true,opacity:.52,depthWrite:false}));
    marker.add(glow,inner);scene.add(marker);records.push(marker);
  }
  return {records,update(index,time){
    records.forEach((marker,i)=>{
      marker.visible=i>=index;
      marker.scale.setScalar(i===index?1+Math.sin(time*1.8)*.018:1);
      marker.children[0].material.opacity=i===index?.77:.22;
    });
  }};
}
function controls(){
  const keys=new Set(),pointer=new Set();
  const kd=e=>{if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Space"].includes(e.code))e.preventDefault();keys.add(e.code);};
  const ku=e=>keys.delete(e.code),blur=()=>keys.clear();
  addEventListener("keydown",kd);addEventListener("keyup",ku);addEventListener("blur",blur);
  for(const button of document.querySelectorAll("[data-control]")){
    const type=button.dataset.control;
    const down=e=>{e.preventDefault();button.setPointerCapture?.(e.pointerId);pointer.add(type);button.classList.add("active");};
    const up=()=>{pointer.delete(type);button.classList.remove("active");};
    button.addEventListener("pointerdown",down);button.addEventListener("pointerup",up);
    button.addEventListener("pointercancel",up);button.addEventListener("lostpointercapture",up);
  }
  return {read:()=>({
    turn:Number(keys.has("KeyD")||keys.has("ArrowRight")||pointer.has("right"))-
      Number(keys.has("KeyA")||keys.has("ArrowLeft")||pointer.has("left")),
    lift:Number(keys.has("KeyW")||keys.has("ArrowUp")||pointer.has("up"))-
      Number(keys.has("KeyS")||keys.has("ArrowDown")||pointer.has("down")),
    brake:keys.has("ShiftLeft")||keys.has("ShiftRight")||pointer.has("brake"),
    collapse:keys.has("Space")||pointer.has("boost")
  }),dispose(){
    removeEventListener("keydown",kd);removeEventListener("keyup",ku);removeEventListener("blur",blur);
  }};
}
export function startParasail(){
  const renderer=new THREE.WebGLRenderer({canvas:$("game"),antialias:true,powerPreference:"high-performance"});
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.6));
  renderer.setSize(innerWidth,innerHeight,false);
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.22;
  const scene=new THREE.Scene();
  scene.background=new THREE.Color("#9abec4");
  scene.fog=new THREE.FogExp2("#9cb8bb",.000038);
  const camera=new THREE.PerspectiveCamera(67,innerWidth/innerHeight,0.4,47000);
  const light=new THREE.DirectionalLight("#ffe0b2",2.75);light.position.set(-2200,4500,-2500);
  scene.add(light,new THREE.HemisphereLight("#cce5f3","#547060",2));
  createMountains(scene);createClouds(scene);
  const canopy=createCanopyRider();scene.add(canopy.root);
  const ribbons=createWindStreaks(scene),routes=makeAirRoutes(),markers=createRouteVisuals(scene,routes);
  const input=controls();
  let flight=createParasailState(),index=0,started=false,paused=false,finished=false,elapsed=0;
  let last=performance.now(),frame=0,acc=0,disposed=false;
  const cameraTarget=new THREE.Vector3(),look=new THREE.Vector3();
  const menu=$("menu"),toast=$("toast"),boot=$("boot");
  function notify(message){toast.textContent=message;toast.classList.add("show");}
  function reset(){
    flight=createParasailState();index=0;elapsed=0;finished=false;started=false;paused=false;
    $("menuTitle").innerHTML='THE OPEN <span>ABOVE</span>';
    $("menuSubtitle").textContent="Read the wind. Find your line.";
    $("startButton").textContent="BEGIN FLIGHT";
    menu.hidden=false;$("result").hidden=true;
    notify("FOLLOW THE WIND · FIND THE RISING AIR");
  }
  function begin(){if(finished)reset();started=true;paused=false;menu.hidden=true;notify("AIRBORNE · FOLLOW THE GOLDEN CURRENTS");}
  function complete(){
    finished=true;started=false;menu.hidden=false;
    $("menuTitle").innerHTML='SKY <span>DISCOVERED</span>';
    $("menuSubtitle").textContent="You made the air your own.";
    $("startButton").textContent="FLY AGAIN";
    $("result").hidden=false;
    $("resultTime").textContent=time(elapsed);
    $("resultBest").textContent=String(index)+" / "+routes.length;
  }
  function time(t){const s=Math.floor(t);return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0");}
  function tick(dt){
    const previous=flight;flight=advanceParasail(previous,input.read(),dt);elapsed+=dt;
    if(flight.y<=terrainHeight(flight.x,flight.z)+20){
      notify("RIDGE CONTACT · FOLLOW THE LIFT");
    }
    const route=routes[index];
    if(route&&crossAirRoute(previous,flight,route).passed){
      index++;notify("CURRENT "+index+" / "+routes.length+" · FLOW FOUND");
      if(index===routes.length)complete();
    }
  }
  function draw(dt){
    canopy.root.position.set(flight.x,flight.y,flight.z);
    canopy.root.rotation.order="YXZ";
    canopy.root.rotation.y=-flight.yaw;
    canopy.root.rotation.z=flight.bank;
    canopy.canopy.rotation.z=flight.bank*.45;
    canopy.canopy.scale.set(1-flight.canopyCollapse*.72,1-flight.canopyCollapse*.19,1-flight.canopyCollapse*.16);
    canopy.rider.position.y=-2.5*flight.canopyCollapse;
    canopy.rider.rotation.z=-flight.sway;
    canopy.rider.rotation.x=Math.sin(flight.elapsed*1.4)*.055;
    const camx=flight.x-Math.sin(flight.yaw)*92,camz=flight.z+Math.cos(flight.yaw)*92;
    cameraTarget.set(camx,flight.y+38,camz);
    camera.position.lerp(cameraTarget,1-Math.exp(-2.2*dt));
    look.set(flight.x+Math.sin(flight.yaw)*160,flight.y+8,flight.z-Math.cos(flight.yaw)*160);
    camera.lookAt(look);
    ribbons.update(flight);
    markers.update(index,flight.elapsed);
    renderer.render(scene,camera);
  }
  function hud(){
    $("speedValue").textContent=String(Math.round(Math.hypot(flight.vx,flight.vz)*3.6));
    $("altValue").textContent=String(Math.round(flight.glide));
    $("progressValue").textContent=String(index).padStart(2,"0")+" / "+routes.length;
    $("timeValue").textContent=time(elapsed);
    $("boostFill").style.width=clamp(40+flight.wind?.lift*8||40,6,100).toFixed(0)+"%";
    $("canopyStatus").textContent=flight.canopyCollapse>.07?
      ("CANOPY "+Math.round(flight.canopyCollapse*100)+"% PULLED IN"):"CANOPY FULLY OPEN";
    const route=routes[index];
    if(route){
      const bearing=Math.atan2(route.x-flight.x,flight.z-route.z);
      const delta=Math.atan2(Math.sin(bearing-flight.yaw),Math.cos(bearing-flight.yaw));
      $("direction").style.transform="rotate("+(delta*180/Math.PI)+"deg)";
      $("gateDistance").textContent=Math.round(Math.hypot(route.x-flight.x,route.y-flight.y,route.z-flight.z))+" M · LIFT CORRIDOR "+(index+1);
    }else{$("gateDistance").textContent="ROUTE COMPLETE";}
  }
  function animate(now){
    if(disposed)return;
    let dt=clamp((now-last)/1000,0,.12);last=now;
    if(started&&!paused){acc=Math.min(acc+dt,.2);let steps=0;
      while(acc>=1/60&&steps++<12){tick(1/60);acc-=1/60;if(!started)break;}
    }else acc=0;
    draw(Math.max(.002,dt));
    if(frame++%4===0)hud();
    requestAnimationFrame(animate);
  }
  function resize(){renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.6));
    renderer.setSize(innerWidth,innerHeight,false);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();}
  function onKey(e){if(e.code==="KeyR"){reset();begin();}
    if(e.code==="KeyP"&&started){paused=!paused;notify(paused?"PAUSED · P RESUMES":"RIDING THE WIND");}}
  addEventListener("resize",resize);addEventListener("keydown",onKey);
  $("startButton").addEventListener("click",begin);
  $("retryButton").addEventListener("click",()=>{reset();begin();});
  reset();draw(1/60);hud();boot.hidden=true;requestAnimationFrame(animate);
  return {getState:()=>({mode:"parasailing",flight:{...flight},route:{current:index,total:routes.length,started,finished},
    atmosphere:{drawDistance:camera.far,wind:flight.wind},terrain:{sampleHeight:terrainHeight(flight.x,flight.z)}}),
    dispose(){disposed=true;input.dispose();removeEventListener("resize",resize);removeEventListener("keydown",onKey);
      scene.traverse(item=>{item.geometry?.dispose?.();if(item.material){const mats=Array.isArray(item.material)?item.material:[item.material];mats.forEach(m=>m.dispose());}});
      renderer.dispose();}
  };
}
