import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import {
  FLOWER_CULL_DISTANCE,
  FLOWER_FADE_END,
  FLOWER_FADE_START,
  FLOWER_TYPE_COUNT,
  flowerCountForChunkDistance,
  generateFlowerChunkCandidates
} from "./flower-chunk-placement-kit.js";
import { createFlowerTextureAtlas } from "./flower-texture-atlas-kit.js";

export const FLOWER_FIELD_DOMAIN_ID = "open-above-flower-field-domain";

function createPatchGeometry() {
  const geometry = new THREE.BufferGeometry();
  const positions = [];
  const uvs = [];
  const indices = [];
  for (let plane = 0; plane < 2; plane += 1) {
    const angle = plane * Math.PI * 0.5;
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

function createFlowerMaterial(map) {
  const material = new THREE.MeshStandardMaterial({
    map,
    color: 0xffffff,
    roughness: 0.88,
    metalness: 0,
    side: THREE.DoubleSide,
    alphaTest: 0.32,
    alphaToCoverage: true
  });
  const state = { shader: null };
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uFlowerTime = { value: 0 };
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nuniform float uFlowerTime;\nattribute float flowerVariant;\nvarying vec2 vFlowerUv;\nvarying float vFlowerVariant;\nvarying float vFlowerDistance;")
      .replace("#include <begin_vertex>", `#include <begin_vertex>
vFlowerUv = uv;
vFlowerVariant = flowerVariant;
#ifdef USE_INSTANCING
float phase = instanceMatrix[3][0] * 0.019 + instanceMatrix[3][2] * 0.027;
float tip = clamp(position.y, 0.0, 1.0);
transformed.x += sin(uFlowerTime * 1.35 + phase) * 0.1 * tip;
transformed.z += cos(uFlowerTime * 1.08 + phase * 1.4) * 0.045 * tip;
vec3 flowerWorldPosition = (modelMatrix * instanceMatrix * vec4(transformed, 1.0)).xyz;
vFlowerDistance = distance(flowerWorldPosition, cameraPosition);
#else
vFlowerDistance = 0.0;
#endif`);
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", "#include <common>\nvarying vec2 vFlowerUv;\nvarying float vFlowerVariant;\nvarying float vFlowerDistance;")
      .replace("#include <map_fragment>", `#ifdef USE_MAP
float atlasPadding = 2.0 / 96.0;
float atlasLocalU = mix(atlasPadding, 1.0 - atlasPadding, clamp(vFlowerUv.x, 0.0, 1.0));
float atlasU = (floor(vFlowerVariant + 0.5) + atlasLocalU) / ${FLOWER_TYPE_COUNT.toFixed(1)};
vec4 sampledDiffuseColor = texture2D(map, vec2(atlasU, vFlowerUv.y));
diffuseColor *= sampledDiffuseColor;
#endif`)
      .replace("#include <alphatest_fragment>", `float flowerFade = smoothstep(${FLOWER_FADE_START.toFixed(1)}, ${FLOWER_FADE_END.toFixed(1)}, vFlowerDistance);
diffuseColor.a *= 1.0 - flowerFade;
#include <alphatest_fragment>`);
    state.shader = shader;
  };
  material.customProgramCacheKey = () => "open-above-five-flower-field-v1";
  return { material, state };
}

function createObstacleQuery(vegetation) {
  const positions = vegetation?.treePositions || [];
  const cellSize = 36;
  const cells = new Map();
  for (const tree of positions) {
    const key = `${Math.floor(tree.x / cellSize)}:${Math.floor(tree.z / cellSize)}`;
    if (!cells.has(key)) cells.set(key, []);
    cells.get(key).push(tree);
  }
  return (x, z) => {
    const cellX = Math.floor(x / cellSize);
    const cellZ = Math.floor(z / cellSize);
    for (let dz = -1; dz <= 1; dz += 1) {
      for (let dx = -1; dx <= 1; dx += 1) {
        for (const tree of cells.get(`${cellX + dx}:${cellZ + dz}`) || []) {
          if (Math.hypot(x - tree.x, z - tree.z) < tree.radius + 1.2) return true;
        }
      }
    }
    return false;
  };
}

export function createFlowerFieldDomain(scene, worldConfig, quality, terrain, vegetation, world = null) {
  const chunkSize = terrain.streamer?.chunkSize ?? 520;
  const chunkRadius = 2;
  const root = new THREE.Group();
  root.name = "open-above-flower-field-domain";
  scene.add(root);
  const chunks = new Map();
  const atlas = createFlowerTextureAtlas(worldConfig.seed || 1);
  const materialBundle = createFlowerMaterial(atlas.texture);
  const obstacleAt = createObstacleQuery(vegetation);
  let centerX = Number.NaN;
  let centerZ = Number.NaN;

  const key = (x, z) => `${x}:${z}`;

  function buildChunk(cx, cz, count) {
    const candidates = generateFlowerChunkCandidates({
      worldSeed: worldConfig.seed || 1,
      chunkX: cx,
      chunkZ: cz,
      chunkSize,
      count,
      terrainHeight: terrain.terrainHeight,
      moistureAt: terrain.moistureAt,
      floraAt: (x, z, context) => world?.sampleFlora?.(x, z, context),
      obstacleAt
    });
    const geometry = createPatchGeometry();
    const variants = new Float32Array(Math.max(1, candidates.length));
    for (let index = 0; index < candidates.length; index += 1) variants[index] = candidates[index].type;
    geometry.setAttribute("flowerVariant", new THREE.InstancedBufferAttribute(variants, 1));
    const mesh = new THREE.InstancedMesh(geometry, materialBundle.material, Math.max(1, candidates.length));
    mesh.name = `flower-chunk-${cx}-${cz}`;
    mesh.frustumCulled = false;
    mesh.castShadow = false;
    mesh.receiveShadow = true;

    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();
    const normal = new THREE.Vector3();
    const surfaceRotation = new THREE.Quaternion();
    const yawRotation = new THREE.Quaternion();
    const leanRotation = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);

    for (let index = 0; index < candidates.length; index += 1) {
      const item = candidates[index];
      position.set(item.x, item.y + 0.03, item.z);
      normal.set(item.normal.x, item.normal.y, item.normal.z).normalize();
      surfaceRotation.setFromUnitVectors(up, normal);
      yawRotation.setFromAxisAngle(normal, item.rotation);
      leanRotation.setFromEuler(new THREE.Euler(item.leanX, 0, item.leanZ));
      quaternion.copy(yawRotation).multiply(surfaceRotation).multiply(leanRotation);
      scale.set(item.width, item.height, item.width);
      matrix.compose(position, quaternion, scale);
      mesh.setMatrixAt(index, matrix);
    }
    mesh.count = candidates.length;
    mesh.instanceMatrix.needsUpdate = true;
    mesh.userData.flowers = {
      x: cx,
      z: cz,
      centerX: cx * chunkSize,
      centerZ: cz * chunkSize,
      count: candidates.length,
      cards: candidates.length * 2
    };
    root.add(mesh);
    return mesh;
  }

  function rebuild(nextX, nextZ) {
    const required = new Map();
    for (let dz = -chunkRadius; dz <= chunkRadius; dz += 1) {
      for (let dx = -chunkRadius; dx <= chunkRadius; dx += 1) {
        const count = flowerCountForChunkDistance(Math.hypot(dx, dz), quality.id);
        if (!count) continue;
        required.set(key(nextX + dx, nextZ + dz), { x: nextX + dx, z: nextZ + dz, count });
      }
    }

    for (const [chunkKey, mesh] of chunks) {
      if (!required.has(chunkKey)) {
        root.remove(mesh);
        mesh.geometry.dispose();
        chunks.delete(chunkKey);
      }
    }
    for (const [chunkKey, need] of required) {
      if (!chunks.has(chunkKey)) chunks.set(chunkKey, buildChunk(need.x, need.z, need.count));
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
    if (materialBundle.state.shader) materialBundle.state.shader.uniforms.uFlowerTime.value = elapsed;
    for (const mesh of chunks.values()) {
      const dx = camera.position.x - mesh.userData.flowers.centerX;
      const dz = camera.position.z - mesh.userData.flowers.centerZ;
      mesh.visible = Math.hypot(dx, dz) <= FLOWER_CULL_DISTANCE;
    }
  }

  function dispose() {
    for (const mesh of chunks.values()) mesh.geometry.dispose();
    chunks.clear();
    materialBundle.material.dispose();
    atlas.texture.dispose();
    root.removeFromParent();
  }

  return {
    id: FLOWER_FIELD_DOMAIN_ID,
    root,
    chunks,
    update,
    dispose,
    getState: () => {
      const clumps = [...chunks.values()].reduce((sum, mesh) => sum + mesh.count, 0);
      return {
        chunks: chunks.size,
        clumps,
        cards: clumps * 2,
        textureVariants: atlas.variantCount,
        flowerTypes: atlas.variants.map((variant) => variant.type),
        fadeRange: [FLOWER_FADE_START, FLOWER_FADE_END]
      };
    }
  };
}

if (typeof window !== "undefined") {
  window.OpenAboveFlowerFieldDomain = { id: FLOWER_FIELD_DOMAIN_ID, createFlowerFieldDomain };
}
