import assert from "node:assert/strict";
import { createAirstreamField } from "../src/runtime/airstream-domain/airstream-field-kit.js";
import { createDefaultAirstreamRoutes } from "../src/runtime/airstream-domain/airstream-route-kit.js";
import {
  createAirstreamTrailField,
  DEFAULT_AIRSTREAM_TRAIL_COUNT
} from "../src/runtime/airstream-trails/airstream-trail-proto-kit.js";

const airstream = createAirstreamField({ routes: createDefaultAirstreamRoutes() });
const options = {
  sampleFlow: airstream.sample,
  origin: { x: 0, y: 105, z: 0 },
  count: DEFAULT_AIRSTREAM_TRAIL_COUNT,
  seed: "open-above-meadow-lift",
  sampleCount: 48,
  elapsed: 12.5,
  revisionKey: "fixture"
};
const first = createAirstreamTrailField(options);
const second = createAirstreamTrailField(options);

assert.deepEqual(first, second, "same field, seed, and revision must produce identical trails");
assert.equal(first.count, 7);
assert.equal(first.descriptors.length, 7);
assert.deepEqual(first.descriptors.map((trail) => trail.band), [
  "near", "near", "near", "medium", "medium", "distant", "distant"
]);

for (const [index, descriptor] of first.descriptors.entries()) {
  assert.equal(descriptor.id, `wind-trail-${String(index + 1).padStart(2, "0")}`);
  assert.equal(descriptor.points.length, 48);
  assert.ok(descriptor.width > 0);
  assert.ok(descriptor.speed > 0);
  assert.ok(descriptor.opacity > 0 && descriptor.opacity < 1);
  for (const point of descriptor.points) {
    assert.ok(Number.isFinite(point.x));
    assert.ok(Number.isFinite(point.y));
    assert.ok(Number.isFinite(point.z));
  }
  const start = descriptor.points[0];
  const end = descriptor.points.at(-1);
  const displacement = Math.hypot(end.x - start.x, end.y - start.y, end.z - start.z);
  assert.ok(displacement > 40, `${descriptor.id} must form a readable stream instead of collapsing`);
}

const differentSeed = createAirstreamTrailField({ ...options, seed: "different-world" });
assert.notDeepEqual(differentSeed.descriptors, first.descriptors);

let calls = 0;
const constant = createAirstreamTrailField({
  ...options,
  sampleFlow() {
    calls += 1;
    return { velocity: { x: 4, y: 0.2, z: -8 }, influence: 0.4 };
  }
});
assert.equal(constant.count, 7);
assert.ok(calls > 0 && calls < 1000, "trail construction must remain bounded");

console.log("The Open Above deterministic seven-trail renderer-neutral ProtoKit passed.");
