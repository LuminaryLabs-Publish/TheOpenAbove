# The Open Above Project Breakdown

**Generated:** `2026-07-07T12:38:43-04:00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch target:** `main`

**Selected follow-up:** `TheOpenAbove Route Event Contract + Mission Snapshot Smoke Cutover`

## Selection

`LuminaryLabs-Publish/TheOpenAbove` was selected as the next eligible repo in the tracked Publish rotation after the central ledger's latest eligible `LuminaryLabs-Publish/AetherVale` entry. `LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

Accessible Publish repos observed:

```txt
LuminaryLabs-Publish/HorrorCorridor
LuminaryLabs-Publish/AetherVale
LuminaryLabs-Publish/TheOpenAbove
LuminaryLabs-Publish/TheCavalryOfRome
LuminaryLabs-Publish/PhantomCommand
LuminaryLabs-Publish/PrehistoricRush
LuminaryLabs-Publish/ZombieOrchard
LuminaryLabs-Publish/IntoTheMeadow
```

## Current Read

`TheOpenAbove` is a standalone Vite / Three.js publish repo whose live runtime is already a cozy hot-air-balloon drift experience. The implemented player-facing runtime uses burner / vent input, wind drift, altitude integration, procedural terrain, lakes, trees, clouds, wind ribbons, a basket-follow camera, HUD telemetry, Nexus Engine telemetry, `window.GameHost.getState()`, and a procedural hot-air-balloon object family.

The mismatch is still source authority. `README.md` and `package.json` describe a free-flight / bird-like game, while `src/data/campaign.config.js` still stores thermals, wind gates, pitch / roll / boost, and `FLIGHT` constants. `src/main.js` owns the actual balloon drift behavior inline: burner / vent key state, wind sampling, buoyancy, damping, ceiling softness, terrain clearance, snapshot projection, HUD, and GameHost exposure.

This pass narrows the next build slice from broad config authority into a fixture-first route contract: define route event records and mission snapshot fields before moving more runtime constants. The right immediate cut is **Route Event Contract + Mission Snapshot Smoke**, because it gives the repo a stable proof surface for route progression, invalid altitude rejection, out-of-order gate rejection, landing completion, and cloud-basin unlock without disturbing the current visual runtime.

## Interaction Loop

### Current implemented loop

```txt
index.html
  -> src/main.js
  -> create Three.js scene, camera, renderer, lights, fog, and shadows
  -> generate terrain, lakes, trees, clouds, and wind ribbons
  -> build procedural hot-air-balloon object
  -> collect keyboard state
  -> Space / W / ArrowUp become burner lift
  -> S / ArrowDown / Shift become vent descent
  -> sample wind angle and wind speed from elapsed time
  -> integrate buoyancy, vent force, vertical damping, ceiling softness, velocity, position, altitude, and drift distance
  -> clamp balloon above terrain clearance
  -> animate balloon object sub-kits
  -> move basket-follow wind-relative camera
  -> render HUD telemetry
  -> publish Nexus Engine balloon snapshot
  -> expose nexusEngine and local snapshot through window.GameHost.getState()
```

### Target product loop

```txt
start Meadow Lift
  -> read current mission objective
  -> use burner / vent to enter a named altitude band
  -> drift through buoyancy-gate-01 at valid altitude
  -> emit accepted route event
  -> drift through buoyancy-gate-02 at valid altitude
  -> emit accepted route event
  -> drift through buoyancy-gate-03 at valid altitude
  -> emit accepted route event
  -> reject out-of-order gate attempts
  -> reject gate entries at invalid altitude
  -> enter meadow-perch-landing radius at landing altitude
  -> emit landing event
  -> mark meadow-lift-complete
  -> unlock cloud-basin
  -> expose mission / progression / routeObjects / routeEvents / routeFixture through GameHost
```

### Recommended service loop

```txt
BalloonSnapshot
  -> balloon-drift-config authority
  -> altitude-band resolver
  -> route-object descriptor lookup
  -> route-object evaluator
  -> route-event-contract
  -> route-event-acceptance-policy
  -> route-event-journal
  -> mission reducer
  -> progression reducer
  -> mission snapshot projector
  -> GameHost local.mission / local.progression / local.routeObjects / local.routeEvents / local.routeFixture
  -> compact HUD mission line
  -> DOM-free route-event smoke fixture
```

## Domains Identified

```txt
static-page-host
runtime-host
three-render-host
nexus-telemetry
window-gamehost-debug
campaign-config
balloon-drift-config-authority
legacy-flight-compatibility
balloon-input-map
balloon-action-frame
balloon-vehicle-state
balloon-drift-physics
wind-field
wind-lane-hints
altitude-safety
altitude-band-contract
altitude-band-resolver
terrain-sampler
world-generation
route-object-descriptor
route-object-evaluator
route-object-state
route-order-policy
route-event-contract
route-event-acceptance-policy
route-event-rejection-reason-catalog
route-event-journal
mission-reducer
mission-snapshot-projector
region-unlock-progression
route-fixture-harness
route-fixture-snapshot
hud-mission-telemetry
basket-follow-camera
balloon-visual-object
balloon-envelope-panel
balloon-mouth
balloon-streamer-fit
balloon-fabric-seam
hot-air-balloon-envelope
hot-air-balloon-basket
hot-air-balloon-rigging
hot-air-balloon-burner
rope-utility
static-smoke-validation
route-event-smoke-validation
balloon-behavior-smoke-validation
```

## Current Explicit Kits

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

## Candidate Extraction Kits

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

## Next-Cut Kits

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
open-above-meadow-lift-mission-reducer-kit
open-above-mission-snapshot-projector-kit
open-above-region-unlock-progression-kit
open-above-route-fixture-harness-kit
open-above-route-fixture-snapshot-kit
open-above-mission-snapshot-contract-kit
open-above-route-event-smoke-kit
open-above-balloon-behavior-smoke-kit
```

## Follow-On Kits

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

## Services Captured

### Implemented runtime services

- Static host mounts canvas, HUD, and error panel.
- Runtime host initializes scene, animation loop, resize handling, key listeners, wheel zoom, and fatal error reporting.
- Three render host owns scene, camera, renderer, lights, fog, shadows, tone mapping, and render calls.
- World services generate terrain mesh, terrain color, moisture, lakes, trees, clouds, and wind ribbons.
- Balloon simulation tracks position, velocity, wind, vertical velocity, altitude, burner, vent, elapsed time, drift distance, and message.
- Balloon physics integrates burner lift, vent descent, damping, ceiling softness, wind blend, ground clamp, terrain clearance, and altitude.
- Camera service follows the basket-relative wind-facing anchor.
- HUD service displays title, mission copy, heat, altitude, wind speed, drift distance, zoom hint, and Nexus note.
- Telemetry service publishes `openAbove.balloonSnapshot`, emits `openAbove.balloonTicked`, and exposes `engine.openAbove.getState()`.
- GameHost exposes engine, NexusEngine, scene, renderer, camera, balloon, and local/nexus snapshots.
- Visual kit services build and animate the balloon envelope, panels, mouth, streamers, seams, basket, rigging, burner, and ropes.

### Services needed next

- Resolve canonical `BALLOON_DRIFT` constants from config and keep `FLIGHT` as compatibility-only until parity is proven.
- Resolve altitude bands from numeric balloon altitude.
- Describe route objects with id, sequence, position, radius, required altitude band, completion event, and rejection reasons.
- Evaluate route object proximity and altitude validity from a pure snapshot input.
- Convert route object hits into `RouteEvent` records.
- Return accepted/rejected route event results with stable reasons.
- Journal accepted and rejected route events separately.
- Reduce Meadow Lift mission state from the journal.
- Reduce cloud-basin progression from mission completion.
- Project mission, progression, route objects, route events, and route fixture summaries into snapshots.
- Add DOM-free smoke coverage for in-order gates, out-of-order rejection, invalid altitude rejection, valid landing, and region unlock.

## Route Event Contract Target

```txt
RouteEvent
  id: string
  frame: number
  elapsed: number
  source: "runtime" | "fixture"
  region: "meadow-lift"
  objectId: "buoyancy-gate-01" | "buoyancy-gate-02" | "buoyancy-gate-03" | "meadow-perch-landing"
  eventType: "route-object-entered" | "route-object-completed" | "landing-completed"
  sequenceIndex: number
  altitude: number
  altitudeBand: string
  distance: number
  accepted: boolean
  reason: "accepted" | "out_of_order" | "invalid_altitude_band" | "already_completed" | "unknown_route_object" | "outside_radius"
  before: object
  after: object
```

## Mission Snapshot Target

```txt
local.mission
  id: "meadow-lift"
  currentObjective: string
  expectedObjectId: string
  completedObjectIds: string[]
  rejectedEventCount: number
  complete: boolean
  message: string

local.progression
  completedRegions: string[]
  unlockedRegions: string[]

local.routeObjects
  activeRegion: string
  expectedObjectId: string
  objects: RouteObjectState[]

local.routeEvents
  accepted: RouteEvent[]
  rejected: RouteEvent[]
  lastAccepted: RouteEvent | null
  lastRejected: RouteEvent | null

local.routeFixture
  lastRunId: string | null
  passed: boolean | null
  assertions: object[]
```

## Key Findings

- The runtime is already balloon drift in practice.
- Docs and config still describe an older bird/free-flight controller.
- `src/main.js` is still the main monolith, but it has a clean `snapshot()` projection seam.
- The best next cut is not full runtime extraction; it is route event authority and mission snapshot proof.
- Route event results should be explicit before adding persistence, replay, region streaming, or broader host extraction.
- The hot-air-balloon object kit family is healthy and should stay as renderer-facing visual kits.
- `tests/smoke.mjs` should move from static marker checks to a DOM-free pure route-event fixture while preserving current static checks.

## Recommended Next Work

**Build target:** `TheOpenAbove Route Event Contract + Mission Snapshot Smoke Cutover`

```txt
preserve current balloon visuals, burner / vent controls, and GameHost shape
  -> update README and package metadata to balloon drift language
  -> update Meadow Lift copy away from thermals, pitch, bank, boost, wind gates, and sky-perch return
  -> add BALLOON_DRIFT beside legacy FLIGHT in src/data/campaign.config.js
  -> move live drift constants from src/main.js into BALLOON_DRIFT
  -> add ALTITUDE_BANDS for low-clearance, gate-cruise, high-drift, and landing-window
  -> add ROUTE_OBJECTS for buoyancy-gate-01, buoyancy-gate-02, buoyancy-gate-03, and meadow-perch-landing
  -> add WIND_LANE_HINTS for readable route guidance
  -> create altitude band resolver
  -> create route object evaluator
  -> create route event contract
  -> create route event acceptance policy
  -> create route event journal
  -> create Meadow Lift mission reducer
  -> create region unlock progression reducer
  -> project mission/progression/routeObjects/routeEvents/routeFixture into snapshot()
  -> expose mission fields under window.GameHost.getState().local
  -> add one compact HUD mission line
  -> add DOM-free route-event smoke fixture for accepted and rejected cases
  -> defer host/render/physics extraction until fixture parity exists
```

## Minimum Acceptance Checklist

- [ ] `README.md` and `package.json` describe balloon drift, burner, vent, and route completion.
- [ ] `src/data/campaign.config.js` has `BALLOON_DRIFT`, `ALTITUDE_BANDS`, `ROUTE_OBJECTS`, and `WIND_LANE_HINTS`.
- [ ] Legacy `FLIGHT` is clearly compatibility-only or unused behind parity smoke.
- [ ] Runtime drift constants are config-backed.
- [ ] Route events use stable accepted/rejected records.
- [ ] Out-of-order route attempts reject with `out_of_order`.
- [ ] Wrong altitude route attempts reject with `invalid_altitude_band`.
- [ ] In-order gate entries complete all three buoyancy gates.
- [ ] Valid landing completes `meadow-lift`.
- [ ] Cloud Basin unlocks only after Meadow Lift completion.
- [ ] `window.GameHost.getState().local` exposes mission, progression, routeObjects, routeEvents, and routeFixture.
- [ ] HUD shows one compact mission line.
- [ ] DOM-free smoke proves in-order, out-of-order, invalid-altitude, landing, and unlock behavior.
- [ ] Host/render/physics extraction remains out of scope for this cut.
