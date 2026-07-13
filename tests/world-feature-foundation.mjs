import assert from "node:assert/strict";
import { WORLD } from "../src/data/campaign.config.js";
import { createWorldFeatureFoundation } from "../src/world/world-feature-foundation-kit.js";

let status = "working";
let disposed = false;
let resetCount = 0;
let compiled = 0;
const baseWorld = {
  sampleHeight: () => 20,
  sampleBiome: (_x, _z, context) => ({ height: context.height, name: context.height > 100 ? "highland" : "meadow" }),
  sampleFlora: (_x, _z, context) => ({ height: context.height, grassDensity: context.height > 100 ? 0 : 1 }),
  sampleMapColor: () => [50, 120, 70],
  getGenerationState: () => ({ status, revision: status === "ready" ? 1 : 0 }),
  getDescriptor: () => ({ id: "base-world" }),
  subscribeGeneration: () => () => {},
  reset() { resetCount += 1; },
  dispose() { disposed = true; }
};
const worldFeatures = {
  compileCell() { compiled += 1; },
  getSamplers: () => ({ mountain: () => 500 }),
  listFeatures: () => WORLD.features.landforms
};
const worldFoundation = {
  sampleElevation(_cellId, point) { return point.z === 5500 ? 500 : 0; }
};
const world = createWorldFeatureFoundation(baseWorld, { worldConfig: WORLD, worldFeatures, worldFoundation });
assert.equal(compiled, 1);
assert.equal(world.sampleHeight(0, 5500), 20, "fallback terrain must remain active before generation is ready");
status = "ready";
assert.equal(world.sampleHeight(0, 5500), 520, "ready foundation should add the 500m mountain");
assert.equal(world.sampleHeight(0, 0), 20, "terrain outside the mountain must remain unchanged");
assert.equal(world.sampleBiome(0, 5500).name, "highland");
assert.equal(world.sampleFlora(0, 5500).grassDensity, 0);
assert.notDeepEqual(world.sampleMapColor(0, 5500), [50, 120, 70]);
assert.equal(world.getDescriptor().featureIds[0], "northern-wall");
assert.equal(WORLD.features.landforms[0].definition.height, 500);
world.reset();
world.dispose();
assert.equal(resetCount, 1);
assert.equal(disposed, true);

console.log("The Open Above world-feature foundation and 500m mountain passed.");
