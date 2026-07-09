# Project Breakdown — TheOpenAbove

**Timestamp:** `2026-07-09T06-20-00-04-00`

## Goal

Refresh the internal docs for one eligible `LuminaryLabs-Publish` repo after comparing the Publish repo list against the central ledger in `LuminaryLabs-Dev/LuminaryLabs`.

## Plan ledger

- [x] Compare accessible `LuminaryLabs-Publish` repo list against central tracking.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Select one repo only.
- [x] Read repo-local `.agent` state.
- [x] Read source files relevant to the route.
- [x] Identify interaction loop.
- [x] Identify domains in use.
- [x] Identify services offered by kits.
- [x] Identify implemented, inline, and next-cut kits.
- [x] Update root `.agent` docs.
- [x] Add timestamped tracker and turn-ledger entry.
- [x] Add architecture, render, gameplay, route-source, and deploy audits.
- [x] Update kit registry.
- [x] Update central repo ledger.
- [x] Add central internal change-log entry.
- [ ] Runtime source edited.
- [ ] Local npm validation run.
- [ ] Browser validation run.

## Repo selected

```txt
LuminaryLabs-Publish/TheOpenAbove
```

## Selection reason

No checked non-Cavalry Publish repo was new, absent from the central ledger, missing root `.agent` state, recently added but undocumented, or otherwise undocumented.

`TheOpenAbove` was selected as the oldest eligible documented fallback after same-day catch-up passes.

## Publish repo comparison

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T04-30-54-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T05-51-49-04-00
LuminaryLabs-Publish/TheOpenAbove         selected / oldest eligible central ledger alignment before this pass
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T04-50-00-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T06-10-35-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T05-11-22-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T03-50-12-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T05-30-27-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T05-20-42-04-00
```

## Interaction loop

```txt
open index.html
  -> canvas / HUD / error panel are captured
  -> src/main.js imports Three.js and NexusEngine from CDN
  -> CAMPAIGN/WORLD config and hot-air-balloon object kit are imported
  -> terrain / lakes / trees / clouds / wind ribbons are generated
  -> buildHotAirBalloon creates the balloon visual assembly
  -> keyboard controls map to burner and vent intent
  -> mouse wheel maps to camera zoom / basket blend
  -> update(dt) integrates wind, buoyancy, altitude, velocity, position, and distance
  -> animateHotAirBalloon updates burner and rigging animation
  -> NexusEngine telemetry kit writes balloon snapshot and tick event
  -> draw(dt) blends third-person / first-person basket camera and renders the frame
  -> HUD projects route status and telemetry
  -> GameHost exposes local and NexusEngine balloon telemetry
```

## Domains in use

```txt
static browser shell
Vite static publish
Three.js render host
NexusEngine Realtime Core telemetry
hot-air-balloon visual object
balloon envelope panel
balloon mouth
balloon streamer fit
balloon fabric seam
basket object
rigging object
burner object
rope object
terrain sampling
world generation
lake generation
tree scatter
cloud scatter
wind ribbon rendering
balloon input map
burner / vent intent
wind field
buoyancy integration
altitude safety
camera zoom blend
basket first-person camera
HUD telemetry
GameHost debug state
source consumer ledger
central ledger sync
```

## Services kits offer

```txt
open-above-balloon-telemetry-kit:
  resource publication
  tick event emission
  NexusEngine world state write
  engine.openAbove.getState readback

open-above-hot-air-balloon-object-kit:
  procedural balloon object construction
  envelope / mouth / streamer / seam / basket / rigging / burner composition
  animation entrypoint
  legacy wing/tail compatibility controls
  browser global export

next-cut source kits:
  product/source manifest
  consumer ledger
  source fingerprint
  source snapshot
  acceptance rows
  source readback projection
  DOM-free fixture proof
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
  open-above-three-render-host-kit
  open-above-terrain-sampler-kit
  open-above-world-generation-kit
  open-above-lake-generation-kit
  open-above-tree-scatter-kit
  open-above-cloud-scatter-kit
  open-above-wind-ribbon-render-kit
  open-above-balloon-drift-physics-kit
  open-above-camera-zoom-blend-kit
  open-above-hud-telemetry-kit

next-cut:
  open-above-source-consumer-manifest-kit
  open-above-source-consumer-record-kit
  open-above-source-consumer-ledger-kit
  open-above-gamehost-source-readback-kit
  open-above-dom-free-source-fixture-kit
```

## Main finding

The runtime should stay stable. The product/source layer should be made fixture-readable first because the visible route is Balloon Drift while durable source files still contain legacy free-flight route language.

## Next safe ledge

```txt
TheOpenAbove Source Consumer Ledger Refresh + DOM-Free Fixture Gate
```

## Files updated in this repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-09T06-20-00-04-00-source-consumer-ledger-refresh-dsk-map.md
.agent/render-audit/2026-07-09T06-20-00-04-00-gamehost-source-consumer-readback.md
.agent/gameplay-audit/2026-07-09T06-20-00-04-00-balloon-drift-source-ledger-loop.md
.agent/route-source-audit/2026-07-09T06-20-00-04-00-consumer-ledger-refresh-contract.md
.agent/deploy-audit/2026-07-09T06-20-00-04-00-dom-free-fixture-check-map.md
.agent/trackers/2026-07-09T06-20-00-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T06-20-00-04-00.md
```

## Validation

```txt
runtime source changed: no
local npm run check: no
npm run build: no
browser smoke: no
branch created: no
pull request created: no
pushed to main: yes
```
