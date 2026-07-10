# Gameplay Audit: Balloon Drift Simulation Source Loop

**Timestamp:** `2026-07-10T01-20-47-04-00`

## Gameplay shape

The live gameplay loop is Balloon Drift.

The player controls burner and vent intent while wind, buoyancy, altitude safety, velocity, position, distance, camera, presentation, telemetry, and HUD update continuously.

## Current loop

```txt
keyboard input
  -> burner intent and vent intent
  -> createBalloonSimulation update(dt)
  -> wind angle and wind speed integrate
  -> buoyancy and damping integrate
  -> ceiling softness and ground clearance apply
  -> velocity, position, altitude, distance, and region update
  -> simulation.applyToBalloon(balloon)
  -> animateHotAirBalloon(balloon, snapshot)
  -> presentation.update(snapshot, visual state)
  -> cameraRig.update(snapshot, dt)
  -> visual.update(dt, snapshot)
  -> telemetryEngine.tick(dt)
  -> visual.render(dt)
  -> HUD text writes
  -> GameHost local/nexus snapshots
```

## Gameplay domains

```txt
keyboard-input
burner-intent
vent-intent
wind-field
buoyancy-integration
altitude-safety
ground-clearance
velocity-integration
position-integration
distance-tracking
region-classification
balloon-pose-application
object-animation
presentation-update
camera-follow
hud-telemetry
gamehost-readback
```

## Gameplay services

```txt
input service: maps Space/W/ArrowUp to burner and S/ArrowDown/Shift to vent.
simulation service: integrates route physics and produces a snapshot.
pose application service: writes simulation pose into the balloon object.
object animation service: updates burner and rigging sub-kits.
presentation service: updates material and illumination response.
camera service: follows balloon and handles view blend.
telemetry service: sends route snapshots through NexusEngine.
HUD service: projects route state for the browser user.
readback service: exposes local and nexusEngine snapshots through GameHost.
```

## Gameplay-source gap

The gameplay loop is coherent, but it does not yet have a source authority layer proving that current Balloon Drift state is the canonical product route.

The older README wording and legacy campaign fields still coexist with the live route.

## Next gameplay-safe work

```txt
Create canonical Balloon Drift source config.
Mark legacy FLIGHT/campaign fields as compatibility inputs.
Generate source snapshots before browser consumers run.
Generate source acceptance rows for current route and legacy fields.
Expose source rows through GameHost.
Add a DOM-free source fixture before retuning gameplay.
```

## Deferred work

```txt
simulation constant retune
new objectives or routes
new route progression
camera feel retune
visual fidelity changes
renderer extraction
```
