import assert from "node:assert/strict";
import {
  envelopeMouthRadius,
  envelopeTopY,
  resolveEnvelopeShapeProfile,
  sampleEnvelopeNormal,
  sampleEnvelopePoint,
  sampleEnvelopeRadius
} from "../src/balloon-envelope-profile-kit.js";

const profile = resolveEnvelopeShapeProfile({ maxRadius: 2.25, height: 6.2, baseY: 0.44 });
assert.equal(profile.maxRadius, 2.25);
assert.ok(Math.abs(envelopeTopY(profile) - 6.64) < 1e-9);
assert.ok(envelopeMouthRadius(profile) > 0.6 && envelopeMouthRadius(profile) < 0.9);
assert.ok(sampleEnvelopeRadius(0.48, profile) > sampleEnvelopeRadius(0.08, profile));
assert.ok(sampleEnvelopeRadius(0.68, profile) > sampleEnvelopeRadius(0.95, profile));
const point = sampleEnvelopePoint(Math.PI / 2, 0.48, profile);
assert.ok(point.x > 2);
assert.ok(Math.abs(point.z) < 1e-6);
const normal = sampleEnvelopeNormal(Math.PI / 2, 0.48, profile);
assert.ok(Math.abs(Math.hypot(normal.x, normal.y, normal.z) - 1) < 1e-6);
assert.deepEqual(sampleEnvelopePoint(0, 0.2, profile), sampleEnvelopePoint(0, 0.2, profile));
console.log("The Open Above shared balloon envelope profile tests passed.");
