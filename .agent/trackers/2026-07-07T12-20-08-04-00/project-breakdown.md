# TheOpenAbove Project Breakdown

**Run timestamp:** `2026-07-07T12-20-08-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch target:** `main`

**Status:** internal-docs-only / no runtime source changed

## Selection

`TheOpenAbove` was selected because the central `LuminaryLabs-Dev/LuminaryLabs` Publish repo ledger most recently documented `LuminaryLabs-Publish/AetherVale` at `2026-07-07T12-08-49-04-00`, making `TheOpenAbove` the next eligible repo in the established rotation.

Standing exclusion preserved:

```txt
LuminaryLabs-Publish/TheCavalryOfRome
```

Observed Publish repo cycle:

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

`TheOpenAbove` is now clearly a hot-air-balloon wind-drift slice in runtime behavior. The active browser loop builds a Three.js valley, procedural terrain, lakes, trees, clouds, wind ribbons, a hot-air-balloon object family, burner / vent controls, wind-drift integration, basket-follow camera, HUD telemetry, Nexus Engine telemetry, and a `window.GameHost.getState()` surface.

The main mismatch is not the live runtime. The mismatch is authority and naming:

```txt
README.md                 still describes free-flight, carving, gliding, diving, boosting, thermals, wind gates, and sky perch return.
package.json              still describes a standalone free-flight exploration game.
src/data/campaign.config.js still exports CAMPAIGN, WORLD, and legacy FLIGHT values for bird-like flight objectives.
src/main.js               owns the actual balloon drift constants and route-state projection point inline.
tests/smoke.mjs           still validates static markers and balloon object kit presence, not route behavior.
```

The last tracker focused on `Altitude Band Contract + Route Fixture Snapshot`. This pass tightens the next slice into **Balloon Drift Config Authority + Route Evaluator Fixture Harness**. The critical next step is to make `src/data/campaign.config.js` the canonical source for balloon drift and route semantics, then prove the route evaluator without DOM, WebGL, or HUD parsing.

## Interaction Loop

### Current implemented loop

```txt
index.html
  -> src/main.js
  -> import CAMPAIGN and WORLD
  -> create Three.js scene / camera / renderer / lights / fog
  -> generate terrain, lakes, trees, clouds, and wind ribbons
  -> build hot-air-balloon visual object from local object kits
  -> collect Space / W / ArrowUp burner input
  -> collect S / ArrowDown / Shift vent input
  -> sample wind angle and speed from elapsed time
  -> integrate buoyancy, vent, vertical damping, ceiling softness, velocity, position, altitude, and drift distance
  -> clamp balloon above terrain clearance
  -> animate visual balloon sub-kits
  -> run basket-follow camera
  -> update HUD telemetry
  -> publish Nexus telemetry snapshot
  -> expose window.GameHost.getState().local and .nexusEngine
```

### Target player loop

```txt
Start Meadow Lift
  -> understand current route objective
  -> use burner / vent to hold the requested altitude band
  -> drift through buoyancy-gate-01 at a valid altitude
  -> drift through buoyancy-gate-02 at a valid altitude
  -> drift through buoyancy-gate-03 at a valid altitude
  -> descend into meadow-perch-landing at a landing-valid altitude
  -> record meadow-lift-complete
  -> unlock cloud-basin
  -> expose mission, progression, routeObjects, and routeFixture through HUD and GameHost
```

### Recommended service loop

```txt
BalloonState snapshot
  -> balloon drift config authority
  -> altitude band resolver
  -> route object descriptor lookup
  -> pure route object evaluator
  -> ordered mission reducer
  -> progression reducer
  -> route fixture assertion summary
  -> local.mission / local.progression / local.routeObjects / local.routeFixture
  -> one compact HUD mission line
  -> DOM-free fixture smoke
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
meadow-lift-mission-reducer
region-unlock-progression
mission-snapshot-contract
route-fixture-snapshot
route-fixture-assertion-harness
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
route-fixture-validation
behavior-smoke-validation
```

## Services Captured

### Runtime host services

- Mount the canvas, HUD, and fatal error panel.
- Initialize the browser animation loop.
- Own resize, keyboard, wheel, and blur listeners.
- Report fatal runtime errors to the HUD and error panel.

### Render and world services

- Create Three.js scene, camera, renderer, tone mapping, lights, fog, and shadows.
- Generate terrain mesh from `terrainHeight`, `moistureAt`, and `terrainColor`.
- Generate lakes, trees, cloud groups, and wind ribbons.
- Render the balloon and valley each frame.

### Balloon simulation services

- Track position, velocity, wind, vertical velocity, altitude, burner, vent, elapsed time, drift distance, and player message.
- Map Space / W / ArrowUp to burner lift.
- Map S / ArrowDown / Shift to vent descent.
- Blend wind into balloon velocity.
- Apply buoyancy, vent force, damping, ceiling softness, terrain clearance, and ground clamp.
- Keep camera focused on the basket instead of a generic object center.

### Nexus/GameHost services

- Define `openAbove.balloonSnapshot` resource.
- Define `openAbove.balloonTicked` event.
- Publish telemetry through `engine.openAbove.getState()`.
- Expose `window.GameHost.getState()` with Nexus and local snapshot values.

### Visual kit services

- Build the composite hot-air-balloon object.
- Build envelope panels, mouth, fitted streamers, fabric seams, basket, rigging, burner, and ropes.
- Animate balloon subparts independently from route/mission state.

### Next authority services

- Export `BALLOON_DRIFT` as the canonical runtime tuning source.
- Keep `FLIGHT` only as a legacy compatibility alias or remove it after compatibility smoke passes.
- Export `ALTITUDE_BANDS` with named min/max ranges and route validity labels.
- Export `ROUTE_OBJECTS` for three buoyancy gates and one landing zone.
- Export `WIND_LANE_HINTS` for readable route guidance.
- Resolve altitude band from numeric altitude.
- Evaluate route object proximity and altitude validity without DOM/WebGL.
- Reject out-of-order gates.
- Reject invalid-altitude route hits.
- Complete landing only after all ordered gates plus valid radius and altitude.
- Reduce `meadow-lift-complete` and `cloud-basin-unlocked` progression.
- Project mission, progression, route objects, and fixture summaries into `snapshot()`.

## Kit Inventory

### Explicit source kits

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

### Next cutover kits

```txt
open-above-balloon-drift-config-kit
open-above-legacy-flight-compatibility-kit
open-above-altitude-band-contract-kit
open-above-altitude-band-resolver-kit
open-above-route-object-config-kit
open-above-route-object-evaluator-kit
open-above-route-order-policy-kit
open-above-route-object-state-kit
open-above-wind-lane-hint-kit
open-above-meadow-lift-mission-reducer-kit
open-above-region-unlock-progression-kit
open-above-route-fixture-harness-kit
open-above-route-fixture-snapshot-kit
open-above-mission-snapshot-contract-kit
open-above-route-fixture-smoke-kit
open-above-balloon-behavior-smoke-kit
```

### Follow-on kits

```txt
open-above-action-frame-kit
open-above-replay-journal-kit
open-above-save-progression-kit
open-above-region-streaming-kit
open-above-host-loop-extraction-kit
open-above-render-world-extraction-kit
```

## Key Findings

- Runtime behavior is already balloon-first and should not be renamed back to bird flight.
- The first blocker is config authority, because live constants are still inline in `src/main.js` while `campaign.config.js` exports legacy `FLIGHT` data.
- The second blocker is route behavior evidence, because smoke currently validates static source markers but not ordered route progress.
- `snapshot()` is the right first projection seam for mission, progression, route objects, and route fixture summaries.
- `GameHost.getState().local` is already present and should become the stable diagnostics surface for the next slice.
- Full host/render/physics extraction should wait until route evaluator parity exists.

## Recommended Next Work

**Build target:** `TheOpenAbove Balloon Drift Config Authority + Route Evaluator Fixture Harness Cutover`

```txt
preserve current balloon drift visuals and controls
  -> update README and package metadata to burner / vent / balloon drift
  -> update Meadow Lift copy away from thermals, wind gates, pitch, bank, boost, and sky-perch return
  -> add BALLOON_DRIFT to src/data/campaign.config.js
  -> move live runtime constants for burner floor, vent force, buoyancy, damping, ceiling softness, terrain clearance, and wind sampling into BALLOON_DRIFT
  -> keep FLIGHT as legacy compatibility only until config smoke confirms no remaining runtime dependency
  -> add ALTITUDE_BANDS with low-clearance, gate-cruise, high-drift, and landing-window bands
  -> add ROUTE_OBJECTS for buoyancy-gate-01, buoyancy-gate-02, buoyancy-gate-03, and meadow-perch-landing
  -> add WIND_LANE_HINTS for route readability
  -> add a pure altitude band resolver
  -> add a pure route object evaluator
  -> add ordered mission and progression reducers
  -> expose local.mission, local.progression, local.routeObjects, and local.routeFixture through snapshot() and GameHost
  -> add one compact HUD mission line
  -> extend tests/smoke.mjs with DOM-free fixture coverage for in-order gates, out-of-order rejection, invalid altitude rejection, valid landing, and cloud-basin unlock
  -> defer host/render/physics extraction until route fixture smoke passes
```

## Minimum Acceptance Checklist

```txt
npm run check passes
npm run build passes
README and package describe hot-air-balloon burner / vent / drift, not bird free-flight
src/data/campaign.config.js exports BALLOON_DRIFT
src/data/campaign.config.js exports ALTITUDE_BANDS
src/data/campaign.config.js exports ROUTE_OBJECTS
src/data/campaign.config.js exports WIND_LANE_HINTS
FLIGHT is marked legacy-only or removed after smoke proves no runtime dependency
route evaluator is pure and DOM-free
altitude band resolver labels each fixture frame correctly
mission reducer completes gates only in order
out-of-order gate fixture is rejected without unlocking landing
invalid altitude fixture is rejected without completing a gate
landing completes only after ordered gates plus valid radius and altitude
GameHost.getState().local.mission exists
GameHost.getState().local.progression.cloudBasinUnlocked exists
GameHost.getState().local.routeObjects exposes every route object status
GameHost.getState().local.routeFixture exposes the latest fixture assertion summary
HUD adds only one compact mission line
host/render/physics extraction remains deferred
```

## Out of Scope For Next Slice

```txt
new regions
save runtime
full replay journal
large UI expansion
host loop extraction
renderer extraction
terrain extraction
physics engine replacement
```

## Validation Notes

No runtime source code changed in this documentation pass.

No local build/test run was executed in this documentation pass.
