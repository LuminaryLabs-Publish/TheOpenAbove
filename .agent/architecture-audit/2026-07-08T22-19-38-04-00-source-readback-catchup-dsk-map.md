# Architecture Audit — Source Readback Catch-up DSK Map

**Timestamp:** `2026-07-08T22-19-38-04-00`

## Scope

Documentation-only breakdown of the current `TheOpenAbove` architecture and the next DSK cut.

## Current architecture

```txt
index.html
  -> canvas#game / #hud / #error
  -> src/main.js
    -> Three.js CDN
    -> NexusEngine main CDN
    -> src/data/campaign.config.js
    -> src/hot-air-balloon-object-kit.js
    -> createBalloonEngine(getSnapshot)
    -> open-above-balloon-telemetry-kit
    -> inline scene / world / input / physics / camera / HUD / GameHost loop
```

## Current source-backed DSKs

```txt
open-above-balloon-telemetry-kit
  provides: open-above:balloon-telemetry, open-above:wind-drift-state
  owns: BalloonSnapshot resource, BalloonTicked event, engine.openAbove.getState()

open-above-hot-air-balloon-object-kit
  owns: procedural hot-air-balloon object composition
  composes:
    open-above-balloon-envelope-panel-kit
    open-above-balloon-mouth-kit
    open-above-balloon-streamer-fit-kit
    open-above-balloon-fabric-seam-kit
    open-above-hot-air-balloon-basket-kit
    open-above-hot-air-balloon-rigging-kit
    open-above-hot-air-balloon-burner-kit
    open-above-rope-kit
```

## Inline domains that should not be extracted first

```txt
renderer host
terrain geometry
lake discs
tree scatter
cloud scatter
wind ribbons
camera blend
HUD write
keyboard/wheel browser input
balloon drift integration
```

These should stay stable until product/source/readback fixtures exist.

## Next DSK cut

```txt
open-above-product-copy-authority-kit
open-above-readme-route-copy-parity-kit
open-above-package-description-parity-kit
open-above-campaign-current-route-authority-kit
open-above-balloon-drift-config-kit
open-above-source-manifest-kit
open-above-balloon-source-fingerprint-kit
open-above-balloon-source-snapshot-kit
open-above-source-acceptance-result-kit
open-above-source-acceptance-ledger-kit
open-above-gamehost-source-readback-kit
open-above-source-acceptance-fixture-kit
open-above-source-module-consumer-splice-kit
open-above-browser-consumer-fixture-kit
open-above-deploy-build-contract-kit
```

## Required source contract

```txt
README/package/campaign copy
  -> OPEN_ABOVE_PRODUCT
  -> BALLOON_DRIFT
  -> ALTITUDE_BANDS
  -> ROUTE_OBJECTS
  -> WIND_LANE_HINTS
  -> SOURCE_MANIFEST
  -> SourceFingerprint
  -> SourceSnapshot
  -> SourceAcceptanceLedger
  -> GameHost source readback
  -> DOM-free fixture rows
  -> browser consumer readback rows
```

## Implementation guardrail

Do not change wind, buoyancy, altitude, camera, renderer, terrain, tree, lake, cloud, rope, basket, burner, or balloon visual constants while implementing source readback.
