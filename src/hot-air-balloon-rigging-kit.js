import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { buildSoftRope, updateSoftRope } from "./rope-kit.js";

export const HOT_AIR_BALLOON_RIGGING_KIT_ID = "open-above-hot-air-balloon-rigging-kit";

export const defaultRiggingProfile = {
  ropeColor: 0x4a3320,
  ropeStripeColor: 0x6b5844,
  ropeOpacity: 0.96,
  ropeSegments: 10,
  topRadius: 0.72,
  topY: 0.44,
  bottomY: -1.18,
  bottomWidth: 0.72,
  bottomDepth: 0.52,
  sag: 0.035,
  sway: 0.012,
  frameTopY: -0.34,
  frameBottomY: -1.08,
  frameWidth: 0.78,
  frameDepth: 0.58,
  frameColor: 0x323840
};

function addBar(group, start, end, radius, material, name) {
  const a = new THREE.Vector3(...start);
  const b = new THREE.Vector3(...end);
  const delta = new THREE.Vector3().subVectors(b, a);
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, delta.length(), 8), material);
  mesh.name = name;
  mesh.position.copy(a).add(b).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), delta.normalize());
  group.add(mesh);
  return mesh;
}

export function buildRigging(profile = defaultRiggingProfile) {
  const p = { ...defaultRiggingProfile, ...profile };
  const group = new THREE.Group();
  group.name = "hot-air-balloon-rigging";
  group.userData.domain = HOT_AIR_BALLOON_RIGGING_KIT_ID;

  const frameMat = new THREE.MeshStandardMaterial({ color: p.frameColor, roughness: 0.48, metalness: 0.5 });
  const frameCorners = [
    [-p.frameWidth, p.frameBottomY, -p.frameDepth],
    [p.frameWidth, p.frameBottomY, -p.frameDepth],
    [-p.frameWidth, p.frameBottomY, p.frameDepth],
    [p.frameWidth, p.frameBottomY, p.frameDepth]
  ];
  const frameTopCorners = frameCorners.map(([x, , z]) => [x * 0.92, p.frameTopY, z * 0.92]);
  frameCorners.forEach((corner, index) => addBar(group, corner, frameTopCorners[index], 0.035, frameMat, "burner-frame-post"));
  addBar(group, frameTopCorners[0], frameTopCorners[1], 0.035, frameMat, "burner-frame-crossbar");
  addBar(group, frameTopCorners[2], frameTopCorners[3], 0.035, frameMat, "burner-frame-crossbar");
  addBar(group, frameTopCorners[0], frameTopCorners[2], 0.035, frameMat, "burner-frame-crossbar");
  addBar(group, frameTopCorners[1], frameTopCorners[3], 0.035, frameMat, "burner-frame-crossbar");

  const anchors = [
    [-p.topRadius, p.topY, -p.topRadius * 0.58],
    [p.topRadius, p.topY, -p.topRadius * 0.58],
    [-p.topRadius, p.topY, p.topRadius * 0.58],
    [p.topRadius, p.topY, p.topRadius * 0.58]
  ];
  const basket = [
    [-p.bottomWidth, p.bottomY, -p.bottomDepth],
    [p.bottomWidth, p.bottomY, -p.bottomDepth],
    [-p.bottomWidth, p.bottomY, p.bottomDepth],
    [p.bottomWidth, p.bottomY, p.bottomDepth]
  ];

  const ropes = [];
  for (let i = 0; i < anchors.length; i += 1) {
    const rope = buildSoftRope(new THREE.Vector3(...anchors[i]), new THREE.Vector3(...basket[i]), {
      segments: p.ropeSegments,
      color: p.ropeColor,
      stripeColor: p.ropeStripeColor,
      opacity: p.ropeOpacity,
      sag: p.sag,
      sway: p.sway,
      phase: i * Math.PI * 0.5,
      radius: 0.022,
      radialSegments: 5,
      stripeEvery: 1000
    });
    rope.name = `balloon-load-cable-${i}`;
    ropes.push(rope);
    group.add(rope);
  }

  group.userData.ropes = ropes;
  group.userData.connectionPoints = { anchors, basket };
  group.userData.frame = { corners: frameCorners, topCorners: frameTopCorners };
  return group;
}

export function animateRigging(rigging, time = performance.now(), tension = 0) {
  const ropes = rigging?.userData?.ropes ?? [];
  const points = rigging?.userData?.connectionPoints;
  if (!points) return;
  const seconds = time * 0.001;
  const tensionScale = Math.max(0, Math.min(1, Number(tension) || 0));
  ropes.forEach((rope, i) => {
    rope.userData.rope.sag = THREE.MathUtils.lerp(0.045, 0.012, tensionScale);
    updateSoftRope(rope, new THREE.Vector3(...points.anchors[i]), new THREE.Vector3(...points.basket[i]), seconds);
  });
}

window.OpenAboveHotAirBalloonRiggingKit = {
  id: HOT_AIR_BALLOON_RIGGING_KIT_ID,
  defaultRiggingProfile,
  buildRigging,
  animateRigging
};
