# TheOpenAbove Balloon Source Fixture Architecture Queue

**Timestamp:** `2026-07-08T15-09-42-04-00`

## Selection result

`LuminaryLabs-Publish/TheOpenAbove` was selected after comparing the accessible `LuminaryLabs-Publish` repository list against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger.

No checked non-Cavalry Publish repo was fully new, absent from the ledger, missing sampled root `.agent/START_HERE.md`, recently added but undocumented, or otherwise lacking root agent state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

The fallback rule selected `TheOpenAbove` because its central ledger timestamp was the oldest eligible observed non-Cavalry update, and the live route still has a high-value source authority seam.

## Current route authority

```txt
index.html
  -> ./src/main.js
  -> Three.js CDN
  -> NexusEngine main CDN
  -> CAMPAIGN / WORLD from src/data/campaign.config.js
  -> hot-air-balloon object kit family
  -> inline terrain / wind / balloon drift / camera / HUD / GameHost loop
```

## Architecture finding

The runtime is already a coherent hot-air-balloon drift route.

The architecture gap is not renderer capability first. The gap is that durable product source still disagrees with the live route:

```txt
README.md                    older free-flight copy
package.json                 older free-flight description
src/data/campaign.config.js  older FLIGHT / thermal / gate / perch shape
index.html                   current Balloon Drift page metadata
src/main.js                  current hot-air-balloon drift runtime
src/hot-air-balloon-object-kit.js  current balloon object/subkit family
```

## Current domains in use

```txt
static-page-host
vite-static-publish-host
three-cdn-render-runtime
nexus-engine-cdn-runtime
nexus-balloon-telemetry-runtime-kit
hot-air-balloon-object-domain
balloon-envelope-panel-domain
balloon-mouth-domain
balloon-streamer-fit-domain
balloon-fabric-seam-domain
hot-air-balloon-basket-domain
hot-air-balloon-rigging-domain
hot-air-balloon-burner-domain
rope-geometry-domain
procedural-terrain-domain
terrain-height-sampler-domain
moisture-field-domain
lake-generation-domain
tree-scatter-domain
cloud-scatter-domain
wind-ribbon-render-domain
balloon-input-map-domain
burner-vent-intent-domain
balloon-vehicle-state-domain
balloon-drift-physics-domain
wind-field-domain
altitude-safety-domain
ceiling-softness-domain
basket-follow-camera-domain
camera-zoom-blend-domain
first-person-visibility-domain
hud-telemetry-domain
window-gamehost-debug-domain
product-copy-authority-domain
package-description-parity-domain
campaign-source-authority-domain
balloon-drift-config-authority-domain
source-fingerprint-domain
source-snapshot-domain
source-acceptance-ledger-domain
altitude-band-contract-domain
route-object-descriptor-domain
wind-lane-hint-domain
route-fixture-harness-domain
mission-snapshot-projector-domain
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
```

## Implemented kits

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

## Next implementation kits

```txt
open-above-product-copy-authority-kit
open-above-readme-route-copy-parity-kit
open-above-package-description-parity-kit
open-above-campaign-source-parity-kit
open-above-balloon-drift-config-kit
open-above-balloon-source-fingerprint-kit
open-above-balloon-source-snapshot-kit
open-above-source-acceptance-result-kit
open-above-source-acceptance-ledger-kit
open-above-gamehost-source-readback-kit
open-above-source-acceptance-fixture-kit
open-above-altitude-band-contract-kit
open-above-altitude-band-resolver-kit
open-above-route-object-config-kit
open-above-route-object-evaluator-kit
open-above-wind-lane-hint-kit
open-above-route-fixture-harness-kit
open-above-mission-snapshot-projector-kit
```

## Implementation queue

```txt
1. Update README/package/campaign copy to describe the current balloon route.
2. Add src/source/open-above-product.js.
3. Add src/source/balloon-drift.config.js, mirroring current inline runtime constants.
4. Keep FLIGHT as compatibility-only until a fixture proves the route does not need it.
5. Add src/source/source-fingerprint.js.
6. Add src/source/source-snapshot.js.
7. Add src/source/source-acceptance.js.
8. Add src/source/gamehost-source-readback.js.
9. Add src/source/altitude-bands.js.
10. Add src/source/route-descriptors.js.
11. Add src/source/wind-lane-hints.js.
12. Wire source diagnostics additively into window.GameHost.getState().source.
13. Add scripts/open-above-source-fixture.mjs.
14. Prove existing window.GameHost.getState().local and .nexusEngine shapes are preserved.
```

## Stop line

Do not extract renderer/world/camera domains until source acceptance fixtures prove that README, package metadata, campaign source, runtime config, GameHost diagnostics, route descriptors, and DOM-free fixture output all identify the same balloon-drift product.