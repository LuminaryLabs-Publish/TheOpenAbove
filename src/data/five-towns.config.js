const town = (value) => Object.freeze({
  ...value,
  position: Object.freeze({ ...value.position }),
  foundationCell: Object.freeze({ ...value.foundationCell }),
  presentation: Object.freeze({ ...value.presentation })
});

export const FIVE_TOWNS = Object.freeze([
  town({ id: "brookhaven", label: "Brookhaven", position: { x: -1900, z: -2400 }, deliveryRadius: 150, safeAltitude: 92, altitudeTolerance: 72, color: 0xd94f45, routeId: "meadow-to-brookhaven", foundationCell: { x: -4, z: -5 }, presentation: { style: "red-roof-meadow" } }),
  town({ id: "sunvale", label: "Sunvale", position: { x: 1850, z: -2200 }, deliveryRadius: 145, safeAltitude: 82, altitudeTolerance: 68, color: 0xe8b94f, routeId: "lowland-to-sunvale", foundationCell: { x: 3, z: -5 }, presentation: { style: "gold-roof-lowland" } }),
  town({ id: "cloudmere", label: "Cloudmere", position: { x: 1600, z: 1800 }, deliveryRadius: 155, safeAltitude: 135, altitudeTolerance: 85, color: 0x73b8df, routeId: "highland-to-cloudmere", foundationCell: { x: 3, z: 3 }, presentation: { style: "blue-roof-highland" } }),
  town({ id: "mistwood", label: "Mistwood", position: { x: -2100, z: 1950 }, deliveryRadius: 148, safeAltitude: 108, altitudeTolerance: 76, color: 0x8fbd9b, routeId: "forest-to-mistwood", foundationCell: { x: -5, z: 3 }, presentation: { style: "green-roof-forest" } }),
  town({ id: "galecrest", label: "Galecrest", position: { x: 3150, z: 250 }, deliveryRadius: 165, safeAltitude: 155, altitudeTolerance: 92, color: 0xb99bdc, routeId: "ridge-to-galecrest", foundationCell: { x: 6, z: 0 }, presentation: { style: "violet-roof-ridge" } })
]);

export const FIVE_TOWN_ROUTES = Object.freeze([
  Object.freeze({ id: "meadow-to-brookhaven", destinationTownId: "brookhaven", label: "Brookhaven Meadow Current", family: "meadow", color: 0xbce8bf, radius: 105, speed: 19, lift: 0.35, turbulence: 0.06, points: Object.freeze([{ x: 0, y: 165, z: 0 }, { x: -450, y: 190, z: -700 }, { x: -1100, y: 160, z: -1500 }, { x: -1900, y: 125, z: -2400 }].map(Object.freeze)) }),
  Object.freeze({ id: "lowland-to-sunvale", destinationTownId: "sunvale", label: "Sunvale Warm Current", family: "warm", color: 0xffe2a0, radius: 100, speed: 17, lift: 0.18, turbulence: 0.075, points: Object.freeze([{ x: 0, y: 92, z: 0 }, { x: 520, y: 112, z: -650 }, { x: 1140, y: 98, z: -1420 }, { x: 1850, y: 82, z: -2200 }].map(Object.freeze)) }),
  Object.freeze({ id: "highland-to-cloudmere", destinationTownId: "cloudmere", label: "Cloudmere Cool Current", family: "cool", color: 0xc5e7ff, radius: 112, speed: 22, lift: -0.08, turbulence: 0.045, points: Object.freeze([{ x: 0, y: 285, z: 0 }, { x: 470, y: 305, z: 560 }, { x: 980, y: 275, z: 1180 }, { x: 1600, y: 235, z: 1800 }].map(Object.freeze)) }),
  Object.freeze({ id: "forest-to-mistwood", destinationTownId: "mistwood", label: "Mistwood Silver Current", family: "forest", color: 0xb9d8c1, radius: 108, speed: 18, lift: 0.12, turbulence: 0.065, points: Object.freeze([{ x: -520, y: 190, z: 480 }, { x: -900, y: 190, z: 780 }, { x: -1350, y: 165, z: 1220 }, { x: -2100, y: 145, z: 1950 }].map(Object.freeze)) }),
  Object.freeze({ id: "ridge-to-galecrest", destinationTownId: "galecrest", label: "Galecrest Violet Current", family: "ridge", color: 0xd9c6ee, radius: 118, speed: 24, lift: 0.08, turbulence: 0.05, points: Object.freeze([{ x: 580, y: 250, z: 40 }, { x: 1050, y: 285, z: 180 }, { x: 1900, y: 300, z: 310 }, { x: 3150, y: 320, z: 250 }].map(Object.freeze)) })
]);
