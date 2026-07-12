# Render Audit: Stale Tree Exclusion Visible Flora Gap

**Timestamp:** `2026-07-12T19-31-06-04-00`

## Summary

The render frame can show tree geometry from one ownership generation and grass or flower geometry generated from predecessor tree records. Current visual state exposes chunk and instance counts, not the exclusion artifact that produced those instances.

## Plan ledger

**Goal:** require the first visible frame after vegetation or flora replacement to prove that trees, grass and flowers cite one accepted exclusion revision.

- [x] Trace visual construction and update order.
- [x] Confirm tree, grass and flower provenance is absent from frame state.
- [x] Identify mixed-generation visible failure modes.
- [x] Define the required frame acknowledgement.
- [ ] Add runtime and browser proof.

## Current render order

```txt
terrain.update(camera)
grass.update(elapsed, camera)
flowers.update(elapsed, camera)
composer.update(...)
composer.render(dt)
state.grass = grass.getState()
state.flowers = flowers.getState()
```

## Missing frame evidence

```txt
vegetationGenerationId
vegetationFingerprint
floraExclusionRevision
floraExclusionFingerprint
grassChunkGenerationSet
flowerChunkGenerationSet
pairedAdoptionResultId
firstVisibleFrameId
```

## Visible failure classes

```txt
new tree appears through retained grass or flowers
removed tree leaves a circular empty patch
one flora consumer updates before the other
quality replacement changes tree density but not retained chunk exclusions
counts remain plausible while overlap is visually incorrect
```

## Required acknowledgement

```txt
FloraExclusionVisibleFrameAck {
  frameId
  runtimeSessionId
  worldRevision
  vegetationGenerationId
  floraExclusionRevision
  grassGenerationFingerprint
  flowerGenerationFingerprint
  pairedAdoptionResultId
  presented: true
}
```

## Render invariant

A frame must not be reported as coherent unless visible tree instances and all visible grass/flower chunks cite the same committed vegetation and exclusion generations.

## Non-claim

No current screenshot, draw-call count, chunk count or lack of obvious overlap proves this invariant.