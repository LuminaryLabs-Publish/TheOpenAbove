import { loadHotAirBalloonModel, animateHotAirBalloon } from "../../hot-air-balloon-object-kit.js";
import { createBalloonSimulation } from "../../runtime/balloon-simulation-kit.js";

export const BALLOONING_DOMAIN_ID = "open-above-ballooning-domain";

export function createBallooningDomain({ startPosition = [0, 105, 0] } = {}) {
  let scene = null;
  let balloon = null;
  let simulation = null;

  async function mount({ targetScene, terrainHeight, sampleAirstream } = {}) {
    scene = targetScene;
    balloon = await loadHotAirBalloonModel(undefined, { yieldToFrame: true });
    scene.add(balloon);
    simulation = createBalloonSimulation({ terrainHeight, sampleAirstream, startPosition });
    simulation.applyToBalloon(balloon);
    return api;
  }

  function update({ dt, now } = {}) {
    const state = simulation.update(dt);
    simulation.applyToBalloon(balloon);
    animateHotAirBalloon(balloon, now, state.burner, state);
    return state;
  }

  function modelSnapshot() {
    return balloon ? {
      ready: balloon.userData.modelReady === true,
      loadedDuringLevelSetup: balloon.userData.loadedDuringLevelSetup === true,
      persistentGpuResources: balloon.userData.persistentGpuResources === true
    } : null;
  }

  const api = {
    id: BALLOONING_DOMAIN_ID,
    mount,
    update,
    snapshot: (extra = {}) => simulation?.snapshot?.(extra) ?? { status: "booting", ...extra },
    modelSnapshot,
    get state() { return simulation?.state ?? null; },
    get simulation() { return simulation; },
    get balloon() { return balloon; },
    dispose() {
      simulation?.dispose?.();
      if (scene && balloon) scene.remove(balloon);
    }
  };
  return Object.freeze(api);
}
