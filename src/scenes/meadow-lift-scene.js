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
  createExperienceWorldPreparation,
  createExperienceDomain
} from "../domains/index.js";

export const MEADOW_LIFT_SCENE_ID = "open-above-meadow-lift-scene";

const STARTUP_PREPARATIONS = Object.freeze([
  Object.freeze({ id: "runtime", label: "Starting Nexus Engine", weight: 0.5 }),
  Object.freeze({ id: "world-generation", label: "Generating terrain, climate, and biomes", weight: 6 }),
  Object.freeze({ id: "world-features", label: "Resolving landmarks and world features", weight: 1 }),
  Object.freeze({ id: "world-presentation", label: "Preparing terrain and atmosphere", weight: 2 }),
  Object.freeze({ id: "balloon", label: "Preparing the balloon", weight: 1.5 }),
  Object.freeze({ id: "starting-area", label: "Building the starting area", weight: 3 }),
  Object.freeze({ id: "navigation", label: "Preparing the sightseeing journal", weight: 1 }),
  Object.freeze({ id: "first-frame", label: "Presenting the world", weight: 1 })
]);

const WORLD_PHASE_LABELS = Object.freeze({
  height: "Forming the terrain",
  erosion: "Eroding ridges and valleys",
  flow: "Tracing watersheds",
  climate: "Distributing moisture and temperature",
  biome: "Planting biomes",
  ready: "World generation complete"
});

const nowMs = () => globalThis.performance?.now?.() ?? Date.now();

function nextHostFrame() {
  return new Promise((resolve) => {
    if (typeof globalThis.requestAnimationFrame === "function") {
      globalThis.requestAnimationFrame(() => resolve());
      return;
    }
    setTimeout(resolve, 0);
  });
}

function createStartupPresentation(startup, elements = {}) {
  return NexusEngine.createBrowserStartupPresentationAdapter({
    startup,
    loader: elements.loader,
    fill: elements.fill,
    label: elements.label,
    error: elements.error,
    hideOnComplete: true,
    format(descriptor) {
      const active = descriptor.activePreparation;
      const percent = Math.round(descriptor.progress * 100);
      return {
        progress: descriptor.progress,
        label: descriptor.failure?.message
          ?? active?.detail
          ?? active?.label
          ?? (descriptor.playable ? "Ready to explore" : `Preparing the world · ${percent}%`),
        error: descriptor.failure?.message ?? null,
        complete: descriptor.playable,
        status: descriptor.status
      };
    }
  });
}

function renderStartup(presentation) {
  presentation?.render?.();
}

async function advanceGeneratedWorld(worldPreparation, startup, presentation) {
  let state = worldPreparation.getState();
  startup.working("world-generation", state.progress, WORLD_PHASE_LABELS[state.phase] ?? "Preparing the world");
  renderStartup(presentation);
  await nextHostFrame();

  while (state.status === "working" || state.status === "idle") {
    const deadline = nowMs() + 7;
    do {
      state = worldPreparation.advance(512);
    } while (state.status === "working" && nowMs() < deadline);

    startup.working(
      "world-generation",
      state.progress,
      WORLD_PHASE_LABELS[state.phase] ?? `Generating ${state.phase ?? "world"}`
    );
    renderStartup(presentation);
    if (state.status === "working") await nextHostFrame();
  }

  if (state.status !== "ready") {
    throw new Error(state.failure?.message ?? `World generation ended with status ${state.status}.`);
  }

  startup.ready("world-generation", {
    generation: state,
    descriptor: worldPreparation.generatedWorld.getDescriptor()
  }, "Terrain, climate, watersheds, and biomes are ready");
  renderStartup(presentation);
  await nextHostFrame();
  return state;
}

export async function createMeadowLiftScene({
  canvas,
  mapRoot,
  mapCanvas,
  startupElements = {},
  nexusEngineSha,
  onFatal
} = {}) {
  const sky = createSkyDomain({
    weatherLayers: WORLD.weather?.layers ?? [],
    worldSurface: WORLD.surface,
    cloudSeed: WORLD.seed
  });
  const worldFeatures = [
    ...(WORLD.features?.landforms ?? []),
    ...(WORLD.features?.atmosphere ?? [])
  ];
  let snapshotReader = () => ({ status: "booting" });
  const engine = createBalloonTelemetryEngine(NexusEngine, () => snapshotReader(), {
    worldFeatures,
    weather: WORLD.weather
  });
  const startup = engine.n?.coreStartup ?? engine.coreStartup;
  if (!startup) throw new TypeError("Nexus Engine Core Startup API is unavailable.");

  const startupPresentation = createStartupPresentation(startup, startupElements);
  startup.launch({
    launchId: `the-open-above:${Date.now().toString(36)}`,
    projectId: "the-open-above",
    preparations: STARTUP_PREPARATIONS,
    continuation: { mode: "new" },
    metadata: { sceneId: MEADOW_LIFT_SCENE_ID, nexusEngineSha }
  });
  startup.selectContinuation({ mode: "new", sourceId: MEADOW_LIFT_SCENE_ID });
  startup.ready("runtime", { nexusEngineSha }, "Nexus Engine runtime ready");
  renderStartup(startupPresentation);

  let land = null;
  let worldPreparation = null;
  let experience = null;
  let ballooning = null;
  let imageCapture = null;
  let navigation = null;
  let journey = null;

  try {
    land = createLandDomain({
      worldConfig: WORLD,
      worldFeatures: engine.n.worldFeatures,
      worldFoundation: engine.n.worldFoundation,
      routes: sky.routes,
      towns: []
    });
    sky.bindRuntimeEngine(engine);

    worldPreparation = createExperienceWorldPreparation({ land });
    await advanceGeneratedWorld(worldPreparation, startup, startupPresentation);

    startup.working("world-features", 0.25, "Resolving authored landmarks into the generated foundation");
    renderStartup(startupPresentation);
    await nextHostFrame();
    const preparedWorld = worldPreparation.finalize();
    startup.ready("world-features", preparedWorld.getDescriptor(), "Landmarks and world features resolved");
    renderStartup(startupPresentation);

    startup.working("world-presentation", 0.15, "Creating the renderer and final terrain presentation");
    renderStartup(startupPresentation);
    await nextHostFrame();
    experience = createExperienceDomain({ canvas, land, sky, preparedWorld });
    land.bindVisual(experience.visual);
    sky.mount({ scene: experience.scene });
    startup.ready("world-presentation", {
      quality: experience.visual.quality.id,
      world: preparedWorld.getDescriptor()
    }, "Terrain, atmosphere, clouds, and wind presentation ready");
    renderStartup(startupPresentation);

    startup.working("balloon", 0.1, "Loading the balloon and camera rig");
    renderStartup(startupPresentation);
    await nextHostFrame();
    ballooning = createBallooningDomain();
    await ballooning.mount({
      targetScene: experience.scene,
      terrainHeight: experience.visual.landscape.terrain.terrainHeight,
      sampleAirstream: sky.sample
    });
    experience.bindBalloon(ballooning.balloon);
    startup.ready("balloon", ballooning.modelSnapshot(), "Balloon and camera ready");
    renderStartup(startupPresentation);

    imageCapture = createImageCaptureDomain({
      camera: experience.camera,
      renderer: experience.renderer,
      landforms: WORLD.features?.landforms ?? []
    });
    navigation = createNavigationDomain({
      root: mapRoot,
      canvas: mapCanvas,
      worldSurface: WORLD.surface,
      routes: sky.routes
    });
    journey = createJourneyDomain({ campaign: CAMPAIGN, onFatal });
    const domains = Object.freeze({
      startup,
      journey,
      ballooning,
      sky,
      land,
      navigation,
      imageCapture,
      experience
    });
    const getSnapshot = () => ({
      ...journey.snapshot(domains),
      startup: startup.getDescriptor()
    });
    snapshotReader = getSnapshot;

    startup.working("starting-area", 0.1, "Building nearby terrain, vegetation, grass, and flowers");
    renderStartup(startupPresentation);
    await nextHostFrame();
    const initialState = ballooning.update({ dt: 0, now: nowMs() });
    sky.update({
      position: initialState.position,
      elapsed: initialState.elapsed,
      sample: initialState.airstream,
      dt: 0
    });
    experience.update({ dt: 0, flightState: initialState });
    engine.tick(0);
    startup.ready("starting-area", {
      terrain: land.snapshot(),
      visual: experience.snapshot()
    }, "Starting terrain and ecology ready");
    renderStartup(startupPresentation);

    startup.working("navigation", 0.2, "Drawing the generated world map and Snap Points");
    renderStartup(startupPresentation);
    await nextHostFrame();
    navigation.mount({
      world: land.world,
      getPlayerState: () => ballooning.state,
      getSnapPoints: () => imageCapture.snapPoints,
      getCaptureState: () => imageCapture.snapshot()
    });
    startup.ready("navigation", navigation.snapshot(), "Sightseeing journal ready");
    renderStartup(startupPresentation);

    startup.working("first-frame", 0.5, "Compiling shaders and presenting the first frame");
    renderStartup(startupPresentation);
    await nextHostFrame();
    experience.render(0, 16.7);
    await nextHostFrame();
    startup.presentFirstFrame({
      frameId: "meadow-lift:first-frame",
      presentationId: MEADOW_LIFT_SCENE_ID,
      backend: experience.renderer.capabilities?.isWebGL2 ? "webgl2" : "webgl",
      receipt: {
        drawCalls: experience.visual.state.drawCalls,
        triangles: experience.visual.state.triangles
      }
    });
    startup.ready("first-frame", {
      drawCalls: experience.visual.state.drawCalls,
      triangles: experience.visual.state.triangles
    }, "The Open Above is ready");
    startup.enter({ inputReady: true });
    renderStartup(startupPresentation);

    function update({ now, dt }) {
      const state = ballooning.update({ dt, now });
      sky.update({ position: state.position, elapsed: state.elapsed, sample: state.airstream, dt });
      experience.update({ dt, flightState: state });
      const captureEvent = imageCapture.update(state);
      if (captureEvent) state.message = `${captureEvent.name}: ${captureEvent.rating} (${captureEvent.score})`;
      engine.tick(dt);
    }

    function render({ dt, frameMs }) {
      experience.render(dt, frameMs);
    }

    function start() {
      if (!startup.getDescriptor().playable) {
        throw new Error("Meadow Lift cannot start before Core Startup enters playable readiness.");
      }
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

    const gameHost = Object.freeze({
      engine,
      NexusEngine,
      nexusEngineSha,
      THREE,
      startup,
      scene: experience.scene,
      renderer: experience.renderer,
      camera: experience.camera,
      domains,
      balloon: ballooning.balloon,
      visual: experience.visual,
      simulation: ballooning.simulation,
      airstream: sky.airstream,
      windParticles: sky.windParticles,
      imageCapture,
      cameraRig: experience.cameraRig,
      balloonPresentation: experience.balloonPresentation,
      getState: () => ({
        startup: startup.getDescriptor(),
        nexusEngine: engine.openAbove?.getState?.(),
        local: getSnapshot()
      })
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
  } catch (error) {
    try {
      if (startup.getDescriptor().status === "starting") {
        startup.fail({
          code: error?.code ?? "open-above.startup.failed",
          message: String(error?.message ?? error),
          source: MEADOW_LIFT_SCENE_ID,
          retryable: true
        });
      }
      renderStartup(startupPresentation);
    } catch {
      // Preserve the original startup error.
    }
    navigation?.dispose?.();
    imageCapture?.dispose?.();
    ballooning?.dispose?.();
    sky?.dispose?.();
    experience?.dispose?.();
    if (!experience) worldPreparation?.dispose?.();
    throw error;
  }
}
