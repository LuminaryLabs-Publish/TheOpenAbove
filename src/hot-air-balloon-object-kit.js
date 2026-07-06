import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { buildEnvelope, defaultEnvelopeProfile } from "./hot-air-balloon-envelope-kit.js";
import { buildBasket, defaultBasketProfile } from "./hot-air-balloon-basket-kit.js";
import { buildRigging, defaultRiggingProfile, animateRigging } from "./hot-air-balloon-rigging-kit.js";
import { buildBurner, defaultBurnerProfile, animateBurner } from "./hot-air-balloon-burner-kit.js";

export const HOT_AIR_BALLOON_OBJECT_KIT_ID = "open-above-hot-air-balloon-object-kit";

export const defaultHotAirBalloonProfile = {
  envelope: defaultEnvelopeProfile,
  basket: defaultBasketProfile,
  rigging: defaultRiggingProfile,
  burner: defaultBurnerProfile,
  scale: 2.35,
  visualOffsetY: -0.52
};

function findVehicle(scene) {
  let vehicle = null;
  scene?.traverse?.((node) => {
    if (!vehicle && node?.userData?.leftWing && node?.userData?.rightWing && node?.userData?.tail) vehicle = node;
  });
  return vehicle;
}

function makeCompatibilityControls() {
  const leftWing = new THREE.Group();
  const rightWing = new THREE.Group();
  const tail = new THREE.Group();
  leftWing.visible = false;
  rightWing.visible = false;
  tail.visible = false;
  return { leftWing, rightWing, tail };
}

export function buildHotAirBalloon(profile = defaultHotAirBalloonProfile) {
  const group = new THREE.Group();
  group.name = "open-above-procedural-hot-air-balloon";
  group.userData.domain = HOT_AIR_BALLOON_OBJECT_KIT_ID;
  group.userData.subdomains = [
    "open-above-hot-air-balloon-envelope-kit",
    "open-above-hot-air-balloon-basket-kit",
    "open-above-hot-air-balloon-rigging-kit",
    "open-above-hot-air-balloon-burner-kit",
    "open-above-rope-kit"
  ];

  const envelope = buildEnvelope(profile.envelope);
  const basket = buildBasket(profile.basket);
  const rigging = buildRigging(profile.rigging);
  const burner = buildBurner(profile.burner);

  group.add(envelope, rigging, basket, burner);
  group.position.y = profile.visualOffsetY;
  group.scale.setScalar(profile.scale);
  group.userData.parts = { envelope, rigging, basket, burner };
  group.userData.basketFocusOffset = new THREE.Vector3(2.4, -4.85, 0);
  return group;
}

export function animateHotAirBalloon(balloon, time = performance.now()) {
  const parts = balloon?.userData?.parts;
  if (!parts) return;
  animateBurner(parts.burner, time);
  animateRigging(parts.rigging, time);
}

export function installHotAirBalloonVisual(host, profile = defaultHotAirBalloonProfile) {
  const vehicle = findVehicle(host?.scene);
  if (!vehicle || vehicle.userData.hotAirBalloonInstalled) return null;

  while (vehicle.children.length) vehicle.remove(vehicle.children[0]);

  const balloon = buildHotAirBalloon(profile);
  const controls = makeCompatibilityControls();
  vehicle.add(balloon, controls.leftWing, controls.rightWing, controls.tail);
  vehicle.userData.leftWing = controls.leftWing;
  vehicle.userData.rightWing = controls.rightWing;
  vehicle.userData.tail = controls.tail;
  vehicle.userData.hotAirBalloonInstalled = true;
  vehicle.userData.hotAirBalloon = balloon;
  vehicle.userData.openAboveObjectType = "hot-air-balloon";
  vehicle.userData.openAboveObjectKit = HOT_AIR_BALLOON_OBJECT_KIT_ID;
  return balloon;
}

function attachWhenReady() {
  const host = window.GameHost;
  if (!host?.scene) {
    requestAnimationFrame(attachWhenReady);
    return;
  }

  installHotAirBalloonVisual(host);

  function tick(time) {
    const balloon = findVehicle(host.scene)?.userData?.hotAirBalloon;
    animateHotAirBalloon(balloon, time);
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

window.OpenAboveHotAirBalloonObjectKit = {
  id: HOT_AIR_BALLOON_OBJECT_KIT_ID,
  profile: defaultHotAirBalloonProfile,
  buildHotAirBalloon,
  animateHotAirBalloon,
  installHotAirBalloonVisual
};
requestAnimationFrame(attachWhenReady);
