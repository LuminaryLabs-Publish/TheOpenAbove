# Architecture Audit — Balloon Source DSK Breakdown

**Timestamp:** `2026-07-08T13-31-29-04-00`

## Current architecture

```txt
index.html
  -> src/main.js
  -> Three.js CDN
  -> NexusEngine main CDN
  -> CAMPAIGN / WORLD from src/data/campaign.config.js
  -> src/hot-air-balloon-object-kit.js
  -> inline runtime loop
```

`src/main.js` currently owns both host orchestration and domain behavior. It creates the scene, renderer, terrain, water, trees, clouds, wind ribbons, balloon object, keyboard/wheel input, drift physics, camera, HUD, Nexus telemetry kit, and `window.GameHost`.

## Architecture problem

The route is visually coherent, but source ownership is inverted:

```txt
current durable docs/config say: free-flight bird/glider route
current live route does: hot-air-balloon drift route
```

The source of truth should become:

```txt
OPEN_ABOVE_PRODUCT
  -> BALLOON_DRIFT
  -> BalloonSourceFingerprint
  -> BalloonSourceSnapshot
  -> SourceAcceptanceLedger
  -> GameHost source diagnostics
  -> DOM-free fixture rows
```

## Current domains

```txt
page-host-domain
vite-publish-domain
cdn-runtime-domain
three-render-domain
nexus-engine-runtime-domain
telemetry-domain
balloon-object-domain
balloon-envelope-domain
balloon-mouth-domain
balloon-streamer-domain
balloon-fabric-seam-domain
balloon-basket-domain
balloon-rigging-domain
balloon-burner-domain
rope-domain
terrain-domain
moisture-domain
lake-domain
tree-scatter-domain
cloud-scatter-domain
wind-ribbon-domain
input-domain
burner-vent-domain
vehicle-state-domain
drift-physics-domain
wind-field-domain
altitude-safety-domain
camera-domain
hud-domain
gamehost-debug-domain
campaign-config-domain
legacy-flight-compatibility-domain
product-source-domain
source-acceptance-domain
route-descriptor-domain
fixture-domain
```

## Implemented DSKs / kits

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

## Inline candidate kits

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

## Next-cut DSKs

```txt
open-above-product-copy-authority-kit
open-above-readme-route-copy-parity-kit
open-above-package-description-parity-kit
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

## Required service boundary

The next implementation should add source-authority modules without moving the renderer first:

```txt
src/source/open-above-product.js
src/source/balloon-drift.config.js
src/source/source-fingerprint.js
src/source/source-snapshot.js
src/source/source-acceptance.js
src/source/gamehost-source-readback.js
src/source/route-descriptors.js
src/source/altitude-bands.js
src/source/wind-lane-hints.js
scripts/open-above-source-fixture.mjs
```

## Stop line

Stop once the source fixture can prove the current route identity and core balloon-drift constants without changing visible behavior.

Do not extract renderer, terrain, camera, HUD, route reducer, or mission progression in the same cutover.