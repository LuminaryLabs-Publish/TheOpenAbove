export const VEGETATION_CELL_BATCH_SCHEMA = "open-above.vegetation-cell-batch/1";

export function createVegetationCellBatchBuilder({ cellSize = 520, revision = 1 } = {}) {
  const cells = new Map();

  function add({ x, y, z, yaw, scaleX, scaleY, scaleZ, radius, color }) {
    const cellX = Math.floor(Number(x) / cellSize);
    const cellZ = Math.floor(Number(z) / cellSize);
    const cellId = `${cellX}:${cellZ}`;
    if (!cells.has(cellId)) cells.set(cellId, []);
    cells.get(cellId).push(x, y, z, yaw, scaleX, scaleY, scaleZ, radius, color);
  }

  function finalize() {
    return Object.freeze([...cells.entries()]
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([cellId, values]) => Object.freeze({
        schema: VEGETATION_CELL_BATCH_SCHEMA,
        id: `trees:${cellId}:${revision}`,
        cellId,
        revision,
        stride: 9,
        count: values.length / 9,
        transforms: new Float32Array(values)
      })));
  }

  return Object.freeze({ add, finalize });
}
