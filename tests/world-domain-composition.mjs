import assert from "node:assert/strict";
import * as NexusEngine from "../.nexus-engine/src/index.js";
import { WORLD } from "../src/data/campaign.config.js";
import { createBalloonTelemetryEngine } from "../src/runtime/balloon-telemetry-kit.js";

const engine = createBalloonTelemetryEngine(
  NexusEngine,
  () => ({ altitude: 0, windSpeed: 0, burner: false, visual: {} }),
  { worldFeatures: WORLD.features?.landforms ?? [] }
);

const worldFeatures = engine.n?.worldFeatures;
const worldFoundation = engine.n?.worldFoundation;
assert.equal(typeof worldFeatures?.registerFeature, "function");
assert.equal(typeof worldFeatures?.compileCell, "function");
assert.equal(typeof worldFoundation?.sampleElevation, "function");
assert.equal(worldFeatures.getFeature("northern-wall")?.type, "mountain");

const cellId = "open-above-browser-boot";
const result = worldFeatures.compileCell({
  id: cellId,
  bounds: { minX: -10000, minZ: -10000, maxX: 10000, maxZ: 10000 }
}, { foundation: worldFoundation, baseFoundation: { elevation: 0 } });

assert.equal(result.contributions.length, 1);
const elevation = worldFoundation.sampleElevation(
  cellId,
  { x: 0, z: 5500 },
  worldFeatures.getSamplers()
);
assert.ok(elevation >= 499.9 && elevation <= 500.1, `expected 500m mountain, received ${elevation}`);
assert.doesNotThrow(() => engine.tick(0));

console.log("NexusEngine main browser-boot world contract passed");
