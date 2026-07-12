# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-12T11-15-16-04-00`

## Status

```txt
status: procedural-world-generation-consumer-coherence-audited
source revision reviewed initially: f24e1b11063a566ff011168ffd89a0609f21328c
concurrent runtime fix reconciled: 74f9b8a212f0b9eedeefdc8f7a5a1eb06fa24cec
runtime source changed by this documentation pass: no
branch: main
root .agent state: refreshed
central ledger sync: complete
central internal change log: complete
```

## Summary

The active route builds a seeded full-world terrain/climate grid, preserves route and town terrain, derives biome and flora fields, streams five grass species and five flower types, and rasterizes world colors into the parchment map.

This audit initially found that map/flora queries changed the public world descriptor through mutable cache-size readback and that flora had no world-disk boundary. A concurrent runtime commit removed cache size from the descriptor, added `world.contains(x,z)`, and returns a zero-density `outside-world` flora profile beyond the radius.

The remaining problem is authority and provenance. The world is still synchronously constructed as an unversioned utility object; consumers do not adopt a canonical immutable artifact or prove which world build produced their chunks, map pixels or visible frame.

## Plan ledger

**Goal:** define one immutable world artifact, pure revisioned sample results and typed consumer adoption across terrain, vegetation, grass, flowers, landmarks and map projection.

- [x] Compare the full Publish repository inventory with central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central and root `.agent` coverage.
- [x] Select only `TheOpenAbove` because material world-system source landed after the previous audit.
- [x] Review guidance, host, world generator, terrain, grass, flowers, map and tests.
- [x] Trace build work, sampling, cache behavior, boundary behavior and consumer adoption.
- [x] Reconcile 67 active source-backed kit surfaces and services.
- [x] Reconcile the concurrent descriptor-purity and flora-membership runtime fix.
- [x] Define the remaining procedural-world authority and fixture matrix.
- [x] Add timestamped tracker and system audits.
- [x] Refresh root `.agent` state and registry.
- [x] Synchronize the central ledger and internal change log.
- [x] Create no branch or pull request.
- [ ] Implement build identity, immutable artifacts, consumer receipts and executable browser/Pages proof.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

TheOpenAbove selected because world-generation, terrain, grass, flower and map source changed after its prior audit.
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

## Resolved during this audit window

```txt
public descriptor no longer includes cachedFeatureCells
map and query history no longer change authoritative descriptor output
world exposes contains(x,z)
outside-world flora returns zero grass and flower density
```

## Remaining source-backed findings

### World build is ungoverned

World construction performs synchronous array allocation, erosion, flow sorting and climate/fertility work. Map construction then performs thousands of synchronous world-color samples. No WorldBuildId, stage result, startup budget, progress, cancellation, reusable artifact or terminal build result exists.

### Input identity is incomplete

The descriptor exposes seed, center, radius and grid dimensions, but no canonical fingerprint covers surface configuration, route protection, town protection, algorithm/schema versions or produced grid arrays.

### Query results lack provenance

World methods return raw values and objects without query ID, world revision, membership result, artifact fingerprint or stale-result protection. `sampleFeatureCell` remains a direct cache-populating public method, although cache size is no longer authoritative state.

### Consumer revision is absent

Terrain, vegetation, landmarks, grass, flowers and map receive the world utility directly. Their meshes, cached map pixels and readbacks do not cite one WorldBuildId, revision or artifact fingerprint.

### Boundary policy is only partially unified

`sampleFlora` now returns `outside-world`, but height, moisture, temperature and fertility sampling still clamp to grid borders. No typed membership result coordinates all sample kinds and render consumers.

### Tests remain incomplete

Current Node tests prove deterministic values, protected anchor terrain, biome/species coverage and local grass/flower budgets. They do not prove artifact fingerprints, startup budgets, cancellation, query provenance, cross-consumer revision parity, stale-consumer rejection or visible-frame provenance.

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
canonical seed/config/anchor/algorithm fingerprints
world build ID, revision, plan, stages, budget and cancellation
immutable world-grid artifact and fingerprint
pure typed world sample query/result
explicit membership and out-of-bounds policy
bounded non-authoritative cache policy
consumer identity, adoption and receipts
terrain/vegetation/grass/flower/landmark/map parity result
stale result rejection
world-visible-frame acknowledgement
independent-build, startup, replacement, browser and Pages fixtures
```

## Required invariants

```txt
same canonical inputs create the same world artifact fingerprint
all sample results identify their world revision
all consumers adopt one committed world build
failed/cancelled builds do not replace the active world
stale chunks/map pixels cannot survive replacement
map construction does not mutate authoritative world state
visible frame acknowledges the exact world artifact
```

## Retained audits

The runtime-fix reconciliation is current for descriptor purity and flora membership. The `2026-07-12T09-02-10-04-00` map audit remains authoritative for bearing, fit, route style and off-map navigation. Earlier world-surface, grass, terrain, HDR, frame-failure and lifecycle audits remain active.

Documentation only. No runtime source, dependency, script, gameplay, rendering or deployment behavior was changed by this documentation pass.