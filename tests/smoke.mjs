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
  "src/visual/atmosphere/volumetric-cloud-kit.js",
  "src/visual/post-process/hdr-composer-kit.js",
  "src/visual/post-process/color-grade-kit.js",
  "src/visual/landscape/terrain-surface-kit.js",
  "src/visual/landscape/terrain-chunk-streaming-kit.js",
  "src/visual/grass-field/grass-world-seed-kit.js",
  "src/visual/grass-field/grass-biome-density-kit.js",
  "src/visual/grass-field/grass-exclusion-mask-kit.js",
  "src/visual/grass-field/grass-chunk-placement-kit.js",
  "src/visual/grass-field/grass-lod-kit.js",
  "src/visual/grass-field/grass-compute-culling-kit.js",
  "src/visual/grass-field/grass-field-domain.js",
  "src/visual/landscape/water-surface-kit.js",
  "src/visual/balloon-presentation/balloon-presentation-domain.js",
  "src/visual/camera-presentation/balloon-camera-rig-kit.js",
  "src/hot-air-balloon-object-kit.js",
  "tools/headless-editor-environment.mjs",
  "vite.config.js"
];
for (const file of requiredFiles) assert.equal(existsSync(file), true, `${file} should exist`);

const main = readFileSync("src/main.js", "utf8");
assert.match(main, /createVisualDomain/);
assert.doesNotMatch(main, /renderer\.render\(/);

const visual = readFileSync("src/visual/visual-domain.js", "utf8");
assert.match(visual, /createGrassFieldDomain/);
assert.match(visual, /grass\.update\(elapsed, camera\)/);
assert.match(visual, /grass\.getState\(\)/);
assert.doesNotMatch(visual, /createGrassDetail/);

const terrain = readFileSync("src/visual/landscape/terrain-surface-kit.js", "utf8");
assert.match(terrain, /createTerrainChunkStreamer/);
assert.match(terrain, /installSoftCloudShadow\(material\)/);
assert.match(terrain, /export function terrainColor/);
assert.match(terrain, /smoothWorldField/);
assert.match(terrain, /largeField/);
assert.match(terrain, /mediumField/);
assert.match(terrain, /localField/);
assert.match(terrain, /roughness: 0\.88/);
assert.match(terrain, /chunkSize: 520/);
assert.doesNotMatch(terrain, /makeDetailTextures/);
assert.doesNotMatch(terrain, /DataTexture/);
assert.doesNotMatch(terrain, /normalMap/);
assert.doesNotMatch(terrain, /map:\s*detail\.color/);
assert.doesNotMatch(terrain, /color\.repeat\.set/);
assert.doesNotMatch(terrain, /normal\.repeat\.set/);

const grassDomain = readFileSync("src/visual/grass-field/grass-field-domain.js", "utf8");
assert.match(grassDomain, /open-above-grass-field-domain/);
assert.match(grassDomain, /InstancedMesh/);
assert.match(grassDomain, /createPatchGeometry/);
assert.match(grassDomain, /generateGrassChunkCandidates/);
assert.match(grassDomain, /grassLodForChunkDistance/);
assert.match(grassDomain, /createGrassComputeCullingKit/);
assert.match(grassDomain, /chunks = new Map/);
assert.match(grassDomain, /uGrassTime/);

const placement = readFileSync("src/visual/grass-field/grass-chunk-placement-kit.js", "utf8");
assert.match(placement, /hashGrassSeed/);
assert.match(placement, /worldSeed/);
assert.match(placement, /chunkX/);
assert.match(placement, /chunkZ/);
assert.doesNotMatch(placement, /Math\.random/);

const lod = readFileSync("src/visual/grass-field/grass-lod-kit.js", "utf8");
assert.match(lod, /8000/);
assert.match(lod, /5000/);
assert.match(lod, /3000/);
assert.match(lod, /1800/);

const compute = readFileSync("src/visual/grass-field/grass-compute-culling-kit.js", "utf8");
assert.match(compute, /@compute @workgroup_size\(64\)/);
assert.match(compute, /navigator\.gpu/);
assert.match(compute, /webgpu-compute/);
assert.match(compute, /cpu-chunk-culling/);

const composer = readFileSync("src/visual/post-process/hdr-composer-kit.js", "utf8");
assert.match(composer, /exposure: 1\.0/);
assert.match(composer, /bloomEnabled: false/);
assert.match(composer, /godRaysEnabled: false/);

const water = readFileSync("src/visual/landscape/water-surface-kit.js", "utf8");
assert.match(water, /uFogColor/);
assert.match(water, /fog:\s*false/);

const harness = readFileSync("tools/headless-editor-environment.mjs", "utf8");
assert.match(harness, /renderer\.validate/);
assert.match(harness, /project\.check/);
assert.match(harness, /project\.build/);

console.log("The Open Above smooth world-space terrain and streamed grass smoke passed.");
