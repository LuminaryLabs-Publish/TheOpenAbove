import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { createDiskWorldSurface } from "https://cdn.jsdelivr.net/gh/LuminaryLabs-Agents/NexusEngine-ProtoKits@dd8d68f5635a64f34043edd3ac757067a02eb43c/protokits/disk-world-surface-kit/surface.js";
import { createTerrainChunkStreamer, installSoftCloudShadow } from "./terrain-chunk-streaming-kit.js";
import { createTerrainHorizonStreamer } from "./terrain-horizon-streaming-kit.js";
import { createTerrainStreamingFrame } from "./terrain-streaming-contract-kit.js";

export const TERRAIN_SURFACE_KIT_ID = "open-above-terrain-surface-kit";

const FRUTIGER_TERRAIN_PALETTE = Object.freeze({
  valleyGreen: new THREE.Color(0x3f7850),
  meadowGreen: new THREE.Color(0x67a653),
  sunlitGreen: new THREE.Color(0x9bc65b),
  dryGreen: new THREE.Color(0xb5bd68),
  wetGreen: new THREE.Color(0x376d58),
  softRock: new THREE.Color(0x8d927d)
});

const GRASS_GROUND_COLORS = Object.freeze([
  new THREE.Color(0x3a8250),
  new THREE.Color(0x62a44c),
  new THREE.Color(0x91c653),
  new THREE.Color(0x9c9851),
  new THREE.Color(0xc9a44a)
]);

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

function normalizedWave(first, second) {
  return THREE.MathUtils.clamp((Math.sin(first) + Math.cos(second)) * 0.25 + 0.5, 0, 1);
}

function smoothWorldField(value, low = 0.18, high = 0.82) {
  return THREE.MathUtils.smoothstep(THREE.MathUtils.clamp(value, 0, 1), low, high);
}

function blendAroundMidpoint(color, field, darker, lighter, strength) {
  const offset = field - 0.5;
  if (offset < 0) color.lerp(darker, -offset * strength * 2);
  else color.lerp(lighter, offset * strength * 2);
}

export function terrainColor(x, z, h, slope, world = null) {
  const {
    valleyGreen,
    meadowGreen,
    sunlitGreen,
    dryGreen,
    wetGreen,
    softRock
  } = FRUTIGER_TERRAIN_PALETTE;

  const rawMoisture = world?.sampleMoisture?.(x, z) ?? moistureAt(x, z);
  const moisture = THREE.MathUtils.smoothstep(rawMoisture, 0.08, 0.82);
  const lowland = 1 - THREE.MathUtils.smoothstep(h, -36, 24);
  const highland = THREE.MathUtils.smoothstep(h, 12, 82);
  const dryHighland = THREE.MathUtils.smoothstep(h, 42, 116) * (1 - moisture);
  const steepness = THREE.MathUtils.smoothstep(slope, 0.2, 0.5);

  const largeField = smoothWorldField(normalizedWave(
    x * 0.00108 + z * 0.00072,
    z * 0.00102 - x * 0.00043
  ), 0.16, 0.84);
  const mediumField = smoothWorldField(normalizedWave(
    x * 0.00285 - z * 0.0017,
    z * 0.0031 + x * 0.00135
  ), 0.18, 0.82);
  const localField = smoothWorldField(normalizedWave(
    x * 0.0061 + z * 0.00415,
    z * 0.00545 - x * 0.00375
  ), 0.22, 0.78);

  const color = meadowGreen.clone();
  color.lerp(valleyGreen, lowland * 0.56);
  color.lerp(sunlitGreen, highland * 0.24);
  color.lerp(wetGreen, moisture * 0.48);
  color.lerp(dryGreen, dryHighland * 0.2);

  blendAroundMidpoint(color, largeField, valleyGreen, sunlitGreen, 0.14);
  blendAroundMidpoint(color, mediumField, meadowGreen, dryGreen, 0.07);
  blendAroundMidpoint(color, localField, wetGreen, meadowGreen, 0.02);

  const flora = world?.sampleFlora?.(x, z, { height: h, moisture: rawMoisture, slope });
  if (flora) {
    if (flora.bare) color.lerp(dryGreen, 0.34);
    else {
      const primary = GRASS_GROUND_COLORS[flora.primaryGrassType] ?? meadowGreen;
      const secondary = GRASS_GROUND_COLORS[flora.secondaryGrassType] ?? primary;
      const groundColor = primary.clone().lerp(secondary, flora.secondaryMix * 0.55);
      color.lerp(groundColor, 0.12 + flora.grassDensity * 0.28);
    }
  }

  color.lerp(softRock, steepness * 0.62);
  return color;
}

export function createTerrainSurface(scene, worldConfig, quality, world = null) {
  const surfaceConfig = worldConfig.surface ?? {};
  const worldSurface = createDiskWorldSurface(surfaceConfig);
  const edgeFloor = Number.isFinite(surfaceConfig.edgeFloor) ? surfaceConfig.edgeFloor : -120;
  const activeTerrainHeight = world?.sampleHeight ?? terrainHeight;
  const activeMoistureAt = world?.sampleMoisture ?? moistureAt;
  const activeTerrainColor = (x, z, h, slope) => terrainColor(x, z, h, slope, world);
  const boundedTerrainHeight = (x, z) => THREE.MathUtils.lerp(
    edgeFloor,
    activeTerrainHeight(x, z),
    worldSurface.edgeMask({ x, z })
  );

  const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.88,
    metalness: 0,
    envMapIntensity: 0.3
  });
  material.name = "OpenAboveTerrainSurfaceMaterial";
  const cloudShadow = installSoftCloudShadow(material);
  const nearRadius = quality.id === "low" ? 2 : 3;
  const chunkSize = 520;
  const streamer = createTerrainChunkStreamer({
    scene,
    terrainHeight: boundedTerrainHeight,
    terrainColor: activeTerrainColor,
    material,
    worldSurface,
    chunkSize,
    chunkRadius: nearRadius,
    lodSegments: quality.id === "high" ? [72, 40, 20] : quality.id === "medium" ? [56, 32, 16] : [40, 24, 12],
    slopeSampleStep: 24
  });
  const horizon = createTerrainHorizonStreamer({
    scene,
    terrainHeight: boundedTerrainHeight,
    terrainColor: activeTerrainColor,
    material,
    worldSurface,
    nearChunkSize: chunkSize,
    nearChunkRadius: nearRadius,
    radiusInNearChunks: quality.id === "low" ? 9 : 12,
    slopeSampleStep: 24
  });
  let activeFrame = null;
  let generationRevision = Number(world?.getGenerationState?.().revision ?? 0);

  function refresh() {
    streamer.refresh();
    horizon.refresh();
    activeFrame = null;
  }

  function update(camera, weatherState) {
    const nextGenerationRevision = Number(world?.getGenerationState?.().revision ?? generationRevision);
    if (nextGenerationRevision !== generationRevision) {
      generationRevision = nextGenerationRevision;
      refresh();
    }
    const frame = createTerrainStreamingFrame(camera.position, {
      nearChunkSize: chunkSize,
      nearChunkRadius: nearRadius,
      worldSurface
    });
    streamer.updateFromFrame(frame);
    horizon.updateFromFrame(frame);
    activeFrame = frame;
    cloudShadow.update(weatherState);
  }

  function dispose() {
    horizon.dispose();
    streamer.dispose();
    material.dispose();
  }

  return {
    id: TERRAIN_SURFACE_KIT_ID,
    mesh: streamer.group,
    group: streamer.group,
    material,
    terrainHeight: boundedTerrainHeight,
    baseTerrainHeight: activeTerrainHeight,
    legacyTerrainHeight: terrainHeight,
    moistureAt: activeMoistureAt,
    terrainColor: activeTerrainColor,
    world,
    worldSurface,
    streamer,
    horizon,
    cloudShadow,
    update,
    refresh,
    dispose,
    getStreamingFrame: () => activeFrame,
    getGenerationRevision: () => generationRevision
  };
}

if (typeof window !== "undefined") {
  window.OpenAboveTerrainSurfaceKit = { id: TERRAIN_SURFACE_KIT_ID, createTerrainSurface, terrainHeight, moistureAt, terrainColor };
}
