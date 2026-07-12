import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export const HOT_AIR_BALLOON_BURNER_KIT_ID = "open-above-hot-air-balloon-burner-kit";

export const defaultBurnerProfile = {
  frameColor: 0x343b43,
  burnerColor: 0x5f6873,
  flameColor: 0xff7818,
  coreFlameColor: 0xffe19a,
  glowColor: 0xffc45b,
  headSpacing: 0.24
};

function addBar(group, start, end, radius, material, name) {
  const a = new THREE.Vector3(...start);
  const b = new THREE.Vector3(...end);
  const delta = new THREE.Vector3().subVectors(b, a);
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, delta.length(), 8), material);
  mesh.name = name;
  mesh.position.copy(a).add(b).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), delta.normalize());
  group.add(mesh);
  return mesh;
}

export function buildBurner(profile = defaultBurnerProfile) {
  const p = { ...defaultBurnerProfile, ...profile };
  const group = new THREE.Group();
  group.name = "hot-air-balloon-burner";
  group.userData.domain = HOT_AIR_BALLOON_BURNER_KIT_ID;

  const frameMat = new THREE.MeshStandardMaterial({ color: p.frameColor, roughness: 0.46, metalness: 0.56 });
  const burnerMat = new THREE.MeshStandardMaterial({ color: p.burnerColor, roughness: 0.42, metalness: 0.68 });
  addBar(group, [-0.44, -0.72, 0], [0.44, -0.72, 0], 0.035, frameMat, "burner-crossbar");

  const flames = [];
  const burnerHeads = [];
  for (const x of [-p.headSpacing, p.headSpacing]) {
    const head = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.28, 12), burnerMat);
    head.name = "balloon-twin-burner-head";
    head.position.set(x, -0.58, 0);
    group.add(head);
    burnerHeads.push(head);

    const outer = new THREE.Mesh(
      new THREE.ConeGeometry(0.15, 0.92, 12),
      new THREE.MeshBasicMaterial({ color: p.flameColor, transparent: true, opacity: 0.08, depthWrite: false })
    );
    outer.name = "balloon-burner-flame-outer";
    outer.position.set(x, 0.02, 0);
    group.add(outer);

    const core = new THREE.Mesh(
      new THREE.ConeGeometry(0.075, 0.62, 10),
      new THREE.MeshBasicMaterial({ color: p.coreFlameColor, transparent: true, opacity: 0.1, depthWrite: false })
    );
    core.name = "balloon-burner-flame-core";
    core.position.set(x, -0.02, 0);
    group.add(core);
    flames.push({ outer, core });
  }

  const hoseMat = new THREE.MeshStandardMaterial({ color: 0x1d242b, roughness: 0.72, metalness: 0.18 });
  for (const x of [-p.headSpacing, p.headSpacing]) {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(x, -0.7, 0.05),
      new THREE.Vector3(x * 1.35, -0.95, 0.1),
      new THREE.Vector3(x * 1.45, -1.25, 0.18)
    ]);
    const hose = new THREE.Mesh(new THREE.TubeGeometry(curve, 12, 0.018, 5, false), hoseMat);
    hose.name = "balloon-burner-fuel-hose";
    group.add(hose);
  }

  const glow = new THREE.PointLight(p.glowColor, 0.06, 7);
  glow.position.y = -0.05;
  group.add(glow);
  const basketWarmth = new THREE.PointLight(0xff8a3d, 0.04, 4.5);
  basketWarmth.name = "basket-warmth-light";
  basketWarmth.position.set(0, -1.05, 0);
  group.add(basketWarmth);

  group.userData.flames = flames;
  group.userData.burnerHeads = burnerHeads;
  group.userData.glow = glow;
  group.userData.basketWarmth = basketWarmth;
  return group;
}

export function animateBurner(burner, time = performance.now(), heat = 0.18) {
  const flames = burner?.userData?.flames ?? [];
  const glow = burner?.userData?.glow;
  const basketWarmth = burner?.userData?.basketWarmth;
  const heatLevel = Math.max(0, Math.min(1, Number(heat) || 0));
  const active = Math.max(0, (heatLevel - 0.2) / 0.8);
  const pulse = 0.82 + Math.sin(time * 0.019) * 0.11 + Math.sin(time * 0.041) * 0.05;
  flames.forEach(({ outer, core }, index) => {
    const stagger = 0.96 + Math.sin(time * 0.012 + index) * 0.04;
    outer.visible = active > 0.035;
    core.visible = active > 0.035;
    outer.scale.set(0.78 + active * 0.28, Math.max(0.25, pulse * stagger * (0.35 + active * 1.35)), 0.78 + active * 0.28);
    core.scale.set(0.72 + active * 0.18, Math.max(0.2, pulse * (0.28 + active * 1.05)), 0.72 + active * 0.18);
    outer.material.opacity = active * 0.72;
    core.material.opacity = active * 0.88;
  });
  if (glow) glow.intensity = active * (0.5 + pulse * 1.25);
  if (basketWarmth) basketWarmth.intensity = 0.04 + active * 0.82;
  burner.position.y = active * -0.018 * pulse;
}

window.OpenAboveHotAirBalloonBurnerKit = {
  id: HOT_AIR_BALLOON_BURNER_KIT_ID,
  defaultBurnerProfile,
  buildBurner,
  animateBurner
};
