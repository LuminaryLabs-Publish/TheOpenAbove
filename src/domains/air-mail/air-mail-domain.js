import { createMailDeliveryDomain } from "../../gameplay/mail-delivery-domain/index.js";
import { createDefaultMailRoute } from "../../gameplay/mail-delivery-domain/mail-route-kit.js";

export const AIR_MAIL_DOMAIN_ID = "open-above-air-mail-domain";

export function createAirMailDomain({ route = createDefaultMailRoute() } = {}) {
  let runtime = null;

  function mount({ scene, terrainHeight } = {}) {
    runtime = createMailDeliveryDomain({ scene, terrainHeight, route });
    return api;
  }

  const api = {
    id: AIR_MAIL_DOMAIN_ID,
    route,
    mount,
    update(position, airstreamSample, elapsed = 0) {
      return runtime?.update(position, airstreamSample, elapsed) ?? null;
    },
    snapshot: () => runtime?.snapshot?.() ?? null,
    reset: () => runtime?.reset?.() ?? null,
    get towns() { return runtime?.towns ?? route.towns; },
    get parcel() { return runtime?.parcel ?? route.parcel; },
    get runtime() { return runtime; },
    dispose() { runtime?.dispose?.(); }
  };
  return Object.freeze(api);
}
