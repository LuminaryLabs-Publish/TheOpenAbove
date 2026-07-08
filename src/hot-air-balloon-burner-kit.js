import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export const HOT_AIR_BALLOON_BURNER_KIT_ID = "open-above-hot-air-balloon-burner-kit";

export const defaultBurnerProfile = {
  frameColor: 0x334155,
  flameColor: 0xff7a18,
  glowColor: 0xffd166
};

export function buildBurner(profile = defaultBurnerProfile) {
  const group = new THREE.Group();
  group.name = "hot-air-balloon-burner";
  group.userData.domain = HOT_AIR_BALLOON_BURNER_KIT_ID;

  const frameMat = new THREE.MeshStandardMaterial({ color: profile.frameColor, roughness: 0.54, metalness: 0.45 });
  const burner = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.28, 0.32, 10), frameMat);
  burner.position.y = -0.72;
  group.add(burner);

  const flame = new THREE.Mesh(
    new THREE.ConeGeometry(0.22, 0.7, 10),
    new THREE.MeshBasicMaterial({ color: profile.flameColor, transparent: true, opacity: 0.78 })
  );
  flame.position.y = -0.22;
  flame.rotation.x = Math.PI;
  flame.name = "balloon-burner-flame";
  group.add(flame);

  const glow = new THREE.PointLight(profile.glowColor, 0.9, 8);
  glow.position.y = -0.2;
  group.add(glow);

  const basketWarmth = new THREE.PointLight(0xff8a3d, 0.25, 4.5);
  basketWarmth.name = "basket-warmth-light";
  basketWarmth.position.set(0, -1.05, 0);
  group.add(basketWarmth);

  group.userData.flame = flame;
  group.userData.glow = glow;
  group.userData.basketWarmth = basketWarmth;
  return group;
}

export function animateBurner(burner, time = performance.now(), heat = 0.18) {
  const flame = burner?.userData?.flame;
  const glow = burner?.userData?.glow;
  const basketWarmth = burner?.userData?.basketWarmth;
  const heatLevel = Math.max(0, Math.min(1, Number(heat) || 0));
  const pulse = 0.72 + Math.sin(time * 0.014) * 0.16 + Math.sin(time * 0.031) * 0.08;
  const activeScale = 0.45 + heatLevel * 1.55;
  if (flame) {
    flame.scale.set(0.72 + heatLevel * 0.48, Math.max(0.42, pulse * activeScale), 0.72 + heatLevel * 0.48);
    flame.material.opacity = 0.34 + heatLevel * 0.58;
  }
  if (glow) glow.intensity = 0.42 + pulse * (0.24 + heatLevel * 1.2);
  if (basketWarmth) basketWarmth.intensity = 0.08 + heatLevel * 0.92;
}

window.OpenAboveHotAirBalloonBurnerKit = {
  id: HOT_AIR_BALLOON_BURNER_KIT_ID,
  defaultBurnerProfile,
  buildBurner,
  animateBurner
};
