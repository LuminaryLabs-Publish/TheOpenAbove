import assert from "node:assert/strict";
import {
  createAirstreamRoute,
  createDefaultAirstreamRoutes
} from "../src/runtime/airstream-domain/airstream-route-kit.js";
import { createAirstreamField } from "../src/runtime/airstream-domain/airstream-field-kit.js";
import {
  applyAirstreamToBalloonState,
  sampleBalloonAirstream
} from "../src/runtime/airstream-domain/airstream-balloon-force-kit.js";
import { createMailParcel, resetMailParcel } from "../src/gameplay/mail-delivery-domain/mail-parcel-kit.js";
import { createDefaultMailTowns } from "../src/gameplay/mail-delivery-domain/mail-route-kit.js";
import { sampleDeliveryVolume } from "../src/gameplay/mail-delivery-domain/delivery-volume-kit.js";
import { updateDeliveryProgress } from "../src/gameplay/mail-delivery-domain/delivery-progress-kit.js";

const routes = createDefaultAirstreamRoutes();
const field = createAirstreamField({ routes });

const brookhavenRoute = routes.find((route) => route.id === "meadow-to-brookhaven");
const centerSampleA = field.sample(brookhavenRoute.points[1], 12.5);
const centerSampleB = field.sample(brookhavenRoute.points[1], 12.5);
assert.deepEqual(centerSampleA, centerSampleB, "same route sample should be deterministic");
assert.equal(centerSampleA.routeId, "meadow-to-brookhaven");
assert.ok(centerSampleA.influence > 0.95, "centerline should have maximum influence");

const outside = field.sample({ x: 9000, y: 9000, z: 9000 }, 2);
assert.equal(outside.routeId, null);
assert.equal(outside.captureState, "ambient");
assert.equal(outside.influence, 0);

const low = field.sample({ x: 0, y: 92, z: 0 }, 0);
const middle = field.sample({ x: 0, y: 165, z: 0 }, 0);
const high = field.sample({ x: 0, y: 285, z: 0 }, 0);
assert.equal(low.routeId, "lowland-to-sunvale");
assert.equal(middle.routeId, "meadow-to-brookhaven");
assert.equal(high.routeId, "highland-to-cloudmere");

const lastPoint = brookhavenRoute.points.at(-1);
const directionToTown = {
  x: lastPoint.x - brookhavenRoute.points[1].x,
  y: lastPoint.y - brookhavenRoute.points[1].y,
  z: lastPoint.z - brookhavenRoute.points[1].z
};
const dot = centerSampleA.velocity.x * directionToTown.x
  + centerSampleA.velocity.y * directionToTown.y
  + centerSampleA.velocity.z * directionToTown.z;
assert.ok(dot > 0, "route flow should point toward its destination");

const overlapping = createAirstreamField({
  routes: [
    createAirstreamRoute({
      id: "east",
      points: [{ x: -10, y: 100, z: 0 }, { x: 10, y: 100, z: 0 }],
      radius: 50,
      speed: 10
    }),
    createAirstreamRoute({
      id: "north",
      points: [{ x: 0, y: 100, z: -10 }, { x: 0, y: 100, z: 10 }],
      radius: 50,
      speed: 10
    })
  ],
  ambientSampler: () => ({ x: 0, y: 0, z: 0 })
});
const blended = overlapping.sample({ x: 0, y: 100, z: 0 }, 1);
assert.ok(Number.isFinite(blended.velocity.x));
assert.ok(Number.isFinite(blended.velocity.y));
assert.ok(Number.isFinite(blended.velocity.z));
assert.ok(Math.abs(blended.velocity.x) > 1);
assert.ok(Math.abs(blended.velocity.z) > 1);

const fakeState = {
  wind: {
    set(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
    }
  }
};
const flow = sampleBalloonAirstream(field.sample, { x: 0, y: 165, z: 0 }, 0);
applyAirstreamToBalloonState(fakeState, flow);
assert.equal(fakeState.airstream.routeId, "meadow-to-brookhaven");
assert.ok(Math.hypot(fakeState.wind.x, fakeState.wind.z) > 10);

const terrainHeight = () => 20;
const towns = createDefaultMailTowns();
const brookhaven = towns.find((town) => town.id === "brookhaven");
const parcel = createMailParcel({
  id: "parcel-001",
  destinationTownId: "brookhaven",
  label: "Brookhaven Letter Bag"
});
const wrongTown = towns.find((town) => town.id === "sunvale");
const wrongPosition = {
  x: wrongTown.position.x,
  y: 20 + wrongTown.safeAltitude,
  z: wrongTown.position.z
};
assert.equal(sampleDeliveryVolume({ town: brookhaven, position: wrongPosition, terrainHeight }).inside, false);
assert.equal(updateDeliveryProgress({
  parcel,
  towns,
  position: wrongPosition,
  airstreamSample: low,
  elapsed: 20,
  terrainHeight
}), null);
assert.equal(parcel.delivered, false);

const destinationPosition = {
  x: brookhaven.position.x,
  y: 20 + brookhaven.safeAltitude,
  z: brookhaven.position.z
};
const delivered = updateDeliveryProgress({
  parcel,
  towns,
  position: destinationPosition,
  airstreamSample: centerSampleA,
  elapsed: 42,
  terrainHeight
});
assert.equal(delivered.type, "mail-delivered");
assert.equal(parcel.delivered, true);
assert.equal(updateDeliveryProgress({
  parcel,
  towns,
  position: destinationPosition,
  airstreamSample: centerSampleA,
  elapsed: 43,
  terrainHeight
}), null, "delivery should only fire once");

resetMailParcel(parcel);
assert.equal(parcel.delivered, false);
assert.equal(parcel.status, "in-transit");

console.log("The Open Above deterministic airstream and mail delivery tests passed.");
