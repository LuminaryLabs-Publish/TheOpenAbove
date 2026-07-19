import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const required = [
  "src/main.js",
  "src/runtime/balloon-telemetry-kit.js",
  "src/scenes/meadow-lift-scene.js",
  "src/domains/experience/experience-domain.js",
  "src/visual/visual-domain.js",
  "index.html"
];
for (const path of required) assert.equal(existsSync(path), true, `${path} should exist`);

const telemetry = readFileSync("src/runtime/balloon-telemetry-kit.js", "utf8");
assert.match(telemetry, /createCoreStartupDomain/);
assert.match(telemetry, /\.\.\.startupKits/);

const scene = readFileSync("src/scenes/meadow-lift-scene.js", "utf8");
assert.match(scene, /engine\.n\?\.coreStartup \?\? engine\.coreStartup/);
assert.match(scene, /createBrowserStartupPresentationAdapter/);
assert.match(scene, /startup\.launch/);
assert.match(scene, /startup\.presentFirstFrame/);
assert.match(scene, /startup\.enter\(\{ inputReady: true \}\)/);
assert.match(scene, /createExperienceWorldPreparation/);
assert.match(scene, /await advanceGeneratedWorld/);
assert.match(scene, /worldPreparation\.finalize/);
assert.match(scene, /preparedWorld/);

const generationIndex = scene.indexOf("await advanceGeneratedWorld");
const experienceIndex = scene.indexOf("experience = createExperienceDomain");
const startingAreaIndex = scene.indexOf('startup.working("starting-area"');
const firstFrameIndex = scene.indexOf("experience.render(0, 16.7)");
const enterIndex = scene.indexOf("startup.enter({ inputReady: true })");
assert.ok(generationIndex >= 0 && generationIndex < experienceIndex, "world generation should finish before visual-domain creation");
assert.ok(experienceIndex < startingAreaIndex, "visual-domain creation should precede starting-area activation");
assert.ok(startingAreaIndex < firstFrameIndex, "starting-area terrain should be built before the first frame");
assert.ok(firstFrameIndex < enterIndex, "Core Startup should admit player input only after the first frame");

const visual = readFileSync("src/visual/visual-domain.js", "utf8");
assert.match(visual, /createVisualWorldPreparation/);
assert.match(visual, /preparedWorld \?\? createWorldFeatureFoundation/);
assert.match(visual, /staged: true/);
assert.match(visual, /autoStart: true/);

const experience = readFileSync("src/domains/experience/experience-domain.js", "utf8");
assert.match(experience, /createExperienceWorldPreparation/);
assert.match(experience, /preparedWorld/);

const main = readFileSync("src/main.js", "utf8");
assert.match(main, /startupElements/);
assert.match(main, /startupLoader/);
assert.match(main, /startupProgressFill/);

const html = readFileSync("index.html", "utf8");
assert.match(html, /id="startupLoader"/);
assert.match(html, /id="startupProgressFill"/);
assert.match(html, /id="startupLabel"/);
assert.match(html, /role="progressbar"/);

console.log("The Open Above Core Startup world-loading gate passed.");
