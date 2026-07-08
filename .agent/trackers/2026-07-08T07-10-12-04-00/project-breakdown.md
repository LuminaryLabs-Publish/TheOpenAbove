# Project Breakdown — TheOpenAbove

**Timestamp:** `2026-07-08T07:10:12-04:00`

## Summary

`TheOpenAbove` was selected as the fallback repo-local follow-up after checking the current `LuminaryLabs-Publish` repo set against central ledger state. The repo already has root `.agent` state, so this pass refined the next implementation ledge from a broad product-source fixture matrix into a smaller acceptance ledger for the balloon drift config gate.

No runtime files were changed.

## Selection result

```txt
full checked Publish repo list:
  LuminaryLabs-Publish/AetherVale
  LuminaryLabs-Publish/HorrorCorridor
  LuminaryLabs-Publish/IntoTheMeadow
  LuminaryLabs-Publish/MyCozyIsland
  LuminaryLabs-Publish/PhantomCommand
  LuminaryLabs-Publish/PrehistoricRush
  LuminaryLabs-Publish/TheCavalryOfRome
  LuminaryLabs-Publish/TheOpenAbove
  LuminaryLabs-Publish/TheUnmappedHouse
  LuminaryLabs-Publish/ZombieOrchard

excluded:
  LuminaryLabs-Publish/TheCavalryOfRome

repo selected:
  LuminaryLabs-Publish/TheOpenAbove

selection reason:
  no checked non-Cavalry repo was fully new, central-ledger absent, or missing root .agent/START_HERE.md;
  TheOpenAbove remains an eligible fallback because its live product is balloon drift while source authority and docs still carry free-flight vocabulary.
```

## Current route

```txt
index.html
  -> src/main.js
```

`index.html` mounts `canvas#game`, HUD, error panel, and loads `./src/main.js`.

## Current interaction loop

```txt
player opens app
  -> static page mounts canvas and HUD
  -> src/main.js imports Three.js CDN and NexusEngine CDN
  -> campaign/world config is loaded
  -> procedural terrain, lakes, trees, clouds, and wind ribbons are built
  -> hot-air-balloon object kit builds envelope, seams, basket, rigging, burner, streamers, mouth, and ropes
  -> player holds Space / W / ArrowUp for burner lift
  -> player holds S / ArrowDown / Shift for vent descent
  -> procedural wind and buoyancy integrate balloon position
  -> terrain clearance and soft ceiling constrain altitude
  -> wheel zoom blends camera between third-person basket-follow and near-basket view
  -> Nexus telemetry kit publishes balloon snapshots
  -> HUD and GameHost expose altitude, wind, distance, burner, vent, camera blend, and local/nexus snapshots
```

## Domains in use

```txt
static-page-host
vite-static-publish-host
third-party-cdn-runtime
three-render-host
nexus-engine-cdn-runtime
nexus-balloon-telemetry
product-copy-authority
readme-route-copy-parity
package-description-parity
campaign-config
legacy-flight-compatibility
balloon-drift-config-authority
balloon-input-map
burner-vent-intent
wind-field
balloon-vehicle-state
balloon-drift-physics
altitude-safety
altitude-band-contract
altitude-band-resolver
terrain-sampler
world-generation
lake-generation
tree-scatter
cloud-scatter
wind-ribbon-rendering
basket-follow-camera
camera-zoom-blend
hud-telemetry
window-gamehost-debug
hot-air-balloon-object
balloon-envelope-panel
balloon-mouth
balloon-streamer-fit
balloon-fabric-seam
balloon-basket
balloon-rigging
balloon-burner
rope-geometry
source-fingerprint
source-snapshot
route-object-descriptor
route-object-evaluator
route-event-result-envelope
route-fixture-harness
route-replay-parity
```

## Services identified

```txt
mount-canvas
mount-hud
mount-error-panel
show-fatal-runtime-error
seed-random
sample-terrain-height
sample-moisture
resolve-terrain-color
create-scene
create-camera
create-renderer
build-terrain-geometry
build-lake-discs
scatter-trees
build-cloud-groups
build-wind-ribbon-lines
build-hot-air-balloon
animate-hot-air-balloon
install-keyboard-input-handler
install-wheel-zoom-handler
smooth-burner-value
smooth-vent-value
sample-wind-angle
sample-wind-speed
write-wind-vector
compute-buoyancy
compute-altitude-damping
compute-ceiling-softness
integrate-vertical-velocity
blend-velocity-toward-wind
integrate-position
clamp-above-terrain-clearance
compute-altitude
accumulate-horizontal-distance
compute-basket-focus
compute-third-person-camera-position
compute-first-person-camera-position
blend-camera-mode
set-first-person-visibility
render-frame
write-hud-html
define-balloon-telemetry-resource
emit-balloon-ticked-event
expose-engine-openAbove-getState
expose-window-gamehost
load-product-copy
load-balloon-drift-config
project-source-fingerprint
project-source-snapshot
resolve-altitude-band
load-route-objects
evaluate-route-object
run-product-source-fixture-row
run-balloon-config-acceptance-row
run-dom-free-route-fixture
```

## Kits identified

Implemented / source-backed:

```txt
open-above-balloon-telemetry-kit
open-above-hot-air-balloon-object-kit
open-above-balloon-envelope-panel-kit
open-above-balloon-mouth-kit
open-above-balloon-streamer-fit-kit
open-above-balloon-fabric-seam-kit
open-above-hot-air-balloon-basket-kit
open-above-hot-air-balloon-rigging-kit
open-above-hot-air-balloon-burner-kit
open-above-rope-kit
```

Inline / candidate:

```txt
open-above-runtime-host-kit
open-above-three-render-host-kit
open-above-vite-static-publish-kit
open-above-balloon-input-map-kit
open-above-balloon-state-kit
open-above-balloon-drift-physics-kit
open-above-burner-vent-intent-kit
open-above-wind-field-kit
open-above-altitude-safety-kit
open-above-terrain-sampler-kit
open-above-world-generation-kit
open-above-lake-generation-kit
open-above-tree-scatter-kit
open-above-cloud-scatter-kit
open-above-wind-ribbon-render-kit
open-above-basket-follow-camera-kit
open-above-camera-zoom-blend-kit
open-above-hud-telemetry-kit
open-above-gamehost-debug-kit
```

Next-cut kits:

```txt
open-above-product-copy-authority-kit
open-above-readme-route-copy-parity-kit
open-above-package-description-parity-kit
open-above-balloon-drift-config-kit
open-above-balloon-source-fingerprint-kit
open-above-balloon-source-snapshot-kit
open-above-altitude-band-contract-kit
open-above-altitude-band-resolver-kit
open-above-route-object-config-kit
open-above-route-object-evaluator-kit
open-above-route-event-result-envelope-kit
open-above-route-event-rejection-reason-kit
open-above-route-event-journal-kit
open-above-route-state-reducer-kit
open-above-meadow-lift-mission-reducer-kit
open-above-mission-snapshot-projector-kit
open-above-region-unlock-progression-kit
open-above-route-fixture-harness-kit
open-above-route-replay-parity-kit
open-above-gamehost-diagnostics-parity-kit
open-above-balloon-config-acceptance-ledger-kit
```

## Evidence snapshot

```txt
README.md:
  says The Open Above is free-flight exploration about carving, gliding, diving, boosting, thermals, wind gates, sky perch, and Cloud Basin.

package.json:
  says standalone free-flight exploration.

index.html:
  title/description already say Balloon Drift and load src/main.js.

src/main.js:
  proves the active route is a balloon drift scene with burner, vent, wind, buoyancy, altitude, distance, basket-follow camera, HUD telemetry, Nexus telemetry, and GameHost snapshots.

src/data/campaign.config.js:
  still exports legacy CAMPAIGN/WORLD/FLIGHT values with thermals, gates, perch, pitch, roll, yaw, boost, thermal lift, and terrain clearance.
```

## Main finding

The next implementation should still avoid renderer extraction.

The smallest useful implementation cut is now:

```txt
TheOpenAbove Balloon Drift Config Acceptance Ledger
```

This should create exact acceptance rows for source copy, config extraction, runtime parity, altitude bands, route objects, source fingerprint, GameHost diagnostics, and DOM-free fixture replay before mission reducers or renderer extraction.

## Required acceptance rows

```txt
product_copy_matches_balloon_drift
package_description_matches_balloon_drift
campaign_copy_marks_balloon_drift_current_route
legacy_flight_marked_compatibility_only
balloon_drift_config_matches_inline_runtime_defaults
balloon_drift_config_drives_burner_vent_wind_altitude_camera_defaults
altitude_bands_have_non_overlapping_thresholds
route_objects_define_three_lift_gates_and_one_landing
source_fingerprint_reports_copy_config_runtime_markers
gamehost_reports_balloon_source_snapshot
dom_free_fixture_runs_without_canvas_webgl_or_dom
```

## Next implementation ledge

```txt
Preserve visible route
  -> correct README/package/campaign copy
  -> add PRODUCT_COPY / OPEN_ABOVE_PRODUCT
  -> add BALLOON_DRIFT config copied from current inline constants
  -> mark FLIGHT compatibility-only
  -> add ALTITUDE_BANDS / ROUTE_OBJECTS / WIND_LANE_HINTS
  -> add source fingerprint and snapshot
  -> expose source snapshot through GameHost diagnostics
  -> add DOM-free fixture rows
  -> extend npm run check
```

## Validation note

No runtime source files changed.

No local build, smoke test, browser route check, GitHub Pages check, or screenshot validation was run in this documentation-only pass.
