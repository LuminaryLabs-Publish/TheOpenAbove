# Architecture Audit — Source Consumer Central Catch-up DSK Map

**Timestamp:** `2026-07-09T09-29-24-04-00`

## Repo

```txt
LuminaryLabs-Publish/TheOpenAbove
```

## Selection read

The accessible Publish org list was compared against central tracking and sampled root `.agent` state.

No checked non-Cavalry repo was new, absent from the ledger, missing root `.agent`, recently added but undocumented, or otherwise undocumented.

`TheOpenAbove` was selected because central tracking lagged the repo-local source-consumer ledger, and the repo remains one of the oldest eligible documented fallbacks once `TheCavalryOfRome` is excluded.

## Current composition

```txt
static Vite browser host
  -> index.html
  -> src/main.js
  -> Three.js CDN
  -> NexusEngine main CDN
  -> src/data/campaign.config.js
  -> src/hot-air-balloon-object-kit.js
  -> balloon sub-kit modules
```

## Interaction loop

```txt
open index.html
  -> createGame()
  -> generate terrain, lakes, trees, clouds, and wind ribbons
  -> buildHotAirBalloon()
  -> install input handlers for burner, vent, blur, resize, and wheel zoom
  -> update(dt) integrates balloon drift state
  -> engine.tick(dt) publishes NexusEngine telemetry
  -> draw(dt) resolves camera blend and renders scene
  -> updateHud() writes browser route telemetry
  -> GameHost.getState() returns local and Nexus snapshots
```

## Domains in use

```txt
static-browser-shell
vite-static-publish
three-render-host
nexusengine-realtime-telemetry
hot-air-balloon-object
balloon-envelope-panel
balloon-mouth
balloon-streamer-fit
balloon-fabric-seam
basket-object
rigging-object
burner-object
rope-object
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
central-ledger-readback
```

## Services the current kits offer

```txt
open-above-balloon-telemetry-kit:
  resource service: openAbove.balloonSnapshot
  event service: openAbove.balloonTicked
  system service: write current balloon snapshot during simulate phase
  host service: engine.openAbove.getState()

open-above-hot-air-balloon-object-kit:
  object factory: buildHotAirBalloon(profile)
  animation service: animateHotAirBalloon(balloon, time, burnerHeat)
  compatibility installer: installHotAirBalloonVisual(host, profile)
  global adapter: window.OpenAboveHotAirBalloonObjectKit

balloon sub-kits:
  envelope panel geometry
  open mouth geometry
  fitted streamer geometry
  fabric seam geometry
  basket geometry
  rigging geometry and animation
  burner geometry and heat animation
  rope geometry

inline services:
  terrain sampler
  moisture sampler
  terrain color resolver
  world object generation
  wind field evolution
  burner/vent input reducer
  drift physics integrator
  altitude safety clamp
  camera blend projector
  HUD projector
  GameHost local/Nexus snapshot projection
```

## Kits identified

```txt
implemented:
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

inline candidates:
  open-above-runtime-host-kit
  open-above-three-render-host-kit
  open-above-terrain-sampler-kit
  open-above-world-generation-kit
  open-above-wind-field-kit
  open-above-burner-vent-intent-kit
  open-above-balloon-drift-physics-kit
  open-above-altitude-safety-kit
  open-above-camera-zoom-blend-kit
  open-above-basket-camera-kit
  open-above-hud-telemetry-kit
  open-above-gamehost-debug-kit

next-cut source/readback kits:
  open-above-product-copy-authority-kit
  open-above-readme-route-copy-parity-kit
  open-above-package-description-parity-kit
  open-above-campaign-current-route-authority-kit
  open-above-legacy-flight-compatibility-kit
  open-above-balloon-drift-config-kit
  open-above-source-consumer-manifest-kit
  open-above-source-consumer-record-kit
  open-above-balloon-source-fingerprint-kit
  open-above-balloon-source-snapshot-kit
  open-above-source-acceptance-ledger-kit
  open-above-source-consumer-ledger-kit
  open-above-gamehost-source-readback-kit
  open-above-dom-free-source-fixture-kit
  open-above-central-ledger-sync-kit
```

## Main architecture finding

The implementation has enough object-kit boundaries to avoid a visual rewrite. The missing architecture layer is a source consumer ledger that binds product copy, package metadata, campaign compatibility, runtime constants, object-kit metadata, GameHost readback, smoke checks, repo-local `.agent`, and central ledger entries into one testable contract.

## Next source seam

```txt
SourceConsumerManifest
  -> SourceFingerprint
  -> SourceSnapshot
  -> SourceAcceptanceLedger
  -> SourceConsumerLedger
  -> GameHostSourceReadback
  -> DOM-free source fixture
  -> central ledger parity row
```
