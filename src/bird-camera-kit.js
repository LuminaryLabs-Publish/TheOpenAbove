import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { clamp01, lerp } from "./bird-flight-physics-kit.js";

export const BIRD_CAMERA_KIT_ID = "open-above-bird-camera-kit";

const cameraProfile = {
  trailDistance: 10.2,
  diveTrailDistance: 13.4,
  lift: 3.2,
  diveLift: 2.15,
  lookAhead: 8.2,
  diveLookAhead: 12.5,
  followAlpha: 0.92
};

function vectorFromArray(value, fallback) {
  return new THREE.Vector3(...(Array.isArray(value) ? value : fallback));
}

const originalLookAt = THREE.PerspectiveCamera.prototype.lookAt;
THREE.PerspectiveCamera.prototype.lookAt = function birdCameraLookAt(target, ...rest) {
  const host = window.GameHost;
  if (!host || this !== host.camera) return originalLookAt.call(this, target, ...rest);

  const state = host.getState?.();
  const local = state?.local;
  const physics = state?.flightPhysics;
  const frame = state?.flightFrame ?? physics?.flightFrame;
  if (!local?.position || !physics) return originalLookAt.call(this, target, ...rest);

  const bird = vectorFromArray(frame?.position, local.position);
  const forward = vectorFromArray(frame?.forward, [0, 0, -1]).normalize();
  const up = vectorFromArray(frame?.up, [0, 1, 0]).normalize();
  const dive = clamp01(physics.diveIntensity);
  const tuck = clamp01(physics.wingTuck);
  const shake = physics.cameraShakeHint ?? 0;

  const trail = lerp(cameraProfile.trailDistance, cameraProfile.diveTrailDistance, dive);
  const lift = lerp(cameraProfile.lift, cameraProfile.diveLift, tuck);
  const lookAhead = lerp(cameraProfile.lookAhead, cameraProfile.diveLookAhead, dive);
  const shakeOffset = new THREE.Vector3(
    Math.sin(performance.now() * 0.037) * shake,
    Math.cos(performance.now() * 0.029) * shake * 0.45,
    0
  );

  const desiredPosition = bird.clone()
    .add(forward.clone().multiplyScalar(-trail))
    .add(up.clone().multiplyScalar(lift))
    .add(shakeOffset);
  const desiredTarget = bird.clone().add(forward.clone().multiplyScalar(lookAhead));

  this.position.lerp(desiredPosition, cameraProfile.followAlpha);
  return originalLookAt.call(this, desiredTarget, ...rest);
};

window.OpenAboveBirdCameraKit = {
  id: BIRD_CAMERA_KIT_ID,
  profile: cameraProfile
};
