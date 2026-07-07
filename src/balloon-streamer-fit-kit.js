import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export const BALLOON_STREAMER_FIT_KIT_ID = "open-above-balloon-streamer-fit-kit";

export const defaultStreamerFitProfile = {
  radius: 2.66,
  baseY: 0.64,
  height: 5.15,
  verticalSteps: 16,
  widthRadians: 0.12,
  surfaceOffset: 0.035,
  colors: [0x9f1239, 0xc2410c, 0xb0892f]
};

function radiusAt(t, profile) {
  const crown = Math.sin(Math.PI * Math.max(0.04, Math.min(0.97, t))) ** 0.42;
  const bottom = 0.42 + t * 0.58;
  return profile.radius * crown * Math.min(1, bottom);
}

function pointAt(angle, t, profile) {
  const r = radiusAt(t, profile) + profile.surfaceOffset;
  return [Math.sin(angle) * r, profile.baseY + t * profile.height, Math.cos(angle) * r];
}

export function buildFittedStreamers(profile = defaultStreamerFitProfile) {
  const group = new THREE.Group();
  group.name = "balloon-surface-color-panels";
  group.userData.domain = BALLOON_STREAMER_FIT_KIT_ID;
  group.userData.surfaceFitted = true;

  const angles = [0.25, 2.25, 4.25];
  for (let i = 0; i < angles.length; i += 1) {
    const center = angles[i];
    const positions = [];
    const normals = [];
    const indices = [];
    for (let v = 0; v <= profile.verticalSteps; v += 1) {
      const t = v / profile.verticalSteps;
      const width = profile.widthRadians * (0.45 + 0.55 * Math.sin(Math.PI * t));
      const left = pointAt(center - width, t, profile);
      const right = pointAt(center + width, t, profile);
      positions.push(...left, ...right);
      const nl = new THREE.Vector3(left[0], 0.25, left[2]).normalize();
      const nr = new THREE.Vector3(right[0], 0.25, right[2]).normalize();
      normals.push(nl.x, nl.y, nl.z, nr.x, nr.y, nr.z);
    }
    for (let v = 0; v < profile.verticalSteps; v += 1) {
      const n = v * 2;
      indices.push(n, n + 1, n + 2, n + 1, n + 3, n + 2);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
    geometry.setIndex(indices);
    geometry.computeBoundingSphere();
    const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: profile.colors[i % profile.colors.length], roughness: 0.88, side: THREE.DoubleSide }));
    mesh.name = `balloon-surface-color-panel-${i}`;
    group.add(mesh);
  }
  return group;
}

window.OpenAboveBalloonStreamerFitKit = {
  id: BALLOON_STREAMER_FIT_KIT_ID,
  defaultStreamerFitProfile,
  buildFittedStreamers
};
