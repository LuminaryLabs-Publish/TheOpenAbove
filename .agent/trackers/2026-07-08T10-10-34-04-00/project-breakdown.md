# Project Breakdown — TheOpenAbove

**Timestamp:** `2026-07-08T10-10-34-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

## Summary

`TheOpenAbove` was selected as the oldest eligible fallback follow-up after comparing the accessible `LuminaryLabs-Publish` repo list against `LuminaryLabs-Dev/LuminaryLabs` central tracking and sampled root `.agent/START_HERE.md` state.

No checked non-Cavalry repo was fully new, absent from central tracking, undocumented, or missing root `.agent` state. `TheCavalryOfRome` remains excluded.

This pass did not change runtime source. It tightened repo-local internal docs around the next implementation ledge: product/source acceptance for the current hot-air-balloon drift route.

## Publish repo comparison

```txt
LuminaryLabs-Publish/HorrorCorridor      ledgered with root .agent
LuminaryLabs-Publish/AetherVale          ledgered with root .agent
LuminaryLabs-Publish/TheOpenAbove        selected fallback follow-up
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      ledgered with root .agent
LuminaryLabs-Publish/PrehistoricRush     ledgered with root .agent
LuminaryLabs-Publish/ZombieOrchard       ledgered with root .agent
LuminaryLabs-Publish/IntoTheMeadow       ledgered with root .agent
LuminaryLabs-Publish/MyCozyIsland        ledgered with root .agent
LuminaryLabs-Publish/TheUnmappedHouse    ledgered with root .agent
```

## Current product read

The live app is a standalone Vite / Three.js hot-air-balloon drift experience.

The durable product copy still partially describes the older free-flight bird/glider route, while the live runtime already uses a hot-air-balloon object, burner/vent input, wind drift, basket-follow camera, HUD telemetry, and NexusEngine telemetry.

## Current interaction loop

```txt
open app
  -> index.html mounts canvas, HUD, and error panel
  -> src/main.js imports Three.js from CDN
  -> src/main.js imports NexusEngine from LuminaryLabs-Dev/NexusEngine@main CDN
  -> src/main.js imports CAMPAIGN / WORLD and hot-air-balloon object kit
  -> createGame builds terrain, lakes, trees, clouds, wind ribbons, renderer, camera, lights, and balloon
  -> keyboard controls burner / vent intent
  -> wheel controls camera zoom / near-basket blend
  -> update loop samples wind angle, wind speed, buoyancy, altitude damping, ceiling softness, vertical velocity, terrain clearance, distance, and balloon pose
  -> Nexus telemetry kit writes balloonSnapshot and emits balloonTicked
  -> draw loop computes basket focus, third-person camera, first-person camera, camera blend, rope visibility, and renders scene
  -> HUD writes heat, camera mode, altitude, wind, drift, and Nexus marker
  -> window.GameHost.getState() exposes local and Nexus snapshots
```

## Domains in use

```txt
static-page-host
vite-static-publish-host
third-party-cdn-runtime
runtime-host
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
balloon-visual-object
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
route-object-state
route-object-evaluator
route-order-policy
route-event-contract
route-event-result-envelope
route-event-rejection-reason-catalog
route-event-journal
route-state-reducer
meadow-lift-mission-reducer
mission-snapshot-projector
region-unlock-progression
route-fixture-harness
route-replay-parity
gamehost-diagnostics-parity
```

## Kit services identified

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
run-animation-loop
define-balloon-telemetry-resource
emit-balloon-ticked-event
expose-window-gamehost
load-canonical-product-copy
load-balloon-drift-config
create-balloon-source-fingerprint
create-balloon-source-snapshot
resolve-altitude-band
project-route-objects
evaluate-route-object-distance
evaluate-route-object-altitude
evaluate-route-order
create-source-acceptance-result
project-gamehost-source-snapshot
run-dom-free-source-fixture
run-product-source-acceptance-row
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

Next-cut:

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

`TheOpenAbove` should not extract renderer/world/camera systems next.

The immediate blocker is source authority: README/package/campaign still describe free-flight while the public route is already balloon drift. The next implementation must first make product copy, config, source fingerprint, source snapshot, GameHost diagnostics, and DOM-free acceptance fixtures agree.

## Next safe ledge

```txt
TheOpenAbove Product Source Acceptance Wire Map
```

## Files added in this pass

```txt
.agent/trackers/2026-07-08T10-10-34-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T10-10-34-04-00.md
.agent/architecture-audit/2026-07-08T10-10-34-04-00-balloon-source-authority-dsk-map.md
.agent/render-audit/2026-07-08T10-10-34-04-00-render-diagnostics-readback-contract.md
.agent/gameplay-audit/2026-07-08T10-10-34-04-00-balloon-route-authority-loop.md
.agent/route-source-audit/2026-07-08T10-10-34-04-00-product-source-acceptance-wire-map.md
```

## Files refreshed in this pass

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
```

## Validation

No runtime source files changed. No local checkout, npm install, npm run check, npm run build, browser smoke, GitHub Pages verification, or screenshot validation was run in this documentation-only pass.