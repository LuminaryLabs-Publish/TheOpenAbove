# Render Audit: Generated World Visible Adoption Gap

## Summary

The core world arrays switch revision before render consumers publish any common adoption result. The normal success path rebuilds terrain and local flora before the next render, but this is synchronous, unbudgeted and not failure-atomic.

## Plan ledger

**Goal:** make the first rendered successor world cite one committed sampling revision and matching terrain, vegetation, grass, flower and map-cache generations.

- [x] Trace core active revision swap.
- [x] Trace terrain, vegetation, grass, flower and map refresh paths.
- [x] Identify visible revision and failure gaps.
- [ ] Add staged consumer preparation and first-visible-frame proof.

## Current render adoption path

```txt
completeAtomicSwap()
  -> active arrays become successor revision
  -> ready listeners run
  -> vegetation repopulates
  -> grass and flowers clear chunks
  -> terrain.update detects revision and clears/rebuilds near and horizon geometry
  -> grass.update and flower.update rebuild local chunks
  -> WebGL render submits

map cache
  -> remains predecessor cache until the next map draw
  -> draw detects revision
  -> synchronously samples 96 x 96 colors
  -> replaces cache
```

## Missing evidence

```txt
WorldCandidateRevision
TerrainPreparedRevision
HorizonPreparedRevision
VegetationPreparedRevision
GrassPreparedRevision
FlowerPreparedRevision
MapCachePreparedRevision
WorldAdoptionCommitId
WorldAdoptionResult
WorldPresentationFingerprint
FirstAdoptedWorldFrameAck
```

## Failure exposure

The core sets `active`, drops `pending`, marks ready and then calls listeners. If a listener throws, `advanceGeneration()` marks generation failed after the successor sampling revision is already active. No rollback restores the predecessor arrays or any consumers already cleared or refreshed.

## Frame-time exposure

The completion update can synchronously perform:

```txt
tree instance repopulation
near terrain geometry rebuild
horizon terrain geometry rebuild
grass chunk candidate generation and instancing
flower chunk candidate generation and instancing
map cache rebuild when open
```

None of this work is accounted against the generator work budget.

## Required render contract

```txt
prepare successor consumer resources off-screen
  -> return per-consumer receipts
  -> validate common candidate revision
  -> commit visibility under one adoption ID
  -> render one successor frame
  -> publish visible fingerprint and acknowledgement

on failure
  -> retain predecessor sampling and render resources
  -> dispose incomplete successor resources
  -> publish terminal failed adoption result
```

## Non-claim

The current source strongly supports normal-path same-callback rebuilding, but it does not prove bounded completion-frame cost, rollback after consumer failure or visible parity across WebGL and the parchment map.