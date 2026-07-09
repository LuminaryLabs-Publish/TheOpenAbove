# Current Audit — TheOpenAbove

**Timestamp:** `2026-07-09T17-58-53-04-00`

## Summary

`TheOpenAbove` is a live Balloon Drift route whose runtime behavior is ahead of its durable source authority.

The browser runtime already supports burner and vent input, wind-drift motion, altitude safety, basket camera blend, hot-air-balloon object composition, HUD telemetry, NexusEngine telemetry, and `window.GameHost.getState()` readback.

The unresolved work is not visual expansion. The next implementation should freeze source ownership and fixture-readable readback so agents can safely align README/package/campaign/runtime source without breaking the current route.

## Current route

```txt
index.html
  -> src/main.js
  -> Three.js CDN
  -> NexusEngine main CDN
  -> src/data/campaign.config.js
  -> src/hot-air-balloon-object-kit.js
  -> inline world generation
  -> inline balloon drift state
  -> inline camera and HUD projection
  -> window.GameHost.getState()
```

## Interaction loop

```txt
open app
  -> canvas and HUD mount
  -> createGame()
  -> terrain/lakes/trees/clouds/wind ribbons are generated
  -> buildHotAirBalloon() creates visual object from sub-kits
  -> keydown/keyup/blur/wheel handlers mutate input/camera state
  -> update(dt) integrates burner, vent, wind, buoyancy, altitude, velocity, position, and distance
  -> animateHotAirBalloon() updates burner flame and rigging animation
  -> NexusEngine telemetry kit publishes openAbove.balloonSnapshot and openAbove.balloonTicked
  -> draw(dt) blends third-person and basket camera, rope fade, ride bob, sway, burner vibration, and first-person visibility
  -> renderer.render(scene, camera)
  -> HUD projects current route text and telemetry
  -> GameHost exposes local and Nexus telemetry
```

## Domains in use

```txt
implemented/source-backed:
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

inline runtime domains:
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

missing next:
  product-copy-authority
  readme-route-copy-parity
  package-description-parity
  campaign-current-route-authority
  legacy-flight-compatibility
  balloon-drift-config
  runtime-constant-parity
  altitude-band-contract
  source-consumer-manifest
  source-consumer-record
  source-fingerprint
  source-snapshot
  source-acceptance-ledger
  source-consumer-ledger
  source-readback-projection
  browser-consumer-fixture
  gamehost-source-diagnostics
  central-ledger-parity
```

## Kit services in use

```txt
open-above-balloon-telemetry-kit:
  defines openAbove.balloonSnapshot resource
  defines openAbove.balloonTicked event
  writes current snapshot into NexusEngine world resource
  emits altitude/wind/burner telemetry per tick
  installs engine.openAbove.getState()

open-above-hot-air-balloon-object-kit:
  composes envelope, streamers, seams, mouth, basket, rigging, burner, and rope sub-kits
  builds procedural hot-air-balloon object
  exposes browser global OpenAboveHotAirBalloonObjectKit
  retains compatibility wing/tail placeholders for old host attachment path
  animates burner and rigging sub-kits

open-above-rope-kit:
  computes sagging tube points between endpoints
  builds tube geometry and stripe markers
  updates rope mesh over time for sway

inline host services:
  seeded
  terrainHeight
  moistureAt
  terrainColor
  makeTerrain
  makeLakes
  makeTrees
  makeClouds
  makeWindRibbons
  setFirstPersonVisibility
  snapshot
  update
  draw
  updateHud
  GameHost.getState
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

inline candidate kits:
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

## Main finding

The runtime should not be rewritten yet. The highest-value gap is source authority and browser readback: product copy, package metadata, campaign config, inline runtime defaults, visual object-kit metadata, smoke checks, GameHost diagnostics, repo-local `.agent` docs, and central tracking need one consistent source consumer ledger.

## Central tracking finding

All current public non-Cavalry Publish repos checked from the live organization page already had central ledgers and sampled root `.agent` state. `TheOpenAbove` was selected by the oldest eligible documented-selection fallback, and the same source-readback blocker remains unresolved.

## Next safe ledge

```txt
TheOpenAbove Balloon Drift Source Readback Ledger + Browser Consumer Fixture Gate
```
