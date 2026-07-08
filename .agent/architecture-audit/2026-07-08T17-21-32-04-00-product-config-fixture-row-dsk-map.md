# Architecture Audit — Product Config Fixture Row DSK Map

**Timestamp:** `2026-07-08T17-21-32-04-00`

## Goal

Lock the live hot-air-balloon route behind source-owned product/config/fixture contracts before any renderer, world, or mission expansion.

## Repo selected

`LuminaryLabs-Publish/TheOpenAbove`

Selection reason:

```txt
The accessible LuminaryLabs-Publish repo list was compared against central tracking.
All checked non-Cavalry repos were already tracked and had sampled root .agent state.
TheCavalryOfRome remains excluded.
TheOpenAbove was the oldest eligible central-ledger fallback after the latest MyCozyIsland update.
The unresolved source-authority seam remains the highest-value next ledge.
```

## Current architecture

```txt
index.html
  -> src/main.js
  -> Three.js CDN
  -> NexusEngine main CDN
  -> CAMPAIGN / WORLD from src/data/campaign.config.js
  -> hot-air-balloon object kit family
  -> inline terrain / lakes / trees / clouds / wind ribbons
  -> inline balloon drift state and physics
  -> inline camera / HUD / GameHost projection
```

## Current implemented source-backed kits

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

## Current inline domains

```txt
static-page-host
vite-static-publish-host
three-render-host
nexus-engine-cdn-runtime
procedural-terrain
terrain-height-sampler
moisture-field
terrain-color-resolver
lake-generation
tree-scatter
cloud-scatter
wind-ribbon-rendering
keyboard-input-state
wheel-camera-zoom-state
burner-vent-intent
balloon-vehicle-state
balloon-drift-physics
wind-field
altitude-safety
ceiling-softness
basket-follow-camera
first-person-camera-blend
hud-telemetry
window-gamehost-debug
```

## Source authority domains needed next

```txt
product-copy-authority
package-description-parity
readme-route-copy-parity
campaign-current-route-authority
legacy-flight-compatibility
balloon-drift-config-authority
balloon-source-fingerprint
balloon-source-snapshot
source-acceptance-result
source-acceptance-ledger
source-fixture-row-runner
gamehost-source-readback
route-object-descriptor
altitude-band-descriptor
wind-lane-hint-descriptor
route-acceptance-ledger
```

## Services currently offered

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

## Services required by the next source ledge

```txt
read-product-copy-source
read-package-description-source
read-campaign-current-route-source
normalize-balloon-drift-config
mirror-inline-runtime-defaults
create-source-fingerprint
create-source-snapshot
create-source-acceptance-result
append-source-acceptance-ledger-row
resolve-altitude-band
project-route-objects
project-wind-lane-hints
project-gamehost-source-readback
run-dom-free-source-fixture
assert-existing-local-state-shape
assert-existing-nexus-state-shape
```

## Implementation file map

```txt
src/source/open-above-product.js
  owns canonical product id, title, route name, product kind, current route, controls, and public copy markers.

src/source/balloon-drift.config.js
  owns mirrored burner, vent, wind, buoyancy, altitude, clearance, camera, and route constants.

src/source/altitude-bands.js
  owns low-clearance, comfort-drift, high-drift, and meadow-landing classification.

src/source/route-descriptors.js
  owns three lift-gate descriptors and meadow landing descriptor.

src/source/wind-lane-hints.js
  owns readable wind-lane guidance tied to route descriptors.

src/source/source-fingerprint.js
  owns stable product/config/runtime marker hashing.

src/source/source-snapshot.js
  owns source-level snapshot shape for fixtures and GameHost.

src/source/source-acceptance.js
  owns SourceAcceptanceResult and SourceAcceptanceLedger rows.

src/source/gamehost-source-readback.js
  owns additive GameHost source diagnostics.

scripts/open-above-source-fixture.mjs
  owns DOM-free parity rows.
```

## Main finding

The current runtime is visually aligned with a balloon-drift game, but the durable product/config authority is still split across old free-flight copy and inline `src/main.js` constants. The safest next implementation is not new visuals; it is a source fixture gate that proves docs, package metadata, campaign config, runtime defaults, GameHost diagnostics, and DOM-free fixture rows all agree on the same balloon route.
