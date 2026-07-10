export const CLOUD_WEATHER_MAP_KIT_ID = "open-above-cloud-weather-map-kit";

export function createCloudWeatherMap(seed = 1) {
  const state = {
    seed: Number(seed) || 1,
    coverage: 0.58,
    type: 0.46,
    density: 0.68,
    erosion: 0.52,
    wind: [0.0105, 0.0038],
    offset: [0, 0]
  };

  function update(dt, elapsed) {
    state.offset[0] += state.wind[0] * dt;
    state.offset[1] += state.wind[1] * dt;
    state.coverage = 0.55 + Math.sin(elapsed * 0.012) * 0.06 + Math.sin(elapsed * 0.0031) * 0.035;
    state.density = 0.66 + Math.sin(elapsed * 0.008) * 0.08;
  }

  return { id: CLOUD_WEATHER_MAP_KIT_ID, state, update };
}

window.OpenAboveCloudWeatherMapKit = { id: CLOUD_WEATHER_MAP_KIT_ID, createCloudWeatherMap };
