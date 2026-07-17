# Known Gaps: TheOpenAbove Balloon Rigging Frame Budget and Resource Retirement

**Last aligned:** `2026-07-17T10-41-44-04-00`  
**Status:** `balloon-rigging-frame-budget-resource-retirement-authority-audited`

## Summary

The rope meshes reuse persistent typed GPU buffers, but the CPU update path and resource lifetime remain implicit. No source-backed claim is made that long-flight allocation plateaus or that replacement/disposal retires every predecessor resource.

## Intent

Keep rigging performance and lifecycle claims provisional until one authority owns scratch memory, dynamic buffers, replacement, disposal, diagnostics, and the matching frame.

## What needs to happen

### Allocation and update gaps

```txt
persistent typed position/normal buffers: present
in-place BufferAttribute writes: present
bounded default topology: present
fresh endpoint vectors per rope/frame: present
fresh point array and point vectors: present
fresh tangent/frame/binormal vectors: present
fresh ring normal/position vectors: present
reusable scratch pool: absent
allocation counter/budget: absent
update duration result: absent
```

### Identity and ownership gaps

```txt
BalloonModelGeneration: absent
RiggingGeneration: absent
RopeGeneration: absent
resource manifest: absent
buffer ownership result: absent
scratch ownership result: absent
stale update rejection: absent
```

### Replacement and retirement gaps

```txt
old vehicle children detached: present
explicit predecessor update stop: absent
owned geometry disposal result: absent
owned material disposal result: absent
idempotent retirement result: absent
resource-reference clearing: absent
post-retirement write proof: absent
```

### Render and diagnostics gaps

```txt
rigging generation in diagnostics: absent
rope buffer revisions: absent
updated vertex count: absent
budget/degradation state: absent
RiggingFrameDigest: absent
FirstRiggingBoundFrameAck: absent
```

### Proof gaps

```txt
long-flight allocation plateau: absent
stable typed-array identity fixture: absent
replacement resource retirement fixture: absent
double-retirement fixture: absent
stale update rejection fixture: absent
source/build/Pages parity: absent
```

## Current risk boundary

Source inspection proves that dynamic buffers are reused and temporary CPU objects are constructed during every rope update. It also proves that the balloon, rigging, and rope kits expose no explicit disposal service. It does not prove the severity or frequency of a browser-visible hitch or leak.

## Retained product gaps

Camera pointer admission, Gaussian cloud membership, camera zoom ownership, rendered-photo artifacts, validation severity, weather-clock ownership, page lifecycle, WebGL recovery, audio, control coverage, fixed-step pacing, HDR/depth coherence, provider identity, route retirement, terrain/flora proof, and persistence remain unresolved.

## Do not claim

Do not claim bounded rigging allocation, leak-free replacement, exact resource retirement, stable long-flight performance, exact rigging/frame convergence, artifact parity, Pages parity, or production readiness until implementation and fixtures exist.