import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { GLSL_NOISE } from "../shader-noise.js";

export const WATER_SURFACE_KIT_ID = "open-above-water-surface-kit";

export function createWaterSurfaces(scene, sunDirection) {
  const uniforms = {
    uTime: { value: 0 },
    uSunDirection: { value: sunDirection.clone() },
    uSkyColor: { value: new THREE.Color(0x8bcce8) },
    uDeepColor: { value: new THREE.Color(0x285f70) },
    uShallowColor: { value: new THREE.Color(0x69afad) }
  };
  const material = new THREE.ShaderMaterial({
    name: "OpenAboveWaterSurfaceMaterial",
    uniforms,
    vertexShader: /* glsl */`
      varying vec3 vWorldPosition;
      varying vec3 vWorldNormal;
      void main() {
        vec3 displaced = position;
        displaced.y += sin((position.x + position.z) * 0.055) * 0.035;
        vec4 world = modelMatrix * vec4(displaced, 1.0);
        vWorldPosition = world.xyz;
        vWorldNormal = normalize(mat3(modelMatrix) * normal);
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: /* glsl */`
      uniform float uTime;
      uniform vec3 uSunDirection;
      uniform vec3 uSkyColor;
      uniform vec3 uDeepColor;
      uniform vec3 uShallowColor;
      varying vec3 vWorldPosition;
      varying vec3 vWorldNormal;
      ${GLSL_NOISE}
      void main() {
        vec2 uv = vWorldPosition.xz * 0.025;
        float rippleA = noise2(uv + vec2(uTime * 0.07, uTime * 0.025));
        float rippleB = noise2(uv * 1.8 - vec2(uTime * 0.04, uTime * 0.055));
        vec3 normal = normalize(vWorldNormal + vec3((rippleA - 0.5) * 0.18, 0.0, (rippleB - 0.5) * 0.18));
        vec3 viewDir = normalize(cameraPosition - vWorldPosition);
        float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 4.0);
        float sunGlint = pow(max(dot(reflect(-normalize(uSunDirection), normal), viewDir), 0.0), 96.0);
        float depthHint = smoothstep(-34.0, -5.0, vWorldPosition.y);
        vec3 base = mix(uDeepColor, uShallowColor, depthHint);
        vec3 color = mix(base, uSkyColor, 0.24 + fresnel * 0.68);
        color += vec3(1.0, 0.72, 0.38) * sunGlint * 5.0;
        gl_FragColor = vec4(color, 0.82);
      }
    `,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    fog: true
  });

  const group = new THREE.Group();
  group.name = "open-above-water-surfaces";
  for (const lake of [
    { x: -260, z: 180, rx: 205, rz: 112, y: -21 },
    { x: 420, z: -340, rx: 240, rz: 138, y: -14 }
  ]) {
    const mesh = new THREE.Mesh(new THREE.CircleGeometry(1, 96), material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.scale.set(lake.rx, lake.rz, 1);
    mesh.position.set(lake.x, lake.y, lake.z);
    mesh.name = "open-above-fresnel-lake";
    group.add(mesh);
  }
  scene.add(group);

  function update(elapsed, nextSunDirection) {
    uniforms.uTime.value = elapsed;
    uniforms.uSunDirection.value.copy(nextSunDirection).normalize();
  }

  return { id: WATER_SURFACE_KIT_ID, group, material, uniforms, update };
}

window.OpenAboveWaterSurfaceKit = { id: WATER_SURFACE_KIT_ID, createWaterSurfaces };
