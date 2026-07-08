# Current Audit — TheOpenAbove

**Timestamp:** `2026-07-08T10-10-34-04-00`

## Summary

`TheOpenAbove` is currently a hot-air-balloon drift experience, not the older free-flight bird/glider route still described by durable docs and legacy config.

The live runtime is coherent as a balloon slice. The next implementation should make the hot-air-balloon product source-authoritative through product copy, config, source snapshots, GameHost diagnostics, and DOM-free fixtures before route reducers, mission progression, or render extraction.

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
  -> imports hot-air-balloon object kit
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
  HorrorCorridor
  AetherVale
  TheOpenAbove
  TheCavalryOfRome
  PhantomCommand
  PrehistoricRush
  ZombieOrchard
  IntoTheMeadow
  MyCozyIsland
  TheUnmappedHouse

central ledger / root-agent check:
  non-Cavalry repos are represented in repo-ledger/LuminaryLabs-Publish/
  sampled root .agent/START_HERE.md state exists for checked non-Cavalry repos
  TheCavalryOfRome remains excluded

selection:
  TheOpenAbove selected by oldest eligible fallback source-authority follow-up
```

## Evidence snapshot

```txt
README.md:
  still says free-flight exploration, carving, gliding, diving, boosting, thermals, wind gates, and sky-perch return.

package.json:
  still says standalone free-flight exploration.

index.html:
  describes and titles the live page as a cozy hot-air-balloon / Balloon Drift route.

src/data/campaign.config.js:
  exports CAMPAIGN, WORLD, and legacy FLIGHT with thermals, gates, perch, pitch, roll, yaw, boost, thermal lift, and terrain clearance.

src/main.js:
  imports CAMPAIGN and WORLD, seeds `${WORLD.seed}-balloon-drift`, builds balloon objects, and owns burner, vent, wind, buoyancy, altitude, camera, HUD, and GameHost snapshots inline.

src/hot-air-balloon-object-kit.js:
  exports the hot-air-balloon object kit and subdomain list for envelope panels, mouth, streamers, seams, basket, rigging, burner, and rope.
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
moisture-field
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
route-event-result-envelope
route-fixture-harness
mission-snapshot-projector
region-unlock-progression
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
load-canonical-product-copy
load-balloon-drift-config
create-balloon-source-fingerprint
create-balloon-source-snapshot
resolve-altitude-band
project-route-objects
run-dom-free-source-fixture
run-source-acceptance-row
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
open-above-source-acceptance-result-kit
open-above-source-acceptance-ledger-kit
open-above-altitude-band-contract-kit
open-above-altitude-band-resolver-kit
open-above-route-object-config-kit
open-above-route-object-evaluator-kit
open-above-route-fixture-harness-kit
open-above-gamehost-diagnostics-parity-kit
open-above-mission-snapshot-projector-kit
```

## Main finding

The repo should not do renderer extraction first.

The source authority queue should come first:

```txt
README/package/campaign copy correction
  -> OPEN_ABOVE_PRODUCT source object
  -> BALLOON_DRIFT config beside compatibility-only FLIGHT
  -> source fingerprint and source snapshot
  -> GameHost diagnostics projection
  -> DOM-free source/config fixture rows
```

## New audit surfaces added

```txt
.agent/architecture-audit/2026-07-08T10-10-34-04-00-balloon-source-authority-dsk-map.md
.agent/render-audit/2026-07-08T10-10-34-04-00-render-diagnostics-readback-contract.md
.agent/gameplay-audit/2026-07-08T10-10-34-04-00-balloon-route-authority-loop.md
.agent/route-source-audit/2026-07-08T10-10-34-04-00-product-source-acceptance-wire-map.md
```

## Next safe ledge

```txt
TheOpenAbove Product Source Acceptance Wire Map
```