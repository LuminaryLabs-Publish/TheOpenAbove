import { installEnvelopeFabricMaterials } from "./envelope-fabric-material-kit.js";
import { installBasketMaterials } from "./basket-material-kit.js";
import { installRopeMaterials } from "./rope-material-kit.js";
import { installBurnerIllumination } from "./burner-illumination-kit.js";

export const BALLOON_PRESENTATION_DOMAIN_ID = "open-above-balloon-presentation-domain";

export function createBalloonPresentationDomain(balloon) {
  const envelope = installEnvelopeFabricMaterials(balloon);
  const basket = installBasketMaterials(balloon);
  const ropes = installRopeMaterials(balloon);
  const burner = installBurnerIllumination(balloon);

  function update(elapsed, heat) {
    envelope.update(elapsed, heat);
    burner.update(elapsed, heat);
  }

  return {
    id: BALLOON_PRESENTATION_DOMAIN_ID,
    kits: { envelope, basket, ropes, burner },
    update
  };
}

window.OpenAboveBalloonPresentationDomain = { id: BALLOON_PRESENTATION_DOMAIN_ID, createBalloonPresentationDomain };
