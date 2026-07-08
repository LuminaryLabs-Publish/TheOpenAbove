# Current Audit — TheOpenAbove

**Timestamp:** `2026-07-08T05:48:28-04:00`

## Summary

`TheOpenAbove` is currently a hot-air-balloon drift experience, not the older free-flight bird or carving slice still described by durable source documents.

The live runtime is coherent as a balloon slice, but product copy, package metadata, campaign text, drift config, route objects, altitude bands, mission snapshots, and fixture replay are not yet centralized enough to support safe implementation work.

## Current route

```txt
index.html
  -> src/main.js
```

## Current interaction loop

```txt
open app
  -> read balloon drift HUD
  -> hold Space / W / ArrowUp for burner lift
  -> hold S / ArrowDown / Shift for vent descent
  -> procedural wind drifts the balloon
  -> wheel changes camera zoom / near-basket blend
  -> runtime updates altitude, wind, distance, heat, camera mode, Nexus telemetry, and GameHost state
```

## Runtime loop

```txt
src/main.js
  -> imports Three.js CDN
  -> imports NexusEngine CDN
  -> imports CAMPAIGN and WORLD
  -> builds terrain, lakes, trees, clouds, wind ribbons
  -> builds hot-air-balloon visual object
  -> samples keyboard and wheel input
  -> integrates burner, vent, wind, buoyancy, vertical velocity, altitude, and distance inline
  -> animates balloon sub-kits
  -> ticks Nexus telemetry kit
  -> renders Three.js frame
  -> writes HUD
  -> exposes GameHost state
```

## Repo-list / ledger comparison

```txt
checked LuminaryLabs-Publish repos:
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

central ledger check:
  non-Cavalry repos are represented in repo-ledger/LuminaryLabs-Publish/
  sampled root .agent/START_HERE.md state exists for non-Cavalry repos
  TheCavalryOfRome remains excluded

selection:
  TheOpenAbove selected by fallback high-value follow-up
```

## Why this repo was selected

The previous pass identified the correct seam: the live app is balloon drift, while README, package metadata, and campaign source still say free-flight. This run refined that into a fixture matrix so the next implementation can change source authority without changing the visible route.

## Evidence snapshot

```txt
README.md:
  still says free-flight exploration, carving, gliding, diving, boosting, thermals, wind gates, and sky-perch return.

package.json:
  still says standalone free-flight exploration game.

src/data/campaign.config.js:
  exports CAMPAIGN, WORLD, and legacy FLIGHT with thermals, gates, perch, pitch, roll, yaw, boost, thermal lift, and terrain clearance.

src/main.js:
  imports CAMPAIGN and WORLD, seeds `${WORLD.seed}-balloon-drift`, builds balloon objects, and owns burner, vent, wind, buoyancy, altitude, camera, HUD, and GameHost snapshots inline.
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
package-description-parity
readme-route-copy-parity
balloon-drift-config-authority
route-source-authority
source-fingerprint
source-snapshot
altitude-band-contract
altitude-band-resolver
route-object-descriptor
route-object-evaluator
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
load-product-copy
assert-readme-product-parity
assert-package-product-parity
load-balloon-drift-config
project-source-fingerprint
project-source-snapshot
resolve-altitude-band
project-route-objects
project-route-diagnostics
run-dom-free-source-fixture
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

Needed next:

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
open-above-route-event-result-envelope-kit
open-above-route-event-rejection-reason-kit
open-above-route-event-journal-kit
open-above-route-state-reducer-kit
open-above-meadow-lift-mission-reducer-kit
open-above-mission-snapshot-projector-kit
open-above-region-unlock-progression-kit
open-above-route-fixture-harness-kit
open-above-route-replay-parity-kit
open-above-gamehost-diagnostics-parity-kit
```

## Main finding

The repo should not do renderer extraction first.

It should first materialize a product-source fixture matrix proving that docs, package metadata, campaign text, drift config, GameHost diagnostics, and DOM-free fixture snapshots all agree that the live product is balloon drift.

## New audit surface added

```txt
.agent/product-copy-audit/balloon-product-source-fixture-matrix.md
```

This file narrows the previous route-source audit into concrete fixture rows for the next implementation pass.

## Next safe ledge

```txt
TheOpenAbove Product Source Fixture Matrix + Balloon Drift Config Gate
```