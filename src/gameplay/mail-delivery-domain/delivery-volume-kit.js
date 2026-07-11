export const DELIVERY_VOLUME_KIT_ID = "open-above-delivery-volume-kit";

export function sampleDeliveryVolume({ town, position, terrainHeight }) {
  const ground = Number(terrainHeight?.(town.position.x, town.position.z)) || 0;
  const centerY = ground + town.safeAltitude;
  const dx = (Number(position.x) || 0) - town.position.x;
  const dz = (Number(position.z) || 0) - town.position.z;
  const horizontalDistance = Math.hypot(dx, dz);
  const altitudeDelta = Math.abs((Number(position.y) || 0) - centerY);
  const inside = horizontalDistance <= town.deliveryRadius
    && altitudeDelta <= town.altitudeTolerance;

  return {
    townId: town.id,
    inside,
    horizontalDistance,
    altitudeDelta,
    centerY,
    radius: town.deliveryRadius,
    altitudeTolerance: town.altitudeTolerance
  };
}
