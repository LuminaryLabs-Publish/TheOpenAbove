# Architecture Audit — Source Consumer Ledger + GameHost Readback DSK Map

**Timestamp:** `2026-07-09T11-50-08-04-00`

## Goal

Map the current `TheOpenAbove` runtime into implemented, inline, and next-cut DSK boundaries without changing runtime source.

## Current architecture

```txt
index.html
  -> src/main.js
  -> Three.js CDN
  -> NexusEngine main CDN
  -> CAMPAIGN/WORLD config
  -> hot-air-balloon object kit
  -> inline world generation
  -> inline balloon physics/camera/HUD
  -> GameHost local + Nexus readback
```

## Implemented source-backed kits

```txt
open-above-balloon-telemetry-kit
  source: src/main.js createBalloonEngine()
  services: define resource, define event, tick system, publish balloon snapshot, install engine.openAbove.getState

open-above-hot-air-balloon-object-kit
  source: src/hot-air-balloon-object-kit.js
  services: compose balloon visual object, build envelope/mouth/streamer/seam/basket/rigging/burner/rope parts, animate burner and rigging

open-above-balloon-envelope-panel-kit
open-above-balloon-mouth-kit
open-above-balloon-streamer-fit-kit
open-above-balloon-fabric-seam-kit
open-above-hot-air-balloon-basket-kit
open-above-hot-air-balloon-rigging-kit
open-above-hot-air-balloon-burner-kit
open-above-rope-kit
  source: src/hot-air-balloon-object-kit.js sub-kit metadata and builders
  services: procedural object part descriptors and mesh builders
```

## Inline runtime domains

```txt
terrain-height-sampling
moisture-map
terrain-coloring
lake-placement
tree-scatter
cloud-scatter
wind-ribbon-rendering
balloon-input-map
burner-vent-intent
wind-field
buoyancy-integration
altitude-safety
ceiling-softness
camera-zoom-blend
basket-first-person-camera
first-person-visibility
hud-telemetry
gamehost-debug-state
```

## Next-cut source/readback DSKs

```txt
open-above-product-copy-authority-kit
open-above-readme-route-copy-parity-kit
open-above-package-description-parity-kit
open-above-campaign-current-route-authority-kit
open-above-legacy-flight-compatibility-kit
open-above-balloon-drift-config-kit
open-above-runtime-constant-parity-kit
open-above-altitude-band-contract-kit
open-above-source-consumer-manifest-kit
open-above-source-consumer-record-kit
open-above-balloon-source-fingerprint-kit
open-above-balloon-source-snapshot-kit
open-above-source-acceptance-result-kit
open-above-source-acceptance-ledger-kit
open-above-source-consumer-ledger-kit
open-above-source-readback-projection-kit
open-above-gamehost-source-readback-kit
open-above-browser-consumer-readback-kit
open-above-dom-free-source-fixture-kit
open-above-central-ledger-sync-kit
```

## Boundary rule

Do not extract terrain, camera, HUD, or render systems first.

Start with source consumer proof because README/package/campaign/runtime/object-kit/agent/central-ledger parity is the unstable authority layer.

## Main finding

`src/main.js` already has a clear telemetry kit and live GameHost readback, but the canonical product/source layer is implicit. Add source modules and `GameHost.getState().source` additively before changing runtime behavior.
