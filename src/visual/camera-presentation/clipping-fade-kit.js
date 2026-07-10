export const CLIPPING_FADE_KIT_ID = "open-above-clipping-fade-kit";

function setMaterialOpacity(root, opacity) {
  root?.traverse?.((node) => {
    const material = node.material;
    if (!material) return;
    const materials = Array.isArray(material) ? material : [material];
    for (const mat of materials) {
      if (mat.userData.openAboveBaseOpacity === undefined) mat.userData.openAboveBaseOpacity = mat.opacity ?? 1;
      mat.transparent = opacity < 0.999 || mat.transparent;
      mat.opacity = mat.userData.openAboveBaseOpacity * opacity;
    }
  });
}

export function createClippingFadeKit(balloon) {
  function update(firstPersonBlend) {
    const parts = balloon?.userData?.parts;
    if (!parts) return;
    parts.envelope.visible = true;
    parts.rigging.visible = true;
    const ropeFade = 1 - smoothstep(0.72, 1, firstPersonBlend) * 0.72;
    setMaterialOpacity(parts.rigging, ropeFade);
  }
  return { id: CLIPPING_FADE_KIT_ID, update };
}

function smoothstep(edge0, edge1, value) {
  const t = Math.max(0, Math.min(1, (value - edge0) / Math.max(0.0001, edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

window.OpenAboveClippingFadeKit = { id: CLIPPING_FADE_KIT_ID, createClippingFadeKit };
