import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export const BURNER_ILLUMINATION_KIT_ID = "open-above-burner-illumination-kit";

export function installBurnerIllumination(balloon) {
  const burner = balloon?.userData?.parts?.burner;
  if (!burner) return { id: BURNER_ILLUMINATION_KIT_ID, update() {} };

  const heads = burner.userData.burnerHeads ?? [];
  const blueCores = heads.map((head, index) => {
    const core = new THREE.Mesh(
      new THREE.ConeGeometry(0.07, 0.36, 10),
      new THREE.MeshBasicMaterial({ color: 0x75d8ff, transparent: true, opacity: 0.08, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    core.name = `balloon-burner-blue-flame-core-${index}`;
    core.position.set(head.position.x, -0.02, head.position.z);
    burner.add(core);
    return core;
  });

  const shimmer = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.4, 0.82, 14, 3, true),
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
          vAlpha = smoothstep(-0.42, 0.08, position.y) * (1.0 - smoothstep(0.12, 0.4, position.y));
          gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
        }
      `,
      fragmentShader: /* glsl */`
        uniform float uHeat;
        varying float vAlpha;
        void main() {
          gl_FragColor = vec4(1.0, 0.48, 0.16, vAlpha * uHeat * 0.06);
        }
      `,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    })
  );
  shimmer.name = "balloon-burner-heat-shimmer";
  shimmer.position.y = 0.08;
  burner.add(shimmer);

  function update(elapsed, heat = 0.18) {
    const level = Math.max(0, Math.min(1, heat));
    const active = Math.max(0, (level - 0.2) / 0.8);
    blueCores.forEach((core, index) => {
      core.visible = active > 0.035;
      core.scale.setScalar(0.7 + active * 0.42 + Math.sin(elapsed * 17 + index) * 0.025);
      core.material.opacity = active * 0.82;
    });
    shimmer.material.uniforms.uTime.value = elapsed;
    shimmer.material.uniforms.uHeat.value = active;
    shimmer.visible = active > 0.08;
  }

  return { id: BURNER_ILLUMINATION_KIT_ID, blueCores, shimmer, update };
}

window.OpenAboveBurnerIlluminationKit = { id: BURNER_ILLUMINATION_KIT_ID, installBurnerIllumination };
