# Validation: TheOpenAbove Page-Lifecycle Suspension and Resume

**Last aligned:** `2026-07-16T07-58-10-04-00`

## Scope

Documentation-only audit of the full Publish selection comparison, TheOpenAbove interaction loop, 101-surface inventory, document lifecycle ownership, background suspension, BFCache restoration, resume clock settlement, held-input cancellation and first-resumed-frame proof.

## Plan ledger

**Goal:** distinguish the source-backed lifecycle gap from unproven browser behavior and define the executable proof required before support claims.

- [x] Enumerate all 11 accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and root `.agent` states.
- [x] Select TheOpenAbove using the oldest synchronized eligible rule.
- [x] Inspect the main host, simulation input, map RAF, package scripts and prior lifecycle audits.
- [x] Confirm no product-owned visibility/pagehide/freeze suspension and resume transaction.
- [x] Add and route the timestamped lifecycle audit family.
- [ ] Execute visibility, BFCache, freeze/resume, build, artifact and Pages fixtures.

## Source inspection performed

```txt
LuminaryLabs-Publish organization inventory
LuminaryLabs-Dev/LuminaryLabs Publish repo ledgers
TheOpenAbove root .agent documents and prior complete inventory
src/main.js
src/runtime/balloon-simulation-kit.js
src/ui/parchment-map-overlay.js
package.json
.github/workflows/deploy-pages.yml discovery
repository code search for visibilitychange pagehide pageshow freeze resume
```

## Confirmed by inspection

```txt
reviewed pre-audit repository head: d1d48c49ff687d2a6aa10c1ffd152eb6a771b3ff
reviewed runtime source revision: 1417c80309218c7c61def3b2f09a977eaab8b953
selected by oldest synchronized rule: yes
recursive flight RAF: yes
separate map RAF while open: yes
frame interval clamp to 80 ms: yes
simulation dt clamp to 1/30 s: yes
window blur key clearing: yes
visibilitychange observer: no
pagehide/pageshow observer: no
freeze/resume observer: no
owned suspension result: no
resume clock rebase result: no
BFCache restoration result: no
PageLifecycleResult: no
FirstResumedFrameAck: no
```

## What source inspection proves

```txt
browser lifecycle changes are not admitted as product commands
background RAF behavior is left to the browser
large resume intervals are clipped rather than semantically classified
only blur explicitly clears held flight keys
map and flight schedulers have no shared lifecycle generation
no result binds resumed simulation and rendering to one accepted clock revision
```

## What is not proven

```txt
whether every target browser emits blur before visibility suspension
actual RAF throttling behavior across browsers and devices
BFCache eligibility and restore behavior
input state after freeze or process suspension
Air Mail and world-generation continuity under lifecycle transitions
artifact or Pages behavior
production readiness
```

## Required fixtures

```txt
hide and restore before first frame
hide and restore during steady flight
hide while burner vent and steering are held
hide while map is open
hide during world generation and dynamic-resolution changes
hide inside a delivery volume
pagehide/pageshow without BFCache
pagehide/pageshow with persisted BFCache restoration
freeze/resume where supported
duplicate and stale lifecycle events
rapid hide/show oscillation
resume clock rebase and elapsed-time policy
FirstResumedFrameAck
source dist artifact Pages identity comparison
```

## Change scope

```txt
documentation changed: yes
runtime JavaScript changed: no
HTML or CSS changed: no
shader changed: no
gameplay changed: no
render behavior changed: no
packages or dependencies changed: no
tests or workflows changed: no
deployment changed: no
branch created: no
pull request created: no

npm run check: not run
npm run build: not run
visibility fixture: not run
BFCache fixture: not run
freeze/resume fixture: not run
held-input cancellation fixture: not run
first-resumed-frame fixture: not run
artifact downloaded: no
Pages URL fetched: no
```

## Claims intentionally withheld

No claim is made for lifecycle suspension correctness, held-input safety, BFCache restoration, resume clock continuity, stale-event rejection, first-resumed-frame convergence, artifact parity, Pages parity or production readiness.