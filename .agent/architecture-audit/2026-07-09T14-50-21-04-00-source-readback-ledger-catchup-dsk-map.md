# Architecture Audit — Source Readback Ledger Catch-up DSK Map

**Timestamp:** `2026-07-09T14-50-21-04-00`

## Current architecture

```txt
index.html
  -> src/main.js
     -> Three.js CDN
     -> NexusEngine main CDN
     -> src/data/campaign.config.js
     -> src/hot-air-balloon-object-kit.js
        -> balloon-envelope-panel-kit
        -> balloon-mouth-kit
        -> balloon-streamer-fit-kit
        -> balloon-fabric-seam-kit
        -> hot-air-balloon-basket-kit
        -> hot-air-balloon-rigging-kit
        -> hot-air-balloon-burner-kit
        -> rope-kit
     -> inline world generation
     -> inline drift physics
     -> inline camera/HUD/GameHost projection
```

## DSK/domain breakdown

```txt
open-above-route-domain
  static-shell-kit
  vite-publish-kit
  route-title-copy-consumer

open-above-source-domain
  product-copy-authority-kit             target
  package-description-parity-kit         target
  campaign-current-route-authority-kit   target
  legacy-flight-compatibility-kit        target
  source-consumer-manifest-kit           target
  source-fingerprint-kit                 target
  source-snapshot-kit                    target
  source-consumer-ledger-kit             target

open-above-world-domain
  terrain-sampler-kit                    inline candidate
  moisture-map-kit                       inline candidate
  lake-placement-kit                     inline candidate
  tree-scatter-kit                       inline candidate
  cloud-scatter-kit                      inline candidate
  wind-ribbon-render-kit                 inline candidate

open-above-balloon-domain
  hot-air-balloon-object-kit             implemented
  balloon-envelope-panel-kit             implemented
  balloon-mouth-kit                      implemented
  balloon-streamer-fit-kit               implemented
  balloon-fabric-seam-kit                implemented
  hot-air-balloon-basket-kit             implemented
  hot-air-balloon-rigging-kit            implemented
  hot-air-balloon-burner-kit             implemented
  rope-kit                               implemented

open-above-drift-domain
  burner-vent-intent-kit                 inline candidate
  wind-field-kit                         inline candidate
  balloon-drift-physics-kit              inline candidate
  altitude-safety-kit                    inline candidate
  ceiling-softness-kit                   inline candidate
  runtime-constant-parity-kit            target

open-above-host-domain
  three-render-host-kit                  inline candidate
  camera-zoom-blend-kit                  inline candidate
  basket-camera-kit                      inline candidate
  first-person-visibility-kit            inline candidate
  hud-telemetry-kit                      inline candidate
  gamehost-debug-kit                     inline candidate
  gamehost-source-readback-kit           target
  browser-consumer-readback-kit          target

open-above-validation-domain
  dom-free-source-fixture-kit            target
  browser-consumer-fixture-kit           target
  deploy-build-contract-kit              target
  central-ledger-sync-kit                target
```

## Architectural issue

The runtime is centered in `src/main.js`, which is acceptable for the current visual route, but not acceptable as durable source authority.

Source consumers are spread across README, package metadata, campaign config, runtime constants, object-kit metadata, smoke tests, GameHost readback, repo-local `.agent`, and central ledger.

## Required source contracts

```txt
OpenAboveProductRecord:
  routeId
  routeTitle
  currentObjectType
  currentInteractionMode
  controls
  cameraModes

BalloonDriftConfigRecord:
  startingPosition
  startingVelocity
  burnerDefault
  ventDefault
  windFormulaMarkers
  altitudeCeiling
  groundClearance

LegacyFlightCompatibilityRecord:
  README old-flight rows
  package old-flight rows
  campaign FLIGHT rows
  status = compatibility-only until removed

SourceConsumerManifest:
  consumer id
  owner file
  expected source type
  proof requirement

SourceConsumerLedger:
  manifest
  fingerprint
  snapshot
  acceptance rows
  central ledger pointer
```

## Next-cut file map

```txt
src/source/open-above-product.js
src/source/balloon-drift.config.js
src/source/legacy-flight-compatibility.js
src/source/source-consumer-manifest.js
src/source/source-fingerprint.js
src/source/source-snapshot.js
src/source/source-acceptance.js
src/source/source-consumer-ledger.js
src/source/gamehost-source-readback.js
scripts/open-above-source-fixture.mjs
```

## Non-goals

```txt
No terrain extraction.
No renderer rewrite.
No camera retune.
No balloon visual profile change.
No Cloud Basin route addition.
No branch creation.
```
