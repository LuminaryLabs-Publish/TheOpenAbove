import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const domains = {
  journey: "src/domains/journey/journey-domain.js",
  ballooning: "src/domains/ballooning/ballooning-domain.js",
  sky: "src/domains/sky/sky-domain.js",
  land: "src/domains/land/land-domain.js",
  navigation: "src/domains/navigation/navigation-domain.js",
  airMail: "src/domains/air-mail/air-mail-domain.js",
  experience: "src/domains/experience/experience-domain.js"
};

for (const [name, path] of Object.entries(domains)) {
  const source = readFileSync(path, "utf8");
  assert.match(source, new RegExp(`open-above-${name === "airMail" ? "air-mail" : name}`));
}

const main = readFileSync("src/main.js", "utf8");
assert.match(main, /createMeadowLiftScene/);
assert.doesNotMatch(main, /createBalloonSimulation|createParchmentMapOverlay|createVisualDomain|requestAnimationFrame/);

const scene = readFileSync("src/scenes/meadow-lift-scene.js", "utf8");
for (const factory of [
  "createJourneyDomain",
  "createBallooningDomain",
  "createSkyDomain",
  "createLandDomain",
  "createNavigationDomain",
  "createAirMailDomain",
  "createExperienceDomain"
]) assert.match(scene, new RegExp(factory));
assert.match(scene, /domains = Object\.freeze/);
assert.match(scene, /journey\.start/);

console.log("semantic domain composition passed");
