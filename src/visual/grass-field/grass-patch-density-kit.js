import { hashGrassSeed, normalizeGrassSeed, seedFloat } from "./grass-world-seed-kit.js";

export const GRASS_PATCH_DENSITY_KIT_ID = "open-above-grass-patch-density-kit";

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function smoothstep(low, high, value) {
  const t = clamp01((value - low) / Math.max(0.00001, high - low));
  return t * t * (3 - 2 * t);
}

function latticeValue(ix, iz, seed) {
  return seedFloat(hashGrassSeed(seed, ix, iz), 0);
}

function valueNoise(x, z, seed) {
  const ix = Math.floor(x);
  const iz = Math.floor(z);
  const fx = smoothstep(0, 1, x - ix);
  const fz = smoothstep(0, 1, z - iz);
  const a = latticeValue(ix, iz, seed);
  const b = latticeValue(ix + 1, iz, seed);
  const c = latticeValue(ix, iz + 1, seed);
  const d = latticeValue(ix + 1, iz + 1, seed);
  const top = a + (b - a) * fx;
  const bottom = c + (d - c) * fx;
  return top + (bottom - top) * fz;
}

function fbm(x, z, seed, octaves = 4) {
  let value = 0;
  let amplitude = 0.54;
  let frequency = 1;
  let total = 0;
  for (let octave = 0; octave < octaves; octave += 1) {
    value += valueNoise(x * frequency, z * frequency, seed + octave * 1013) * amplitude;
    total += amplitude;
    amplitude *= 0.5;
    frequency *= 2.03;
  }
  return value / total;
}

function createCenters({ worldSeed, terrainSize, count, lane, clearing }) {
  const extent = Math.max(900, terrainSize * 0.72);
  return Array.from({ length: count }, (_, index) => {
    const seed = hashGrassSeed(worldSeed, lane, index, clearing ? 97 : 43);
    return {
      x: (seedFloat(seed, 0) * 2 - 1) * extent,
      z: (seedFloat(seed, 1) * 2 - 1) * extent,
      radius: clearing ? 8 + seedFloat(seed, 2) * 22 : 12 + seedFloat(seed, 2) * 33,
      transition: 3 + seedFloat(seed, 3) * 5,
      strength: clearing ? 0.5 + seedFloat(seed, 4) * 0.45 : 0.15 + seedFloat(seed, 4) * 0.25
    };
  });
}

function centerInfluence(x, z, center) {
  const distance = Math.hypot(x - center.x, z - center.z);
  return 1 - smoothstep(center.radius - center.transition, center.radius + center.transition, distance);
}

export function createGrassPatchDistribution(worldSeed, terrainSize = 2400) {
  const normalizedSeed = normalizeGrassSeed(worldSeed);
  const patchCount = 20 + Math.floor(seedFloat(normalizedSeed, 20) * 16);
  const clearingCount = 15 + Math.floor(seedFloat(normalizedSeed, 21) * 11);
  const patches = createCenters({ worldSeed, terrainSize, count: patchCount, lane: 211, clearing: false });
  const clearings = createCenters({ worldSeed, terrainSize, count: clearingCount, lane: 419, clearing: true });

  return {
    worldSeed,
    patchCount,
    clearingCount,
    patches,
    clearings,
    sample(x, z, biomeDensity = 1, context = {}) {
      const macroNoise = fbm(x * 0.004, z * 0.004, normalizedSeed + 17);
      const patchNoise = fbm(x * 0.018, z * 0.018, normalizedSeed + 53);
      const detailNoise = valueNoise(x * 0.07, z * 0.07, normalizedSeed + 89);
      const raw = macroNoise * 0.55 + patchNoise * 0.35 + detailNoise * 0.1;
      let density = Math.pow(smoothstep(0.32, 0.72, raw), 1.6) * biomeDensity;

      for (const patch of patches) density += centerInfluence(x, z, patch) * patch.strength;
      for (const clearing of clearings) density *= 1 - centerInfluence(x, z, clearing) * clearing.strength;

      const lowlandBoost = clamp01((42 - Number(context.height || 0)) / 120) * 0.08;
      const treeBoost = clamp01(Number(context.treeProximity || 0)) * 0.12;
      const hilltopPenalty = clamp01((Number(context.height || 0) - 72) / 70) * 0.22;
      density += lowlandBoost + treeBoost;
      density *= 1 - hilltopPenalty;
      return clamp01(density);
    }
  };
}

window.OpenAboveGrassPatchDensityKit = {
  id: GRASS_PATCH_DENSITY_KIT_ID,
  createGrassPatchDistribution
};
