import {
  createAirstreamTrailField,
  DEFAULT_AIRSTREAM_TRAIL_COUNT
} from "../../runtime/airstream-trails/airstream-trail-proto-kit.js";
import { createThreeAirstreamTrailAdapter } from "./three-airstream-trail-adapter.js";

export const AIRSTREAM_TRAIL_PRESENTATION_KIT_ID = "open-above-airstream-trail-presentation-kit";

const COS_DIRECTION_THRESHOLD = Math.cos(10 * Math.PI / 180);

function sampleCountForQuality(quality) {
  if (quality?.id === "low") return 32;
  if (quality?.id === "medium") return 48;
  return 64;
}

function finite(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

export function createAirstreamTrailPresentation({
  scene,
  queryFlow,
  seed = "open-above-wind-trails",
  quality = { id: "high" },
  trailCount = DEFAULT_AIRSTREAM_TRAIL_COUNT,
  anchorDistance = 24,
  speedChangeRatio = 0.18,
  minimumRebuildInterval = 0.25
} = {}) {
  if (trailCount !== DEFAULT_AIRSTREAM_TRAIL_COUNT) {
    throw new RangeError(`The Open Above requires exactly ${DEFAULT_AIRSTREAM_TRAIL_COUNT} wind trails.`);
  }
  if (typeof queryFlow !== "function") throw new TypeError("Wind-trail presentation requires a read-only flow query.");

  let adapter = null;
  let mounted = false;
  let disposed = false;
  let rebuilds = 0;
  let stableUpdates = 0;
  let lastRebuildAt = Number.NEGATIVE_INFINITY;
  let anchorX = 0;
  let anchorY = 0;
  let anchorZ = 0;
  let directionX = 0;
  let directionY = 0;
  let directionZ = -1;
  let lastSpeed = 0;
  let lastRouteId = null;
  let lastCaptureState = "ambient";
  let lastFieldRevision = 0;
  let lastRevisionKey = null;

  function resolveSample(position, elapsed, suppliedSample) {
    return suppliedSample?.velocity ? suppliedSample : queryFlow(position, elapsed);
  }

  function revisionKey(position, sample, fieldRevision) {
    const cellSize = Math.max(8, anchorDistance);
    const cellX = Math.floor(finite(position?.x) / cellSize);
    const cellY = Math.floor(finite(position?.y) / cellSize);
    const cellZ = Math.floor(finite(position?.z) / cellSize);
    return `${fieldRevision}:${sample?.routeId ?? "ambient"}:${sample?.captureState ?? "ambient"}:${cellX}:${cellY}:${cellZ}`;
  }

  function captureSignature(position, sample, elapsed, fieldRevision) {
    anchorX = finite(position?.x);
    anchorY = finite(position?.y);
    anchorZ = finite(position?.z);
    const velocity = sample?.velocity ?? {};
    const vx = finite(velocity.x);
    const vy = finite(velocity.y);
    const vz = finite(velocity.z);
    lastSpeed = Math.hypot(vx, vy, vz);
    if (lastSpeed > 1e-8) {
      directionX = vx / lastSpeed;
      directionY = vy / lastSpeed;
      directionZ = vz / lastSpeed;
    }
    lastRouteId = sample?.routeId ?? null;
    lastCaptureState = sample?.captureState ?? "ambient";
    lastFieldRevision = fieldRevision;
    lastRebuildAt = finite(elapsed);
    lastRevisionKey = revisionKey(position, sample, fieldRevision);
  }

  function buildField(position, sample, elapsed, fieldRevision) {
    const key = revisionKey(position, sample, fieldRevision);
    return createAirstreamTrailField({
      sampleFlow: queryFlow,
      origin: position,
      count: trailCount,
      seed,
      sampleCount: sampleCountForQuality(quality),
      elapsed,
      revisionKey: key
    });
  }

  function mount({ position, elapsed = 0, sample: suppliedSample = null, fieldRevision = 0 } = {}) {
    if (disposed) throw new Error("Disposed airstream trail presentation cannot be mounted.");
    if (!position) throw new TypeError("Wind-trail presentation mount requires a player position.");
    if (mounted) return api;
    const sample = resolveSample(position, elapsed, suppliedSample);
    const field = buildField(position, sample, elapsed, fieldRevision);
    adapter = createThreeAirstreamTrailAdapter({ scene, field });
    adapter.mount(position);
    adapter.update(elapsed, position);
    captureSignature(position, sample, elapsed, fieldRevision);
    rebuilds = 1;
    mounted = true;
    return api;
  }

  function update(position, elapsed = 0, suppliedSample = null, fieldRevision = 0) {
    if (disposed || !position) return false;
    if (!mounted) {
      mount({ position, elapsed, sample: suppliedSample, fieldRevision });
      return true;
    }

    const sample = resolveSample(position, elapsed, suppliedSample);
    const velocity = sample?.velocity ?? {};
    const vx = finite(velocity.x);
    const vy = finite(velocity.y);
    const vz = finite(velocity.z);
    const speed = Math.hypot(vx, vy, vz);
    const dx = finite(position.x) - anchorX;
    const dy = finite(position.y) - anchorY;
    const dz = finite(position.z) - anchorZ;
    const moved = dx * dx + dy * dy + dz * dz >= anchorDistance * anchorDistance;
    const routeChanged = (sample?.routeId ?? null) !== lastRouteId;
    const captureChanged = (sample?.captureState ?? "ambient") !== lastCaptureState;
    const revisionChanged = fieldRevision !== lastFieldRevision;
    const relativeSpeedChange = lastSpeed > 1e-6 ? Math.abs(speed - lastSpeed) / lastSpeed : speed > 1e-6 ? 1 : 0;
    const directionDot = speed > 1e-6
      ? (vx * directionX + vy * directionY + vz * directionZ) / speed
      : 1;
    const directionChanged = directionDot < COS_DIRECTION_THRESHOLD;
    const intervalReady = finite(elapsed) - lastRebuildAt >= minimumRebuildInterval;
    const shouldRebuild = intervalReady && (
      revisionChanged
      || routeChanged
      || captureChanged
      || moved
      || directionChanged
      || relativeSpeedChange >= speedChangeRatio
    );

    if (shouldRebuild) {
      const field = buildField(position, sample, elapsed, fieldRevision);
      adapter.setField(field, elapsed);
      captureSignature(position, sample, elapsed, fieldRevision);
      rebuilds += 1;
    } else {
      stableUpdates += 1;
    }
    adapter.update(elapsed, position);
    return true;
  }

  function snapshot() {
    const render = adapter?.snapshot?.() ?? null;
    return Object.freeze({
      id: AIRSTREAM_TRAIL_PRESENTATION_KIT_ID,
      mounted,
      disposed,
      trailCount,
      quality: quality.id,
      sampleCount: sampleCountForQuality(quality),
      rebuilds,
      stableUpdates,
      revisionKey: lastRevisionKey,
      render
    });
  }

  function dispose() {
    if (disposed) return;
    adapter?.dispose?.();
    adapter = null;
    mounted = false;
    disposed = true;
  }

  const api = Object.freeze({
    id: AIRSTREAM_TRAIL_PRESENTATION_KIT_ID,
    mount,
    update,
    snapshot,
    dispose,
    get adapter() { return adapter; }
  });
  return api;
}
