import assert from "node:assert/strict";
import { createMeadowMission } from "../src/gameplay/meadow-mission-kit.js";

const source = {
  region: {
    id: "meadow-lift", objectives: {
      thermalTarget: 3, gateTarget: 5, returnRadius: 34, timeLimitSeconds: 300
    }, unlocks: ["cloud-basin"]
  },
  thermals: ["t1", "t2", "t3"].map(id => ({ id })),
  gates: ["g1", "g2", "g3", "g4", "g5"].map(id => ({ id })),
  perch: { id: "sky-perch" }
};
const mission = createMeadowMission(source);
assert.equal(mission.dispatch({ type: "perch", id: "sky-perch" }).accepted, false);
assert.equal(mission.dispatch({ type: "start" }).accepted, true);
assert.equal(mission.dispatch({ type: "tick", dt: -1 }).accepted, false);
assert.equal(mission.dispatch({ type: "gate", id: "g2" }).reason, "wrong-order");
for (const id of ["t1", "t2", "t3"]) assert.equal(mission.dispatch({ type: "thermal", id }).accepted, true);
assert.equal(mission.dispatch({ type: "thermal", id: "t1" }).reason, "duplicate");
for (const id of ["g1", "g2", "g3", "g4", "g5"]) assert.equal(mission.dispatch({ type: "gate", id }).accepted, true);
assert.equal(mission.snapshot().phase, "returning");
assert.equal(mission.dispatch({ type: "perch", id: "sky-perch" }).accepted, true);
assert.equal(mission.snapshot().phase, "completed");
assert.deepEqual(mission.snapshot().unlocks, ["cloud-basin"]);
assert.equal(mission.dispatch({ type: "perch", id: "sky-perch" }).accepted, false);
assert.equal(mission.dispatch({ type: "restart" }).accepted, true);
assert.equal(mission.snapshot().generation, 1);
assert.equal(mission.snapshot().thermals.completedIds.length, 0);
assert.equal(mission.dispatch({ type: "start" }).accepted, true);
assert.equal(mission.dispatch({ type: "tick", dt: 301 }).reason, "time-expired");
assert.equal(mission.snapshot().phase, "failed");
assert.equal(mission.dispatch({ type: "tick", dt: 1 }).accepted, false);
assert.throws(() => createMeadowMission({ ...source, gates: [] }), /Invalid Meadow/);
console.log("Meadow Lift deterministic mission authority passed.");
