import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

const DIVE_KIT_ID = "open-above-bird-dive-domain-kit";
const DEG = 180 / Math.PI;
const clamp01 = (value) => Math.max(0, Math.min(1, Number(value) || 0));
const lerp = (a, b, t) => a + (b - a) * clamp01(t);

const profile = {
  levelPitchDeg: -5,
  shallowDivePitchDeg: -18,
  committedDivePitchDeg: -38,
  hardStoopPitchDeg: -64,
  tuckStartSpeed: 82,
  fullTuckSpeed: 145,
  pulloutPitchDeg: 14,
  closeTrailDistance: 9.2,
  closeLift: 3.8,
  lookAhead: 7.5
};

function getPitchDeg(local) {
  if (typeof local?.pitch === "number") return local.pitch * DEG;
  const velocity = new THREE.Vector3(...(local?.velocity ?? [0, 0, -1]));
  const flat = Math.max(0.0001, Math.hypot(velocity.x, velocity.z));
  return Math.atan2(velocity.y, flat) * DEG;
}

function readDiveState(local) {
  const speed = Number(local?.speed ?? 0);
  const pitchDeg = getPitchDeg(local);
  const descentPitch = Math.max(0, -pitchDeg);
  const shallow = clamp01((descentPitch - Math.abs(profile.levelPitchDeg)) / (Math.abs(profile.shallowDivePitchDeg) - Math.abs(profile.levelPitchDeg)));
  const committed = clamp01((descentPitch - Math.abs(profile.shallowDivePitchDeg)) / (Math.abs(profile.committedDivePitchDeg) - Math.abs(profile.shallowDivePitchDeg)));
  const stoop = clamp01((descentPitch - Math.abs(profile.committedDivePitchDeg)) / (Math.abs(profile.hardStoopPitchDeg) - Math.abs(profile.committedDivePitchDeg)));
  const speedTuck = clamp01((speed - profile.tuckStartSpeed) / (profile.fullTuckSpeed - profile.tuckStartSpeed));
  const diveIntensity = clamp01(shallow * 0.35 + committed * 0.45 + stoop * 0.2);
  const wingTuck = clamp01(diveIntensity * 0.72 + speedTuck * 0.28);
  const pullout = clamp01((pitchDeg - profile.pulloutPitchDeg) / 26) * clamp01(speed / profile.fullTuckSpeed);
  const angleOfAttack = Number((pitchDeg + wingTuck * 8 - pullout * 13).toFixed(2));

  return {
    id: DIVE_KIT_ID,
    pitchDeg: Number(pitchDeg.toFixed(2)),
    diveIntensity: Number(diveIntensity.toFixed(3)),
    wingTuck: Number(wingTuck.toFixed(3)),
    angleOfAttack,
    liftMultiplier: Number(lerp(1.08, 0.46, wingTuck).toFixed(3)),
    dragMultiplier: Number(lerp(1.12, 0.34, wingTuck).toFixed(3)),
    turnStiffness: Number(lerp(1, 2.6, clamp01(speed / 165) * wingTuck).toFixed(3)),
    pulloutLoad: Number((1 + pullout * 2.8).toFixed(3)),
    cameraShakeHint: Number((diveIntensity * clamp01(speed / 165) * 0.55).toFixed(3))
  };
}

function findBird(scene) {
  const candidates = [];
  scene?.traverse?.((node) => {
    if (node?.userData?.leftWing && node?.userData?.rightWing && node?.userData?.tail) candidates.push(node);
  });
  return candidates[0] ?? null;
}

function applyDivePose(host, diveState) {
  const bird = findBird(host.scene);
  if (!bird) return;

  const leftWing = bird.userData.leftWing;
  const rightWing = bird.userData.rightWing;
  const tail = bird.userData.tail;
  const tuck = diveState.wingTuck;
  const dive = diveState.diveIntensity;
  const pullout = clamp01((diveState.pulloutLoad - 1) / 2.8);

  leftWing.rotation.y = lerp(0, -0.92, tuck);
  rightWing.rotation.y = lerp(0, 0.92, tuck);
  leftWing.rotation.x = lerp(0, 0.18, dive) - pullout * 0.12;
  rightWing.rotation.x = lerp(0, 0.18, dive) - pullout * 0.12;
  tail.rotation.x = lerp(0, 0.26, pullout) - dive * 0.1;
  bird.scale.z = lerp(1, 1.08, dive);
  bird.scale.y = lerp(1, 0.92, tuck);
}

const originalLookAt = THREE.PerspectiveCamera.prototype.lookAt;
function diveCameraLookAt(target, ...rest) {
  const host = window.GameHost;
  if (!host || this !== host.camera) return originalLookAt.call(this, target, ...rest);

  const local = host.getState?.()?.local;
  const diveState = readDiveState(local);
  const bird = new THREE.Vector3(...(local?.position ?? [0, 0, 0]));
  const velocity = new THREE.Vector3(...(local?.velocity ?? [0, 0, -1]));
  const forward = velocity.lengthSq() > 0.0001 ? velocity.normalize() : new THREE.Vector3(0, 0, -1);
  const trail = lerp(profile.closeTrailDistance, profile.closeTrailDistance * 1.34, diveState.diveIntensity);
  const lift = lerp(profile.closeLift, profile.closeLift * 0.72, diveState.wingTuck);
  const shake = diveState.cameraShakeHint;
  const shakeOffset = new THREE.Vector3(
    Math.sin(performance.now() * 0.035) * shake,
    Math.cos(performance.now() * 0.031) * shake * 0.55,
    0
  );

  const desiredPosition = bird.clone()
    .add(forward.clone().multiplyScalar(-trail))
    .add(new THREE.Vector3(0, lift, 0))
    .add(shakeOffset);
  const desiredTarget = bird.clone().add(forward.clone().multiplyScalar(profile.lookAhead + diveState.diveIntensity * 4));

  this.position.lerp(desiredPosition, 0.9);
  return originalLookAt.call(this, desiredTarget, ...rest);
}

THREE.PerspectiveCamera.prototype.lookAt = diveCameraLookAt;

function attachWhenReady() {
  const host = window.GameHost;
  if (!host?.getState || host.__birdDiveDomainAttached) {
    requestAnimationFrame(attachWhenReady);
    return;
  }

  const originalGetState = host.getState;
  host.getState = () => {
    const state = originalGetState();
    return {
      ...state,
      diveDomain: readDiveState(state.local)
    };
  };
  host.__birdDiveDomainAttached = true;

  function tick() {
    const diveState = host.getState().diveDomain;
    applyDivePose(host, diveState);
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

window.OpenAboveBirdDiveDomainKit = {
  id: DIVE_KIT_ID,
  profile,
  readDiveState
};
requestAnimationFrame(attachWhenReady);
