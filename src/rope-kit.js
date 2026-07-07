import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export const ROPE_KIT_ID = "open-above-rope-kit";

export const defaultRopeProfile = {
  segments: 10,
  color: 0x050505,
  stripeColor: 0x8a8a8a,
  opacity: 0.95,
  sag: 0.16,
  sway: 0.045,
  radius: 0.035,
  radialSegments: 6,
  stripeEvery: 2
};

function vec3(value) {
  return value?.isVector3 ? value.clone() : new THREE.Vector3(...(value ?? [0, 0, 0]));
}

function computePoints(data, timeSeconds = 0) {
  const points = [];
  const start = data.startPoint;
  const end = data.endPoint;
  const span = start.distanceTo(end) || 1;
  const side = new THREE.Vector3().subVectors(end, start).cross(new THREE.Vector3(0, 1, 0));
  if (side.lengthSq() < 0.0001) side.set(1, 0, 0);
  side.normalize();

  for (let i = 0; i <= data.segments; i += 1) {
    const t = i / data.segments;
    const point = start.clone().lerp(end, t);
    const sagShape = Math.sin(Math.PI * t);
    const sway = Math.sin(timeSeconds * 1.35 + data.phase + t * Math.PI * 2) * data.sway * span * sagShape;
    point.y -= data.sag * span * sagShape;
    point.addScaledVector(side, sway);
    points.push(point);
  }
  return points;
}

function makeTubeGeometry(points, radius, radialSegments) {
  const positions = [];
  const normals = [];
  const indices = [];
  const up = new THREE.Vector3(0, 1, 0);

  for (let i = 0; i < points.length; i += 1) {
    const prev = points[Math.max(0, i - 1)];
    const next = points[Math.min(points.length - 1, i + 1)];
    const tangent = new THREE.Vector3().subVectors(next, prev).normalize();
    let normal = new THREE.Vector3().crossVectors(tangent, up).normalize();
    if (normal.lengthSq() < 0.0001) normal.set(1, 0, 0);
    const binormal = new THREE.Vector3().crossVectors(tangent, normal).normalize();

    for (let r = 0; r < radialSegments; r += 1) {
      const a = (r / radialSegments) * Math.PI * 2;
      const ringNormal = normal.clone().multiplyScalar(Math.cos(a)).add(binormal.clone().multiplyScalar(Math.sin(a))).normalize();
      const p = points[i].clone().addScaledVector(ringNormal, radius);
      positions.push(p.x, p.y, p.z);
      normals.push(ringNormal.x, ringNormal.y, ringNormal.z);
    }
  }

  for (let i = 0; i < points.length - 1; i += 1) {
    for (let r = 0; r < radialSegments; r += 1) {
      const a = i * radialSegments + r;
      const b = i * radialSegments + ((r + 1) % radialSegments);
      const c = (i + 1) * radialSegments + r;
      const d = (i + 1) * radialSegments + ((r + 1) % radialSegments);
      indices.push(a, c, b, b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geometry.setIndex(indices);
  geometry.computeBoundingSphere();
  return geometry;
}

function refreshRopeMeshes(group, points) {
  const data = group.userData.rope;
  group.userData.core.geometry.dispose();
  group.userData.core.geometry = makeTubeGeometry(points, data.radius, data.radialSegments);

  group.userData.stripes.forEach((stripe, i) => {
    const sourceIndex = Math.min(points.length - 1, Math.max(0, (i + 1) * data.stripeEvery));
    const p = points[sourceIndex];
    stripe.position.copy(p);
    stripe.rotation.y = data.phase + i * 0.7;
    stripe.rotation.z = Math.sin(data.phase + i) * 0.35;
  });
}

export function buildSoftRope(startPoint, endPoint, profile = defaultRopeProfile) {
  const group = new THREE.Group();
  const segments = Math.max(2, Math.floor(profile.segments ?? 10));
  const data = {
    startPoint: vec3(startPoint),
    endPoint: vec3(endPoint),
    segments,
    sag: profile.sag ?? defaultRopeProfile.sag,
    sway: profile.sway ?? defaultRopeProfile.sway,
    phase: profile.phase ?? 0,
    radius: profile.radius ?? defaultRopeProfile.radius,
    radialSegments: profile.radialSegments ?? defaultRopeProfile.radialSegments,
    stripeEvery: profile.stripeEvery ?? defaultRopeProfile.stripeEvery
  };
  const points = computePoints(data, 0);
  const core = new THREE.Mesh(
    makeTubeGeometry(points, data.radius, data.radialSegments),
    new THREE.MeshStandardMaterial({ color: profile.color ?? defaultRopeProfile.color, roughness: 0.82, metalness: 0.04 })
  );
  core.name = "open-above-rope-core-tube";
  group.add(core);

  const stripes = [];
  const stripeMaterial = new THREE.MeshStandardMaterial({ color: profile.stripeColor ?? defaultRopeProfile.stripeColor, roughness: 0.78 });
  for (let i = 0; i < Math.floor(segments / data.stripeEvery); i += 1) {
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(data.radius * 3.1, data.radius * 0.42, data.radius * 3.1), stripeMaterial);
    stripe.name = "open-above-rope-grey-stripe";
    stripes.push(stripe);
    group.add(stripe);
  }

  group.name = "open-above-soft-rope";
  group.userData.domain = ROPE_KIT_ID;
  group.userData.rope = data;
  group.userData.core = core;
  group.userData.stripes = stripes;
  refreshRopeMeshes(group, points);
  return group;
}

export function updateSoftRope(rope, startPoint = null, endPoint = null, timeSeconds = 0) {
  const data = rope?.userData?.rope;
  if (!data) return rope;
  if (startPoint) data.startPoint.copy(vec3(startPoint));
  if (endPoint) data.endPoint.copy(vec3(endPoint));
  refreshRopeMeshes(rope, computePoints(data, timeSeconds));
  return rope;
}

window.OpenAboveRopeKit = {
  id: ROPE_KIT_ID,
  defaultRopeProfile,
  buildSoftRope,
  updateSoftRope
};
