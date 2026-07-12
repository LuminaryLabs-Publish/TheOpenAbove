import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const near = readFileSync(new URL("../src/visual/landscape/terrain-chunk-streaming-kit.js", import.meta.url), "utf8");
const horizon = readFileSync(new URL("../src/visual/landscape/terrain-horizon-streaming-kit.js", import.meta.url), "utf8");
const surface = readFileSync(new URL("../src/visual/landscape/terrain-surface-kit.js", import.meta.url), "utf8");
const landmarks = readFileSync(new URL("../src/visual/landscape/distant-landmark-kit.js", import.meta.url), "utf8");
const water = readFileSync(new URL("../src/visual/landscape/water-surface-kit.js", import.meta.url), "utf8");
const world = readFileSync(new URL("../src/world/world-generation-kit.js", import.meta.url), "utf8");

assert.match(surface, /createTerrainStreamingFrame/);
assert.match(surface, /streamer\.updateFromFrame\(frame\)/);
assert.match(surface, /horizon\.updateFromFrame\(frame\)/);
assert.match(near, /skirtDepth = 3\.5/);
assert.match(near, /slopeSampleStep = 24/);
assert.match(horizon, /classifyHorizonRequirements/);
assert.match(horizon, /clipSignature/);
assert.match(horizon, /actual\.segments !== requirement\.segments/);
assert.doesNotMatch(horizon, /chunkSize \* 1\.004/);
assert.doesNotMatch(horizon, /height - 0\.08/);
assert.match(landmarks, /open-above-draped-field-patch/);
assert.match(landmarks, /open-above-draped-dirt-road/);
assert.doesNotMatch(landmarks, /TubeGeometry/);
assert.match(water, /AUTHORED_LAKES/);
assert.match(water, /edgeFade/);
assert.match(world, /routeCoreSq = 72 \* 72/);
assert.match(world, /routeOuterSq = 190 \* 190/);
assert.doesNotMatch(world, /smoothstep\(0\.18, 0\.985, protection\)/);

console.log("The Open Above terrain skirts, reclassification, draped overlays, shared lakes, and narrowed route protection passed.");
