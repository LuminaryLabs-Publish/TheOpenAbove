import assert from "node:assert/strict";
import { createDefaultMailTowns } from "../src/gameplay/mail-delivery-domain/mail-route-kit.js";
import { createDefaultAirstreamRoutes } from "../src/runtime/airstream-domain/airstream-route-kit.js";
globalThis.window = globalThis;
const {
  WORLD_FEATURE_CELL_SIZE,
  WORLD_GRID_SIZE,
  createWorldGenerationKit
} = await import("../src/world/world-generation-kit.js");

const worldSeed = "open-above-meadow-lift";
const routes = createDefaultAirstreamRoutes();
const towns = createDefaultMailTowns();
const worldConfig = {
  seed: worldSeed,
  surface: { center: { x: 0, z: 0 }, radius: 10000 }
};

const legacyTerrainHeight = (x, z) => {
  const radius = Math.hypot(x, z);
  return Math.sin(x * 0.0032) * 34
    + Math.cos(z * 0.0038) * 29
    + Math.sin((x + z) * 0.0064) * 9
    + Math.cos((x - z) * 0.0048) * 7
    - Math.exp(-(radius * radius) / 620000) * 48
    + Math.sin(x * 0.017) * Math.cos(z * 0.013) * 3.8;
};

const createWorld = () => createWorldGenerationKit({
  worldConfig,
  legacyTerrainHeight,
  anchors: { routes, towns }
});

const first = createWorld();
const second = createWorld();
assert.equal(first.gridSize, WORLD_GRID_SIZE);
assert.equal(first.featureCellSize, WORLD_FEATURE_CELL_SIZE);
assert.equal(first.radius, 10000);
assert.deepEqual(first.getDescriptor(), second.getDescriptor());
const descriptorBeforeQueries = first.getDescriptor();
first.sampleMapColor(8200, -3100);
first.sampleFeatureCell(-4300, 2700);
assert.deepEqual(first.getDescriptor(), descriptorBeforeQueries, "world descriptor should not depend on query order or cache warmup");
assert.equal(first.contains(0, 0), true);
assert.equal(first.contains(10001, 0), false);
const outsideFlora = first.sampleFlora(10100, 0);
assert.equal(outsideFlora.grassDensity, 0);
assert.equal(outsideFlora.flowerDensity, 0);
assert.equal(outsideFlora.biomeName, "outside-world");

const deterministicSamples = [
  [-9100, -1200],
  [-4700, 3800],
  [-1200, -7800],
  [0, 0],
  [2100, -3300],
  [6200, 4400],
  [8900, -1200]
];
for (const [x, z] of deterministicSamples) {
  assert.equal(first.sampleHeight(x, z), second.sampleHeight(x, z));
  assert.equal(first.sampleMoisture(x, z), second.sampleMoisture(x, z));
  assert.deepEqual(first.sampleFlora(x, z), second.sampleFlora(x, z));
  assert.deepEqual(first.sampleMapColor(x, z), second.sampleMapColor(x, z));
  assert.ok(Number.isFinite(first.sampleHeight(x, z)));
}

let maximumProtectedDelta = 0;
for (const route of routes) {
  for (let segment = 1; segment < route.points.length; segment += 1) {
    const start = route.points[segment - 1];
    const end = route.points[segment];
    for (let sample = 0; sample <= 32; sample += 1) {
      const t = sample / 32;
      const x = start.x + (end.x - start.x) * t;
      const z = start.z + (end.z - start.z) * t;
      maximumProtectedDelta = Math.max(
        maximumProtectedDelta,
        Math.abs(first.sampleHeight(x, z) - legacyTerrainHeight(x, z))
      );
    }
  }
}
for (const town of towns) {
  for (let sample = 0; sample < 16; sample += 1) {
    const angle = sample / 16 * Math.PI * 2;
    const x = town.position.x + Math.cos(angle) * 220;
    const z = town.position.z + Math.sin(angle) * 220;
    maximumProtectedDelta = Math.max(
      maximumProtectedDelta,
      Math.abs(first.sampleHeight(x, z) - legacyTerrainHeight(x, z))
    );
  }
}
assert.ok(maximumProtectedDelta <= 0.25, `protected gameplay terrain drifted by ${maximumProtectedDelta}`);

const grassTypes = new Set();
const flowerTypes = new Set();
const biomeIds = new Set();
const mapColors = new Set();
const densities = [];
for (let z = -9500; z <= 9500; z += 350) {
  for (let x = -9500; x <= 9500; x += 350) {
    if (Math.hypot(x, z) > 9800) continue;
    const flora = first.sampleFlora(x, z);
    grassTypes.add(flora.primaryGrassType);
    grassTypes.add(flora.secondaryGrassType);
    flowerTypes.add(flora.flowerType);
    flowerTypes.add(flora.secondaryFlowerType);
    biomeIds.add(flora.biomeId);
    densities.push(flora.grassDensity);
    mapColors.add(first.sampleMapColor(x, z).join(":"));
  }
}
assert.deepEqual([...grassTypes].sort(), [0, 1, 2, 3, 4]);
assert.deepEqual([...flowerTypes].sort(), [0, 1, 2, 3, 4]);
assert.ok(biomeIds.size >= 4, "world should expose several biome profiles");
assert.ok(Math.min(...densities) === 0, "world should contain true no-grass areas");
assert.ok(Math.max(...densities) >= 0.9, "world should contain lush meadow areas");
assert.ok(mapColors.size >= 20, "cached map source should contain varied world colors");

console.log("The Open Above seeded full-world grid, protected terrain anchors, biome patches, and map colors passed.");
