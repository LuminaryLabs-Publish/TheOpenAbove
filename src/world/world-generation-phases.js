import { AUTHORED_LAKES } from "./world-authored-features.js";
import {
  EROSION_PASSES,
  biomeProfile,
  clamp01,
  fbm,
  lerp,
  ridgedFbm,
  smoothstep
} from "./world-generation-support.js";

export function processHeight(ctx) {
  const pending = ctx.pending;
  const index = pending.cursor;
  const gx = index % ctx.gridSize;
  const gz = Math.floor(index / ctx.gridSize);
  const x = ctx.worldXAt(gx);
  const z = ctx.worldZAt(gz);
  const warpX = (fbm(x * 0.00045, z * 0.00045, ctx.seed + 11, 3) * 2 - 1) * 320;
  const warpZ = (fbm(x * 0.00045, z * 0.00045, ctx.seed + 23, 3) * 2 - 1) * 320;
  const wx = x + warpX;
  const wz = z + warpZ;
  const continental = fbm(wx * 0.00018, wz * 0.00018, ctx.seed + 37, 5);
  const rolling = fbm(wx * 0.00075, wz * 0.00075, ctx.seed + 59, 5);
  const ridge = ridgedFbm(wx * 0.00125, wz * 0.00125, ctx.seed + 83, 4);
  const valley = fbm(wx * 0.0009, wz * 0.0009, ctx.seed + 107, 3);
  pending.rawHeight[index] = (continental - 0.5) * 100
    + (rolling - 0.5) * 68
    + smoothstep(0.56, 0.9, ridge) * 48
    - smoothstep(0.64, 0.9, valley) * 18;
  pending.protectionGrid[index] = ctx.protectionAt(x, z);
  pending.temperatureGrid[index] = clamp01(0.66 - pending.rawHeight[index] / 330 + (fbm(wx * 0.00032, wz * 0.00032, ctx.seed + 139, 3) - 0.5) * 0.34);
  pending.moistureGrid[index] = fbm(wx * 0.00055, wz * 0.00055, ctx.seed + 173, 4);
  pending.cursor += 1;
  ctx.updateProgress(pending.cursor / ctx.total);
  if (pending.cursor >= ctx.total) {
    pending.eroded.set(pending.rawHeight);
    pending.delta.fill(0);
    pending.cursor = 0;
    ctx.setPhase("erosion");
  }
}

export function processErosion(ctx) {
  const pending = ctx.pending;
  const index = pending.cursor;
  if (pending.erosionMode === "scan") {
    const gx = index % ctx.gridSize;
    const gz = Math.floor(index / ctx.gridSize);
    if (gx > 0 && gz > 0 && gx < ctx.gridSize - 1 && gz < ctx.gridSize - 1) {
      let lowestIndex = index;
      let lowestHeight = pending.eroded[index];
      for (let dz = -1; dz <= 1; dz += 1) {
        for (let dx = -1; dx <= 1; dx += 1) {
          if (dx === 0 && dz === 0) continue;
          const neighbor = ctx.gridIndex(gx + dx, gz + dz);
          if (pending.eroded[neighbor] < lowestHeight) {
            lowestHeight = pending.eroded[neighbor];
            lowestIndex = neighbor;
          }
        }
      }
      const excess = pending.eroded[index] - lowestHeight - 7.5;
      if (lowestIndex !== index && excess > 0) {
        const moved = excess * 0.16;
        pending.delta[index] -= moved;
        pending.delta[lowestIndex] += moved;
      }
    }
    pending.cursor += 1;
    if (pending.cursor >= ctx.total) {
      pending.cursor = 0;
      pending.erosionMode = "apply";
    }
  } else {
    pending.eroded[index] += pending.delta[index];
    pending.cursor += 1;
    if (pending.cursor >= ctx.total) {
      pending.erosionPass += 1;
      pending.cursor = 0;
      if (pending.erosionPass >= EROSION_PASSES) {
        pending.flowGrid.fill(1);
        pending.flowMode = "initialize";
        ctx.setPhase("flow");
      } else {
        pending.delta.fill(0);
        pending.erosionMode = "scan";
      }
    }
  }
  const passProgress = pending.erosionMode === "scan"
    ? pending.cursor / ctx.total * 0.5
    : 0.5 + pending.cursor / ctx.total * 0.5;
  ctx.updateProgress((pending.erosionPass + passProgress) / EROSION_PASSES);
}

function initializeSortUnit(ctx) {
  const pending = ctx.pending;
  pending.order[pending.cursor] = pending.cursor;
  pending.cursor += 1;
  ctx.updateProgress((pending.cursor / ctx.total) * 0.08);
  if (pending.cursor >= ctx.total) {
    pending.cursor = 0;
    pending.flowMode = "sort";
    pending.sortWidth = 1;
    pending.sortLeft = 0;
    pending.merge = null;
  }
}

function sortUnit(ctx) {
  const pending = ctx.pending;
  while (!pending.merge) {
    if (pending.sortWidth >= ctx.total) {
      pending.flowMode = "accumulate";
      pending.cursor = 0;
      return;
    }
    if (pending.sortLeft >= ctx.total) {
      const swap = pending.order;
      pending.order = pending.sortBuffer;
      pending.sortBuffer = swap;
      pending.sortWidth *= 2;
      pending.sortLeft = 0;
      continue;
    }
    const left = pending.sortLeft;
    const mid = Math.min(left + pending.sortWidth, ctx.total);
    const right = Math.min(left + pending.sortWidth * 2, ctx.total);
    pending.merge = { left, mid, right, i: left, j: mid, k: left };
  }

  const merge = pending.merge;
  let chosen;
  if (merge.i >= merge.mid) chosen = pending.order[merge.j++];
  else if (merge.j >= merge.right) chosen = pending.order[merge.i++];
  else {
    const leftIndex = pending.order[merge.i];
    const rightIndex = pending.order[merge.j];
    if (pending.eroded[leftIndex] >= pending.eroded[rightIndex]) {
      chosen = leftIndex;
      merge.i += 1;
    } else {
      chosen = rightIndex;
      merge.j += 1;
    }
  }
  pending.sortBuffer[merge.k++] = chosen;
  if (merge.k >= merge.right) {
    pending.sortLeft += pending.sortWidth * 2;
    pending.merge = null;
  }
  const passes = Math.ceil(Math.log2(ctx.total));
  const completedPasses = Math.log2(pending.sortWidth);
  const withinPass = Math.min(1, pending.sortLeft / ctx.total);
  ctx.updateProgress(0.08 + ((completedPasses + withinPass) / passes) * 0.68);
}

function accumulateFlowUnit(ctx) {
  const pending = ctx.pending;
  const index = pending.order[pending.cursor];
  const gx = index % ctx.gridSize;
  const gz = Math.floor(index / ctx.gridSize);
  if (gx > 0 && gz > 0 && gx < ctx.gridSize - 1 && gz < ctx.gridSize - 1) {
    let lowestIndex = index;
    let lowestHeight = pending.eroded[index];
    for (let dz = -1; dz <= 1; dz += 1) {
      for (let dx = -1; dx <= 1; dx += 1) {
        if (dx === 0 && dz === 0) continue;
        const neighbor = ctx.gridIndex(gx + dx, gz + dz);
        if (pending.eroded[neighbor] < lowestHeight) {
          lowestHeight = pending.eroded[neighbor];
          lowestIndex = neighbor;
        }
      }
    }
    if (lowestIndex !== index) pending.flowGrid[lowestIndex] += pending.flowGrid[index];
  }
  pending.cursor += 1;
  ctx.updateProgress(0.76 + pending.cursor / ctx.total * 0.24);
  if (pending.cursor >= ctx.total) {
    pending.cursor = 0;
    ctx.setPhase("climate");
  }
}

export function processFlow(ctx) {
  if (ctx.pending.flowMode === "initialize") initializeSortUnit(ctx);
  else if (ctx.pending.flowMode === "sort") sortUnit(ctx);
  else accumulateFlowUnit(ctx);
}

export function processClimate(ctx) {
  const pending = ctx.pending;
  const index = pending.cursor;
  const gx = index % ctx.gridSize;
  const gz = Math.floor(index / ctx.gridSize);
  const x = ctx.worldXAt(gx);
  const z = ctx.worldZAt(gz);
  const flowLog = Math.log2(pending.flowGrid[index] + 1);
  const channel = smoothstep(4.4, 10.5, flowLog);
  const carved = pending.eroded[index] - channel * 13;
  const protection = pending.protectionGrid[index];
  const legacy = Number(ctx.legacyTerrainHeight(x, z)) || 0;
  pending.heightGrid[index] = lerp(carved, legacy, protection);
  const lowland = 1 - smoothstep(-38, 72, pending.heightGrid[index]);
  let lakeMoisture = 0;
  for (const lake of AUTHORED_LAKES) {
    lakeMoisture += Math.exp(-((x - lake.x) ** 2 + (z - lake.z) ** 2) / lake.moistureDivisor) * lake.moistureWeight;
  }
  pending.moistureGrid[index] = clamp01(
    pending.moistureGrid[index] * 0.62
    + channel * 0.34
    + lowland * 0.16
    + lakeMoisture
  );
  pending.fertilityGrid[index] = clamp01(pending.moistureGrid[index] * 0.62 + lowland * 0.26 + (1 - channel) * 0.12);
  pending.cursor += 1;
  ctx.updateProgress(pending.cursor / ctx.total);
  if (pending.cursor >= ctx.total) {
    pending.cursor = 0;
    ctx.setPhase("biome");
  }
}

export function processBiome(ctx) {
  const pending = ctx.pending;
  const index = pending.cursor;
  const gx = index % ctx.gridSize;
  const gz = Math.floor(index / ctx.gridSize);
  const x = ctx.worldXAt(gx);
  const z = ctx.worldZAt(gz);
  const feature = ctx.featureCellAt(x, z);
  const profile = biomeProfile(
    pending.heightGrid[index],
    pending.moistureGrid[index],
    pending.temperatureGrid[index],
    pending.fertilityGrid[index],
    feature
  );
  pending.biomeGrid[index] = profile.id;
  pending.biomeCounts[profile.id] += 1;
  pending.cursor += 1;
  ctx.updateProgress(pending.cursor / ctx.total);
  if (pending.cursor >= ctx.total) ctx.completeAtomicSwap();
}
