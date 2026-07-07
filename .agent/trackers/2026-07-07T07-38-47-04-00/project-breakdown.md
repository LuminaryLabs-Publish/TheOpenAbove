# The Open Above Project Breakdown

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Run timestamp:** `2026-07-07T07-38-47-04-00`

**Branch target:** `main`

**Status:** `documented-followup-mission-state-service-behavior-smoke-planned`

## Selection Note

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule. The central Publish rotation most recently documented `LuminaryLabs-Publish/AetherVale`, making `LuminaryLabs-Publish/TheOpenAbove` the next eligible repo in the established tracked rotation.

## Current Read

`TheOpenAbove` is a standalone Vite / Three.js publish repo for a cozy hot-air-balloon wind-drift experience. The live browser runtime is balloon-first, even though the README, package description, and `src/data/campaign.config.js` still preserve older bird/free-flight language around carving, thermals, wind gates, and `FLIGHT` tuning.

Current runtime path:

```txt
index.html
  -> src/main.js
  -> CDN Three.js
  -> CDN NexusEngine
  -> campaign/world config
  -> procedural terrain/lakes/trees/clouds/wind ribbons
  -> hot-air-balloon object kit family
  -> burner/vent input
  -> wind drift integration
  -> basket-follow camera
  -> HUD telemetry
  -> Nexus balloon telemetry resource/event
  -> window.GameHost.getState()
```

The strongest renderer-side boundary is still the hot-air-balloon object family. The main architectural bottleneck is still `src/main.js`, which owns runtime host, renderer lifecycle, terrain sampling, world generation, input, simulation, camera, HUD, Nexus telemetry, and GameHost diagnostics.

This pass refines the next cutover from broad config parity into **Mission State Service + Behavior Smoke**. The first product gap is no longer only naming/config drift. It is the missing state service that turns balloon drift into a clear mission loop with route objects, gate completion, landing, progression unlocks, and repeatable smoke fixtures.

## Interaction Loop

### Current implemented loop

```txt
load static page
  -> mount canvas/HUD/error panel
  -> initialize Three.js scene/camera/renderer/lights/fog
  -> generate terrain mesh from inline terrainHeight/moistureAt/terrainColor
  -> generate lakes, trees, clouds, and wind ribbons
  -> build procedural hot-air-balloon object
  -> capture keyboard/wheel input
  -> hold Space/W/ArrowUp for burner lift
  -> hold S/ArrowDown/Shift for vent descent
  -> sample time-varying wind angle and speed
  -> integrate buoyancy, damping, ceiling softness, velocity, position, and altitude
  -> clamp balloon above terrain clearance
  -> animate burner, rigging, ropes, and balloon sway
  -> follow basket-relative wind-facing camera
  -> render HUD telemetry
  -> tick Nexus telemetry kit
  -> expose local and Nexus snapshots through GameHost
```

### Target mission loop

```txt
start Meadow Lift as balloon pilot
  -> read wind-lane hints and altitude-band targets
  -> use burner/vent to enter the correct air layer
  -> drift through buoyancy-gate-01
  -> drift through buoyancy-gate-02
  -> drift through buoyancy-gate-03
  -> keep minimum terrain clearance
  -> approach landing/perch zone
  -> satisfy landing altitude and radius
  -> mark meadow-lift-complete
  -> unlock cloud-basin
  -> expose mission/progression through HUD and GameHost
  -> replay scripted behavior smoke to prove the route loop still works
```

## Domains In Use

| Domain | Current owner | Services | Status |
|---|---|---|---|
| `runtime-host` | `index.html`, `src/main.js` | Canvas mount, HUD mount, error panel, frame loop, resize handling | Implemented, monolithic |
| `three-render-host` | `src/main.js` | Scene/camera/renderer/lights/fog/shadows/tone mapping | Implemented inline |
| `nexus-telemetry` | `src/main.js` | BalloonSnapshot resource, BalloonTicked event, `engine.openAbove.getState()` | Implemented inline DSK |
| `gamehost-debug` | `src/main.js` | Engine handles, scene handles, camera, balloon, local snapshot | Implemented partial |
| `balloon-vehicle-state` | `src/main.js` | Position, velocity, wind, vertical velocity, altitude, burner, vent, distance, elapsed, message | Implemented inline |
| `balloon-input-map` | `src/main.js` | Keyboard capture, burner input, vent input, scroll zoom | Implemented inline |
| `balloon-drift-physics` | `src/main.js` | Wind blend, buoyancy, damping, ceiling softness, velocity integration | Implemented inline |
| `altitude-safety` | `src/main.js` | Terrain floor sampling, clearance clamp, altitude calculation | Implemented inline |
| `wind-field` | `src/main.js` | Wind angle, speed, vector, ribbon offsets, future wind-lane hints | Implemented inline, needs objectization |
| `terrain-sampler` | `src/main.js` | `terrainHeight`, `moistureAt`, `terrainColor` | Implemented inline |
| `world-generation` | `src/main.js` | Terrain, lakes, trees, clouds, wind ribbons | Implemented inline |
| `campaign-config` | `src/data/campaign.config.js`, README, package | Campaign ID, regions, objectives, world tuning, legacy `FLIGHT`, target `BALLOON_DRIFT` | Needs parity |
| `route-object-state` | target service | Gate IDs, positions, radii, altitude bands, completion state | Missing |
| `meadow-lift-objective` | target service | Gate sequence, landing conditions, mission completion | Missing |
| `region-unlock-progression` | target service | `meadow-lift-complete`, `cloud-basin-unlocked`, save-ready snapshot | Missing |
| `hud-telemetry` | `src/main.js` | Heat label, altitude, wind, drift distance, target mission text | Implemented telemetry-only |
| `basket-follow-camera` | `src/main.js` | Basket focus, wind-relative camera, scroll zoom, lookAt | Implemented inline |
| `static-smoke-validation` | `tests/smoke.mjs` | File checks, marker checks, old bird-marker regression checks | Implemented static |
| `behavior-smoke-validation` | target service | Scripted route state, gate completion, unlock parity | Missing |
| `balloon-visual-object` | object kit files | Composite object build and animation | Implemented |
| `balloon-envelope-panels` | `src/balloon-envelope-panel-kit.js` | Triangulated gore panels | Implemented |
| `balloon-mouth` | `src/balloon-mouth-kit.js` | Open mouth ring, inner shadow, skirt | Implemented |
| `balloon-streamer-fit` | `src/balloon-streamer-fit-kit.js` | Surface-fitted side panels | Implemented |
| `balloon-fabric-seams` | `src/balloon-fabric-seam-kit.js` | Vertical seam lines | Implemented |
| `hot-air-balloon-envelope-legacy` | `src/hot-air-balloon-envelope-kit.js` | Older envelope mesh path | Legacy |
| `hot-air-balloon-basket` | `src/hot-air-balloon-basket-kit.js` | Basket body, trim rails | Implemented |
| `hot-air-balloon-rigging` | `src/hot-air-balloon-rigging-kit.js` | Rope rigging, rigging animation | Implemented |
| `hot-air-balloon-burner` | `src/hot-air-balloon-burner-kit.js` | Burner, flame, glow, pulse | Implemented |
| `rope-utility` | `src/rope-kit.js` | Sagging striped tube ropes | Implemented |

## Kit Inventory

### Implemented explicit kits

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

### Candidate extraction kits

```txt
open-above-balloon-drift-config-kit
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
open-above-basket-follow-camera-kit
open-above-hud-mission-telemetry-kit
open-above-gamehost-debug-kit
open-above-scripted-route-smoke-kit
open-above-balloon-behavior-smoke-kit
```

## Services Offered By Kits

### Current implemented kit services

- `open-above-balloon-telemetry-kit`: defines `openAbove.balloonSnapshot`, emits `openAbove.balloonTicked`, installs `engine.openAbove.getState()`, and publishes balloon drift snapshots through Nexus Engine.
- `open-above-hot-air-balloon-object-kit`: composes panels, mouth, streamers, seams, basket, rigging, burner, and ropes into a procedural balloon object; stores part references; animates burner and rigging; supports legacy host installation.
- `open-above-balloon-envelope-panel-kit`: builds triangulated gore panels and fabric color variation.
- `open-above-balloon-mouth-kit`: builds the open envelope mouth, inner shadow, and fabric mouth skirt.
- `open-above-balloon-streamer-fit-kit`: builds decorative panels that fit the balloon curvature instead of floating as flat panels.
- `open-above-balloon-fabric-seam-kit`: builds vertical seam/rib markers on the envelope.
- `open-above-hot-air-balloon-envelope-kit`: builds the older envelope path and should remain legacy unless restored.
- `open-above-hot-air-balloon-basket-kit`: builds basket body and rails.
- `open-above-hot-air-balloon-rigging-kit`: builds rigging and animates rope attachment points.
- `open-above-hot-air-balloon-burner-kit`: builds burner frame, flame, glow light, and pulse animation.
- `open-above-rope-kit`: builds and updates sagging dark striped tube ropes.

### Target kit services

- `open-above-balloon-drift-config-kit`: makes balloon drift config canonical, adds `BALLOON_DRIFT`, and marks `FLIGHT` as legacy compatibility only.
- `open-above-route-object-kit`: defines route-object descriptors for buoyancy gates, altitude bands, wind-lane hints, and landing zone.
- `open-above-meadow-lift-mission-state-kit`: owns mission state, gate completion, landing checks, route completion, and message selection.
- `open-above-region-unlock-progression-kit`: writes `meadow-lift-complete`, computes `cloud-basin-unlocked`, and exposes progression snapshots.
- `open-above-balloon-behavior-smoke-kit`: runs deterministic smoke fixtures for burner/vent, clearance clamp, gate pass-through, landing, and unlock.
- `open-above-scripted-route-smoke-kit`: simulates scripted positions/actions against pure mission state without needing a browser renderer.
- `open-above-gamehost-debug-kit`: exposes local, mission, progression, route object, and kit status diagnostics.

## Key Findings

- The live codebase is already balloon-first, but public docs and config still imply bird/free-flight.
- `src/main.js` should not receive more mission logic directly; the next gameplay pass should create pure route/mission/progression services first.
- Current static smoke tests protect object-kit markers and bird-regression markers, but they do not prove burner/vent behavior, terrain clearance, gate completion, or unlock state.
- `GameHost.getState().local` currently exposes telemetry state, but it needs `mission`, `progression`, `routeObjects`, and `kitStatus` to become useful for automation and regression checks.
- `CAMPAIGN.regions[0].objectives` already has thermal/gate/perch targets; those should be translated into balloon route objects instead of remaining bird-flight semantics.
- The visual kit family is strong enough to keep stable while simulation and mission services are extracted under it.
- A behavior smoke harness can be pure JavaScript and should not wait for full renderer extraction.

## Recommended Next Work

**Build target:** `TheOpenAbove Mission State Service + Behavior Smoke Cutover`

```txt
preserve current balloon drift visuals and controls
  -> update README/package/config language around balloon drift
  -> add BALLOON_DRIFT config beside legacy FLIGHT
  -> define three buoyancy gate route objects
  -> define altitude bands and wind-lane hint descriptors
  -> define landing/perch zone conditions
  -> add pure mission state service
  -> add progression service for meadow-lift-complete and cloud-basin-unlocked
  -> expose mission/progression/routeObjects in GameHost.getState().local
  -> surface mission status in HUD
  -> add pure scripted route smoke fixture
  -> keep static smoke coverage
  -> extract host/input/wind/terrain/drift/camera/HUD only after behavior state is stable
```

## Minimum Checklist

- [ ] Make README, package, docs, and `campaign.config.js` call the product `Balloon Drift` consistently.
- [ ] Add `BALLOON_DRIFT` as canonical tuning and keep `FLIGHT` explicitly legacy.
- [ ] Add `routeObjects` for `buoyancy-gate-01`, `buoyancy-gate-02`, `buoyancy-gate-03`, and `meadow-perch-landing`.
- [ ] Add pure mission reducer/checker for gate entry, altitude band validity, landing validity, completion, and messages.
- [ ] Add progression state with `completedRegions` and `cloudBasinUnlocked`.
- [ ] Add `GameHost.getState().local.mission`, `local.progression`, `local.routeObjects`, and `local.kitStatus`.
- [ ] Add HUD mission text without growing the HUD beyond small telemetry.
- [ ] Add a Node smoke fixture for route completion and unlock parity.
- [ ] Keep `npm run check` and `npm run build` green.

## Change Log Links

- `internal-change-log/2026-07-07T03-00-32-04-00-the-open-above-breakdown.md`
- `internal-change-log/2026-07-07T04-08-29-04-00-the-open-above-followup-breakdown.md`
- `internal-change-log/2026-07-07T05-21-11-04-00-the-open-above-config-mission-breakdown.md`
- `internal-change-log/2026-07-07T06-31-46-04-00-the-open-above-config-parity-objective-breakdown.md`
