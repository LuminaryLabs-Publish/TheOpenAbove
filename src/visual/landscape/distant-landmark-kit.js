import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { terrainHeight } from "./terrain-surface-kit.js";

export const DISTANT_LANDMARK_KIT_ID = "open-above-distant-landmark-kit";

function cottage(x, z, scale, terrainHeightAt) {
  const group = new THREE.Group();
  const wall = new THREE.Mesh(new THREE.BoxGeometry(9, 5.5, 7), new THREE.MeshStandardMaterial({ color: 0xc7aa7a, roughness: 0.92 }));
  wall.position.y = 2.75;
  const roof = new THREE.Mesh(new THREE.ConeGeometry(6.6, 3.2, 4), new THREE.MeshStandardMaterial({ color: 0x6f3827, roughness: 0.88 }));
  roof.position.y = 6.6;
  roof.rotation.y = Math.PI * 0.25;
  group.add(wall, roof);
  group.position.set(x, terrainHeightAt(x, z), z);
  group.scale.setScalar(scale);
  group.traverse((node) => { if (node.isMesh) { node.castShadow = true; node.receiveShadow = true; } });
  return group;
}

function fieldPatch(x, z, width, depth, color, rotation, terrainHeightAt) {
  const columns = 14;
  const rows = 8;
  const positions = [];
  const uvs = [];
  const indices = [];
  const cos = Math.cos(rotation);
  const sin = Math.sin(rotation);

  for (let row = 0; row <= rows; row += 1) {
    const localZ = -depth * 0.5 + depth * (row / rows);
    for (let column = 0; column <= columns; column += 1) {
      const localX = -width * 0.5 + width * (column / columns);
      const rotatedX = localX * cos - localZ * sin;
      const rotatedZ = localX * sin + localZ * cos;
      const worldX = x + rotatedX;
      const worldZ = z + rotatedZ;
      positions.push(rotatedX, terrainHeightAt(worldX, worldZ) + 0.09, rotatedZ);
      uvs.push(column / columns, row / rows);
    }
  }

  const stride = columns + 1;
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const a = row * stride + column;
      const b = a + 1;
      const d = (row + 1) * stride + column;
      const c = d + 1;
      indices.push(a, d, b, b, d, c);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({ color, roughness: 0.98, side: THREE.DoubleSide })
  );
  mesh.position.set(x, 0, z);
  mesh.receiveShadow = true;
  mesh.name = "open-above-draped-field-patch";
  return mesh;
}

function createDrapedRoad(terrainHeightAt) {
  const centerPoints = [];
  for (let index = 0; index < 32; index += 1) {
    const t = index / 31;
    const x = -900 + t * 1800;
    const z = Math.sin(t * Math.PI * 2.3) * 170 - 140;
    centerPoints.push(new THREE.Vector3(x, 0, z));
  }
  const curve = new THREE.CatmullRomCurve3(centerPoints);
  const segments = 120;
  const halfWidth = 4.2;
  const positions = [];
  const uvs = [];
  const indices = [];

  for (let index = 0; index <= segments; index += 1) {
    const t = index / segments;
    const center = curve.getPoint(t);
    const tangent = curve.getTangent(t);
    const sideX = -tangent.z;
    const sideZ = tangent.x;
    const sideLength = Math.hypot(sideX, sideZ) || 1;
    const nx = sideX / sideLength;
    const nz = sideZ / sideLength;

    for (const direction of [-1, 1]) {
      const x = center.x + nx * halfWidth * direction;
      const z = center.z + nz * halfWidth * direction;
      positions.push(x, terrainHeightAt(x, z) + 0.1, z);
      uvs.push(direction < 0 ? 0 : 1, t);
    }
  }

  for (let index = 0; index < segments; index += 1) {
    const a = index * 2;
    const b = a + 1;
    const c = a + 3;
    const d = a + 2;
    indices.push(a, d, b, b, d, c);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  const material = new THREE.MeshStandardMaterial({ color: 0x9b7959, roughness: 0.98, side: THREE.DoubleSide });
  const road = new THREE.Mesh(geometry, material);
  road.name = "open-above-draped-dirt-road";
  road.receiveShadow = true;
  return road;
}

export function createDistantLandmarks(scene, terrainHeightAt = terrainHeight) {
  const group = new THREE.Group();
  group.name = "open-above-distant-landmarks";
  group.add(
    cottage(-610, -210, 0.82, terrainHeightAt),
    cottage(730, 410, 0.68, terrainHeightAt),
    cottage(330, -760, 0.74, terrainHeightAt),
    fieldPatch(-520, -120, 220, 105, 0xb49a4a, 0.22, terrainHeightAt),
    fieldPatch(-720, 50, 180, 92, 0x78904b, -0.14, terrainHeightAt),
    fieldPatch(680, 330, 200, 96, 0xa97d3e, 0.4, terrainHeightAt),
    createDrapedRoad(terrainHeightAt)
  );

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

  function dispose() {
    group.removeFromParent();
    group.traverse((object) => {
      object.geometry?.dispose?.();
      if (Array.isArray(object.material)) object.material.forEach((entry) => entry.dispose?.());
      else object.material?.dispose?.();
    });
  }

  return { id: DISTANT_LANDMARK_KIT_ID, group, dispose };
}

if (typeof window !== "undefined") {
  window.OpenAboveDistantLandmarkKit = { id: DISTANT_LANDMARK_KIT_ID, createDistantLandmarks };
}
