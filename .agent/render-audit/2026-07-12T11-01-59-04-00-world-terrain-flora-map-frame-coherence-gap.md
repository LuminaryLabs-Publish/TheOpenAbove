# Render Audit: World, Terrain, Flora and Map Frame Coherence Gap

**Timestamp:** `2026-07-12T11-01-59-04-00`

## Summary

The rendered terrain, grass, flowers and parchment background originate from the same world utility but do not acknowledge one committed world build. They can also apply different boundary and cache policies.

## Current render path

```txt
world generator
  -> terrain height/color queries
  -> vegetation and landmark placement
  -> grass chunk candidate queries
  -> flower chunk candidate queries
  -> parchment map color raster

frame
  -> terrain and horizon streamers update
  -> grass and flower windows rebuild around camera
  -> HDR composer renders scene
  -> snapshot exposes chunk counts and world descriptor
```

## Coherence gaps

```txt
terrain applies worldSurface.edgeMask
world sampleGrid clamps outside coordinates to border
featureCellAt continues by unbounded cell identity
grass/flowers do not receive worldSurface membership
map background is cached once during construction
terrain/flora chunks are generated later during camera travel
no shared world revision is attached to meshes, atlas state or map pixels
no render-frame receipt names the world artifact used
```

A coordinate near or outside the disk edge can therefore be treated as edge-floor terrain while flora queries still use clamped climate and a generated feature cell. The visual result may contain terrain, grass, flowers and map color that agree only accidentally.

## Missing render evidence

```txt
worldBuildId
worldGenerationRevision
worldArtifactFingerprint
consumerRevision on terrain chunks
consumerRevision on grass chunks
consumerRevision on flower chunks
mapBackgroundRevision
terrain/flora/map parity result
first coherent frame acknowledgement
stale chunk rejection after world replacement
```

## Required proof

```txt
same world artifact
  -> terrain height/color fingerprint
  -> grass/flower membership fingerprint
  -> map background fingerprint
  -> visible frame receipt

outside-world sample
  -> one declared membership result
  -> no contradictory terrain/flora projection

world replacement
  -> predecessor chunks and map texture retired
  -> stale consumer results rejected
  -> first replacement frame acknowledges new revision
```

## Validation gap

Current Node tests validate deterministic values, species coverage and protected anchor terrain. They do not construct the browser renderer, inspect disk-edge pixels, compare terrain and flora membership, validate map/scene color parity or capture a world-revision frame receipt.