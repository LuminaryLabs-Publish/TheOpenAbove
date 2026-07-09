# Project Breakdown — TheOpenAbove

**Timestamp:** `2026-07-09T15-09-09-04-00`

## Goal

Refresh repo-local and central internal docs for `LuminaryLabs-Publish/TheOpenAbove`, keep the work on `main`, and document the next implementation ledge without changing runtime behavior.

## Selection ledger

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present
LuminaryLabs-Publish/AetherVale           tracked / root .agent present
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present
LuminaryLabs-Publish/TheOpenAbove         selected / repo-local .agent ahead of central ledger
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present
```

No checked non-Cavalry Publish repo was fully new, missing from the central ledger, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

`TheOpenAbove` was selected because the repo-local `.agent` pointer was already at `2026-07-09T14-58-42-04-00`, while the central ledger still pointed to `2026-07-09T14-50-21-04-00`.

## Product read

`TheOpenAbove` is currently a hot-air-balloon wind-drift route.

The live source says:

```txt
index.html title/meta: The Open Above: Balloon Drift
src/main.js: burner/vent/wind/altitude/basket-camera Balloon Drift runtime
src/hot-air-balloon-object-kit.js: hot-air-balloon object kit and sub-kit composition
```

The stale durable source says:

```txt
README.md: free-flight carving/gliding/diving/boosting
package.json: standalone free-flight exploration
src/data/campaign.config.js: thermal/gate/perch/start speed and legacy FLIGHT fields
```

## Current interaction loop

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
balloon-snapshot-resource
balloon-tick-event
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
repo-local-agent-memory
central-repo-ledger-sync
```

## Services that kits offer

```txt
open-above-balloon-telemetry-kit:
  define balloon snapshot resource
  define balloon tick event
  publish latest local snapshot into NexusEngine world resource
  emit altitude/wind/burner telemetry per simulation tick
  install engine.openAbove.getState()

open-above-hot-air-balloon-object-kit:
  compose envelope panel, mouth, streamer, seam, basket, rigging, burner, and rope sub-kits
  build a procedural hot-air-balloon Three.js group
  expose object-kit id and profile through browser global
  animate burner and rigging sub-kits
  preserve old vehicle-attachment compatibility controls

inline runtime services:
  seeded deterministic random
  terrainHeight sampler
  moistureAt sampler
  terrainColor mapper
  terrain/lake/tree/cloud/wind-ribbon object creation
  key/wheel input capture
  burner/vent state smoothing
  wind-field update
  buoyancy integration
  altitude floor/ceiling handling
  basket camera blend
  first-person rope/envelope visibility handling
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

inline candidates:
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

next-cut:
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

Do not start with renderer extraction, terrain extraction, balloon visual changes, camera retuning, or route expansion.

The active blocker is source authority: product copy, package metadata, campaign config, inline runtime defaults, object-kit metadata, smoke checks, GameHost diagnostics, repo-local `.agent` docs, and central tracking need one source consumer ledger.

## Next safe ledge

```txt
TheOpenAbove Source Ledger Repair + Browser Consumer Fixture Gate
```

## Files updated this pass

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
```

## Files added this pass

```txt
.agent/trackers/2026-07-09T15-09-09-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T15-09-09-04-00.md
.agent/architecture-audit/2026-07-09T15-09-09-04-00-source-ledger-repair-dsk-map.md
.agent/render-audit/2026-07-09T15-09-09-04-00-gamehost-source-readback-central-sync.md
.agent/gameplay-audit/2026-07-09T15-09-09-04-00-balloon-drift-source-authority-loop.md
.agent/route-source-audit/2026-07-09T15-09-09-04-00-product-runtime-source-parity-contract.md
.agent/deploy-audit/2026-07-09T15-09-09-04-00-source-fixture-central-ledger-gate.md
```

## Validation

Documentation-only. Runtime source unchanged. No local npm, build, browser, Pages, or source fixture validation was run. No branch or PR was created.
