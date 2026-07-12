import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import {
  createTerrainStreamingFrame,
  classifyHorizonRequirements
} from "./terrain-streaming-contract-kit.js";

export const TERRAIN_HORIZON_STREAMING_KIT_ID = "open-above-terrain-horizon-streaming-kit";

function pushDoubleSidedQuad(indices, a, b, c, d) {
  indices.push(a, b, c, a, c, d, c, b, a, d, c, a);
}

export function createTerrainHorizonStreamer({
  scene,
  terrainHeight,
  terrainColor,
  material,
  worldSurface = null,
  nearChunkSize = 520,
  nearChunkRadius = 3,
  radiusInNearChunks = 12,
  slopeSampleStep = 24,
  skirtDepth = 4
}) {
  const chunkSize = nearChunkSize * 2;
  const maxDistance = radiusInNearChunks * nearChunkSize;
  const group = new THREE.Group();
  group.name = "open-above-far-horizon-terrain";
  scene.add(group);

  const chunks = new Map();
  let frameRevision = null;

  function buildGeometry(requirement) {
    const worldCenterX = requirement.cx * chunkSize;
    const worldCenterZ = requirement.cz * chunkSize;
    const positions = [];
    const colors = [];
    const indices = [];
    const vertexMap = new Map();

    function vertexAt(worldX, worldZ, yOffset = 0, darken = 1, unique = false) {
      const cacheKey = `${worldX.toFixed(6)}:${worldZ.toFixed(6)}:${yOffset.toFixed(4)}:${darken.toFixed(3)}`;
      if (!unique && vertexMap.has(cacheKey)) return vertexMap.get(cacheKey);
      const height = terrainHeight(worldX, worldZ);
      const dx = terrainHeight(worldX + slopeSampleStep, worldZ) - terrainHeight(worldX - slopeSampleStep, worldZ);
      const dz = terrainHeight(worldX, worldZ + slopeSampleStep) - terrainHeight(worldX, worldZ - slopeSampleStep);
      const slope = Math.hypot(dx, dz) / (slopeSampleStep * 2);
      const color = terrainColor(worldX, worldZ, height, slope);
      const index = positions.length / 3;
      positions.push(worldX - worldCenterX, height + yOffset, worldZ - worldCenterZ);
      colors.push(color.r * darken, color.g * darken, color.b * darken);
      if (!unique) vertexMap.set(cacheKey, index);
      return index;
    }

    for (const cell of requirement.partition.visibleCells) {
      const a = vertexAt(cell.minX, cell.minZ);
      const b = vertexAt(cell.maxX, cell.minZ);
      const c = vertexAt(cell.maxX, cell.maxZ);
      const d = vertexAt(cell.minX, cell.maxZ);
      indices.push(a, d, b, b, d, c);
    }

    const edgeCounts = new Map();
    const edgeDirection = new Map();
    function countEdge(a, b) {
      const key = a < b ? `${a}:${b}` : `${b}:${a}`;
      edgeCounts.set(key, (edgeCounts.get(key) || 0) + 1);
      if (!edgeDirection.has(key)) edgeDirection.set(key, [a, b]);
    }
    for (let index = 0; index < indices.length; index += 3) {
      const a = indices[index];
      const b = indices[index + 1];
      const c = indices[index + 2];
      countEdge(a, b);
      countEdge(b, c);
      countEdge(c, a);
    }

    const surfaceIndexCount = indices.length;
    for (const [key, count] of edgeCounts) {
      if (count !== 1) continue;
      const [first, second] = edgeDirection.get(key);
      const firstX = positions[first * 3] + worldCenterX;
      const firstZ = positions[first * 3 + 2] + worldCenterZ;
      const secondX = positions[second * 3] + worldCenterX;
      const secondZ = positions[second * 3 + 2] + worldCenterZ;
      const firstTop = vertexAt(firstX, firstZ, 0, 0.94, true);
      const secondTop = vertexAt(secondX, secondZ, 0, 0.94, true);
      const firstBottom = vertexAt(firstX, firstZ, -skirtDepth, 0.7, true);
      const secondBottom = vertexAt(secondX, secondZ, -skirtDepth, 0.7, true);
      pushDoubleSidedQuad(indices, firstTop, secondTop, secondBottom, firstBottom);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    geometry.computeBoundingSphere();
    geometry.userData.terrain = {
      surfaceIndexCount,
      skirtIndexCount: indices.length - surfaceIndexCount,
      clipSignature: requirement.clipSignature,
      lodBand: requirement.lodBand,
      segments: requirement.segments
    };
    return geometry;
  }

  function createChunk(requirement) {
    const mesh = new THREE.Mesh(buildGeometry(requirement), material);
    mesh.name = `terrain-horizon-${requirement.cx}-${requirement.cz}-lod-${requirement.lodBand}`;
    mesh.position.set(requirement.cx * chunkSize, 0, requirement.cz * chunkSize);
    mesh.receiveShadow = false;
    mesh.castShadow = false;
    mesh.userData.horizonChunk = {
      x: requirement.cx,
      z: requirement.cz,
      lodBand: requirement.lodBand,
      segments: requirement.segments,
      clipSignature: requirement.clipSignature,
      frameRevision
    };
    group.add(mesh);
    return mesh;
  }

  function rebuild(frame) {
    const requirements = classifyHorizonRequirements(frame, {
      radiusInNearChunks,
      worldSurface
    });
    const required = new Map(requirements.map((requirement) => [requirement.key, requirement]));

    for (const [chunkKey, mesh] of chunks) {
      const requirement = required.get(chunkKey);
      const actual = mesh.userData.horizonChunk;
      const mismatched = !requirement
        || actual.segments !== requirement.segments
        || actual.lodBand !== requirement.lodBand
        || actual.clipSignature !== requirement.clipSignature;
      if (mismatched) {
        group.remove(mesh);
        mesh.geometry.dispose();
        chunks.delete(chunkKey);
      }
    }

    frameRevision = frame.revision;
    for (const [chunkKey, requirement] of required) {
      if (!chunks.has(chunkKey)) chunks.set(chunkKey, createChunk(requirement));
      else chunks.get(chunkKey).userData.horizonChunk.frameRevision = frameRevision;
    }
  }

  function updateFromFrame(frame) {
    if (frame.revision !== frameRevision) rebuild(frame);
  }

  function update(camera) {
    updateFromFrame(createTerrainStreamingFrame(camera.position, {
      nearChunkSize,
      nearChunkRadius,
      worldSurface
    }));
  }

  function dispose() {
    for (const mesh of chunks.values()) mesh.geometry.dispose();
    chunks.clear();
    group.removeFromParent();
  }

  return {
    id: TERRAIN_HORIZON_STREAMING_KIT_ID,
    group,
    chunks,
    chunkSize,
    radiusInNearChunks,
    maxDistance,
    worldSurface,
    update,
    updateFromFrame,
    dispose,
    getFrameRevision: () => frameRevision
  };
}

if (typeof window !== "undefined") {
  window.OpenAboveTerrainHorizonStreamingKit = {
    id: TERRAIN_HORIZON_STREAMING_KIT_ID,
    createTerrainHorizonStreamer
  };
}
