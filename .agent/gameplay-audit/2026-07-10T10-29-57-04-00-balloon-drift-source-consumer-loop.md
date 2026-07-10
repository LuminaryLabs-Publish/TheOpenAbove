# Gameplay Audit: Balloon Drift Source Consumer Loop

Timestamp: 2026-07-10T10-29-57-04-00
Repo: LuminaryLabs-Publish/TheOpenAbove

## Current loop

```txt
keyboard input
  -> burner / vent intent
  -> wind + buoyancy integration
  -> altitude and ground clearance
  -> balloon pose
  -> camera rig
  -> presentation domain
  -> telemetry snapshot
  -> HUD projection
  -> GameHost local readback
```

## Current source issue

The live gameplay is Balloon Drift. The repo still carries older free-flight concepts in README and campaign data. Those may be useful legacy context, but they need explicit classification before cleanup or deletion.

## Missing gameplay proof rows

```txt
balloon_drift_route_current
legacy_free_flight_copy_compatible
legacy_flight_config_compatible
burner_intent_current
vent_intent_current
wind_field_current
buoyancy_integration_current
altitude_safety_current
ground_clearance_current
camera_rig_current
telemetry_consumer_current
hud_consumer_current
gamehost_source_projection_missing
```

## Safe implementation shape

Add source classification and consumer rows first. Do not retune buoyancy, wind, altitude, camera, or balloon visuals in the source-proof pass.

## Next safe ledge

```txt
Balloon Drift source consumer ledger + additive GameHost source readback
```
