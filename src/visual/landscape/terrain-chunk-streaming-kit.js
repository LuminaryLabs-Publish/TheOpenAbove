import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { GLSL_NOISE } from "../shader-noise.js";

export const TERRAIN_CHUNK_STREAMING_KIT_ID = "open-above-terrain-chunk-streaming-kit";

function chunkKey(x, z) {
  return `${x}:${z}`;
}

function lodForDistance(distanceInChunks) {
  if (distanceInChunks <= 1.25) return 0;
  if (distanceInChunks <= 2.25) return 1;
  return 2;
}

export function createTerrainChunkStreamer({
  scene,
  terrainHeight,
  terrainColor,
  material,
  chunkSize = 520,
  chunkRadius = 3,
  lodSegments = [64, 32, 16]
}) {
  const group = new THREE.Group();
  group.name = "open-above-streamed-terrain-lod";
  scene.add(group);

  const chunks = new Map();
  let centerX = Number.NaN;
  let centerZ = Number.NaN;

  function buildGeometry(cx, cz, lod) {
    const segments = lodSegments[lod] ?? lodSegments[lodSegments.length - 1];
    const geometry = new THREE.PlaneGeometry(chunkSize, chunkSize, segments, segments);
    geometry.rotateX(-Math.PI / 2);
    const positions = geometry.attributes.position;
    const colors = new Float32Array(positions.count * 3);
    const worldCenterX = cx * chunkSize;
    const worldCenterZ = cz * chunkSize;
    const sampleStep = chunkSize / segments;

    for (let i = 0; i < positions.count; i += 1) {
      const localX = positions.getX(i);
      const localZ = positions.getZ(i);
      const worldX = worldCenterX + localX;
      const worldZ = worldCenterZ + localZ;
      const height = terrainHeight(worldX, worldZ);
      positions.setY(i, height);

      const dx = terrainHeight(worldX + sampleStep, worldZ) - terrainHeight(worldX - sampleStep, worldZ);
      const dz = terrainHeight(worldX, worldZ + sampleStep) - terrainHeight(worldX, worldZ - sampleStep);
      const slope = Math.hypot(dx, dz) / Math.max(sampleStep * 2, 1);
      const color = terrainColor(worldX, worldZ, height, slope);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.computeVertexNormals();
    geometry.computeBoundingSphere();
    return geometry;
  }

  function createChunk(cx, cz, lod) {
    const mesh = new THREE.Mesh(buildGeometry(cx, cz, lod), material);
    mesh.name = `terrain-chunk-${cx}-${cz}-lod-${lod}`;
    mesh.position.set(cx * chunkSize, 0, cz * chunkSize);
    mesh.receiveShadow = true;
    mesh.castShadow = false;
    mesh.userData.chunk = { x: cx, z: cz, lod };
    group.add(mesh);
    return mesh;
  }

  function rebuild(nextCenterX, nextCenterZ) {
    const required = new Map();
    for (let dz = -chunkRadius; dz <= chunkRadius; dz += 1) {
      for (let dx = -chunkRadius; dx <= chunkRadius; dx += 1) {
        const cx = nextCenterX + dx;
        const cz = nextCenterZ + dz;
        const distance = Math.hypot(dx, dz);
        if (distance > chunkRadius + 0.35) continue;
        const lod = lodForDistance(distance);
        required.set(chunkKey(cx, cz), { cx, cz, lod });
      }
    }

    for (const [key, mesh] of chunks) {
      const requirement = required.get(key);
      if (!requirement || mesh.userData.chunk.lod !== requirement.lod) {
        group.remove(mesh);
        mesh.geometry.dispose();
        chunks.delete(key);
      }
    }

    for (const [key, requirement] of required) {
      if (!chunks.has(key)) chunks.set(key, createChunk(requirement.cx, requirement.cz, requirement.lod));
    }
  }

  function update(camera) {
    const nextCenterX = Math.round(camera.position.x / chunkSize);
    const nextCenterZ = Math.round(camera.position.z / chunkSize);
    if (nextCenterX !== centerX || nextCenterZ !== centerZ) {
      centerX = nextCenterX;
      centerZ = nextCenterZ;
      rebuild(centerX, centerZ);
    }
  }

  function dispose() {
    for (const mesh of chunks.values()) mesh.geometry.dispose();
    chunks.clear();
    group.removeFromParent();
  }

  return {
    id: TERRAIN_CHUNK_STREAMING_KIT_ID,
    group,
    chunks,
    chunkSize,
    chunkRadius,
    lodSegments,
    update,
    dispose
  };
}

export function installSoftCloudShadow(material) {
  const state = {
    shader: null,
    weatherOffset: new THREE.Vector2(),
    coverage: 0.55,
    strength: 0.24
  };

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uCloudShadowOffset = { value: state.weatherOffset };
    shader.uniforms.uCloudShadowCoverage = { value: state.coverage };
    shader.uniforms.uCloudShadowStrength = { value: state.strength };
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", `#include <common>\nvarying vec3 vCloudShadowWorldPosition;`)
      .replace("#include <begin_vertex>", `#include <begin_vertex>\nvCloudShadowWorldPosition = (modelMatrix * vec4(transformed, 1.0)).xyz;`);
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", `#include <common>\nvarying vec3 vCloudShadowWorldPosition;\nuniform vec2 uCloudShadowOffset;\nuniform float uCloudShadowCoverage;\nuniform float uCloudShadowStrength;\n${GLSL_NOISE}`)
      .replace("#include <dithering_fragment>", `
        vec2 cloudUv = vCloudShadowWorldPosition.xz * 0.00038 + uCloudShadowOffset;
        float cloudField = fbm2(cloudUv * 1.15) * 0.72 + fbm2(cloudUv * 2.7 + 18.3) * 0.28;
        float cloudMask = smoothstep(1.02 - uCloudShadowCoverage, 0.72, cloudField);
        float cloudLight = mix(1.0, 0.74, cloudMask * uCloudShadowStrength);
        gl_FragColor.rgb *= cloudLight;
        #include <dithering_fragment>
      `);
    state.shader = shader;
  };
  material.customProgramCacheKey = () => "open-above-terrain-soft-cloud-shadow-v2";
  material.needsUpdate = true;

  return {
    state,
    update(weatherState) {
      if (weatherState?.offset) state.weatherOffset.set(...weatherState.offset);
      if (Number.isFinite(weatherState?.coverage)) state.coverage = weatherState.coverage;
      if (state.shader) {
        state.shader.uniforms.uCloudShadowOffset.value.copy(state.weatherOffset);
        state.shader.uniforms.uCloudShadowCoverage.value = state.coverage;
        state.shader.uniforms.uCloudShadowStrength.value = state.strength;
      }
    }
  };
}

window.OpenAboveTerrainChunkStreamingKit = {
  id: TERRAIN_CHUNK_STREAMING_KIT_ID,
  createTerrainChunkStreamer,
  installSoftCloudShadow
};
