# Render Audit: Single Runtime Layer Versus Multi-Layer Reference

## Summary

The reference shows persistent fog and clouds across four altitude regimes. The renderer currently raymarches one cloud slab from 360 to 960 world units and applies one global exponential-fog field; no frame result proves the reference target is represented.

## Plan ledger

**Goal:** define the render evidence needed to compare the new reference with actual frames without claiming a visual defect from source inspection alone.

- [x] Inspect cloud uniforms, geometry, low-resolution target and composite.
- [x] Inspect aerial fog ownership.
- [x] Compare implemented altitude structure with the reference.
- [x] Separate traceability gaps from unproven browser rendering defects.
- [ ] Capture deterministic altitude-sweep frames and GPU timings.

## Current render path

```txt
weather update
  -> coverage / density / wind offset
  -> one raymarched spherical cloud shell
       uCloudBase = 360
       uCloudTop = 960
       low-resolution scale = 0.50 / 0.42 / 0.32
  -> embedded full-screen cloud composite
  -> main scene and HDR composer
  -> global FogExp2 aerial perspective
```

## Reference target

```txt
ground fog
low/mid cumulus
high cloud
cirrus
sparse density floor for every layer
terrain-aware fog
wind-driven motion
layers never fully disappear
```

## Evidence gap

```txt
layer-specific render descriptors: absent
layer-specific cloud bases/tops: absent
ground-fog volume: absent
high-cloud/cirrus renderer: absent
minimum sparse coverage policy: absent
terrain/moisture sampling in cloud shader: absent
layer visibility readback: absent
reference revision in frame snapshot: absent
altitude-sweep screenshots: absent
GPU timing per layer: absent
FirstReferenceBoundAtmosphereFrameAck: absent
```

The existing composite is depth-tested, but no browser frame was captured during this audit. This document does not assert that clouds currently disappear, composite incorrectly, or fail on a target GPU. It records that the new visual target cannot be proven or measured from the current frame state.

## Required frame descriptor

```txt
AtmosphereFrameDescriptor
  referenceRevision
  manifestRevision
  weatherRevision
  worldRevision
  cameraAltitude
  activeLayers[]
    id
    base
    top
    coverage
    densityFloor
    renderScale
    sampleBudget
  terrainResponseRevision
  compositeRevision
  gpuTiming
```

## Required proof rows

- Ground clearance, 25 m, 100 m, 360 m, 660 m, 960 m, 1500 m and 3000 m camera altitudes.
- Clear, ordinary and dense weather profiles.
- Valley, water-adjacent, ridge and open-sky positions.
- Low, medium and high quality tiers.
- Source, built artifact and deployed Pages frames.
- Stable frame identity and first matching-frame acknowledgement.

## Validation boundary

Documentation only. No render target, shader, fog, composite, quality or HDR behavior changed.