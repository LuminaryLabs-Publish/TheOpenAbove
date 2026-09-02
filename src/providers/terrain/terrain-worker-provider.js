import { createWorldGenerationKit } from "../../world/world-generation-kit.js";
import { terrainHeight, moistureAt } from "../../visual/landscape/terrain-surface-kit.js";

export const TERRAIN_WORKER_PROVIDER_ID = "open-above-terrain-worker-provider";

export function createTerrainWorkerProvider({ maxInflight = 1 } = {}) {
  const inflight = new Map();
  let generation = 0;
  let disposed = false;

  function prepareFallback({ worldConfig, anchors }) {
    const world = createWorldGenerationKit({
      worldConfig,
      anchors,
      legacyTerrainHeight: terrainHeight,
      legacyMoistureAt: moistureAt,
      staged: false,
      autoStart: true
    });
    try {
      return world.exportPreparedState();
    } finally {
      world.dispose();
    }
  }

  function prepare({ worldConfig, anchors = {}, signal = null } = {}) {
    if (disposed) return Promise.reject(new Error("Terrain worker provider is disposed."));
    if (inflight.size >= maxInflight) return Promise.reject(new Error("Terrain worker provider inflight limit reached."));
    const requestId = `terrain-world:${++generation}`;
    if (typeof Worker !== "function") return Promise.resolve().then(() => prepareFallback({ worldConfig, anchors }));

    return new Promise((resolve, reject) => {
      const worker = new Worker(new URL("../../workers/terrain-world.worker.js", import.meta.url), { type: "module" });
      const abort = () => {
        worker.terminate();
        inflight.delete(requestId);
        reject(Object.assign(new Error("Terrain preparation aborted."), { name: "AbortError" }));
      };
      const finish = () => {
        signal?.removeEventListener?.("abort", abort);
        worker.terminate();
        inflight.delete(requestId);
      };
      worker.addEventListener("message", (event) => {
        if (event.data?.requestId !== requestId) return;
        finish();
        if (event.data.type === "prepared") resolve(event.data.prepared);
        else reject(new Error(event.data.error?.message ?? "Terrain worker failed."));
      });
      worker.addEventListener("error", (event) => {
        finish();
        reject(event.error ?? new Error(event.message ?? "Terrain worker failed."));
      });
      inflight.set(requestId, { worker, abort });
      if (signal?.aborted) return abort();
      signal?.addEventListener?.("abort", abort, { once: true });
      worker.postMessage({ requestId, worldConfig, anchors });
    });
  }

  function dispose() {
    disposed = true;
    for (const task of inflight.values()) task.abort();
    inflight.clear();
  }

  return Object.freeze({
    id: TERRAIN_WORKER_PROVIDER_ID,
    prepare,
    dispose,
    getStats: () => Object.freeze({ inflight: inflight.size, maxInflight, generation, disposed })
  });
}
