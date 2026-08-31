import assert from "node:assert/strict";
import * as THREE from "three";
import { createAirstreamField } from "../src/runtime/airstream-domain/airstream-field-kit.js";
import { createDefaultAirstreamRoutes } from "../src/runtime/airstream-domain/airstream-route-kit.js";
import { createAirstreamTrailPresentation } from "../src/visual/airstream-trails/airstream-trail-presentation-kit.js";

const scene = new THREE.Scene();
const airstream = createAirstreamField({ routes: createDefaultAirstreamRoutes() });
const presentation = createAirstreamTrailPresentation({
  scene,
  queryFlow: airstream.sample,
  seed: "fixture",
  quality: { id: "high" },
  trailCount: 7
});
const position = new THREE.Vector3(0, 105, 0);
const sample = airstream.sample(position, 0);

presentation.mount({ position, elapsed: 0, sample });
presentation.mount({ position, elapsed: 0, sample });
assert.equal(scene.children.filter((child) => child.name === "open-above-airstream-trail-presentation").length, 1);
const mounted = presentation.snapshot();
assert.equal(mounted.trailCount, 7);
assert.equal(mounted.render.drawCalls, 1);
assert.equal(mounted.render.meshCount, 1);
assert.equal(mounted.render.materialCount, 1);
assert.equal(mounted.render.vertexCount, 896);
assert.equal(mounted.render.bufferUploads, 1);

for (let frame = 1; frame <= 120; frame += 1) {
  presentation.update(position, frame / 60, sample);
}
const stable = presentation.snapshot();
assert.equal(stable.rebuilds, 1);
assert.equal(stable.render.bufferUploads, 1, "stable frames must not upload trail geometry");

position.x += 30;
const movedSample = airstream.sample(position, 2.1);
presentation.update(position, 2.1, movedSample);
const rebuilt = presentation.snapshot();
assert.equal(rebuilt.rebuilds, 2);
assert.equal(rebuilt.render.bufferUploads, 2, "a material field revision should upload geometry exactly once");
assert.equal(rebuilt.render.drawCalls, 1);

const routeChangedSample = { ...movedSample, routeId: "fixture-route" };
presentation.update(position, 2.2, routeChangedSample);
assert.equal(presentation.snapshot().render.bufferUploads, 2, "route changes must respect the rebuild rate limit");
presentation.update(position, 2.4, routeChangedSample);
assert.equal(presentation.snapshot().render.bufferUploads, 3, "a retained route change must rebuild after the rate limit");

const adapter = presentation.adapter;
presentation.dispose();
presentation.dispose();
assert.equal(scene.children.filter((child) => child.name === "open-above-airstream-trail-presentation").length, 0);
assert.equal(presentation.snapshot().disposed, true);
assert.equal(adapter.snapshot().disposed, true);

assert.throws(() => createAirstreamTrailPresentation({
  scene,
  queryFlow: airstream.sample,
  trailCount: 6
}), /exactly 7/);

console.log("The Open Above seven-trail lifecycle, one-draw, revision-upload, and disposal contract passed.");
