# Project Breakdown — TheOpenAbove

**Timestamp:** `2026-07-09T14-58-42-04-00`

## Selection

`LuminaryLabs-Publish/TheOpenAbove` was selected after comparing the full accessible `LuminaryLabs-Publish` repository list against the central `LuminaryLabs-Dev/LuminaryLabs` ledger and sampled root `.agent/START_HERE.md` files.

No checked non-Cavalry repo was new, missing from the central ledger, missing root `.agent` state, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` was excluded by rule.

`TheOpenAbove` was the oldest eligible central-ledger fallback: repo-local `.agent` had advanced to `2026-07-09T14-50-21-04-00`, while the central ledger still pointed to `2026-07-09T11-50-08-04-00`.

## Publish repo comparison

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest observed 2026-07-09T12-08-46-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest observed 2026-07-09T12-30-09-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest observed 2026-07-09T14-16-00-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest observed 2026-07-09T13-18-48-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest observed 2026-07-09T13-38-15-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest observed 2026-07-09T14-39-07-04-00
LuminaryLabs-Publish/TheOpenAbove         selected / oldest central-ledger fallback / repo-local ahead of central
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest observed 2026-07-09T13-00-37-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest observed 2026-07-09T12-00-36-04-00
```

## Interaction loop

```txt
index.html
  -> canvas#game, #hud, #error
  -> src/main.js imports Three.js CDN and NexusEngine main CDN
  -> campaign config and hot-air-balloon object kit load
  -> createGame()
  -> terrain, lakes, trees, clouds, and wind ribbons are generated inline
  -> buildHotAirBalloon() composes envelope, mouth, streamers, seams, basket, rigging, burner, and rope
  -> keydown/keyup/blur/wheel update input and camera zoom state
  -> update(dt) resolves burner, vent, wind, buoyancy, altitude floor/ceiling, velocity, position, and distance
  -> NexusEngine telemetry kit writes openAbove.balloonSnapshot and emits openAbove.balloonTicked
  -> draw(dt) blends third-person camera and basket view, fades ropes, adds bob/sway/vibration, and renders Three.js
  -> HUD writes route telemetry
  -> window.GameHost.getState() returns local and Nexus telemetry
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
ceiling-softness
camera-zoom-blend
basket-first-person-camera
first-person-visibility
hud-telemetry
gamehost-debug-state
product-copy-authority-next
source-consumer-ledger-next
gamehost-source-readback-next
central-ledger-sync
```

## Kit services

```txt
open-above-balloon-telemetry-kit:
  define openAbove.balloonSnapshot resource
  define openAbove.balloonTicked event
  publish snapshot to NexusEngine world
  emit tick telemetry
  install engine.openAbove.getState()

open-above-hot-air-balloon-object-kit:
  compose balloon envelope, mouth, streamers, seams, basket, rigging, burner, and rope sub-kits
  build procedural hot-air-balloon visual object
  retain old vehicle attachment compatibility controls
  expose OpenAboveHotAirBalloonObjectKit
  animate burner and rigging

inline runtime services:
  seeded terrain and scatter generation
  burner/vent input interpretation
  balloon drift integration
  camera blend and first-person visibility
  HUD projection
  GameHost diagnostics
```

## Kits

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

inline candidates:
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
  open-above-product-copy-authority-kit
  open-above-readme-route-copy-parity-kit
  open-above-package-description-parity-kit
  open-above-campaign-current-route-authority-kit
  open-above-legacy-flight-compatibility-kit
  open-above-balloon-drift-config-kit
  open-above-source-consumer-manifest-kit
  open-above-balloon-source-fingerprint-kit
  open-above-balloon-source-snapshot-kit
  open-above-source-consumer-ledger-kit
  open-above-gamehost-source-readback-kit
  open-above-dom-free-source-fixture-kit
  open-above-central-ledger-sync-kit
```

## Main finding

Do not start with renderer extraction, terrain extraction, route progression, visual retuning, or object-kit changes. The source-of-truth seam is still the blocker: README/package/campaign config still describe older free-flight behavior, while `index.html`, `src/main.js`, and `src/hot-air-balloon-object-kit.js` define the current Balloon Drift product.

## Next safe ledge

```txt
TheOpenAbove Source Readback Ledger Central Sync + Browser Consumer Fixture Gate
```

## Validation

```txt
runtime source changed: no
npm run check: not run
npm run build: not run
browser route check: not run
branch created: no
pull request created: no
```
