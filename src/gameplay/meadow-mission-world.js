import * as THREE from "three";
import { createMeadowMission } from "./meadow-mission-kit.js";

const WAYPOINTS = Object.freeze([
  { kind: "thermal", id: "thermal-1", x: 105, z: -135, height: 90 },
  { kind: "thermal", id: "thermal-2", x: 230, z: -300, height: 90 },
  { kind: "thermal", id: "thermal-3", x: 375, z: -485, height: 95 },
  { kind: "gate", id: "gate-1", x: 520, z: -650, height: 100 },
  { kind: "gate", id: "gate-2", x: 650, z: -805, height: 100 },
  { kind: "gate", id: "gate-3", x: 780, z: -965, height: 100 },
  { kind: "gate", id: "gate-4", x: 910, z: -1125, height: 100 },
  { kind: "gate", id: "gate-5", x: 1050, z: -1305, height: 95 },
  { kind: "perch", id: "sky-perch", x: 1205, z: -1495, height: 34 }
]);

const COLOR = Object.freeze({ thermal: 0xf9d98f, gate: 0x8cd8ed, perch: 0xb2ecae });
const CHECK_RADIUS = Object.freeze({ thermal: 110, gate: 105, perch: 55 });

export function createMeadowMissionWorld({ scene, terrainHeight, region, onChange = () => {} }) {
  const points = WAYPOINTS.map(point => ({
    ...point,
    y: terrainHeight(point.x, point.z) + point.height
  }));
  const mission = createMeadowMission({
    region,
    thermals: points.filter(point => point.kind === "thermal"),
    gates: points.filter(point => point.kind === "gate"),
    perch: points.find(point => point.kind === "perch")
  });
  const group = new THREE.Group();
  group.name = "meadow-lift-flight-objectives";
  const visualObjects = [];
  for (const point of points) {
    const geometry = new THREE.TorusGeometry(point.kind === "perch" ? 28 : 40, 4, 8, 40);
    const material = new THREE.MeshBasicMaterial({
      color: COLOR[point.kind], side: THREE.DoubleSide,
      transparent: true, opacity: 0.83, depthWrite: false
    });
    const marker = new THREE.Mesh(geometry, material);
    marker.name = point.id;
    marker.position.set(point.x, point.y, point.z);
    group.add(marker);
    visualObjects.push(marker);
  }
  scene.add(group);
  let previous = null;
  let disposed = false;
  let lastNotification = "";

  function nextTarget(state) {
    if (state.thermals.completedIds.length < state.thermals.target) {
      return points.find(point => point.kind === "thermal" && !state.thermals.completedIds.includes(point.id));
    }
    if (state.gates.completedIds.length < state.gates.target) {
      return points.find(point => point.id === state.gates.nextGateId);
    }
    return points.find(point => point.kind === "perch");
  }
  const distanceToSegment = (point, from, to) => {
    const dx = to.x - from.x, dy = to.y - from.y, dz = to.z - from.z;
    const length2 = dx * dx + dy * dy + dz * dz;
    const fraction = length2 > 0 ? Math.max(0, Math.min(1,
      ((point.x - from.x) * dx + (point.y - from.y) * dy + (point.z - from.z) * dz) / length2)) : 0;
    return Math.hypot(point.x - from.x - dx * fraction,
      point.y - from.y - dy * fraction, point.z - from.z - dz * fraction);
  };

  function update(flightState, dt) {
    if (disposed) return;
    const before = mission.snapshot();
    if (before.phase !== "active" && before.phase !== "returning") return;
    mission.dispatch({ type: "tick", dt });
    const state = mission.snapshot();
    if (state.phase === "failed") {
      lastNotification = "Time expired. Press R to retry.";
      onChange(state, lastNotification);
      return;
    }
    const current = nextTarget(state);
    const here = flightState.position;
    if (current && distanceToSegment(current, previous ?? here, here) < CHECK_RADIUS[current.kind]) {
      // Finishing requires a controlled, near-ground touchdown, not merely passing overhead.
      const safe = current.kind !== "perch" || (flightState.altitude <= 43 && Math.abs(flightState.verticalVelocity) <= 3.5);
      if (safe) {
        const event = mission.dispatch({ type: current.kind, id: current.id });
        if (event.accepted) {
          lastNotification = current.kind === "perch" ? "Meadow Lift complete!" :
            (current.kind === "thermal" ? "Thermal reached." : "Wind gate cleared.");
        }
      }
    }
    previous = { x: here.x, y: here.y, z: here.z };
    const latest = mission.snapshot();
    for (const marker of visualObjects) {
      marker.visible = marker.name === nextTarget(latest)?.id && !["completed", "failed"].includes(latest.phase);
      if (marker.visible) marker.rotation.z += dt * 0.4;
    }
    onChange(latest, lastNotification);
  }
  function restart() {
    mission.dispatch({ type: "restart" });
    mission.dispatch({ type: "start" });
    previous = null;
    lastNotification = "";
    onChange(mission.snapshot(), "");
  }
  mission.dispatch({ type: "start" });
  onChange(mission.snapshot(), "");
  return Object.freeze({
    mission, points, update, restart,
    getTarget: () => nextTarget(mission.snapshot()),
    snapshot: () => mission.snapshot(),
    dispose() {
      if (disposed) return;
      disposed = true;
      scene.remove(group);
      for (const marker of visualObjects) {
        marker.geometry.dispose();
        marker.material.dispose();
      }
    }
  });
}
