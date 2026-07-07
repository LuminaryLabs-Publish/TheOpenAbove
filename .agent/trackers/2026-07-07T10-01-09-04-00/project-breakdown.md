# TheOpenAbove Project Breakdown

**Run timestamp:** `2026-07-07T10-01-09-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch target:** `main`

**Selected repo:** `LuminaryLabs-Publish/TheOpenAbove`

**Excluded repo:** `LuminaryLabs-Publish/TheCavalryOfRome`

## Selection note

The Publish installation exposes `HorrorCorridor`, `AetherVale`, `TheOpenAbove`, `TheCavalryOfRome`, `PhantomCommand`, `PrehistoricRush`, `ZombieOrchard`, and `IntoTheMeadow`. `TheCavalryOfRome` remains excluded by standing rule.

The central ledger most recently documented `LuminaryLabs-Publish/AetherVale` at `2026-07-07T09-49-28-04-00`, so `LuminaryLabs-Publish/TheOpenAbove` is the next eligible repo in the established follow-up cycle.

## Current repo read

`TheOpenAbove` is a public Vite / Three.js publish repo for a cozy hot-air-balloon drift slice. The live runtime is already balloon-first: it builds procedural terrain, lakes, trees, clouds, wind ribbons, a composite hot-air-balloon object, burner / vent input, basket-follow camera, HUD telemetry, Nexus Engine telemetry, and `window.GameHost.getState()`.

The main blocker is still authority drift between product language, config, runtime, and tests. `README.md` and `package.json` still describe free-flight / bird-flight behavior. `src/data/campaign.config.js` still exposes `FLIGHT`, thermals, gates, pitch / roll / boost tuning, and legacy objective labels. `src/main.js` has the actual balloon controller, but it owns route, physics, mission, snapshot, HUD, and telemetry behavior inline.

This pass narrows the next implementation slice from broad **Balloon Drift Canonical Config + Mission Snapshot** into **Route Object Contract + Mission Reducer Fixture**. The runtime should not immediately extract every service. First, make route objects and mission progression pure and testable, then project them into `snapshot()` and HUD.

## Interaction loop

### Current implemented loop

```txt
index.html
  -> src/main.js
  -> create Three.js scene / camera / renderer / lights / fog
  -> generate terrain, lakes, trees, clouds, and wind ribbons
  -> buildHotAirBalloon()
  -> collect key state from Space, W, ArrowUp, S, ArrowDown, and Shift
  -> update burner and vent values
  -> sample time-varying wind angle and speed
  -> integrate buoyancy, vertical damping, ceiling softness, velocity, and position
  -> clamp balloon above terrain height + clearance
  -> update altitude and drift distance
  -> animate balloon visual sub-kits
  -> update basket-follow camera
  -> render HUD line
  -> publish openAbove.balloonSnapshot and openAbove.balloonTicked through Nexus Engine
  -> expose nexusEngine and local snapshot through window.GameHost.getState()
```

### Intended player loop

```txt
start Meadow Lift as balloon pilot
  -> read current route objective
  -> use burner / vent to enter the correct altitude band
  -> drift through buoyancy-gate-01
  -> drift through buoyancy-gate-02
  -> drift through buoyancy-gate-03
  -> approach meadow-perch-landing
  -> descend safely inside the landing radius
  -> mark meadow-lift-complete
  -> unlock cloud-basin
  -> show mission and unlock state in HUD / GameHost
```

### Recommended service loop

```txt
BalloonState snapshot
  -> altitude safety evaluation
  -> route object evaluation
  -> mission reducer
  -> progression reducer
  -> route object snapshot projection
  -> local.mission / local.progression / local.routeObjects
  -> HUD mission line
  -> behavior smoke fixture
```

## Domains in use

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
altitude-safety
terrain-sampler
world-generation
route-object-descriptor
route-object-evaluator
meadow-lift-mission-reducer
region-unlock-progression
mission-snapshot-contract
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

## Services that kits offer

| Service boundary | Current service | Next service contract |
| --- | --- | --- |
| Runtime host | Mount canvas, HUD, error panel, resize handling, frame loop, input listeners, fatal errors. | Keep thin, forward input/action facts into focused services later. |
| Three render host | Scene, camera, renderer, lights, fog, shadows, tone mapping. | Keep renderer product-agnostic while route state drives visual markers later. |
| Nexus telemetry | `openAbove.balloonSnapshot`, `openAbove.balloonTicked`, `engine.openAbove.getState()`. | Add mission/progression/route snapshots without changing telemetry identity. |
| Campaign config | `CAMPAIGN`, `WORLD`, legacy `FLIGHT`. | Add canonical `BALLOON_DRIFT`, `ROUTE_OBJECTS`, `ALTITUDE_BANDS`, and `WIND_LANE_HINTS`. |
| Balloon input | Keyboard key set for burner and vent. | Add explicit action-frame records after mission reducer fixture is stable. |
| Balloon physics | Burner, vent, vertical velocity, wind blend, terrain clamp, altitude, distance. | Expose `BalloonState` facts as route evaluator input. |
| Altitude safety | Terrain-height clearance clamp. | Evaluate valid gate and landing altitude bands. |
| Route object state | Missing. | Pure descriptors and evaluator for gates, radii, altitude bands, landing radius, completion order, and status. |
| Mission state | Missing. | Reducer for current objective, gate index, gate completion, landing validity, completion message, and fail-safe status. |
| Progression | Missing. | Record `meadow-lift-complete` and `cloud-basin-unlocked`. |
| GameHost snapshot | Local balloon snapshot only. | Add `local.mission`, `local.progression`, and `local.routeObjects`. |
| HUD telemetry | Balloon title, message, heat, altitude, wind, drift, zoom note. | Add one compact mission status line. |
| Visual object kits | Balloon object, panels, mouth, streamers, seams, basket, rigging, burner, ropes. | Preserve as renderer-facing object kits, avoid mixing mission rules into visuals. |
| Smoke validation | Static marker and file/content checks. | Add route fixture smoke that calls pure route and mission services without DOM or WebGL. |

## Kit inventory

### Current explicit kits

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

### Current candidate extraction kits

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

### Next cutover kits

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

## Key findings

- Runtime behavior is already hot-air-balloon drift, but repository language and config still describe bird/free-flight.
- The first source-of-truth problem is config authority, not visuals.
- `src/main.js` is too broad, but extracting every concern before mission state exists would create churn.
- The best first seam is pure route object evaluation because it can be tested without DOM, Three.js, or Nexus Engine.
- `snapshot()` already provides the right projection point for `mission`, `progression`, and `routeObjects`.
- The balloon object kit family is healthy and should stay visual-only.
- Behavior smoke should start as deterministic route fixtures before full browser automation.

## Recommended next work

**Build target:** `TheOpenAbove Route Object Contract + Mission Reducer Fixture Cutover`

```txt
preserve current balloon drift visuals and controls
  -> update README/package language to balloon drift
  -> add BALLOON_DRIFT beside legacy FLIGHT
  -> add ROUTE_OBJECTS with buoyancy-gate-01, buoyancy-gate-02, buoyancy-gate-03, and meadow-perch-landing
  -> add ALTITUDE_BANDS and WIND_LANE_HINTS descriptors
  -> create open-above-route-object-evaluator-kit as a pure module
  -> create open-above-meadow-lift-mission-reducer-kit as a pure module
  -> create open-above-region-unlock-progression-kit as a pure module
  -> wire evaluator/reducer output into snapshot()
  -> expose local.mission, local.progression, and local.routeObjects through GameHost
  -> add one compact HUD mission line
  -> add route fixture smoke for ordered gates and valid landing unlock
  -> defer host/render/physics extraction until route snapshot parity is stable
```

## Acceptance target

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

## Files inspected

```txt
README.md
package.json
src/data/campaign.config.js
src/main.js
tests/smoke.mjs
.agent/README.md
.agent/kit-registry.json
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/AetherVale.md
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/TheOpenAbove.md
```

## Files changed by this documentation run

```txt
.agent/trackers/2026-07-07T10-01-09-04-00/project-breakdown.md
.agent/kit-registry.json
.agent/README.md
```

No runtime source code changed in this pass. No local build or test run was executed.
