# The Open Above Agent Notes

This folder stores repo-local agent findings for `LuminaryLabs-Publish/TheOpenAbove`.

## Latest tracker

```txt
.agent/trackers/2026-07-07T12-38-43-04-00/project-breakdown.md
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
```

## Current repo read

`TheOpenAbove` is currently a standalone Vite / Three.js publish repo for a cozy hot-air-balloon wind-drift experience. The live runtime uses burner / vent input, procedural valley terrain, lakes, trees, clouds, wind ribbons, a basket-follow camera, a hot-air-balloon object family, a Nexus Engine telemetry DSK, and `window.GameHost.getState()`.

The browser runtime is balloon-first, but the source-of-truth layer is still behind it. `README.md`, `package.json`, and `src/data/campaign.config.js` still preserve older free-flight / bird-flight language: carving, gliding, diving, boosting, thermals, wind gates, pitch / bank controls, and legacy `FLIGHT` tuning. Treat balloon drift as canonical unless a future product decision intentionally restores the bird controller.

This pass refines the next build into **Route Event Contract + Mission Snapshot Smoke**. The most useful seam is now a route-event result contract and mission snapshot projector so Meadow Lift can prove ordered gates, out-of-order rejection, invalid altitude rejection, valid landing, and cloud-basin progression before broad runtime extraction.

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
open-above-balloon-drift-config-kit
open-above-legacy-flight-compatibility-kit
open-above-altitude-band-contract-kit
open-above-altitude-band-resolver-kit
open-above-route-object-config-kit
open-above-route-object-evaluator-kit
open-above-route-order-policy-kit
open-above-route-object-state-kit
open-above-route-event-contract-kit
open-above-route-event-acceptance-policy-kit
open-above-route-event-rejection-reason-kit
open-above-route-event-journal-kit
open-above-meadow-lift-mission-reducer-kit
open-above-mission-snapshot-projector-kit
open-above-region-unlock-progression-kit
open-above-route-fixture-harness-kit
open-above-route-fixture-snapshot-kit
open-above-mission-snapshot-contract-kit
open-above-route-event-smoke-kit
open-above-balloon-behavior-smoke-kit
```

## Immediate next product direction

Commit to `TheOpenAbove Route Event Contract + Mission Snapshot Smoke Cutover`:

```txt
preserve current balloon visuals, burner / vent controls, and GameHost shape
  -> update README and package metadata to balloon drift language
  -> update Meadow Lift copy away from thermals, pitch, bank, boost, wind gates, and sky-perch return
  -> add BALLOON_DRIFT beside legacy FLIGHT in src/data/campaign.config.js
  -> move live drift constants from src/main.js into BALLOON_DRIFT
  -> add ALTITUDE_BANDS for low-clearance, gate-cruise, high-drift, and landing-window
  -> add ROUTE_OBJECTS for buoyancy-gate-01, buoyancy-gate-02, buoyancy-gate-03, and meadow-perch-landing
  -> add WIND_LANE_HINTS for readable route guidance
  -> create altitude band resolver
  -> create route object evaluator
  -> create route event contract
  -> create route event acceptance policy
  -> create route event journal
  -> create Meadow Lift mission reducer
  -> create region unlock progression reducer
  -> project mission/progression/routeObjects/routeEvents/routeFixture into snapshot()
  -> expose mission fields under window.GameHost.getState().local
  -> add one compact HUD mission line
  -> add DOM-free route-event smoke fixture for accepted and rejected cases
  -> defer host/render/physics extraction until fixture parity exists
```

## Next acceptance target

```txt
README.md and package.json describe balloon drift, burner, vent, and route completion
src/data/campaign.config.js has BALLOON_DRIFT, ALTITUDE_BANDS, ROUTE_OBJECTS, and WIND_LANE_HINTS
legacy FLIGHT is compatibility-only or unused behind parity smoke
runtime drift constants are config-backed
route events use stable accepted/rejected records
out-of-order route attempts reject with out_of_order
wrong altitude route attempts reject with invalid_altitude_band
in-order gate entries complete all three buoyancy gates
valid landing completes meadow-lift
cloud-basin unlocks only after Meadow Lift completion
window.GameHost.getState().local exposes mission, progression, routeObjects, routeEvents, and routeFixture
HUD shows one compact mission line
DOM-free smoke proves in-order, out-of-order, invalid-altitude, landing, and unlock behavior
host/render/physics extraction remains out of scope for this cut
```
