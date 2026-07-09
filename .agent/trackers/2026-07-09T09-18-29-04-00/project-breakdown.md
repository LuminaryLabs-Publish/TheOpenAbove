# Project Breakdown — TheOpenAbove

**Timestamp:** `2026-07-09T09-18-29-04-00`

## Selection

Selected repository:

```txt
LuminaryLabs-Publish/TheOpenAbove
```

Reason:

```txt
The accessible LuminaryLabs-Publish repo list was compared against central tracking and sampled root .agent state.
No checked non-Cavalry repo was new, central-ledger absent, missing .agent state, recently added but undocumented, or otherwise undocumented.
TheCavalryOfRome was excluded by rule.
TheOpenAbove was selected as the oldest eligible documented fallback after recent same-day catch-up passes.
```

## Publish organization repos checked

```txt
LuminaryLabs-Publish/IntoTheMeadow
LuminaryLabs-Publish/HorrorCorridor
LuminaryLabs-Publish/AetherVale
LuminaryLabs-Publish/ZombieOrchard
LuminaryLabs-Publish/TheUnmappedHouse
LuminaryLabs-Publish/MyCozyIsland
LuminaryLabs-Publish/TheOpenAbove
LuminaryLabs-Publish/PhantomCommand
LuminaryLabs-Publish/TheCavalryOfRome  excluded
LuminaryLabs-Publish/PrehistoricRush
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
camera-zoom-blend
basket-first-person-camera
first-person-visibility
hud-telemetry
gamehost-debug-state
product-copy-authority planned
source-consumer-ledger planned
gamehost-source-readback planned
```

## Services the kits offer

```txt
open-above-balloon-telemetry-kit:
  provides NexusEngine resource/event telemetry for balloon snapshot and tick events.

open-above-hot-air-balloon-object-kit:
  provides a composed hot-air-balloon object from sub-kits.

open-above-balloon-envelope-panel-kit:
  provides envelope panel geometry.

open-above-balloon-mouth-kit:
  provides open-bottom mouth geometry.

open-above-balloon-streamer-fit-kit:
  provides fitted streamers.

open-above-balloon-fabric-seam-kit:
  provides seam/panel line geometry.

open-above-hot-air-balloon-basket-kit:
  provides basket geometry.

open-above-hot-air-balloon-rigging-kit:
  provides rigging and animation.

open-above-hot-air-balloon-burner-kit:
  provides burner mesh and burner heat animation.

open-above-rope-kit:
  provides rope geometry for rigging.

planned source kits:
  provide product copy authority, source fingerprints, source snapshots, acceptance rows, source consumer ledger, GameHost source readback, and DOM-free source fixture proof.
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

inline candidates:
  open-above-world-generation-kit
  open-above-terrain-sampler-kit
  open-above-wind-field-kit
  open-above-balloon-drift-physics-kit
  open-above-camera-zoom-blend-kit
  open-above-basket-camera-kit
  open-above-hud-telemetry-kit

next cut:
  open-above-product-copy-authority-kit
  open-above-package-description-parity-kit
  open-above-campaign-current-route-authority-kit
  open-above-legacy-flight-compatibility-kit
  open-above-balloon-drift-config-kit
  open-above-source-consumer-manifest-kit
  open-above-source-fingerprint-kit
  open-above-source-snapshot-kit
  open-above-source-acceptance-ledger-kit
  open-above-source-consumer-ledger-kit
  open-above-gamehost-source-readback-kit
  open-above-dom-free-source-fixture-kit
```

## Findings

```txt
The live route is Balloon Drift.
The package description still says standalone free-flight exploration.
The campaign config still includes thermal/gate/perch/FLIGHT legacy fields.
src/main.js is the live authority for burner/vent/wind/buoyancy/camera/HUD/GameHost behavior.
src/hot-air-balloon-object-kit.js is the live authority for object-kit and sub-kit metadata.
GameHost.getState().source is missing.
```

## Next safe ledge

```txt
TheOpenAbove Source Consumer Ledger Fixture Freeze + GameHost Source Readback Gate
```

## Files updated or added

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-09T09-18-29-04-00-source-consumer-ledger-fixture-freeze-dsk-map.md
.agent/render-audit/2026-07-09T09-18-29-04-00-gamehost-source-readback-freeze.md
.agent/gameplay-audit/2026-07-09T09-18-29-04-00-balloon-drift-source-consumer-loop.md
.agent/route-source-audit/2026-07-09T09-18-29-04-00-fixture-freeze-contract.md
.agent/deploy-audit/2026-07-09T09-18-29-04-00-check-build-source-fixture-map.md
.agent/trackers/2026-07-09T09-18-29-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T09-18-29-04-00.md
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
