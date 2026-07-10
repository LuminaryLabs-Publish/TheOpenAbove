export const QUALITY_TIER_KIT_ID = "open-above-quality-tier-kit";

const QUALITY = {
  high: {
    id: "high",
    pixelRatioCap: 1.6,
    dynamicScale: 1,
    terrainSegments: 168,
    cloudSteps: 36,
    cloudLightSteps: 6,
    treeCount: 520,
    grassCount: 3600,
    bloomStrength: 0.82,
    godRaySamples: 44,
    shadowMapSize: 2048
  },
  medium: {
    id: "medium",
    pixelRatioCap: 1.35,
    dynamicScale: 0.86,
    terrainSegments: 136,
    cloudSteps: 26,
    cloudLightSteps: 4,
    treeCount: 340,
    grassCount: 2100,
    bloomStrength: 0.68,
    godRaySamples: 32,
    shadowMapSize: 1024
  },
  low: {
    id: "low",
    pixelRatioCap: 1.05,
    dynamicScale: 0.72,
    terrainSegments: 96,
    cloudSteps: 14,
    cloudLightSteps: 2,
    treeCount: 180,
    grassCount: 900,
    bloomStrength: 0.48,
    godRaySamples: 20,
    shadowMapSize: 768
  }
};

export function detectQualityTier() {
  const memory = Number(navigator.deviceMemory || 4);
  const cores = Number(navigator.hardwareConcurrency || 4);
  const mobile = matchMedia?.("(pointer: coarse)")?.matches ?? false;
  const narrow = Math.min(innerWidth || 1280, innerHeight || 720) < 620;
  if (mobile || narrow || memory <= 3 || cores <= 4) return { ...QUALITY.low };
  if (memory <= 6 || cores <= 8) return { ...QUALITY.medium };
  return { ...QUALITY.high };
}

export function createDynamicResolutionController(renderer, composer, initialTier) {
  const state = {
    tier: initialTier,
    scale: initialTier.dynamicScale,
    smoothedMs: 16.7,
    sampleFrames: 0
  };

  function resize(width, height) {
    const dpr = Math.min(devicePixelRatio || 1, state.tier.pixelRatioCap);
    const effectivePixelRatio = dpr * state.scale;
    renderer.setPixelRatio(effectivePixelRatio);
    renderer.setSize(width, height, false);
    composer?.setPixelRatio?.(effectivePixelRatio);
    composer?.setSize?.(width, height);
  }

  function sample(frameMs, width, height) {
    state.smoothedMs += (frameMs - state.smoothedMs) * 0.045;
    state.sampleFrames += 1;
    if (state.sampleFrames < 90) return false;
    state.sampleFrames = 0;
    const before = state.scale;
    if (state.smoothedMs > 23 && state.scale > 0.62) state.scale = Math.max(0.62, state.scale - 0.08);
    else if (state.smoothedMs < 14.5 && state.scale < state.tier.dynamicScale) state.scale = Math.min(state.tier.dynamicScale, state.scale + 0.05);
    if (Math.abs(before - state.scale) > 0.001) {
      resize(width, height);
      return true;
    }
    return false;
  }

  return { state, resize, sample };
}

window.OpenAboveQualityTierKit = { id: QUALITY_TIER_KIT_ID, detectQualityTier, createDynamicResolutionController };
