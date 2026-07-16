import assert from "node:assert/strict";
import * as NexusEngine from "../.nexus-engine/src/index.js";
import { WORLD } from "../src/data/campaign.config.js";
import { createBalloonTelemetryEngine } from "../src/runtime/balloon-telemetry-kit.js";

const worldFeatures = [
  ...(WORLD.features?.landforms ?? []),
  ...(WORLD.features?.atmosphere ?? [])
];
const engine = createBalloonTelemetryEngine(
  NexusEngine,
  () => ({ altitude: 0, windSpeed: 0, burner: false, visual: {} }),
  { worldFeatures, weather: WORLD.weather }
);

const features = engine.n?.worldFeatures;
const worldFoundation = engine.n?.worldFoundation;
assert.equal(typeof features?.registerFeature, "function");
assert.equal(typeof features?.compileCell, "function");
assert.equal(typeof worldFoundation?.sampleElevation, "function");
assert.equal(typeof engine.n?.weather?.advance, "function");
assert.equal(typeof engine.n?.layeredWeather?.replaceLayers, "function");
assert.equal(features.getFeature("northern-wall")?.type, "mountain");
assert.equal(features.getFeature("meadow-ground-fog")?.type, "fog-bank");
assert.equal(engine.n.layeredWeather.listLayers().length, 5);

const cellId = "open-above-browser-boot";
const result = features.compileCell({
  id: cellId,
  bounds: { minX: -10000, minZ: -10000, maxX: 10000, maxZ: 10000 }
}, { foundation: worldFoundation, baseFoundation: { elevation: 0 } });

assert.equal(result.contributions.length, worldFeatures.length);
assert.equal(result.contributions.filter((entry) => entry.featureId === "northern-wall").length, 1);
const elevation = worldFoundation.sampleElevation(
  cellId,
  { x: 0, z: 5500 },
  features.getSamplers()
);
assert.ok(elevation >= 499.9 && elevation <= 500.1, `expected 500m mountain, received ${elevation}`);
assert.doesNotThrow(() => engine.tick(0));

console.log("NexusEngine main world, atmosphere, and layered-weather contract passed");
