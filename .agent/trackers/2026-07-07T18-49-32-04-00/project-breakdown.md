# The Open Above Repo Breakdown

**Run timestamp:** `2026-07-07T18:49:32-04:00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch target:** `main`

**Status:** `documented-followup-balloon-config-route-result-fixture-gate-planned`

## Selection reason

`TheOpenAbove` was selected because the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger showed it as the oldest eligible tracked non-Cavalry Publish repo by latest review timestamp at the start of this run.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

Latest eligible ledger timestamps checked:

```txt
TheOpenAbove     2026-07-07T17:29:51-04:00
AetherVale       2026-07-07T17:38:46-04:00
PhantomCommand   2026-07-07T17:49:34-04:00
PrehistoricRush  2026-07-07T18:00:19-04:00
MyCozyIsland     2026-07-07T18:10:03-04:00
IntoTheMeadow    2026-07-07T18:19:15-04:00
ZombieOrchard    2026-07-07T18:28:54-04:00
HorrorCorridor   2026-07-07T18:41:07-04:00
```

## Current repo read

`TheOpenAbove` is a standalone Vite / Three.js publish repo whose visible runtime is already hot-air-balloon-first.

The runtime imports Three.js from jsDelivr, imports Nexus Engine from `LuminaryLabs-Dev/NexusEngine@main`, loads `CAMPAIGN` and `WORLD` from `src/data/campaign.config.js`, builds the hot-air-balloon object family, generates terrain/lakes/trees/clouds/wind ribbons, accepts burner/vent input, integrates wind and buoyancy, renders a basket-follow camera, updates HUD telemetry, ticks Nexus Engine telemetry, and exposes `window.GameHost.getState()`.

The product/config layer is still behind the runtime. `README.md`, `package.json`, and `src/data/campaign.config.js` still describe older free-flight/bird-flight mechanics such as carve, glide, dive, boost, pitch, bank, thermals, wind gates, and sky perch return. `src/main.js` owns the live balloon drift constants inline.

The next useful cut is not broad extraction yet. The next useful cut is to make balloon config source-owned, define route object descriptors, wrap route attempts in result envelopes, project mission/progression snapshots, and prove all route legality through DOM-free fixtures.

## Interaction loop

### Current implemented loop

```txt
load index.html
  -> import src/main.js
  -> import Three.js CDN module
  -> import Nexus Engine CDN module
  -> import CAMPAIGN and WORLD config
  -> create canvas, HUD, and fatal error panel bindings
  -> create scene, camera, renderer, lights, fog, and shadows
  -> generate procedural terrain, lakes, trees, clouds, and wind ribbons
  -> build open-above-procedural-hot-air-balloon visual object
  -> initialize inline balloon state at position [0, 105, 0]
  -> collect burner key input from Space / W / ArrowUp
  -> collect vent key input from S / ArrowDown / Shift
  -> collect wheel zoom input
  -> sample wind angle and wind speed inline
  -> integrate burner, vent, buoyancy, vertical damping, ceiling softness, velocity, position, altitude, and distance
  -> clamp balloon to terrain clearance
  -> animate balloon burner and rigging sub-kits
  -> update wind ribbons
  -> update basket-follow camera
  -> render scene
  -> update HUD telemetry
  -> engine.tick(dt)
  -> publish BalloonSnapshot through Nexus Engine
  -> expose { nexusEngine, local } through window.GameHost.getState()
```

### Target source-authority loop

```txt
load Meadow Lift route authority
  -> read BALLOON_DRIFT, ALTITUDE_BANDS, ROUTE_OBJECTS, and WIND_LANE_HINTS
  -> run existing visible balloon drift unchanged
  -> create BalloonSourceSnapshot each tick
  -> resolve active altitude band from altitude and terrain clearance
  -> evaluate candidate route object by object id, position, radius, sequence, and required altitude band
  -> return RouteEventResult for accepted and rejected attempts
  -> append RouteEventJournal entries
  -> reduce RouteObjectState
  -> reduce MeadowLiftMissionState
  -> reduce RegionProgressionState
  -> project route, mission, progression, diagnostics, and fixture data through GameHost
  -> update one compact HUD mission line
  -> replay fixture scripts without DOM / WebGL
```

## Domains in use

```txt
static-page-host
vite-static-publish-host
third-party-cdn-runtime
runtime-host
three-render-host
nexus-telemetry
campaign-config
legacy-flight-compatibility
balloon-drift-config-authority
balloon-input-map
balloon-vehicle-state
balloon-drift-physics
balloon-source-snapshot
wind-field
wind-lane-hints
altitude-safety
altitude-band-contract
altitude-band-resolver
terrain-sampler
world-generation
basket-follow-camera
hud-mission-telemetry
window-gamehost-debug
balloon-visual-object
route-object-descriptor
route-object-state
route-object-evaluator
route-order-policy
route-event-contract
route-event-result-envelope
route-event-acceptance-policy
route-event-rejection-reason-catalog
route-event-journal
route-state-reducer
meadow-lift-mission-reducer
mission-snapshot-projector
region-unlock-progression
route-fixture-contract
route-fixture-harness
route-fixture-snapshot
static-smoke-validation
route-event-smoke-validation
```

## Service findings

### Implemented services

```txt
static HTML shell service
Vite dev/build service
Three.js CDN import service
Nexus Engine CDN telemetry import service
terrain height service
moisture sampling service
terrain color service
terrain mesh construction service
lake construction service
tree scatter service
cloud construction service
wind ribbon construction service
hot-air-balloon object construction service
balloon envelope panel service
balloon mouth service
balloon streamer fit service
balloon fabric seam service
basket construction service
rigging construction service
burner construction/animation service
rope construction/update service
keyboard input capture service
wheel zoom input service
inline wind sampler service
inline burner/vent blend service
inline buoyancy integration service
inline terrain clearance clamp service
basket-follow camera service
HUD telemetry service
BalloonSnapshot resource publication service
BalloonTicked event publication service
window.GameHost state projection service
static marker smoke service
```

### Missing next-cut services

```txt
BALLOON_DRIFT config authority service
legacy FLIGHT compatibility service
balloon source snapshot service
altitude band resolver service
route object descriptor service
route object evaluator service
route order policy service
route event result envelope service
route event rejection reason catalog service
route event journal service
route state reducer service
Meadow Lift mission reducer service
Cloud Basin progression reducer service
mission snapshot projector service
GameHost route diagnostics projector service
HUD mission line projector service
DOM-free route fixture runner service
route replay parity smoke service
```

## Kit inventory

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

### Next-cut kits

```txt
open-above-balloon-drift-config-kit
open-above-balloon-drift-config-smoke-kit
open-above-legacy-flight-compatibility-kit
open-above-product-copy-alignment-kit
open-above-balloon-source-snapshot-kit
open-above-altitude-band-contract-kit
open-above-altitude-band-resolver-kit
open-above-wind-lane-hint-config-kit
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
```

### Deferred kits

```txt
open-above-render-extraction-kit
open-above-world-extraction-kit
open-above-camera-extraction-kit
open-above-physics-extraction-kit
open-above-save-state-kit
open-above-region-streaming-kit
open-above-audio-ambient-kit
open-above-weather-kit
```

## Source facts

```txt
README still describes free-flight exploration, carving, gliding, diving, boosting, thermals, wind gates, pitch/bank controls, and sky perch return.
package.json still describes a standalone free-flight exploration game.
campaign.config.js exports CAMPAIGN, WORLD, and FLIGHT only.
FLIGHT still contains bird/free-flight fields: minSpeed, cruiseSpeed, maxSpeed, drag, gravity, lift, pitchRate, rollRate, yawFromRoll, autoLevel, boostImpulse, boostCooldown, thermalLift, terrainClearance.
main.js imports CAMPAIGN and WORLD but not FLIGHT.
main.js owns actual balloon drift constants inline.
main.js initializes balloon at [0, 105, 0].
main.js initial velocity is [8, 0, -10].
main.js initial burner is 0.22.
main.js coasting burner target is 0.18.
main.js burner pressed target is 1.
main.js burner smooth rate is 3.2.
main.js vent smooth rate is 3.6.
main.js wind angle baseline is -0.86.
main.js wind speed baseline is 9.4.
main.js buoyancy expression is 0.36 + burner * 3.7 - vent * 3.2.
main.js vertical damping coefficient is 0.74.
main.js ceiling soft limit starts above y=270.
main.js terrain clearance clamp is terrainHeight + 30.
main.js vertical velocity clamps to [-8, 8].
snapshot(status) exposes status, region, objectType, elapsed, altitude, burner, vent, windSpeed, distance, position, velocity, wind, and message.
GameHost exposes engine, NexusEngine, scene, renderer, camera, balloon, and getState().
tests/smoke.mjs checks static balloon drift markers but has no route replay fixtures yet.
```

## Next implementation slice

```txt
TheOpenAbove Balloon Config Cutover + Route Result Fixture Gate
```

## Implementation order

```txt
preserve current visuals, controls, camera, HUD, and GameHost shape
  -> update README.md to describe hot-air-balloon drift, burner, vent, route gates, and landing
  -> update package.json description away from free-flight
  -> update Meadow Lift product copy away from thermals, wind gates, pitch, bank, boost, and sky perch
  -> add BALLOON_DRIFT to src/data/campaign.config.js
  -> move the live drift constants from src/main.js into BALLOON_DRIFT without behavior changes
  -> keep FLIGHT as compatibility-only until removal smoke exists
  -> add ALTITUDE_BANDS for low-clearance, route-gate, high-drift, and landing-window states
  -> add ROUTE_OBJECTS for buoyancy-gate-01, buoyancy-gate-02, buoyancy-gate-03, and meadow-perch-landing
  -> add WIND_LANE_HINTS for readable route guidance
  -> create a pure altitude band resolver
  -> create a pure route object evaluator
  -> create route order policy
  -> create RouteEventResult envelopes
  -> create route state reducer and event journal
  -> create Meadow Lift mission reducer
  -> create Cloud Basin progression reducer
  -> project local.mission, local.progression, local.routeObjects, local.routeEvents, local.routeDiagnostics, and local.routeFixture through GameHost
  -> add one compact HUD mission line
  -> add DOM-free route fixture cases to tests/smoke.mjs or adjacent smoke module
  -> defer host/render/world/camera/physics extraction until replay parity passes
```

## Acceptance target

```txt
README.md describes balloon drift instead of bird/free-flight controls
package.json description says hot-air-balloon drift
campaign.config.js exports BALLOON_DRIFT, ALTITUDE_BANDS, ROUTE_OBJECTS, and WIND_LANE_HINTS
main.js imports BALLOON_DRIFT and reads all live drift constants from it
FLIGHT is marked compatibility-only or protected by a smoke assertion proving it is not live authority
route event records include eventId, objectId, eventType, accepted, reason, before, after, and snapshotTick
accepted route attempts include reason=accepted
out-of-order attempts reject with reason=out_of_order
wrong-altitude attempts reject with reason=invalid_altitude_band
already-completed attempts reject with reason=already_completed
unknown route objects reject with reason=unknown_route_object
outside-radius attempts reject with reason=outside_radius
in-order fixture completes three buoyancy gates
valid landing fixture completes meadow-lift
cloud-basin unlocks only after meadow-lift completion
GameHost local snapshot exposes mission, progression, routeObjects, routeEvents, routeDiagnostics, and routeFixture
HUD adds only one compact mission line
DOM-free smoke proves route acceptance/rejection/landing/unlock behavior
host/render/world/camera/physics extraction remains out of scope
```

## Files changed in this run

```txt
LuminaryLabs-Publish/TheOpenAbove:.agent/trackers/2026-07-07T18-49-32-04-00/project-breakdown.md
LuminaryLabs-Publish/TheOpenAbove:.agent/README.md
LuminaryLabs-Publish/TheOpenAbove:.agent/kit-registry.json
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/TheOpenAbove.md
LuminaryLabs-Dev/LuminaryLabs:internal-change-log/2026-07-07T18-49-32-04-00-the-open-above-balloon-config-route-result-fixture-breakdown.md
```

## Validation

No runtime source code changed in this documentation run.

No local build or smoke test was run.
