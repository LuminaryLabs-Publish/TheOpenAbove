import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { createClippingFadeKit } from "./clipping-fade-kit.js";

export const BALLOON_CAMERA_RIG_KIT_ID = "open-above-balloon-camera-rig-kit";

const clamp = (value, min, max) => Math.max(min, Math.min(max, Number(value) || 0));
const smooth = (rate, dt) => 1 - Math.exp(-rate * Math.max(0, dt));
const smoothstep = (edge0, edge1, value) => {
  const t = clamp((value - edge0) / Math.max(0.0001, edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

export function createBalloonCameraRig(camera, balloon, profile = {}) {
  const state = {
    zoom: profile.initialZoom ?? 48,
    firstPersonBlend: 0,
    mode: "third-person",
    steeringLook: 0,
    target: new THREE.Vector3(),
    position: new THREE.Vector3()
  };
  const clippingFade = createClippingFadeKit(balloon);
  const wheelStep = profile.wheelStep ?? 4;

  function onWheel(event) {
    state.zoom = clamp(state.zoom + Math.sign(event.deltaY) * wheelStep, 0, profile.maxZoom ?? 112);
  }
  addEventListener("wheel", onWheel, { passive: true });

  const floorWorld = new THREE.Vector3();
  const riderEyeWorld = new THREE.Vector3();
  const basketCenterWorld = new THREE.Vector3();
  const balloonUp = new THREE.Vector3();
  const windForward = new THREE.Vector3();
  const side = new THREE.Vector3();
  const quaternion = new THREE.Quaternion();
  const desiredPosition = new THREE.Vector3();
  const desiredTarget = new THREE.Vector3();
  const thirdPersonLook = new THREE.Vector3();
  const thirdPersonPos = new THREE.Vector3();
  const firstPersonPos = new THREE.Vector3();
  const firstPersonLook = new THREE.Vector3();

  function update(dt, flightState) {
    windForward.set(flightState.wind.x, 0, flightState.wind.z);
    if (windForward.lengthSq() < 0.0001) windForward.set(0, 0, -1);
    windForward.normalize();
    side.set(-windForward.z, 0, windForward.x).normalize();
    const targetBlend = 1 - smoothstep(4, 25, state.zoom);
    state.firstPersonBlend = THREE.MathUtils.lerp(state.firstPersonBlend, targetBlend, smooth(5.4, dt));
    state.mode = state.firstPersonBlend > 0.72 ? "basket-view" : "third-person";
    state.steeringLook = THREE.MathUtils.lerp(state.steeringLook, clamp(flightState.steeringInput, -1, 1), smooth(3.2, dt));

    const elapsed = flightState.elapsed;
    const rideBob = Math.sin(elapsed * 0.74) * 0.042 + Math.sin(elapsed * 0.29) * 0.028;
    const rideSway = Math.sin(elapsed * 0.38) * 0.075;
    const burnerVibration = flightState.burner > 0.45 ? Math.sin(elapsed * 24) * (flightState.burner - 0.45) * 0.021 : 0;
    const slowOrbit = Math.sin(elapsed * 0.055) * 0.22;

    balloon.updateMatrixWorld(true);
    const basket = balloon.userData.parts?.basket;
    const floorY = basket?.userData?.basketFloorY ?? -2;
    floorWorld.set(0, floorY, 0);
    basket?.localToWorld?.(floorWorld);
    basketCenterWorld.set(0, floorY + 0.46, 0);
    basket?.localToWorld?.(basketCenterWorld);
    riderEyeWorld.set(0, basket?.userData?.riderEyeY ?? floorY + 1.5, 0);
    basket?.localToWorld?.(riderEyeWorld);
    balloon.getWorldQuaternion(quaternion);
    balloonUp.set(0, 1, 0).applyQuaternion(quaternion).normalize();

    const zoomDistance = Math.max(25, state.zoom);
    thirdPersonLook.copy(basketCenterWorld)
      .addScaledVector(balloonUp, 1.9)
      .addScaledVector(side, state.steeringLook * 1.6);
    thirdPersonPos.copy(thirdPersonLook)
      .addScaledVector(windForward, -zoomDistance)
      .addScaledVector(side, zoomDistance * (0.31 + slowOrbit * 0.08) + rideSway - state.steeringLook * 1.4)
      .addScaledVector(balloonUp, 8.4 + zoomDistance * 0.16 + rideBob);

    firstPersonPos.copy(riderEyeWorld)
      .addScaledVector(balloonUp, rideBob + burnerVibration)
      .addScaledVector(windForward, 0.3)
      .addScaledVector(side, 0.12 + rideSway * 0.18);
    firstPersonLook.copy(firstPersonPos)
      .addScaledVector(windForward, 46)
      .addScaledVector(side, 0.65 + state.steeringLook * 4.2)
      .addScaledVector(balloonUp, 0.22 + rideBob * 0.4);

    desiredPosition.copy(thirdPersonPos).lerp(firstPersonPos, state.firstPersonBlend);
    desiredTarget.copy(thirdPersonLook).lerp(firstPersonLook, state.firstPersonBlend);
    camera.position.lerp(desiredPosition, smooth(3.15, dt));
    state.target.lerp(desiredTarget, smooth(4.2, dt));
    camera.lookAt(state.target);
    camera.fov = THREE.MathUtils.lerp(56, 68, state.firstPersonBlend);
    camera.updateProjectionMatrix();
    clippingFade.update(state.firstPersonBlend);
    state.position.copy(camera.position);
    return state;
  }

  function dispose() {
    removeEventListener("wheel", onWheel);
  }

  return { id: BALLOON_CAMERA_RIG_KIT_ID, state, update, dispose };
}

window.OpenAboveBalloonCameraRigKit = { id: BALLOON_CAMERA_RIG_KIT_ID, createBalloonCameraRig };
