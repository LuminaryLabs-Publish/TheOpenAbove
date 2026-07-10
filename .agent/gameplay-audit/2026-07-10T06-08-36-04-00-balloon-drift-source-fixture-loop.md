# Gameplay Audit: Balloon Drift Source Fixture Loop

**Timestamp:** `2026-07-10T06-08-36-04-00`

## Current gameplay loop

```txt
browser loads index.html
  -> src/main.js creates visual domain and balloon object
  -> createBalloonSimulation installs keydown/keyup/blur listeners
  -> Space/W/ArrowUp increase burner intent
  -> S/ArrowDown/Shift increase vent intent
  -> simulation.update(dt) updates wind, vertical velocity, altitude, position, distance, burner, vent, and message
  -> simulation.applyToBalloon(balloon) projects state into object pose
  -> animateHotAirBalloon animates object response
  -> balloonPresentation.update updates material/rig presentation
  -> cameraRig.update resolves camera state
  -> visual.update consumes flight state and camera context
  -> telemetry engine ticks NexusEngine
  -> visual.render submits frame
  -> HUD writes altitude, wind, exposure, quality, and camera mode
  -> GameHost exposes local and Nexus snapshots
```

## Gameplay domains

```txt
balloon-drift-route
burner-input
vent-input
keyboard-state
wind-field
altitude-layer
buoyancy
damping
ceiling-soft-limit
ground-clearance
position-integration
velocity-integration
distance-accumulator
balloon-pose-application
object-animation
presentation-update
camera-follow
basket-view-blend
hud-projection
nexus-telemetry
local-gamehost-snapshot
```

## Current gameplay services

```txt
input listener service: owns keyboard and blur state.
simulation service: owns all balloon drift state mutation and snapshot serialization.
pose service: applies simulation state to the balloon object.
camera service: follows balloon state and exposes zoom/mode/readback.
presentation service: updates visual material/rig response.
HUD service: exposes a human-readable current-state projection.
GameHost service: exposes machine-readable local/Nexus snapshots, but no source block.
```

## Gameplay proof gap

The current gameplay loop works, but source proof is still missing.

Missing rows:

```txt
input_source_row
burner_intent_row
vent_intent_row
simulation_config_source_row
balloon_start_source_row
wind_field_source_row
altitude_policy_source_row
snapshot_shape_row
hud_projection_row
gamehost_source_row
headless_fixture_row
```

## Main finding

Do not tune simulation constants or expand route objectives next.

The route first needs a DOM-free source fixture that proves which Balloon Drift source rows are authoritative and which older campaign/free-flight rows remain compatibility-only.

## Next safe ledge

```txt
TheOpenAbove Source Fixture Ledger Refresh + GameHost Headless Gate
```
