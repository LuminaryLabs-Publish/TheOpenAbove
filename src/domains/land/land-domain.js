export const LAND_DOMAIN_ID = "open-above-land-domain";

export function createLandDomain({
  worldConfig,
  worldFeatures,
  worldFoundation,
  routes = [],
  towns = []
} = {}) {
  let preparedWorld = null;
  let worldRuntime = null;
  const worldAnchors = Object.freeze({ routes, towns });

  function bindWorld({ world, runtime }) {
    if (!world?.sampleHeight || !runtime?.snapshot) throw new TypeError("Land requires the prepared Nexus world runtime.");
    preparedWorld = world;
    worldRuntime = runtime;
    return api;
  }

  function snapshot() {
    const snapshot = worldRuntime?.snapshot?.();
    if (!snapshot) return null;
    return {
      activeCells: snapshot.activeCells.length,
      focus: snapshot.focus,
      revision: snapshot.sequence,
      generation: preparedWorld?.getDescriptor?.() ?? null,
      generationState: preparedWorld?.getGenerationState?.() ?? null
    };
  }

  const api = {
    id: LAND_DOMAIN_ID,
    worldConfig,
    worldFeatures,
    worldFoundation,
    worldAnchors,
    bindWorld,
    snapshot,
    get world() { return preparedWorld; },
    get worldRuntime() { return worldRuntime; },
    sampleHeight(x, z) { return preparedWorld?.sampleHeight?.(x, z) ?? 0; }
  };
  return Object.freeze(api);
}
