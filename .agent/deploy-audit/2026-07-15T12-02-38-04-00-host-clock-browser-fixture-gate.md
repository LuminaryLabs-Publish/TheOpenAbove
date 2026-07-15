# Deploy Audit: Host Clock Browser Fixture Gate

**Timestamp:** `2026-07-15T12-02-38-04-00`

## Summary

Source inspection establishes the time-loss path, but production readiness requires controlled browser clocks across source, build artifact, and deployed Pages with matching simulation and visible-frame receipts.

## Plan ledger

**Goal:** define the minimum executable gate for real-time pacing, deterministic catch-up, map suspension, resume rebasing, overload safety, interpolation, and deployment parity.

- [x] Separate source-backed findings from unrun browser claims.
- [x] Define representative callback-rate and lifecycle cases.
- [x] Define required result and visible-frame evidence.
- [ ] Implement and run the fixture matrix.

## Required fixtures

```txt
60 FPS for 60 wall seconds -> simulation elapsed and distance baseline
30 FPS for 60 wall seconds -> equivalent accepted simulation progression
20 FPS for 60 wall seconds -> bounded catch-up and equivalent pacing
10 FPS for 60 wall seconds -> bounded overload behavior with explicit receipts
5 FPS bursts -> no unbounded loop or silent time loss
single 250 ms and 1000 ms stalls -> declared recovery policy
map open for 10 seconds -> zero active simulation advancement
map close -> no hidden catch-up debt and one resume result
visibility hide and restore -> declared suspension/rebase policy
non-monotonic timestamp -> rejected without mutation
runtime replacement -> retired clock generation cannot mutate state
```

## Cross-domain assertions

```txt
balloon elapsed matches accepted clock time
position and distance remain deterministic for the same input timeline
airstream samples the accepted simulation elapsed
mail deliveredAt uses the accepted simulation timeline
world and engine step counts match the balloon step count
render result identifies the accepted simulation revision
FirstClockAlignedFrameAck matches the final step batch
```

## Artifact matrix

```txt
source module run
Vite production build
uploaded Pages artifact
published Pages origin
```

Every surface must expose matching clock policy, step results, simulation revision, and first visible frame identity.

## Current evidence

```txt
npm run check: not run
npm run build: not run
controlled-clock browser fixture: unavailable
low-FPS comparison: not run
map suspension/resume fixture: not run
artifact downloaded: no
Pages URL fetched: no
combined commit statuses: none returned
```

## Validation boundary

No real-time pacing, deterministic catch-up, suspension safety, overload safety, interpolation quality, artifact parity, deployed parity, or production readiness is claimed.