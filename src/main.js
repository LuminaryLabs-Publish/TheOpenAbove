import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import * as NexusEngine from "https://cdn.jsdelivr.net/gh/LuminaryLabs-Dev/NexusEngine@main/src/index.js";
import { CAMPAIGN, WORLD, FLIGHT } from "./data/campaign.config.js";

const canvas = document.querySelector("#game");
const hud = document.querySelector("#hud");
const errorPanel = document.querySelector("#error");

const TAU = Math.PI * 2;
const clamp = (value, min, max) => Math.max(min, Math.min(max, Number(value) || 0));
const lerp = (a, b, t) => a + (b - a) * clamp(t, 0, 1);
const smooth = (rate, dt) => 1 - Math.exp(-rate * dt);

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

function colorToArray(color) {
  return [color.r, color.g, color.b];
}

function terrainHeight(x, z) {
  const r = Math.hypot(x, z);
  const mountainRing = Math.max(0, r - 640) * 0.095;
  const ridgeA = Math.sin(x * 0.0052 + Math.cos(z * 0.004) * 1.8) * 42;
  const ridgeB = Math.cos(z * 0.0064 + Math.sin(x * 0.003) * 1.2) * 32;
  const small = Math.sin((x + z) * 0.021) * 5.5 + Math.cos((x - z) * 0.017) * 4.5;
  const basin = -Math.exp(-(r * r) / 420000) * 74;
  const valley = -Math.exp(-((x - 140) ** 2 + (z + 90) ** 2) / 180000) * 52;
  return ridgeA + ridgeB + small + basin + valley + mountainRing;
}

function moistureAt(x, z) {
  const lakeA = Math.exp(-((x + 260) ** 2 + (z - 130) ** 2) / 52000);
  const lakeB = Math.exp(-((x - 420) ** 2 + (z + 310) ** 2) / 68000);
  const river = Math.exp(-((Math.sin(x * 0.006) * 180 + z * 0.18) ** 2) / 18000);
  return clamp(lakeA + lakeB + river * 0.7, 0, 1);
}

function terrainColor(x, z, h) {
  const m = moistureAt(x, z);
  const slope = Math.abs(Math.sin(x * 0.008) + Math.cos(z * 0.006));
  const color = new THREE.Color();
  if (m > 0.58 && h < 28) color.setRGB(0.10, 0.32, 0.42);
  else if (h > 150) color.setRGB(0.72, 0.74, 0.68);
  else if (h > 95) color.setRGB(0.50, 0.55, 0.42);
  else if (slope > 1.35) color.setRGB(0.34, 0.43, 0.34);
  else if (m > 0.22) color.setRGB(0.30, 0.58, 0.38);
  else color.setRGB(0.43, 0.63, 0.35);
  color.lerp(new THREE.Color(0xd9f6ff), clamp(Math.hypot(x, z) / 2900, 0, 0.32));
  return color;
}

function forwardFrom(state) {
  const cp = Math.cos(state.pitch);
  return new THREE.Vector3(
    -Math.sin(state.yaw) * cp,
    Math.sin(state.pitch),
    -Math.cos(state.yaw) * cp
  ).normalize();
}

function createOpenAboveEngine(getSnapshot) {
  const FlightSnapshot = NexusEngine.defineResource("openAbove.flightSnapshot");
  const FlightTicked = NexusEngine.defineEvent("openAbove.flightTicked");

  const telemetryKit = NexusEngine.defineRuntimeKit({
    id: "open-above-flight-telemetry-kit",
    provides: ["open-above:flight-telemetry", "open-above:mission-state"],
    resources: { FlightSnapshot },
    events: { FlightTicked },
    systems: [
      {
        phase: "simulate",
        name: "openAboveFlightTelemetrySystem",
        system(world) {
          const snapshot = getSnapshot();
          world.setResource(FlightSnapshot, snapshot);
          world.emit(FlightTicked, {
            frame: world.__nexusClock?.frame ?? 0,
            status: snapshot.status,
            gatesComplete: snapshot.gatesComplete,
            thermalsComplete: snapshot.thermalsComplete
          });
        }
      }
    ],
    install({ engine, world }) {
      engine.openAbove = {
        getState() {
          return world.getResource(FlightSnapshot);
        }
      };
    },
    metadata: {
      kind: "domain-service-kit",
      domain: "open-above-flight",
      purpose: "Publishes The Open Above flight and mission state through Nexus Engine Realtime Core."
    }
  });

  return NexusEngine.createRealtimeGame({
    kits: [telemetryKit],
    provides: ["n:runtime.engine"]
  });
}

function makeBird() {
  const group = new THREE.Group();
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xf7fbff, roughness: 0.68, metalness: 0.02 });
  const wingMat = new THREE.MeshStandardMaterial({ color: 0xdbe8f1, roughness: 0.82, metalness: 0.01 });
  const shadowMat = new THREE.MeshStandardMaterial({ color: 0x98a8ad, roughness: 0.9 });
  const goldMat = new THREE.MeshStandardMaterial({ color: 0xffd166, roughness: 0.52 });

  const body = new THREE.Mesh(new THREE.ConeGeometry(0.46, 1.42, 12), bodyMat);
  body.rotation.x = Math.PI / 2;
  group.add(body);

  const chest = new THREE.Mesh(new THREE.SphereGeometry(0.36, 16, 10), bodyMat);
  chest.scale.set(0.86, 0.62, 1.18);
  chest.position.set(0, 0.02, -0.24);
  group.add(chest);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 14, 10), bodyMat);
  head.position.set(0, 0.15, -0.74);
  group.add(head);

  const beak = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.24, 5), goldMat);
  beak.rotation.x = -Math.PI / 2;
  beak.position.set(0, 0.12, -0.96);
  group.add(beak);

  const leftWing = new THREE.Group();
  const rightWing = new THREE.Group();
  const wingGeo = new THREE.BoxGeometry(1.35, 0.025, 0.28);
  const outerGeo = new THREE.BoxGeometry(1.08, 0.02, 0.22);
  const leftInner = new THREE.Mesh(wingGeo, wingMat);
  const leftOuter = new THREE.Mesh(outerGeo, shadowMat);
  leftInner.position.set(-0.72, 0, -0.06);
  leftOuter.position.set(-1.78, -0.01, -0.04);
  leftWing.add(leftInner, leftOuter);
  const rightInner = leftInner.clone();
  const rightOuter = leftOuter.clone();
  rightInner.position.x *= -1;
  rightOuter.position.x *= -1;
  rightWing.add(rightInner, rightOuter);

  const tail = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.025, 0.5), wingMat);
  tail.position.set(0, -0.04, 0.5);
  group.add(leftWing, rightWing, tail);
  group.userData = { leftWing, rightWing, tail };
  group.traverse((node) => { if (node.isMesh) node.castShadow = true; });
  return group;
}

function makeTerrain(scene) {
  const size = WORLD.terrainSize * 1.28;
  const segments = Math.max(144, WORLD.terrainSegments);
  const geometry = new THREE.PlaneGeometry(size, size, segments, segments);
  geometry.rotateX(-Math.PI / 2);
  const position = geometry.attributes.position;
  const color = new Float32Array(position.count * 3);

  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i);
    const z = position.getZ(i);
    const h = terrainHeight(x, z);
    position.setY(i, h);
    const c = terrainColor(x, z, h);
    color[i * 3] = c.r;
    color[i * 3 + 1] = c.g;
    color[i * 3 + 2] = c.b;
  }

  geometry.setAttribute("color", new THREE.BufferAttribute(color, 3));
  geometry.computeVertexNormals();
  const material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.98, metalness: 0.02 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.receiveShadow = true;
  scene.add(mesh);
  return mesh;
}

function makeLakes(scene) {
  const waterMat = new THREE.MeshStandardMaterial({
    color: 0x5cb9d6,
    roughness: 0.34,
    metalness: 0.03,
    transparent: true,
    opacity: 0.72
  });
  const lakes = [
    { x: -260, z: 130, rx: 165, rz: 82, y: -18 },
    { x: 420, z: -310, rx: 210, rz: 94, y: -12 }
  ];
  for (const lake of lakes) {
    const mesh = new THREE.Mesh(new THREE.CircleGeometry(1, 80), waterMat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.scale.set(lake.rx, lake.rz, 1);
    mesh.position.set(lake.x, lake.y, lake.z);
    scene.add(mesh);
  }
}

function makeTrees(scene) {
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4a301f, roughness: 0.96 });
  const leafMats = [
    new THREE.MeshStandardMaterial({ color: 0x255f33, roughness: 0.9 }),
    new THREE.MeshStandardMaterial({ color: 0x2f7a3d, roughness: 0.9 }),
    new THREE.MeshStandardMaterial({ color: 0x476f35, roughness: 0.92 })
  ];
  const trunkGeo = new THREE.CylinderGeometry(0.55, 0.88, 15, 7);
  const pineGeo = new THREE.ConeGeometry(6.4, 14, 8);
  const plumeGeo = new THREE.SphereGeometry(5.4, 10, 8);
  const count = Math.floor(WORLD.treeCount * 1.8);

  for (let i = 0; i < count; i += 1) {
    const x = (random() - 0.5) * WORLD.terrainSize * 1.12;
    const z = (random() - 0.5) * WORLD.terrainSize * 1.12;
    const d = Math.hypot(x, z);
    if (d < 130 || moistureAt(x, z) > 0.7 || random() < 0.08) continue;
    const y = terrainHeight(x, z);
    const scale = 1.25 + random() * 3.6;
    const group = new THREE.Group();
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.scale.set(scale * 0.52, scale, scale * 0.52);
    trunk.position.y = 7.5 * scale;
    group.add(trunk);

    const material = leafMats[Math.floor(random() * leafMats.length)];
    if (random() > 0.28) {
      for (let tier = 0; tier < 3; tier += 1) {
        const leaves = new THREE.Mesh(pineGeo, material);
        leaves.scale.set(scale * (1 - tier * 0.18), scale * 1.02, scale * (1 - tier * 0.18));
        leaves.position.y = (16 + tier * 6.2) * scale;
        group.add(leaves);
      }
    } else {
      for (let p = 0; p < 5; p += 1) {
        const plume = new THREE.Mesh(plumeGeo, material);
        plume.scale.setScalar(scale * (0.8 + random() * 0.42));
        plume.position.set((random() - 0.5) * 8 * scale, (18 + random() * 9) * scale, (random() - 0.5) * 8 * scale);
        group.add(plume);
      }
    }

    group.position.set(x, y - 2, z);
    group.rotation.y = random() * TAU;
    group.rotation.z = (random() - 0.5) * 0.12;
    scene.add(group);
  }
}

function makeClouds(scene) {
  const cloudMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 1,
    transparent: true,
    opacity: 0.42,
    depthWrite: false
  });
  for (let i = 0; i < 38; i += 1) {
    const group = new THREE.Group();
    const angle = random() * TAU;
    const radius = 540 + random() * 1480;
    const y = 250 + random() * 330;
    group.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
    for (let p = 0; p < 5 + Math.floor(random() * 5); p += 1) {
      const puff = new THREE.Mesh(new THREE.SphereGeometry(1, 12, 8), cloudMat);
      puff.position.set((random() - 0.5) * 120, (random() - 0.5) * 14, (random() - 0.5) * 52);
      puff.scale.set(46 + random() * 54, 8 + random() * 13, 22 + random() * 42);
      group.add(puff);
    }
    scene.add(group);
  }
}

function makeFarMountains(scene) {
  const mat = new THREE.MeshStandardMaterial({ color: 0x8fa393, roughness: 0.98, metalness: 0.01 });
  for (let i = 0; i < 26; i += 1) {
    const angle = (i / 26) * TAU;
    const radius = 1650 + random() * 360;
    const height = 190 + random() * 280;
    const cone = new THREE.Mesh(new THREE.ConeGeometry(150 + random() * 120, height, 5), mat);
    cone.position.set(Math.cos(angle) * radius, height * 0.42 - 40, Math.sin(angle) * radius);
    cone.rotation.y = random() * TAU;
    scene.add(cone);
  }
}

function makeWindRibbon(scene, offset = 0) {
  const group = new THREE.Group();
  const mat = new THREE.LineBasicMaterial({ color: 0xe8fbff, transparent: true, opacity: 0.36 });
  for (let i = 0; i < 18; i += 1) {
    const points = [];
    const baseY = 95 + random() * 170;
    const baseZ = -720 + random() * 1440;
    for (let p = 0; p < 18; p += 1) {
      points.push(new THREE.Vector3(-900 + p * 105, baseY + Math.sin(p * 0.8 + offset) * 16, baseZ + Math.cos(p * 0.38 + offset) * 38));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    group.add(new THREE.Line(geometry, mat));
  }
  scene.add(group);
  return group;
}

function makeRing(scene, position, color = 0xfff2a3) {
  const group = new THREE.Group();
  const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.92, side: THREE.DoubleSide });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(20, 1.35, 8, 56), mat);
  ring.rotation.y = Math.PI / 2;
  group.add(ring);
  group.position.copy(position);
  scene.add(group);
  return group;
}

function makeThermal(scene, position) {
  const group = new THREE.Group();
  const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.18, side: THREE.DoubleSide, depthWrite: false });
  for (let i = 0; i < 8; i += 1) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(18 + i * 5, 0.55, 6, 56), mat);
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
  scene.fog = new THREE.Fog(0xd8f5ff, 340, 3300);

  const camera = new THREE.PerspectiveCamera(68, 1, 0.1, 5200);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.85));
  renderer.shadowMap.enabled = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const sun = new THREE.DirectionalLight(WORLD.sky.sun, 2.55);
  sun.position.set(-380, 760, 260);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  scene.add(sun, new THREE.HemisphereLight(0xc8f0ff, 0x263d20, 1.38));

  makeTerrain(scene);
  makeLakes(scene);
  makeFarMountains(scene);
  makeTrees(scene);
  makeClouds(scene);
  const windRibbon = makeWindRibbon(scene);

  const bird = makeBird();
  scene.add(bird);

  const perch = new THREE.Mesh(
    new THREE.CylinderGeometry(18, 24, 18, 12),
    new THREE.MeshStandardMaterial({ color: 0x5a3a22, roughness: 0.88 })
  );
  perch.position.set(WORLD.perch.x, terrainHeight(WORLD.perch.x, WORLD.perch.z) + WORLD.perch.y, WORLD.perch.z);
  scene.add(perch);

  const gates = Array.from({ length: WORLD.gateCount }, (_, i) => {
    const angle = -1.45 + i * 0.72;
    const radius = 330 + i * 106;
    const pos = new THREE.Vector3(Math.sin(angle) * radius, 98 + i * 14, Math.cos(angle) * radius - 80);
    const mesh = makeRing(scene, pos, 0xffe07b);
    return { id: `gate-${i + 1}`, pos, mesh, done: false };
  });

  const thermals = Array.from({ length: WORLD.thermalCount }, (_, i) => {
    const angle = 0.9 + i * 1.9;
    const pos = new THREE.Vector3(Math.sin(angle) * 390, 28, Math.cos(angle) * 390);
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

  function snapshot(status = null) {
    return {
      status: status ?? (state.completed ? "complete" : state.failed ? "failed" : "flying"),
      region: region.id,
      elapsed: Number(state.elapsed.toFixed(3)),
      speed: Number(state.speed.toFixed(2)),
      gatesComplete: state.gatesComplete,
      thermalsComplete: state.thermalsComplete,
      completed: state.completed,
      failed: state.failed,
      message: state.message,
      position: state.position.toArray().map((v) => Number(v.toFixed(3))),
      velocity: state.velocity.toArray().map((v) => Number(v.toFixed(3))),
      gates: gates.map((gate) => ({ id: gate.id, done: gate.done })),
      thermals: thermals.map((thermal) => ({ id: thermal.id, done: thermal.done, active: thermal.active }))
    };
  }

  const engine = createOpenAboveEngine(snapshot);

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
    engine.tick(0);
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
    state.roll = lerp(state.roll, bankInput * 0.9, smooth(FLIGHT.rollRate, dt));
    state.yaw += state.roll * FLIGHT.yawFromRoll * dt;
    if (Math.abs(bankInput) < 0.01) state.roll = lerp(state.roll, 0, smooth(FLIGHT.autoLevel, dt));

    const forward = forwardFrom(state);
    const boostPressed = keys.has("Space") && state.boostTimer <= 0;
    const desiredSpeed = clamp(state.speed + (boostPressed ? FLIGHT.boostImpulse : 0), FLIGHT.minSpeed, FLIGHT.maxSpeed);
    if (boostPressed) {
      state.boostTimer = FLIGHT.boostCooldown;
      state.message = "Boost caught.";
    }

    state.speed = lerp(state.speed, desiredSpeed, smooth(FLIGHT.drag, dt));
    state.velocity.lerp(forward.multiplyScalar(state.speed), smooth(3.9, dt));
    state.velocity.y += (-FLIGHT.gravity + Math.max(0, state.speed - 40) * FLIGHT.lift) * dt;

    for (const thermal of thermals) {
      const flat = Math.hypot(state.position.x - thermal.pos.x, state.position.z - thermal.pos.z);
      thermal.active = flat < 62 && state.position.y < 255;
      if (thermal.active) {
        state.velocity.y += FLIGHT.thermalLift * dt;
        state.velocity.x += Math.sin(state.elapsed * 2 + flat * 0.01) * 2.2 * dt;
        state.velocity.z += Math.cos(state.elapsed * 2 + flat * 0.01) * 2.2 * dt;
        if (!thermal.done && state.position.y > 140) {
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
      gate.mesh.rotation.z += dt * 0.8;
      if (gate.done) continue;
      const dist = state.position.distanceTo(gate.pos);
      if (dist < 24) {
        gate.done = true;
        state.gatesComplete += 1;
        state.message = `${gate.id} cleared.`;
        gate.mesh.visible = false;
      }
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
    const flap = Math.sin(performance.now() * 0.012) * 0.22 + Math.abs(state.roll) * 0.18;
    bird.userData.leftWing.rotation.z = flap;
    bird.userData.rightWing.rotation.z = -flap;

    const fwd = forwardFrom(state);
    const camTarget = state.position.clone().add(fwd.clone().multiplyScalar(26));
    const camPos = state.position.clone()
      .add(fwd.clone().multiplyScalar(-48 - state.speed * 0.1))
      .add(new THREE.Vector3(0, 18 + state.speed * 0.035, 0));
    camera.position.lerp(camPos, smooth(5.2, dt));
    camera.lookAt(camTarget);

    for (const thermal of thermals) {
      thermal.mesh.rotation.y += dt * (thermal.active ? 2.0 : 0.45);
    }
    windRibbon.position.x = Math.sin(state.elapsed * 0.08) * 42;
    windRibbon.position.z = Math.cos(state.elapsed * 0.06) * 32;

    renderer.render(scene, camera);
  }

  function updateHud() {
    const status = state.completed ? "Complete" : state.failed ? "Failed" : "Flying";
    hud.innerHTML = `<strong>The Open Above: Meadow Lift</strong><br>${state.message}<br><small>${status} · Nexus Engine Realtime Core · Thermals ${state.thermalsComplete}/${region.objectives.thermalTarget} · Gates ${state.gatesComplete}/${region.objectives.gateTarget} · Speed ${Math.round(state.speed)} · Space boost · R restart</small>`;
  }

  let last = performance.now();
  function frame(now) {
    const dt = Math.min(1 / 30, (now - last) / 1000 || 1 / 60);
    last = now;
    update(dt);
    engine.tick(dt);
    draw(dt);
    updateHud();
    requestAnimationFrame(frame);
  }

  window.GameHost = {
    engine,
    NexusEngine,
    scene,
    renderer,
    camera,
    restart,
    getState: () => ({
      nexusEngine: engine.openAbove?.getState?.(),
      local: snapshot()
    })
  };

  engine.tick(0);
  requestAnimationFrame(frame);
}

try {
  createGame();
} catch (error) {
  showFatal(error);
}
