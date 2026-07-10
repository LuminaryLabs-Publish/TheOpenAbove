import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { createTerrainChunkStreamer, installSoftCloudShadow } from "./terrain-chunk-streaming-kit.js";

export const TERRAIN_SURFACE_KIT_ID = "open-above-terrain-surface-kit";

export function terrainHeight(x, z) {
  const radius = Math.hypot(x, z);
  const broad = Math.sin(x * 0.0032) * 34 + Math.cos(z * 0.0038) * 29;
  const ridge = Math.sin((x + z) * 0.0064) * 9 + Math.cos((x - z) * 0.0048) * 7;
  const basin = -Math.exp(-(radius * radius) / 620000) * 48;
  const detail = Math.sin(x * 0.017) * Math.cos(z * 0.013) * 3.8;
  return broad + ridge + basin + detail;
}

export function moistureAt(x, z) {
  const lake = Math.exp(-((x + 260) ** 2 + (z - 180) ** 2) / 90000);
  const secondLake = Math.exp(-((x - 420) ** 2 + (z + 340) ** 2) / 130000);
  const riverLine = Math.sin(x * 0.0037) * 175 + z * 0.115;
  const river = Math.exp(-(riverLine * riverLine) / 26000);
  return THREE.MathUtils.clamp(lake + secondLake * 0.72 + river * 0.5, 0, 1);
}

function seeded(seed) {
  let s = (Number(seed) || 1) >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function makeDetailTextures(seed) {
  const size = 64;
  const random = seeded(seed);
  const colorData = new Uint8Array(size * size * 4);
  const normalData = new Uint8Array(size * size * 4);
  const heights = new Float32Array(size * size);
  for (let i = 0; i < heights.length; i += 1) heights[i] = random() * 0.4 + random() * 0.6;
  const sample = (x, y) => heights[((y + size) % size) * size + ((x + size) % size)];
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const i = (y * size + x) * 4;
      const h = sample(x, y);
      const variation = Math.floor((h - 0.5) * 8);
      colorData[i] = 196 + variation;
      colorData[i + 1] = 205 + variation;
      colorData[i + 2] = 166 + Math.floor(variation * 0.4);
      colorData[i + 3] = 255;
      const dx = sample(x + 1, y) - sample(x - 1, y);
      const dy = sample(x, y + 1) - sample(x, y - 1);
      const n = new THREE.Vector3(-dx * 0.55, 1, -dy * 0.55).normalize();
      normalData[i] = Math.floor((n.x * 0.5 + 0.5) * 255);
      normalData[i + 1] = Math.floor((n.y * 0.5 + 0.5) * 255);
      normalData[i + 2] = Math.floor((n.z * 0.5 + 0.5) * 255);
      normalData[i + 3] = 255;
    }
  }
  const color = new THREE.DataTexture(colorData, size, size, THREE.RGBAFormat);
  color.colorSpace = THREE.SRGBColorSpace;
  color.wrapS = color.wrapT = THREE.RepeatWrapping;
  color.repeat.set(4, 4);
  color.needsUpdate = true;
  const normal = new THREE.DataTexture(normalData, size, size, THREE.RGBAFormat);
  normal.wrapS = normal.wrapT = THREE.RepeatWrapping;
  normal.repeat.set(6, 6);
  normal.needsUpdate = true;
  return { color, normal };
}

export function terrainColor(x, z, h, slope) {
  const moisture = moistureAt(x, z);
  const grass = new THREE.Color(0x779858);
  const dry = new THREE.Color(0xb0a169);
  const rock = new THREE.Color(0x918f84);
  const wet = new THREE.Color(0x55755a);
  const shore = new THREE.Color(0xc0aa7d);
  let color = grass.clone().lerp(dry, THREE.MathUtils.clamp((h - 22) / 115, 0, 0.62));
  color.lerp(wet, moisture * 0.38);
  color.lerp(shore, moisture * THREE.MathUtils.clamp((28 - h) / 42, 0, 1) * 0.48);
  color.lerp(rock, THREE.MathUtils.clamp(slope * 1.25 + (h - 104) / 110, 0, 0.68));
  const macro = Math.sin(x * 0.0018 + z * 0.0013) * 0.5 + 0.5;
  color.offsetHSL(0, -0.02, 0.025 + (macro - 0.5) * 0.035);
  return color;
}

export function createTerrainSurface(scene, worldConfig, quality) {
  const detail = makeDetailTextures(worldConfig.seed || 1);
  const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    map: detail.color,
    normalMap: detail.normal,
    normalScale: new THREE.Vector2(0.08, 0.08),
    roughness: 0.9,
    metalness: 0,
    envMapIntensity: 0.3
  });
  material.name = "OpenAboveTerrainSurfaceMaterial";
  const cloudShadow = installSoftCloudShadow(material);
  const streamer = createTerrainChunkStreamer({
    scene,
    terrainHeight,
    terrainColor,
    material,
    chunkSize: 520,
    chunkRadius: quality.id === "low" ? 2 : 3,
    lodSegments: quality.id === "high" ? [72, 40, 20] : quality.id === "medium" ? [56, 32, 16] : [40, 24, 12]
  });

  function update(camera, weatherState) {
    streamer.update(camera);
    cloudShadow.update(weatherState);
  }

  return { id: TERRAIN_SURFACE_KIT_ID, mesh: streamer.group, group: streamer.group, material, terrainHeight, moistureAt, terrainColor, streamer, cloudShadow, update, dispose: streamer.dispose };
}

window.OpenAboveTerrainSurfaceKit = { id: TERRAIN_SURFACE_KIT_ID, createTerrainSurface, terrainHeight, moistureAt, terrainColor };
