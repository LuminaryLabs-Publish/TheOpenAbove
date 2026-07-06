import { readFileSync, existsSync } from "node:fs";
import assert from "node:assert/strict";

const requiredFiles = [
  "index.html",
  "src/main.js",
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
assert.match(html, /The Open Above: Balloon Drift/);
assert.match(html, /hot air balloon canvas/);
assert.match(html, /src\/main\.js/);
assert.doesNotMatch(html, /bird-dive-domain-kit/);

const main = readFileSync("src/main.js", "utf8");
assert.match(main, /open-above-balloon-telemetry-kit/);
assert.match(main, /openAbove\.balloonSnapshot/);
assert.match(main, /openAbove\.balloonTicked/);
assert.match(main, /buildHotAirBalloon/);
assert.match(main, /Balloon Drift/);
assert.match(main, /wind/);
assert.match(main, /burner/);
assert.match(main, /vent/);
assert.match(main, /camera\.userData\.zoom/);
assert.match(main, /Nexus Engine Realtime Core/);
assert.doesNotMatch(main, /makeBird/);
assert.doesNotMatch(main, /leftWing/);
assert.doesNotMatch(main, /rightWing/);
assert.doesNotMatch(main, /bird\.rotation/);

const objectKit = readFileSync("src/hot-air-balloon-object-kit.js", "utf8");
assert.match(objectKit, /open-above-hot-air-balloon-object-kit/);
assert.match(objectKit, /buildHotAirBalloon/);
assert.match(objectKit, /hot-air-balloon-envelope-kit/);
assert.match(objectKit, /hot-air-balloon-basket-kit/);
assert.match(objectKit, /hot-air-balloon-rigging-kit/);
assert.match(objectKit, /hot-air-balloon-burner-kit/);

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

const config = readFileSync("src/data/campaign.config.js", "utf8");
assert.match(config, /meadow-lift/);

const vite = readFileSync("vite.config.js", "utf8");
assert.match(vite, /base:\s*"\/TheOpenAbove\/"/);

console.log("The Open Above balloon drift smoke passed.");
