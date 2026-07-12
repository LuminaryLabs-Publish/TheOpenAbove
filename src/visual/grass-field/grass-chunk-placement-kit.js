import { hashGrassSeed, seedFloat } from "./grass-world-seed-kit.js";
import { sampleGrassDensity } from "./grass-biome-density-kit.js";
import { grassExcluded } from "./grass-exclusion-mask-kit.js";
import { createGrassPatchDistribution } from "./grass-patch-density-kit.js";

export const GRASS_CHUNK_PLACEMENT_KIT_ID = "open-above-grass-chunk-placement-kit";

function greatestCommonDivisor(a, b) {
  let left = Math.abs(a);
  let right = Math.abs(b);
  while (right) [left, right] = [right, left % right];
  return left;
}

export function generateGrassChunkCandidates({
  worldSeed,
  chunkX,
  chunkZ,
  chunkSize,
  count,
  terrainHeight,
  moistureAt,
  patchDistribution = createGrassPatchDistribution(worldSeed),
  treeProximityAt = () => 0,
  obstacleAt = () => false
}) {
  const candidates = [];
  const originX = chunkX * chunkSize;
  const originZ = chunkZ * chunkSize;
  const slopeStep = 2.5;
  const maxAttempts = count * 18;
  const gridSide = Math.ceil(Math.sqrt(maxAttempts));
  const totalCells = gridSide * gridSide;
  const cellSize = chunkSize / gridSide;
  const chunkSeed = hashGrassSeed(worldSeed, chunkX, chunkZ, 1701);
  const startCell = Math.floor(seedFloat(chunkSeed, 0) * totalCells);
  let stride = 3 + Math.floor(seedFloat(chunkSeed, 1) * Math.max(3, totalCells - 4));
  while (greatestCommonDivisor(stride, totalCells) !== 1) stride += 1;

  for (let attempt = 0; attempt < maxAttempts && candidates.length < count; attempt += 1) {
    const seed = hashGrassSeed(worldSeed, chunkX, chunkZ, attempt);
    const cellIndex = (startCell + attempt * stride) % totalCells;
    const cellX = cellIndex % gridSide;
    const cellZ = Math.floor(cellIndex / gridSide);
    const x = originX - chunkSize * 0.5 + (cellX + 0.15 + seedFloat(seed, 0) * 0.7) * cellSize;
    const z = originZ - chunkSize * 0.5 + (cellZ + 0.15 + seedFloat(seed, 1) * 0.7) * cellSize;
    const y = terrainHeight(x, z);
    const moisture = moistureAt(x, z);
    const dx = terrainHeight(x + slopeStep, z) - terrainHeight(x - slopeStep, z);
    const dz = terrainHeight(x, z + slopeStep) - terrainHeight(x, z - slopeStep);
    const slope = Math.hypot(dx, dz) / (slopeStep * 2);
    const biome = sampleGrassDensity({ height: y, moisture, slope });
    const treeProximity = treeProximityAt(x, z);
    const density = patchDistribution.sample(x, z, biome.density, { height: y, treeProximity });
    if (grassExcluded({ x, z, moisture, slope }) || obstacleAt(x, z)) continue;
    if (seedFloat(seed, 2) > density) continue;

    const normalLength = Math.hypot(dx, slopeStep * 2, dz) || 1;
    const sizeBand = density >= 0.68
      ? [0.9, 1.35]
      : density >= 0.34
        ? [0.75, 1.1]
        : [0.55, 0.9];
    const densityScale = sizeBand[0] + seedFloat(seed, 8) * (sizeBand[1] - sizeBand[0]);

    candidates.push({
      x,
      y,
      z,
      rotation: seedFloat(seed, 3) * Math.PI * 2,
      height: (1.45 + seedFloat(seed, 4) * 1.15) * densityScale,
      width: (6.2 + seedFloat(seed, 5) * 3.8) * densityScale,
      leanX: (seedFloat(seed, 9) - 0.5) * 0.279,
      leanZ: (seedFloat(seed, 10) - 0.5) * 0.279,
      normal: { x: -dx / normalLength, y: (slopeStep * 2) / normalLength, z: -dz / normalLength },
      phase: seedFloat(seed, 6) * Math.PI * 2,
      species: biome.species,
      hue: seedFloat(seed, 7),
      variant: Math.floor(seedFloat(seed, 11) * 8),
      density,
      seed
    });
  }

  return candidates;
}

window.OpenAboveGrassChunkPlacementKit = { id: GRASS_CHUNK_PLACEMENT_KIT_ID, generateGrassChunkCandidates };
