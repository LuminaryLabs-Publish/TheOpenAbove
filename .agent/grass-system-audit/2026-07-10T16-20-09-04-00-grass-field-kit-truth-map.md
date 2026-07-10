# Grass System Audit — Active Kit Truth Map

Timestamp: `2026-07-10T16-20-09-04-00`

## Active composition

`visual-domain.js` imports `createGrassFieldDomain()` and updates it every visual frame.

```txt
open-above-grass-field-domain
  -> open-above-grass-chunk-placement-kit
       -> open-above-grass-world-seed-kit
       -> open-above-grass-biome-density-kit
       -> open-above-grass-exclusion-mask-kit
  -> open-above-grass-lod-kit
  -> open-above-grass-compute-culling-kit
```

## Services

```txt
world/chunk/instance deterministic hashing
seeded float lanes
height/moisture/slope biome density
water/slope/origin/road exclusion
bounded placement attempts
candidate transform/species/hue generation
quality and distance LOD profiles
WebGPU capability reporting with CPU chunk-culling fallback
three-plane alpha-clipped patch geometry
InstancedMesh chunk construction
camera-centered chunk rebuild
shader wind animation
aggregate backend/chunk/instance state
```

## Active kits

```txt
open-above-grass-world-seed-kit
open-above-grass-biome-density-kit
open-above-grass-exclusion-mask-kit
open-above-grass-chunk-placement-kit
open-above-grass-lod-kit
open-above-grass-compute-culling-kit
open-above-grass-field-domain
```

## Inactive legacy implementation

```txt
open-above-grass-detail-kit
```

The legacy file remains source-backed and can construct one static instanced field, but `visual-domain.js` does not import it. It must not be presented as the active grass service.

## Registry correction

The prior root kit registry included the legacy kit but omitted the complete active grass-field stack. The current registry now separates active source-backed kits from inactive legacy kits.

## Remaining proof gap

The grass domain exposes aggregate backend, chunk, and instance counts only. It does not expose per-chunk seed, requested count, accepted candidate count, LOD reason, culling decision, rebuild reason, or frame correlation rows.

## Safe next work

Keep grass rendering unchanged during the frame-phase proof pass. Add only kit-truth and frame-correlation readback needed to identify which grass state was presented by a committed frame.

## Next safe ledge

`TheOpenAbove Render Phase Authority Ledger + Adaptive Resolution Fixture Gate`