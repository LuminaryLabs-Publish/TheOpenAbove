import * as THREE from "three";
import {
  createAirstreamTrailGeometry,
  updateAirstreamTrailGeometry
} from "./airstream-trail-geometry-kit.js";
import { createAirstreamTrailMaterial } from "./airstream-trail-material-kit.js";

export const THREE_AIRSTREAM_TRAIL_ADAPTER_ID = "open-above-three-airstream-trail-adapter";

export function createThreeAirstreamTrailAdapter({
  scene,
  field,
  morphDuration = 0.3
} = {}) {
  if (!scene?.add || !scene?.remove) throw new TypeError("Airstream trail adapter requires a Three.js scene.");
  if (!field?.descriptors) throw new TypeError("Airstream trail adapter requires a trail field.");

  let geometry = createAirstreamTrailGeometry(field.descriptors);
  const geometryStats = geometry.userData.airstreamTrails;
  let material = createAirstreamTrailMaterial();
  let mesh = new THREE.Mesh(geometry, material);
  const group = new THREE.Group();
  let mounted = false;
  let disposed = false;
  let morphStartedAt = 0;
  let currentMorph = 1;
  let revisions = 1;
  let frameUpdates = 0;

  mesh.name = "open-above-seven-wind-trails";
  mesh.frustumCulled = true;
  mesh.renderOrder = 8;
  group.name = "open-above-airstream-trail-presentation";
  group.add(mesh);

  function mount(position = field.origin) {
    if (disposed) throw new Error("Disposed airstream trail adapter cannot be mounted.");
    if (!mounted) {
      scene.add(group);
      mounted = true;
    }
    if (position) group.position.set(Number(position.x) || 0, Number(position.y) || 0, Number(position.z) || 0);
    return api;
  }

  function setField(nextField, elapsed = 0) {
    if (disposed) return false;
    if (!nextField?.descriptors) throw new TypeError("Airstream trail revision requires descriptors.");
    updateAirstreamTrailGeometry(geometry, nextField.descriptors, currentMorph);
    morphStartedAt = Number(elapsed) || 0;
    currentMorph = 0;
    material.uniforms.uMorph.value = 0;
    revisions += 1;
    return true;
  }

  function update(elapsed = 0, position = null) {
    if (!mounted || disposed) return false;
    const time = Number(elapsed) || 0;
    if (position) group.position.set(Number(position.x) || 0, Number(position.y) || 0, Number(position.z) || 0);
    material.uniforms.uTime.value = time;
    currentMorph = Math.max(0, Math.min(1, (time - morphStartedAt) / Math.max(0.001, morphDuration)));
    material.uniforms.uMorph.value = currentMorph;
    frameUpdates += 1;
    return true;
  }

  function snapshot() {
    return Object.freeze({
      id: THREE_AIRSTREAM_TRAIL_ADAPTER_ID,
      mounted,
      disposed,
      trailCount: geometryStats.pointCounts.length,
      vertexCount: geometryStats.vertexCount,
      indexCount: geometryStats.indexCount,
      drawCalls: 1,
      meshCount: 1,
      materialCount: 1,
      bufferUploads: geometryStats.bufferUploads,
      revisions,
      frameUpdates,
      morph: Number(currentMorph.toFixed(4))
    });
  }

  function dispose() {
    if (disposed) return;
    if (mounted) scene.remove(group);
    group.remove(mesh);
    geometry.dispose();
    material.dispose();
    mounted = false;
    disposed = true;
    geometry = null;
    material = null;
    mesh = null;
  }

  const api = Object.freeze({
    id: THREE_AIRSTREAM_TRAIL_ADAPTER_ID,
    group,
    mount,
    setField,
    update,
    snapshot,
    dispose,
    get mesh() { return mesh; },
    get material() { return material; },
    get geometry() { return geometry; }
  });
  return api;
}
