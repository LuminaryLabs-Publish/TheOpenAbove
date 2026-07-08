# Project Breakdown — TheOpenAbove

**Timestamp:** `2026-07-08T03:21:22-04:00`

## Plan ledger

**Goal:** Materialize the missing root `.agent/` operating docs for `LuminaryLabs-Publish/TheOpenAbove` and preserve the next implementation ledge around balloon-drift source authority.

## Checklist

- [x] Compared accessible `LuminaryLabs-Publish` repo list against central ledger state.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo only: `LuminaryLabs-Publish/TheOpenAbove`.
- [x] Confirmed central ledger already referenced `.agent` paths for this repo.
- [x] Confirmed root `.agent/START_HERE.md` was missing in the publish repo.
- [x] Read README, package, route, source, config, and balloon object kit files.
- [x] Identified interaction loop.
- [x] Identified domains in use.
- [x] Identified kit services.
- [x] Identified kits.
- [x] Added required root `.agent` docs.
- [x] Added render and gameplay audit folders.
- [x] Added validation ledger.
- [x] Added central change log and updated central repo ledger.
- [ ] Runtime implementation not changed.
- [ ] Local validation not run.

## Repo selected

```txt
LuminaryLabs-Publish/TheOpenAbove
```

## Selection reason

The repo was selected because the central ledger already documented `TheOpenAbove` and referenced `.agent` tracker paths, but the actual publish repo was missing root `.agent/START_HERE.md` when checked.

The updated selection policy prioritizes repos that are new, absent from the ledger, undocumented, or missing root `.agent` state before falling back to oldest eligible repo selection.

## Current interaction loop

```txt
open app
  -> src/main.js boots Three.js / NexusEngine runtime
  -> canvas renders balloon world
  -> player uses burner/vent controls
  -> wind drifts balloon across valley
  -> terrain clearance and altitude update
  -> camera follows basket with zoom blend
  -> HUD shows altitude/wind/distance/heat/camera mode
  -> GameHost exposes current state
```

## Domains in use

```txt
static-page-host
vite-static-publish-host
three-render-host
nexus-engine-cdn-runtime
nexus-telemetry
product-copy-authority
campaign-config
legacy-flight-compatibility
balloon-drift-config-authority
balloon-input-map
balloon-vehicle-state
balloon-drift-physics
wind-field
altitude-safety
terrain-sampler
world-generation
lake-generation
tree-scatter
cloud-scatter
wind-ribbon-rendering
basket-follow-camera
camera-zoom-blend
hud-telemetry
window-gamehost-debug
balloon-visual-object
balloon-envelope-panel
balloon-mouth
balloon-streamer-fit
balloon-fabric-seam
balloon-basket
balloon-rigging
balloon-burner
rope-geometry
route-source-authority
route-object-descriptor
route-event-result-envelope
route-event-journal
route-state-reducer
mission-snapshot-projector
route-fixture-harness
route-replay-parity
```

## Services that kits offer

```txt
open-above-balloon-telemetry-kit:
  - define balloon snapshot resource
  - define balloon tick event
  - write runtime snapshot into Nexus world
  - emit balloon tick telemetry
  - expose engine.openAbove.getState

open-above-hot-air-balloon-object-kit:
  - compose envelope, streamers, seams, mouth, rigging, basket, burner
  - publish object kit metadata
  - animate burner and rigging
  - install compatibility visual into existing host vehicle

balloon sub-kits:
  - build envelope panels
  - build balloon mouth
  - build fitted streamers
  - build fabric seams
  - build basket
  - build rigging
  - build burner
  - build rope geometry

inline host/render services:
  - mount canvas/HUD/error panel
  - create scene/camera/renderer
  - generate terrain/lakes/trees/clouds/wind ribbons
  - sample input
  - integrate drift
  - resolve camera
  - write HUD
  - expose GameHost

needed source/route services:
  - load canonical balloon product copy
  - load balloon drift config
  - create source fingerprint
  - resolve altitude bands
  - evaluate route objects
  - create RouteEventResult
  - append route event journal
  - reduce mission and progression state
  - project GameHost diagnostics
  - run DOM-free route fixture
```

## Kits identified

Implemented source-backed:

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

Inline/candidate:

```txt
open-above-runtime-host-kit
open-above-vite-static-publish-kit
open-above-three-render-host-kit
open-above-campaign-config-kit
open-above-legacy-flight-compatibility-kit
open-above-balloon-input-map-kit
open-above-balloon-state-kit
open-above-balloon-drift-physics-kit
open-above-wind-field-kit
open-above-altitude-safety-kit
open-above-terrain-sampler-kit
open-above-world-generation-kit
open-above-lake-generation-kit
open-above-tree-scatter-kit
open-above-cloud-scatter-kit
open-above-wind-ribbon-render-kit
open-above-basket-follow-camera-kit
open-above-camera-zoom-blend-kit
open-above-hud-telemetry-kit
open-above-gamehost-debug-kit
```

Next-cut:

```txt
open-above-product-copy-authority-kit
open-above-balloon-drift-config-kit
open-above-balloon-source-fingerprint-kit
open-above-balloon-source-snapshot-kit
open-above-altitude-band-contract-kit
open-above-altitude-band-resolver-kit
open-above-route-object-config-kit
open-above-route-object-evaluator-kit
open-above-route-event-result-envelope-kit
open-above-route-event-rejection-reason-kit
open-above-route-event-journal-kit
open-above-route-state-reducer-kit
open-above-meadow-lift-mission-reducer-kit
open-above-mission-snapshot-projector-kit
open-above-region-unlock-progression-kit
open-above-route-fixture-harness-kit
open-above-route-replay-parity-kit
```

## Known gaps

```txt
README/package copy still carries free-flight language.
Campaign config still carries legacy FLIGHT constants.
Live balloon drift constants are inline in src/main.js.
Route objects and altitude bands are absent.
Mission/progression snapshots are absent.
DOM-free route replay is absent.
Renderer/world/camera/HUD concerns are colocated in src/main.js.
```

## Next safe ledge

```txt
TheOpenAbove Product Copy Authority + Balloon Drift Config Fixture Gate
```

## Files changed

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/domain-service-breakdown.md
.agent/render-audit/balloon-render-surface-audit.md
.agent/gameplay-audit/balloon-drift-loop-audit.md
.agent/trackers/2026-07-08T03-21-22-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T03-21-22-04-00.md
.agent/kit-registry.json
```

## Validation

Documentation-only pass.

No runtime source files changed.

No local test/build was run.
