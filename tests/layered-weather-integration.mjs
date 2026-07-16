import assert from "node:assert/strict";
import * as NexusEngine from "../.nexus-engine/src/index.js";
import { WORLD } from "../src/data/campaign.config.js";
import { createBalloonTelemetryEngine } from "../src/runtime/balloon-telemetry-kit.js";
import { createCloudWeatherMap } from "../src/visual/atmosphere/cloud-weather-map-kit.js";

const engine = createBalloonTelemetryEngine(
  NexusEngine,
  () => ({ altitude: 0, windSpeed: 0, burner: false, visual: {} }),
  {
    worldFeatures: [...(WORLD.features?.landforms ?? []), ...(WORLD.features?.atmosphere ?? [])],
    weather: WORLD.weather
  }
);

const weather = engine.n.weather;
const layered = engine.n.layeredWeather;
const initial = layered.getLayeredSnapshot();
assert.equal(initial.layers.length, 5);
assert.deepEqual(initial.layers.map((layer) => layer.kind), ["ground-fog", "low-cloud", "mid-cloud", "high-cloud", "cirrus"]);
for (const layer of initial.layers) {
  assert.ok(layer.coverage >= layer.minimumCoverage, `${layer.id} coverage floor`);
  assert.ok(layer.density >= layer.minimumDensity, `${layer.id} density floor`);
}
assert.equal(layered.sampleAltitude(80)[0].id, "ground-fog");
assert.equal(layered.sampleAltitude(3200)[0].id, "cirrus");

const adapter = createCloudWeatherMap(WORLD.seed, { weather, layeredWeather: layered });
adapter.update(1 / 60, 1 / 60, 80);
assert.equal(adapter.state.layers.length, 5);
assert.ok(adapter.state.groundFog);
assert.ok(adapter.state.coverage >= 0.01);
assert.ok(adapter.state.density >= 0.005);
assert.equal(adapter.state.snapshot.composition.dominantLayerId, "ground-fog");

const before = adapter.state.layers.map((layer) => [layer.id, layer.offset.x, layer.offset.z]);
adapter.update(1, 1.016, 900);
const after = adapter.state.layers.map((layer) => [layer.id, layer.offset.x, layer.offset.z]);
assert.notDeepEqual(after, before, "layer offsets should evolve with weather time");
assert.equal(adapter.state.snapshot.layers.length, 5);

console.log("Open Above layered weather integration passed");
