import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { EffectComposer } from "https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/postprocessing/RenderPass.js";
import { createAutoExposureKit } from "./auto-exposure-kit.js";
import { createGodRayKit } from "./god-ray-kit.js";
import { createBloomKit } from "./bloom-kit.js";
import { createColorGradeKit } from "./color-grade-kit.js";

export const HDR_COMPOSER_KIT_ID = "open-above-hdr-composer-kit";

export function createHdrComposer(renderer, scene, camera, quality) {
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const width = Math.max(1, innerWidth || 1280);
  const height = Math.max(1, innerHeight || 720);
  const target = new THREE.WebGLRenderTarget(width, height, {
    type: THREE.HalfFloatType,
    format: THREE.RGBAFormat,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    depthBuffer: true,
    stencilBuffer: false,
    samples: quality.id === "high" ? 2 : 0
  });
  target.depthTexture = new THREE.DepthTexture(width, height, THREE.UnsignedIntType);
  target.depthTexture.format = THREE.DepthFormat;

  const composer = new EffectComposer(renderer, target);
  for (const buffer of [composer.renderTarget1, composer.renderTarget2]) {
    if (!buffer.depthTexture) {
      buffer.depthTexture = new THREE.DepthTexture(width, height, THREE.UnsignedIntType);
      buffer.depthTexture.format = THREE.DepthFormat;
    }
  }
  composer.setPixelRatio(1);
  const renderPass = new RenderPass(scene, camera);
  renderPass.name = "OpenAboveHdrSceneRenderPass";
  const autoExposure = createAutoExposureKit({ initialExposure: 1.0, adaptationRate: 1.1 });
  const godRays = createGodRayKit(quality);
  const bloom = createBloomKit(quality);
  const colorGrade = createColorGradeKit();

  composer.addPass(renderPass);
  composer.addPass(autoExposure.pass);
  composer.addPass(godRays.pass);
  composer.addPass(bloom.pass);
  composer.addPass(colorGrade.pass);

  function resize(nextWidth, nextHeight) {
    composer.setSize(Math.max(1, nextWidth), Math.max(1, nextHeight));
  }

  function update({ elapsed, deltaTime, sunWorldPosition, atmosphereDensity, cameraContext, burner }) {
    const godState = godRays.update(camera, sunWorldPosition, atmosphereDensity);
    autoExposure.updateContext({
      firstPersonBlend: cameraContext.firstPersonBlend,
      burner,
      sunFacing: godState.facing
    });
    bloom.update({ sunFacing: godState.facing * godState.onScreen, burner });
    colorGrade.update({
      exposure: autoExposure.state.currentExposure,
      elapsed,
      sunScreen: godRays.pass.material.uniforms.uSunScreen.value,
      sunStrength: godState.onScreen,
      firstPersonBlend: cameraContext.firstPersonBlend
    });
    return {
      exposure: autoExposure.state.currentExposure,
      averageLuminance: autoExposure.state.averageLuminance,
      sunFacing: godState.facing,
      sunOnScreen: godState.onScreen
    };
  }

  function render(deltaTime) {
    composer.render(deltaTime);
  }

  function dispose() {
    autoExposure.pass.dispose();
    godRays.pass.dispose();
    target.dispose();
    composer.dispose?.();
  }

  return {
    id: HDR_COMPOSER_KIT_ID,
    composer,
    renderPass,
    autoExposure,
    godRays,
    bloom,
    colorGrade,
    resize,
    update,
    render,
    dispose
  };
}

window.OpenAboveHdrComposerKit = { id: HDR_COMPOSER_KIT_ID, createHdrComposer };
