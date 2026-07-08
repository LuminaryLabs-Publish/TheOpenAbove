# The Open Above Project Breakdown

**Run timestamp:** `2026-07-07T22:50:39-04:00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch target:** `main`

**Selected next slice:** `TheOpenAbove Route Result Contract + Mission Progression Replay Gate`

## Summary

`TheOpenAbove` is still the correct repo for this rotation pass because it has the oldest latest central-ledger timestamp among the eligible non-Cavalry Publish repos after the latest HorrorCorridor update. The repo is visually and mechanically a hot-air-balloon drift game, but several active product-facing files still describe the older bird/free-flight loop.

This pass keeps the next work intentionally narrow: make route result contracts and mission progression replayable without destabilizing the existing balloon runtime.

## Selection reason

`LuminaryLabs-Publish/TheOpenAbove` was selected because the central repo ledger showed it as the oldest eligible tracked non-Cavalry Publish repo by latest review timestamp.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

Latest eligible timestamps checked for this pass:

```txt
TheOpenAbove     2026-07-07T21:29:47-04:00
AetherVale       2026-07-07T21:39:36-04:00
PhantomCommand   2026-07-07T21:50:56-04:00
PrehistoricRush  2026-07-07T21:59:06-04:00
MyCozyIsland     2026-07-07T22:11:41-04:00
IntoTheMeadow    2026-07-07T22:20:00-04:00
ZombieOrchard    2026-07-07T22:31:24-04:00
HorrorCorridor   2026-07-07T22:41:23-04:00
```

## Current repo read

The active route is:

```txt
index.html
  -> src/main.js
  -> Three.js CDN
  -> NexusEngine CDN
  -> CAMPAIGN/WORLD config
  -> hot-air-balloon object kit family
  -> inline balloon drift runtime
  -> window.GameHost.getState()
```

The runtime already creates the Three.js scene, fog, lights, terrain, lakes, trees, clouds, wind ribbons, balloon object, keyboard input, scroll zoom, basket-follow camera, HUD telemetry, Nexus Engine telemetry resource, and `window.GameHost` debug surface.

The strongest blocker is **product/source authority drift**:

```txt
README/package/docs/config still describe older bird/free-flight goals
src/data/campaign.config.js still exposes legacy FLIGHT terms
src/main.js owns the live balloon drift numbers inline
route objects, route event results, mission snapshots, progression snapshots, and DOM-free route replay do not exist yet
```

The visible runtime should remain canonical as hot-air-balloon drift.

## Interaction loop

### Current player-facing loop

```txt
open app
  -> read balloon drift HUD
  -> hold Space/W/ArrowUp for burner lift
  -> hold S/ArrowDown/Shift for venting descent
  -> drift with procedural wind
  -> scroll to zoom basket-follow camera
  -> read altitude, wind, and distance telemetry
```

### Current runtime loop

```txt
load src/main.js
  -> import Three.js and Nexus Engine from CDN
  -> import CAMPAIGN and WORLD from campaign config
  -> build terrain, lakes, trees, clouds, and wind ribbons
  -> build composite hot-air-balloon object
  -> initialize state.position, velocity, wind, verticalVelocity, altitude, burner, vent, elapsed, distance, and message inline
  -> listen for keydown/keyup/blur/wheel/resize
  -> each frame: sample burner/vent input
  -> compute wind angle and wind speed inline
  -> compute buoyancy, damping, ceiling softness, velocity, position, terrain clearance, altitude, and distance inline
  -> copy state to balloon object and animate balloon sub-kits
  -> move wind ribbons
  -> tick Nexus Engine telemetry kit
  -> update basket-follow camera
  -> update HUD telemetry
  -> expose nexus/local snapshots through window.GameHost.getState()
```

### Target authority loop

```txt
load canonical product copy and config authority
  -> read BALLOON_DRIFT for all drift constants currently inline in src/main.js
  -> read ALTITUDE_BANDS for named altitude legality
  -> read ROUTE_OBJECTS for buoyancy gates and meadow landing
  -> read WIND_LANE_HINTS for readable route guidance
  -> build BalloonSourceSnapshot from local balloon state
  -> resolve current altitude band
  -> evaluate current route object proximity and altitude validity
  -> return RouteEventResult records for accepted and rejected attempts
  -> apply RouteStateReducer
  -> apply MeadowLiftMissionReducer
  -> apply RegionUnlockProgressionReducer
  -> project mission/progression/route diagnostics through GameHost
  -> replay route fixtures without DOM/Three/Peer state
```

## Domains in use

```txt
static-page-host
vite-static-publish-host
third-party-cdn-runtime
three-render-host
nexus-engine-telemetry
campaign-config
product-copy-authority
legacy-flight-compatibility
balloon-input-map
balloon-vehicle-state
balloon-drift-physics
wind-field
altitude-safety
terrain-sampler
world-generation
lake-generation
tree-generation
cloud-generation
wind-ribbon-generation
basket-follow-camera
hud-telemetry
window-gamehost-debug
balloon-visual-object
balloon-envelope-panel
balloon-mouth
balloon-streamer-fit
balloon-fabric-seam
balloon-envelope-compat
balloon-basket
balloon-rigging
balloon-burner
rope-geometry
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
route-replay-parity
static-smoke-validation
route-event-smoke-validation
```

## Services captured

### Runtime host service

```txt
mount-canvas
mount-hud
mount-error-panel
show-fatal-runtime-error
create-scene
create-camera
create-renderer
install-resize-handler
install-keyboard-input-handler
install-wheel-zoom-handler
run-animation-loop
clamp-frame-dt
tick-nexus-engine
render-frame
expose-window-gamehost
```

### Balloon telemetry service

```txt
define-openAbove-balloonSnapshot-resource
define-openAbove-balloonTicked-event
install-open-above-balloon-telemetry-kit
read-local-balloon-snapshot
write-balloonSnapshot-resource
emit-balloonTicked-event
expose-engine-openAbove-getState
```

### Balloon drift service

```txt
read-burner-input
read-vent-input
smooth-burner-value
smooth-vent-value
sample-wind-angle
sample-wind-speed
write-wind-vector
compute-buoyancy
compute-altitude-damping
compute-ceiling-softness
integrate-vertical-velocity
blend-velocity-toward-wind
integrate-position
sample-terrain-height
clamp-above-terrain-clearance
compute-altitude
accumulate-horizontal-distance
```

### World generation service

```txt
seed-random
sample-terrain-height
sample-moisture
sample-terrain-color
build-terrain-geometry
build-lake-discs
scatter-trees
build-cloud-groups
build-wind-ribbon-lines
```

### Balloon visual object service

```txt
build-hot-air-balloon
build-envelope-panels
build-balloon-mouth
build-fitted-streamers
build-fabric-seams
build-envelope-compat-layer
build-basket
build-rigging
build-burner
build-soft-ropes
animate-hot-air-balloon
animate-rigging
animate-burner
```

### Camera and HUD service

```txt
resolve-wind-forward-vector
resolve-side-vector
read-scroll-zoom
compute-basket-focus
compute-follow-camera-position
smooth-camera-position
look-at-basket-focus
format-heat-state
format-altitude-telemetry
format-wind-telemetry
format-distance-telemetry
write-hud-html
```

### Route authority service

```txt
load-route-object-descriptors
load-altitude-bands
load-wind-lane-hints
create-balloon-source-snapshot
resolve-altitude-band
evaluate-route-object-distance
evaluate-route-object-altitude
evaluate-route-order
create-route-event-result
attach-before-route-state
attach-after-route-state
attach-snapshot-tick
append-route-event-journal
reduce-route-object-state
reduce-meadow-lift-mission-state
reduce-region-unlock-progression
project-route-diagnostics
```

### Fixture and smoke service

```txt
run-static-file-existence-checks
run-balloon-runtime-marker-checks
run-visual-kit-marker-checks
run-product-copy-canonical-checks
run-drift-config-authority-checks
run-route-fixture-in-order-check
run-route-fixture-out-of-order-check
run-route-fixture-invalid-altitude-check
run-route-fixture-already-completed-check
run-route-fixture-unknown-object-check
run-route-fixture-outside-radius-check
run-route-fixture-landing-check
run-route-fixture-progression-unlock-check
normalize-route-fixture-snapshot
assert-route-replay-parity
```

## Kit inventory

### Implemented source-backed kits

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

### Implemented inline/candidate kits

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
open-above-mission-progression-replay-kit
```

### Deferred extraction kits

```txt
open-above-render-host-extraction-kit
open-above-world-generation-extraction-kit
open-above-balloon-physics-extraction-kit
open-above-camera-extraction-kit
open-above-hud-extraction-kit
open-above-save-state-kit
open-above-cloud-basin-region-kit
open-above-audio-ambience-kit
open-above-accessibility-input-kit
```

## Source seams

```txt
README.md
  still describes free-flight exploration with carving, gliding, diving, boosting, thermals, wind gates, and perch return.

package.json
  still describes the repo as a standalone free-flight exploration game.

src/data/campaign.config.js
  still exports CAMPAIGN, WORLD, and legacy FLIGHT only.
  first region copy still talks about carving through ancient canopy and sky perch.
  objectives still use thermalTarget, gateTarget, returnRadius, and timeLimitSeconds.
  FLIGHT still uses pitch, roll, yaw, boost, thermalLift, and terrainClearance terms.

src/main.js
  already imports CAMPAIGN and WORLD.
  does not import FLIGHT, which means FLIGHT is legacy config in practice.
  owns live burner/vent/wind/buoyancy/damping/ceiling/terrain-clearance constants inline.
  owns snapshot() and GameHost projection inline.

tests/smoke.mjs
  verifies required files and balloon runtime markers.
  verifies object kit markers.
  does not yet validate canonical product copy, drift config authority, route objects, route result contracts, or DOM-free route replay.
```

## Next implementation slice

```txt
TheOpenAbove Route Result Contract + Mission Progression Replay Gate
```

### Goal

Make the current balloon runtime source-authoritative enough to support mission progression without changing the visible scene.

### Checklist

```txt
[ ] Preserve current balloon visuals, input feel, camera feel, HUD baseline, and window.GameHost.getState().
[ ] Update active product copy away from bird/free-flight terms.
[ ] Add BALLOON_DRIFT to src/data/campaign.config.js.
[ ] Move live drift constants from src/main.js into BALLOON_DRIFT.
[ ] Keep FLIGHT only as explicitly legacy compatibility until removed.
[ ] Add ALTITUDE_BANDS.
[ ] Add ROUTE_OBJECTS for buoyancy-gate-01, buoyancy-gate-02, buoyancy-gate-03, and meadow-landing.
[ ] Add WIND_LANE_HINTS.
[ ] Add a pure altitude-band resolver.
[ ] Add a pure route object evaluator.
[ ] Add route order policy.
[ ] Add RouteEventResult records.
[ ] Add stable route rejection reasons.
[ ] Add route object reducer and route event journal.
[ ] Add Meadow Lift mission reducer.
[ ] Add Region Unlock progression reducer.
[ ] Project mission/progression/routeObjects/routeEvents/routeDiagnostics/routeFixture in GameHost local state.
[ ] Add one compact HUD mission line.
[ ] Add DOM-free route replay smoke.
[ ] Keep host/render/world/camera/physics extraction out of this slice.
```

## Acceptance target

```txt
README/package/docs describe hot-air-balloon drift, burner, vent, altitude bands, buoyancy gates, meadow landing, route objects, and Cloud Basin unlock.
Legacy bird/free-flight wording is removed from active product copy or explicitly marked historical.
src/data/campaign.config.js exports BALLOON_DRIFT, ALTITUDE_BANDS, ROUTE_OBJECTS, and WIND_LANE_HINTS.
src/main.js reads the live drift constants from BALLOON_DRIFT with no visible behavior change.
RouteEventResult includes eventId, objectId, eventType, accepted, reason, before, after, and snapshotTick.
Accepted attempts use reason=accepted.
Out-of-order attempts reject with reason=out_of_order.
Wrong-altitude attempts reject with reason=invalid_altitude_band.
Already-completed route objects reject with reason=already_completed.
Unknown route objects reject with reason=unknown_route_object.
Outside-radius attempts reject with reason=outside_radius.
In-order route fixture completes three buoyancy gates.
Valid meadow landing fixture completes meadow-lift.
Cloud Basin unlocks only after meadow-lift completion.
window.GameHost.getState().local exposes mission, progression, routeObjects, routeEvents, routeDiagnostics, and routeFixture.
DOM-free smoke proves accepted, rejected, landing, and unlock behavior.
```

## Push note

Only `.agent` documentation is updated in this pass. No runtime source files were changed and no local build/smoke test was run.
