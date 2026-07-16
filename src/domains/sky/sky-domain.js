import { createAirstreamDomain } from "../../runtime/airstream-domain/index.js";
import { createDefaultAirstreamRoutes } from "../../runtime/airstream-domain/airstream-route-kit.js";

export const SKY_DOMAIN_ID = "open-above-sky-domain";

export function createSkyDomain({ routes = createDefaultAirstreamRoutes() } = {}) {
  let engine = null;
  let airstream = null;

  function bindRuntimeEngine(runtimeEngine) {
    engine = runtimeEngine ?? engine;
    return api;
  }

  function mount({ scene, runtimeEngine } = {}) {
    bindRuntimeEngine(runtimeEngine);
    airstream = createAirstreamDomain({ scene, routes, debug: false });
    return api;
  }

  function sample(position, elapsed = 0) {
    return airstream?.sample(position, elapsed) ?? null;
  }

  function update({ position, elapsed = 0, sample: suppliedSample = null } = {}) {
    return airstream?.update({ position, elapsed, sample: suppliedSample }) ?? null;
  }

  function weatherSnapshot() {
    return engine?.n?.layeredWeather?.getSnapshot?.()
      ?? engine?.n?.weather?.getSnapshot?.()
      ?? null;
  }

  const api = {
    id: SKY_DOMAIN_ID,
    routes,
    bindRuntimeEngine,
    mount,
    sample,
    update,
    weatherSnapshot,
    airstreamSnapshot: () => airstream?.snapshot?.() ?? null,
    get airstream() { return airstream; },
    get weather() { return engine?.n?.weather ?? null; },
    get layeredWeather() { return engine?.n?.layeredWeather ?? null; },
    dispose() { airstream?.dispose?.(); }
  };
  return Object.freeze(api);
}
