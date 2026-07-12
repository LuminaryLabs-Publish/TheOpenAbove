# START HERE: TheOpenAbove

**Last aligned:** `2026-07-12T11-15-16-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`

## Summary

The active source now builds a seeded full-world grid with erosion, flow, five grass species, five flower types and a cached biome map. During this audit, commit `74f9b8a212f0b9eedeefdc8f7a5a1eb06fa24cec` removed feature-cache size from the authoritative descriptor and bounded flora outside the world disk.

The remaining gap is architectural: world construction is still one synchronous, unversioned utility graph. Terrain, vegetation, grass, flowers, landmarks and the map do not adopt a common immutable world artifact through typed receipts or acknowledge which build produced a visible frame.

## Plan ledger

**Goal:** make one immutable, bounded and fingerprinted world build feed every world consumer through pure revisioned queries, typed adoption receipts and visible-frame proof.

- [x] Compare the complete Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `TheOpenAbove` because substantial world/grass/flower/map source landed after its previous audit.
- [x] Trace world construction, sampling, cache behavior, membership, chunk streaming, map rasterization and tests.
- [x] Identify the interaction loop, domains, 67 active source-backed kits and offered services.
- [x] Detect public descriptor drift and unbounded flora in the reviewed source.
- [x] Reconcile the concurrent runtime fix that resolved those two concrete defects.
- [x] Define the remaining procedural-world generation authority.
- [x] Add timestamped architecture and system audits.
- [x] Refresh root `.agent` state and registry.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Implement build identity, immutable artifacts, consumer receipts and executable browser/Pages proof.

## Read this first

```txt
.agent/trackers/2026-07-12T11-01-59-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/world-generation-audit/2026-07-12T11-01-59-04-00-runtime-fix-reconciliation.md
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

The pre-fix tracker documents what was found at `f24e1b...`. The runtime-fix reconciliation is authoritative for current `main`.

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

## Current findings

```txt
resolved during audit:
  descriptor no longer exposes mutable cache size
  sampleFlora returns zero-density outside-world profile
  world exposes contains(x,z)

remaining:
  no WorldBuildId or generation revision
  no canonical seed/config/anchor fingerprint
  no named build stages, budget, progress or cancellation
  no immutable WorldGridArtifact fingerprint
  no typed revisioned sample results
  no consumer adoption receipts or stale-result rejection
  no terrain/grass/flower/map parity result
  no world-visible-frame acknowledgement
```

## Required parent domain

```txt
open-above-procedural-world-generation-authority-domain
  -> immutable build plan and input fingerprints
  -> build identity, stages, budget and cancellation
  -> canonical world artifact and fingerprint
  -> pure typed sample queries
  -> explicit membership/out-of-bounds policy
  -> bounded non-authoritative cache policy
  -> consumer admission and receipts
  -> terrain/flora/map parity result
  -> visible-frame acknowledgement and fixtures
```

## Next safe ledge

```txt
Procedural World Generation Authority
+ WorldBuildId and canonical input fingerprints
+ Immutable WorldGridArtifact
+ Pure WorldSampleQuery/Result
+ Shared membership policy
+ Consumer receipts and parity
+ Startup-budget, replacement and visible-frame fixtures
```