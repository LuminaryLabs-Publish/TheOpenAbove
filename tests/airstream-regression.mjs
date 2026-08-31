import assert from "node:assert/strict";
import { createAirstreamDomain } from "../src/runtime/airstream-domain/airstream-domain.js";

const domain = createAirstreamDomain();
const fixtures = [
  {
    position: { x: 0, y: 105, z: 0 },
    elapsed: 0,
    routeId: "lowland-to-sunvale",
    influence: 1,
    captureState: "inside",
    velocity: [2.691814207, 0.773687593, -14.195139736]
  },
  {
    position: { x: -450, y: 190, z: -700 },
    elapsed: 12.5,
    routeId: "meadow-to-brookhaven",
    influence: 1,
    captureState: "inside",
    velocity: [-10.469482496, 0.862615231, -16.105519484]
  },
  {
    position: { x: 520, y: 112, z: -650 },
    elapsed: 20,
    routeId: "lowland-to-sunvale",
    influence: 1,
    captureState: "inside",
    velocity: [10.412075326, 0.546544347, -13.364972351]
  },
  {
    position: { x: 470, y: 305, z: 560 },
    elapsed: 33.25,
    routeId: "highland-to-cloudmere",
    influence: 1,
    captureState: "inside",
    velocity: [13.990850153, 0.468634186, 16.725931897]
  },
  {
    position: { x: 9000, y: 9000, z: 9000 },
    elapsed: 2,
    routeId: null,
    influence: 0,
    captureState: "ambient",
    velocity: [3.772663976, 0, -4.5]
  }
];

const initialSnapshot = domain.snapshot();
for (const fixture of fixtures) {
  const sample = domain.queryFlow(fixture.position, fixture.elapsed);
  assert.equal(sample.routeId, fixture.routeId);
  assert.equal(sample.captureState, fixture.captureState);
  assert.ok(Math.abs(sample.influence - fixture.influence) < 1e-9);
  for (const [index, component] of [sample.velocity.x, sample.velocity.y, sample.velocity.z].entries()) {
    assert.ok(Math.abs(component - fixture.velocity[index]) < 1e-8, `fixture velocity ${index} changed`);
  }
}
assert.deepEqual(domain.snapshot(), initialSnapshot, "read-only trail queries must not mutate airstream authority");

const gameplaySample = domain.sample({ x: 0, y: 105, z: 0 }, 0);
const gameplaySnapshot = domain.snapshot();
domain.queryFlow({ x: 470, y: 305, z: 560 }, 33.25);
assert.deepEqual(domain.snapshot(), gameplaySnapshot, "presentation queries must not replace the gameplay sample");
assert.equal(gameplaySample.routeId, "lowland-to-sunvale");

domain.dispose();
console.log("The Open Above airstream regression fixtures and read-only flow query passed.");
