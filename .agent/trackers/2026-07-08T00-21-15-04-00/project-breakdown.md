# The Open Above Project Breakdown

**Run timestamp:** `2026-07-08T00:21:15-04:00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Default branch:** `main`

**Selected repo:** `TheOpenAbove`

## Plan ledger

**Goal:** Re-read the current publish repo, refresh the root `.agent` docs, and identify the next practical slice that moves the live balloon-drift game toward source-owned, replayable Nexus Engine authority.

**Checklist:**

- [x] Looked through accessible `LuminaryLabs-Publish` repositories.
- [x] Kept `LuminaryLabs-Publish/TheCavalryOfRome` excluded.
- [x] Checked central ledger timestamps in `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Selected `LuminaryLabs-Publish/TheOpenAbove` as the oldest eligible tracked repo after the latest rotation.
- [x] Re-read active product, runtime, config, object kit, and smoke files.
- [x] Identified the interaction loop.
- [x] Identified domains in use.
- [x] Identified services currently offered by the repo-local kits and candidate kits.
- [x] Identified implemented, inline, candidate, and next-cut kits.
- [x] Defined the next implementation slice.
- [x] Updated root `.agent` docs and central tracking docs.

## Selection note

`TheOpenAbove` was selected because the central ledger showed it as the oldest eligible tracked non-Cavalry Publish repo by latest review timestamp. `TheCavalryOfRome` remains excluded by standing rule.

Latest eligible timestamps checked:

```txt
TheOpenAbove      2026-07-07T22:50:39-04:00  selected
AetherVale        2026-07-07T22:59:19-04:00
PhantomCommand    2026-07-07T23:09:45-04:00
PrehistoricRush   2026-07-07T23:21:18-04:00
MyCozyIsland      2026-07-07T23:31:44-04:00
IntoTheMeadow     2026-07-07T23:40:40-04:00
ZombieOrchard     2026-07-07T23:48:44-04:00
HorrorCorridor    2026-07-08T00:00:20-04:00
TheUnmappedHouse  2026-07-08T00:08:03-04:00
```

## Current source read

The active page route is still:

```txt
index.html
  -> ./src/main.js
```

The browser route is hot-air-balloon-first. `index.html` titles the app as `The Open Above: Balloon Drift`, describes it as a cozy hot air balloon wind-drift experience, mounts the `#game` canvas, and loads `./src/main.js`.

The product docs and package metadata are still partially stale. `README.md` still frames the game as free-flight exploration with carving, gliding, diving, boosting, thermals, wind gates, pitch/bank controls, and sky perch return. `package.json` still says the repo is a standalone free-flight exploration game.

`src/data/campaign.config.js` still exports `CAMPAIGN`, `WORLD`, and legacy `FLIGHT` only. The current config still contains thermal/gate/perch objectives and pitch/roll/boost/thermal tuning, while the live runtime imports only `CAMPAIGN` and `WORLD`.

`src/main.js` owns the actual live balloon behavior inline: scene creation, renderer, input capture, wheel zoom, state object, wind sampling, buoyancy, vent force, vertical damping, ceiling softness, terrain clearance, camera blend, HUD writing, telemetry kit installation, animation frame loop, and `window.GameHost.getState()` projection.

`src/hot-air-balloon-object-kit.js` is already a strong composed visual kit. It imports and composes envelope panels, mouth, fitted streamers, fabric seams, basket, rigging, burner, and rope sub-kits, then exposes `buildHotAirBalloon`, `animateHotAirBalloon`, and `installHotAirBalloonVisual`.

`tests/smoke.mjs` validates the balloon drift route and object-kit markers, but it does not yet validate canonical product copy, `BALLOON_DRIFT`, route result contracts, mission progression, or DOM-free route replay.

## Interaction loop

### Current player-facing loop

```txt
open the app
  -> read the balloon drift HUD
  -> hold Space / W / ArrowUp for burner lift
  -> hold S / ArrowDown / Shift for vent descent
  -> drift with procedural wind
  -> scroll to move between third-person basket-follow and near-basket view
  -> read altitude, wind, distance, heat, and camera mode telemetry
```

### Current runtime loop

```txt
load src/main.js
  -> import Three.js from CDN
  -> import Nexus Engine from CDN
  -> import CAMPAIGN and WORLD
  -> build terrain, lakes, trees, clouds, wind ribbons, and hot-air-balloon object
  -> install keyboard, blur, resize, and wheel listeners
  -> integrate balloon state from inline constants
  -> animate visual balloon sub-kits
  -> tick Nexus Engine telemetry
  -> render the basket-follow camera
  -> rewrite HUD HTML
  -> expose local and Nexus snapshots through window.GameHost.getState()
```

### Target authority loop

```txt
load canonical product copy and source config
  -> read BALLOON_DRIFT, ALTITUDE_BANDS, ROUTE_OBJECTS, and WIND_LANE_HINTS
  -> build BalloonSourceSnapshot from runtime state and source fingerprints
  -> resolve altitude band
  -> evaluate route object distance, altitude, and order
  -> emit RouteEventResult envelopes
  -> reduce route state, mission state, and progression state
  -> project mission/progression diagnostics through GameHost
  -> prove behavior through DOM-free route fixtures
```

## Domains in use

```txt
static-page-host
vite-static-publish-host
third-party-cdn-runtime
runtime-host
three-render-host
nexus-telemetry
product-copy-authority
campaign-config
legacy-flight-compatibility
balloon-drift-config-authority
balloon-input-map
balloon-vehicle-state
balloon-drift-physics
wind-field
altitude-safety
altitude-band-contract
altitude-band-resolver
terrain-sampler
world-generation
lake-generation
tree-scatter
cloud-scatter
wind-ribbon-rendering
basket-follow-camera
camera-zoom-blend
hud-mission-telemetry
window-gamehost-debug
balloon-visual-object
balloon-envelope-panel
balloon-mouth
balloon-streamer-fit
balloon-fabric-seam
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
route-event-rejection-reason-catalog
route-event-journal
route-state-reducer
meadow-lift-mission-reducer
mission-snapshot-projector
region-unlock-progression
route-fixture-harness
route-replay-parity
```

## Services identified

### Current runtime and host services

```txt
mount-canvas
mount-hud
mount-error-panel
show-fatal-runtime-error
seed-random
sample-terrain-height
sample-moisture
resolve-terrain-color
create-scene
create-camera
create-renderer
install-resize-handler
install-keyboard-input-handler
install-wheel-zoom-handler
build-terrain-geometry
build-lake-discs
scatter-trees
build-cloud-groups
build-wind-ribbon-lines
build-hot-air-balloon
animate-hot-air-balloon
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
clamp-above-terrain-clearance
compute-altitude
accumulate-horizontal-distance
resolve-wind-forward-vector
compute-basket-focus
compute-third-person-camera-position
compute-first-person-camera-position
blend-camera-mode
set-first-person-visibility
render-frame
write-hud-html
run-animation-loop
expose-window-gamehost
```

### Nexus telemetry services

```txt
define-openAbove-balloonSnapshot-resource
define-openAbove-balloonTicked-event
install-open-above-balloon-telemetry-kit
read-local-balloon-snapshot
write-balloonSnapshot-resource
emit-balloonTicked-event
expose-engine-openAbove-getState
```

### Visual object kit services

```txt
compose-hot-air-balloon-object
build-envelope-assembly
build-envelope-panels
build-balloon-mouth
build-fitted-streamers
build-fabric-seams
build-basket
build-rigging
build-burner
build-soft-ropes
animate-burner
animate-rigging
install-hot-air-balloon-visual-compatibility
publish-window-OpenAboveHotAirBalloonObjectKit
```

### Needed source and route services

```txt
audit-product-copy-drift
load-canonical-balloon-product-copy
load-balloon-drift-config
create-balloon-source-fingerprint
create-balloon-source-snapshot
load-altitude-bands
resolve-altitude-band
load-route-object-descriptors
load-wind-lane-hints
evaluate-route-object-distance
evaluate-route-object-altitude
evaluate-route-order
create-route-event-result
append-route-event-journal
reduce-route-object-state
reduce-meadow-lift-mission-state
reduce-region-unlock-progression
project-mission-snapshot
project-route-diagnostics
project-route-fixture-status
run-dom-free-route-fixture
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

### Current inline or candidate kits

```txt
open-above-runtime-host-kit
open-above-vite-static-publish-kit
open-above-three-render-host-kit
open-above-product-copy-authority-kit
open-above-campaign-config-kit
open-above-legacy-flight-compatibility-kit
open-above-balloon-input-map-kit
open-above-balloon-state-kit
open-above-balloon-drift-physics-domain-kit
open-above-wind-field-domain-kit
open-above-altitude-safety-domain-kit
open-above-terrain-sampler-domain-kit
open-above-world-generation-domain-kit
open-above-lake-generation-kit
open-above-tree-scatter-kit
open-above-cloud-scatter-kit
open-above-wind-ribbon-render-kit
open-above-basket-follow-camera-kit
open-above-camera-zoom-blend-kit
open-above-hud-mission-telemetry-kit
open-above-gamehost-debug-kit
open-above-static-marker-smoke-kit
```

### Next-cut kits

```txt
open-above-product-copy-drift-audit-kit
open-above-balloon-drift-config-kit
open-above-balloon-drift-config-smoke-kit
open-above-balloon-source-fingerprint-kit
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
open-above-source-authority-readme-smoke-kit
open-above-product-doc-canonical-smoke-kit
open-above-mission-progression-replay-kit
```

## Main blockers

```txt
active README and package copy still describe the older free-flight/bird-like product shape
campaign config still names thermal/gate/perch objectives while the live game is balloon drift
FLIGHT remains in config but is not imported by the live runtime
live drift tuning is inline in src/main.js instead of source-owned config
route objects and altitude bands do not exist yet
mission/progression snapshots are not projected through GameHost
RouteEventResult envelopes and stable rejection reasons are not implemented
smoke coverage is marker-based and does not prove product-copy authority or route replay parity
```

## Next implementation slice

```txt
TheOpenAbove Product Copy Authority + Balloon Drift Config Fixture Gate
```

Build order:

```txt
preserve the current static route, balloon visuals, burner / vent controls, basket camera, HUD baseline, Nexus telemetry kit, and GameHost shape
  -> update README.md away from free-flight / bird-language toward hot-air-balloon drift language
  -> update package.json description to match the live product
  -> update docs/GAME_DESIGN.md, docs/TECHNICAL_ARCHITECTURE.md, docs/ROADMAP.md, and docs/MIGRATION_FROM_EXPERIMENT.md around balloon drift as canonical
  -> add BALLOON_DRIFT beside legacy FLIGHT in src/data/campaign.config.js
  -> move current inline drift constants from src/main.js into BALLOON_DRIFT with no visible behavior change
  -> keep FLIGHT as compatibility-only until a smoke gate proves no live dependency
  -> add ALTITUDE_BANDS for low-clearance, buoyancy-gate, high-drift, and meadow-landing states
  -> add ROUTE_OBJECTS for three buoyancy gates and meadow landing
  -> add WIND_LANE_HINTS for readable route guidance
  -> expose source fingerprints and source snapshots through GameHost diagnostics
  -> extend smoke so docs/config/runtime markers prove canonical balloon product authority
  -> add a small DOM-free route fixture harness stub
  -> defer full mission reducers and render/world/camera extraction until source authority smoke passes
```

## Acceptance target

```txt
README/package/docs describe hot-air-balloon drift, burner, vent, route objects, altitude bands, buoyancy gates, meadow landing, and Cloud Basin unlock.
Legacy free-flight/bird wording is removed from active product docs or clearly marked historical.
src/data/campaign.config.js exports BALLOON_DRIFT, ALTITUDE_BANDS, ROUTE_OBJECTS, and WIND_LANE_HINTS.
src/main.js reads live drift constants from BALLOON_DRIFT with no visible behavior change.
window.GameHost.getState().local exposes sourceFingerprint, sourceSnapshot, routeDiagnostics, and routeFixtureStub.
tests/smoke.mjs proves product copy, config authority, drift config markers, active route markers, and no live bird-controller terms.
The current balloon visuals, burner/vent feel, camera, HUD, and Nexus telemetry stay stable.
Full route reducers, mission reducers, progression unlocks, host extraction, render extraction, world extraction, and camera extraction remain out of scope for this next slice.
```

## Validation note

Only `.agent` documentation and central tracking docs were updated during this pass. No runtime source files were changed and no local build or smoke test was run.