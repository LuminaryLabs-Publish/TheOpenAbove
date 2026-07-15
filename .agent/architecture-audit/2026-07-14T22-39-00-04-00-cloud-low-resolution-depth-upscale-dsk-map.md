# Architecture Audit: Cloud Low-Resolution and Depth-Upscale DSK Map

**Timestamp:** `2026-07-14T22-39-00-04-00`  
**Status:** `cloud-low-resolution-depth-upscale-authority-audited`

## Plan ledger

**Goal:** place cloud performance ownership in one renderer-neutral authority while preserving existing weather, shader, scene and quality kits.

- [x] Map current producers and consumers.
- [x] Preserve existing kit boundaries.
- [x] Identify the unused descriptor field.
- [x] Define the smallest parent domain and subkits.
- [ ] Implement the domain and executable fixtures.

## Current ownership

```txt
quality-tier-kit
  -> quality id, cloud step counts, whole-scene dynamic scale

cloud-lod-kit
  -> cloud renderScale, view/light samples, jitter, distance, fallback flag

cloud-weather-map-kit
  -> coverage, density, wind offset

volumetric-cloud-kit
  -> camera-centered sphere, shader uniforms, ray march, light march

visual-domain
  -> inserts cloud sphere into the shared scene
  -> updates clouds before one shared composer render

hdr-composer-kit
  -> one full-scene RenderPass
  -> one color-grade pass
  -> shared color/depth targets

dynamic-resolution-kit
  -> changes renderer and composer pixel ratio together

terrain-chunk-streaming-kit
  -> independent procedural cloud-shadow shader injection
```

## Gap

`renderScale` has no execution owner. No kit allocates cloud-only targets, supplies scene depth to an upscaler, owns temporal cloud history, classifies fallbacks or publishes pass receipts.

## Required domain

```txt
open-above-cloud-low-resolution-depth-upscale-authority-domain
  cloud-frame-identity-kit
  cloud-lod-profile-revision-kit
  cloud-target-allocation-kit
  cloud-raymarch-dispatch-kit
  cloud-transmittance-depth-kit
  cloud-temporal-history-kit
  cloud-history-reset-kit
  cloud-depth-aware-upscale-kit
  cloud-hdr-composite-kit
  cloud-execution-profile-kit
  cloud-fallback-policy-kit
  cloud-pass-receipt-kit
  cloud-target-retirement-kit
  terrain-cloud-shadow-policy-kit
  terrain-cloud-shadow-result-kit
  cloud-frame-result-kit
  cloud-frame-conflict-kit
  cloud-telemetry-projection-kit
  first-visible-cloud-frame-ack-kit
  cloud-browser-fixture-kit
```

## Service contract

```txt
CloudFrameAdmissionCommand
  -> bind FrameId, renderer generation, quality tier, viewport, DPR, weather and camera revisions
  -> validate one CloudLodProfileRevision
  -> allocate cloud color, transmittance and depth candidates at the declared cloud render scale
  -> execute the admitted view/light sample budget
  -> optionally adopt motion-aware temporal history
  -> depth-aware upscale against the accepted scene-depth revision
  -> composite clouds into the HDR scene in explicit order
  -> classify full, reduced, impostor, disabled or rejected execution
  -> publish CloudFrameResult with target, timing, pass and fallback receipts
  -> publish FirstVisibleCloudFrameAck

TerrainCloudShadowCommand
  -> bind the same weather and quality revisions
  -> admit procedural, cached-texture or disabled shadow policy
  -> publish TerrainCloudShadowResult and cost receipts
  -> prevent an untracked shadow path from bypassing the cloud budget
```

## Compatibility boundary

Keep existing weather state, shader density functions, quality tiers, sun lighting, scene depth and HDR color grading. Add explicit target and result ownership around them rather than moving rendering authority into `main.js`.
