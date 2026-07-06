import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export const HOT_AIR_BALLOON_RIGGING_KIT_ID = "open-above-hot-air-balloon-rigging-kit";

export const defaultRiggingProfile = {
  ropeColor: 0xf5deb3,
  ropeOpacity: 0.82,
  topRadius: 1.28,
  bottomWidth: 0.82,
  bottomDepth: 0.62
};

function makeRope(a, b, material) {
  const geometry = new THREE.BufferGeometry().setFromPoints([a, b]);
  return new THREE.Line(geometry, material);
}

export function buildRigging(profile = defaultRiggingProfile) {
  const group = new THREE.Group();
  group.name = "hot-air-balloon-rigging";
  group.userData.domain = HOT_AIR_BALLOON_RIGGING_KIT_ID;

  const ropeMat = new THREE.LineBasicMaterial({ color: profile.ropeColor, transparent: true, opacity: profile.ropeOpacity });
  const topY = 0.42;
  const bottomY = -1.08;
  const anchors = [
    [-profile.topRadius, topY, -profile.topRadius],
    [profile.topRadius, topY, -profile.topRadius],
    [-profile.topRadius, topY, profile.topRadius],
    [profile.topRadius, topY, profile.topRadius]
  ];
  const basket = [
    [-profile.bottomWidth, bottomY, -profile.bottomDepth],
    [profile.bottomWidth, bottomY, -profile.bottomDepth],
    [-profile.bottomWidth, bottomY, profile.bottomDepth],
    [profile.bottomWidth, bottomY, profile.bottomDepth]
  ];

  for (let i = 0; i < anchors.length; i += 1) {
    group.add(makeRope(new THREE.Vector3(...anchors[i]), new THREE.Vector3(...basket[i]), ropeMat));
  }

  const crossA = makeRope(new THREE.Vector3(...basket[0]), new THREE.Vector3(...basket[3]), ropeMat);
  const crossB = makeRope(new THREE.Vector3(...basket[1]), new THREE.Vector3(...basket[2]), ropeMat);
  group.add(crossA, crossB);

  return group;
}

window.OpenAboveHotAirBalloonRiggingKit = {
  id: HOT_AIR_BALLOON_RIGGING_KIT_ID,
  defaultRiggingProfile,
  buildRigging
};
