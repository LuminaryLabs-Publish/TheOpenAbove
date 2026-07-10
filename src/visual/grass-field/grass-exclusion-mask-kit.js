export const GRASS_EXCLUSION_MASK_KIT_ID = "open-above-grass-exclusion-mask-kit";

export function grassExcluded({ x, z, moisture, slope }) {
  if (moisture > 0.86 || slope > 0.42) return true;
  if (Math.hypot(x, z) < 95) return true;
  const road = Math.abs(Math.sin(x * 0.0037) * 175 + z * 0.115);
  return road < 14;
}

window.OpenAboveGrassExclusionMaskKit = { id: GRASS_EXCLUSION_MASK_KIT_ID, grassExcluded };
