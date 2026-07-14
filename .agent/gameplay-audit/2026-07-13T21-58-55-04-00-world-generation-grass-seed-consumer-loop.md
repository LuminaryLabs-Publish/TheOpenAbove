# Gameplay Audit: World Generation and Grass Seed Consumer Loop

**Timestamp:** `2026-07-13T21-58-55-04-00`

## Plan ledger

**Goal:** document how one seed utility revision affects world, vegetation, grass, flowers, flight readability and Air Mail navigation.

- [x] Trace seed input through world and flora generation.
- [x] Identify gameplay-visible consumers.
- [x] Identify missing revision and reset evidence.
- [ ] Add one accepted seed-consumer result.

## Loop

```txt
campaign world seed
  -> normalizeGrassSeed
  -> hashGrassSeed and seedFloat
  -> world height, erosion, flow, climate and biome generation
  -> grass and flower density fields
  -> deterministic chunk candidates and atlas variants
  -> terrain, vegetation, grass and flower refresh after world swap
  -> balloon route reading, landmark recognition and delivery navigation
```

## Current behavior

The deterministic functions are imported directly by world, grass and flower modules. The latest runtime change makes this graph safe to evaluate when `window` does not exist.

## Authority gap

The algorithm has no explicit revision and consumers return no adoption receipt. A change to normalization or hashing can alter the entire generated landscape while:

```txt
the compatibility global may retain or overwrite another revision
world generation may be active on a predecessor generation
grass and flower consumers may refresh at different times
save, map and telemetry surfaces may identify no seed algorithm version
visible frames may mix consumer generations
```

## Required result

```txt
SeedConsumerAdoptionResult
  worldSeed
  algorithmRevision
  worldGenerationRevision
  terrainRevision
  vegetationRevision
  grassRevision
  flowerRevision
  mapRevision
  status
  failure
```

## Gameplay invariant

The world, route protection, terrain height, flora density, grass placement, flower placement and map projection must derive from one admitted seed algorithm revision before the corresponding generation is reported ready.