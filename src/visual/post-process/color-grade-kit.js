import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { ShaderPass } from "https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/postprocessing/ShaderPass.js";

export const COLOR_GRADE_KIT_ID = "open-above-color-grade-kit";

const shader = {
  name: "OpenAboveFilmicColorGradeShader",
  uniforms: {
    tDiffuse: { value: null },
    uExposure: { value: 1.0 },
    uWarmth: { value: 0.55 },
    uSaturation: { value: 1.04 },
    uContrast: { value: 1.06 },
    uVignette: { value: 0.16 },
    uGrain: { value: 0.018 },
    uTime: { value: 0 },
    uSunScreen: { value: new THREE.Vector2(0.5, 0.5) },
    uSunStrength: { value: 0 },
    uChromatic: { value: 0.0008 }
  },
  vertexShader: /* glsl */`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse;
    uniform float uExposure;
    uniform float uWarmth;
    uniform float uSaturation;
    uniform float uContrast;
    uniform float uVignette;
    uniform float uGrain;
    uniform float uTime;
    uniform vec2 uSunScreen;
    uniform float uSunStrength;
    uniform float uChromatic;
    varying vec2 vUv;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }
    vec3 acesFilm(vec3 x) {
      float a = 2.51;
      float b = 0.03;
      float c = 2.43;
      float d = 0.59;
      float e = 0.14;
      return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
    }
    float luminance(vec3 c) {
      return dot(c, vec3(0.2126, 0.7152, 0.0722));
    }

    void main() {
      vec2 sunDelta = vUv - uSunScreen;
      float sunProximity = smoothstep(0.48, 0.0, length(sunDelta)) * uSunStrength;
      vec2 chromaOffset = normalize(sunDelta + vec2(0.0001)) * uChromatic * sunProximity;
      float r = texture2D(tDiffuse, vUv + chromaOffset).r;
      float g = texture2D(tDiffuse, vUv).g;
      float b = texture2D(tDiffuse, vUv - chromaOffset).b;
      vec3 color = vec3(r, g, b) * uExposure;
      color = acesFilm(color);

      float lum = luminance(color);
      vec3 coolShadow = vec3(0.93, 0.98, 1.07);
      vec3 warmHighlight = vec3(1.08, 1.01, 0.91);
      color *= mix(coolShadow, warmHighlight, smoothstep(0.18, 0.78, lum) * uWarmth + (1.0 - uWarmth) * 0.5);
      color = mix(vec3(luminance(color)), color, uSaturation);
      color = (color - 0.5) * uContrast + 0.5;

      float vignette = smoothstep(0.82, 0.22, length(vUv - 0.5));
      color *= mix(1.0 - uVignette, 1.0, vignette);
      float grain = (hash(vUv * vec2(1920.0, 1080.0) + uTime) - 0.5) * uGrain;
      color += grain * (0.3 + lum * 0.7);
      gl_FragColor = vec4(max(color, vec3(0.0)), 1.0);
      #include <colorspace_fragment>
    }
  `
};

export function createColorGradeKit() {
  const pass = new ShaderPass(shader);
  pass.name = "OpenAboveColorGradePass";
  pass.renderToScreen = true;
  function update({ exposure = 1, elapsed = 0, sunScreen, sunStrength = 0, firstPersonBlend = 0 } = {}) {
    pass.uniforms.uExposure.value = exposure;
    pass.uniforms.uTime.value = elapsed;
    pass.uniforms.uSunStrength.value = sunStrength;
    if (sunScreen) pass.uniforms.uSunScreen.value.copy(sunScreen);
    pass.uniforms.uWarmth.value = THREE.MathUtils.lerp(0.5, 0.68, firstPersonBlend);
    pass.uniforms.uVignette.value = THREE.MathUtils.lerp(0.14, 0.2, firstPersonBlend);
  }
  return { id: COLOR_GRADE_KIT_ID, pass, update };
}

window.OpenAboveColorGradeKit = { id: COLOR_GRADE_KIT_ID, createColorGradeKit };
