# Deploy Audit: WebGL Context-Loss Browser Fixture Gate

**Timestamp:** `2026-07-16T03-03-22-04-00`

## Summary

Current Node checks validate source and domain contracts but cannot prove WebGL context-loss handling, GPU-resource reconstruction, recovered-frame convergence, or deployed artifact behavior.

## Plan ledger

**Goal:** require executable browser evidence for source, Vite build, downloaded Pages artifact, and deployed Pages route before renderer-recovery support is claimed.

- [x] Inspect package checks and Pages workflow surface.
- [x] Confirm no forced context-loss fixture exists.
- [x] Define the required matrix and receipts.
- [ ] Add local browser fixtures.
- [ ] Run the same fixture against built, artifact, and deployed revisions.

## Required matrix

| Row | Loss point | Expected result |
|---|---|---|
| startup | before first visible frame | recovery or semantic startup fallback |
| steady flight | after first frame | one suspended generation then one recovered frame |
| map open | while simulation is suspended | map and world recover coherently |
| dynamic resolution | during target resize | rebuilt targets match drawing-buffer size |
| cloud pass | while cloud target is active | renderer state restored and cloud resources rebuilt |
| terrain streaming | during chunk adoption | no stale chunk/resource adoption |
| delivery | inside destination volume | no duplicate or hidden delivery settlement |
| repeated loss | during recovery | retry budget enforced; old work rejected |
| timeout | restoration never arrives | actionable fallback |
| retirement | pagehide or route replacement | listeners, RAF, and pending rebuild work settle |

## Required evidence

```txt
RenderLossResult
resource-manifest reconstruction receipts
RenderRecoveryResult or RenderFallbackResult
renderer and context generation identities
verified drawing-buffer and target sizes
no stale-generation callbacks
FirstRecoveredFrameAck
source/build/artifact/Pages revision identity
```

## Existing commands

`npm run check` runs Node smoke and world/terrain contract tests. `npm run build` runs those checks and Vite. Neither creates a browser context, forces context loss, restores it, or inspects a visible recovered frame.

## Claim gate

Do not claim context recovery, resource rehydration, fallback correctness, artifact parity, Pages parity, or production readiness until every applicable row passes on the exact published revision.