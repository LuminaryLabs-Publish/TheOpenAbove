# Interaction Audit: Burner Vent Input Result Map

**Timestamp:** `2026-07-10T08-59-04-04-00`

## Current interaction surface

```txt
browser keyboard events
  -> createBalloonSimulation key listeners
  -> burner intent
  -> vent intent
  -> wind/buoyancy update
  -> balloon pose
  -> camera rig
  -> presentation
  -> telemetry
  -> HUD
```

## Current readback

`GameHost.getState()` returns:

```txt
nexusEngine
local
```

The local snapshot includes current simulation, visual, camera, and telemetry data, but not a source ledger explaining where the input and route rows came from.

## Missing input/result proof

```txt
input_source_row
burner_intent_result
vent_intent_result
legacy_boost_input_classification
legacy_pitch_bank_input_classification
simulation_consumer_row
hud_consumer_row
telemetry_consumer_row
gamehost_source_projection_row
```

## Next safe interaction ledge

Keep current input behavior stable. Add source/result ledger rows first.
