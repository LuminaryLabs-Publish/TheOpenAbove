# Architecture Audit: Headless Source GameHost Readback DSK Map

**Timestamp:** `2026-07-10T04-40-52-04-00`

## DSK map

```txt
Data:
  package description and scripts
  index.html route shell and importmap
  CAMPAIGN/WORLD/FLIGHT config
  src/main.js route composer
  simulation state and snapshot
  visual state and render stats
  camera rig state
  Nexus telemetry state
  GameHost local/nexusEngine readback
  headless editor inspection outputs

Services:
  route boot
  visual domain creation
  balloon object composition
  balloon simulation update
  camera rig update
  balloon presentation update
  Nexus telemetry tick
  renderer/composer update
  HUD projection
  renderer/build contract inspection through headless environment

Knowledge:
  current Balloon Drift route source
  legacy free-flight campaign fields
  product copy parity needs
  source/consumer manifest expectations
  source acceptance vocabulary
  additive GameHost compatibility rules
```

## Boundary finding

`src/main.js` is the active source of route truth, but source authority is not explicit. Product copy, legacy campaign fields, runtime imports, GameHost readback, and headless checks need a shared manifest and stable source rows.

## Required next rows

```txt
route_copy_current
readme_copy_legacy_compatible
package_description_current
campaign_world_current
campaign_flight_legacy_compatible
runtime_imports_current
simulation_config_current
visual_domain_config_current
headless_environment_current
gamehost_source_readback_current
source_fixture_rows_current
```

## Safe next ledge

```txt
TheOpenAbove Headless Source GameHost Readback Refresh + Browser Fixture Gate
```
