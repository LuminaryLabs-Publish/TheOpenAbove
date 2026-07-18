# Deploy Audit: Simulation Allocation Browser Fixture Gate

**Timestamp:** `2026-07-18T01-41-38-04-00`  
**Status:** `balloon-simulation-tick-allocation-terrain-sample-budget-authority-audited`

## Required proof ladder

```txt
source fixture
  -> controlled Node simulation fixture
  -> deterministic parity fixture
  -> instrumented terrain-provider fixture
  -> browser long-flight observation
  -> Vite artifact fixture
  -> deployed Pages fixture
```

## Required fixtures

### Source and controlled runtime

- Construct Balloon Simulation with deterministic sampler and terrain providers.
- Run warm-up and at least 10,000 accepted ticks.
- Verify stable scratch identities after proposed implementation.
- Verify fallback wind is not evaluated while the live sampler supplies valid flow.
- Verify one post-integration terrain-provider call per accepted tick.
- Verify retirement rejects further mutation.

### Deterministic parity

- Capture a current-behavior golden trace before implementation.
- Compare position, velocity, heading, altitude, distance, flow evidence, and pose inputs after scratch adoption.
- Require exact or explicitly tolerance-bounded parity.

### Browser observation

- Run a sustained flight on low, medium, and high quality policies.
- Observe tick duration, heap trend, garbage-collection events when available, frame pacing, and visible pose stability.
- Keep measurement results device- and browser-scoped.

### Artifact and deployment

- Execute the same fixture against source and the built artifact.
- Fetch the deployed Pages origin and verify provider revision, fixture revision, and result digest.
- Reject stale artifact or provider revisions.

## Current validation state

```txt
source inspection: completed
runtime simulation fixture: not run
allocation profiler: not run
terrain query counter: not run
deterministic parity trace: not run
browser long-flight fixture: not run
artifact fixture: not run
Pages fixture: not run
```

## Gate

Do not claim reduced allocations, reduced garbage collection, faster ticks, deterministic parity, artifact parity, Pages parity, or production readiness until the corresponding executable evidence exists.