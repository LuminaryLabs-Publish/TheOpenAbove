# Architecture Audit — Source Authority Ledger Freeze DSK Map

**Timestamp:** `2026-07-09T03-20-01-04-00`

## Scope

This audit maps the current `TheOpenAbove` architecture around the source authority gap. It does not request renderer extraction or runtime behavior changes.

## Current composition

```txt
index.html
  -> src/main.js
    -> Three.js CDN
    -> NexusEngine main CDN
    -> src/data/campaign.config.js
    -> src/hot-air-balloon-object-kit.js
      -> envelope panel kit
      -> mouth kit
      -> streamer fit kit
      -> fabric seam kit
      -> basket kit
      -> rigging kit
      -> burner kit
      -> rope kit
    -> inline world generation
    -> inline balloon drift loop
    -> inline HUD and GameHost projection
```

## Interaction loop

```txt
route load
  -> createGame()
  -> build terrain/lakes/trees/clouds/wind ribbons
  -> buildHotAirBalloon()
  -> register keyboard/wheel input
  -> update(dt) computes balloon drift state
  -> engine.tick(dt) publishes NexusEngine telemetry
  -> draw(dt) computes camera and visibility projection
  -> updateHud()
  -> GameHost.getState()
```

## Domains in use

```txt
shell domains:
  static-browser-shell
  vite-static-publish
  github-pages-deploy

render domains:
  three-scene-host
  terrain-mesh-render
  lake-render
  tree-scatter-render
  cloud-scatter-render
  wind-ribbon-render
  hot-air-balloon-render
  camera-projection
  hud-projection

runtime domains:
  key-input
  wheel-zoom-input
  burner-vent-intent
  wind-field
  buoyancy-integration
  altitude-safety
  distance-tracking
  nexusengine-telemetry
  gamehost-state

object domains:
  hot-air-balloon-object
  envelope-panel
  balloon-mouth
  streamer-fit
  fabric-seam
  basket
  rigging
  burner
  rope

source domains:
  readme-product-copy
  package-description
  campaign-config
  legacy-flight-compatibility
  balloon-drift-config
  source-fingerprint
  source-readback
  browser-consumer-fixture
```

## Services that kits offer

```txt
open-above-balloon-telemetry-kit:
  publishes openAbove.balloonSnapshot resource
  emits openAbove.balloonTicked event
  installs engine.openAbove.getState()
  bridges runtime state into NexusEngine

open-above-hot-air-balloon-object-kit:
  composes object sub-kits
  exposes buildHotAirBalloon()
  exposes animateHotAirBalloon()
  exposes installHotAirBalloonVisual()
  marks object kit metadata in userData

sub-object kits:
  build mesh groups for envelope panels, mouth, streamers, seams, basket, rigging, burner, and rope
  expose default profiles used by the composed balloon object

inline route services:
  terrainHeight()
  moistureAt()
  terrainColor()
  makeTerrain()
  makeLakes()
  makeTrees()
  makeClouds()
  makeWindRibbons()
  snapshot()
  update()
  draw()
  updateHud()
```

## Kits identified

```txt
implemented source files:
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
  open-above-runtime-host-kit
  open-above-balloon-input-map-kit
  open-above-balloon-drift-physics-kit
  open-above-wind-field-kit
  open-above-altitude-safety-kit
  open-above-camera-zoom-blend-kit
  open-above-hud-telemetry-kit
  open-above-gamehost-debug-kit

next-cut kits:
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

## Architecture finding

The next change should freeze product/config/source authority first. The runtime has enough browser behavior for now, but implementation agents still cannot reliably tell which source owns product copy, route identity, legacy flight compatibility, inline runtime defaults, and GameHost source diagnostics.
