# Gameplay Audit: Generation Contract Consumer Parity Loop

**Timestamp:** `2026-07-13T18-59-14-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

## Summary

Balloon clearance, routes, towns, vegetation obstacles, Air Mail spatial logic and map navigation depend on world-generation services. Current tests prove many behaviors individually, but no aggregate receipt states that gameplay consumers use the same public contract as the terrain and map.

## Plan ledger

**Goal:** bind physical gameplay queries and visible world consumers to one accepted contract revision without changing current flight or Air Mail behavior.

- [x] Trace generation through gameplay-facing sampling.
- [x] Identify current deterministic and protection proofs.
- [x] Identify missing aggregate consumer receipt.
- [ ] Add consumer revision adoption and parity fixtures.

## Gameplay loop

```txt
world contract
  -> create staged generator
  -> retain fallback during preparation
  -> atomically adopt generated base
  -> add foundation elevation
  -> balloon samples terrain height for clearance
  -> vegetation exposes obstacles
  -> map shows routes, towns and world color
  -> Air Mail uses spatial volumes and destinations
```

## Existing proof

```txt
deterministic world samples
protected routes and towns
outside-world flora behavior
biome and flora diversity
staged progress and phase history
reset retains active predecessor
disposal rejects later reset
mountain wrapper adds 500m after readiness
```

## Missing proof

```txt
public contract revision in gameplay state
route-protection proof tied to contract fingerprint
collision-height parity with rendered terrain
map route/world revision parity
Air Mail route compatibility after contract change
stale consumer rejection
aggregate gameplay consumer result
```

## Required result

```txt
WorldGenerationGameplayConsumerResult
  contractRevision
  baseRevision
  foundationRevision
  clearanceReceipt
  routeProtectionReceipt
  obstacleReceipt
  mapReceipt
  mailReceipt
  status
```
