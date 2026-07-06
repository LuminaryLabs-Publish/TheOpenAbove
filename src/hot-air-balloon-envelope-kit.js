import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export const HOT_AIR_BALLOON_ENVELOPE_KIT_ID = "open-above-hot-air-balloon-envelope-kit";

export const defaultEnvelopeProfile = {
  radius: 2.55,
  heightScale: 1.32,
  segments: 24,
  rings: 16,
  colors: [0xf97316, 0xffd166, 0x38bdf8, 0xef4444]
};

export function buildEnvelope(profile = defaultEnvelopeProfile) {
  const group = new THREE.Group();
  group.name = "hot-air-balloon-envelope";
  group.userData.domain = HOT_AIR_BALLOON_ENVELOPE_KIT_ID;

  const envelope = new THREE.Mesh(
    new THREE.SphereGeometry(profile.radius, profile.segments, profile.rings),
    new THREE.MeshStandardMaterial({ color: 0xffd166, roughness: 0.72, metalness: 0.01 })
  );
  envelope.scale.set(1, profile.heightScale, 1);
  envelope.position.y = 3.25;
  group.add(envelope);

  const goreCount = profile.colors.length;
  for (let i = 0; i < goreCount; i += 1) {
    const angle = (i / goreCount) * Math.PI * 2;
    const stripe = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, profile.radius * 2.35, profile.radius * 0.22),
      new THREE.MeshStandardMaterial({ color: profile.colors[i], roughness: 0.8 })
    );
    stripe.position.set(Math.sin(angle) * profile.radius * 0.97, 3.25, Math.cos(angle) * profile.radius * 0.97);
    stripe.rotation.y = angle;
    group.add(stripe);
  }

  const skirt = new THREE.Mesh(
    new THREE.TorusGeometry(profile.radius * 0.48, 0.045, 8, 32),
    new THREE.MeshStandardMaterial({ color: 0x7c2d12, roughness: 0.86 })
  );
  skirt.position.y = 0.35;
  group.add(skirt);

  return group;
}

window.OpenAboveHotAirBalloonEnvelopeKit = {
  id: HOT_AIR_BALLOON_ENVELOPE_KIT_ID,
  defaultEnvelopeProfile,
  buildEnvelope
};
