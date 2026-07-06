import { readFileSync, existsSync } from "node:fs";
import assert from "node:assert/strict";

const requiredFiles = [
  "index.html",
  "src/main.js",
  "src/bird-dive-domain-kit.js",
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
assert.match(diveKit, /diveIntensity/);
assert.match(diveKit, /wingTuck/);
assert.match(diveKit, /angleOfAttack/);
assert.match(diveKit, /liftMultiplier/);
assert.match(diveKit, /dragMultiplier/);
assert.match(diveKit, /turnStiffness/);
assert.match(diveKit, /pulloutLoad/);
assert.match(diveKit, /cameraShakeHint/);
assert.match(diveKit, /PerspectiveCamera\.prototype\.lookAt/);
assert.match(diveKit, /OpenAboveBirdDiveDomainKit/);

const config = readFileSync("src/data/campaign.config.js", "utf8");
assert.match(config, /meadow-lift/);
assert.match(config, /thermalTarget/);
assert.match(config, /gateTarget/);

const vite = readFileSync("vite.config.js", "utf8");
assert.match(vite, /base:\s*"\/TheOpenAbove\/"/);

console.log("The Open Above smoke passed.");
