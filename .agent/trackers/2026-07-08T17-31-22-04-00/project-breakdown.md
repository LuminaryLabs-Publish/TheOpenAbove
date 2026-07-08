# Project Breakdown — TheOpenAbove

**Timestamp:** `2026-07-08T17-31-22-04-00`

## Goal

Refresh repo-local operating docs for `LuminaryLabs-Publish/TheOpenAbove`, compare the full accessible Publish repo list against central tracking, and narrow the next implementation into a source-manifest consumer splice gate for the live balloon-drift route.

## Checklist

- [x] Compared accessible `LuminaryLabs-Publish` repo list against central tracking.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected exactly one repo: `LuminaryLabs-Publish/TheOpenAbove`.
- [x] Read central ledger for `TheOpenAbove`.
- [x] Read repo-local root `.agent` state.
- [x] Read README/package/source/test files.
- [x] Identified interaction loop.
- [x] Identified domains in use.
- [x] Identified services offered by kits/runtime.
- [x] Identified implemented, inline, and next-cut kits.
- [x] Added timestamped architecture audit.
- [x] Added timestamped render audit.
- [x] Added timestamped gameplay audit.
- [x] Added timestamped route-source audit.
- [x] Added timestamped deploy audit.
- [x] Updated root `.agent` docs.
- [x] Updated `kit-registry.json`.
- [x] Added timestamped turn-ledger entry.
- [x] Updated central repo ledger.
- [x] Added central internal change-log entry.
- [ ] Did not run local npm/browser validation.
- [ ] Did not edit runtime/source implementation files.

## Repo selected

```txt
LuminaryLabs-Publish/TheOpenAbove
```

## Selection reason

```txt
All checked non-Cavalry Publish repos are represented in central tracking.
Sampled root .agent state already exists for checked non-Cavalry repos.
TheCavalryOfRome remains excluded.
TheOpenAbove was selected because repo-local state had advanced beyond the central ledger and its source-authority seam remains unresolved.
The immediate value is to make the central ledger and repo-local .agent state agree on the next source-manifest consumer splice.
```

## Publish organization repos observed

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent observed
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent observed
LuminaryLabs-Publish/AetherVale          tracked / root .agent observed
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent observed
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent observed
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent observed
LuminaryLabs-Publish/TheOpenAbove        selected / central ledger catch-up + source manifest gate
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent observed
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent observed
```

## Source evidence read

```txt
README.md:
  still describes free-flight exploration, carving, gliding, diving, boosting, thermals, wind gates, and sky-perch return.

package.json:
  still says standalone free-flight exploration.

src/data/campaign.config.js:
  exports CAMPAIGN, WORLD, and legacy FLIGHT; campaign still describes canopy carving, thermal targets, gate targets, and sky perch.

src/main.js:
  imports CAMPAIGN and WORLD only; owns live hot-air-balloon burner, vent, wind, buoyancy, altitude, camera, HUD, and GameHost snapshot logic inline.

tests/smoke.mjs:
  proves balloon/basket/rope route markers and rejects bird markers, but does not yet prove product/config/runtime/source parity.
```

## Interaction loop

```txt
open index.html
  -> canvas#game and HUD mount
  -> src/main.js imports Three.js CDN, NexusEngine main CDN, CAMPAIGN, WORLD, and hot-air-balloon object kit
  -> terrain, lakes, trees, clouds, wind ribbons, and balloon visual object are created
  -> keyboard input maps Space / W / ArrowUp to burner lift
  -> keyboard input maps S / ArrowDown / Shift to vent descent
  -> wheel input changes camera zoom and near-basket blend
  -> update(dt) integrates burner, vent, wind, buoyancy, altitude safety, velocity, position, and drift distance
  -> animateHotAirBalloon updates burner and rigging sub-kits
  -> Nexus telemetry kit publishes balloon snapshot/resource and balloon tick event
  -> draw(dt) resolves third-person/basket camera and first-person visibility
  -> Three.js renders scene/camera
  -> HUD writes altitude, wind, distance, heat, camera mode, and Nexus marker
  -> window.GameHost.getState() exposes local and Nexus balloon telemetry
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

## Services offered

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
open-above-route-object-config-kit
open-above-route-object-evaluator-kit
open-above-wind-lane-hint-kit
open-above-route-fixture-harness-kit
open-above-browser-consumer-fixture-kit
open-above-deploy-build-contract-kit
```

## Main finding

`TheOpenAbove` should remain visually stable and close source authority first. The route already plays as hot-air-balloon drift, but README/package/campaign source, drift constants, source manifest, fixture output, and GameHost source diagnostics do not yet prove the same product route.

## Next safe ledge

```txt
TheOpenAbove Source Manifest Consumer Splice + Fixture Check Gate
```

## Files changed

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T17-31-22-04-00-source-manifest-consumer-cutover-dsk-map.md
.agent/render-audit/2026-07-08T17-31-22-04-00-gamehost-source-fixture-readback.md
.agent/gameplay-audit/2026-07-08T17-31-22-04-00-balloon-drift-config-replay-loop.md
.agent/route-source-audit/2026-07-08T17-31-22-04-00-source-manifest-consumer-splice-acceptance.md
.agent/deploy-audit/2026-07-08T17-31-22-04-00-fixture-check-integration.md
.agent/trackers/2026-07-08T17-31-22-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T17-31-22-04-00.md
```

## Validation

Performed:

```txt
GitHub repo-list read
central ledger readback
repo-local .agent readback
repo-local source readback
repo-local .agent write
central ledger write
central internal change-log write
```

Not performed:

```txt
local checkout
npm install
npm run check
npm run build
browser smoke
GitHub Pages smoke
runtime source edit
```
