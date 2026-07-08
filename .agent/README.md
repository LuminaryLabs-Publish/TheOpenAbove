# The Open Above Agent Notes

This folder stores repo-local agent findings for `LuminaryLabs-Publish/TheOpenAbove`.

## Latest tracker

```txt
.agent/trackers/2026-07-07T21-29-47-04-00/project-breakdown.md
```

## Latest kit registry

```txt
.agent/kit-registry.json
```

## Tracker history

```txt
.agent/trackers/2026-07-07T03-00-32-04-00/project-breakdown.md
.agent/trackers/2026-07-07T04-08-29-04-00/project-breakdown.md
.agent/trackers/2026-07-07T05-21-11-04-00/project-breakdown.md
.agent/trackers/2026-07-07T06-31-46-04-00/project-breakdown.md
.agent/trackers/2026-07-07T07-38-47-04-00/project-breakdown.md
.agent/trackers/2026-07-07T08-51-15-04-00/project-breakdown.md
.agent/trackers/2026-07-07T10-01-09-04-00/project-breakdown.md
.agent/trackers/2026-07-07T11-11-26-04-00/project-breakdown.md
.agent/trackers/2026-07-07T12-20-08-04-00/project-breakdown.md
.agent/trackers/2026-07-07T12-38-43-04-00/project-breakdown.md
.agent/trackers/2026-07-07T13-50-54-04-00/project-breakdown.md
.agent/trackers/2026-07-07T15-11-23-04-00/project-breakdown.md
.agent/trackers/2026-07-07T16-21-09-04-00/project-breakdown.md
.agent/trackers/2026-07-07T17-29-51-04-00/project-breakdown.md
.agent/trackers/2026-07-07T18-49-32-04-00/project-breakdown.md
.agent/trackers/2026-07-07T20-10-49-04-00/project-breakdown.md
.agent/trackers/2026-07-07T21-29-47-04-00/project-breakdown.md
```

## Current repo read

`TheOpenAbove` is currently a standalone Vite / Three.js publish repo for a cozy hot-air-balloon wind-drift experience. The live runtime uses burner / vent input, procedural valley terrain, lakes, trees, clouds, wind ribbons, a basket-follow camera, a hot-air-balloon object family, a Nexus Engine telemetry DSK, and `window.GameHost.getState()`.

The blocker remains **source authority drift**. The runtime is balloon-first, while the active product/docs/config layer still contains bird/free-flight language: carving, gliding, diving, boosting, thermals, wind gates, pitch/bank controls, a sky-perch return loop, legacy `FLIGHT` tuning, bird controller architecture, bird follow camera notes, and bird/flock roadmap language.

Treat hot-air-balloon drift as canonical unless a future product decision intentionally restores the bird controller.

This pass tightens the next build into **Balloon Drift Config Authority + Route Fixture Replay Lock**. The most useful seam is now source-owned balloon drift config plus replayable route source authority: align active docs with the balloon runtime, extract live drift constants into `BALLOON_DRIFT`, add altitude bands and route source data, add route event result/reducer contracts, project mission/progression snapshots, and prove route legality through DOM-free smoke before broad runtime extraction.

## Current explicit kit inventory

```txt
open-above-balloon-telemetry-kit
open-above-hot-air-balloon-object-kit
open-above-balloon-envelope-panel-kit
open-above-balloon-mouth-kit
open-above-balloon-streamer-fit-kit
open-above-balloon-fabric-seam-kit
open-above-hot-air-balloon-envelope-kit
open-above-hot-air-balloon-basket-kit
open-above-hot-air-balloon-rigging-kit
open-above-hot-air-balloon-burner-kit
open-above-rope-kit
```

## Current candidate kit inventory

```txt
open-above-runtime-host-kit
open-above-vite-static-publish-kit
open-above-three-render-host-kit
open-above-balloon-input-map-kit
open-above-balloon-state-kit
open-above-balloon-drift-physics-domain-kit
open-above-wind-field-domain-kit
open-above-altitude-safety-domain-kit
open-above-terrain-sampler-domain-kit
open-above-world-generation-domain-kit
open-above-basket-follow-camera-kit
open-above-hud-mission-telemetry-kit
open-above-gamehost-debug-kit
open-above-static-marker-smoke-kit
```

## Next cutover kit inventory

```txt
open-above-product-copy-authority-kit
open-above-product-copy-drift-audit-kit
open-above-balloon-drift-config-kit
open-above-balloon-drift-config-smoke-kit
open-above-legacy-flight-compatibility-kit
open-above-balloon-source-snapshot-kit
open-above-altitude-band-contract-kit
open-above-altitude-band-resolver-kit
open-above-wind-lane-hint-config-kit
open-above-route-source-authority-kit
open-above-route-object-config-kit
open-above-route-object-state-kit
open-above-route-object-evaluator-kit
open-above-route-order-policy-kit
open-above-route-event-contract-kit
open-above-route-event-result-envelope-kit
open-above-route-event-acceptance-policy-kit
open-above-route-event-rejection-reason-kit
open-above-route-event-journal-kit
open-above-route-state-reducer-kit
open-above-meadow-lift-mission-state-kit
open-above-meadow-lift-mission-reducer-kit
open-above-mission-snapshot-projector-kit
open-above-region-unlock-progression-kit
open-above-gamehost-route-diagnostics-kit
open-above-hud-route-mission-line-kit
open-above-route-fixture-contract-kit
open-above-route-fixture-harness-kit
open-above-route-fixture-snapshot-kit
open-above-route-replay-parity-kit
open-above-route-event-smoke-kit
open-above-balloon-behavior-smoke-kit
open-above-route-result-fixture-gate-kit
open-above-source-authority-readme-smoke-kit
open-above-product-doc-canonical-smoke-kit
```

## Immediate next product direction

Commit to `TheOpenAbove Balloon Drift Config Authority + Route Fixture Replay Lock`:

```txt
preserve current balloon visuals, burner / vent controls, camera, HUD telemetry, and GameHost shape
  -> update README.md away from bird free-flight terms
  -> update package.json description away from free-flight terms
  -> update docs/GAME_DESIGN.md to balloon drift, burner/vent, altitude bands, buoyancy gates, and meadow landing
  -> update docs/TECHNICAL_ARCHITECTURE.md to balloon controller, balloon drift model, basket-follow camera, route source authority, and fixture harness
  -> update docs/ROADMAP.md around balloon config authority, route fixtures, Meadow Lift completion, and Cloud Basin unlock
  -> add BALLOON_DRIFT beside legacy FLIGHT in src/data/campaign.config.js
  -> move live drift constants from src/main.js into BALLOON_DRIFT without changing behavior
  -> keep FLIGHT as compatibility-only until smoke confirms no live runtime dependency
  -> add ALTITUDE_BANDS for low-clearance, buoyancy-gate, high-drift, and meadow-landing states
  -> add ROUTE_OBJECTS for buoyancy-gate-01, buoyancy-gate-02, buoyancy-gate-03, and meadow-landing
  -> add WIND_LANE_HINTS for readable route guidance
  -> create pure altitude band resolver
  -> create pure route object evaluator
  -> create route order policy
  -> create RouteEventResult envelopes
  -> create route state reducer
  -> create route event journal
  -> create Meadow Lift mission reducer
  -> create Cloud Basin unlock progression reducer
  -> project local.mission, local.progression, local.routeObjects, local.routeEvents, local.routeDiagnostics, and local.routeFixture from snapshot()
  -> add one compact HUD mission line
  -> extend tests/smoke.mjs or adjacent smoke module with DOM-free route fixture cases
  -> defer host extraction, render extraction, world extraction, camera extraction, and balloon physics extraction until route smoke passes
```

## Next acceptance target

```txt
README/package/docs describe hot-air-balloon drift, burner, vent, route objects, altitude bands, buoyancy gates, meadow landing, and Cloud Basin unlock.
Legacy bird/free-flight wording is removed from active product docs or clearly marked historical.
src/data/campaign.config.js exports BALLOON_DRIFT, ALTITUDE_BANDS, ROUTE_OBJECTS, and WIND_LANE_HINTS.
src/main.js reads live drift constants from BALLOON_DRIFT.
Current balloon visuals, burner/vent feel, camera, HUD, and GameHost remain stable.
RouteEventResult includes eventId, objectId, eventType, accepted, reason, before, after, and snapshotTick.
Accepted attempts use reason=accepted.
Out-of-order attempts reject with reason=out_of_order.
Wrong-altitude attempts reject with reason=invalid_altitude_band.
Already-completed route objects reject with reason=already_completed.
Unknown route objects reject with reason=unknown_route_object.
Outside-radius attempts reject with reason=outside_radius.
In-order fixture completes three buoyancy gates.
Valid landing fixture completes meadow-lift.
Cloud Basin unlocks only after meadow-lift completion.
window.GameHost.getState().local exposes mission, progression, routeObjects, routeEvents, routeDiagnostics, and routeFixture.
HUD shows one compact mission line without adding noisy UI.
DOM-free smoke proves in-order, out-of-order, invalid-altitude, already-completed, unknown-object, outside-radius, landing, and unlock behavior.
host/render/world/camera/physics extraction remains explicitly out of scope.
```