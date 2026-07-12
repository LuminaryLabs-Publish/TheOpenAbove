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

const TAU = Math.PI * 2;
const clamp01 = (value) => Math.max(0, Math.min(1, Number(value) || 0));
const lerp = (a, b, t) => a + (b - a) * t;

function smoothstep(low, high, value) {
  const t = clamp01((value - low) / Math.max(0.000001, high - low));
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
  return lerp(lerp(a, b, fx), lerp(c, d, fx), fz);
}

function fbm(x, z, seed, octaves = 4) {
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

function ridgedFbm(x, z, seed, octaves = 4) {
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

function distanceToSegmentSquared(px, pz, ax, az, bx, bz) {
  const abx = bx - ax;
  const abz = bz - az;
  const lengthSq = abx * abx + abz * abz;
  if (lengthSq <= 0.000001) return (px - ax) ** 2 + (pz - az) ** 2;
  const t = clamp01(((px - ax) * abx + (pz - az) * abz) / lengthSq);
  const x = ax + abx * t;
  const z = az + abz * t;
  return (px - x) ** 2 + (pz - z) ** 2;
}

function radialProtection(distance, core, transition) {
  return 1 - smoothstep(core, core + transition, distance);
}

function colorMix(first, second, t) {
  return [
    Math.round(lerp(first[0], second[0], t)),
    Math.round(lerp(first[1], second[1], t)),
    Math.round(lerp(first[2], second[2], t))
  ];
}

function normalizeAnchors(anchors = {}) {
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

function buildFeatureCell(seed, cellX, cellZ) {
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

function biomeProfile(height, moisture, temperature, fertility, feature) {
  if (moisture > 0.78 && height < 48) {
    return { id: 0, name: "wet-lowland", baseDensity: 0.8, primaryGrassType: 0, secondaryGrassType: 2 };
  }
  if (height > 78) {
    return { id: 3, name: "olive-highland", baseDensity: 0.58, primaryGrassType: 3, secondaryGrassType: 4 };
  }
  if ((temperature > 0.63 && moisture < 0.43) || feature.fieldBias > 0.82) {
    return { id: 4, name: "golden-field", baseDensity: 0.72, primaryGrassType: 4, secondaryGrassType: 3 };
  }
  if (fertility > 0.62 || feature.forestBias > 0.78) {
    return { id: 2, name: "spring-meadow", baseDensity: 0.94, primaryGrassType: 2, secondaryGrassType: 1 };
  }
  return { id: 1, name: "green-meadow", baseDensity: 0.88, primaryGrassType: 1, secondaryGrassType: feature.grassOffset % 2 === 0 ? 0 : 2 };
}

export function createWorldGenerationKit({
  worldConfig = {},
  legacyTerrainHeight = () => 0,
  anchors = {}
} = {}) {
  const seed = normalizeGrassSeed(worldConfig.seed || 1);
  const surface = worldConfig.surface || {};
  const center = {
    x: Number(surface.center?.x) || 0,
    z: Number(surface.center?.z) || 0
  };
  const radius = Math.max(1200, Number(surface.radius) || 10000);
  const gridSize = WORLD_GRID_SIZE;
  const step = radius * 2 / (gridSize - 1);
  const total = gridSize * gridSize;
  const rawHeight = new Float32Array(total);
  const heightGrid = new Float32Array(total);
  const moistureGrid = new Float32Array(total);
  const temperatureGrid = new Float32Array(total);
  const fertilityGrid = new Float32Array(total);
  const protectionGrid = new Float32Array(total);
  const flowGrid = new Float32Array(total);
  const normalizedAnchors = normalizeAnchors(anchors);
  const featureCells = new Map();

  const gridIndex = (x, z) => z * gridSize + x;
  const worldXAt = (x) => center.x - radius + x * step;
  const worldZAt = (z) => center.z - radius + z * step;

  function protectionAt(x, z) {
    let protection = radialProtection(Math.hypot(x - center.x, z - center.z), 280, 180);

    for (const town of normalizedAnchors.towns) {
      protection = Math.max(protection, radialProtection(Math.hypot(x - town.x, z - town.z), 340, 190));
    }

    const routeCoreSq = 230 * 230;
    const routeOuterSq = 410 * 410;
    for (const segment of normalizedAnchors.segments) {
      const distanceSq = distanceToSegmentSquared(x, z, segment.ax, segment.az, segment.bx, segment.bz);
      if (distanceSq <= routeCoreSq) protection = 1;
      else if (distanceSq < routeOuterSq) protection = Math.max(protection, 1 - smoothstep(routeCoreSq, routeOuterSq, distanceSq));
    }

    for (const lake of [
      { x: -260, z: 180, radius: 315 },
      { x: 420, z: -340, radius: 350 }
    ]) {
      protection = Math.max(protection, radialProtection(Math.hypot(x - lake.x, z - lake.z), lake.radius, 150));
    }

    if (Math.abs(x) < 1120) {
      const road = Math.abs(Math.sin(x * 0.0037) * 175 + z * 0.115);
      protection = Math.max(protection, 1 - smoothstep(18, 62, road));
    }

    return clamp01(protection);
  }

  for (let gz = 0; gz < gridSize; gz += 1) {
    const z = worldZAt(gz);
    for (let gx = 0; gx < gridSize; gx += 1) {
      const x = worldXAt(gx);
      const index = gridIndex(gx, gz);
      const warpX = (fbm(x * 0.00045, z * 0.00045, seed + 11, 3) * 2 - 1) * 320;
      const warpZ = (fbm(x * 0.00045, z * 0.00045, seed + 23, 3) * 2 - 1) * 320;
      const wx = x + warpX;
      const wz = z + warpZ;
      const continental = fbm(wx * 0.00018, wz * 0.00018, seed + 37, 5);
      const rolling = fbm(wx * 0.00075, wz * 0.00075, seed + 59, 5);
      const ridge = ridgedFbm(wx * 0.00125, wz * 0.00125, seed + 83, 4);
      const valley = fbm(wx * 0.0009, wz * 0.0009, seed + 107, 3);
      rawHeight[index] = (continental - 0.5) * 100
        + (rolling - 0.5) * 68
        + smoothstep(0.56, 0.9, ridge) * 48
        - smoothstep(0.64, 0.9, valley) * 18;
      protectionGrid[index] = protectionAt(x, z);
      temperatureGrid[index] = clamp01(0.66 - rawHeight[index] / 330 + (fbm(wx * 0.00032, wz * 0.00032, seed + 139, 3) - 0.5) * 0.34);
      moistureGrid[index] = fbm(wx * 0.00055, wz * 0.00055, seed + 173, 4);
    }
  }

  const eroded = new Float32Array(rawHeight);
  const delta = new Float32Array(total);
  for (let pass = 0; pass < 6; pass += 1) {
    delta.fill(0);
    for (let gz = 1; gz < gridSize - 1; gz += 1) {
      for (let gx = 1; gx < gridSize - 1; gx += 1) {
        const index = gridIndex(gx, gz);
        let lowestIndex = index;
        let lowestHeight = eroded[index];
        for (let dz = -1; dz <= 1; dz += 1) {
          for (let dx = -1; dx <= 1; dx += 1) {
            if (dx === 0 && dz === 0) continue;
            const neighbor = gridIndex(gx + dx, gz + dz);
            if (eroded[neighbor] < lowestHeight) {
              lowestHeight = eroded[neighbor];
              lowestIndex = neighbor;
            }
          }
        }
        const excess = eroded[index] - lowestHeight - 7.5;
        if (lowestIndex !== index && excess > 0) {
          const moved = excess * 0.16;
          delta[index] -= moved;
          delta[lowestIndex] += moved;
        }
      }
    }
    for (let index = 0; index < total; index += 1) eroded[index] += delta[index];
  }

  flowGrid.fill(1);
  const order = Array.from({ length: total }, (_, index) => index).sort((a, b) => eroded[b] - eroded[a]);
  for (const index of order) {
    const gx = index % gridSize;
    const gz = Math.floor(index / gridSize);
    if (gx === 0 || gz === 0 || gx === gridSize - 1 || gz === gridSize - 1) continue;
    let lowestIndex = index;
    let lowestHeight = eroded[index];
    for (let dz = -1; dz <= 1; dz += 1) {
      for (let dx = -1; dx <= 1; dx += 1) {
        if (dx === 0 && dz === 0) continue;
        const neighbor = gridIndex(gx + dx, gz + dz);
        if (eroded[neighbor] < lowestHeight) {
          lowestHeight = eroded[neighbor];
          lowestIndex = neighbor;
        }
      }
    }
    if (lowestIndex !== index) flowGrid[lowestIndex] += flowGrid[index];
  }

  for (let gz = 0; gz < gridSize; gz += 1) {
    const z = worldZAt(gz);
    for (let gx = 0; gx < gridSize; gx += 1) {
      const x = worldXAt(gx);
      const index = gridIndex(gx, gz);
      const flowLog = Math.log2(flowGrid[index] + 1);
      const channel = smoothstep(4.4, 10.5, flowLog);
      const carved = eroded[index] - channel * 13;
      const protection = protectionGrid[index];
      const legacy = Number(legacyTerrainHeight(x, z)) || 0;
      heightGrid[index] = lerp(carved, legacy, protection);

      const lakeA = Math.exp(-((x + 260) ** 2 + (z - 180) ** 2) / 90000);
      const lakeB = Math.exp(-((x - 420) ** 2 + (z + 340) ** 2) / 130000);
      const lowland = 1 - smoothstep(-38, 72, heightGrid[index]);
      moistureGrid[index] = clamp01(
        moistureGrid[index] * 0.62
        + channel * 0.34
        + lowland * 0.16
        + lakeA * 0.82
        + lakeB * 0.62
      );
      fertilityGrid[index] = clamp01(moistureGrid[index] * 0.62 + lowland * 0.26 + (1 - channel) * 0.12);
    }
  }

  function sampleGrid(array, x, z) {
    const gx = clamp01((x - (center.x - radius)) / (radius * 2)) * (gridSize - 1);
    const gz = clamp01((z - (center.z - radius)) / (radius * 2)) * (gridSize - 1);
    const x0 = Math.floor(gx);
    const z0 = Math.floor(gz);
    const x1 = Math.min(gridSize - 1, x0 + 1);
    const z1 = Math.min(gridSize - 1, z0 + 1);
    const tx = gx - x0;
    const tz = gz - z0;
    return lerp(
      lerp(array[gridIndex(x0, z0)], array[gridIndex(x1, z0)], tx),
      lerp(array[gridIndex(x0, z1)], array[gridIndex(x1, z1)], tx),
      tz
    );
  }

  function featureCellAt(x, z) {
    const cellX = Math.floor((x - center.x) / WORLD_FEATURE_CELL_SIZE);
    const cellZ = Math.floor((z - center.z) / WORLD_FEATURE_CELL_SIZE);
    const key = `${cellX}:${cellZ}`;
    if (!featureCells.has(key)) featureCells.set(key, buildFeatureCell(seed, cellX, cellZ));
    return featureCells.get(key);
  }

  const contains = (x, z) => Math.hypot(x - center.x, z - center.z) <= radius;

  function sampleHeight(x, z) {
    const macro = sampleGrid(heightGrid, x, z);
    const protection = sampleGrid(protectionGrid, x, z);
    if (protection >= 0.985) return Number(legacyTerrainHeight(x, z)) || 0;
    const fine = (fbm(x * 0.006, z * 0.006, seed + 241, 3) - 0.5) * 7.2;
    const generated = macro + fine * (1 - protection);
    if (protection <= 0.001) return generated;
    return lerp(generated, Number(legacyTerrainHeight(x, z)) || 0, smoothstep(0.18, 0.985, protection));
  }

  const sampleMoisture = (x, z) => clamp01(sampleGrid(moistureGrid, x, z));
  const sampleTemperature = (x, z) => clamp01(sampleGrid(temperatureGrid, x, z));
  const sampleFertility = (x, z) => clamp01(sampleGrid(fertilityGrid, x, z));

  function sampleBiome(x, z, context = {}) {
    const height = Number.isFinite(context.height) ? context.height : sampleHeight(x, z);
    const moisture = Number.isFinite(context.moisture) ? context.moisture : sampleMoisture(x, z);
    const temperature = Number.isFinite(context.temperature) ? context.temperature : sampleTemperature(x, z);
    const fertility = Number.isFinite(context.fertility) ? context.fertility : sampleFertility(x, z);
    const feature = featureCellAt(x, z);
    return { ...biomeProfile(height, moisture, temperature, fertility, feature), height, moisture, temperature, fertility, feature };
  }

  function sampleFlora(x, z, context = {}) {
    if (!contains(x, z)) {
      return {
        grassDensity: 0,
        flowerDensity: 0,
        bare: true,
        patchCoverage: 0,
        clearing: 1,
        primaryGrassType: 1,
        secondaryGrassType: 1,
        secondaryMix: 0,
        flowerType: 0,
        secondaryFlowerType: 0,
        biomeId: -1,
        biomeName: "outside-world",
        moisture: 0,
        fertility: 0,
        height: Number.isFinite(context.height) ? context.height : sampleHeight(x, z)
      };
    }
    const biome = sampleBiome(x, z, context);
    const warpAngle = valueNoise(x * 0.00072, z * 0.00072, seed + 281) * TAU;
    const warpStrength = (valueNoise(x * 0.0011, z * 0.0011, seed + 307) - 0.5) * 210;
    const wx = x + Math.cos(warpAngle) * warpStrength;
    const wz = z + Math.sin(warpAngle) * warpStrength;
    const macroNoise = fbm(wx * 0.00108, wz * 0.00108, seed + 331, 4);
    const patchNoise = fbm(wx * 0.0064, wz * 0.0064, seed + 359, 3);
    const edgeNoise = valueNoise(wx * 0.021, wz * 0.021, seed + 383);
    const meadowField = macroNoise * 0.5 + patchNoise * 0.35 + edgeNoise * 0.15;
    const coverage = smoothstep(0.4, 0.69, meadowField);
    const clearingNoise = fbm((wx + 1170) * 0.0031, (wz - 640) * 0.0031, seed + 419, 3);
    const clearLow = 0.68 - biome.feature.bareBias * 0.12;
    const clearHigh = 0.88 - biome.feature.bareBias * 0.08;
    const clearMask = smoothstep(clearLow, clearHigh, clearingNoise);
    const slopePenalty = clamp01((Number(context.slope) || 0) / 0.42);
    let grassDensity = biome.baseDensity * coverage * (1 - clearMask) * (1 - slopePenalty * 0.72);
    if (biome.moisture > 0.9 || biome.height > 128) grassDensity = 0;
    if (grassDensity < 0.035) grassDensity = 0;

    const typeBlendNoise = valueNoise(wx * 0.00155, wz * 0.00155, seed + 443);
    const secondaryMix = 0.08 + smoothstep(0.42, 0.72, typeBlendNoise) * 0.24;
    const flowerPatch = fbm((wx - 270) * 0.0115, (wz + 490) * 0.0115, seed + 467, 3);
    let flowerDensity = smoothstep(0.58, 0.82, flowerPatch)
      * grassDensity
      * biome.feature.flowerBias
      * (0.9 + biome.fertility * 0.55)
      * 1.15;
    if (grassDensity < 0.16 || clearMask > 0.45) flowerDensity = 0;

    return {
      grassDensity: clamp01(grassDensity),
      flowerDensity: clamp01(flowerDensity),
      bare: grassDensity === 0,
      patchCoverage: coverage,
      clearing: clearMask,
      primaryGrassType: biome.primaryGrassType,
      secondaryGrassType: biome.secondaryGrassType,
      secondaryMix,
      flowerType: biome.feature.flowerType,
      secondaryFlowerType: biome.feature.secondaryFlowerType,
      biomeId: biome.id,
      biomeName: biome.name,
      moisture: biome.moisture,
      fertility: biome.fertility,
      height: biome.height
    };
  }

  const grassColors = [
    [50, 126, 68],
    [88, 158, 74],
    [139, 191, 76],
    [151, 151, 77],
    [202, 168, 66]
  ];

  function sampleMapColor(x, z) {
    const height = sampleHeight(x, z);
    const moisture = sampleMoisture(x, z);
    const flora = sampleFlora(x, z, { height, moisture });
    if (moisture > 0.87 && height < 26) return [87, 159, 177];
    if (flora.bare) return height > 82 ? [135, 134, 107] : [184, 157, 91];
    let color = colorMix([73, 127, 69], grassColors[flora.primaryGrassType], 0.68);
    color = colorMix(color, grassColors[flora.secondaryGrassType], flora.secondaryMix * 0.45);
    if (height > 82) color = colorMix(color, [126, 135, 96], 0.28);
    if (moisture > 0.7) color = colorMix(color, [54, 111, 82], 0.3);
    return color;
  }

  return Object.freeze({
    id: WORLD_GENERATION_KIT_ID,
    seed,
    center: Object.freeze(center),
    radius,
    gridSize,
    gridStep: step,
    featureCellSize: WORLD_FEATURE_CELL_SIZE,
    sampleHeight,
    sampleMoisture,
    sampleTemperature,
    sampleFertility,
    sampleBiome,
    sampleFlora,
    sampleMapColor,
    sampleFeatureCell: featureCellAt,
    contains,
    getDescriptor: () => Object.freeze({
      seed,
      center: Object.freeze({ ...center }),
      radius,
      gridSize,
      gridStep: step,
      featureCellSize: WORLD_FEATURE_CELL_SIZE
    })
  });
}

if (typeof window !== "undefined") {
  window.OpenAboveWorldGenerationKit = {
    id: WORLD_GENERATION_KIT_ID,
    WORLD_GRID_SIZE,
    WORLD_FEATURE_CELL_SIZE,
    createWorldGenerationKit
  };
}
