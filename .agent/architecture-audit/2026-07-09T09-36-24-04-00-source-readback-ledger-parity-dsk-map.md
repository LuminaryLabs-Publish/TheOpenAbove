# Architecture Audit — Source Readback Ledger Parity DSK Map

**Timestamp:** `2026-07-09T09-36-24-04-00`

## Current architecture

```txt
index.html
  -> src/main.js
  -> Three.js CDN
  -> NexusEngine main CDN
  -> src/data/campaign.config.js
  -> src/hot-air-balloon-object-kit.js
  -> inline world helpers
  -> inline balloon drift simulation
  -> inline camera/HUD projection
  -> window.GameHost.getState()
```

## Domain breakdown

```txt
browser-shell-domain
  owns canvas, HUD, error panel, module entry

nexusengine-telemetry-domain
  owns openAbove.balloonSnapshot resource, openAbove.balloonTicked event, engine.openAbove.getState()

balloon-object-domain
  owns envelope, mouth, streamers, fabric seams, basket, rigging, burner, rope metadata

world-generation-domain
  owns terrain height, moisture, color, lakes, trees, clouds, wind ribbons

balloon-drift-domain
  owns burner, vent, wind, buoyancy, altitude damping, ceiling softness, velocity, position, distance

camera-domain
  owns third-person follow, basket blend, first-person position, rope fade, ride bob, sway, burner vibration

hud-domain
  owns visible telemetry copy and compact route status

source-authority-domain
  missing; should own product copy, package metadata, campaign compatibility, runtime constants, source fingerprints, source snapshots, acceptance rows, consumer ledger, and central parity rows
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

## Inline candidate kits

```txt
open-above-runtime-host-kit
open-above-vite-static-publish-kit
open-above-three-render-host-kit
open-above-campaign-config-kit
open-above-balloon-input-map-kit
open-above-balloon-state-kit
open-above-balloon-drift-physics-kit
open-above-burner-vent-intent-kit
open-above-wind-field-kit
open-above-altitude-safety-kit
open-above-ceiling-softness-kit
open-above-terrain-sampler-kit
open-above-world-generation-kit
open-above-lake-generation-kit
open-above-tree-scatter-kit
open-above-cloud-scatter-kit
open-above-wind-ribbon-render-kit
open-above-basket-follow-camera-kit
open-above-camera-zoom-blend-kit
open-above-first-person-visibility-kit
open-above-hud-telemetry-kit
open-above-gamehost-debug-kit
```

## Next-cut source/readback kits

```txt
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

## Key seam

`src/main.js` is still the runtime source of truth for Balloon Drift constants and browser state. The next pass should not split renderer/world/camera first. It should create pure source modules and fixtures that prove README/package/campaign/runtime/object-kit/GameHost/central-ledger parity.