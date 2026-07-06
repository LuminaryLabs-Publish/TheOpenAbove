import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { findBird, clamp01, lerp } from "./bird-flight-physics-kit.js";

export const BIRD_POSTURE_KIT_ID = "open-above-bird-posture-kit";

function applyFrameRotation(bird, frame, physics) {
  const rotation = frame?.rotation;
  if (Array.isArray(rotation) && rotation.length >= 4) {
    bird.rotation.set(rotation[0], rotation[1], rotation[2], rotation[3]);
  } else {
    bird.rotation.set(physics.pitch, physics.yaw, -physics.roll, "YXZ");
  }
  bird.userData.openAboveTruePitch = physics.pitch;
  bird.userData.openAboveTrueYaw = physics.yaw;
  bird.userData.openAboveTrueRoll = physics.roll;
  bird.userData.openAboveFlightForward = frame?.forward ?? [0, 0, -1];
}

function applyPosture(host) {
  const bird = findBird(host?.scene);
  if (!bird) return;

  const state = host.getState?.();
  const physics = state?.flightPhysics;
  const frame = state?.flightFrame ?? physics?.flightFrame;
  if (!physics) return;

  const tuck = clamp01(physics.wingTuck);
  const dive = clamp01(physics.diveIntensity);
  const pullout = clamp01((physics.pulloutLoad - 1) / 2.9);
  const speedPose = clamp01((physics.speed - 72) / 80);

  applyFrameRotation(bird, frame, physics);

  const leftWing = bird.userData.leftWing;
  const rightWing = bird.userData.rightWing;
  const tail = bird.userData.tail;

  leftWing.rotation.y = lerp(0, -1.28, tuck);
  rightWing.rotation.y = lerp(0, 1.28, tuck);
  leftWing.rotation.x = lerp(0, 0.24, dive) - pullout * 0.18;
  rightWing.rotation.x = lerp(0, 0.24, dive) - pullout * 0.18;
  leftWing.rotation.z = (leftWing.rotation.z || 0) + tuck * 0.42 - pullout * 0.16;
  rightWing.rotation.z = (rightWing.rotation.z || 0) - tuck * 0.42 + pullout * 0.16;

  tail.rotation.x = lerp(0, -0.18, dive) + pullout * 0.34;
  tail.scale.z = lerp(1, 0.62, tuck);
  bird.scale.z = lerp(1, 1.1, dive * speedPose);
  bird.scale.y = lerp(1, 0.88, tuck);
}

const originalRender = THREE.WebGLRenderer.prototype.render;
THREE.WebGLRenderer.prototype.render = function renderWithBirdPosture(scene, camera, ...rest) {
  const host = window.GameHost;
  if (host?.renderer === this) applyPosture(host);
  return originalRender.call(this, scene, camera, ...rest);
};

window.OpenAboveBirdPostureKit = {
  id: BIRD_POSTURE_KIT_ID,
  applyPosture
};
