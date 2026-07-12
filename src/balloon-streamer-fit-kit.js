import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export const BALLOON_STREAMER_FIT_KIT_ID = "open-above-balloon-streamer-fit-kit";

export const defaultStreamerFitProfile = {
  integrated: true,
  accentEvery: 6,
  colors: [0xe2b84f, 0xf1ce68, 0xc99832, 0xf6dd8c, 0xd8aa3e, 0xf0c95c],
  accentColors: [0xb9782f, 0xd18d37]
};

export function buildFittedStreamers(profile = defaultStreamerFitProfile) {
  const group = new THREE.Group();
  group.name = "balloon-integrated-color-pattern";
  group.userData.domain = BALLOON_STREAMER_FIT_KIT_ID;
  group.userData.surfaceFitted = true;
  group.userData.integratedIntoEnvelope = true;
  group.userData.pattern = {
    accentEvery: Math.max(0, Math.floor(profile.accentEvery ?? 0)),
    colors: [...(profile.colors ?? defaultStreamerFitProfile.colors)],
    accentColors: [...(profile.accentColors ?? defaultStreamerFitProfile.accentColors)]
  };
  return group;
}

window.OpenAboveBalloonStreamerFitKit = {
  id: BALLOON_STREAMER_FIT_KIT_ID,
  defaultStreamerFitProfile,
  buildFittedStreamers
};
