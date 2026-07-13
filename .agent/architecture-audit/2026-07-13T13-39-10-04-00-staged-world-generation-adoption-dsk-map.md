# Architecture Audit: Staged World Generation Adoption DSK Map

**Runtime revision:** `a47cb530963e01a07fcc839ca1dcce2f70bd169f`

## Summary

The generator now owns deterministic phased candidate construction, but no domain owns continuous frame-budget admission and atomic adoption by terrain, vegetation, flora and map consumers.

## Plan ledger

**Goal:** separate candidate generation from consumer preparation and final visible adoption while retaining the current sampling API.

- [x] Map current ownership.
- [x] Preserve existing kits and service boundaries.
- [x] Identify missing commands, artifacts, results and acknowledgements.
- [ ] Implement the parent authority and focused sub-kits.

## Current ownership

```txt
open-above-world-generation-kit
  owns seed, grid, phases, pending arrays, active arrays, sampling, progress, reset and disposal

open-above-visual-domain
  owns first-frame gate, per-update advancement and ready listener

open-above-terrain-surface-kit
  observes revision and synchronously refreshes near/horizon streamers

open-above-vegetation-cluster-kit
  synchronously repopulates instances

open-above-grass-field-domain
open-above-flower-field-domain
  clear and rebuild camera-local chunks

open-above-parchment-map-overlay-kit
  lazily rebuilds a 96 x 96 world-color cache
```

## Missing parent domain

```txt
open-above-staged-world-generation-scheduler-adoption-authority-domain
```

## Proposed DSK tree

```txt
staged-world-generation-scheduler-adoption-authority
├─ generation-attempt
│  ├─ WorldGenerationAttemptId
│  ├─ GenerationPolicyRevision
│  └─ GenerationLifecycleResult
├─ frame-budget
│  ├─ WorldGenerationFrameCommand
│  ├─ GenerationWorkBudget
│  ├─ GenerationWorkReceipt
│  └─ GenerationProgressReceipt
├─ candidate
│  ├─ WorldCandidateArtifact
│  ├─ WorldCandidateFingerprint
│  └─ WorldCandidateDiagnostics
├─ consumer-registry
│  ├─ WorldConsumerId
│  ├─ mandatory/optional classification
│  └─ dependency order
├─ preparation
│  ├─ TerrainGenerationPrepare
│  ├─ VegetationGenerationPrepare
│  ├─ FloraGenerationPrepare
│  ├─ MapCacheGenerationPrepare
│  └─ ConsumerPrepareResult
├─ adoption
│  ├─ WorldGenerationAdoptionCommand
│  ├─ WorldGenerationAdoptionPlan
│  ├─ WorldGenerationAdoptionResult
│  └─ WorldGenerationRollbackResult
├─ presentation
│  ├─ AdoptedWorldFrameEnvelope
│  └─ FirstAdoptedWorldFrameAck
└─ proof
   └─ WorldGenerationFixtureGate
```

## Required invariants

```txt
public sample methods do not change
candidate construction never mutates active sampling
map-open does not starve generation scheduling
one frame admits a bounded work receipt
consumer preparation cannot expose the candidate revision
all mandatory consumers prepare before active commit
failed or stale adoption retains predecessor sampling and resources
commit changes sampling and visible consumer generations together
one visible-frame acknowledgement cites the adopted revision
reset and disposal retire stale attempts and callbacks
```

## Existing kit service expansion

`open-above-world-generation-kit` now offers:

```txt
startGeneration
advanceGeneration
completeGenerationSync
getGenerationState
getGenerationDiagnostics
subscribeGeneration
reset
dispose
sampleHeight
sampleMoisture
sampleTemperature
sampleFertility
sampleBiome
sampleFlora
sampleMapColor
sampleFeatureCell
contains
getDescriptor
```

`world-generation-phases.js` and `world-generation-support.js` are implementation modules of this kit, not separate public kits.

## Compatibility boundary

Do not change seed output, controls, flight physics, visual style, public sampling signatures, map behavior or world membership policy during the first authority cut.