# Architecture Audit — Source Readback Ledger Splice DSK Map

**Timestamp:** `2026-07-09T00-40-20-04-00`

## Current architecture

```txt
index.html
  -> src/main.js
    -> Three.js CDN
    -> NexusEngine main CDN
    -> CAMPAIGN / WORLD from src/data/campaign.config.js
    -> buildHotAirBalloon / animateHotAirBalloon from src/hot-air-balloon-object-kit.js
    -> inline terrain/lake/tree/cloud/wind-ribbon generation
    -> inline balloon state and drift update
    -> inline camera/HUD/GameHost projection
```

## Domain breakdown

```txt
static route domain:
  index.html, Vite base, canvas/HUD/error shell

runtime host domain:
  createGame, animation frame loop, resize handling, input listeners

Nexus telemetry domain:
  open-above-balloon-telemetry-kit, BalloonSnapshot resource, BalloonTicked event

world/render domain:
  terrainHeight, moistureAt, terrainColor, makeTerrain, makeLakes, makeTrees, makeClouds, makeWindRibbons

vehicle domain:
  open-above-hot-air-balloon-object-kit and its envelope, mouth, streamer, seam, basket, rigging, burner, rope subdomains

balloon drift domain:
  burner intent, vent intent, wind angle/speed, buoyancy, altitude damping, ceiling softness, ground clearance, velocity integration

camera/HUD domain:
  zoom blend, basket camera, first-person visibility, rope fade, ride bob, sway, burner vibration, HUD telemetry text

source authority domain:
  missing source manifest, fingerprint, source snapshot, source acceptance rows, source readback ledger, browser consumer fixture
```

## Implemented DSKs

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

## Inline candidate DSKs

```txt
open-above-three-render-host-kit
open-above-world-generation-kit
open-above-balloon-state-kit
open-above-balloon-drift-physics-kit
open-above-burner-vent-intent-kit
open-above-wind-field-kit
open-above-altitude-safety-kit
open-above-basket-follow-camera-kit
open-above-first-person-visibility-kit
open-above-hud-telemetry-kit
open-above-gamehost-debug-kit
```

## Next-cut proof DSKs

```txt
open-above-product-copy-authority-kit
open-above-package-description-parity-kit
open-above-campaign-current-route-authority-kit
open-above-balloon-drift-config-kit
open-above-source-manifest-kit
open-above-source-fingerprint-kit
open-above-source-snapshot-kit
open-above-source-acceptance-ledger-kit
open-above-source-readback-ledger-kit
open-above-gamehost-source-readback-kit
open-above-browser-consumer-readback-kit
open-above-dom-free-source-fixture-kit
open-above-deploy-build-contract-kit
```

## Required service contracts

```txt
createOpenAboveProductCopy()
createBalloonDriftConfig()
createAltitudeBands()
createRouteDescriptors()
createWindLaneHints()
createSourceManifest()
createSourceFingerprint(manifest)
createSourceSnapshot({ manifest, config, objectKit })
createSourceAcceptanceLedger(snapshot)
createSourceReadbackLedger({ manifest, fingerprint, snapshot, acceptance })
projectGameHostSourceReadback(ledger)
runOpenAboveSourceFixture()
```

## Main architectural conclusion

The next architecture change should be additive and source-only. It should not move the renderer, camera, balloon physics, object-kit composition, or world generation yet.
