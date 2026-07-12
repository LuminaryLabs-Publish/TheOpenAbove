# Host Capability Audit: Owner Quarantine, Read Model and Command Contract

**Timestamp:** `2026-07-12T02-29-50-04-00`

## Purpose

Replace the legacy raw-owner `window.GameHost` with a stable public boundary suitable for diagnostics, automation and future editor integration without creating a second runtime authority.

## Public contract

```txt
window.GameHost = Object.freeze({
  version: "1",
  sessionId,
  capabilities,
  getCommittedState(),
  getJournal(options),
  submit(command)
})
```

## Owner quarantine

The following values never cross the public boundary:

```txt
NexusEngine module
THREE module
Nexus engine instance
THREE.Scene
WebGLRenderer
PerspectiveCamera
balloon Object3D
visual domain
simulation domain and state
airstream field/domain and state
mail parcel/domain and state
camera rig and state
balloon presentation domain and material kits
```

Compatibility code may translate legacy read requests, but it must not restore raw owner references.

## Capability descriptor

Each capability declares:

```txt
id
kind: read | command
version
payloadSchema
requiredSessionState
requiredMissionState
requiresMissionEpoch
requiresFrameRevision
resultSchema
rateLimit or budget
```

## Command contract

```txt
HostCommandEnvelope
  commandId
  capabilityId
  expectedSessionId
  expectedMissionEpoch
  expectedFrameRevision
  payload
```

Admission order:

```txt
1. validate envelope shape
2. resolve capability
3. verify active runtime session
4. verify mission epoch and frame revision when required
5. reject duplicate command ID
6. validate finite bounded payload
7. route to the authoritative subsystem service
8. capture typed subsystem result
9. publish HostCommandResult
10. append bounded journal row
11. attach later committed-frame acknowledgement when required
```

## Command result

```txt
HostCommandResult
  commandId
  capabilityId
  status
  sessionId
  missionEpoch
  acceptedAtSimulationTickId
  committedAtSimulationTickId
  acknowledgedAtRenderFrameId
  stateFingerprint
  detail
```

## Committed read model

```txt
HostCommittedState
  schemaVersion
  sessionId
  missionEpoch
  simulationTickId
  renderFrameId
  stateFingerprint
  balloon snapshot
  airstream snapshot
  mail snapshot
  camera snapshot
  visual snapshot
  model/profile receipt
  last acknowledged command results
```

Every nested value is serializable, detached and immutable. No method-bearing or GPU-backed object is included.

## Journal policy

```txt
bounded capacity
monotonic sequence
command admission result
subsystem result
frame acknowledgement
redacted error detail
session and mission provenance
no raw owner or object graph serialization
```

## Revocation

```txt
fatal startup
runtime stop
runtime replacement
mission reset
page hide/disposal when session ends
```

These transitions revoke earlier capability leases. Stale commands must not mutate state.

## Required proof matrix

```txt
raw owner keys absent
read model mutation cannot affect runtime
non-finite camera payload rejected
out-of-band simulation command unavailable
mail bypass command unavailable
stale session rejected
stale mission rejected
stale frame rejected
duplicate command rejected
one accepted command reaches one owner
result and first matching frame share provenance
capabilities revoked after disposal
Pages host contract matches local build
```

## Completion boundary

The host is not isolated until source and browser fixtures prove absence of raw owners, zero-mutation rejection, single-owner routing and committed-frame read coherence.