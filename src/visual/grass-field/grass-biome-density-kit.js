export const GRASS_BIOME_DENSITY_KIT_ID = "open-above-grass-biome-density-kit";
export const GRASS_SPECIES_COUNT = 5;
export const GRASS_SPECIES_IDS = Object.freeze([
  "emerald",
  "meadow",
  "spring",
  "olive",
  "golden"
]);

export function sampleGrassDensity({ height, moisture, slope }) {
  if (moisture > 0.9 || slope > 0.42 || height > 128) return { biomeId: 0, density: 0, species: 0 };
  if (moisture > 0.68) return { biomeId: 1, density: 0.8, species: 0 };
  if (height > 76) return { biomeId: 3, density: 0.58, species: 3 };
  if (moisture < 0.3 && height > 28) return { biomeId: 4, density: 0.7, species: 4 };
  if (moisture > 0.46) return { biomeId: 2, density: 0.94, species: 2 };
  return { biomeId: 1, density: 0.88, species: 1 };
}

if (typeof window !== "undefined") {
  window.OpenAboveGrassBiomeDensityKit = {
    id: GRASS_BIOME_DENSITY_KIT_ID,
    GRASS_SPECIES_COUNT,
    GRASS_SPECIES_IDS,
    sampleGrassDensity
  };
}
