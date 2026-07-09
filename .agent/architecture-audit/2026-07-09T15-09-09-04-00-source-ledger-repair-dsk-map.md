# Architecture Audit — Source Ledger Repair DSK Map

**Timestamp:** `2026-07-09T15-09-09-04-00`

## Current architecture shape

`TheOpenAbove` is a single-route Vite/Three.js app with local object kits and NexusEngine telemetry.

```txt
index.html
  -> src/main.js
  -> Three.js CDN
  -> NexusEngine main CDN
  -> src/data/campaign.config.js
  -> src/hot-air-balloon-object-kit.js
  -> inline terrain, lake, tree, cloud, wind, balloon, camera, HUD, and GameHost loop
```

## Current DSK/domain map

```txt
open-above-balloon-telemetry-kit
  owns: NexusEngine resource/event projection
  services: snapshot resource, tick event, engine.openAbove.getState()
  source: src/main.js createBalloonEngine()

open-above-hot-air-balloon-object-kit
  owns: procedural hot-air-balloon composition
  services: buildHotAirBalloon(), animateHotAirBalloon(), installHotAirBalloonVisual()
  source: src/hot-air-balloon-object-kit.js

open-above-balloon-envelope-panel-kit
  owns: envelope panel mesh profile
  service: buildEnvelopePanels()

open-above-balloon-mouth-kit
  owns: open-bottom mouth geometry
  service: buildBalloonMouth()

open-above-balloon-streamer-fit-kit
  owns: fitted envelope streamer descriptors
  service: buildFittedStreamers()

open-above-balloon-fabric-seam-kit
  owns: fabric seam descriptors
  service: buildFabricSeams()

open-above-hot-air-balloon-basket-kit
  owns: basket object
  service: buildBasket()

open-above-hot-air-balloon-rigging-kit
  owns: rope/rigging object and animation
  services: buildRigging(), animateRigging()

open-above-hot-air-balloon-burner-kit
  owns: burner object and heat animation
  services: buildBurner(), animateBurner()

open-above-rope-kit
  owns: lower-level rope geometry used by rigging
```

## Inline architecture domains

```txt
terrain-height-sampling
terrain-coloring
moisture-map
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

## Source authority problem

The live runtime and visible route are Balloon Drift, but durable project source still describes older free-flight behavior.

```txt
README.md: free-flight carving/gliding/diving/boosting
package.json: free-flight exploration description
src/data/campaign.config.js: thermal/gate/perch/start speed and FLIGHT legacy fields
src/main.js: active hot-air-balloon burner/vent/wind/altitude runtime
index.html: active Balloon Drift route title and meta
```

## Next-cut DSK map

```txt
open-above-product-copy-authority-kit
  owns current route title, summary, and control copy

open-above-readme-route-copy-parity-kit
  checks README copy against Balloon Drift source record

open-above-package-description-parity-kit
  checks package description against Balloon Drift source record

open-above-campaign-current-route-authority-kit
  marks campaign config current route versus compatibility fields

open-above-legacy-flight-compatibility-kit
  explains old FLIGHT values and prevents accidental reuse as current route truth

open-above-balloon-drift-config-kit
  extracts burner, vent, wind, altitude, ceiling, and camera defaults into source records

open-above-runtime-constant-parity-kit
  compares runtime defaults to source records

open-above-altitude-band-contract-kit
  makes ground, drift, cruise, and ceiling bands fixture-readable

open-above-source-consumer-manifest-kit
  lists README/package/campaign/runtime/object-kit/smoke/GameHost/.agent/central consumers

open-above-balloon-source-fingerprint-kit
  produces stable copy/config/runtime/object-kit fingerprints

open-above-balloon-source-snapshot-kit
  exposes current route, object type, controls, camera, source status, and kit metadata

open-above-source-acceptance-ledger-kit
  reports pass/fail/warn rows for source parity

open-above-source-consumer-ledger-kit
  binds manifest, fingerprint, snapshot, acceptance rows, and consumer ownership

open-above-gamehost-source-readback-kit
  adds window.GameHost.getState().source without changing .local or .nexusEngine

open-above-dom-free-source-fixture-kit
  proves source ledger behavior outside DOM/WebGL/browser runtime

open-above-central-ledger-sync-kit
  keeps repo-local and LuminaryLabs central ledger pointers aligned
```

## Architectural recommendation

Do source-ledger repair before renderer extraction, terrain extraction, camera retuning, or route expansion.

The safe implementation path is additive: add pure `src/source/*` modules, wire `GameHost.getState().source`, then extend smoke/check scripts.
