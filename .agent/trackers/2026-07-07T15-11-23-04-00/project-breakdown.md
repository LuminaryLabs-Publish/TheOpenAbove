# TheOpenAbove Agent Breakdown

**Timestamp:** `2026-07-07T15-11-23-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch target:** `main`

**Selected by:** oldest tracked non-Cavalry Publish repo by central ledger `Last updated` timestamp.

## Selection ledger

```txt
eligible repo timestamps checked:
  TheOpenAbove     2026-07-07T13:50:54-04:00
  PhantomCommand   2026-07-07T14:00:18-04:00
  PrehistoricRush  2026-07-07T14:11:48-04:00
  MyCozyIsland     2026-07-07T14:21:20-04:00
  IntoTheMeadow    2026-07-07T14:28:17-04:00
  ZombieOrchard    2026-07-07T14:40:17-04:00
  HorrorCorridor   2026-07-07T14:51:44-04:00
  AetherVale       2026-07-07T16-29-18-04-00

excluded:
  LuminaryLabs-Publish/TheCavalryOfRome
```

`TheOpenAbove` is the oldest eligible tracked repo after the last HorrorCorridor run. Cavalry remains excluded by standing rule.

## Current read

`TheOpenAbove` is already a hot-air-balloon runtime in practice. The live browser slice loads `src/main.js`, imports Three.js and Nexus Engine, builds procedural terrain / lakes / trees / clouds / wind ribbons, builds the procedural hot-air-balloon object, collects burner / vent / zoom input, integrates wind drift and altitude, renders a basket-follow camera, updates HUD telemetry, publishes a Nexus Engine balloon snapshot, and exposes `window.GameHost.getState()`.

The source truth is still split:

```txt
README.md
  -> still says free-flight, carving, gliding, diving, boosting, thermals, wind gates, and sky perch return

package.json
  -> still describes a standalone free-flight exploration game

src/data/campaign.config.js
  -> still exports CAMPAIGN, WORLD, and legacy FLIGHT with pitch / roll / boost / thermal fields

src/main.js
  -> owns canonical live balloon drift constants inline
  -> owns route-ready snapshot() seam inline
  -> owns GameHost local snapshot projection inline
```

This run keeps the previously identified route fixture direction, but tightens the next build into **Route State Authority + Mission Snapshot Reducer Fixture Cutover**. The next source change should not jump to host/render/physics extraction. It should first create source-owned route state, stable route results, reducer snapshots, and smoke fixtures that prove Meadow Lift can be completed and Cloud Basin can unlock.

## Interaction loop

### Current implemented loop

```txt
load index.html
  -> mount canvas, HUD, and error panel
  -> import src/main.js
  -> import Three.js from jsDelivr
  -> import Nexus Engine from jsDelivr
  -> import CAMPAIGN and WORLD
  -> import buildHotAirBalloon / animateHotAirBalloon
  -> define local terrain, moisture, color, cloud, tree, and wind-ribbon helpers
  -> create Three.js scene / renderer / camera / lights / fog / shadow state
  -> build terrain, lakes, trees, clouds, and wind ribbons
  -> build hot-air-balloon visual object
  -> initialize mutable balloon state
  -> attach keyboard, blur, wheel, and resize listeners
  -> requestAnimationFrame(frame)
  -> update burner and vent from keys
  -> sample wind angle and wind speed
  -> integrate buoyancy, venting, damping, ceiling softness, velocity, position, altitude, and distance
  -> clamp above terrain clearance
  -> animate balloon, rigging, burner, and wind ribbons
  -> tick Nexus Engine telemetry
  -> draw basket-follow camera
  -> update HUD telemetry
  -> expose window.GameHost.getState()
```

### Intended player loop

```txt
start Meadow Lift
  -> see next route objective in a small mission line
  -> use burner to reach gate-cruise altitude
  -> drift into buoyancy-gate-01
  -> accept route event if gate order, altitude band, and radius are valid
  -> drift into buoyancy-gate-02
  -> drift into buoyancy-gate-03
  -> reject wrong gate order, wrong altitude, duplicate gate, unknown route object, and outside-radius attempts
  -> descend into landing-window altitude
  -> complete meadow-perch-landing
  -> mark Meadow Lift complete
  -> unlock Cloud Basin
  -> expose mission, progression, route object, route event, and fixture state through GameHost
```

### Recommended service loop

```txt
BalloonState snapshot
  -> BALLOON_DRIFT config authority
  -> altitude band resolver
  -> route object descriptor lookup
  -> route object evaluator
  -> route order policy
  -> route event result envelope
  -> route event journal
  -> route state reducer
  -> Meadow Lift mission reducer
  -> Cloud Basin progression reducer
  -> mission snapshot projector
  -> GameHost route diagnostics
  -> DOM-free route fixture smoke
```

## Domains in use

```txt
static-page-host
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
balloon-envelope-panel-geometry
balloon-mouth-geometry
balloon-streamer-fit-geometry
balloon-fabric-seam-geometry
balloon-basket-object
balloon-rigging-object
balloon-burner-object
rope-tube-object
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
region-unlock-progression
mission-snapshot-projector
route-fixture-contract
route-fixture-harness
route-fixture-snapshot
static-smoke-validation
route-event-smoke-validation
```

## Kit inventory

### Explicit current kits

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
open-above-legacy-flight-compatibility-kit
open-above-altitude-band-contract-kit
open-above-altitude-band-resolver-kit
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
open-above-meadow-lift-mission-reducer-kit
open-above-mission-snapshot-projector-kit
open-above-region-unlock-progression-kit
open-above-gamehost-route-diagnostics-kit
open-above-hud-route-mission-line-kit
open-above-route-event-smoke-kit
open-above-balloon-behavior-smoke-kit
```

### Follow-on kits

```txt
open-above-action-frame-kit
open-above-input-replay-journal-kit
open-above-save-progression-kit
open-above-region-streaming-kit
open-above-host-loop-extraction-kit
open-above-render-world-extraction-kit
open-above-balloon-physics-extraction-kit
open-above-world-object-render-descriptor-kit
```

## Services that kits offer

### Telemetry services

```txt
define BalloonSnapshot resource
define BalloonTicked event
set balloon snapshot resource each simulate tick
emit balloon tick event
install engine.openAbove.getState()
expose telemetry through window.GameHost.getState().nexusEngine
```

### Runtime host services

```txt
mount canvas / HUD / error panel
create scene / renderer / camera
wire resize / key / blur / wheel listeners
own requestAnimationFrame lifecycle
clamp dt
call update, engine.tick, draw, and HUD update
report fatal runtime errors
```

### Balloon drift services

```txt
initialize position / velocity / wind / altitude / burner / vent / elapsed / distance
resolve burner input
resolve vent input
sample wind angle
sample wind speed
integrate buoyancy
apply vent force
apply altitude damping
apply ceiling softness
blend velocity toward wind
integrate position
clamp to terrain clearance
compute altitude above terrain
increment drift distance
```

### Visual object services

```txt
build envelope panels
build open balloon mouth
build fitted streamers
build fabric seams
build basket
build rigging
build burner
build tube ropes
animate burner
animate rigging
attach compatibility controls for legacy vehicle host
export OpenAboveHotAirBalloonObjectKit on window
```

### Route state services

```txt
load route object descriptors
resolve current altitude band
evaluate route object proximity
evaluate required altitude band
evaluate route order
evaluate duplicate completion
create accepted route event
create rejected route event
append route event journal
reduce route object state
reduce Meadow Lift mission state
reduce Cloud Basin unlock state
project mission snapshot into GameHost
project route fixture snapshot into GameHost
```

### Smoke / fixture services

```txt
verify required files exist
verify current balloon marker coverage
verify legacy bird markers remain absent
run in-order gate fixture
run out-of-order rejection fixture
run invalid-altitude rejection fixture
run already-completed rejection fixture
run unknown-object rejection fixture
run outside-radius rejection fixture
run landing completion fixture
run Cloud Basin unlock fixture
emit normalized fixture summary
```

## Key findings

```txt
- README.md and package.json are stale compared with the live balloon runtime.
- CAMPAIGN still describes thermals, wind gates, and sky perch return.
- WORLD still exposes gateCount, thermalCount, perch, and flight-style start fields.
- FLIGHT is still legacy flight tuning with pitch, roll, boost, lift, and thermal constants.
- src/main.js imports only CAMPAIGN and WORLD, so FLIGHT appears unused by the live runtime.
- src/main.js already has the correct local snapshot seam for mission / route projection.
- src/main.js currently has no route object state, event journal, or mission reducer.
- tests/smoke.mjs already has strong static balloon marker coverage but no route fixture coverage.
- Hot-air-balloon object kits are well separated visually, so next work should not touch envelope, rope, rigging, or basket geometry unless route smoke reveals a visual dependency.
```

## Recommended next work

```txt
TheOpenAbove Route State Authority + Mission Snapshot Reducer Fixture Cutover
```

Build order:

```txt
preserve current balloon visuals, burner / vent controls, camera, HUD telemetry, and GameHost shape
  -> update README.md and package.json away from free-flight / bird-flight language
  -> update Meadow Lift copy away from thermals, wind gates, pitch, bank, boost, and sky-perch return
  -> add BALLOON_DRIFT beside legacy FLIGHT in src/data/campaign.config.js
  -> move live drift constants from src/main.js into BALLOON_DRIFT
  -> keep FLIGHT as compatibility-only until smoke confirms no live runtime dependency
  -> add ALTITUDE_BANDS for low-clearance, gate-cruise, high-drift, and landing-window
  -> add ROUTE_OBJECTS for buoyancy-gate-01, buoyancy-gate-02, buoyancy-gate-03, and meadow-perch-landing
  -> add WIND_LANE_HINTS for readable route guidance
  -> create pure altitude band resolver
  -> create pure route object evaluator
  -> create route event result envelope
  -> create route state reducer
  -> create route event journal
  -> create Meadow Lift mission reducer
  -> create Cloud Basin unlock progression reducer
  -> project local.mission, local.progression, local.routeObjects, local.routeEvents, local.routeDiagnostics, and local.routeFixture from snapshot()
  -> add one compact HUD mission line
  -> extend tests/smoke.mjs with DOM-free route fixture cases
  -> defer host extraction, render extraction, and balloon physics extraction until route smoke passes
```

## Acceptance targets

```txt
README.md describes hot-air-balloon drift, burner, vent, route gates, and landing
package.json description no longer says free-flight exploration
src/data/campaign.config.js exports BALLOON_DRIFT, ALTITUDE_BANDS, ROUTE_OBJECTS, and WIND_LANE_HINTS
FLIGHT is marked compatibility-only or is protected by smoke coverage proving it is not live authority
src/main.js reads live drift constants from BALLOON_DRIFT
route event records include eventId, objectId, accepted, reason, before, after, and snapshotTick
out-of-order route attempts reject with reason=out_of_order
wrong-altitude route attempts reject with reason=invalid_altitude_band
already-completed route objects reject with reason=already_completed
unknown route objects reject with reason=unknown_route_object
outside-radius attempts reject with reason=outside_radius
in-order route fixture completes three buoyancy gates
valid landing fixture completes meadow-lift
cloud-basin unlocks only after meadow-lift completion
window.GameHost.getState().local exposes mission, progression, routeObjects, routeEvents, routeDiagnostics, and routeFixture
HUD shows one compact mission line without adding noisy UI
DOM-free smoke proves in-order, out-of-order, invalid-altitude, already-completed, unknown-object, outside-radius, landing, and unlock behavior
host/render/physics extraction remains explicitly out of scope
```

## Validation

No runtime source code changed.

No local build or smoke test was executed.
