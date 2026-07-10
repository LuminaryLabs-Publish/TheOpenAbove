export const GRASS_BIOME_DENSITY_KIT_ID = "open-above-grass-biome-density-kit";

export function sampleGrassDensity({ height, moisture, slope }) {
  if (moisture > 0.86 || slope > 0.42 || height > 125) return { biomeId: 0, density: 0, species: 0 };
  if (moisture > 0.58) return { biomeId: 2, density: 0.74, species: 2 };
  if (height > 72) return { biomeId: 3, density: 0.44, species: 1 };
  return { biomeId: 1, density: 0.92, species: 0 };
}

window.OpenAboveGrassBiomeDensityKit = { id: GRASS_BIOME_DENSITY_KIT_ID, sampleGrassDensity };
