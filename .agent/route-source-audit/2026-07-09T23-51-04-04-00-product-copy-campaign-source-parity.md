# Route Source Audit — Product Copy Campaign Source Parity

**Timestamp:** `2026-07-09T23-51-04-04-00`

## Current source parity state

```txt
index.html:
  current route title and meta description already say cinematic hot air balloon / Balloon Drift

package.json:
  description is now aligned to cinematic hot air balloon wind-drift experience
  scripts expose check and build

README.md:
  still describes older free-flight carving, gliding, diving, boosting, thermals, wind gates, and sky perch controls

src/data/campaign.config.js:
  still carries Meadow Lift thermal/gate/perch objectives and FLIGHT constants from older free-flight route

src/main.js:
  live source of truth for current route assembly and GameHost shape

src/runtime/balloon-simulation-kit.js:
  live source of truth for burner, vent, wind, altitude, and movement integration

src/visual/visual-domain.js:
  live source of truth for cinematic visual-domain composition
```

## Main finding

The product source mismatch is now narrower than earlier passes. `package.json` has caught up to the hot-air-balloon route, but `README.md` and `src/data/campaign.config.js` still preserve older free-flight/mission language.

The next source layer should mark compatibility-only legacy values before deleting or repurposing them.

## Required source/readback rows

```txt
readme_route_copy_status
package_description_status
campaign_current_route_status
legacy_flight_compatibility_status
balloon_simulation_default_status
visual_domain_subkit_status
camera_rig_default_status
presentation_domain_status
smoke_fixture_status
GameHost_source_status
central_ledger_status
```

## Do not do yet

```txt
Do not rewrite README copy without a source-owned product module.
Do not remove FLIGHT fields until legacy compatibility handling exists.
Do not retune burner, vent, wind, buoyancy, ceiling, camera, or visual constants.
Do not expand Cloud Basin or route progression.
```
