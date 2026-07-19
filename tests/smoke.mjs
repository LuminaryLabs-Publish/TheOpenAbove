import { readFileSync, existsSync } from "node:fs";
import assert from "node:assert/strict";
import "./airstream-mail.mjs";
import "./balloon-profile.mjs";
import "./world-generation.mjs";
import "./grass-field.mjs";
import "./flower-field.mjs";
import "./semantic-domain-composition.mjs";

const requiredFiles = [
  "index.html",
  "src/main.js",
  "src/scenes/meadow-lift-scene.js",
  "src/domains/index.js",
  "src/domains/README.md",
  "src/domains/journey/journey-domain.js",
  "src/domains/ballooning/ballooning-domain.js",
  "src/domains/sky/sky-domain.js",
  "src/domains/land/land-domain.js",
  "src/domains/navigation/navigation-domain.js",
  "src/domains/image-capture/image-capture-domain.js",
  "src/domains/experience/experience-domain.js",
  "src/ui/parchment-map-overlay.js",
  "src/data/campaign.config.js",
  "src/world/world-generation-kit.js",
  "src/world/world-generation-support.js",
  "src/hot-air-balloon-object-kit.js",
  "src/runtime/balloon-simulation-kit.js",
  "src/runtime/balloon-telemetry-kit.js",
  "src/runtime/airstream-domain/index.js",
  "src/visual/visual-domain.js",
  "src/visual/atmosphere/volumetric-cloud-kit.js",
  "src/visual/grass-field/grass-field-domain.js",
  "src/visual/flower-field/flower-field-domain.js",
  "src/visual/landscape/terrain-surface-kit.js",
  "src/visual/balloon-presentation/balloon-presentation-domain.js",
  "src/visual/camera-presentation/balloon-camera-rig-kit.js",
  "tests/semantic-domain-composition.mjs",
  "tests/startup-loading.mjs",
  "tools/headless-editor-environment.mjs",
  "vite.config.js"
];
for (const file of requiredFiles) assert.equal(existsSync(file), true, `${file} should exist`);

const index = readFileSync("index.html", "utf8");
assert.doesNotMatch(index, /class="hud"|id="hud"/);
assert.match(index, /id="startupLoader"/);
assert.match(index, /id="startupProgressFill"/);
assert.match(index, /id="mapOverlay"/);
assert.match(index, /id="mapCanvas"/);
assert.match(index, /map-scroll/);

const main = readFileSync("src/main.js", "utf8");
assert.match(main, /createMeadowLiftScene/);
assert.match(main, /startupElements/);
assert.match(main, /window\.GameHost = scene\.gameHost/);
assert.doesNotMatch(main, /createBalloonSimulation|createParchmentMapOverlay|createVisualDomain|requestAnimationFrame/);
assert.doesNotMatch(main, /renderer\.render\(/);

const scene = readFileSync("src/scenes/meadow-lift-scene.js", "utf8");
for (const factory of [
  "createJourneyDomain",
  "createBallooningDomain",
  "createSkyDomain",
  "createLandDomain",
  "createNavigationDomain",
  "createImageCaptureDomain",
  "createExperienceWorldPreparation",
  "createExperienceDomain"
]) assert.match(scene, new RegExp(factory));
assert.match(scene, /coreStartup/);
assert.match(scene, /startup\.presentFirstFrame/);
assert.match(scene, /startup\.enter/);
assert.match(scene, /await advanceGeneratedWorld/);
assert.match(scene, /worldPreparation\.finalize/);
assert.match(scene, /domains = Object\.freeze/);
assert.match(scene, /journey\.start/);
assert.match(scene, /modelSnapshot/);

const journey = readFileSync("src/domains/journey/journey-domain.js", "utf8");
assert.match(journey, /status: "booting"/);
assert.match(journey, /state\.mapOpen \? 0 : dt/);
assert.match(journey, /Math\.max\(0, Math\.min\(80, now - lastFrameTime \|\| 16\.7\)\)/);
assert.match(journey, /requestAnimationFrame/);

const ballooning = readFileSync("src/domains/ballooning/ballooning-domain.js", "utf8");
assert.match(ballooning, /loadHotAirBalloonModel/);
assert.match(ballooning, /createBalloonSimulation/);
assert.match(ballooning, /animateHotAirBalloon/);
assert.match(ballooning, /modelSnapshot/);

const sky = readFileSync("src/domains/sky/sky-domain.js", "utf8");
assert.match(sky, /createAirstreamDomain/);
assert.match(sky, /createWindParticleField/);
assert.match(sky, /layeredWeather/);
assert.match(sky, /weatherSnapshot/);

const land = readFileSync("src/domains/land/land-domain.js", "utf8");
assert.match(land, /worldAnchors/);
assert.match(land, /nearChunks/);
assert.match(land, /generationState/);

const navigation = readFileSync("src/domains/navigation/navigation-domain.js", "utf8");
assert.match(navigation, /createParchmentMapOverlay/);
assert.match(navigation, /isMapOpen/);
assert.match(navigation, /snapshot/);

const imageCapture = readFileSync("src/domains/image-capture/image-capture-domain.js", "utf8");
assert.match(imageCapture, /snapPoints/);
assert.match(imageCapture, /requestCapture/);
assert.match(imageCapture, /cameraMode/);

const experience = readFileSync("src/domains/experience/experience-domain.js", "utf8");
assert.match(experience, /createVisualWorldPreparation/);
assert.match(experience, /createExperienceWorldPreparation/);
assert.match(experience, /preparedWorld/);
assert.match(experience, /createBalloonCameraRig/);
assert.match(experience, /createBalloonPresentationDomain/);
assert.match(experience, /balloonPresentation\?\.update/);

const mapOverlay = readFileSync("src/ui/parchment-map-overlay.js", "utf8");
assert.match(mapOverlay, /event\.code === "KeyM"/);
assert.match(mapOverlay, /event\.code === "Escape"/);
assert.match(mapOverlay, /createWorldMapCanvas/);
assert.match(mapOverlay, /sampleMapColor/);
assert.match(mapOverlay, /drawRoute/);
assert.match(mapOverlay, /drawSnapPoint/);
assert.match(mapOverlay, /drawReferenceCard/);
assert.match(mapOverlay, /SIGHTSEEING JOURNAL/);

const objectKit = readFileSync("src/hot-air-balloon-object-kit.js", "utf8");
assert.match(objectKit, /export async function loadHotAirBalloonModel/);
assert.match(objectKit, /loadedDuringLevelSetup = true/);
assert.match(objectKit, /persistentGpuResources = true/);

const simulation = readFileSync("src/runtime/balloon-simulation-kit.js", "utf8");
assert.match(simulation, /keys\.has\("KeyA"\)/);
assert.match(simulation, /keys\.has\("KeyD"\)/);
assert.match(simulation, /createWindRelativeSteering/);
assert.match(simulation, /state\.wind\.set\(resolved\.velocityX/);
assert.match(simulation, /visualBank/);

const telemetry = readFileSync("src/runtime/balloon-telemetry-kit.js", "utf8");
assert.match(telemetry, /createCoreStartupDomain/);
assert.match(telemetry, /\.\.\.startupKits/);

const presentation = readFileSync("src/visual/balloon-presentation/balloon-presentation-domain.js", "utf8");
assert.match(presentation, /envelopePivot/);
assert.match(presentation, /gondolaPivot/);
assert.match(presentation, /lateralAcceleration/);

const camera = readFileSync("src/visual/camera-presentation/balloon-camera-rig-kit.js", "utf8");
assert.match(camera, /steeringLook/);
assert.match(camera, /flightState\.steeringInput/);
assert.match(camera, /lastLookInputAt/);

const clouds = readFileSync("src/visual/atmosphere/volumetric-cloud-kit.js", "utf8");
assert.match(clouds, /hash21\(gl_FragCoord\.xy \+ float\(layerIndex\) \* 19\.0\)/);
assert.doesNotMatch(clouds, /hash21\([^)]*uTime/);

const visualDomain = readFileSync("src/visual/visual-domain.js", "utf8");
assert.match(visualDomain, /createVisualWorldPreparation/);
assert.match(visualDomain, /preparedWorld \?\? createWorldFeatureFoundation/);
assert.match(visualDomain, /createFlowerFieldDomain/);
assert.match(visualDomain, /worldAnchors/);

const worldGeneration = readFileSync("src/world/world-generation-kit.js", "utf8");
const worldGenerationSupport = readFileSync("src/world/world-generation-support.js", "utf8");
assert.match(worldGenerationSupport, /WORLD_GRID_SIZE = 257/);
assert.match(worldGenerationSupport, /WORLD_FEATURE_CELL_SIZE = 2080/);
assert.match(worldGeneration, /sampleHeight/);
assert.match(worldGeneration, /sampleFlora/);
assert.match(worldGeneration, /sampleMapColor/);
assert.match(worldGeneration, /protectionAt/);

const grassDomain = readFileSync("src/visual/grass-field/grass-field-domain.js", "utf8");
assert.match(grassDomain, /createGrassTextureAtlas/);
assert.match(grassDomain, /GRASS_FADE_START/);
assert.match(grassDomain, /alphaToCoverage: true/);

const flowerDomain = readFileSync("src/visual/flower-field/flower-field-domain.js", "utf8");
assert.match(flowerDomain, /createFlowerTextureAtlas/);
assert.match(flowerDomain, /FLOWER_FADE_START/);
assert.match(flowerDomain, /alphaToCoverage: true/);

const terrain = readFileSync("src/visual/landscape/terrain-surface-kit.js", "utf8");
assert.match(terrain, /createDiskWorldSurface/);
assert.match(terrain, /createTerrainChunkStreamer/);
assert.match(terrain, /createTerrainHorizonStreamer/);

const harness = readFileSync("tools/headless-editor-environment.mjs", "utf8");
assert.match(harness, /renderer\.validate/);
assert.match(harness, /project\.check/);
assert.match(harness, /project\.build/);

console.log("The Open Above startup, semantic-domain, balloon, world, map, weather, and visual smoke passed.");
