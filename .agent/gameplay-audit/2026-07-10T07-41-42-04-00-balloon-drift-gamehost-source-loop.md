# Gameplay Audit: Balloon Drift GameHost Source Loop

Timestamp: 2026-07-10T07-41-42-04-00
Repo: LuminaryLabs-Publish/TheOpenAbove

## Current gameplay loop

```txt
createBalloonSimulation({ terrainHeight, startPosition: [0, 105, 0] })
  -> keyboard intent mutates burner and vent state
  -> wind and buoyancy integrate velocity
  -> altitude and ground clearance clamp drift
  -> applyToBalloon updates balloon pose
  -> camera rig follows balloon and scroll zoom
  -> presentation updates fabric, basket, ropes, and burner
  -> telemetry snapshot is published to NexusEngine
  -> HUD renders altitude, distance, wind, quality, and camera mode
  -> GameHost.getState() returns local and nexusEngine snapshots
```

## Current gameplay domains

- Balloon drift simulation.
- Keyboard intent.
- Burner and vent input.
- Wind field.
- Buoyancy integration.
- Altitude safety.
- Ground clearance.
- Balloon pose application.
- Camera follow and basket-view blend.
- Presentation update.
- Nexus telemetry.
- HUD telemetry.
- GameHost readback.

## Gap

Gameplay state is readable as `local`, but there is no source/readback block that ties gameplay to canonical product and campaign source rows.

The live route is Balloon Drift, while README and legacy campaign rows still describe free-flight thermals, gates, perch, pitch, bank, and boost concepts. Those rows need compatibility classification before any deletion.

## Required source rows

```txt
balloon_drift_route_current
campaign_region_current
world_config_current
legacy_flight_config_compatible
simulation_consumer_current
camera_consumer_current
presentation_consumer_current
telemetry_consumer_current
gamehost_local_current
gamehost_source_missing
```

## Next safe ledge

```txt
TheOpenAbove Source Readback Ledger Catch-up + Headless Fixture Gate
```
