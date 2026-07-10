import { hashGrassSeed, seedFloat } from "./grass-world-seed-kit.js";
import { sampleGrassDensity } from "./grass-biome-density-kit.js";
import { grassExcluded } from "./grass-exclusion-mask-kit.js";

export const GRASS_CHUNK_PLACEMENT_KIT_ID = "open-above-grass-chunk-placement-kit";

export function generateGrassChunkCandidates({
  worldSeed,
  chunkX,
  chunkZ,
  chunkSize,
  count,
  terrainHeight,
  moistureAt
}) {
  const candidates = [];
  const originX = chunkX * chunkSize;
  const originZ = chunkZ * chunkSize;
  const slopeStep = 2.5;
  const maxAttempts = count * 3;

  for (let attempt = 0; attempt < maxAttempts && candidates.length < count; attempt += 1) {
    const seed = hashGrassSeed(worldSeed, chunkX, chunkZ, attempt);
    const x = originX + (seedFloat(seed, 0) - 0.5) * chunkSize;
    const z = originZ + (seedFloat(seed, 1) - 0.5) * chunkSize;
    const y = terrainHeight(x, z);
    const moisture = moistureAt(x, z);
    const dx = terrainHeight(x + slopeStep, z) - terrainHeight(x - slopeStep, z);
    const dz = terrainHeight(x, z + slopeStep) - terrainHeight(x, z - slopeStep);
    const slope = Math.hypot(dx, dz) / (slopeStep * 2);
    const biome = sampleGrassDensity({ height: y, moisture, slope });
    if (grassExcluded({ x, z, moisture, slope })) continue;
    if (seedFloat(seed, 2) > biome.density) continue;

    candidates.push({
      x,
      y,
      z,
      rotation: seedFloat(seed, 3) * Math.PI * 2,
      height: 0.55 + seedFloat(seed, 4) * 1.35,
      width: 0.65 + seedFloat(seed, 5) * 0.55,
      phase: seedFloat(seed, 6) * Math.PI * 2,
      species: biome.species,
      hue: seedFloat(seed, 7),
      seed
    });
  }

  return candidates;
}

window.OpenAboveGrassChunkPlacementKit = { id: GRASS_CHUNK_PLACEMENT_KIT_ID, generateGrassChunkCandidates };
