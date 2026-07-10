import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export const PHYSICAL_SKY_KIT_ID = "open-above-physical-sky-kit";

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
uniform vec3 uZenithColor;
uniform vec3 uHorizonColor;
uniform vec3 uGroundHazeColor;
uniform float uTurbidity;
uniform float uRayleigh;
uniform float uMie;
uniform float uSunIntensity;
varying vec3 vWorldDirection;

float phaseRayleigh(float cosTheta) {
  return 0.75 * (1.0 + cosTheta * cosTheta);
}
float phaseMie(float cosTheta, float g) {
  float g2 = g * g;
  return (1.0 - g2) / pow(max(0.001, 1.0 + g2 - 2.0 * g * cosTheta), 1.5);
}

void main() {
  vec3 ray = normalize(vWorldDirection);
  float up = clamp(ray.y * 0.5 + 0.5, 0.0, 1.0);
  float horizon = exp(-abs(ray.y) * (5.0 + uTurbidity * 0.32));
  float sunCos = dot(ray, normalize(uSunDirection));
  float rayleighPhase = phaseRayleigh(sunCos);
  float miePhase = phaseMie(sunCos, 0.78);
  float airMass = 1.0 / max(0.08, ray.y + 0.22);
  vec3 sky = mix(uHorizonColor, uZenithColor, pow(up, 0.62));
  sky += vec3(0.16, 0.24, 0.42) * uRayleigh * rayleighPhase * pow(up, 0.35) * 0.28;
  sky += vec3(1.0, 0.54, 0.22) * uMie * miePhase * horizon * 0.035;
  sky = mix(sky, uGroundHazeColor, horizon * 0.52);
  sky *= 0.92 + 0.08 / max(1.0, airMass * 0.08);

  float sunDisc = smoothstep(0.99962, 0.99991, sunCos);
  float sunHalo = pow(max(sunCos, 0.0), 320.0) * 1.8 + pow(max(sunCos, 0.0), 34.0) * 0.18;
  vec3 sunColor = vec3(1.0, 0.62, 0.27) * uSunIntensity;
  sky += sunColor * (sunDisc * 8.5 + sunHalo);

  gl_FragColor = vec4(max(sky, vec3(0.0)), 1.0);
}
`;

export function createPhysicalSky(scene, profile = {}) {
  const uniforms = {
    uSunDirection: { value: new THREE.Vector3(-0.45, 0.26, -0.85).normalize() },
    uZenithColor: { value: new THREE.Color(profile.zenithColor ?? 0x5e9fd4) },
    uHorizonColor: { value: new THREE.Color(profile.horizonColor ?? 0xf5b273) },
    uGroundHazeColor: { value: new THREE.Color(profile.groundHazeColor ?? 0xe2a36f) },
    uTurbidity: { value: profile.turbidity ?? 5.5 },
    uRayleigh: { value: profile.rayleigh ?? 1.2 },
    uMie: { value: profile.mie ?? 0.9 },
    uSunIntensity: { value: profile.sunIntensity ?? 1.15 }
  };

  const material = new THREE.ShaderMaterial({
    name: "OpenAbovePhysicalSkyMaterial",
    uniforms,
    vertexShader,
    fragmentShader,
    side: THREE.BackSide,
    depthWrite: false,
    fog: false
  });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(4200, 48, 28), material);
  mesh.name = "open-above-physical-sky";
  mesh.frustumCulled = false;
  mesh.renderOrder = -100;
  scene.add(mesh);

  function update(camera, sunDirection) {
    mesh.position.copy(camera.position);
    uniforms.uSunDirection.value.copy(sunDirection).normalize();
  }

  return { id: PHYSICAL_SKY_KIT_ID, mesh, uniforms, update };
}

window.OpenAbovePhysicalSkyKit = { id: PHYSICAL_SKY_KIT_ID, createPhysicalSky };
