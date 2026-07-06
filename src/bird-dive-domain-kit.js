import "./bird-flight-input-kit.js";
import "./bird-flight-physics-kit.js";
import "./bird-flight-frame-kit.js";
import "./bird-posture-kit.js";
import "./bird-camera-kit.js";

export const BIRD_DIVE_DOMAIN_KIT_ID = "open-above-bird-dive-domain-kit";

window.OpenAboveBirdDiveDomainKit = {
  id: BIRD_DIVE_DOMAIN_KIT_ID,
  composedKits: [
    "open-above-bird-flight-input-kit",
    "open-above-bird-flight-physics-kit",
    "open-above-bird-flight-frame-kit",
    "open-above-bird-posture-kit",
    "open-above-bird-camera-kit"
  ]
};
