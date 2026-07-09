# Project Breakdown — TheOpenAbove

**Timestamp:** `2026-07-09T11-50-08-04-00`

## Goal

Refresh repo-local internal docs for one eligible Publish repo, identify interaction loop/domains/services/kits, and keep central LuminaryLabs tracking aligned.

## Checklist

- [x] Compared the accessible `LuminaryLabs-Publish` repo list.
- [x] Compared checked repos against `LuminaryLabs-Dev/LuminaryLabs` repo-ledger state.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected exactly one repo: `LuminaryLabs-Publish/TheOpenAbove`.
- [x] Identified the current interaction loop.
- [x] Identified domains in use.
- [x] Identified services offered by kits.
- [x] Identified implemented, inline, and next-cut kits.
- [x] Updated required root `.agent` docs.
- [x] Added timestamped architecture/render/gameplay/route-source/deploy audits.
- [x] Added timestamped turn ledger.
- [x] Updated repo-local kit registry.
- [x] Updated central `LuminaryLabs-Dev/LuminaryLabs` ledger and change log.
- [x] Pushed only to `main`.

## Selection result

No checked non-Cavalry Publish repo was new, central-ledger absent, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

A concurrent `PrehistoricRush` docs refresh advanced that repo during this run. `TheOpenAbove` was then selected as the oldest eligible source-readback fallback, with central tracking still at `2026-07-09T09-36-24-04-00` before this pass.

## Interaction loop

```txt
open index.html
  -> src/main.js imports Three.js CDN, NexusEngine main CDN, CAMPAIGN/WORLD, and hot-air-balloon object kit
  -> creates terrain, lakes, trees, clouds, wind ribbons, scene, camera, renderer, and balloon object
  -> keydown/keyup/blur/wheel update burner/vent/camera intent
  -> update(dt) integrates wind, buoyancy, damping, ceiling, velocity, position, altitude, and distance
  -> animateHotAirBalloon updates burner and rigging sub-kits
  -> engine.tick(dt) publishes Nexus balloon telemetry
  -> draw(dt) blends third-person and basket camera, rope fade, ride bob/sway, burner vibration, and visibility
  -> renderer.render(scene, camera)
  -> updateHud writes text telemetry
  -> window.GameHost.getState() exposes local and Nexus telemetry
```

## Domains in use

```txt
static-browser-shell
vite-static-publish
three-render-host
nexusengine-realtime-telemetry
hot-air-balloon-object
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
source-consumer-ledger-planning
central-ledger-sync
```

## Services offered by kits

```txt
open-above-balloon-telemetry-kit:
  - defines openAbove.balloonSnapshot resource
  - defines openAbove.balloonTicked event
  - publishes snapshot to NexusEngine world
  - emits altitude/wind/burner tick event
  - installs engine.openAbove.getState()

open-above-hot-air-balloon-object-kit:
  - composes procedural balloon object
  - builds envelope, streamer, seam, mouth, basket, rigging, burner, and rope parts
  - exposes object metadata/global for browser inspection
  - animates burner and rigging

inline runtime services:
  - terrainHeight / moistureAt / terrainColor
  - makeTerrain / makeLakes / makeTrees / makeClouds / makeWindRibbons
  - setFirstPersonVisibility
  - snapshot / update / draw / updateHud
  - window.GameHost.getState
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

next-cut:
  open-above-source-consumer-manifest-kit
  open-above-balloon-source-fingerprint-kit
  open-above-balloon-source-snapshot-kit
  open-above-source-acceptance-ledger-kit
  open-above-source-consumer-ledger-kit
  open-above-gamehost-source-readback-kit
  open-above-dom-free-source-fixture-kit
  open-above-central-ledger-sync-kit
```

## Main finding

`TheOpenAbove` should not start with terrain/render/camera/HUD extraction. The durable blocker is source authority: current Balloon Drift behavior lives in `src/main.js`, while README/package/campaign remnants still describe older free-flight gameplay. Add source consumer ledger and GameHost source readback first.

## Next safe ledge

```txt
TheOpenAbove Source Consumer Ledger + GameHost Source Readback Fixture Gate
```

## Validation

Documentation-only. No runtime source changed, no branch was created, no PR was created, no local build/check/browser smoke ran, and changes were pushed to `main`.
