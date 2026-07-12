# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-12T04-00-32-04-00`

## Status

```txt
status: frame-failure-containment-authority-audited
repository revision reviewed: a36bd0958c66b26f9be38085486271f11a623576
runtime source changed by this pass: no
branch: main
root .agent state: refreshed
central ledger sync: pending until repo-local commit sequence completes
central internal change log: pending until repo-local commit sequence completes
```

## Summary

The current runtime has a startup error projection but no post-start frame failure boundary. `boot()` catches the promise returned by `createGame()`. The recursive `frame()` callback runs later and invokes eleven ordered state, presentation, render and HUD stages without an enclosing catch or typed stage results.

If any stage throws, the callback exits before `requestAnimationFrame(frame)` is reached. The product does not call `showFatal()`, publish a failure result, cancel remaining owners, revoke public capabilities, retain a last-known-good observation or admit a cold restart. Stages completed before the exception may remain committed in live owners even though the canvas and HUD still represent an older or different frame.

## Plan ledger

**Goal:** define one frame failure transaction from immutable input and ordered stage execution through failure admission, last-known-good retention, quarantine, terminal projection, disposal and fresh-session restart.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central and root `.agent` coverage.
- [x] Select only `TheOpenAbove` as the oldest eligible central entry.
- [x] Review root guidance and retained audit state.
- [x] Trace startup error handling and all normal frame stages.
- [x] Confirm successor RAF scheduling occurs only after render and HUD completion.
- [x] Confirm post-start errors do not reach `showFatal()`.
- [x] Preserve the complete 59-kit source-backed inventory and service map.
- [x] Define stage identity, typed results, failure admission, last-good state, quarantine, disposal and restart contracts.
- [x] Add timestamped tracker and system audits.
- [x] Refresh root `.agent` routing state and kit registry.
- [ ] Implement runtime changes and execute fault-injection fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing repositories: 0
root-.agent-missing repositories: 0

TheOpenAbove       2026-07-12T02-29-50-04-00 selected
IntoTheMeadow      2026-07-12T02-38-23-04-00
HorrorCorridor     2026-07-12T02-49-19-04-00
PhantomCommand     2026-07-12T03-00-46-04-00
ZombieOrchard      2026-07-12T03-11-51-04-00
TheUnmappedHouse   2026-07-12T03-21-27-04-00
AetherVale         2026-07-12T03-28-44-04-00
MyCozyIsland       2026-07-12T03-39-52-04-00
PrehistoricRush    2026-07-12T03-51-15-04-00
TheCavalryOfRome   excluded
```

## Interaction loop

```txt
startup
  -> create visual domain
  -> await balloon model
  -> create airstream, mail, simulation, camera and presentation owners
  -> create telemetry engine
  -> publish raw GameHost owners
  -> initialize one frame of state
  -> schedule product RAF

product RAF
  -> calculate clamped variable dt
  -> simulation.update
  -> mail.update
  -> airstream.update
  -> simulation.applyToBalloon
  -> animateHotAirBalloon
  -> balloonPresentation.update
  -> cameraRig.update
  -> visual.update
  -> engine.tick
  -> visual.render
  -> updateHud
  -> requestAnimationFrame(frame)

failure path after startup
  -> exception escapes frame callback
  -> remaining stages are skipped
  -> successor RAF is not scheduled
  -> showFatal is not called
  -> no failure lifecycle transition occurs
```

## Source-backed findings

### Startup and runtime failures use different paths

`boot()` wraps only `await createGame()`. Errors thrown during asynchronous construction reach `showFatal()`. Once `createGame()` returns and the RAF begins, the callback is no longer inside that catch.

### Frame stages mutate sequentially

Simulation, mission, airstream, balloon, presentation, camera, visual and telemetry owners are mutated before render and HUD completion. There is no detached candidate frame or rollback journal.

### Successor scheduling is at the end

The next RAF is scheduled only after `visual.render()` and `updateHud()` return. Any exception before that line silently terminates the frame chain.

### A failed frame can split state and presentation

```txt
render failure after mail delivery
  live mail state: delivered
  telemetry: potentially current
  canvas: previous successful frame
  HUD: previous frame

HUD failure after render
  canvas: current frame
  HUD: previous frame
  future frames: none
```

### Public readback can expose partial mutation

The existing public host contains raw owner references and a fresh snapshot function. A failed frame has no commit fence preventing those reads from observing a partially advanced prefix.

### Existing tests do not inject stage failure

No fixture deterministically throws at each frame stage or proves no later mutation, no successor callback, last-known-good coherence, capability revocation, disposal completion or fresh-session restart.

## Consequences

```txt
runtime can freeze without visible fatal projection
player input can be consumed without matching visible response
mail delivery can commit without matching canvas/HUD evidence
canvas, HUD, telemetry and GameHost can describe different revisions
public callers can continue mutating a failed owner graph
resource cleanup may never run
retry can reuse or overlap failed-session state unless separately fenced
```

## Domains in use

```txt
browser shell, DOM, Vite and Pages
runtime admission, session, startup failure and RAF ownership
frame-stage execution, failure containment and terminal observation
public host capabilities and readback
keyboard, blur, wheel and variable frame time
balloon simulation, airstream, steering, clearance and snapshots
mail route, town, volume, progress and reset
balloon profile, model assembly, async loading and resources
envelope profile, shell, pattern, seams and mouth
basket, burner, rigging, rope and part presentation
camera follow, zoom, clipping and steering look
terrain, grass, atmosphere, water, HDR and dynamic resolution
Nexus telemetry, HUD and headless readback
checks, pure tests, build and Pages deployment
```

## Kit inventory

```txt
runtime/gameplay source-backed kits: 15
balloon/object/presentation source-backed kits: 15
visual environment source-backed kits: 26
tooling/proof source-backed kits: 3
active source-backed total: 59
runtime-implied adapters: 12
inactive legacy kits: 11
planned frame-failure authority kits: 24 including the parent domain
```

The exact active kit list and per-kit services are recorded in the timestamped tracker and `.agent/kit-registry.json`.

## Services offered

```txt
runtime boot, fatal projection and host publication
keyboard burner/vent/steering input and wheel camera input
wind-driven simulation, clearance, transforms and snapshots
airstream route/field/force/visual/debug services
mail parcel/route/town/volume/progress/reset services
procedural balloon profile/model and shell construction
basket, burner, rigging, rope, materials and animation
camera follow, steering look, zoom, clipping and basket blend
terrain, grass, sky, cloud, water, lighting and HDR rendering
dynamic-resolution and renderer observations
Nexus telemetry, HUD, GameHost and headless readback
checks, fixtures, Vite build and Pages deployment
```

## Required parent domain

```txt
open-above-frame-failure-containment-authority-domain
```

Planned coordinating services:

```txt
frame and stage identity
immutable ordered execution plan
typed stage results
failure identity, classification and single admission
completed-stage mutation journal
last-known-good frame retention
mutation quarantine and public capability revocation
render freeze and bounded failure overlay
ordered disposal plan and results
terminal failure observation and journal
cold-restart handoff into a new session
fault-injection, last-good, HUD and Pages fixtures
```

## Required invariants

```txt
all frame stages execute inside one failure boundary
one failed stage produces one failure result
no later stage mutates after failure
no failed frame becomes the committed observation
last-known-good canvas, HUD and readback remain correlated
failed sessions expose no mutation capabilities
all callbacks and listeners are retired before terminal completion
restart creates new owner, session and mission identities
```

## Ordered safe ledges

```txt
1. immutable runtime admission
2. import purity and frame ownership
2a. balloon profile snapshot/admission/fingerprint authority
2b. balloon model assembly/loading/resource authority
3. runtime session lifecycle and ordered disposal
4. fixed-step clock and sequenced input
4a. product source and acceptance parity
5. Air Mail route and delivery authority
5a. mission restart transaction and epoch
5b. committed observation frame authority
5c. public host owner quarantine and capability authority
5d. frame failure containment and last-known-good authority
6. terrain source and LOD transition authority
6a. bounded terrain build and atomic replacement
7. grass spatial identity and backend truth
7a. world-surface consumer parity
8. balloon steering and presentation authority
```

Documentation only. No runtime source, package, rendering or deployment behavior changed.