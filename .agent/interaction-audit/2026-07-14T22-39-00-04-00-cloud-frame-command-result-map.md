# Interaction Audit: Cloud Frame Command and Result Map

**Timestamp:** `2026-07-14T22-39-00-04-00`

## Plan ledger

**Goal:** define typed command outcomes for resize, quality, weather, history and render failures.

- [x] Identify all command inputs.
- [x] Identify current ambient mutations.
- [x] Define accepted and rejected result classes.
- [ ] Implement command admission.

## Command map

```txt
CloudFrameAdmissionCommand
  inputs:
    FrameId
    renderer generation
    viewport and DPR
    QualityTierRevision
    CloudLodProfileRevision
    WeatherRevision
    CameraRevision
    SceneDepthRevision

  accepted:
    Full
    Reduced
    Impostor
    Disabled

  rejected:
    StaleFrame
    SupersededGeneration
    UnsupportedTarget
    MissingSceneDepth
    InvalidScale
    BudgetExceeded
    RenderFailure

  outputs:
    CloudFrameResult
    target/pass/timing receipts
    fallback reason
    retirement receipts
    FirstVisibleCloudFrameAck
```

## Idempotency

Duplicate frame commands must return the prior result or an explicit duplicate classification. Resizes, DPR changes, quality changes and context recovery must allocate a new renderer generation and retire old targets/history before admission.
