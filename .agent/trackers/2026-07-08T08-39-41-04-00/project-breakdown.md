# Project Breakdown — TheOpenAbove

**Timestamp:** `2026-07-08T08:39:41-04:00`

**Repo:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

**Runtime/source changed:** no

## Goal

Update the repo-local internal docs after comparing the full `LuminaryLabs-Publish` repo list against the central `LuminaryLabs-Dev/LuminaryLabs` ledger. Select one eligible repo only, identify the loop/domains/services/kits, and narrow the next implementation ledge into source authority work that can be done without changing the visible route first.

## Plan ledger

- [x] List the accessible `LuminaryLabs-Publish` repositories.
- [x] Compare them against central `repo-ledger/LuminaryLabs-Publish` state.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Select one repo only.
- [x] Read current repo `.agent` state.
- [x] Read README, package metadata, campaign config, active runtime, and balloon object kit.
- [x] Identify the interaction loop.
- [x] Identify domains in use.
- [x] Identify services offered by current and target kits.
- [x] Identify implemented, inline, and next-cut kits.
- [x] Add timestamped tracker and turn-ledger entries.
- [x] Add timestamped architecture and render audits.
- [x] Add route-source implementation queue.
- [x] Refresh root `.agent` docs.
- [x] Update central `LuminaryLabs-Dev/LuminaryLabs` repo ledger.
- [x] Add central internal change-log entry.
- [x] Push all documentation updates to `main`.

## Publish repo comparison

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked with root .agent
LuminaryLabs-Publish/HorrorCorridor      tracked with root .agent
LuminaryLabs-Publish/AetherVale          tracked with root .agent
LuminaryLabs-Publish/ZombieOrchard       tracked with root .agent
LuminaryLabs-Publish/TheUnmappedHouse    tracked with root .agent
LuminaryLabs-Publish/MyCozyIsland        tracked with root .agent
LuminaryLabs-Publish/TheOpenAbove        selected fallback follow-up
LuminaryLabs-Publish/PhantomCommand      tracked with root .agent
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked with root .agent
```

No checked non-Cavalry repo was fully new, central-ledger absent, or missing sampled root `.agent/START_HERE.md` state.

`TheOpenAbove` was selected by fallback because it remains the clearest user-visible source-authority mismatch: live runtime is hot-air-balloon drift, while durable copy/config still contains older free-flight and mission language.

## Evidence readback

```txt
README.md
  still describes free-flight exploration, carving, gliding, diving, boosting, thermals, wind gates, and sky-perch return.

package.json
  still describes a standalone free-flight exploration game.

src/data/campaign.config.js
  exports CAMPAIGN and WORLD for Meadow Lift plus legacy FLIGHT constants for pitch/roll/boost/thermal behavior.

src/main.js
  is the live route authority. It imports CAMPAIGN and WORLD, builds terrain/lakes/trees/clouds/wind ribbons, builds the balloon, integrates burner/vent/wind/buoyancy/altitude inline, writes HUD, ticks Nexus telemetry, and exposes window.GameHost.

src/hot-air-balloon-object-kit.js
  already splits the balloon visual into object, envelope panel, mouth, streamer fit, seam, basket, rigging, burner, and rope subdomains.
```

## Current interaction loop

```txt
open index.html
  -> load src/main.js
  -> import Three.js CDN
  -> import NexusEngine CDN
  -> import CAMPAIGN and WORLD
  -> build procedural terrain / lakes / trees / clouds / wind ribbons
  -> build open-above procedural hot-air-balloon object
  -> collect keyboard and wheel input
  -> Space / W / ArrowUp raise burner
  -> S / ArrowDown / Shift open vent
  -> sample procedural wind
  -> integrate buoyancy, vertical velocity, horizontal drift, altitude, and distance inline
  -> animate burner and rigging sub-kits
  -> update basket-follow / near-basket camera blend
  -> set first-person visibility on envelope and rigging
  -> tick Nexus telemetry kit
  -> render Three.js frame
  -> write HUD HTML
  -> expose local and Nexus snapshots through window.GameHost.getState()
```

## Domains in use

```txt
static-page-host
vite-static-publish-host
third-party-cdn-runtime
three-render-host
nexus-engine-cdn-runtime
nexus-balloon-telemetry
hot-air-balloon-object
balloon-envelope-panel
balloon-mouth
balloon-streamer-fit
balloon-fabric-seam
hot-air-balloon-basket
hot-air-balloon-rigging
hot-air-balloon-burner
rope-geometry
procedural-terrain
moisture-field
lake-generation
tree-scatter
cloud-scatter
wind-ribbon-rendering
keyboard-input
wheel-zoom-input
balloon-vehicle-state
burner-vent-intent
wind-field
balloon-drift-physics
altitude-safety
basket-follow-camera
first-person-camera-blend
first-person-visibility-gate
hud-telemetry
window-gamehost-debug
campaign-config
legacy-flight-compatibility
product-copy-authority
balloon-drift-config-authority
source-fingerprint
source-snapshot
altitude-band-contract
route-object-descriptor
route-object-evaluator
route-event-result-envelope
route-fixture-harness
mission-snapshot-projector
progression-unlock-policy
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
compose-envelope-assembly
build-envelope-panels
build-balloon-mouth
build-fitted-streamers
build-fabric-seams
build-basket
build-rigging
build-burner
animate-hot-air-balloon
animate-burner
animate-rigging
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
integrate-balloon-position
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
define-balloon-ticked-event
write-balloon-snapshot-resource
emit-balloon-ticked-event
expose-engine-openAbove-getState
expose-window-gamehost
```

## Target services for the next implementation

```txt
load-open-above-product-copy
load-balloon-drift-config
mark-flight-config-compatibility-only
mirror-inline-drift-defaults
resolve-altitude-band
load-route-object-descriptors
load-wind-lane-hints
project-source-fingerprint
project-source-snapshot
project-gamehost-source-diagnostics
create-balloon-config-acceptance-result
run-product-copy-parity-fixture
run-config-runtime-parity-fixture
run-dom-free-route-fixture
project-balloon-mission-snapshot
```

## Kits identified

### Implemented / source-backed

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

### Inline / candidate

```txt
open-above-runtime-host-kit
open-above-vite-static-publish-kit
open-above-three-render-host-kit
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

### Next-cut proof kits

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
open-above-balloon-config-acceptance-result-kit
open-above-balloon-config-acceptance-ledger-kit
open-above-route-fixture-harness-kit
open-above-gamehost-diagnostics-parity-kit
open-above-mission-snapshot-projector-kit
```

## Main finding

The next implementation should not start with renderer extraction or additional balloon polish.

Start with source authority:

```txt
README/package/campaign copy correction
  -> canonical OPEN_ABOVE_PRODUCT source object
  -> BALLOON_DRIFT config beside compatibility-only FLIGHT
  -> inline drift defaults moved from src/main.js into BALLOON_DRIFT
  -> source fingerprint and source snapshot
  -> GameHost diagnostics projection
  -> DOM-free acceptance fixture rows
```

## Files changed in this pass

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-08T08-39-41-04-00-dsk-domain-breakdown.md
.agent/render-audit/2026-07-08T08-39-41-04-00-render-source-readback.md
.agent/route-source-audit/2026-07-08T08-39-41-04-00-source-implementation-queue.md
.agent/trackers/2026-07-08T08-39-41-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T08-39-41-04-00.md
```

## Validation

Performed:

```txt
GitHub repo-list comparison
central ledger search/readback
repo-local .agent readback
README/package/config/runtime/object-kit source readback
repo-local .agent documentation updates
central repo-ledger update
central internal change-log entry
```

Not performed:

```txt
npm install
npm run check
npm run build
browser route smoke
Playwright route smoke
live GitHub Pages check
runtime source edit
```

## Next safe ledge

```txt
TheOpenAbove Product Source Authority Implementation Queue
```

Implement source authority before route reducers, mission progression, or renderer/world/camera extraction.
