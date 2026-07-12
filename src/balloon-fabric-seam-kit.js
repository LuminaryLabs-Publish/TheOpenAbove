import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import {
  resolveEnvelopeShapeProfile,
  sampleEnvelopeNormal,
  sampleEnvelopePoint
} from "./balloon-envelope-profile-kit.js";

export const BALLOON_FABRIC_SEAM_KIT_ID = "open-above-balloon-fabric-seam-kit";

export const defaultFabricSeamProfile = {
  seamCount: 12,
  verticalSteps: 28,
  widthRadians: 0.008,
  surfaceOffset: 0.028,
  color: 0x76541f,
  opacity: 0.52
};

export function buildFabricSeams(profile = defaultFabricSeamProfile, envelopeProfile = {}) {
  const group = new THREE.Group();
  group.name = "balloon-load-tapes";
  group.userData.domain = BALLOON_FABRIC_SEAM_KIT_ID;
  const shape = resolveEnvelopeShapeProfile(envelopeProfile);
  const seamCount = Math.max(4, Math.floor(profile.seamCount ?? 12));
  const verticalSteps = Math.max(8, Math.floor(profile.verticalSteps ?? 28));
  const width = Math.max(0.001, Number(profile.widthRadians) || 0.008);
  const offset = Math.max(0, Number(profile.surfaceOffset) || 0.028);
  const positions = [];
  const normals = [];
  const indices = [];

  for (let seam = 0; seam < seamCount; seam += 1) {
    const angle = seam / seamCount * Math.PI * 2;
    const base = positions.length / 3;
    for (let v = 1; v < verticalSteps; v += 1) {
      const t = v / verticalSteps;
      for (const side of [-1, 1]) {
        const sampleAngle = angle + width * side;
        const point = sampleEnvelopePoint(sampleAngle, t, shape, offset);
        const normal = sampleEnvelopeNormal(sampleAngle, t, shape);
        positions.push(point.x, point.y, point.z);
        normals.push(normal.x, normal.y, normal.z);
      }
    }
    for (let v = 0; v < verticalSteps - 2; v += 1) {
      const i = base + v * 2;
      indices.push(i, i + 1, i + 2, i + 1, i + 3, i + 2);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geometry.setIndex(indices);
  geometry.computeBoundingSphere();

  const material = new THREE.MeshStandardMaterial({
    color: profile.color ?? defaultFabricSeamProfile.color,
    roughness: 0.9,
    transparent: true,
    opacity: profile.opacity ?? defaultFabricSeamProfile.opacity,
    depthWrite: true,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = "balloon-unified-load-tape-mesh";
  group.add(mesh);
  group.userData.mesh = mesh;
  group.userData.sharedEnvelopeProfile = true;
  return group;
}

window.OpenAboveBalloonFabricSeamKit = {
  id: BALLOON_FABRIC_SEAM_KIT_ID,
  defaultFabricSeamProfile,
  buildFabricSeams
};
