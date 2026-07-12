import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import {
  envelopeTopY,
  resolveEnvelopeShapeProfile,
  sampleEnvelopeNormal,
  sampleEnvelopePoint
} from "./balloon-envelope-profile-kit.js";

export const BALLOON_ENVELOPE_PANEL_KIT_ID = "open-above-balloon-envelope-panel-kit";

export const defaultEnvelopePanelProfile = {
  goreCount: 24,
  verticalSteps: 32,
  maxRadius: 2.25,
  height: 6.2,
  baseY: 0.44,
  colors: [0xe2b84f, 0xf1ce68, 0xc99832, 0xf6dd8c, 0xd8aa3e, 0xf0c95c]
};

function goreColor(gore, profile, patternProfile = {}) {
  const palette = patternProfile.colors?.length ? patternProfile.colors : profile.colors;
  const accentEvery = Math.max(0, Math.floor(patternProfile.accentEvery ?? 0));
  if (accentEvery > 0 && gore % accentEvery === 0 && patternProfile.accentColors?.length) {
    return new THREE.Color(patternProfile.accentColors[(gore / accentEvery) % patternProfile.accentColors.length | 0]);
  }
  return new THREE.Color(palette[gore % palette.length]);
}

function buildContinuousEnvelopeGeometry(profile, patternProfile) {
  const shape = resolveEnvelopeShapeProfile(profile);
  const goreCount = Math.max(12, Math.floor(profile.goreCount ?? 24));
  const verticalSteps = Math.max(12, Math.floor(profile.verticalSteps ?? 32));
  const positions = [];
  const normals = [];
  const colors = [];
  const uvs = [];
  const indices = [];

  for (let gore = 0; gore < goreCount; gore += 1) {
    const a0 = gore / goreCount * Math.PI * 2;
    const a1 = (gore + 1) / goreCount * Math.PI * 2;
    const color = goreColor(gore, profile, patternProfile);
    const base = positions.length / 3;

    for (let v = 0; v <= verticalSteps; v += 1) {
      const t = v / verticalSteps;
      for (const [angle, u] of [[a0, gore / goreCount], [a1, (gore + 1) / goreCount]]) {
        const point = sampleEnvelopePoint(angle, t, shape);
        const normal = sampleEnvelopeNormal(angle, t, shape);
        positions.push(point.x, point.y, point.z);
        normals.push(normal.x, normal.y, normal.z);
        colors.push(color.r, color.g, color.b);
        uvs.push(u, t);
      }
    }

    for (let v = 0; v < verticalSteps; v += 1) {
      const i = base + v * 2;
      indices.push(i, i + 1, i + 2, i + 1, i + 3, i + 2);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeBoundingSphere();
  return geometry;
}

export function buildEnvelopePanels(profile = defaultEnvelopePanelProfile, patternProfile = {}) {
  const resolved = { ...defaultEnvelopePanelProfile, ...profile };
  const group = new THREE.Group();
  group.name = "balloon-envelope-continuous-shell";
  group.userData.domain = BALLOON_ENVELOPE_PANEL_KIT_ID;
  group.userData.triangulated = true;
  group.userData.continuousMesh = true;
  group.userData.profile = resolveEnvelopeShapeProfile(resolved);

  const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.82,
    metalness: 0,
    side: THREE.DoubleSide
  });
  const shell = new THREE.Mesh(buildContinuousEnvelopeGeometry(resolved, patternProfile), material);
  shell.name = "balloon-envelope-unified-gore-shell";
  shell.castShadow = true;
  shell.receiveShadow = true;
  group.add(shell);

  const crown = new THREE.Mesh(
    new THREE.CylinderGeometry(0.28, 0.34, 0.055, 24),
    new THREE.MeshStandardMaterial({ color: 0x8b3f24, roughness: 0.72, metalness: 0.02 })
  );
  crown.name = "balloon-parachute-valve-cap";
  crown.position.y = envelopeTopY(resolved) + 0.01;
  group.add(crown);

  group.userData.shell = shell;
  group.userData.crownValve = crown;
  return group;
}

window.OpenAboveBalloonEnvelopePanelKit = {
  id: BALLOON_ENVELOPE_PANEL_KIT_ID,
  defaultEnvelopePanelProfile,
  buildEnvelopePanels
};
