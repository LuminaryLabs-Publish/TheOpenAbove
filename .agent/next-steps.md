# Next Steps: TheOpenAbove Balloon Rigging Frame Budget and Resource Retirement

**Last aligned:** `2026-07-17T10-41-44-04-00`  
**Status:** `balloon-rigging-frame-budget-resource-retirement-authority-audited`

## Summary

Keep the current four-rope shape, sway, sag, tension response, and persistent dynamic buffers. Replace frame-local scratch allocation and implicit resource lifetime with one admitted rigging generation and typed results.

## Intent

Produce one deterministic path from balloon-model admission through bounded rigging updates, exact resource retirement, diagnostics, and the matching rendered frame.

## What needs to happen

### Gate 1: Resource admission

- [ ] Allocate `BalloonModelGeneration`, `RiggingGeneration`, and `RopeGeneration` identities.
- [ ] Enumerate owned geometries, materials, dynamic buffers, and scratch sets.
- [ ] Publish `RiggingResourceAdmissionResult` and an immutable resource manifest.

### Gate 2: Reusable scratch

- [ ] Preallocate endpoint vectors and `segments + 1` point vectors per rope.
- [ ] Reuse tangent, frame-normal, binormal, ring-normal, and ring-position vectors.
- [ ] Preserve stable typed-array identities until retirement.
- [ ] Keep raw Three.js objects outside renderer-neutral result state.

### Gate 3: Frame update admission

- [ ] Bind `HostSessionId`, route, simulation, model, rigging, tension, and frame revisions.
- [ ] Reject stale or retired generations before buffer mutation.
- [ ] Publish `RiggingFrameUpdateResult` with updated ropes, vertices, and buffer revisions.

### Gate 4: Budget settlement

- [ ] Record update duration and temporary allocation count after warm-up.
- [ ] Define an accepted long-flight CPU/allocation budget.
- [ ] Keep any visual degradation explicit and non-authoritative for flight truth.
- [ ] Publish `RiggingFrameBudgetResult`.

### Gate 5: Replacement and retirement

- [ ] Retire predecessor updates before detaching the old model.
- [ ] Dispose owned geometries and materials exactly once.
- [ ] Clear updater references and dynamic-buffer ownership.
- [ ] Publish `RiggingResourceRetirementResult`.

### Gate 6: Diagnostics and frame proof

- [ ] Add rigging generation, update revision, buffer revisions, budget state, and retirement state to diagnostics.
- [ ] Publish `RiggingFrameDigest`.
- [ ] Publish `FirstRiggingBoundFrameAck` for the accepted generation.

### Gate 7: Fixtures

- [ ] Assert stable typed-array identities across updates.
- [ ] Assert temporary allocation plateaus during a bounded long flight.
- [ ] Assert stale writes stop after replacement and disposal.
- [ ] Assert repeated retirement is harmless.
- [ ] Verify source, Vite artifact, and Pages parity.

## Recommended file cut

```txt
src/domains/ballooning/rigging/
  balloon-rigging-frame-budget-resource-retirement-authority-domain.js
  rigging-resource-manifest-kit.js
  rigging-frame-plan-kit.js
  rigging-update-budget-kit.js
  rigging-resource-retirement-kit.js

src/
  rope-kit.js
  hot-air-balloon-rigging-kit.js
  hot-air-balloon-object-kit.js

tests/
  rope-allocation-budget.mjs
  rigging-replacement-retirement.mjs
  rigging-frame-correlation.mjs
```

## Compatibility constraints

Preserve balloon geometry, four-rope layout, default 10×5 topology, sag, sway, tension response, burner animation, camera behavior, flight simulation, map behavior, sightseeing capture, and deployment.

## Do not claim

Do not claim an allocation plateau, leak-free replacement, exact disposal, stale-write rejection, rigging/frame convergence, artifact parity, Pages parity, or production readiness until implementation and fixtures exist.