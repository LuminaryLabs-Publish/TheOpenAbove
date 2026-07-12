import assert from "node:assert/strict";
globalThis.window = globalThis;
const { createDefaultMailTowns } = await import("../src/gameplay/mail-delivery-domain/mail-route-kit.js");
const { createDefaultAirstreamRoutes } = await import("../src/runtime/airstream-domain/airstream-route-kit.js");
const {
  FLOWER_CULL_DISTANCE,
  FLOWER_FADE_END,
  FLOWER_FADE_START,
  FLOWER_TYPE_COUNT,
  flowerCountForChunkDistance,
  generateFlowerChunkCandidates
} = await import("../src/visual/flower-field/flower-chunk-placement-kit.js");
const { createWorldGenerationKit } = await import("../src/world/world-generation-kit.js");

assert.equal(FLOWER_TYPE_COUNT, 5);
assert.equal(FLOWER_FADE_START, 420);
assert.equal(FLOWER_FADE_END, 620);
assert.equal(FLOWER_CULL_DISTANCE, 900);

const budgetFor = (quality) => flowerCountForChunkDistance(0, quality)
  + flowerCountForChunkDistance(1, quality) * 8;
assert.equal(budgetFor("high"), 300);
assert.equal(budgetFor("medium"), 190);
assert.equal(budgetFor("low"), 100);
assert.equal(flowerCountForChunkDistance(2, "high"), 0);

const worldSeed = "open-above-meadow-lift";
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

let activeClumps = 0;
for (let z = -1; z <= 1; z += 1) {
  for (let x = -1; x <= 1; x += 1) {
    const count = flowerCountForChunkDistance(Math.hypot(x, z), "high");
    const options = {
      worldSeed,
      chunkX: x,
      chunkZ: z,
      chunkSize: 520,
      count,
      terrainHeight: world.sampleHeight,
      moistureAt: world.sampleMoisture,
      floraAt: world.sampleFlora,
      obstacleAt: () => false
    };
    const first = generateFlowerChunkCandidates(options);
    const second = generateFlowerChunkCandidates(options);
    assert.deepEqual(first, second, `flower chunk ${x}:${z} should be deterministic`);
    assert.ok(first.length <= count);
    assert.ok(first.every((item) => item.type >= 0 && item.type < FLOWER_TYPE_COUNT));
    assert.ok(first.every((item) => item.normal.y > 0.9));
    activeClumps += first.length;
  }
}
assert.ok(activeClumps >= 100 && activeClumps <= 300, `initial flower field should stay colorful but bounded; got ${activeClumps}`);

const flowerTypes = new Set();
let sampledClumps = 0;
for (let chunkZ = -12; chunkZ <= 12; chunkZ += 3) {
  for (let chunkX = -12; chunkX <= 12; chunkX += 3) {
    if (Math.hypot(chunkX * 520, chunkZ * 520) > 9000) continue;
    const candidates = generateFlowerChunkCandidates({
      worldSeed,
      chunkX,
      chunkZ,
      chunkSize: 520,
      count: 30,
      terrainHeight: world.sampleHeight,
      moistureAt: world.sampleMoisture,
      floraAt: world.sampleFlora,
      obstacleAt: () => false
    });
    sampledClumps += candidates.length;
    for (const item of candidates) flowerTypes.add(item.type);
  }
}
assert.ok(sampledClumps > 500, "full world should contain many localized flower clumps");
assert.deepEqual([...flowerTypes].sort(), [0, 1, 2, 3, 4]);

console.log("The Open Above five-type flower atlas contract, patch placement, range, determinism, and budgets passed.");
