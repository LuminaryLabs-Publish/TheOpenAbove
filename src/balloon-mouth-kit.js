import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { envelopeMouthRadius, resolveEnvelopeShapeProfile } from "./balloon-envelope-profile-kit.js";

export const BALLOON_MOUTH_KIT_ID = "open-above-balloon-mouth-kit";

export const defaultBalloonMouthProfile = {
  radius: 0.78,
  ringWidth: 0.12,
  y: 0.44,
  skirtHeight: 0.5,
  scoopDepth: 0.1,
  segments: 32,
  ringColor: 0x422719,
  innerColor: 0x120c08,
  skirtColor: 0xa94f12
};

function ringStripGeometry(innerRadius, outerRadius, segments) {
  const positions = [];
  const normals = [];
  const uvs = [];
  const indices = [];
  for (let i = 0; i <= segments; i += 1) {
    const a = i / segments * Math.PI * 2;
    const s = Math.sin(a);
    const c = Math.cos(a);
    positions.push(s * innerRadius, 0, c * innerRadius, s * outerRadius, 0, c * outerRadius);
    normals.push(0, -1, 0, 0, -1, 0);
    uvs.push(i / segments, 0, i / segments, 1);
  }
  for (let i = 0; i < segments; i += 1) {
    const n = i * 2;
    indices.push(n, n + 2, n + 1, n + 1, n + 2, n + 3);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeBoundingSphere();
  return geometry;
}

function skirtStripGeometry(radiusTop, radiusBottom, height, scoopDepth, segments) {
  const positions = [];
  const normals = [];
  const uvs = [];
  const indices = [];
  for (let i = 0; i <= segments; i += 1) {
    const a = i / segments * Math.PI * 2;
    const s = Math.sin(a);
    const c = Math.cos(a);
    const scoop = Math.cos(a - Math.PI * 0.3) * scoopDepth;
    positions.push(
      s * radiusTop, 0, c * radiusTop,
      s * radiusBottom, -height - scoop, c * radiusBottom
    );
    normals.push(s, 0.22, c, s, 0.18, c);
    uvs.push(i / segments, 0, i / segments, 1);
  }
  for (let i = 0; i < segments; i += 1) {
    const n = i * 2;
    indices.push(n, n + 1, n + 2, n + 1, n + 3, n + 2);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeBoundingSphere();
  return geometry;
}

export function buildBalloonMouth(profile = defaultBalloonMouthProfile, envelopeProfile = {}) {
  const group = new THREE.Group();
  group.name = "balloon-open-mouth";
  group.userData.domain = BALLOON_MOUTH_KIT_ID;
  group.userData.openBottom = true;
  const shape = resolveEnvelopeShapeProfile(envelopeProfile);
  const radius = Math.min(
    Number(profile.radius) || defaultBalloonMouthProfile.radius,
    envelopeMouthRadius(shape) * 1.08
  );
  const y = Number.isFinite(profile.y) ? profile.y : shape.baseY;
  const segments = Math.max(16, Math.floor(profile.segments ?? 32));

  const ring = new THREE.Mesh(
    ringStripGeometry(radius, radius + profile.ringWidth, segments),
    new THREE.MeshStandardMaterial({ color: profile.ringColor, roughness: 0.86, side: THREE.DoubleSide })
  );
  ring.name = "balloon-mouth-ring";
  ring.position.y = y;
  group.add(ring);

  const innerMaterial = new THREE.MeshStandardMaterial({
    color: profile.innerColor,
    roughness: 0.98,
    emissive: 0x2a0800,
    emissiveIntensity: 0.18,
    side: THREE.DoubleSide
  });
  const inner = new THREE.Mesh(ringStripGeometry(0, radius * 0.9, segments), innerMaterial);
  inner.name = "balloon-open-inner-shadow";
  inner.position.y = y - 0.035;
  group.add(inner);

  const skirt = new THREE.Mesh(
    skirtStripGeometry(
      radius + profile.ringWidth * 0.45,
      radius * 0.64,
      profile.skirtHeight,
      profile.scoopDepth,
      segments
    ),
    new THREE.MeshStandardMaterial({ color: profile.skirtColor, roughness: 0.9, side: THREE.DoubleSide })
  );
  skirt.name = "balloon-fabric-mouth-skirt";
  skirt.position.y = y;
  group.add(skirt);

  group.userData.innerMaterial = innerMaterial;
  group.userData.ring = ring;
  group.userData.skirt = skirt;
  group.userData.radius = radius;
  return group;
}

window.OpenAboveBalloonMouthKit = {
  id: BALLOON_MOUTH_KIT_ID,
  defaultBalloonMouthProfile,
  buildBalloonMouth
};
