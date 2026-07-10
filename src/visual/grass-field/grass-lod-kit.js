export const GRASS_LOD_KIT_ID = "open-above-grass-lod-kit";

export function grassLodForChunkDistance(distanceInChunks, qualityId = "high") {
  const dense = qualityId === "low" ? 3000 : qualityId === "medium" ? 5000 : 8000;
  const mid = qualityId === "low" ? 700 : qualityId === "medium" ? 1200 : 1800;
  if (distanceInChunks <= 1.5) return { lod: 0, count: dense, planes: 3, wind: 1 };
  if (distanceInChunks <= 2.6) return { lod: 1, count: mid, planes: 2, wind: 0.55 };
  return { lod: 2, count: 0, planes: 0, wind: 0 };
}

window.OpenAboveGrassLodKit = { id: GRASS_LOD_KIT_ID, grassLodForChunkDistance };
