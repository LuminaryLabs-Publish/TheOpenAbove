export const AIRSTREAM_ROUTE_KIT_ID = "open-above-airstream-route-kit";

function finite(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function point(value = {}) {
  return Object.freeze({
    x: finite(value.x),
    y: finite(value.y),
    z: finite(value.z)
  });
}

export function createAirstreamRoute(input = {}) {
  const id = String(input.id ?? "").trim();
  if (!id) throw new TypeError("Airstream route id is required.");

  const points = (input.points ?? []).map(point);
  if (points.length < 2) throw new TypeError(`Airstream route ${id} requires at least two points.`);

  const radius = Math.max(1, finite(input.radius, 95));
  const speed = Math.max(0.1, finite(input.speed, 18));

  return Object.freeze({
    id,
    label: String(input.label ?? id),
    points: Object.freeze(points),
    radius,
    speed,
    lift: finite(input.lift, 0),
    turbulence: Math.max(0, finite(input.turbulence, 0.08)),
    destinationTownId: input.destinationTownId ? String(input.destinationTownId) : null,
    color: Number(input.color ?? 0xffffff),
    family: String(input.family ?? "meadow")
  });
}

export function createDefaultAirstreamRoutes() {
  return Object.freeze([
    createAirstreamRoute({
      id: "meadow-to-brookhaven",
      label: "Brookhaven Meadow Current",
      destinationTownId: "brookhaven",
      family: "meadow",
      color: 0xbce8bf,
      radius: 105,
      speed: 19,
      lift: 0.35,
      turbulence: 0.06,
      points: [
        { x: 0, y: 165, z: 0 },
        { x: -450, y: 190, z: -700 },
        { x: -1100, y: 160, z: -1500 },
        { x: -1900, y: 125, z: -2400 }
      ]
    }),
    createAirstreamRoute({
      id: "lowland-to-sunvale",
      label: "Sunvale Warm Current",
      destinationTownId: "sunvale",
      family: "warm",
      color: 0xffe2a0,
      radius: 100,
      speed: 17,
      lift: 0.18,
      turbulence: 0.075,
      points: [
        { x: 0, y: 92, z: 0 },
        { x: 520, y: 112, z: -650 },
        { x: 1140, y: 98, z: -1420 },
        { x: 1850, y: 82, z: -2200 }
      ]
    }),
    createAirstreamRoute({
      id: "highland-to-cloudmere",
      label: "Cloudmere Cool Current",
      destinationTownId: "cloudmere",
      family: "cool",
      color: 0xc5e7ff,
      radius: 112,
      speed: 22,
      lift: -0.08,
      turbulence: 0.045,
      points: [
        { x: 0, y: 285, z: 0 },
        { x: 470, y: 305, z: 560 },
        { x: 980, y: 275, z: 1180 },
        { x: 1600, y: 235, z: 1800 }
      ]
    })
  ]);
}
