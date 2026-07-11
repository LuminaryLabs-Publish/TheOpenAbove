import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export const MAIL_TOWN_KIT_ID = "open-above-mail-town-kit";

function createHouse(materials, index) {
  const house = new THREE.Group();
  const wall = new THREE.Mesh(
    new THREE.BoxGeometry(11, 7, 9),
    materials.wall
  );
  wall.position.y = 3.5;
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(8, 4.8, 4),
    materials.roof
  );
  roof.position.y = 9.1;
  roof.rotation.y = Math.PI * 0.25;
  house.add(wall, roof);
  house.rotation.y = (index * 1.91) % (Math.PI * 2);
  house.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  return house;
}

function createMailMarker(town) {
  const group = new THREE.Group();
  const pole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.8, 1, 18, 8),
    new THREE.MeshStandardMaterial({ color: 0xf4f0df, roughness: 0.72 })
  );
  pole.position.y = 9;
  const envelope = new THREE.Mesh(
    new THREE.BoxGeometry(10, 6, 1.5),
    new THREE.MeshStandardMaterial({
      color: town.color,
      emissive: town.color,
      emissiveIntensity: 0.28,
      roughness: 0.7
    })
  );
  envelope.position.y = 20;
  group.add(pole, envelope);

  const ring = new THREE.Mesh(
    new THREE.RingGeometry(town.deliveryRadius * 0.9, town.deliveryRadius, 64),
    new THREE.MeshBasicMaterial({
      color: town.color,
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide,
      depthWrite: false
    })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = town.safeAltitude;
  group.add(ring);
  return group;
}

function createTownGroup(town, terrainHeight) {
  const group = new THREE.Group();
  group.name = `mail-town-${town.id}`;
  const materials = {
    wall: new THREE.MeshStandardMaterial({ color: 0xd7c18e, roughness: 0.93 }),
    roof: new THREE.MeshStandardMaterial({ color: town.color, roughness: 0.88 })
  };

  for (let index = 0; index < 10; index += 1) {
    const angle = index * 2.399963;
    const radius = 28 + (index % 4) * 16;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const house = createHouse(materials, index);
    house.position.set(
      x,
      terrainHeight(town.position.x + x, town.position.z + z) - terrainHeight(town.position.x, town.position.z),
      z
    );
    group.add(house);
  }

  const marker = createMailMarker(town);
  group.add(marker);
  group.position.set(
    town.position.x,
    terrainHeight(town.position.x, town.position.z),
    town.position.z
  );
  return group;
}

export function createMailTownVisuals({ scene, towns = [], terrainHeight = () => 0 } = {}) {
  const group = new THREE.Group();
  group.name = "open-above-mail-towns";
  const records = new Map();

  for (const town of towns) {
    const townGroup = createTownGroup(town, terrainHeight);
    group.add(townGroup);
    records.set(town.id, townGroup);
  }

  scene?.add(group);

  function update(elapsed = 0, destinationTownId = null) {
    for (const [townId, townGroup] of records) {
      const marker = townGroup.children[townGroup.children.length - 1];
      const envelope = marker?.children?.[1];
      const ring = marker?.children?.[2];
      const active = townId === destinationTownId;
      const pulse = 0.78 + Math.sin(elapsed * 2.1) * 0.22;
      if (envelope?.material) envelope.material.emissiveIntensity = active ? 0.5 * pulse : 0.14;
      if (ring?.material) ring.material.opacity = active ? 0.3 * pulse : 0.1;
    }
  }

  function dispose() {
    group.removeFromParent();
    group.traverse((object) => {
      object.geometry?.dispose?.();
      object.material?.dispose?.();
    });
  }

  return { id: MAIL_TOWN_KIT_ID, group, records, update, dispose };
}
