import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { hashGrassSeed, seedFloat } from "../grass-field/grass-world-seed-kit.js";
import { FLOWER_TYPE_COUNT } from "./flower-chunk-placement-kit.js";

export const FLOWER_TEXTURE_ATLAS_KIT_ID = "open-above-flower-texture-atlas-kit";

const FLOWERS = Object.freeze([
  Object.freeze({ id: "daisy", petals: 8, petal: "#f8f3df", center: "#efc84f", stem: "#4f8d4a" }),
  Object.freeze({ id: "buttercup", petals: 6, petal: "#ffd84c", center: "#d79a28", stem: "#568c42" }),
  Object.freeze({ id: "poppy", petals: 5, petal: "#e95735", center: "#4c332d", stem: "#487c43" }),
  Object.freeze({ id: "cornflower", petals: 9, petal: "#4f86d9", center: "#294a87", stem: "#4f8148" }),
  Object.freeze({ id: "clover", petals: 7, petal: "#b86bb6", center: "#f0b4d9", stem: "#488246" })
]);

function drawFlowerHead(context, x, y, radius, profile, rotation) {
  context.save();
  context.translate(x, y);
  context.rotate(rotation);
  context.fillStyle = profile.petal;
  for (let petal = 0; petal < profile.petals; petal += 1) {
    const angle = petal / profile.petals * Math.PI * 2;
    context.save();
    context.rotate(angle);
    context.beginPath();
    context.ellipse(radius * 0.72, 0, radius * 0.72, radius * 0.38, 0, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }
  context.fillStyle = profile.center;
  context.beginPath();
  context.arc(0, 0, radius * 0.44, 0, Math.PI * 2);
  context.fill();
  context.restore();
}

export function createFlowerTextureAtlas(worldSeed = 1) {
  const tileWidth = 96;
  const tileHeight = 192;
  const canvas = document.createElement("canvas");
  canvas.width = tileWidth * FLOWER_TYPE_COUNT;
  canvas.height = tileHeight;
  const context = canvas.getContext("2d");
  context.lineCap = "round";
  const variants = [];

  for (let type = 0; type < FLOWER_TYPE_COUNT; type += 1) {
    const profile = FLOWERS[type];
    const seed = hashGrassSeed(worldSeed, 7901, type);
    const flowerCount = 3 + Math.floor(seedFloat(seed, 0) * 7);
    const tileX = type * tileWidth;
    variants.push({ id: type, type: profile.id, flowerCount });

    for (let flower = 0; flower < flowerCount; flower += 1) {
      const lane = flower * 11;
      const x = tileX + 10 + seedFloat(seed, lane + 1) * (tileWidth - 20);
      const height = tileHeight * (0.35 + seedFloat(seed, lane + 2) * 0.52);
      const lean = (seedFloat(seed, lane + 3) - 0.5) * 22;
      const topX = x + lean;
      const topY = tileHeight - 4 - height;
      context.strokeStyle = profile.stem;
      context.lineWidth = 1.4 + seedFloat(seed, lane + 4) * 1.4;
      context.beginPath();
      context.moveTo(x, tileHeight - 3);
      context.quadraticCurveTo(x + lean * 0.35, tileHeight - height * 0.48, topX, topY);
      context.stroke();

      const radius = 3.4 + seedFloat(seed, lane + 5) * 3.2;
      drawFlowerHead(context, topX, topY, radius, profile, seedFloat(seed, lane + 6) * Math.PI * 2);
    }

    context.fillStyle = "rgba(63, 117, 58, 0.66)";
    context.beginPath();
    context.ellipse(tileX + tileWidth * 0.5, tileHeight - 3, tileWidth * 0.44, 6, 0, 0, Math.PI * 2);
    context.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.name = "open-above-five-flower-atlas";
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return { texture, canvas, variants, variantCount: FLOWER_TYPE_COUNT };
}

if (typeof window !== "undefined") {
  window.OpenAboveFlowerTextureAtlasKit = {
    id: FLOWER_TEXTURE_ATLAS_KIT_ID,
    createFlowerTextureAtlas
  };
}
