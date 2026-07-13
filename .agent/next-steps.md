# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-13T13-39-10-04-00`

## Plan ledger

**Goal:** keep the new staged generator intact while moving scheduling and world-consumer adoption behind one revisioned, failure-safe authority.

### Gate 1: generation identity and scheduling

- [ ] Add `WorldGenerationAttemptId` and attempt generation.
- [ ] Add `GenerationPolicyRevision` and immutable seed/surface/anchor fingerprint.
- [ ] Move `advanceGeneration()` admission out of gameplay-only `visual.update()`.
- [ ] Admit explicit frame work while the map is open without resuming gameplay.
- [ ] Return `GenerationWorkReceipt` with units and elapsed work time.
- [ ] Fence stale work after reset, dispose or host retirement.

### Gate 2: detached candidate artifact

- [ ] Keep completed arrays detached from public sampling until adoption.
- [ ] Publish immutable `WorldCandidateArtifact` and fingerprint.
- [ ] Retain the predecessor candidate and active revision until final commit.
- [ ] Separate candidate completion failure from consumer-adoption failure.

### Gate 3: consumer registry and preparation

- [ ] Register terrain-near, terrain-horizon, vegetation, grass, flowers and map cache.
- [ ] Mark mandatory and optional consumers explicitly.
- [ ] Add dependency order: terrain, vegetation, flora, map.
- [ ] Return typed `ConsumerPrepareResult` for every consumer.
- [ ] Process geometry and instance preparation under explicit budgets.

### Gate 4: atomic adoption

- [ ] Add `WorldGenerationAdoptionCommand` and `AdoptionPlanId`.
- [ ] Validate candidate, predecessor and consumer-registry revisions.
- [ ] Commit public sampling and prepared consumer resources together.
- [ ] Publish `WorldGenerationAdoptionResult`.
- [ ] Dispose predecessor resources only after visible acknowledgement.

### Gate 5: rollback and recovery

- [ ] Inject vegetation, terrain, grass, flower and map preparation failures.
- [ ] Keep predecessor sampling and render resources on prepare failure.
- [ ] Dispose incomplete successor resources exactly once.
- [ ] Add terminal rollback receipts.
- [ ] Distinguish generator failure from adoption failure in diagnostics.

### Gate 6: visible proof

- [ ] Publish one `AdoptedWorldFrameEnvelope`.
- [ ] Include active sampling, terrain, vegetation, grass, flower and map revisions.
- [ ] Add `FirstAdoptedWorldFrameAck`.
- [ ] Expose bounded receipts through telemetry and `GameHost`.
- [ ] Correlate the acknowledgement with the render frame and map cache.

### Gate 7: executable proof wiring

- [ ] Add `tests/world-generation.mjs` to `npm run check`.
- [ ] Make `headless:world` execute the staged test directly.
- [ ] Add map-open progress fixture.
- [ ] Add completion-frame budget fixture.
- [ ] Add consumer-failure rollback fixture.
- [ ] Add source, dist and Pages visible-adoption parity fixtures.

## Implementation order

```txt
1. attempt and scheduler identities
2. independent work-budget admission
3. detached candidate artifact
4. consumer registry and prepare receipts
5. adoption commit and rollback
6. visible-frame acknowledgement
7. executable source/browser/build/Pages gates
```

## Recommended file cut

```txt
src/world/generation-runtime/
  world-generation-attempt-kit.js
  generation-work-budget-kit.js
  generation-progress-receipt-kit.js
  world-candidate-artifact-kit.js
  staged-world-generation-scheduler-adoption-authority-domain.js

src/visual/world-adoption/
  world-consumer-registry-kit.js
  world-consumer-adoption-plan-kit.js
  terrain-generation-prepare-kit.js
  vegetation-generation-prepare-kit.js
  flora-generation-prepare-kit.js
  map-cache-generation-prepare-kit.js
  world-adoption-result-kit.js
  world-adoption-rollback-kit.js
  first-adopted-world-frame-ack-kit.js

tests/
  world-generation.mjs
  world-generation-adoption.mjs
  world-generation-adoption.browser.mjs
```

## Compatibility constraints

Preserve current sampling signatures, deterministic seed output, gameplay controls, map pause semantics, Air Mail behavior, visual style, domain boundaries and existing fallback terrain. Do not combine the first authority cut with dual-surface map coherence, provider admission or persistence implementation.

## Current documentation state

Repo-local documentation is aligned through the `2026-07-13T13-39-10-04-00` staged world-generation scheduler/adoption audit family.