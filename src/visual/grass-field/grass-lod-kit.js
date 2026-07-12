export const GRASS_LOD_KIT_ID = "open-above-grass-lod-kit";
export const GRASS_FADE_START = 525;
export const GRASS_FADE_END = 750;
export const GRASS_CULL_DISTANCE = 1100;

const HIGH_BUDGET = Object.freeze({ center: 300, near: 275 });

function scaledCount(count, qualityId) {
  if (qualityId === "medium") return Math.round(count * 0.7);
  if (qualityId === "low") return Math.round(count * 0.42);
  return count;
}

export function grassLodForChunkDistance(distanceInChunks, qualityId = "high") {
  if (distanceInChunks < 0.01) return { lod: 0, count: scaledCount(HIGH_BUDGET.center, qualityId), planes: 2, wind: 1 };
  if (distanceInChunks <= 1.5) return { lod: 0, count: scaledCount(HIGH_BUDGET.near, qualityId), planes: 2, wind: 1 };
  return { lod: 1, count: 0, planes: 0, wind: 0 };
}

if (typeof window !== "undefined") {
  window.OpenAboveGrassLodKit = {
    id: GRASS_LOD_KIT_ID,
    GRASS_FADE_START,
    GRASS_FADE_END,
    GRASS_CULL_DISTANCE,
    grassLodForChunkDistance
  };
}
