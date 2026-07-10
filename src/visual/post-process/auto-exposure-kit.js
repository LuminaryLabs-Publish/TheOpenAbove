import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { Pass, FullScreenQuad } from "https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/postprocessing/Pass.js";

export const AUTO_EXPOSURE_KIT_ID = "open-above-auto-exposure-kit";

const vertexShader = /* glsl */`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = /* glsl */`
uniform sampler2D tDiffuse;
varying vec2 vUv;
float luminance(vec3 color) {
  return dot(color, vec3(0.2126, 0.7152, 0.0722));
}
void main() {
  float sumLog = 0.0;
  for (int y = 0; y < 8; y++) {
    for (int x = 0; x < 8; x++) {
      vec2 sampleUv = (vec2(float(x), float(y)) + 0.5) / 8.0;
      float lum = max(0.0001, luminance(texture2D(tDiffuse, sampleUv).rgb));
      sumLog += log2(lum);
    }
  }
  float averageLog = sumLog / 64.0;
  float encoded = clamp((averageLog + 8.0) / 16.0, 0.0, 1.0);
  gl_FragColor = vec4(encoded, encoded, encoded, 1.0);
}
`;

export class AutoExposurePass extends Pass {
  constructor(profile = {}) {
    super();
    this.needsSwap = false;
    this.state = {
      currentExposure: profile.initialExposure ?? 1.05,
      targetExposure: profile.initialExposure ?? 1.05,
      averageLuminance: 0.18,
      adaptationRate: profile.adaptationRate ?? 1.25,
      contextBias: 1
    };
    this.frame = 0;
    this.probeInterval = profile.probeInterval ?? 12;
    this.pixels = new Uint8Array(4);
    this.target = new THREE.WebGLRenderTarget(1, 1, {
      type: THREE.UnsignedByteType,
      format: THREE.RGBAFormat,
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      depthBuffer: false,
      stencilBuffer: false
    });
    this.material = new THREE.ShaderMaterial({
      name: "OpenAboveLuminanceProbeMaterial",
      uniforms: { tDiffuse: { value: null } },
      vertexShader,
      fragmentShader,
      depthTest: false,
      depthWrite: false
    });
    this.fsQuad = new FullScreenQuad(this.material);
  }

  updateContext({ firstPersonBlend = 0, burner = 0.18, sunFacing = 0 } = {}) {
    const interiorBias = THREE.MathUtils.lerp(1, 1.16, firstPersonBlend);
    const burnerBias = 1 - Math.max(0, burner - 0.35) * 0.12;
    const sunBias = 1 - Math.max(0, sunFacing) * 0.28;
    this.state.contextBias = THREE.MathUtils.clamp(interiorBias * burnerBias * sunBias, 0.62, 1.28);
  }

  render(renderer, writeBuffer, readBuffer, deltaTime = 1 / 60) {
    this.frame += 1;
    if (this.frame % this.probeInterval === 0) {
      const previousTarget = renderer.getRenderTarget();
      this.material.uniforms.tDiffuse.value = readBuffer.texture;
      renderer.setRenderTarget(this.target);
      renderer.clear();
      this.fsQuad.render(renderer);
      renderer.readRenderTargetPixels(this.target, 0, 0, 1, 1, this.pixels);
      renderer.setRenderTarget(previousTarget);
      const encoded = this.pixels[0] / 255;
      const averageLuminance = Math.pow(2, encoded * 16 - 8);
      this.state.averageLuminance = THREE.MathUtils.lerp(this.state.averageLuminance, averageLuminance, 0.24);
      const key = 0.28;
      this.state.targetExposure = THREE.MathUtils.clamp((key / Math.max(0.025, this.state.averageLuminance)) * this.state.contextBias, 0.42, 2.15);
    }
    const rate = this.state.targetExposure < this.state.currentExposure ? 2.2 : this.state.adaptationRate;
    const alpha = 1 - Math.exp(-rate * Math.max(0.001, deltaTime));
    this.state.currentExposure = THREE.MathUtils.lerp(this.state.currentExposure, this.state.targetExposure, alpha);
  }

  dispose() {
    this.target.dispose();
    this.material.dispose();
    this.fsQuad.dispose();
  }
}

export function createAutoExposureKit(profile) {
  const pass = new AutoExposurePass(profile);
  return { id: AUTO_EXPOSURE_KIT_ID, pass, state: pass.state, updateContext: (context) => pass.updateContext(context) };
}

window.OpenAboveAutoExposureKit = { id: AUTO_EXPOSURE_KIT_ID, createAutoExposureKit };
