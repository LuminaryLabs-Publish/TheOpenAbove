# Project Breakdown — TheOpenAbove

**Timestamp:** `2026-07-09T03-20-01-04-00`

## Goal

Break down `LuminaryLabs-Publish/TheOpenAbove`, refresh repo-local `.agent` documentation, identify interaction loop/domains/services/kits, and log the result centrally in `LuminaryLabs-Dev/LuminaryLabs`.

## Selection checklist

- [x] Listed accessible `LuminaryLabs-Publish` repositories.
- [x] Compared checked repos against `LuminaryLabs-Dev/LuminaryLabs` repo ledger.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirmed no checked non-Cavalry repo was new, central-ledger absent, undocumented, recently added but undocumented, or missing sampled root `.agent` state.
- [x] Selected one repo only: `LuminaryLabs-Publish/TheOpenAbove`.
- [x] Selected by oldest eligible central alignment fallback.

## Publish repo comparison

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central alignment 2026-07-09T01-09-24-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central alignment 2026-07-09T02-50-39-04-00
LuminaryLabs-Publish/TheOpenAbove         selected / oldest eligible central alignment 2026-07-09T00-40-20-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central alignment 2026-07-09T01-28-10-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central alignment 2026-07-09T03-00-46-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central alignment 2026-07-09T02-05-52-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central alignment 2026-07-09T00-50-00-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central alignment 2026-07-09T02-31-41-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central alignment 2026-07-09T02-11-07-04-00
```

## Product read

`TheOpenAbove` is currently a hot-air-balloon drift route, not the older free-flight route still described by parts of the durable product/source docs.

```txt
accurate current route:
  index.html
  src/main.js
  src/hot-air-balloon-object-kit.js
  tests/smoke.mjs route/object-kit assertions

stale or compatibility-oriented source:
  README.md
  package.json description
  src/data/campaign.config.js CAMPAIGN/WORLD/FLIGHT copy
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
shell:
  static browser shell
  Vite static publish
  GitHub Pages deploy

render:
  Three.js render host
  terrain mesh
  lakes
  tree scatter
  cloud scatter
  wind ribbon lines
  balloon object render
  first-person visibility
  HUD projection

runtime:
  keyboard input
  wheel camera zoom
  burner intent
  vent intent
  wind field
  buoyancy integration
  altitude safety
  distance tracking
  NexusEngine telemetry
  GameHost state

object:
  hot-air-balloon object
  envelope panels
  balloon mouth
  streamer fit
  fabric seams
  basket
  rigging
  burner
  rope

source/readback:
  product copy authority
  route identity
  legacy flight compatibility
  source manifest
  source fingerprint
  source snapshot
  source acceptance ledger
  GameHost source projection
```

## Services the kits offer

```txt
open-above-balloon-telemetry-kit:
  define openAbove.balloonSnapshot resource
  define openAbove.balloonTicked event
  write the current snapshot into NexusEngine
  expose engine.openAbove.getState()

open-above-hot-air-balloon-object-kit:
  build the composed balloon object
  animate burner and rigging
  install the balloon into a compatible host scene
  expose browser global object-kit metadata

sub-object kits:
  construct the envelope panels, mouth, streamers, seams, basket, rigging, burner, and rope
  expose default profiles for procedural assembly

inline runtime services:
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

next-cut:
  open-above-product-copy-authority-kit
  open-above-balloon-drift-config-kit
  open-above-source-manifest-kit
  open-above-balloon-source-fingerprint-kit
  open-above-balloon-source-snapshot-kit
  open-above-source-acceptance-ledger-kit
  open-above-source-readback-ledger-kit
  open-above-gamehost-source-readback-kit
  open-above-browser-consumer-readback-kit
  open-above-dom-free-source-fixture-kit
```

## Main finding

Do not rewrite the route yet. The live browser route already has the right visible product, controls, balloon object, telemetry, basket camera, and smoke coverage. The blocker is source authority: README, package metadata, campaign config, runtime defaults, object-kit metadata, fixture rows, and `GameHost.getState().source` need one readback ledger.

## Next safe ledge

```txt
TheOpenAbove Source Authority Ledger Freeze + GameHost Browser Consumer Fixture Gate
```

## Files changed in this repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-09T03-20-01-04-00-source-authority-ledger-freeze-dsk-map.md
.agent/render-audit/2026-07-09T03-20-01-04-00-gamehost-source-projection-readback.md
.agent/gameplay-audit/2026-07-09T03-20-01-04-00-balloon-drift-source-consumer-loop.md
.agent/route-source-audit/2026-07-09T03-20-01-04-00-product-config-parity-contract.md
.agent/deploy-audit/2026-07-09T03-20-01-04-00-source-fixture-check-gate.md
.agent/trackers/2026-07-09T03-20-01-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T03-20-01-04-00.md
```

## Validation status

```txt
runtime source edit: no
npm install: no
npm run check: no
npm run build: no
browser smoke: no
branch created: no
pull request created: no
```
