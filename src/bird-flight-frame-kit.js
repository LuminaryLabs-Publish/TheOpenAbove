export const BIRD_FLIGHT_FRAME_KIT_ID = "open-above-bird-flight-frame-kit";

const round3 = (value) => Number((Number(value) || 0).toFixed(3));
const clampNumber = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;

function normalize(v) {
  const length = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / length, v[1] / length, v[2] / length];
}

export function createFlightFrame(local = {}, physics = {}) {
  const pitch = clampNumber(physics.pitch ?? local.pitch);
  const yaw = clampNumber(physics.yaw ?? local.yaw);
  const roll = clampNumber(physics.roll ?? local.roll);
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);

  const forward = normalize([-sy * cp, sp, -cy * cp]);
  const right = normalize([cy, 0, -sy]);
  const up = normalize([
    -sy * sp,
    cp,
    -cy * sp
  ]);

  return {
    id: BIRD_FLIGHT_FRAME_KIT_ID,
    position: [...(local.position ?? [0, 0, 0])].map(round3),
    velocity: [...(local.velocity ?? [0, 0, 0])].map(round3),
    rotation: [round3(pitch), round3(yaw), round3(-roll), "YXZ"],
    forward: forward.map(round3),
    right: right.map(round3),
    up: up.map(round3),
    meshNoseAxis: [0, 0, -1]
  };
}

function attachWhenReady() {
  const host = window.GameHost;
  if (!host?.getState) {
    requestAnimationFrame(attachWhenReady);
    return;
  }
  if (host.__birdFlightFrameAttached) return;

  const originalGetState = host.getState;
  host.getState = () => {
    const state = originalGetState();
    const frame = createFlightFrame(state.local, state.flightPhysics);
    return {
      ...state,
      local: { ...state.local, flightFrame: frame },
      flightFrame: frame,
      flightPhysics: state.flightPhysics ? { ...state.flightPhysics, flightFrame: frame } : state.flightPhysics
    };
  };
  host.__birdFlightFrameAttached = true;
}

window.OpenAboveBirdFlightFrameKit = {
  id: BIRD_FLIGHT_FRAME_KIT_ID,
  createFlightFrame
};
requestAnimationFrame(attachWhenReady);
