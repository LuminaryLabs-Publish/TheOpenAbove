# Terrain System Audit: Gradient, Slope and Normal Continuity Contract

**Timestamp:** `2026-07-11T03-01-38-04-00`

## Surface source

The current terrain source is composed from:

```txt
terrainHeight(x, z)
moistureAt(x, z)
largeField(x, z)
mediumField(x, z)
localField(x, z)
slope supplied by the chunk builder
Frutiger Aero palette
```

Height, moisture and world fields are coordinate-based. Slope is not currently source-owned because its finite-difference radius is selected by the render LOD segment count.

## Required authoritative sample

```txt
TerrainSurfaceSample {
  surfaceRevision,
  x,
  z,
  height,
  moisture,
  slope,
  normal,
  color,
  fingerprint
}
```

The sample must be independent of chunk key, camera distance and render tessellation.

## Slope contract

Choose and version one policy:

```txt
fixed world-space central difference radius
analytic gradient for terrainHeight
multi-scale fixed slope descriptor with a declared blend
```

Do not derive authoritative slope from `chunkSize / segments`.

Required assertions:

```txt
same x/z -> same slope at every LOD
same source revision -> same slope fingerprint
finite and non-negative slope
normal derived from the same gradient policy
```

## Color contract

```txt
color input is authoritative height/moisture/slope plus world fields
RGB output is finite and normalized
palette values are immutable for one surface revision
fixed coordinate vectors produce stable expected colors
render LOD cannot alter color output
```

## Edge continuity contract

For every neighboring chunk pair:

```txt
sample shared boundary coordinates
compare authoritative height
compare authoritative color
compare authoritative normal
record maximum deltas
validate against explicit thresholds
```

Mixed-LOD policy must state how coarse and fine edges meet. Acceptable approaches include shared edge sample caches, skirts as a render-only concealment layer, geomorphing, stitched indices or an invariant normal sampler. The authoritative sample itself must remain identical.

## Chunk commit contract

```txt
build replacement off the committed set
  -> validate source revision
  -> validate geometry counts and finite attributes
  -> validate shared edges
  -> validate material revision
  -> atomically replace old mesh
  -> dispose old geometry
  -> publish commit result
```

Wrong-LOD meshes should not be removed before replacement admission and continuity checks succeed unless the policy explicitly returns a temporary-hole result.

## Work budget contract

```txt
max vertices generated per frame
max chunks committed per frame
max synchronous build duration
prefetch distance
queue priority
cancellation behavior
stale focus behavior
fallback behavior after failure
```

These values must be quality-tier data rather than hidden consequences of segment arrays.

## Observation contract

```txt
surfaceRevision
surfaceFingerprint
focusRevision
activeChunkLods
queuedChunkBuilds
recentBuildResults
recentSeamResults
workBudget
workConsumedThisFrame
```

All observations must be detached, bounded and JSON-safe.

## Fixture matrix

```txt
fixed palette sample coordinates
height extrema and basin samples
wet, dry, lowland, highland and steep samples
same coordinate under every LOD
same-LOD X and Z boundaries
mixed-LOD X and Z boundaries
initial radius build
single-center transition
rapid focus supersession
surface revision change
failed seam validation
```

## Next safe ledge

```txt
TheOpenAbove Terrain Surface Authority
+ LOD Continuity and Chunk-Rebuild Fixture Gate
```