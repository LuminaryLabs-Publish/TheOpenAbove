# Architecture Audit: Public Host Capability Authority DSK Map

**Timestamp:** `2026-07-12T02-29-50-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

## Summary

The browser-global host is currently a second control plane. It exposes the authoritative owners used by simulation, mission, camera, rendering and lifecycle code instead of exposing detached observations and admitted commands.

## Existing ownership graph

```txt
src/main.js
  -> visual owner
     -> scene
     -> camera
     -> renderer
     -> composer
     -> resolution
     -> terrain/grass/water/atmosphere owners
  -> balloon Three object
  -> simulation owner and mutable state
  -> airstream owner and mutable state
  -> mail owner, parcel and mutable state
  -> camera rig owner and mutable state
  -> balloon presentation owner and mutable state
  -> Nexus telemetry engine
  -> recursive RAF

window.GameHost
  -> direct references to all owners above
```

## Missing boundary

```txt
public caller
  -> no capability descriptor
  -> no command envelope
  -> no command ID
  -> no expected session or mission epoch
  -> no expected frame/presentation revision
  -> no finite-value validation
  -> no duplicate/stale rejection
  -> no typed result
  -> no committed-frame read model
```

## Required parent domain

```txt
open-above-public-host-capability-authority-domain
```

### Identity and capability kits

```txt
open-above-host-session-identity-kit
open-above-host-capability-descriptor-kit
open-above-host-read-capability-kit
open-above-host-command-capability-kit
open-above-host-owner-handle-quarantine-kit
```

### Command admission kits

```txt
open-above-host-command-envelope-kit
open-above-host-command-id-kit
open-above-host-command-admission-kit
open-above-host-session-epoch-fence-kit
open-above-host-mission-epoch-fence-kit
open-above-host-frame-revision-fence-kit
open-above-host-finite-value-policy-kit
open-above-host-command-result-kit
```

### Observation kits

```txt
open-above-host-committed-read-model-kit
open-above-host-state-fingerprint-kit
open-above-host-frame-provenance-kit
open-above-host-observation-journal-kit
```

### Compatibility and proof kits

```txt
open-above-legacy-gamehost-compatibility-adapter-kit
open-above-host-owner-isolation-fixture-kit
open-above-host-command-admission-fixture-kit
open-above-host-read-model-coherence-fixture-kit
```

## Ownership rule

Existing subsystem domains remain authoritative:

```txt
simulation owner      -> simulation state and fixed-step advancement
mail owner            -> parcel and delivery transition
camera owner          -> zoom and camera transform
visual owner          -> update, render, resize and resource disposal
runtime session       -> lifecycle and callback ownership
committed observation -> public read model and frame provenance
```

The public-host domain owns only capability description, command admission/routing and immutable observation publication. It must not duplicate gameplay, mission, camera or rendering rules.

## Intended public API

```txt
window.GameHost = Object.freeze({
  version,
  sessionId,
  capabilities,
  getCommittedState,
  getJournal,
  submit
})
```

`getCommittedState()` returns a detached immutable record with:

```txt
sessionId
missionEpoch
simulationTickId
renderFrameId
stateFingerprint
balloon
mail
airstream
camera
visual
modelProfileReceipt
```

`submit(command)` accepts a bounded command envelope and returns one typed result:

```txt
Applied
RejectedCapability
RejectedInvalid
RejectedStaleSession
RejectedStaleMission
RejectedStaleFrame
RejectedDuplicate
Failed
```

## Dependency order

```txt
runtime session identity
  -> mission and frame epochs
  -> subsystem command services
  -> committed observation frame
  -> public host capability gateway
  -> legacy compatibility adapter
  -> browser and Pages fixtures
```

## Invariants

```txt
no live owner reference crosses the public boundary
read records are detached and immutable
commands route to one existing authoritative owner
rejected commands perform zero mutation
numeric commands reject NaN and infinity
one command ID commits at most once
stale session, mission or frame revisions are rejected
public read state identifies one committed visible frame
capabilities are revoked on stop, failure, reset and disposal
```