# Gameplay Audit — Balloon Drift Source Fixture Loop

**Timestamp:** `2026-07-09T03-29-29-04-00`

## Current gameplay loop

```txt
open route
  -> balloon starts at position 0,105,0
  -> player holds Space/W/ArrowUp for burner lift
  -> player holds S/ArrowDown/Shift for vent descent
  -> wheel changes zoom and near-basket blend
  -> wind angle and wind speed drift over elapsed time
  -> buoyancy, damping, soft ceiling, ground clearance update altitude
  -> horizontal distance accumulates from velocity
  -> HUD reports burner state, camera mode, altitude, wind speed, and drift distance
```

## Current source mismatch that affects gameplay planning

```txt
README gameplay says pitch, bank, boost, thermals, wind gates, and sky perch.
package description says standalone free-flight exploration.
campaign config still contains thermalTarget, gateTarget, returnRadius, FLIGHT, boost, and terrain clearance.
actual gameplay is burner/vent/wind/altitude/zoom/basket drift.
```

## Source fixture target

```txt
BalloonDriftConfig
  -> input map rows
  -> wind rows
  -> altitude band rows
  -> camera blend rows
  -> source acceptance rows
  -> GameHost source readback rows
  -> central ledger parity row
```

## Gameplay-specific acceptance rows

```txt
controls_report_burner_vent_not_pitch_bank_boost
route_reports_balloon_drift_not_free_flight
legacy_flight_marked_compatibility_only
balloon_drift_config_matches_inline_runtime_defaults
altitude_bands_match_ground_clearance_and_soft_ceiling
camera_blend_reports_basket_view_contract
existing_drift_snapshot_shape_preserved
```

## Do not do yet

```txt
Do not add mission progression.
Do not add Cloud Basin.
Do not remove FLIGHT until legacy compatibility is source-owned.
Do not retune wind, buoyancy, burner, vent, or camera constants.
```

## Next gameplay implementation seam

Add source-owned route/gameplay descriptors first, then wire readback. The actual gameplay loop should remain unchanged until fixture rows prove the current product surface.
