import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import * as NexusEngine from "https://cdn.jsdelivr.net/gh/LuminaryLabs-Dev/NexusEngine@main/src/index.js";
import { CAMPAIGN, WORLD } from "./data/campaign.config.js";
import { loadHotAirBalloonModel, animateHotAirBalloon } from "./hot-air-balloon-object-kit.js";
import { createBalloonSimulation } from "./runtime/balloon-simulation-kit.js";
import { createBalloonTelemetryEngine } from "./runtime/balloon-telemetry-kit.js";
import { createAirstreamDomain } from "./runtime/airstream-domain/index.js";
import { createDefaultAirstreamRoutes } from "./runtime/airstream-domain/airstream-route-kit.js";
import { createMailDeliveryDomain } from "./gameplay/mail-delivery-domain/index.js";
import { createDefaultMailRoute } from "./gameplay/mail-delivery-domain/mail-route-kit.js";
import { createVisualDomain } from "./visual/visual-domain.js";
import { createBalloonCameraRig } from "./visual/camera-presentation/balloon-camera-rig-kit.js";
import { createBalloonPresentationDomain } from "./visual/balloon-presentation/balloon-presentation-domain.js";
import { createParchmentMapOverlay } from "./ui/parchment-map-overlay.js";

const canvas = document.querySelector("#game");
const mapRoot = document.querySelector("#mapOverlay");
const mapCanvas = document.querySelector("#mapCanvas");
const errorPanel = document.querySelector("#error");

function showFatal(error) {
  errorPanel.hidden = false;
  errorPanel.textContent = String(error?.stack || error?.message || error);
}

async function createGame() {
  canvas.setAttribute("aria-busy", "true");
  const routes = createDefaultAirstreamRoutes();
  const mailRoute = createDefaultMailRoute();
  const visual = createVisualDomain({ canvas, worldConfig: WORLD, worldAnchors: { routes, towns: mailRoute.towns } });
  const balloon = await loadHotAirBalloonModel(undefined, { yieldToFrame: true });
  visual.scene.add(balloon);
  const airstream = createAirstreamDomain({ scene: visual.scene, routes, debug: false });
  const mail = createMailDeliveryDomain({ scene: visual.scene, terrainHeight: visual.landscape.terrain.terrainHeight, route: mailRoute });
  const simulation = createBalloonSimulation({ terrainHeight: visual.landscape.terrain.terrainHeight, sampleAirstream: airstream.sample, startPosition: [0, 105, 0] });
  simulation.applyToBalloon(balloon);
  const mapOverlay = createParchmentMapOverlay({
    root: mapRoot, canvas: mapCanvas, worldSurface: WORLD.surface, world: visual.world,
    towns: mail.towns, routes: airstream.routes,
    getPlayerState: () => simulation.state, getParcel: () => mail.parcel
  });
  const cameraRig = createBalloonCameraRig(visual.camera, balloon, { initialZoom: 48, maxZoom: 112 });
  const balloonPresentation = createBalloonPresentationDomain(balloon);
  let cameraContext = cameraRig.state;
  let visualState = visual.state;

  const getSnapshot = () => simulation.snapshot({
    region: CAMPAIGN.regions[0]?.id ?? "meadow-lift",
    cameraZoom: Number(cameraRig.state.zoom.toFixed(2)),
    firstPersonBlend: Number(cameraRig.state.firstPersonBlend.toFixed(3)),
    cameraMode: cameraRig.state.mode,
    map: mapOverlay.snapshot(),
    airstream: airstream.snapshot(),
    mail: mail.snapshot(),
    terrain: {
      nearChunks: visual.landscape.terrain.streamer.chunks.size,
      horizonChunks: visual.landscape.terrain.horizon.chunks.size,
      horizonDistance: visual.landscape.terrain.horizon.maxDistance,
      worldSurface: visual.landscape.terrain.worldSurface.getDescriptor(),
      generation: visual.world.getDescriptor(),
      generationState: visual.world.getGenerationState()
    },
    model: {
      ready: balloon.userData.modelReady === true,
      loadedDuringLevelSetup: balloon.userData.loadedDuringLevelSetup === true,
      persistentGpuResources: balloon.userData.persistentGpuResources === true
    },
    visual: {
      quality: visualState.quality,
      exposure: Number((visualState.exposure ?? 1).toFixed(3)),
      averageLuminance: Number((visualState.averageLuminance ?? 0.18).toFixed(4)),
      sunFacing: Number((visualState.sunFacing ?? 0).toFixed(3)),
      sunOnScreen: Number((visualState.sunOnScreen ?? 0).toFixed(3)),
      renderScale: Number((visualState.renderScale ?? 1).toFixed(3)),
      drawCalls: visualState.drawCalls ?? 0,
      triangles: visualState.triangles ?? 0,
      grass: visualState.grass,
      flowers: visualState.flowers,
      worldGeneration: visualState.worldGeneration
    }
  });

  const engine = createBalloonTelemetryEngine(NexusEngine, getSnapshot);
  let last = performance.now();
  function frame(now) {
    const frameMs = Math.max(0, Math.min(80, now - last || 16.7));
    const dt = Math.max(0, Math.min(1 / 30, frameMs / 1000));
    last = now;
    if (!mapOverlay.isOpen()) {
      const state = simulation.update(dt);
      const deliveryEvent = mail.update(state.position, state.airstream, state.elapsed);
      if (deliveryEvent) state.message = mail.parcel.message;
      airstream.update({ position: state.position, elapsed: state.elapsed, sample: state.airstream });
      simulation.applyToBalloon(balloon);
      animateHotAirBalloon(balloon, now, state.burner, state);
      balloonPresentation.update(state);
      cameraContext = cameraRig.update(dt, state);
      visualState = visual.update({ dt, elapsed: state.elapsed, flightState: state, cameraContext });
      engine.tick(dt);
    }
    visual.render(mapOverlay.isOpen() ? 0 : dt, frameMs);
    requestAnimationFrame(frame);
  }

  window.GameHost = {
    engine, NexusEngine, THREE, scene: visual.scene, renderer: visual.renderer, camera: visual.camera,
    balloon, visual, simulation, airstream, mail, cameraRig, balloonPresentation,
    getState: () => ({ nexusEngine: engine.openAbove?.getState?.(), local: getSnapshot() })
  };

  cameraRig.update(1 / 60, simulation.state);
  airstream.update({ position: simulation.state.position, elapsed: 0, sample: airstream.sample(simulation.state.position, 0) });
  mail.update(simulation.state.position, simulation.state.airstream, 0);
  balloonPresentation.update(simulation.state);
  visual.update({ dt: 0, elapsed: 0, flightState: simulation.state, cameraContext });
  engine.tick(0);
  canvas.setAttribute("aria-busy", "false");
  requestAnimationFrame(frame);
}

async function boot() {
  try { await createGame(); } catch (error) { showFatal(error); }
}
boot();
