export const AUTHORED_LAKES = Object.freeze([
  Object.freeze({
    id: "west-meadow-lake",
    x: -260,
    z: 180,
    rx: 205,
    rz: 112,
    waterLevel: -21,
    protectionRadius: 315,
    protectionTransition: 150,
    moistureWeight: 0.82,
    moistureDivisor: 90000
  }),
  Object.freeze({
    id: "east-lowland-lake",
    x: 420,
    z: -340,
    rx: 240,
    rz: 138,
    waterLevel: -14,
    protectionRadius: 350,
    protectionTransition: 150,
    moistureWeight: 0.62,
    moistureDivisor: 130000
  })
]);

if (typeof window !== "undefined") {
  window.OpenAboveWorldAuthoredFeatures = { AUTHORED_LAKES };
}
