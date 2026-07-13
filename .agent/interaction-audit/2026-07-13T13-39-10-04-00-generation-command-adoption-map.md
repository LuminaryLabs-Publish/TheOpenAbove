# Interaction Audit: Generation Command and Adoption Map

## Summary

The current API exposes direct lifecycle methods and callbacks, but no command identity, expected revision, cancellation generation or terminal consumer-adoption result.

## Plan ledger

**Goal:** admit generation and adoption through typed commands that reject stale work and leave predecessor state untouched on non-accepted results.

- [x] Map current calls and callbacks.
- [x] Identify missing identity and revision fields.
- [x] Define terminal results and zero-mutation rejection rules.
- [ ] Implement pure-domain command handling.

## Current interaction map

```txt
createVisualDomain
  -> createWorldGenerationKit(autoStart)

visual.update
  -> world.advanceGeneration()
  -> receive state snapshot

world ready
  -> listener callback
  -> direct refresh calls

reset caller
  -> world.reset(options)

dispose caller
  -> world.dispose()
```

## Missing command fields

```txt
GenerationAttemptId
GenerationAttemptGeneration
GenerationPolicyRevision
ExpectedActiveWorldRevision
SchedulerGeneration
WorkBudgetRevision
AdoptionPlanId
ExpectedConsumerRegistryRevision
CancellationId
IdempotencyKey
```

## Required terminal results

```txt
Accepted
Working
ReadyForAdoption
Adopted
Failed
Cancelled
Stale
Duplicate
Superseded
Disposed
Invalid
```

## Zero-mutation rules

`Stale`, `Duplicate`, `Superseded`, `Disposed` and `Invalid` must:

```txt
allocate no new workset
advance no phase cursor
replace no active arrays
clear no render resources
change no map cache
publish no ready event
```

## Adoption order

```txt
candidate complete
  -> create adoption plan
  -> prepare terrain and horizon
  -> prepare vegetation
  -> prepare grass and flowers against prepared vegetation
  -> prepare map cache
  -> verify all mandatory receipts
  -> commit active sampling and consumer generations
  -> render and acknowledge
```

## Cancellation

Reset, disposal, host retirement and superseding regeneration must invalidate pending frame commands and adoption callbacks by generation. Late callbacks must return `Stale` without touching current resources.