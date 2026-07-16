export const LAND_DOMAIN_ID = "open-above-land-domain";

export function createLandDomain({
  worldConfig,
  worldFeatures,
  worldFoundation,
  routes = [],
  towns = []
} = {}) {
  let visual = null;
  const worldAnchors = Object.freeze({ routes, towns });

  function bindVisual(nextVisual) {
    visual = nextVisual;
    return api;
  }

  function snapshot() {
    const terrain = visual?.landscape?.terrain;
    if (!terrain) return null;
    return {
      nearChunks: terrain.streamer?.chunks?.size ?? 0,
      horizonChunks: terrain.horizon?.chunks?.size ?? 0,
      horizonDistance: terrain.horizon?.maxDistance ?? 0,
      worldSurface: terrain.worldSurface?.getDescriptor?.() ?? null,
      generation: visual.world?.getDescriptor?.() ?? null,
      generationState: visual.world?.getGenerationState?.() ?? null
    };
  }

  const api = {
    id: LAND_DOMAIN_ID,
    worldConfig,
    worldFeatures,
    worldFoundation,
    worldAnchors,
    bindVisual,
    snapshot,
    get world() { return visual?.world ?? null; },
    get landscape() { return visual?.landscape ?? null; },
    sampleHeight(x, z) { return visual?.landscape?.terrain?.terrainHeight?.(x, z) ?? 0; }
  };
  return Object.freeze(api);
}
