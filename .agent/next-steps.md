# Next Steps: TheOpenAbove Page-Lifecycle Suspension and Resume

**Last aligned:** `2026-07-16T07-58-10-04-00`  
**Status:** `page-lifecycle-flight-suspension-resume-authority-audited`

## Summary

The next work should add one lifecycle authority around the existing host rather than adding independent visibility checks inside simulation, map, world or rendering code.

## Plan ledger

**Goal:** make backgrounding, freezing, BFCache navigation and restoration deterministic without changing flight equations, Air Mail eligibility, Core World meaning or rendering appearance.

### Completed understanding

- [x] Confirm the flight route owns one recursive RAF and the map owns a second conditional RAF.
- [x] Confirm the host clamps elapsed wall time but publishes no suspension or resume result.
- [x] Confirm only `blur` clears held flight keys.
- [x] Inventory all affected domains and 20 planned lifecycle surfaces.
- [x] Preserve the 101-surface kit and service inventory.

### Gate 1: lifecycle evidence and identity

- [ ] Add `DocumentGeneration`, `RouteGeneration`, `LifecycleRevision`, `SuspensionRevision` and `ResumeRevision`.
- [ ] Observe `visibilitychange`, `pagehide`, `pageshow`, `freeze` and `resume` through one owned adapter.
- [ ] Normalize persisted/BFCache evidence and distinguish suspend from final retirement.
- [ ] Reject duplicate and stale lifecycle evidence.

### Gate 2: suspension policy

- [ ] Publish one `PageLifecycleSuspendResult` with an explicit reason.
- [ ] Cancel held burner, vent and steering actions and acknowledge settlement.
- [ ] Define simulation, Air Mail, airstream, camera-transition and elapsed-time policy.
- [ ] Pause world-generation budgets, map animation and render submission without losing accepted state.

### Gate 3: scheduler and clock settlement

- [ ] Own and cancel both RAF handles during accepted suspension.
- [ ] Preserve no more than one scheduled callback per generation.
- [ ] Rebase wall-clock state on resume instead of relying only on interval clamps.
- [ ] Ensure fixed-step and telemetry revisions restart from the accepted resume boundary.

### Gate 4: BFCache and restoration

- [ ] Treat `pageshow.persisted` as restoration evidence, not a fresh boot.
- [ ] Revalidate renderer, viewport, world and provider identity before resuming.
- [ ] Restore map visibility and focus from accepted route state.
- [ ] Reject callbacks retained by a pre-suspension generation.

### Gate 5: result and visible-frame proof

- [ ] Publish `PageLifecycleResult` for suspend, resume and retire outcomes.
- [ ] Publish `FirstResumedFrameAck` only after clock, input, simulation and rendering revisions agree.
- [ ] Expose the latest lifecycle snapshot through `GameHost` without leaking live browser objects.
- [ ] Project an actionable failure if restoration cannot be admitted.

### Gate 6: executable fixtures

- [ ] Hide and restore during boot, steady flight, active input, map-open, world generation and delivery.
- [ ] Exercise pagehide/pageshow with and without BFCache persistence.
- [ ] Exercise freeze/resume, duplicate events, stale callbacks and rapid visibility changes.
- [ ] Run source, Vite build, downloaded artifact and deployed Pages rows.

## Recommended file cut

```txt
src/runtime/lifecycle/
  page-lifecycle-flight-suspension-resume-authority-domain.js
  document-lifecycle-observation-kit.js
  lifecycle-generation-identity-kit.js
  lifecycle-transition-normalization-kit.js
  suspension-reason-policy-kit.js
  flight-simulation-suspension-kit.js
  held-input-cancellation-kit.js
  air-mail-suspension-kit.js
  airstream-suspension-kit.js
  world-generation-suspension-kit.js
  render-scheduler-suspension-kit.js
  map-overlay-suspension-kit.js
  camera-transition-suspension-kit.js
  resume-clock-rebase-kit.js
  bfcache-restoration-admission-kit.js
  stale-lifecycle-generation-rejection-kit.js
  page-lifecycle-result-kit.js
  first-resumed-frame-ack-kit.js

tests/page-lifecycle-browser-fixture.mjs
```

## Compatibility constraints

Preserve Three.js `0.165.0`, current balloon forces, route sampling, Air Mail settlement, Core World composition, cloud/HDR appearance, dynamic-resolution policy, map semantics, `GameHost`, Vite build and Pages deployment.

## Retained next steps

Renderer recovery, game audio, device controls, fixed-step pacing, HDR/depth coherence, cloud depth, ground-contact delivery eligibility, provider/build identity, route retirement, world adoption, terrain/flora proof, Air Mail history and flight persistence remain open.

## Do not claim

Do not claim lifecycle suspension correctness, held-input cancellation, BFCache restoration, resume clock continuity, first-resumed-frame convergence, artifact parity, Pages parity or production readiness until the full fixture matrix passes.