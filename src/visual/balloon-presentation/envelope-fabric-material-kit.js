import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export const ENVELOPE_FABRIC_MATERIAL_KIT_ID = "open-above-envelope-fabric-material-kit";

function fabricTexture(size = 128) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const context = canvas.getContext("2d");
  context.fillStyle = "rgb(128,128,128)";
  context.fillRect(0, 0, size, size);
  context.globalAlpha = 0.26;
  for (let i = 0; i < size; i += 4) {
    context.fillStyle = i % 8 === 0 ? "rgb(170,170,170)" : "rgb(88,88,88)";
    context.fillRect(i, 0, 1, size);
    context.fillRect(0, i, size, 1);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 14);
  texture.needsUpdate = true;
  return texture;
}

function isFabricPart(node) {
  return node.name.includes("envelope-unified-gore-shell")
    || node.name.includes("fabric-mouth-skirt")
    || node.name.includes("load-tape");
}

export function installEnvelopeFabricMaterials(balloon) {
  const envelope = balloon?.userData?.parts?.envelope;
  const texture = fabricTexture();
  const shaderStates = [];
  const materials = new Set();
  envelope?.traverse?.((node) => {
    if (!node.isMesh || !node.material || !isFabricPart(node)) return;
    const list = Array.isArray(node.material) ? node.material : [node.material];
    for (const material of list) {
      if (!material.isMeshStandardMaterial || materials.has(material)) continue;
      materials.add(material);
      material.bumpMap = texture;
      material.bumpScale = node.name.includes("load-tape") ? 0.012 : 0.025;
      material.roughness = Math.min(0.94, Math.max(0.72, material.roughness ?? 0.86));
      material.metalness = 0;
      material.emissive = new THREE.Color(0x1c0700);
      material.emissiveIntensity = 0;
      material.onBeforeCompile = (shader) => {
        shader.uniforms.uFabricTime = { value: 0 };
        shader.vertexShader = shader.vertexShader.replace(
          "#include <common>",
          `#include <common>\nuniform float uFabricTime;`
        ).replace(
          "#include <begin_vertex>",
          `#include <begin_vertex>
           float fabricWave = sin(position.y * 4.2 + position.x * 2.1 + uFabricTime * 0.8) * 0.005;
           transformed += objectNormal * fabricWave;`
        );
        shaderStates.push(shader);
      };
      material.customProgramCacheKey = () => "open-above-fabric-v2";
      material.needsUpdate = true;
    }
  });

  function update(elapsed, burnerHeat = 0.18) {
    for (const shader of shaderStates) shader.uniforms.uFabricTime.value = elapsed;
    const warmth = Math.max(0, Math.min(1, burnerHeat));
    for (const material of materials) {
      material.emissive.setRGB(0.34, 0.055, 0.005);
      material.emissiveIntensity = warmth * 0.18;
    }
  }

  return { id: ENVELOPE_FABRIC_MATERIAL_KIT_ID, texture, materials, update };
}

window.OpenAboveEnvelopeFabricMaterialKit = { id: ENVELOPE_FABRIC_MATERIAL_KIT_ID, installEnvelopeFabricMaterials };
