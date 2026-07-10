import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { terrainHeight } from "./terrain-surface-kit.js";

export const DISTANT_LANDMARK_KIT_ID = "open-above-distant-landmark-kit";

function cottage(x, z, scale = 1) {
  const group = new THREE.Group();
  const wall = new THREE.Mesh(new THREE.BoxGeometry(9, 5.5, 7), new THREE.MeshStandardMaterial({ color: 0xc7aa7a, roughness: 0.92 }));
  wall.position.y = 2.75;
  const roof = new THREE.Mesh(new THREE.ConeGeometry(6.6, 3.2, 4), new THREE.MeshStandardMaterial({ color: 0x6f3827, roughness: 0.88 }));
  roof.position.y = 6.6;
  roof.rotation.y = Math.PI * 0.25;
  group.add(wall, roof);
  group.position.set(x, terrainHeight(x, z), z);
  group.scale.setScalar(scale);
  group.traverse((node) => { if (node.isMesh) { node.castShadow = true; node.receiveShadow = true; } });
  return group;
}

function fieldPatch(x, z, width, depth, color, rotation = 0) {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, depth), new THREE.MeshStandardMaterial({ color, roughness: 0.98, side: THREE.DoubleSide }));
  mesh.rotation.x = -Math.PI / 2;
  mesh.rotation.z = rotation;
  mesh.position.set(x, terrainHeight(x, z) + 0.22, z);
  mesh.receiveShadow = true;
  return mesh;
}

export function createDistantLandmarks(scene) {
  const group = new THREE.Group();
  group.name = "open-above-distant-landmarks";
  group.add(
    cottage(-610, -210, 0.82),
    cottage(730, 410, 0.68),
    cottage(330, -760, 0.74),
    fieldPatch(-520, -120, 220, 105, 0xb49a4a, 0.22),
    fieldPatch(-720, 50, 180, 92, 0x78904b, -0.14),
    fieldPatch(680, 330, 200, 96, 0xa97d3e, 0.4)
  );

  const roadMaterial = new THREE.MeshStandardMaterial({ color: 0x9b7959, roughness: 0.98 });
  const roadPoints = [];
  for (let i = 0; i < 32; i += 1) {
    const t = i / 31;
    const x = -900 + t * 1800;
    const z = Math.sin(t * Math.PI * 2.3) * 170 - 140;
    roadPoints.push(new THREE.Vector3(x, terrainHeight(x, z) + 0.28, z));
  }
  const roadCurve = new THREE.CatmullRomCurve3(roadPoints);
  const road = new THREE.Mesh(new THREE.TubeGeometry(roadCurve, 120, 4.2, 6, false), roadMaterial);
  road.name = "open-above-dirt-road";
  road.receiveShadow = true;
  group.add(road);

  const balloonMaterial = new THREE.MeshStandardMaterial({ color: 0xa9492f, roughness: 0.84 });
  for (const marker of [
    { x: -1050, y: 390, z: -880, s: 0.7 },
    { x: 1160, y: 520, z: 660, s: 0.55 }
  ]) {
    const distant = new THREE.Group();
    const envelope = new THREE.Mesh(new THREE.SphereGeometry(8, 12, 8), balloonMaterial);
    envelope.scale.y = 1.22;
    const basket = new THREE.Mesh(new THREE.BoxGeometry(3, 2.2, 2.4), new THREE.MeshStandardMaterial({ color: 0x6f4322, roughness: 0.94 }));
    basket.position.y = -11;
    distant.add(envelope, basket);
    distant.position.set(marker.x, marker.y, marker.z);
    distant.scale.setScalar(marker.s);
    group.add(distant);
  }
  scene.add(group);
  return { id: DISTANT_LANDMARK_KIT_ID, group };
}

window.OpenAboveDistantLandmarkKit = { id: DISTANT_LANDMARK_KIT_ID, createDistantLandmarks };
