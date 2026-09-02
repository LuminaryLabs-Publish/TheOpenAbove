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
  return Object.freeze(FIVE_TOWN_ROUTES.map(createAirstreamRoute));
}
import { FIVE_TOWN_ROUTES } from "../../data/five-towns.config.js";
