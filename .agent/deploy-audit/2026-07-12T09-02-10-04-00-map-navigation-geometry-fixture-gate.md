# Deploy Audit: Map Navigation Geometry Fixture Gate

**Timestamp:** `2026-07-12T09-02-10-04-00`

## Plan ledger

**Goal:** prevent source, build and deployed Pages output from accepting a visually present but geometrically false map.

- [x] Inspect existing package scripts and smoke assertions.
- [x] Identify missing pure, canvas and deployed geometry proof.
- [x] Define the required gate sequence.
- [ ] Implement fixtures and wire them into `npm run check`.
- [ ] Execute source, build and Pages proof.

## Current gate

```txt
npm run check
  -> node tests/smoke.mjs
  -> source-pattern assertions
  -> airstream/mail module checks
  -> balloon profile checks

npm run build
  -> npm run check
  -> vite build
```

The map assertions verify that source contains toggle handling, draw functions, destination text and `ResizeObserver`. They do not execute map geometry.

## Required pure fixtures

```txt
fixture:map-heading-cardinals
fixture:map-heading-diagonals
fixture:map-zero-speed-bearing
fixture:map-content-bounds
fixture:map-fit-policy
fixture:map-aspect-ratio-parity
fixture:map-dpr-parity
fixture:map-active-route-style
fixture:map-destination-route-style
fixture:map-off-map-policy
fixture:map-source-fingerprint
fixture:map-stale-projection-rejection
```

## Required browser canvas fixtures

```txt
load actual page and open map
inject or reach known cardinal player states
sample marker tip and body pixels
verify marker tip lies in expected travel direction
verify route/town bounds respect padding
resize to portrait, square and wide viewports
change DPR across supported range
verify CSS-space geometry remains stable
verify active and destination route styles
verify off-map behavior
capture projection result and visible-frame acknowledgement
```

## Required built-output checks

```txt
dist contains map authority and fixtures
source and built projection fingerprints match
built base path resolves map module
no fallback to direct unversioned draw-time geometry
```

## Required Pages smoke

```txt
load deployed route on an exact commit
open map
prove marker bearing against known movement
prove current mission content fit
prove destination/correct-route projection
prove portrait and wide viewport behavior
prove DPR parity
prove off-map policy
capture screenshot plus MapVisibleFrameAck
```

## CI recommendation

```txt
npm run check
  -> static smoke
  -> pure map geometry fixtures
  -> airstream/mail fixtures
  -> profile fixtures

npm run build
  -> check
  -> Vite build
  -> built-output geometry parity

Pages deploy
  -> deployed navigation smoke
```

## Validation state

```txt
existing commands run: no
new fixtures implemented: no
browser smoke run: no
Pages smoke run: no
runtime changed: no
workflow changed: no
```

A passing source-pattern smoke and successful Vite build are not sufficient evidence of map navigation correctness.