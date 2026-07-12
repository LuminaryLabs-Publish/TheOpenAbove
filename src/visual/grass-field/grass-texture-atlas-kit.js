import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { hashGrassSeed, seedFloat } from "./grass-world-seed-kit.js";

export const GRASS_TEXTURE_ATLAS_KIT_ID = "open-above-grass-texture-atlas-kit";
export const GRASS_TEXTURE_VARIANTS = 8;

function bladeColor(random, depth) {
  const lightness = 71 + Math.floor(random * 19) - depth * 3;
  return `hsla(${78 + Math.floor(random * 20)}, 42%, ${lightness}%, ${0.7 + random * 0.28})`;
}

function drawBlade(context, baseX, baseY, height, width, lean, color) {
  context.beginPath();
  context.moveTo(baseX - width * 0.5, baseY);
  context.quadraticCurveTo(baseX + lean * 0.3, baseY - height * 0.54, baseX + lean, baseY - height);
  context.quadraticCurveTo(baseX + lean * 0.62, baseY - height * 0.46, baseX + width * 0.5, baseY);
  context.closePath();
  context.fillStyle = color;
  context.fill();
}

export function createGrassTextureAtlas(worldSeed = 1) {
  const tileWidth = 128;
  const tileHeight = 256;
  const canvas = document.createElement("canvas");
  canvas.width = tileWidth * GRASS_TEXTURE_VARIANTS;
  canvas.height = tileHeight;
  const context = canvas.getContext("2d");
  const variants = [];

  for (let variant = 0; variant < GRASS_TEXTURE_VARIANTS; variant += 1) {
    const seed = hashGrassSeed(worldSeed, 601, variant);
    const bladeCount = 20 + Math.floor(seedFloat(seed, 0) * 31);
    const tileX = variant * tileWidth;
    variants.push({ id: variant, bladeCount });

    for (let depth = 0; depth < 3; depth += 1) {
      for (let blade = depth; blade < bladeCount; blade += 3) {
        const lane = depth * 64 + blade * 5;
        const x = tileX + 5 + seedFloat(seed, lane + 1) * (tileWidth - 10);
        const height = tileHeight * (0.38 + seedFloat(seed, lane + 2) * (0.57 - depth * 0.035));
        const width = 2.2 + seedFloat(seed, lane + 3) * 5.2;
        const lean = (seedFloat(seed, lane + 4) - 0.5) * 30;
        drawBlade(context, x, tileHeight - 2, height, width, lean, bladeColor(seedFloat(seed, lane + 5), depth));
      }
    }

    context.fillStyle = "rgba(191, 221, 151, 0.76)";
    context.beginPath();
    context.ellipse(tileX + tileWidth * 0.5, tileHeight - 3, tileWidth * 0.46, 9, 0, 0, Math.PI * 2);
    context.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.name = "open-above-dense-grass-atlas";
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return { texture, canvas, variants, variantCount: GRASS_TEXTURE_VARIANTS };
}

window.OpenAboveGrassTextureAtlasKit = {
  id: GRASS_TEXTURE_ATLAS_KIT_ID,
  GRASS_TEXTURE_VARIANTS,
  createGrassTextureAtlas
};
