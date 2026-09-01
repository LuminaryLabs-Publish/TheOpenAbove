export const AIRSTREAM_TRAIL_PROTO_KIT_ID = "open-above-airstream-trail-proto-kit";
export const DEFAULT_AIRSTREAM_TRAIL_COUNT = 7;

const EPSILON = 1e-8;
const DEFAULT_SAMPLE_COUNT = 48;

const OPEN_ABOVE_TRAIL_PROFILE = Object.freeze([
  Object.freeze({ band: "near", lateral: -10, vertical: 4, longitudinal: -18, length: 118, width: 1.02, opacity: 0.42 }),
  Object.freeze({ band: "near", lateral: 11, vertical: -4, longitudinal: -6, length: 126, width: 1.08, opacity: 0.4 }),
  Object.freeze({ band: "near", lateral: -2, vertical: 12, longitudinal: 8, length: 136, width: 1.14, opacity: 0.38 }),
  Object.freeze({ band: "medium", lateral: -25, vertical: 9, longitudinal: 10, length: 174, width: 1.34, opacity: 0.34 }),
  Object.freeze({ band: "medium", lateral: 24, vertical: -11, longitudinal: 20, length: 186, width: 1.42, opacity: 0.33 }),
  Object.freeze({ band: "distant", lateral: -43, vertical: 19, longitudinal: 30, length: 228, width: 1.68, opacity: 0.28 }),
  Object.freeze({ band: "distant", lateral: 42, vertical: -19, longitudinal: 42, length: 242, width: 1.78, opacity: 0.27 })
]);

function finite(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, finite(value, min)));
}

function point(value = {}) {
  return {
    x: finite(value.x),
    y: finite(value.y),
    z: finite(value.z)
  };
}

function addScaled(target, value, scale) {
  return {
    x: target.x + value.x * scale,
    y: target.y + value.y * scale,
    z: target.z + value.z * scale
  };
}

function subtract(a, b) {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

function cross(a, b) {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x
  };
}

function magnitude(value) {
  return Math.hypot(value.x, value.y, value.z);
}

function normalize(value, fallback = { x: 0, y: 0, z: -1 }) {
  const length = magnitude(value);
  if (length <= EPSILON) return { ...fallback };
  return { x: value.x / length, y: value.y / length, z: value.z / length };
}

function flowVector(sample, fallback) {
  const velocity = sample?.velocity;
  const candidate = {
    x: finite(velocity?.x),
    y: finite(velocity?.y),
    z: finite(velocity?.z)
  };
  return magnitude(candidate) > EPSILON ? candidate : { ...fallback };
}

function hashText(value) {
  const text = String(value ?? "open-above-wind-trails");
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function hashFloat(seed, lane) {
  let value = (seed ^ Math.imul(lane + 1, 0x9e3779b1)) >>> 0;
  value ^= value >>> 16;
  value = Math.imul(value, 0x7feb352d);
  value ^= value >>> 15;
  value = Math.imul(value, 0x846ca68b);
  value ^= value >>> 16;
  return (value >>> 0) / 4294967296;
}

function profileAt(index, count) {
  if (count === DEFAULT_AIRSTREAM_TRAIL_COUNT) return OPEN_ABOVE_TRAIL_PROFILE[index];
  const ratio = count <= 1 ? 0.5 : index / (count - 1);
  const side = index % 2 === 0 ? -1 : 1;
  const distance = 10 + ratio * 34;
  return {
    band: ratio < 0.43 ? "near" : ratio < 0.72 ? "medium" : "distant",
    lateral: side * distance,
    vertical: (hashFloat(index + 1, 0) - 0.5) * (10 + distance * 0.45),
    longitudinal: -8 + ratio * 52,
    length: 70 + ratio * 96,
    width: 0.82 + ratio * 0.78,
    opacity: 0.38 - ratio * 0.15
  };
}

function createBasis(flow) {
  const forward = normalize(flow);
  const referenceUp = Math.abs(forward.y) > 0.92 ? { x: 1, y: 0, z: 0 } : { x: 0, y: 1, z: 0 };
  const right = normalize(cross(forward, referenceUp), { x: 1, y: 0, z: 0 });
  const up = normalize(cross(right, forward), { x: 0, y: 1, z: 0 });
  return { forward, right, up };
}

function integratePoint(sampleFlow, current, elapsed, signedStep, fallbackDirection) {
  const firstVelocity = flowVector(sampleFlow(current, elapsed), fallbackDirection);
  const firstDirection = normalize(firstVelocity, fallbackDirection);
  const midpoint = addScaled(current, firstDirection, signedStep * 0.5);
  const midpointVelocity = flowVector(sampleFlow(midpoint, elapsed), firstDirection);
  const midpointDirection = normalize(midpointVelocity, firstDirection);
  return addScaled(current, midpointDirection, signedStep);
}

function catmullRom(a, b, c, d, t) {
  const t2 = t * t;
  const t3 = t2 * t;
  return {
    x: 0.5 * ((2 * b.x) + (-a.x + c.x) * t + (2 * a.x - 5 * b.x + 4 * c.x - d.x) * t2 + (-a.x + 3 * b.x - 3 * c.x + d.x) * t3),
    y: 0.5 * ((2 * b.y) + (-a.y + c.y) * t + (2 * a.y - 5 * b.y + 4 * c.y - d.y) * t2 + (-a.y + 3 * b.y - 3 * c.y + d.y) * t3),
    z: 0.5 * ((2 * b.z) + (-a.z + c.z) * t + (2 * a.z - 5 * b.z + 4 * c.z - d.z) * t2 + (-a.z + 3 * b.z - 3 * c.z + d.z) * t3)
  };
}

function resampleCenterline(points, sampleCount) {
  if (points.length === sampleCount) return points;
  const result = [];
  const segmentCount = points.length - 1;
  for (let index = 0; index < sampleCount; index += 1) {
    const position = index / Math.max(1, sampleCount - 1) * segmentCount;
    const segment = Math.min(segmentCount - 1, Math.floor(position));
    const t = index === sampleCount - 1 ? 1 : position - segment;
    result.push(catmullRom(
      pointAt(points, segment - 1),
      pointAt(points, segment),
      pointAt(points, segment + 1),
      pointAt(points, segment + 2),
      t
    ));
  }
  return result;
}

function pointAt(points, index) {
  return points[Math.max(0, Math.min(points.length - 1, index))];
}

function buildCenterline({ sampleFlow, origin, elapsed, start, sampleCount, length, fallbackDirection }) {
  const integrationCount = Math.min(sampleCount, Math.max(16, Math.round(sampleCount * 0.32)));
  const beforeCount = Math.floor((integrationCount - 1) * 0.38);
  const afterCount = integrationCount - beforeCount - 1;
  const step = length / Math.max(1, integrationCount - 1);
  const before = [];
  const after = [];
  let cursor = start;

  for (let index = 0; index < beforeCount; index += 1) {
    cursor = integratePoint(sampleFlow, cursor, elapsed, -step, fallbackDirection);
    before.push(cursor);
  }

  cursor = start;
  for (let index = 0; index < afterCount; index += 1) {
    cursor = integratePoint(sampleFlow, cursor, elapsed, step, fallbackDirection);
    after.push(cursor);
  }

  const controls = [...before.reverse(), start, ...after];
  return resampleCenterline(controls, sampleCount)
    .map((worldPoint) => Object.freeze(subtract(worldPoint, origin)));
}

function descriptorColor(index, intensity, verticalRatio) {
  const warm = clamp(verticalRatio * 0.55 + intensity * 0.1, 0, 0.35);
  const variation = (index % 3) * 0.018;
  return Object.freeze([
    clamp(0.76 + warm + variation, 0, 1),
    clamp(0.88 + warm * 0.28 + variation, 0, 1),
    clamp(0.98 - warm * 0.2, 0, 1)
  ]);
}

export function createAirstreamTrailField({
  sampleFlow,
  origin: originInput = { x: 0, y: 0, z: 0 },
  count = DEFAULT_AIRSTREAM_TRAIL_COUNT,
  seed = "open-above-wind-trails",
  sampleCount = DEFAULT_SAMPLE_COUNT,
  elapsed = 0,
  revisionKey = "initial"
} = {}) {
  if (typeof sampleFlow !== "function") throw new TypeError("Airstream trails require a read-only flow sampler.");

  const origin = point(originInput);
  const trailCount = Math.max(1, Math.min(64, Math.floor(finite(count, DEFAULT_AIRSTREAM_TRAIL_COUNT))));
  const pointsPerTrail = Math.max(8, Math.min(128, Math.floor(finite(sampleCount, DEFAULT_SAMPLE_COUNT))));
  const centerSample = sampleFlow(origin, elapsed);
  const centerVelocity = flowVector(centerSample, { x: 0, y: 0, z: -1 });
  const centerSpeed = magnitude(centerVelocity);
  const basis = createBasis(centerVelocity);
  const baseSeed = hashText(`${seed}:${revisionKey}`);
  const descriptors = [];

  for (let index = 0; index < trailCount; index += 1) {
    const profile = profileAt(index, trailCount);
    const trailSeed = (baseSeed + Math.imul(index + 1, 0x9e3779b1)) >>> 0;
    const lateralJitter = (hashFloat(trailSeed, 0) - 0.5) * 5;
    const verticalJitter = (hashFloat(trailSeed, 1) - 0.5) * 5;
    const longitudinalJitter = (hashFloat(trailSeed, 2) - 0.5) * 8;
    let start = addScaled(origin, basis.right, profile.lateral + lateralJitter);
    start = addScaled(start, basis.up, profile.vertical + verticalJitter);
    start = addScaled(start, basis.forward, profile.longitudinal + longitudinalJitter);

    const startSample = sampleFlow(start, elapsed);
    const startVelocity = flowVector(startSample, centerVelocity);
    const speed = magnitude(startVelocity);
    const influence = clamp(startSample?.influence, 0, 1);
    const verticalRatio = speed > EPSILON ? Math.abs(startVelocity.y) / speed : 0;
    const intensity = clamp(0.38 + speed / 34 + influence * 0.18, 0.42, 1);
    const width = profile.width * (1 + verticalRatio * 0.38 + influence * 0.12);
    const trailLength = profile.length * (0.94 + hashFloat(trailSeed, 3) * 0.12);
    const points = buildCenterline({
      sampleFlow,
      origin,
      elapsed,
      start,
      sampleCount: pointsPerTrail,
      length: trailLength,
      fallbackDirection: normalize(startVelocity, basis.forward)
    });

    descriptors.push(Object.freeze({
      id: `wind-trail-${String(index + 1).padStart(2, "0")}`,
      band: profile.band,
      points: Object.freeze(points),
      width: Number(width.toFixed(5)),
      speed: Number(clamp(speed * 0.055, 0.35, 1.7).toFixed(5)),
      intensity: Number(intensity.toFixed(5)),
      phase: Number((hashFloat(trailSeed, 4) * Math.PI * 2).toFixed(6)),
      color: descriptorColor(index, intensity, verticalRatio),
      opacity: Number(profile.opacity.toFixed(5))
    }));
  }

  return Object.freeze({
    id: AIRSTREAM_TRAIL_PROTO_KIT_ID,
    origin: Object.freeze(origin),
    count: descriptors.length,
    sampleCount: pointsPerTrail,
    revisionKey: String(revisionKey),
    centerSpeed: Number(centerSpeed.toFixed(5)),
    descriptors: Object.freeze(descriptors)
  });
}
