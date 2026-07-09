# Architecture Audit — Source Manifest Consumer Freeze DSK Map

**Timestamp:** `2026-07-09T03-29-29-04-00`

## Audit scope

This pass documents the current DSK/domain breakdown for `LuminaryLabs-Publish/TheOpenAbove` and locks the next implementation seam to source manifest consumer freeze.

No runtime source changed.

## Current interaction loop

```txt
index.html
  -> src/main.js
  -> import Three.js CDN
  -> import NexusEngine main CDN
  -> import CAMPAIGN and WORLD
  -> import hot-air-balloon object kit
  -> build terrain, lakes, trees, clouds, wind ribbons
  -> build hot-air-balloon visual object
  -> install key, blur, wheel, resize handlers
  -> update(dt) integrates burner, vent, wind, buoyancy, altitude, velocity, position, distance
  -> engine.tick(dt) publishes openAbove balloon telemetry
  -> draw(dt) resolves third-person / basket camera blend
  -> HUD projects telemetry
  -> GameHost exposes local and Nexus telemetry
```

## Domains in use

```txt
browser-route-domain:
  owns index.html, canvas, HUD, error panel, script boot

static-publish-domain:
  owns Vite base, npm scripts, GitHub Pages compatible build shape

nexusengine-telemetry-domain:
  owns openAbove.balloonSnapshot resource and openAbove.balloonTicked event

world-render-domain:
  owns terrain mesh, terrain colors, lakes, trees, clouds, wind ribbons, lights, fog

balloon-object-domain:
  owns procedural hot-air-balloon composition and sub-kit metadata

balloon-drift-domain:
  owns burner, vent, wind, buoyancy, altitude, vertical velocity, position, distance

camera-domain:
  owns wheel zoom, third-person position, first-person basket blend, rope fade, ride bob, sway, burner vibration

hud-domain:
  owns route text and current telemetry projection

gamehost-domain:
  owns current local and Nexus telemetry readback

source-authority-domain:
  missing next. Must own product copy, runtime config, legacy compatibility, source manifest, source snapshot, acceptance rows, source readback, and central ledger parity.
```

## Services offered by current kits

```txt
open-above-balloon-telemetry-kit:
  defines openAbove.balloonSnapshot
  defines openAbove.balloonTicked
  publishes snapshot into NexusEngine world resource
  emits frame/altitude/wind/burner telemetry
  installs engine.openAbove.getState()

open-above-hot-air-balloon-object-kit:
  composes envelope, mouth, streamers, seams, basket, rigging, burner, and rope kits
  returns a Three.Group with object-kit userData
  exposes buildHotAirBalloon()
  exposes animateHotAirBalloon()
  exposes installHotAirBalloonVisual()

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
implemented explicit kits:
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

runtime-implied kits:
  open-above-runtime-host-kit
  open-above-three-render-host-kit
  open-above-world-generation-kit
  open-above-terrain-sampler-kit
  open-above-lake-generation-kit
  open-above-tree-scatter-kit
  open-above-cloud-scatter-kit
  open-above-wind-ribbon-render-kit
  open-above-balloon-input-map-kit
  open-above-balloon-drift-physics-kit
  open-above-camera-zoom-blend-kit
  open-above-basket-follow-camera-kit
  open-above-hud-telemetry-kit
  open-above-gamehost-debug-kit

next-cut kits:
  open-above-product-copy-authority-kit
  open-above-readme-route-copy-parity-kit
  open-above-package-description-parity-kit
  open-above-campaign-current-route-authority-kit
  open-above-legacy-flight-compatibility-kit
  open-above-balloon-drift-config-kit
  open-above-source-manifest-kit
  open-above-source-manifest-consumer-freeze-kit
  open-above-balloon-source-fingerprint-kit
  open-above-balloon-source-snapshot-kit
  open-above-source-acceptance-ledger-kit
  open-above-source-readback-ledger-kit
  open-above-gamehost-source-readback-kit
  open-above-browser-consumer-readback-kit
  open-above-dom-free-source-fixture-kit
  open-above-central-ledger-sync-kit
```

## Source consumer freeze map

```txt
README.md
  -> product_copy_matches_balloon_drift

package.json
  -> package_description_matches_balloon_drift

src/data/campaign.config.js
  -> campaign_copy_marks_balloon_drift_current_route
  -> legacy_flight_marked_compatibility_only

src/main.js
  -> balloon_drift_config_matches_inline_runtime_defaults
  -> gamehost_reports_balloon_source_snapshot

src/hot-air-balloon-object-kit.js
  -> source_snapshot_reports_visual_object_kit

tests/smoke.mjs
  -> npm_check_runs_source_fixture

LuminaryLabs-Dev/LuminaryLabs repo ledger
  -> central_ledger_matches_repo_local_latest_tracker
```

## Next safe ledge

```txt
TheOpenAbove Source Manifest Consumer Freeze + Central Ledger Catch-Up Fixture Gate
```
