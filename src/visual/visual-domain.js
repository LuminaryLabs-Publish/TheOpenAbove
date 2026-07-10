import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { detectQualityTier, createDynamicResolutionController } from "./quality-tier-kit.js";
import { createPhysicalSky } from "./illumination/physical-sky-kit.js";
import { createSunLight } from "./illumination/sun-light-kit.js";
import { createAerialPerspective } from "./illumination/aerial-perspective-kit.js";
import { createCloudShadowOverlay } from "./illumination/cloud-shadow-kit.js";
import { createCloudWeatherMap } from "./atmosphere/cloud-weather-map-kit.js";
import { createVolumetricClouds } from "./atmosphere/volumetric-cloud-kit.js";
import { createTerrainSurface } from "./landscape/terrain-surface-kit.js";
import { createVegetationClusters } from "./landscape/vegetation-cluster-kit.js";
import { createGrassDetail } from "./landscape/grass-detail-kit.js";
import { createWaterSurfaces } from "./landscape/water-surface-kit.js";
import { createDistantLandmarks } from "./landscape/distant-landmark-kit.js";
import { createHdrComposer } from "./post-process/hdr-composer-kit.js";
import { createLensResponse } from "./camera-presentation/lens-response-kit.js";

export const VISUAL_DOMAIN_ID = "open-above-visual-domain";

export function createVisualDomain({ canvas, worldConfig }) {
  const quality = detectQualityTier();
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x05070d);
  const camera = new THREE.PerspectiveCamera(56, 1, 0.08, 6200);
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: quality.id !== "low",
    powerPreference: "high-performance",
    alpha: false
  });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.physicallyCorrectLights = true;

  const terrain = createTerrainSurface(scene, worldConfig, quality);
  const vegetation = createVegetationClusters(scene, worldConfig, quality);
  const grass = createGrassDetail(scene, worldConfig, quality);
  const landmarks = createDistantLandmarks(scene);
  const weather = createCloudWeatherMap(worldConfig.seed || 1);
  const sun = createSunLight(scene, quality);
  const sky = createPhysicalSky(scene);
  const clouds = createVolumetricClouds(scene, quality, weather);
  const aerial = createAerialPerspective(scene);
  const cloudShadows = createCloudShadowOverlay(scene, terrain.mesh, weather);
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
    triangles: 0
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
    cloudShadows.update();
    grass.update(elapsed);
    water.update(elapsed, sun.direction);
    lens.update(camera, sun.sunWorldPosition, cameraContext.firstPersonBlend);
    const post = composer.update({
      elapsed,
      deltaTime: dt,
      sunWorldPosition: sun.sunWorldPosition,
      atmosphereDensity: aerial.fog.density / 0.00038,
      cameraContext,
      burner: flightState.burner
    });
    Object.assign(state, post);
    state.renderScale = resolution.state.scale;
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
    composer.dispose();
  }

  return {
    id: VISUAL_DOMAIN_ID,
    quality,
    scene,
    camera,
    renderer,
    composer,
    resolution,
    landscape: { terrain, vegetation, grass, water, landmarks },
    illumination: { sun, sky, aerial, cloudShadows },
    atmosphere: { weather, clouds },
    lens,
    state,
    update,
    render,
    resize,
    dispose
  };
}

window.OpenAboveVisualDomain = { id: VISUAL_DOMAIN_ID, createVisualDomain };
