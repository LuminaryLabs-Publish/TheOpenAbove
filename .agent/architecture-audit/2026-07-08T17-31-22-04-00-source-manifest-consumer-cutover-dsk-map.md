# Architecture Audit — Source Manifest Consumer Cutover DSK Map

**Timestamp:** `2026-07-08T17-31-22-04-00`

## Goal

Make the current hot-air-balloon drift product authoritative before any renderer, world, camera, mission, or reusable-kit extraction.

This audit converts the previous product/config fixture row gate into a source-manifest consumer cutover map: source files first, fixture rows second, `src/main.js` additive consumers third, and `window.GameHost.getState().source` readback last.

## Current source authority map

```txt
README.md
  -> still describes free-flight exploration, carving, gliding, diving, boosting, thermals, wind gates, and sky-perch return

package.json
  -> still describes standalone free-flight exploration

src/data/campaign.config.js
  -> exports CAMPAIGN/WORLD/FLIGHT with older Meadow Lift, thermal, gate, perch, and bird-style flight language

src/main.js
  -> imports CAMPAIGN and WORLD only
  -> seeds `${WORLD.seed}-balloon-drift`
  -> builds hot-air-balloon object kit
  -> owns burner, vent, wind, buoyancy, altitude, distance, camera, HUD, and GameHost state inline

index.html
  -> already presents The Open Above: Balloon Drift

tests/smoke.mjs
  -> proves balloon route markers and rejects bird route markers
  -> does not yet prove source/config/runtime parity
```

## Current interaction loop

```txt
open index.html
  -> mount canvas#game, HUD, and error panel
  -> src/main.js imports Three.js CDN, NexusEngine main CDN, CAMPAIGN, WORLD, and hot-air-balloon object kit
  -> terrain, lakes, trees, clouds, wind ribbons, and balloon visual object are created
  -> keyboard maps Space / W / ArrowUp to burner lift
  -> keyboard maps S / ArrowDown / Shift to vent descent
  -> wheel changes camera zoom and near-basket blend
  -> update(dt) integrates burner, vent, wind, buoyancy, altitude safety, velocity, position, and distance
  -> animateHotAirBalloon updates burner and rigging sub-kits
  -> Nexus telemetry kit publishes balloon snapshot resource and balloon tick event
  -> draw(dt) resolves third-person/basket camera, first-person visibility, and Three.js frame
  -> HUD projects altitude, wind, drift distance, heat, camera mode, and Nexus marker
  -> window.GameHost.getState() returns local and nexusEngine balloon telemetry
```

## Target authority loop

```txt
README/package/campaign product source
  -> OPEN_ABOVE_PRODUCT
  -> BALLOON_DRIFT
  -> ALTITUDE_BANDS
  -> ROUTE_OBJECTS
  -> WIND_LANE_HINTS
  -> BalloonSourceFingerprint
  -> BalloonSourceSnapshot
  -> SourceAcceptanceResult rows
  -> SourceAcceptanceLedger
  -> source fixture command
  -> src/main.js additive source imports
  -> window.GameHost.getState().source
  -> browser consumer proof
```

## Domains in use

```txt
static-page-host
vite-static-publish-host
third-party-cdn-runtime
three-render-host
nexus-engine-cdn-runtime
nexus-telemetry-kit
hot-air-balloon-object
balloon-envelope-panel
balloon-mouth
balloon-streamer-fit
balloon-fabric-seam
balloon-basket
balloon-rigging
balloon-burner
rope-geometry
procedural-terrain
terrain-height-sampler
moisture-field
terrain-color-resolver
lake-generation
tree-scatter
cloud-scatter
wind-ribbon-rendering
balloon-input-map
burner-vent-intent
balloon-vehicle-state
balloon-drift-physics
wind-field
altitude-safety
ceiling-softness
basket-follow-camera
camera-zoom-blend
first-person-visibility-gate
hud-telemetry
window-gamehost-debug
campaign-config
legacy-flight-compatibility
product-copy-authority
package-description-parity
readme-route-copy-parity
campaign-current-route-authority
balloon-drift-config-authority
source-manifest-authority
source-fingerprint
source-snapshot
source-acceptance-ledger
altitude-band-contract
altitude-band-resolver
route-object-descriptor
route-object-evaluator
wind-lane-hint
route-fixture-harness
browser-consumer-fixture
build-script-fixture-gate
```

## Services in use

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
install-resize-handler
install-keyboard-input-handler
install-wheel-zoom-handler
build-terrain-geometry
build-lake-discs
scatter-trees
build-cloud-groups
build-wind-ribbon-lines
build-hot-air-balloon
animate-hot-air-balloon
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
expose-window-gamehost
load-canonical-product-copy
load-balloon-drift-config
load-source-manifest
create-balloon-source-fingerprint
create-balloon-source-snapshot
resolve-altitude-band
project-route-objects
project-wind-lane-hints
run-source-acceptance-row
run-source-manifest-fixture
project-gamehost-source-readback
splice-source-records-into-main-runtime
preserve-existing-gamehost-local-and-nexus-shapes
```

## Implemented source-backed kits

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

## Inline / candidate kits

```txt
open-above-runtime-host-kit
open-above-vite-static-publish-kit
open-above-three-render-host-kit
open-above-campaign-config-kit
open-above-legacy-flight-compatibility-kit
open-above-balloon-input-map-kit
open-above-balloon-state-kit
open-above-balloon-drift-physics-kit
open-above-burner-vent-intent-kit
open-above-wind-field-kit
open-above-altitude-safety-kit
open-above-ceiling-softness-kit
open-above-terrain-sampler-kit
open-above-world-generation-kit
open-above-lake-generation-kit
open-above-tree-scatter-kit
open-above-cloud-scatter-kit
open-above-wind-ribbon-render-kit
open-above-basket-follow-camera-kit
open-above-camera-zoom-blend-kit
open-above-first-person-visibility-kit
open-above-hud-telemetry-kit
open-above-gamehost-debug-kit
```

## Next-cut kits

```txt
open-above-product-copy-authority-kit
open-above-readme-route-copy-parity-kit
open-above-package-description-parity-kit
open-above-campaign-current-route-authority-kit
open-above-legacy-flight-compatibility-kit
open-above-balloon-drift-config-kit
open-above-source-manifest-kit
open-above-balloon-source-fingerprint-kit
open-above-balloon-source-snapshot-kit
open-above-source-acceptance-result-kit
open-above-source-acceptance-ledger-kit
open-above-gamehost-source-readback-kit
open-above-source-acceptance-fixture-kit
open-above-source-module-consumer-splice-kit
open-above-altitude-band-contract-kit
open-above-altitude-band-resolver-kit
open-above-route-object-config-kit
open-above-route-object-evaluator-kit
open-above-wind-lane-hint-kit
open-above-route-fixture-harness-kit
open-above-browser-consumer-fixture-kit
open-above-deploy-build-contract-kit
open-above-mission-snapshot-projector-kit
```

## Immediate source file order

```txt
1. src/source/open-above-product.js
2. src/source/balloon-drift.config.js
3. src/source/altitude-bands.js
4. src/source/route-descriptors.js
5. src/source/wind-lane-hints.js
6. src/source/source-manifest.js
7. src/source/source-fingerprint.js
8. src/source/source-snapshot.js
9. src/source/source-acceptance.js
10. src/source/gamehost-source-readback.js
11. scripts/open-above-source-fixture.mjs
12. src/main.js additive import/splice
13. tests/smoke.mjs source-fixture marker checks
14. package.json scripts.check source-fixture integration
```

## Stop line

Stop after the source manifest, DOM-free fixture rows, and additive GameHost source diagnostics pass. Do not extract renderer/world/camera systems or retune balloon motion in the same ledge.
