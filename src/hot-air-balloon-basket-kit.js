import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export const HOT_AIR_BALLOON_BASKET_KIT_ID = "open-above-hot-air-balloon-basket-kit";

export const defaultBasketProfile = {
  width: 1.38,
  height: 0.9,
  depth: 1.08,
  color: 0x8b5a2b,
  trimColor: 0x3f2412
};

export function buildBasket(profile = defaultBasketProfile) {
  const group = new THREE.Group();
  group.name = "hot-air-balloon-basket";
  group.userData.domain = HOT_AIR_BALLOON_BASKET_KIT_ID;

  const basket = new THREE.Mesh(
    new THREE.BoxGeometry(profile.width, profile.height, profile.depth),
    new THREE.MeshStandardMaterial({ color: profile.color, roughness: 0.94, metalness: 0.01 })
  );
  basket.position.y = -1.55;
  group.add(basket);

  const trimMat = new THREE.MeshStandardMaterial({ color: profile.trimColor, roughness: 0.9 });
  for (const y of [-1.1, -1.98]) {
    const front = new THREE.Mesh(new THREE.BoxGeometry(profile.width + 0.12, 0.06, 0.06), trimMat);
    front.position.set(0, y, -profile.depth / 2 - 0.04);
    const back = front.clone();
    back.position.z *= -1;
    const left = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, profile.depth + 0.12), trimMat);
    left.position.set(-profile.width / 2 - 0.04, y, 0);
    const right = left.clone();
    right.position.x *= -1;
    group.add(front, back, left, right);
  }

  return group;
}

window.OpenAboveHotAirBalloonBasketKit = {
  id: HOT_AIR_BALLOON_BASKET_KIT_ID,
  defaultBasketProfile,
  buildBasket
};
