import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { CAMPAIGN, WORLD, FLIGHT } from "./data/campaign.config.js";

const canvas = document.querySelector("#game");
const hud = document.querySelector("#hud");
const errorPanel = document.querySelector("#error");

const clamp = (value, min, max) => Math.max(min, Math.min(max, Number(value) || 0));
const lerp = (a, b, t) => a + (b - a) * clamp(t, 0, 1);
const TAU = Math.PI * 2;

function showFatal(error) {
  errorPanel.hidden = false;
  errorPanel.textContent = String(error?.stack || error?.message || error);
  hud.innerHTML = "<strong>The Open Above</strong><br>Runtime error. See panel.";
}

function seeded(seedText) {
  let h = 2166136261;
  for (let i = 0; i < seedText.length; i += 1) {
    h ^= seedText.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const random = seeded(WORLD.seed);

function terrainHeight(x, z) {
  const r = Math.hypot(x, z);
  const ridge = Math.sin(x * 0.006 + Math.cos(z * 0.004) * 1.4) * 34;
  const rolls = Math.sin((x + z) * 0.0028) * 45 + Math.cos((x - z) * 0.0036) * 28;
  const basin = -Math.exp(-(r * r) / 380000) * 78;
  const high = Math.max(0, r - 620) * 0.055;
  return ridge + rolls + basin + high;
}

function forwardFrom(state) {
  const cp = Math.cos(state.pitch);
  return new THREE.Vector3(
    -Math.sin(state.yaw) * cp,
    Math.sin(state.pitch),
    -Math.cos(state.yaw) * cp
  ).normalize();
}

function makeBird() {
  const group = new THREE.Group();
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.7 });
  const wingMat = new THREE.MeshStandardMaterial({ color: 0xdbe7ef, roughness: 0.8 });
  const goldMat = new THREE.MeshStandardMaterial({ color: 0xffd166, roughness: 0.48 });

  const body = new THREE.Mesh(new THREE.ConeGeometry(0.42, 1.35, 9), bodyMat);
  body.rotation.x = Math.PI / 2;
  group.add(body);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 8), bodyMat);
  head.position.set(0, 0.12, -0.72);
  group.add(head);

  const beak = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.24, 5), goldMat);
  beak.rotation.x = -Math.PI / 2;
  beak.position.set(0, 0.11, -0.94);
  group.add(beak);

  const leftWing = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.025, 0.24), wingMat);
  leftWing.position.set(-0.7, 0, -0.08);
  const rightWing = leftWing.clone();
  rightWing.position.x = 0.7;
  const tail = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.025, 0.48), wingMat);
  tail.position.set(0, -0.02, 0.5);
  group.add(leftWing, rightWing, tail);
  group.userData = { leftWing, rightWing, tail };
  return group;
}

function makeTerrain(scene) {
  const size = WORLD.terrainSize;
  const segments = WORLD.terrainSegments;
  const geometry = new THREE.PlaneGeometry(size, size, segments, segments);
  geometry.rotateX(-Math.PI / 2);
  const position = geometry.attributes.position;
  const color = new Float32Array(position.count * 3);
  const c = new THREE.Color();
  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i);
    const z = position.getZ(i);
    const h = terrainHeight(x, z);
    position.setY(i, h);
    const slope = Math.abs(Math.sin(x * 0.007) + Math.cos(z * 0.006));
    if (h > 110) c.setRGB(0.68, 0.72, 0.62);
    else if (slope > 1.45) c.setRGB(0.36, 0.43, 0.38);
    else if (h < -35) c.setRGB(0.33, 0.54, 0.38);
    else c.setRGB(0.42, 0.61, 0.35);
    color[i * 3] = c.r;
    color[i * 3 + 1] = c.g;
    color[i * 3 + 2] = c.b;
  }
  geometry.setAttribute("color", new THREE.BufferAttribute(color, 3));
  geometry.computeVertexNormals();
  const material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.96, metalness: 0.02 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.receiveShadow = true;
  scene.add(mesh);
}

function makeTrees(scene) {
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4a301f, roughness: 0.95 });
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x266d35, roughness: 0.9 });
  const trunkGeo = new THREE.CylinderGeometry(0.55, 0.85, 14, 7);
  const leafGeo = new THREE.ConeGeometry(6.2, 13, 8);
  for (let i = 0; i < WORLD.treeCount; i += 1) {
    const x = (random() - 0.5) * WORLD.terrainSize * 0.92;
    const z = (random() - 0.5) * WORLD.terrainSize * 0.92;
    const d = Math.hypot(x, z);
    if (d < 150 || random() < 0.18) continue;
    const y = terrainHeight(x, z);
    const scale = 1.4 + random() * 2.4;
    const group = new THREE.Group();
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.scale.set(scale * 0.52, scale, scale * 0.52);
    trunk.position.y = 7 * scale;
    const leaves = new THREE.Mesh(leafGeo, leafMat);
    leaves.scale.set(scale, scale * 1.1, scale);
    leaves.position.y = 18 * scale;
    group.add(trunk, leaves);
    group.position.set(x, y - 2, z);
    group.rotation.y = random() * TAU;
    scene.add(group);
  }
}

function makeRing(scene, position, color = 0xfff2a3) {
  const group = new THREE.Group();
  const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9, side: THREE.DoubleSide });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(20, 1.4, 8, 48), mat);
  ring.rotation.y = Math.PI / 2;
  group.add(ring);
  group.position.copy(position);
  scene.add(group);
  return group;
}

function makeThermal(scene, position) {
  const group = new THREE.Group();
  const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.16, side: THREE.DoubleSide, depthWrite: false });
  for (let i = 0; i < 6; i += 1) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(18 + i * 5, 0.55, 6, 48), mat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = i * 14;
    group.add(ring);
  }
  group.position.copy(position);
  scene.add(group);
  return group;
}

function createGame() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(WORLD.sky.zenith);
  scene.fog = new THREE.Fog(0xcfeffd, 260, 2550);

  const camera = new THREE.PerspectiveCamera(66, 1, 0.1, 4000);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.8));
  renderer.shadowMap.enabled = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const sun = new THREE.DirectionalLight(WORLD.sky.sun, 2.2);
  sun.position.set(-300, 650, 240);
  sun.castShadow = true;
  scene.add(sun, new THREE.HemisphereLight(0xc8f0ff, 0x23351e, 1.3));

  makeTerrain(scene);
  makeTrees(scene);

  const bird = makeBird();
  scene.add(bird);

  const perch = new THREE.Mesh(
    new THREE.CylinderGeometry(18, 24, 16, 10),
    new THREE.MeshStandardMaterial({ color: 0x5a3a22, roughness: 0.86 })
  );
  perch.position.set(WORLD.perch.x, terrainHeight(WORLD.perch.x, WORLD.perch.z) + WORLD.perch.y, WORLD.perch.z);
  scene.add(perch);

  const gates = Array.from({ length: WORLD.gateCount }, (_, i) => {
    const angle = -1.45 + i * 0.72;
    const radius = 310 + i * 92;
    const pos = new THREE.Vector3(Math.sin(angle) * radius, 92 + i * 12, Math.cos(angle) * radius - 70);
    const mesh = makeRing(scene, pos, 0xffe07b);
    return { id: `gate-${i + 1}`, pos, mesh, done: false };
  });

  const thermals = Array.from({ length: WORLD.thermalCount }, (_, i) => {
    const angle = 0.9 + i * 1.9;
    const pos = new THREE.Vector3(Math.sin(angle) * 360, 26, Math.cos(angle) * 360);
    const mesh = makeThermal(scene, pos);
    return { id: `thermal-${i + 1}`, pos, mesh, done: false, active: false };
  });

  const keys = new Set();
  const region = CAMPAIGN.regions[0];
  const state = {
    position: new THREE.Vector3(WORLD.start.x, WORLD.start.y, WORLD.start.z),
    velocity: forwardFrom(WORLD.start).multiplyScalar(WORLD.start.speed),
    yaw: WORLD.start.yaw,
    pitch: WORLD.start.pitch,
    roll: 0,
    speed: WORLD.start.speed,
    boostTimer: 0,
    elapsed: 0,
    completed: false,
    failed: false,
    gatesComplete: 0,
    thermalsComplete: 0,
    message: "Catch three thermals, fly five gates, return to perch."
  };

  function restart() {
    state.position.set(WORLD.start.x, WORLD.start.y, WORLD.start.z);
    state.velocity.copy(forwardFrom(WORLD.start).multiplyScalar(WORLD.start.speed));
    state.yaw = WORLD.start.yaw;
    state.pitch = WORLD.start.pitch;
    state.roll = 0;
    state.speed = WORLD.start.speed;
    state.boostTimer = 0;
    state.elapsed = 0;
    state.completed = false;
    state.failed = false;
    state.gatesComplete = 0;
    state.thermalsComplete = 0;
    state.message = "Catch three thermals, fly five gates, return to perch.";
    for (const gate of gates) { gate.done = false; gate.mesh.visible = true; gate.mesh.scale.setScalar(1); }
    for (const thermal of thermals) { thermal.done = false; thermal.active = false; thermal.mesh.visible = true; }
  }

  addEventListener("keydown", (event) => {
    keys.add(event.code);
    if (event.code === "KeyR") restart();
  });
  addEventListener("keyup", (event) => keys.delete(event.code));
  addEventListener("blur", () => keys.clear());

  function resize() {
    const width = innerWidth || 1;
    const height = innerHeight || 1;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  addEventListener("resize", resize);
  resize();

  function inputAxis(pos, neg) {
    return (keys.has(pos) ? 1 : 0) - (keys.has(neg) ? 1 : 0);
  }

  function update(dt) {
    if (state.completed || state.failed) return;
    state.elapsed += dt;
    state.boostTimer = Math.max(0, state.boostTimer - dt);

    const pitchInput = inputAxis("KeyW", "KeyS") || inputAxis("ArrowUp", "ArrowDown");
    const bankInput = inputAxis("KeyA", "KeyD") || inputAxis("ArrowLeft", "ArrowRight");

    state.pitch = clamp(state.pitch + pitchInput * FLIGHT.pitchRate * dt, -0.72, 0.65);
    state.roll = lerp(state.roll, bankInput * 0.9, 1 - Math.exp(-FLIGHT.rollRate * dt));
    state.yaw += state.roll * FLIGHT.yawFromRoll * dt;
    if (Math.abs(bankInput) < 0.01) state.roll = lerp(state.roll, 0, 1 - Math.exp(-FLIGHT.autoLevel * dt));

    const forward = forwardFrom(state);
    const desiredSpeed = clamp(state.speed + (keys.has("Space") && state.boostTimer <= 0 ? FLIGHT.boostImpulse : 0), FLIGHT.minSpeed, FLIGHT.maxSpeed);
    if (keys.has("Space") && state.boostTimer <= 0) {
      state.boostTimer = FLIGHT.boostCooldown;
      state.message = "Boost caught.";
    }

    state.speed = lerp(state.speed, desiredSpeed, 1 - Math.exp(-FLIGHT.drag * dt));
    state.velocity.lerp(forward.multiplyScalar(state.speed), 1 - Math.exp(-3.8 * dt));
    state.velocity.y += (-FLIGHT.gravity + Math.max(0, state.speed - 40) * FLIGHT.lift) * dt;

    for (const thermal of thermals) {
      const flat = Math.hypot(state.position.x - thermal.pos.x, state.position.z - thermal.pos.z);
      thermal.active = flat < 58 && state.position.y < 240;
      if (thermal.active) {
        state.velocity.y += FLIGHT.thermalLift * dt;
        if (!thermal.done && state.position.y > 135) {
          thermal.done = true;
          state.thermalsComplete += 1;
          state.message = `${thermal.id} climbed.`;
          thermal.mesh.visible = false;
        }
      }
    }

    state.position.addScaledVector(state.velocity, dt);
    const ground = terrainHeight(state.position.x, state.position.z) + FLIGHT.terrainClearance;
    if (state.position.y < ground) {
      state.failed = true;
      state.message = "Terrain strike. Press R to restart.";
      state.position.y = ground;
    }

    for (const gate of gates) {
      if (gate.done) continue;
      const dist = state.position.distanceTo(gate.pos);
      if (dist < 24) {
        gate.done = true;
        state.gatesComplete += 1;
        state.message = `${gate.id} cleared.`;
        gate.mesh.visible = false;
      }
      gate.mesh.rotation.z += dt * 0.8;
    }

    const perchDist = state.position.distanceTo(perch.position);
    if (state.thermalsComplete >= region.objectives.thermalTarget && state.gatesComplete >= region.objectives.gateTarget && perchDist < region.objectives.returnRadius) {
      state.completed = true;
      state.message = "Meadow Lift complete. Cloud Basin unlocked.";
    }

    if (state.elapsed > region.objectives.timeLimitSeconds) {
      state.failed = true;
      state.message = "The wind route faded. Press R to restart.";
    }
  }

  function draw(dt) {
    bird.position.copy(state.position);
    bird.rotation.set(-state.pitch, state.yaw, -state.roll, "YXZ");
    const flap = Math.sin(performance.now() * 0.012) * 0.18 + Math.abs(state.roll) * 0.18;
    bird.userData.leftWing.rotation.z = flap;
    bird.userData.rightWing.rotation.z = -flap;

    const fwd = forwardFrom(state);
    const camTarget = state.position.clone().add(fwd.clone().multiplyScalar(24));
    const camPos = state.position.clone()
      .add(fwd.clone().multiplyScalar(-48 - state.speed * 0.08))
      .add(new THREE.Vector3(0, 18 + state.speed * 0.03, 0));
    camera.position.lerp(camPos, 1 - Math.exp(-5 * dt));
    camera.lookAt(camTarget);

    for (const thermal of thermals) {
      thermal.mesh.rotation.y += dt * (thermal.active ? 1.8 : 0.4);
    }

    renderer.render(scene, camera);
  }

  function updateHud() {
    const status = state.completed ? "Complete" : state.failed ? "Failed" : "Flying";
    hud.innerHTML = `<strong>The Open Above: Meadow Lift</strong><br>${state.message}<br><small>${status} · Thermals ${state.thermalsComplete}/${region.objectives.thermalTarget} · Gates ${state.gatesComplete}/${region.objectives.gateTarget} · Speed ${Math.round(state.speed)} · Space boost · R restart</small>`;
  }

  let last = performance.now();
  function frame(now) {
    const dt = Math.min(1 / 30, (now - last) / 1000 || 1 / 60);
    last = now;
    update(dt);
    draw(dt);
    updateHud();
    requestAnimationFrame(frame);
  }

  window.GameHost = {
    scene,
    renderer,
    camera,
    restart,
    getState: () => ({
      ...state,
      position: state.position.toArray(),
      velocity: state.velocity.toArray(),
      gates: gates.map((gate) => ({ id: gate.id, done: gate.done })),
      thermals: thermals.map((thermal) => ({ id: thermal.id, done: thermal.done, active: thermal.active }))
    })
  };

  requestAnimationFrame(frame);
}

try {
  createGame();
} catch (error) {
  showFatal(error);
}
