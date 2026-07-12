export const BALLOON_ENVELOPE_PROFILE_KIT_ID = "open-above-balloon-envelope-profile-kit";

export const defaultEnvelopeShapeProfile = Object.freeze({
  baseY: 0.44,
  height: 6.2,
  maxRadius: 2.25,
  profilePoints: Object.freeze([
    Object.freeze({ t: 0.0, radius: 0.34 }),
    Object.freeze({ t: 0.08, radius: 0.5 }),
    Object.freeze({ t: 0.22, radius: 0.79 }),
    Object.freeze({ t: 0.48, radius: 1.0 }),
    Object.freeze({ t: 0.68, radius: 0.96 }),
    Object.freeze({ t: 0.84, radius: 0.72 }),
    Object.freeze({ t: 0.95, radius: 0.34 }),
    Object.freeze({ t: 1.0, radius: 0.07 })
  ])
});

const clamp01 = (value) => Math.max(0, Math.min(1, Number(value) || 0));

function catmullRom(p0, p1, p2, p3, t) {
  const t2 = t * t;
  const t3 = t2 * t;
  return 0.5 * (
    2 * p1
    + (-p0 + p2) * t
    + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2
    + (-p0 + 3 * p1 - 3 * p2 + p3) * t3
  );
}

export function resolveEnvelopeShapeProfile(profile = {}) {
  const points = Array.isArray(profile.profilePoints) && profile.profilePoints.length >= 4
    ? profile.profilePoints
    : defaultEnvelopeShapeProfile.profilePoints;
  return {
    baseY: Number.isFinite(profile.baseY) ? profile.baseY : defaultEnvelopeShapeProfile.baseY,
    height: Math.max(0.1, Number(profile.height) || defaultEnvelopeShapeProfile.height),
    maxRadius: Math.max(0.1, Number(profile.maxRadius ?? profile.radius) || defaultEnvelopeShapeProfile.maxRadius),
    profilePoints: points.map((entry) => ({
      t: clamp01(entry.t),
      radius: Math.max(0, Number(entry.radius) || 0)
    })).sort((a, b) => a.t - b.t)
  };
}

export function sampleEnvelopeRadius(t, profile = defaultEnvelopeShapeProfile) {
  const resolved = resolveEnvelopeShapeProfile(profile);
  const value = clamp01(t);
  const points = resolved.profilePoints;
  let segment = 0;
  while (segment < points.length - 2 && value > points[segment + 1].t) segment += 1;
  const p1 = points[segment];
  const p2 = points[Math.min(points.length - 1, segment + 1)];
  const p0 = points[Math.max(0, segment - 1)];
  const p3 = points[Math.min(points.length - 1, segment + 2)];
  const span = Math.max(1e-6, p2.t - p1.t);
  const localT = clamp01((value - p1.t) / span);
  const normalizedRadius = Math.max(0.025, catmullRom(p0.radius, p1.radius, p2.radius, p3.radius, localT));
  return normalizedRadius * resolved.maxRadius;
}

export function sampleEnvelopePoint(angle, t, profile = defaultEnvelopeShapeProfile, offset = 0) {
  const resolved = resolveEnvelopeShapeProfile(profile);
  const radius = sampleEnvelopeRadius(t, resolved) + offset;
  return {
    x: Math.sin(angle) * radius,
    y: resolved.baseY + clamp01(t) * resolved.height,
    z: Math.cos(angle) * radius
  };
}

export function sampleEnvelopeNormal(angle, t, profile = defaultEnvelopeShapeProfile) {
  const resolved = resolveEnvelopeShapeProfile(profile);
  const epsilon = 0.0025;
  const low = sampleEnvelopeRadius(Math.max(0, t - epsilon), resolved);
  const high = sampleEnvelopeRadius(Math.min(1, t + epsilon), resolved);
  const radialDerivative = (high - low) / Math.max(epsilon * 2, 1e-6);
  const nx = Math.sin(angle) * resolved.height;
  const ny = -radialDerivative;
  const nz = Math.cos(angle) * resolved.height;
  const length = Math.hypot(nx, ny, nz) || 1;
  return { x: nx / length, y: ny / length, z: nz / length };
}

export function envelopeMouthRadius(profile = defaultEnvelopeShapeProfile) {
  return sampleEnvelopeRadius(0, profile);
}

export function envelopeTopY(profile = defaultEnvelopeShapeProfile) {
  const resolved = resolveEnvelopeShapeProfile(profile);
  return resolved.baseY + resolved.height;
}

if (typeof window !== "undefined") window.OpenAboveBalloonEnvelopeProfileKit = {
  id: BALLOON_ENVELOPE_PROFILE_KIT_ID,
  defaultEnvelopeShapeProfile,
  resolveEnvelopeShapeProfile,
  sampleEnvelopeRadius,
  sampleEnvelopePoint,
  sampleEnvelopeNormal,
  envelopeMouthRadius,
  envelopeTopY
};
