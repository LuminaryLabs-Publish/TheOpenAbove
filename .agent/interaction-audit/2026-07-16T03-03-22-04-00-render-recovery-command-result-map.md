# Interaction Audit: Render-Recovery Command and Result Map

**Timestamp:** `2026-07-16T03-03-22-04-00`

## Summary

Browser context events currently have no typed admission path. Recovery needs stable identities and results so old callbacks, resources, and acknowledgements cannot affect the replacement renderer generation.

## Plan ledger

**Goal:** define every command and result between browser loss evidence, gameplay policy, resource reconstruction, visible recovery, and fallback.

- [x] Identify browser evidence sources.
- [x] Define loss, restoration, reconstruction, verification, fallback, and frame acknowledgement results.
- [x] Bind all work to document, runtime, renderer, context, and resource generations.
- [ ] Implement command dispatch and stale-work rejection.
- [ ] Execute duplicate, late, repeated, timeout, and retirement fixtures.

## Command map

```txt
WebGLContextLossEvidence
  -> RenderRecoveryAdmissionCommand
     documentRevision
     runtimeGeneration
     rendererGeneration
     contextGeneration
     resourceManifestRevision
     eventId
     observedAt

RenderRecoveryAdmissionCommand
  -> RenderLossResult
     accepted | duplicate | stale | retired | unsupported
     presentationPolicy
     simulationPolicy
     recoveryDeadline

WebGLContextRestoredEvidence
  -> RenderReconstructionCommand
     acceptedLossGeneration
     replacementRendererGeneration
     orderedResourceManifest

RenderReconstructionCommand
  -> ResourceRehydrationResult[]
  -> RenderRecoveryResult
     recovered | failed | timedOut | superseded | fallback

RenderRecoveryResult(recovered)
  -> PresentRecoveredFrameCommand
  -> FirstRecoveredFrameAck

RenderRecoveryResult(failed|timedOut)
  -> RenderFallbackProjectionCommand
  -> RenderFallbackResult
```

## Rejection rules

```txt
wrong document or runtime generation -> stale
loss for retired renderer generation -> retired
duplicate loss event -> duplicate
restoration without accepted loss -> rejected
late resource result from old generation -> stale
frame ack before full manifest verification -> rejected
recovery after deadline -> timedOut
repeated loss beyond budget -> fallback
```

## Lifecycle settlement

Page hide, route replacement, runtime replacement, explicit disposal, and unrecoverable loss must retire event listeners, pending reconstruction work, RAF ownership, resource callbacks, and fallback controls for the old generation.

## Boundary

Documentation only; no command or result exists at runtime yet.