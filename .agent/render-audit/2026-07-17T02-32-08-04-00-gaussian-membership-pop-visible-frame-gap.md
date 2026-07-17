# Render Audit: Gaussian Membership Pop Visible-Frame Gap

**Timestamp:** `2026-07-17T02-32-08-04-00`

## Summary

The new close-cloud renderer correctly keeps nearby splats when capacity is exceeded and renders the retained set far-to-near. It does not preserve membership continuity between rebatched frames.

## Source-backed path

```txt
camera moves > 8 world units or 0.2 seconds elapse
  -> rebuild all bank candidates
  -> choose LOD from current distance only
  -> sample each tier's full splat count
  -> sort nearest-first
  -> truncate to 7000 / 4400 / 2400 instances
  -> sort retained set far-to-near
  -> overwrite every instance attribute
  -> replace geometry.instanceCount
```

## Visible-frame gap

```txt
previous membership digest: absent
accepted rebatch generation: absent
LOD enter/leave thresholds: identical
per-bank quota: absent
transition age: absent
opacity crossfade: absent
stale rebatch rejection: absent
matching frame acknowledgement: absent
```

A bank crossing `260`, `620`, `1300`, `2500` or `4200` distance can switch its requested splat count immediately. Capacity pressure can also replace distant retained candidates when closer banks enter the query. Because the instance buffers are replaced directly, the renderer has no evidence that a newly presented frame is temporally coherent with its predecessor.

## Required render contract

```txt
CloudLodMembershipResult
  -> stable member ids
  -> source and target tiers
  -> entering, retained and leaving sets
  -> transition progress
  -> capacity and dropped-count settlement

CloudProjectionResult
  -> buffer generation
  -> membership digest
  -> weather revision
  -> camera revision
  -> rendered frame revision
  -> FirstGaussianCloudFrameAck
```

## Fixtures

- Hold camera still across repeated 0.2-second rebatched updates; membership must remain stable.
- Oscillate across every tier boundary; hysteresis must prevent one-frame tier churn.
- Enter and leave capacity pressure; retained nearby banks must not flash.
- Verify entering/leaving splats transition over a bounded duration.
- Verify source, built artifact and Pages produce the same membership digest sequence.

## Boundary

No visible popping was reproduced in a browser during this audit. The risk is inferred from immediate membership and buffer replacement in the current source.