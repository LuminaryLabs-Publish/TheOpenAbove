import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { Pass, FullScreenQuad } from "https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/postprocessing/Pass.js";

export const GOD_RAY_KIT_ID = "open-above-god-ray-kit";

const vertexShader = /* glsl */`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = /* glsl */`
uniform sampler2D tDiffuse;
uniform sampler2D tDepth;
uniform vec2 uSunScreen;
uniform vec3 uRayColor;
uniform float uStrength;
uniform float uDensity;
uniform float uDecay;
uniform float uWeight;
uniform int uSamples;
varying vec2 vUv;

float luminance(vec3 color) {
  return dot(color, vec3(0.2126, 0.7152, 0.0722));
}

void main() {
  vec4 base = texture2D(tDiffuse, vUv);
  vec2 delta = (vUv - uSunScreen) * (uDensity / float(max(uSamples, 1)));
  vec2 coord = vUv;
  float illumination = 1.0;
  float ray = 0.0;
  for (int i = 0; i < 48; i++) {
    if (i >= uSamples) break;
    coord -= delta;
    if (coord.x < 0.0 || coord.x > 1.0 || coord.y < 0.0 || coord.y > 1.0) break;
    float depth = texture2D(tDepth, coord).x;
    vec3 sampleColor = texture2D(tDiffuse, coord).rgb;
    float skyVisibility = smoothstep(0.993, 0.99998, depth);
    float atmosphericVisibility = smoothstep(0.08, 1.35, luminance(sampleColor));
    float visibility = skyVisibility * atmosphericVisibility;
    ray += visibility * illumination * uWeight;
    illumination *= uDecay;
  }
  float distanceToSun = distance(vUv, uSunScreen);
  float radialFalloff = smoothstep(1.05, 0.04, distanceToSun);
  vec3 rays = uRayColor * ray * uStrength * radialFalloff;
  gl_FragColor = vec4(base.rgb + rays, base.a);
}
`;

export class GodRayPass extends Pass {
  constructor(quality, profile = {}) {
    super();
    this.needsSwap = true;
    this.material = new THREE.ShaderMaterial({
      name: "OpenAboveDepthAwareGodRayMaterial",
      uniforms: {
        tDiffuse: { value: null },
        tDepth: { value: null },
        uSunScreen: { value: new THREE.Vector2(0.5, 0.5) },
        uRayColor: { value: new THREE.Color(profile.color ?? 0xffb267) },
        uStrength: { value: profile.strength ?? 0.46 },
        uDensity: { value: profile.density ?? 0.94 },
        uDecay: { value: profile.decay ?? 0.965 },
        uWeight: { value: profile.weight ?? 0.044 },
        uSamples: { value: Math.min(48, quality.godRaySamples) }
      },
      vertexShader,
      fragmentShader,
      depthTest: false,
      depthWrite: false
    });
    this.fsQuad = new FullScreenQuad(this.material);
    this.sunOnScreen = 1;
  }

  update(camera, sunWorldPosition, atmosphereDensity = 1) {
    const projected = sunWorldPosition.clone().project(camera);
    this.material.uniforms.uSunScreen.value.set(projected.x * 0.5 + 0.5, projected.y * 0.5 + 0.5);
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    const toSun = sunWorldPosition.clone().sub(camera.position).normalize();
    const facing = forward.dot(toSun);
    const inside = projected.z > -1 && projected.z < 1 && projected.x > -1.25 && projected.x < 1.25 && projected.y > -1.25 && projected.y < 1.25;
    this.sunOnScreen = inside ? THREE.MathUtils.smoothstep(facing, -0.08, 0.28) : 0;
    this.material.uniforms.uStrength.value = 0.5 * this.sunOnScreen * THREE.MathUtils.clamp(atmosphereDensity, 0.35, 1.4);
    return { facing, onScreen: this.sunOnScreen };
  }

  render(renderer, writeBuffer, readBuffer) {
    this.material.uniforms.tDiffuse.value = readBuffer.texture;
    this.material.uniforms.tDepth.value = readBuffer.depthTexture;
    renderer.setRenderTarget(this.renderToScreen ? null : writeBuffer);
    if (this.clear) renderer.clear();
    this.fsQuad.render(renderer);
  }

  dispose() {
    this.material.dispose();
    this.fsQuad.dispose();
  }
}

export function createGodRayKit(quality, profile) {
  const pass = new GodRayPass(quality, profile);
  return { id: GOD_RAY_KIT_ID, pass, update: (...args) => pass.update(...args) };
}

window.OpenAboveGodRayKit = { id: GOD_RAY_KIT_ID, createGodRayKit };
