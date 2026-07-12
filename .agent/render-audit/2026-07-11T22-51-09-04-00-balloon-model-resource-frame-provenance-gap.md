# Render Audit: Balloon Model Resource and Frame Provenance Gap

**Timestamp:** `2026-07-11T22-51-09-04-00`

## Plan ledger

**Goal:** prove that a rendered balloon frame comes from one admitted model profile and one live resource set.

- [x] Trace balloon construction into the live Three.js scene.
- [x] Trace shell, mouth, seams, basket, burner, frame and rope allocations.
- [x] Trace per-frame burner and rope mutations.
- [x] Identify missing render provenance.
- [ ] Add model/resource/frame receipts.

## Current path

```txt
buildHotAirBalloon()
  -> allocate complete model directly
  -> set userData.modelReady = true
  -> set userData.persistentGpuResources = true
  -> add to live scene
  -> animate burner and rope buffers
  -> render
```

## Gap

`persistentGpuResources` is metadata, not ownership. The root object exposes no resource inventory or `dispose()` service. The frame does not cite a model ID, profile fingerprint, assembly revision, resource fingerprint or rope-buffer revision.

## Required frame proof

```txt
CommittedBalloonModel
  modelId
  modelRevision
  profileFingerprint
  attachmentFingerprint
  resourceFingerprint

RenderFramePlan
  balloonModelRevision
  dynamicRiggingRevision
  burnerStateRevision

BalloonFrameAck
  renderFrameId
  visibleModelId
  visibleResourceFingerprint
  requiredConsumerAcknowledgements
```

## Failure cases to cover

```txt
partial build allocation
cancelled initial load
profile mismatch between shell and attachments
stale candidate after restart
double disposal
rope update after model retirement
frame rendered from predecessor after replacement commit
```
