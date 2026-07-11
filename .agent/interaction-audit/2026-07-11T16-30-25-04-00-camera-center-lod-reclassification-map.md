# Interaction Audit: Camera Center to Terrain LOD Reclassification

**Timestamp:** `2026-07-11T16-30-25-04-00`

## Goal

Map how player flight and camera movement change terrain-center identity, required chunk membership and intended LOD, and identify where the current horizon path loses that intent.

## Interaction chain

```txt
burner / vent input
  -> balloon simulation position
  -> camera rig follows balloon
  -> visual.update receives current camera
  -> near terrain center = round(camera / 520)
  -> horizon terrain center = round(camera / 1040)
  -> streamers rebuild when their center changes
  -> scene renders current chunk maps
```

## Near path

```txt
camera center changes
  -> required map includes { cx, cz, lod }
  -> existing mesh metadata includes { x, z, lod }
  -> mismatched LOD causes removal and rebuild
```

## Horizon path

```txt
camera center changes
  -> required set includes key only
  -> existing mesh metadata includes { x, z }
  -> retained key is treated as complete
  -> current distance policy is not compared with actual geometry
```

## Concrete transition

```txt
chunk: 5:0
created from center 0:0 at 5200 m -> 4 segments
camera moves to center 2:0
current distance becomes 3120 m -> policy requires 10 segments
key remains inside required annulus
retained mesh bypasses createChunk
actual geometry remains 4 segments
```

## Missing interaction result

Camera-driven streaming currently returns no result. Callers cannot distinguish:

```txt
center unchanged
center changed with no membership changes
new chunks built
chunks released
LOD replacements required
LOD replacements deferred
build budget exhausted
build failed
edge validation failed
replacement committed
```

## Required command boundary

```txt
TerrainViewCommand {
  runtimeSessionId
  missionEpoch
  cameraFrameId
  cameraPosition
  qualityRevision
  terrainRevision
  expectedClassificationRevision
}
```

## Required result boundary

```txt
TerrainViewResult {
  accepted
  reason
  classificationRevision
  centerIdentities
  intendedChunkMapFingerprint
  transitionPlanId
  admittedBuildCount
  deferredBuildCount
  committedReplacementCount
  activeTerrainFingerprint
}
```

## Required admission rules

```txt
reject stale session or mission epoch
reject non-finite camera positions
reject unknown quality or terrain revisions
classify every retained key, not only new keys
preserve complete geometry until admitted replacement succeeds
publish deterministic intended and actual chunk observations
```

## Fixture cases

```txt
cross one near-center boundary
cross one coarse horizon-center boundary
move a retained chunk across 4 -> 6 -> 10 segment bands
reverse direction across 10 -> 6 -> 4 bands
teleport across multiple centers
repeat the same camera path and compare fingerprints
arrive at the same camera pose through two different paths
```

No runtime interaction behavior changed.