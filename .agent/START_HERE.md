# START HERE: TheOpenAbove

**Last aligned:** `2026-07-12T08-50-32-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`

## Summary

The active route now removes the old HUD and uses a full-screen parchment Air Mail map opened with `M`. The map pauses gameplay by making the host skip simulation updates, but gameplay input remains live because the map and balloon simulation own independent global keyboard listeners.

While the map is open, the main RAF continues rendering the 3D scene and the map starts a second RAF. No map transition ID, pause revision, input generation, focus lease, projection revision or first-visible-frame receipt coordinates those owners.

## Plan ledger

**Goal:** make the parchment map one authoritative transition across gameplay pause, input isolation, focus, map projection, frame ownership, observation and lifecycle.

- [x] Compare the complete Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `TheOpenAbove` as the oldest eligible repository with a newer undocumented UI cutover.
- [x] Trace page, map, simulation input, RAF, focus, lifecycle and validation behavior.
- [x] Identify the interaction loop, all domains, 60 active source-backed kits and every offered service.
- [x] Define the missing parchment-map pause/input authority.
- [x] Add timestamped tracker, turn ledger and system audits.
- [x] Refresh root `.agent` state and kit registry.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Implement the authority and executable browser/Pages fixtures.

## Read this first

```txt
.agent/trackers/2026-07-12T08-50-32-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-12T08-50-32-04-00-parchment-map-pause-input-authority-dsk-map.md
.agent/render-audit/2026-07-12T08-50-32-04-00-dual-raf-map-visible-frame-gap.md
.agent/gameplay-audit/2026-07-12T08-50-32-04-00-map-pause-resume-flight-loop.md
.agent/interaction-audit/2026-07-12T08-50-32-04-00-map-toggle-input-admission-map.md
.agent/map-system-audit/2026-07-12T08-50-32-04-00-pause-input-focus-lifecycle-contract.md
.agent/deploy-audit/2026-07-12T08-50-32-04-00-map-pause-input-fixture-gate.md
.agent/turn-ledger/2026-07-12T08-50-32-04-00.md
.agent/kit-registry.json
```

Retained audits remain authoritative for runtime admission, import purity, balloon profile/model loading, runtime lifecycle, fixed-step/input sequencing, Air Mail mission/reset, committed observation, public host isolation, frame failure, terrain, grass, world surface, steering, HDR surfaces and the superseded HUD accessibility path.

## Interaction loop

```txt
page
  -> create game canvas
  -> create hidden parchment map dialog and 2D canvas
  -> create hidden fatal error surface

boot
  -> create visual, balloon, airstream, mail and simulation owners
  -> create map overlay with route/town/player sources
  -> create camera, presentation and telemetry
  -> start main RAF

map closed
  -> advance gameplay owners
  -> render 3D frame

M opens map
  -> map Boolean becomes true
  -> map RAF starts
  -> main host skips gameplay updates
  -> gameplay key listeners remain active
  -> main RAF continues 3D rendering with dt=0

M or Escape closes map
  -> map RAF stops
  -> gameplay resumes
  -> mutable key state accumulated during the map is consumed
```

## Domains in use

```txt
browser shell, import map, semantic HTML, game canvas and map dialog
runtime admission, startup failure, session and RAF ownership
keyboard/key-state, blur, wheel zoom and variable frame time
map transition, pause/resume, focus and lifecycle
map world transform, route, town, destination and player projection
balloon simulation, airstream, steering, clearance and snapshots
mail route, parcel, town, delivery volume, progress and reset
balloon profile, model assembly, loading and GPU resources
balloon geometry, rigging, presentation and camera
quality, dynamic resolution and HDR render-surface ownership
terrain, grass, atmosphere, water, lighting and lens response
telemetry, GameHost and headless inspection
fatal error projection and accessibility
checks, tests, build and Pages deployment
```

## Kits and services

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

The new source-backed kit is:

```txt
open-above-parchment-map-overlay-kit
  M/Escape toggle
  visibility and aria-hidden projection
  ResizeObserver sizing
  world-to-map coordinates
  route, town, destination and player drawing
  recursive map RAF
  open-state snapshot
  local disposal
```

The exact complete kit and per-service map is in the latest tracker and `.agent/kit-registry.json`.

## Main finding

```txt
map open is a mutable Boolean, not a pause command/result
simulation and map own independent global key listeners
flight key state remains mutable while the map is open
main RAF and map RAF run concurrently
map snapshot exposes only { open }
no map/pause/input/projection generation exists
no deterministic focus transfer or close-control result exists
map dispose is not owned by the host lifecycle
old HUD mutation was removed, but semantic mission status was not replaced
```

## Required parent domain

```txt
open-above-parchment-map-pause-input-authority-domain
  -> map transition identity and admission
  -> participant pause/resume barrier
  -> gameplay input suspension and key-state retirement
  -> map input context and keyboard scope
  -> focus lease and result
  -> immutable map frame plan and source fingerprint
  -> one map-frame owner
  -> open/close result, observation, journal and frame acknowledgement
  -> browser and Pages fixtures
```

## Ordered implementation queue

```txt
1. immutable runtime admission
2. import purity and single frame ownership
3. balloon profile/model authority
4. runtime lifecycle, fixed-step clock and sequenced input
5. product source, Air Mail route and mission reset
6. committed observation, public host and frame-failure containment
7. terrain, grass and world-surface authorities
8. steering and presentation coherence
9. HDR attachment and render-surface resolution authority
10. parchment map pause/input authority
11. semantic mission status and fatal accessibility authority
```

## Next safe ledge

```txt
Parchment Map Pause and Input Authority
+ Map Transition Command and Revision
+ Pause Participant Barrier
+ Flight Input Isolation
+ Focus and Keyboard Scope
+ One Map Frame Owner
+ First Map and Resumed Flight Frame Receipts
```