import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { generateGrassChunkCandidates } from "./grass-chunk-placement-kit.js";
import { grassLodForChunkDistance } from "./grass-lod-kit.js";
import { createGrassComputeCullingKit } from "./grass-compute-culling-kit.js";

export const GRASS_FIELD_DOMAIN_ID = "open-above-grass-field-domain";

function createPatchGeometry(planes = 3) {
  const geometry = new THREE.BufferGeometry();
  const positions = [];
  const uvs = [];
  const indices = [];
  for (let p = 0; p < planes; p += 1) {
    const angle = (p / planes) * Math.PI;
    const c = Math.cos(angle) * 0.34;
    const s = Math.sin(angle) * 0.34;
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

function createGrassMaterial() {
  const material = new THREE.MeshStandardMaterial({
    color: 0x6f8f45,
    roughness: 0.92,
    metalness: 0,
    side: THREE.DoubleSide,
    alphaTest: 0.42,
    vertexColors: true
  });
  const state = { shader: null };
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uGrassTime = { value: 0 };
    shader.uniforms.uWindStrength = { value: 1 };
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nuniform float uGrassTime;\nuniform float uWindStrength;\nvarying vec2 vGrassUv;")
      .replace("#include <begin_vertex>", `#include <begin_vertex>
vGrassUv = uv;
#ifdef USE_INSTANCING
float phase = instanceMatrix[3][0] * 0.017 + instanceMatrix[3][2] * 0.023;
float tip = clamp(position.y, 0.0, 1.0);
transformed.x += sin(uGrassTime * 1.7 + phase) * 0.18 * tip * uWindStrength;
transformed.z += cos(uGrassTime * 1.15 + phase * 1.7) * 0.08 * tip * uWindStrength;
#endif`);
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", "#include <common>\nvarying vec2 vGrassUv;")
      .replace("#include <alphatest_fragment>", `float blade = smoothstep(0.0, 0.14, vGrassUv.y) * smoothstep(0.0, 0.16, 1.0 - abs(vGrassUv.x * 2.0 - 1.0));
if (blade < 0.42) discard;`);
    state.shader = shader;
  };
  material.customProgramCacheKey = () => "open-above-grass-field-v3";
  return { material, state };
}

export function createGrassFieldDomain(scene, worldConfig, quality, terrain) {
  const chunkSize = terrain.streamer?.chunkSize ?? 520;
  const chunkRadius = 3;
  const root = new THREE.Group();
  root.name = "open-above-grass-field-domain";
  scene.add(root);
  const chunks = new Map();
  const culling = createGrassComputeCullingKit();
  const materialBundle = createGrassMaterial();
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
      moistureAt: terrain.moistureAt
    });
    const geometry = createPatchGeometry(lodProfile.planes);
    const mesh = new THREE.InstancedMesh(geometry, materialBundle.material, Math.max(1, candidates.length));
    mesh.name = `grass-chunk-${cx}-${cz}-lod-${lodProfile.lod}`;
    mesh.frustumCulled = true;
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();
    const color = new THREE.Color();
    for (let i = 0; i < candidates.length; i += 1) {
      const item = candidates[i];
      position.set(item.x, item.y + 0.02, item.z);
      quaternion.setFromEuler(new THREE.Euler(0, item.rotation, 0));
      scale.set(item.width, item.height, item.width);
      matrix.compose(position, quaternion, scale);
      mesh.setMatrixAt(i, matrix);
      color.set(item.species === 2 ? 0x4f7650 : item.species === 1 ? 0x8b9148 : 0x6f9345);
      color.offsetHSL((item.hue - 0.5) * 0.025, 0, (item.hue - 0.5) * 0.12);
      mesh.setColorAt(i, color);
    }
    mesh.count = candidates.length;
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.userData.grass = { x: cx, z: cz, lod: lodProfile.lod, wind: lodProfile.wind, count: candidates.length };
    root.add(mesh);
    return mesh;
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
    for (const [chunkKey, need] of required) if (!chunks.has(chunkKey)) chunks.set(chunkKey, buildChunk(need.x, need.z, need.profile));
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
      const distance = camera.position.distanceTo(mesh.position);
      mesh.visible = culling.cullChunk(distance, chunkSize * 4.2);
    }
  }

  function dispose() {
    for (const mesh of chunks.values()) mesh.geometry.dispose();
    chunks.clear();
    materialBundle.material.dispose();
    root.removeFromParent();
  }

  return {
    id: GRASS_FIELD_DOMAIN_ID,
    root,
    chunks,
    culling,
    update,
    dispose,
    getState: () => ({ backend: culling.state.backend, chunks: chunks.size, instances: [...chunks.values()].reduce((sum, mesh) => sum + mesh.count, 0) })
  };
}

window.OpenAboveGrassFieldDomain = { id: GRASS_FIELD_DOMAIN_ID, createGrassFieldDomain };
