import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import * as NexusEngine from "https://cdn.jsdelivr.net/gh/LuminaryLabs-Dev/NexusEngine@main/src/index.js";
import { CAMPAIGN, WORLD } from "./data/campaign.config.js";
import { loadHotAirBalloonModel, animateHotAirBalloon } from "./hot-air-balloon-object-kit.js";
import { createBalloonSimulation } from "./runtime/balloon-simulation-kit.js";
import { createBalloonTelemetryEngine } from "./runtime/balloon-telemetry-kit.js";
import { createAirstreamDomain } from "./runtime/airstream-domain/index.js";
import { createMailDeliveryDomain } from "./gameplay/mail-delivery-domain/index.js";
import { createVisualDomain } from "./visual/visual-domain.js";
import { createBalloonCameraRig } from "./visual/camera-presentation/balloon-camera-rig-kit.js";
import { createBalloonPresentationDomain } from "./visual/balloon-presentation/balloon-presentation-domain.js";

const canvas = document.querySelector("#game");
const hud = document.querySelector("#hud");
const errorPanel = document.querySelector("#error");

function showFatal(error) {
  errorPanel.hidden = false;
  errorPanel.textContent = String(error?.stack || error?.message || error);
  hud.innerHTML = "<strong>The Open Above</strong><br>Mail-flight runtime error. See panel.";
}

async function createGame() {
  hud.innerHTML = "<strong>The Open Above</strong><br>Loading balloon and world...";
  const visual = createVisualDomain({ canvas, worldConfig: WORLD });
  const balloon = await loadHotAirBalloonModel(undefined, { yieldToFrame: true });
  visual.scene.add(balloon);

  const airstream = createAirstreamDomain({
    scene: visual.scene,
    debug: false
  });
  const mail = createMailDeliveryDomain({
    scene: visual.scene,
    terrainHeight: visual.landscape.terrain.terrainHeight
  });

  const simulation = createBalloonSimulation({
    terrainHeight: visual.landscape.terrain.terrainHeight,
    sampleAirstream: airstream.sample,
    startPosition: [0, 105, 0]
  });
  simulation.applyToBalloon(balloon);

  const cameraRig = createBalloonCameraRig(visual.camera, balloon, { initialZoom: 48, maxZoom: 112 });
  const balloonPresentation = createBalloonPresentationDomain(balloon);
  let cameraContext = cameraRig.state;
  let visualState = visual.state;

  const getSnapshot = () => simulation.snapshot({
    region: CAMPAIGN.regions[0]?.id ?? "meadow-lift",
    cameraZoom: Number(cameraRig.state.zoom.toFixed(2)),
    firstPersonBlend: Number(cameraRig.state.firstPersonBlend.toFixed(3)),
    cameraMode: cameraRig.state.mode,
    airstream: airstream.snapshot(),
    mail: mail.snapshot(),
    terrain: {
      nearChunks: visual.landscape.terrain.streamer.chunks.size,
      horizonChunks: visual.landscape.terrain.horizon.chunks.size,
      horizonDistance: visual.landscape.terrain.horizon.maxDistance,
      worldSurface: visual.landscape.terrain.worldSurface.getDescriptor()
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
      triangles: visualState.triangles ?? 0
    }
  });

  const engine = createBalloonTelemetryEngine(NexusEngine, getSnapshot);

  function updateHud() {
    const state = simulation.state;
    const parcel = mail.parcel;
    const heat = state.burner > 0.45 ? "burner warm" : "coasting";
    const current = state.airstream.routeId
      ? state.airstream.routeId.replaceAll("-", " ")
      : "between currents";
    const capture = Math.round((state.airstream.influence ?? 0) * 100);
    const trim = Math.round(Math.abs(state.lateralTrim) / 3.6 * 100);
    const trimDirection = state.lateralTrim < -0.08 ? "left" : state.lateralTrim > 0.08 ? "right" : "centered";
    const delivery = parcel.delivered
      ? "Delivered to Brookhaven"
      : "Mail: Brookhaven · Find meadow current";
    hud.innerHTML = `<strong>The Open Above: Air Mail</strong><br>${parcel.message}<br><small>${delivery} · ${current} ${capture}% · ${heat} · trim ${trimDirection} ${trim}% · W/Space rise · S/Shift descend · A/D steer · ${cameraRig.state.mode} · Altitude ${Math.round(state.altitude)}m · Scroll zoom</small>`;
  }

  let last = performance.now();
  function frame(now) {
    const frameMs = Math.max(0, Math.min(80, now - last || 16.7));
    const dt = Math.max(0, Math.min(1 / 30, frameMs / 1000));
    last = now;

    const state = simulation.update(dt);
    const deliveryEvent = mail.update(state.position, state.airstream, state.elapsed);
    if (deliveryEvent) state.message = mail.parcel.message;
    airstream.update({
      position: state.position,
      elapsed: state.elapsed,
      sample: state.airstream
    });
    simulation.applyToBalloon(balloon);
    animateHotAirBalloon(balloon, now, state.burner, state);
    balloonPresentation.update(state);
    cameraContext = cameraRig.update(dt, state);
    visualState = visual.update({ dt, elapsed: state.elapsed, flightState: state, cameraContext });
    engine.tick(dt);
    visual.render(dt, frameMs);
    updateHud();
    requestAnimationFrame(frame);
  }

  window.GameHost = {
    engine,
    NexusEngine,
    THREE,
    scene: visual.scene,
    renderer: visual.renderer,
    camera: visual.camera,
    balloon,
    visual,
    simulation,
    airstream,
    mail,
    cameraRig,
    balloonPresentation,
    getState: () => ({
      nexusEngine: engine.openAbove?.getState?.(),
      local: getSnapshot()
    })
  };

  cameraRig.update(1 / 60, simulation.state);
  airstream.update({
    position: simulation.state.position,
    elapsed: 0,
    sample: airstream.sample(simulation.state.position, 0)
  });
  mail.update(simulation.state.position, simulation.state.airstream, 0);
  balloonPresentation.update(simulation.state);
  visual.update({ dt: 0, elapsed: 0, flightState: simulation.state, cameraContext });
  engine.tick(0);
  updateHud();
  requestAnimationFrame(frame);
}

async function boot() {
  try {
    await createGame();
  } catch (error) {
    showFatal(error);
  }
}

boot();
