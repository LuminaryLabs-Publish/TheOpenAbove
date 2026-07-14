import assert from "node:assert/strict";
import { createBalloonTelemetryEngine } from "../src/runtime/balloon-telemetry-kit.js";

function createKit(id, provides = [], requires = []) {
  return { id, provides, requires };
}

const calls = [];
const registered = [];
const fakeNexusEngine = {
  defineResource(name) { return { kind: "resource", name }; },
  defineEvent(name) { return { kind: "event", name }; },
  defineRuntimeKit(config) { return { ...config, requires: config.requires ?? [], provides: config.provides ?? [] }; },
  createCoreWorldDomain(options = {}) {
    calls.push({ name: "core-world", options });
    return createKit("core-world", ["n:world"]);
  },
  createWorldFoundationDomain() {
    calls.push({ name: "world-foundation" });
    return createKit("world-foundation", ["n:world:foundation"], ["n:world"]);
  },
  createWorldFeatureDomain() {
    calls.push({ name: "world-features" });
    return createKit("world-features", ["n:world:features"], ["n:world"]);
  },
  createLandformFeatureDomain() {
    calls.push({ name: "landform-features" });
    return createKit("landform-features", ["n:world:features:landform"], ["n:world:features"]);
  },
  createRealtimeGame({ kits }) {
    calls.push({ name: "realtime-game", kits: kits.map((kit) => kit.id) });
    return {
      n: {
        worldFeatures: {
          registerFeature(feature) {
            registered.push(feature);
            return feature;
          }
        }
      }
    };
  }
};

const mountain = { id: "test-mountain", type: "mountain" };
createBalloonTelemetryEngine(fakeNexusEngine, () => ({}), { worldFeatures: [mountain] });

assert.deepEqual(calls[0], { name: "core-world", options: { childDomains: false } });
assert.deepEqual(calls.at(-1).kits, [
  "core-world",
  "world-foundation",
  "world-features",
  "landform-features",
  "open-above-balloon-telemetry-kit"
]);
assert.deepEqual(registered, [mountain]);

const unavailableNexusEngine = {
  ...fakeNexusEngine,
  createRealtimeGame() { return { n: {} }; }
};
assert.throws(
  () => createBalloonTelemetryEngine(unavailableNexusEngine, () => ({}), { worldFeatures: [mountain] }),
  /World Features API is unavailable/
);

console.log("world domain composition smoke passed");
