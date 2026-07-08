import { readFileSync, existsSync } from "node:fs";
import assert from "node:assert/strict";

const requiredFiles = [
  "index.html",
  "src/main.js",
  "src/rope-kit.js",
  "src/balloon-envelope-panel-kit.js",
  "src/balloon-mouth-kit.js",
  "src/balloon-streamer-fit-kit.js",
  "src/balloon-fabric-seam-kit.js",
  "src/hot-air-balloon-object-kit.js",
  "src/hot-air-balloon-basket-kit.js",
  "src/hot-air-balloon-rigging-kit.js",
  "src/hot-air-balloon-burner-kit.js",
  "src/data/campaign.config.js",
  "vite.config.js"
];

for (const file of requiredFiles) {
  assert.equal(existsSync(file), true, `${file} should exist`);
}

const html = readFileSync("index.html", "utf8");
assert.match(html, /The Open Above: Balloon Drift/);
assert.match(html, /src\/main\.js/);
assert.doesNotMatch(html, /bird-dive-domain-kit/);

const main = readFileSync("src/main.js", "utf8");
assert.match(main, /open-above-balloon-telemetry-kit/);
assert.match(main, /animateHotAirBalloon\(balloon, performance\.now\(\), state\.burner\)/);
assert.match(main, /firstPersonBlend/);
assert.match(main, /firstPersonPos/);
assert.match(main, /firstPersonLook/);
assert.match(main, /setFirstPersonVisibility/);
assert.match(main, /setMaterialOpacity/);
assert.match(main, /parts\.envelope\.visible = true/);
assert.match(main, /ropeFade/);
assert.match(main, /rideBob/);
assert.match(main, /rideSway/);
assert.match(main, /burnerVibration/);
assert.match(main, /new THREE\.Vector3\(0, -3\.72/);
assert.match(main, /basket view/);
assert.match(main, /cameraZoom/);
assert.match(main, /Nexus Engine Realtime Core/);
assert.doesNotMatch(main, /makeBird/);
assert.doesNotMatch(main, /bird\.rotation/);

const basketKit = readFileSync("src/hot-air-balloon-basket-kit.js", "utf8");
assert.match(basketKit, /eyeHeightMeters: 1\.5/);
assert.match(basketKit, /basket-floor-plank/);
assert.match(basketKit, /basket-burner-controls/);
assert.match(basketKit, /basket-sandbag/);
assert.match(basketKit, /basket-folded-blanket/);
assert.match(basketKit, /basket-lantern/);
assert.match(basketKit, /riderEyeY/);

const burnerKit = readFileSync("src/hot-air-balloon-burner-kit.js", "utf8");
assert.match(burnerKit, /basket-warmth-light/);
assert.match(burnerKit, /heatLevel/);
assert.match(burnerKit, /animateBurner/);

const objectKit = readFileSync("src/hot-air-balloon-object-kit.js", "utf8");
assert.match(objectKit, /animateHotAirBalloon\(balloon, time = performance\.now\(\), burnerHeat = 0\.18\)/);
assert.match(objectKit, /animateBurner\(parts\.burner, time, burnerHeat\)/);
assert.match(objectKit, /buildEnvelopePanels/);
assert.match(objectKit, /buildBalloonMouth/);
assert.match(objectKit, /buildFittedStreamers/);
assert.match(objectKit, /buildFabricSeams/);

const ropeKit = readFileSync("src/rope-kit.js", "utf8");
assert.match(ropeKit, /open-above-rope-kit/);
assert.match(ropeKit, /makeTubeGeometry/);
assert.match(ropeKit, /open-above-rope-core-tube/);
assert.match(ropeKit, /open-above-rope-grey-stripe/);
assert.doesNotMatch(ropeKit, /LineBasicMaterial/);

const riggingKit = readFileSync("src/hot-air-balloon-rigging-kit.js", "utf8");
assert.match(riggingKit, /topRadius: 0\.88/);
assert.match(riggingKit, /topY: 0\.86/);
assert.match(riggingKit, /hot-air-balloon-inner-suspension-ring/);

const panelKit = readFileSync("src/balloon-envelope-panel-kit.js", "utf8");
assert.match(panelKit, /triangulated/);
assert.doesNotMatch(panelKit, /SphereGeometry/);

const vite = readFileSync("vite.config.js", "utf8");
assert.match(vite, /base:\s*"\/TheOpenAbove\/"/);

console.log("The Open Above basket experience smoke passed.");
