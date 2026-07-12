# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-12T07-00-48-04-00`

## Status

```txt
status: hud-accessibility-announcement-authority-audited
repository revision reviewed: e0f40064e935170dabc642242ce0b25a28527929
runtime source changed by this pass: no
branch: main
root .agent state: refreshed
central ledger sync: complete
central internal change log: complete
```

## Summary

The page marks `#hud` as `aria-live="polite"`. The runtime then replaces the complete HUD `innerHTML` before the first animation frame and after every rendered frame. Rapidly changing visual telemetry, mission copy, camera state and control hints therefore share one assistive channel with no semantic event boundary, deduplication, elapsed-time budget or typed result.

The fatal path reveals a detailed `<pre>` and writes a generic HUD error message, but the detail surface has no alert role, focus target, fatal identity or terminal acknowledgement.

## Plan ledger

**Goal:** define one HUD accessibility transaction from committed mission/frame observation through visual projection, semantic event admission, bounded live-region commit, fatal focus and first-compatible-frame acknowledgement.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central and root `.agent` coverage.
- [x] Select only `TheOpenAbove` as the oldest eligible repository.
- [x] Review `AGENTS.md`, `index.html`, `src/main.js`, simulation, camera, smoke tests and root `.agent` state.
- [x] Trace HUD mutation, live-region semantics, mission events and fatal projection.
- [x] Preserve the complete 59-kit source-backed inventory and service map.
- [x] Define event identity, policy, priority, dedupe, rate budget, live-region projection, fatal focus and frame receipts.
- [x] Add timestamped tracker and system audits.
- [x] Refresh root `.agent` routing state and kit registry.
- [x] Synchronize the central ledger and internal change log.
- [x] Create no branch or pull request.
- [ ] Implement runtime changes and execute browser/Pages accessibility fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

TheOpenAbove       2026-07-12T05-11-46-04-00 selected
PrehistoricRush    2026-07-12T05-21-52-04-00
IntoTheMeadow      2026-07-12T05-39-42-04-00
PhantomCommand     2026-07-12T05-49-04-04-00
HorrorCorridor     2026-07-12T05-59-28-04-00
ZombieOrchard      2026-07-12T06-19-56-04-00
TheUnmappedHouse   2026-07-12T06-30-34-04-00
AetherVale         2026-07-12T06-41-32-04-00
MyCozyIsland       2026-07-12T06-51-27-04-00
TheCavalryOfRome   excluded
```

## Interaction loop

```txt
page
  -> create canvas
  -> create polite live HUD
  -> create hidden error pre

boot
  -> write loading HUD
  -> create game graph
  -> perform initial state projection
  -> write live HUD
  -> start RAF

frame
  -> mutate simulation/mail/airstream/presentation/camera/visual state
  -> render canvas
  -> serialize all HUD fields
  -> replace live-region innerHTML
  -> schedule successor

fatal startup
  -> reveal and populate error pre
  -> replace live HUD with generic error text
  -> publish no alert/focus/result receipt
```

## Source-backed findings

### Visual and assistive channels are coupled

The visible HUD node is also the polite live region. It combines parcel text, delivery status, route/capture, burner, steering, camera mode, altitude and control hints.

### Complete replacement occurs every frame

`updateHud()` assigns `hud.innerHTML` after every `visual.render()`. This recreates the live-region descendants even when the text is unchanged and continuously changes accessible text when rounded telemetry advances.

### No semantic announcement authority exists

There is no:

```txt
announcement ID
semantic event ID
kind or priority
mission/projection revision
admission result
deduplication
elapsed-time rate budget
verbosity policy
live-region revision
frame acknowledgement
```

### Fatal discovery is incomplete

`#error` has no alert semantics or focus contract. A concise fatal result, detailed error surface and focus transfer are not committed as one terminal transaction.

### Current proof is static

The smoke test asserts file presence and source patterns. It does not create a DOM, observe mutation frequency, exercise a screen reader/accessibility tree, verify fatal focus or test deployed Pages accessibility behavior.

## Domains in use

```txt
browser shell, semantic HTML, canvas and DOM projection
runtime admission, session, startup failure and RAF ownership
keyboard, blur, wheel and variable frame time
balloon simulation, airstream, steering, clearance and snapshots
mail route, town, volume, delivery progress and reset
balloon profile, model assembly, loading and resources
balloon geometry, rigging, presentation and camera
quality, dynamic resolution and HDR render-surface ownership
terrain, grass, atmosphere, water, lighting and lens response
telemetry, visual HUD, GameHost and headless inspection
semantic mission status and visual telemetry classification
accessible announcement admission, dedupe, priority and rate budgeting
live-region projection, fatal alert and focus transfer
visible-frame and accessible-status correlation
checks, tests, build and deployment
```

## Kit inventory and services

```txt
runtime/gameplay source-backed kits: 15
balloon/object/presentation source-backed kits: 15
visual-environment source-backed kits: 26
tooling/proof source-backed kits: 3
active source-backed total: 59
runtime-implied adapters: 12
inactive legacy kits: 11
planned HUD accessibility kits: 27 including parent
```

Services cover runtime boot, input, wind-driven simulation, airstream force, mail delivery, balloon construction and presentation, camera response, terrain/grass/atmosphere rendering, quality and HDR presentation, telemetry, visual HUD, fatal projection, diagnostics, tests, build and deployment. The exact per-kit map is in the timestamped tracker and `.agent/kit-registry.json`.

## Required parent domain

```txt
open-above-hud-accessibility-announcement-authority-domain
```

## Required services

```txt
visual HUD and semantic status separation
projection, source-event and announcement identity
kind, priority and product/user policy
mission-event admission and stale revision rejection
deduplication and elapsed-time rate budgeting
field-level visual DOM projection
dedicated atomic live-region projection
fatal alert and deterministic focus transfer
typed results, detached observations and journal
mission, frame and announcement acknowledgement
browser, assistive-technology and Pages fixtures
```

## Required invariants

```txt
per-frame telemetry never mutates the live region directly
only committed semantic events produce announcements
announcement ordering is stable across refresh rates
identical event IDs are idempotent
rate budgets use elapsed time
visual HUD remains independent from assistive queue behavior
fatal status is announced once and details are keyboard reachable
replacement sessions reject predecessor announcements
frame, mission and announcement provenance is observable
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
8. HUD accessibility announcement authority
```

Documentation only. No runtime source, dependency, rendering, accessibility or deployment behavior changed.