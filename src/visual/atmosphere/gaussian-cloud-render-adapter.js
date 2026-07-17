import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export const GAUSSIAN_CLOUD_RENDER_ADAPTER_ID = "open-above-gaussian-cloud-render-adapter";

const vertexShader = /* glsl */`
attribute vec3 aCenter;
attribute vec2 aScale;
attribute float aAngle;
attribute float aOpacity;
attribute float aShade;
attribute vec3 aTint;
varying vec2 vLocal;
varying float vOpacity;
varying float vShade;
varying vec3 vTint;
varying float vDistance;
void main() {
  float c = cos(aAngle);
  float s = sin(aAngle);
  vec2 local = mat2(c, -s, s, c) * position.xy;
  vec4 centerView = modelViewMatrix * vec4(aCenter, 1.0);
  centerView.xy += local * aScale;
  vLocal = position.xy;
  vOpacity = aOpacity;
  vShade = aShade;
  vTint = aTint;
  vDistance = length(centerView.xyz);
  gl_Position = projectionMatrix * centerView;
}
`;

const fragmentShader = /* glsl */`
uniform vec3 uSunColor;
uniform vec3 uSkyFill;
uniform float uTime;
varying vec2 vLocal;
varying float vOpacity;
varying float vShade;
varying vec3 vTint;
varying float vDistance;
void main() {
  float radiusSquared = dot(vLocal, vLocal);
  if (radiusSquared > 1.0) discard;
  float gaussian = exp(-radiusSquared * 2.7);
  float edge = 1.0 - smoothstep(0.42, 1.0, radiusSquared);
  float nearPorosity = mix(0.2, 1.0, smoothstep(18.0, 140.0, vDistance));
  float grain = 0.94 + 0.06 * sin(vLocal.x * 13.0 + vLocal.y * 17.0 + vShade * 19.0 + uTime * 0.08);
  float alpha = gaussian * edge * vOpacity * nearPorosity * grain;
  if (alpha < 0.002) discard;
  vec3 shadow = vTint * vec3(0.58, 0.65, 0.74);
  vec3 light = mix(uSkyFill * vTint, uSunColor * vTint, 0.36 + vShade * 0.38);
  vec3 color = mix(shadow, light, 0.5 + vShade * 0.34);
  gl_FragColor = vec4(color * alpha, alpha);
}
`;

function instanceCapacity(quality) {
  if (quality?.id === "high") return 7000;
  if (quality?.id === "medium") return 4400;
  return 2400;
}

function createGeometry(capacity) {
  const geometry = new THREE.InstancedBufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute([
    -1, -1, 0,
     1, -1, 0,
    -1,  1, 0,
    -1,  1, 0,
     1, -1, 0,
     1,  1, 0
  ], 3));
  geometry.setAttribute("aCenter", new THREE.InstancedBufferAttribute(new Float32Array(capacity * 3), 3).setUsage(THREE.DynamicDrawUsage));
  geometry.setAttribute("aScale", new THREE.InstancedBufferAttribute(new Float32Array(capacity * 2), 2).setUsage(THREE.DynamicDrawUsage));
  geometry.setAttribute("aAngle", new THREE.InstancedBufferAttribute(new Float32Array(capacity), 1).setUsage(THREE.DynamicDrawUsage));
  geometry.setAttribute("aOpacity", new THREE.InstancedBufferAttribute(new Float32Array(capacity), 1).setUsage(THREE.DynamicDrawUsage));
  geometry.setAttribute("aShade", new THREE.InstancedBufferAttribute(new Float32Array(capacity), 1).setUsage(THREE.DynamicDrawUsage));
  geometry.setAttribute("aTint", new THREE.InstancedBufferAttribute(new Float32Array(capacity * 3), 3).setUsage(THREE.DynamicDrawUsage));
  geometry.instanceCount = 0;
  return geometry;
}

function weatherLayerMap(weatherMap) {
  return new Map((weatherMap?.state?.layers ?? []).map((layer) => [String(layer.id ?? layer.kind), layer]));
}

function layerForBank(map, bank) {
  return map.get(String(bank.layerId)) ?? [...map.values()].find((layer) => layer.kind === bank.kind) ?? null;
}

export function createGaussianCloudRenderer(scene, quality, weatherMap, cloudField) {
  const capacity = instanceCapacity(quality);
  const geometry = createGeometry(capacity);
  const uniforms = {
    uSunColor: { value: new THREE.Color(0xffd8ab) },
    uSkyFill: { value: new THREE.Color(0xa7cae4) },
    uTime: { value: 0 }
  };
  const material = new THREE.ShaderMaterial({
    name: "OpenAboveGaussianCloudMaterial",
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    depthTest: true,
    side: THREE.DoubleSide,
    blending: THREE.CustomBlending,
    blendSrc: THREE.OneFactor,
    blendDst: THREE.OneMinusSrcAlphaFactor,
    blendEquation: THREE.AddEquation,
    premultipliedAlpha: true,
    fog: false,
    toneMapped: true
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = "open-above-gaussian-cloud-splats";
  mesh.frustumCulled = false;
  mesh.renderOrder = 420;
  scene.add(mesh);

  const state = {
    capacity,
    visibleBanks: 0,
    splatCount: 0,
    droppedSplats: 0,
    tierCounts: Object.fromEntries((cloudField?.tiers ?? []).map((tier) => [tier.id, 0])),
    lastRebatchAt: -Infinity
  };
  const lastCameraPosition = new THREE.Vector3(Number.POSITIVE_INFINITY, 0, 0);
  const candidates = [];

  function shouldRebatch(camera, elapsed) {
    return !Number.isFinite(lastCameraPosition.x)
      || lastCameraPosition.distanceToSquared(camera.position) > 64
      || elapsed - state.lastRebatchAt > 0.2;
  }

  function rebatch(camera, elapsed) {
    candidates.length = 0;
    state.visibleBanks = 0;
    state.droppedSplats = 0;
    for (const key of Object.keys(state.tierCounts)) state.tierCounts[key] = 0;
    const layerMap = weatherLayerMap(weatherMap);
    const banks = cloudField?.query?.(camera.position, cloudField.maximumDistance) ?? [];

    for (const bank of banks) {
      const dx = bank.center.x - camera.position.x;
      const dy = bank.center.y - camera.position.y;
      const dz = bank.center.z - camera.position.z;
      const bankRadius = Math.max(Number(bank.radius?.x ?? 0), Number(bank.radius?.y ?? 0), Number(bank.radius?.z ?? 0));
      const distance = Math.max(0, Math.hypot(dx, dy, dz) - bankRadius);
      const tier = cloudField.selectLod(distance);
      if (!tier) continue;
      const layer = layerForBank(layerMap, bank);
      const coverage = Math.max(Number(layer?.minimumCoverage ?? 0), Number(layer?.coverage ?? bank.coverage ?? 0.12));
      const density = Math.max(Number(layer?.minimumDensity ?? 0), Number(layer?.density ?? bank.density ?? 0.2));
      const layerOpacity = Number(layer?.opacity ?? 1);
      const weatherVisibility = Math.min(1, 0.24 + coverage * 1.8 + density * 1.15) * layerOpacity;
      if (weatherVisibility <= 0.01) continue;
      state.visibleBanks += 1;
      state.tierCounts[tier.id] = (state.tierCounts[tier.id] ?? 0) + 1;
      const driftX = Math.sin(elapsed * 0.004 + bank.drift.phase) * bank.drift.x * 18;
      const driftZ = Math.cos(elapsed * 0.0035 + bank.drift.phase) * bank.drift.z * 18;

      for (let index = 0; index < tier.splatsPerBank; index += 1) {
        const splat = cloudField.sampleSplat(bank, index, tier);
        const x = bank.center.x + driftX + splat.offset.x;
        const y = bank.center.y + splat.offset.y;
        const z = bank.center.z + driftZ + splat.offset.z;
        const sx = x - camera.position.x;
        const sy = y - camera.position.y;
        const sz = z - camera.position.z;
        candidates.push({
          distanceSquared: sx * sx + sy * sy + sz * sz,
          center: [x, y, z],
          scale: [splat.scale.x, splat.scale.y],
          angle: splat.angle,
          opacity: Math.min(0.82, weatherVisibility * splat.opacity),
          shade: splat.shade,
          tint: bank.tint
        });
      }
    }

    candidates.sort((left, right) => left.distanceSquared - right.distanceSquared);
    state.droppedSplats = Math.max(0, candidates.length - capacity);
    if (candidates.length > capacity) candidates.length = capacity;
    candidates.sort((left, right) => right.distanceSquared - left.distanceSquared);
    const count = candidates.length;
    const center = geometry.getAttribute("aCenter");
    const scale = geometry.getAttribute("aScale");
    const angle = geometry.getAttribute("aAngle");
    const opacity = geometry.getAttribute("aOpacity");
    const shade = geometry.getAttribute("aShade");
    const tint = geometry.getAttribute("aTint");

    for (let index = 0; index < count; index += 1) {
      const candidate = candidates[index];
      center.setXYZ(index, candidate.center[0], candidate.center[1], candidate.center[2]);
      scale.setXY(index, candidate.scale[0], candidate.scale[1]);
      angle.setX(index, candidate.angle);
      opacity.setX(index, candidate.opacity);
      shade.setX(index, candidate.shade);
      tint.setXYZ(index, candidate.tint[0], candidate.tint[1], candidate.tint[2]);
    }
    center.needsUpdate = true;
    scale.needsUpdate = true;
    angle.needsUpdate = true;
    opacity.needsUpdate = true;
    shade.needsUpdate = true;
    tint.needsUpdate = true;
    geometry.instanceCount = count;
    state.splatCount = count;
    state.lastRebatchAt = elapsed;
    lastCameraPosition.copy(camera.position);
  }

  function update(camera, sunDirection, elapsed = 0) {
    uniforms.uTime.value = elapsed;
    uniforms.uSunColor.value.setHSL(0.09, 0.68, 0.82);
    uniforms.uSkyFill.value.setHSL(0.56, 0.38, 0.7);
    if (sunDirection?.y < 0.12) uniforms.uSunColor.value.multiplyScalar(0.82);
    if (shouldRebatch(camera, elapsed)) rebatch(camera, elapsed);
    return state;
  }

  function dispose() {
    scene.remove(mesh);
    geometry.dispose();
    material.dispose();
  }

  return Object.freeze({
    id: GAUSSIAN_CLOUD_RENDER_ADAPTER_ID,
    mesh,
    geometry,
    material,
    update,
    dispose,
    getState: () => ({
      capacity: state.capacity,
      visibleBanks: state.visibleBanks,
      splatCount: state.splatCount,
      droppedSplats: state.droppedSplats,
      tierCounts: { ...state.tierCounts }
    })
  });
}

if (typeof window !== "undefined") {
  window.OpenAboveGaussianCloudRenderAdapter = {
    id: GAUSSIAN_CLOUD_RENDER_ADAPTER_ID,
    createGaussianCloudRenderer
  };
}
