# TheOpenAbove Breakdown — Balloon Drift Canonical Config + Mission Snapshot

**Run timestamp:** `2026-07-07T08-51-15-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch target:** `main`

**Selected repo:** `LuminaryLabs-Publish/TheOpenAbove`

**Excluded repo:** `LuminaryLabs-Publish/TheCavalryOfRome`

## Selection note

The central Publish rotation most recently updated `LuminaryLabs-Publish/AetherVale` at `2026-07-07T08-39-48-04-00`, so this run selected `LuminaryLabs-Publish/TheOpenAbove` as the next eligible repo in the established tracked cycle. Cavalry remains excluded by standing rule.

## Current repo read

`TheOpenAbove` is a Vite / Three.js publish repo whose live runtime is already a cozy hot-air-balloon wind-drift scene.

The live runtime path is:

```txt
index.html
  -> src/main.js
  -> Three.js scene / camera / renderer
  -> procedural terrain / lakes / trees / clouds / wind ribbons
  -> hot-air-balloon object kit family
  -> burner / vent input
  -> wind drift and altitude simulation
  -> basket-follow camera
  -> HUD telemetry
  -> Nexus Engine telemetry resource/event
  -> window.GameHost.getState()
```

The live code is now stronger than the public docs/config. `README.md`, `package.json`, and `src/data/campaign.config.js` still describe bird/free-flight actions, thermals, wind gates, pitch/bank/boost controls, and legacy `FLIGHT` constants. The browser runtime uses a balloon, burner, vent, wind drift, vertical velocity, ground clearance, and balloon telemetry.

This follow-up refines the next slice from broad mission state into **Balloon Drift Canonical Config + Mission Snapshot**: make balloon drift the config/documentation source of truth, define route objects, project mission/progression into snapshots, and add a smokeable state contract before splitting more of `src/main.js`.

## Interaction loop

### Current implemented loop

```txt
load static page
  -> mount canvas, HUD, and error panel
  -> create Three.js scene, camera, renderer, lighting, fog, shadows, and frame loop
  -> create deterministic seeded world helpers
  -> build terrain, lakes, trees, clouds, and wind ribbons
  -> spawn hot-air-balloon object kit family
  -> map Space / W / ArrowUp to burner lift
  -> map S / ArrowDown / Shift to vent descent
  -> sample wind angle and wind speed over elapsed time
  -> integrate buoyancy, venting, damping, ceiling softness, velocity, position, altitude, and drift distance
  -> clamp balloon above sampled terrain height plus clearance
  -> animate balloon sway, burner, rigging, ropes, panels, mouth, streamers, seams, and basket
  -> move basket-follow camera relative to wind direction and scroll zoom
  -> update HUD with heat, altitude, wind speed, drift distance, and status
  -> tick Nexus Engine telemetry kit
  -> expose nexusEngine and local snapshot through window.GameHost.getState()
```

### Intended player loop

```txt
start Meadow Lift as balloon pilot
  -> read wind-lane and altitude-band hint
  -> use burner / vent to reach safe altitude band
  -> drift with the wind through buoyancy-gate-01
  -> adjust altitude and drift through buoyancy-gate-02
  -> adjust altitude and drift through buoyancy-gate-03
  -> keep terrain clearance valid
  -> enter meadow-perch landing radius at valid altitude and low enough descent speed
  -> record meadow-lift-complete
  -> unlock cloud-basin
  -> show mission and progression in HUD and GameHost
```

### Recommended service loop

```txt
runtime frame
  -> collect balloon input action frame
  -> update balloon physics state
  -> evaluate altitude safety
  -> evaluate route object crossings
  -> update mission state
  -> update progression state
  -> project mission/progression into local snapshot
  -> publish Nexus telemetry
  -> update HUD mission line
  -> record behavior-smoke friendly diagnostics
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
balloon-vehicle-state
balloon-drift-physics
wind-field
altitude-safety
terrain-sampler
world-generation
route-object-state
meadow-lift-mission-state
region-unlock-progression
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
behavior-smoke-validation
```

## Current explicit kits

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

## Candidate / target extraction kits

```txt
open-above-balloon-drift-config-kit
open-above-route-object-config-kit
open-above-runtime-host-kit
open-above-three-render-host-kit
open-above-balloon-input-map-kit
open-above-balloon-state-kit
open-above-balloon-drift-physics-domain-kit
open-above-wind-field-domain-kit
open-above-altitude-safety-domain-kit
open-above-terrain-sampler-domain-kit
open-above-world-generation-domain-kit
open-above-route-object-kit
open-above-meadow-lift-mission-state-kit
open-above-region-unlock-progression-kit
open-above-mission-snapshot-contract-kit
open-above-basket-follow-camera-kit
open-above-hud-mission-telemetry-kit
open-above-gamehost-debug-kit
open-above-scripted-route-smoke-kit
open-above-balloon-behavior-smoke-kit
open-above-static-marker-smoke-kit
```

## Services captured by kit boundary

### Runtime / host services

- Mount canvas, HUD, and error panel.
- Create Three.js scene, camera, renderer, lights, fog, shadows, tone mapping, resize handling, and animation loop.
- Own global keyboard/wheel listeners until `open-above-balloon-input-map-kit` is extracted.
- Own local state snapshot until `open-above-mission-snapshot-contract-kit` is extracted.
- Expose `window.GameHost` for engine, scene, renderer, camera, balloon, Nexus state, and local state.

### Telemetry services

- `open-above-balloon-telemetry-kit` defines `openAbove.balloonSnapshot`.
- `open-above-balloon-telemetry-kit` emits `openAbove.balloonTicked`.
- `open-above-balloon-telemetry-kit` installs `engine.openAbove.getState()`.
- Current blocker: it only publishes drift telemetry, not mission/progression state.

### Balloon simulation services

- `open-above-balloon-input-map-kit`: target keyboard/wheel input normalization for burner, vent, and zoom.
- `open-above-balloon-state-kit`: target state owner for position, velocity, wind, vertical velocity, altitude, burner, vent, elapsed time, distance, and message.
- `open-above-balloon-drift-physics-domain-kit`: target buoyancy, venting, vertical damping, ceiling softness, wind blend, and position integration.
- `open-above-altitude-safety-domain-kit`: target terrain clearance, ground clamp, altitude computation, and landing altitude validity.
- `open-above-wind-field-domain-kit`: target wind angle, wind speed, wind vector, wind ribbon offset, and wind-lane hint descriptors.

### World and camera services

- `open-above-terrain-sampler-domain-kit`: target `terrainHeight`, `moistureAt`, and `terrainColor` sampling.
- `open-above-world-generation-domain-kit`: target terrain mesh, lakes, trees, clouds, and wind ribbon creation.
- `open-above-basket-follow-camera-kit`: target basket focus, wind-relative camera position, scroll zoom, and look-at service.

### Visual object services

- `open-above-hot-air-balloon-object-kit`: composes the active balloon object from visual sub-kits and exposes build/animate/install helpers.
- `open-above-balloon-envelope-panel-kit`: builds triangulated gore panels.
- `open-above-balloon-mouth-kit`: builds open mouth ring, inner shadow, and skirt.
- `open-above-balloon-streamer-fit-kit`: builds fitted side panels that follow envelope curvature.
- `open-above-balloon-fabric-seam-kit`: builds vertical fabric seam lines.
- `open-above-hot-air-balloon-envelope-kit`: legacy envelope path, not the preferred active composite path.
- `open-above-hot-air-balloon-basket-kit`: builds basket body and trim rails.
- `open-above-hot-air-balloon-rigging-kit`: builds/animates rope rigging.
- `open-above-hot-air-balloon-burner-kit`: builds/animates burner frame, flame, glow, and pulse.
- `open-above-rope-kit`: builds and updates sagging striped tube rope geometry.

### Mission/progression services

- `open-above-balloon-drift-config-kit`: target canonical `BALLOON_DRIFT` values for lift, vent, damping, ceiling, clearance, wind, burner defaults, and camera zoom.
- `open-above-route-object-config-kit`: target declarative route object descriptors for three buoyancy gates, altitude bands, wind-lane hints, and meadow-perch landing.
- `open-above-route-object-kit`: target runtime gate/landing object state and hit tests.
- `open-above-meadow-lift-mission-state-kit`: target ordered gate completion, altitude validity, landing validity, route completion, and mission messaging.
- `open-above-region-unlock-progression-kit`: target `meadow-lift-complete` and `cloud-basin-unlocked` progression flags.
- `open-above-mission-snapshot-contract-kit`: target stable `GameHost.getState().local.mission`, `progression`, and `routeObjects` shape.
- `open-above-hud-mission-telemetry-kit`: target mission line in HUD beside heat, altitude, wind, and drift telemetry.

### Validation services

- `open-above-static-marker-smoke-kit`: preserve current static marker checks while removing stale bird-regression assumptions only after product language is corrected.
- `open-above-scripted-route-smoke-kit`: target deterministic route fixture that drives state through three gates and landing.
- `open-above-balloon-behavior-smoke-kit`: target behavior assertions for burner/vent, ground clamp, gate completion, landing, and Cloud Basin unlock.

## Key findings

- Runtime behavior is already balloon-first; docs/config still describe bird flight.
- `src/main.js` is the main extraction target because it owns host, rendering, world, input, physics, camera, HUD, telemetry, and GameHost.
- The visual object kit boundary is healthy and should be preserved.
- The first missing gameplay system is not more rendering; it is mission/progression authority.
- Config must be made canonical before mission behavior is tested, otherwise tests will encode stale `FLIGHT` and bird-control language.
- The local snapshot should grow from pure drift telemetry to a contract with `mission`, `progression`, and `routeObjects`.

## Recommended next work

**Build target:** `TheOpenAbove Balloon Drift Canonical Config + Mission Snapshot Cutover`

```txt
preserve current balloon drift visuals and controls
  -> update README controls and milestone language to burner / vent / drift
  -> update package description from free-flight to balloon drift
  -> add BALLOON_DRIFT to src/data/campaign.config.js
  -> keep FLIGHT only as legacy compatibility or remove after smoke parity
  -> define routeObjects for buoyancy-gate-01, buoyancy-gate-02, buoyancy-gate-03, and meadow-perch-landing
  -> define altitudeBand descriptors and windLaneHint descriptors
  -> add pure mission-state service fed by balloon state and route objects
  -> add progression service for meadow-lift-complete and cloud-basin-unlocked
  -> extend snapshot() with mission, progression, and routeObjects
  -> extend HUD with current gate / landing / unlock status
  -> add scripted smoke for deterministic route completion
  -> only then extract host/input/wind/terrain/drift/camera/HUD modules from src/main.js
```

## Minimum acceptance checklist

- [ ] `README.md` describes balloon drift, burner, vent, drift gates, and meadow-perch landing.
- [ ] `package.json` description describes the active balloon runtime.
- [ ] `src/data/campaign.config.js` exports canonical `BALLOON_DRIFT` and route object descriptors.
- [ ] `FLIGHT` is marked legacy-only or removed behind compatibility tests.
- [ ] `GameHost.getState().local.mission` exists.
- [ ] `GameHost.getState().local.progression.cloudBasinUnlocked` exists.
- [ ] `GameHost.getState().local.routeObjects` exposes gate/landing status.
- [ ] HUD shows mission status without adding more than one extra line.
- [ ] Behavior smoke proves three gate completions and landing unlock.
- [ ] Existing static smoke and `npm run build` remain green.

## Files reviewed

```txt
README.md
package.json
src/main.js
src/data/campaign.config.js
.agent/README.md
.agent/kit-registry.json
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/AetherVale.md
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/TheOpenAbove.md
```

## Notes

No runtime source code was changed in this pass. This is an internal documentation, tracker, registry, and central ledger update only.
