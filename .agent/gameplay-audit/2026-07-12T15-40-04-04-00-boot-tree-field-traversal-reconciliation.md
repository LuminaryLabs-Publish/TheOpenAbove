# Gameplay Audit: Boot Tree Field Traversal Reconciliation

**Timestamp:** `2026-07-12T15-40-04-04-00`

## Summary

Balloon movement can continue horizontally through the wider procedural world. Terrain, grass and flowers track the moving camera, while tree positions remain the boot-created central cluster field. Gameplay exposes no coverage state explaining whether the current biome is intentionally treeless, deferred, failed or simply outside the boot artifact.

## Plan ledger

**Goal:** make long-distance flight consume an explicit vegetation-coverage result instead of silently outrunning boot-time tree placement.

- [x] Trace horizontal flight integration.
- [x] Trace camera-relative world consumers.
- [x] Trace boot-only vegetation placement.
- [x] Identify the unreported traversal state.
- [ ] Add world-bound coverage admission and gameplay-visible diagnostics.

## Current loop

```txt
balloon integrates x/z position
  -> camera follows balloon
  -> terrain requirements move
  -> grass and flower requirements move
  -> tree instance matrices do not move or rebuild
  -> frame renders without vegetation coverage result
```

## Gameplay states currently conflated

```txt
biome policy intentionally allows no trees
required vegetation work is deferred by budget
candidate generation failed
camera is outside the boot tree cluster field
vegetation data is stale for the current world/camera generation
```

## Required gameplay projection

```txt
VegetationCoverageState {
  vegetationFrameId
  cameraCell
  requiredCells
  coveredCells
  treelessCells
  deferredCells
  failedCells
  worldEdgeCells
  nearestCoverageBoundary
  result
}
```

## Invariants

```txt
flight into an admitted cell yields covered, treeless, deferred or failed evidence
stale world/camera results cannot project
map-open pause does not mutate candidate identity
reset/restart retires predecessor coverage state
visible frame and gameplay coverage state cite one vegetation frame
```

Documentation only. Gameplay behavior was not changed.