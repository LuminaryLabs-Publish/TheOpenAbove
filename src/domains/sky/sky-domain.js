import { createAirstreamDomain } from "../../runtime/airstream-domain/index.js";
import { createDefaultAirstreamRoutes } from "../../runtime/airstream-domain/airstream-route-kit.js";
import { createCloudBankField } from "./cloud-form/cloud-bank-field-kit.js";

export const SKY_DOMAIN_ID = "open-above-sky-domain";

export function createSkyDomain({
  routes = createDefaultAirstreamRoutes(),
  weatherLayers = [],
  worldSurface = null,
  cloudSeed = "open-above-clouds"
} = {}) {
  let engine = null;
  let airstream = null;
  const cloudField = createCloudBankField({ layers: weatherLayers, worldSurface, seed: cloudSeed });

  function bindRuntimeEngine(runtimeEngine) {
    engine = runtimeEngine ?? engine;
    return api;
  }

  function mount({ scene, runtimeEngine } = {}) {
    bindRuntimeEngine(runtimeEngine);
    if (airstream) return api;
    airstream = createAirstreamDomain({ scene, routes, debug: false });
    return api;
  }

  function sample(position, elapsed = 0) {
    return airstream?.sample(position, elapsed) ?? null;
  }

  function queryFlow(position, elapsed = 0) {
    return airstream?.queryFlow(position, elapsed) ?? null;
  }

  function update({ position, elapsed = 0, sample: suppliedSample = null, dt = 0 } = {}) {
    const currentSample = suppliedSample ?? sample(position, elapsed);
    const result = airstream?.update({ position, elapsed, sample: currentSample }) ?? null;
    return result;
  }

  function weatherSnapshot() {
    return engine?.n?.layeredWeather?.getSnapshot?.()
      ?? engine?.n?.weather?.getSnapshot?.()
      ?? null;
  }

  const api = {
    id: SKY_DOMAIN_ID,
    routes,
    cloudField,
    bindRuntimeEngine,
    mount,
    sample,
    queryFlow,
    update,
    weatherSnapshot,
    cloudFormSnapshot: () => cloudField.snapshot(),
    airstreamSnapshot: () => airstream?.snapshot?.() ?? null,
    get airstream() { return airstream; },
    get weather() { return engine?.n?.weather ?? null; },
    get layeredWeather() { return engine?.n?.layeredWeather ?? null; },
    dispose() {
      airstream?.dispose?.();
      airstream = null;
    }
  };
  return Object.freeze(api);
}
