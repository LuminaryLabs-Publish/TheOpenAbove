# Project Breakdown: TheOpenAbove

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Timestamp:** `2026-07-09T19-21-19-04-00`

## Selection

The current public `LuminaryLabs-Publish` organization repo list was checked and compared against `LuminaryLabs-Dev/LuminaryLabs` central ledger recency plus sampled root `.agent` state.

```txt
MyCozyIsland         tracked / newer central state
TheUnmappedHouse     tracked / newer central state
ZombieOrchard        tracked / newer central state
PhantomCommand       tracked / newer central state
HorrorCorridor       tracked / newer central state
PrehistoricRush      tracked / newer central state
IntoTheMeadow        tracked / newer central state
TheCavalryOfRome     excluded by rule
TheOpenAbove         selected / oldest eligible documented fallback
```

No checked non-Cavalry repo was new, central-ledger absent, missing sampled root `.agent`, recently added but undocumented, or otherwise undocumented. `TheOpenAbove` was selected as the oldest eligible documented fallback.

## Current product surface

```txt
index.html
  -> canvas#game and #hud
  -> ./src/main.js
  -> Three.js 0.165.0 CDN
  -> NexusEngine main CDN
  -> CAMPAIGN/WORLD from src/data/campaign.config.js
  -> buildHotAirBalloon and animateHotAirBalloon
  -> inline terrain/lake/tree/cloud/wind-ribbon generation
  -> inline balloon drift simulation
  -> inline camera/HUD projection
  -> window.GameHost.getState()
```

## Current interaction loop

```txt
open index.html
  -> src/main.js imports Three.js, NexusEngine, CAMPAIGN, WORLD, and hot-air-balloon object kit
  -> createGame() creates scene, fog, camera, renderer, lights
  -> makeTerrain, makeLakes, makeTrees, makeClouds, and makeWindRibbons build inline world visuals
  -> buildHotAirBalloon() composes envelope, rigging, basket, burner, and rope sub-kits
  -> keydown/keyup/blur and wheel handlers mutate input and camera zoom state
  -> Space/W/ArrowUp maps to burner lift
  -> S/ArrowDown/Shift maps to vent descent
  -> update(dt) integrates burner, vent, wind angle/speed, buoyancy, damping, ceiling softness, velocity, position, altitude, and distance
  -> animateHotAirBalloon updates burner and rigging sub-kits
  -> NexusEngine telemetry kit publishes openAbove.balloonSnapshot and openAbove.balloonTicked
  -> draw(dt) resolves third-person/basket camera blend, first-person visibility, rope fade, ride bob, sway, and burner vibration
  -> renderer.render(scene, camera)
  -> HUD writes route status and telemetry
  -> window.GameHost.getState() exposes local and Nexus balloon telemetry
```

## Domains in use

### Source-backed domains

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
```

### Inline runtime domains

```txt
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
```

### Missing proof/readback domains

```txt
product-copy-authority
readme-route-copy-parity
package-description-parity
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

## Kit services

```txt
open-above-balloon-telemetry-kit:
  defines openAbove.balloonSnapshot resource
  defines openAbove.balloonTicked event
  writes the current snapshot into NexusEngine world resource
  emits altitude, wind speed, and burner telemetry per tick
  installs engine.openAbove.getState()

open-above-hot-air-balloon-object-kit:
  composes envelope, streamers, seams, mouth, basket, rigging, burner, and rope sub-kits
  builds procedural hot-air-balloon object
  exposes browser global OpenAboveHotAirBalloonObjectKit
  retains compatibility wing/tail placeholders for old host attachment path
  animates burner and rigging sub-kits

open-above-rope-kit:
  computes sagging tube points between endpoints
  builds tube geometry and stripe markers
  updates rope mesh over time for sway

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
  setFirstPersonVisibility
  snapshot
  update
  draw
  updateHud
  GameHost.getState
```

## Kits identified

### Implemented kits

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

### Inline candidate kits

```txt
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
```

### Next-cut source/readback kits

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

## Main finding

`TheOpenAbove` should not start next with renderer extraction, terrain extraction, camera retuning, balloon visual changes, or route expansion. The blocker is still source/readback authority: README, package metadata, campaign config, runtime constants, object-kit metadata, smoke checks, GameHost diagnostics, repo-local `.agent`, and central ledger need one source-consumer ledger.

## Next safe ledge

```txt
TheOpenAbove Source Ledger Central Refresh + Browser Consumer Fixture Gate
```

## Validation

Documentation-only pass. Runtime source was not changed, no branch or PR was created, and no npm/build/browser/source fixture validation was run.