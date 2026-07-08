import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export const HOT_AIR_BALLOON_BASKET_KIT_ID = "open-above-hot-air-balloon-basket-kit";

export const defaultBasketProfile = {
  width: 1.38,
  height: 0.9,
  depth: 1.08,
  color: 0x8b5a2b,
  trimColor: 0x3f2412,
  weaveColor: 0xa36a32,
  floorColor: 0x6b3f1f,
  eyeHeightMeters: 1.5
};

function addPanel(group, geometry, material, position, rotation = null) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);
  if (rotation) mesh.rotation.set(...rotation);
  group.add(mesh);
  return mesh;
}

export function buildBasket(profile = defaultBasketProfile) {
  const group = new THREE.Group();
  group.name = "hot-air-balloon-basket";
  group.userData.domain = HOT_AIR_BALLOON_BASKET_KIT_ID;
  group.userData.eyeHeightMeters = profile.eyeHeightMeters ?? defaultBasketProfile.eyeHeightMeters;

  const wallMat = new THREE.MeshStandardMaterial({ color: profile.color, roughness: 0.94, metalness: 0.01 });
  const trimMat = new THREE.MeshStandardMaterial({ color: profile.trimColor, roughness: 0.9 });
  const weaveMat = new THREE.MeshStandardMaterial({ color: profile.weaveColor, roughness: 0.96 });
  const floorMat = new THREE.MeshStandardMaterial({ color: profile.floorColor, roughness: 0.92 });

  const yCenter = -1.55;
  const floorY = yCenter - profile.height * 0.5;
  const rimY = yCenter + profile.height * 0.5;
  const wallThickness = 0.075;

  const floor = addPanel(group, new THREE.BoxGeometry(profile.width, 0.08, profile.depth), floorMat, [0, floorY, 0]);
  floor.name = "basket-floor-base";

  const front = addPanel(group, new THREE.BoxGeometry(profile.width, profile.height, wallThickness), wallMat, [0, yCenter, -profile.depth / 2]);
  front.name = "basket-front-woven-wall";
  const back = addPanel(group, new THREE.BoxGeometry(profile.width, profile.height, wallThickness), wallMat, [0, yCenter, profile.depth / 2]);
  back.name = "basket-back-woven-wall";
  const left = addPanel(group, new THREE.BoxGeometry(wallThickness, profile.height, profile.depth), wallMat, [-profile.width / 2, yCenter, 0]);
  left.name = "basket-left-woven-wall";
  const right = addPanel(group, new THREE.BoxGeometry(wallThickness, profile.height, profile.depth), wallMat, [profile.width / 2, yCenter, 0]);
  right.name = "basket-right-woven-wall";

  for (const y of [rimY, yCenter, floorY + 0.08]) {
    addPanel(group, new THREE.BoxGeometry(profile.width + 0.18, 0.065, 0.075), trimMat, [0, y, -profile.depth / 2 - 0.045]);
    addPanel(group, new THREE.BoxGeometry(profile.width + 0.18, 0.065, 0.075), trimMat, [0, y, profile.depth / 2 + 0.045]);
    addPanel(group, new THREE.BoxGeometry(0.075, 0.065, profile.depth + 0.18), trimMat, [-profile.width / 2 - 0.045, y, 0]);
    addPanel(group, new THREE.BoxGeometry(0.075, 0.065, profile.depth + 0.18), trimMat, [profile.width / 2 + 0.045, y, 0]);
  }

  for (let i = -3; i <= 3; i += 1) {
    addPanel(group, new THREE.BoxGeometry(0.035, profile.height * 0.92, 0.025), weaveMat, [i * profile.width / 7, yCenter, -profile.depth / 2 - 0.083]);
    addPanel(group, new THREE.BoxGeometry(0.035, profile.height * 0.92, 0.025), weaveMat, [i * profile.width / 7, yCenter, profile.depth / 2 + 0.083]);
  }

  for (let i = -2; i <= 2; i += 1) {
    const plank = addPanel(group, new THREE.BoxGeometry(profile.width * 0.88, 0.025, 0.055), floorMat, [0, floorY + 0.07, i * profile.depth / 6]);
    plank.name = "basket-floor-plank";
  }

  const controls = new THREE.Group();
  controls.name = "basket-burner-controls";
  const leverMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.52, metalness: 0.42 });
  const knobMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.48, metalness: 0.12 });
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.38, 8), leverMat);
  post.position.set(0.28, rimY + 0.04, -0.18);
  post.rotation.z = -0.25;
  const knob = new THREE.Mesh(new THREE.SphereGeometry(0.055, 10, 8), knobMat);
  knob.position.set(0.34, rimY + 0.22, -0.18);
  controls.add(post, knob);
  group.add(controls);

  const sandMat = new THREE.MeshStandardMaterial({ color: 0xc2a36c, roughness: 0.98 });
  for (const x of [-0.48, 0.48]) {
    const bag = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.12, 0.18), sandMat);
    bag.name = "basket-sandbag";
    bag.position.set(x, floorY + 0.12, 0.34);
    bag.rotation.y = x > 0 ? 0.25 : -0.18;
    group.add(bag);
  }

  const blanket = new THREE.Mesh(
    new THREE.BoxGeometry(0.44, 0.025, 0.28),
    new THREE.MeshStandardMaterial({ color: 0x7c2d12, roughness: 0.86 })
  );
  blanket.name = "basket-folded-blanket";
  blanket.position.set(-0.28, floorY + 0.13, -0.2);
  blanket.rotation.y = -0.15;
  group.add(blanket);

  const lantern = new THREE.Group();
  lantern.name = "basket-lantern";
  const lanternBody = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.065, 0.16, 8), new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.46, metalness: 0.45 }));
  const lanternGlow = new THREE.PointLight(0xffb66b, 0.28, 2.2);
  lantern.position.set(0.48, rimY + 0.08, 0.26);
  lantern.add(lanternBody, lanternGlow);
  group.add(lantern);

  group.userData.basketFloorY = floorY;
  group.userData.riderEyeY = floorY + group.userData.eyeHeightMeters;
  group.userData.warmTargets = [front, back, left, right, floor];
  return group;
}

window.OpenAboveHotAirBalloonBasketKit = {
  id: HOT_AIR_BALLOON_BASKET_KIT_ID,
  defaultBasketProfile,
  buildBasket
};
