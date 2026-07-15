# Architecture Audit: Cloud Depth Composite DSK Map

**Timestamp:** `2026-07-15T02-09-29-04-00`

## Summary

The existing `open-above-volumetric-cloud-kit` now owns low-resolution target allocation, offscreen dispatch, a fullscreen composite, target sizing, and disposal. It still lacks an explicit frame identity, cloud-depth representation, scene-depth reconstruction, typed result, fallback policy, and visible-frame acknowledgement.

## Plan ledger

**Goal:** extend the current cloud kit through one narrow authority domain rather than creating a second renderer or moving weather/gameplay ownership.

- [x] Map current owners.
- [x] Map newly implemented services.
- [x] Preserve existing kit boundaries.
- [x] Define missing authority subkits.
- [ ] Implement the authority and fixtures.

## Current composition

```txt
open-above-visual-domain
  -> open-above-quality-tier-kit
  -> open-above-dynamic-resolution-kit
  -> open-above-cloud-weather-map-kit
  -> open-above-cloud-lod-kit
  -> open-above-cloud-lighting-kit
  -> open-above-volumetric-cloud-kit
       private cloud scene
       RGBA HalfFloat target
       renderScale sizing
       ray-march dispatch
       fullscreen composite mesh
       render-size readback
       disposal
  -> open-above-hdr-composer-kit
  -> open-above-color-grade-kit
```

## Current ownership

| Concern | Current owner | Gap |
|---|---|---|
| weather coverage/density/offset | cloud-weather-map kit | none for this audit |
| quality scale and samples | cloud-LOD kit | no versioned profile receipt |
| ray-marched color/alpha | volumetric-cloud kit | no depth/transmittance output |
| low-resolution target | volumetric-cloud kit | no generation identity or retirement receipt |
| scene depth | HDR composer / main RenderPass | not supplied to cloud composite |
| cloud composite | fullscreen plane in main scene | fixed far depth, no relative-depth comparison |
| terrain cloud shadows | terrain material | outside cloud result and budget |
| telemetry | visual-domain aggregate | no cloud pass timing/result |
| visible proof | browser host | no matching cloud-frame acknowledgement |

## Required parent domain

```txt
open-above-cloud-low-resolution-depth-upscale-authority-domain
```

## Required subkits

```txt
open-above-cloud-frame-identity-kit
open-above-cloud-lod-profile-revision-kit
open-above-cloud-target-allocation-kit
open-above-cloud-raymarch-dispatch-kit
open-above-cloud-transmittance-depth-kit
open-above-cloud-temporal-history-kit
open-above-cloud-history-reset-kit
open-above-cloud-depth-aware-upscale-kit
open-above-cloud-hdr-composite-kit
open-above-cloud-execution-profile-kit
open-above-cloud-fallback-policy-kit
open-above-cloud-pass-receipt-kit
open-above-cloud-target-retirement-kit
open-above-terrain-cloud-shadow-policy-kit
open-above-terrain-cloud-shadow-result-kit
open-above-cloud-frame-result-kit
open-above-cloud-frame-conflict-kit
open-above-cloud-telemetry-projection-kit
open-above-first-visible-cloud-frame-ack-kit
```

## Command boundary

```txt
CloudDepthCompositeCommand
  -> bind one frame and one renderer/quality/weather/camera/scene-depth revision set
  -> prepare low-resolution color transmittance and representative-depth candidates
  -> execute admitted sample budgets
  -> reconstruct against accepted linear scene depth
  -> compare geometry and cloud depth consistently
  -> composite before color grading
  -> publish result receipts and first matching frame acknowledgement
```

## Compatibility boundary

Keep the current weather model, density shader, lighting, quality tiers, world generation, terrain material, balloon gameplay, Three.js renderer, and HDR composer. The minimum upgrade is to enrich the existing cloud output and composite contract.