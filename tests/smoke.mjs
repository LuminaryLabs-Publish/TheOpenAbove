import { readFileSync, existsSync } from "node:fs";
import assert from "node:assert/strict";

const requiredFiles = [
  "index.html",
  "src/main.js",
  "src/data/campaign.config.js",
  "docs/GAME_DESIGN.md",
  "docs/MIGRATION_FROM_EXPERIMENT.md",
  "docs/TECHNICAL_ARCHITECTURE.md",
  "docs/ROADMAP.md"
];

for (const file of requiredFiles) {
  assert.equal(existsSync(file), true, `${file} should exist`);
}

const html = readFileSync("index.html", "utf8");
assert.match(html, /The Open Above/);
assert.match(html, /src\/main\.js/);

const main = readFileSync("src/main.js", "utf8");
assert.match(main, /window\.GameHost/);
assert.match(main, /Meadow Lift/);
assert.match(main, /requestAnimationFrame/);

const config = readFileSync("src/data/campaign.config.js", "utf8");
assert.match(config, /meadow-lift/);
assert.match(config, /thermalTarget/);
assert.match(config, /gateTarget/);

console.log("The Open Above smoke passed.");
