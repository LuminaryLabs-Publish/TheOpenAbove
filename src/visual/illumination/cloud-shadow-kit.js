export const CLOUD_SHADOW_KIT_ID = "open-above-cloud-shadow-kit";

export function createCloudShadowOverlay(_scene, terrainSurface, weatherMap) {
  const state = {
    mode: "terrain-material",
    strength: 0.24,
    coverage: weatherMap?.state?.coverage ?? 0.55,
    offset: [...(weatherMap?.state?.offset ?? [0, 0])]
  };

  function update() {
    state.coverage = weatherMap?.state?.coverage ?? state.coverage;
    state.offset = [...(weatherMap?.state?.offset ?? state.offset)];
    terrainSurface?.cloudShadow?.update?.(weatherMap?.state);
    return state;
  }

  return {
    id: CLOUD_SHADOW_KIT_ID,
    mesh: null,
    state,
    update,
    dispose() {}
  };
}

window.OpenAboveCloudShadowKit = { id: CLOUD_SHADOW_KIT_ID, createCloudShadowOverlay };
