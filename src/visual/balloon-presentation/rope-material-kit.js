export const ROPE_MATERIAL_KIT_ID = "open-above-rope-material-kit";

export function installRopeMaterials(balloon) {
  const rigging = balloon?.userData?.parts?.rigging;
  const materials = new Set();
  rigging?.traverse?.((node) => {
    const material = node.material;
    if (!material) return;
    const list = Array.isArray(material) ? material : [material];
    for (const mat of list) {
      if (materials.has(mat)) continue;
      materials.add(mat);
      if (mat.isMeshStandardMaterial) {
        mat.roughness = node.name.includes("grey-stripe") ? 0.66 : 0.82;
        mat.metalness = 0.03;
        mat.envMapIntensity = 0.38;
        mat.needsUpdate = true;
      }
    }
  });
  return { id: ROPE_MATERIAL_KIT_ID, materials };
}

window.OpenAboveRopeMaterialKit = { id: ROPE_MATERIAL_KIT_ID, installRopeMaterials };
