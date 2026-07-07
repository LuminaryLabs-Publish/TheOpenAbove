# The Open Above Project Breakdown

**Run timestamp:** `2026-07-07T11:11:26-04:00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch target:** `main`

**Selected next slice:** `TheOpenAbove Altitude Band Contract + Route Fixture Snapshot Cutover`

## Selection Note

The tracked Publish rotation most recently documented `LuminaryLabs-Publish/AetherVale` at `2026-07-07T10-59-49-04-00`, so `LuminaryLabs-Publish/TheOpenAbove` is the next eligible repo in the established cycle.

Observed Publish repos in this run:

```txt
LuminaryLabs-Publish/HorrorCorridor
LuminaryLabs-Publish/AetherVale
LuminaryLabs-Publish/TheOpenAbove
LuminaryLabs-Publish/TheCavalryOfRome
LuminaryLabs-Publish/PhantomCommand
LuminaryLabs-Publish/PrehistoricRush
LuminaryLabs-Publish/ZombieOrchard
LuminaryLabs-Publish/IntoTheMeadow
```

Standing exclusion preserved:

```txt
LuminaryLabs-Publish/TheCavalryOfRome
```

## Current Read

`TheOpenAbove` is a standalone Vite / Three.js publishing repo. The live game is already a hot-air-balloon drift slice with a procedural valley, lakes, trees, clouds, wind ribbons, balloon burner / vent controls, terrain clearance, basket-follow camera, HUD telemetry, Nexus Engine balloon telemetry, and `window.GameHost.getState()`.

The largest mismatch is still source authority. Runtime behavior is balloon-first, while `README.md`, `package.json`, and `src/data/campaign.config.js` preserve older free-flight / bird-flight wording and legacy `FLIGHT` tuning. `src/main.js` owns the real balloon constants directly, including burner defaults, venting, wind sampling, buoyancy, damping, ceiling softness, terrain clearance, snapshot projection, HUD copy, and GameHost state.

This pass narrows the next cut from broad route object work to the exact missing seam: **altitude band descriptors plus a DOM-free route fixture snapshot**. The goal is to give Meadow Lift stable data authority before runtime extraction.

## Interaction Loop

### Current implemented loop

```txt
open index.html
  -> load src/main.js
  -> create Three.js scene, camera, renderer, lights, fog, and animation loop
  -> generate terrain, lakes, trees, clouds, and wind ribbons
  -> build composite hot-air-balloon object from visual kits
  -> collect key state for burner / vent / zoom
  -> sample wind angle and wind speed from elapsed time
  -> integrate buoyancy, venting, vertical damping, ceiling softness, velocity, position, altitude, and drift distance
  -> clamp balloon above procedural terrain clearance
  -> animate balloon panels, streamers, rigging, burner, and basket
  -> update basket-follow camera
  -> render HUD telemetry
  -> publish Nexus Engine balloon snapshot and tick event
  -> expose { nexusEngine, local } through window.GameHost.getState()
```

### Intended product loop

```txt
start Meadow Lift
  -> read current route objective
  -> use burner / vent to enter a named altitude band
  -> drift through buoyancy-gate-01 in sequence
  -> drift through buoyancy-gate-02 in sequence
  -> drift through buoyancy-gate-03 in sequence
  -> enter meadow-perch-landing radius at a valid landing altitude
  -> mark meadow-lift-complete
  -> unlock cloud-basin
  -> expose mission, progression, routeObjects, and routeFixture through GameHost
```

### Recommended service loop

```txt
BalloonState snapshot
  -> altitude band resolver
  -> route object evaluator
  -> ordered mission reducer
  -> progression reducer
  -> route fixture snapshot projection
  -> local.mission / local.progression / local.routeObjects / local.routeFixture
  -> compact HUD mission line
  -> DOM-free route fixture smoke
```

## Domains Identified

```txt
static-page-host
runtime-host
three-render-host
nexus-telemetry
window-gamehost-debug
campaign-config
balloon-drift-config
balloon-input-map
balloon-action-frame
balloon-vehicle-state
balloon-drift-physics
wind-field
wind-lane-hints
altitude-safety
altitude-band-contract
terrain-sampler
world-generation
route-object-descriptor
route-object-evaluator
route-object-state
meadow-lift-mission-reducer
region-unlock-progression
mission-snapshot-contract
route-fixture-snapshot
hud-mission-telemetry
basket-follow-camera
balloon-visual-object
balloon-envelope-panel
balloon-mouth
balloon-streamer-fit
balloon-fabric-seam
hot-air-balloon-envelope-legacy
hot-air-balloon-basket
hot-air-balloon-rigging
hot-air-balloon-burner
rope-utility
static-smoke-validation
route-fixture-validation
behavior-smoke-validation
```

## Current Explicit Kits

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

## Candidate Extraction Kits

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

## Next Cutover Kits

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

## Services Captured

| Domain / kit | Services |
| --- | --- |
| `static-page-host` | Canvas mount, HUD shell, fatal error panel, script loading. |
| `runtime-host` | Bootstrap, animation loop, resize listener, keyboard input, wheel zoom, fatal error handling. |
| `three-render-host` | Scene, camera, renderer, lights, fog, shadows, tone mapping, render cadence. |
| `nexus-telemetry` / `open-above-balloon-telemetry-kit` | `openAbove.balloonSnapshot`, `openAbove.balloonTicked`, `engine.openAbove.getState()`. |
| `campaign-config` | Campaign id, region ids, region unlocks, objective values, world seed, terrain parameters, legacy `FLIGHT`. |
| `balloon-drift-config` | Target home for burner floor, vent force, buoyancy, damping, ceiling softness, clearance, wind speeds, wind blend. |
| `balloon-input-map` | Burner keys, vent keys, scroll zoom, key state clearing. |
| `balloon-vehicle-state` | Position, velocity, wind vector, vertical velocity, altitude, burner, vent, elapsed time, distance, message. |
| `balloon-drift-physics` | Wind integration, buoyancy, venting, vertical damping, ceiling softness, velocity lerp, position advance. |
| `wind-field` | Deterministic wind angle, speed, vector, and route hint descriptors. |
| `altitude-safety` | Terrain-floor clamp, altitude above terrain, landing validity. |
| `altitude-band-contract` | Named altitude bands, min/max values, gate-valid band, landing-valid band, snapshot labels. |
| `terrain-sampler` | `terrainHeight`, `moistureAt`, `terrainColor`. |
| `world-generation` | Terrain mesh, lakes, trees, clouds, wind ribbons. |
| `route-object-descriptor` | Gate ids, landing id, positions, radius, sequence index, altitude requirements. |
| `route-object-evaluator` | Proximity checks, altitude-band checks, ordered gate rules, landing gate. |
| `route-object-state` | Per-object status, completed flags, entered flags, last distance, altitude status. |
| `meadow-lift-mission-reducer` | Current objective, next gate, completion, message, mission status. |
| `region-unlock-progression` | `meadow-lift-complete`, `cloud-basin-unlocked`, progression snapshot. |
| `route-fixture-snapshot` | DOM-free fixture output for route objects, mission state, unlock state, and assertion metadata. |
| `hud-mission-telemetry` | Compact mission line added to the existing title/message/heat/altitude/wind/distance HUD. |
| `basket-follow-camera` | Basket focus, wind-relative camera position, scroll zoom, lookAt target. |
| `balloon-visual-object` | Composite balloon, envelope panels, mouth, streamers, fabric seams, basket, rigging, burner, ropes, animation. |
| `static-smoke-validation` | Current marker checks for expected files and balloon drift runtime strings. |
| `route-fixture-validation` | Target DOM-free ordered route smoke, altitude-band smoke, landing unlock smoke. |

## Key Findings

- `src/main.js` already contains the real balloon behavior and is the evidence source for the next config contract.
- `CAMPAIGN` still says thermals, five gates, and sky perch return, but the intended Meadow Lift route now needs three named buoyancy gates plus one landing zone.
- `WORLD` still exposes `gateCount` and `thermalCount`, but no route object descriptors exist yet.
- `FLIGHT` still contains pitch / roll / boost values that do not match the burner / vent runtime.
- `snapshot()` is the clean projection point for `mission`, `progression`, `routeObjects`, and `routeFixture`.
- `tests/smoke.mjs` currently provides static marker coverage only; the next useful test is a pure route fixture that does not need DOM, Three.js rendering, or browser automation.

## Recommended Next Work

**Build target:** `TheOpenAbove Altitude Band Contract + Route Fixture Snapshot Cutover`

```txt
preserve current balloon drift visuals and controls
  -> update README/package language to burner / vent / balloon drift
  -> add BALLOON_DRIFT beside legacy FLIGHT
  -> move burner, vent, buoyancy, damping, ceiling, clearance, and wind constants into BALLOON_DRIFT
  -> mark FLIGHT as legacy compatibility only until smoke parity proves removal is safe
  -> add ALTITUDE_BANDS with named bands for low-clearance, gate-cruise, high-drift, and landing-window
  -> add ROUTE_OBJECTS for buoyancy-gate-01, buoyancy-gate-02, buoyancy-gate-03, and meadow-perch-landing
  -> add WIND_LANE_HINTS for the recommended approach line to each gate
  -> create open-above-altitude-band-contract-kit
  -> create open-above-route-object-evaluator-kit as a pure module
  -> create open-above-meadow-lift-mission-reducer-kit as a pure module
  -> create open-above-region-unlock-progression-kit as a pure module
  -> wire route object, mission, and progression state into snapshot()
  -> expose local.mission, local.progression, local.routeObjects, and local.routeFixture through GameHost
  -> add one compact HUD mission line
  -> add DOM-free route fixture smoke for in-order gates, out-of-order rejection, invalid altitude rejection, valid landing, and cloud-basin unlock
  -> defer host/render/physics extraction until route fixture smoke passes
```

## Minimum Checklist

- [ ] Canonicalize README/package language around hot-air-balloon drift.
- [ ] Add `BALLOON_DRIFT` and keep `FLIGHT` legacy-only until compatibility is removed deliberately.
- [ ] Move live runtime drift constants out of `src/main.js` into config authority.
- [ ] Add `ALTITUDE_BANDS` with explicit min/max/status labels.
- [ ] Add `ROUTE_OBJECTS` for three named gates and the landing zone.
- [ ] Add `WIND_LANE_HINTS` for route readability and future UI/objective hints.
- [ ] Add pure route evaluator and mission/progression reducers.
- [ ] Add `local.mission`, `local.progression`, `local.routeObjects`, and `local.routeFixture` to GameHost snapshots.
- [ ] Add one compact HUD mission line without expanding UI noise.
- [ ] Add route fixture smoke for ordered gate completion and landing unlock.
- [ ] Keep renderer/host/physics extraction out of scope until route fixture smoke passes.

## Acceptance Target

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
landing only completes after all gates and valid altitude/radius conditions
GameHost.getState().local.mission exists
GameHost.getState().local.progression.cloudBasinUnlocked exists
GameHost.getState().local.routeObjects exposes every gate and landing status
GameHost.getState().local.routeFixture exposes last fixture assertion summary
HUD adds only one compact mission line
route fixture smoke proves gate completion, invalid altitude rejection, out-of-order rejection, landing completion, and cloud-basin unlock
```

## Notes

No runtime source code was changed in this pass. No local build or test run was executed.