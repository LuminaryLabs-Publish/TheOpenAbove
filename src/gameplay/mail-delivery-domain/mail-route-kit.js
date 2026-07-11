export const MAIL_ROUTE_KIT_ID = "open-above-mail-route-kit";

export function createDefaultMailTowns() {
  return Object.freeze([
    Object.freeze({
      id: "brookhaven",
      label: "Brookhaven",
      position: Object.freeze({ x: -1900, z: -2400 }),
      deliveryRadius: 150,
      safeAltitude: 92,
      altitudeTolerance: 72,
      color: 0xd94f45,
      routeId: "meadow-to-brookhaven"
    }),
    Object.freeze({
      id: "sunvale",
      label: "Sunvale",
      position: Object.freeze({ x: 1850, z: -2200 }),
      deliveryRadius: 145,
      safeAltitude: 82,
      altitudeTolerance: 68,
      color: 0xe8b94f,
      routeId: "lowland-to-sunvale"
    }),
    Object.freeze({
      id: "cloudmere",
      label: "Cloudmere",
      position: Object.freeze({ x: 1600, z: 1800 }),
      deliveryRadius: 155,
      safeAltitude: 135,
      altitudeTolerance: 85,
      color: 0x73b8df,
      routeId: "highland-to-cloudmere"
    })
  ]);
}

export function createDefaultMailRoute() {
  return Object.freeze({
    id: "meadow-mail-run",
    parcel: Object.freeze({
      id: "parcel-001",
      label: "Brookhaven Letter Bag",
      destinationTownId: "brookhaven"
    }),
    correctAirstreamId: "meadow-to-brookhaven",
    towns: createDefaultMailTowns()
  });
}
