import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export const BALLOON_ENVELOPE_PANEL_KIT_ID = "open-above-balloon-envelope-panel-kit";

export const defaultEnvelopePanelProfile = {
  goreCount: 16,
  verticalSteps: 18,
  radius: 2.62,
  height: 5.9,
  baseY: 0.42,
  colors: [0xe8c65d, 0xf1d272, 0xd9b74a, 0xf4dc89]
};

function radiusAt(t, profile) {
  const crown = Math.sin(Math.PI * Math.max(0.03, Math.min(0.98, t))) ** 0.42;
  const throatTaper = 0.44 + 0.56 * Math.sin(Math.PI * Math.min(0.82, t) / 0.82) ** 0.34;
  const mouth = 0.38 + t * 0.58;
  return profile.radius * crown * Math.min(1, Math.max(mouth, throatTaper));
}

function pointAt(angle, t, profile, offset = 0) {
  const r = radiusAt(t, profile) + offset;
  const y = profile.baseY + t * profile.height;
  return [Math.sin(angle) * r, y, Math.cos(angle) * r];
}

export function buildEnvelopePanels(profile = defaultEnvelopePanelProfile) {
  const group = new THREE.Group();
  group.name = "balloon-envelope-panels";
  group.userData.domain = BALLOON_ENVELOPE_PANEL_KIT_ID;
  group.userData.triangulated = true;

  const step = (Math.PI * 2) / profile.goreCount;
  for (let gore = 0; gore < profile.goreCount; gore += 1) {
    const a0 = gore * step;
    const a1 = (gore + 1) * step;
    const positions = [];
    const normals = [];
    const indices = [];

    for (let v = 0; v <= profile.verticalSteps; v += 1) {
      const t = v / profile.verticalSteps;
      const p0 = pointAt(a0, t, profile);
      const p1 = pointAt(a1, t, profile);
      positions.push(...p0, ...p1);
      const n0 = new THREE.Vector3(p0[0], 0.22, p0[2]).normalize();
      const n1 = new THREE.Vector3(p1[0], 0.22, p1[2]).normalize();
      normals.push(n0.x, n0.y, n0.z, n1.x, n1.y, n1.z);
    }

    for (let v = 0; v < profile.verticalSteps; v += 1) {
      const i = v * 2;
      indices.push(i, i + 1, i + 2, i + 1, i + 3, i + 2);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
    geometry.setIndex(indices);
    geometry.computeBoundingSphere();

    const material = new THREE.MeshStandardMaterial({
      color: profile.colors[gore % profile.colors.length],
      roughness: 0.86,
      metalness: 0.0,
      side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = `balloon-envelope-gore-${gore}`;
    group.add(mesh);
  }

  return group;
}

window.OpenAboveBalloonEnvelopePanelKit = {
  id: BALLOON_ENVELOPE_PANEL_KIT_ID,
  defaultEnvelopePanelProfile,
  buildEnvelopePanels
};
