# Deploy Audit: Map Pause and Input Fixture Gate

**Timestamp:** `2026-07-12T08-50-32-04-00`

## Summary

The current smoke test verifies that map files and selected source patterns exist. It does not execute the browser route, transition input contexts, inspect held-key state, count RAF owners, verify focus, observe map lifecycle or correlate map and resumed-flight frames.

## Plan ledger

**Goal:** require the same map pause/input/lifecycle behavior in pure tests, local browser execution, built output and deployed Pages.

- [x] Review current package scripts and smoke checks.
- [x] Identify missing pure and browser proof.
- [x] Define build and Pages parity gates.
- [ ] Implement and execute the gates.

## Existing commands

```txt
npm run check
npm run headless:check
npm run build
```

The source-pattern smoke confirms:

```txt
map file exists
index contains map shell
main creates and reads map overlay
M and Escape handlers exist
route/town/player drawing exists
HUD path is absent
```

It does not prove runtime correctness.

## Required pure fixtures

```txt
fixture:map-transition-idempotency
fixture:map-context-input-admission
fixture:map-held-key-retirement
fixture:map-pause-participant-barrier
fixture:map-source-fingerprint
fixture:map-projection-no-op
fixture:map-stale-generation-rejection
fixture:map-observation-detachment
```

## Required browser fixtures

```txt
boot actual page
focus game canvas
hold each flight key and open map
press each flight key while map is open
close by M and Escape
verify neutral first resumed simulation step
verify one map frame owner
verify no stale map RAF after close
verify map focus enters and exits deterministically
verify ResizeObserver and listener retirement
verify 30, 60 and 120 Hz transition parity
resize and change DPR while open
inject startup and map-frame failures
record map-open and resumed-flight frame receipts
```

## Required built-output checks

```txt
dist contains map module and shell
dist has no retired HUD dependency
built route loads under project base path
module imports resolve without dev server behavior
map source fingerprints match source build expectations
```

## Required Pages smoke

```txt
load deployed route
open map with M
confirm flight is paused
confirm gameplay input is isolated
confirm route, towns, destination and player are visible
confirm semantic map summary and close action are reachable
close map with M and Escape
confirm neutral deterministic resume
repeat after resize, tab visibility change and route reload
confirm no duplicate callbacks after repeated sessions
```

## Completion gate

Do not claim the map is a reliable pause surface until local browser, built output and Pages executions prove input isolation, participant parity, focus lifecycle, single frame ownership, stale-callback rejection and first-visible-frame correlation.