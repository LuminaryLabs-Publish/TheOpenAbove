import {
  createFlatWorldSurface,
  createWorldCell,
  defineWorldPartition,
  diffCellSelections,
  defineWorldEffectProvider
} from "nexusengine/domains/world";

export const OPEN_ABOVE_WORLD_ID = "open-above-world";
export const OPEN_ABOVE_WORLD_CELL_SIZE = 520;

function createFlightGridPartition({ radius = 3, cellSize = OPEN_ABOVE_WORLD_CELL_SIZE } = {}) {
  const id = "open-above-flight-grid";
  return defineWorldPartition({
    id,
    kind: "centered-uniform-grid",
    selectCells({ worldId, worldSeed, focus = {}, previousCells = [] }) {
      const position = focus.position ?? focus;
      const centerX = Math.round((Number(position.x) || 0) / cellSize);
      const centerZ = Math.round((Number(position.z) || 0) / cellSize);
      const cells = [];
      for (let dz = -radius; dz <= radius; dz += 1) for (let dx = -radius; dx <= radius; dx += 1) {
        if (Math.hypot(dx, dz) > radius + 0.35) continue;
        const x = centerX + dx;
        const z = centerZ + dz;
        cells.push(createWorldCell({
          worldId,
          worldSeed,
          partitionId: id,
          coordinates: [x, z],
          bounds: {
            minX: (x - 0.5) * cellSize,
            maxX: (x + 0.5) * cellSize,
            minZ: (z - 0.5) * cellSize,
            maxZ: (z + 0.5) * cellSize
          },
          lod: Math.max(Math.abs(dx), Math.abs(dz)),
          priority: radius - Math.max(Math.abs(dx), Math.abs(dz))
        }));
      }
      return diffCellSelections(previousCells, cells);
    },
    locateCell(position = {}) {
      return [Math.round((Number(position.x) || 0) / cellSize), Math.round((Number(position.z) || 0) / cellSize)];
    },
    snapshot: () => ({ id, kind: "centered-uniform-grid", cellSize, radius })
  });
}

export function createOpenAboveWorldRuntime({ engine, preparedWorld, worldConfig = {} } = {}) {
  const worldApi = engine && engine.n && engine.n.world;
  if (!worldApi || typeof worldApi.registerWorld !== "function" || typeof worldApi.setFocus !== "function" || typeof worldApi.updateWorld !== "function") {
    throw new TypeError("The Open Above requires the Nexus World API.");
  }
  if (!preparedWorld || typeof preparedWorld.sampleHeight !== "function" || typeof preparedWorld.prepareCell !== "function") {
    throw new TypeError("The Open Above world runtime requires a prepared heightfield foundation.");
  }
  const activeCellIds = new Set();
  function activateCell({ world, cell }) {
    preparedWorld.prepareCell(cell);
    activeCellIds.add(cell.id);
    return {
      id: `${cell.id}:heightfield`,
      worldId: world.id,
      cellId: cell.id,
      kind: "heightfield-cell",
      capabilities: ["world-foundation", "terrain-height", "terrain-descriptor"],
      descriptor: {
        schema: "open-above.heightfield-cell/1",
        tileId: `height:${cell.coordinates.join(":")}:${cell.lod}`,
        bounds: cell.bounds,
        lod: cell.lod,
        revision: preparedWorld.getGenerationState().revision
      }
    };
  }
  const provider = defineWorldEffectProvider({
    id: "open-above-heightfield-cell-provider",
    phase: "foundation",
    critical: true,
    provides: ["world-foundation", "terrain-height", "terrain-descriptor"],
    prepareCell: activateCell,
    updateCell: activateCell,
    releaseCell({ cell }) {
      activeCellIds.delete(cell.id);
      preparedWorld.releaseCell(cell.id);
    },
    snapshot() {
      return { activeCellIds: [...activeCellIds].sort() };
    },
    reset() {
      for (const cellId of activeCellIds) preparedWorld.releaseCell(cellId);
      activeCellIds.clear();
    }
  });

  worldApi.registerWorld({
    id: OPEN_ABOVE_WORLD_ID,
    seed: worldConfig.seed ?? "open-above",
    partition: createFlightGridPartition({ cellSize: OPEN_ABOVE_WORLD_CELL_SIZE, radius: 3 }),
    surface: createFlatWorldSurface({ id: "open-above-flat-surface" }),
    providers: [provider]
  });

  function updateFocus(position = {}, velocity = {}) {
    worldApi.setFocus(OPEN_ABOVE_WORLD_ID, {
      position: { x: Number(position.x) || 0, y: Number(position.y) || 0, z: Number(position.z) || 0 },
      velocity: { x: Number(velocity.x) || 0, y: Number(velocity.y) || 0, z: Number(velocity.z) || 0 }
    });
    return worldApi.updateWorld(OPEN_ABOVE_WORLD_ID);
  }

  function getPresentationPacket() {
    const snapshot = worldApi.snapshotWorld(OPEN_ABOVE_WORLD_ID);
    return Object.freeze({
      schema: "open-above.world-presentation/1",
      worldId: OPEN_ABOVE_WORLD_ID,
      revision: snapshot.sequence,
      focus: snapshot.focus,
      cells: Object.freeze(snapshot.activeCells.map((record) => Object.freeze({
        id: record.cell.id,
        bounds: record.cell.bounds,
        lod: record.cell.lod,
        effects: record.effects
      })))
    });
  }

  return Object.freeze({
    id: OPEN_ABOVE_WORLD_ID,
    updateFocus,
    getPresentationPacket,
    snapshot: () => worldApi.snapshotWorld(OPEN_ABOVE_WORLD_ID),
    sampleHeight: preparedWorld.sampleHeight,
    get world() { return preparedWorld; },
    dispose() { worldApi.removeWorld(OPEN_ABOVE_WORLD_ID); }
  });
}
