# Interaction Audit: Terrain Stream Frame Admission Map

**Timestamp:** `2026-07-12T13-29-56-04-00`

## Summary

The terrain system now has a deterministic shared classification frame, but it is consumed as an untyped direct function result. This audit maps the required command/result boundary between camera observation, terrain planning, consumer adoption and rendering.

## Current path

```txt
camera.position
  -> createTerrainStreamingFrame()
  -> immutable object with string revision
  -> near.updateFromFrame(frame)
  -> horizon.updateFromFrame(frame)
  -> activeFrame = frame
  -> render
```

## Missing admission fields

```txt
runtimeSessionId
worldBuildId and world fingerprint
quality/profile revision
terrain algorithm and geometry schema versions
material/program generation
TerrainStreamFrameId
expected active terrain revision
command ID and idempotency key
build budget and cancellation state
```

## Required command

```txt
TerrainStreamFrameCommand {
  commandId
  sessionId
  expectedTerrainRevision
  worldBuildId
  worldFingerprint
  qualityRevision
  cameraPosition
  configFingerprint
}
```

## Required results

```txt
TerrainStreamPlanResult
  Accepted | Reused | Rejected | Stale

TerrainChunkBuildResult
  Built | Reused | Failed | Cancelled

TerrainStreamCommitResult
  Committed | RolledBack | Failed

TerrainVisibleFrameAck
  renderFrameId + terrainFrameId + aggregateFingerprint
```

## Interaction invariants

```txt
same command ID is idempotent
stale session or world revision performs zero mutation
planning performs zero live-scene mutation
failed candidate build performs zero live adoption
near and horizon receipts must reference the same frame ID
commit occurs once and predecessor retirement occurs once
visible-frame acknowledgement follows commit, never planning
```

## Observation surface

```txt
activeTerrainFrameId
worldBuildId
ownershipFingerprint
near/horizon required, built, reused and retired counts
transition duration
commit status
rollback status
last visible render frame ID
bounded recent transition journal
```

## Status

Documentation only. The current source has a shared frozen frame and deterministic string revision, not this admitted command/result surface.