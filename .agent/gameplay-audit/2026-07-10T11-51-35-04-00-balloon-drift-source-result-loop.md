# Gameplay audit: Balloon Drift source result loop

Timestamp: `2026-07-10T11-51-35-04-00`

## Current gameplay loop

```txt
requestAnimationFrame
  -> simulation.update(dt)
  -> read keyboard Set for burner and vent
  -> update burner/vent with smoothing
  -> compute altitude wind layer
  -> compute wind angle and speed
  -> integrate buoyancy, damping, ceiling, velocity, and position
  -> clamp against terrain height + 30
  -> update altitude/distance
  -> apply state to balloon pose
  -> animate balloon object
  -> update presentation
  -> update camera rig
  -> update visual domain
  -> tick telemetry
  -> render
  -> update HUD
```

## Current gameplay authority

`src/runtime/balloon-simulation-kit.js` owns the live Balloon Drift mechanics.

`src/data/campaign.config.js` still contains older free-flight fields around thermals, gates, perch, speed, pitch, roll, boost, and terrain clearance.

## Gap

The runtime never emits a source result ledger explaining:

```txt
which campaign/world fields are current
which FLIGHT fields are legacy-compatible
which source rows are ignored
which keyboard inputs were accepted, repeated, released, cleared, or unsupported
which burner/vent decisions were derived from inputs
which telemetry rows correspond to source rows
```

## Safe gameplay next

Add source/result proof first.

Do not retune wind, buoyancy, altitude, camera, visual scale, terrain, or balloon object until source rows make current behavior fixture-visible.
