import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

const CAMERA_KIT_ID = "open-above-close-chase-camera-kit";
const CLOSE_TRAIL_DISTANCE = 9.6;
const CLOSE_LIFT = 4.2;
const LOOK_AHEAD = 8;

const originalLookAt = THREE.PerspectiveCamera.prototype.lookAt;

function closeChaseLookAt(target, ...rest) {
  if (!window.__OPEN_ABOVE_CLOSE_CAMERA_ACTIVE || !window.GameHost || this !== window.GameHost.camera) {
    return originalLookAt.call(this, target, ...rest);
  }

  const local = window.GameHost.getState?.()?.local;
  if (!local?.position || !local?.velocity) {
    return originalLookAt.call(this, target, ...rest);
  }

  const bird = new THREE.Vector3(...local.position);
  const velocity = new THREE.Vector3(...local.velocity);
  const forward = velocity.lengthSq() > 0.0001 ? velocity.normalize() : new THREE.Vector3(0, 0, -1);
  const desiredPosition = bird.clone()
    .add(forward.clone().multiplyScalar(-CLOSE_TRAIL_DISTANCE))
    .add(new THREE.Vector3(0, CLOSE_LIFT, 0));
  const desiredTarget = bird.clone().add(forward.clone().multiplyScalar(LOOK_AHEAD));

  this.position.lerp(desiredPosition, 0.92);
  return originalLookAt.call(this, desiredTarget, ...rest);
}

THREE.PerspectiveCamera.prototype.lookAt = closeChaseLookAt;
window.__OPEN_ABOVE_CLOSE_CAMERA_ACTIVE = true;
window.OpenAboveCameraKit = {
  id: CAMERA_KIT_ID,
  trailDistance: CLOSE_TRAIL_DISTANCE,
  lift: CLOSE_LIFT,
  lookAhead: LOOK_AHEAD
};
