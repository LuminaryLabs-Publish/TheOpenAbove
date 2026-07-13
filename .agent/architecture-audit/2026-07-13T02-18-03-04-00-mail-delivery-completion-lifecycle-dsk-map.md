# Architecture Audit: Mail Delivery Completion Lifecycle DSK Map

**Timestamp:** `2026-07-13T02-18-03-04-00`

## Summary

The current mail domain owns route content, one parcel, town visuals, delivery-volume sampling, mutation, snapshot and a direct reset helper. It does not own the aggregate lifecycle after delivery is accepted.

## Current ownership

```txt
mail-route-kit
  -> route ID
  -> one parcel definition
  -> three town definitions
  -> correct airstream ID

mail-parcel-kit
  -> mutable parcel fields
  -> direct reset helper

mail-delivery-domain
  -> compose route, parcel, towns and visuals
  -> update delivery progress
  -> expose snapshot/reset/dispose

delivery-progress-kit
  -> remember selected current
  -> sample destination volume
  -> mutate parcel to delivered
  -> return one event

browser host
  -> copy event message into simulation state for one frame
  -> no mission transition
```

## Missing parent domain

```txt
open-above-mail-delivery-completion-lifecycle-authority-domain
```

The parent domain should coordinate existing kits rather than moving their local responsibilities.

## Bounded ownership

### Existing kits retain

```txt
mail-route-kit
  authored route, town and parcel content

mail-parcel-kit
  parcel value construction and low-level candidate reset

delivery-volume-kit
  geometric evidence only

delivery-progress-kit
  local progress observation only

mail-town-kit
  Three.js town and marker implementation only

parchment-map-overlay-kit
  2D projection implementation only
```

### Completion authority owns

```txt
delivery command identity
delivery attempt identity
runtime, route, parcel and mission revisions
expected-predecessor admission
delivery evidence validation
exactly-once completion result
parcel lifecycle phase
route progress and campaign progress
next-parcel, route-complete and campaign-complete policy
completion message lifetime
destination-marker retirement intent
reset/replay command admission
bounded completion journal
telemetry, map, town and public-readback receipts
first visible completion frame acknowledgement
```

## Candidate kit graph

```txt
open-above-mail-delivery-completion-lifecycle-authority-domain
  |
  +-- open-above-delivery-command-envelope-kit
  +-- open-above-delivery-attempt-identity-kit
  +-- open-above-delivery-evidence-kit
  +-- open-above-delivery-admission-kit
  +-- open-above-delivery-result-kit
  +-- open-above-mail-mission-revision-kit
  +-- open-above-parcel-lifecycle-state-kit
  +-- open-above-mail-route-progress-kit
  +-- open-above-mail-continuation-policy-kit
  +-- open-above-next-parcel-selection-kit
  +-- open-above-route-completion-kit
  +-- open-above-campaign-completion-kit
  +-- open-above-delivery-message-projection-kit
  +-- open-above-destination-marker-retirement-kit
  +-- open-above-delivery-telemetry-receipt-kit
  +-- open-above-delivery-public-readback-kit
  +-- open-above-delivery-reset-command-kit
  +-- open-above-delivery-journal-kit
  +-- open-above-first-delivery-frame-ack-kit
  +-- open-above-delivery-completion-fixture-gate-kit
```

## Required command

```js
{
  kind: "CompleteDeliveryCommand",
  commandId,
  deliveryAttemptId,
  runtimeSessionId,
  expectedMissionRevision,
  routeId,
  parcelId,
  destinationTownId,
  evidence: {
    position,
    deliveryVolume,
    selectedAirstreamId,
    sampledAtTick
  }
}
```

## Required result

```js
{
  kind: "DeliveryCompletionResult",
  commandId,
  deliveryAttemptId,
  runtimeSessionId,
  predecessorMissionRevision,
  missionRevision,
  routeId,
  parcelId,
  destinationTownId,
  status,
  reason,
  parcelPhase,
  continuation: {
    kind: "next-parcel" | "route-complete" | "campaign-complete",
    nextParcelId: null,
    nextRouteId: null
  },
  completionMessage,
  projectionRevision,
  telemetryReceiptId,
  visibleFrameId: null
}
```

## Admission rules

```txt
reject stale runtime session
reject stale mission revision
reject route/parcel/destination mismatch
reject non-finite evidence
reject outside-volume evidence
reject wrong-current evidence when required by route policy
return prior result for the same accepted command ID
return already-completed result for the same parcel revision
commit parcel and mission progression atomically
never invoke direct reset as an implicit continuation
```

## Commit sequence

```txt
observe delivery candidate
  -> create command and immutable evidence
  -> validate predecessor and content identity
  -> validate geometric/current policy
  -> prepare successor parcel and mission state
  -> prepare completion message and projections
  -> atomically commit successor mission revision
  -> publish typed terminal result
  -> project map/town/telemetry/public readback
  -> render
  -> acknowledge first matching visible frame
```

## Dependency order

```txt
1. mission and parcel lifecycle schema
2. command/result identity
3. admission and exactly-once result cache
4. continuation policy
5. map/town/message projection adapters
6. telemetry/public-readback receipts
7. reset/replay command
8. first visible frame acknowledgement
9. pure/browser/build/Pages fixtures
```

## Non-goals

```txt
do not move geometry into gameplay authority
do not let map or Three.js marker state decide mission truth
do not use simulation.message as the mission aggregate
do not infer completion from one transient event alone
do not auto-reset the parcel without a typed command/result
```

## Proof boundary

This file defines the DSK boundary only. No completion lifecycle is implemented or executed.