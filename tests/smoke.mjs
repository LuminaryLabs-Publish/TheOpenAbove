import { readFileSync, existsSync } from "node:fs";
import assert from "node:assert/strict";

const requiredFiles = [
  "index.html",
  "src/main.js",
  "src/rope-kit.js",
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
assert.match(main, /animateHotAirBalloon/);
assert.match(main, /Balloon Drift/);
assert.match(main, /basketFocus/);
assert.match(main, /camera\.lookAt\(basketFocus\)/);
assert.match(main, /new THREE\.Vector3\(0, -5\.7, 0\)/);
assert.match(main, /balloon\.position\.set\(0, 105, 0\)/);
assert.match(main, /wind/);
assert.match(main, /burner/);
assert.match(main, /vent/);
assert.match(main, /camera\.userData\.zoom/);
assert.match(main, /Nexus Engine Realtime Core/);
assert.doesNotMatch(main, /makeBird/);
assert.doesNotMatch(main, /leftWing/);
assert.doesNotMatch(main, /rightWing/);
assert.doesNotMatch(main, /bird\.rotation/);

const ropeKit = readFileSync("src/rope-kit.js", "utf8");
assert.match(ropeKit, /open-above-rope-kit/);
assert.match(ropeKit, /segments: 10/);
assert.match(ropeKit, /buildSoftRope/);
assert.match(ropeKit, /updateSoftRope/);
assert.match(ropeKit, /startPoint/);
assert.match(ropeKit, /endPoint/);

const objectKit = readFileSync("src/hot-air-balloon-object-kit.js", "utf8");
assert.match(objectKit, /open-above-hot-air-balloon-object-kit/);
assert.match(objectKit, /buildHotAirBalloon/);
assert.match(objectKit, /animateHotAirBalloon/);
assert.match(objectKit, /hot-air-balloon-envelope-kit/);
assert.match(objectKit, /hot-air-balloon-basket-kit/);
assert.match(objectKit, /hot-air-balloon-rigging-kit/);
assert.match(objectKit, /hot-air-balloon-burner-kit/);
assert.match(objectKit, /open-above-rope-kit/);
assert.match(objectKit, /visualOffsetY: -0\.52/);

const envelopeKit = readFileSync("src/hot-air-balloon-envelope-kit.js", "utf8");
assert.match(envelopeKit, /open-above-hot-air-balloon-envelope-kit/);
assert.match(envelopeKit, /buildEnvelope/);

const basketKit = readFileSync("src/hot-air-balloon-basket-kit.js", "utf8");
assert.match(basketKit, /open-above-hot-air-balloon-basket-kit/);
assert.match(basketKit, /buildBasket/);

const riggingKit = readFileSync("src/hot-air-balloon-rigging-kit.js", "utf8");
assert.match(riggingKit, /open-above-hot-air-balloon-rigging-kit/);
assert.match(riggingKit, /buildRigging/);
assert.match(riggingKit, /buildSoftRope/);
assert.match(riggingKit, /ropeSegments: 10/);
assert.match(riggingKit, /animateRigging/);

const burnerKit = readFileSync("src/hot-air-balloon-burner-kit.js", "utf8");
assert.match(burnerKit, /open-above-hot-air-balloon-burner-kit/);
assert.match(burnerKit, /buildBurner/);
assert.match(burnerKit, /animateBurner/);

const config = readFileSync("src/data/campaign.config.js", "utf8");
assert.match(config, /meadow-lift/);

const vite = readFileSync("vite.config.js", "utf8");
assert.match(vite, /base:\s*"\/TheOpenAbove\/"/);

console.log("The Open Above balloon drift smoke passed.");
