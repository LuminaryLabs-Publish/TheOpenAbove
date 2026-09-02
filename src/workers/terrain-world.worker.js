import { createWorldGenerationKit } from "../world/world-generation-kit.js";
import { terrainHeight, moistureAt } from "../visual/landscape/terrain-surface-kit.js";

self.addEventListener("message", (event) => {
  const { requestId, worldConfig, anchors } = event.data ?? {};
  if (!requestId) return;
  let world = null;
  try {
    world = createWorldGenerationKit({
      worldConfig,
      anchors,
      legacyTerrainHeight: terrainHeight,
      legacyMoistureAt: moistureAt,
      staged: false,
      autoStart: true
    });
    const prepared = world.exportPreparedState();
    const transfer = [
      prepared.heightGrid.buffer,
      prepared.moistureGrid.buffer,
      prepared.temperatureGrid.buffer,
      prepared.fertilityGrid.buffer,
      prepared.flowGrid.buffer,
      prepared.biomeGrid.buffer
    ];
    self.postMessage({ type: "prepared", requestId, prepared }, transfer);
  } catch (error) {
    self.postMessage({
      type: "failed",
      requestId,
      error: { message: String(error?.message ?? error), stack: String(error?.stack ?? "") }
    });
  } finally {
    if (world && typeof world.dispose === "function") world.dispose();
  }
});
