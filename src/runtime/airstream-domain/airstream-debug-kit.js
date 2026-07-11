import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export const AIRSTREAM_DEBUG_KIT_ID = "open-above-airstream-debug-kit";

export function createAirstreamDebug({ scene, routes = [], visible = false } = {}) {
  const group = new THREE.Group();
  group.name = "open-above-airstream-debug";
  group.visible = Boolean(visible);

  for (const route of routes) {
    const points = route.points.map((point) => new THREE.Vector3(point.x, point.y, point.z));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(
      geometry,
      new THREE.LineBasicMaterial({ color: route.color, transparent: true, opacity: 0.8 })
    );
    group.add(line);

    for (const point of points) {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(route.radius * 0.97, route.radius, 32),
        new THREE.MeshBasicMaterial({
          color: route.color,
          transparent: true,
          opacity: 0.24,
          side: THREE.DoubleSide,
          depthWrite: false
        })
      );
      ring.position.copy(point);
      ring.rotation.x = Math.PI / 2;
      group.add(ring);
    }
  }

  const arrow = new THREE.ArrowHelper(
    new THREE.Vector3(0, 0, -1),
    new THREE.Vector3(),
    80,
    0xff3355,
    14,
    8
  );
  group.add(arrow);
  scene?.add(group);

  function update(position, sample) {
    if (!group.visible || !position || !sample?.velocity) return;
    const direction = new THREE.Vector3(
      sample.velocity.x,
      sample.velocity.y,
      sample.velocity.z
    );
    const magnitude = Math.max(1, direction.length());
    direction.normalize();
    arrow.position.set(position.x, position.y, position.z);
    arrow.setDirection(direction);
    arrow.setLength(Math.min(180, magnitude * 5), 14, 8);
  }

  function setVisible(next) {
    group.visible = Boolean(next);
  }

  function dispose() {
    group.removeFromParent();
    group.traverse((object) => {
      object.geometry?.dispose?.();
      object.material?.dispose?.();
    });
  }

  return { id: AIRSTREAM_DEBUG_KIT_ID, group, arrow, update, setVisible, dispose };
}
