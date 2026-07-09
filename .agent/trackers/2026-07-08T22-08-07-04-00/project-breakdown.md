# Project Breakdown — TheOpenAbove

**Timestamp:** `2026-07-08T22-08-07-04-00`

## Goal

Refresh the repo-local operating docs for `LuminaryLabs-Publish/TheOpenAbove` after comparing the current `LuminaryLabs-Publish` repo list against central tracking in `LuminaryLabs-Dev/LuminaryLabs`.

## Selection result

The accessible Publish repo set was checked:

```txt
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / latest sampled alignment 2026-07-08T20-38-28-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest sampled alignment 2026-07-08T21-31-35-04-00
LuminaryLabs-Publish/TheOpenAbove        selected / oldest sampled alignment 2026-07-08T20-10-32-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / latest sampled alignment 2026-07-08T20-52-00-04-00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest sampled alignment 2026-07-08T21-40-45-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / latest sampled alignment 2026-07-08T21-18-39-04-00
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest sampled alignment 2026-07-08T20-21-59-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest sampled alignment 2026-07-08T21-58-34-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / latest sampled alignment 2026-07-08T21-00-12-04-00
```

No non-Cavalry repo was fully new, absent from the central ledger, missing root `.agent` state, or otherwise undocumented. `TheOpenAbove` was selected by the fallback rule because it had the oldest sampled alignment and still has a high-value source authority gap.

## Current interaction loop

```txt
index.html
  -> src/main.js
  -> Three.js CDN
  -> NexusEngine main CDN
  -> CAMPAIGN / WORLD from src/data/campaign.config.js
  -> buildHotAirBalloon() and animateHotAirBalloon()
  -> inline terrain, lakes, trees, clouds, wind ribbons
  -> keyboard burner / vent input
  -> wheel camera zoom / basket blend
  -> inline balloon drift physics
  -> Nexus telemetry kit tick
  -> renderer frame
  -> HUD HTML write
  -> window.GameHost.getState() returns local and nexusEngine telemetry
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
route-object-descriptor
wind-lane-hint
browser-consumer-fixture
build-script-fixture-gate
mission-snapshot-projector
```

## Services identified

```txt
mount-canvas
mount-hud
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

Next-cut proof kits:

```txt
open-above-product-copy-authority-kit
open-above-balloon-drift-config-kit
open-above-source-manifest-kit
open-above-balloon-source-fingerprint-kit
open-above-balloon-source-snapshot-kit
open-above-source-acceptance-ledger-kit
open-above-gamehost-source-readback-kit
open-above-source-module-consumer-splice-kit
open-above-runtime-constant-parity-kit
open-above-altitude-band-contract-kit
open-above-route-object-config-kit
open-above-wind-lane-hint-kit
open-above-browser-consumer-fixture-kit
open-above-deploy-build-contract-kit
```

## Main finding

The repo should not extract the renderer or change visuals first. The live route is already Balloon Drift, but README, package metadata, campaign copy, drift constants, source manifests, fixture output, and GameHost source diagnostics still do not agree on one canonical product source.

## Next safe ledge

```txt
TheOpenAbove Source Fixture Acceptance + Browser Consumer Readback Gate
```

## Validation

Documentation-only pass. No runtime files changed. No local checkout, install, build, browser smoke, or Pages smoke was run.