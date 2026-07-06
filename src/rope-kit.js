import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export const ROPE_KIT_ID = "open-above-rope-kit";

export const defaultRopeProfile = {
  segments: 10,
  color: 0xf5deb3,
  opacity: 0.86,
  sag: 0.16,
  sway: 0.045,
  width: 1
};

function vec3(value) {
  return value?.isVector3 ? value.clone() : new THREE.Vector3(...(value ?? [0, 0, 0]));
}

export function buildSoftRope(startPoint, endPoint, profile = defaultRopeProfile) {
  const segments = Math.max(2, Math.floor(profile.segments ?? 10));
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array((segments + 1) * 3);
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.LineBasicMaterial({
    color: profile.color ?? defaultRopeProfile.color,
    transparent: true,
    opacity: profile.opacity ?? defaultRopeProfile.opacity,
    linewidth: profile.width ?? defaultRopeProfile.width
  });

  const line = new THREE.Line(geometry, material);
  line.name = "open-above-soft-rope";
  line.userData.domain = ROPE_KIT_ID;
  line.userData.rope = {
    startPoint: vec3(startPoint),
    endPoint: vec3(endPoint),
    segments,
    sag: profile.sag ?? defaultRopeProfile.sag,
    sway: profile.sway ?? defaultRopeProfile.sway,
    phase: profile.phase ?? 0
  };
  updateSoftRope(line, startPoint, endPoint, 0);
  return line;
}

export function updateSoftRope(rope, startPoint = null, endPoint = null, timeSeconds = 0) {
  const data = rope?.userData?.rope;
  const positionAttr = rope?.geometry?.attributes?.position;
  if (!data || !positionAttr) return rope;

  if (startPoint) data.startPoint.copy(vec3(startPoint));
  if (endPoint) data.endPoint.copy(vec3(endPoint));

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
    positionAttr.setXYZ(i, point.x, point.y, point.z);
  }

  positionAttr.needsUpdate = true;
  rope.geometry.computeBoundingSphere();
  return rope;
}

window.OpenAboveRopeKit = {
  id: ROPE_KIT_ID,
  defaultRopeProfile,
  buildSoftRope,
  updateSoftRope
};
