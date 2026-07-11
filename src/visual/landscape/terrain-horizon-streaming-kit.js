import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export const TERRAIN_HORIZON_STREAMING_KIT_ID = "open-above-terrain-horizon-streaming-kit";

function key(x, z) {
  return `${x}:${z}`;
}

function chunkBounds(cx, cz, chunkSize) {
  const half = chunkSize * 0.5;
  const centerX = cx * chunkSize;
  const centerZ = cz * chunkSize;
  return {
    minX: centerX - half,
    maxX: centerX + half,
    minZ: centerZ - half,
    maxZ: centerZ + half
  };
}

function segmentsForDistance(distance) {
  if (distance < 3400) return 10;
  if (distance < 5000) return 6;
  return 4;
}

export function createTerrainHorizonStreamer({
  scene,
  terrainHeight,
  terrainColor,
  material,
  worldSurface = null,
  nearChunkSize = 520,
  radiusInNearChunks = 12,
  innerRadiusInNearChunks = 3.35
}) {
  const coarseScale = 2;
  const chunkSize = nearChunkSize * coarseScale;
  const maxDistance = radiusInNearChunks * nearChunkSize;
  const innerDistance = innerRadiusInNearChunks * nearChunkSize;
  const group = new THREE.Group();
  group.name = "open-above-far-horizon-terrain";
  scene.add(group);

  const chunks = new Map();
  let centerX = Number.NaN;
  let centerZ = Number.NaN;

  function buildGeometry(cx, cz) {
    const worldCenterX = cx * chunkSize;
    const worldCenterZ = cz * chunkSize;
    const distance = Math.hypot(worldCenterX - centerX * chunkSize, worldCenterZ - centerZ * chunkSize);
    const segments = segmentsForDistance(distance);
    const geometry = new THREE.PlaneGeometry(chunkSize * 1.004, chunkSize * 1.004, segments, segments);
    geometry.rotateX(-Math.PI / 2);
    const positions = geometry.attributes.position;
    const colors = new Float32Array(positions.count * 3);
    const slopeStep = 24;

    for (let index = 0; index < positions.count; index += 1) {
      const worldX = worldCenterX + positions.getX(index);
      const worldZ = worldCenterZ + positions.getZ(index);
      const height = terrainHeight(worldX, worldZ);
      positions.setY(index, height - 0.08);
      const dx = terrainHeight(worldX + slopeStep, worldZ) - terrainHeight(worldX - slopeStep, worldZ);
      const dz = terrainHeight(worldX, worldZ + slopeStep) - terrainHeight(worldX, worldZ - slopeStep);
      const slope = Math.hypot(dx, dz) / (slopeStep * 2);
      const color = terrainColor(worldX, worldZ, height, slope);
      colors[index * 3] = color.r;
      colors[index * 3 + 1] = color.g;
      colors[index * 3 + 2] = color.b;
    }

    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.computeVertexNormals();
    geometry.computeBoundingSphere();
    return geometry;
  }

  function createChunk(cx, cz) {
    const mesh = new THREE.Mesh(buildGeometry(cx, cz), material);
    mesh.name = `terrain-horizon-${cx}-${cz}`;
    mesh.position.set(cx * chunkSize, 0, cz * chunkSize);
    mesh.receiveShadow = false;
    mesh.castShadow = false;
    mesh.userData.horizonChunk = { x: cx, z: cz };
    group.add(mesh);
    return mesh;
  }

  function rebuild(nextCenterX, nextCenterZ) {
    const required = new Set();
    const coarseRadius = Math.ceil(radiusInNearChunks / coarseScale) + 1;

    for (let dz = -coarseRadius; dz <= coarseRadius; dz += 1) {
      for (let dx = -coarseRadius; dx <= coarseRadius; dx += 1) {
        const cx = nextCenterX + dx;
        const cz = nextCenterZ + dz;
        const distance = Math.hypot(dx * chunkSize, dz * chunkSize);
        const halfDiagonal = chunkSize * Math.SQRT2 * 0.5;
        if (distance + halfDiagonal <= innerDistance) continue;
        if (distance - halfDiagonal > maxDistance) continue;
        if (worldSurface && !worldSurface.intersectsBounds(chunkBounds(cx, cz, chunkSize))) continue;
        required.add(key(cx, cz));
      }
    }

    for (const [chunkKey, mesh] of chunks) {
      if (!required.has(chunkKey)) {
        group.remove(mesh);
        mesh.geometry.dispose();
        chunks.delete(chunkKey);
      }
    }

    for (const chunkKey of required) {
      if (chunks.has(chunkKey)) continue;
      const [cx, cz] = chunkKey.split(":").map(Number);
      chunks.set(chunkKey, createChunk(cx, cz));
    }
  }

  function update(camera) {
    const nextCenterX = Math.round(camera.position.x / chunkSize);
    const nextCenterZ = Math.round(camera.position.z / chunkSize);
    if (nextCenterX === centerX && nextCenterZ === centerZ) return;
    centerX = nextCenterX;
    centerZ = nextCenterZ;
    rebuild(centerX, centerZ);
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
    innerRadiusInNearChunks,
    maxDistance,
    worldSurface,
    update,
    dispose
  };
}
