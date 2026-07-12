import assert from "node:assert/strict";
import {
  TERRAIN_NEAR_CHUNK_SIZE,
  createTerrainStreamingFrame,
  classifyHorizonRequirements,
  boundsIntersect,
  pointInsideAnyBounds
} from "../src/visual/landscape/terrain-streaming-contract-kit.js";

const cameras = [
  { x: 0, z: 0 },
  { x: 259, z: 259 },
  { x: 261, z: 261 },
  { x: 779, z: -781 },
  { x: -521, z: 1041 },
  { x: 1730, z: -2240 }
];

for (const camera of cameras) {
  const frame = createTerrainStreamingFrame(camera, { nearChunkRadius: 3 });
  const requirements = classifyHorizonRequirements(frame, { radiusInNearChunks: 12 });
  assert.equal(frame.nearChunkSize, TERRAIN_NEAR_CHUNK_SIZE);
  assert.ok(frame.nearChunks.length >= 37);
  assert.ok(requirements.length > 0);

  for (const requirement of requirements) {
    for (const cell of requirement.partition.visibleCells) {
      const x = (cell.minX + cell.maxX) * 0.5;
      const z = (cell.minZ + cell.maxZ) * 0.5;
      assert.equal(
        pointInsideAnyBounds(x, z, frame.nearBounds),
        false,
        `horizon cell ${requirement.key} must not overlap near terrain at ${x}:${z}`
      );
    }
  }

  for (const near of frame.nearChunks) {
    const intersecting = requirements.filter((requirement) => boundsIntersect(requirement.bounds, near.bounds));
    for (const requirement of intersecting) {
      const partitioned = requirement.partition.cells.filter((cell) => {
        const x = (cell.minX + cell.maxX) * 0.5;
        const z = (cell.minZ + cell.maxZ) * 0.5;
        return x > near.bounds.minX && x < near.bounds.maxX && z > near.bounds.minZ && z < near.bounds.maxZ;
      });
      assert.ok(partitioned.length > 0, "intersections must be explicitly partitioned");
      assert.ok(partitioned.every((cell) => cell.coveredByNear), "near-owned cells must be clipped from horizon geometry");
    }
  }
}

const negative = createTerrainStreamingFrame({ x: -780, z: -780 }, { nearChunkRadius: 3 });
const positive = createTerrainStreamingFrame({ x: 780, z: 780 }, { nearChunkRadius: 3 });
assert.equal(negative.horizonCenterX, -1);
assert.equal(negative.horizonCenterZ, -1);
assert.equal(positive.horizonCenterX, 1);
assert.equal(positive.horizonCenterZ, 1);

const frameA = createTerrainStreamingFrame({ x: 0, z: 0 }, { nearChunkRadius: 3 });
const frameB = createTerrainStreamingFrame({ x: 521, z: 0 }, { nearChunkRadius: 3 });
const reqA = new Map(classifyHorizonRequirements(frameA).map((entry) => [entry.key, entry]));
const reqB = new Map(classifyHorizonRequirements(frameB).map((entry) => [entry.key, entry]));
const retained = [...reqA.keys()].filter((key) => reqB.has(key));
assert.ok(retained.length > 0);
assert.ok(
  retained.some((key) => reqA.get(key).clipSignature !== reqB.get(key).clipSignature),
  "camera movement must produce typed clip reclassification for retained horizon chunks"
);

console.log("The Open Above terrain ownership, shared anchoring, clipping, and horizon reclassification passed.");
