# Project Breakdown — TheOpenAbove

**Timestamp:** `2026-07-08T15-11-18-04-00`

## Goal

Refresh the repo-local `.agent` breakdown for `LuminaryLabs-Publish/TheOpenAbove` after comparing the accessible `LuminaryLabs-Publish` organization list against central `LuminaryLabs-Dev/LuminaryLabs` tracking.

This pass keeps the live runtime unchanged and narrows the next implementation from a broad balloon-source cutover into an exact source-module consumer splice map for `src/main.js` and `window.GameHost.getState()`.

## Selection checklist

- [x] Read the accessible `LuminaryLabs-Publish` installation repo list.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Checked non-Cavalry repos for central/root `.agent` state.
- [x] Chose one repo only: `LuminaryLabs-Publish/TheOpenAbove`.
- [x] Read repo-local `.agent` docs.
- [x] Read active source files: `README.md`, `package.json`, `index.html`, `src/main.js`, `src/data/campaign.config.js`, and `src/hot-air-balloon-object-kit.js`.
- [x] Identified interaction loop.
- [x] Identified domains in use.
- [x] Identified kit services.
- [x] Identified current, inline, and next-cut kits.
- [x] Added timestamped tracker, turn ledger, architecture audit, render audit, gameplay audit, and route-source audit.
- [x] Updated root `.agent` operating docs.
- [x] Prepared central ledger and internal change-log updates.

## Publish repositories checked

```txt
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / latest observed 2026-07-08T13:59:50-04:00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest observed 2026-07-08T13:39:15-04:00
LuminaryLabs-Publish/TheOpenAbove        selected fallback / previous latest observed 2026-07-08T13-31-29-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / latest observed 2026-07-08T14:08:24-04:00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest observed 2026-07-08T14:51:11-04:00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / latest observed 2026-07-08T14:18:45-04:00
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest observed 2026-07-08T13-50-37-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest observed 2026-07-08T14-58-49-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / latest observed 2026-07-08T14-31-06-04-00
```

No checked non-Cavalry repo was fully new, absent from central tracking, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`TheOpenAbove` was selected as the oldest observed eligible fallback.

## Current product read

`TheOpenAbove` is currently a Vite / Three.js hot-air-balloon wind-drift route that imports Nexus Engine from the public main CDN.

The durable docs still partly describe the older free-flight product, while the page and runtime describe the live balloon product.

```txt
README.md / package.json / campaign.config.js
  -> still carry free-flight, thermals, wind-gates, pitch/roll/boost, and perch-return language

index.html / src/main.js / hot-air-balloon object kit
  -> current hot-air-balloon Balloon Drift route
```

## Current interaction loop

```txt
open index.html
  -> canvas#game and HUD mount
  -> src/main.js imports Three.js CDN, NexusEngine main CDN, CAMPAIGN/WORLD, and hot-air-balloon object kit
  -> procedural terrain, lakes, trees, clouds, wind ribbons, and balloon visual object are built
  -> keyboard state maps Space/W/ArrowUp to burner and S/ArrowDown/Shift to vent
  -> wheel input changes camera zoom and first-person basket blend
  -> update(dt) integrates wind, burner, vent, buoyancy, altitude safety, velocity, position, and drift distance
  -> animateHotAirBalloon updates burner and rigging sub-kits
  -> Nexus telemetry kit publishes balloon snapshot/resource and balloon tick event
  -> draw(dt) resolves third-person/basket camera and first-person visibility
  -> Three.js renders scene/camera
  -> HUD projects altitude, wind, distance, heat, camera mode, and Nexus marker
  -> window.GameHost.getState() returns local and Nexus balloon telemetry
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
balloon-drift-config-authority
source-fingerprint
source-snapshot
source-acceptance-ledger
altitude-band-contract
altitude-band-resolver
route-object-descriptor
route-object-evaluator
wind-lane-hint
route-fixture-harness
source-module-consumer-splice
mission-snapshot-projector
```

## Kit services identified

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
create-balloon-source-fingerprint
create-balloon-source-snapshot
resolve-altitude-band
project-route-objects
project-wind-lane-hints
run-source-acceptance-row
run-dom-free-source-fixture
project-gamehost-source-readback
splice-source-records-into-main-runtime
preserve-existing-gamehost-local-and-nexus-shapes
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

Next-cut:

```txt
open-above-product-copy-authority-kit
open-above-readme-route-copy-parity-kit
open-above-package-description-parity-kit
open-above-balloon-drift-config-kit
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
open-above-route-replay-parity-kit
open-above-gamehost-diagnostics-parity-kit
open-above-mission-snapshot-projector-kit
```

## Main finding

The next implementation should not start with renderer extraction, camera tuning, mission progression, or route reducers.

The next useful ledge is to add source-authority modules and wire them into the existing browser route without changing visuals:

```txt
TheOpenAbove Source Module Consumer Splice Map + GameHost Source Gate
```

That means the implementation should prove exactly where `OPEN_ABOVE_PRODUCT`, `BALLOON_DRIFT`, `ALTITUDE_BANDS`, `ROUTE_OBJECTS`, `WIND_LANE_HINTS`, source fingerprint, source snapshot, and source acceptance rows are imported and consumed by `src/main.js`, while preserving the current `window.GameHost.getState().local` and `.nexusEngine` shapes.

## Validation

This pass changed documentation and central tracking only.

No runtime source files were changed. No local checkout, `npm install`, `npm run check`, `npm run build`, browser smoke, Pages check, or source fixture was run.
