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
  "src/visual/illumination/cloud-shadow-kit.js",
  "src/visual/atmosphere/cloud-weather-map-kit.js",
  "src/visual/atmosphere/cloud-lighting-kit.js",
  "src/visual/atmosphere/cloud-lod-kit.js",
  "src/visual/atmosphere/volumetric-cloud-kit.js",
  "src/visual/post-process/hdr-composer-kit.js",
  "src/visual/post-process/auto-exposure-kit.js",
  "src/visual/post-process/bloom-kit.js",
  "src/visual/post-process/god-ray-kit.js",
  "src/visual/post-process/color-grade-kit.js",
  "src/visual/landscape/terrain-surface-kit.js",
  "src/visual/landscape/vegetation-cluster-kit.js",
  "src/visual/landscape/grass-detail-kit.js",
  "src/visual/landscape/water-surface-kit.js",
  "src/visual/landscape/distant-landmark-kit.js",
  "src/visual/balloon-presentation/envelope-fabric-material-kit.js",
  "src/visual/balloon-presentation/basket-material-kit.js",
  "src/visual/balloon-presentation/rope-material-kit.js",
  "src/visual/balloon-presentation/burner-illumination-kit.js",
  "src/visual/balloon-presentation/balloon-presentation-domain.js",
  "src/visual/camera-presentation/balloon-camera-rig-kit.js",
  "src/visual/camera-presentation/lens-response-kit.js",
  "src/visual/camera-presentation/clipping-fade-kit.js",
  "src/hot-air-balloon-object-kit.js",
  "vite.config.js"
];

for (const file of requiredFiles) assert.equal(existsSync(file), true, `${file} should exist`);

const html = readFileSync("index.html", "utf8");
assert.match(html, /type="importmap"/);
assert.match(html, /three\/addons\//);
assert.match(html, /cinematic hot air balloon canvas/);
assert.match(html, /src\/main\.js/);

const main = readFileSync("src/main.js", "utf8");
assert.match(main, /createVisualDomain/);
assert.match(main, /createBalloonSimulation/);
assert.match(main, /createBalloonTelemetryEngine/);
assert.match(main, /createBalloonCameraRig/);
assert.match(main, /createBalloonPresentationDomain/);
assert.match(main, /visual\.render/);
assert.match(main, /Nexus Engine Realtime Core/);
assert.doesNotMatch(main, /function makeTerrain/);
assert.doesNotMatch(main, /function makeClouds/);
assert.doesNotMatch(main, /renderer\.render\(/);

const visual = readFileSync("src/visual/visual-domain.js", "utf8");
for (const token of [
  "createPhysicalSky",
  "createSunLight",
  "createAerialPerspective",
  "createVolumetricClouds",
  "createCloudShadowOverlay",
  "createTerrainSurface",
  "createVegetationClusters",
  "createGrassDetail",
  "createWaterSurfaces",
  "createDistantLandmarks",
  "createHdrComposer",
  "createLensResponse",
  "createDynamicResolutionController"
]) assert.match(visual, new RegExp(token));

const composer = readFileSync("src/visual/post-process/hdr-composer-kit.js", "utf8");
assert.match(composer, /HalfFloatType/);
assert.match(composer, /DepthTexture/);
assert.match(composer, /EffectComposer/);
assert.match(composer, /createAutoExposureKit/);
assert.match(composer, /createGodRayKit/);
assert.match(composer, /createBloomKit/);
assert.match(composer, /createColorGradeKit/);

const exposure = readFileSync("src/visual/post-process/auto-exposure-kit.js", "utf8");
assert.match(exposure, /readRenderTargetPixels/);
assert.match(exposure, /averageLuminance/);
assert.match(exposure, /targetExposure/);
assert.match(exposure, /adaptationRate/);

const rays = readFileSync("src/visual/post-process/god-ray-kit.js", "utf8");
assert.match(rays, /tDepth/);
assert.match(rays, /uSunScreen/);
assert.match(rays, /skyVisibility/);
assert.match(rays, /uSamples/);

const sky = readFileSync("src/visual/illumination/physical-sky-kit.js", "utf8");
assert.match(sky, /phaseRayleigh/);
assert.match(sky, /phaseMie/);
assert.match(sky, /sunDisc/);

const clouds = readFileSync("src/visual/atmosphere/volumetric-cloud-kit.js", "utf8");
assert.match(clouds, /cloudDensity/);
assert.match(clouds, /lightTransmittance/);
assert.match(clouds, /uSteps/);
assert.match(clouds, /uLightSteps/);
assert.doesNotMatch(clouds, /SphereGeometry\(1/);

const shadows = readFileSync("src/visual/illumination/cloud-shadow-kit.js", "utf8");
assert.match(shadows, /moving-cloud-shadows/);
assert.match(shadows, /MultiplyBlending/);

const terrain = readFileSync("src/visual/landscape/terrain-surface-kit.js", "utf8");
assert.match(terrain, /normalMap/);
assert.match(terrain, /terrainColor/);
assert.match(terrain, /moistureAt/);
assert.match(terrain, /computeVertexNormals/);

const vegetation = readFileSync("src/visual/landscape/vegetation-cluster-kit.js", "utf8");
assert.match(vegetation, /InstancedMesh/);
assert.match(vegetation, /clusters/);

const grass = readFileSync("src/visual/landscape/grass-detail-kit.js", "utf8");
assert.match(grass, /InstancedMesh/);
assert.match(grass, /uGrassTime/);

const water = readFileSync("src/visual/landscape/water-surface-kit.js", "utf8");
assert.match(water, /fresnel/);
assert.match(water, /sunGlint/);

const camera = readFileSync("src/visual/camera-presentation/balloon-camera-rig-kit.js", "utf8");
assert.match(camera, /riderEyeY/);
assert.match(camera, /riderEyeWorld/);
assert.match(camera, /firstPersonBlend/);
assert.match(camera, /basket-view/);

const balloon = readFileSync("src/visual/balloon-presentation/balloon-presentation-domain.js", "utf8");
assert.match(balloon, /installEnvelopeFabricMaterials/);
assert.match(balloon, /installBasketMaterials/);
assert.match(balloon, /installRopeMaterials/);
assert.match(balloon, /installBurnerIllumination/);

const quality = readFileSync("src/visual/quality-tier-kit.js", "utf8");
assert.match(quality, /high/);
assert.match(quality, /medium/);
assert.match(quality, /low/);
assert.match(quality, /dynamicScale/);
assert.match(quality, /setPixelRatio/);

console.log("The Open Above cinematic visual-domain smoke passed.");
