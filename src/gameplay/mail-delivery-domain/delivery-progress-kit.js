import { sampleDeliveryVolume } from "./delivery-volume-kit.js";

export const DELIVERY_PROGRESS_KIT_ID = "open-above-delivery-progress-kit";

export function updateDeliveryProgress({
  parcel,
  towns,
  position,
  airstreamSample,
  elapsed = 0,
  terrainHeight
}) {
  if (airstreamSample?.influence >= 0.35 && airstreamSample.routeId) {
    parcel.selectedAirstreamId = airstreamSample.routeId;
  }

  const destination = towns.find((town) => town.id === parcel.destinationTownId);
  if (!destination) throw new Error(`Unknown mail destination: ${parcel.destinationTownId}`);

  const volume = sampleDeliveryVolume({
    town: destination,
    position,
    terrainHeight
  });

  if (!parcel.delivered && volume.inside) {
    parcel.status = "delivered";
    parcel.delivered = true;
    parcel.deliveredAt = Number(elapsed) || 0;
    parcel.message = `Mail delivered to ${destination.label}.`;
    return {
      type: "mail-delivered",
      parcelId: parcel.id,
      destinationTownId: destination.id,
      elapsed: parcel.deliveredAt,
      volume
    };
  }

  if (!parcel.delivered) {
    parcel.status = "in-transit";
    const current = airstreamSample?.routeId
      ? `Current: ${airstreamSample.routeId}`
      : "Between currents";
    parcel.message = `Mail for ${destination.label}. ${current}.`;
  }

  return null;
}
