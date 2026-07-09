# Project Breakdown — TheOpenAbove

**Timestamp:** `2026-07-08T22-19-38-04-00`

## Plan ledger

**Goal:** Compare the full accessible `LuminaryLabs-Publish` repo list against central tracking, select one eligible repo, update root `.agent/` docs, identify loop/domains/services/kits, and log the work centrally.

**Checklist**

- [x] Listed accessible `LuminaryLabs-Publish` repositories.
- [x] Compared checked Publish repos against `LuminaryLabs-Dev/LuminaryLabs` ledger state.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo only: `LuminaryLabs-Publish/TheOpenAbove`.
- [x] Read repo-local `.agent` state.
- [x] Read central ledger state.
- [x] Read README, package, route, runtime, campaign config, hot-air-balloon object kit, and smoke test.
- [x] Identified the interaction loop.
- [x] Identified domains in use.
- [x] Identified services the kits offer.
- [x] Identified implemented, inline-candidate, and next-cut kits.
- [x] Updated required root `.agent` docs.
- [x] Added architecture, render, gameplay, route-source, and deploy audits.
- [x] Added timestamped tracker and turn-ledger entries.
- [x] Updated central repo ledger.
- [x] Added central internal change-log entry.
- [ ] Did not run local npm/browser validation.
- [ ] Did not edit runtime/source implementation files.

## Repo selected

```txt
LuminaryLabs-Publish/TheOpenAbove
```

## Selection reason

The accessible Publish repo list was checked against central repo-ledger and root-agent state.

No checked non-Cavalry Publish repo was fully new, absent from central tracking, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`TheOpenAbove` was selected because its repo-local `.agent` state had advanced beyond central ledger state and the central ledger needed catch-up for the source fixture acceptance / browser consumer readback queue.

## Publish organization repositories observed

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present
LuminaryLabs-Publish/AetherVale          tracked / root .agent present
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present
LuminaryLabs-Publish/TheOpenAbove        selected / central ledger catch-up + source fixture acceptance queue
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present
```

## Files changed in this repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T22-19-38-04-00-source-readback-catchup-dsk-map.md
.agent/render-audit/2026-07-08T22-19-38-04-00-gamehost-source-readback-contract.md
.agent/gameplay-audit/2026-07-08T22-19-38-04-00-balloon-drift-source-acceptance-loop.md
.agent/route-source-audit/2026-07-08T22-19-38-04-00-central-ledger-source-fixture-catchup.md
.agent/deploy-audit/2026-07-08T22-19-38-04-00-check-build-fixture-wire-map.md
.agent/trackers/2026-07-08T22-19-38-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T22-19-38-04-00.md
```

## Current route read

```txt
index.html
  -> canvas#game / aside#hud / pre#error
  -> src/main.js
  -> Three.js CDN
  -> NexusEngine main CDN
  -> src/data/campaign.config.js
  -> src/hot-air-balloon-object-kit.js
```

## Current interaction loop

```txt
open index.html
  -> canvas#game and HUD mount
  -> src/main.js imports Three.js CDN, NexusEngine main CDN, CAMPAIGN, WORLD, and hot-air-balloon object kit
  -> terrain, lakes, trees, clouds, wind ribbons, and balloon visual object are created
  -> keyboard input maps Space / W / ArrowUp to burner lift
  -> keyboard input maps S / ArrowDown / Shift to vent descent
  -> wheel input changes camera zoom and near-basket blend
  -> update(dt) integrates burner, vent, wind, buoyancy, altitude safety, velocity, position, and drift distance
  -> animateHotAirBalloon updates burner and balloon sub-kits
  -> Nexus telemetry kit publishes balloon snapshot/resource and balloon tick event
  -> draw(dt) resolves third-person/basket camera and first-person visibility
  -> Three.js renders scene/camera
  -> HUD writes altitude, wind, distance, heat, camera mode, and Nexus marker
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

Next-cut:

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

`TheOpenAbove` should stay visually stable and close source authority first.

The visible route is Balloon Drift, but README/package/campaign source still carries older free-flight language, and no source fixture proves product/config/runtime/GameHost agreement.

## Next safe ledge

```txt
TheOpenAbove Source Readback Catch-up + Fixture Acceptance Gate
```

## Validation

Documentation-only update.

No runtime source files changed.

No local checkout, `npm install`, `npm run check`, `npm run build`, browser smoke, Pages smoke, branch creation, or PR creation was performed.
