import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import * as NexusEngine from "@nexus-engine";
import { CAMPAIGN, WORLD } from "../data/campaign.config.js";
import { createBalloonTelemetryEngine } from "../runtime/balloon-telemetry-kit.js";
import {
  createJourneyDomain,
  createBallooningDomain,
  createSkyDomain,
  createLandDomain,
  createNavigationDomain,
  createImageCaptureDomain,
  createExperienceDomain
} from "../domains/index.js";

export const MEADOW_LIFT_SCENE_ID = "open-above-meadow-lift-scene";

export async function createMeadowLiftScene({
  canvas,
  mapRoot,
  mapCanvas,
  nexusEngineSha,
  onFatal
} = {}) {
  const sky = createSkyDomain();
  const worldFeatures = [
    ...(WORLD.features?.landforms ?? []),
    ...(WORLD.features?.atmosphere ?? [])
  ];
  let snapshotReader = () => ({ status: "booting" });
  const engine = createBalloonTelemetryEngine(NexusEngine, () => snapshotReader(), {
    worldFeatures,
    weather: WORLD.weather
  });

  const land = createLandDomain({
    worldConfig: WORLD,
    worldFeatures: engine.n.worldFeatures,
    worldFoundation: engine.n.worldFoundation,
    routes: sky.routes,
    towns: []
  });
  sky.bindRuntimeEngine(engine);
  const experience = createExperienceDomain({ canvas, land, sky });
  land.bindVisual(experience.visual);
  sky.mount({ scene: experience.scene });

  const ballooning = createBallooningDomain();
  await ballooning.mount({
    targetScene: experience.scene,
    terrainHeight: experience.visual.landscape.terrain.terrainHeight,
    sampleAirstream: sky.sample
  });
  experience.bindBalloon(ballooning.balloon);

  const imageCapture = createImageCaptureDomain({
    camera: experience.camera,
    renderer: experience.renderer,
    landforms: WORLD.features?.landforms ?? []
  });

  const navigation = createNavigationDomain({
    root: mapRoot,
    canvas: mapCanvas,
    worldSurface: WORLD.surface,
    routes: sky.routes
  });
  navigation.mount({
    world: land.world,
    getPlayerState: () => ballooning.state,
    getSnapPoints: () => imageCapture.snapPoints,
    getCaptureState: () => imageCapture.snapshot()
  });

  const journey = createJourneyDomain({ campaign: CAMPAIGN, onFatal });
  const domains = Object.freeze({ journey, ballooning, sky, land, navigation, imageCapture, experience });
  const getSnapshot = () => journey.snapshot(domains);
  snapshotReader = getSnapshot;

  function update({ now, dt }) {
    const state = ballooning.update({ dt, now });
    sky.update({ position: state.position, elapsed: state.elapsed, sample: state.airstream });
    experience.update({ dt, flightState: state });
    const captureEvent = imageCapture.update(state);
    if (captureEvent) state.message = `${captureEvent.name}: ${captureEvent.rating} (${captureEvent.score})`;
    engine.tick(dt);
  }

  function render({ dt, frameMs }) {
    experience.render(dt, frameMs);
  }

  function start() {
    return journey.start({
      isMapOpen: navigation.isMapOpen,
      update,
      render
    });
  }

  function dispose() {
    journey.dispose();
    navigation.dispose();
    imageCapture.dispose();
    ballooning.dispose();
    sky.dispose();
    experience.dispose();
  }

  sky.update({
    position: ballooning.state.position,
    elapsed: 0,
    sample: sky.sample(ballooning.state.position, 0)
  });
  experience.update({ dt: 0, flightState: ballooning.state });
  engine.tick(0);

  const gameHost = Object.freeze({
    engine,
    NexusEngine,
    nexusEngineSha,
    THREE,
    scene: experience.scene,
    renderer: experience.renderer,
    camera: experience.camera,
    domains,
    balloon: ballooning.balloon,
    visual: experience.visual,
    simulation: ballooning.simulation,
    airstream: sky.airstream,
    imageCapture,
    cameraRig: experience.cameraRig,
    balloonPresentation: experience.balloonPresentation,
    getState: () => ({ nexusEngine: engine.openAbove?.getState?.(), local: getSnapshot() })
  });

  return Object.freeze({
    id: MEADOW_LIFT_SCENE_ID,
    domains,
    engine,
    gameHost,
    getSnapshot,
    start,
    dispose
  });
}
