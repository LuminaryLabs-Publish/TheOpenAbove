# Architecture Audit: Grass Spatial Culling Authority DSK Map

**Timestamp:** `2026-07-11T18-01-38-04-00`

## Summary

The active grass stack has deterministic placement and camera-centered membership, but it lacks authoritative chunk spatial identity. Mesh transforms stay at the global origin while instance matrices store absolute world positions, so manual culling cannot distinguish one grass chunk from another.

## Current composition

```txt
open-above-visual-domain
  -> open-above-grass-field-domain
       -> open-above-grass-chunk-placement-kit
            -> open-above-grass-world-seed-kit
            -> open-above-grass-biome-density-kit
            -> open-above-grass-exclusion-mask-kit
       -> open-above-grass-lod-kit
       -> open-above-grass-compute-culling-kit
       -> Three.InstancedMesh
```

## Current data flow

```txt
camera position
  -> rounded 520 m chunk coordinate
  -> required chunk set and LOD profile
  -> deterministic absolute world-space candidates
  -> absolute instance matrices
  -> mesh object remains at origin
  -> manual cull uses camera-to-mesh-origin distance
  -> one shared Boolean decision for every active chunk
```

## Missing authority

```txt
GrassChunkId
GrassChunkCenter
GrassChunkBounds
GrassChunkRevision
GrassLodRevision
GrassCameraCenterRevision
GrassCullPolicyRevision
GrassCullBackendId
GrassCullExecutionId
GrassCullDecisionId
GrassVisibleSetRevision
GrassRenderFrameAcknowledgement
```

## Required parent domain

```txt
open-above-grass-spatial-culling-authority-domain
```

The parent domain owns classification and commit order. The renderer consumes an immutable visible-set plan instead of deriving visibility from mutable scene-object transforms.

## Required child kits

### Identity and space

```txt
open-above-grass-chunk-identity-kit
  services:
    stable chunk ID from world seed, chunk X and chunk Z
    chunk revision
    equality and fingerprinting

open-above-grass-chunk-world-bounds-kit
  services:
    center from chunk coordinate and chunk size
    horizontal bounds
    vertical bounds from accepted candidates or terrain envelope
    point/bounds distance
    frustum and range query inputs

open-above-grass-camera-center-revision-kit
  services:
    camera chunk coordinate
    accepted center revision
    previous/current center comparison
    traversal journal row
```

### Classification and policy

```txt
open-above-grass-lod-classification-kit
  services:
    pure LOD profile classification
    quality revision input
    intended count, planes and wind profile
    classification fingerprint

open-above-grass-cull-policy-kit
  services:
    maximum range by quality and LOD
    bounds-distance mode
    hysteresis policy
    offscreen policy
    policy revision

open-above-grass-cull-distance-kit
  services:
    camera-to-bounds nearest distance
    camera-to-center diagnostic distance
    altitude handling
    deterministic scalar result
```

### Backend truth and execution

```txt
open-above-grass-backend-capability-kit
  services:
    CPU capability
    WebGPU adapter/device/pipeline capability
    explicit unsupported reasons

open-above-grass-backend-selection-kit
  services:
    choose CPU chunk, CPU instance or WebGPU instance culling
    return selected backend and reason
    prohibit capability-only backend claims

open-above-grass-culling-execution-kit
  services:
    execute selected path
    return actual dispatch count
    return input/output counts
    report duration and failure

open-above-grass-cull-decision-kit
  services:
    typed visible, culled, deferred or failed result
    chunk, camera, LOD, policy and backend revisions
    distance and bounds evidence
```

### Commit and observation

```txt
open-above-grass-visible-set-commit-kit
  services:
    validate decision set completeness
    reject stale camera/quality/policy results
    atomically commit visibility
    return visible-set revision

open-above-grass-stale-decision-rejection-kit
  services:
    reject predecessor camera-center results
    reject old quality and LOD revisions
    reject wrong runtime or frame epoch

open-above-grass-cull-observation-kit
  services:
    active chunk identities and bounds
    intended LOD and actual instance count
    cull result and reason
    backend and actual work evidence
    visible-set fingerprint

open-above-grass-frame-acknowledgement-kit
  services:
    correlate committed visible set to submitted frame
    record visible and rendered grass counts
    reject partial or cross-frame acknowledgements

open-above-grass-culling-journal-kit
  services:
    bounded center, classification, decision and commit rows
    first divergence lookup
    traversal replay evidence

open-above-grass-traversal-fixture-kit
  services:
    origin crossing
    long-distance camera-centered retention
    CPU/WebGPU backend truth
    visible-frame and Pages parity proof
```

## Intended transaction

```txt
camera frame + quality revision + runtime epoch
  -> accept camera-center revision
  -> enumerate required grass chunks
  -> classify intended LOD for every required chunk
  -> compute committed chunk bounds
  -> select an actually available culling backend
  -> execute culling against chunk bounds
  -> reject stale or incomplete decisions
  -> atomically commit visible set
  -> submit render frame
  -> acknowledge visible-set revision and rendered counts
  -> publish detached observation and bounded journal row
```

## Invariants

```txt
chunk visibility never depends on the transform of an unrelated root object
camera-centered chunks remain eligible after crossing the global-origin radius
all active chunks do not share one distance unless their bounds are actually identical
backend label equals executed backend
GPU dispatch count is zero when no GPU dispatch occurred
visible-set commit uses one camera, quality, LOD and policy revision
render observation identifies the committed visible set actually submitted
```

## Dependency order

```txt
runtime session and frame identity
  -> camera-center revision
  -> chunk identity and bounds
  -> LOD and cull policy revisions
  -> backend capability and selection
  -> execution and typed decisions
  -> stale-result rejection
  -> atomic visible-set commit
  -> frame acknowledgement
  -> traversal and Pages fixtures
```

## Scope boundary

This is a documentation-only architecture pass. It does not implement the authority domain, change grass rendering or claim browser/WebGPU proof.
