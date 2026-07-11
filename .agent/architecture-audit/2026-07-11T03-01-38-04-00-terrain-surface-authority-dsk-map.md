# Architecture Audit: Terrain Surface Authority DSK Map

**Timestamp:** `2026-07-11T03-01-38-04-00`

## Current composition

```txt
open-above-visual-domain
  -> open-above-terrain-surface-kit
     -> terrainHeight
     -> moistureAt
     -> terrainColor
     -> shared MeshStandardMaterial
     -> open-above-terrain-chunk-streaming-kit
        -> camera-centered chunk membership
        -> distance LOD
        -> synchronous geometry build
        -> vertex color buffer
        -> computeVertexNormals
        -> chunk release/disposal
     -> soft cloud-shadow shader adapter
```

## Current authority split

```txt
terrainHeight                    source authority in terrain-surface-kit
moistureAt                       source authority in terrain-surface-kit
palette and world color fields   source authority in terrain-surface-kit
slope radius                     implicit render-LOD authority in chunk streamer
chunk membership                 camera-derived authority in chunk streamer
normal generation                local geometry authority per chunk
cloud shadow                     mutable material shader state
surface observation              absent
surface revision/fingerprint     absent
chunk build admission/result     absent
seam validation                  absent
```

## Architectural defect

The render adapter decides the slope sampling radius through `chunkSize / segments`. That slope is passed back into the nominal source color function and changes soft-rock blending. Render LOD is therefore influencing what should be an LOD-neutral surface field.

```txt
source field
  <- receives slope chosen by render tessellation
  <- output becomes LOD-sensitive
```

The direction should be reversed:

```txt
versioned surface source
  -> authoritative height/moisture/slope/color samples
  -> render adapters consume those samples at any tessellation
```

## Proposed parent domain

```txt
open-above-terrain-surface-authority-domain
```

Owns:

```txt
surface descriptor
surface revision
height source identity
moisture source identity
palette and field identity
LOD-invariant slope policy
surface fingerprint
shared-edge policy
chunk build admission
chunk build results
seam validation results
bounded observations
```

## Proposed DSKs

### `open-above-terrain-surface-descriptor-kit`

Services:

```txt
schema and validation
palette values
field frequencies
blend thresholds and strengths
height/moisture source revisions
material settings
normal policy
build budget policy
```

### `open-above-terrain-palette-kit`

Services:

```txt
immutable normalized palette
color lookup by stable role
finite/range validation
palette fingerprint contribution
```

### `open-above-terrain-color-field-kit`

Services:

```txt
world-coordinate field evaluation
height/moisture/slope blending
renderer-neutral RGB result
fixed coordinate sample rows
surface fingerprint contribution
```

### `open-above-lod-invariant-slope-sampler-kit`

Services:

```txt
fixed world-space finite-difference radius or analytic gradient
stable slope sample by coordinate
slope source revision
LOD-neutral sample result
```

### `open-above-terrain-normal-continuity-kit`

Services:

```txt
normal source policy
shared-edge normal derivation
mixed-LOD edge rule
continuity tolerance and result
```

### `open-above-terrain-chunk-build-budget-kit`

Services:

```txt
build queue
per-frame vertex/work budget
priority and prefetch
cancellation and replacement
build-duration/result rows
```

### `open-above-terrain-surface-revision-kit`

Services:

```txt
surface revision ID
source fingerprint
consumer revision checks
stale chunk rejection
```

### `open-above-terrain-surface-observation-kit`

Services:

```txt
active chunk and LOD rows
surface revision and fingerprint
recent build results
recent seam results
bounded detached JSON snapshot
```

### Fixture kits

```txt
open-above-terrain-seam-fixture-kit
open-above-terrain-chunk-rebuild-fixture-kit
```

Services:

```txt
fixed coordinate sample vectors
same-coordinate cross-LOD equality
shared-edge height/color/normal comparison
initial and transition workload schedules
budget and deterministic fingerprint assertions
```

## Required transaction

```txt
camera focus request
  -> derive desired chunk/LOD set
  -> admit build against surface revision and budget
  -> generate authoritative samples
  -> generate render geometry
  -> validate edge continuity
  -> commit chunk replacement atomically
  -> publish build and seam result
  -> render committed set
```

## Non-goals

```txt
no visual palette retune
no return to random textures
no terrain height redesign
no grass or vegetation rewrite
no simulation or camera change
no renderer replacement
```

## Next safe ledge

```txt
TheOpenAbove Terrain Surface Authority
+ LOD Continuity and Chunk-Rebuild Fixture Gate
```