# Project Breakdown — TheOpenAbove

**Timestamp:** `2026-07-08T04:31:06-04:00`

## Selected repo

```txt
LuminaryLabs-Publish/TheOpenAbove
```

## Selection process

```txt
1. Listed accessible LuminaryLabs-Publish repos.
2. Compared the full Publish list against LuminaryLabs-Dev/LuminaryLabs repo-ledger search results.
3. Excluded LuminaryLabs-Publish/TheCavalryOfRome by standing rule.
4. Confirmed checked non-Cavalry repos are represented in the central ledger and have sampled root .agent/START_HERE.md state.
5. Used fallback selection and chose TheOpenAbove as an older eligible high-value follow-up target.
```

## Publish repo list checked

```txt
IntoTheMeadow
HorrorCorridor
AetherVale
ZombieOrchard
TheUnmappedHouse
MyCozyIsland
TheOpenAbove
PhantomCommand
TheCavalryOfRome
PrehistoricRush
```

## Why this repo won

`TheOpenAbove` has a high-impact source authority mismatch.

The live app is a hot-air-balloon drift game, but durable source docs still describe the older free-flight/bird/carving product shape.

```txt
README.md: free-flight exploration / carving / gliding / diving / boosting
package.json: standalone free-flight exploration game
src/data/campaign.config.js: CAMPAIGN/WORLD/FLIGHT with thermals, wind gates, perch, boost, and bird-like flight constants
src/main.js: hot-air-balloon drift runtime with burner, vent, wind, basket camera, balloon telemetry, and GameHost snapshots
```

## Current interaction loop

```txt
open page
  -> load index.html
  -> import src/main.js
  -> build terrain/lakes/trees/clouds/wind ribbons
  -> build hot air balloon object family
  -> hold Space/W/ArrowUp for burner lift
  -> hold S/ArrowDown/Shift to vent
  -> drift with procedural wind
  -> scroll camera from third-person basket-follow toward near-basket view
  -> read HUD telemetry
  -> inspect GameHost state when debugging
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
route-source-authority
altitude-band-contract
route-object-descriptor
route-event-contract
route-state-reducer
mission-snapshot-projector
region-unlock-progression
route-fixture-replay
```

## Services the kits offer

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
open-above-three-render-host-kit
open-above-vite-static-publish-kit
open-above-balloon-input-map-kit
open-above-balloon-state-kit
open-above-balloon-drift-physics-kit
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

Needed next:

```txt
open-above-product-copy-authority-kit
open-above-balloon-drift-config-kit
open-above-balloon-source-fingerprint-kit
open-above-balloon-source-snapshot-kit
open-above-altitude-band-contract-kit
open-above-altitude-band-resolver-kit
open-above-route-object-config-kit
open-above-route-object-evaluator-kit
open-above-route-event-result-envelope-kit
open-above-route-event-rejection-reason-kit
open-above-route-event-journal-kit
open-above-route-state-reducer-kit
open-above-meadow-lift-mission-reducer-kit
open-above-mission-snapshot-projector-kit
open-above-region-unlock-progression-kit
open-above-route-fixture-harness-kit
open-above-route-replay-parity-kit
```

## Files changed in this repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/route-source-audit/balloon-source-authority-gap.md
.agent/trackers/2026-07-08T04-31-06-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T04-31-06-04-00.md
```

## Validation

```txt
No runtime validation was run.
No source files were changed.
This was a documentation and audit pass only.
```

## Next safe ledge

```txt
TheOpenAbove Product Copy Authority + Balloon Drift Config Fixture Gate
```

Implement product/config source authority before adding more scenery, routes, or mission content.
