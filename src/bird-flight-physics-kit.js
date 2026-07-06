import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export const BIRD_FLIGHT_PHYSICS_KIT_ID = "open-above-bird-flight-physics-kit";
export const DEG = 180 / Math.PI;
export const RAD = Math.PI / 180;

export const flightProfile = {
  levelPitchDeg: -5,
  shallowDivePitchDeg: -18,
  committedDivePitchDeg: -38,
  hardStoopPitchDeg: -64,
  tuckStartSpeed: 78,
  fullTuckSpeed: 145,
  pulloutPitchDeg: 12,
  minDragMultiplier: 0.32,
  maxTurnStiffness: 2.9
};

export const clamp01 = (value) => Math.max(0, Math.min(1, Number(value) || 0));
export const lerp = (a, b, t) => a + (b - a) * clamp01(t);

export function findBird(scene) {
  let bird = null;
  scene?.traverse?.((node) => {
    if (!bird && node?.userData?.leftWing && node?.userData?.rightWing && node?.userData?.tail) bird = node;
  });
  return bird;
}

function pitchFromVelocity(local) {
  const velocity = new THREE.Vector3(...(local?.velocity ?? [0, 0, -1]));
  const flat = Math.max(0.0001, Math.hypot(velocity.x, velocity.z));
  return Math.atan2(velocity.y, flat);
}

function readTruePose(host, local) {
  const bird = findBird(host?.scene);
  const storedPitch = bird?.userData?.openAboveTruePitch;
  const storedYaw = bird?.userData?.openAboveTrueYaw;
  const storedRoll = bird?.userData?.openAboveTrueRoll;
  const pitch = typeof local?.pitch === "number" ? local.pitch : typeof storedPitch === "number" ? storedPitch : bird ? -bird.rotation.x : pitchFromVelocity(local);
  const yaw = typeof local?.yaw === "number" ? local.yaw : typeof storedYaw === "number" ? storedYaw : bird?.rotation?.y ?? 0;
  const roll = typeof local?.roll === "number" ? local.roll : typeof storedRoll === "number" ? storedRoll : bird ? -bird.rotation.z : 0;
  return { pitch, yaw, roll };
}

export function readFlightPhysics(host, sourceState = null) {
  const state = sourceState ?? host?.getState?.();
  const local = state?.local ?? state ?? {};
  const pose = readTruePose(host, local);
  const speed = Number(local.speed ?? 0);
  const velocity = new THREE.Vector3(...(local.velocity ?? [0, 0, 0]));
  const pitchDeg = pose.pitch * DEG;
  const descentPitch = Math.max(0, -pitchDeg);
  const shallow = clamp01((descentPitch - Math.abs(flightProfile.levelPitchDeg)) / (Math.abs(flightProfile.shallowDivePitchDeg) - Math.abs(flightProfile.levelPitchDeg)));
  const committed = clamp01((descentPitch - Math.abs(flightProfile.shallowDivePitchDeg)) / (Math.abs(flightProfile.committedDivePitchDeg) - Math.abs(flightProfile.shallowDivePitchDeg)));
  const stoop = clamp01((descentPitch - Math.abs(flightProfile.committedDivePitchDeg)) / (Math.abs(flightProfile.hardStoopPitchDeg) - Math.abs(flightProfile.committedDivePitchDeg)));
  const speedTuck = clamp01((speed - flightProfile.tuckStartSpeed) / (flightProfile.fullTuckSpeed - flightProfile.tuckStartSpeed));
  const diveIntensity = clamp01(shallow * 0.32 + committed * 0.48 + stoop * 0.2);
  const wingTuck = clamp01(diveIntensity * 0.78 + speedTuck * 0.22);
  const pullout = clamp01((pitchDeg - flightProfile.pulloutPitchDeg) / 26) * clamp01(speed / flightProfile.fullTuckSpeed);
  const angleOfAttack = pitchDeg + wingTuck * 8 - pullout * 13;

  return {
    id: BIRD_FLIGHT_PHYSICS_KIT_ID,
    pitch: pose.pitch,
    yaw: pose.yaw,
    roll: pose.roll,
    pitchDeg: Number(pitchDeg.toFixed(2)),
    verticalSpeed: Number(velocity.y.toFixed(2)),
    speed: Number(speed.toFixed(2)),
    diveIntensity: Number(diveIntensity.toFixed(3)),
    wingTuck: Number(wingTuck.toFixed(3)),
    angleOfAttack: Number(angleOfAttack.toFixed(2)),
    liftMultiplier: Number(lerp(1.08, 0.44, wingTuck).toFixed(3)),
    dragMultiplier: Number(lerp(1.12, flightProfile.minDragMultiplier, wingTuck).toFixed(3)),
    turnStiffness: Number(lerp(1, flightProfile.maxTurnStiffness, clamp01(speed / 165) * wingTuck).toFixed(3)),
    pulloutLoad: Number((1 + pullout * 2.9).toFixed(3)),
    cameraShakeHint: Number((diveIntensity * clamp01(speed / 165) * 0.55).toFixed(3))
  };
}

function attachWhenReady() {
  const host = window.GameHost;
  if (!host?.getState) {
    requestAnimationFrame(attachWhenReady);
    return;
  }
  if (host.__birdFlightPhysicsAttached) return;

  const originalGetState = host.getState;
  host.getState = () => {
    const state = originalGetState();
    const physics = readFlightPhysics(host, state);
    return {
      ...state,
      local: {
        ...state.local,
        pitch: physics.pitch,
        yaw: physics.yaw,
        roll: physics.roll,
        verticalSpeed: physics.verticalSpeed,
        diveIntensity: physics.diveIntensity,
        wingTuck: physics.wingTuck,
        angleOfAttack: physics.angleOfAttack,
        pulloutLoad: physics.pulloutLoad
      },
      flightPhysics: physics
    };
  };
  host.__birdFlightPhysicsAttached = true;
}

window.OpenAboveBirdFlightPhysicsKit = {
  id: BIRD_FLIGHT_PHYSICS_KIT_ID,
  profile: flightProfile,
  readFlightPhysics
};
requestAnimationFrame(attachWhenReady);
