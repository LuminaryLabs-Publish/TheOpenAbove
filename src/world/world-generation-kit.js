import { AUTHORED_LAKES } from "./world-authored-features.js";
import {
  DEFAULT_WORK_BUDGET,
  PHASE_RANGES,
  TAU,
  WORLD_FEATURE_CELL_SIZE,
  WORLD_GENERATION_KIT_ID,
  WORLD_GENERATION_PHASES,
  WORLD_GRID_SIZE,
  biomeProfile,
  buildFeatureCell,
  clamp01,
  clone,
  colorMix,
  createWorkset,
  distanceToSegmentSquared,
  fbm,
  lerp,
  normalizeAnchors,
  normalizeGrassSeed,
  nowMs,
  radialProtection,
  smoothstep,
  valueNoise
} from "./world-generation-support.js";
import {
  processBiome,
  processClimate,
  processErosion,
  processFlow,
  processHeight
} from "./world-generation-phases.js";

export {
  WORLD_FEATURE_CELL_SIZE,
  WORLD_GENERATION_KIT_ID,
  WORLD_GENERATION_PHASES,
  WORLD_GRID_SIZE
} from "./world-generation-support.js";

export function createWorldGenerationKit({
  worldConfig = {},
  legacyTerrainHeight = () => 0,
  legacyMoistureAt = null,
  anchors = {},
  staged = Boolean(worldConfig.generation?.staged),
  workBudget = Number(worldConfig.generation?.workBudget) || DEFAULT_WORK_BUDGET,
  autoStart = true
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
  const normalizedAnchors = normalizeAnchors(anchors);
  const featureCells = new Map();
  const listeners = new Set();
  let pending = null;
  let active = null;
  let phaseStartedAt = null;
  let disposed = false;
  let generation = createGenerationState("idle", "idle");

  const gridIndex = (x, z) => z * gridSize + x;
  const worldXAt = (x) => center.x - radius + x * step;
  const worldZAt = (z) => center.z - radius + z * step;

  function createGenerationState(status, phase) {
    return {
      status,
      phase,
      ready: status === "ready",
      usingFallback: active == null,
      progress: status === "ready" ? 1 : 0,
      phaseProgress: status === "ready" ? 1 : 0,
      revision: active?.revision ?? 0,
      workBudget: Math.max(1, Math.floor(workBudget)),
      workCompleted: 0,
      startedAt: null,
      completedAt: null,
      elapsedMs: 0,
      phaseTimings: {},
      phaseHistory: [],
      failure: null,
      disposed: false
    };
  }

  function snapshotGeneration() {
    const elapsedMs = generation.startedAt == null
      ? 0
      : (generation.completedAt ?? nowMs()) - generation.startedAt;
    return Object.freeze({
      ...clone(generation),
      elapsedMs: Math.max(0, elapsedMs),
      usingFallback: active == null,
      revision: active?.revision ?? generation.revision ?? 0,
      ready: generation.status === "ready",
      disposed
    });
  }

  function notify() {
    const snapshot = snapshotGeneration();
    for (const listener of listeners) listener(snapshot);
  }

  function setPhase(nextPhase) {
    const timestamp = nowMs();
    if (generation.phase && phaseStartedAt != null && generation.phase !== "idle") {
      generation.phaseTimings[generation.phase] = (generation.phaseTimings[generation.phase] ?? 0) + Math.max(0, timestamp - phaseStartedAt);
    }
    generation.phase = nextPhase;
    generation.phaseProgress = nextPhase === "ready" ? 1 : 0;
    if (!generation.phaseHistory.includes(nextPhase)) generation.phaseHistory.push(nextPhase);
    phaseStartedAt = timestamp;
    notify();
  }

  function updateProgress(phaseProgress) {
    const [start, end] = PHASE_RANGES[generation.phase] ?? [0, 1];
    generation.phaseProgress = clamp01(phaseProgress);
    generation.progress = clamp01(lerp(start, end, generation.phaseProgress));
  }

  function protectionAt(x, z) {
    let protection = radialProtection(Math.hypot(x - center.x, z - center.z), 280, 180);
    for (const town of normalizedAnchors.towns) {
      protection = Math.max(protection, radialProtection(Math.hypot(x - town.x, z - town.z), 340, 190));
    }
    const routeCoreSq = 72 * 72;
    const routeOuterSq = 190 * 190;
    for (const segment of normalizedAnchors.segments) {
      const distanceSq = distanceToSegmentSquared(x, z, segment.ax, segment.az, segment.bx, segment.bz);
      if (distanceSq <= routeCoreSq) protection = 1;
      else if (distanceSq < routeOuterSq) protection = Math.max(protection, 1 - smoothstep(routeCoreSq, routeOuterSq, distanceSq));
    }
    for (const lake of AUTHORED_LAKES) {
      protection = Math.max(
        protection,
        radialProtection(Math.hypot(x - lake.x, z - lake.z), lake.protectionRadius, lake.protectionTransition)
      );
    }
    if (Math.abs(x) < 1120) {
      const road = Math.abs(Math.sin(x * 0.0037) * 175 + z * 0.115);
      protection = Math.max(protection, 1 - smoothstep(18, 62, road));
    }
    return clamp01(protection);
  }

  function featureCellAt(x, z) {
    const cellX = Math.floor((x - center.x) / WORLD_FEATURE_CELL_SIZE);
    const cellZ = Math.floor((z - center.z) / WORLD_FEATURE_CELL_SIZE);
    const key = `${cellX}:${cellZ}`;
    if (!featureCells.has(key)) featureCells.set(key, buildFeatureCell(seed, cellX, cellZ));
    return featureCells.get(key);
  }

  const phaseContext = {
    get pending() { return pending; },
    total,
    gridSize,
    gridIndex,
    worldXAt,
    worldZAt,
    seed,
    protectionAt,
    updateProgress,
    setPhase,
    legacyTerrainHeight,
    featureCellAt,
    completeAtomicSwap
  };

  function completeAtomicSwap() {
    const timestamp = nowMs();
    if (phaseStartedAt != null) {
      generation.phaseTimings.biome = (generation.phaseTimings.biome ?? 0) + Math.max(0, timestamp - phaseStartedAt);
    }
    const nextRevision = (active?.revision ?? generation.revision ?? 0) + 1;
    active = Object.freeze({
      revision: nextRevision,
      heightGrid: pending.heightGrid,
      moistureGrid: pending.moistureGrid,
      temperatureGrid: pending.temperatureGrid,
      fertilityGrid: pending.fertilityGrid,
      flowGrid: pending.flowGrid,
      biomeGrid: pending.biomeGrid,
      biomeCounts: Object.freeze([...pending.biomeCounts])
    });
    pending = null;
    generation.status = "ready";
    generation.phase = "ready";
    generation.progress = 1;
    generation.phaseProgress = 1;
    generation.revision = nextRevision;
    generation.completedAt = timestamp;
    generation.failure = null;
    if (!generation.phaseHistory.includes("ready")) generation.phaseHistory.push("ready");
    phaseStartedAt = timestamp;
    notify();
  }

  function fail(error) {
    generation.status = "failed";
    generation.failure = {
      code: "world-generation-failed",
      phase: generation.phase,
      message: String(error?.message ?? error),
      stack: String(error?.stack ?? "")
    };
    generation.completedAt = nowMs();
    notify();
  }

  function startGeneration() {
    if (disposed) throw new Error("World generation kit is disposed.");
    if (generation.status === "working") return snapshotGeneration();
    pending = createWorkset(total);
    generation = createGenerationState("working", "height");
    generation.startedAt = nowMs();
    generation.phaseHistory = ["height"];
    phaseStartedAt = generation.startedAt;
    notify();
    return snapshotGeneration();
  }

  function advanceGeneration(units = generation.workBudget) {
    if (disposed || generation.status === "ready" || generation.status === "failed") return snapshotGeneration();
    if (generation.status === "idle") startGeneration();
    let remaining = Math.max(1, Math.floor(Number(units) || generation.workBudget));
    try {
      while (remaining > 0 && generation.status === "working") {
        if (generation.phase === "height") processHeight(phaseContext);
        else if (generation.phase === "erosion") processErosion(phaseContext);
        else if (generation.phase === "flow") processFlow(phaseContext);
        else if (generation.phase === "climate") processClimate(phaseContext);
        else if (generation.phase === "biome") processBiome(phaseContext);
        generation.workCompleted += 1;
        remaining -= 1;
      }
    } catch (error) {
      fail(error);
    }
    return snapshotGeneration();
  }

  function completeGenerationSync() {
    if (generation.status === "idle") startGeneration();
    while (generation.status === "working") advanceGeneration(250000);
    if (generation.status === "failed") throw new Error(generation.failure?.message ?? "World generation failed.");
    return snapshotGeneration();
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

  const contains = (x, z) => Math.hypot(x - center.x, z - center.z) <= radius;

  function fallbackHeight(x, z) {
    return Number(legacyTerrainHeight(x, z)) || 0;
  }

  function fallbackMoisture(x, z) {
    if (typeof legacyMoistureAt === "function") return clamp01(legacyMoistureAt(x, z));
    return clamp01(fbm(x * 0.00055, z * 0.00055, seed + 173, 4));
  }

  function fallbackTemperature(x, z, height = fallbackHeight(x, z)) {
    return clamp01(0.66 - height / 330 + (fbm(x * 0.00032, z * 0.00032, seed + 139, 3) - 0.5) * 0.34);
  }

  function fallbackFertility(x, z, height = fallbackHeight(x, z), moisture = fallbackMoisture(x, z)) {
    const lowland = 1 - smoothstep(-38, 72, height);
    return clamp01(moisture * 0.62 + lowland * 0.26 + 0.12);
  }

  function sampleHeight(x, z) {
    if (!active) return fallbackHeight(x, z);
    const macro = sampleGrid(active.heightGrid, x, z);
    const protection = protectionAt(x, z);
    if (protection >= 0.985) return fallbackHeight(x, z);
    const fine = (fbm(x * 0.006, z * 0.006, seed + 241, 3) - 0.5) * 7.2;
    return macro + fine * (1 - protection);
  }

  const sampleMoisture = (x, z) => active ? clamp01(sampleGrid(active.moistureGrid, x, z)) : fallbackMoisture(x, z);
  const sampleTemperature = (x, z) => active ? clamp01(sampleGrid(active.temperatureGrid, x, z)) : fallbackTemperature(x, z);
  const sampleFertility = (x, z) => active ? clamp01(sampleGrid(active.fertilityGrid, x, z)) : fallbackFertility(x, z);

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
        grassDensity: 0, flowerDensity: 0, bare: true, patchCoverage: 0, clearing: 1,
        primaryGrassType: 1, secondaryGrassType: 1, secondaryMix: 0,
        flowerType: 0, secondaryFlowerType: 0, biomeId: -1, biomeName: "outside-world",
        moisture: 0, fertility: 0,
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
      * grassDensity * biome.feature.flowerBias * (0.9 + biome.fertility * 0.55) * 1.15;
    if (grassDensity < 0.16 || clearMask > 0.45) flowerDensity = 0;
    return {
      grassDensity: clamp01(grassDensity), flowerDensity: clamp01(flowerDensity), bare: grassDensity === 0,
      patchCoverage: coverage, clearing: clearMask,
      primaryGrassType: biome.primaryGrassType, secondaryGrassType: biome.secondaryGrassType, secondaryMix,
      flowerType: biome.feature.flowerType, secondaryFlowerType: biome.feature.secondaryFlowerType,
      biomeId: biome.id, biomeName: biome.name, moisture: biome.moisture,
      fertility: biome.fertility, height: biome.height
    };
  }

  const grassColors = [
    [50, 126, 68], [88, 158, 74], [139, 191, 76], [151, 151, 77], [202, 168, 66]
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

  function reset(options = {}) {
    if (disposed) throw new Error("World generation kit is disposed.");
    pending = null;
    generation = createGenerationState("idle", "idle");
    generation.revision = active?.revision ?? 0;
    phaseStartedAt = null;
    if (options.clearActive === true) active = null;
    featureCells.clear();
    if (options.start !== false) startGeneration();
    if (options.synchronous === true || (!staged && options.synchronous !== false)) completeGenerationSync();
    return snapshotGeneration();
  }

  function dispose() {
    pending = null;
    active = null;
    featureCells.clear();
    listeners.clear();
    disposed = true;
    generation.status = "disposed";
    generation.disposed = true;
    generation.completedAt = nowMs();
    return snapshotGeneration();
  }

  const api = {
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
    startGeneration,
    advanceGeneration,
    completeGenerationSync,
    getGenerationState: snapshotGeneration,
    getGenerationDiagnostics: snapshotGeneration,
    subscribeGeneration(listener) {
      if (typeof listener !== "function") throw new TypeError("World generation listener must be a function.");
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    reset,
    dispose,
    getDescriptor: () => Object.freeze({
      seed,
      center: Object.freeze({ ...center }),
      radius,
      gridSize,
      gridStep: step,
      featureCellSize: WORLD_FEATURE_CELL_SIZE
    })
  };

  if (autoStart) startGeneration();
  if (!staged) completeGenerationSync();
  return Object.freeze(api);
}

if (typeof window !== "undefined") {
  window.OpenAboveWorldGenerationKit = {
    id: WORLD_GENERATION_KIT_ID,
    WORLD_GRID_SIZE,
    WORLD_FEATURE_CELL_SIZE,
    WORLD_GENERATION_PHASES,
    createWorldGenerationKit
  };
}
