# Route Source Audit — Consumer Freeze Contract

**Timestamp:** `2026-07-09T03-29-29-04-00`

## Contract goal

Freeze the list of source consumers before any implementation agent rewrites product copy, route config, GameHost diagnostics, or test coverage.

## Consumers that must be represented in `SOURCE_MANIFEST`

```txt
README.md
package.json
src/data/campaign.config.js
src/main.js
src/hot-air-balloon-object-kit.js
tests/smoke.mjs
package.json scripts.check
window.GameHost.getState()
LuminaryLabs-Dev/LuminaryLabs repo ledger
```

## Current canonical route

```txt
product: The Open Above: Balloon Drift
objectType: hot-air-balloon
controls:
  burner: Space / W / ArrowUp
  vent: S / ArrowDown / Shift
  cameraZoom: wheel
runtime:
  wind-driven drift
  burner/vent vertical control
  altitude safety
  third-person and basket camera blend
  NexusEngine telemetry resource/event
```

## Current non-canonical legacy route copy

```txt
free-flight exploration
carving, gliding, diving, boosting
thermals
wind gates
sky perch return
pitch/bank controls
FLIGHT boost and flight constants
```

## Required output rows

```txt
product_copy_matches_balloon_drift
package_description_matches_balloon_drift
campaign_copy_marks_balloon_drift_current_route
legacy_flight_marked_compatibility_only
source_manifest_lists_all_runtime_consumers
source_manifest_lists_central_ledger_consumer
central_ledger_matches_repo_local_latest_tracker
```

## Implementation stop line

The source fixture may report the current copy/config mismatches. It should not hide the mismatch by silently treating old free-flight copy as current behavior.

The implementation should either update the product/config copy to Balloon Drift or mark older fields as explicit compatibility rows with a reason.
