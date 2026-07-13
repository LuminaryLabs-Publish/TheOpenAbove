# Deploy Audit: Staged Generation Fixture Gate

## Summary

The workflow invokes `headless:world`, but that capability checks source markers and then runs `npm run check`. The package `check` script does not execute `tests/world-generation.mjs`, so the staged deterministic test is present without being part of the advertised validation or production build gate.

## Plan ledger

**Goal:** require executable source, browser, built-output and Pages evidence for generation cadence, fallback, adoption and failure recovery.

- [x] Inspect package scripts.
- [x] Inspect Pages workflow.
- [x] Inspect headless world-generation capability.
- [x] Inspect staged generation test coverage.
- [ ] Wire executable tests and browser fixtures into the gate.

## Current proof chain

```txt
Pages build
  -> npm run headless:world
  -> inspect source with regular expressions
  -> npm run check

npm run check
  -> tests/smoke.mjs
  -> tests/terrain-streaming.mjs
  -> tests/world-route-protection.mjs
  -> tests/terrain-overlays.mjs

not invoked
  -> tests/world-generation.mjs
```

## Required pure-domain fixtures

```txt
identical-seed-identical-output
staged-output-equals-synchronous-output
first-sample-uses-fallback
phase-order-and-monotonic-progress
flow-sort-spans-multiple-budgets
reset-retains-active-world
disposal-rejects-later-work
failure-retains-predecessor
stale-attempt-rejected
```

## Required consumer-adoption fixtures

```txt
terrain-prepares-successor-without-visible-switch
vegetation-prepares-successor
flora-prepares-against-successor-vegetation
map-cache-prepares-successor
all-consumer-commit-is-atomic
consumer-throw-rolls-back
partial-prepare-disposes-successor
predecessor-remains-visible-until-commit
```

## Required browser fixtures

```txt
first-frame-before-generation-work
map-open-does-not-starve-generation
frame-budget-remains-bounded
completion-frame-remains-bounded
first-adopted-world-frame-cites-revision
terrain-vegetation-flora-map-visible-parity
reset-during-work
retire-during-work
```

## Required release gate

```txt
npm check includes executable world-generation test
headless world command executes the staged test directly
production build runs the same proof set
built dist passes browser fixtures
GitHub Pages passes generation/adoption smoke
commit status is green for the exact documentation/runtime head
```

## Validation state

No command was run in this documentation pass. Source confirms declarations and wiring gaps only.