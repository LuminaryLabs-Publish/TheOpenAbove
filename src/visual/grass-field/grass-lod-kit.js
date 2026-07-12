export const GRASS_LOD_KIT_ID = "open-above-grass-lod-kit";

const HIGH_BUDGET = Object.freeze({ center: 224, near: 220, mid: 43 });

function scaledCount(count, qualityId) {
  if (qualityId === "medium") return Math.round(count * 0.7);
  if (qualityId === "low") return Math.round(count * 0.42);
  return count;
}

export function grassLodForChunkDistance(distanceInChunks, qualityId = "high") {
  if (distanceInChunks < 0.01) return { lod: 0, count: scaledCount(HIGH_BUDGET.center, qualityId), planes: 2, wind: 1 };
  if (distanceInChunks <= 1.5) return { lod: 0, count: scaledCount(HIGH_BUDGET.near, qualityId), planes: 2, wind: 1 };
  if (distanceInChunks <= 2.6) return { lod: 1, count: scaledCount(HIGH_BUDGET.mid, qualityId), planes: 2, wind: 0.55 };
  return { lod: 2, count: 0, planes: 0, wind: 0 };
}

window.OpenAboveGrassLodKit = { id: GRASS_LOD_KIT_ID, grassLodForChunkDistance };
