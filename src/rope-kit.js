import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export const ROPE_KIT_ID = "open-above-rope-kit";

export const defaultRopeProfile = {
  segments: 10,
  color: 0x4a3320,
  stripeColor: 0x6b5844,
  opacity: 0.96,
  sag: 0.08,
  sway: 0.025,
  radius: 0.025,
  radialSegments: 5,
  stripeEvery: 1000
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

function createTubeGeometry(pointCount, radius, radialSegments) {
  const positions = new Float32Array(pointCount * radialSegments * 3);
  const normals = new Float32Array(pointCount * radialSegments * 3);
  const indices = [];
  for (let i = 0; i < pointCount - 1; i += 1) {
    for (let r = 0; r < radialSegments; r += 1) {
      const a = i * radialSegments + r;
      const b = i * radialSegments + (r + 1) % radialSegments;
      const c = (i + 1) * radialSegments + r;
      const d = (i + 1) * radialSegments + (r + 1) % radialSegments;
      indices.push(a, c, b, b, c, d);
    }
  }
  const geometry = new THREE.BufferGeometry();
  const position = new THREE.BufferAttribute(positions, 3);
  const normal = new THREE.BufferAttribute(normals, 3);
  position.setUsage(THREE.DynamicDrawUsage);
  normal.setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute("position", position);
  geometry.setAttribute("normal", normal);
  geometry.setIndex(indices);
  geometry.userData.ropeRadius = radius;
  return geometry;
}

function updateTubeGeometry(geometry, points, radius, radialSegments) {
  const position = geometry.attributes.position;
  const normal = geometry.attributes.normal;
  const up = new THREE.Vector3(0, 1, 0);
  let cursor = 0;

  for (let i = 0; i < points.length; i += 1) {
    const prev = points[Math.max(0, i - 1)];
    const next = points[Math.min(points.length - 1, i + 1)];
    const tangent = new THREE.Vector3().subVectors(next, prev).normalize();
    let frameNormal = new THREE.Vector3().crossVectors(tangent, up).normalize();
    if (frameNormal.lengthSq() < 0.0001) frameNormal.set(1, 0, 0);
    const binormal = new THREE.Vector3().crossVectors(tangent, frameNormal).normalize();

    for (let r = 0; r < radialSegments; r += 1) {
      const angle = r / radialSegments * Math.PI * 2;
      const ringNormal = frameNormal.clone().multiplyScalar(Math.cos(angle))
        .add(binormal.clone().multiplyScalar(Math.sin(angle))).normalize();
      const point = points[i].clone().addScaledVector(ringNormal, radius);
      position.setXYZ(cursor, point.x, point.y, point.z);
      normal.setXYZ(cursor, ringNormal.x, ringNormal.y, ringNormal.z);
      cursor += 1;
    }
  }
  position.needsUpdate = true;
  normal.needsUpdate = true;
}

function refreshRopeMeshes(group, points) {
  const data = group.userData.rope;
  updateTubeGeometry(group.userData.core.geometry, points, data.radius, data.radialSegments);
  group.userData.stripes.forEach((stripe, i) => {
    const sourceIndex = Math.min(points.length - 1, Math.max(0, (i + 1) * data.stripeEvery));
    stripe.position.copy(points[sourceIndex]);
  });
}

export function buildSoftRope(startPoint, endPoint, profile = defaultRopeProfile) {
  const group = new THREE.Group();
  const segments = Math.max(2, Math.floor(profile.segments ?? defaultRopeProfile.segments));
  const data = {
    startPoint: vec3(startPoint),
    endPoint: vec3(endPoint),
    segments,
    sag: profile.sag ?? defaultRopeProfile.sag,
    sway: profile.sway ?? defaultRopeProfile.sway,
    phase: profile.phase ?? 0,
    radius: profile.radius ?? defaultRopeProfile.radius,
    radialSegments: profile.radialSegments ?? defaultRopeProfile.radialSegments,
    stripeEvery: Math.max(1, profile.stripeEvery ?? defaultRopeProfile.stripeEvery)
  };
  const points = computePoints(data, 0);
  const geometry = createTubeGeometry(points.length, data.radius, data.radialSegments);
  const core = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({
      color: profile.color ?? defaultRopeProfile.color,
      roughness: 0.84,
      metalness: 0.02,
      transparent: (profile.opacity ?? 1) < 1,
      opacity: profile.opacity ?? 1
    })
  );
  core.name = "open-above-rope-core-tube";
  core.frustumCulled = false;
  group.add(core);

  const stripes = [];
  const stripeCount = Math.floor(segments / data.stripeEvery);
  if (stripeCount > 0) {
    const stripeMaterial = new THREE.MeshStandardMaterial({ color: profile.stripeColor ?? defaultRopeProfile.stripeColor, roughness: 0.8 });
    for (let i = 0; i < stripeCount; i += 1) {
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(data.radius * 3.1, data.radius * 0.42, data.radius * 3.1), stripeMaterial);
      stripe.name = "open-above-rope-grey-stripe";
      stripes.push(stripe);
      group.add(stripe);
    }
  }

  group.name = "open-above-soft-rope";
  group.userData.domain = ROPE_KIT_ID;
  group.userData.rope = data;
  group.userData.core = core;
  group.userData.stripes = stripes;
  group.userData.persistentGeometry = true;
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
