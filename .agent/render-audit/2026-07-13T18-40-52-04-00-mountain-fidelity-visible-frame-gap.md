# Render Audit: Mountain Fidelity and Visible-Frame Gap

**Timestamp:** `2026-07-13T18-40-52-04-00`

## Summary

The mountain reaches rendering through the generic terrain height sampler. This can produce the shape, but the declared near/middle/far fidelity and material zones do not control distinct render artifacts, and no frame receipt proves that terrain, horizon, flora, map, and collision adopted the same foundation revision.

## Plan ledger

**Goal:** make the semantic mountain visibly and measurably complete across render ranges without changing its authored shape.

- [x] Trace elevation into terrain and map.
- [x] Trace the ready notification and consumer refresh.
- [x] Compare declared fidelity with active render paths.
- [x] Identify missing material and visible-frame evidence.
- [ ] Add typed render preparation and acknowledgement.

## Declared fidelity

```txt
near: feature-mesh
middle: foundation-field
far: silhouette
collision: foundation
```

## Active presentation

```txt
near terrain: generic streamed heightfield
horizon terrain: generic streamed heightfield
far landmark/silhouette: no mountain-specific consumer
surface material: existing terrain material
map: manual elevation-based rock tint
collision: terrainHeight function
```

## Visible transition

```txt
first frame
  -> base generator working
  -> mountain elevation suppressed

base ready
  -> mountain elevation becomes sampleable
  -> vegetation/grass/flowers refresh
  -> terrain detects base revision
  -> terrain/horizon rebuild
  -> map refreshes on a separate draw
```

Missing:

```txt
FeatureRenderPlanId
FoundationArtifactId
terrain-near preparation result
terrain-horizon preparation result
material-zone result
silhouette result
flora result
map result
collision result
common commit ID
first visible mountain frame acknowledgement
```

## Required proof

A browser fixture should place the camera at near, middle, and far observation ranges and correlate:

```txt
foundation cell revision
mountain contribution fingerprint
near/horizon geometry fingerprints
material-zone selection
map cache revision
collision sample revision
submitted WebGL frame
visible canvas readback
```

The current stub test proves no GPU, material, horizon, silhouette, or visible behavior.
