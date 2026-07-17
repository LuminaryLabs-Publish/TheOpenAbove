# Gameplay Audit: Flight Through Gaussian Cloud LOD Loop

**Timestamp:** `2026-07-17T02-32-08-04-00`

## Interaction loop

```txt
player steers balloon
  -> camera follows balloon
  -> camera approaches a close cloud bank
  -> bank changes distance tier
  -> requested splat count changes
  -> global capacity may admit or remove other splats
  -> instance membership is replaced
  -> player sees the next cloud frame
```

## Gameplay relevance

The player can travel through ground fog, low clouds and mid clouds. These are not background-only layers: close-cloud stability affects depth reading, route visibility, altitude perception and the feeling of entering or leaving cloud volume.

## Current guarantees

- Deterministic bank placement for a fixed world surface, weather-layer configuration and seed.
- Deterministic splat sampling for a bank, index and tier.
- Five distance-selected LOD tiers.
- Nearby candidates retained before distant candidates under capacity pressure.
- High clouds and cirrus remain on the separate distant volumetric path.

## Missing guarantees

- Stable bank membership during small camera oscillation.
- Hysteresis between adjacent distance tiers.
- Bounded transition when a bank changes splat count.
- Stable per-bank representation under global capacity pressure.
- Exact cloud generation bound to a flight frame.
- Pause/map/resume settlement for rebatch age and transition progress.

## Required gameplay result

`CloudLodMembershipResult` should expose entering, retained and leaving bank/splat membership for one camera revision. Journey map suspension and resume should explicitly freeze or advance transition time, rather than allowing wall-time-based rebatch age to decide implicitly.

## Boundary

Flight physics, airstream sampling and gameplay truth are not changed by this audit. The finding concerns the visual continuity of nearby cloud traversal.