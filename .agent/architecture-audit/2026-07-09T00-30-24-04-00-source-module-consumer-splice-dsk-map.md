# Architecture Audit — Source Module Consumer Splice DSK Map

**Timestamp:** `2026-07-09T00-30-24-04-00`

## Scope

This audit maps `TheOpenAbove` as it exists now and defines the next DSK cut for source authority without changing visible runtime behavior.

## Current architecture

```txt
index.html
  -> src/main.js
  -> Three.js CDN
  -> NexusEngine main CDN
  -> src/data/campaign.config.js
  -> src/hot-air-balloon-object-kit.js
  -> object sub-kits
  -> inline world/render/input/drift/camera/HUD/GameHost loop
```

## Interaction loop

```txt
open index.html
  -> canvas#game, #hud, and #error mount
  -> src/main.js creates scene/camera/renderer
  -> terrain/lakes/trees/clouds/wind ribbons are generated inline
  -> buildHotAirBalloon composes object sub-kits
  -> keyboard input becomes burner / vent intent
  -> wheel input changes camera zoom and first-person blend
  -> update(dt) integrates wind, buoyancy, altitude safety, velocity, position, and drift distance
  -> animateHotAirBalloon updates burner and rigging visuals
  -> Nexus telemetry publishes openAbove.balloonSnapshot and openAbove.balloonTicked
  -> draw(dt) resolves basket camera and first-person visibility
  -> HUD writes live route telemetry
  -> GameHost exposes local/nexus state
```

## Domains in use

```txt
host:
  static-page-host, vite-static-publish-host, third-party-cdn-runtime, browser-window-event-host, window-gamehost-debug

render:
  three-render-host, terrain-mesh-domain, lake-disc-domain, tree-scatter-domain, cloud-scatter-domain, wind-ribbon-domain, sky-fog-lighting-domain

balloon object:
  hot-air-balloon-object-domain, envelope-panel-domain, mouth-domain, streamer-fit-domain, fabric-seam-domain, basket-domain, rigging-domain, burner-domain, rope-domain

simulation:
  balloon-input-domain, burner-vent-intent-domain, wind-field-domain, buoyancy-domain, altitude-safety-domain, ceiling-softness-domain, terrain-clearance-domain, drift-distance-domain

camera / HUD:
  basket-follow-camera-domain, first-person-blend-domain, first-person-visibility-domain, rope-fade-domain, ride-motion-domain, burner-vibration-domain, hud-telemetry-domain

source authority next:
  product-copy-domain, package-description-domain, campaign-current-route-domain, legacy-flight-compatibility-domain, balloon-drift-config-domain, source-manifest-domain, source-fingerprint-domain, source-snapshot-domain, source-acceptance-domain, gamehost-source-readback-domain, dom-free-source-fixture-domain, browser-consumer-readback-domain
```

## Services the current kits offer

```txt
open-above-balloon-telemetry-kit:
  define openAbove.balloonSnapshot resource
  define openAbove.balloonTicked event
  publish live snapshot each simulate phase
  expose engine.openAbove.getState()

open-above-hot-air-balloon-object-kit:
  build full procedural hot-air-balloon object
  install compatibility controls for older vehicle host shape
  animate burner and rigging
  expose window.OpenAboveHotAirBalloonObjectKit

object sub-kits:
  build envelope panels
  build balloon mouth
  fit streamers
  build fabric seams
  build basket/interior details
  build rigging/ropes
  build burner warmth/light/controls
```

## Services needed next

```txt
loadOpenAboveProduct()
loadBalloonDriftConfig()
loadAltitudeBands()
loadRouteDescriptors()
loadWindLaneHints()
createSourceManifest()
createSourceFingerprint(files, config)
createSourceSnapshot(runtimeSnapshot, sourceModules)
createSourceAcceptanceResult(row, status, details)
createSourceAcceptanceLedger(results)
createGameHostSourceReadback(sourceSnapshot, acceptanceLedger)
spliceSourceReadbackIntoGameHost(existingGetState)
runOpenAboveSourceFixture()
runBrowserConsumerReadbackFixture()
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

## Next-cut kits

```txt
open-above-product-copy-authority-kit
open-above-readme-route-copy-parity-kit
open-above-package-description-parity-kit
open-above-campaign-current-route-authority-kit
open-above-legacy-flight-compatibility-kit
open-above-balloon-drift-config-kit
open-above-source-manifest-kit
open-above-balloon-source-fingerprint-kit
open-above-balloon-source-snapshot-kit
open-above-source-acceptance-result-kit
open-above-source-acceptance-ledger-kit
open-above-gamehost-source-readback-kit
open-above-source-module-consumer-splice-kit
open-above-runtime-constant-parity-kit
open-above-altitude-band-contract-kit
open-above-route-object-config-kit
open-above-wind-lane-hint-kit
open-above-dom-free-source-fixture-kit
open-above-browser-consumer-readback-kit
open-above-deploy-build-contract-kit
```

## Source authority blocker

The runtime is already Balloon Drift, but the authoritative source surface is split:

```txt
README/package/campaign: old free-flight framing
src/main.js: current balloon drift constants and behavior
GameHost: local/nexus only, no source readback
npm run check: route/object smoke only, no product/config/runtime parity fixture
```

## Next safe ledge

```txt
TheOpenAbove Source Module Consumer Splice + Browser Readback Fixture Gate
```

Stop when source modules and fixtures prove product/config/runtime parity while preserving current browser behavior and existing host state shapes.
