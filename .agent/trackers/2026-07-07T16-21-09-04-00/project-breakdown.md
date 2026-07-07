# The Open Above Project Breakdown

**Run timestamp:** `2026-07-07T16:21:09-04:00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch target:** `main`

**Selected repo:** `LuminaryLabs-Publish/TheOpenAbove`

**Excluded repo:** `LuminaryLabs-Publish/TheCavalryOfRome`

## Summary

`TheOpenAbove` remains a standalone Vite / Three.js publish repo whose live runtime is already a hot-air-balloon wind-drift slice. The implementation has moved away from the old bird/free-flight product language, but repo docs and `src/data/campaign.config.js` still preserve the older carving / gliding / thermals / wind-gates authority model.

The next useful implementation slice is **Balloon Config Authority + Route Event Replay Smoke Gate**. This is a tighter version of the previous route-state plan: first make balloon drift and route source data authoritative, then add pure route-event envelopes, reducer results, event journals, mission snapshots, and DOM-free replay smoke before touching host/render/physics extraction.

## Selection reason

The central `LuminaryLabs-Dev/LuminaryLabs` repo ledger was checked before selecting a repo. `TheOpenAbove` had the oldest eligible non-Cavalry latest-review timestamp among the tracked Publish repos available in the ledger snapshot used for this run.

```txt
TheOpenAbove     2026-07-07T15:11:23-04:00
PhantomCommand   2026-07-07T15:19:05-04:00
PrehistoricRush  2026-07-07T15:29:27-04:00
MyCozyIsland     2026-07-07T15:40:06-04:00
IntoTheMeadow    2026-07-07T15:49:14-04:00
ZombieOrchard    2026-07-07T15:59:24-04:00
HorrorCorridor   2026-07-07T16:09:54-04:00
AetherVale       2026-07-07T16:29:18-04:00
```

Accessible Publish repos observed:

```txt
LuminaryLabs-Publish/IntoTheMeadow
LuminaryLabs-Publish/HorrorCorridor
LuminaryLabs-Publish/AetherVale
LuminaryLabs-Publish/ZombieOrchard
LuminaryLabs-Publish/MyCozyIsland
LuminaryLabs-Publish/TheOpenAbove
LuminaryLabs-Publish/PhantomCommand
LuminaryLabs-Publish/TheCavalryOfRome
LuminaryLabs-Publish/PrehistoricRush
```

## Reviewed source map

```txt
README.md
package.json
index.html
src/main.js
src/data/campaign.config.js
src/hot-air-balloon-object-kit.js
src/balloon-envelope-panel-kit.js
src/balloon-mouth-kit.js
src/balloon-streamer-fit-kit.js
src/balloon-fabric-seam-kit.js
src/hot-air-balloon-basket-kit.js
src/hot-air-balloon-rigging-kit.js
src/hot-air-balloon-burner-kit.js
src/rope-kit.js
tests/smoke.mjs
.agent/README.md
.agent/kit-registry.json
LuminaryLabs-Dev/LuminaryLabs repo-ledger files
```

## Current read

`index.html` already frames the page as `The Open Above: Balloon Drift`, exposes a hot-air-balloon canvas, and loads `src/main.js` directly.

`src/main.js` imports Three.js, Nexus Engine, campaign config, and the hot-air-balloon object kit. It owns the live scene bootstrap, terrain generation, water/lakes, tree scatter, clouds, wind ribbons, balloon object construction, keyboard input, wheel zoom, balloon state, drift integration, camera follow, HUD, Nexus telemetry, and `window.GameHost` projection.

`src/hot-air-balloon-object-kit.js` is a real visual object composition layer. It imports envelope panels, mouth, streamers, seams, basket, rigging, burner, and rope-dependent rigging, then exposes `buildHotAirBalloon()`, `animateHotAirBalloon()`, and `installHotAirBalloonVisual()`.

`README.md`, `package.json`, and `src/data/campaign.config.js` are now behind the runtime. They still describe free-flight, carving, gliding, diving, boosting, thermals, wind gates, pitch/bank controls, and the legacy `FLIGHT` tuning object. This is the main source-of-truth blocker.

`tests/smoke.mjs` verifies the balloon conversion, visual sub-kit markers, rope/tube behavior, basket-follow markers, and static files. It does not yet prove balloon config authority, route event semantics, mission completion, or Cloud Basin unlock behavior.

## Interaction loop

### Current browser loop

```txt
load index.html
  -> mount canvas#game, HUD, and error panel
  -> import src/main.js
  -> import Three.js from jsDelivr
  -> import NexusEngine from LuminaryLabs-Dev/NexusEngine main
  -> import CAMPAIGN, WORLD, and legacy FLIGHT from src/data/campaign.config.js
  -> import buildHotAirBalloon() and animateHotAirBalloon()
  -> create Three.js scene, camera, renderer, lights, fog, shadows, and tone mapping
  -> generate terrain from terrainHeight/moistureAt/terrainColor
  -> create lake disks
  -> scatter stylized trees
  -> scatter cloud puff groups
  -> create wind ribbon line groups
  -> build hot-air-balloon visual object
  -> initialize balloon state at position 0,105,0 with wind/velocity/burner/vent/distance/message
  -> create Nexus telemetry engine from snapshot()
  -> register keydown/keyup/blur/wheel/resize listeners
  -> requestAnimationFrame(frame)
  -> update burner/vent from key state
  -> sample wind angle and wind speed inline
  -> integrate buoyancy, venting, vertical damping, ceiling softness, wind blend, position, and altitude inline
  -> clamp balloon above terrain clearance
  -> animate balloon object kits
  -> move wind ribbons around balloon drift position
  -> update basket-follow camera
  -> render scene
  -> update HUD telemetry
  -> engine.tick(dt) publishes openAbove.balloonSnapshot and openAbove.balloonTicked
  -> expose window.GameHost.getState().local and .nexusEngine
```

### Target route product loop

```txt
start Meadow Lift
  -> show current route objective
  -> pilot balloon using burner / vent
  -> resolve current altitude band from authoritative ALTITUDE_BANDS
  -> drift toward buoyancy-gate-01
  -> route evaluator checks radius and altitude band
  -> route order policy accepts gate 01 only when it is the next expected object
  -> RouteEventResult records accepted transition
  -> route state reducer marks gate 01 complete
  -> repeat for buoyancy-gate-02 and buoyancy-gate-03
  -> reject out-of-order, invalid-altitude, already-completed, unknown-object, and outside-radius attempts with stable reasons
  -> evaluate meadow-perch-landing at landing-window altitude
  -> reduce Meadow Lift mission as complete
  -> unlock Cloud Basin through progression reducer
  -> snapshot exposes mission, progression, routeObjects, routeEvents, routeDiagnostics, and routeFixture
  -> HUD shows one compact mission line
  -> DOM-free smoke replays the route fixture and proves final snapshot parity
```

### Target service loop

```txt
BalloonState snapshot
  -> balloon drift config resolver reads BALLOON_DRIFT
  -> altitude band resolver reads ALTITUDE_BANDS
  -> route object evaluator reads ROUTE_OBJECTS and balloon pose
  -> route order policy checks expected object sequence
  -> route event envelope records before/after/reason/snapshotTick
  -> route event journal appends accepted/rejected records
  -> route state reducer applies accepted events
  -> mission reducer derives Meadow Lift objective status
  -> progression reducer derives Cloud Basin unlock status
  -> mission snapshot projector writes local mission/progression/route fields
  -> GameHost route diagnostics expose reducer and fixture state
  -> static and DOM-free smoke assert replayable behavior
```

## Domains in use

```txt
static-page-host
  services: canvas mount, HUD mount, error panel, module script route

vite-static-publish-host
  services: dev server, build command, GitHub Pages base path, static smoke command

third-party-cdn-runtime
  services: Three.js module import, NexusEngine module import

nexus-telemetry-domain
  services: BalloonSnapshot resource, BalloonTicked event, engine.openAbove.getState()

campaign-config-domain
  services: campaign id, region list, first region, objective descriptors, world seed, world tuning, legacy flight tuning

legacy-flight-compatibility-domain
  services: compatibility-only FLIGHT object, thermals/wind-gates naming, pitch/bank/boost legacy tuning, future removal gate

balloon-drift-config-authority-domain
  services: authoritative burner floor, burner force, vent force, buoyancy baseline, vertical damping, ceiling soft cap, wind sampling, wind blend, initial velocity, terrain clearance

input-map-domain
  services: keydown/keyup/blur collection, burner input from Space/W/ArrowUp, vent input from S/ArrowDown/Shift, zoom wheel input

balloon-state-domain
  services: position, velocity, wind vector, vertical velocity, altitude, burner, vent, elapsed time, distance, pilot message

balloon-drift-physics-domain
  services: wind angle sample, wind speed sample, buoyancy integration, venting, damping, ceiling softness, velocity lerp, position integration, ground clamp

wind-field-domain
  services: wind vector generation, wind speed projection, wind ribbon placement, future wind lane hints

altitude-safety-domain
  services: terrain clearance, terrain-relative altitude, landing validity, floor clamp, ceiling softness

altitude-band-domain
  services: low-clearance band, gate-cruise band, high-drift band, landing-window band, resolver, validity flags

terrain-sampler-domain
  services: terrainHeight(x,z), moistureAt(x,z), terrainColor(x,z,h)

world-generation-domain
  services: terrain mesh, vertex colors, lake disks, tree scatter, cloud puffs, wind ribbons

three-render-domain
  services: scene, camera, renderer, lights, fog, shadows, tone mapping, resize, render pass

balloon-visual-object-domain
  services: composite balloon group, scale/offset, subdomain metadata, object install, animation dispatch

envelope-panel-domain
  services: triangulated envelope mesh, panel profile, open-bottom visual form

balloon-mouth-domain
  services: open mouth shadow, fabric mouth skirt, bottom aperture visual

streamer-fit-domain
  services: fitted surface streamers, tapering side-panel look, envelope-relative offsets

fabric-seam-domain
  services: seam generation, panel boundary accents, fabric contour lines

basket-domain
  services: basket geometry, basket material profile, basket placement

rigging-domain
  services: rigging geometry, rope placement, rigging animation, rope profile usage

burner-domain
  services: burner geometry, flame/light animation, burner visual pulse

rope-domain
  services: soft rope tube geometry, dark braided rope look, stripe bands, rope updates

basket-follow-camera-domain
  services: wind-forward frame, side vector, basket focus, zoom, smoothing, lookAt target

hud-telemetry-domain
  services: heat label, altitude, wind speed, drift distance, pilot message, future mission line

window-gamehost-debug-domain
  services: engine handle, NexusEngine handle, scene handle, renderer handle, camera handle, balloon handle, local snapshot, Nexus snapshot

route-object-domain
  services: route object ids, positions, radius, sequence index, required altitude band, landing id

route-order-domain
  services: next expected object, sequence guard, out-of-order rejection, completion order proof

route-event-domain
  services: event id, object id, event type, accepted flag, reason, before/after state, snapshot tick

route-state-domain
  services: route object state, completion flags, last attempted object, counters, diagnostics

mission-state-domain
  services: current Meadow Lift objective, gate completion count, landing completion, mission complete flag, message

progression-domain
  services: Meadow Lift completion flag, Cloud Basin unlock flag, region availability snapshot

route-fixture-domain
  services: scripted frames, fixture journal, expected result assertions, final snapshot parity

smoke-validation-domain
  services: required file checks, marker checks, negative legacy markers, future DOM-free route replay smoke
```

## Services currently offered by kits

```txt
open-above-balloon-telemetry-kit
  provides: open-above:balloon-telemetry, open-above:wind-drift-state
  services: get snapshot, write BalloonSnapshot resource, emit BalloonTicked event, install engine.openAbove.getState()

open-above-hot-air-balloon-object-kit
  services: buildHotAirBalloon(profile), animateHotAirBalloon(balloon,time), installHotAirBalloonVisual(host,profile), expose window.OpenAboveHotAirBalloonObjectKit

open-above-balloon-envelope-panel-kit
  services: defaultEnvelopePanelProfile, buildEnvelopePanels(profile), triangulated panel assembly

open-above-balloon-mouth-kit
  services: defaultBalloonMouthProfile, buildBalloonMouth(profile), inner mouth shadow, fabric skirt

open-above-balloon-streamer-fit-kit
  services: defaultStreamerFitProfile, buildFittedStreamers(profile), surface-fitted decorative gores

open-above-balloon-fabric-seam-kit
  services: defaultFabricSeamProfile, buildFabricSeams(profile), panel seam accents

open-above-hot-air-balloon-basket-kit
  services: defaultBasketProfile, buildBasket(profile), basket object assembly

open-above-hot-air-balloon-rigging-kit
  services: defaultRiggingProfile, buildRigging(profile), animateRigging(rigging,time), rope attachment layout

open-above-hot-air-balloon-burner-kit
  services: defaultBurnerProfile, buildBurner(profile), animateBurner(burner,time), flame/burner animation

open-above-rope-kit
  services: buildSoftRope(), updateSoftRope(), tube rope geometry, gray stripe bands, reusable rope segment contract
```

## Explicit kits

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

## Candidate extraction kits

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

## Next cutover kits

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
```

## Key blocker

The runtime already demonstrates the correct product direction, but the authoritative source layer is split:

```txt
README.md and package.json
  -> old free-flight product language

src/data/campaign.config.js
  -> old thermal / wind gate / perch objectives and FLIGHT tuning

src/main.js
  -> actual balloon drift constants and route-ready snapshot seam

tests/smoke.mjs
  -> validates balloon visual conversion, but not config authority or route semantics
```

This makes it easy for future agents to accidentally rebuild the bird/free-flight controller or add mission logic against the wrong objective model.

## Recommended next slice

```txt
TheOpenAbove Balloon Config Authority + Route Event Replay Smoke Gate
```

## Build order

```txt
preserve current visible balloon scene, burner/vent controls, wind drift, basket-follow camera, HUD, and window.GameHost shape
  -> update README.md and package.json to describe hot-air-balloon drift instead of free-flight bird/glider mechanics
  -> update CAMPAIGN Meadow Lift copy away from thermals, wind gates, pitch/bank/boost, and sky-perch return
  -> add BALLOON_DRIFT beside FLIGHT in src/data/campaign.config.js
  -> move live drift constants from src/main.js into BALLOON_DRIFT
  -> mark FLIGHT compatibility-only and add smoke proving src/main.js does not consume FLIGHT
  -> add ALTITUDE_BANDS for low-clearance, gate-cruise, high-drift, and landing-window
  -> add ROUTE_OBJECTS for buoyancy-gate-01, buoyancy-gate-02, buoyancy-gate-03, and meadow-perch-landing
  -> add WIND_LANE_HINTS for readable route guidance
  -> create pure altitude band resolver
  -> create pure route object evaluator
  -> create route order policy
  -> create route event result envelope
  -> create route state reducer
  -> create route event journal
  -> create Meadow Lift mission reducer
  -> create Cloud Basin unlock progression reducer
  -> project local.mission, local.progression, local.routeObjects, local.routeEvents, local.routeDiagnostics, and local.routeFixture from snapshot()
  -> add one compact HUD mission line
  -> extend tests/smoke.mjs with DOM-free route fixture cases
  -> defer host extraction, render extraction, world extraction, and balloon physics extraction until route smoke passes
```

## Acceptance target

```txt
README.md describes hot-air-balloon drift, burner lift, vent descent, route gates, and landing
package.json description no longer says free-flight exploration
src/data/campaign.config.js exports BALLOON_DRIFT, ALTITUDE_BANDS, ROUTE_OBJECTS, and WIND_LANE_HINTS
FLIGHT is compatibility-only and protected by smoke coverage
src/main.js reads drift constants from BALLOON_DRIFT
route event records include eventId, objectId, eventType, accepted, reason, before, after, and snapshotTick
out-of-order route attempts reject with reason=out_of_order
wrong-altitude route attempts reject with reason=invalid_altitude_band
already-completed route objects reject with reason=already_completed
unknown route objects reject with reason=unknown_route_object
outside-radius attempts reject with reason=outside_radius
in-order fixture completes buoyancy-gate-01, buoyancy-gate-02, and buoyancy-gate-03
valid landing fixture completes meadow-lift
cloud-basin unlocks only after meadow-lift completion
window.GameHost.getState().local exposes mission, progression, routeObjects, routeEvents, routeDiagnostics, and routeFixture
HUD shows one compact mission line without noisy UI growth
DOM-free smoke proves in-order, out-of-order, invalid-altitude, already-completed, unknown-object, outside-radius, landing, and unlock behavior
host/render/world/physics extraction remains out of scope for this slice
```

## Out of scope for the next slice

```txt
no visual redesign
no renderer extraction
no runtime host extraction
no terrain sampler extraction
no balloon physics extraction beyond config authority
no new controls
no save system
no Cloud Basin playable region
no multiplayer or networking
```

## Change type

Documentation-only breakdown update. No runtime source code was changed in this run.

## Validation status

No local build or smoke test was executed in this run. The repo was inspected through GitHub source reads and updated through GitHub contents commits on `main`.
