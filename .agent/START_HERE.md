# START HERE: TheOpenAbove

**Last aligned:** `2026-07-12T11-01-59-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`

## Summary

The current source now has a seeded full-world grid, erosion and flow fields, five grass species, five flower types and a cached biome map. The world values are deterministic, but world construction and sampling are not yet authoritative.

The primary defect is that world reads can mutate observable state. `sampleMapColor()` can populate the mutable feature-cell cache, while `getDescriptor()` exposes the cache size. Map construction or camera/query history can therefore change later snapshots without a world transition.

## Plan ledger

**Goal:** make one immutable, bounded and fingerprinted world build feed terrain, vegetation, grass, flowers, landmarks and the map through pure queries and typed consumer receipts.

- [x] Compare the complete Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `TheOpenAbove` because substantial world/grass/flower/map source landed after its previous audit.
- [x] Trace world construction, sampling, cache mutation, surface membership, chunk streaming, map rasterization and tests.
- [x] Identify the interaction loop, domains, 67 active source-backed kits and offered services.
- [x] Define the missing procedural-world generation authority.
- [x] Add timestamped architecture and system audits.
- [x] Refresh root `.agent` state and registry.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Implement the authority and executable browser/Pages proof.

## Read this first

```txt
.agent/trackers/2026-07-12T11-01-59-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-12T11-01-59-04-00-procedural-world-generation-authority-dsk-map.md
.agent/render-audit/2026-07-12T11-01-59-04-00-world-terrain-flora-map-frame-coherence-gap.md
.agent/gameplay-audit/2026-07-12T11-01-59-04-00-flight-streaming-world-query-loop.md
.agent/interaction-audit/2026-07-12T11-01-59-04-00-world-sample-command-result-map.md
.agent/world-generation-audit/2026-07-12T11-01-59-04-00-build-sampling-membership-cache-contract.md
.agent/grass-system-audit/2026-07-12T11-01-59-04-00-world-flora-chunk-membership-contract.md
.agent/deploy-audit/2026-07-12T11-01-59-04-00-world-generation-fixture-gate.md
.agent/turn-ledger/2026-07-12T11-01-59-04-00.md
.agent/kit-registry.json
```

Retain the `2026-07-12T09-02-10-04-00` parchment-map spatial audit. It owns bearing, fit, route emphasis and off-map navigation. This audit owns world build, query purity, cache policy, membership and consumer coherence.

## Interaction loop

```txt
boot
  -> synchronously build 257 x 257 world fields
  -> run erosion and flow accumulation
  -> create terrain, vegetation, grass and flowers
  -> synchronously rasterize 96 x 96 map background
  -> create gameplay owners
  -> start RAF

frame
  -> update flight/mail/airstream
  -> update terrain, grass and flower chunk windows
  -> sample world height, moisture and flora
  -> render HDR frame
  -> expose world and flora state through GameHost snapshot
```

## Domains in use

```txt
browser shell, canvas, parchment map and fatal surface
runtime boot, session, input, RAF and public host
balloon simulation, airstream and mail delivery
seeded world build, erosion, flow, climate, biome, flora and map color
world-surface membership and protected gameplay anchors
terrain, horizon, vegetation, landmarks, grass and flower streaming
quality, dynamic resolution, sky, clouds, water, HDR and lens response
map caching and navigation projection
telemetry, headless inspection, tests, build and Pages deployment
```

## Kits and services

```txt
runtime/gameplay: 15
balloon/object/presentation: 15
visual/world/environment: 32
UI: 1
tooling/proof: 4
active source-backed total: 67
runtime-implied adapters: 12
inactive/retired legacy kits: 12
planned world-authority kits: 29 including parent
```

New services include seeded world-grid construction, erosion, flow, protected-anchor blending, biome/flora/map queries, five-species grass atlas and patch density, five-type flower placement/atlas/streaming and world/flora fixture coverage.

## Main findings

```txt
sampleMapColor -> sampleFlora -> sampleBiome -> featureCellAt -> cache mutation
getDescriptor -> cachedFeatureCells -> query-history-dependent snapshot

world build + map rasterization -> synchronous startup work with no budget/cancel/result
terrain -> disk edge mask
world grid -> outside-coordinate clamp
flora chunks -> no shared world-surface membership
consumers -> no common world revision/fingerprint/receipt
render -> no world-visible-frame acknowledgement
```

## Required parent domain

```txt
open-above-procedural-world-generation-authority-domain
  -> immutable build plan and input fingerprints
  -> build identity, stages, budget and cancellation
  -> canonical world artifact and fingerprint
  -> pure typed sample queries
  -> explicit membership/out-of-bounds policy
  -> non-authoritative bounded cache policy
  -> consumer admission and receipts
  -> terrain/flora/map parity result
  -> visible-frame acknowledgement and fixtures
```

## Ordered implementation queue

```txt
1. immutable runtime admission and frame ownership
2. session, clock, input, model and mission authorities
3. terrain/world-surface ownership
4. procedural world generation authority
5. grass/flower consumer membership and chunk revisioning
6. steering, HDR and frame-failure coherence
7. parchment map pause/navigation authority
8. semantic status and accessibility
```

## Next safe ledge

```txt
Procedural World Generation Authority
+ WorldBuildId and canonical input fingerprints
+ Immutable WorldGridArtifact
+ Pure WorldSampleQuery/Result
+ Shared membership policy
+ Consumer receipts and parity
+ Cache-purity, startup-budget and visible-frame fixtures
```