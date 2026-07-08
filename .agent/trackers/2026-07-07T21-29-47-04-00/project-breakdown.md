# The Open Above Project Breakdown

**Run timestamp:** `2026-07-07T21:29:47-04:00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch target:** `main`

**Selected next slice:** `Balloon Drift Config Authority + Route Fixture Replay Lock`

## Plan ledger

**Goal:** Refresh the internal repo docs for `TheOpenAbove`, keep the review limited to one Publish repo, document the current interaction loop, domains, kit services, and kit inventory, then record the next implementation slice in the central LuminaryLabs ledger.

**Checklist**

```txt
[x] Confirm Publish org accessibility.
[x] Exclude LuminaryLabs-Publish/TheCavalryOfRome.
[x] Compare central ledger review timestamps.
[x] Select the oldest eligible tracked non-Cavalry repo.
[x] Inspect runtime entrypoints, product docs, campaign config, smoke test, and balloon object kit.
[x] Identify current interaction loop.
[x] Identify target interaction loop.
[x] Identify domains in use.
[x] Identify services each kit/domain should offer.
[x] Identify explicit, candidate, next-cut, and deferred kits.
[x] Create timestamped tracker entry under root .agent.
[x] Update root .agent README.
[x] Update root .agent kit registry.
[x] Mirror findings into LuminaryLabs-Dev/LuminaryLabs.
```

## Selection reason

`LuminaryLabs-Publish/TheOpenAbove` was selected because the central ledger showed it as the oldest eligible tracked non-Cavalry Publish repo by latest review timestamp at the start of this run.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

Latest eligible timestamps checked from central ledger:

```txt
TheOpenAbove     2026-07-07T20:10:49-04:00
AetherVale       2026-07-07T20:21:40-04:00
PhantomCommand   2026-07-07T20:31:21-04:00
PrehistoricRush  2026-07-07T20:38:27-04:00
MyCozyIsland     2026-07-07T20:50:10-04:00
IntoTheMeadow    2026-07-07T20:59:30-04:00
ZombieOrchard    2026-07-07T21:09:57-04:00
HorrorCorridor   2026-07-07T21:18:45-04:00
```

Accessible Publish repos seen:

```txt
LuminaryLabs-Publish/HorrorCorridor
LuminaryLabs-Publish/AetherVale
LuminaryLabs-Publish/TheOpenAbove
LuminaryLabs-Publish/TheCavalryOfRome   excluded
LuminaryLabs-Publish/PhantomCommand
LuminaryLabs-Publish/PrehistoricRush
LuminaryLabs-Publish/ZombieOrchard
LuminaryLabs-Publish/IntoTheMeadow
LuminaryLabs-Publish/MyCozyIsland
```

## Current read

`TheOpenAbove` is now visually and mechanically a cozy hot-air-balloon wind-drift slice.

The active runtime already provides:

```txt
Vite static shell
Three.js scene
Nexus Engine telemetry resource/event
procedural valley terrain
lakes
trees
clouds
wind ribbons
composite procedural hot-air-balloon object
burner / vent controls
wind and buoyancy integration
basket-follow camera
HUD telemetry
window.GameHost.getState()
static smoke coverage for balloon files and markers
```

The main blocker is still **source authority drift**:

```txt
README.md still describes free-flight, carving, gliding, diving, boosting, thermals, wind gates, pitch/bank controls, and sky perch return.
package.json still describes a standalone free-flight exploration game.
docs/GAME_DESIGN.md still frames the player as a bird.
docs/TECHNICAL_ARCHITECTURE.md still names bird controller, bird follow camera, flight model, and flight config.
docs/ROADMAP.md still prioritizes flight model extraction, thermal route readability, perch landing, and bird/flock content.
src/data/campaign.config.js still exports CAMPAIGN, WORLD, and FLIGHT only.
src/main.js imports CAMPAIGN and WORLD only, while actual balloon drift constants remain inline.
tests/smoke.mjs has static marker checks but no DOM-free route replay or mission/progression proof.
```

## Interaction loop

### Current implemented loop

```txt
load index.html
  -> mount canvas, HUD, and error panel
  -> import src/main.js
  -> import Three.js from jsDelivr
  -> import NexusEngine from jsDelivr GitHub CDN
  -> import CAMPAIGN and WORLD from src/data/campaign.config.js
  -> import buildHotAirBalloon and animateHotAirBalloon
  -> create scene, camera, renderer, fog, lights, shadows, and tone mapping
  -> generate terrain, lakes, trees, clouds, and wind ribbons inline
  -> build procedural hot-air-balloon group from visual object kits
  -> initialize mutable balloon state
  -> collect key input for burner and vent
  -> collect wheel input for camera zoom
  -> per frame update elapsed time
  -> smooth burner and vent values
  -> sample inline wind angle and wind speed
  -> integrate buoyancy, vertical damping, ceiling softness, velocity, position, altitude, and distance
  -> clamp balloon above terrain clearance
  -> copy state into balloon transform
  -> animate balloon burner and rigging sub-kits
  -> move wind ribbons
  -> tick Nexus Engine telemetry kit
  -> smooth basket-follow camera
  -> render Three scene
  -> update compact HUD telemetry
  -> expose local snapshot through window.GameHost.getState()
```

### Target authority loop

```txt
load product and route authority
  -> read canonical hot-air-balloon product language
  -> read BALLOON_DRIFT from campaign config
  -> read ALTITUDE_BANDS from campaign config
  -> read ROUTE_OBJECTS from campaign config
  -> read WIND_LANE_HINTS from campaign config
  -> preserve current visible balloon drift behavior
  -> create BalloonSourceSnapshot each tick
  -> resolve current altitude band
  -> evaluate route object proximity and required altitude band
  -> apply route order policy
  -> emit accepted or rejected RouteEventResult
  -> append route event journal
  -> reduce route object state
  -> reduce Meadow Lift mission state
  -> reduce Cloud Basin unlock progression
  -> project mission, progression, routeObjects, routeEvents, routeDiagnostics, and routeFixture through GameHost
  -> prove in-order, rejected, landing, and unlock behavior through DOM-free smoke
```

## Domains in use

```txt
static-page-host
vite-static-publish-host
third-party-cdn-runtime
runtime-host
three-render-host
nexus-engine-telemetry
campaign-config
product-copy-authority
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
balloon-envelope-panel
balloon-mouth
balloon-streamer-fit
balloon-fabric-seam
hot-air-balloon-envelope
hot-air-balloon-basket
hot-air-balloon-rigging
hot-air-balloon-burner
rope-soft-body
route-source-authority
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
meadow-lift-mission-state
meadow-lift-mission-reducer
mission-snapshot-projector
region-unlock-progression
route-fixture-contract
route-fixture-harness
route-fixture-snapshot
static-smoke-validation
route-event-smoke-validation
```

## Services by domain and kit boundary

### Static host services

```txt
mount canvas
mount HUD
mount error panel
route module script
preserve GitHub Pages base path
surface fatal runtime error text
```

### Runtime host services

```txt
bootstrap game
create seeded random source
own animation loop
own resize loop
own input listeners
normalize dt cap
call update
call engine.tick
call draw
call updateHud
publish window.GameHost
```

### Three render host services

```txt
create scene
create perspective camera
create WebGL renderer
configure pixel ratio
configure shadows
configure tone mapping
configure fog
configure sun light
configure hemisphere light
render scene
```

### Nexus telemetry services

```txt
define openAbove.balloonSnapshot resource
define openAbove.balloonTicked event
define open-above-balloon-telemetry-kit
write latest snapshot into Nexus world
emit altitude, windSpeed, and burner facts
install engine.openAbove.getState
```

### Campaign and config services

```txt
provide campaign id
provide first region id
provide region list
provide region objectives
provide world seed
provide terrain tuning
provide tree count
currently preserve legacy FLIGHT tuning
next provide BALLOON_DRIFT
next provide ALTITUDE_BANDS
next provide ROUTE_OBJECTS
next provide WIND_LANE_HINTS
```

### Product copy authority services

```txt
audit active README copy
audit package description
audit game design doc
audit technical architecture doc
audit roadmap
delete or mark legacy bird/free-flight wording
make hot-air-balloon drift canonical
name burner, vent, altitude bands, buoyancy gates, meadow landing, and Cloud Basin unlock consistently
```

### Balloon input services

```txt
capture Space and W as burner
capture ArrowUp as burner
capture S and ArrowDown as vent
capture ShiftLeft and ShiftRight as vent
clear keys on blur
capture wheel as zoom
clamp zoom range
```

### Balloon state services

```txt
own position
own velocity
own wind vector
own vertical velocity
own altitude
own burner scalar
own vent scalar
own elapsed time
own drift distance
own status message
serialize snapshot fields
```

### Balloon drift services

```txt
smooth burner target
smooth vent target
sample wind angle
sample wind speed
compute buoyancy
apply vertical damping
apply ceiling softness
clamp vertical velocity
blend velocity toward wind and vertical velocity
integrate position
sample ground height
apply terrain clearance clamp
compute terrain-relative altitude
accumulate horizontal drift distance
```

### Wind and terrain services

```txt
sample terrainHeight
sample moistureAt
sample terrainColor
build terrain mesh
build lake meshes
scatter tree groups
scatter cloud groups
build wind ribbon curves
advance wind ribbon offset
```

### Basket camera services

```txt
normalize wind-forward frame
compute side vector
read zoom
compute basket focus
compute offset camera position
smooth camera position
look at basket focus
```

### Visual object kit services

```txt
build composite hot-air-balloon group
build triangulated envelope panels
build open balloon mouth
build surface-fitted streamers
build fabric seams
build basket
build rigging
build burner
build soft striped ropes
animate burner
animate rigging
provide compatibility install hook for old vehicle host
```

### Route authority services

```txt
own route descriptors
own route object ids
own gate positions
own landing object
own object radius
own required altitude band
own sequence index
resolve active object
classify accepted attempt
classify out_of_order attempt
classify invalid_altitude_band attempt
classify already_completed attempt
classify unknown_route_object attempt
classify outside_radius attempt
emit RouteEventResult
append accepted and rejected route journal
reduce route state
reduce mission state
unlock Cloud Basin after valid Meadow Lift completion
```

### Fixture and smoke services

```txt
run static marker smoke
run product-copy audit smoke
run BALLOON_DRIFT config smoke
run altitude band resolver smoke
run in-order route replay
run out-of-order rejection replay
run invalid-altitude rejection replay
run already-completed rejection replay
run unknown-object rejection replay
run outside-radius rejection replay
run landing replay
run Cloud Basin unlock replay
prove DOM-free final snapshot parity
```

## Kit inventory

### Explicit source-backed kits

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
open-above-audio-wind-kit
open-above-cloud-basin-region-kit
```

## Source facts captured

```txt
Live object type: hot-air-balloon
Runtime imports from config: CAMPAIGN, WORLD
Config exports today: CAMPAIGN, WORLD, FLIGHT
Telemetry kit: open-above-balloon-telemetry-kit
Nexus resource: openAbove.balloonSnapshot
Nexus event: openAbove.balloonTicked
Window host: window.GameHost
Window host snapshot branch: getState().local and getState().nexusEngine
Static smoke command: npm run check
Build command: npm run build
```

Inline drift constants to source-own next:

```txt
initialPosition: [0, 105, 0]
initialVelocity: [8, 0, -10]
initialWind: [8, 0, -10]
initialBurner: 0.22
coastBurnerTarget: 0.18
burnerSmoothRate: 3.2
ventSmoothRate: 3.6
windAngleBase: -0.86
windAngleSlowAmp: 0.32
windAngleFastAmp: 0.08
windSpeedBase: 9.4
windSpeedSlowAmp: 2.1
windSpeedWideAmp: 1.4
buoyancyBase: 0.36
burnerLift: 3.7
ventForce: 3.2
verticalDamping: 0.74
ceilingY: 270
ceilingSoftness: 0.024
gravityBias: 0.92
verticalVelocityMin: -8
verticalVelocityMax: 8
terrainClearance: 30
velocityBlendRate: 1.15
```

## Recommended next implementation slice

```txt
TheOpenAbove Balloon Drift Config Authority + Route Fixture Replay Lock
```

### Build order

```txt
1. Preserve the current visible balloon runtime, controls, camera, HUD, GameHost, and smoke command.
2. Update active README, package description, game design, architecture, and roadmap copy to hot-air-balloon drift.
3. Keep any bird/free-flight language only in explicit historical migration/reference docs.
4. Add BALLOON_DRIFT to src/data/campaign.config.js using current inline values.
5. Import BALLOON_DRIFT in src/main.js and replace inline numeric drift constants without changing behavior.
6. Mark FLIGHT as compatibility-only until no live dependency remains.
7. Add ALTITUDE_BANDS for low-clearance, buoyancy-gate, high-drift, and meadow-landing windows.
8. Add ROUTE_OBJECTS for buoyancy-gate-01, buoyancy-gate-02, buoyancy-gate-03, and meadow-landing.
9. Add WIND_LANE_HINTS for readable route guidance.
10. Add pure altitude band resolver.
11. Add pure route object evaluator.
12. Add route order policy.
13. Add RouteEventResult envelopes.
14. Add stable rejection reasons: accepted, out_of_order, invalid_altitude_band, already_completed, unknown_route_object, outside_radius.
15. Add route event journal.
16. Add route state reducer.
17. Add Meadow Lift mission reducer.
18. Add Cloud Basin unlock progression reducer.
19. Project local.mission, local.progression, local.routeObjects, local.routeEvents, local.routeDiagnostics, and local.routeFixture in GameHost snapshot.
20. Add one compact HUD mission line.
21. Add DOM-free replay smoke for accepted gates, rejected attempts, landing, and unlock.
22. Defer host/render/world/camera/physics extraction until route replay smoke passes.
```

## Acceptance target

```txt
README/package/docs consistently describe a hot-air-balloon drift game.
Active product docs no longer use bird controller, pitch/bank, gliding, diving, boosting, thermal gate, flock, or sky-perch authority unless marked historical.
BALLOON_DRIFT owns the current runtime values.
src/main.js reads BALLOON_DRIFT without visual or feel regression.
ALTITUDE_BANDS, ROUTE_OBJECTS, and WIND_LANE_HINTS exist in config.
RouteEventResult has eventId, objectId, eventType, accepted, reason, before, after, and snapshotTick.
Out-of-order attempts reject with out_of_order.
Wrong-altitude attempts reject with invalid_altitude_band.
Repeat attempts reject with already_completed.
Unknown ids reject with unknown_route_object.
Outside-radius attempts reject with outside_radius.
In-order route fixture completes three buoyancy gates.
Valid meadow landing completes Meadow Lift.
Cloud Basin unlocks only after Meadow Lift completion.
window.GameHost.getState().local exposes mission, progression, routeObjects, routeEvents, routeDiagnostics, and routeFixture.
HUD stays compact.
DOM-free smoke proves route result parity.
```

## Not changed in this run

```txt
No runtime source files changed.
No product docs outside .agent changed.
No local build was run.
No local smoke test was run.
```