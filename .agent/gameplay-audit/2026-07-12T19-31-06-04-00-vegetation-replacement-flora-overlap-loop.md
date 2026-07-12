# Gameplay Audit: Vegetation Replacement Flora Overlap Loop

**Timestamp:** `2026-07-12T19-31-06-04-00`

## Summary

The current game has static vegetation, but its documented next architecture introduces camera-relative vegetation replacement. Without an exclusion artifact transaction, that replacement can immediately desynchronize gameplay-space trees from visible grass and flowers.

## Plan ledger

**Goal:** define the exact gameplay loop that must remain coherent when tree ownership changes around a moving balloon.

- [x] Trace current tree, grass and flower ownership.
- [x] Project the retained vegetation-streaming plan through current consumer behavior.
- [x] Identify overlap and obsolete-clearing outcomes.
- [x] Define zero-mutation and last-good behavior.
- [ ] Implement and execute traversal fixtures.

## Reachable loop

```txt
balloon moves into a new vegetation coverage region
  -> vegetation successor places new trees
  -> grass and flowers retain construction-time tree indexes
  -> camera crosses a flora chunk boundary
  -> new grass/flower candidates use predecessor exclusions
  -> candidates are inserted directly into live groups
  -> new trees overlap flora or removed trees retain clearings
  -> no gameplay or render result classifies the mismatch
```

## Secondary loop

```txt
quality or world reset changes tree count/positions
  -> coordinate-only flora chunks remain live
  -> no exclusion revision invalidates them
  -> subsequent frames mix new trees and predecessor flora
```

## Required gameplay result

```txt
FloraCoverageTransitionResult:
  Committed
  LastGoodRetained
  Rejected
  Failed
  Stale
```

`Rejected`, `Failed` and `Stale` must preserve the complete predecessor tree/grass/flower set and perform zero partial live mutation.

## Gameplay invariants

```txt
no current tree trunk/canopy clearance is violated by accepted flora
removed-tree clearings can repopulate under the successor artifact
world/quality resets invalidate incompatible flora generations
balloon traversal cannot expose mixed vegetation/flora generations
failure preserves one complete last-good world presentation
```

## Non-claim

The current boot-only tree field hides the replacement edge. It does not prove that the planned streamed vegetation architecture is safe.