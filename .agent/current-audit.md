# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-12T11-01-59-04-00`

## Status

```txt
status: procedural-world-generation-consumer-coherence-audited
source revision reviewed: f24e1b11063a566ff011168ffd89a0609f21328c
runtime source changed by this pass: no
branch: main
root .agent state: refreshed
central ledger sync: pending until central commit
```

## Summary

The active route now builds a seeded full-world terrain/climate grid, applies route and town protection, derives biome and flora fields, streams five grass species and five flower types, and rasterizes world colors into the parchment map.

The values are deterministic for tested coordinates, but the world source is not immutable or observationally pure. Querying a previously unseen feature cell mutates an internal cache, and the public descriptor exposes cache size. Map construction, camera travel or test/query order can therefore change later snapshots without a world transition.

## Plan ledger

**Goal:** define one immutable and bounded world artifact, pure sample results and typed consumer adoption across terrain, vegetation, grass, flowers, landmarks and map projection.

- [x] Compare the full Publish repository inventory with central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central and root `.agent` coverage.
- [x] Select only `TheOpenAbove` because nineteen-plus material source commits landed after the previous audit.
- [x] Review repository guidance, main host, world generator, terrain, grass, flowers, map and tests.
- [x] Trace build work, sampling, cache mutation, boundary behavior and consumer adoption.
- [x] Reconcile 67 active source-backed kit surfaces and services.
- [x] Define the procedural-world generation authority and fixture matrix.
- [x] Add timestamped tracker and system audits.
- [x] Refresh root `.agent` state and registry.
- [x] Create no branch or pull request.
- [ ] Implement runtime authority and executable browser/Pages proof.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

TheOpenAbove selected because world-generation, terrain, grass, flower and map source changed after its 09:02 audit.
TheCavalryOfRome excluded.
```

## Interaction loop

```txt
boot
  -> create visual domain
  -> synchronously allocate and build 257 x 257 world fields
  -> run six erosion passes and flow accumulation
  -> create terrain, vegetation, grass and flower consumers
  -> synchronously rasterize cached 96 x 96 map background
  -> load balloon and create airstream/mail/simulation owners
  -> start main RAF

frame
  -> update flight, mail and airstream
  -> update terrain/horizon streamers
  -> move grass and flower chunk windows around camera
  -> query world height, moisture and flora for new chunks
  -> render HDR frame
  -> expose generation descriptor and flora state
```

## Source-backed findings

### Query history mutates observable state

```txt
sampleMapColor
  -> sampleFlora
  -> sampleBiome
  -> featureCellAt
  -> featureCells.set when absent

getDescriptor
  -> cachedFeatureCells: featureCells.size
```

The descriptor is included in the public snapshot. Two otherwise identical runs can therefore differ because one opened/constructed the map or sampled more cells.

### Startup work is ungoverned

World construction performs large synchronous array allocation, erosion, flow sorting and climate/fertility work. The map then performs thousands of synchronous world-color samples during overlay construction. No build stage, budget, progress, cancellation, reusable artifact or typed terminal result exists.

### Boundary policy differs by consumer

```txt
terrain: disk edge mask and edge floor
world grid: clamp outside positions to border grid values
feature cells: unbounded integer cell identity
grass/flowers: camera-centered chunks with no worldSurface membership input
```

No canonical inside/edge/outside result coordinates these consumers.

### Consumer revision is absent

Terrain, vegetation, landmarks, grass, flowers and map all receive the world utility directly. Their meshes, cached map pixels and readbacks do not cite one WorldBuildId, revision or artifact fingerprint.

### Tests remain incomplete

Current Node tests prove independent sampled values, protected anchor terrain, biome/species coverage and local grass/flower budgets. They do not prove cache purity, map-prewarm parity, startup budget, cancellation, outside-world parity, stale-consumer rejection or visible-frame provenance.

## Domains in use

```txt
browser shell, canvas, map and fatal projection
runtime admission, startup, RAF, input and public host
balloon simulation, steering, airstream and mail
seeded world build, erosion, flow, climate, biome, flora and map color
world-surface membership and legacy anchor protection
terrain and horizon streaming
vegetation and landmark placement
grass and flower candidate generation, atlases, chunking, LOD and culling
quality, dynamic resolution, sky, clouds, water, HDR and lens response
map caching and navigation projection
telemetry, headless inspection, tests, build and Pages deployment
```

## Kit inventory and services

```txt
runtime/gameplay: 15
balloon/object/presentation: 15
visual/world/environment: 32
UI: 1
tooling/proof: 4
active source-backed total: 67
runtime-implied adapters: 12
inactive/retired legacy: 12
planned procedural-world authority: 29 including parent
```

The exact kit names and services are in `.agent/kit-registry.json` and the latest tracker.

## Required parent domain

```txt
open-above-procedural-world-generation-authority-domain
```

## Required services

```txt
canonical seed/config/anchor fingerprints
world build ID, revision, plan, stages, budget and cancellation
immutable world-grid artifact and fingerprint
pure typed world sample query/result
explicit membership and out-of-bounds policy
bounded non-authoritative cache policy
consumer identity, adoption and receipts
terrain/vegetation/grass/flower/landmark/map parity result
stale result rejection
world-visible-frame acknowledgement
independent-build, cache-purity, membership, startup, browser and Pages fixtures
```

## Required invariants

```txt
query order cannot change authoritative descriptor or fingerprint
same inputs create the same canonical world artifact
all consumers use one membership policy
map construction cannot mutate gameplay-visible world state
consumer results cite the committed world revision
failed/cancelled builds do not replace the active world
stale chunks/map pixels cannot survive replacement
visible frame acknowledges the exact world artifact
```

## Retained audits

The `2026-07-12T09-02-10-04-00` map audit remains authoritative for bearing, fit, route style and off-map navigation. Earlier world-surface, grass, terrain, HDR, frame-failure and lifecycle audits also remain active.

Documentation only. No runtime source, dependency, script, gameplay, rendering or deployment behavior changed.