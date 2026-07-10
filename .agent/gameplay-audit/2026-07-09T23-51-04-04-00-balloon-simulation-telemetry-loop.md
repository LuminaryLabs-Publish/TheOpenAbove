# Gameplay Audit — Balloon Simulation Telemetry Loop

**Timestamp:** `2026-07-09T23-51-04-04-00`

## Current gameplay loop

```txt
createBalloonSimulation
  -> install keydown / keyup / blur listeners
  -> Space / KeyW / ArrowUp become burner intent
  -> KeyS / ArrowDown / Shift become vent intent
  -> update(dt)
  -> ease burner and vent
  -> calculate altitude layer
  -> calculate wind angle and wind speed
  -> integrate buoyancy, damping, ceiling softness, and vertical velocity
  -> lerp velocity toward wind/vertical velocity
  -> apply position
  -> enforce terrainHeight + 30 ground clearance
  -> update altitude and distance
  -> applyToBalloon(balloon)
```

## Telemetry loop

```txt
getSnapshot()
  -> simulation.snapshot({ region, cameraZoom, firstPersonBlend, cameraMode, visual })
  -> createBalloonTelemetryEngine
  -> NexusEngine defineResource openAbove.balloonSnapshot
  -> NexusEngine defineResource openAbove.visualSnapshot
  -> NexusEngine defineEvent openAbove.balloonTicked
  -> simulate system writes resources and emits tick event
  -> engine.openAbove.getState() and getVisualState() expose readback
```

## Interaction state

```txt
burner: key-driven eased scalar
vent: key-driven eased scalar
wind: generated from time and altitude layer
altitude: position.y minus terrain height
velocity: wind plus vertical velocity blend
distance: horizontal distance accumulator
camera mode: camera rig derived from wheel zoom and blend
HUD: simulation message plus heat/camera/altitude/wind/exposure/quality summary
```

## Gaps

```txt
Keyboard intent has no stable InputResult row.
Burner and vent changes have no source-owned ActionFrame.
Simulation update has no before/after result row.
Ground clamp and ceiling softness have no reason-coded result rows.
Telemetry emits aggregate state but no source-fingerprint or source-consumer ledger.
GameHost local/nexus snapshots are preserved but no additive source snapshot exists.
```

## Next fixture rows

```txt
burner_intent_accepts_space
vent_intent_accepts_shift
blur_clears_input_set
simulation_tick_reports_before_after_altitude
simulation_tick_reports_ground_clamp_reason
telemetry_resource_matches_local_snapshot
visual_resource_matches_local_visual_snapshot
GameHost_source_does_not_break_local_or_nexus_shapes
```

## Next safe ledge

```txt
TheOpenAbove Visual Domain Source Readback + Browser Fixture Gate
```
