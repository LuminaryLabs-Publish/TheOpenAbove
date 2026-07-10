import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { ShaderPass } from "https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/postprocessing/ShaderPass.js";

export const COLOR_GRADE_KIT_ID = "open-above-color-grade-kit";

const shader = {
  name: "OpenAboveNeutralColorGradeShader",
  uniforms: {
    tDiffuse: { value: null },
    uExposure: { value: 1.0 },
    uSaturation: { value: 1.0 },
    uContrast: { value: 1.0 }
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
    uniform float uSaturation;
    uniform float uContrast;
    varying vec2 vUv;

    float luminance(vec3 color) {
      return dot(color, vec3(0.2126, 0.7152, 0.0722));
    }

    vec3 acesFilm(vec3 x) {
      float a = 2.51;
      float b = 0.03;
      float c = 2.43;
      float d = 0.59;
      float e = 0.14;
      return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
    }

    void main() {
      vec3 color = texture2D(tDiffuse, vUv).rgb * uExposure;
      color = acesFilm(color);
      color = mix(vec3(luminance(color)), color, uSaturation);
      color = (color - 0.5) * uContrast + 0.5;
      gl_FragColor = vec4(max(color, vec3(0.0)), 1.0);
      #include <colorspace_fragment>
    }
  `
};

export function createColorGradeKit() {
  const pass = new ShaderPass(shader);
  pass.name = "OpenAboveNeutralColorGradePass";
  pass.renderToScreen = true;

  function update() {
    pass.uniforms.uExposure.value = 1.0;
    pass.uniforms.uSaturation.value = 1.0;
    pass.uniforms.uContrast.value = 1.0;
  }

  return { id: COLOR_GRADE_KIT_ID, pass, update };
}

window.OpenAboveColorGradeKit = { id: COLOR_GRADE_KIT_ID, createColorGradeKit };
