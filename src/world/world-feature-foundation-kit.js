const clamp01 = (value) => Math.max(0, Math.min(1, Number(value) || 0));

function worldBounds(worldConfig = {}) {
  const surface = worldConfig.surface ?? {};
  const center = surface.center ?? { x: 0, z: 0 };
  const radius = Math.max(1, Number(surface.radius) || 10000);
  return Object.freeze({
    minX: Number(center.x || 0) - radius,
    minZ: Number(center.z || 0) - radius,
    maxX: Number(center.x || 0) + radius,
    maxZ: Number(center.z || 0) + radius
  });
}

function mixColor(first, second, amount) {
  const t = clamp01(amount);
  return first.map((value, index) => Math.round(value + (second[index] - value) * t));
}

export function createWorldFeatureFoundation(baseWorld, {
  worldConfig = {},
  worldFeatures = null,
  worldFoundation = null
} = {}) {
  if (!baseWorld?.sampleHeight) throw new TypeError("World Feature Foundation requires a generated world.");
  const compiledCells = new Map();

  function prepareCell(cell) {
    if (!cell?.id || !worldFeatures?.compileCell || !worldFoundation?.sampleElevation) return false;
    worldFeatures.compileCell(cell, {
      foundation: worldFoundation,
      baseFoundation: { elevation: 0 }
    });
    compiledCells.set(cell.id, Object.freeze({ id: cell.id, bounds: Object.freeze({ ...cell.bounds }) }));
    return true;
  }

  function releaseCell(cellId) {
    compiledCells.delete(String(cellId));
    return worldFeatures?.releaseCompiledCell?.(cellId, { foundation: worldFoundation }) ?? false;
  }

  function cellAt(x, z) {
    for (const cell of compiledCells.values()) {
      if (x >= cell.bounds.minX && x <= cell.bounds.maxX && z >= cell.bounds.minZ && z <= cell.bounds.maxZ) return cell;
    }
    return null;
  }

  function featureElevation(x, z) {
    if (baseWorld.getGenerationState?.().status !== "ready") return 0;
    const cell = cellAt(x, z);
    if (!cell) return 0;
    return Number(worldFoundation?.sampleElevation?.(
      cell.id,
      { x, z },
      worldFeatures?.getSamplers?.() ?? {}
    )) || 0;
  }

  function sampleHeight(x, z) {
    return baseWorld.sampleHeight(x, z) + featureElevation(x, z);
  }

  function sampleBiome(x, z, context = {}) {
    const height = Number.isFinite(context.height) ? context.height : sampleHeight(x, z);
    return baseWorld.sampleBiome(x, z, { ...context, height });
  }

  function sampleFlora(x, z, context = {}) {
    const height = Number.isFinite(context.height) ? context.height : sampleHeight(x, z);
    return baseWorld.sampleFlora(x, z, { ...context, height });
  }

  function sampleMapColor(x, z) {
    const base = baseWorld.sampleMapColor(x, z);
    const elevation = featureElevation(x, z);
    if (elevation <= 0) return base;
    const rock = elevation > 360 ? [119, 124, 120] : [133, 139, 121];
    return mixColor(base, rock, Math.min(0.78, elevation / 560));
  }

  function getGenerationState() {
    const state = baseWorld.getGenerationState?.() ?? { status: "ready", revision: 0 };
    return Object.freeze({
      ...state,
      foundationCompiled: compiledCells.size > 0,
      foundationCellCount: compiledCells.size,
      worldFeatureCount: worldFeatures?.listFeatures?.().length ?? 0
    });
  }

  return Object.freeze({
    ...baseWorld,
    sampleHeight,
    sampleBiome,
    sampleFlora,
    sampleMapColor,
    getGenerationState,
    getGenerationDiagnostics: getGenerationState,
    prepareCell,
    releaseCell,
    listFoundationCells: () => Object.freeze([...compiledCells.values()]),
    subscribeGeneration(listener) {
      return baseWorld.subscribeGeneration?.(() => listener(getGenerationState())) ?? (() => {});
    },
    getDescriptor() {
      return Object.freeze({
        ...baseWorld.getDescriptor(),
        foundationCellIds: Object.freeze([...compiledCells.keys()].sort()),
        worldFeatureDomain: "n:world:feature",
        worldFoundationDomain: "n:world:foundation",
        featureIds: Object.freeze((worldFeatures?.listFeatures?.() ?? []).map((feature) => feature.id))
      });
    }
  });
}

export default createWorldFeatureFoundation;
