# Gameplay Audit: Camera Chunk Transition Frame-Cost Loop

**Timestamp:** `2026-07-11T03-01-38-04-00`

## Player-facing loop

```txt
balloon drifts through the world
  -> follow camera crosses a rounded 520-meter chunk boundary
  -> terrain streamer changes center
  -> required chunk and LOD membership is recalculated
  -> wrong-LOD and out-of-range geometry is removed
  -> replacement geometry is synchronously generated
  -> flight simulation, camera, weather, terrain, grass, water, postprocess and HUD continue in the same RAF
  -> frame is submitted
```

## Gameplay relevance

Terrain generation is a render system, but its synchronous execution occurs inside the same frame that advances balloon movement and camera presentation. A long chunk-transition frame can therefore affect perceived control continuity, camera smoothness, quality sampling and telemetry even when authoritative flight state is otherwise unchanged.

## Current missing result

A camera boundary crossing has no explicit command or result:

```txt
no TerrainFocusRequest
no ChunkMembershipPlan
no ChunkBuildAdmissionResult
no ChunkBuildResult
no TerrainCommitResult
no frame-cost row
no skipped/deferred/rejected status
```

The only observable effect is that the active chunk map changes and the frame eventually renders.

## Risk scenarios

```txt
first rendered frame builds the entire terrain set synchronously
rapid diagonal camera travel changes two chunk coordinates at once
LOD rings replace multiple chunks during the same transition
quality tier raises near-chunk segment count
terrain color field cost increases without a workload guard
future mission objective contacts share a transition frame
low-frequency devices experience visible camera or input hitching
```

## Required gameplay-safe policy

```txt
flight simulation remains independent of terrain build completion
camera focus emits a stable focus revision
chunk work is queued against that revision
old committed chunks remain until replacements pass preflight
work is bounded per render frame
late work is cancelled or rejected by revision
HUD and GameHost can report loading/deferred terrain without mutating gameplay
```

## Fixture cases

```txt
initial spawn at the origin
single +X center crossing
single +Z center crossing
diagonal +X/+Z crossing
rapid reversal before queued work commits
near-to-middle LOD replacement
middle-to-far LOD replacement
quality low/medium/high workload census
stale focus revision delivery
```

## Next safe ledge

```txt
TheOpenAbove Terrain Surface Authority
+ LOD Continuity and Chunk-Rebuild Fixture Gate
```