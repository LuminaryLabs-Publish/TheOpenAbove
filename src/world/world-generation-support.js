import {
  hashGrassSeed,
  normalizeGrassSeed,
  seedFloat
} from "../visual/grass-field/grass-world-seed-kit.js";

export const WORLD_GENERATION_KIT_ID = "open-above-world-generation-kit";
export const WORLD_GRID_SIZE = 257;
export const WORLD_FEATURE_CELL_SIZE = 2080;
export const WORLD_GRASS_TYPE_COUNT = 5;
export const WORLD_FLOWER_TYPE_COUNT = 5;
export const WORLD_GENERATION_PHASES = Object.freeze(["height", "erosion", "flow", "climate", "biome", "ready"]);
export const EROSION_PASSES = 6;
export const DEFAULT_WORK_BUDGET = 12000;
export const TAU = Math.PI * 2;
export const clamp01 = (value) => Math.max(0, Math.min(1, Number(value) || 0));
export const lerp = (a, b, t) => a + (b - a) * t;
export const clone = (value) => value === undefined ? undefined : structuredClone(value);
export const nowMs = () => globalThis.performance?.now?.() ?? Date.now();

export function smoothstep(low, high, value) {
  const t = clamp01((value - low) / Math.max(0.000001, high - low));
  return t * t * (3 - 2 * t);
}

function latticeValue(ix, iz, seed) {
  return seedFloat(hashGrassSeed(seed, ix, iz), 0);
}

export function valueNoise(x, z, seed) {
  const ix = Math.floor(x);
  const iz = Math.floor(z);
  const fx = smoothstep(0, 1, x - ix);
  const fz = smoothstep(0, 1, z - iz);
  const a = latticeValue(ix, iz, seed);
  const b = latticeValue(ix + 1, iz, seed);
  const c = latticeValue(ix, iz + 1, seed);
  const d = latticeValue(ix + 1, iz + 1, seed);
  return lerp(lerp(a, b, fx), lerp(c, d, fx), fz);
}

export function fbm(x, z, seed, octaves = 4) {
  let value = 0;
  let amplitude = 0.55;
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

export function ridgedFbm(x, z, seed, octaves = 4) {
  let value = 0;
  let amplitude = 0.58;
  let frequency = 1;
  let total = 0;
  for (let octave = 0; octave < octaves; octave += 1) {
    const sample = valueNoise(x * frequency, z * frequency, seed + octave * 1619);
    const ridge = 1 - Math.abs(sample * 2 - 1);
    value += ridge * ridge * amplitude;
    total += amplitude;
    amplitude *= 0.5;
    frequency *= 2.07;
  }
  return value / total;
}

export function distanceToSegmentSquared(px, pz, ax, az, bx, bz) {
  const abx = bx - ax;
  const abz = bz - az;
  const lengthSq = abx * abx + abz * abz;
  if (lengthSq <= 0.000001) return (px - ax) ** 2 + (pz - az) ** 2;
  const t = clamp01(((px - ax) * abx + (pz - az) * abz) / lengthSq);
  const x = ax + abx * t;
  const z = az + abz * t;
  return (px - x) ** 2 + (pz - z) ** 2;
}

export function radialProtection(distance, core, transition) {
  return 1 - smoothstep(core, core + transition, distance);
}

export function colorMix(first, second, t) {
  return [
    Math.round(lerp(first[0], second[0], t)),
    Math.round(lerp(first[1], second[1], t)),
    Math.round(lerp(first[2], second[2], t))
  ];
}

export function normalizeAnchors(anchors = {}) {
  const segments = [];
  for (const route of anchors.routes || []) {
    for (let index = 1; index < (route.points?.length || 0); index += 1) {
      const a = route.points[index - 1];
      const b = route.points[index];
      segments.push({ ax: Number(a.x) || 0, az: Number(a.z) || 0, bx: Number(b.x) || 0, bz: Number(b.z) || 0 });
    }
  }
  const towns = (anchors.towns || []).map((town) => ({
    x: Number(town.position?.x) || 0,
    z: Number(town.position?.z) || 0
  }));
  return { segments, towns };
}

export function buildFeatureCell(seed, cellX, cellZ) {
  const cellSeed = hashGrassSeed(seed, cellX, cellZ, 871);
  return Object.freeze({
    x: cellX,
    z: cellZ,
    fieldBias: seedFloat(cellSeed, 0),
    forestBias: seedFloat(cellSeed, 1),
    wetBias: seedFloat(cellSeed, 2),
    bareBias: seedFloat(cellSeed, 3),
    flowerBias: 0.42 + seedFloat(cellSeed, 4) * 0.58,
    grassOffset: Math.floor(seedFloat(cellSeed, 5) * WORLD_GRASS_TYPE_COUNT),
    flowerType: Math.floor(seedFloat(cellSeed, 6) * WORLD_FLOWER_TYPE_COUNT),
    secondaryFlowerType: Math.floor(seedFloat(cellSeed, 7) * WORLD_FLOWER_TYPE_COUNT)
  });
}

export function biomeProfile(height, moisture, temperature, fertility, feature) {
  if (moisture > 0.78 && height < 48) return { id: 0, name: "wet-lowland", baseDensity: 0.8, primaryGrassType: 0, secondaryGrassType: 2 };
  if (height > 78) return { id: 3, name: "olive-highland", baseDensity: 0.58, primaryGrassType: 3, secondaryGrassType: 4 };
  if ((temperature > 0.63 && moisture < 0.43) || feature.fieldBias > 0.82) {
    return { id: 4, name: "golden-field", baseDensity: 0.72, primaryGrassType: 4, secondaryGrassType: 3 };
  }
  if (fertility > 0.62 || feature.forestBias > 0.78) {
    return { id: 2, name: "spring-meadow", baseDensity: 0.94, primaryGrassType: 2, secondaryGrassType: 1 };
  }
  return { id: 1, name: "green-meadow", baseDensity: 0.88, primaryGrassType: 1, secondaryGrassType: feature.grassOffset % 2 === 0 ? 0 : 2 };
}

export function createWorkset(total) {
  return {
    rawHeight: new Float32Array(total),
    heightGrid: new Float32Array(total),
    moistureGrid: new Float32Array(total),
    temperatureGrid: new Float32Array(total),
    fertilityGrid: new Float32Array(total),
    protectionGrid: new Float32Array(total),
    flowGrid: new Float32Array(total),
    eroded: new Float32Array(total),
    delta: new Float32Array(total),
    biomeGrid: new Uint8Array(total),
    order: new Uint32Array(total),
    sortBuffer: new Uint32Array(total),
    cursor: 0,
    erosionPass: 0,
    erosionMode: "scan",
    flowMode: "initialize",
    sortWidth: 1,
    sortLeft: 0,
    merge: null,
    biomeCounts: [0, 0, 0, 0, 0]
  };
}

export const PHASE_RANGES = Object.freeze({
  height: [0, 0.22],
  erosion: [0.22, 0.54],
  flow: [0.54, 0.78],
  climate: [0.78, 0.93],
  biome: [0.93, 1],
  ready: [1, 1]
});

export { normalizeGrassSeed };
