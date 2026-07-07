# The Open Above Agent Notes

This folder stores repo-local agent findings for `LuminaryLabs-Publish/TheOpenAbove`.

## Latest tracker

```txt
.agent/trackers/2026-07-07T11-11-26-04-00/project-breakdown.md
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
```

## Current repo read

`TheOpenAbove` is currently a standalone Vite / Three.js publish repo for a cozy hot-air-balloon wind-drift experience. The live runtime uses burner / vent input, procedural valley terrain, lakes, trees, clouds, wind ribbons, a basket-follow camera, a hot-air-balloon object family, a Nexus Engine telemetry DSK, and `window.GameHost.getState()`.

The browser runtime is balloon-first, but `README.md`, `package.json`, and `src/data/campaign.config.js` still preserve older free-flight / bird-flight language: carving, gliding, diving, boosting, thermals, wind gates, pitch / bank controls, and legacy `FLIGHT` tuning. Treat balloon drift as canonical unless a future product decision intentionally restores the bird controller.

This pass refines the next build into **Altitude Band Contract + Route Fixture Snapshot**. The most useful seam is now a data-backed altitude band contract plus DOM-free route fixture output, so Meadow Lift can prove gate order, altitude validity, landing unlock, and cloud-basin progression before large runtime extraction.

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
open-above-route-object-config-kit
open-above-altitude-band-contract-kit
open-above-wind-lane-hint-kit
open-above-route-object-evaluator-kit
open-above-route-object-state-kit
open-above-meadow-lift-mission-reducer-kit
open-above-region-unlock-progression-kit
open-above-route-fixture-snapshot-kit
open-above-mission-snapshot-contract-kit
open-above-route-fixture-smoke-kit
open-above-balloon-behavior-smoke-kit
```

## Immediate next product direction

Commit to `TheOpenAbove Altitude Band Contract + Route Fixture Snapshot Cutover`:

```txt
preserve current balloon drift visuals and controls
  -> update README/package language to burner / vent / drift
  -> add BALLOON_DRIFT beside legacy FLIGHT
  -> move burner, vent, buoyancy, damping, ceiling, clearance, and wind constants into BALLOON_DRIFT
  -> mark FLIGHT as legacy compatibility only until smoke parity proves removal is safe
  -> add ALTITUDE_BANDS with named bands for low-clearance, gate-cruise, high-drift, and landing-window
  -> add ROUTE_OBJECTS for buoyancy-gate-01, buoyancy-gate-02, buoyancy-gate-03, and meadow-perch-landing
  -> add WIND_LANE_HINTS for route readability and future UI/objective hints
  -> create pure route object evaluator, mission reducer, and progression reducer modules
  -> wire route object, mission, and progression state into snapshot()
  -> expose local.mission, local.progression, local.routeObjects, and local.routeFixture through GameHost
  -> add one compact HUD mission line
  -> add DOM-free route fixture smoke for in-order gates, out-of-order rejection, invalid altitude rejection, valid landing, and cloud-basin unlock
  -> defer host/render/physics extraction until route fixture smoke passes
```

## Next acceptance target

```txt
npm run check passes
npm run build passes
README and package describe burner / vent / balloon drift
src/data/campaign.config.js exports BALLOON_DRIFT, ALTITUDE_BANDS, ROUTE_OBJECTS, and WIND_LANE_HINTS
FLIGHT is marked legacy-only or replaced only after compatibility smoke
route evaluator is pure and DOM-free
altitude band resolver labels each fixture frame correctly
mission reducer completes gates only in order
out-of-order gate fixture is rejected without unlocking landing
landing only completes after gates plus valid radius/altitude conditions
GameHost.getState().local.mission exists
GameHost.getState().local.progression.cloudBasinUnlocked exists
GameHost.getState().local.routeObjects exposes every gate and landing status
GameHost.getState().local.routeFixture exposes last fixture assertion summary
HUD adds only one compact mission line
route fixture smoke proves gate completion, invalid altitude rejection, out-of-order rejection, landing completion, and cloud-basin unlock
```
