import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import * as NexusEngine from "https://cdn.jsdelivr.net/gh/LuminaryLabs-Dev/NexusEngine@main/src/index.js";
import { CAMPAIGN, WORLD } from "./data/campaign.config.js";
import { buildHotAirBalloon } from "./hot-air-balloon-object-kit.js";
import { animateBurner } from "./hot-air-balloon-burner-kit.js";

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

const random = seeded(`${WORLD.seed}-balloon-drift`);

function terrainHeight(x, z) {
  const r = Math.hypot(x, z);
  const hill = Math.sin(x * 0.004) * 24 + Math.cos(z * 0.0047) * 20;
  const meadow = -Math.exp(-(r * r) / 520000) * 42;
  const soft = Math.sin((x + z) * 0.014) * 4.5;
  return hill + meadow + soft;
}

function moistureAt(x, z) {
  const lake = Math.exp(-((x + 240) ** 2 + (z - 160) ** 2) / 78000);
  const river = Math.exp(-((Math.sin(x * 0.004) * 160 + z * 0.11) ** 2) / 28000);
  return clamp(lake + river * 0.55, 0, 1);
}

function terrainColor(x, z, h) {
  const m = moistureAt(x, z);
  const c = new THREE.Color();
  if (m > 0.58 && h < 24) c.setRGB(0.34, 0.64, 0.72);
  else if (h > 82) c.setRGB(0.63, 0.62, 0.46);
  else if (m > 0.22) c.setRGB(0.36, 0.62, 0.36);
  else c.setRGB(0.56, 0.70, 0.40);
  c.lerp(new THREE.Color(0xffe3b0), clamp(Math.hypot(x, z) / 2600, 0, 0.24));
  return c;
}

function createBalloonEngine(getSnapshot) {
  const BalloonSnapshot = NexusEngine.defineResource("openAbove.balloonSnapshot");
  const BalloonTicked = NexusEngine.defineEvent("openAbove.balloonTicked");

  const telemetryKit = NexusEngine.defineRuntimeKit({
    id: "open-above-balloon-telemetry-kit",
    provides: ["open-above:balloon-telemetry", "open-above:wind-drift-state"],
    resources: { BalloonSnapshot },
    events: { BalloonTicked },
    systems: [
      {
        phase: "simulate",
        name: "openAboveBalloonTelemetrySystem",
        system(world) {
          const snapshot = getSnapshot();
          world.setResource(BalloonSnapshot, snapshot);
          world.emit(BalloonTicked, {
            frame: world.__nexusClock?.frame ?? 0,
            altitude: snapshot.altitude,
            windSpeed: snapshot.windSpeed,
            burner: snapshot.burner
          });
        }
      }
    ],
    install({ engine, world }) {
      engine.openAbove = {
        getState() {
          return world.getResource(BalloonSnapshot);
        }
      };
    },
    metadata: {
      kind: "domain-service-kit",
      domain: "open-above-balloon-drift",
      purpose: "Publishes cozy hot air balloon wind drift state through Nexus Engine Realtime Core."
    }
  });

  return NexusEngine.createRealtimeGame({
    kits: [telemetryKit],
    provides: ["n:runtime.engine"]
  });
}

function makeTerrain(scene) {
  const size = WORLD.terrainSize * 1.36;
  const segments = Math.max(128, WORLD.terrainSegments);
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
  const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.98, metalness: 0.02 }));
  mesh.receiveShadow = true;
  scene.add(mesh);
}

function makeLakes(scene) {
  const waterMat = new THREE.MeshStandardMaterial({ color: 0x77c7dc, roughness: 0.32, transparent: true, opacity: 0.72 });
  for (const lake of [
    { x: -240, z: 160, rx: 180, rz: 96, y: -18 },
    { x: 390, z: -330, rx: 220, rz: 120, y: -12 }
  ]) {
    const mesh = new THREE.Mesh(new THREE.CircleGeometry(1, 80), waterMat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.scale.set(lake.rx, lake.rz, 1);
    mesh.position.set(lake.x, lake.y, lake.z);
    scene.add(mesh);
  }
}

function makeTrees(scene) {
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5c3d24, roughness: 0.96 });
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x3f7b3f, roughness: 0.9 });
  const trunkGeo = new THREE.CylinderGeometry(0.55, 0.82, 12, 7);
  const plumeGeo = new THREE.SphereGeometry(4.7, 9, 7);
  for (let i = 0; i < Math.floor(WORLD.treeCount * 1.25); i += 1) {
    const x = (random() - 0.5) * WORLD.terrainSize * 1.12;
    const z = (random() - 0.5) * WORLD.terrainSize * 1.12;
    if (Math.hypot(x, z) < 145 || moistureAt(x, z) > 0.74) continue;
    const y = terrainHeight(x, z);
    const scale = 1.2 + random() * 2.8;
    const group = new THREE.Group();
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.scale.set(scale * 0.45, scale, scale * 0.45);
    trunk.position.y = 6 * scale;
    const crown = new THREE.Mesh(plumeGeo, leafMat);
    crown.scale.setScalar(scale * 1.12);
    crown.position.y = 14 * scale;
    group.add(trunk, crown);
    group.position.set(x, y - 1, z);
    group.rotation.y = random() * TAU;
    scene.add(group);
  }
}

function makeClouds(scene) {
  const cloudMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, transparent: true, opacity: 0.45, depthWrite: false });
  for (let i = 0; i < 26; i += 1) {
    const group = new THREE.Group();
    const angle = random() * TAU;
    const radius = 560 + random() * 1380;
    group.position.set(Math.cos(angle) * radius, 250 + random() * 340, Math.sin(angle) * radius);
    for (let p = 0; p < 5 + Math.floor(random() * 4); p += 1) {
      const puff = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 7), cloudMat);
      puff.position.set((random() - 0.5) * 115, (random() - 0.5) * 16, (random() - 0.5) * 58);
      puff.scale.set(48 + random() * 62, 8 + random() * 14, 24 + random() * 44);
      group.add(puff);
    }
    scene.add(group);
  }
}

function makeWindRibbons(scene) {
  const group = new THREE.Group();
  const mat = new THREE.LineBasicMaterial({ color: 0xfff5d6, transparent: true, opacity: 0.34 });
  for (let i = 0; i < 22; i += 1) {
    const points = [];
    const baseY = 85 + random() * 210;
    const baseZ = -900 + random() * 1800;
    for (let p = 0; p < 24; p += 1) {
      points.push(new THREE.Vector3(-1100 + p * 96, baseY + Math.sin(p * 0.75 + i) * 14, baseZ + Math.cos(p * 0.42 + i) * 32));
    }
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), mat));
  }
  scene.add(group);
  return group;
}

function createGame() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xbde8ff);
  scene.fog = new THREE.Fog(0xffdfb8, 460, 3400);

  const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 5200);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.65));
  renderer.shadowMap.enabled = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.04;

  const sun = new THREE.DirectionalLight(0xffe0a3, 2.25);
  sun.position.set(-420, 760, 340);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  scene.add(sun, new THREE.HemisphereLight(0xd8f6ff, 0x594222, 1.44));

  makeTerrain(scene);
  makeLakes(scene);
  makeTrees(scene);
  makeClouds(scene);
  const windRibbons = makeWindRibbons(scene);

  const balloon = buildHotAirBalloon();
  balloon.position.set(0, 95, 0);
  scene.add(balloon);

  const keys = new Set();
  const state = {
    position: new THREE.Vector3(0, 95, 0),
    velocity: new THREE.Vector3(8, 0, -10),
    wind: new THREE.Vector3(8, 0, -10),
    verticalVelocity: 0,
    altitude: 95,
    burner: 0.22,
    vent: 0,
    elapsed: 0,
    distance: 0,
    message: "Drift with the valley wind. Hold Space or W for burner lift, S to vent gently."
  };

  function snapshot(status = "drifting") {
    return {
      status,
      region: CAMPAIGN.regions[0]?.id ?? "meadow-lift",
      objectType: "hot-air-balloon",
      elapsed: Number(state.elapsed.toFixed(3)),
      altitude: Number(state.altitude.toFixed(2)),
      burner: Number(state.burner.toFixed(3)),
      vent: Number(state.vent.toFixed(3)),
      windSpeed: Number(state.wind.length().toFixed(2)),
      distance: Number(state.distance.toFixed(2)),
      position: state.position.toArray().map((v) => Number(v.toFixed(3))),
      velocity: state.velocity.toArray().map((v) => Number(v.toFixed(3))),
      wind: state.wind.toArray().map((v) => Number(v.toFixed(3))),
      message: state.message
    };
  }

  const engine = createBalloonEngine(snapshot);

  addEventListener("keydown", (event) => keys.add(event.code));
  addEventListener("keyup", (event) => keys.delete(event.code));
  addEventListener("blur", () => keys.clear());
  addEventListener("wheel", (event) => {
    camera.userData.zoom = clamp((camera.userData.zoom ?? 42) + Math.sign(event.deltaY) * 4, 18, 150);
  }, { passive: true });
  camera.userData.zoom = 42;

  function resize() {
    const width = innerWidth || 1;
    const height = innerHeight || 1;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  addEventListener("resize", resize);
  resize();

  function update(dt) {
    state.elapsed += dt;
    const burnerPressed = keys.has("Space") || keys.has("KeyW") || keys.has("ArrowUp");
    const ventPressed = keys.has("KeyS") || keys.has("ArrowDown") || keys.has("ShiftLeft") || keys.has("ShiftRight");
    state.burner = lerp(state.burner, burnerPressed ? 1 : 0.18, smooth(3.2, dt));
    state.vent = lerp(state.vent, ventPressed ? 1 : 0, smooth(3.6, dt));

    const windAngle = -0.86 + Math.sin(state.elapsed * 0.045) * 0.32 + Math.sin(state.elapsed * 0.11) * 0.08;
    const windSpeed = 9.4 + Math.sin(state.elapsed * 0.063) * 2.1 + Math.sin(state.elapsed * 0.017) * 1.4;
    state.wind.set(Math.sin(windAngle) * windSpeed, 0, -Math.cos(windAngle) * windSpeed);

    const buoyancy = 0.36 + state.burner * 3.7 - state.vent * 3.2;
    const altitudeDamping = -state.verticalVelocity * 0.74;
    const ceilingSoft = state.position.y > 270 ? -(state.position.y - 270) * 0.024 : 0;
    state.verticalVelocity += (buoyancy + altitudeDamping + ceilingSoft - 0.92) * dt;
    state.verticalVelocity = clamp(state.verticalVelocity, -8, 8);

    state.velocity.lerp(new THREE.Vector3(state.wind.x, state.verticalVelocity, state.wind.z), smooth(1.15, dt));
    state.position.addScaledVector(state.velocity, dt);
    const ground = terrainHeight(state.position.x, state.position.z) + 30;
    if (state.position.y < ground) {
      state.position.y = ground;
      state.verticalVelocity = Math.max(0, state.verticalVelocity);
    }
    state.altitude = state.position.y - terrainHeight(state.position.x, state.position.z);
    state.distance += Math.hypot(state.velocity.x, state.velocity.z) * dt;

    balloon.position.copy(state.position);
    balloon.rotation.y = Math.atan2(state.wind.x, state.wind.z) + Math.PI + Math.sin(state.elapsed * 0.32) * 0.035;
    balloon.rotation.x = Math.sin(state.elapsed * 0.42) * 0.018;
    balloon.rotation.z = Math.cos(state.elapsed * 0.37) * 0.022;
    animateBurner(balloon.userData.parts?.burner, performance.now());
    windRibbons.position.x = state.position.x * 0.08 + Math.sin(state.elapsed * 0.06) * 30;
    windRibbons.position.z = state.position.z * 0.08 + Math.cos(state.elapsed * 0.05) * 30;
  }

  function draw(dt) {
    const windForward = state.wind.clone().normalize();
    const side = new THREE.Vector3(-windForward.z, 0, windForward.x).normalize();
    const zoom = camera.userData.zoom ?? 42;
    const camPos = state.position.clone()
      .add(windForward.clone().multiplyScalar(-zoom))
      .add(side.multiplyScalar(zoom * 0.32))
      .add(new THREE.Vector3(0, 18 + zoom * 0.28, 0));
    camera.position.lerp(camPos, smooth(2.6, dt));
    camera.lookAt(state.position.clone().add(new THREE.Vector3(0, 10, 0)).add(windForward.multiplyScalar(12)));
    renderer.render(scene, camera);
  }

  function updateHud() {
    const heat = state.burner > 0.45 ? "burner warm" : "coasting";
    hud.innerHTML = `<strong>The Open Above: Balloon Drift</strong><br>${state.message}<br><small>${heat} · Altitude ${Math.round(state.altitude)}m · Wind ${state.wind.length().toFixed(1)}m/s · Drift ${Math.round(state.distance)}m · Scroll zoom · Nexus Engine Realtime Core</small>`;
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
    balloon,
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
