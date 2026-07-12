# Interaction Audit: Window GameHost Command Admission Map

**Timestamp:** `2026-07-12T02-29-50-04-00`

## Current interaction map

```txt
browser keyboard
  -> ambient key Set inside simulation
  -> simulation.update during RAF

browser wheel
  -> cameraRig mutable zoom state
  -> cameraRig.update during RAF

window.GameHost
  -> raw owner reference
  -> direct state mutation or method call
  -> no interaction admission
```

The host has no distinction between diagnostics, QA automation and gameplay control. Any script executing in the page receives the same mutable authority as the product host.

## Required command map

```txt
caller
  -> HostCommandEnvelope
  -> capability lookup
  -> session check
  -> mission/frame revision check
  -> schema and finite-value validation
  -> duplicate check
  -> route to one authoritative service
  -> typed HostCommandResult
  -> bounded journal row
  -> optional committed-frame acknowledgement
```

## Command envelope

```txt
{
  commandId,
  capabilityId,
  expectedSessionId,
  expectedMissionEpoch,
  expectedFrameRevision,
  payload
}
```

## Admission outcomes

```txt
Applied
AppliedAwaitingFrame
RejectedCapability
RejectedInvalidPayload
RejectedNonFinite
RejectedStaleSession
RejectedStaleMission
RejectedStaleFrame
RejectedDuplicate
Failed
```

Rejected outcomes must perform zero mutation.

## Read path

```txt
getCommittedState()
  -> read one immutable committed-frame record
  -> deep-copy or frozen structured data only
  -> no Three.js objects
  -> no Sets, Maps, materials, geometries, render targets or subsystem owners
```

## Lease and revocation

Capabilities belong to one runtime session. Stop, fatal startup, mission reset, runtime replacement and disposal revoke predecessor command leases. Commands admitted under an earlier session or mission epoch are rejected.

## Required interaction fixtures

```txt
fixture:host-capability-denied
fixture:host-invalid-payload-zero-mutation
fixture:host-non-finite-camera-command
fixture:host-duplicate-command
fixture:host-stale-session-command
fixture:host-stale-mission-command
fixture:host-stale-frame-command
fixture:host-capability-revocation
fixture:host-read-record-detached
```