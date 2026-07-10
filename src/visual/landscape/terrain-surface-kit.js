import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

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
  const size = 128;
  const random = seeded(seed);
  const colorData = new Uint8Array(size * size * 4);
  const normalData = new Uint8Array(size * size * 4);
  const heights = new Float32Array(size * size);
  for (let i = 0; i < heights.length; i += 1) heights[i] = random() * 0.62 + random() * 0.38;
  const sample = (x, y) => heights[((y + size) % size) * size + ((x + size) % size)];
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const i = (y * size + x) * 4;
      const h = sample(x, y);
      const variation = Math.floor((h - 0.5) * 34);
      colorData[i] = 178 + variation;
      colorData[i + 1] = 187 + variation;
      colorData[i + 2] = 145 + Math.floor(variation * 0.45);
      colorData[i + 3] = 255;
      const dx = sample(x + 1, y) - sample(x - 1, y);
      const dy = sample(x, y + 1) - sample(x, y - 1);
      const n = new THREE.Vector3(-dx * 2.4, 1, -dy * 2.4).normalize();
      normalData[i] = Math.floor((n.x * 0.5 + 0.5) * 255);
      normalData[i + 1] = Math.floor((n.y * 0.5 + 0.5) * 255);
      normalData[i + 2] = Math.floor((n.z * 0.5 + 0.5) * 255);
      normalData[i + 3] = 255;
    }
  }
  const color = new THREE.DataTexture(colorData, size, size, THREE.RGBAFormat);
  color.colorSpace = THREE.SRGBColorSpace;
  color.wrapS = color.wrapT = THREE.RepeatWrapping;
  color.repeat.set(72, 72);
  color.needsUpdate = true;
  const normal = new THREE.DataTexture(normalData, size, size, THREE.RGBAFormat);
  normal.wrapS = normal.wrapT = THREE.RepeatWrapping;
  normal.repeat.set(92, 92);
  normal.needsUpdate = true;
  return { color, normal };
}

function terrainColor(x, z, h, slope) {
  const moisture = moistureAt(x, z);
  const grass = new THREE.Color(0x5f813e);
  const dry = new THREE.Color(0x9c8b4f);
  const rock = new THREE.Color(0x77756d);
  const wet = new THREE.Color(0x405f3e);
  const shore = new THREE.Color(0xaa9468);
  let color = grass.clone().lerp(dry, THREE.MathUtils.clamp((h - 22) / 115, 0, 0.68));
  color.lerp(wet, moisture * 0.55);
  color.lerp(shore, moisture * THREE.MathUtils.clamp((28 - h) / 42, 0, 1) * 0.65);
  color.lerp(rock, THREE.MathUtils.clamp(slope * 1.45 + (h - 92) / 95, 0, 0.82));
  const macro = Math.sin(x * 0.0041 + z * 0.0032) * 0.5 + 0.5;
  color.offsetHSL(0, 0, (macro - 0.5) * 0.08);
  return color;
}

export function createTerrainSurface(scene, worldConfig, quality) {
  const size = (worldConfig.terrainSize || 2600) * 1.55;
  const segments = Math.max(72, quality.terrainSegments);
  const geometry = new THREE.PlaneGeometry(size, size, segments, segments);
  geometry.rotateX(-Math.PI / 2);
  const position = geometry.attributes.position;
  const colors = new Float32Array(position.count * 3);
  const step = size / segments;
  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i);
    const z = position.getZ(i);
    const h = terrainHeight(x, z);
    position.setY(i, h);
    const dx = terrainHeight(x + step, z) - terrainHeight(x - step, z);
    const dz = terrainHeight(x, z + step) - terrainHeight(x, z - step);
    const slope = Math.hypot(dx, dz) / Math.max(step * 2, 1);
    const color = terrainColor(x, z, h, slope);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.computeVertexNormals();
  const detail = makeDetailTextures(worldConfig.seed || 1);
  const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    map: detail.color,
    normalMap: detail.normal,
    normalScale: new THREE.Vector2(0.34, 0.34),
    roughness: 0.91,
    metalness: 0.01
  });
  material.name = "OpenAboveTerrainSurfaceMaterial";
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = "open-above-terrain-surface";
  mesh.receiveShadow = true;
  mesh.castShadow = false;
  scene.add(mesh);
  return { id: TERRAIN_SURFACE_KIT_ID, mesh, geometry, material, terrainHeight, moistureAt, size };
}

window.OpenAboveTerrainSurfaceKit = { id: TERRAIN_SURFACE_KIT_ID, createTerrainSurface, terrainHeight, moistureAt };
