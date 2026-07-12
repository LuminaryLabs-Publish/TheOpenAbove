import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { GLSL_NOISE } from "../shader-noise.js";
import { createCloudLodProfile } from "./cloud-lod-kit.js";
import { createCloudLightingState } from "./cloud-lighting-kit.js";

export const VOLUMETRIC_CLOUD_KIT_ID = "open-above-volumetric-cloud-kit";

const vertexShader = /* glsl */`
varying vec3 vWorldDirection;
void main() {
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vWorldDirection = worldPosition.xyz - cameraPosition;
  gl_Position = projectionMatrix * viewMatrix * worldPosition;
  gl_Position.z = gl_Position.w;
}
`;

const fragmentShader = /* glsl */`
uniform vec3 uSunDirection;
uniform vec3 uSunColor;
uniform vec3 uSkyFill;
uniform vec2 uWeatherOffset;
uniform float uCoverage;
uniform float uDensity;
uniform float uTime;
uniform float uCloudBase;
uniform float uCloudTop;
uniform int uSteps;
uniform int uLightSteps;
varying vec3 vWorldDirection;
${GLSL_NOISE}

float weather(vec2 xz) {
  vec2 q = xz * 0.00038 + uWeatherOffset;
  float large = fbm2(q * 1.15);
  float cells = fbm2(q * 2.7 + 18.3);
  return mix(large, cells, 0.28);
}

float cloudDensity(vec3 p) {
  float height01 = clamp((p.y - uCloudBase) / max(1.0, uCloudTop - uCloudBase), 0.0, 1.0);
  float vertical = smoothstep(0.0, 0.16, height01) * (1.0 - smoothstep(0.62, 1.0, height01));
  float w = weather(p.xz);
  float base = fbm3(p * 0.00145 + vec3(uWeatherOffset.x * 22.0, uTime * 0.002, uWeatherOffset.y * 22.0));
  float detail = noise3(p * 0.0054 + vec3(7.0, uTime * 0.01, 13.0));
  float threshold = 1.0 - uCoverage * (0.78 + w * 0.42);
  float shaped = smoothstep(threshold, threshold + 0.24, base * 0.92 + detail * 0.08);
  return shaped * vertical * uDensity;
}

float lightTransmittance(vec3 p) {
  float optical = 0.0;
  vec3 stepVec = normalize(uSunDirection) * 34.0;
  vec3 samplePos = p;
  for (int j = 0; j < 8; j++) {
    if (j >= uLightSteps) break;
    samplePos += stepVec;
    optical += cloudDensity(samplePos) * 0.72;
  }
  return exp(-optical);
}

void main() {
  vec3 ray = normalize(vWorldDirection);
  if (abs(ray.y) < 0.0005) discard;
  float ta = (uCloudBase - cameraPosition.y) / ray.y;
  float tb = (uCloudTop - cameraPosition.y) / ray.y;
  float entryT = max(0.0, min(ta, tb));
  float exitT = max(ta, tb);
  if (exitT <= entryT) discard;

  float totalDistance = min(exitT - entryT, 4200.0);
  float stepLength = totalDistance / float(max(uSteps, 1));
  vec3 p = cameraPosition + ray * (entryT + stepLength * hash21(gl_FragCoord.xy));
  vec4 accumulation = vec4(0.0);
  float sunPhase = pow(max(dot(ray, normalize(uSunDirection)), 0.0), 6.0);

  for (int i = 0; i < 48; i++) {
    if (i >= uSteps) break;
    float d = cloudDensity(p);
    if (d > 0.008) {
      float trans = lightTransmittance(p);
      float edge = clamp((1.0 - d) * 1.55, 0.0, 1.0);
      vec3 shadowColor = vec3(0.34, 0.39, 0.46);
      vec3 litColor = mix(vec3(0.88, 0.92, 0.98), uSunColor * 1.42, 0.48 + sunPhase * 0.34);
      vec3 cloudColor = mix(shadowColor, litColor, trans * 0.78 + edge * 0.18);
      float alpha = 1.0 - exp(-d * stepLength * 0.015);
      accumulation.rgb += cloudColor * alpha * (1.0 - accumulation.a);
      accumulation.a += alpha * (1.0 - accumulation.a);
      if (accumulation.a > 0.985) break;
    }
    p += ray * stepLength;
  }

  accumulation.rgb += uSkyFill * sunPhase * accumulation.a * 0.08;
  if (accumulation.a < 0.002) discard;
  gl_FragColor = accumulation;
}
`;

export function createVolumetricClouds(scene, quality, weatherMap) {
  const lod = createCloudLodProfile(quality);
  const lighting = createCloudLightingState();
  const uniforms = {
    uSunDirection: { value: new THREE.Vector3(-0.48, 0.24, -0.84).normalize() },
    uSunColor: { value: new THREE.Color(0xffb66f) },
    uSkyFill: { value: new THREE.Color(0x95c8eb) },
    uWeatherOffset: { value: new THREE.Vector2() },
    uCoverage: { value: weatherMap.state.coverage },
    uDensity: { value: weatherMap.state.density },
    uTime: { value: 0 },
    uCloudBase: { value: 360 },
    uCloudTop: { value: 960 },
    uSteps: { value: lod.viewSamples },
    uLightSteps: { value: lod.lightSamples }
  };

  const material = new THREE.ShaderMaterial({
    name: "OpenAboveVolumetricCloudMaterial",
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    depthTest: true,
    side: THREE.BackSide,
    blending: THREE.NormalBlending,
    fog: false
  });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(4050, 36, 24), material);
  mesh.name = "open-above-volumetric-cloud-layer";
  mesh.frustumCulled = false;
  mesh.renderOrder = -90;
  scene.add(mesh);

  function update(camera, sunDirection, elapsed) {
    mesh.position.copy(camera.position);
    const lightState = lighting.update(sunDirection);
    uniforms.uSunDirection.value.copy(sunDirection).normalize();
    uniforms.uSunColor.value.copy(lightState.sunColor);
    uniforms.uSkyFill.value.copy(lightState.skyFill);
    uniforms.uWeatherOffset.value.set(...weatherMap.state.offset);
    uniforms.uCoverage.value = weatherMap.state.coverage;
    uniforms.uDensity.value = weatherMap.state.density;
    uniforms.uTime.value = elapsed;
  }

  return { id: VOLUMETRIC_CLOUD_KIT_ID, mesh, uniforms, lod, lighting, update };
}

window.OpenAboveVolumetricCloudKit = { id: VOLUMETRIC_CLOUD_KIT_ID, createVolumetricClouds };
