export const AIRSTREAM_SAMPLER_KIT_ID = "open-above-airstream-sampler-kit";

const EPSILON = 1e-8;

function clamp(value, min = 0, max = 1) {
  return Math.max(min, Math.min(max, Number(value) || 0));
}

function smoothstep(edge0, edge1, value) {
  const t = clamp((value - edge0) / Math.max(EPSILON, edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function vector(value = {}) {
  return {
    x: Number(value.x) || 0,
    y: Number(value.y) || 0,
    z: Number(value.z) || 0
  };
}

function subtract(a, b) {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

function addScaled(target, value, scale) {
  target.x += value.x * scale;
  target.y += value.y * scale;
  target.z += value.z * scale;
  return target;
}

function length(value) {
  return Math.hypot(value.x, value.y, value.z);
}

function normalize(value) {
  const magnitude = length(value);
  if (magnitude <= EPSILON) return { x: 0, y: 0, z: -1 };
  return { x: value.x / magnitude, y: value.y / magnitude, z: value.z / magnitude };
}

function nearestPointOnSegment(position, start, end) {
  const segment = subtract(end, start);
  const relative = subtract(position, start);
  const denominator = segment.x * segment.x + segment.y * segment.y + segment.z * segment.z;
  const t = denominator <= EPSILON
    ? 0
    : clamp((relative.x * segment.x + relative.y * segment.y + relative.z * segment.z) / denominator);
  const nearest = {
    x: start.x + segment.x * t,
    y: start.y + segment.y * t,
    z: start.z + segment.z * t
  };
  return {
    t,
    nearest,
    tangent: normalize(segment),
    distance: length(subtract(position, nearest))
  };
}

export function sampleAirstreamRoute(route, positionInput, elapsed = 0) {
  const position = vector(positionInput);
  let best = null;

  for (let index = 0; index < route.points.length - 1; index += 1) {
    const sample = nearestPointOnSegment(position, route.points[index], route.points[index + 1]);
    if (!best || sample.distance < best.distance) best = { ...sample, segmentIndex: index };
  }

  const innerRadius = route.radius * 0.22;
  const outerRadius = route.radius * 1.08;
  const influence = 1 - smoothstep(innerRadius, outerRadius, best.distance);
  const pulse = Math.sin(
    Number(elapsed) * 0.67
    + best.nearest.x * 0.0041
    + best.nearest.y * 0.0067
    - best.nearest.z * 0.0033
    + best.segmentIndex * 1.91
  );
  const sidePulse = Math.cos(
    Number(elapsed) * 0.41
    - best.nearest.x * 0.0027
    + best.nearest.z * 0.0049
  );
  const turbulenceScale = route.turbulence * route.speed * influence;

  const velocity = {
    x: best.tangent.x * route.speed + sidePulse * turbulenceScale * 0.18,
    y: best.tangent.y * route.speed + route.lift + pulse * turbulenceScale * 0.08,
    z: best.tangent.z * route.speed + pulse * turbulenceScale * 0.18
  };

  return {
    routeId: route.id,
    destinationTownId: route.destinationTownId,
    velocity,
    tangent: best.tangent,
    nearestPoint: best.nearest,
    distanceFromCenter: best.distance,
    influence,
    captureState: influence >= 0.45 ? "inside" : influence > 0.02 ? "edge" : "outside",
    segmentIndex: best.segmentIndex,
    segmentT: best.t
  };
}

export function blendAirstreamSamples(samples, ambientVelocityInput = { x: 0, y: 0, z: 0 }) {
  const ambientVelocity = vector(ambientVelocityInput);
  const active = samples.filter((sample) => sample.influence > 0.0001);
  if (active.length === 0) {
    return {
      velocity: ambientVelocity,
      influence: 0,
      routeId: null,
      destinationTownId: null,
      distanceFromCenter: Number.POSITIVE_INFINITY,
      captureState: "ambient",
      contributors: []
    };
  }

  const dominant = active.reduce((best, sample) => sample.influence > best.influence ? sample : best);
  const totalWeight = active.reduce((sum, sample) => sum + sample.influence, 0);
  const routedVelocity = { x: 0, y: 0, z: 0 };
  for (const sample of active) addScaled(routedVelocity, sample.velocity, sample.influence / totalWeight);

  const blend = smoothstep(0.03, 0.72, dominant.influence);
  const velocity = {
    x: ambientVelocity.x + (routedVelocity.x - ambientVelocity.x) * blend,
    y: ambientVelocity.y + (routedVelocity.y - ambientVelocity.y) * blend,
    z: ambientVelocity.z + (routedVelocity.z - ambientVelocity.z) * blend
  };

  return {
    velocity,
    influence: dominant.influence,
    routeId: dominant.routeId,
    destinationTownId: dominant.destinationTownId,
    distanceFromCenter: dominant.distanceFromCenter,
    captureState: dominant.captureState,
    contributors: active
      .sort((a, b) => b.influence - a.influence)
      .map((sample) => ({ routeId: sample.routeId, influence: sample.influence }))
  };
}
