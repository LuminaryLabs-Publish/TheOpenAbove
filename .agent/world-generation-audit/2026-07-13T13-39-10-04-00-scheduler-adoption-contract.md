# World Generation Audit: Scheduler and Adoption Contract

## Summary

The core phased generator is deterministic and preserves compatibility, but scheduling and consumer adoption need a separate transaction boundary.

## Plan ledger

**Goal:** define the minimum contract that lets the existing generator scale without changing gameplay, rendering style, world shape or sampling callers.

- [x] Record current phase and lifecycle behavior.
- [x] Define scheduler, candidate and adoption artifacts.
- [x] Define rollback and visible proof.
- [ ] Implement focused authority kits.

## Candidate generation contract

```txt
WorldGenerationAttempt
  attemptId
  generation
  seed
  surfaceDescriptor
  anchorFingerprint
  policyRevision
  predecessorRevision
  status

WorldGenerationFrameCommand
  attemptId
  expectedGeneration
  schedulerGeneration
  workBudget
  cancellationId

GenerationWorkReceipt
  phaseBefore
  phaseAfter
  unitsRequested
  unitsCompleted
  cursorBefore
  cursorAfter
  progressBefore
  progressAfter
  elapsedWorkMs
  status
```

## Candidate artifact

```txt
WorldCandidateArtifact
  candidateRevision
  seed
  gridSize
  gridStep
  heightGrid
  moistureGrid
  temperatureGrid
  fertilityGrid
  flowGrid
  biomeGrid
  biomeCounts
  phaseTimings
  fingerprint
```

The candidate remains detached from public sampling until adoption commits.

## Consumer registry

Mandatory consumers:

```txt
terrain-near
terrain-horizon
vegetation
 grass
flowers
parchment-map-cache
```

Each consumer must return:

```txt
ConsumerPrepareResult
  consumerId
  candidateRevision
  preparedGeneration
  resourceFingerprint
  workReceipts
  status
  failure
```

## Commit rule

```txt
all mandatory prepare results accepted
  -> publish WorldGenerationAdoptionCommit
  -> switch public sampling to candidate
  -> expose prepared consumer resources
  -> retire predecessor resources after visible acknowledgement
```

A consumer failure before commit disposes candidate resources and preserves the predecessor. A failure after commit enters explicit recovery and cannot be represented merely by changing generator status to failed.

## Reset contract

```txt
reset
  -> allocate successor attempt generation
  -> retain active world and visible consumer generations
  -> cancel predecessor pending work
  -> begin candidate generation
  -> adopt only after complete preparation
```

## Disposal contract

```txt
dispose
  -> retire scheduler generation
  -> cancel pending attempt and adoption plan
  -> dispose candidate resources
  -> dispose active resources in dependency order
  -> reject later commands
  -> publish one terminal disposal receipt
```

## Required diagnostics

```txt
attempt and scheduler identities
phase progress and work receipts
candidate fingerprint
consumer preparation status
adoption status and timing
rollback result
active and visible revisions
first visible adopted frame
bounded failure stack and phase
```

## Compatibility

The existing `sampleHeight`, `sampleMoisture`, `sampleTemperature`, `sampleFertility`, `sampleBiome`, `sampleFlora`, `sampleMapColor`, `sampleFeatureCell`, `contains` and descriptor APIs remain unchanged.