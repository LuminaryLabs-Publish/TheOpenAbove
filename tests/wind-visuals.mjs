import { existsSync, readFileSync } from "node:fs";
import assert from "node:assert/strict";

const particlesPath = "src/domains/sky/wind-particle-field-kit.js";
const airstreamDomainPath = "src/runtime/airstream-domain/airstream-domain.js";
const airstreamIndexPath = "src/runtime/airstream-domain/index.js";
const legacyVisualPath = "src/runtime/airstream-domain/airstream-visual-kit.js";
const skyDomainPath = "src/domains/sky/sky-domain.js";

for (const file of [particlesPath, airstreamDomainPath, airstreamIndexPath, skyDomainPath]) {
  assert.equal(existsSync(file), true, `${file} should exist`);
}
assert.equal(existsSync(legacyVisualPath), false, "legacy spline wind trails should be removed");

const particles = readFileSync(particlesPath, "utf8");
assert.match(particles, /DEFAULT_PARTICLE_SIZE = 0\.11/);
assert.match(particles, /DEFAULT_OPACITY = 0\.5/);
assert.match(particles, /createDustTexture/);
assert.match(particles, /sampleFlowNoise3D/);
assert.match(particles, /directional-layered-3d/);
assert.match(particles, /THREE\.NormalBlending/);
assert.doesNotMatch(particles, /THREE\.AdditiveBlending/);
assert.doesNotMatch(particles, /material\.opacity\s*=/);

const airstreamDomain = readFileSync(airstreamDomainPath, "utf8");
assert.doesNotMatch(airstreamDomain, /createAirstreamVisual/);
assert.doesNotMatch(airstreamDomain, /visual\?\.(?:update|dispose)/);

const airstreamIndex = readFileSync(airstreamIndexPath, "utf8");
assert.doesNotMatch(airstreamIndex, /airstream-visual-kit/);

const skyDomain = readFileSync(skyDomainPath, "utf8");
assert.match(skyDomain, /particleSize: 0\.11/);
assert.match(skyDomain, /opacity: 0\.5/);
assert.match(skyDomain, /noiseModel/);

console.log("The Open Above dust wind field uses 50% alpha, half-size particles, layered 3D noise, and no spline-follow trail renderer.");
