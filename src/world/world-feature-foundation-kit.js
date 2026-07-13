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
  worldFoundation = null,
  cellId = "open-above-global-foundation"
} = {}) {
  if (!baseWorld?.sampleHeight) throw new TypeError("World Feature Foundation requires a generated world.");
  let compiled = false;

  function compileFeatures() {
    if (compiled || !worldFeatures?.compileCell || !worldFoundation?.sampleElevation) return false;
    worldFeatures.compileCell({ id: cellId, bounds: worldBounds(worldConfig) }, {
      foundation: worldFoundation,
      baseFoundation: { elevation: 0 }
    });
    compiled = true;
    return true;
  }

  function featureElevation(x, z) {
    if (baseWorld.getGenerationState?.().status !== "ready") return 0;
    compileFeatures();
    return Number(worldFoundation?.sampleElevation?.(
      cellId,
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
      foundationCompiled: compiled,
      worldFeatureCount: worldFeatures?.listFeatures?.().length ?? 0
    });
  }

  compileFeatures();

  return Object.freeze({
    ...baseWorld,
    sampleHeight,
    sampleBiome,
    sampleFlora,
    sampleMapColor,
    getGenerationState,
    getGenerationDiagnostics: getGenerationState,
    subscribeGeneration(listener) {
      return baseWorld.subscribeGeneration?.(() => listener(getGenerationState())) ?? (() => {});
    },
    getDescriptor() {
      return Object.freeze({
        ...baseWorld.getDescriptor(),
        foundationCellId: cellId,
        worldFeatureDomain: "n:world:features",
        worldFoundationDomain: "n:world:foundation",
        featureIds: Object.freeze((worldFeatures?.listFeatures?.() ?? []).map((feature) => feature.id))
      });
    }
  });
}

export default createWorldFeatureFoundation;
