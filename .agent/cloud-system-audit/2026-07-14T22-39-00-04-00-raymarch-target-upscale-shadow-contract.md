# Cloud System Audit: Ray-March Target, Upscale and Shadow Contract

**Timestamp:** `2026-07-14T22-39-00-04-00`

## Plan ledger

**Goal:** make cloud-only low-resolution rendering the primary path and keep every secondary cloud cost inside the same budget.

- [x] Record current shader and target behavior.
- [x] Record the unused LOD scale.
- [x] Include terrain cloud-shadow cost.
- [x] Define retirement and fallback rules.
- [ ] Implement and benchmark.

## Current contract

```txt
renderScale descriptor: declared, unused
cloud-only color target: absent
cloud transmittance/depth target: absent
scene depth input: available in composer, not consumed by clouds
depth-aware upscale: absent
temporal jitter flag: declared, no history owner
fallback impostors: false
terrain shadow budget: independent and untracked
```

## Target contract

```txt
cloud width  = ceil(viewport width  * DPR * cloud scale)
cloud height = ceil(viewport height * DPR * cloud scale)

mandatory outputs
  premultiplied cloud color
  transmittance/opacity
  representative cloud depth
  target generation and fingerprint
```

## Upscale contract

Use scene depth and cloud depth/transmittance to reject foreground bleeding around terrain, balloon, ropes and towns. History is optional, but any temporal path must bind camera motion, jitter sequence, weather revision and reset reason.

## Shadow contract

Terrain cloud shadows must be admitted as procedural, cached texture, projected shadow or disabled. Their cost and weather revision must be part of `CloudFrameResult`; they cannot remain an untracked shader injection.

## Retirement

Dispose cloud render targets, history buffers, depth resources and timer queries on resize generation, quality transition, context loss or route retirement. Late results from retired generations are rejected.
