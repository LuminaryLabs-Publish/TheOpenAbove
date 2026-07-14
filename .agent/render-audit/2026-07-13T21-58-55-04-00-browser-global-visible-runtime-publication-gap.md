# Render Audit: Browser Global and Visible Runtime Publication Gap

**Timestamp:** `2026-07-13T21-58-55-04-00`

## Plan ledger

**Goal:** correlate the accepted grass-seed algorithm revision with generated world content and the first matching visible frame without treating an ambient browser global as render readiness.

- [x] Trace seed utilities into grass, flower and world generation.
- [x] Identify current visible and diagnostic evidence.
- [x] Separate compatibility publication from render admission.
- [ ] Add revision-bearing frame proof.

## Current visible path

```txt
grass seed utilities
  -> world lattice and climate samples
  -> grass patch distribution and chunk candidates
  -> flower chunk placement and texture variants
  -> terrain/grass/flower object preparation
  -> Three.js frame submission
```

## Gap

`window.OpenAboveGrassWorldSeedKit` is published during browser import before any world generation, grass preparation, renderer readiness or frame submission result. The global has no seed algorithm revision, host generation or publication result, and the frame has no matching seed-consumer revision.

A visible frame therefore cannot prove:

```txt
which seed API revision generated the active world
whether the compatibility global belongs to the active runtime generation
whether grass and flower consumers adopted the same revision
whether a hot-reloaded global is stale
whether the first matching frame was presented
```

## Required envelope

```txt
SeedConsumerFrameEnvelope
  worldGenerationRevision
  grassSeedAlgorithmRevision
  grassConsumerRevision
  flowerConsumerRevision
  compatibilityPublicationId | null
  hostGeneration
  frameId
```

## Required acknowledgement

```txt
FirstSeedRevisionFrameAck
  frameId
  grassSeedAlgorithmRevision
  worldGenerationRevision
  grassConsumerRevision
  flowerConsumerRevision
  presented
```

## Rule

Compatibility publication is optional legacy exposure. It must not gate renderer readiness. Render admission depends on accepted deterministic API and consumer revisions, while the global is installed only when an admitted host explicitly requires it.