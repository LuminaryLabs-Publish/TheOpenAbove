export const nexusBuildMode = "native";

export function balloonVerticalAcceleration(burner, vent, verticalVelocity, streamLift, ceilingOffset) {
  return 0.36 + burner * 3.7 - vent * 3.2 + streamLift - verticalVelocity * 0.74 - ceilingOffset * 0.018 - 0.92;
}

export function balloonAltitudeStep(altitude, verticalVelocity, delta) {
  return altitude + verticalVelocity * delta;
}
