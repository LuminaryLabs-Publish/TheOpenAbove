import { readFileSync, existsSync } from "node:fs";
import assert from "node:assert/strict";

const requiredFiles = [
  "index.html",
  "src/main.js",
  "src/bird-dive-domain-kit.js",
  "src/bird-flight-input-kit.js",
  "src/bird-flight-physics-kit.js",
  "src/bird-flight-frame-kit.js",
  "src/bird-posture-kit.js",
  "src/bird-camera-kit.js",
  "src/hot-air-balloon-object-kit.js",
  "src/hot-air-balloon-envelope-kit.js",
  "src/hot-air-balloon-basket-kit.js",
  "src/hot-air-balloon-rigging-kit.js",
  "src/hot-air-balloon-burner-kit.js",
  "src/data/campaign.config.js",
  "docs/reference/AERO_GLIDE_KIT_EXTRACTION.md",
  "docs/GAME_DESIGN.md",
  "docs/MIGRATION_FROM_EXPERIMENT.md",
  "docs/TECHNICAL_ARCHITECTURE.md",
  "docs/ROADMAP.md",
  "vite.config.js"
];

for (const file of requiredFiles) {
  assert.equal(existsSync(file), true, `${file} should exist`);
}

const html = readFileSync("index.html", "utf8");
assert.match(html, /The Open Above/);
assert.match(html, /src\/bird-dive-domain-kit\.js/);
assert.match(html, /src\/main\.js/);
assert.ok(html.indexOf("src/bird-dive-domain-kit.js") < html.indexOf("src/main.js"), "bird dive domain kit should load before main scene");

const main = readFileSync("src/main.js", "utf8");
assert.match(main, /window\.GameHost/);
assert.match(main, /Meadow Lift/);
assert.match(main, /requestAnimationFrame/);
assert.match(main, /LuminaryLabs-Dev\/NexusEngine/);
assert.match(main, /createRealtimeGame/);
assert.match(main, /defineRuntimeKit/);
assert.match(main, /Nexus Engine Realtime Core/);

const diveKit = readFileSync("src/bird-dive-domain-kit.js", "utf8");
assert.match(diveKit, /open-above-bird-dive-domain-kit/);
assert.match(diveKit, /bird-flight-input-kit\.js/);
assert.match(diveKit, /bird-flight-physics-kit\.js/);
assert.match(diveKit, /bird-flight-frame-kit\.js/);
assert.match(diveKit, /bird-posture-kit\.js/);
assert.match(diveKit, /bird-camera-kit\.js/);
assert.match(diveKit, /hot-air-balloon-object-kit\.js/);
assert.match(diveKit, /open-above-hot-air-balloon-object-kit/);

const inputKit = readFileSync("src/bird-flight-input-kit.js", "utf8");
assert.match(inputKit, /open-above-bird-flight-input-kit/);
assert.match(inputKit, /pitchInput/);
assert.match(inputKit, /rollInput/);
assert.match(inputKit, /invertPitch/);
assert.match(inputKit, /sensitivity/);
assert.match(inputKit, /touchmove/);
assert.match(inputKit, /setInputSensitivity/);

const physicsKit = readFileSync("src/bird-flight-physics-kit.js", "utf8");
assert.match(physicsKit, /open-above-bird-flight-physics-kit/);
assert.match(physicsKit, /pitch/);
assert.match(physicsKit, /yaw/);
assert.match(physicsKit, /roll/);
assert.match(physicsKit, /verticalSpeed/);
assert.match(physicsKit, /diveIntensity/);
assert.match(physicsKit, /wingTuck/);
assert.match(physicsKit, /angleOfAttack/);
assert.match(physicsKit, /liftMultiplier/);
assert.match(physicsKit, /dragMultiplier/);
assert.match(physicsKit, /turnStiffness/);
assert.match(physicsKit, /pulloutLoad/);
assert.match(physicsKit, /cameraShakeHint/);

const frameKit = readFileSync("src/bird-flight-frame-kit.js", "utf8");
assert.match(frameKit, /open-above-bird-flight-frame-kit/);
assert.match(frameKit, /createFlightFrame/);
assert.match(frameKit, /forward/);
assert.match(frameKit, /right/);
assert.match(frameKit, /up/);
assert.match(frameKit, /meshNoseAxis/);

const postureKit = readFileSync("src/bird-posture-kit.js", "utf8");
assert.match(postureKit, /open-above-bird-posture-kit/);
assert.match(postureKit, /applyFrameRotation/);
assert.match(postureKit, /frame\?\.rotation/);
assert.match(postureKit, /wingTuck/);
assert.match(postureKit, /WebGLRenderer\.prototype\.render/);

const cameraKit = readFileSync("src/bird-camera-kit.js", "utf8");
assert.match(cameraKit, /open-above-bird-camera-kit/);
assert.match(cameraKit, /PerspectiveCamera\.prototype\.lookAt/);
assert.match(cameraKit, /frame\?\.forward/);
assert.match(cameraKit, /frame\?\.up/);
assert.match(cameraKit, /diveLift/);
assert.match(cameraKit, /diveLookAhead/);

const objectKit = readFileSync("src/hot-air-balloon-object-kit.js", "utf8");
assert.match(objectKit, /open-above-hot-air-balloon-object-kit/);
assert.match(objectKit, /buildHotAirBalloon/);
assert.match(objectKit, /installHotAirBalloonVisual/);
assert.match(objectKit, /hot-air-balloon-envelope-kit/);
assert.match(objectKit, /hot-air-balloon-basket-kit/);
assert.match(objectKit, /hot-air-balloon-rigging-kit/);
assert.match(objectKit, /hot-air-balloon-burner-kit/);
assert.match(objectKit, /hotAirBalloonInstalled/);

const envelopeKit = readFileSync("src/hot-air-balloon-envelope-kit.js", "utf8");
assert.match(envelopeKit, /open-above-hot-air-balloon-envelope-kit/);
assert.match(envelopeKit, /buildEnvelope/);

const basketKit = readFileSync("src/hot-air-balloon-basket-kit.js", "utf8");
assert.match(basketKit, /open-above-hot-air-balloon-basket-kit/);
assert.match(basketKit, /buildBasket/);

const riggingKit = readFileSync("src/hot-air-balloon-rigging-kit.js", "utf8");
assert.match(riggingKit, /open-above-hot-air-balloon-rigging-kit/);
assert.match(riggingKit, /buildRigging/);

const burnerKit = readFileSync("src/hot-air-balloon-burner-kit.js", "utf8");
assert.match(burnerKit, /open-above-hot-air-balloon-burner-kit/);
assert.match(burnerKit, /buildBurner/);
assert.match(burnerKit, /animateBurner/);

const extractionDoc = readFileSync("docs/reference/AERO_GLIDE_KIT_EXTRACTION.md", "utf8");
assert.match(extractionDoc, /Aero-Glide Kit Extraction Reference/);
assert.match(extractionDoc, /bird-flight-input-kit/);
assert.match(extractionDoc, /bird-flight-physics-kit/);
assert.match(extractionDoc, /bird-posture-kit/);
assert.match(extractionDoc, /bird-camera-kit/);

const config = readFileSync("src/data/campaign.config.js", "utf8");
assert.match(config, /meadow-lift/);
assert.match(config, /thermalTarget/);
assert.match(config, /gateTarget/);

const vite = readFileSync("vite.config.js", "utf8");
assert.match(vite, /base:\s*"\/TheOpenAbove\/"/);

console.log("The Open Above smoke passed.");
