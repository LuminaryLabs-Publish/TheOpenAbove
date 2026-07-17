import { createVisualDomain } from "../../visual/visual-domain.js";
import { createBalloonCameraRig } from "../../visual/camera-presentation/balloon-camera-rig-kit.js";
import { createBalloonPresentationDomain } from "../../visual/balloon-presentation/balloon-presentation-domain.js";

export const EXPERIENCE_DOMAIN_ID = "open-above-experience-domain";

export function createExperienceDomain({ canvas, land, sky } = {}) {
  const visual = createVisualDomain({
    canvas,
    worldConfig: land.worldConfig,
    worldAnchors: land.worldAnchors,
    worldFeatures: land.worldFeatures,
    worldFoundation: land.worldFoundation,
    weatherDomain: sky.weather,
    layeredWeather: sky.layeredWeather,
    cloudField: sky.cloudField
  });
  let cameraRig = null;
  let balloonPresentation = null;
  let cameraContext = null;
  let visualState = visual.state;

  function bindBalloon(balloon) {
    cameraRig = createBalloonCameraRig(visual.camera, balloon, { initialZoom: 48, maxZoom: 112 });
    balloonPresentation = createBalloonPresentationDomain(balloon);
    cameraContext = cameraRig.state;
    return api;
  }

  function update({ dt, flightState } = {}) {
    balloonPresentation?.update(flightState);
    cameraContext = cameraRig?.update(dt, flightState) ?? cameraContext;
    visualState = visual.update({ dt, elapsed: flightState.elapsed, flightState, cameraContext });
    return visualState;
  }

  function cameraSnapshot() {
    return cameraRig ? {
      zoom: Number(cameraRig.state.zoom.toFixed(2)),
      firstPersonBlend: Number(cameraRig.state.firstPersonBlend.toFixed(3)),
      mode: cameraRig.state.mode
    } : null;
  }

  function snapshot() {
    return {
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
      weather: visualState.weather,
      cloudLod: visualState.cloudLod,
      worldGeneration: visualState.worldGeneration
    };
  }

  const api = {
    id: EXPERIENCE_DOMAIN_ID,
    visual,
    scene: visual.scene,
    camera: visual.camera,
    renderer: visual.renderer,
    bindBalloon,
    update,
    render: (dt, frameMs) => visual.render(dt, frameMs),
    cameraSnapshot,
    snapshot,
    get cameraRig() { return cameraRig; },
    get balloonPresentation() { return balloonPresentation; },
    get state() { return visualState; },
    dispose() {
      balloonPresentation?.dispose?.();
      cameraRig?.dispose?.();
      visual.dispose?.();
    }
  };
  return Object.freeze(api);
}
