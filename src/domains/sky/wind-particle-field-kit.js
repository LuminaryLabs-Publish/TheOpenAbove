import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export const WIND_PARTICLE_FIELD_KIT_ID = "open-above-wind-particle-field-kit";

const DEFAULT_PARTICLE_COUNT = 3200;
const DEFAULT_RADIUS = 50;

function seeded(index, salt = 0) {
  const value = Math.sin((index + 1) * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

export function createWindParticleField({
  scene,
  particleCount = DEFAULT_PARTICLE_COUNT,
  radius = DEFAULT_RADIUS
} = {}) {
  if (!scene) throw new TypeError("Wind particle field requires a scene.");

  const count = Math.max(256, Math.floor(Number(particleCount) || DEFAULT_PARTICLE_COUNT));
  const fieldRadius = Math.max(10, Number(radius) || DEFAULT_RADIUS);
  const positions = new Float32Array(count * 3);
  const phases = new Float32Array(count);

  for (let index = 0; index < count; index += 1) {
    const offset = index * 3;
    positions[offset] = (seeded(index, 1) * 2 - 1) * fieldRadius;
    positions[offset + 1] = (seeded(index, 2) * 2 - 1) * fieldRadius * 0.55;
    positions[offset + 2] = (seeded(index, 3) * 2 - 1) * fieldRadius;
    phases[index] = seeded(index, 4) * Math.PI * 2;
  }

  const geometry = new THREE.BufferGeometry();
  const positionAttribute = new THREE.BufferAttribute(positions, 3);
  positionAttribute.setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute("position", positionAttribute);

  const material = new THREE.PointsMaterial({
    color: 0xf4f0df,
    size: 0.22,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.48,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const points = new THREE.Points(geometry, material);
  points.name = "open-above-player-wind-particles";
  points.frustumCulled = false;
  scene.add(points);

  const wind = new THREE.Vector3(0, 0, -1);
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

    const travel = Math.min(28, speed) * Math.max(0, dt);
    for (let index = 0; index < count; index += 1) {
      const offset = index * 3;
      const flutter = Math.sin(elapsed * 1.7 + phases[index]) * 0.035;
      positions[offset] = wrap(positions[offset] + wind.x * travel + flutter, fieldRadius);
      positions[offset + 1] = wrap(positions[offset + 1] + wind.y * travel * 0.5 + flutter * 0.35, fieldRadius * 0.55);
      positions[offset + 2] = wrap(positions[offset + 2] + wind.z * travel - flutter, fieldRadius);
    }
    positionAttribute.needsUpdate = true;
    material.opacity = Math.min(0.68, 0.32 + speed * 0.012);
  }

  function dispose() {
    scene.remove(points);
    geometry.dispose();
    material.dispose();
  }

  return Object.freeze({
    id: WIND_PARTICLE_FIELD_KIT_ID,
    particleCount: count,
    radius: fieldRadius,
    points,
    update,
    dispose
  });
}
