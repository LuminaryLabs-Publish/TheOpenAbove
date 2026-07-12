# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-12T04-00-32-04-00`

## Status

```txt
status: frame-failure-containment-authority-audited
repository revision reviewed: a36bd0958c66b26f9be38085486271f11a623576
runtime source changed by this pass: no
branch: main
root .agent state: refreshed
central ledger sync: complete
central internal change log: complete
```

## Summary

The runtime projects errors that reject `createGame()`, but the recursive frame callback runs later outside the `boot()` catch. It invokes simulation, mail, airstream, balloon, presentation, camera, visual, telemetry, render and HUD stages without one frame-level containment boundary.

If a stage throws, the callback exits before the successor RAF is scheduled. The product does not call `showFatal()`, publish a terminal result, quarantine mutation, revoke public capabilities, preserve a last-known-good observation or dispose the failed owner graph. Stages completed before the exception may remain committed while the canvas and HUD show older or different revisions.

## Plan ledger

**Goal:** define one frame failure transaction from immutable input and ordered stage execution through failure admission, last-known-good retention, quarantine, terminal projection, disposal and fresh-session restart.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central and root `.agent` coverage.
- [x] Select only `TheOpenAbove` as the oldest eligible central entry.
- [x] Review root guidance, retained audits and `src/main.js`.
- [x] Trace startup error handling and all normal frame stages.
- [x] Confirm successor scheduling occurs only after render and HUD completion.
- [x] Confirm post-start errors do not reach `showFatal()`.
- [x] Preserve the complete 59-kit source-backed inventory and service map.
- [x] Define stage identity, typed results, failure admission, last-good state, quarantine, disposal and restart contracts.
- [x] Add timestamped tracker and system audits.
- [x] Refresh root `.agent` routing state and kit registry.
- [x] Synchronize the central ledger and internal change log.
- [ ] Implement runtime changes and execute fault-injection fixtures.

## Selection comparison

```txt
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
  -> create visual and balloon
  -> create airstream, mail, simulation, camera and presentation owners
  -> create telemetry engine
  -> publish GameHost owners
  -> initialize state
  -> schedule RAF

frame
  -> simulation.update
  -> mail.update
  -> airstream.update
  -> apply and animate balloon
  -> presentation.update
  -> camera.update
  -> visual.update
  -> telemetry tick
  -> render
  -> HUD update
  -> successor RAF

stage failure
  -> exception escapes
  -> remaining stages do not run
  -> successor RAF is absent
  -> no product failure result or lifecycle transition
```

## Source-backed findings

### Startup and runtime failures use different paths

`boot()` wraps only `await createGame()`. Frame callbacks execute later and have no enclosing catch or typed result boundary.

### Frame stages mutate sequentially

Simulation, mission, airstream, balloon, presentation, camera, visual and telemetry owners can advance before rendering and HUD commit.

### Successor scheduling is at the end

The next RAF is scheduled only after `visual.render()` and `updateHud()` return. Any earlier exception silently terminates the product loop.

### Failed frames can split presentation

```txt
render failure after delivery
  live mail state: delivered
  canvas: previous frame
  HUD: previous frame

HUD failure after render
  canvas: current frame
  HUD: previous frame
  future frames: none
```

### Public readback can expose the partial prefix

Raw owner exposure and fresh snapshot assembly have no failed-frame commit fence.

### Existing tests do not inject stage failures

No fixture proves no later mutation, no successor callback, coherent last-known-good output, capability revocation, ordered disposal or clean restart.

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
checks, tests, build and Pages deployment
```

## Kit inventory and services

```txt
runtime/gameplay source-backed kits: 15
balloon/object/presentation source-backed kits: 15
visual environment source-backed kits: 26
tooling/proof source-backed kits: 3
active source-backed total: 59
runtime-implied adapters: 12
inactive legacy kits: 11
planned frame-failure kits: 24 including parent
```

Services cover runtime boot, input, wind-driven simulation, airstream force, mail delivery, balloon profile/model assembly, materials/rigging/animation, camera response, terrain/grass/atmosphere rendering, telemetry, HUD, diagnostics, tests, headless inspection, build and Pages deployment. The exact per-kit map is in the timestamped tracker and `.agent/kit-registry.json`.

## Required parent domain

```txt
open-above-frame-failure-containment-authority-domain
```

Required services:

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
stage-failure, last-good, HUD and Pages fixtures
```

## Required invariants

```txt
all stages execute inside one failure boundary
one failed stage produces one failure result
no later stage mutates after failure
no failed frame becomes committed
last-known-good canvas, HUD and readback remain correlated
failed sessions expose no mutation capabilities
callbacks/listeners are retired before terminal completion
restart creates new owner, session and mission identities
```

## Ordered safe ledges

```txt
1. immutable runtime admission
2. import purity and frame ownership
2a. balloon profile authority
2b. balloon model/resource authority
3. runtime session lifecycle and ordered disposal
4. fixed-step clock and sequenced input
4a. product source and acceptance parity
5. Air Mail route and delivery authority
5a. mission restart transaction and epoch
5b. committed observation frame authority
5c. public host capability authority
5d. frame failure containment and last-known-good authority
6. terrain source and LOD transition authority
6a. bounded terrain build and atomic replacement
7. grass spatial identity and backend truth
7a. world-surface consumer parity
8. balloon steering and presentation authority
```

Documentation only. No runtime source, package, rendering or deployment behavior changed.