# Render Audit: World Contract Visible Frame Proof Gap

**Timestamp:** `2026-07-13T18-59-14-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

## Summary

World-generation behavior ultimately drives terrain, horizon, vegetation, grass, flowers, parchment-map color and collision-height sampling. Those render and gameplay consumers do not carry a shared world-generation contract revision into a frame envelope.

## Plan ledger

**Goal:** prove that the visible world was produced by consumers that adopted the same public world-generation contract and resolved foundation revisions.

- [x] Trace world generation into visual and map consumers.
- [x] Preserve the prior mountain/foundation visible-frame audit.
- [x] Identify missing contract revision fields.
- [x] Define a first matching frame acknowledgement.
- [ ] Implement frame correlation and browser proof.

## Current path

```txt
public world-generation facade
  -> staged base world
  -> foundation elevation wrapper
  -> terrain near and horizon
  -> vegetation, grass and flowers
  -> parchment map
  -> collision-height queries
  -> independent rendering and telemetry
```

## Missing frame fields

```txt
WorldGenerationContractRevision
WorldGenerationManifestFingerprint
BaseGenerationRevision
FoundationCellRevision
TerrainNearRevision
TerrainHorizonRevision
VegetationRevision
GrassRevision
FlowerRevision
MapRevision
CollisionHeightRevision
FrameSequence
FirstContractRevisionFrameAck
```

## Failure cases

```txt
source proof passes but built artifact is stale
  -> browser may render predecessor contract

public constants change without consumer rebuild
  -> terrain and map may combine different assumptions

support module moves
  -> structural smoke fails although visible runtime is unchanged

source markers remain but behavior drifts
  -> structural smoke passes while visible output changes

consumer preparation fails
  -> no typed mixed-revision frame rejection exists
```

## Required frame transaction

```txt
accepted WorldGenerationProofResult
  -> prepare consumer receipts
  -> require matching contract and foundation revisions
  -> render one FrameWorldContractEnvelope
  -> compare terrain, map and collision readback
  -> publish FirstContractRevisionFrameAck
```

## Proof boundary

A browser screenshot alone is insufficient. The acknowledgement must cite the contract manifest, generator/base revision, resolved foundation revision and mandatory consumer revisions.
