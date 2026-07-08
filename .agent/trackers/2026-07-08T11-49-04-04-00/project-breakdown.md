# Project Breakdown — TheOpenAbove

**Timestamp:** `2026-07-08T11-49-04-04-00`

## Goal

Refresh the repo-local `.agent` operating docs for `LuminaryLabs-Publish/TheOpenAbove`, compare the full accessible `LuminaryLabs-Publish` repo list against the central `LuminaryLabs-Dev/LuminaryLabs` ledger, and narrow the next safe implementation ledge for the hot-air-balloon product/source authority seam.

## Checklist

- [x] Listed accessible repositories in `LuminaryLabs-Publish`.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compared non-excluded repos against central ledger state.
- [x] Confirmed no checked repo was newly absent from the central ledger.
- [x] Confirmed no checked repo needed first root `.agent/START_HERE.md` bootstrap based on sampled root-agent and ledger state.
- [x] Selected one repo only: `LuminaryLabs-Publish/TheOpenAbove`.
- [x] Read existing root `.agent` operating docs.
- [x] Read source anchors: `README.md`, `package.json`, `index.html`, `src/data/campaign.config.js`, `src/main.js`, and `src/hot-air-balloon-object-kit.js`.
- [x] Identified the current interaction loop.
- [x] Identified domains in use.
- [x] Identified kit services.
- [x] Identified implemented, inline, and next-cut kits.
- [x] Added fresh architecture, render, gameplay, and route-source audits.
- [x] Updated required root `.agent` docs.
- [x] Updated `.agent/kit-registry.json`.
- [x] Added this tracker entry.
- [x] Added a timestamped turn-ledger entry.
- [x] Updated central repo ledger in `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Added central internal change-log entry.
- [x] Pushed all writes to `main`.

## Selection result

`TheOpenAbove` was selected by the fallback rule because every observed non-Cavalry Publish repo already had central ledger coverage and root `.agent` state, while `TheOpenAbove` had the oldest currently observed central-ledger update among eligible sampled roots.

```txt
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / latest central review 2026-07-08T11:09:38-04:00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest central update 2026-07-08T10:19:57-04:00
LuminaryLabs-Publish/TheOpenAbove        selected fallback / latest central update 2026-07-08T10:10:34-04:00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / latest central update 2026-07-08T10:58:46-04:00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest central update 2026-07-08T10:39:22-04:00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / latest central update 2026-07-08T11:19:53-04:00
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest central update 2026-07-08T10:48:47-04:00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest central update 2026-07-08T11:40:00-04:00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / latest central review 2026-07-08T11:28:38-04:00
```

## Current product read

`TheOpenAbove` is currently a standalone Vite / Three.js hot-air-balloon drift route.

The public route is:

```txt
index.html
  -> src/main.js
  -> Three.js CDN
  -> NexusEngine main CDN
  -> src/data/campaign.config.js
  -> hot-air-balloon object family
```

The durable product docs still say free-flight, thermals, gates, boost, bird-style controls, and sky perch, while the live route is burner / vent balloon drift with HUD and `window.GameHost` balloon telemetry.

## Current interaction loop

```txt
open static page
  -> mount canvas, HUD, and error panel
  -> import Three.js and NexusEngine from CDNs
  -> import CAMPAIGN and WORLD
  -> build procedural terrain, lakes, trees, clouds, wind ribbons, and balloon object
  -> keyboard input controls burner and vent intent
  -> mouse wheel controls zoom / near-basket blend
  -> update loop samples wind, buoyancy, altitude safety, velocity, distance, balloon animation, and camera
  -> Nexus telemetry kit writes balloon snapshot and emits balloonTicked
  -> renderer draws frame
  -> HUD displays altitude, wind, drift, burner state, camera mode, and Nexus marker
  -> window.GameHost.getState() returns local and Nexus balloon snapshots
```

## Domains in use

```txt
static-page-host
vite-static-publish-host
third-party-cdn-runtime
three-render-host
nexus-engine-cdn-runtime
nexus-telemetry
product-copy-authority
readme-route-copy-parity
package-description-parity
campaign-config
legacy-flight-compatibility
balloon-drift-config-authority
balloon-input-map
balloon-vehicle-state
balloon-drift-physics
burner-vent-intent
wind-field
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
first-person-visibility-gate
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
source-acceptance-ledger
route-source-authority
route-object-descriptor
route-object-evaluator
route-event-result-envelope
route-fixture-harness
mission-snapshot-projector
region-unlock-progression
```

## Services that kits offer

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
project-source-acceptance-ledger
project-gamehost-source-readback
run-source-acceptance-fixture
run-dom-free-route-fixture
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
open-above-campaign-config-kit
open-above-legacy-flight-compatibility-kit
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

### Next-cut kits

```txt
open-above-product-copy-authority-kit
open-above-readme-route-copy-parity-kit
open-above-package-description-parity-kit
open-above-balloon-drift-config-kit
open-above-balloon-source-fingerprint-kit
open-above-balloon-source-snapshot-kit
open-above-source-acceptance-result-kit
open-above-source-acceptance-ledger-kit
open-above-altitude-band-contract-kit
open-above-altitude-band-resolver-kit
open-above-route-object-config-kit
open-above-route-object-evaluator-kit
open-above-gamehost-source-readback-kit
open-above-source-acceptance-fixture-kit
open-above-route-fixture-harness-kit
open-above-mission-snapshot-projector-kit
```

## Main finding

The next code pass should not start with renderer extraction. The highest-value seam is now exact acceptance implementation:

```txt
README/package/campaign/runtime parity
  -> OPEN_ABOVE_PRODUCT
  -> BALLOON_DRIFT config
  -> source fingerprint
  -> source snapshot
  -> SourceAcceptanceResult rows
  -> GameHost source readback
  -> DOM-free fixture rows
```

## Files changed in this pass

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T11-49-04-04-00-dsk-domain-breakdown.md
.agent/render-audit/2026-07-08T11-49-04-04-00-gamehost-source-readback.md
.agent/gameplay-audit/2026-07-08T11-49-04-04-00-balloon-source-acceptance-loop.md
.agent/route-source-audit/2026-07-08T11-49-04-04-00-acceptance-fixture-implementation-plan.md
.agent/trackers/2026-07-08T11-49-04-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T11-49-04-04-00.md
```

## Next safe ledge

```txt
TheOpenAbove Source Acceptance Fixture Implementation Gate
```

Stop the next ledge when `README.md`, `package.json`, `src/data/campaign.config.js`, `src/main.js`, `window.GameHost.getState().source`, and a DOM-free fixture all report the same current balloon-drift product source without changing the visible balloon route.

## Validation

This was a documentation-only pass.

```txt
runtime source changed: no
local checkout: no
npm install: no
npm run check: no
npm run build: no
browser smoke: no
GitHub Pages live check: no
GitHub connector writes: yes
pushed to main: yes
```
