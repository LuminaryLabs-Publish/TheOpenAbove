import { blendAirstreamSamples, sampleAirstreamRoute } from "./airstream-sampler-kit.js";

export const AIRSTREAM_FIELD_KIT_ID = "open-above-airstream-field-kit";

function ambientWind(position = {}, elapsed = 0) {
  const altitude = Math.max(0, Number(position.y) || 0);
  const altitudeBlend = Math.min(1, altitude / 420);
  const sway = Math.sin(Number(elapsed) * 0.041 + (Number(position.x) || 0) * 0.0008) * 0.8;
  return {
    x: 2.4 + sway + altitudeBlend * 0.7,
    y: 0,
    z: -3.6 - altitudeBlend * 0.9
  };
}

export function createAirstreamField({ routes = [], ambientSampler = ambientWind } = {}) {
  const activeRoutes = Object.freeze([...routes]);

  function sample(position, elapsed = 0) {
    const routeSamples = activeRoutes.map((route) => sampleAirstreamRoute(route, position, elapsed));
    return blendAirstreamSamples(routeSamples, ambientSampler(position, elapsed));
  }

  return Object.freeze({
    id: AIRSTREAM_FIELD_KIT_ID,
    routes: activeRoutes,
    sample,
    ambientSampler
  });
}
