import { hashGrassSeed, seedFloat } from "./grass-world-seed-kit.js";
import { GRASS_SPECIES_COUNT, sampleGrassDensity } from "./grass-biome-density-kit.js";
import { grassExcluded } from "./grass-exclusion-mask-kit.js";
import { createGrassPatchDistribution } from "./grass-patch-density-kit.js";

export const GRASS_CHUNK_PLACEMENT_KIT_ID = "open-above-grass-chunk-placement-kit";

function greatestCommonDivisor(a, b) {
  let left = Math.abs(a);
  let right = Math.abs(b);
  while (right) [left, right] = [right, left % right];
  return left;
}

function chooseHeightBand(seed, species) {
  const roll = seedFloat(seed, 12);
  const goldenBias = species === 4 ? 0.08 : 0;
  if (roll < 0.72 - goldenBias) {
    return { id: "normal", scale: 0.85 + seedFloat(seed, 13) * 0.4 };
  }
  if (roll < 0.92 - goldenBias * 0.35) {
    return { id: "tall", scale: 1.45 + seedFloat(seed, 13) * 0.55 };
  }
  return { id: "hero", scale: 2.2 + seedFloat(seed, 13) * 0.8 };
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
  const maxAttempts = count * 28;
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
    const context = { height: y, moisture, slope, treeProximity };
    const flora = patchDistribution.profile?.(x, z, context);
    const density = patchDistribution.sample(x, z, biome.density, context);
    if (grassExcluded({ x, z, moisture, slope }) || obstacleAt(x, z)) continue;
    if (seedFloat(seed, 2) > density) continue;

    const normalLength = Math.hypot(dx, slopeStep * 2, dz) || 1;
    const sizeBand = density >= 0.68
      ? [0.9, 1.35]
      : density >= 0.34
        ? [0.75, 1.1]
        : [0.55, 0.9];
    const densityScale = sizeBand[0] + seedFloat(seed, 8) * (sizeBand[1] - sizeBand[0]);
    const primarySpecies = Number.isInteger(flora?.primaryGrassType) ? flora.primaryGrassType : biome.species;
    const secondarySpecies = Number.isInteger(flora?.secondaryGrassType)
      ? flora.secondaryGrassType
      : (primarySpecies + 1) % GRASS_SPECIES_COUNT;
    const secondaryMix = Math.max(0, Math.min(0.4, Number(flora?.secondaryMix) || 0.14));
    const species = seedFloat(seed, 11) < secondaryMix ? secondarySpecies : primarySpecies;
    const heightBand = chooseHeightBand(seed, species);
    const speciesHeight = [0.86, 1, 0.92, 1.1, 1.22][species] ?? 1;
    const speciesWidth = [1.08, 1, 0.9, 0.94, 0.86][species] ?? 1;

    candidates.push({
      x,
      y,
      z,
      rotation: seedFloat(seed, 3) * Math.PI * 2,
      height: (1.25 + seedFloat(seed, 4) * 0.78) * densityScale * heightBand.scale * speciesHeight,
      width: (5.8 + seedFloat(seed, 5) * 3.6) * densityScale * speciesWidth,
      leanX: (seedFloat(seed, 9) - 0.5) * 0.279,
      leanZ: (seedFloat(seed, 10) - 0.5) * 0.279,
      normal: { x: -dx / normalLength, y: (slopeStep * 2) / normalLength, z: -dz / normalLength },
      phase: seedFloat(seed, 6) * Math.PI * 2,
      species,
      hue: seedFloat(seed, 7),
      variant: species,
      heightBand: heightBand.id,
      density,
      seed
    });
  }

  return candidates;
}

if (typeof window !== "undefined") {
  window.OpenAboveGrassChunkPlacementKit = { id: GRASS_CHUNK_PLACEMENT_KIT_ID, generateGrassChunkCandidates };
}
