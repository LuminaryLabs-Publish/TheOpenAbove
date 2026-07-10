export const CLOUD_LOD_KIT_ID = "open-above-cloud-lod-kit";

export function createCloudLodProfile(quality) {
  return {
    renderScale: quality.id === "high" ? 0.5 : quality.id === "medium" ? 0.42 : 0.32,
    viewSamples: quality.cloudSteps,
    lightSamples: quality.cloudLightSteps,
    temporalJitter: quality.id !== "low",
    maxDistance: quality.id === "high" ? 4200 : quality.id === "medium" ? 3500 : 2800,
    fallbackImpostors: false
  };
}

window.OpenAboveCloudLodKit = { id: CLOUD_LOD_KIT_ID, createCloudLodProfile };
