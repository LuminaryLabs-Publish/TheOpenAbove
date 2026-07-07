# The Open Above Agent Notes

This folder stores repo-local agent findings for `LuminaryLabs-Publish/TheOpenAbove`.

## Latest tracker

```txt
.agent/trackers/2026-07-07T10-01-09-04-00/project-breakdown.md
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
```

## Current repo read

`TheOpenAbove` is currently a standalone Vite / Three.js publish repo for a cozy hot-air-balloon wind-drift experience. The live runtime uses burner / vent input, procedural valley terrain, lakes, trees, clouds, wind ribbons, a basket-follow camera, a hot-air-balloon object family, a Nexus Engine telemetry DSK, and `window.GameHost.getState()`.

The browser runtime is balloon-first, but `README.md`, `package.json`, and `src/data/campaign.config.js` still preserve old free-flight / bird-flight language: carving, gliding, diving, boosting, thermals, wind gates, pitch / bank controls, and legacy `FLIGHT` tuning. Treat balloon drift as canonical unless a future product decision intentionally restores the bird controller.

This pass refines the next build into **Route Object Contract + Mission Reducer Fixture**. The most useful seam is pure route/mission authority before large runtime extraction: canonical `BALLOON_DRIFT`, route object descriptors, altitude bands, wind-lane hints, ordered gate evaluation, landing validity, mission/progression reducers, snapshot projection, and DOM-free route fixture smoke.

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
open-above-route-object-evaluator-kit
open-above-altitude-band-contract-kit
open-above-meadow-lift-mission-reducer-kit
open-above-region-unlock-progression-kit
open-above-mission-snapshot-contract-kit
open-above-route-fixture-smoke-kit
open-above-balloon-behavior-smoke-kit
```

## Immediate next product direction

Commit to `TheOpenAbove Route Object Contract + Mission Reducer Fixture Cutover`:

```txt
preserve current balloon drift visuals and controls
  -> update README/package language to burner / vent / drift
  -> add BALLOON_DRIFT beside legacy FLIGHT
  -> add ROUTE_OBJECTS for buoyancy-gate-01, buoyancy-gate-02, buoyancy-gate-03, and meadow-perch-landing
  -> add ALTITUDE_BANDS and WIND_LANE_HINTS descriptors
  -> create pure route object evaluator
  -> create pure Meadow Lift mission reducer
  -> create progression reducer for meadow-lift-complete and cloud-basin-unlocked
  -> wire evaluator/reducer output into snapshot()
  -> expose local.mission, local.progression, and local.routeObjects through GameHost
  -> add one compact HUD mission line
  -> add route fixture smoke for ordered gates and valid landing unlock
  -> defer host/render/physics extraction until route snapshot parity is stable
```

## Next acceptance target

```txt
npm run check passes
npm run build passes
README and package describe burner / vent / balloon drift
src/data/campaign.config.js exports BALLOON_DRIFT, ROUTE_OBJECTS, ALTITUDE_BANDS, and WIND_LANE_HINTS
FLIGHT is marked legacy-only or removed behind compatibility smoke
route evaluator is pure and DOM-free
mission reducer completes gates only in sequence
landing only completes after all gates and valid altitude/radius conditions
GameHost.getState().local.mission exists
GameHost.getState().local.progression.cloudBasinUnlocked exists
GameHost.getState().local.routeObjects exposes every gate and landing status
HUD adds only one compact mission line
route fixture smoke proves three-gate completion and cloud-basin unlock
```
