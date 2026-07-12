# Project Breakdown: Parchment Map Pause and Input Authority

**Timestamp:** `2026-07-12T08-50-32-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Repository revision reviewed:** `a5dd665a80cfe594ebaf05085633d4006e012b32`

## Summary

The active route recently removed the per-frame HUD and added a full-screen parchment Air Mail map opened with `M`. Opening the map stops simulation, mail, airstream, balloon presentation, camera, visual updates and Nexus telemetry, but the main RAF continues to render and the map starts a second RAF for its canvas projection.

The pause boundary is only `mapOverlay.isOpen()`. The balloon simulation and map overlay keep independent global keyboard listeners. Gameplay keys continue entering and leaving the simulation's mutable `Set` while the map is open, so flight can resume with input accumulated during the map session. No pause generation, input suspension result, focus lease, projection revision or first-visible-map-frame receipt exists.

## Plan ledger

**Goal:** define one authoritative map transition from input admission through gameplay-input suspension, map projection, focus, pause/resume, visible-frame acknowledgement and lifecycle retirement.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have a central ledger and root `.agent` state.
- [x] Select only `TheOpenAbove` because it is the oldest eligible ledger entry and has a newer undocumented map/HUD source cutover.
- [x] Read repository guidance, `index.html`, `src/main.js`, the map overlay, simulation input, mail domain, package checks and current `.agent` state.
- [x] Identify the complete interaction loop, all active domains, all implemented kits and offered services.
- [x] Trace map open/close, simulation pause, global input, dual RAF ownership, focus, semantics, disposal and public readback.
- [x] Define the missing parchment-map pause and input authority.
- [x] Add timestamped architecture, render, gameplay, interaction, map-system and deployment audits.
- [x] Change no runtime source, dependency, package script or workflow.
- [x] Create no branch or pull request.
- [ ] Implement the authority and execute browser, cadence, focus, lifecycle and deployed Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9
root .agent folders: 9
new or ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

TheOpenAbove       2026-07-12T07-00-48-04-00 selected
PrehistoricRush    2026-07-12T07-09-49-04-00
IntoTheMeadow      2026-07-12T07-19-47-04-00
PhantomCommand     2026-07-12T07-29-32-04-00
HorrorCorridor     2026-07-12T07-41-06-04-00
ZombieOrchard      2026-07-12T07-51-04-04-00
MyCozyIsland       2026-07-12T08-00-16-04-00
TheUnmappedHouse   2026-07-12T08-10-36-04-00
AetherVale         2026-07-12T08-31-49-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/TheOpenAbove` is modified in the Publish organization by this run.

## Complete interaction loop

```txt
page construction
  -> create full-screen Three/WebGL canvas
  -> create hidden parchment map section and 2D map canvas
  -> create hidden fatal <pre>
  -> load src/main.js

boot
  -> mark game canvas aria-busy
  -> create visual domain and balloon model
  -> create airstream, mail and balloon simulation owners
  -> create parchment map overlay with world, town, route, player and parcel sources
  -> create camera, balloon presentation and Nexus telemetry
  -> perform initial updates
  -> clear aria-busy
  -> schedule main RAF

map closed frame
  -> compute frame delta
  -> update simulation
  -> update mail and airstream
  -> apply and animate balloon
  -> update presentation, camera and visual state
  -> tick Nexus telemetry
  -> render 3D frame
  -> schedule successor main RAF

M key
  -> simulation keydown listener records KeyM in its mutable key Set
  -> map keydown listener toggles open
  -> map section becomes visible and aria-hidden=false
  -> map starts its own recursive RAF

map open frame
  -> main RAF keeps updating last timestamp
  -> simulation/mail/airstream/camera/telemetry updates are skipped
  -> 3D visual still renders with dt=0
  -> map RAF redraws parchment, routes, towns and player
  -> gameplay keydown/keyup listeners remain active

map close
  -> map RAF is cancelled
  -> main RAF resumes all simulation owners
  -> any gameplay key state accumulated while the map was open is consumed immediately
```

## Source-backed findings

### Pause is a read of a mutable UI Boolean

The main frame loop treats `mapOverlay.isOpen()` as the complete pause authority. There is no pause command, phase, generation, revision, participant barrier or typed result. The simulation, mail, airstream, camera, visual-update and telemetry owners are skipped individually by one host `if` statement.

### Gameplay input remains live during the map

`createBalloonSimulation()` owns a global `keydown`/`keyup` pair and stores codes in a mutable `Set`. The map owns a separate global `keydown` listener for `M` and `Escape`. Opening the map does not clear the flight-key set or suspend its listeners.

Examples:

```txt
hold W before opening map
  -> W remains active for the first resumed simulation frame

press A or D while map is open
  -> the simulation Set changes even though simulation is paused
  -> closing the map can immediately apply trim

lose a keyup without a blur event
  -> the Set can retain a stale flight input
```

### Two RAF owners are active while the map is open

The main RAF always schedules itself and continues `visual.render()`. The map separately schedules `animate()` while open. No shared frame ID or cadence policy correlates the frozen 3D frame with the current map projection.

### Map state is under-specified

The public snapshot exposes only:

```json
{"open": true}
```

It contains no map generation, open command ID, pause revision, projection revision, world-source fingerprint, route/town revision, map frame ID or focus state.

### Dialog semantics and focus are incomplete

The parchment shell uses `role="dialog"` and `aria-modal="true"`, but opening it does not move focus, retain the predecessor focus target, expose a close control, trap keyboard focus or publish a focus result. The visual route, towns, destination and player marker exist only in a canvas drawing.

### Lifecycle ownership is partial

The map overlay provides `dispose()`, but the host does not expose or call it. The map's key listener and `ResizeObserver` therefore depend on page destruction rather than an authoritative runtime-session retirement transaction.

### The preceding HUD audit is source-superseded, not implemented

The old `#hud` and `updateHud()` path were removed by the map cutover. This eliminates that specific per-frame live-region mutation path, but it does not implement the planned semantic-announcement authority. Ordinary mission status and control hints are now absent from the visible route, while the fatal `<pre>` still has no alert/focus transaction.

## Domains in use

```txt
browser shell, import map, semantic HTML, game canvas and map dialog
runtime admission, startup failure, session and RAF ownership
keyboard, key-state, blur, wheel zoom and variable frame time
map open/close, pause/resume, focus and lifecycle
map world transform, route, town, destination and player projection
balloon simulation, airstream, steering, clearance and snapshots
mail route, parcel, town, delivery volume, progress and reset
balloon profile, model assembly, loading and resources
balloon geometry, rigging, presentation and camera
quality, dynamic resolution and HDR render-surface ownership
terrain, grass, atmosphere, water, lighting and lens response
telemetry, GameHost and headless inspection
fatal error projection and accessibility
checks, tests, build and Pages deployment
```

## Implemented kit and service census

```txt
runtime/gameplay source-backed kits: 15
balloon/object/presentation source-backed kits: 15
visual-environment source-backed kits: 26
UI source-backed kits: 1
tooling/proof source-backed kits: 3
active source-backed total: 60
runtime-implied adapters: 12
inactive/retired legacy kits: 12
planned map authority kits: 26 including parent
```

### Runtime and gameplay kits

```txt
open-above-balloon-simulation-kit
  global keyboard state, wind/buoyancy/steering integration, transforms, snapshots and disposal
open-above-balloon-telemetry-kit
  Nexus kit installation, tick and state projection
open-above-airstream-domain
  route, field, sampler, force, visual, debug and snapshot composition
open-above-airstream-route-kit
  authored current routes and destination relationships
open-above-airstream-sampler-kit
  position/time sampling and contributor resolution
open-above-airstream-field-kit
  ambient and route-field velocity evaluation
open-above-airstream-balloon-force-kit
  sampled-current application to balloon state
open-above-airstream-visual-kit
  route/current scene projection
open-above-airstream-debug-kit
  airstream debug readback
open-above-mail-delivery-domain
  parcel, route, towns, delivery progress, reset, snapshot and disposal
open-above-mail-parcel-kit
  parcel creation and reset
open-above-mail-route-kit
  route, town and destination content
open-above-delivery-volume-kit
  destination-volume sampling against terrain
open-above-delivery-progress-kit
  capture, delivery admission, message and event production
open-above-mail-town-kit
  destination-town visual creation, update and disposal
```

### Balloon, object and presentation kits

```txt
open-above-hot-air-balloon-object-kit
open-above-balloon-envelope-profile-kit
open-above-balloon-envelope-panel-kit
open-above-balloon-mouth-kit
open-above-balloon-streamer-fit-kit
open-above-balloon-fabric-seam-kit
open-above-hot-air-balloon-basket-kit
open-above-hot-air-balloon-rigging-kit
open-above-hot-air-balloon-burner-kit
open-above-rope-kit
open-above-balloon-presentation-domain
open-above-envelope-fabric-material-kit
open-above-basket-material-kit
open-above-balloon-camera-rig-kit
open-above-clipping-fade-kit
```

Services include envelope-profile sampling, unified shell construction, seams and mouth fitting, basket/burner/rigging/rope construction, materials, asynchronous model loading, persistent animation, inertia presentation, camera follow/zoom/mode, clipping fade and local disposal.

### Visual-environment kits

```txt
open-above-visual-domain
open-above-quality-tier-kit
open-above-dynamic-resolution-kit
open-above-physical-sky-kit
open-above-sun-light-kit
open-above-aerial-perspective-kit
open-above-cloud-weather-map-kit
open-above-volumetric-cloud-kit
open-above-cloud-lod-kit
open-above-cloud-lighting-kit
open-above-terrain-surface-kit
open-above-terrain-chunk-streaming-kit
open-above-terrain-horizon-streaming-kit
open-above-vegetation-cluster-kit
open-above-grass-world-seed-kit
open-above-grass-biome-density-kit
open-above-grass-exclusion-mask-kit
open-above-grass-chunk-placement-kit
open-above-grass-lod-kit
open-above-grass-compute-culling-kit
open-above-grass-field-domain
open-above-water-surface-kit
open-above-distant-landmark-kit
open-above-hdr-composer-kit
open-above-color-grade-kit
open-above-lens-response-kit
```

Services include renderer/scene/camera ownership, quality selection, dynamic scaling, sky/cloud/terrain/horizon/vegetation/grass/water/landmark construction, HDR composition, grading, lens response, rendering, resize, observation and disposal.

### UI source-backed kit

```txt
open-above-parchment-map-overlay-kit
  M/Escape toggle, map visibility and aria-hidden projection, ResizeObserver sizing,
  world-to-map transform, route/town/destination/player drawing, map RAF, snapshot and disposal
```

### Tooling and proof kits

```txt
open-above-headless-editor-environment
  project inspection, renderer validation, checks and build commands
open-above-static-smoke-test-kit
  required-file and source-pattern checks
open-above-airstream-mail-test-kit
  route, current and delivery-domain proof
```

### Runtime-implied adapters

```txt
open-above-route-shell-kit
open-above-importmap-kit
open-above-runtime-composer-kit
open-above-keyboard-input-kit
open-above-wheel-zoom-input-kit
open-above-parchment-map-shell-kit
open-above-error-panel-kit
open-above-gamehost-legacy-readback-kit
open-above-nexusengine-cdn-adapter-kit
open-above-campaign-source-kit
open-above-raf-clock-adapter-kit
open-above-pages-deploy-kit
```

They provide page composition, import resolution, owner construction, browser input adaptation, map and fatal surfaces, global diagnostics, Nexus CDN adaptation, campaign constants, RAF timing and static deployment.

### Retired legacy surface

`open-above-hud-projection-kit` joins the existing inactive envelope, grass-detail, bloom, god-ray, auto-exposure and bird-flight kits. The HUD source path is removed, but the semantic mission-status requirement remains unresolved.

## Required parent domain

```txt
open-above-parchment-map-pause-input-authority-domain
```

## Candidate coordinating kits

```txt
open-above-map-transition-command-kit
open-above-map-transition-id-kit
open-above-map-state-kit
open-above-map-generation-kit
open-above-map-transition-admission-kit
open-above-map-pause-participant-kit
open-above-map-pause-barrier-kit
open-above-map-pause-result-kit
open-above-flight-input-suspension-kit
open-above-flight-key-state-retirement-kit
open-above-map-input-context-kit
open-above-map-keyboard-scope-kit
open-above-map-focus-lease-kit
open-above-map-focus-result-kit
open-above-map-frame-plan-kit
open-above-map-projection-revision-kit
open-above-map-world-source-fingerprint-kit
open-above-map-render-loop-ownership-kit
open-above-map-open-close-result-kit
open-above-map-visible-frame-ack-kit
open-above-map-observation-kit
open-above-map-journal-kit
open-above-map-input-isolation-fixture-kit
open-above-map-cadence-parity-fixture-kit
open-above-map-focus-lifecycle-fixture-kit
open-above-map-pages-smoke-kit
```

## Required transaction

```txt
MapTransitionCommand(open)
  -> validate runtime session, map generation and expected state revision
  -> capture predecessor focus and input context
  -> suspend gameplay command admission
  -> clear or explicitly preserve flight key state by policy
  -> prepare map source fingerprint and projection surface
  -> pause all registered simulation participants at one barrier
  -> commit OPEN with a new map and pause revision
  -> transfer focus and start exactly one admitted map-frame producer
  -> acknowledge the first visible map frame

MapTransitionCommand(close)
  -> validate current map generation and transition ID
  -> stop map-frame production
  -> revoke map keyboard/focus leases
  -> retire map-only input state
  -> restore gameplay input under a new input generation
  -> resume all participants at one barrier
  -> acknowledge the first resumed flight frame
```

## Required invariants and proof

```txt
map open/close is idempotent by transition ID
no flight command is admitted while the map owns input
opening the map cannot preserve an accidental held flight key without explicit policy
closing the map cannot apply key events captured by the map input generation
all simulation participants pause and resume at one revision
only one map-frame owner exists
map projection cites world, route, town, parcel, player and surface revisions
map focus enters and exits deterministically
stale callbacks and predecessor sessions are rejected
30, 60 and 120 Hz produce the same transition and resumed-input results
local browser and deployed Pages fixtures pass the same matrix
```

## Validation boundary

```txt
runtime JavaScript changed: no
HTML changed: no
package/dependency/workflow changed: no
gameplay/rendering/input behavior changed: no
branch created: no
pull request created: no
npm/headless/build/browser/Pages commands run: no
```

This audit documents the current source boundary. It does not claim that map pause, input isolation, focus, lifecycle or frame provenance is implemented.