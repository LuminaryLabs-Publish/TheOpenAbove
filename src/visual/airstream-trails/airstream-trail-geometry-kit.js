import * as THREE from "three";

export const AIRSTREAM_TRAIL_GEOMETRY_KIT_ID = "open-above-airstream-trail-geometry-kit";
const TRAIL_BOUNDS_RADIUS = 260;

const ATTRIBUTE_NAMES = Object.freeze([
  "aFrom",
  "aTo",
  "aPreviousFrom",
  "aPreviousTo",
  "aNextFrom",
  "aNextTo"
]);

function pointAt(points, index) {
  return points[Math.max(0, Math.min(points.length - 1, index))];
}

function setVector(array, offset, value) {
  array[offset] = Number(value?.x) || 0;
  array[offset + 1] = Number(value?.y) || 0;
  array[offset + 2] = Number(value?.z) || 0;
}

function topology(descriptors) {
  if (!Array.isArray(descriptors) || descriptors.length === 0) {
    throw new TypeError("Airstream trail geometry requires at least one descriptor.");
  }
  const pointCounts = descriptors.map((descriptor) => descriptor.points?.length ?? 0);
  if (pointCounts.some((count) => count < 2)) {
    throw new TypeError("Every airstream trail requires at least two centerline points.");
  }
  return {
    pointCounts,
    vertexCount: pointCounts.reduce((sum, count) => sum + count * 2, 0),
    indexCount: pointCounts.reduce((sum, count) => sum + (count - 1) * 6, 0)
  };
}

function writeDescriptorAttributes(descriptors, targets, writeStatic = true) {
  let vertexCursor = 0;
  for (const descriptor of descriptors) {
    const points = descriptor.points;
    const color = descriptor.color ?? [1, 1, 1];
    const distances = new Float32Array(points.length);
    let totalDistance = 0;
    for (let index = 1; index < points.length; index += 1) {
      const previous = points[index - 1];
      const current = points[index];
      totalDistance += Math.hypot(
        current.x - previous.x,
        current.y - previous.y,
        current.z - previous.z
      );
      distances[index] = totalDistance;
    }

    for (let index = 0; index < points.length; index += 1) {
      const current = pointAt(points, index);
      const previous = pointAt(points, index - 1);
      const next = pointAt(points, index + 1);
      const along = totalDistance > 1e-6 ? distances[index] / totalDistance : index / (points.length - 1);
      for (let sideIndex = 0; sideIndex < 2; sideIndex += 1) {
        const vertex = vertexCursor + sideIndex;
        const vectorOffset = vertex * 3;
        setVector(targets.position, vectorOffset, current);
        setVector(targets.to, vectorOffset, current);
        setVector(targets.previousTo, vectorOffset, previous);
        setVector(targets.nextTo, vectorOffset, next);
        if (writeStatic) {
          setVector(targets.from, vectorOffset, current);
          setVector(targets.previousFrom, vectorOffset, previous);
          setVector(targets.nextFrom, vectorOffset, next);
          targets.side[vertex] = sideIndex === 0 ? -1 : 1;
        }
        targets.along[vertex] = along;
        targets.width[vertex] = Number(descriptor.width) || 1;
        targets.intensity[vertex] = Number(descriptor.intensity) || 0;
        targets.phase[vertex] = Number(descriptor.phase) || 0;
        targets.flowSpeed[vertex] = Number(descriptor.speed) || 1;
        targets.opacity[vertex] = Number(descriptor.opacity) || 0;
        targets.color[vectorOffset] = Number(color[0]) || 0;
        targets.color[vectorOffset + 1] = Number(color[1]) || 0;
        targets.color[vectorOffset + 2] = Number(color[2]) || 0;
      }
      vertexCursor += 2;
    }
  }
}

function createTargets(vertexCount) {
  return {
    position: new Float32Array(vertexCount * 3),
    from: new Float32Array(vertexCount * 3),
    to: new Float32Array(vertexCount * 3),
    previousFrom: new Float32Array(vertexCount * 3),
    previousTo: new Float32Array(vertexCount * 3),
    nextFrom: new Float32Array(vertexCount * 3),
    nextTo: new Float32Array(vertexCount * 3),
    side: new Float32Array(vertexCount),
    along: new Float32Array(vertexCount),
    width: new Float32Array(vertexCount),
    intensity: new Float32Array(vertexCount),
    phase: new Float32Array(vertexCount),
    flowSpeed: new Float32Array(vertexCount),
    opacity: new Float32Array(vertexCount),
    color: new Float32Array(vertexCount * 3)
  };
}

function buildIndices(pointCounts, indexCount) {
  const indices = new Uint16Array(indexCount);
  let indexCursor = 0;
  let vertexCursor = 0;
  for (const pointCount of pointCounts) {
    for (let pointIndex = 0; pointIndex < pointCount - 1; pointIndex += 1) {
      const a = vertexCursor + pointIndex * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      indices[indexCursor] = a;
      indices[indexCursor + 1] = b;
      indices[indexCursor + 2] = c;
      indices[indexCursor + 3] = b;
      indices[indexCursor + 4] = d;
      indices[indexCursor + 5] = c;
      indexCursor += 6;
    }
    vertexCursor += pointCount * 2;
  }
  return indices;
}

function installAttributes(geometry, targets) {
  geometry.setAttribute("position", new THREE.BufferAttribute(targets.position, 3));
  geometry.setAttribute("aFrom", new THREE.BufferAttribute(targets.from, 3));
  geometry.setAttribute("aTo", new THREE.BufferAttribute(targets.to, 3));
  geometry.setAttribute("aPreviousFrom", new THREE.BufferAttribute(targets.previousFrom, 3));
  geometry.setAttribute("aPreviousTo", new THREE.BufferAttribute(targets.previousTo, 3));
  geometry.setAttribute("aNextFrom", new THREE.BufferAttribute(targets.nextFrom, 3));
  geometry.setAttribute("aNextTo", new THREE.BufferAttribute(targets.nextTo, 3));
  geometry.setAttribute("aSide", new THREE.BufferAttribute(targets.side, 1));
  geometry.setAttribute("aAlong", new THREE.BufferAttribute(targets.along, 1));
  geometry.setAttribute("aWidth", new THREE.BufferAttribute(targets.width, 1));
  geometry.setAttribute("aIntensity", new THREE.BufferAttribute(targets.intensity, 1));
  geometry.setAttribute("aPhase", new THREE.BufferAttribute(targets.phase, 1));
  geometry.setAttribute("aFlowSpeed", new THREE.BufferAttribute(targets.flowSpeed, 1));
  geometry.setAttribute("aOpacity", new THREE.BufferAttribute(targets.opacity, 1));
  geometry.setAttribute("aColor", new THREE.BufferAttribute(targets.color, 3));
}

export function createAirstreamTrailGeometry(descriptors) {
  const shape = topology(descriptors);
  if (shape.vertexCount > 65535) throw new RangeError("Airstream trail geometry exceeds the Uint16 index limit.");
  const targets = createTargets(shape.vertexCount);
  writeDescriptorAttributes(descriptors, targets, true);
  const geometry = new THREE.BufferGeometry();
  geometry.name = "open-above-airstream-trail-geometry";
  installAttributes(geometry, targets);
  geometry.setIndex(new THREE.BufferAttribute(buildIndices(shape.pointCounts, shape.indexCount), 1));
  geometry.boundingBox = new THREE.Box3(
    new THREE.Vector3(-TRAIL_BOUNDS_RADIUS, -TRAIL_BOUNDS_RADIUS, -TRAIL_BOUNDS_RADIUS),
    new THREE.Vector3(TRAIL_BOUNDS_RADIUS, TRAIL_BOUNDS_RADIUS, TRAIL_BOUNDS_RADIUS)
  );
  geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), TRAIL_BOUNDS_RADIUS);
  geometry.userData.airstreamTrails = {
    id: AIRSTREAM_TRAIL_GEOMETRY_KIT_ID,
    pointCounts: shape.pointCounts,
    vertexCount: shape.vertexCount,
    indexCount: shape.indexCount,
    bufferUploads: 1
  };
  return geometry;
}

export function updateAirstreamTrailGeometry(geometry, descriptors, morph = 1) {
  const shape = topology(descriptors);
  const metadata = geometry?.userData?.airstreamTrails;
  if (!metadata || shape.vertexCount !== metadata.vertexCount
    || shape.pointCounts.some((count, index) => count !== metadata.pointCounts[index])) {
    throw new RangeError("Airstream trail topology must remain stable across revisions.");
  }

  const blend = Math.max(0, Math.min(1, Number(morph) || 0));
  for (const name of ["aFrom", "aPreviousFrom", "aNextFrom"]) {
    const from = geometry.getAttribute(name).array;
    const to = geometry.getAttribute(name.replace("From", "To")).array;
    for (let index = 0; index < from.length; index += 1) {
      from[index] += (to[index] - from[index]) * blend;
    }
  }

  const targets = {
    position: geometry.getAttribute("position").array,
    from: geometry.getAttribute("aFrom").array,
    to: geometry.getAttribute("aTo").array,
    previousFrom: geometry.getAttribute("aPreviousFrom").array,
    previousTo: geometry.getAttribute("aPreviousTo").array,
    nextFrom: geometry.getAttribute("aNextFrom").array,
    nextTo: geometry.getAttribute("aNextTo").array,
    side: geometry.getAttribute("aSide").array,
    along: geometry.getAttribute("aAlong").array,
    width: geometry.getAttribute("aWidth").array,
    intensity: geometry.getAttribute("aIntensity").array,
    phase: geometry.getAttribute("aPhase").array,
    flowSpeed: geometry.getAttribute("aFlowSpeed").array,
    opacity: geometry.getAttribute("aOpacity").array,
    color: geometry.getAttribute("aColor").array
  };
  writeDescriptorAttributes(descriptors, targets, false);

  for (const name of ["position", ...ATTRIBUTE_NAMES, "aAlong", "aWidth", "aIntensity", "aPhase", "aFlowSpeed", "aOpacity", "aColor"]) {
    geometry.getAttribute(name).needsUpdate = true;
  }
  metadata.bufferUploads += 1;
  return geometry;
}
