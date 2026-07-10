export const GRASS_WORLD_SEED_KIT_ID = "open-above-grass-world-seed-kit";

export function hashU32(value) {
  let x = value >>> 0;
  x ^= x >>> 16;
  x = Math.imul(x, 0x7feb352d);
  x ^= x >>> 15;
  x = Math.imul(x, 0x846ca68b);
  x ^= x >>> 16;
  return x >>> 0;
}

export function hashGrassSeed(worldSeed, chunkX, chunkZ, instanceIndex = 0, biomeId = 0) {
  let h = hashU32(Number(worldSeed) || 1);
  h = hashU32(h ^ Math.imul(chunkX | 0, 0x9e3779b1));
  h = hashU32(h ^ Math.imul(chunkZ | 0, 0x85ebca77));
  h = hashU32(h ^ Math.imul(instanceIndex | 0, 0xc2b2ae3d));
  h = hashU32(h ^ Math.imul(biomeId | 0, 0x27d4eb2f));
  return h >>> 0;
}

export function seedFloat(seed, lane = 0) {
  return hashU32(seed ^ Math.imul(lane + 1, 0x9e3779b1)) / 4294967296;
}

window.OpenAboveGrassWorldSeedKit = { id: GRASS_WORLD_SEED_KIT_ID, hashGrassSeed, seedFloat };
