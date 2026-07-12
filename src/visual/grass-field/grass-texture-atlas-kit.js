import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { hashGrassSeed, seedFloat } from "./grass-world-seed-kit.js";
import { GRASS_SPECIES_COUNT, GRASS_SPECIES_IDS } from "./grass-biome-density-kit.js";

export const GRASS_TEXTURE_ATLAS_KIT_ID = "open-above-grass-texture-atlas-kit";
export const GRASS_TEXTURE_VARIANTS = GRASS_SPECIES_COUNT;

const SPECIES = Object.freeze([
  Object.freeze({ id: "emerald", hue: [112, 132], saturation: [52, 72], lightness: [30, 52], blades: [38, 50], height: [0.36, 0.7], width: [3.6, 7.8], lean: 20, seedHeads: 0 }),
  Object.freeze({ id: "meadow", hue: [92, 116], saturation: [48, 66], lightness: [39, 59], blades: [32, 46], height: [0.4, 0.82], width: [2.8, 6.6], lean: 28, seedHeads: 0 }),
  Object.freeze({ id: "spring", hue: [72, 98], saturation: [62, 78], lightness: [48, 68], blades: [40, 50], height: [0.34, 0.72], width: [2.1, 4.8], lean: 34, seedHeads: 0 }),
  Object.freeze({ id: "olive", hue: [58, 78], saturation: [35, 55], lightness: [40, 61], blades: [24, 38], height: [0.48, 0.9], width: [2.4, 5.2], lean: 18, seedHeads: 3 }),
  Object.freeze({ id: "golden", hue: [42, 65], saturation: [58, 78], lightness: [49, 70], blades: [20, 34], height: [0.55, 0.96], width: [1.8, 4.2], lean: 24, seedHeads: 4 })
]);

function hsla(hue, saturation, lightness, alpha) {
  return `hsla(${Math.round(hue)}, ${Math.round(saturation)}%, ${Math.round(lightness)}%, ${alpha.toFixed(3)})`;
}

function bladePaint(context, profile, random, depth, baseY, height) {
  const hue = profile.hue[0] + random * (profile.hue[1] - profile.hue[0]);
  const saturation = profile.saturation[0] + random * (profile.saturation[1] - profile.saturation[0]);
  const lightness = profile.lightness[0] + random * (profile.lightness[1] - profile.lightness[0]) - depth * 2;
  const gradient = context.createLinearGradient(0, baseY, 0, baseY - height);
  gradient.addColorStop(0, hsla(hue - 4, saturation * 0.82, Math.max(24, lightness - 14), 0.9));
  gradient.addColorStop(0.58, hsla(hue, saturation, lightness, 0.92));
  gradient.addColorStop(1, hsla(hue + 3, Math.min(86, saturation + 6), Math.min(78, lightness + 10), 0.84));
  return gradient;
}

function drawBlade(context, baseX, baseY, height, width, lean, paint) {
  context.beginPath();
  context.moveTo(baseX - width * 0.5, baseY);
  context.quadraticCurveTo(baseX + lean * 0.25, baseY - height * 0.55, baseX + lean, baseY - height);
  context.quadraticCurveTo(baseX + lean * 0.58, baseY - height * 0.44, baseX + width * 0.5, baseY);
  context.closePath();
  context.fillStyle = paint;
  context.fill();
}

function drawSeedHead(context, x, y, profile, random, angle) {
  const hue = profile.hue[0] + random * (profile.hue[1] - profile.hue[0]);
  context.save();
  context.translate(x, y);
  context.rotate(angle);
  context.fillStyle = hsla(hue - 5, profile.saturation[0] + 8, profile.lightness[1] + 3, 0.88);
  for (let index = -2; index <= 2; index += 1) {
    context.beginPath();
    context.ellipse(index * 2.1, Math.abs(index) * 0.5, 1.6, 4.6, index * 0.16, 0, Math.PI * 2);
    context.fill();
  }
  context.restore();
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
    const profile = SPECIES[variant];
    const seed = hashGrassSeed(worldSeed, 601, variant);
    const bladeCount = profile.blades[0] + Math.floor(seedFloat(seed, 0) * (profile.blades[1] - profile.blades[0] + 1));
    const tileX = variant * tileWidth;
    variants.push({ id: variant, species: GRASS_SPECIES_IDS[variant], bladeCount });

    for (let depth = 0; depth < 3; depth += 1) {
      for (let blade = depth; blade < bladeCount; blade += 3) {
        const lane = depth * 128 + blade * 7;
        const x = tileX + 5 + seedFloat(seed, lane + 1) * (tileWidth - 10);
        const heightRatio = profile.height[0] + seedFloat(seed, lane + 2) * (profile.height[1] - profile.height[0]);
        const height = tileHeight * Math.max(0.24, heightRatio - depth * 0.035);
        const width = profile.width[0] + seedFloat(seed, lane + 3) * (profile.width[1] - profile.width[0]);
        const lean = (seedFloat(seed, lane + 4) - 0.5) * profile.lean * 2;
        const paint = bladePaint(context, profile, seedFloat(seed, lane + 5), depth, tileHeight - 2, height);
        drawBlade(context, x, tileHeight - 2, height, width, lean, paint);

        if (profile.seedHeads && blade < profile.seedHeads * 3 && blade % 3 === depth) {
          drawSeedHead(
            context,
            x + lean,
            tileHeight - 2 - height,
            profile,
            seedFloat(seed, lane + 6),
            lean * 0.012
          );
        }
      }
    }

    const baseHue = (profile.hue[0] + profile.hue[1]) * 0.5;
    context.fillStyle = hsla(baseHue, profile.saturation[0], Math.max(28, profile.lightness[0] - 8), 0.72);
    context.beginPath();
    context.ellipse(tileX + tileWidth * 0.5, tileHeight - 3, tileWidth * 0.47, 9, 0, 0, Math.PI * 2);
    context.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.name = "open-above-five-species-grass-atlas";
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

if (typeof window !== "undefined") {
  window.OpenAboveGrassTextureAtlasKit = {
    id: GRASS_TEXTURE_ATLAS_KIT_ID,
    GRASS_TEXTURE_VARIANTS,
    createGrassTextureAtlas
  };
}
