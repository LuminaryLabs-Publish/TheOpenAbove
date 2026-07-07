import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export const BALLOON_FABRIC_SEAM_KIT_ID = "open-above-balloon-fabric-seam-kit";

export const defaultFabricSeamProfile = {
  seamCount: 16,
  verticalSteps: 18,
  radius: 2.69,
  baseY: 0.62,
  height: 5.18,
  color: 0x7c5f22,
  opacity: 0.64
};

function radiusAt(t, profile) {
  const crown = Math.sin(Math.PI * Math.max(0.04, Math.min(0.97, t))) ** 0.42;
  const bottom = 0.42 + t * 0.58;
  return profile.radius * crown * Math.min(1, bottom);
}

export function buildFabricSeams(profile = defaultFabricSeamProfile) {
  const group = new THREE.Group();
  group.name = "balloon-rib-lines";
  group.userData.domain = BALLOON_FABRIC_SEAM_KIT_ID;
  const material = new THREE.LineBasicMaterial({ color: profile.color, transparent: true, opacity: profile.opacity });
  for (let i = 0; i < profile.seamCount; i += 1) {
    const angle = (i / profile.seamCount) * Math.PI * 2;
    const points = [];
    for (let v = 1; v < profile.verticalSteps; v += 1) {
      const t = v / profile.verticalSteps;
      const r = radiusAt(t, profile);
      points.push(new THREE.Vector3(Math.sin(angle) * r, profile.baseY + t * profile.height, Math.cos(angle) * r));
    }
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), material));
  }
  return group;
}

window.OpenAboveBalloonFabricSeamKit = {
  id: BALLOON_FABRIC_SEAM_KIT_ID,
  defaultFabricSeamProfile,
  buildFabricSeams
};
