import { grassExcluded } from "../grass-field/grass-exclusion-mask-kit.js";
import { hashGrassSeed, seedFloat } from "../grass-field/grass-world-seed-kit.js";

export const FLOWER_CHUNK_PLACEMENT_KIT_ID = "open-above-flower-chunk-placement-kit";
export const FLOWER_TYPE_COUNT = 5;
export const FLOWER_FADE_START = 420;
export const FLOWER_FADE_END = 620;
export const FLOWER_CULL_DISTANCE = 900;

function scaledCount(count, qualityId) {
  if (qualityId === "medium") return Math.round(count * 0.63);
  if (qualityId === "low") return Math.round(count * 0.33);
  return count;
}

export function flowerCountForChunkDistance(distanceInChunks, qualityId = "high") {
  if (distanceInChunks < 0.01) return scaledCount(60, qualityId);
  if (distanceInChunks <= 1.5) return scaledCount(30, qualityId);
  return 0;
}

function greatestCommonDivisor(a, b) {
  let left = Math.abs(a);
  let right = Math.abs(b);
  while (right) [left, right] = [right, left % right];
  return left;
}

export function generateFlowerChunkCandidates({
  worldSeed,
  chunkX,
  chunkZ,
  chunkSize,
  count,
  terrainHeight,
  moistureAt,
  floraAt = () => null,
  obstacleAt = () => false
}) {
  const candidates = [];
  const originX = chunkX * chunkSize;
  const originZ = chunkZ * chunkSize;
  const slopeStep = 2.5;
  const maxAttempts = Math.max(1, count) * 50;
  const gridSide = Math.ceil(Math.sqrt(maxAttempts));
  const totalCells = gridSide * gridSide;
  const cellSize = chunkSize / gridSide;
  const chunkSeed = hashGrassSeed(worldSeed, chunkX, chunkZ, 5101);
  const startCell = Math.floor(seedFloat(chunkSeed, 0) * totalCells);
  let stride = 5 + Math.floor(seedFloat(chunkSeed, 1) * Math.max(5, totalCells - 6));
  while (greatestCommonDivisor(stride, totalCells) !== 1) stride += 1;

  for (let attempt = 0; attempt < maxAttempts && candidates.length < count; attempt += 1) {
    const seed = hashGrassSeed(worldSeed, chunkX, chunkZ, attempt, 83);
    const cellIndex = (startCell + attempt * stride) % totalCells;
    const cellX = cellIndex % gridSide;
    const cellZ = Math.floor(cellIndex / gridSide);
    const x = originX - chunkSize * 0.5 + (cellX + 0.18 + seedFloat(seed, 0) * 0.64) * cellSize;
    const z = originZ - chunkSize * 0.5 + (cellZ + 0.18 + seedFloat(seed, 1) * 0.64) * cellSize;
    const y = terrainHeight(x, z);
    const moisture = moistureAt(x, z);
    const dx = terrainHeight(x + slopeStep, z) - terrainHeight(x - slopeStep, z);
    const dz = terrainHeight(x, z + slopeStep) - terrainHeight(x, z - slopeStep);
    const slope = Math.hypot(dx, dz) / (slopeStep * 2);
    const flora = floraAt(x, z, { height: y, moisture, slope });
    const density = Math.max(0, Math.min(1, Number(flora?.flowerDensity) || 0));
    if (grassExcluded({ x, z, moisture, slope }) || obstacleAt(x, z)) continue;
    if (seedFloat(seed, 2) > density) continue;

    const normalLength = Math.hypot(dx, slopeStep * 2, dz) || 1;
    const primaryType = Number.isInteger(flora?.flowerType) ? flora.flowerType : Math.floor(seedFloat(seed, 3) * FLOWER_TYPE_COUNT);
    const secondaryType = Number.isInteger(flora?.secondaryFlowerType)
      ? flora.secondaryFlowerType
      : (primaryType + 1) % FLOWER_TYPE_COUNT;
    const type = seedFloat(seed, 4) < 0.16 ? secondaryType : primaryType;

    candidates.push({
      x,
      y,
      z,
      rotation: seedFloat(seed, 5) * Math.PI * 2,
      height: 1.8 + seedFloat(seed, 6) * 2.4,
      width: 2.4 + seedFloat(seed, 7) * 2.2,
      leanX: (seedFloat(seed, 8) - 0.5) * 0.16,
      leanZ: (seedFloat(seed, 9) - 0.5) * 0.16,
      normal: { x: -dx / normalLength, y: (slopeStep * 2) / normalLength, z: -dz / normalLength },
      type,
      density,
      seed
    });
  }

  return candidates;
}

if (typeof window !== "undefined") {
  window.OpenAboveFlowerChunkPlacementKit = {
    id: FLOWER_CHUNK_PLACEMENT_KIT_ID,
    FLOWER_TYPE_COUNT,
    FLOWER_FADE_START,
    FLOWER_FADE_END,
    FLOWER_CULL_DISTANCE,
    flowerCountForChunkDistance,
    generateFlowerChunkCandidates
  };
}
