# The Open Above Project Breakdown

**Run timestamp:** `2026-07-07T17:29:51-04:00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch target:** `main`

**Selected slice:** `TheOpenAbove Route Replay Fixture Authority + Mission Snapshot Contract Lock`

## Summary

`TheOpenAbove` remains the oldest eligible tracked non-Cavalry Publish repo by central ledger timestamp at the start of this run. The live game is already a hot-air-balloon drift slice, but the source authority layer is still split between balloon-first runtime code and older free-flight / bird-flight product language.

This pass keeps the next implementation narrow: make balloon drift config authoritative, define replayable route object/event contracts, add mission/progression snapshots, and prove the Meadow Lift route through DOM-free fixtures before extracting host, renderer, world, camera, or physics services.

## Selection reason

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

Latest eligible timestamps checked from the central ledger:

```txt
TheOpenAbove     2026-07-07T16:21:09-04:00
AetherVale       2026-07-07T16:29:18-04:00
PhantomCommand   2026-07-07T16:30:00-04:00
PrehistoricRush  2026-07-07T16:40:29-04:00
MyCozyIsland     2026-07-07T16:49:08-04:00
IntoTheMeadow    2026-07-07T16:58:09-04:00
ZombieOrchard    2026-07-07T17:10:21-04:00
HorrorCorridor   2026-07-07T17:20:57-04:00
```

Therefore `LuminaryLabs-Publish/TheOpenAbove` was selected.

## Source evidence

```txt
package.json
  -> description still says standalone free-flight exploration game

README.md
  -> still describes carving, gliding, diving, boosting, thermals, wind gates, pitch, bank, boost, restart, and sky perch return

src/data/campaign.config.js
  -> CAMPAIGN still uses thermalTarget/gateTarget/returnRadius
  -> WORLD still has gateCount/thermalCount/perch/start flight tuning
  -> FLIGHT still exposes legacy pitch/roll/yaw/boost/thermal lift fields

src/main.js
  -> imports CAMPAIGN and WORLD only
  -> live control is burner / vent / zoom
  -> owns wind sampling, buoyancy, vent force, damping, ceiling softness, terrain clamp, distance, HUD, snapshot, telemetry, and GameHost projection inline

src/hot-air-balloon-object-kit.js
  -> composite object kit is explicit
  -> subdomains include envelope panels, mouth, streamers, seams, basket, rigging, burner, and rope

tests/smoke.mjs
  -> already protects balloon visual markers
  -> does not yet prove BALLOON_DRIFT, route data, mission snapshots, route rejections, or replay parity
```

## Current interaction loop

```txt
load index.html
  -> import src/main.js
  -> query canvas, HUD, and error panel
  -> import Three.js and NexusEngine from CDN
  -> import CAMPAIGN and WORLD
  -> import hot-air-balloon visual object kit
  -> create scene, camera, renderer, lights, fog, and shadows
  -> generate terrain, lakes, trees, clouds, and wind ribbons
  -> build hot-air-balloon object
  -> initialize inline balloon state
  -> listen for keydown, keyup, blur, wheel, and resize
  -> on each frame:
       read burner and vent key state
       sample inline wind angle and speed
       integrate buoyancy, damping, ceiling, velocity, position, altitude, and distance
       clamp above terrain
       move and animate balloon visual kits
       tick Nexus Engine telemetry
       update basket-follow camera
       render scene
       update HUD
  -> expose window.GameHost.getState().local and .nexusEngine
```

## Target interaction loop

```txt
start Meadow Lift
  -> load authoritative BALLOON_DRIFT, ALTITUDE_BANDS, ROUTE_OBJECTS, and WIND_LANE_HINTS
  -> pilot balloon with burner / vent
  -> resolve current altitude band
  -> evaluate the next route object from source descriptors
  -> emit accepted or rejected RouteEventResult records
  -> reduce route object state and route journal
  -> reduce Meadow Lift mission state
  -> unlock Cloud Basin only after valid landing completion
  -> project mission, progression, routeObjects, routeEvents, routeDiagnostics, and routeFixture through GameHost
  -> show one compact HUD mission line
  -> replay scripted route fixtures without DOM or Three.js
```

## Domain inventory

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
route-fixture-contract
route-fixture-harness
meadow-lift-mission-reducer
mission-snapshot-projector
region-unlock-progression
static-smoke-validation
route-event-smoke-validation
```

## Service inventory by domain

```txt
static-page-host
  -> canvas mount
  -> HUD shell
  -> error panel
  -> module script route

vite-static-publish-host
  -> dev server
  -> build command
  -> GitHub Pages base path
  -> smoke command

third-party-cdn-runtime
  -> Three.js module import
  -> Nexus Engine module import

runtime-host
  -> runtime bootstrap
  -> animation loop
  -> resize handling
  -> input listener registration
  -> fatal error reporting

three-render-host
  -> scene creation
  -> camera creation
  -> renderer creation
  -> lighting
  -> fog
  -> shadow setup
  -> tone mapping

nexus-telemetry
  -> BalloonSnapshot resource
  -> BalloonTicked event
  -> engine.openAbove.getState

campaign-config
  -> campaign id
  -> region list
  -> world seed
  -> current legacy objective counts
  -> target route source data

balloon-drift-config-authority
  -> burner floor
  -> burner smoothing
  -> vent smoothing
  -> buoyancy base
  -> burner force
  -> vent force
  -> vertical damping
  -> ceiling soft limit
  -> terminal vertical velocity
  -> terrain clearance
  -> wind sample fields
  -> initial state

balloon-input-map
  -> burner action from Space/W/ArrowUp
  -> vent action from S/ArrowDown/Shift
  -> zoom wheel clamp
  -> blur cleanup

balloon-vehicle-state
  -> position
  -> velocity
  -> wind vector
  -> vertical velocity
  -> altitude
  -> burner
  -> vent
  -> elapsed
  -> distance
  -> message

balloon-drift-physics
  -> wind sample
  -> buoyancy integration
  -> velocity blend
  -> position integration
  -> ground clamp
  -> distance accumulation

wind-field
  -> wind angle
  -> wind speed
  -> wind vector
  -> wind-lane hint projection

altitude-safety
  -> terrain clearance
  -> altitude computation
  -> landing validity
  -> ceiling pressure

altitude-band-contract
  -> low-clearance band
  -> route-gate band
  -> high-drift band
  -> landing-window band
  -> invalid/outside classification

terrain-sampler
  -> terrainHeight
  -> moistureAt
  -> terrainColor

world-generation
  -> terrain mesh
  -> lake meshes
  -> tree scatter
  -> cloud puffs
  -> wind ribbons

basket-follow-camera
  -> wind-forward frame
  -> side vector
  -> zoom state
  -> basket focus
  -> camera smoothing

hud-mission-telemetry
  -> heat label
  -> altitude label
  -> wind label
  -> drift distance label
  -> mission line

window-gamehost-debug
  -> engine handle
  -> scene handle
  -> renderer handle
  -> camera handle
  -> balloon handle
  -> local snapshot
  -> route diagnostics

balloon-visual-object
  -> composite balloon build
  -> envelope panels
  -> open mouth
  -> fitted streamers
  -> fabric seams
  -> basket
  -> rigging
  -> burner
  -> ropes
  -> visual animation

route-object-descriptor
  -> object ids
  -> route positions
  -> radius
  -> required altitude band
  -> required order
  -> event type

route-object-state
  -> entered flags
  -> completed flags
  -> last distance
  -> altitude status
  -> next expected route object

route-object-evaluator
  -> proximity check
  -> altitude check
  -> landing check
  -> current candidate object

route-order-policy
  -> in-order acceptance
  -> out-of-order rejection
  -> already-completed rejection

route-event-result-envelope
  -> event id
  -> object id
  -> event type
  -> accepted boolean
  -> reason
  -> before snapshot
  -> after snapshot
  -> snapshot tick

route-event-journal
  -> accepted events
  -> rejected events
  -> latest accepted
  -> latest rejected
  -> aggregate counts

route-state-reducer
  -> apply accepted event
  -> preserve state on rejected event
  -> route progress counters
  -> diagnostics snapshot

meadow-lift-mission-reducer
  -> current objective
  -> gate completion count
  -> landing completion
  -> mission complete flag
  -> player-facing mission message

mission-snapshot-projector
  -> local.mission
  -> local.progression
  -> local.routeObjects
  -> local.routeEvents
  -> local.routeDiagnostics
  -> local.routeFixture

region-unlock-progression
  -> meadow-lift-complete flag
  -> cloud-basin-unlocked flag
  -> progression snapshot

route-event-smoke-validation
  -> in-order fixture
  -> out-of-order fixture
  -> invalid-altitude fixture
  -> already-completed fixture
  -> unknown-object fixture
  -> outside-radius fixture
  -> landing fixture
  -> unlock fixture
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
open-above-route-fixture-contract-kit
open-above-route-fixture-harness-kit
open-above-route-fixture-snapshot-kit
open-above-route-replay-parity-kit
open-above-meadow-lift-mission-reducer-kit
open-above-mission-snapshot-projector-kit
open-above-region-unlock-progression-kit
open-above-gamehost-route-diagnostics-kit
open-above-hud-route-mission-line-kit
open-above-route-event-smoke-kit
open-above-balloon-behavior-smoke-kit
open-above-route-replay-authority-kit
open-above-mission-snapshot-contract-kit
```

## DSK map

```txt
TheOpenAbove
├─ static-page-host
├─ runtime-host
│  ├─ three-render-host
│  ├─ third-party-cdn-runtime
│  ├─ nexus-telemetry
│  └─ window-gamehost-debug
├─ balloon-domain
│  ├─ balloon-drift-config-authority
│  ├─ balloon-input-map
│  ├─ balloon-vehicle-state
│  ├─ balloon-drift-physics
│  ├─ wind-field
│  ├─ altitude-safety
│  └─ altitude-band-resolver
├─ world-domain
│  ├─ terrain-sampler
│  ├─ world-generation
│  ├─ wind-lane-hints
│  └─ basket-follow-camera
├─ visual-object-domain
│  └─ open-above-hot-air-balloon-object-kit
│     ├─ envelope-panel-kit
│     ├─ mouth-kit
│     ├─ streamer-fit-kit
│     ├─ fabric-seam-kit
│     ├─ basket-kit
│     ├─ rigging-kit
│     ├─ burner-kit
│     └─ rope-kit
├─ route-domain
│  ├─ route-object-descriptor
│  ├─ route-object-state
│  ├─ route-object-evaluator
│  ├─ route-order-policy
│  ├─ route-event-result-envelope
│  ├─ route-event-journal
│  └─ route-state-reducer
├─ mission-domain
│  ├─ meadow-lift-mission-reducer
│  ├─ mission-snapshot-projector
│  └─ region-unlock-progression
└─ validation-domain
   ├─ static-smoke-validation
   └─ route-event-smoke-validation
```

## Next implementation slice

```txt
TheOpenAbove Route Replay Fixture Authority + Mission Snapshot Contract Lock
```

### Ordered implementation plan

```txt
1. Preserve current visible balloon runtime, controls, camera, HUD, smoke, and GameHost shape.
2. Update README.md and package.json to describe hot-air-balloon drift instead of bird/free-flight.
3. Update Meadow Lift copy away from thermals, wind gates, pitch, bank, boost, and sky perch return.
4. Add BALLOON_DRIFT beside legacy FLIGHT in src/data/campaign.config.js.
5. Move current inline values from src/main.js into BALLOON_DRIFT without changing behavior.
6. Keep FLIGHT as compatibility-only until smoke proves it is not live authority.
7. Add ALTITUDE_BANDS for low-clearance, route-gate, high-drift, and landing-window states.
8. Add ROUTE_OBJECTS for buoyancy-gate-01, buoyancy-gate-02, buoyancy-gate-03, and meadow-perch-landing.
9. Add WIND_LANE_HINTS for readable route approach guidance.
10. Add a pure altitude band resolver.
11. Add a pure route object evaluator.
12. Add route order policy and stable rejection reasons.
13. Add RouteEventResult envelope with before/after state and snapshotTick.
14. Add route state reducer and route event journal.
15. Add Meadow Lift mission reducer.
16. Add Cloud Basin progression unlock reducer.
17. Project mission, progression, routeObjects, routeEvents, routeDiagnostics, and routeFixture through GameHost.
18. Add one compact HUD mission line.
19. Add DOM-free smoke fixtures for in-order completion, rejection reasons, landing, and unlock.
20. Defer host, renderer, world, camera, and balloon physics extraction until replay parity is passing.
```

## Acceptance target

```txt
README.md describes hot-air-balloon drift, burner, vent, route gates, and landing.
package.json no longer describes the game as generic free-flight exploration.
src/data/campaign.config.js exports BALLOON_DRIFT, ALTITUDE_BANDS, ROUTE_OBJECTS, and WIND_LANE_HINTS.
FLIGHT is explicitly compatibility-only or protected by smoke as unused by runtime authority.
src/main.js reads live drift constants from BALLOON_DRIFT.
RouteEventResult records include eventId, objectId, eventType, accepted, reason, before, after, and snapshotTick.
out-of-order attempts reject with reason=out_of_order.
wrong-altitude attempts reject with reason=invalid_altitude_band.
already-completed route objects reject with reason=already_completed.
unknown route objects reject with reason=unknown_route_object.
outside-radius attempts reject with reason=outside_radius.
in-order route fixture completes three buoyancy gates.
valid landing fixture completes meadow-lift.
cloud-basin unlocks only after meadow-lift completion.
window.GameHost.getState().local exposes mission, progression, routeObjects, routeEvents, routeDiagnostics, and routeFixture.
HUD shows one compact mission line without UI bloat.
DOM-free smoke proves route replay and rejection parity.
Runtime extraction remains out of scope.
```

## Validation note

No runtime source code was changed in this documentation pass. No local build or smoke test was run from this environment.
