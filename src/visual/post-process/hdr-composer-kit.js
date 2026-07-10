import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { EffectComposer } from "https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/postprocessing/RenderPass.js";
import { createAutoExposureKit } from "./auto-exposure-kit.js";
import { createGodRayKit } from "./god-ray-kit.js";
import { createBloomKit } from "./bloom-kit.js";
import { createColorGradeKit } from "./color-grade-kit.js";

export const HDR_COMPOSER_KIT_ID = "open-above-hdr-composer-kit";

function createDepthTexture(width, height) {
  const depthTexture = new THREE.DepthTexture(width, height, THREE.UnsignedIntType);
  depthTexture.format = THREE.DepthFormat;
  depthTexture.minFilter = THREE.NearestFilter;
  depthTexture.magFilter = THREE.NearestFilter;
  depthTexture.generateMipmaps = false;
  return depthTexture;
}

function installIndependentDepthTextures(composer, width, height) {
  const firstDepth = createDepthTexture(width, height);
  const secondDepth = createDepthTexture(width, height);
  composer.renderTarget1.depthTexture = firstDepth;
  composer.renderTarget2.depthTexture = secondDepth;
  composer.renderTarget1.depthBuffer = true;
  composer.renderTarget2.depthBuffer = true;
  return [firstDepth, secondDepth];
}

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
  target.depthTexture = createDepthTexture(width, height);

  const composer = new EffectComposer(renderer, target);
  const depthTextures = installIndependentDepthTextures(composer, width, height);
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
    const safeWidth = Math.max(1, nextWidth);
    const safeHeight = Math.max(1, nextHeight);
    composer.setSize(safeWidth, safeHeight);
    for (const texture of depthTextures) {
      texture.image.width = safeWidth;
      texture.image.height = safeHeight;
      texture.needsUpdate = true;
    }
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
    for (const texture of depthTextures) texture.dispose();
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
    depthTextures,
    resize,
    update,
    render,
    dispose
  };
}

window.OpenAboveHdrComposerKit = { id: HDR_COMPOSER_KIT_ID, createHdrComposer };
