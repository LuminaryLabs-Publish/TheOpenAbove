export const AIRSTREAM_BALLOON_FORCE_KIT_ID = "open-above-airstream-balloon-force-kit";

export function sampleBalloonAirstream(sampleAirstream, position, elapsed, fallbackVelocity = { x: 0, y: 0, z: -1 }) {
  if (typeof sampleAirstream !== "function") {
    return {
      velocity: { ...fallbackVelocity },
      influence: 0,
      routeId: null,
      destinationTownId: null,
      distanceFromCenter: Number.POSITIVE_INFINITY,
      captureState: "ambient",
      contributors: []
    };
  }

  const sample = sampleAirstream(position, elapsed);
  const velocity = sample?.velocity ?? fallbackVelocity;
  return {
    velocity: {
      x: Number(velocity.x) || 0,
      y: Number(velocity.y) || 0,
      z: Number(velocity.z) || 0
    },
    influence: Math.max(0, Math.min(1, Number(sample?.influence) || 0)),
    routeId: sample?.routeId ?? null,
    destinationTownId: sample?.destinationTownId ?? null,
    distanceFromCenter: Number(sample?.distanceFromCenter),
    captureState: sample?.captureState ?? "ambient",
    contributors: [...(sample?.contributors ?? [])]
  };
}

export function applyAirstreamToBalloonState(state, flow) {
  if (state.wind?.set) state.wind.set(flow.velocity.x, flow.velocity.y, flow.velocity.z);
  else state.wind = { ...flow.velocity };

  state.airstream = {
    routeId: flow.routeId,
    destinationTownId: flow.destinationTownId,
    influence: flow.influence,
    distanceFromCenter: flow.distanceFromCenter,
    captureState: flow.captureState,
    velocity: { ...flow.velocity },
    contributors: [...flow.contributors]
  };

  return state.airstream;
}
