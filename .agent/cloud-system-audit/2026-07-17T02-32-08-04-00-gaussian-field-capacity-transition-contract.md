# Cloud System Audit: Gaussian Field Capacity Transition Contract

**Timestamp:** `2026-07-17T02-32-08-04-00`

## Contract objective

Make deterministic field generation and nearest-first capacity selection persist across frames as one stable, inspectable cloud projection generation.

## Field contract

`CloudFieldRevision` must bind:

- world-surface center and radius;
- weather-layer ids, kinds, altitude bands and profiles;
- field seed;
- supported-kind policy;
- LOD tier descriptors;
- bank-count policy.

`CloudFieldDigest` must change whenever any of those inputs change.

## Budget contract

For each rebatch, resolve:

- accepted camera and weather revisions;
- total quality capacity;
- per-bank minimum and maximum quota;
- tier-requested splat count;
- nearest-first overflow order;
- dropped candidates and reason;
- accepted member ids.

Nearby priority remains required, but a newly close bank must not evict an unbounded number of prior members in one frame.

## Transition contract

- Use distinct enter and leave thresholds around each LOD distance.
- Retain predecessor membership during small camera movement.
- Crossfade entering and leaving members over a bounded simulation-time duration.
- Settle tier changes as source/target membership, not an immediate buffer replacement.
- Preserve far-to-near ordering within the accepted blended set.
- Reset safely on teleport, context recovery, field revision change or explicit route restart.

## Projection contract

`CloudProjectionResult` must include:

```txt
fieldRevision
weatherRevision
cameraRevision
rebatchGeneration
bufferGeneration
membershipDigest
capacity
visibleBankCount
retainedCount
enteringCount
leavingCount
droppedCount
tierCounts
```

The visual adapter may mutate Three.js buffers only from this result. The presented frame must acknowledge the same membership and buffer generation.

## Diagnostics

Retain the existing capacity, visible-bank, splat, dropped and tier-count values. Add rebatch reason, predecessor/current digest, transition counts and last acknowledged frame revision.

## Non-goals

- Do not merge Gaussian and volumetric renderers.
- Do not move Three.js into semantic Sky ownership.
- Do not change balloon physics or weather truth.
- Do not replace the current deterministic bank/splat algorithms without evidence.