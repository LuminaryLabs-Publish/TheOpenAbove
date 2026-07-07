import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { buildSoftRope, updateSoftRope } from "./rope-kit.js";

export const HOT_AIR_BALLOON_RIGGING_KIT_ID = "open-above-hot-air-balloon-rigging-kit";

export const defaultRiggingProfile = {
  ropeColor: 0x050505,
  ropeStripeColor: 0x8a8a8a,
  ropeOpacity: 0.95,
  ropeSegments: 10,
  topRadius: 1.28,
  topY: 0.55,
  bottomY: -1.02,
  bottomWidth: 0.82,
  bottomDepth: 0.62,
  sag: 0.11,
  sway: 0.032
};

export function buildRigging(profile = defaultRiggingProfile) {
  const group = new THREE.Group();
  group.name = "hot-air-balloon-rigging";
  group.userData.domain = HOT_AIR_BALLOON_RIGGING_KIT_ID;

  const anchors = [
    [-profile.topRadius, profile.topY, -profile.topRadius],
    [profile.topRadius, profile.topY, -profile.topRadius],
    [-profile.topRadius, profile.topY, profile.topRadius],
    [profile.topRadius, profile.topY, profile.topRadius]
  ];
  const basket = [
    [-profile.bottomWidth, profile.bottomY, -profile.bottomDepth],
    [profile.bottomWidth, profile.bottomY, -profile.bottomDepth],
    [-profile.bottomWidth, profile.bottomY, profile.bottomDepth],
    [profile.bottomWidth, profile.bottomY, profile.bottomDepth]
  ];

  const ropes = [];
  for (let i = 0; i < anchors.length; i += 1) {
    const rope = buildSoftRope(new THREE.Vector3(...anchors[i]), new THREE.Vector3(...basket[i]), {
      segments: profile.ropeSegments,
      color: profile.ropeColor,
      stripeColor: profile.ropeStripeColor,
      opacity: profile.ropeOpacity,
      sag: profile.sag,
      sway: profile.sway,
      phase: i * Math.PI * 0.5,
      radius: 0.034,
      radialSegments: 6,
      stripeEvery: 2
    });
    ropes.push(rope);
    group.add(rope);
  }

  group.userData.ropes = ropes;
  group.userData.connectionPoints = { anchors, basket };
  return group;
}

export function animateRigging(rigging, time = performance.now()) {
  const ropes = rigging?.userData?.ropes ?? [];
  const points = rigging?.userData?.connectionPoints;
  if (!points) return;
  const seconds = time * 0.001;
  ropes.forEach((rope, i) => {
    updateSoftRope(rope, new THREE.Vector3(...points.anchors[i]), new THREE.Vector3(...points.basket[i]), seconds);
  });
}

window.OpenAboveHotAirBalloonRiggingKit = {
  id: HOT_AIR_BALLOON_RIGGING_KIT_ID,
  defaultRiggingProfile,
  buildRigging,
  animateRigging
};
