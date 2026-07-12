# Architecture Audit: Vegetation Spatial Coverage Central Reconciliation DSK Map

**Timestamp:** `2026-07-12T15-40-04-04-00`

## Summary

The active vegetation kit is a boot-time object builder inside the visual domain, not a bounded world consumer. This audit reconciles the existing `15:31:24` source audit into one parent DSK that owns camera-relative requirements, deterministic chunk identity, candidate admission, atomic adoption, exclusion publication, retirement and visible proof.

## Plan ledger

**Goal:** place vegetation coverage under one fiction-neutral authority while keeping tree generation, render-resource construction and grass/flower exclusion as composable services.

- [x] Trace current world, camera, vegetation and flora ownership.
- [x] Preserve deterministic placement inputs.
- [x] Separate coverage planning from candidate generation and GPU ownership.
- [x] Define identities, commands, results, receipts and fixtures.
- [x] Reconcile the domain with procedural-world, terrain and flora authorities.
- [ ] Implement the DSK and migrate the boot-time builder behind it.

## Current ownership

```txt
open-above-visual-domain
  -> constructs open-above-world-generation-kit
  -> constructs open-above-terrain-surface-kit
  -> calls open-above-vegetation-cluster-kit once
  -> passes boot treePositions to grass and flowers
  -> updates terrain, grass and flowers per frame
  -> does not update or dispose vegetation
```

## Required parent domain

```txt
open-above-vegetation-spatial-coverage-authority-domain
```

The parent domain coordinates state and transactions. It does not absorb geometry implementation, world generation or renderer submission.

## Identity and provenance kits

```txt
open-above-vegetation-stream-session-id-kit
open-above-vegetation-frame-id-kit
open-above-vegetation-world-artifact-binding-kit
open-above-vegetation-input-fingerprint-kit
open-above-vegetation-chunk-id-kit
open-above-vegetation-render-generation-kit
```

## Planning and deterministic content kits

```txt
open-above-vegetation-coverage-plan-kit
open-above-vegetation-chunk-requirements-kit
open-above-vegetation-seed-derivation-kit
open-above-vegetation-placement-kit
open-above-vegetation-exclusion-policy-kit
open-above-vegetation-biome-policy-kit
```

## Admission and transaction kits

```txt
open-above-vegetation-frame-command-kit
open-above-vegetation-frame-admission-kit
open-above-vegetation-candidate-set-kit
open-above-vegetation-budget-policy-kit
open-above-vegetation-candidate-result-kit
open-above-vegetation-aggregate-validation-kit
open-above-vegetation-chunk-adoption-kit
open-above-vegetation-last-good-rollback-kit
open-above-vegetation-retirement-kit
open-above-stale-vegetation-result-rejection-kit
```

## Consumer and observation kits

```txt
open-above-vegetation-exclusion-artifact-kit
open-above-vegetation-consumer-receipt-kit
open-above-vegetation-observation-kit
open-above-vegetation-journal-kit
open-above-vegetation-visible-frame-ack-kit
```

## Fixture kits

```txt
open-above-vegetation-spatial-fixture-kit
open-above-vegetation-failure-rollback-fixture-kit
open-above-vegetation-exclusion-parity-fixture-kit
open-above-vegetation-browser-pages-fixture-kit
```

## Required transaction

```txt
VegetationFrameCommand
  -> validate runtime session and predecessor frame
  -> bind world artifact, quality and configuration fingerprints
  -> derive camera-relative required cells
  -> intersect requirements with world membership
  -> derive stable chunk IDs and seeds
  -> generate detached candidates
  -> apply terrain/biome/route/town/lake/spacing exclusions
  -> enforce work, instance, memory and transition budgets
  -> construct detached render resources
  -> validate complete aggregate coverage
  -> atomically adopt or preserve last-good aggregate
  -> publish revisioned exclusion artifact
  -> retire predecessor resources exactly once
  -> publish typed result, observations and journal
  -> acknowledge the first matching visible frame
```

## Cross-domain boundaries

```txt
procedural-world authority
  owns world artifact, membership and revisioned samples

terrain authority
  owns terrain stream aggregates and terrain sample provenance

vegetation authority
  owns tree coverage, chunk adoption and tree exclusion artifact

grass/flower domains
  consume the committed vegetation exclusion artifact

renderer
  consumes admitted vegetation render generations and emits frame acknowledgement
```

## Invariants

```txt
same world/config/chunk produces the same candidates independent of query order
all current chunks cite one world artifact and vegetation frame
required cells are covered or carry explicit treeless/deferred/failed results
candidate failure cannot detach last-good coverage
only the committed vegetation generation publishes exclusions
retirement occurs exactly once after successor adoption
stale results cannot re-enter after world, quality or session replacement
visible acknowledgement cites the adopted vegetation generation
```

Documentation only. No DSK or runtime source was implemented.