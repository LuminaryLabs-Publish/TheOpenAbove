import { createAirstreamField } from "./airstream-field-kit.js";
import { createDefaultAirstreamRoutes } from "./airstream-route-kit.js";
import { createAirstreamVisual } from "./airstream-visual-kit.js";
import { createAirstreamDebug } from "./airstream-debug-kit.js";

export const AIRSTREAM_DOMAIN_ID = "open-above-airstream-domain";

export function createAirstreamDomain({
  scene = null,
  routes = createDefaultAirstreamRoutes(),
  debug = false
} = {}) {
  const field = createAirstreamField({ routes });
  const visual = scene ? createAirstreamVisual({ scene, routes }) : null;
  const diagnostics = scene ? createAirstreamDebug({ scene, routes, visible: debug }) : null;
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
    visual?.update(elapsed, state.activeRouteId);
    diagnostics?.update(position, next);
    return state;
  }

  function snapshot() {
    const sample = state.lastSample ?? {};
    return {
      activeRouteId: state.activeRouteId,
      destinationTownId: sample.destinationTownId ?? null,
      influence: Number(state.influence.toFixed(3)),
      captureState: state.captureState,
      distanceFromCenter: Number.isFinite(sample.distanceFromCenter)
        ? Number(sample.distanceFromCenter.toFixed(2))
        : null,
      velocity: sample.velocity
        ? [sample.velocity.x, sample.velocity.y, sample.velocity.z].map((value) => Number(value.toFixed(3)))
        : [0, 0, 0]
    };
  }

  function dispose() {
    visual?.dispose();
    diagnostics?.dispose();
  }

  return {
    id: AIRSTREAM_DOMAIN_ID,
    routes,
    field,
    visual,
    diagnostics,
    state,
    sample,
    update,
    snapshot,
    dispose
  };
}
