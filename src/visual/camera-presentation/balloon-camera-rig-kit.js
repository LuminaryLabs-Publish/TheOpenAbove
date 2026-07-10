import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { createClippingFadeKit } from "./clipping-fade-kit.js";

export const BALLOON_CAMERA_RIG_KIT_ID = "open-above-balloon-camera-rig-kit";

const clamp = (value, min, max) => Math.max(min, Math.min(max, Number(value) || 0));
const smooth = (rate, dt) => 1 - Math.exp(-rate * dt);
const smoothstep = (edge0, edge1, value) => {
  const t = clamp((value - edge0) / Math.max(0.0001, edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

export function createBalloonCameraRig(camera, balloon, profile = {}) {
  const state = {
    zoom: profile.initialZoom ?? 48,
    firstPersonBlend: 0,
    mode: "third-person",
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
  const quaternion = new THREE.Quaternion();

  function update(dt, flightState) {
    const windForward = flightState.wind.clone().normalize();
    const side = new THREE.Vector3(-windForward.z, 0, windForward.x).normalize();
    const targetBlend = 1 - smoothstep(4, 25, state.zoom);
    state.firstPersonBlend = THREE.MathUtils.lerp(state.firstPersonBlend, targetBlend, smooth(5.4, dt));
    state.mode = state.firstPersonBlend > 0.72 ? "basket-view" : "third-person";

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
    const thirdPersonLook = basketCenterWorld.clone().add(balloonUp.clone().multiplyScalar(1.9));
    const thirdPersonPos = thirdPersonLook.clone()
      .add(windForward.clone().multiplyScalar(-zoomDistance))
      .add(side.clone().multiplyScalar(zoomDistance * (0.31 + slowOrbit * 0.08) + rideSway))
      .add(balloonUp.clone().multiplyScalar(8.4 + zoomDistance * 0.16 + rideBob));

    const firstPersonPos = riderEyeWorld.clone()
      .add(balloonUp.clone().multiplyScalar(rideBob + burnerVibration))
      .add(windForward.clone().multiplyScalar(0.3))
      .add(side.clone().multiplyScalar(0.12 + rideSway * 0.18));
    const firstPersonLook = firstPersonPos.clone()
      .add(windForward.clone().multiplyScalar(46))
      .add(side.clone().multiplyScalar(0.65))
      .add(balloonUp.clone().multiplyScalar(0.22 + rideBob * 0.4));

    const desiredPosition = thirdPersonPos.lerp(firstPersonPos, state.firstPersonBlend);
    const desiredTarget = thirdPersonLook.lerp(firstPersonLook, state.firstPersonBlend);
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
