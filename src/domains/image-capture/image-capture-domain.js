import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

const clamp = (value, minimum, maximum) => Math.max(minimum, Math.min(maximum, Number(value) || 0));

export const IMAGE_CAPTURE_DOMAIN_ID = "open-above-image-capture-domain";

function featureCenter(feature = {}) {
  const definition = feature.definition ?? {};
  if (definition.center) return { x: Number(definition.center.x) || 0, y: Number(definition.center.y) || 0, z: Number(definition.center.z) || 0 };
  const path = definition.path ?? [];
  if (path.length === 0) return { x: 0, y: Number(definition.height) * 0.5 || 0, z: 0 };
  const sum = path.reduce((result, point) => ({ x: result.x + (Number(point.x) || 0), z: result.z + (Number(point.z) || 0) }), { x: 0, z: 0 });
  return { x: sum.x / path.length, y: Number(definition.height) * 0.5 || 0, z: sum.z / path.length };
}

function titleFromId(id = "landmark") {
  return String(id).split("-").filter(Boolean).map((part) => part[0]?.toUpperCase() + part.slice(1)).join(" ");
}

function createSnapPoint(feature, index) {
  const center = featureCenter(feature);
  const name = feature.name ?? titleFromId(feature.id);
  return Object.freeze({
    id: `snap:${feature.id}`,
    landmarkId: feature.id,
    name,
    kind: feature.type ?? "landform",
    position: Object.freeze(center),
    searchRadius: Math.max(900, Number(feature.definition?.width) || 1600),
    reference: Object.freeze({
      imageId: `reference:${feature.id}`,
      caption: name,
      silhouette: feature.type ?? "landform",
      clue: index === 0 ? "Find the long ridge beyond the northern meadow." : `Find ${name} from the air.`
    })
  });
}

export function createImageCaptureDomain({ camera, renderer, landforms = [] } = {}) {
  const snapPoints = Object.freeze(landforms.map(createSnapPoint));
  const captures = [];
  const completed = new Set();
  const direction = new THREE.Vector3();
  let cameraMode = false;
  let zoom = 1;
  let pendingShutter = false;
  let lastResult = null;

  function setCameraMode(next) {
    cameraMode = Boolean(next);
    if (!cameraMode) zoom = 1;
    if (camera) camera.fov = clamp(60 / zoom, 18, 60);
    camera?.updateProjectionMatrix?.();
    return cameraMode;
  }

  function setZoom(next) {
    zoom = clamp(next, 1, 4);
    if (camera) camera.fov = clamp(60 / zoom, 18, 60);
    camera?.updateProjectionMatrix?.();
    return zoom;
  }

  function requestCapture() {
    if (!cameraMode) return false;
    pendingShutter = true;
    return true;
  }

  function evaluate(playerState) {
    if (!pendingShutter || !camera || !playerState?.position) return null;
    pendingShutter = false;
    camera.getWorldDirection(direction);
    let best = null;
    for (const point of snapPoints) {
      const dx = point.position.x - camera.position.x;
      const dy = point.position.y - camera.position.y;
      const dz = point.position.z - camera.position.z;
      const distance = Math.max(1, Math.hypot(dx, dy, dz));
      const facing = clamp((dx * direction.x + dy * direction.y + dz * direction.z) / distance, -1, 1);
      const proximity = clamp(1 - Math.abs(distance - 2600) / 4200, 0, 1);
      const framing = clamp((facing - 0.72) / 0.28, 0, 1);
      const zoomScore = clamp(1 - Math.abs(zoom - 2.2) / 2.2, 0, 1);
      const score = Math.round((framing * 0.55 + proximity * 0.25 + zoomScore * 0.2) * 100);
      if (!best || score > best.score) best = { point, score };
    }
    const recognized = best && best.score >= 45;
    const capture = Object.freeze({
      id: `photo-${captures.length + 1}`,
      snapPointId: recognized ? best.point.id : null,
      landmarkId: recognized ? best.point.landmarkId : null,
      name: recognized ? best.point.name : "Unidentified view",
      score: best?.score ?? 0,
      rating: !recognized ? "Not identified" : best.score >= 90 ? "Postcard" : best.score >= 70 ? "Good photo" : "Recognized",
      zoom,
      position: Object.freeze({ x: playerState.position.x, y: playerState.position.y, z: playerState.position.z }),
      capturedAt: Number(playerState.elapsed) || 0
    });
    captures.push(capture);
    if (recognized) completed.add(best.point.id);
    lastResult = capture;
    return capture;
  }

  function onKeyDown(event) {
    if (event.repeat) return;
    if (event.code === "KeyC") { event.preventDefault(); setCameraMode(!cameraMode); }
    else if ((event.code === "KeyP" || event.code === "Enter") && cameraMode) { event.preventDefault(); requestCapture(); }
    else if (event.code === "Escape" && cameraMode) { event.preventDefault(); setCameraMode(false); }
  }

  function onWheel(event) {
    if (!cameraMode) return;
    event.preventDefault();
    setZoom(zoom + (event.deltaY < 0 ? 0.2 : -0.2));
  }

  addEventListener("keydown", onKeyDown);
  renderer?.domElement?.addEventListener?.("wheel", onWheel, { passive: false });

  const api = {
    id: IMAGE_CAPTURE_DOMAIN_ID,
    snapPoints,
    setCameraMode,
    setZoom,
    requestCapture,
    update: evaluate,
    get cameraMode() { return cameraMode; },
    get zoom() { return zoom; },
    get lastResult() { return lastResult; },
    get captures() { return Object.freeze([...captures]); },
    isComplete: (snapPointId) => completed.has(snapPointId),
    snapshot: () => Object.freeze({ cameraMode, zoom, captures: [...captures], completed: [...completed], lastResult }),
    dispose() {
      removeEventListener("keydown", onKeyDown);
      renderer?.domElement?.removeEventListener?.("wheel", onWheel);
    }
  };
  return Object.freeze(api);
}
