import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { detectQualityTier, createDynamicResolutionController } from "./quality-tier-kit.js";
import { createPhysicalSky } from "./illumination/physical-sky-kit.js";
import { createSunLight } from "./illumination/sun-light-kit.js";
import { createAerialPerspective } from "./illumination/aerial-perspective-kit.js";
import { createCloudWeatherMap } from "./atmosphere/cloud-weather-map-kit.js";
import { createVolumetricClouds } from "./atmosphere/volumetric-cloud-kit.js";
import { createTerrainSurface, terrainHeight as legacyTerrainHeight } from "./landscape/terrain-surface-kit.js";
import { createVegetationClusters } from "./landscape/vegetation-cluster-kit.js";
import { createGrassFieldDomain } from "./grass-field/grass-field-domain.js";
import { createFlowerFieldDomain } from "./flower-field/flower-field-domain.js";
import { createWaterSurfaces } from "./landscape/water-surface-kit.js";
import { createDistantLandmarks } from "./landscape/distant-landmark-kit.js";
import { createHdrComposer } from "./post-process/hdr-composer-kit.js";
import { createLensResponse } from "./camera-presentation/lens-response-kit.js";
import { createWorldGenerationKit } from "../world/world-generation-kit.js";

export const VISUAL_DOMAIN_ID = "open-above-visual-domain";

export function createVisualDomain({ canvas, worldConfig, worldAnchors = {} }) {
  const quality = detectQualityTier();
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x9fc8df);
  const camera = new THREE.PerspectiveCamera(56, 1, 0.08, 6200);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: quality.id !== "low", powerPreference: "high-performance", alpha: false });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.physicallyCorrectLights = true;

  const world = createWorldGenerationKit({ worldConfig, legacyTerrainHeight, anchors: worldAnchors });
  const terrain = createTerrainSurface(scene, worldConfig, quality, world);
  const vegetation = createVegetationClusters(scene, worldConfig, quality, terrain.terrainHeight, world);
  const grass = createGrassFieldDomain(scene, worldConfig, quality, terrain, vegetation, world);
  const flowers = createFlowerFieldDomain(scene, worldConfig, quality, terrain, vegetation, world);
  const landmarks = createDistantLandmarks(scene, terrain.terrainHeight);
  const weather = createCloudWeatherMap(worldConfig.seed || 1);
  const sun = createSunLight(scene, quality);
  const sky = createPhysicalSky(scene, { zenithColor: 0x75abd0, horizonColor: 0xf0c9a1, groundHazeColor: 0xd7c2ad, turbidity: 4.2, rayleigh: 1.0, mie: 0.55, sunIntensity: 0.9 });
  const clouds = createVolumetricClouds(scene, quality, weather);
  const aerial = createAerialPerspective(scene, { color: 0xd8c6ae, density: 0.00022 });
  const water = createWaterSurfaces(scene, sun.direction);
  const lens = createLensResponse(scene);
  const composer = createHdrComposer(renderer, scene, camera, quality);
  const resolution = createDynamicResolutionController(renderer, composer.composer, quality);

  const state = {
    exposure: 1,
    averageLuminance: 0.18,
    sunFacing: 0,
    sunOnScreen: 0,
    quality: quality.id,
    renderScale: resolution.state.scale,
    drawCalls: 0,
    triangles: 0,
    grass: grass.getState(),
    flowers: flowers.getState()
  };

  function resize() {
    const width = Math.max(1, innerWidth || 1);
    const height = Math.max(1, innerHeight || 1);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    resolution.resize(width, height);
    composer.resize(width, height);
  }
  addEventListener("resize", resize);
  resize();

  function update({ dt, elapsed, flightState, cameraContext }) {
    weather.update(dt, elapsed);
    sun.update(flightState.position, elapsed);
    sky.update(camera, sun.direction);
    clouds.update(camera, sun.direction, elapsed);
    aerial.update(camera, sun.direction, weather.state);
    terrain.update(camera, weather.state);
    grass.update(elapsed, camera);
    flowers.update(elapsed, camera);
    water.update(elapsed, sun.direction);
    lens.update(camera, sun.sunWorldPosition, cameraContext.firstPersonBlend);
    Object.assign(state, composer.update({ elapsed, deltaTime: dt, sunWorldPosition: sun.sunWorldPosition, atmosphereDensity: aerial.fog.density / 0.00022, cameraContext, burner: flightState.burner }));
    state.renderScale = resolution.state.scale;
    state.grass = grass.getState();
    state.flowers = flowers.getState();
    return state;
  }

  function render(dt, frameMs) {
    composer.render(dt);
    resolution.sample(frameMs, innerWidth || 1, innerHeight || 1);
    state.drawCalls = renderer.info.render.calls;
    state.triangles = renderer.info.render.triangles;
  }

  function dispose() {
    removeEventListener("resize", resize);
    landmarks.dispose?.();
    water.dispose?.();
    flowers.dispose();
    grass.dispose();
    terrain.dispose?.();
    composer.dispose();
  }

  return {
    id: VISUAL_DOMAIN_ID,
    quality,
    world,
    scene,
    camera,
    renderer,
    composer,
    resolution,
    landscape: { terrain, vegetation, grass, flowers, water, landmarks },
    illumination: { sun, sky, aerial },
    atmosphere: { weather, clouds },
    lens,
    state,
    update,
    render,
    resize,
    dispose
  };
}

if (typeof window !== "undefined") {
  window.OpenAboveVisualDomain = { id: VISUAL_DOMAIN_ID, createVisualDomain };
}
