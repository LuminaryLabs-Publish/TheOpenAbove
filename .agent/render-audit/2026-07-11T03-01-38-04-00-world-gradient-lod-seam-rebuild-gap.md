# Render Audit: World Gradient LOD Seam and Rebuild Gap

**Timestamp:** `2026-07-11T03-01-38-04-00`

## Positive change

The terrain material now uses only vertex colors plus the existing cloud-shadow shader. Random repeated color and normal textures were removed, which eliminates the obvious tiled noise pattern and makes broad terrain color follow world coordinates.

## Render path

```txt
camera position
  -> rounded terrain center
  -> required chunk/LOD map
  -> remove missing or wrong-LOD meshes
  -> synchronously build replacement geometry
  -> write height and RGB per vertex
  -> compute normals and bounding sphere
  -> add mesh with shared material
  -> update cloud-shadow uniforms
  -> render through HDR composer
```

## LOD color gap

`buildGeometry()` calculates:

```txt
sampleStep = chunkSize / segments
slope = finite difference using sampleStep
color = terrainColor(worldX, worldZ, height, slope)
```

The near, middle and far LODs therefore do not query the same slope field. Height, moisture and world-wave inputs are coordinate-stable, but the soft-rock blend can vary when a chunk changes LOD.

## Normal gap

Every chunk calls `computeVertexNormals()` independently after tessellation. There is no shared-edge normal cache, fixed normal-source sampler or mixed-LOD stitching policy.

Consequences that are not currently fixture-proven:

```txt
lighting seam at equal-LOD chunk edges
lighting seam at mixed-LOD edges
normal change when the same chunk swaps LOD
visible pop when normalMap removal exposes only geometric normals
T-junction or edge silhouette differences across mixed tessellation
```

## Synchronous rebuild gap

At quality `high`, the radius-three initial membership can include 37 chunks and 60,597 vertices. The empty-set build performs at least 302,985 height-field evaluations before color-field trigonometry, color allocation, lerps, normal computation and bounds.

The route has no:

```txt
terrain build queue
per-frame vertex budget
prewarm schedule
worker geometry path
build cancellation token
build duration result
late-chunk admission policy
atomic old/new chunk swap after seam validation
```

## Material and lifecycle gap

The terrain streamer disposes chunk geometries but does not dispose the shared terrain material. The visual-domain disposer calls `terrain.dispose()`, which currently resolves to streamer disposal only. The cloud-shadow helper retains its shader reference without an explicit terminal clear operation.

This remains subordinate to the broader runtime lifecycle gate but should be included in the terrain ownership contract.

## Required render observations

```txt
surfaceRevision
surfaceFingerprint
activeChunkCount
activeLodCounts
chunkBuildId
chunkKey
requestedLod
vertexCount
buildDurationMs
buildStatus
seamValidationStatus
maxHeightDelta
maxColorDelta
maxNormalAngleDelta
committedRenderFrameId
```

## Required fixture thresholds

Thresholds should be explicit rather than assumed:

```txt
shared coordinate height delta
shared coordinate RGB delta
shared edge normal angle delta
mixed-LOD silhouette tolerance
initial build work budget
single-center-transition work budget
maximum committed chunks per render frame
```

## Next safe ledge

```txt
TheOpenAbove Terrain Surface Authority
+ LOD Continuity and Chunk-Rebuild Fixture Gate
```