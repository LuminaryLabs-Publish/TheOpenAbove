import assert from "node:assert/strict";
globalThis.window = globalThis;
const { createDefaultMailTowns } = await import("../src/gameplay/mail-delivery-domain/mail-route-kit.js");
const { createDefaultAirstreamRoutes } = await import("../src/runtime/airstream-domain/airstream-route-kit.js");
const { GRASS_SPECIES_COUNT } = await import("../src/visual/grass-field/grass-biome-density-kit.js");
const { generateGrassChunkCandidates } = await import("../src/visual/grass-field/grass-chunk-placement-kit.js");
const {
  GRASS_CULL_DISTANCE,
  GRASS_FADE_END,
  GRASS_FADE_START,
  grassLodForChunkDistance
} = await import("../src/visual/grass-field/grass-lod-kit.js");
const { createGrassPatchDistribution } = await import("../src/visual/grass-field/grass-patch-density-kit.js");
const { normalizeGrassSeed } = await import("../src/visual/grass-field/grass-world-seed-kit.js");
const { createWorldGenerationKit } = await import("../src/world/world-generation-kit.js");

const worldSeed = "open-above-meadow-lift";
assert.notEqual(normalizeGrassSeed(worldSeed), normalizeGrassSeed("another-world"));
assert.equal(normalizeGrassSeed(worldSeed), normalizeGrassSeed(worldSeed));
assert.equal(GRASS_SPECIES_COUNT, 5);
assert.equal(GRASS_FADE_START, 525);
assert.equal(GRASS_FADE_END, 750);
assert.equal(GRASS_CULL_DISTANCE, 1100);

let highClumps = 0;
for (let z = -3; z <= 3; z += 1) {
  for (let x = -3; x <= 3; x += 1) highClumps += grassLodForChunkDistance(Math.hypot(x, z), "high").count;
}
assert.equal(highClumps, 2500);
assert.equal(highClumps * 2, 5000);
assert.equal(grassLodForChunkDistance(0, "high").count, 300);
assert.equal(grassLodForChunkDistance(1, "high").count, 275);
assert.equal(grassLodForChunkDistance(2, "high").count, 0);
assert.ok(grassLodForChunkDistance(0, "medium").count < grassLodForChunkDistance(0, "high").count);
assert.ok(grassLodForChunkDistance(0, "low").count < grassLodForChunkDistance(0, "medium").count);

const legacyTerrainHeight = (x, z) => {
  const radius = Math.hypot(x, z);
  return Math.sin(x * 0.0032) * 34
    + Math.cos(z * 0.0038) * 29
    + Math.sin((x + z) * 0.0064) * 9
    + Math.cos((x - z) * 0.0048) * 7
    - Math.exp(-(radius * radius) / 620000) * 48
    + Math.sin(x * 0.017) * Math.cos(z * 0.013) * 3.8;
};
const world = createWorldGenerationKit({
  worldConfig: { seed: worldSeed, surface: { radius: 10000 } },
  legacyTerrainHeight,
  anchors: { routes: createDefaultAirstreamRoutes(), towns: createDefaultMailTowns() }
});
const distribution = createGrassPatchDistribution(worldSeed, 2400, world);

let generatedClumps = 0;
const species = new Set();
const heightBands = new Map();
let minimumWidth = Infinity;
let maximumWidth = 0;
let maximumHeight = 0;
for (let z = -1; z <= 1; z += 1) {
  for (let x = -1; x <= 1; x += 1) {
    const profile = grassLodForChunkDistance(Math.hypot(x, z), "high");
    const options = {
      worldSeed,
      chunkX: x,
      chunkZ: z,
      chunkSize: 520,
      count: profile.count,
      terrainHeight: world.sampleHeight,
      moistureAt: world.sampleMoisture,
      patchDistribution: distribution,
      treeProximityAt: () => 0,
      obstacleAt: () => false
    };
    const first = generateGrassChunkCandidates(options);
    const second = generateGrassChunkCandidates(options);
    assert.deepEqual(first, second, `chunk ${x}:${z} should be deterministic`);
    assert.equal(first.length, profile.count, `chunk ${x}:${z} should fill its local budget`);
    generatedClumps += first.length;
    for (const item of first) {
      species.add(item.species);
      heightBands.set(item.heightBand, (heightBands.get(item.heightBand) || 0) + 1);
      minimumWidth = Math.min(minimumWidth, item.width);
      maximumWidth = Math.max(maximumWidth, item.width);
      maximumHeight = Math.max(maximumHeight, item.height);
      assert.ok(item.variant >= 0 && item.variant < GRASS_SPECIES_COUNT);
      assert.ok(item.normal.y > 0.85);
    }
  }
}
assert.equal(generatedClumps, 2500);
assert.equal(generatedClumps * 2, 5000);
assert.deepEqual([...species].sort(), [0, 1, 2, 3, 4]);
assert.ok(heightBands.get("normal") > heightBands.get("tall"));
assert.ok(heightBands.get("tall") > heightBands.get("hero"));
assert.ok(heightBands.get("hero") >= 100, "hero grass should appear without dominating the field");
assert.ok(maximumHeight > 6, "3x grass variation should produce visibly tall clumps");
assert.ok(minimumWidth > 2.5 && maximumWidth < 14);

const densitySamples = [];
for (let z = -9000; z <= 9000; z += 300) {
  for (let x = -9000; x <= 9000; x += 300) {
    if (Math.hypot(x, z) < 9500) densitySamples.push(world.sampleFlora(x, z).grassDensity);
  }
}
assert.ok(densitySamples.some((value) => value === 0), "grass distribution should contain bare ground");
assert.ok(densitySamples.some((value) => value > 0.85), "grass distribution should contain dense patches");

console.log("The Open Above local-range five-species grass budget, color types, height bands, and patch contrast passed.");
