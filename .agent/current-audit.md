# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-12T08-50-32-04-00`

## Status

```txt
status: parchment-map-pause-input-authority-audited
repository revision reviewed: a5dd665a80cfe594ebaf05085633d4006e012b32
runtime source changed by this pass: no
branch: main
root .agent state: refreshed
central ledger sync: complete
central internal change log: complete
```

## Summary

The active route now uses a full-screen parchment map as its only ordinary UI. The map pauses gameplay by causing the host to skip simulation, mail, airstream, presentation, camera, visual-update and telemetry calls. That pause does not include input or frame ownership.

The simulation and map own independent global keyboard listeners. Gameplay keys continue mutating the simulation's held-key `Set` while the map is open. The main RAF also continues rendering the 3D scene while the map runs a second RAF. No transition ID, pause revision, input generation, focus lease, source fingerprint or visible-frame acknowledgement coordinates the boundary.

## Plan ledger

**Goal:** define one map transition from browser intent through input isolation, participant pause, map projection, focus, lifecycle, resumed gameplay and visible-frame proof.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central and root `.agent` coverage.
- [x] Select only `TheOpenAbove` as the oldest eligible entry with newer undocumented source changes.
- [x] Review `AGENTS.md`, `index.html`, `src/main.js`, the map overlay, simulation input, mail domain, smoke tests and root `.agent` state.
- [x] Trace map transition, pause, input, focus, frame and lifecycle behavior.
- [x] Reconcile 60 active source-backed kits and offered services.
- [x] Define transition, pause, input, focus, frame and observation contracts.
- [x] Add timestamped tracker and system audits.
- [x] Refresh root `.agent` routing state and registry.
- [x] Synchronize the central ledger and internal change log.
- [x] Create no branch or pull request.
- [ ] Implement runtime changes and execute browser/Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
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

## Interaction loop

```txt
boot
  -> create 3D game graph
  -> create map overlay and its global key listener/observer
  -> create simulation and its global key listeners
  -> start main RAF

FLIGHT
  -> key state feeds simulation
  -> gameplay owners advance
  -> 3D scene renders

M key
  -> simulation records KeyM
  -> map toggles OPEN
  -> map RAF starts

MAP
  -> host skips gameplay-owner updates
  -> simulation key listeners remain active
  -> main RAF renders frozen 3D scene with dt=0
  -> map RAF redraws mutable route/town/player/parcel state

M or Escape
  -> map toggles CLOSED
  -> map RAF stops
  -> gameplay resumes with the current held-key Set
```

## Source-backed findings

### Pause is not a transaction

`mapOverlay.isOpen()` is read directly in the host RAF. There is no command envelope, transition ID, participant prepare/commit barrier, rollback path or result.

### Input context is shared

The simulation receives every global keydown and keyup. The map separately receives global keydown. No authority declares FLIGHT versus MAP ownership for one event.

### Resume can consume map-context keys

The simulation's held-key Set remains mutable while updates are paused. Closing the map can therefore apply input that began in the map context.

### Frame ownership is split

The main RAF remains active and renders the 3D surface. The map starts its own RAF. No shared frame ID or source revision correlates the two visible surfaces.

### State and observation are insufficient

The map snapshot exposes only `{ open }`. It does not expose phase, generation, pause revision, input generation, projection revision, source fingerprint, focus state or visible frame.

### Dialog/focus semantics are partial

The shell has `role="dialog"` and `aria-modal="true"`, but no focus transfer, focus restoration, close control or semantic route summary exists.

### Local disposal is not lifecycle ownership

The overlay defines `dispose()`, but `src/main.js` does not call or expose it. Listener, observer and RAF retirement remain outside the runtime-session transaction.

### The prior HUD defect changed shape

The old HUD/live-region path has been removed. That specific mutation defect no longer exists in the active route, but the planned semantic mission-status authority was not implemented. Fatal details remain a non-focusable `<pre>` without an alert result.

## Domains in use

```txt
browser shell, semantic HTML, game canvas and parchment map dialog
runtime admission, session, startup failure and RAF ownership
keyboard/key-state, blur, wheel zoom and variable frame time
map transition, pause/resume, focus, projection and lifecycle
map world coordinates, routes, towns, destination and player marker
balloon simulation, airstream, steering, clearance and snapshots
mail route, parcel, town, delivery progress and reset
balloon profile, model, geometry, rigging, presentation and camera
quality, dynamic resolution, HDR surface and post processing
terrain, grass, clouds, atmosphere, water, lighting and lens response
telemetry, GameHost, headless inspection and fatal projection
checks, tests, build and deployment
```

## Kit inventory and services

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

Services cover runtime boot, browser input, wind flight, airstream routing, mail delivery, balloon construction/presentation, camera response, world and HDR rendering, parchment-map projection, telemetry, diagnostics, tests, build and Pages deployment. The exact per-kit service map is in the timestamped tracker and `.agent/kit-registry.json`.

## Required parent domain

```txt
open-above-parchment-map-pause-input-authority-domain
```

## Required services

```txt
map transition command, identity, generation and admission
pause participant registration, barrier and result
flight input suspension and held-key retirement
map input context and keyboard scope
focus lease, transfer and restoration result
immutable map frame plan and source fingerprint
single map-frame ownership
map open/close result and detached observation
first visible map and first resumed-flight frame acknowledgement
bounded journal and browser/Pages fixture matrix
```

## Required invariants

```txt
one physical key event has one admitted consumer
no map-context key enters gameplay state
all gameplay participants pause and resume at one revision
opening starts one map-frame owner
closing retires all map callbacks before gameplay resumes
map frames cite one world/source/surface fingerprint
open/close is idempotent by transition ID
stale sessions and generations are rejected
focus enters and exits deterministically
30, 60 and 120 Hz produce identical transition/input results
```

## Ordered safe ledges

```txt
1. runtime admission and module identity
2. import purity and frame ownership
3. model/profile and runtime lifecycle
4. fixed-step simulation and ordered input
5. mission, committed observation, host capability and frame failure
6. terrain, grass and world-surface authorities
7. steering and HDR render-surface coherence
8. parchment map pause/input authority
9. semantic mission status and fatal accessibility authority
```

Documentation only. No runtime source, dependency, gameplay, input, rendering, accessibility or deployment behavior changed.