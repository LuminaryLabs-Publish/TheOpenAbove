import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export const LENS_RESPONSE_KIT_ID = "open-above-lens-response-kit";

function radialTexture(size = 128) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const context = canvas.getContext("2d");
  const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,245,220,1)");
  gradient.addColorStop(0.16, "rgba(255,190,105,.72)");
  gradient.addColorStop(0.48, "rgba(255,130,52,.16)");
  gradient.addColorStop(1, "rgba(255,110,30,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createLensResponse(scene) {
  const texture = radialTexture();
  const material = new THREE.SpriteMaterial({
    map: texture,
    color: 0xffb36a,
    transparent: true,
    opacity: 0,
    depthTest: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  const halo = new THREE.Sprite(material);
  halo.name = "open-above-sun-lens-halo";
  halo.scale.setScalar(170);
  halo.renderOrder = 10;
  scene.add(halo);

  function update(camera, sunWorldPosition, firstPersonBlend = 0) {
    halo.position.copy(sunWorldPosition);
    const cameraForward = new THREE.Vector3();
    camera.getWorldDirection(cameraForward);
    const toSun = sunWorldPosition.clone().sub(camera.position).normalize();
    const facing = cameraForward.dot(toSun);
    const strength = THREE.MathUtils.smoothstep(facing, 0.64, 0.995);
    material.opacity = strength * THREE.MathUtils.lerp(0.2, 0.12, firstPersonBlend);
    halo.visible = facing > 0.58;
    return { facing, strength };
  }

  return { id: LENS_RESPONSE_KIT_ID, halo, material, update };
}

window.OpenAboveLensResponseKit = { id: LENS_RESPONSE_KIT_ID, createLensResponse };
