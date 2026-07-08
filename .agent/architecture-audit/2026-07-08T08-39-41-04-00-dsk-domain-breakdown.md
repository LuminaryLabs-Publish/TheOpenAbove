# DSK Domain Breakdown — TheOpenAbove

**Timestamp:** `2026-07-08T08:39:41-04:00`

## Architecture read

`TheOpenAbove` is currently a single-route Vite/Three.js hot-air-balloon drift app with one Nexus Engine telemetry kit and a useful split hot-air-balloon object family.

The repo has good object-kit decomposition, but the live route still mixes product copy authority, config authority, world generation, drift physics, camera, HUD, renderer, and debug projection in `src/main.js`.

## Current route

```txt
index.html
  -> src/main.js
  -> Three.js CDN
  -> NexusEngine CDN
  -> CAMPAIGN/WORLD config
  -> hot-air-balloon object kit family
  -> inline simulation/render/HUD/GameHost loop
```

## DSK layers

### Host / publish layer

```txt
static-page-host
vite-static-publish-host
third-party-cdn-runtime
runtime-error-panel
window-gamehost-debug
```

### Nexus runtime layer

```txt
nexus-engine-cdn-runtime
open-above-balloon-telemetry-kit
BalloonSnapshot resource
BalloonTicked event
engine.openAbove.getState service
```

### Product source authority layer

```txt
product-copy-authority
readme-route-copy-parity
package-description-parity
campaign-config
legacy-flight-compatibility
balloon-drift-config-authority
source-fingerprint
source-snapshot
balloon-config-acceptance-result
balloon-config-acceptance-ledger
```

### Simulation layer

```txt
balloon-input-map
balloon-vehicle-state
burner-vent-intent
wind-field
balloon-drift-physics
altitude-safety
terrain-sampler
altitude-band-contract
altitude-band-resolver
route-object-descriptor
route-object-evaluator
```

### World/render layer

```txt
three-render-host
procedural-terrain
moisture-field
lake-generation
tree-scatter
cloud-scatter
wind-ribbon-rendering
basket-follow-camera
camera-zoom-blend
first-person-visibility-gate
hud-telemetry
```

### Balloon object layer

```txt
hot-air-balloon-object
balloon-envelope-panel
balloon-mouth
balloon-streamer-fit
balloon-fabric-seam
hot-air-balloon-basket
hot-air-balloon-rigging
hot-air-balloon-burner
rope-geometry
```

### Mission/progression layer

```txt
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

## Inline domains to split later

```txt
open-above-runtime-host-kit
open-above-three-render-host-kit
open-above-balloon-input-map-kit
open-above-balloon-state-kit
open-above-balloon-drift-physics-kit
open-above-burner-vent-intent-kit
open-above-wind-field-kit
open-above-altitude-safety-kit
open-above-world-generation-kit
open-above-terrain-sampler-kit
open-above-lake-generation-kit
open-above-tree-scatter-kit
open-above-cloud-scatter-kit
open-above-wind-ribbon-render-kit
open-above-basket-follow-camera-kit
open-above-camera-zoom-blend-kit
open-above-hud-telemetry-kit
open-above-gamehost-debug-kit
```

## Next-cut proof kits

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
open-above-balloon-config-acceptance-result-kit
open-above-balloon-config-acceptance-ledger-kit
open-above-route-fixture-harness-kit
open-above-gamehost-diagnostics-parity-kit
```

## Architecture recommendation

Do the next source-authority implementation before world/render extraction.

Order:

```txt
product copy parity
  -> canonical balloon product source
  -> balloon drift config
  -> source snapshot/fingerprint
  -> GameHost diagnostics
  -> DOM-free acceptance fixtures
  -> route event result authority
  -> mission snapshot
  -> renderer/world/camera extraction
```
