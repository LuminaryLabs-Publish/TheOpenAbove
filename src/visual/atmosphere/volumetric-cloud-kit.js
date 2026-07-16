import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { GLSL_NOISE } from "../shader-noise.js";
import { createCloudLodProfile } from "./cloud-lod-kit.js";
import { createCloudLightingState } from "./cloud-lighting-kit.js";

export const VOLUMETRIC_CLOUD_KIT_ID = "open-above-volumetric-cloud-kit";
export const MAX_VOLUMETRIC_CLOUD_LAYERS = 5;

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
#define MAX_CLOUD_LAYERS 5
uniform vec3 uSunDirection;
uniform vec3 uSunColor;
uniform vec3 uSkyFill;
uniform float uTime;
uniform int uLayerCount;
uniform int uLightSteps;
uniform float uMaxDistance;
uniform float uLayerBase[MAX_CLOUD_LAYERS];
uniform float uLayerTop[MAX_CLOUD_LAYERS];
uniform float uLayerCoverage[MAX_CLOUD_LAYERS];
uniform float uLayerDensity[MAX_CLOUD_LAYERS];
uniform float uLayerOpacity[MAX_CLOUD_LAYERS];
uniform float uLayerOffsetX[MAX_CLOUD_LAYERS];
uniform float uLayerOffsetZ[MAX_CLOUD_LAYERS];
uniform float uLayerNoiseScale[MAX_CLOUD_LAYERS];
uniform float uLayerDetailScale[MAX_CLOUD_LAYERS];
uniform float uLayerShape[MAX_CLOUD_LAYERS];
uniform float uLayerSteps[MAX_CLOUD_LAYERS];
varying vec3 vWorldDirection;
${GLSL_NOISE}

float weather(vec2 xz, int layerIndex) {
  vec2 offset = vec2(uLayerOffsetX[layerIndex], uLayerOffsetZ[layerIndex]);
  vec2 q = xz * 0.00038 + offset;
  float large = fbm2(q * 1.15);
  float cells = fbm2(q * 2.7 + 18.3);
  return mix(large, cells, 0.28);
}

float verticalProfile(float height01, float shape) {
  if (shape < 0.5) {
    return smoothstep(0.0, 0.08, height01) * (1.0 - smoothstep(0.52, 1.0, height01));
  }
  if (shape > 1.5) {
    float band = smoothstep(0.0, 0.12, height01) * (1.0 - smoothstep(0.62, 1.0, height01));
    return pow(max(band, 0.0), 0.55);
  }
  return smoothstep(0.0, 0.16, height01) * (1.0 - smoothstep(0.62, 1.0, height01));
}

float layerDensity(vec3 p, int layerIndex) {
  float height01 = clamp((p.y - uLayerBase[layerIndex]) / max(1.0, uLayerTop[layerIndex] - uLayerBase[layerIndex]), 0.0, 1.0);
  float shape = uLayerShape[layerIndex];
  float vertical = verticalProfile(height01, shape);
  float w = weather(p.xz, layerIndex);
  vec2 offset = vec2(uLayerOffsetX[layerIndex], uLayerOffsetZ[layerIndex]);
  float base = fbm3(p * uLayerNoiseScale[layerIndex] + vec3(offset.x * 22.0, uTime * 0.002, offset.y * 22.0));
  float detail = noise3(p * uLayerDetailScale[layerIndex] + vec3(7.0, uTime * 0.01, 13.0));
  float coverage = uLayerCoverage[layerIndex];
  if (shape < 0.5) coverage *= 2.2;
  if (shape > 1.5) coverage *= 1.65;
  float threshold = 0.79 - coverage * (0.55 + w * 0.18);
  float signal = shape > 1.5 ? base * 0.72 + detail * 0.28 : base * 0.92 + detail * 0.08;
  float softness = shape < 0.5 ? 0.3 : shape > 1.5 ? 0.2 : 0.24;
  float shaped = smoothstep(threshold, threshold + softness, signal);
  if (shape > 1.5) shaped *= smoothstep(0.3, 0.78, detail + base * 0.35);
  return shaped * vertical * uLayerDensity[layerIndex] * uLayerOpacity[layerIndex];
}

float lightTransmittance(vec3 p, int layerIndex) {
  float optical = 0.0;
  vec3 stepVec = normalize(uSunDirection) * 34.0;
  vec3 samplePos = p;
  for (int j = 0; j < 8; j++) {
    if (j >= uLightSteps) break;
    samplePos += stepVec;
    optical += layerDensity(samplePos, layerIndex) * 0.72;
  }
  return exp(-optical);
}

void main() {
  vec3 ray = normalize(vWorldDirection);
  if (abs(ray.y) < 0.0005) discard;
  vec4 accumulation = vec4(0.0);
  float sunPhase = pow(max(dot(ray, normalize(uSunDirection)), 0.0), 6.0);

  for (int layerLoop = 0; layerLoop < MAX_CLOUD_LAYERS; layerLoop++) {
    int layerIndex = ray.y < 0.0 ? MAX_CLOUD_LAYERS - 1 - layerLoop : layerLoop;
    if (layerIndex >= uLayerCount || uLayerSteps[layerIndex] < 0.5) continue;
    float ta = (uLayerBase[layerIndex] - cameraPosition.y) / ray.y;
    float tb = (uLayerTop[layerIndex] - cameraPosition.y) / ray.y;
    float entryT = max(0.0, min(ta, tb));
    float exitT = max(ta, tb);
    if (exitT <= entryT) continue;

    float totalDistance = min(exitT - entryT, uMaxDistance);
    float layerStepCount = max(uLayerSteps[layerIndex], 1.0);
    float stepLength = totalDistance / layerStepCount;
    vec3 p = cameraPosition + ray * (entryT + stepLength * hash21(gl_FragCoord.xy + float(layerIndex) * 19.0));

    for (int i = 0; i < 16; i++) {
      if (float(i) >= layerStepCount) break;
      float d = layerDensity(p, layerIndex);
      if (d > 0.004) {
        float trans = lightTransmittance(p, layerIndex);
        float edge = clamp((1.0 - d) * 1.55, 0.0, 1.0);
        float shape = uLayerShape[layerIndex];
        vec3 shadowColor = shape < 0.5 ? vec3(0.48, 0.54, 0.58) : vec3(0.34, 0.39, 0.46);
        vec3 litColor = mix(vec3(0.88, 0.92, 0.98), uSunColor * 1.42, 0.48 + sunPhase * 0.34);
        if (shape > 1.5) litColor = mix(litColor, vec3(0.96, 0.93, 0.9), 0.35);
        vec3 cloudColor = mix(shadowColor, litColor, trans * 0.78 + edge * 0.18);
        float extinction = shape < 0.5 ? 0.009 : shape > 1.5 ? 0.008 : 0.015;
        float alpha = 1.0 - exp(-d * stepLength * extinction);
        accumulation.rgb += cloudColor * alpha * (1.0 - accumulation.a);
        accumulation.a += alpha * (1.0 - accumulation.a);
        if (accumulation.a > 0.985) break;
      }
      p += ray * stepLength;
    }
    if (accumulation.a > 0.985) break;
  }

  accumulation.rgb += uSkyFill * sunPhase * accumulation.a * 0.08;
  if (accumulation.a < 0.0003) discard;
  gl_FragColor = accumulation;
}
`;

const compositeVertexShader = /* glsl */`
varying vec2 vCloudUv;
void main() {
  vCloudUv = uv;
  gl_Position = vec4(position.xy, 1.0, 1.0);
}
`;

const compositeFragmentShader = /* glsl */`
uniform sampler2D uCloudTexture;
varying vec2 vCloudUv;
void main() {
  vec4 cloud = texture2D(uCloudTexture, vCloudUv);
  if (cloud.a < 0.0003) discard;
  gl_FragColor = cloud;
}
`;

function shapeCode(kind, profile = {}) {
  const shape = String(profile.shape ?? kind ?? "cumulus");
  if (shape === "fog" || kind === "ground-fog" || kind === "fog") return 0;
  if (shape === "cirrus" || kind === "cirrus") return 2;
  return 1;
}

function fallbackLayers(weatherMap) {
  return [{
    id: "legacy-mid-clouds",
    kind: "mid-cloud",
    base: 360,
    top: 960,
    coverage: Math.max(0.01, Number(weatherMap.state.coverage ?? 0.18)),
    density: Math.max(0.005, Number(weatherMap.state.density ?? 0.28)),
    opacity: 1,
    offset: { x: Number(weatherMap.state.offset?.[0] ?? 0), z: Number(weatherMap.state.offset?.[1] ?? 0) },
    profile: { shape: "cumulus", noiseScale: 0.00145, detailScale: 0.0054, stepWeight: 1 }
  }];
}

function allocateLayerSteps(layers, totalSteps) {
  if (layers.length === 0) return [];
  const total = Math.max(layers.length, Math.floor(Number(totalSteps) || layers.length));
  const weights = layers.map((layer) => Math.max(0.01, Number(layer.profile?.stepWeight ?? (layer.top - layer.base))));
  const weightSum = weights.reduce((sum, value) => sum + value, 0);
  const minimum = total >= layers.length * 2 ? 2 : 1;
  const steps = weights.map((weight) => Math.min(16, Math.max(minimum, Math.floor(total * weight / weightSum))));
  let assigned = steps.reduce((sum, value) => sum + value, 0);
  while (assigned < total) {
    let best = 0;
    for (let index = 1; index < steps.length; index += 1) {
      if (steps[index] < 16 && weights[index] / Math.max(1, steps[index]) > weights[best] / Math.max(1, steps[best])) best = index;
    }
    if (steps[best] >= 16) break;
    steps[best] += 1;
    assigned += 1;
  }
  while (assigned > total) {
    let best = -1;
    for (let index = 0; index < steps.length; index += 1) {
      if (steps[index] <= minimum) continue;
      if (best === -1 || weights[index] / steps[index] < weights[best] / steps[best]) best = index;
    }
    if (best === -1) break;
    steps[best] -= 1;
    assigned -= 1;
  }
  return steps;
}

export function createVolumetricClouds(scene, quality, weatherMap) {
  const lod = createCloudLodProfile(quality);
  const lighting = createCloudLightingState();
  const cloudScene = new THREE.Scene();
  const uniforms = {
    uSunDirection: { value: new THREE.Vector3(-0.48, 0.24, -0.84).normalize() },
    uSunColor: { value: new THREE.Color(0xffb66f) },
    uSkyFill: { value: new THREE.Color(0x95c8eb) },
    uTime: { value: 0 },
    uLayerCount: { value: 0 },
    uLightSteps: { value: lod.lightSamples },
    uMaxDistance: { value: lod.maxDistance },
    uLayerBase: { value: new Float32Array(MAX_VOLUMETRIC_CLOUD_LAYERS) },
    uLayerTop: { value: new Float32Array(MAX_VOLUMETRIC_CLOUD_LAYERS) },
    uLayerCoverage: { value: new Float32Array(MAX_VOLUMETRIC_CLOUD_LAYERS) },
    uLayerDensity: { value: new Float32Array(MAX_VOLUMETRIC_CLOUD_LAYERS) },
    uLayerOpacity: { value: new Float32Array(MAX_VOLUMETRIC_CLOUD_LAYERS) },
    uLayerOffsetX: { value: new Float32Array(MAX_VOLUMETRIC_CLOUD_LAYERS) },
    uLayerOffsetZ: { value: new Float32Array(MAX_VOLUMETRIC_CLOUD_LAYERS) },
    uLayerNoiseScale: { value: new Float32Array(MAX_VOLUMETRIC_CLOUD_LAYERS) },
    uLayerDetailScale: { value: new Float32Array(MAX_VOLUMETRIC_CLOUD_LAYERS) },
    uLayerShape: { value: new Float32Array(MAX_VOLUMETRIC_CLOUD_LAYERS) },
    uLayerSteps: { value: new Float32Array(MAX_VOLUMETRIC_CLOUD_LAYERS) }
  };

  const material = new THREE.ShaderMaterial({
    name: "OpenAboveVolumetricCloudMaterial",
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: false,
    depthWrite: false,
    depthTest: false,
    side: THREE.BackSide,
    blending: THREE.NoBlending,
    fog: false
  });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(4050, 36, 24), material);
  mesh.name = "open-above-volumetric-cloud-layer";
  mesh.frustumCulled = false;
  cloudScene.add(mesh);

  const renderTarget = new THREE.WebGLRenderTarget(1, 1, {
    type: THREE.HalfFloatType,
    format: THREE.RGBAFormat,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    depthBuffer: false,
    stencilBuffer: false
  });
  renderTarget.texture.name = "open-above-volumetric-cloud-low-resolution";
  renderTarget.texture.generateMipmaps = false;

  const compositeMaterial = new THREE.ShaderMaterial({
    name: "OpenAboveVolumetricCloudDepthCompositeMaterial",
    uniforms: { uCloudTexture: { value: renderTarget.texture } },
    vertexShader: compositeVertexShader,
    fragmentShader: compositeFragmentShader,
    transparent: true,
    depthWrite: false,
    depthTest: true,
    blending: THREE.NormalBlending,
    fog: false,
    toneMapped: false
  });
  const compositeMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), compositeMaterial);
  compositeMesh.name = "open-above-volumetric-cloud-depth-composite";
  compositeMesh.frustumCulled = false;
  compositeMesh.renderOrder = 900;
  scene.add(compositeMesh);

  const drawingBufferSize = new THREE.Vector2();
  const previousClearColor = new THREE.Color();
  let renderWidth = 1;
  let renderHeight = 1;
  let activeLayers = [];

  function syncLayers() {
    const source = (weatherMap.state.layers?.length ? weatherMap.state.layers : fallbackLayers(weatherMap))
      .filter((layer) => layer.enabled !== false)
      .sort((left, right) => Number(left.priority ?? 0) - Number(right.priority ?? 0) || String(left.id).localeCompare(String(right.id)))
      .slice(0, MAX_VOLUMETRIC_CLOUD_LAYERS);
    activeLayers = source;
    const steps = allocateLayerSteps(source, lod.viewSamples);
    uniforms.uLayerCount.value = source.length;
    for (let index = 0; index < MAX_VOLUMETRIC_CLOUD_LAYERS; index += 1) {
      const layer = source[index];
      uniforms.uLayerBase.value[index] = Number(layer?.base ?? 0);
      uniforms.uLayerTop.value[index] = Number(layer?.top ?? 1);
      uniforms.uLayerCoverage.value[index] = Math.max(Number(layer?.minimumCoverage ?? 0), Number(layer?.coverage ?? 0));
      uniforms.uLayerDensity.value[index] = Math.max(Number(layer?.minimumDensity ?? 0), Number(layer?.density ?? 0));
      uniforms.uLayerOpacity.value[index] = Number(layer?.opacity ?? 1);
      uniforms.uLayerOffsetX.value[index] = Number(layer?.offset?.x ?? 0);
      uniforms.uLayerOffsetZ.value[index] = Number(layer?.offset?.z ?? 0);
      uniforms.uLayerNoiseScale.value[index] = Number(layer?.profile?.noiseScale ?? 0.00145);
      uniforms.uLayerDetailScale.value[index] = Number(layer?.profile?.detailScale ?? 0.0054);
      uniforms.uLayerShape.value[index] = shapeCode(layer?.kind, layer?.profile);
      uniforms.uLayerSteps.value[index] = Number(steps[index] ?? 0);
    }
  }

  function resizeRenderTarget(renderer) {
    renderer.getDrawingBufferSize(drawingBufferSize);
    const width = Math.max(1, Math.floor(drawingBufferSize.x * lod.renderScale));
    const height = Math.max(1, Math.floor(drawingBufferSize.y * lod.renderScale));
    if (width === renderWidth && height === renderHeight) return false;
    renderWidth = width;
    renderHeight = height;
    renderTarget.setSize(width, height);
    return true;
  }

  function update(camera, sunDirection, elapsed) {
    mesh.position.copy(camera.position);
    const lightState = lighting.update(sunDirection);
    uniforms.uSunDirection.value.copy(sunDirection).normalize();
    uniforms.uSunColor.value.copy(lightState.sunColor);
    uniforms.uSkyFill.value.copy(lightState.skyFill);
    uniforms.uTime.value = elapsed;
    syncLayers();
  }

  function render(renderer, camera) {
    resizeRenderTarget(renderer);
    const previousTarget = renderer.getRenderTarget();
    const previousAutoClear = renderer.autoClear;
    const previousClearAlpha = renderer.getClearAlpha();
    renderer.getClearColor(previousClearColor);

    try {
      renderer.setRenderTarget(renderTarget);
      renderer.setClearColor(0x000000, 0);
      renderer.autoClear = true;
      renderer.clear(true, false, false);
      renderer.render(cloudScene, camera);
    } finally {
      renderer.setRenderTarget(previousTarget);
      renderer.setClearColor(previousClearColor, previousClearAlpha);
      renderer.autoClear = previousAutoClear;
    }
  }

  function dispose() {
    scene.remove(compositeMesh);
    cloudScene.remove(mesh);
    mesh.geometry.dispose();
    material.dispose();
    compositeMesh.geometry.dispose();
    compositeMaterial.dispose();
    renderTarget.dispose();
  }

  syncLayers();

  return {
    id: VOLUMETRIC_CLOUD_KIT_ID,
    mesh,
    compositeMesh,
    renderTarget,
    uniforms,
    lod,
    lighting,
    update,
    render,
    dispose,
    getLayers: () => activeLayers.map((layer) => structuredClone(layer)),
    getRenderSize: () => ({ width: renderWidth, height: renderHeight, scale: lod.renderScale })
  };
}

if (typeof window !== "undefined") {
  window.OpenAboveVolumetricCloudKit = { id: VOLUMETRIC_CLOUD_KIT_ID, createVolumetricClouds };
}
