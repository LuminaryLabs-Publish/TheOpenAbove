import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export const WIND_PARTICLE_FIELD_KIT_ID = "open-above-wind-particle-field-kit";

const DEFAULT_PARTICLE_COUNT = 3200;
const DEFAULT_RADIUS = 50;
const DEFAULT_PARTICLE_SIZE = 0.11;
const DEFAULT_OPACITY = 0.5;
const TAU = Math.PI * 2;

function seeded(index, salt = 0) {
  const value = Math.sin((index + 1) * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function createDustTexture() {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const context = canvas.getContext("2d");
  if (!context) return null;

  const gradient = context.createRadialGradient(16, 16, 1, 16, 16, 15);
  gradient.addColorStop(0, "rgba(255,255,255,0.95)");
  gradient.addColorStop(0.28, "rgba(245,238,220,0.72)");
  gradient.addColorStop(0.7, "rgba(218,204,178,0.2)");
  gradient.addColorStop(1, "rgba(218,204,178,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 32, 32);

  const texture = new THREE.CanvasTexture(canvas);
  texture.name = "open-above-wind-dust-texture";
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function sampleFlowNoise3D(x, y, z, elapsed, phase, target) {
  const low = 0.052;
  const high = 0.137;
  const time = elapsed * 0.34;
  const px = x * low + phase;
  const py = y * low - phase * 0.73;
  const pz = z * low + phase * 0.41;

  const xNoise = Math.sin(py * 1.73 + pz * 0.61 + time)
    + Math.cos(pz * 1.29 - px * 0.48 - time * 0.57)
    + Math.sin((x + z) * high + phase * 2.1 + time * 1.31) * 0.45;
  const yNoise = Math.sin(pz * 1.51 + px * 0.44 + time * 0.73)
    + Math.cos(px * 1.17 - py * 0.52 + time * 0.39)
    + Math.sin((y + x) * high * 0.82 - phase * 1.7 - time * 0.91) * 0.36;
  const zNoise = Math.sin(px * 1.67 + py * 0.58 - time * 0.81)
    + Math.cos(py * 1.23 - pz * 0.46 + time * 0.49)
    + Math.sin((z + y) * high + phase * 1.3 + time * 1.07) * 0.45;

  return target.set(xNoise * 0.36, yNoise * 0.24, zNoise * 0.36);
}

export function createWindParticleField({
  scene,
  particleCount = DEFAULT_PARTICLE_COUNT,
  radius = DEFAULT_RADIUS,
  particleSize = DEFAULT_PARTICLE_SIZE,
  opacity = DEFAULT_OPACITY
} = {}) {
  if (!scene) throw new TypeError("Wind particle field requires a scene.");

  const count = Math.max(256, Math.floor(Number(particleCount) || DEFAULT_PARTICLE_COUNT));
  const fieldRadius = Math.max(10, Number(radius) || DEFAULT_RADIUS);
  const verticalRadius = fieldRadius * 0.55;
  const visualSize = Math.max(0.01, Number(particleSize) || DEFAULT_PARTICLE_SIZE);
  const visualOpacity = Math.max(0, Math.min(1, Number(opacity) || DEFAULT_OPACITY));
  const positions = new Float32Array(count * 3);
  const phases = new Float32Array(count);

  for (let index = 0; index < count; index += 1) {
    const offset = index * 3;
    positions[offset] = (seeded(index, 1) * 2 - 1) * fieldRadius;
    positions[offset + 1] = (seeded(index, 2) * 2 - 1) * verticalRadius;
    positions[offset + 2] = (seeded(index, 3) * 2 - 1) * fieldRadius;
    phases[index] = seeded(index, 4) * TAU;
  }

  const geometry = new THREE.BufferGeometry();
  const positionAttribute = new THREE.BufferAttribute(positions, 3);
  positionAttribute.setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute("position", positionAttribute);

  const dustTexture = createDustTexture();
  const material = new THREE.PointsMaterial({
    color: 0xd8ccb5,
    size: visualSize,
    sizeAttenuation: true,
    map: dustTexture,
    transparent: true,
    opacity: visualOpacity,
    alphaTest: 0.02,
    depthTest: true,
    depthWrite: false,
    blending: THREE.NormalBlending
  });

  const points = new THREE.Points(geometry, material);
  points.name = "open-above-player-wind-dust";
  points.frustumCulled = false;
  scene.add(points);

  const wind = new THREE.Vector3(0, 0, -1);
  const noise = new THREE.Vector3();
  const center = new THREE.Vector3();

  function wrap(value, limit) {
    const span = limit * 2;
    if (value > limit) return value - span;
    if (value < -limit) return value + span;
    return value;
  }

  function update({ position, velocity, elapsed = 0, dt = 0 } = {}) {
    if (!position) return;
    center.set(position.x || 0, position.y || 0, position.z || 0);
    points.position.copy(center);

    wind.set(Number(velocity?.x) || 0, Number(velocity?.y) || 0, Number(velocity?.z) || 0);
    const speed = Math.max(2, wind.length());
    if (wind.lengthSq() < 0.0001) wind.set(0, 0, -1);
    wind.normalize();

    const step = Math.max(0, dt);
    const travelSpeed = Math.min(28, speed);
    const noiseStrength = Math.min(3.2, 0.75 + speed * 0.09);
    for (let index = 0; index < count; index += 1) {
      const offset = index * 3;
      sampleFlowNoise3D(
        positions[offset],
        positions[offset + 1],
        positions[offset + 2],
        elapsed,
        phases[index],
        noise
      );
      positions[offset] = wrap(
        positions[offset] + (wind.x * travelSpeed + noise.x * noiseStrength) * step,
        fieldRadius
      );
      positions[offset + 1] = wrap(
        positions[offset + 1] + (wind.y * travelSpeed + noise.y * noiseStrength) * step,
        verticalRadius
      );
      positions[offset + 2] = wrap(
        positions[offset + 2] + (wind.z * travelSpeed + noise.z * noiseStrength) * step,
        fieldRadius
      );
    }
    positionAttribute.needsUpdate = true;
  }

  function dispose() {
    scene.remove(points);
    geometry.dispose();
    material.dispose();
    dustTexture?.dispose?.();
  }

  return Object.freeze({
    id: WIND_PARTICLE_FIELD_KIT_ID,
    particleCount: count,
    radius: fieldRadius,
    particleSize: visualSize,
    opacity: visualOpacity,
    noiseModel: "directional-layered-3d",
    points,
    update,
    dispose
  });
}
