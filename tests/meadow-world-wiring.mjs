import assert from "node:assert/strict";
import * as THREE from "three";
import { CAMPAIGN } from "../src/data/campaign.config.js";
import { createMeadowMissionWorld } from "../src/gameplay/meadow-mission-world.js";

const scene = new THREE.Scene();
let callbacks = 0;
const world = createMeadowMissionWorld({
  scene,
  terrainHeight: () => 0,
  region: CAMPAIGN.regions[0],
  onChange: () => { callbacks++; }
});
assert.equal(scene.children.length, 1);
assert.equal(world.snapshot().phase, "active");
assert.equal(world.points.length, 9);
assert.equal(world.getTarget().id, "thermal-1");
for (const [i, point] of world.points.entries()) {
  const flight = {
    position: new THREE.Vector3(point.x, point.y, point.z),
    altitude: point.height,
    verticalVelocity: -1
  };
  world.update(flight, 0.1);
  if (i < 8) {
    assert.notEqual(world.snapshot().phase, "completed");
    assert.equal(world.getTarget().id, world.points[i + 1].id);
  }
}
assert.equal(world.snapshot().phase, "completed");
assert.deepEqual(world.snapshot().unlocks, ["cloud-basin"]);
world.restart();
assert.equal(world.snapshot().phase, "active");
assert.equal(world.getTarget().id, "thermal-1");
world.dispose();
world.dispose();
assert.equal(scene.children.length, 0);
assert.ok(callbacks > 0);

const failing = createMeadowMissionWorld({
  scene,
  terrainHeight: () => 0,
  region: CAMPAIGN.regions[0]
});
failing.update({
  position: new THREE.Vector3(10000, 10000, 10000),
  altitude: 10000,
  verticalVelocity: 0
}, CAMPAIGN.regions[0].objectives.timeLimitSeconds + 1);
assert.equal(failing.snapshot().phase, "failed");
failing.dispose();
console.log("Meadow Lift world contact, mission completion, restart and timeout passed.");
