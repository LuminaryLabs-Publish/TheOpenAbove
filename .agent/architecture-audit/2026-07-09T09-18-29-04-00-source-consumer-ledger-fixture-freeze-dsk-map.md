# Architecture Audit — Source Consumer Ledger Fixture Freeze DSK Map

**Timestamp:** `2026-07-09T09-18-29-04-00`

## Summary

`TheOpenAbove` already has a playable Balloon Drift route. The architecture issue is not missing world content; it is source authority drift between product docs, package metadata, campaign config, object-kit metadata, runtime constants, GameHost state, and central tracking.

## Current architecture

```txt
index.html
  -> src/main.js
    -> Three.js CDN
    -> NexusEngine main CDN
    -> CAMPAIGN/WORLD config
    -> hot-air-balloon object kit
    -> inline world/render/physics/camera/HUD host
    -> GameHost local + nexusEngine readback
```

## Implemented DSK/domain services

```txt
open-above-balloon-telemetry-kit:
  owner: src/main.js createBalloonEngine()
  service: NexusEngine resource/event telemetry bridge
  outputs: openAbove.balloonSnapshot, openAbove.balloonTicked, engine.openAbove.getState()

open-above-hot-air-balloon-object-kit:
  owner: src/hot-air-balloon-object-kit.js
  service: visual object composition
  outputs: balloon group, profile, browser global, object metadata

open-above-balloon-envelope-panel-kit:
  service: balloon envelope panel geometry

open-above-balloon-mouth-kit:
  service: open-bottom mouth geometry

open-above-balloon-streamer-fit-kit:
  service: fitted streamer geometry

open-above-balloon-fabric-seam-kit:
  service: seam geometry and visual panel lines

open-above-hot-air-balloon-basket-kit:
  service: basket object geometry

open-above-hot-air-balloon-rigging-kit:
  service: rope/rigging geometry and animation

open-above-hot-air-balloon-burner-kit:
  service: burner mesh and burner heat animation

open-above-rope-kit:
  service: rope geometry consumed by rigging
```

## Inline domains that should stay inline until source fixture proof

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
basket-camera
first-person-visibility
hud-telemetry
gamehost-debug-state
```

## Next-cut DSK map

```txt
open-above-product-copy-authority-kit
  owns: route title, product description, visible copy status
  output: OpenAboveProductRecord

open-above-balloon-drift-config-kit
  owns: burner, vent, wind, altitude, camera, and route constants
  output: BalloonDriftConfigRecord

open-above-legacy-flight-compatibility-kit
  owns: old FLIGHT/CAMPAIGN compatibility classification
  output: LegacyFlightCompatibilityRecord

open-above-source-consumer-manifest-kit
  owns: list of all consumers that read route/source state
  output: SourceConsumerManifest

open-above-source-fingerprint-kit
  owns: stable source markers across README/package/campaign/runtime/object kit
  output: SourceFingerprint

open-above-source-snapshot-kit
  owns: current route/object/control/source summary
  output: SourceSnapshot

open-above-source-acceptance-ledger-kit
  owns: accepted/rejected/mismatch source rows
  output: SourceAcceptanceLedger

open-above-source-consumer-ledger-kit
  owns: manifest + fingerprint + snapshot + acceptance aggregation
  output: SourceConsumerLedger

open-above-gamehost-source-readback-kit
  owns: additive browser readback projection
  output: window.GameHost.getState().source

open-above-dom-free-source-fixture-kit
  owns: Node-safe fixture rows without DOM/canvas/WebGL
  output: scripts/open-above-source-fixture.mjs result
```

## Architecture rule

The source consumer ledger must be implemented before terrain, renderer, HUD, camera, or physics extraction. Otherwise the old free-flight source shape will keep competing with the actual Balloon Drift route.
