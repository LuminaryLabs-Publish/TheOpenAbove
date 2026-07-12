# Interaction Audit: Frame Failure Admission and Result Map

**Timestamp:** `2026-07-12T04:00:32-04:00`

## Current path

```txt
browser callback enters frame(now)
  -> no frame command/envelope
  -> no stage admission
  -> direct owner mutation
  -> exception escapes callback
  -> browser reports an uncaught error
  -> product publishes no result
```

## Required result map

```txt
FrameAttemptAccepted
  frameId
  sessionId
  missionEpoch
  inputSequence
  immutableInputFingerprint

FrameStageApplied
  frameId
  stageId
  stageSequence
  outputFingerprint

FrameStageSkipped
  frameId
  stageId
  reason

FrameStageFailed
  failureId
  frameId
  stageId
  classification
  errorFingerprint
  lastKnownGoodFrameId

FrameFailureContained
  failureId
  callbacksCancelled
  capabilitiesRevoked
  renderFrozen
  disposalPlanId

FrameFailureTerminal
  failureId
  disposalResults
  terminalObservationRevision
  restartCapability
```

## Admission rules

```txt
reject a frame for a stopped or failed session
reject predecessor-session callbacks
reject duplicate frame IDs
reject out-of-order stage execution
stop admission after first terminal stage result
never schedule a successor from a failed frame
never expose a failed frame as committed
```

## Error classification

```txt
RecoverableContextLoss
RecoverableTransientVisualFailure
TerminalSimulationFailure
TerminalMissionFailure
TerminalPresentationFailure
TerminalRendererFailure
TerminalHudFailure
TerminalUnknownFailure
```

Classification must drive policy, not silently swallow the exception.

## Required observation

```txt
failureId
sessionId
missionEpoch
frameId
failedStageId
completedStages
lastKnownGoodFrameId
lastKnownGoodStateFingerprint
canvasRevision
hudRevision
capabilityRevision
disposalStatus
restartStatus
```

## Proof

Each injected stage failure must produce one and only one terminal result, zero later-stage mutations, no successor RAF, a coherent last-known-good observation and a fresh-session restart path.

Documentation only. No interaction or error handling changed.