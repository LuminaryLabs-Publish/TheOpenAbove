import { existsSync, readFileSync } from "node:fs";
import assert from "node:assert/strict";

const legacyParticlesPath = "src/domains/sky/wind-particle-field-kit.js";
const protoPath = "src/runtime/airstream-trails/airstream-trail-proto-kit.js";
const geometryPath = "src/visual/airstream-trails/airstream-trail-geometry-kit.js";
const materialPath = "src/visual/airstream-trails/airstream-trail-material-kit.js";
const adapterPath = "src/visual/airstream-trails/three-airstream-trail-adapter.js";
const presentationPath = "src/visual/airstream-trails/airstream-trail-presentation-kit.js";
const skyDomainPath = "src/domains/sky/sky-domain.js";
const scenePath = "src/scenes/meadow-lift-scene.js";

assert.equal(existsSync(legacyParticlesPath), false, "legacy CPU wind particles must be deleted");
for (const file of [protoPath, geometryPath, materialPath, adapterPath, presentationPath, skyDomainPath, scenePath]) {
  assert.equal(existsSync(file), true, `${file} should exist`);
}

const proto = readFileSync(protoPath, "utf8");
assert.match(proto, /DEFAULT_AIRSTREAM_TRAIL_COUNT = 7/);
assert.match(proto, /createAirstreamTrailField/);
assert.match(proto, /integratePoint/);
assert.match(proto, /length: 118/);
assert.match(proto, /length: 242/);
assert.doesNotMatch(proto, /from "three"|THREE\./, "the ProtoKit must remain renderer-neutral");

const geometry = readFileSync(geometryPath, "utf8");
assert.match(geometry, /createAirstreamTrailGeometry/);
assert.match(geometry, /updateAirstreamTrailGeometry/);
assert.match(geometry, /aPreviousFrom/);
assert.match(geometry, /bufferUploads/);

const material = readFileSync(materialPath, "utf8");
assert.match(material, /ShaderMaterial/);
assert.match(material, /cameraPosition/);
assert.match(material, /uMorph/);
assert.match(material, /depthWrite: false/);
assert.match(material, /flowingLight/);
assert.doesNotMatch(material, /wisps|smoothstep\(0\.18, 0\.96/, "wind ribbons must remain continuous rather than breaking into particle-like wisps");

const adapter = readFileSync(adapterPath, "utf8");
assert.match(adapter, /new THREE\.Mesh/);
assert.doesNotMatch(adapter, /THREE\.Points|PointsMaterial|requestAnimationFrame/);
assert.match(adapter, /drawCalls: 1/);

const presentation = readFileSync(presentationPath, "utf8");
assert.match(presentation, /trailCount !== DEFAULT_AIRSTREAM_TRAIL_COUNT/);
assert.doesNotMatch(presentation, /requestAnimationFrame/);

const sky = readFileSync(skyDomainPath, "utf8");
assert.match(sky, /queryFlow/);
assert.doesNotMatch(sky, /createWindParticleField|windParticles|particleCount/);

const scene = readFileSync(scenePath, "utf8");
assert.match(scene, /createAirstreamTrailPresentation/);
assert.match(scene, /trailCount: 7/);
assert.match(scene, /windTrails\.update/);
assert.match(scene, /windTrails\.dispose/);
assert.doesNotMatch(scene, /windParticles/);

console.log("The Open Above uses exactly seven renderer-neutral, one-draw GPU wind trails with no legacy particle path.");
