import { createAirstreamField } from "./airstream-field-kit.js";
import { createDefaultAirstreamRoutes } from "./airstream-route-kit.js";
import { createAirstreamDebug } from "./airstream-debug-kit.js";

export const AIRSTREAM_DOMAIN_ID = "open-above-airstream-domain";

export function createAirstreamDomain({
  scene = null,
  routes = createDefaultAirstreamRoutes(),
  debug = false
} = {}) {
  const field = createAirstreamField({ routes });
  const diagnostics = scene && debug ? createAirstreamDebug({ scene, routes, visible: true }) : null;
  const state = {
    activeRouteId: null,
    influence: 0,
    captureState: "ambient",
    lastSample: field.sample({ x: 0, y: 0, z: 0 }, 0)
  };

  function sample(position, elapsed = 0) {
    state.lastSample = field.sample(position, elapsed);
    state.activeRouteId = state.lastSample.routeId;
    state.influence = state.lastSample.influence;
    state.captureState = state.lastSample.captureState;
    return state.lastSample;
  }

  function update({ position, elapsed = 0, sample: suppliedSample = null } = {}) {
    const next = suppliedSample ?? sample(position, elapsed);
    state.lastSample = next;
    state.activeRouteId = next?.routeId ?? null;
    state.influence = Number(next?.influence) || 0;
    state.captureState = next?.captureState ?? "ambient";
    diagnostics?.update(position, next);
    return state;
  }

  function snapshot() {
    const current = state.lastSample ?? {};
    return {
      activeRouteId: state.activeRouteId,
      destinationTownId: current.destinationTownId ?? null,
      influence: Number(state.influence.toFixed(3)),
      captureState: state.captureState,
      distanceFromCenter: Number.isFinite(current.distanceFromCenter)
        ? Number(current.distanceFromCenter.toFixed(2))
        : null,
      velocity: current.velocity
        ? [current.velocity.x, current.velocity.y, current.velocity.z].map((value) => Number(value.toFixed(3)))
        : [0, 0, 0]
    };
  }

  function dispose() {
    diagnostics?.dispose();
  }

  return {
    id: AIRSTREAM_DOMAIN_ID,
    routes,
    field,
    diagnostics,
    state,
    sample,
    update,
    snapshot,
    dispose
  };
}
