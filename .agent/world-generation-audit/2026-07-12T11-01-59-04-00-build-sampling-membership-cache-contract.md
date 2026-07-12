# World Generation Audit: Build, Sampling, Membership and Cache Contract

**Timestamp:** `2026-07-12T11-01-59-04-00`

## Current build

```txt
WORLD_GRID_SIZE = 257
WORLD_FEATURE_CELL_SIZE = 2080
world radius = 10000
six erosion passes
flow accumulation sorted over every grid index
five grass types
five flower types
```

The generator allocates six primary Float32 grids plus temporary erosion/delta arrays, computes protected route/town/lake/road regions, performs erosion and flow accumulation, and returns synchronous query closures.

## Concrete purity defect

```txt
function featureCellAt(x,z) {
  if (!featureCells.has(key)) featureCells.set(key, buildFeatureCell(...));
  return featureCells.get(key);
}

getDescriptor() {
  cachedFeatureCells: featureCells.size
}
```

`sampleBiome`, `sampleFlora` and `sampleMapColor` can call `featureCellAt`. Querying the world changes the descriptor. Since the descriptor is included in public snapshots, read history becomes observable state.

## Startup coupling

```txt
createVisualDomain
  -> createWorldGenerationKit synchronously
  -> create terrain/grass/flowers

createParchmentMapOverlay
  -> createWorldMapCanvas synchronously
  -> sample up to 96 x 96 world colors
```

There is no first-frame budget, progress projection, cancellation, worker boundary, artifact cache or retry result.

## Boundary mismatch

```txt
sampleGrid outside square -> clamp to nearest grid edge
terrain outside disk -> blend toward edgeFloor through edgeMask
grass/flowers -> follow camera chunks without worldSurface input
feature cells -> derived for any integer cell coordinate
```

The repository has no canonical answer for outside-world sampling.

## Required cache policy

```txt
cache is an optimization only
cache cannot affect sample values
cache metrics cannot affect authoritative snapshots/fingerprints
cache capacity and eviction are bounded
cache lifetime is owned by WorldBuildId
cache is retired with the build
map prewarm is explicit and non-authoritative
```

## Required build artifact

```txt
WorldGridArtifact {
  worldBuildId
  generationRevision
  seedPolicyId
  seedFingerprint
  configFingerprint
  anchorFingerprint
  center
  radius
  gridSize
  gridStep
  membershipPolicyId
  arraySchemaVersion
  artifactFingerprint
}
```

## Required fixtures

```txt
independent build byte/fingerprint parity
query-order and cache-purity parity
map-prewarm versus no-map parity
inside/edge/outside membership matrix
route/town anchor fingerprint drift
startup duration and allocation budget
cancel/failure leaves active build unchanged
consumer adoption and stale-result rejection
browser and deployed Pages world-frame acknowledgement
```

Current tests are useful deterministic value checks, but they do not validate these authority properties.