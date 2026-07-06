import { readFileSync, existsSync } from "node:fs";
import assert from "node:assert/strict";

const requiredFiles = [
  "index.html",
  "src/main.js",
  "src/bird-dive-domain-kit.js",
  "src/bird-flight-physics-kit.js",
  "src/bird-posture-kit.js",
  "src/bird-camera-kit.js",
  "src/data/campaign.config.js",
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
assert.match(diveKit, /bird-flight-physics-kit\.js/);
assert.match(diveKit, /bird-posture-kit\.js/);
assert.match(diveKit, /bird-camera-kit\.js/);

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

const postureKit = readFileSync("src/bird-posture-kit.js", "utf8");
assert.match(postureKit, /open-above-bird-posture-kit/);
assert.match(postureKit, /bird\.rotation\.set\(physics\.pitch/);
assert.match(postureKit, /wingTuck/);
assert.match(postureKit, /WebGLRenderer\.prototype\.render/);

const cameraKit = readFileSync("src/bird-camera-kit.js", "utf8");
assert.match(cameraKit, /open-above-bird-camera-kit/);
assert.match(cameraKit, /PerspectiveCamera\.prototype\.lookAt/);
assert.match(cameraKit, /diveLift/);
assert.match(cameraKit, /diveLookAhead/);

const config = readFileSync("src/data/campaign.config.js", "utf8");
assert.match(config, /meadow-lift/);
assert.match(config, /thermalTarget/);
assert.match(config, /gateTarget/);

const vite = readFileSync("vite.config.js", "utf8");
assert.match(vite, /base:\s*"\/TheOpenAbove\/"/);

console.log("The Open Above smoke passed.");
