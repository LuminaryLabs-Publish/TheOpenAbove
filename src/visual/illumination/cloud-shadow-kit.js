import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { GLSL_NOISE } from "../shader-noise.js";

export const CLOUD_SHADOW_KIT_ID = "open-above-cloud-shadow-kit";

export function createCloudShadowOverlay(scene, terrainMesh, weatherMap) {
  const uniforms = {
    uWeatherOffset: { value: new THREE.Vector2() },
    uCoverage: { value: weatherMap.state.coverage },
    uOpacity: { value: 0.26 }
  };
  const material = new THREE.ShaderMaterial({
    name: "OpenAboveCloudShadowMaterial",
    uniforms,
    vertexShader: /* glsl */`
      varying vec3 vWorldPosition;
      void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        vWorldPosition = world.xyz;
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: /* glsl */`
      uniform vec2 uWeatherOffset;
      uniform float uCoverage;
      uniform float uOpacity;
      varying vec3 vWorldPosition;
      ${GLSL_NOISE}
      void main() {
        vec2 q = vWorldPosition.xz * 0.00038 + uWeatherOffset;
        float weather = fbm2(q * 1.15) * 0.72 + fbm2(q * 2.7 + 18.3) * 0.28;
        float shadow = smoothstep(1.02 - uCoverage, 0.72, weather);
        shadow *= smoothstep(0.0, 160.0, vWorldPosition.y + 80.0);
        gl_FragColor = vec4(vec3(0.055, 0.07, 0.095), shadow * uOpacity);
      }
    `,
    transparent: true,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
    blending: THREE.MultiplyBlending
  });
  const mesh = new THREE.Mesh(terrainMesh.geometry.clone(), material);
  mesh.name = "open-above-moving-cloud-shadows";
  mesh.position.copy(terrainMesh.position).add(new THREE.Vector3(0, 0.28, 0));
  mesh.rotation.copy(terrainMesh.rotation);
  mesh.renderOrder = 3;
  scene.add(mesh);

  function update() {
    uniforms.uWeatherOffset.value.set(...weatherMap.state.offset);
    uniforms.uCoverage.value = weatherMap.state.coverage;
  }

  return { id: CLOUD_SHADOW_KIT_ID, mesh, uniforms, update };
}

window.OpenAboveCloudShadowKit = { id: CLOUD_SHADOW_KIT_ID, createCloudShadowOverlay };
