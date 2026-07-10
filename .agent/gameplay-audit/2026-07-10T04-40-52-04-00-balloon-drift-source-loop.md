# Gameplay Audit: Balloon Drift Source Loop

**Timestamp:** `2026-07-10T04-40-52-04-00`

## Current gameplay loop

```txt
browser keydown/keyup/blur maintain a key set
Space/W/ArrowUp -> burner intent
S/ArrowDown/Shift -> vent intent
simulation.update(dt)
  -> lerp burner and vent
  -> compute altitude-layer wind angle and speed
  -> integrate buoyancy, damping, ceiling softness, and ground clearance
  -> lerp velocity toward wind and vertical velocity
  -> update position, altitude, and distance
simulation.applyToBalloon(balloon)
  -> apply position and wind-facing rotation
animateHotAirBalloon(balloon, now, state.burner)
presentation.update(state.elapsed, state.burner)
cameraRig.update(dt, state)
visual.update(...)
engine.tick(dt)
visual.render(dt, frameMs)
HUD projects state.message, altitude, wind, exposure, quality, and mode
```

## Gameplay finding

The gameplay loop is already focused and readable. The next issue is not the balloon controls or constants. It is that the source facts behind the route are not first-class records.

## Missing proof

```txt
No source-owned Balloon Drift config exists outside the live composer.
No accepted/deferred classification exists for legacy FLIGHT, thermal, gate, perch, and start-speed fields.
No source fingerprint proves which gameplay constants and imports were consumed.
No GameHost .source block exposes source identity to browser or headless checks.
```

## Next gameplay gate

Add source manifest, source snapshot, source acceptance rows, and source fixture before changing gameplay constants or expanding regions.
