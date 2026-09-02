import assert from "node:assert/strict";
import { WORLD } from "../src/data/campaign.config.js";
import { createBalloonTelemetryEngine } from "../src/runtime/balloon-telemetry-kit.js";
import { createVirtualHeightfieldTerrainKit } from "../src/world/virtual-heightfield-terrain-kit.js";
import { createOpenAboveWorldRuntime } from "../src/world/open-above-world-runtime.js";
import { createVegetationCellBatchBuilder } from "../src/world/vegetation-cell-batch.js";

const engine = createBalloonTelemetryEngine(() => ({ altitude: 0, windSpeed: 0, burner: 0 }), {
  worldFeatures: WORLD.features.landforms,
  weather: WORLD.weather
});
const heightfield = createVirtualHeightfieldTerrainKit({
  worldConfig: WORLD,
  worldAnchors: { routes: [], towns: WORLD.towns },
  worldFeatures: engine.n.worldFeature,
  worldFoundation: engine.n.worldFoundation
});
await heightfield.prepare();
const preparedWorld = heightfield.finalize();
const runtime = createOpenAboveWorldRuntime({ engine, preparedWorld, worldConfig: WORLD });

const first = runtime.updateFocus({ x: 0, y: 200, z: 0 }, { x: 20, y: 0, z: 0 });
assert.equal(first.activeCells.length, 37);
assert.equal(preparedWorld.listFoundationCells().length, 37);

const vegetation = createVegetationCellBatchBuilder({ cellSize: 520, revision: 3 });
vegetation.add({ x: 12, y: 4, z: 30, yaw: 0, scaleX: 1, scaleY: 2, scaleZ: 1, radius: 3, color: 0x335533 });
vegetation.add({ x: 540, y: 8, z: 30, yaw: 1, scaleX: 2, scaleY: 3, scaleZ: 2, radius: 4, color: 0x446644 });
const vegetationBatches = vegetation.finalize();
assert.equal(vegetationBatches.length, 2);
assert.ok(vegetationBatches.every((batch) => batch.transforms instanceof Float32Array && batch.count === 1));
assert.equal(Number.isFinite(runtime.sampleHeight(0, 0)), true);
const firstPacket = runtime.getPresentationPacket();
assert.equal(firstPacket.cells.length, 37);
assert.ok(firstPacket.cells.every((cell) => cell.effects.some((effect) => effect.kind === "heightfield-cell")));

const second = runtime.updateFocus({ x: 2600, y: 200, z: 0 }, { x: 40, y: 0, z: 0 });
assert.equal(second.activeCells.length, 37);
assert.notEqual(second.sequence, first.sequence);
assert.notDeepEqual(second.activeCells.map((record) => record.cell.id), first.activeCells.map((record) => record.cell.id));
assert.equal(preparedWorld.listFoundationCells().length, 37);

runtime.dispose();
assert.equal(preparedWorld.listFoundationCells().length, 0);
heightfield.dispose();
console.log("The Open Above worker heightfield and Nexus World authority passed.");
