import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export const HOT_AIR_BALLOON_BASKET_KIT_ID = "open-above-hot-air-balloon-basket-kit";

export const defaultBasketProfile = {
  width: 1.55,
  height: 1.05,
  depth: 1.18,
  topRadius: 0.78,
  bottomRadius: 0.68,
  color: 0x8f5b2d,
  trimColor: 0x422514,
  weaveColor: 0xb27238,
  floorColor: 0x65401f,
  cylinderColor: 0x294867,
  eyeHeightMeters: 1.5
};

function ellipseScale(mesh, width, depth, sourceDiameter) {
  mesh.scale.set(width / sourceDiameter, 1, depth / sourceDiameter);
  return mesh;
}

function createRim(radius, width, depth, color) {
  const rim = new THREE.Mesh(
    new THREE.TorusGeometry(radius, 0.055, 6, 16),
    new THREE.MeshStandardMaterial({ color, roughness: 0.86, metalness: 0.02 })
  );
  rim.rotation.x = Math.PI / 2;
  ellipseScale(rim, width, depth, radius * 2);
  return rim;
}

export function buildBasket(profile = defaultBasketProfile) {
  const p = { ...defaultBasketProfile, ...profile };
  const group = new THREE.Group();
  group.name = "hot-air-balloon-basket";
  group.userData.domain = HOT_AIR_BALLOON_BASKET_KIT_ID;
  group.userData.eyeHeightMeters = p.eyeHeightMeters;

  const yCenter = -1.72;
  const floorY = yCenter - p.height * 0.5;
  const rimY = yCenter + p.height * 0.5;
  const wallMat = new THREE.MeshStandardMaterial({ color: p.color, roughness: 0.95, metalness: 0 });
  const trimMat = new THREE.MeshStandardMaterial({ color: p.trimColor, roughness: 0.88, metalness: 0.03 });
  const ribMat = new THREE.MeshStandardMaterial({ color: p.weaveColor, roughness: 0.94, metalness: 0 });

  const shell = new THREE.Mesh(
    new THREE.CylinderGeometry(p.topRadius, p.bottomRadius, p.height, 8, 1, true),
    wallMat
  );
  shell.name = "basket-woven-tapered-shell";
  shell.position.y = yCenter;
  shell.rotation.y = Math.PI / 8;
  ellipseScale(shell, p.width, p.depth, p.topRadius * 2);
  shell.castShadow = true;
  shell.receiveShadow = true;
  group.add(shell);

  const topRim = createRim(p.topRadius, p.width + 0.12, p.depth + 0.12, p.trimColor);
  topRim.name = "basket-reinforced-upper-rim";
  topRim.position.y = rimY;
  group.add(topRim);

  const bottomRim = createRim(p.bottomRadius, p.width * 0.88, p.depth * 0.88, p.trimColor);
  bottomRim.name = "basket-reinforced-lower-rim";
  bottomRim.position.y = floorY + 0.04;
  group.add(bottomRim);

  const floor = new THREE.Mesh(
    new THREE.CylinderGeometry(p.bottomRadius * 0.94, p.bottomRadius * 0.94, 0.09, 8),
    new THREE.MeshStandardMaterial({ color: p.floorColor, roughness: 0.94 })
  );
  floor.name = "basket-floor-base";
  floor.position.y = floorY;
  floor.rotation.y = Math.PI / 8;
  ellipseScale(floor, p.width * 0.86, p.depth * 0.86, p.bottomRadius * 1.88);
  group.add(floor);

  for (let i = 0; i < 8; i += 1) {
    const angle = i / 8 * Math.PI * 2 + Math.PI / 8;
    const rib = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, p.height * 0.96, 6), ribMat);
    rib.name = "basket-woven-vertical-rib";
    rib.position.set(
      Math.sin(angle) * p.width * 0.47,
      yCenter,
      Math.cos(angle) * p.depth * 0.47
    );
    group.add(rib);
  }

  const cylinderMat = new THREE.MeshStandardMaterial({ color: p.cylinderColor, roughness: 0.52, metalness: 0.38 });
  for (const x of [-0.38, 0.38]) {
    const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.68, 12), cylinderMat);
    tank.name = "basket-propane-cylinder";
    tank.position.set(x, floorY + 0.38, 0.2);
    group.add(tank);
    const valve = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 0.09, 8), trimMat);
    valve.position.set(x, floorY + 0.77, 0.2);
    group.add(valve);
  }

  const controls = new THREE.Group();
  controls.name = "basket-burner-controls";
  const leverMat = new THREE.MeshStandardMaterial({ color: 0x27313d, roughness: 0.48, metalness: 0.52 });
  const knobMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.48, metalness: 0.12 });
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.38, 8), leverMat);
  post.position.set(0.32, rimY + 0.04, -0.16);
  post.rotation.z = -0.25;
  const knob = new THREE.Mesh(new THREE.SphereGeometry(0.055, 10, 8), knobMat);
  knob.position.set(0.38, rimY + 0.22, -0.16);
  controls.add(post, knob);
  group.add(controls);

  group.userData.basketFloorY = floorY;
  group.userData.basketRimY = rimY;
  group.userData.riderEyeY = floorY + p.eyeHeightMeters;
  group.userData.warmTargets = [shell, floor];
  group.userData.propaneCylinders = true;
  return group;
}

window.OpenAboveHotAirBalloonBasketKit = {
  id: HOT_AIR_BALLOON_BASKET_KIT_ID,
  defaultBasketProfile,
  buildBasket
};
