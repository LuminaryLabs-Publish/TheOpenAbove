import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { generateGrassChunkCandidates } from "./grass-chunk-placement-kit.js";
import {
  GRASS_CULL_DISTANCE,
  GRASS_FADE_END,
  GRASS_FADE_START,
  grassLodForChunkDistance
} from "./grass-lod-kit.js";
import { createGrassComputeCullingKit } from "./grass-compute-culling-kit.js";
import { createGrassPatchDistribution } from "./grass-patch-density-kit.js";
import { createGrassTextureAtlas, GRASS_TEXTURE_VARIANTS } from "./grass-texture-atlas-kit.js";

export const GRASS_FIELD_DOMAIN_ID = "open-above-grass-field-domain";

function createPatchGeometry(planes = 2) {
  const geometry = new THREE.BufferGeometry();
  const positions = [];
  const uvs = [];
  const indices = [];
  for (let p = 0; p < planes; p += 1) {
    const angle = (p / planes) * Math.PI;
    const c = Math.cos(angle) * 0.5;
    const s = Math.sin(angle) * 0.5;
    const base = positions.length / 3;
    positions.push(-c, 0, -s, c, 0, s, c, 1, s, -c, 1, -s);
    uvs.push(0, 0, 1, 0, 1, 1, 0, 1);
    indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
  }
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function createGrassMaterial(map) {
  const material = new THREE.MeshStandardMaterial({
    map,
    color: 0xffffff,
    roughness: 0.92,
    metalness: 0,
    side: THREE.DoubleSide,
    alphaTest: 0.3,
    alphaToCoverage: true,
    vertexColors: true
  });
  const state = { shader: null };
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uGrassTime = { value: 0 };
    shader.uniforms.uWindStrength = { value: 1 };
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nuniform float uGrassTime;\nuniform float uWindStrength;\nattribute float grassVariant;\nvarying vec2 vGrassUv;\nvarying float vGrassVariant;\nvarying float vGrassDistance;")
      .replace("#include <begin_vertex>", `#include <begin_vertex>
vGrassUv = uv;
vGrassVariant = grassVariant;
#ifdef USE_INSTANCING
float phase = instanceMatrix[3][0] * 0.017 + instanceMatrix[3][2] * 0.023;
float tip = clamp(position.y, 0.0, 1.0);
transformed.x += sin(uGrassTime * 1.7 + phase) * 0.18 * tip * uWindStrength;
transformed.z += cos(uGrassTime * 1.15 + phase * 1.7) * 0.08 * tip * uWindStrength;
vec3 grassWorldPosition = (modelMatrix * instanceMatrix * vec4(transformed, 1.0)).xyz;
vGrassDistance = distance(grassWorldPosition, cameraPosition);
#else
vGrassDistance = 0.0;
#endif`);
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", "#include <common>\nvarying vec2 vGrassUv;\nvarying float vGrassVariant;\nvarying float vGrassDistance;")
      .replace("#include <map_fragment>", `#ifdef USE_MAP
float atlasPadding = 3.0 / 128.0;
float atlasLocalU = mix(atlasPadding, 1.0 - atlasPadding, clamp(vGrassUv.x, 0.0, 1.0));
float atlasU = (floor(vGrassVariant + 0.5) + atlasLocalU) / ${GRASS_TEXTURE_VARIANTS.toFixed(1)};
vec4 sampledDiffuseColor = texture2D(map, vec2(atlasU, vGrassUv.y));
diffuseColor *= sampledDiffuseColor;
#endif`)
      .replace("#include <alphatest_fragment>", `float grassFade = smoothstep(${GRASS_FADE_START.toFixed(1)}, ${GRASS_FADE_END.toFixed(1)}, vGrassDistance);
diffuseColor.a *= 1.0 - grassFade;
#include <alphatest_fragment>`);
    state.shader = shader;
  };
  material.customProgramCacheKey = () => "open-above-five-species-local-grass-v1";
  return { material, state };
}

function createVegetationQueries(vegetation) {
  const treePositions = vegetation?.treePositions || [];
  const clusters = vegetation?.clusters || [];
  const cellSize = 36;
  const cells = new Map();
  const key = (x, z) => `${Math.floor(x / cellSize)}:${Math.floor(z / cellSize)}`;

  function refresh() {
    cells.clear();
    for (const tree of treePositions) {
      const cellKey = key(tree.x, tree.z);
      if (!cells.has(cellKey)) cells.set(cellKey, []);
      cells.get(cellKey).push(tree);
    }
  }

  function obstacleAt(x, z) {
    const cellX = Math.floor(x / cellSize);
    const cellZ = Math.floor(z / cellSize);
    for (let dz = -1; dz <= 1; dz += 1) {
      for (let dx = -1; dx <= 1; dx += 1) {
        for (const tree of cells.get(`${cellX + dx}:${cellZ + dz}`) || []) {
          if (Math.hypot(x - tree.x, z - tree.z) < tree.radius) return true;
        }
      }
    }
    return false;
  }

  function treeProximityAt(x, z) {
    let proximity = 0;
    for (const cluster of clusters) {
      const distance = Math.hypot(x - cluster.x, z - cluster.z);
      const edgeDistance = Math.abs(distance - cluster.spread * 0.72);
      proximity = Math.max(proximity, 1 - Math.min(1, edgeDistance / 80));
    }
    return proximity;
  }

  refresh();
  return { obstacleAt, treeProximityAt, refresh };
}

export function createGrassFieldDomain(scene, worldConfig, quality, terrain, vegetation, world = null) {
  const chunkSize = terrain.streamer?.chunkSize ?? 520;
  const chunkRadius = 2;
  const root = new THREE.Group();
  root.name = "open-above-grass-field-domain";
  scene.add(root);
  const chunks = new Map();
  const culling = createGrassComputeCullingKit();
  const atlas = createGrassTextureAtlas(worldConfig.seed || 1);
  const materialBundle = createGrassMaterial(atlas.texture);
  const patchDistribution = createGrassPatchDistribution(worldConfig.seed || 1, worldConfig.terrainSize || 2400, world);
  const vegetationQueries = createVegetationQueries(vegetation);
  let centerX = Number.NaN;
  let centerZ = Number.NaN;

  function key(x, z) { return `${x}:${z}`; }

  function buildChunk(cx, cz, lodProfile) {
    const candidates = generateGrassChunkCandidates({
      worldSeed: worldConfig.seed || 1,
      chunkX: cx,
      chunkZ: cz,
      chunkSize,
      count: lodProfile.count,
      terrainHeight: terrain.terrainHeight,
      moistureAt: terrain.moistureAt,
      patchDistribution,
      treeProximityAt: vegetationQueries.treeProximityAt,
      obstacleAt: vegetationQueries.obstacleAt
    });
    const geometry = createPatchGeometry(lodProfile.planes);
    const variants = new Float32Array(Math.max(1, candidates.length));
    for (let index = 0; index < candidates.length; index += 1) variants[index] = candidates[index].variant;
    geometry.setAttribute("grassVariant", new THREE.InstancedBufferAttribute(variants, 1));
    const mesh = new THREE.InstancedMesh(geometry, materialBundle.material, Math.max(1, candidates.length));
    mesh.name = `grass-chunk-${cx}-${cz}-lod-${lodProfile.lod}`;
    mesh.frustumCulled = false;
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();
    const color = new THREE.Color();
    const normal = new THREE.Vector3();
    const surfaceRotation = new THREE.Quaternion();
    const yawRotation = new THREE.Quaternion();
    const leanRotation = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    const subtleTints = [0xe9f6e7, 0xf0f7e6, 0xf5fbe8, 0xf7f0da, 0xfff0c9];
    for (let i = 0; i < candidates.length; i += 1) {
      const item = candidates[i];
      position.set(item.x, item.y + 0.02, item.z);
      normal.set(item.normal.x, item.normal.y, item.normal.z).normalize();
      surfaceRotation.setFromUnitVectors(up, normal);
      yawRotation.setFromAxisAngle(normal, item.rotation);
      leanRotation.setFromEuler(new THREE.Euler(item.leanX, 0, item.leanZ));
      quaternion.copy(yawRotation).multiply(surfaceRotation).multiply(leanRotation);
      scale.set(item.width, item.height, item.width);
      matrix.compose(position, quaternion, scale);
      mesh.setMatrixAt(i, matrix);
      color.set(subtleTints[item.species] ?? 0xffffff).lerp(new THREE.Color(0xffffff), 0.72);
      color.offsetHSL((item.hue - 0.5) * 0.018, 0, (item.hue - 0.5) * 0.045);
      mesh.setColorAt(i, color);
    }
    mesh.count = candidates.length;
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.userData.grass = {
      x: cx,
      z: cz,
      centerX: cx * chunkSize,
      centerZ: cz * chunkSize,
      lod: lodProfile.lod,
      wind: lodProfile.wind,
      count: candidates.length,
      cards: candidates.length * lodProfile.planes
    };
    root.add(mesh);
    return mesh;
  }

  function clearChunks() {
    for (const mesh of chunks.values()) {
      root.remove(mesh);
      mesh.geometry.dispose();
    }
    chunks.clear();
  }

  function rebuild(nextX, nextZ) {
    const required = new Map();
    for (let dz = -chunkRadius; dz <= chunkRadius; dz += 1) {
      for (let dx = -chunkRadius; dx <= chunkRadius; dx += 1) {
        const distance = Math.hypot(dx, dz);
        const profile = grassLodForChunkDistance(distance, quality.id);
        if (!profile.count) continue;
        required.set(key(nextX + dx, nextZ + dz), { x: nextX + dx, z: nextZ + dz, profile });
      }
    }
    for (const [chunkKey, mesh] of chunks) {
      const need = required.get(chunkKey);
      if (!need || need.profile.lod !== mesh.userData.grass.lod) {
        root.remove(mesh);
        mesh.geometry.dispose();
        chunks.delete(chunkKey);
      }
    }
    for (const [chunkKey, need] of required) {
      if (!chunks.has(chunkKey)) chunks.set(chunkKey, buildChunk(need.x, need.z, need.profile));
    }
  }

  function update(elapsed, camera) {
    const nextX = Math.round(camera.position.x / chunkSize);
    const nextZ = Math.round(camera.position.z / chunkSize);
    if (nextX !== centerX || nextZ !== centerZ) {
      centerX = nextX;
      centerZ = nextZ;
      rebuild(centerX, centerZ);
    }
    if (materialBundle.state.shader) materialBundle.state.shader.uniforms.uGrassTime.value = elapsed;
    for (const mesh of chunks.values()) {
      const dx = camera.position.x - mesh.userData.grass.centerX;
      const dz = camera.position.z - mesh.userData.grass.centerZ;
      mesh.visible = culling.cullChunk(Math.hypot(dx, dz), GRASS_CULL_DISTANCE);
    }
  }

  function refresh() {
    clearChunks();
    vegetationQueries.refresh();
    centerX = Number.NaN;
    centerZ = Number.NaN;
  }

  function dispose() {
    clearChunks();
    materialBundle.material.dispose();
    atlas.texture.dispose();
    root.removeFromParent();
  }

  return {
    id: GRASS_FIELD_DOMAIN_ID,
    root,
    chunks,
    culling,
    update,
    refresh,
    dispose,
    getState: () => {
      const clumps = [...chunks.values()].reduce((sum, mesh) => sum + mesh.count, 0);
      return {
        backend: culling.state.backend,
        chunks: chunks.size,
        instances: clumps,
        clumps,
        cards: clumps * 2,
        apparentBlades: [clumps * 40, clumps * 100],
        textureVariants: atlas.variantCount,
        grassTypes: atlas.variants.map((variant) => variant.species),
        fadeRange: [GRASS_FADE_START, GRASS_FADE_END],
        patchCenters: world ? "world-grid" : patchDistribution.patchCount,
        clearingCenters: world ? "world-grid" : patchDistribution.clearingCount
      };
    }
  };
}

if (typeof window !== "undefined") {
  window.OpenAboveGrassFieldDomain = { id: GRASS_FIELD_DOMAIN_ID, createGrassFieldDomain };
}
