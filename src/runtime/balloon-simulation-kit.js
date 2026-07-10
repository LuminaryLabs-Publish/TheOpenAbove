import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export const BALLOON_SIMULATION_KIT_ID = "open-above-balloon-simulation-kit";

const clamp = (value, min, max) => Math.max(min, Math.min(max, Number(value) || 0));
const smooth = (rate, dt) => 1 - Math.exp(-rate * dt);

export function createBalloonSimulation({ terrainHeight, startPosition = [0, 105, 0] }) {
  const keys = new Set();
  const state = {
    position: new THREE.Vector3(...startPosition),
    velocity: new THREE.Vector3(8, 0, -10),
    wind: new THREE.Vector3(8, 0, -10),
    verticalVelocity: 0,
    altitude: startPosition[1],
    burner: 0.22,
    vent: 0,
    elapsed: 0,
    distance: 0,
    message: "Drift with the valley wind. Hold Space or W for burner lift, S to vent gently."
  };

  const onKeyDown = (event) => keys.add(event.code);
  const onKeyUp = (event) => keys.delete(event.code);
  const onBlur = () => keys.clear();
  addEventListener("keydown", onKeyDown);
  addEventListener("keyup", onKeyUp);
  addEventListener("blur", onBlur);

  function update(dt) {
    state.elapsed += dt;
    const burnerPressed = keys.has("Space") || keys.has("KeyW") || keys.has("ArrowUp");
    const ventPressed = keys.has("KeyS") || keys.has("ArrowDown") || keys.has("ShiftLeft") || keys.has("ShiftRight");
    state.burner = THREE.MathUtils.lerp(state.burner, burnerPressed ? 1 : 0.18, smooth(3.2, dt));
    state.vent = THREE.MathUtils.lerp(state.vent, ventPressed ? 1 : 0, smooth(3.6, dt));

    const altitudeLayer = clamp((state.position.y - 60) / 320, 0, 1);
    const windAngle = -0.86 + Math.sin(state.elapsed * 0.045) * 0.32 + Math.sin(state.elapsed * 0.11) * 0.08 + altitudeLayer * 0.14;
    const windSpeed = 9.4 + altitudeLayer * 4.2 + Math.sin(state.elapsed * 0.063) * 2.1 + Math.sin(state.elapsed * 0.017) * 1.4;
    state.wind.set(Math.sin(windAngle) * windSpeed, 0, -Math.cos(windAngle) * windSpeed);

    const buoyancy = 0.36 + state.burner * 3.7 - state.vent * 3.2;
    const damping = -state.verticalVelocity * 0.74;
    const ceilingSoft = state.position.y > 420 ? -(state.position.y - 420) * 0.018 : 0;
    state.verticalVelocity += (buoyancy + damping + ceilingSoft - 0.92) * dt;
    state.verticalVelocity = clamp(state.verticalVelocity, -8, 8);

    state.velocity.lerp(new THREE.Vector3(state.wind.x, state.verticalVelocity, state.wind.z), smooth(1.15, dt));
    state.position.addScaledVector(state.velocity, dt);
    const ground = terrainHeight(state.position.x, state.position.z) + 30;
    if (state.position.y < ground) {
      state.position.y = ground;
      state.verticalVelocity = Math.max(0, state.verticalVelocity);
    }
    state.altitude = state.position.y - terrainHeight(state.position.x, state.position.z);
    state.distance += Math.hypot(state.velocity.x, state.velocity.z) * dt;
    return state;
  }

  function applyToBalloon(balloon) {
    balloon.position.copy(state.position);
    balloon.rotation.y = Math.atan2(state.wind.x, state.wind.z) + Math.PI + Math.sin(state.elapsed * 0.32) * 0.035;
    balloon.rotation.x = Math.sin(state.elapsed * 0.42) * 0.018;
    balloon.rotation.z = Math.cos(state.elapsed * 0.37) * 0.022;
  }

  function snapshot(extra = {}) {
    return {
      status: "drifting",
      objectType: "hot-air-balloon",
      elapsed: Number(state.elapsed.toFixed(3)),
      altitude: Number(state.altitude.toFixed(2)),
      burner: Number(state.burner.toFixed(3)),
      vent: Number(state.vent.toFixed(3)),
      windSpeed: Number(state.wind.length().toFixed(2)),
      distance: Number(state.distance.toFixed(2)),
      position: state.position.toArray().map((value) => Number(value.toFixed(3))),
      velocity: state.velocity.toArray().map((value) => Number(value.toFixed(3))),
      wind: state.wind.toArray().map((value) => Number(value.toFixed(3))),
      message: state.message,
      ...extra
    };
  }

  function dispose() {
    removeEventListener("keydown", onKeyDown);
    removeEventListener("keyup", onKeyUp);
    removeEventListener("blur", onBlur);
  }

  return { id: BALLOON_SIMULATION_KIT_ID, state, update, applyToBalloon, snapshot, dispose };
}

window.OpenAboveBalloonSimulationKit = { id: BALLOON_SIMULATION_KIT_ID, createBalloonSimulation };
