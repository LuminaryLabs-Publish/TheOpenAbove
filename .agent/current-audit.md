# Current Audit — TheOpenAbove

**Timestamp:** `2026-07-08T22-19-38-04-00`

## Summary

`TheOpenAbove` is a hot-air-balloon drift route whose public/runtime surface is ahead of its durable source authority.

The route itself is clearly Balloon Drift, but README/package/campaign source still carries older free-flight language and `src/main.js` owns the live drift constants inline.

This pass keeps the next work narrow: source readback, fixture acceptance, and central ledger catch-up before renderer extraction, mission reducer work, world expansion, or reusable kit promotion.

## Current route

```txt
index.html
  -> src/main.js
  -> Three.js CDN
  -> NexusEngine main CDN
  -> src/data/campaign.config.js
  -> src/hot-air-balloon-object-kit.js
  -> inline terrain / lake / tree / cloud / wind-ribbon generation
  -> inline balloon drift / camera / HUD / GameHost loop
```

## Current interaction loop

```txt
open app
  -> read Balloon Drift HUD
  -> hold Space / W / ArrowUp for burner lift
  -> hold S / ArrowDown / Shift for vent descent
  -> procedural wind drifts the balloon
  -> wheel changes camera zoom / near-basket blend
  -> runtime updates altitude, wind, distance, heat, camera mode, Nexus telemetry, and GameHost state
```

## Repo-list / ledger comparison

```txt
checked LuminaryLabs-Publish repos:
  AetherVale
  HorrorCorridor
  IntoTheMeadow
  MyCozyIsland
  PhantomCommand
  PrehistoricRush
  TheCavalryOfRome
  TheOpenAbove
  TheUnmappedHouse
  ZombieOrchard

central ledger / root-agent check:
  non-Cavalry repos are represented in repo-ledger/LuminaryLabs-Publish/
  sampled root .agent/START_HERE.md state exists for checked non-Cavalry repos
  TheCavalryOfRome remains excluded

selection:
  TheOpenAbove selected because its repo-local .agent state had advanced beyond central ledger state and the source fixture acceptance queue remains unresolved
```

## Evidence snapshot

```txt
README.md:
  still says free-flight exploration, carving, gliding, diving, boosting, thermals, wind gates, and sky-perch return.

package.json:
  still says standalone free-flight exploration.

index.html:
  declares The Open Above: Balloon Drift and loads ./src/main.js.

src/data/campaign.config.js:
  exports CAMPAIGN, WORLD, and legacy FLIGHT with thermals, gates, perch, pitch, roll, yaw, boost, thermal lift, and terrain clearance.

src/main.js:
  imports CAMPAIGN and WORLD, seeds `${WORLD.seed}-balloon-drift`, builds balloon objects, and owns burner, vent, wind, buoyancy, altitude, camera, HUD, and GameHost snapshots inline.

src/hot-air-balloon-object-kit.js:
  composes envelope, mouth, streamers, seams, basket, rigging, burner, and rope sub-kits into the live balloon visual object.

tests/smoke.mjs:
  validates the current balloon route markers and object-kit markers, but not source-readback or product/config/runtime parity.
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
source-consumer-fixture
runtime-constant-parity
altitude-band-contract
altitude-band-resolver
route-object-descriptor
route-object-evaluator
wind-lane-hint
route-fixture-harness
browser-consumer-fixture
build-script-fixture-gate
mission-snapshot-projector
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
wire-source-fixture-into-check
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

Needed next:

```txt
open-above-product-copy-authority-kit
open-above-readme-route-copy-parity-kit
open-above-package-description-parity-kit
open-above-campaign-current-route-authority-kit
open-above-balloon-drift-config-kit
open-above-source-manifest-kit
open-above-balloon-source-fingerprint-kit
open-above-balloon-source-snapshot-kit
open-above-source-acceptance-result-kit
open-above-source-acceptance-ledger-kit
open-above-gamehost-source-readback-kit
open-above-source-acceptance-fixture-kit
open-above-source-module-consumer-splice-kit
open-above-runtime-constant-parity-kit
open-above-altitude-band-contract-kit
open-above-route-object-config-kit
open-above-wind-lane-hint-kit
open-above-browser-consumer-fixture-kit
open-above-deploy-build-contract-kit
```

## Main finding

The repo should not do renderer extraction first.

The source authority queue should come first:

```txt
README/package/campaign copy correction
  -> OPEN_ABOVE_PRODUCT source object
  -> BALLOON_DRIFT config beside compatibility-only FLIGHT
  -> ALTITUDE_BANDS / ROUTE_OBJECTS / WIND_LANE_HINTS
  -> SOURCE_MANIFEST
  -> source fingerprint and source snapshot
  -> SourceAcceptanceLedger
  -> DOM-free source fixture rows
  -> GameHost source diagnostics projection
  -> source-module consumer splice in src/main.js
  -> npm run check fixture integration
```

## New audit surfaces added

```txt
.agent/architecture-audit/2026-07-08T22-19-38-04-00-source-readback-catchup-dsk-map.md
.agent/render-audit/2026-07-08T22-19-38-04-00-gamehost-source-readback-contract.md
.agent/gameplay-audit/2026-07-08T22-19-38-04-00-balloon-drift-source-acceptance-loop.md
.agent/route-source-audit/2026-07-08T22-19-38-04-00-central-ledger-source-fixture-catchup.md
.agent/deploy-audit/2026-07-08T22-19-38-04-00-check-build-fixture-wire-map.md
```

## Next safe ledge

```txt
TheOpenAbove Source Readback Catch-up + Fixture Acceptance Gate
```
