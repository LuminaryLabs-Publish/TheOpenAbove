import { createMailParcel, resetMailParcel } from "./mail-parcel-kit.js";
import { createDefaultMailRoute } from "./mail-route-kit.js";
import { updateDeliveryProgress } from "./delivery-progress-kit.js";
import { createMailTownVisuals } from "./mail-town-kit.js";

export const MAIL_DELIVERY_DOMAIN_ID = "open-above-mail-delivery-domain";

export function createMailDeliveryDomain({
  scene = null,
  terrainHeight = () => 0,
  route = createDefaultMailRoute()
} = {}) {
  const towns = [...route.towns];
  const parcel = createMailParcel(route.parcel);
  const visuals = scene
    ? createMailTownVisuals({ scene, towns, terrainHeight })
    : null;
  const state = {
    parcel,
    routeId: route.id,
    destinationTownId: parcel.destinationTownId,
    correctAirstreamId: route.correctAirstreamId,
    lastEvent: null
  };

  function update(position, airstreamSample, elapsed = 0) {
    state.lastEvent = updateDeliveryProgress({
      parcel,
      towns,
      position,
      airstreamSample,
      elapsed,
      terrainHeight
    });
    visuals?.update(elapsed, parcel.destinationTownId);
    return state.lastEvent;
  }

  function snapshot() {
    return {
      routeId: state.routeId,
      parcelId: parcel.id,
      destinationTownId: parcel.destinationTownId,
      correctAirstreamId: state.correctAirstreamId,
      selectedAirstreamId: parcel.selectedAirstreamId,
      status: parcel.status,
      delivered: parcel.delivered,
      deliveredAt: parcel.deliveredAt,
      message: parcel.message
    };
  }

  function reset() {
    resetMailParcel(parcel);
    state.lastEvent = null;
    return snapshot();
  }

  function dispose() {
    visuals?.dispose();
  }

  return {
    id: MAIL_DELIVERY_DOMAIN_ID,
    route,
    towns,
    parcel,
    state,
    visuals,
    update,
    snapshot,
    reset,
    dispose
  };
}
