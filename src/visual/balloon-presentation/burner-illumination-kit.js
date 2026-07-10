import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export const BURNER_ILLUMINATION_KIT_ID = "open-above-burner-illumination-kit";

export function installBurnerIllumination(balloon) {
  const burner = balloon?.userData?.parts?.burner;
  if (!burner) return { id: BURNER_ILLUMINATION_KIT_ID, update() {} };

  const blueCore = new THREE.Mesh(
    new THREE.ConeGeometry(0.105, 0.5, 12),
    new THREE.MeshBasicMaterial({ color: 0x75d8ff, transparent: true, opacity: 0.72, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  blueCore.name = "balloon-burner-blue-flame-core";
  blueCore.position.y = -0.24;
  blueCore.rotation.x = Math.PI;
  burner.add(blueCore);

  const shimmer = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.34, 0.95, 16, 4, true),
    new THREE.ShaderMaterial({
      name: "OpenAboveHeatShimmerMaterial",
      uniforms: { uTime: { value: 0 }, uHeat: { value: 0.18 } },
      vertexShader: /* glsl */`
        uniform float uTime;
        uniform float uHeat;
        varying float vAlpha;
        void main() {
          vec3 displaced = position;
          float wave = sin(position.y * 12.0 + uTime * 14.0 + position.x * 8.0) * 0.025 * uHeat;
          displaced.xz += normalize(position.xz + vec2(0.001)) * wave;
          vAlpha = smoothstep(-0.48, 0.12, position.y) * (1.0 - smoothstep(0.18, 0.48, position.y));
          gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
        }
      `,
      fragmentShader: /* glsl */`
        uniform float uHeat;
        varying float vAlpha;
        void main() {
          gl_FragColor = vec4(1.0, 0.48, 0.16, vAlpha * uHeat * 0.08);
        }
      `,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    })
  );
  shimmer.name = "balloon-burner-heat-shimmer";
  shimmer.position.y = 0.15;
  burner.add(shimmer);

  function update(elapsed, heat = 0.18) {
    const level = Math.max(0, Math.min(1, heat));
    blueCore.scale.setScalar(0.72 + level * 0.56);
    blueCore.material.opacity = 0.3 + level * 0.66;
    shimmer.material.uniforms.uTime.value = elapsed;
    shimmer.material.uniforms.uHeat.value = level;
    shimmer.visible = level > 0.24;
  }

  return { id: BURNER_ILLUMINATION_KIT_ID, blueCore, shimmer, update };
}

window.OpenAboveBurnerIlluminationKit = { id: BURNER_ILLUMINATION_KIT_ID, installBurnerIllumination };
