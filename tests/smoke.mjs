import { readFileSync, existsSync } from "node:fs";
import assert from "node:assert/strict";

const requiredFiles = [
  "index.html",
  "src/main.js",
  "src/camera-kit.js",
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
assert.match(html, /src\/camera-kit\.js/);
assert.match(html, /src\/main\.js/);
assert.ok(html.indexOf("src/camera-kit.js") < html.indexOf("src/main.js"), "camera kit should load before main scene");

const main = readFileSync("src/main.js", "utf8");
assert.match(main, /window\.GameHost/);
assert.match(main, /Meadow Lift/);
assert.match(main, /requestAnimationFrame/);
assert.match(main, /LuminaryLabs-Dev\/NexusEngine/);
assert.match(main, /createRealtimeGame/);
assert.match(main, /defineRuntimeKit/);
assert.match(main, /Nexus Engine Realtime Core/);

const cameraKit = readFileSync("src/camera-kit.js", "utf8");
assert.match(cameraKit, /open-above-close-chase-camera-kit/);
assert.match(cameraKit, /CLOSE_TRAIL_DISTANCE\s*=\s*9\.6/);
assert.match(cameraKit, /CLOSE_LIFT\s*=\s*4\.2/);
assert.match(cameraKit, /PerspectiveCamera\.prototype\.lookAt/);
assert.match(cameraKit, /window\.GameHost\.camera/);

const config = readFileSync("src/data/campaign.config.js", "utf8");
assert.match(config, /meadow-lift/);
assert.match(config, /thermalTarget/);
assert.match(config, /gateTarget/);

const vite = readFileSync("vite.config.js", "utf8");
assert.match(vite, /base:\s*"\/TheOpenAbove\/"/);

console.log("The Open Above smoke passed.");
