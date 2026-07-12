import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import {
  applyAirstreamToBalloonState,
  sampleBalloonAirstream
} from "./airstream-domain/airstream-balloon-force-kit.js";

export const BALLOON_SIMULATION_KIT_ID = "open-above-balloon-simulation-kit";

const clamp = (value, min, max) => Math.max(min, Math.min(max, Number(value) || 0));
const smooth = (rate, dt) => 1 - Math.exp(-rate * Math.max(0, dt));

export function createBalloonSimulation({
  terrainHeight,
  sampleAirstream = null,
  startPosition = [0, 105, 0]
}) {
  const keys = new Set();
  const state = {
    position: new THREE.Vector3(...startPosition),
    velocity: new THREE.Vector3(8, 0, -10),
    wind: new THREE.Vector3(8, 0, -10),
    verticalVelocity: 0,
    altitude: startPosition[1],
    burner: 0.22,
    vent: 0,
    steeringInput: 0,
    lateralTrim: 0,
    lateralAcceleration: 0,
    visualBank: 0,
    heading: Math.atan2(8, -10),
    elapsed: 0,
    distance: 0,
    airstream: {
      routeId: null,
      destinationTownId: null,
      influence: 0,
      captureState: "ambient",
      velocity: { x: 8, y: 0, z: -10 },
      contributors: []
    },
    message: "Mail for Brookhaven. Burn upward into the green meadow current; use A/D for light cross-current trim."
  };

  const onKeyDown = (event) => keys.add(event.code);
  const onKeyUp = (event) => keys.delete(event.code);
  const onBlur = () => keys.clear();
  addEventListener("keydown", onKeyDown);
  addEventListener("keyup", onKeyUp);
  addEventListener("blur", onBlur);

  function fallbackWind() {
    const altitudeLayer = clamp((state.position.y - 60) / 320, 0, 1);
    const windAngle = -0.86
      + Math.sin(state.elapsed * 0.045) * 0.32
      + Math.sin(state.elapsed * 0.11) * 0.08
      + altitudeLayer * 0.14;
    const windSpeed = 9.4
      + altitudeLayer * 4.2
      + Math.sin(state.elapsed * 0.063) * 2.1
      + Math.sin(state.elapsed * 0.017) * 1.4;
    return {
      x: Math.sin(windAngle) * windSpeed,
      y: 0,
      z: -Math.cos(windAngle) * windSpeed
    };
  }

  function updateSteering(flow, dt) {
    const left = keys.has("KeyA") || keys.has("ArrowLeft");
    const right = keys.has("KeyD") || keys.has("ArrowRight");
    state.steeringInput = (right ? 1 : 0) - (left ? 1 : 0);
    const previousTrim = state.lateralTrim;
    const trimTarget = state.steeringInput * 3.6;
    const response = state.steeringInput === 0 ? 2.8 : 2.5;
    state.lateralTrim = THREE.MathUtils.lerp(state.lateralTrim, trimTarget, smooth(response, dt));
    state.lateralAcceleration = dt > 0 ? (state.lateralTrim - previousTrim) / dt : 0;

    const forward = new THREE.Vector3(flow.velocity.x, 0, flow.velocity.z);
    if (forward.lengthSq() < 0.0001) forward.set(state.wind.x, 0, state.wind.z);
    if (forward.lengthSq() < 0.0001) forward.set(0, 0, -1);
    forward.normalize();
    const rightVector = new THREE.Vector3(-forward.z, 0, forward.x);
    state.wind.addScaledVector(rightVector, state.lateralTrim);
    state.heading = Math.atan2(state.wind.x, state.wind.z);
    const targetBank = -state.steeringInput * THREE.MathUtils.degToRad(6.5);
    state.visualBank = THREE.MathUtils.lerp(state.visualBank, targetBank, smooth(3.8, dt));
  }

  function update(dt) {
    state.elapsed += dt;
    const burnerPressed = keys.has("Space") || keys.has("KeyW") || keys.has("ArrowUp");
    const ventPressed = keys.has("KeyS") || keys.has("ArrowDown") || keys.has("ShiftLeft") || keys.has("ShiftRight");
    state.burner = THREE.MathUtils.lerp(state.burner, burnerPressed ? 1 : 0.18, smooth(3.2, dt));
    state.vent = THREE.MathUtils.lerp(state.vent, ventPressed ? 1 : 0, smooth(3.6, dt));

    const flow = sampleBalloonAirstream(
      sampleAirstream,
      state.position,
      state.elapsed,
      fallbackWind()
    );
    applyAirstreamToBalloonState(state, flow);
    updateSteering(flow, dt);

    const streamLift = flow.velocity.y * flow.influence * 0.24;
    const buoyancy = 0.36 + state.burner * 3.7 - state.vent * 3.2 + streamLift;
    const damping = -state.verticalVelocity * 0.74;
    const ceilingSoft = state.position.y > 420 ? -(state.position.y - 420) * 0.018 : 0;
    state.verticalVelocity += (buoyancy + damping + ceilingSoft - 0.92) * dt;
    state.verticalVelocity = clamp(state.verticalVelocity, -8, 8);

    state.velocity.lerp(
      new THREE.Vector3(state.wind.x, state.verticalVelocity, state.wind.z),
      smooth(1.15 + flow.influence * 0.75, dt)
    );
    state.position.addScaledVector(state.velocity, dt);
    const ground = terrainHeight(state.position.x, state.position.z) + 30;
    if (state.position.y < ground) {
      state.position.y = ground;
      state.verticalVelocity = Math.max(0, state.verticalVelocity);
    }
    state.altitude = state.position.y - terrainHeight(state.position.x, state.position.z);
    state.distance += Math.hypot(state.velocity.x, state.velocity.z) * dt;

    if (state.airstream.routeId) {
      state.message = `Riding ${state.airstream.routeId}. Match altitude; A/D trims across the current.`;
    } else {
      state.message = "Between currents. Use burner or vent to find a route; A/D provides light correction.";
    }
    return state;
  }

  function applyToBalloon(balloon) {
    balloon.position.copy(state.position);
    balloon.rotation.y = state.heading + Math.PI + Math.sin(state.elapsed * 0.32) * 0.018;
    balloon.rotation.x = Math.sin(state.elapsed * 0.42) * 0.008;
    balloon.rotation.z = state.visualBank * 0.22;
    balloon.userData.flightState = state;
  }

  function snapshot(extra = {}) {
    return {
      status: "mail-flight",
      objectType: "hot-air-balloon",
      elapsed: Number(state.elapsed.toFixed(3)),
      altitude: Number(state.altitude.toFixed(2)),
      burner: Number(state.burner.toFixed(3)),
      vent: Number(state.vent.toFixed(3)),
      steeringInput: state.steeringInput,
      lateralTrim: Number(state.lateralTrim.toFixed(3)),
      visualBank: Number(state.visualBank.toFixed(4)),
      heading: Number(state.heading.toFixed(4)),
      windSpeed: Number(state.wind.length().toFixed(2)),
      distance: Number(state.distance.toFixed(2)),
      position: state.position.toArray().map((value) => Number(value.toFixed(3))),
      velocity: state.velocity.toArray().map((value) => Number(value.toFixed(3))),
      wind: state.wind.toArray().map((value) => Number(value.toFixed(3))),
      airstream: {
        routeId: state.airstream.routeId,
        destinationTownId: state.airstream.destinationTownId,
        influence: Number(state.airstream.influence.toFixed(3)),
        captureState: state.airstream.captureState,
        distanceFromCenter: Number.isFinite(state.airstream.distanceFromCenter)
          ? Number(state.airstream.distanceFromCenter.toFixed(2))
          : null
      },
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
