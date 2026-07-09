# Project Breakdown — TheOpenAbove Source Manifest Consumer Freeze

**Timestamp:** `2026-07-09T03-29-29-04-00`

## Plan ledger

**Goal:** Compare the full `LuminaryLabs-Publish` repo list against central tracking, select one eligible repo, refresh repo-local internal docs, and log the result centrally.

**Checklist:**

- [x] Compared accessible `LuminaryLabs-Publish` repos.
- [x] Compared against `LuminaryLabs-Dev/LuminaryLabs` central repo ledger state.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo: `LuminaryLabs-Publish/TheOpenAbove`.
- [x] Identified interaction loop.
- [x] Identified domains in use.
- [x] Identified services offered by kits.
- [x] Identified implemented and next-cut kits.
- [x] Updated root `.agent` docs.
- [x] Added timestamped architecture, render, gameplay, route-source, deploy, tracker, and turn-ledger docs.
- [x] Updated `.agent/kit-registry.json`.
- [x] Updated central repo ledger in `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Added central internal change-log entry.
- [ ] Runtime source was not changed.
- [ ] Local npm/browser validation was not run.

## Repository selection

```txt
selected: LuminaryLabs-Publish/TheOpenAbove
reason: central ledger stale and oldest eligible against checked non-Cavalry repo set
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Publish repo comparison

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central alignment 2026-07-09T01-09-24-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central alignment 2026-07-09T02-50-39-04-00
LuminaryLabs-Publish/TheOpenAbove         selected / central stale at 2026-07-09T00-40-20-04-00 / repo-local 2026-07-09T03-20-01-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central alignment 2026-07-09T01-28-10-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central alignment 2026-07-09T03-00-46-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central alignment 2026-07-09T02-05-52-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central alignment 2026-07-09T00-50-00-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central alignment 2026-07-09T02-31-41-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central alignment 2026-07-09T02-11-07-04-00
```

## Interaction loop

```txt
open index.html
  -> canvas#game, #hud, #error mount
  -> src/main.js imports Three.js CDN, NexusEngine main CDN, CAMPAIGN, WORLD, and hot-air-balloon object kit
  -> createGame builds scene, fog, camera, renderer, lights, terrain, lakes, trees, clouds, wind ribbons, and balloon object
  -> keydown/keyup/blur/wheel handlers update input and camera zoom
  -> update(dt) integrates burner, vent, wind, buoyancy, altitude safety, velocity, position, and distance
  -> animateHotAirBalloon updates burner and rigging sub-kits
  -> engine.tick(dt) publishes NexusEngine balloon telemetry
  -> draw(dt) resolves camera blend, basket view, first-person visibility, rope fade, ride bob, ride sway, and burner vibration
  -> renderer.render(scene, camera)
  -> updateHud writes live telemetry
  -> window.GameHost.getState returns local and Nexus snapshots
```

## Domains in use

```txt
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
source-authority
central-ledger-sync
```

## Services the kits offer

```txt
open-above-balloon-telemetry-kit:
  defines openAbove.balloonSnapshot resource
  defines openAbove.balloonTicked event
  writes current snapshot into NexusEngine world resource
  emits altitude, windSpeed, and burner telemetry
  installs engine.openAbove.getState()

open-above-hot-air-balloon-object-kit:
  builds a composed procedural hot-air-balloon object
  composes envelope panels, mouth, streamers, seams, basket, rigging, burner, and rope sub-kits
  animates burner and rigging
  exposes installHotAirBalloonVisual compatibility helper
  exposes browser global OpenAboveHotAirBalloonObjectKit

inline services:
  terrainHeight
  moistureAt
  terrainColor
  makeTerrain
  makeLakes
  makeTrees
  makeClouds
  makeWindRibbons
  setMaterialOpacity
  setFirstPersonVisibility
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
  open-above-source-acceptance-result-kit
  open-above-source-acceptance-ledger-kit
  open-above-source-readback-ledger-kit
  open-above-gamehost-source-readback-kit
  open-above-browser-consumer-readback-kit
  open-above-dom-free-source-fixture-kit
  open-above-central-ledger-sync-kit
```

## Main finding

The live route is Balloon Drift, but source authority is still split. README and package metadata still say free-flight. `src/data/campaign.config.js` still carries thermals, gates, perch, and `FLIGHT` constants. `src/main.js` is the actual hot-air-balloon route source of truth, and `GameHost` still lacks additive `.source` diagnostics.

## Next safe ledge

```txt
TheOpenAbove Source Manifest Consumer Freeze + Central Ledger Catch-Up Fixture Gate
```

## Validation

```txt
runtime source changed: no
npm install: no
npm run check: no
npm run build: no
browser smoke: no
branch created: no
pull request created: no
pushed to main: yes
```
