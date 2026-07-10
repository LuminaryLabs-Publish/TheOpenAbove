import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import * as NexusEngine from "https://cdn.jsdelivr.net/gh/LuminaryLabs-Dev/NexusEngine@main/src/index.js";
import { CAMPAIGN, WORLD } from "./data/campaign.config.js";
import { buildHotAirBalloon, animateHotAirBalloon } from "./hot-air-balloon-object-kit.js";
import { createBalloonSimulation } from "./runtime/balloon-simulation-kit.js";
import { createBalloonTelemetryEngine } from "./runtime/balloon-telemetry-kit.js";
import { createVisualDomain } from "./visual/visual-domain.js";
import { createBalloonCameraRig } from "./visual/camera-presentation/balloon-camera-rig-kit.js";
import { createBalloonPresentationDomain } from "./visual/balloon-presentation/balloon-presentation-domain.js";

const canvas = document.querySelector("#game");
const hud = document.querySelector("#hud");
const errorPanel = document.querySelector("#error");

function showFatal(error) {
  errorPanel.hidden = false;
  errorPanel.textContent = String(error?.stack || error?.message || error);
  hud.innerHTML = "<strong>The Open Above</strong><br>Cinematic runtime error. See panel.";
}

function createGame() {
  const visual = createVisualDomain({ canvas, worldConfig: WORLD });
  const balloon = buildHotAirBalloon();
  visual.scene.add(balloon);

  const simulation = createBalloonSimulation({
    terrainHeight: visual.landscape.terrain.terrainHeight,
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
    const heat = state.burner > 0.45 ? "burner warm" : "coasting";
    hud.innerHTML = `<strong>The Open Above: Balloon Drift</strong><br>${state.message}<br><small>${heat} · ${cameraRig.state.mode} · Altitude ${Math.round(state.altitude)}m · Wind ${state.wind.length().toFixed(1)}m/s · Exposure ${(visualState.exposure ?? 1).toFixed(2)} · ${visual.quality.id} · Scroll zoom · Nexus Engine Realtime Core</small>`;
  }

  let last = performance.now();
  function frame(now) {
    const frameMs = Math.min(80, now - last || 16.7);
    const dt = Math.min(1 / 30, frameMs / 1000);
    last = now;

    const state = simulation.update(dt);
    simulation.applyToBalloon(balloon);
    animateHotAirBalloon(balloon, now, state.burner);
    balloonPresentation.update(state.elapsed, state.burner);
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
    cameraRig,
    getState: () => ({
      nexusEngine: engine.openAbove?.getState?.(),
      local: getSnapshot()
    })
  };

  cameraRig.update(1 / 60, simulation.state);
  visual.update({ dt: 0, elapsed: 0, flightState: simulation.state, cameraContext });
  engine.tick(0);
  requestAnimationFrame(frame);
}

try {
  createGame();
} catch (error) {
  showFatal(error);
}
