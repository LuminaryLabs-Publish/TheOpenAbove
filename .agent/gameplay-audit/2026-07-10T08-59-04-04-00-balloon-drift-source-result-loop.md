# Gameplay Audit: Balloon Drift Source Result Loop

**Timestamp:** `2026-07-10T08-59-04-04-00`

## Current gameplay loop

```txt
createBalloonSimulation({ terrainHeight, startPosition: [0, 105, 0] })
  -> installs key listeners
  -> updates burner and vent intent
  -> integrates wind, buoyancy, altitude, velocity, and distance
  -> applies pose to balloon object
  -> camera rig consumes simulation state
  -> presentation consumes simulation state
  -> telemetry publishes simulation snapshot
  -> HUD projects simulation snapshot
```

## Gameplay domains

```txt
balloon-drift-simulation
keyboard-input
burner-intent
vent-intent
wind-field
buoyancy-integration
altitude-safety
ground-clearance
velocity-integration
distance-telemetry
camera-follow-consumer
presentation-consumer
hud-consumer
nexus-telemetry-consumer
```

## Gap

Gameplay is route-current, but not source-proven.

The repo needs rows proving:

```txt
current route is Balloon Drift
legacy free-flight controls are compatibility-only
legacy campaign thermals/gates/perch are compatibility-only or deferred
simulation start position and config came from canonical source rows
HUD and telemetry consumed the same source fingerprint
GameHost exposes the source status without breaking local/nexusEngine fields
```

## Next safe gameplay ledge

Add source result rows before changing simulation constants, camera feel, route content, or campaign objectives.
