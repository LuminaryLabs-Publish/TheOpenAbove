import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export const CLOUD_LIGHTING_KIT_ID = "open-above-cloud-lighting-kit";

export function createCloudLightingState() {
  const state = {
    sunColor: new THREE.Color(0xffb66f),
    skyFill: new THREE.Color(0x95c8eb),
    forwardScatter: 0.72,
    silverLining: 0.62
  };
  function update(sunDirection) {
    const elevation = THREE.MathUtils.clamp(sunDirection.y, 0, 1);
    state.sunColor.set(0xff9a52).lerp(new THREE.Color(0xffe2bc), elevation);
    state.skyFill.set(0x779fc3).lerp(new THREE.Color(0xb4d9ef), elevation * 0.8);
    state.forwardScatter = THREE.MathUtils.lerp(0.82, 0.62, elevation);
    state.silverLining = THREE.MathUtils.lerp(0.74, 0.5, elevation);
    return state;
  }
  return { id: CLOUD_LIGHTING_KIT_ID, state, update };
}

window.OpenAboveCloudLightingKit = { id: CLOUD_LIGHTING_KIT_ID, createCloudLightingState };
