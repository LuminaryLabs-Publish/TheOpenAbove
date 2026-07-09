# Project Breakdown — TheOpenAbove

**Timestamp:** `2026-07-09T00-40-20-04-00`

## Goal

Compare `LuminaryLabs-Publish` against central tracking, select one eligible repo, and update repo-local plus central docs without changing runtime source.

## Checklist

- [x] Compared accessible Publish repo list.
- [x] Excluded `TheCavalryOfRome`.
- [x] Compared central ledger timestamps.
- [x] Selected one repo only: `TheOpenAbove`.
- [x] Read repo-local `.agent` docs.
- [x] Read README/package/config/runtime/object-kit/smoke files.
- [x] Identified interaction loop.
- [x] Identified domains in use.
- [x] Identified services that kits offer.
- [x] Identified implemented, inline, and next-cut kits.
- [x] Updated root `.agent` docs.
- [x] Added timestamped tracker and turn ledger.
- [x] Added architecture, render, gameplay, route-source, and deploy audits.
- [x] Updated kit registry.
- [x] Updated central repo ledger.
- [x] Added central internal change-log entry.
- [x] Pushed only to `main`.

## Selection

`TheOpenAbove` was selected after comparing the Publish repo list against central tracking. No non-Cavalry repo was new, absent, undocumented, recently added but undocumented, or missing sampled root `.agent` state.

The central `TheOpenAbove` ledger still pointed at `2026-07-08T22-19-38-04-00`, while repo-local docs had advanced to the source-module consumer splice queue. This pass records a sharper implementation boundary: source readback ledger splice plus browser consumer fixture rows.

## Publish repository comparison

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central alignment 2026-07-08T22-51-43-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central alignment 2026-07-09T00-00-41-04-00
LuminaryLabs-Publish/TheOpenAbove         selected / central ledger stale at 2026-07-08T22-19-38-04-00 / repo-local queue present
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central alignment 2026-07-08T22-58-02-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central alignment 2026-07-09T00-09-22-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central alignment 2026-07-08T23-40-55-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central alignment 2026-07-08T22-38-17-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central alignment 2026-07-09T00-20-08-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central alignment 2026-07-08T23-19-33-04-00
```

## Interaction loop

```txt
open index.html
  -> canvas and HUD mount
  -> src/main.js imports Three.js CDN, NexusEngine main CDN, CAMPAIGN, WORLD, and hot-air-balloon object kit
  -> terrain, lakes, trees, clouds, wind ribbons, and balloon visual object are created
  -> Space / W / ArrowUp maps to burner lift
  -> S / ArrowDown / Shift maps to vent descent
  -> wheel mutates camera zoom and near-basket blend
  -> update(dt) integrates burner, vent, wind angle, wind speed, buoyancy, damping, ceiling softness, velocity, position, altitude, and distance
  -> animateHotAirBalloon updates burner and rigging sub-kits
  -> Nexus telemetry kit publishes balloon resource and tick event
  -> draw(dt) resolves third-person/basket camera, first-person visibility, rope fade, ride bob, sway, and burner vibration
  -> Three.js renders the frame
  -> HUD writes route status and telemetry
  -> window.GameHost.getState() exposes local and Nexus balloon telemetry
```

## Domains in use

```txt
static-browser-shell
vite-static-publish
three-render-host
nexusengine-realtime-telemetry
terrain-height-sampling
moisture-map
terrain-coloring
lake-placement
tree-scatter
cloud-scatter
wind-ribbon-rendering
hot-air-balloon-object
balloon-envelope-panel
balloon-mouth
balloon-streamer-fit
balloon-fabric-seam
basket-object
rigging-object
burner-object
rope-object
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
```

## Kit services

```txt
open-above-balloon-telemetry-kit:
  define resource/event names
  write snapshot into NexusEngine resource
  emit balloon tick telemetry
  install engine.openAbove.getState()

open-above-hot-air-balloon-object-kit:
  compose envelope/mouth/streamer/seam/basket/rigging/burner/rope kits
  build procedural balloon group
  expose OpenAboveHotAirBalloonObjectKit global
  animate burner and rigging sub-parts

inline runtime services:
  terrainHeight, moistureAt, terrainColor, makeTerrain, makeLakes, makeTrees, makeClouds, makeWindRibbons, snapshot, update, draw, updateHud, GameHost.getState
```

## Kits

```txt
implemented/source-backed:
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
  open-above-three-render-host-kit
  open-above-balloon-input-map-kit
  open-above-balloon-drift-physics-kit
  open-above-wind-field-kit
  open-above-basket-follow-camera-kit
  open-above-hud-telemetry-kit

next-cut proof kits:
  open-above-product-copy-authority-kit
  open-above-balloon-drift-config-kit
  open-above-source-manifest-kit
  open-above-source-fingerprint-kit
  open-above-source-snapshot-kit
  open-above-source-acceptance-ledger-kit
  open-above-source-readback-ledger-kit
  open-above-gamehost-source-readback-kit
  open-above-browser-consumer-readback-kit
  open-above-dom-free-source-fixture-kit
```

## Main finding

The active runtime is already a coherent hot-air-balloon drift experience. The weak seam is source authority: older product/config copy still describes free-flight bird mechanics while `src/main.js` owns the actual balloon route.

The next implementation should add pure source/readback modules and fixture rows before any visual extraction or physics tuning.

## Validation

```txt
runtime source changed: no
local npm run check: no
local npm run build: no
browser smoke: no
fixture run: no, source fixture files do not exist yet
branch created: no
pull request created: no
pushed to main: yes
```

## Next safe ledge

```txt
TheOpenAbove Source Readback Ledger Splice + Browser Consumer Fixture Gate
```
