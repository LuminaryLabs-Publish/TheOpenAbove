# Gameplay Audit — Balloon Drift Source Consumer Loop

**Timestamp:** `2026-07-09T09-18-29-04-00`

## Summary

The current gameplay loop is a cozy Balloon Drift route. The next gameplay-safe work is not new objectives or region expansion; it is making the existing loop source-owned and fixture-readable.

## Current gameplay loop

```txt
open route
  -> balloon starts above meadow
  -> player holds Space / W / ArrowUp for burner lift
  -> player holds S / ArrowDown / Shift for vent descent
  -> wheel changes zoom between third-person and basket view
  -> wind pushes balloon across terrain
  -> buoyancy and soft ceiling keep altitude readable
  -> balloon object sways, bobs, vibrates, and animates burner/rigging
  -> HUD reports route message, burner/coasting state, camera mode, altitude, wind, and drift distance
  -> Nexus telemetry mirrors balloon snapshot
```

## Domains in the gameplay loop

```txt
input:
  burner intent
  vent intent
  wheel zoom intent

simulation:
  elapsed time
  wind direction
  wind speed
  burner blend
  vent blend
  buoyancy
  vertical damping
  ceiling softness
  velocity integration
  terrain clearance
  altitude
  drift distance

presentation:
  balloon position
  balloon yaw/pitch/roll
  burner animation
  rigging animation
  wind ribbon drift
  third-person camera
  basket camera
  first-person visibility
  HUD telemetry

readback:
  local snapshot
  NexusEngine snapshot
  missing source snapshot
```

## Current mismatch

```txt
The gameplay says Balloon Drift.
The package/campaign source still says free-flight / carve / thermal / gate / perch.
The next source modules must classify legacy flight fields before any route logic changes.
```

## Gameplay-safe next implementation

```txt
Runner does not need new game mechanics.
Add source ledger rows that describe the existing mechanics.
Expose GameHost source readback.
Add DOM-free fixture coverage.
Then let future gameplay work consume BalloonDriftConfigRecord instead of copying inline constants.
```
