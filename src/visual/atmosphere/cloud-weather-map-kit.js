export const CLOUD_WEATHER_MAP_KIT_ID = "open-above-cloud-weather-map-kit";

function aggregateLayers(layers = []) {
  const shadowLayers = layers.filter((layer) => layer.kind !== "cirrus" && layer.kind !== "ground-fog");
  const source = shadowLayers.length > 0 ? shadowLayers : layers;
  const totalWeight = source.reduce((sum, layer) => sum + Math.max(0.001, Number(layer.opacity ?? 1)), 0);
  const weighted = (field, fallback) => totalWeight <= 0
    ? fallback
    : source.reduce((sum, layer) => sum + Number(layer[field] ?? fallback) * Math.max(0.001, Number(layer.opacity ?? 1)), 0) / totalWeight;
  const anchor = source.find((layer) => layer.kind === "mid-cloud") ?? source[0] ?? null;
  return {
    coverage: weighted("coverage", 0.12),
    density: weighted("density", 0.2),
    offset: anchor ? [Number(anchor.offset?.x ?? 0), Number(anchor.offset?.z ?? 0)] : [0, 0],
    groundFog: layers.find((layer) => layer.kind === "ground-fog") ?? null
  };
}

export function createCloudWeatherMap(seed = 1, { weather = null, layeredWeather = null } = {}) {
  const state = {
    seed: Number(seed) || 1,
    coverage: 0.18,
    type: 0.46,
    density: 0.28,
    erosion: 0.52,
    wind: [0.0105, 0.0038],
    offset: [0, 0],
    layers: [],
    groundFog: null,
    snapshot: null
  };

  function update(dt, elapsed, altitude = 0) {
    if (weather?.advance && layeredWeather?.advance) {
      const weatherSnapshot = weather.advance(dt);
      const layeredSnapshot = layeredWeather.advance(0, weatherSnapshot);
      const aggregate = aggregateLayers(layeredSnapshot.layers);
      state.layers = layeredSnapshot.layers;
      state.coverage = Math.max(0.01, aggregate.coverage);
      state.density = Math.max(0.005, aggregate.density);
      state.offset = aggregate.offset;
      state.groundFog = aggregate.groundFog;
      state.snapshot = {
        ...layeredSnapshot,
        altitude,
        composition: layeredWeather.composeAtAltitude?.(altitude) ?? null
      };
      return state;
    }

    state.offset[0] += state.wind[0] * dt;
    state.offset[1] += state.wind[1] * dt;
    state.coverage = Math.max(0.01, 0.16 + Math.sin(elapsed * 0.012) * 0.025 + Math.sin(elapsed * 0.0031) * 0.012);
    state.density = Math.max(0.005, 0.24 + Math.sin(elapsed * 0.008) * 0.035);
    return state;
  }

  return { id: CLOUD_WEATHER_MAP_KIT_ID, state, update };
}

if (typeof window !== "undefined") {
  window.OpenAboveCloudWeatherMapKit = { id: CLOUD_WEATHER_MAP_KIT_ID, createCloudWeatherMap };
}
