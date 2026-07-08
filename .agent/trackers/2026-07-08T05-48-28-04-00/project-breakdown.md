# Project Breakdown — TheOpenAbove

**Timestamp:** `2026-07-08T05:48:28-04:00`

## Selected repo

```txt
LuminaryLabs-Publish/TheOpenAbove
```

## Selection mode

```txt
fallback high-value root-agent follow-up
```

## Repo-list comparison

```txt
Full accessible LuminaryLabs-Publish list checked:
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

Central ledger comparison:
  non-Cavalry repos are represented in repo-ledger/LuminaryLabs-Publish/
  sampled non-Cavalry repos have root .agent/START_HERE.md state
  TheCavalryOfRome excluded by standing rule
```

## Why selected

`TheOpenAbove` was selected because the prior source-authority audit identified a user-visible seam, but the next implementation still needed a concrete fixture matrix.

The current public route is balloon drift.

The durable source authority still says free-flight in README, package metadata, and campaign/flight config.

## Files read

```txt
LuminaryLabs-Publish repository list
LuminaryLabs-Dev/LuminaryLabs search results for LuminaryLabs-Publish
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/route-source-audit/balloon-source-authority-gap.md
README.md
package.json
src/data/campaign.config.js
src/main.js
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/TheOpenAbove.md
```

## Interaction loop

```txt
open app
  -> read balloon drift HUD
  -> burner lift with Space / W / ArrowUp
  -> vent descent with S / ArrowDown / Shift
  -> drift with procedural wind
  -> use wheel to blend camera toward basket view
  -> watch altitude, wind, distance, heat, camera mode, and Nexus telemetry
```

## Domains in use

```txt
static-page-host
vite-static-publish-host
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
lake-generation
tree-scatter
cloud-scatter
wind-ribbon-rendering
balloon-input-map
balloon-vehicle-state
balloon-drift-physics
burner-vent-intent
wind-field
altitude-safety
basket-follow-camera
camera-zoom-blend
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
route-event-contract
route-state-reducer
mission-snapshot-projector
route-fixture-replay
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
sample-wind-angle
sample-wind-speed
compute-buoyancy
integrate-vertical-velocity
blend-velocity-toward-wind
integrate-position
clamp-above-terrain-clearance
compute-altitude
accumulate-horizontal-distance
compute-basket-focus
blend-camera-mode
render-frame
write-hud-html
expose-window-gamehost
create-product-source-fixture-row
create-balloon-source-snapshot
project-source-fingerprint
```

## Kits identified

Implemented source-backed kits:

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

Candidate / planned kits:

```txt
open-above-product-copy-authority-kit
open-above-readme-route-copy-parity-kit
open-above-package-description-parity-kit
open-above-balloon-drift-config-kit
open-above-balloon-source-fingerprint-kit
open-above-balloon-source-snapshot-kit
open-above-altitude-band-contract-kit
open-above-route-object-config-kit
open-above-route-event-result-envelope-kit
open-above-route-state-reducer-kit
open-above-mission-snapshot-projector-kit
open-above-route-fixture-harness-kit
open-above-gamehost-diagnostics-parity-kit
```

## Files changed

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/product-copy-audit/balloon-product-source-fixture-matrix.md
.agent/trackers/2026-07-08T05-48-28-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T05-48-28-04-00.md
```

## Central repo updates

```txt
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/TheOpenAbove.md
LuminaryLabs-Dev/LuminaryLabs:internal-change-log/2026-07-08T05-48-28-04-00-the-open-above-product-source-fixture-matrix.md
```

## Validation result

```txt
runtime source changed: no
local build run: no
browser smoke run: no
GitHub connector read/write: yes
```

## Next safe ledge

```txt
TheOpenAbove Product Source Fixture Matrix + Balloon Drift Config Gate
```

## Next implementation stop condition

Stop when the route still renders the same balloon drift app and the product-source fixture rows can prove README, package, campaign, drift config, GameHost diagnostics, and DOM-free fixture snapshots agree on the current hot-air-balloon product.