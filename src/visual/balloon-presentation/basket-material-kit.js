import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export const BASKET_MATERIAL_KIT_ID = "open-above-basket-material-kit";

function weaveTexture(size = 128) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const context = canvas.getContext("2d");
  context.fillStyle = "rgb(120,120,120)";
  context.fillRect(0, 0, size, size);
  for (let y = 0; y < size; y += 8) {
    context.fillStyle = y % 16 === 0 ? "rgb(190,190,190)" : "rgb(72,72,72)";
    context.fillRect(0, y, size, 3);
  }
  for (let x = 0; x < size; x += 10) {
    context.fillStyle = x % 20 === 0 ? "rgba(210,210,210,.65)" : "rgba(58,58,58,.55)";
    context.fillRect(x, 0, 3, size);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(5, 4);
  texture.needsUpdate = true;
  return texture;
}

export function installBasketMaterials(balloon) {
  const basket = balloon?.userData?.parts?.basket;
  const texture = weaveTexture();
  const materials = new Set();
  basket?.traverse?.((node) => {
    if (!node.isMesh || !node.material) return;
    const list = Array.isArray(node.material) ? node.material : [node.material];
    for (const material of list) {
      if (!material.isMeshStandardMaterial || materials.has(material)) continue;
      materials.add(material);
      if (node.name.includes("woven") || node.name.includes("basket")) {
        material.bumpMap = texture;
        material.bumpScale = 0.055;
      }
      material.roughness = Math.max(material.roughness ?? 0.8, 0.78);
      material.envMapIntensity = 0.45;
      material.needsUpdate = true;
    }
  });
  return { id: BASKET_MATERIAL_KIT_ID, texture, materials };
}

window.OpenAboveBasketMaterialKit = { id: BASKET_MATERIAL_KIT_ID, installBasketMaterials };
