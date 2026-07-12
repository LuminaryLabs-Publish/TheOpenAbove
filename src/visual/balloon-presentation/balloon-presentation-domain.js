import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { installEnvelopeFabricMaterials } from "./envelope-fabric-material-kit.js";
import { installBasketMaterials } from "./basket-material-kit.js";
import { installRopeMaterials } from "./rope-material-kit.js";
import { installBurnerIllumination } from "./burner-illumination-kit.js";

export const BALLOON_PRESENTATION_DOMAIN_ID = "open-above-balloon-presentation-domain";

const clamp = (value, min, max) => Math.max(min, Math.min(max, Number(value) || 0));
const smooth = (rate, dt) => 1 - Math.exp(-rate * Math.max(0, dt));

export function createBalloonPresentationDomain(balloon) {
  const envelope = installEnvelopeFabricMaterials(balloon);
  const basket = installBasketMaterials(balloon);
  const ropes = installRopeMaterials(balloon);
  const burner = installBurnerIllumination(balloon);
  const parts = balloon?.userData?.parts ?? {};
  const envelopePivot = parts.envelopePivot;
  const gondolaPivot = parts.gondolaPivot;
  const mouth = parts.envelope?.userData?.parts?.mouth;
  const state = {
    lastElapsed: 0,
    envelopeBank: 0,
    envelopePitch: 0,
    gondolaBank: 0,
    gondolaPitch: 0,
    gondolaOffsetX: 0
  };

  function update(flightStateOrElapsed, fallbackHeat = 0.18) {
    const flightState = typeof flightStateOrElapsed === "object"
      ? flightStateOrElapsed
      : { elapsed: Number(flightStateOrElapsed) || 0, burner: fallbackHeat };
    const elapsed = Number(flightState.elapsed) || 0;
    const dt = clamp(elapsed - state.lastElapsed, 0, 1 / 20);
    state.lastElapsed = elapsed;
    const heat = clamp(flightState.burner ?? fallbackHeat, 0, 1);
    const bank = clamp(flightState.visualBank, -0.14, 0.14);
    const trim = clamp(flightState.lateralTrim, -4, 4);
    const acceleration = clamp(flightState.lateralAcceleration, -8, 8);
    const vertical = clamp(flightState.verticalVelocity, -8, 8);
    const slowSway = Math.sin(elapsed * 0.48) * 0.012 + Math.sin(elapsed * 0.21) * 0.008;

    state.envelopeBank = THREE.MathUtils.lerp(state.envelopeBank, bank * 0.42 - acceleration * 0.003, smooth(1.8, dt));
    state.envelopePitch = THREE.MathUtils.lerp(state.envelopePitch, -vertical * 0.0045 + slowSway, smooth(1.5, dt));
    state.gondolaBank = THREE.MathUtils.lerp(state.gondolaBank, bank * 1.35 - trim * 0.008, smooth(2.3, dt));
    state.gondolaPitch = THREE.MathUtils.lerp(state.gondolaPitch, vertical * 0.006 - slowSway * 1.5, smooth(2.0, dt));
    state.gondolaOffsetX = THREE.MathUtils.lerp(state.gondolaOffsetX, -trim * 0.025, smooth(2.2, dt));

    if (envelopePivot) {
      envelopePivot.rotation.x = state.envelopePitch;
      envelopePivot.rotation.z = state.envelopeBank;
      envelopePivot.scale.y = 1 - heat * 0.0025 + Math.sin(elapsed * 0.7) * 0.0015;
    }
    if (gondolaPivot) {
      gondolaPivot.rotation.x = state.gondolaPitch;
      gondolaPivot.rotation.z = state.gondolaBank;
      gondolaPivot.position.x = state.gondolaOffsetX;
      gondolaPivot.position.y = -heat * 0.016;
    }

    const innerMaterial = mouth?.userData?.innerMaterial;
    if (innerMaterial) innerMaterial.emissiveIntensity = 0.12 + heat * 0.72;
    envelope.update(elapsed, heat);
    burner.update(elapsed, heat);
    return { ...state };
  }

  return {
    id: BALLOON_PRESENTATION_DOMAIN_ID,
    kits: { envelope, basket, ropes, burner },
    state,
    update
  };
}

window.OpenAboveBalloonPresentationDomain = { id: BALLOON_PRESENTATION_DOMAIN_ID, createBalloonPresentationDomain };
