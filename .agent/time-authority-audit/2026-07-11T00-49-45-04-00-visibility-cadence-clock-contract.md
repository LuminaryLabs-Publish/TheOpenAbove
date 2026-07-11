# Time Authority Audit: Visibility and Cadence Clock Contract

**Timestamp:** `2026-07-11T00-49-45-04-00`

## Current policy

No explicit policy exists. Browser RAF behavior and two clamps implicitly decide elapsed simulation time.

## Required clock contract

```txt
clock source:
  injected monotonic now()

fixed step:
  1/60 second unless deliberately changed with fixture updates

accumulator:
  adds admitted active-session time

max substeps:
  bounded to prevent spiral-of-death

overrun:
  typed result with attempted steps, executed steps and dropped backlog

visibility hidden:
  commit suspend result and stop adding simulation time

visibility visible:
  reset render baseline, commit resume result, do not synthesize hidden-duration physics
```

If product design requires mission time to continue while hidden, use an explicit wall-clock mission deadline. Do not mix that with physics catch-up.

## Determinism guarantee

For identical initial state and input samples, authoritative results must be independent of render schedule. Presentation may differ only in frame count and interpolation.

`timeLimitSeconds` must consume the committed clock policy, never `performance.now`, `Date.now`, RAF count or render frame count directly.
