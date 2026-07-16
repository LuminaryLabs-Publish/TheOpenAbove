import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

export const WIND_RELATIVE_STEERING_KIT_ID = "open-above-wind-relative-steering-kit";

const clamp = (value, minimum, maximum) => Math.max(minimum, Math.min(maximum, Number(value) || 0));

export function createWindRelativeSteering({ maxTurnDegrees = 15 } = {}) {
  const maxTurnRadians = THREE.MathUtils.degToRad(clamp(maxTurnDegrees, 0, 45));
  const direction = new THREE.Vector3();

  function resolve(flowVelocity, steeringInput = 0) {
    direction.set(
      Number(flowVelocity?.x) || 0,
      0,
      Number(flowVelocity?.z) || 0
    );

    const speed = direction.length();
    if (speed < 0.0001) direction.set(0, 0, -1);
    else direction.multiplyScalar(1 / speed);

    const offset = clamp(steeringInput, -1, 1) * maxTurnRadians;
    direction.applyAxisAngle(THREE.Object3D.DEFAULT_UP, offset);

    return {
      direction,
      speed,
      offset,
      heading: Math.atan2(direction.x, direction.z),
      velocityX: direction.x * speed,
      velocityZ: direction.z * speed
    };
  }

  return Object.freeze({
    id: WIND_RELATIVE_STEERING_KIT_ID,
    maxTurnRadians,
    maxTurnDegrees: THREE.MathUtils.radToDeg(maxTurnRadians),
    resolve
  });
}
