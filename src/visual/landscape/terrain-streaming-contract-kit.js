export const TERRAIN_STREAMING_CONTRACT_KIT_ID = "open-above-terrain-streaming-contract-kit";
export const TERRAIN_NEAR_CHUNK_SIZE = 520;
export const TERRAIN_HORIZON_SCALE = 2;
export const TERRAIN_SEAM_EPSILON = 0.001;

export function terrainChunkKey(x, z) {
  return `${x}:${z}`;
}

export function terrainChunkBounds(cx, cz, chunkSize) {
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

export function boundsIntersect(first, second, epsilon = 0) {
  return first.minX < second.maxX - epsilon
    && first.maxX > second.minX + epsilon
    && first.minZ < second.maxZ - epsilon
    && first.maxZ > second.minZ + epsilon;
}

export function pointInsideBounds(x, z, bounds, epsilon = TERRAIN_SEAM_EPSILON) {
  return x > bounds.minX + epsilon
    && x < bounds.maxX - epsilon
    && z > bounds.minZ + epsilon
    && z < bounds.maxZ - epsilon;
}

export function pointInsideAnyBounds(x, z, boundsList, epsilon = TERRAIN_SEAM_EPSILON) {
  return boundsList.some((bounds) => pointInsideBounds(x, z, bounds, epsilon));
}

function stableRoundHalfAwayFromZero(value) {
  return value < 0 ? -Math.round(-value) : Math.round(value);
}

export function createTerrainStreamingFrame(cameraPosition, {
  nearChunkSize = TERRAIN_NEAR_CHUNK_SIZE,
  nearChunkRadius = 3,
  horizonScale = TERRAIN_HORIZON_SCALE,
  worldSurface = null
} = {}) {
  const cameraX = Number(cameraPosition?.x) || 0;
  const cameraZ = Number(cameraPosition?.z) || 0;
  const nearCenterX = stableRoundHalfAwayFromZero(cameraX / nearChunkSize);
  const nearCenterZ = stableRoundHalfAwayFromZero(cameraZ / nearChunkSize);
  const horizonCenterX = Math.trunc(nearCenterX / horizonScale);
  const horizonCenterZ = Math.trunc(nearCenterZ / horizonScale);
  const nearChunks = [];

  for (let dz = -nearChunkRadius; dz <= nearChunkRadius; dz += 1) {
    for (let dx = -nearChunkRadius; dx <= nearChunkRadius; dx += 1) {
      const distance = Math.hypot(dx, dz);
      if (distance > nearChunkRadius + 0.35) continue;
      const cx = nearCenterX + dx;
      const cz = nearCenterZ + dz;
      const bounds = terrainChunkBounds(cx, cz, nearChunkSize);
      if (worldSurface && !worldSurface.intersectsBounds(bounds)) continue;
      nearChunks.push({
        key: terrainChunkKey(cx, cz),
        cx,
        cz,
        dx,
        dz,
        distance,
        bounds
      });
    }
  }

  nearChunks.sort((a, b) => a.key.localeCompare(b.key));
  const revision = [
    nearCenterX,
    nearCenterZ,
    horizonCenterX,
    horizonCenterZ,
    nearChunkRadius,
    nearChunks.map((chunk) => chunk.key).join(",")
  ].join("|");

  return Object.freeze({
    revision,
    cameraX,
    cameraZ,
    nearChunkSize,
    nearChunkRadius,
    horizonScale,
    horizonChunkSize: nearChunkSize * horizonScale,
    nearCenterX,
    nearCenterZ,
    horizonCenterX,
    horizonCenterZ,
    nearChunks: Object.freeze(nearChunks),
    nearBounds: Object.freeze(nearChunks.map((chunk) => chunk.bounds))
  });
}

function uniqueSorted(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const result = [];
  for (const value of sorted) {
    if (!result.length || Math.abs(value - result[result.length - 1]) > 1e-6) result.push(value);
  }
  return result;
}

export function partitionAxis(min, max, segments, clipBounds, minField, maxField) {
  const values = [min, max];
  for (let index = 1; index < segments; index += 1) {
    values.push(min + (max - min) * (index / segments));
  }
  for (const bounds of clipBounds) {
    const low = Math.max(min, Math.min(max, bounds[minField]));
    const high = Math.max(min, Math.min(max, bounds[maxField]));
    if (low > min + 1e-6 && low < max - 1e-6) values.push(low);
    if (high > min + 1e-6 && high < max - 1e-6) values.push(high);
  }
  return uniqueSorted(values);
}

export function partitionHorizonChunk(bounds, segments, nearBounds) {
  const clipBounds = nearBounds.filter((candidate) => boundsIntersect(bounds, candidate));
  const x = partitionAxis(bounds.minX, bounds.maxX, segments, clipBounds, "minX", "maxX");
  const z = partitionAxis(bounds.minZ, bounds.maxZ, segments, clipBounds, "minZ", "maxZ");
  const cells = [];

  for (let zi = 0; zi < z.length - 1; zi += 1) {
    for (let xi = 0; xi < x.length - 1; xi += 1) {
      const centerX = (x[xi] + x[xi + 1]) * 0.5;
      const centerZ = (z[zi] + z[zi + 1]) * 0.5;
      const coveredByNear = pointInsideAnyBounds(centerX, centerZ, clipBounds);
      cells.push(Object.freeze({
        minX: x[xi],
        maxX: x[xi + 1],
        minZ: z[zi],
        maxZ: z[zi + 1],
        coveredByNear
      }));
    }
  }

  const visibleCells = cells.filter((cell) => !cell.coveredByNear);
  const clipSignature = clipBounds
    .map((candidate) => `${candidate.minX}:${candidate.maxX}:${candidate.minZ}:${candidate.maxZ}`)
    .sort()
    .join(";");

  return Object.freeze({
    x: Object.freeze(x),
    z: Object.freeze(z),
    cells: Object.freeze(cells),
    visibleCells: Object.freeze(visibleCells),
    clipBounds: Object.freeze(clipBounds),
    clipSignature
  });
}

export function defaultHorizonLod(distance) {
  if (distance < 3400) return Object.freeze({ lodBand: 0, segments: 10 });
  if (distance < 5000) return Object.freeze({ lodBand: 1, segments: 6 });
  return Object.freeze({ lodBand: 2, segments: 4 });
}

export function classifyHorizonRequirements(frame, {
  radiusInNearChunks = 12,
  worldSurface = null,
  lodForDistance = defaultHorizonLod
} = {}) {
  const chunkSize = frame.horizonChunkSize;
  const maxDistance = radiusInNearChunks * frame.nearChunkSize;
  const coarseRadius = Math.ceil(radiusInNearChunks / frame.horizonScale) + 1;
  const requirements = [];

  for (let dz = -coarseRadius; dz <= coarseRadius; dz += 1) {
    for (let dx = -coarseRadius; dx <= coarseRadius; dx += 1) {
      const cx = frame.horizonCenterX + dx;
      const cz = frame.horizonCenterZ + dz;
      const bounds = terrainChunkBounds(cx, cz, chunkSize);
      const distance = Math.hypot(dx * chunkSize, dz * chunkSize);
      const halfDiagonal = chunkSize * Math.SQRT2 * 0.5;
      if (distance - halfDiagonal > maxDistance) continue;
      if (worldSurface && !worldSurface.intersectsBounds(bounds)) continue;
      const lod = lodForDistance(distance);
      const partition = partitionHorizonChunk(bounds, lod.segments, frame.nearBounds);
      if (!partition.visibleCells.length) continue;
      requirements.push(Object.freeze({
        key: terrainChunkKey(cx, cz),
        cx,
        cz,
        bounds,
        distance,
        lodBand: lod.lodBand,
        segments: lod.segments,
        partition,
        clipSignature: partition.clipSignature
      }));
    }
  }

  requirements.sort((a, b) => a.key.localeCompare(b.key));
  return Object.freeze(requirements);
}

if (typeof window !== "undefined") {
  window.OpenAboveTerrainStreamingContractKit = {
    id: TERRAIN_STREAMING_CONTRACT_KIT_ID,
    createTerrainStreamingFrame,
    classifyHorizonRequirements
  };
}
