# Project Breakdown — TheOpenAbove

**Timestamp:** `2026-07-08T15-09-42-04-00`

## Plan ledger

**Goal:** Compare the full accessible `LuminaryLabs-Publish` repo list against central tracking, select one eligible repo, refresh its root `.agent/` docs, identify loop/domains/services/kits, and log the central ledger change.

**Checklist**

- [x] Compare accessible `LuminaryLabs-Publish` repository list.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare against `LuminaryLabs-Dev/LuminaryLabs` repo ledger state.
- [x] Select one repo only.
- [x] Read repo-local `.agent` state.
- [x] Read README/package/index/config/runtime/object-kit source.
- [x] Identify interaction loop.
- [x] Identify domains in use.
- [x] Identify kit services.
- [x] Identify implemented and planned kits.
- [x] Add timestamped tracker entry.
- [x] Add timestamped turn-ledger entry.
- [x] Add architecture audit.
- [x] Add render audit.
- [x] Add gameplay audit.
- [x] Add route-source audit.
- [x] Refresh root `.agent` docs.
- [x] Refresh `.agent/kit-registry.json`.
- [x] Update central `LuminaryLabs-Dev/LuminaryLabs` repo ledger.
- [x] Add central internal change-log entry.
- [x] Push only to `main`.

## Repo selected

```txt
LuminaryLabs-Publish/TheOpenAbove
```

## Selection reason

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`TheOpenAbove` was selected by the oldest observed eligible fallback rule because its central ledger remained older than the other current non-Cavalry repo-local follow-ups and the source-authority mismatch is still high-value.

## Publish repo comparison

```txt
LuminaryLabs-Publish/AetherVale          tracked / root .agent observed / central update newer than TheOpenAbove
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent observed / central update newer than TheOpenAbove
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent observed / central update newer than TheOpenAbove
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent observed / central update newer than TheOpenAbove
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent observed / central update newer than TheOpenAbove
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent observed / central update newer than TheOpenAbove
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/TheOpenAbove        selected follow-up: source fixture implementation queue
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent observed / central update newer than TheOpenAbove
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent observed / central update newer than TheOpenAbove
```

## Interaction loop

```txt
open app
  -> load canvas and HUD
  -> src/main.js imports Three.js, NexusEngine, CAMPAIGN, WORLD, and hot-air-balloon object kit
  -> terrain, lakes, trees, clouds, wind ribbons, and balloon visual object are created
  -> keyboard input controls burner / vent intent
  -> wheel input changes camera zoom and near-basket blend
  -> inline drift loop samples wind, buoyancy, altitude safety, velocity, distance, balloon animation, and camera
  -> Nexus telemetry kit publishes balloonSnapshot / balloonTicked
  -> Three.js renders the current frame
  -> HUD writes altitude, wind, drift distance, heat, camera mode, and Nexus marker
  -> window.GameHost.getState() exposes local and Nexus balloon telemetry
```

## Domains identified

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
mission-snapshot-projector
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

Needed next:

```txt
open-above-product-copy-authority-kit
open-above-readme-route-copy-parity-kit
open-above-package-description-parity-kit
open-above-campaign-source-parity-kit
open-above-balloon-drift-config-kit
open-above-balloon-source-fingerprint-kit
open-above-balloon-source-snapshot-kit
open-above-source-acceptance-result-kit
open-above-source-acceptance-ledger-kit
open-above-gamehost-source-readback-kit
open-above-source-acceptance-fixture-kit
open-above-altitude-band-contract-kit
open-above-altitude-band-resolver-kit
open-above-route-object-config-kit
open-above-route-object-evaluator-kit
open-above-wind-lane-hint-kit
open-above-route-fixture-harness-kit
open-above-mission-snapshot-projector-kit
```

## Source-backed findings

```txt
README.md still describes older free-flight gameplay.
package.json still describes older free-flight exploration.
index.html already describes Balloon Drift.
src/data/campaign.config.js still exports legacy FLIGHT with pitch/roll/yaw/boost/thermal fields.
src/main.js imports CAMPAIGN/WORLD and owns balloon drift runtime constants inline.
src/hot-air-balloon-object-kit.js already provides the balloon object and sub-kit family.
window.GameHost.getState() exposes local/nexus state but not source diagnostics yet.
```

## Files changed in this repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T15-09-42-04-00-balloon-source-fixture-implementation-queue.md
.agent/render-audit/2026-07-08T15-09-42-04-00-gamehost-source-diagnostics-readback.md
.agent/gameplay-audit/2026-07-08T15-09-42-04-00-balloon-route-result-boundary.md
.agent/route-source-audit/2026-07-08T15-09-42-04-00-source-fixture-implementation-queue.md
.agent/trackers/2026-07-08T15-09-42-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T15-09-42-04-00.md
```

## Validation

Performed:

```txt
GitHub repo-list comparison
central ledger readback
repo-local .agent readback
README/package/index/config/main/object-kit source readback
repo-local .agent documentation update
central repo-ledger update
central internal change-log entry
```

Not performed:

```txt
local checkout
npm install
npm run check
npm run build
browser route check
GitHub Pages live check
runtime source edit
```

## Next safe ledge

```txt
TheOpenAbove Balloon Source Fixture Implementation Queue + GameHost Source Diagnostics
```

Start with source modules and fixtures. Do not extract renderer/world/camera systems first.