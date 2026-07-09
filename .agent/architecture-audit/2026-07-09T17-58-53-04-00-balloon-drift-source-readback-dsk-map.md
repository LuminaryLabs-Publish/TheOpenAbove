# Architecture Audit — Balloon Drift Source Readback DSK Map

**Timestamp:** `2026-07-09T17-58-53-04-00`

## Current architecture

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
      -> burner kit
      -> rigging kit
        -> rope kit
```

## DSK boundary read

The object kits are source-backed enough to preserve. The host runtime is not yet split enough to treat source authority as durable.

The next DSK cut should create a source/readback layer before any renderer or world extraction.

## Current source-backed domains

```txt
nexusengine-realtime-telemetry
hot-air-balloon-object
balloon-envelope-panel
balloon-mouth
balloon-streamer-fit
balloon-fabric-seam
basket-object
burner-object
rigging-object
rope-object
```

## Inline host domains

```txt
terrain-height-sampling
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
hud-telemetry
gamehost-debug-state
```

## Next DSK map

```txt
open-above-product-copy-authority-kit
  -> owns current route title, description, controls, and route status

open-above-campaign-current-route-authority-kit
  -> marks old campaign/free-flight fields as compatibility data

open-above-balloon-drift-config-kit
  -> owns burner, vent, wind, buoyancy, ceiling, ground clamp, and camera defaults

open-above-source-consumer-manifest-kit
  -> lists README, package, campaign, runtime, object kits, smoke tests, GameHost, .agent, and central ledger consumers

open-above-source-consumer-ledger-kit
  -> records every consumer row and acceptance state

open-above-gamehost-source-readback-kit
  -> adds additive window.GameHost.getState().source diagnostics without changing local/nexus shapes

open-above-dom-free-source-fixture-kit
  -> validates source/readback rows without DOM, canvas, WebGL, or browser globals
```
