# Current Audit — TheOpenAbove

**Timestamp:** `2026-07-09T03-20-01-04-00`

## Summary

`TheOpenAbove` is a hot-air-balloon drift route whose live browser runtime is more accurate than the durable product/config source files.

The live app already exposes burner and vent input, balloon drift physics, basket camera blend, HUD telemetry, NexusEngine telemetry, and `window.GameHost.getState()`. The mismatch is that `README.md`, `package.json`, and `src/data/campaign.config.js` still describe the older free-flight route.

This pass keeps the next cut narrow: build source modules, acceptance/readback ledgers, browser consumer fixture rows, and additive `GameHost.getState().source` diagnostics before changing visuals, physics, camera tuning, route progression, or reusable-kit boundaries.

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
  camera-zoom-blend
  basket-first-person-camera
  first-person-visibility
  hud-telemetry
  gamehost-debug-state

missing next:
  product-copy-authority
  source-manifest
  source-fingerprint
  source-snapshot
  source-acceptance-ledger
  source-readback-ledger
  browser-consumer-fixture
  gamehost-source-diagnostics
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

inline host services:
  terrainHeight
  moistureAt
  terrainColor
  makeTerrain
  makeLakes
  makeTrees
  makeClouds
  makeWindRibbons
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

next-cut source/readback kits:
  open-above-product-copy-authority-kit
  open-above-balloon-drift-config-kit
  open-above-source-manifest-kit
  open-above-balloon-source-fingerprint-kit
  open-above-balloon-source-snapshot-kit
  open-above-source-acceptance-ledger-kit
  open-above-source-readback-ledger-kit
  open-above-gamehost-source-readback-kit
  open-above-browser-consumer-readback-kit
  open-above-dom-free-source-fixture-kit
```

## Main finding

The runtime should not be rewritten yet. The highest-value gap is source authority and browser readback: product copy, package metadata, campaign config, inline runtime defaults, visual object-kit metadata, smoke checks, and GameHost diagnostics need one consistent source ledger.

## Next safe ledge

```txt
TheOpenAbove Source Authority Ledger Freeze + GameHost Browser Consumer Fixture Gate
```
