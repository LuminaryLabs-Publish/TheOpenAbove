import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { terrainHeight, moistureAt } from "./terrain-surface-kit.js";

export const VEGETATION_CLUSTER_KIT_ID = "open-above-vegetation-cluster-kit";

function seeded(seed) {
  let s = (Number(seed) || 1) >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function createVegetationClusters(scene, worldConfig, quality) {
  const random = seeded((worldConfig.seed || 1) * 17 + 9);
  const total = Math.max(80, quality.treeCount);
  const trunkGeometry = new THREE.CylinderGeometry(0.42, 0.72, 8.4, 6);
  const crownGeometry = new THREE.IcosahedronGeometry(3.7, 1);
  const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x5b3b24, roughness: 0.96 });
  const crownMaterial = new THREE.MeshStandardMaterial({ color: 0x315f38, roughness: 0.91, vertexColors: true });
  const trunks = new THREE.InstancedMesh(trunkGeometry, trunkMaterial, total);
  const crowns = new THREE.InstancedMesh(crownGeometry, crownMaterial, total);
  trunks.name = "open-above-instanced-tree-trunks";
  crowns.name = "open-above-instanced-tree-crowns";
  trunks.castShadow = crowns.castShadow = true;
  trunks.receiveShadow = crowns.receiveShadow = true;

  const clusterCount = 18;
  const clusters = Array.from({ length: clusterCount }, () => ({
    x: (random() - 0.5) * (worldConfig.terrainSize || 2600) * 1.18,
    z: (random() - 0.5) * (worldConfig.terrainSize || 2600) * 1.18,
    spread: 80 + random() * 260
  }));
  const matrix = new THREE.Matrix4();
  const quaternion = new THREE.Quaternion();
  const scale = new THREE.Vector3();
  const position = new THREE.Vector3();
  const color = new THREE.Color();
  let count = 0;

  for (let i = 0; i < total * 2 && count < total; i += 1) {
    const cluster = clusters[Math.floor(random() * clusters.length)];
    const angle = random() * Math.PI * 2;
    const radius = Math.sqrt(random()) * cluster.spread;
    const x = cluster.x + Math.cos(angle) * radius;
    const z = cluster.z + Math.sin(angle) * radius;
    if (Math.hypot(x, z) < 160 || moistureAt(x, z) > 0.76) continue;
    const y = terrainHeight(x, z);
    const treeScale = 0.72 + random() * 1.75;
    const leanX = (random() - 0.5) * 0.08;
    const leanZ = (random() - 0.5) * 0.08;
    quaternion.setFromEuler(new THREE.Euler(leanX, random() * Math.PI * 2, leanZ));

    position.set(x, y + 4.2 * treeScale, z);
    scale.set(treeScale * 0.62, treeScale, treeScale * 0.62);
    matrix.compose(position, quaternion, scale);
    trunks.setMatrixAt(count, matrix);

    position.set(x, y + 10.2 * treeScale, z);
    scale.set(treeScale * (0.88 + random() * 0.22), treeScale * (0.84 + random() * 0.35), treeScale * (0.88 + random() * 0.22));
    matrix.compose(position, quaternion, scale);
    crowns.setMatrixAt(count, matrix);
    color.set(0x315f38).offsetHSL((random() - 0.5) * 0.025, (random() - 0.5) * 0.1, (random() - 0.5) * 0.12);
    crowns.setColorAt(count, color);
    count += 1;
  }
  trunks.count = count;
  crowns.count = count;
  trunks.instanceMatrix.needsUpdate = true;
  crowns.instanceMatrix.needsUpdate = true;
  crowns.instanceColor.needsUpdate = true;
  scene.add(trunks, crowns);

  return { id: VEGETATION_CLUSTER_KIT_ID, trunks, crowns, count, clusters };
}

window.OpenAboveVegetationClusterKit = { id: VEGETATION_CLUSTER_KIT_ID, createVegetationClusters };
