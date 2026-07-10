import { readFileSync, existsSync } from "node:fs";
import assert from "node:assert/strict";

const requiredFiles = [
  "index.html",
  "src/main.js",
  "src/runtime/balloon-simulation-kit.js",
  "src/runtime/balloon-telemetry-kit.js",
  "src/visual/visual-domain.js",
  "src/visual/quality-tier-kit.js",
  "src/visual/shader-noise.js",
  "src/visual/illumination/physical-sky-kit.js",
  "src/visual/illumination/sun-light-kit.js",
  "src/visual/illumination/aerial-perspective-kit.js",
  "src/visual/atmosphere/cloud-weather-map-kit.js",
  "src/visual/atmosphere/cloud-lighting-kit.js",
  "src/visual/atmosphere/cloud-lod-kit.js",
  "src/visual/atmosphere/volumetric-cloud-kit.js",
  "src/visual/post-process/hdr-composer-kit.js",
  "src/visual/post-process/color-grade-kit.js",
  "src/visual/landscape/terrain-surface-kit.js",
  "src/visual/landscape/terrain-chunk-streaming-kit.js",
  "src/visual/landscape/vegetation-cluster-kit.js",
  "src/visual/landscape/grass-detail-kit.js",
  "src/visual/landscape/water-surface-kit.js",
  "src/visual/landscape/distant-landmark-kit.js",
  "src/visual/balloon-presentation/balloon-presentation-domain.js",
  "src/visual/camera-presentation/balloon-camera-rig-kit.js",
  "src/hot-air-balloon-object-kit.js",
  "tools/headless-editor-environment.mjs",
  "vite.config.js"
];

for (const file of requiredFiles) assert.equal(existsSync(file), true, `${file} should exist`);

const html = readFileSync("index.html", "utf8");
assert.match(html, /type="importmap"/);
assert.match(html, /src\/main\.js/);

const main = readFileSync("src/main.js", "utf8");
assert.match(main, /createVisualDomain/);
assert.match(main, /createBalloonSimulation/);
assert.match(main, /visual\.render/);
assert.doesNotMatch(main, /renderer\.render\(/);

const visual = readFileSync("src/visual/visual-domain.js", "utf8");
assert.match(visual, /createTerrainSurface/);
assert.match(visual, /terrain\.update\(camera, weather\.state\)/);
assert.match(visual, /createHdrComposer/);
assert.match(visual, /density: 0\.00022/);
assert.doesNotMatch(visual, /createCloudShadowOverlay/);
assert.doesNotMatch(visual, /cloudShadows\.update/);

const composer = readFileSync("src/visual/post-process/hdr-composer-kit.js", "utf8");
assert.match(composer, /HalfFloatType/);
assert.match(composer, /installIndependentDepthTextures/);
assert.match(composer, /exposure: 1\.0/);
assert.match(composer, /bloomEnabled: false/);
assert.match(composer, /godRaysEnabled: false/);
assert.match(composer, /autoExposureEnabled: false/);
assert.doesNotMatch(composer, /composer\.addPass\(autoExposure\.pass\)/);
assert.doesNotMatch(composer, /composer\.addPass\(godRays\.pass\)/);
assert.doesNotMatch(composer, /composer\.addPass\(bloom\.pass\)/);

const grade = readFileSync("src/visual/post-process/color-grade-kit.js", "utf8");
assert.match(grade, /uExposure: \{ value: 1\.0 \}/);
assert.match(grade, /uSaturation: \{ value: 1\.0 \}/);
assert.match(grade, /uContrast: \{ value: 1\.0 \}/);
assert.doesNotMatch(grade, /uVignette/);
assert.doesNotMatch(grade, /uGrain/);

const terrain = readFileSync("src/visual/landscape/terrain-surface-kit.js", "utf8");
assert.match(terrain, /createTerrainChunkStreamer/);
assert.match(terrain, /installSoftCloudShadow/);
assert.match(terrain, /terrain\.update|streamer\.update/);
assert.match(terrain, /chunkSize: 520/);
assert.doesNotMatch(terrain, /new THREE\.PlaneGeometry\(size, size/);

const chunks = readFileSync("src/visual/landscape/terrain-chunk-streaming-kit.js", "utf8");
assert.match(chunks, /open-above-streamed-terrain-lod/);
assert.match(chunks, /lodSegments/);
assert.match(chunks, /lodForDistance/);
assert.match(chunks, /chunks = new Map/);
assert.match(chunks, /cloudLight = mix\(1\.0, 0\.74/);
assert.match(chunks, /gl_FragColor\.rgb \*= cloudLight/);
assert.doesNotMatch(chunks, /MultiplyBlending/);

const sun = readFileSync("src/visual/illumination/sun-light-kit.js", "utf8");
assert.match(sun, /groundBounce/);
assert.match(sun, /skyFill/);
assert.match(sun, /2\.8 \+ elevation \* 1\.2/);

const water = readFileSync("src/visual/landscape/water-surface-kit.js", "utf8");
assert.match(water, /uFogColor/);
assert.match(water, /uFogDensity/);
assert.match(water, /fog:\s*false/);
assert.doesNotMatch(water, /fog:\s*true/);

const harness = readFileSync("tools/headless-editor-environment.mjs", "utf8");
assert.match(harness, /renderer\.validate/);
assert.match(harness, /project\.check/);
assert.match(harness, /project\.build/);

console.log("The Open Above neutral lighting and streamed terrain smoke passed.");
