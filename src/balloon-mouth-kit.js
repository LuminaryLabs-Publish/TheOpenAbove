import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export const BALLOON_MOUTH_KIT_ID = "open-above-balloon-mouth-kit";

export const defaultBalloonMouthProfile = {
  radius: 1.04,
  ringWidth: 0.16,
  y: 0.42,
  skirtHeight: 0.46,
  segments: 40,
  ringColor: 0x3d2614,
  innerColor: 0x17100b,
  skirtColor: 0xb45309
};

function ringStripGeometry(innerRadius, outerRadius, segments) {
  const positions = [];
  const normals = [];
  const indices = [];
  for (let i = 0; i <= segments; i += 1) {
    const a = (i / segments) * Math.PI * 2;
    const s = Math.sin(a);
    const c = Math.cos(a);
    positions.push(s * innerRadius, 0, c * innerRadius, s * outerRadius, 0, c * outerRadius);
    normals.push(0, -1, 0, 0, -1, 0);
  }
  for (let i = 0; i < segments; i += 1) {
    const n = i * 2;
    indices.push(n, n + 2, n + 1, n + 1, n + 2, n + 3);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geometry.setIndex(indices);
  geometry.computeBoundingSphere();
  return geometry;
}

function skirtStripGeometry(radiusTop, radiusBottom, height, segments) {
  const positions = [];
  const normals = [];
  const indices = [];
  for (let i = 0; i <= segments; i += 1) {
    const a = (i / segments) * Math.PI * 2;
    const s = Math.sin(a);
    const c = Math.cos(a);
    positions.push(s * radiusTop, 0, c * radiusTop, s * radiusBottom, -height, c * radiusBottom);
    normals.push(s, 0.2, c, s, 0.2, c);
  }
  for (let i = 0; i < segments; i += 1) {
    const n = i * 2;
    indices.push(n, n + 1, n + 2, n + 1, n + 3, n + 2);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geometry.setIndex(indices);
  geometry.computeBoundingSphere();
  return geometry;
}

export function buildBalloonMouth(profile = defaultBalloonMouthProfile) {
  const group = new THREE.Group();
  group.name = "balloon-open-mouth";
  group.userData.domain = BALLOON_MOUTH_KIT_ID;
  group.userData.openBottom = true;

  const ring = new THREE.Mesh(
    ringStripGeometry(profile.radius, profile.radius + profile.ringWidth, profile.segments),
    new THREE.MeshStandardMaterial({ color: profile.ringColor, roughness: 0.88, side: THREE.DoubleSide })
  );
  ring.name = "balloon-mouth-ring";
  ring.position.y = profile.y;
  group.add(ring);

  const inner = new THREE.Mesh(
    ringStripGeometry(0.0, profile.radius * 0.88, profile.segments),
    new THREE.MeshStandardMaterial({ color: profile.innerColor, roughness: 0.96, side: THREE.DoubleSide })
  );
  inner.name = "balloon-open-inner-shadow";
  inner.position.y = profile.y - 0.025;
  group.add(inner);

  const skirt = new THREE.Mesh(
    skirtStripGeometry(profile.radius + profile.ringWidth * 0.5, profile.radius * 0.68, profile.skirtHeight, profile.segments),
    new THREE.MeshStandardMaterial({ color: profile.skirtColor, roughness: 0.9, side: THREE.DoubleSide })
  );
  skirt.name = "balloon-fabric-mouth-skirt";
  skirt.position.y = profile.y;
  group.add(skirt);

  return group;
}

window.OpenAboveBalloonMouthKit = {
  id: BALLOON_MOUTH_KIT_ID,
  defaultBalloonMouthProfile,
  buildBalloonMouth
};
