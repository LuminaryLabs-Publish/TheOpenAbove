import assert from "node:assert/strict";

globalThis.window = globalThis;

const { normalizeGrassSeed } = await import("../src/visual/grass-field/grass-world-seed-kit.js");
const { createGrassPatchDistribution } = await import("../src/visual/grass-field/grass-patch-density-kit.js");
const { generateGrassChunkCandidates } = await import("../src/visual/grass-field/grass-chunk-placement-kit.js");
const { grassLodForChunkDistance } = await import("../src/visual/grass-field/grass-lod-kit.js");

const worldSeed = "open-above-meadow-lift";
assert.notEqual(normalizeGrassSeed(worldSeed), normalizeGrassSeed("another-world"));
assert.equal(normalizeGrassSeed(worldSeed), normalizeGrassSeed(worldSeed));

const distribution = createGrassPatchDistribution(worldSeed, 2400);
assert.ok(distribution.patchCount >= 20 && distribution.patchCount <= 35);
assert.ok(distribution.clearingCount >= 15 && distribution.clearingCount <= 25);
assert.equal(distribution.patches.length, distribution.patchCount);
assert.equal(distribution.clearings.length, distribution.clearingCount);

const samples = [];
for (let z = -1200; z <= 1200; z += 120) {
  for (let x = -1200; x <= 1200; x += 120) samples.push(distribution.sample(x, z, 0.92, { height: 12 }));
}
assert.ok(Math.max(...samples) - Math.min(...samples) > 0.72, "density field should contain strong meadow and clearing contrast");
assert.ok(samples.some((value) => value < 0.08), "density field should include nearly bare ground");
assert.ok(samples.some((value) => value > 0.82), "density field should include lush grass patches");

let highClumps = 0;
for (let z = -3; z <= 3; z += 1) {
  for (let x = -3; x <= 3; x += 1) highClumps += grassLodForChunkDistance(Math.hypot(x, z), "high").count;
}
assert.equal(highClumps, 2500);
assert.equal(highClumps * 2, 5000);
assert.equal(grassLodForChunkDistance(0, "high").planes, 2);
assert.ok(grassLodForChunkDistance(0, "medium").count < grassLodForChunkDistance(0, "high").count);
assert.ok(grassLodForChunkDistance(0, "low").count < grassLodForChunkDistance(0, "medium").count);

const terrainHeight = (x, z) => Math.sin(x * 0.006) * 8 + Math.cos(z * 0.005) * 6;
const options = {
  worldSeed,
  chunkX: 2,
  chunkZ: 2,
  chunkSize: 520,
  count: 43,
  terrainHeight,
  moistureAt: () => 0.28,
  patchDistribution: distribution,
  treeProximityAt: () => 0.4,
  obstacleAt: () => false
};
const first = generateGrassChunkCandidates(options);
const second = generateGrassChunkCandidates(options);
assert.equal(first.length, 43);
assert.deepEqual(first, second);
assert.ok(first.every((item) => item.variant >= 0 && item.variant < 8));
assert.ok(first.every((item) => item.normal.y > 0.9));
assert.ok(first.every((item) => item.width >= 3.4 && item.width <= 13.5));
assert.ok(new Set(first.map((item) => `${Math.round(item.x)}:${Math.round(item.z)}`)).size > 38);

const campaignTerrainHeight = (x, z) => {
  const radius = Math.hypot(x, z);
  return Math.sin(x * 0.0032) * 34
    + Math.cos(z * 0.0038) * 29
    + Math.sin((x + z) * 0.0064) * 9
    + Math.cos((x - z) * 0.0048) * 7
    - Math.exp(-(radius * radius) / 620000) * 48
    + Math.sin(x * 0.017) * Math.cos(z * 0.013) * 3.8;
};
const campaignMoisture = (x, z) => Math.max(0, Math.min(1,
  Math.exp(-((x + 260) ** 2 + (z - 180) ** 2) / 90000)
  + Math.exp(-((x - 420) ** 2 + (z + 340) ** 2) / 130000) * 0.72
  + Math.exp(-((Math.sin(x * 0.0037) * 175 + z * 0.115) ** 2) / 26000) * 0.5
));
let generatedCampaignClumps = 0;
for (let z = -3; z <= 3; z += 1) {
  for (let x = -3; x <= 3; x += 1) {
    const profile = grassLodForChunkDistance(Math.hypot(x, z), "high");
    if (!profile.count) continue;
    generatedCampaignClumps += generateGrassChunkCandidates({
      worldSeed,
      chunkX: x,
      chunkZ: z,
      chunkSize: 520,
      count: profile.count,
      terrainHeight: campaignTerrainHeight,
      moistureAt: campaignMoisture,
      patchDistribution: distribution
    }).length;
  }
}
assert.equal(generatedCampaignClumps, 2500, "campaign terrain should admit the complete clump budget");
assert.equal(generatedCampaignClumps * 2, 5000, "campaign terrain should render exactly 5,000 cards");

console.log("The Open Above seeded dense grass budget and patch distribution passed.");
