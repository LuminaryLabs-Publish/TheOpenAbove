import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export const SUN_LIGHT_KIT_ID = "open-above-sun-light-kit";

export function createSunLight(scene, quality, profile = {}) {
  const direction = new THREE.Vector3(-0.48, 0.24, -0.84).normalize();
  const sun = new THREE.DirectionalLight(profile.color ?? 0xffc47c, profile.intensity ?? 4.1);
  sun.name = "open-above-sun-key";
  sun.castShadow = true;
  sun.shadow.mapSize.set(quality.shadowMapSize, quality.shadowMapSize);
  sun.shadow.camera.near = 20;
  sun.shadow.camera.far = 1800;
  sun.shadow.camera.left = -520;
  sun.shadow.camera.right = 520;
  sun.shadow.camera.top = 520;
  sun.shadow.camera.bottom = -520;
  sun.shadow.bias = -0.00018;
  sun.shadow.normalBias = 0.18;
  scene.add(sun, sun.target);

  const skyFill = new THREE.HemisphereLight(0x9ed8ff, 0x694323, 1.1);
  skyFill.name = "open-above-sky-fill";
  scene.add(skyFill);

  const sunWorldPosition = new THREE.Vector3();
  function update(anchor, elapsed = 0) {
    const azimuthDrift = Math.sin(elapsed * 0.0018) * 0.018;
    direction.set(-0.48 + azimuthDrift, 0.24, -0.84).normalize();
    sunWorldPosition.copy(anchor).addScaledVector(direction, 1100);
    sun.position.copy(sunWorldPosition);
    sun.target.position.copy(anchor);
    sun.target.updateMatrixWorld();
    const elevation = clamp01(direction.y);
    sun.intensity = 3.4 + elevation * 2.4;
    sun.color.setRGB(1.0, 0.48 + elevation * 0.34, 0.24 + elevation * 0.42);
    skyFill.intensity = 0.88 + elevation * 0.52;
  }

  return { id: SUN_LIGHT_KIT_ID, sun, skyFill, direction, sunWorldPosition, update };
}

function clamp01(value) {
  return Math.max(0, Math.min(1, Number(value) || 0));
}

window.OpenAboveSunLightKit = { id: SUN_LIGHT_KIT_ID, createSunLight };
