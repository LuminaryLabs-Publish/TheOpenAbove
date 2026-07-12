# Render Audit: Model Profile Visible-Frame Provenance Gap

Timestamp: `2026-07-12T00-39-05-04-00`

## Goal

Require each committed balloon frame to identify the exact admitted profile and model generation rendered.

## Current path

```txt
async model build
  -> balloon.userData.modelReady = true
  -> balloon.userData.loadedDuringLevelSetup = true
  -> balloon.userData.persistentGpuResources = true
  -> add to live scene
  -> render
```

`getSnapshot().model` projects only those booleans. It does not expose profile identity, schema version, fingerprint, load generation, resource generation, model commit ID or frame acknowledgement.

## Gap

Two model builds can both report `ready: true` while being produced from different mutations of the same public default profile. A screenshot or GameHost snapshot cannot prove which profile was visible.

## Required frame contract

```txt
BalloonModelProfileReceipt {
  runtimeSessionId
  missionEpoch
  modelId
  modelGeneration
  profileId
  profileSchemaVersion
  profileRevision
  profileFingerprint
  resourceInventoryRevision
  commitRevision
}

BalloonVisibleFrameReceipt {
  renderFrameId
  modelGeneration
  profileFingerprint
  cameraRevision
  presentationRevision
  presentedAt
}
```

## Required checks

```txt
first rendered frame cites installed model generation
frame profile fingerprint equals model receipt fingerprint
stale model generation never reaches the scene
GameHost returns clone-safe receipt data
restart replaces prior model/frame provenance atomically
Pages output matches local browser provenance
```

## Validation boundary

No runtime render change or browser capture was performed.