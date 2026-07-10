import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { terrainHeight, moistureAt } from "./terrain-surface-kit.js";

export const GRASS_DETAIL_KIT_ID = "open-above-grass-detail-kit";

function seeded(seed) {
  let s = (Number(seed) || 1) >>> 0;
  return () => {
    s = (s * 1103515245 + 12345) >>> 0;
    return s / 4294967296;
  };
}

export function createGrassDetail(scene, worldConfig, quality) {
  const count = Math.max(400, quality.grassCount);
  const random = seeded((worldConfig.seed || 1) * 31 + 5);
  const geometry = new THREE.PlaneGeometry(0.42, 2.2, 1, 4);
  geometry.translate(0, 1.1, 0);
  const material = new THREE.MeshStandardMaterial({
    color: 0x75984f,
    roughness: 0.93,
    metalness: 0,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.84,
    alphaTest: 0.08
  });
  const shaderState = { shader: null };
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uGrassTime = { value: 0 };
    shader.vertexShader = shader.vertexShader.replace(
      "#include <common>",
      `#include <common>\nuniform float uGrassTime;`
    ).replace(
      "#include <begin_vertex>",
      `#include <begin_vertex>
       #ifdef USE_INSTANCING
       float grassPhase = instanceMatrix[3][0] * 0.021 + instanceMatrix[3][2] * 0.017;
       float grassBend = sin(uGrassTime * 1.45 + grassPhase + position.y * 0.7) * 0.16;
       transformed.x += grassBend * (position.y / 2.2);
       transformed.z += cos(uGrassTime * 1.18 + grassPhase) * 0.07 * (position.y / 2.2);
       #endif`
    );
    shaderState.shader = shader;
  };
  material.customProgramCacheKey = () => "open-above-grass-wind-v1";

  const mesh = new THREE.InstancedMesh(geometry, material, count);
  mesh.name = "open-above-instanced-meadow-grass";
  mesh.castShadow = false;
  mesh.receiveShadow = true;
  const matrix = new THREE.Matrix4();
  const quaternion = new THREE.Quaternion();
  const position = new THREE.Vector3();
  const scale = new THREE.Vector3();
  const color = new THREE.Color();
  const half = (worldConfig.terrainSize || 2600) * 0.67;
  let placed = 0;
  for (let i = 0; i < count * 2 && placed < count; i += 1) {
    const x = (random() - 0.5) * half * 2;
    const z = (random() - 0.5) * half * 2;
    const moisture = moistureAt(x, z);
    const y = terrainHeight(x, z);
    if (moisture > 0.82 || y > 112) continue;
    quaternion.setFromEuler(new THREE.Euler(0, random() * Math.PI * 2, (random() - 0.5) * 0.08));
    position.set(x, y + 0.04, z);
    const s = 0.48 + random() * 1.25;
    scale.set(s * (0.7 + random() * 0.35), s, s);
    matrix.compose(position, quaternion, scale);
    mesh.setMatrixAt(placed, matrix);
    color.set(moisture > 0.42 ? 0x537c45 : 0x8f984d).offsetHSL((random() - 0.5) * 0.02, 0, (random() - 0.5) * 0.1);
    mesh.setColorAt(placed, color);
    placed += 1;
  }
  mesh.count = placed;
  mesh.instanceMatrix.needsUpdate = true;
  mesh.instanceColor.needsUpdate = true;
  scene.add(mesh);

  function update(elapsed) {
    if (shaderState.shader) shaderState.shader.uniforms.uGrassTime.value = elapsed;
  }

  return { id: GRASS_DETAIL_KIT_ID, mesh, update, count: placed };
}

window.OpenAboveGrassDetailKit = { id: GRASS_DETAIL_KIT_ID, createGrassDetail };
