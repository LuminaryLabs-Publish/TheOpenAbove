import assert from "node:assert/strict";
import { createWorldGenerationKit } from "../src/world/world-generation-kit.js";

const legacy = (x, z) => Math.sin(x * 0.0032) * 34 + Math.cos(z * 0.0038) * 29;
const route = {
  points: [
    { x: -1800, z: -2000 },
    { x: -600, z: -700 },
    { x: 0, z: 0 },
    { x: 1600, z: 1800 }
  ]
};
const world = createWorldGenerationKit({
  worldConfig: { seed: "terrain-overlap-fix", surface: { radius: 10000 } },
  legacyTerrainHeight: legacy,
  anchors: { routes: [route], towns: [] }
});

for (let segment = 1; segment < route.points.length; segment += 1) {
  const start = route.points[segment - 1];
  const end = route.points[segment];
  for (let sample = 0; sample <= 32; sample += 1) {
    const t = sample / 32;
    const x = start.x + (end.x - start.x) * t;
    const z = start.z + (end.z - start.z) * t;
    assert.ok(Math.abs(world.sampleHeight(x, z) - legacy(x, z)) <= 0.000001);
  }
}

const routeMid = { x: -300, z: -350 };
const offsets = [72, 120, 190, 260];
const samples = offsets.map((offset) => world.sampleHeight(routeMid.x + offset, routeMid.z));
assert.ok(samples.every(Number.isFinite));
assert.notEqual(samples[3], legacy(routeMid.x + offsets[3], routeMid.z), "terrain outside the narrowed corridor should remain generated");
assert.deepEqual(world.getDescriptor(), world.getDescriptor());

console.log("The Open Above narrow single-pass route protection and deterministic descriptor passed.");
