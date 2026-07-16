export const JOURNEY_DOMAIN_ID = "open-above-journey-domain";

export function createJourneyDomain({ campaign, onFatal = (error) => { throw error; } } = {}) {
  const state = {
    status: "booting",
    regionId: campaign?.regions?.[0]?.id ?? "meadow-lift",
    mapOpen: false,
    frame: 0,
    elapsed: 0
  };
  let frameHandle = 0;
  let lastFrameTime = 0;

  function snapshot({ ballooning, navigation, sky, airMail, land, experience } = {}) {
    const camera = experience?.cameraSnapshot?.() ?? {};
    const visual = experience?.snapshot?.() ?? {};
    return ballooning?.snapshot?.({
      region: state.regionId,
      cameraZoom: camera.zoom ?? 0,
      firstPersonBlend: camera.firstPersonBlend ?? 0,
      cameraMode: camera.mode ?? "follow",
      map: navigation?.snapshot?.() ?? null,
      airstream: sky?.airstreamSnapshot?.() ?? null,
      mail: airMail?.snapshot?.() ?? null,
      weather: sky?.weatherSnapshot?.() ?? visual.weather ?? null,
      terrain: land?.snapshot?.() ?? null,
      model: ballooning?.modelSnapshot?.() ?? null,
      visual
    }) ?? { status: state.status, region: state.regionId };
  }

  function start({ isMapOpen = () => false, update = () => {}, render = () => {} } = {}) {
    if (frameHandle) return false;
    state.status = "playing";
    lastFrameTime = performance.now();

    const frame = (now) => {
      const frameMs = Math.max(0, Math.min(80, now - lastFrameTime || 16.7));
      const dt = Math.max(0, Math.min(1 / 30, frameMs / 1000));
      lastFrameTime = now;
      state.frame += 1;
      state.mapOpen = Boolean(isMapOpen());
      state.status = state.mapOpen ? "map" : "playing";

      try {
        if (!state.mapOpen) {
          state.elapsed += dt;
          update({ now, frameMs, dt, state });
        }
        render({ now, frameMs, dt: state.mapOpen ? 0 : dt, state });
      } catch (error) {
        state.status = "failed";
        frameHandle = 0;
        onFatal(error);
        return;
      }
      frameHandle = requestAnimationFrame(frame);
    };

    frameHandle = requestAnimationFrame(frame);
    return true;
  }

  function stop() {
    cancelAnimationFrame(frameHandle);
    frameHandle = 0;
    state.status = "stopped";
  }

  return Object.freeze({
    id: JOURNEY_DOMAIN_ID,
    state,
    snapshot,
    start,
    stop,
    dispose: stop
  });
}
