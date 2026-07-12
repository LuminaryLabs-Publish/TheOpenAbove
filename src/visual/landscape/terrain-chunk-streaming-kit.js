import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { GLSL_NOISE } from "../shader-noise.js";
import {
  createTerrainStreamingFrame,
  terrainChunkBounds
} from "./terrain-streaming-contract-kit.js";

export const TERRAIN_CHUNK_STREAMING_KIT_ID = "open-above-terrain-chunk-streaming-kit";

function lodForDistance(distanceInChunks) {
  if (distanceInChunks <= 1.25) return 0;
  if (distanceInChunks <= 2.25) return 1;
  return 2;
}

function pushDoubleSidedQuad(indices, a, b, c, d) {
  indices.push(a, b, c, a, c, d, c, b, a, d, c, a);
}

export function createTerrainChunkStreamer({
  scene,
  terrainHeight,
  terrainColor,
  material,
  worldSurface = null,
  chunkSize = 520,
  chunkRadius = 3,
  lodSegments = [64, 32, 16],
  slopeSampleStep = 24,
  skirtDepth = 3.5
}) {
  const group = new THREE.Group();
  group.name = "open-above-streamed-terrain-lod";
  scene.add(group);

  const chunks = new Map();
  let frameRevision = null;

  function buildGeometry(cx, cz, lod) {
    const segments = lodSegments[lod] ?? lodSegments[lodSegments.length - 1];
    const rowSize = segments + 1;
    const half = chunkSize * 0.5;
    const positions = [];
    const colors = [];
    const indices = [];
    const worldCenterX = cx * chunkSize;
    const worldCenterZ = cz * chunkSize;

    function sampleVertex(localX, localZ, yOffset = 0, darken = 1) {
      const worldX = worldCenterX + localX;
      const worldZ = worldCenterZ + localZ;
      const height = terrainHeight(worldX, worldZ) + yOffset;
      const dx = terrainHeight(worldX + slopeSampleStep, worldZ) - terrainHeight(worldX - slopeSampleStep, worldZ);
      const dz = terrainHeight(worldX, worldZ + slopeSampleStep) - terrainHeight(worldX, worldZ - slopeSampleStep);
      const slope = Math.hypot(dx, dz) / Math.max(slopeSampleStep * 2, 1);
      const color = terrainColor(worldX, worldZ, height - yOffset, slope);
      const index = positions.length / 3;
      positions.push(localX, height, localZ);
      colors.push(color.r * darken, color.g * darken, color.b * darken);
      return index;
    }

    for (let z = 0; z <= segments; z += 1) {
      const localZ = -half + chunkSize * (z / segments);
      for (let x = 0; x <= segments; x += 1) {
        const localX = -half + chunkSize * (x / segments);
        sampleVertex(localX, localZ);
      }
    }

    for (let z = 0; z < segments; z += 1) {
      for (let x = 0; x < segments; x += 1) {
        const a = z * rowSize + x;
        const b = a + 1;
        const d = (z + 1) * rowSize + x;
        const c = d + 1;
        indices.push(a, d, b, b, d, c);
      }
    }

    function addSkirt(edge) {
      for (let step = 0; step < segments; step += 1) {
        const first = edge(step);
        const second = edge(step + 1);
        const firstTop = sampleVertex(first.x, first.z, 0, 0.94);
        const secondTop = sampleVertex(second.x, second.z, 0, 0.94);
        const firstBottom = sampleVertex(first.x, first.z, -skirtDepth, 0.72);
        const secondBottom = sampleVertex(second.x, second.z, -skirtDepth, 0.72);
        pushDoubleSidedQuad(indices, firstTop, secondTop, secondBottom, firstBottom);
      }
    }

    addSkirt((step) => ({ x: -half + chunkSize * (step / segments), z: -half }));
    addSkirt((step) => ({ x: half, z: -half + chunkSize * (step / segments) }));
    addSkirt((step) => ({ x: half - chunkSize * (step / segments), z: half }));
    addSkirt((step) => ({ x: -half, z: half - chunkSize * (step / segments) }));

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geometry.setIndex(indices);
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
    mesh.userData.chunk = { x: cx, z: cz, lod, bounds: terrainChunkBounds(cx, cz, chunkSize) };
    group.add(mesh);
    return mesh;
  }

  function rebuild(frame) {
    const required = new Map();
    for (const chunk of frame.nearChunks) {
      const lod = lodForDistance(chunk.distance);
      required.set(chunk.key, { cx: chunk.cx, cz: chunk.cz, lod, bounds: chunk.bounds });
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
    frameRevision = frame.revision;
  }

  function updateFromFrame(frame) {
    if (frame.revision !== frameRevision) rebuild(frame);
  }

  function update(camera) {
    updateFromFrame(createTerrainStreamingFrame(camera.position, {
      nearChunkSize: chunkSize,
      nearChunkRadius: chunkRadius,
      worldSurface
    }));
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
    worldSurface,
    update,
    updateFromFrame,
    dispose,
    getFrameRevision: () => frameRevision,
    getChunkBounds: () => [...chunks.values()].map((mesh) => mesh.userData.chunk.bounds)
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

if (typeof window !== "undefined") {
  window.OpenAboveTerrainChunkStreamingKit = {
    id: TERRAIN_CHUNK_STREAMING_KIT_ID,
    createTerrainChunkStreamer,
    installSoftCloudShadow
  };
}
