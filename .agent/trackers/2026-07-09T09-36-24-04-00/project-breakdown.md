# Project Breakdown — TheOpenAbove

**Timestamp:** `2026-07-09T09-36-24-04-00`

## Goal

Refresh the repo-local internal docs for `LuminaryLabs-Publish/TheOpenAbove`, compare the current Publish org list against central tracking, and keep the next implementation constrained to the source/readback proof seam.

## Selection result

The accessible `LuminaryLabs-Publish` repo list was compared against `LuminaryLabs-Dev/LuminaryLabs` central tracking and sampled root `.agent/START_HERE.md` state.

No checked non-Cavalry repo was fully new, absent from the ledger, undocumented, recently added but undocumented, or missing sampled root `.agent` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by rule.

`TheOpenAbove` was selected as a central-ledger catch-up target because repo-local `.agent` state had advanced to `2026-07-09T09-29-24-04-00` while the central ledger still pointed at `2026-07-09T09-18-29-04-00` at read time.

## Publish repositories checked

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest observed 2026-07-09T06-28-53-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest observed 2026-07-09T07-05-52-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest observed 2026-07-09T08-50-00-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest observed 2026-07-09T07-41-29-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest observed 2026-07-09T08-02-33-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest observed 2026-07-09T08-29-38-04-00
LuminaryLabs-Publish/TheOpenAbove         selected / repo-local newer than central ledger
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest observed 2026-07-09T07-19-41-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest observed 2026-07-09T09-10-50-04-00
```

## Current product read

`TheOpenAbove` is a standalone Vite / Three.js hot-air-balloon drift route using NexusEngine main through CDN telemetry.

The visible route is `The Open Above: Balloon Drift`.

The durable source mismatch remains that `README.md`, `package.json`, and `src/data/campaign.config.js` still carry older free-flight / thermal / gate / perch language, while `index.html`, `src/main.js`, and `src/hot-air-balloon-object-kit.js` implement the active hot-air-balloon route.

## Interaction loop

```txt
open index.html
  -> canvas#game, #hud, #error mount
  -> src/main.js imports Three.js CDN, NexusEngine main CDN, CAMPAIGN, WORLD, and hot-air-balloon object kit
  -> seeded world helpers generate terrain, lakes, trees, clouds, and wind ribbons
  -> buildHotAirBalloon() composes envelope, mouth, streamers, seams, basket, rigging, burner, and rope sub-kits
  -> keyboard input maps Space/W/ArrowUp to burner lift
  -> keyboard input maps S/ArrowDown/Shift to vent descent
  -> wheel input mutates camera zoom and near-basket blend
  -> update(dt) integrates burner, vent, wind angle, wind speed, buoyancy, altitude damping, ceiling softness, velocity, position, altitude, and distance
  -> animateHotAirBalloon() updates burner and rigging sub-kits
  -> createBalloonEngine() publishes NexusEngine openAbove.balloonSnapshot and openAbove.balloonTicked telemetry
  -> draw(dt) resolves third-person camera, basket camera blend, first-person visibility, rope fade, ride bob, sway, and burner vibration
  -> renderer.render(scene, camera)
  -> HUD writes route status and telemetry
  -> window.GameHost.getState() exposes local and Nexus balloon telemetry
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

source/readback domains needed next:
  product-copy-authority
  package-description-parity
  readme-route-copy-parity
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

## Services that kits offer

```txt
open-above-balloon-telemetry-kit:
  define openAbove.balloonSnapshot resource
  define openAbove.balloonTicked event
  publish current snapshot to NexusEngine world resource
  emit altitude/wind/burner telemetry per tick
  install engine.openAbove.getState()

open-above-hot-air-balloon-object-kit:
  compose envelope, streamers, seams, mouth, basket, rigging, burner, and rope sub-kits
  build a procedural hot-air-balloon object
  expose browser global OpenAboveHotAirBalloonObjectKit
  retain compatibility wing/tail placeholders for older host attachment paths
  animate burner and rigging sub-kits

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

`TheOpenAbove` does not need new route content, terrain extraction, camera retuning, renderer extraction, or balloon visual changes next.

The highest-value blocker is source authority and readback: README/package/campaign/runtime/object-kit metadata, `GameHost.getState().source`, fixture rows, smoke/check wiring, repo-local `.agent`, and the central ledger need one consistent source consumer ledger.

## Next safe ledge

```txt
TheOpenAbove Source Readback Ledger Parity + GameHost Source Fixture Gate
```

## Validation note

This was a documentation and central tracking pass only. Runtime source files were read but not changed.