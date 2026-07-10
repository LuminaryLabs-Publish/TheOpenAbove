import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export const AERIAL_PERSPECTIVE_KIT_ID = "open-above-aerial-perspective-kit";

export function createAerialPerspective(scene, profile = {}) {
  const fog = new THREE.FogExp2(profile.color ?? 0xd8b38f, profile.density ?? 0.00038);
  scene.fog = fog;
  const state = { baseDensity: profile.density ?? 0.00038 };

  function update(camera, sunDirection, weather = {}) {
    const altitude = Math.max(0, camera.position.y);
    const altitudeClear = THREE.MathUtils.clamp(1 - altitude / 1100, 0.38, 1);
    const cloudBoost = 1 + (weather.coverage ?? 0.55) * 0.28;
    fog.density = state.baseDensity * altitudeClear * cloudBoost;
    const sunWarmth = THREE.MathUtils.clamp(1 - Math.max(0, sunDirection.y) * 1.8, 0, 1);
    fog.color.set(0xc7dcdf).lerp(new THREE.Color(0xe3a875), 0.44 + sunWarmth * 0.34);
  }

  return { id: AERIAL_PERSPECTIVE_KIT_ID, fog, state, update };
}

window.OpenAboveAerialPerspectiveKit = { id: AERIAL_PERSPECTIVE_KIT_ID, createAerialPerspective };
