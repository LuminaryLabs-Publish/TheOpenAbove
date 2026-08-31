import * as THREE from "three";

export const AIRSTREAM_TRAIL_MATERIAL_KIT_ID = "open-above-airstream-trail-material-kit";

const vertexShader = /* glsl */`
  attribute vec3 aFrom;
  attribute vec3 aTo;
  attribute vec3 aPreviousFrom;
  attribute vec3 aPreviousTo;
  attribute vec3 aNextFrom;
  attribute vec3 aNextTo;
  attribute float aSide;
  attribute float aAlong;
  attribute float aWidth;
  attribute float aIntensity;
  attribute float aPhase;
  attribute float aFlowSpeed;
  attribute float aOpacity;
  attribute vec3 aColor;

  uniform float uTime;
  uniform float uMorph;
  uniform float uGlobalOpacity;

  varying float vAlong;
  varying float vEdge;
  varying float vIntensity;
  varying float vPhase;
  varying float vFlowSpeed;
  varying float vOpacity;
  varying float vCameraDistance;
  varying vec3 vColor;

  void main() {
    float morph = smoothstep(0.0, 1.0, uMorph);
    vec3 center = mix(aFrom, aTo, morph);
    vec3 previous = mix(aPreviousFrom, aPreviousTo, morph);
    vec3 next = mix(aNextFrom, aNextTo, morph);
    vec3 tangent = normalize(next - previous + vec3(0.00001, 0.0, 0.0));
    vec3 worldCenter = (modelMatrix * vec4(center, 1.0)).xyz;
    vec3 worldTangent = normalize(mat3(modelMatrix) * tangent);
    vec3 viewDirection = normalize(cameraPosition - worldCenter);
    vec3 sideAxis = cross(viewDirection, worldTangent);
    float sideLength = length(sideAxis);
    if (sideLength < 0.0001) sideAxis = vec3(1.0, 0.0, 0.0);
    else sideAxis /= sideLength;

    float headFade = smoothstep(0.0, 0.09, aAlong);
    float tailFade = 1.0 - smoothstep(0.86, 1.0, aAlong);
    float taper = headFade * tailFade;
    float broadWave = sin(aAlong * 15.0 - uTime * 0.76 + aPhase) * 0.16;
    float detailWave = sin(aAlong * 37.0 + uTime * 1.14 + aPhase * 1.73) * 0.055;
    float wave = (broadWave + detailWave) * aWidth * (0.45 + aIntensity * 0.55);
    float halfWidth = aWidth * taper * (0.82 + sin(aAlong * 11.0 + aPhase) * 0.11);
    worldCenter += sideAxis * (wave + aSide * halfWidth);

    vAlong = aAlong;
    vEdge = aSide;
    vIntensity = aIntensity;
    vPhase = aPhase;
    vFlowSpeed = aFlowSpeed;
    vOpacity = aOpacity * uGlobalOpacity;
    vCameraDistance = length(cameraPosition - worldCenter);
    vColor = aColor;
    gl_Position = projectionMatrix * viewMatrix * vec4(worldCenter, 1.0);
  }
`;

const fragmentShader = /* glsl */`
  precision highp float;

  uniform float uTime;

  varying float vAlong;
  varying float vEdge;
  varying float vIntensity;
  varying float vPhase;
  varying float vFlowSpeed;
  varying float vOpacity;
  varying float vCameraDistance;
  varying vec3 vColor;

  void main() {
    float edge = 1.0 - smoothstep(0.58, 1.0, abs(vEdge));
    float head = smoothstep(0.0, 0.085, vAlong);
    float tail = 1.0 - smoothstep(0.83, 1.0, vAlong);
    float ends = head * tail;
    float flowPhase = vAlong * 42.0 - uTime * (4.4 + vFlowSpeed * 2.6) + vPhase;
    float primary = 0.5 + 0.5 * sin(flowPhase);
    float filament = 0.5 + 0.5 * sin(flowPhase * 0.47 + vAlong * 21.0 + vPhase * 2.1);
    float wisps = smoothstep(0.18, 0.96, primary * 0.72 + filament * 0.42);
    float nearFade = smoothstep(2.8, 8.5, vCameraDistance);
    float farFade = 1.0 - smoothstep(210.0, 330.0, vCameraDistance);
    float alpha = vOpacity * edge * ends * nearFade * farFade * (0.28 + wisps * 0.72);
    alpha *= 0.72 + vIntensity * 0.38;
    if (alpha < 0.004) discard;

    vec3 glow = vColor * (0.82 + vIntensity * 0.34 + wisps * 0.12);
    gl_FragColor = vec4(glow * alpha, alpha);
  }
`;

export function createAirstreamTrailMaterial() {
  const material = new THREE.ShaderMaterial({
    name: "open-above-airstream-trail-material",
    uniforms: {
      uTime: { value: 0 },
      uMorph: { value: 1 },
      uGlobalOpacity: { value: 1 }
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    depthTest: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.NormalBlending,
    premultipliedAlpha: true,
    toneMapped: false
  });
  material.userData.airstreamTrails = { id: AIRSTREAM_TRAIL_MATERIAL_KIT_ID };
  return material;
}
