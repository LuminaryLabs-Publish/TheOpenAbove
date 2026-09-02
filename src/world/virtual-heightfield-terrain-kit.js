import { createTerrainWorkerProvider } from "../providers/terrain/terrain-worker-provider.js";
import { terrainHeight, moistureAt } from "../visual/landscape/terrain-surface-kit.js";
import { createWorldGenerationKit } from "./world-generation-kit.js";
import { createWorldFeatureFoundation } from "./world-feature-foundation-kit.js";

export const VIRTUAL_HEIGHTFIELD_TERRAIN_KIT_ID = "open-above-virtual-heightfield-terrain-kit";

export function createVirtualHeightfieldTerrainKit({
  worldConfig = {},
  worldAnchors = {},
  worldFeatures = null,
  worldFoundation = null,
  workerProvider = createTerrainWorkerProvider({ maxInflight: 1 })
} = {}) {
  const generatedWorld = createWorldGenerationKit({
    worldConfig,
    anchors: worldAnchors,
    legacyTerrainHeight: terrainHeight,
    legacyMoistureAt: moistureAt,
    staged: true,
    autoStart: false
  });
  let preparedWorld = null;
  let preparation = null;
  let status = "idle";
  let failure = null;

  async function prepare({ signal = null } = {}) {
    if (preparedWorld) return preparedWorld;
    if (preparation) return preparation;
    status = "working";
    preparation = workerProvider.prepare({ worldConfig, anchors: worldAnchors, signal })
      .then((snapshot) => {
        generatedWorld.hydratePreparedState(snapshot);
        preparedWorld = createWorldFeatureFoundation(generatedWorld, {
          worldConfig,
          worldFeatures,
          worldFoundation
        });
        status = "ready";
        return preparedWorld;
      })
      .catch((error) => {
        status = error?.name === "AbortError" ? "cancelled" : "failed";
        failure = { message: String(error?.message ?? error) };
        throw error;
      });
    return preparation;
  }

  return Object.freeze({
    id: VIRTUAL_HEIGHTFIELD_TERRAIN_KIT_ID,
    generatedWorld,
    prepare,
    finalize() {
      if (!preparedWorld) throw new Error(`Heightfield cannot finalize while status is ${status}.`);
      return preparedWorld;
    },
    getState: () => Object.freeze({ ...generatedWorld.getGenerationState(), status, failure, worker: workerProvider.getStats() }),
    get world() { return preparedWorld; },
    dispose() {
      workerProvider.dispose();
      (preparedWorld ?? generatedWorld).dispose?.();
    }
  });
}
