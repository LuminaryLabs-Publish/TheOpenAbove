# Deploy Audit: Route Re-entry and Retirement Fixture Gate

**Timestamp:** `2026-07-14T06-38-49-04-00`

## Plan ledger

**Goal:** prove source, built and deployed routes can stop and restart without duplicate runtime ownership or stale rendering.

- [x] Identify source-only checks currently present.
- [x] Define browser lifecycle fixtures.
- [x] Define artifact parity requirements.
- [ ] Execute the matrix on `main`.

## Required fixtures

```txt
source route starts and presents first frame
source route stops after first frame
stop before first frame
startup failure after engine creation
startup failure after renderer creation
startup failure after balloon creation
map open during stop
same-document route replacement
second boot after full retirement
stale predecessor RAF rejection
duplicate listener/observer detection
WebGL resource and render-target count before/after
GameHost predecessor retirement
first successor frame acknowledgement
production build parity
GitHub Pages parity
```

## Required evidence

```txt
repository revision
build artifact fingerprint
route/session generations
last predecessor frame
component retirement receipts
renderer/context policy result
listener and observer counts
public GameHost terminal state
first successor frame ID
source/build/Pages comparison
```

## Current boundary

`npm run check` validates source and deterministic subsystem contracts, but it does not execute browser route stop, re-entry, failure rollback, GPU retirement or deployed-origin lifecycle proof. No readiness claim is permitted until these fixtures pass.