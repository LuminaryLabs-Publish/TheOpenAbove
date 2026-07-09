# Project Breakdown — TheOpenAbove

**Timestamp:** `2026-07-09T14-50-21-04-00`

## Goal

Refresh `TheOpenAbove` repo-local `.agent` operating docs, keep central ledger aligned, and lock the next implementation ledge around source/readback proof rather than visual runtime rewrites.

## Checklist

- [x] Compared accessible `LuminaryLabs-Publish` repo list against central ledger.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Chose exactly one repo: `LuminaryLabs-Publish/TheOpenAbove`.
- [x] Read repo-local `.agent` state.
- [x] Read `README.md`, `package.json`, `src/main.js`, `src/data/campaign.config.js`, `src/hot-air-balloon-object-kit.js`, and `tests/smoke.mjs`.
- [x] Identified interaction loop.
- [x] Identified domains in use.
- [x] Identified services that kits offer.
- [x] Identified implemented, inline-candidate, and next-cut kits.
- [x] Updated root `.agent` files.
- [x] Added timestamped architecture, render, gameplay, route-source, and deploy audits.
- [x] Added timestamped turn ledger.
- [x] Updated central `LuminaryLabs-Dev/LuminaryLabs` ledger and change log.
- [x] Pushed only to `main`.

## Selection summary

The full accessible `LuminaryLabs-Publish` repo list was checked from the GitHub App installation:

```txt
LuminaryLabs-Publish/HorrorCorridor
LuminaryLabs-Publish/AetherVale
LuminaryLabs-Publish/TheOpenAbove
LuminaryLabs-Publish/TheCavalryOfRome
LuminaryLabs-Publish/PhantomCommand
LuminaryLabs-Publish/PrehistoricRush
LuminaryLabs-Publish/ZombieOrchard
LuminaryLabs-Publish/IntoTheMeadow
LuminaryLabs-Publish/MyCozyIsland
LuminaryLabs-Publish/TheUnmappedHouse
```

No checked non-Cavalry repo was fully new, missing from the ledger, undocumented, recently added but undocumented, or missing sampled root `.agent` state.

`TheCavalryOfRome` was excluded by rule.

`TheOpenAbove` was selected because its central ledger still pointed at `2026-07-09T11-50-08-04-00`, making it the oldest eligible documented-selection fallback after later central updates on `MyCozyIsland`, `AetherVale`, `TheUnmappedHouse`, `ZombieOrchard`, `PhantomCommand`, `HorrorCorridor`, `IntoTheMeadow`, and `PrehistoricRush`.

## Current product read

`TheOpenAbove` is currently a standalone Vite / Three.js hot-air-balloon drift route.

It imports Three.js from CDN and NexusEngine main from CDN.

The live route is Balloon Drift, not the older free-flight bird route still described by some durable copy/config surfaces.

## Interaction loop

```txt
index.html
  -> src/main.js imports Three.js CDN and NexusEngine main CDN
  -> CAMPAIGN/WORLD config and hot-air-balloon object kit load
  -> terrain, lakes, trees, clouds, wind ribbons, lights, camera, renderer, and balloon are created
  -> keyboard input maps Space/W/ArrowUp to burner and S/ArrowDown/Shift to vent
  -> wheel input changes camera zoom and first-person blend target
  -> update(dt) integrates wind angle, wind speed, burner, vent, vertical velocity, buoyancy, damping, ceiling softness, world position, altitude, and drift distance
  -> animateHotAirBalloon updates burner and rigging sub-kits
  -> NexusEngine telemetry kit publishes openAbove.balloonSnapshot and openAbove.balloonTicked
  -> draw(dt) resolves basket/third-person camera blend, rope fade, ride bob, sway, burner vibration, and first-person visibility
  -> renderer.render(scene, camera)
  -> HUD prints state summary
  -> window.GameHost.getState() exposes local and Nexus telemetry
```

## Domains in use

```txt
static-browser-shell
vite-static-publish
three-render-host
nexusengine-realtime-telemetry
campaign-config
legacy-flight-config
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
source-copy-authority
source-consumer-ledger
browser-consumer-fixture
central-ledger-sync
```

## Services that kits offer

```txt
open-above-balloon-telemetry-kit:
  NexusEngine resource definition
  NexusEngine event definition
  per-frame balloon snapshot publishing
  wind/altitude/burner tick event emission
  engine.openAbove.getState readback

open-above-hot-air-balloon-object-kit:
  procedural balloon object composition
  envelope panel assembly
  mouth assembly
  fitted streamer assembly
  fabric seam assembly
  basket assembly
  rigging assembly
  burner assembly
  rope/sub-kit metadata exposure
  browser global object-kit exposure
  compatibility attachment to older vehicle host shape
  burner and rigging animation pass

inline runtime services:
  terrainHeight sampling
  moistureAt sampling
  terrainColor projection
  terrain/lake/tree/cloud/wind-ribbon construction
  keyboard and wheel input capture
  burner/vent intent smoothing
  wind/buoyancy movement integration
  ground/ceiling safety clamp
  camera blend and first-person visibility
  HUD telemetry projection
  GameHost local/Nexus state projection
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

inline candidate:
  open-above-runtime-host-kit
  open-above-campaign-config-kit
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

next-cut proof kits:
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

`TheOpenAbove` should not start next with terrain, camera, HUD, balloon-model, or physics retuning.

The blocker is source/readback authority: the browser route is Balloon Drift, but README/package/campaign legacy surfaces still point at older free-flight semantics, and `window.GameHost.getState()` does not yet expose a source ledger proving which surface is canonical.

## Next safe ledge

```txt
TheOpenAbove Source Readback Ledger Catch-up + Browser Consumer Fixture Gate
```

## Files changed in this pass

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-09T14-50-21-04-00-source-readback-ledger-catchup-dsk-map.md
.agent/render-audit/2026-07-09T14-50-21-04-00-gamehost-source-readback-freeze.md
.agent/gameplay-audit/2026-07-09T14-50-21-04-00-balloon-drift-source-ledger-loop.md
.agent/route-source-audit/2026-07-09T14-50-21-04-00-product-runtime-compatibility-contract.md
.agent/deploy-audit/2026-07-09T14-50-21-04-00-source-fixture-build-gate.md
.agent/trackers/2026-07-09T14-50-21-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T14-50-21-04-00.md
```

## Validation

Documentation-only pass. Runtime source unchanged. No branch or PR created. No local npm/browser validation run. Updates pushed to `main`.
