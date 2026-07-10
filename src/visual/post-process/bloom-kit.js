import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { UnrealBloomPass } from "https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/postprocessing/UnrealBloomPass.js";

export const BLOOM_KIT_ID = "open-above-bloom-kit";

export function createBloomKit(quality, profile = {}) {
  const pass = new UnrealBloomPass(
    new THREE.Vector2(innerWidth || 1280, innerHeight || 720),
    profile.strength ?? quality.bloomStrength,
    profile.radius ?? 0.42,
    profile.threshold ?? 1.08
  );
  pass.name = "OpenAboveSelectiveHdrBloomPass";
  function update({ sunFacing = 0, burner = 0.18 } = {}) {
    pass.strength = quality.bloomStrength + Math.max(0, sunFacing) * 0.18 + Math.max(0, burner - 0.4) * 0.22;
  }
  return { id: BLOOM_KIT_ID, pass, update };
}

window.OpenAboveBloomKit = { id: BLOOM_KIT_ID, createBloomKit };
