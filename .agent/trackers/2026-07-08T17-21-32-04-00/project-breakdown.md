# Project Breakdown — TheOpenAbove

**Timestamp:** `2026-07-08T17-21-32-04-00`

## Goal

Refresh repo-local operating docs for `LuminaryLabs-Publish/TheOpenAbove`, confirm its current interaction loop/domains/services/kits, and narrow the next source-authority ledge into a product/config fixture row gate.

## Checklist

- [x] Compared accessible `LuminaryLabs-Publish` repo list against central tracking.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo only: `LuminaryLabs-Publish/TheOpenAbove`.
- [x] Read central ledger for `TheOpenAbove`.
- [x] Read repo-local root `.agent` state.
- [x] Read README/package/index/source files.
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
TheOpenAbove was selected as the oldest eligible central-ledger fallback after the latest MyCozyIsland update.
Its source-authority/product-config fixture seam remains unresolved and user-visible.
```

## Publish organization repos observed

```txt
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent observed
LuminaryLabs-Publish/AetherVale          tracked / root .agent observed
LuminaryLabs-Publish/TheOpenAbove        selected fallback / previous central update 2026-07-08T15-11-18-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent observed
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent observed
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent observed
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent observed
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent observed / central update 2026-07-08T17-00-36-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent observed
```

## Source evidence read

```txt
README.md:
  still describes free-flight exploration, carving, gliding, diving, boosting, thermals, wind gates, and sky-perch return.

package.json:
  still says standalone free-flight exploration.

index.html:
  titles and describes the live route as The Open Above: Balloon Drift / cozy hot air balloon wind-drift experience.

src/data/campaign.config.js:
  exports CAMPAIGN, WORLD, and legacy FLIGHT; campaign still describes canopy carving, thermals, wind gates, and sky perch.

src/main.js:
  imports CAMPAIGN and WORLD only; owns hot-air-balloon burner, vent, wind, buoyancy, altitude, camera, HUD, and GameHost snapshot logic inline.

src/hot-air-balloon-object-kit.js:
  exports hot-air-balloon object kit, subdomain kit list, buildHotAirBalloon, animateHotAirBalloon, and compatibility installer.
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
  -> update(dt) integrates wind, burner, vent, buoyancy, altitude safety, velocity, position, and drift distance
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
source-fingerprint
source-snapshot
source-acceptance-ledger
altitude-band-contract
route-object-descriptor
wind-lane-hint
route-fixture-harness
deploy-build-contract
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
open-above-balloon-source-fingerprint-kit
open-above-balloon-source-snapshot-kit
open-above-source-acceptance-result-kit
open-above-source-acceptance-ledger-kit
open-above-gamehost-source-readback-kit
open-above-source-acceptance-fixture-kit
open-above-altitude-band-contract-kit
open-above-route-object-config-kit
open-above-route-object-evaluator-kit
open-above-wind-lane-hint-kit
open-above-route-fixture-harness-kit
open-above-deploy-build-contract-kit
```

## Main finding

`TheOpenAbove` should remain visually stable and close its source authority gap first. The route already plays as hot-air-balloon drift, but README/package/campaign language and current-route source modules do not yet prove that product/config/runtime/GameHost/fixture state all describe the same balloon route.

## Next safe ledge

```txt
TheOpenAbove Product Config Fixture Row + GameHost Source Diagnostics Gate
```

## Files changed

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T17-21-32-04-00-product-config-fixture-row-dsk-map.md
.agent/render-audit/2026-07-08T17-21-32-04-00-gamehost-source-diagnostics-contract.md
.agent/gameplay-audit/2026-07-08T17-21-32-04-00-balloon-route-acceptance-loop.md
.agent/route-source-audit/2026-07-08T17-21-32-04-00-fixture-row-implementation-contract.md
.agent/deploy-audit/2026-07-08T17-21-32-04-00-static-publish-build-contract.md
.agent/trackers/2026-07-08T17-21-32-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T17-21-32-04-00.md
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
