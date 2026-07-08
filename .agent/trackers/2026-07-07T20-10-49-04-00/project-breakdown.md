# The Open Above Project Breakdown

**Run timestamp:** `2026-07-07T20-10-49-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch target:** `main`

**Selected repo:** `LuminaryLabs-Publish/TheOpenAbove`

**Excluded repo:** `LuminaryLabs-Publish/TheCavalryOfRome`

## Selection reason

`TheOpenAbove` was selected because the central repo ledger showed it as the oldest eligible tracked non-Cavalry repo at the start of this run.

Latest eligible timestamps checked from the central ledger:

```txt
TheOpenAbove     2026-07-07T18:49:32-04:00
AetherVale       2026-07-07T19:01:37-04:00
PhantomCommand   2026-07-07T19:08:52-04:00
PrehistoricRush  2026-07-07T19:18:58-04:00
MyCozyIsland     2026-07-07T19:29:28-04:00
IntoTheMeadow    2026-07-07T19:42:05-04:00
ZombieOrchard    2026-07-07T19:51:43-04:00
HorrorCorridor   2026-07-07T20:00:46-04:00
```

Accessible Publish repos seen:

```txt
LuminaryLabs-Publish/HorrorCorridor
LuminaryLabs-Publish/AetherVale
LuminaryLabs-Publish/TheOpenAbove
LuminaryLabs-Publish/TheCavalryOfRome
LuminaryLabs-Publish/PhantomCommand
LuminaryLabs-Publish/PrehistoricRush
LuminaryLabs-Publish/ZombieOrchard
LuminaryLabs-Publish/IntoTheMeadow
LuminaryLabs-Publish/MyCozyIsland
```

## Current read

`TheOpenAbove` is now visually a hot-air-balloon wind-drift slice, not a bird free-flight slice.

The live route is:

```txt
index.html
  -> src/main.js
  -> Three.js CDN + NexusEngine CDN
  -> CAMPAIGN / WORLD config
  -> hot-air-balloon object kit family
  -> inline balloon drift runtime
  -> Nexus Engine balloon telemetry runtime kit
  -> window.GameHost.getState()
```

The current blocker is **authority drift**:

```txt
README.md
  still says free-flight exploration, carving, gliding, diving, boosting, thermals, wind gates, pitch/bank controls, and sky perch return

package.json
  still says standalone free-flight exploration

docs/GAME_DESIGN.md
  still frames the player as a bird and the loop as thermals/gates/perch return

docs/TECHNICAL_ARCHITECTURE.md
  still names bird controller, bird follow camera, flight model, and flight extraction order

docs/ROADMAP.md
  still prioritizes flight model extraction, thermal readability, perch landing, and bird/flock content

src/data/campaign.config.js
  still exports CAMPAIGN, WORLD, and legacy FLIGHT only
  still uses thermalTarget, gateTarget, returnRadius, pitch/roll/boost/lift/thermal terms

src/main.js
  imports CAMPAIGN and WORLD only
  owns real balloon drift constants inline
  already exposes a useful snapshot() seam

tests/smoke.mjs
  validates static balloon markers
  does not yet prove config authority, route results, mission state, progression, or replay parity
```

The immediate next step should not be broad runtime extraction. It should make the hot-air-balloon product authority explicit and fixture-backed first.

## Interaction loop

### Current runtime loop

```txt
static host loads src/main.js
  -> create scene, camera, renderer, lights, fog, and frame loop
  -> generate terrain, lakes, trees, clouds, and wind ribbons
  -> build hot-air-balloon object from object/visual kits
  -> collect key state for burner and vent
  -> collect wheel state for camera zoom
  -> sample wind angle and wind speed inline
  -> integrate burner, vent, buoyancy, vertical damping, ceiling softness, velocity, position, altitude, and distance inline
  -> clamp balloon above terrain
  -> animate balloon visual kits
  -> update wind ribbons and basket-follow camera
  -> update small HUD telemetry
  -> publish Nexus Engine balloon telemetry resource/event
  -> expose local and nexusEngine snapshot through window.GameHost.getState()
```

### Target authority loop

```txt
load product authority
  -> resolve BALLOON_DRIFT as live balloon tuning source
  -> keep FLIGHT as legacy compatibility or remove it after smoke coverage
  -> resolve ALTITUDE_BANDS from route config
  -> resolve ROUTE_OBJECTS from route config
  -> resolve WIND_LANE_HINTS from route config
  -> project BalloonSourceSnapshot each tick
  -> evaluate route object proximity, order, altitude band, and completion state
  -> emit RouteEventResult for accepted and rejected attempts
  -> append RouteEventJournal
  -> reduce RouteState
  -> reduce MeadowLiftMissionState
  -> reduce RegionUnlockProgression
  -> project mission/progression/route diagnostics through GameHost
  -> show one compact HUD mission line
  -> prove route behavior through DOM-free replay fixtures
```

### Target player loop

```txt
spawn above Meadow Lift valley
  -> drift with wind using burner and vent
  -> read wind lane hints and altitude bands
  -> pass buoyancy gate 01 at valid altitude
  -> pass buoyancy gate 02 at valid altitude
  -> pass buoyancy gate 03 at valid altitude
  -> descend into meadow landing window
  -> complete Meadow Lift
  -> unlock Cloud Basin
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

## Services in use

### Implemented services

```txt
static canvas mount
HUD shell
error panel
Vite dev server
Vite build command
GitHub Pages base path
Three.js module import
NexusEngine module import
scene setup
camera setup
renderer setup
lighting setup
fog setup
shadow setup
terrainHeight sampler
moistureAt sampler
terrainColor sampler
terrain mesh construction
lake mesh construction
tree scatter construction
cloud construction
wind ribbon construction
hot-air-balloon composition
balloon panel construction
balloon mouth construction
balloon streamer construction
balloon seam construction
basket construction
rigging construction
burner construction
rope construction
balloon visual animation
keyboard burner input
keyboard vent input
wheel zoom input
inline wind angle sampling
inline wind speed sampling
inline buoyancy integration
inline ceiling softness
inline terrain clearance clamp
basket-follow camera projection
HUD telemetry projection
BalloonSnapshot Nexus resource
BalloonTicked Nexus event
engine.openAbove.getState()
window.GameHost.getState()
static marker smoke validation
```

### Services needed next

```txt
product copy authority audit
BALLOON_DRIFT authority
legacy FLIGHT compatibility guard
balloon drift config smoke
BalloonSourceSnapshot projection
ALTITUDE_BANDS source descriptor
altitude band resolver
ROUTE_OBJECTS source descriptor
WIND_LANE_HINTS source descriptor
route object evaluator
route order policy
RouteEventResult envelope
route event rejection reason catalog
route event journal
route state reducer
Meadow Lift mission reducer
Cloud Basin unlock progression reducer
mission/progression/route snapshot projector
GameHost route diagnostics projector
HUD route mission line projector
DOM-free route replay fixture harness
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
README.md still describes free-flight exploration and bird-like verbs.
README.md first milestone still says catch three thermals, fly through five wind gates, return to the sky perch, and unlock Cloud Basin.
README.md controls still use pitch, bank, boost, and restart language.
package.json description still says standalone free-flight exploration.
docs/GAME_DESIGN.md still says genre free-flight exploration / traversal adventure and core fantasy become a bird.
docs/GAME_DESIGN.md still defines the loop as launch from perch, dive/glide to gate, catch thermal lift, clear route gates, return to perch.
docs/TECHNICAL_ARCHITECTURE.md still describes flight state, bird controller, bird follow camera, and flight model extraction.
docs/ROADMAP.md still prioritizes deterministic flight smoke, thermal route readability, perch landing, and bird/flock content.
src/data/campaign.config.js exports CAMPAIGN, WORLD, and FLIGHT only.
src/data/campaign.config.js still has thermalTarget, gateTarget, returnRadius, and FLIGHT tuning.
src/main.js imports CAMPAIGN and WORLD only.
src/main.js initializes balloon position at [0, 105, 0].
src/main.js initializes velocity and wind at [8, 0, -10].
src/main.js initializes burner at 0.22 and vent at 0.
src/main.js coasting burner target is 0.18.
src/main.js wind angle baseline is -0.86.
src/main.js wind speed baseline is 9.4.
src/main.js buoyancy expression is 0.36 + burner * 3.7 - vent * 3.2.
src/main.js altitude damping is -verticalVelocity * 0.74.
src/main.js ceiling softness starts above y=270.
src/main.js vertical velocity clamp is [-8, 8].
src/main.js terrain clearance clamp is terrainHeight + 30.
src/main.js snapshot(status) already exposes route-ready local projection fields.
tests/smoke.mjs validates static balloon markers but not route semantics.
```

## Recommended next implementation slice

```txt
TheOpenAbove Product Copy Authority + Route Source Fixture Lock
```

### Intent

Make the hot-air-balloon experience the explicit product truth across docs, config, runtime tuning, diagnostics, and smoke fixtures.

### Ordered implementation

```txt
preserve current visible runtime, controls, camera, HUD telemetry, and GameHost shape
  -> update README.md away from bird free-flight terms
  -> update package.json description away from free-flight terms
  -> update docs/GAME_DESIGN.md to balloon drift, burner/vent, altitude bands, buoyancy gates, and meadow landing
  -> update docs/TECHNICAL_ARCHITECTURE.md to balloon controller, balloon drift model, basket-follow camera, route source authority, and fixture harness
  -> update docs/ROADMAP.md around balloon config authority, route fixtures, Meadow Lift completion, and Cloud Basin unlock
  -> add BALLOON_DRIFT beside legacy FLIGHT in src/data/campaign.config.js
  -> move live drift constants from src/main.js into BALLOON_DRIFT without changing behavior
  -> keep FLIGHT as compatibility-only until a later smoke proves no live runtime dependency
  -> add ALTITUDE_BANDS for low-clearance, buoyancy-gate, high-drift, and landing-window
  -> add ROUTE_OBJECTS for buoyancy-gate-01, buoyancy-gate-02, buoyancy-gate-03, and meadow-perch-landing
  -> add WIND_LANE_HINTS for readable route guidance
  -> create pure altitude band resolver
  -> create pure route object evaluator
  -> create route order policy
  -> create stable RouteEventResult envelope
  -> create route state reducer and event journal
  -> create Meadow Lift mission reducer
  -> create Cloud Basin progression reducer
  -> project route/mission/progression/fixture state through GameHost
  -> add one compact HUD mission line
  -> add DOM-free route replay smoke
  -> keep host/render/world/camera/physics extraction out of scope until route fixture passes
```

## Acceptance target

```txt
README/package/docs describe hot-air-balloon drift, burner, vent, route objects, altitude bands, and meadow landing.
Legacy bird/free-flight wording is removed from active product docs or clearly marked historical.
src/data/campaign.config.js exports BALLOON_DRIFT, ALTITUDE_BANDS, ROUTE_OBJECTS, and WIND_LANE_HINTS.
src/main.js reads live drift constants from BALLOON_DRIFT.
Current balloon visuals, burner/vent feel, camera, HUD, and GameHost remain stable.
RouteEventResult includes eventId, objectId, eventType, accepted, reason, before, after, and snapshotTick.
Accepted attempts use reason=accepted.
Out-of-order attempts reject with reason=out_of_order.
Wrong-altitude attempts reject with reason=invalid_altitude_band.
Already-completed route objects reject with reason=already_completed.
Unknown route objects reject with reason=unknown_route_object.
Outside-radius attempts reject with reason=outside_radius.
In-order fixture completes three buoyancy gates.
Valid landing fixture completes meadow-lift.
Cloud Basin unlocks only after meadow-lift completion.
window.GameHost.getState().local exposes mission, progression, routeObjects, routeEvents, routeDiagnostics, and routeFixture.
HUD shows one compact mission line.
DOM-free smoke proves in-order, out-of-order, invalid-altitude, already-completed, unknown-object, outside-radius, landing, and unlock behavior.
```

## Files changed in this run

```txt
LuminaryLabs-Publish/TheOpenAbove:.agent/trackers/2026-07-07T20-10-49-04-00/project-breakdown.md
LuminaryLabs-Publish/TheOpenAbove:.agent/README.md
LuminaryLabs-Publish/TheOpenAbove:.agent/kit-registry.json
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/TheOpenAbove.md
LuminaryLabs-Dev/LuminaryLabs:internal-change-log/2026-07-07T20-10-49-04-00-the-open-above-product-copy-route-source-breakdown.md
```

## Validation

No runtime source files changed.

No local build or smoke test was run.
