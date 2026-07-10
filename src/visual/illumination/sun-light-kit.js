import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export const SUN_LIGHT_KIT_ID = "open-above-sun-light-kit";

export function createSunLight(scene, quality, profile = {}) {
  const direction = new THREE.Vector3(-0.48, 0.31, -0.82).normalize();
  const sun = new THREE.DirectionalLight(profile.color ?? 0xffd0a0, profile.intensity ?? 3.2);
  sun.name = "open-above-sun-key";
  sun.castShadow = true;
  sun.shadow.mapSize.set(quality.shadowMapSize, quality.shadowMapSize);
  sun.shadow.camera.near = 20;
  sun.shadow.camera.far = 1800;
  sun.shadow.camera.left = -520;
  sun.shadow.camera.right = 520;
  sun.shadow.camera.top = 520;
  sun.shadow.camera.bottom = -520;
  sun.shadow.bias = -0.00012;
  sun.shadow.normalBias = 0.12;
  scene.add(sun, sun.target);

  const skyFill = new THREE.HemisphereLight(0xb9def3, 0x76654b, profile.skyIntensity ?? 1.65);
  skyFill.name = "open-above-sky-fill";
  scene.add(skyFill);

  const groundBounce = new THREE.AmbientLight(0xffead2, profile.groundBounce ?? 0.42);
  groundBounce.name = "open-above-ground-bounce";
  scene.add(groundBounce);

  const sunWorldPosition = new THREE.Vector3();
  function update(anchor, elapsed = 0) {
    const azimuthDrift = Math.sin(elapsed * 0.0018) * 0.012;
    direction.set(-0.48 + azimuthDrift, 0.31, -0.82).normalize();
    sunWorldPosition.copy(anchor).addScaledVector(direction, 1100);
    sun.position.copy(sunWorldPosition);
    sun.target.position.copy(anchor);
    sun.target.updateMatrixWorld();
    const elevation = clamp01(direction.y);
    sun.intensity = 2.8 + elevation * 1.2;
    sun.color.setRGB(1.0, 0.72 + elevation * 0.18, 0.52 + elevation * 0.28);
    skyFill.intensity = 1.45 + elevation * 0.45;
    groundBounce.intensity = 0.34 + elevation * 0.18;
  }

  return { id: SUN_LIGHT_KIT_ID, sun, skyFill, groundBounce, direction, sunWorldPosition, update };
}

function clamp01(value) {
  return Math.max(0, Math.min(1, Number(value) || 0));
}

window.OpenAboveSunLightKit = { id: SUN_LIGHT_KIT_ID, createSunLight };
