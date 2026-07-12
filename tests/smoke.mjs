import { readFileSync, existsSync } from "node:fs";
import assert from "node:assert/strict";
import "./airstream-mail.mjs";
import "./balloon-profile.mjs";

const requiredFiles = [
  "index.html",
  "src/main.js",
  "src/ui/parchment-map-overlay.js",
  "src/data/campaign.config.js",
  "src/balloon-envelope-profile-kit.js",
  "src/balloon-envelope-panel-kit.js",
  "src/balloon-mouth-kit.js",
  "src/balloon-streamer-fit-kit.js",
  "src/balloon-fabric-seam-kit.js",
  "src/hot-air-balloon-basket-kit.js",
  "src/hot-air-balloon-rigging-kit.js",
  "src/hot-air-balloon-burner-kit.js",
  "src/hot-air-balloon-object-kit.js",
  "src/rope-kit.js",
  "src/runtime/balloon-simulation-kit.js",
  "src/runtime/balloon-telemetry-kit.js",
  "src/runtime/airstream-domain/index.js",
  "src/runtime/airstream-domain/airstream-domain.js",
  "src/runtime/airstream-domain/airstream-field-kit.js",
  "src/runtime/airstream-domain/airstream-route-kit.js",
  "src/runtime/airstream-domain/airstream-sampler-kit.js",
  "src/runtime/airstream-domain/airstream-balloon-force-kit.js",
  "src/runtime/airstream-domain/airstream-visual-kit.js",
  "src/runtime/airstream-domain/airstream-debug-kit.js",
  "src/gameplay/mail-delivery-domain/index.js",
  "src/gameplay/mail-delivery-domain/mail-delivery-domain.js",
  "src/gameplay/mail-delivery-domain/mail-parcel-kit.js",
  "src/gameplay/mail-delivery-domain/mail-town-kit.js",
  "src/gameplay/mail-delivery-domain/mail-route-kit.js",
  "src/gameplay/mail-delivery-domain/delivery-volume-kit.js",
  "src/gameplay/mail-delivery-domain/delivery-progress-kit.js",
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
  "src/visual/landscape/terrain-horizon-streaming-kit.js",
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
  "tests/balloon-profile.mjs",
  "tools/headless-editor-environment.mjs",
  "vite.config.js"
];
for (const file of requiredFiles) assert.equal(existsSync(file), true, `${file} should exist`);

const index = readFileSync("index.html", "utf8");
assert.doesNotMatch(index, /class="hud"/);
assert.doesNotMatch(index, /id="hud"/);
assert.match(index, /id="mapOverlay"/);
assert.match(index, /id="mapCanvas"/);
assert.match(index, /map-scroll/);
assert.match(index, /88dvh/);

const main = readFileSync("src/main.js", "utf8");
assert.match(main, /loadHotAirBalloonModel/);
assert.match(main, /await loadHotAirBalloonModel/);
assert.match(main, /loadedDuringLevelSetup/);
assert.match(main, /persistentGpuResources/);
assert.match(main, /balloonPresentation\.update\(state\)/);
assert.match(main, /createParchmentMapOverlay/);
assert.match(main, /mapOverlay\.isOpen\(\)/);
assert.match(main, /mapOverlay\.snapshot\(\)/);
assert.doesNotMatch(main, /updateHud/);
assert.doesNotMatch(main, /querySelector\("#hud"\)/);
assert.match(main, /Math\.max\(0, Math\.min\(80, now - last \|\| 16\.7\)\)/);
assert.doesNotMatch(main, /renderer\.render\(/);

const mapOverlay = readFileSync("src/ui/parchment-map-overlay.js", "utf8");
assert.match(mapOverlay, /event\.code === "KeyM"/);
assert.match(mapOverlay, /event\.code === "Escape"/);
assert.match(mapOverlay, /root\.classList\.toggle\("is-open", open\)/);
assert.match(mapOverlay, /drawRoute/);
assert.match(mapOverlay, /drawTown/);
assert.match(mapOverlay, /drawPlayer/);
assert.match(mapOverlay, /MAIL DESTINATION/);
assert.match(mapOverlay, /ResizeObserver/);

const profile = readFileSync("src/balloon-envelope-profile-kit.js", "utf8");
assert.match(profile, /sampleEnvelopeRadius/);
assert.match(profile, /sampleEnvelopePoint/);
assert.match(profile, /sampleEnvelopeNormal/);
assert.match(profile, /maxRadius: 2\.25/);
assert.match(profile, /height: 6\.2/);

const envelope = readFileSync("src/balloon-envelope-panel-kit.js", "utf8");
assert.match(envelope, /goreCount: 24/);
assert.match(envelope, /verticalSteps: 32/);
assert.match(envelope, /balloon-envelope-unified-gore-shell/);
assert.match(envelope, /vertexColors: true/);
assert.match(envelope, /sampleEnvelopeNormal/);
assert.match(envelope, /balloon-parachute-valve-cap/);
assert.doesNotMatch(envelope, /balloon-envelope-gore-\$\{gore\}/);

const streamers = readFileSync("src/balloon-streamer-fit-kit.js", "utf8");
assert.match(streamers, /integratedIntoEnvelope = true/);
assert.doesNotMatch(streamers, /new THREE\.Mesh\(/);

const seams = readFileSync("src/balloon-fabric-seam-kit.js", "utf8");
assert.match(seams, /sampleEnvelopePoint/);
assert.match(seams, /balloon-unified-load-tape-mesh/);
assert.match(seams, /sharedEnvelopeProfile = true/);

const mouth = readFileSync("src/balloon-mouth-kit.js", "utf8");
assert.match(mouth, /radius: 0\.78/);
assert.match(mouth, /scoopDepth: 0\.1/);
assert.match(mouth, /emissiveIntensity: 0\.18/);

const basket = readFileSync("src/hot-air-balloon-basket-kit.js", "utf8");
assert.match(basket, /new THREE\.CylinderGeometry\(p\.topRadius, p\.bottomRadius/);
assert.match(basket, /basket-woven-tapered-shell/);
assert.match(basket, /basket-propane-cylinder/);
assert.match(basket, /width: 1\.55/);
assert.match(basket, /height: 1\.05/);

const rigging = readFileSync("src/hot-air-balloon-rigging-kit.js", "utf8");
assert.match(rigging, /burner-frame-post/);
assert.match(rigging, /burner-frame-crossbar/);
assert.match(rigging, /radius: 0\.022/);
assert.match(rigging, /stripeEvery: 1000/);

const burner = readFileSync("src/hot-air-balloon-burner-kit.js", "utf8");
assert.match(burner, /balloon-twin-burner-head/);
assert.match(burner, /balloon-burner-fuel-hose/);
assert.match(burner, /flames\.forEach/);

const objectKit = readFileSync("src/hot-air-balloon-object-kit.js", "utf8");
assert.match(objectKit, /balloon-envelope-inertia-pivot/);
assert.match(objectKit, /balloon-gondola-pendulum-pivot/);
assert.match(objectKit, /export async function loadHotAirBalloonModel/);
assert.match(objectKit, /loadedDuringLevelSetup = true/);
assert.match(objectKit, /persistentGpuResources = true/);
assert.match(objectKit, /scale: 2\.08/);

const rope = readFileSync("src/rope-kit.js", "utf8");
assert.match(rope, /DynamicDrawUsage/);
assert.match(rope, /persistentGeometry = true/);
assert.match(rope, /updateTubeGeometry/);
assert.doesNotMatch(rope, /core\.geometry\.dispose/);

const simulation = readFileSync("src/runtime/balloon-simulation-kit.js", "utf8");
assert.match(simulation, /keys\.has\("KeyA"\)/);
assert.match(simulation, /keys\.has\("KeyD"\)/);
assert.match(simulation, /lateralTrim/);
assert.match(simulation, /visualBank/);
assert.match(simulation, /trimTarget = state\.steeringInput \* 3\.6/);
assert.match(simulation, /targetBank = -state\.steeringInput \* THREE\.MathUtils\.degToRad\(6\.5\)/);
assert.match(simulation, /state\.wind\.addScaledVector\(rightVector, state\.lateralTrim\)/);

const presentation = readFileSync("src/visual/balloon-presentation/balloon-presentation-domain.js", "utf8");
assert.match(presentation, /envelopePivot/);
assert.match(presentation, /gondolaPivot/);
assert.match(presentation, /lateralAcceleration/);
assert.match(presentation, /innerMaterial\.emissiveIntensity/);

const camera = readFileSync("src/visual/camera-presentation/balloon-camera-rig-kit.js", "utf8");
assert.match(camera, /steeringLook/);
assert.match(camera, /flightState\.steeringInput/);
assert.match(camera, /addScaledVector\(side, state\.steeringLook \* 1\.6\)/);

const clouds = readFileSync("src/visual/atmosphere/volumetric-cloud-kit.js", "utf8");
assert.match(clouds, /base \* 0\.92 \+ detail \* 0\.08/);
assert.match(clouds, /hash21\(gl_FragCoord\.xy\)/);
assert.doesNotMatch(clouds, /hash21\(gl_FragCoord\.xy \+ uTime\)/);

const grassDomain = readFileSync("src/visual/grass-field/grass-field-domain.js", "utf8");
assert.match(grassDomain, /varying vec2 vGrassUv/);
assert.match(grassDomain, /vGrassUv = uv/);
assert.doesNotMatch(grassDomain, /vUv\.[xy]/);

const terrain = readFileSync("src/visual/landscape/terrain-surface-kit.js", "utf8");
assert.match(terrain, /createDiskWorldSurface/);
assert.match(terrain, /boundedTerrainHeight/);
assert.match(terrain, /worldSurface\.edgeMask/);
assert.match(terrain, /createTerrainChunkStreamer/);
assert.match(terrain, /createTerrainHorizonStreamer/);
assert.doesNotMatch(terrain, /DataTexture/);

const harness = readFileSync("tools/headless-editor-environment.mjs", "utf8");
assert.match(harness, /renderer\.validate/);
assert.match(harness, /project\.check/);
assert.match(harness, /project\.build/);

console.log("The Open Above balloon model, steering, parchment map, and visual smoke passed.");
