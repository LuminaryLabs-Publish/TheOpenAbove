# Gameplay Audit: Balloon Traversal and Grass Visibility Loop

**Timestamp:** `2026-07-11T18-01-38-04-00`

## Summary

The Air Mail loop encourages sustained travel away from the starting area. Terrain and grass membership follow the camera, but grass visibility remains anchored to the camera's distance from the original world origin. A valid long-distance flight can therefore transition from populated terrain to terrain with no visible grass even though grass chunks continue to rebuild around the player.

## Player-facing loop

```txt
use burner and vent
  -> enter a visible airstream
  -> drift toward Brookhaven
  -> camera follows balloon
  -> terrain and grass centers advance
  -> grass candidates are regenerated around camera
  -> manual culling evaluates camera-to-origin distance
  -> after threshold, all grass meshes become invisible
```

## Why this affects gameplay readability

Grass contributes to:

```txt
ground scale and altitude perception
wind-direction readability
terrain speed and movement parallax
landing-height interpretation
regional density and route legibility
visual continuity between start and destination
```

The disappearance is not a content or biome decision. It is a spatial-culling result unrelated to the current chunk positions.

## State contradiction

```txt
grass domain state:
  active chunks > 0
  accepted instances > 0
  camera-centered rebuild succeeded

render state:
  every mesh.visible = false

public observation:
  chunks and instances are reported
  visible chunks and instances are not reported
```

A diagnostic caller can therefore conclude that grass is active while the player sees none.

## Current admission gap

There is no gameplay or presentation result that states:

```txt
grass neighborhood ready
center chunk visible
required visual ground cues committed
first frame containing the new grass neighborhood submitted
```

The flight loop continues regardless of whether the destination-facing terrain presentation is coherent.

## Required gameplay-facing result

```txt
GrassNeighborhoodResult
  cameraCenterRevision
  centerChunkId
  requiredChunkCount
  visibleChunkCount
  visibleInstanceCount
  centerChunkVisible
  backendId
  visibleSetRevision
  firstVisibleFrameId
  status: ready | degraded | failed
```

## Required traversal cases

```txt
start neighborhood
  grass visible and correlated to frame

cross first 520 m center boundary
  old/new chunk membership changes without field disappearance

cross 2184 m origin radius
  center neighborhood remains visible

continue outward and return
  same camera-center coordinate produces same required and visible fingerprint

quality change during travel
  LOD and visible set change under one committed revision
```

## Dependency boundary

This audit does not require grass visibility to block simulation. It requires the product to report degraded presentation truthfully and prevents the renderer from hiding all camera-centered grass because of an unrelated global-origin measurement.

## Scope

Documentation only. No gameplay, input, simulation or render behavior changed.
