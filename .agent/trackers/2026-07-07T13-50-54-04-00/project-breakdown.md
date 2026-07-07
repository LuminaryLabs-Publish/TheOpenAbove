# TheOpenAbove Project Breakdown

**Run timestamp:** `2026-07-07T13:50:54-04:00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch target:** `main`

**Scope:** internal documentation only. No runtime source was changed in this pass.

## Selection

`LuminaryLabs-Publish/TheOpenAbove` was selected as the next eligible Publish repo because the central ledger showed it as the oldest tracked non-Cavalry repo by latest review timestamp among the accessible Publish repositories.

`LuminaryLabs-Publish/TheCavalryOfRome` stayed excluded by standing rule.

Observed accessible Publish repos:

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

## Source files reviewed

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
src/hot-air-balloon-envelope-kit.js
src/hot-air-balloon-basket-kit.js
src/hot-air-balloon-rigging-kit.js
src/hot-air-balloon-burner-kit.js
src/rope-kit.js
tests/smoke.mjs
.agent/README.md
.agent/kit-registry.json
```

## Current read

`TheOpenAbove` is currently a Vite / Three.js hot-air-balloon wind-drift game slice. The live runtime is balloon-first: it builds a procedural valley, lakes, trees, clouds, wind ribbons, a composite hot-air-balloon object, burner / vent controls, basket-follow camera, HUD telemetry, Nexus Engine balloon telemetry, and `window.GameHost.getState()`.

The remaining source-of-truth mismatch is now the main blocker. `README.md`, `package.json`, and `src/data/campaign.config.js` still describe the older free-flight / bird-flight milestone with thermals, gates, pitch, bank, boost, sky perch return, and legacy `FLIGHT` tuning. Meanwhile `src/main.js` owns the live balloon drift constants and route-ready snapshot seam inline.

This pass refines the next implementation slice into **Balloon Drift Source Truth + Route Fixture Contract Cutover**. The next useful product move is not render extraction. It is to make balloon drift config source-authoritative, define route fixture contracts, and prove ordered Meadow Lift progression through DOM-free smoke.

## Interaction loop

### Current implemented loop

```txt
load index.html
-> mount canvas, HUD, and error panel
-> import src/main.js
-> import Three.js from jsDelivr
-> import NexusEngine from main CDN
-> import CAMPAIGN and WORLD from src/data/campaign.config.js
-> import buildHotAirBalloon and animateHotAirBalloon
-> seed deterministic random from WORLD.seed
-> create scene, camera, renderer, fog, shadows, sun, and hemisphere light
-> generate terrain mesh from terrainHeight / moistureAt / terrainColor
-> add lakes, trees, clouds, and wind ribbons
-> build composite hot-air-balloon object
-> initialize local balloon state
-> listen for keydown, keyup, blur, wheel, and resize
-> read burner and vent inputs each frame
-> sample wind angle and wind speed
-> integrate buoyancy, venting, damping, ceiling softness, wind blend, velocity, position, altitude, and distance
-> clamp balloon above terrain clearance
-> animate balloon visual sub-kits
-> tick Nexus Engine telemetry runtime kit
-> update basket-follow camera
-> update HUD telemetry
-> expose local and Nexus telemetry snapshots through window.GameHost.getState()
```

### Intended player loop

```txt
start Meadow Lift as a balloon pilot
-> read current route objective
-> use burner / vent to reach the correct altitude band
-> enter buoyancy-gate-01 in sequence
-> enter buoyancy-gate-02 in sequence
-> enter buoyancy-gate-03 in sequence
-> reject out-of-order gate attempts
-> reject valid gate positions at invalid altitude bands
-> descend into landing-window altitude
-> complete meadow-perch-landing
-> mark Meadow Lift complete
-> unlock Cloud Basin
-> expose mission, progression, route object, and route event state through HUD and GameHost
```

### Recommended service loop

```txt
runtime emits BalloonState snapshot
-> balloon-drift-config-kit reads source-authoritative BALLOON_DRIFT constants
-> altitude-band-resolver converts altitude into a named band
-> route-object-evaluator checks distance, altitude band, and route object status
-> route-order-policy validates expected sequence
-> route-event-contract returns accepted / rejected RouteEvent metadata
-> route-event-journal stores accepted and rejected records
-> meadow-lift-mission-reducer derives current objective and completion
-> region-unlock-progression-reducer derives Cloud Basin unlock state
-> mission-snapshot-projector writes local.mission / local.progression / local.routeObjects / local.routeEvents / local.routeFixture
-> HUD mission telemetry renders one compact mission line
-> route-event-smoke validates in-order, out-of-order, invalid-altitude, landing, and unlock fixtures without DOM
```

## Domains in use

- Static page host: canvas mount, HUD mount, error panel, browser-only start path.
- Runtime host: create game, error handling, animation frame loop, resize, event listeners, state lifetime.
- Three render host: scene, camera, renderer, lights, fog, shadows, tone mapping, render call.
- Nexus telemetry: `open-above-balloon-telemetry-kit`, `BalloonSnapshot` resource, `BalloonTicked` event, `engine.openAbove.getState()`.
- Campaign config: campaign id, region list, first region, world seed, terrain settings, current legacy objectives.
- Legacy flight compatibility: current `FLIGHT` object, old bird-controller constants, compatibility cleanup gate.
- Balloon input map: burner input, vent input, zoom wheel, blur reset.
- Balloon vehicle state: position, velocity, wind, vertical velocity, altitude, burner, vent, elapsed, distance, message.
- Balloon drift physics: buoyancy, vent force, altitude damping, ceiling softness, wind blend, position integration.
- Wind field: wind angle, wind speed, wind vector, readable wind ribbons.
- Altitude safety: terrain clearance, ground clamp, local altitude calculation, landing validity.
- Terrain sampler: height, moisture, color, terrain mesh vertex colors.
- World generation: terrain, lakes, trees, clouds, wind ribbons.
- Basket follow camera: wind-forward frame, side vector, zoom, basket focus, camera smoothing.
- HUD telemetry: title, state message, heat state, altitude, wind speed, drift distance, Nexus Engine note.
- GameHost diagnostics: engine handles, render handles, balloon handle, local snapshot.
- Balloon visual object: composite assembly and animation of balloon sub-kits.
- Envelope panel domain: triangulated balloon envelope panels.
- Balloon mouth domain: open-bottom fabric mouth and shadow details.
- Streamer fit domain: surface-fitted decorative fabric gores.
- Fabric seam domain: seam and panel line projection.
- Basket domain: basket geometry and placement.
- Rigging domain: rope attachment, dark tube ropes, soft rigging animation.
- Burner domain: burner geometry, flame animation, visual heat state.
- Rope domain: tube rope geometry, striped material bands, rope updates.
- Static smoke validation: file presence and marker assertions.
- Route object descriptor: gate and landing ids, positions, radii, altitude requirements, sequence order.
- Altitude band contract: low-clearance, gate-cruise, high-drift, landing-window, out-of-band labels.
- Route object evaluator: proximity, altitude, object completion, landing eligibility.
- Route order policy: next required route object, out-of-order rejection.
- Route event contract: accepted / rejected records with stable reason codes.
- Route event journal: accepted list, rejected list, last accepted, last rejected, replay fixture evidence.
- Meadow Lift mission reducer: objective label, gate completion count, landing completion, mission complete.
- Region unlock progression: Cloud Basin unlock state after Meadow Lift completion.
- Mission snapshot projector: local mission/progression/route fixture projection.

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

## Candidate extraction kits

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

## Next-cut kits

```txt
open-above-balloon-drift-config-kit
open-above-legacy-flight-compatibility-kit
open-above-altitude-band-contract-kit
open-above-altitude-band-resolver-kit
open-above-route-object-config-kit
open-above-route-object-evaluator-kit
open-above-route-order-policy-kit
open-above-route-object-state-kit
open-above-route-event-contract-kit
open-above-route-event-acceptance-policy-kit
open-above-route-event-rejection-reason-kit
open-above-route-event-journal-kit
open-above-route-fixture-contract-kit
open-above-route-fixture-harness-kit
open-above-route-fixture-snapshot-kit
open-above-meadow-lift-mission-reducer-kit
open-above-mission-snapshot-projector-kit
open-above-region-unlock-progression-kit
open-above-hud-route-mission-line-kit
open-above-route-event-smoke-kit
open-above-balloon-behavior-smoke-kit
```

## Services that kits offer

| Kit | Services |
| --- | --- |
| open-above-balloon-telemetry-kit | Defines balloon snapshot resource, tick event, runtime telemetry, and engine state reader. |
| open-above-hot-air-balloon-object-kit | Builds composite balloon, aggregates subdomains, exposes object metadata, animates burner and rigging. |
| open-above-balloon-envelope-panel-kit | Builds triangulated envelope panels with panel metadata. |
| open-above-balloon-mouth-kit | Builds open-bottom mouth, mouth skirt, and inner shadow. |
| open-above-balloon-streamer-fit-kit | Builds fitted decorative streamers following envelope surface. |
| open-above-balloon-fabric-seam-kit | Builds fabric seams and panel lines. |
| open-above-hot-air-balloon-basket-kit | Builds basket geometry and basket placement. |
| open-above-hot-air-balloon-rigging-kit | Builds rigging ropes, rope endpoints, and subtle rigging animation. |
| open-above-hot-air-balloon-burner-kit | Builds burner geometry and flame animation. |
| open-above-rope-kit | Builds dark tube ropes with stripe bands and updateable endpoints. |
| open-above-balloon-drift-config-kit | Should expose burner floor, input rates, buoyancy, vent force, damping, ceiling softness, wind formulas, terrain clearance, and initial velocity from config. |
| open-above-altitude-band-resolver-kit | Should map altitude numbers to stable named bands and fixture labels. |
| open-above-route-object-evaluator-kit | Should evaluate route object proximity, altitude validity, completion, and landing status. |
| open-above-route-event-contract-kit | Should create accepted/rejected event records with stable ids, elapsed, object id, sequence index, reason, before, and after. |
| open-above-route-event-journal-kit | Should retain accepted and rejected records for HUD, GameHost, and replay smoke. |
| open-above-meadow-lift-mission-reducer-kit | Should reduce gates, landing, mission messages, completion, and next objective. |
| open-above-mission-snapshot-projector-kit | Should project mission/progression/routeObjects/routeEvents/routeFixture into `GameHost.getState().local`. |
| open-above-route-event-smoke-kit | Should assert in-order gates, out-of-order rejection, invalid-altitude rejection, landing completion, and Cloud Basin unlock without DOM. |

## Main blockers

1. Runtime authority is split: live balloon behavior lives in `src/main.js`, while product docs/config still describe the older free-flight controller.
2. Mission progress is not a runtime service yet: current HUD shows telemetry only, not route objective state.
3. Route data is not serialized: no route object descriptors, altitude bands, wind lane hints, or route fixture snapshots exist yet.
4. `GameHost.getState().local` does not expose mission, progression, route object, route event, or fixture metadata.
5. Smoke tests are static marker checks; they do not prove route behavior or deterministic mission outcomes.
6. Render/host/physics extraction should wait until config and route fixture parity exists.

## Recommended next slice

```txt
TheOpenAbove Balloon Drift Source Truth + Route Fixture Contract Cutover
```

Build order:

```txt
preserve current balloon visuals, burner / vent controls, camera, HUD telemetry, and GameHost shape
-> update README.md and package.json away from free-flight / bird-flight language
-> update Meadow Lift copy away from thermals, wind gates, pitch, bank, boost, and sky-perch return
-> add BALLOON_DRIFT beside legacy FLIGHT in src/data/campaign.config.js
-> move live drift constants from src/main.js into BALLOON_DRIFT
-> keep FLIGHT as compatibility-only until static smoke confirms no runtime dependency
-> add ALTITUDE_BANDS for low-clearance, gate-cruise, high-drift, and landing-window
-> add ROUTE_OBJECTS for buoyancy-gate-01, buoyancy-gate-02, buoyancy-gate-03, and meadow-perch-landing
-> add WIND_LANE_HINTS for readable route guidance
-> create pure altitude band resolver
-> create pure route object evaluator
-> create route event contract
-> create route event acceptance policy
-> create route event rejection reason catalog
-> create route event journal
-> create route fixture harness and route fixture snapshot
-> create Meadow Lift mission reducer
-> create Cloud Basin unlock progression reducer
-> project local.mission, local.progression, local.routeObjects, local.routeEvents, and local.routeFixture from snapshot()
-> add one compact HUD mission line
-> extend tests/smoke.mjs with DOM-free route fixture cases
-> defer host extraction, render extraction, and balloon physics extraction until route smoke passes
```

## Acceptance targets

```txt
README.md and package.json describe balloon drift, burner, vent, route gates, and landing
src/data/campaign.config.js exports BALLOON_DRIFT, ALTITUDE_BANDS, ROUTE_OBJECTS, and WIND_LANE_HINTS
legacy FLIGHT is compatibility-only or unused behind explicit smoke coverage
runtime drift constants are config-backed
route event records are stable and include accepted/rejected metadata
out-of-order route attempts reject with reason=out_of_order
wrong-altitude route attempts reject with reason=invalid_altitude_band
already completed route objects reject with reason=already_completed
unknown route objects reject with reason=unknown_route_object
outside-radius attempts reject with reason=outside_radius
in-order route fixture completes three buoyancy gates
valid landing fixture completes meadow-lift
cloud-basin unlocks only after meadow-lift completion
window.GameHost.getState().local exposes mission, progression, routeObjects, routeEvents, and routeFixture
HUD shows one compact mission line without adding noisy UI
DOM-free smoke proves in-order, out-of-order, invalid-altitude, already-completed, unknown-object, landing, and unlock behavior
host/render/physics extraction remains explicitly out of scope
```

## Validation notes

No local build or smoke test was executed in this documentation-only pass.

No runtime source code changed.
