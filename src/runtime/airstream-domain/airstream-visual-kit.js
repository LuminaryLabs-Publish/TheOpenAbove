import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export const AIRSTREAM_VISUAL_KIT_ID = "open-above-airstream-visual-kit";

function routeCurve(route, offset = 0) {
  const points = route.points.map((point, index) => {
    const phase = index / Math.max(1, route.points.length - 1);
    return new THREE.Vector3(
      point.x + Math.sin(phase * Math.PI * 2.0) * offset,
      point.y + Math.cos(phase * Math.PI * 1.5) * offset * 0.35,
      point.z + Math.cos(phase * Math.PI * 2.0) * offset
    );
  });
  return new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.38);
}

function createRibbon(route, curve, lane) {
  const material = new THREE.MeshBasicMaterial({
    color: route.color,
    transparent: true,
    opacity: lane === 0 ? 0.18 : 0.09,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false
  });
  const mesh = new THREE.Mesh(
    new THREE.TubeGeometry(curve, 160, lane === 0 ? 2.2 : 1.15, 5, false),
    material
  );
  mesh.name = `airstream-ribbon-${route.id}-${lane}`;
  mesh.frustumCulled = true;
  mesh.renderOrder = -18;
  return { mesh, material };
}

function createWisps(route, curve, count = 48) {
  const positions = new Float32Array(count * 3);
  const seeds = [];
  for (let index = 0; index < count; index += 1) {
    const t = index / count;
    const point = curve.getPoint(t);
    positions[index * 3] = point.x;
    positions[index * 3 + 1] = point.y;
    positions[index * 3 + 2] = point.z;
    seeds.push({
      baseT: t,
      lane: ((index * 17) % 11) / 10 - 0.5,
      lift: ((index * 29) % 13) / 12 - 0.5
    });
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    color: route.color,
    size: 3.5,
    transparent: true,
    opacity: 0.35,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
    toneMapped: false
  });
  const points = new THREE.Points(geometry, material);
  points.name = `airstream-wisps-${route.id}`;
  points.frustumCulled = true;
  return { points, geometry, material, seeds };
}

export function createAirstreamVisual({ scene, routes = [] } = {}) {
  const group = new THREE.Group();
  group.name = "open-above-visible-airstreams";
  const records = [];

  for (const route of routes) {
    const curve = routeCurve(route);
    const ribbonRecords = [-8, 0, 8].map((offset, lane) => {
      const laneCurve = routeCurve(route, offset);
      const ribbon = createRibbon(route, laneCurve, lane);
      group.add(ribbon.mesh);
      return ribbon;
    });
    const wisps = createWisps(route, curve);
    group.add(wisps.points);
    records.push({ route, curve, ribbonRecords, wisps });
  }

  scene?.add(group);

  function update(elapsed = 0, activeRouteId = null) {
    for (const record of records) {
      const active = record.route.id === activeRouteId;
      const pulse = 0.78 + Math.sin(elapsed * 1.4 + record.route.speed) * 0.22;
      record.ribbonRecords.forEach(({ material }, lane) => {
        const base = lane === 1 ? 0.18 : 0.09;
        material.opacity = base * pulse * (active ? 1.55 : 1);
      });
      record.wisps.material.opacity = (active ? 0.58 : 0.32) * pulse;

      const attribute = record.wisps.geometry.attributes.position;
      record.wisps.seeds.forEach((seed, index) => {
        const t = (seed.baseT + elapsed * record.route.speed * 0.00055) % 1;
        const point = record.curve.getPoint(t);
        const tangent = record.curve.getTangent(t).normalize();
        const side = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
        attribute.setXYZ(
          index,
          point.x + side.x * seed.lane * record.route.radius * 0.34,
          point.y + seed.lift * record.route.radius * 0.18 + Math.sin(elapsed * 0.9 + index) * 1.8,
          point.z + side.z * seed.lane * record.route.radius * 0.34
        );
      });
      attribute.needsUpdate = true;
    }
  }

  function dispose() {
    group.removeFromParent();
    group.traverse((object) => {
      object.geometry?.dispose?.();
      if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose?.());
      else object.material?.dispose?.();
    });
  }

  return { id: AIRSTREAM_VISUAL_KIT_ID, group, records, update, dispose };
}
