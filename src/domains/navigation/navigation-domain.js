import { createParchmentMapOverlay } from "../../ui/parchment-map-overlay.js";

export const NAVIGATION_DOMAIN_ID = "open-above-navigation-domain";

export function createNavigationDomain({ root, canvas, worldSurface, routes = [] } = {}) {
  let overlay = null;

  function mount({ world, getPlayerState, getSnapPoints, getCaptureState } = {}) {
    overlay = createParchmentMapOverlay({
      root,
      canvas,
      worldSurface,
      world,
      routes,
      getPlayerState,
      getSnapPoints,
      getCaptureState
    });
    return api;
  }

  const api = {
    id: NAVIGATION_DOMAIN_ID,
    routes,
    mount,
    isMapOpen: () => overlay?.isOpen?.() ?? false,
    setMapOpen: (open) => overlay?.setOpen?.(open) ?? false,
    refresh: () => overlay?.refreshWorldMap?.() ?? false,
    snapshot: () => overlay?.snapshot?.() ?? Object.freeze({ open: false, mappedWorld: false, worldRevision: -1 }),
    get overlay() { return overlay; },
    dispose() { overlay?.dispose?.(); }
  };
  return Object.freeze(api);
}
