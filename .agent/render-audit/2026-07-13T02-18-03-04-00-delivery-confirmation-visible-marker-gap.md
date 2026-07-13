# Render Audit: Delivery Confirmation and Destination Marker Gap

**Timestamp:** `2026-07-13T02-18-03-04-00`

## Summary

A committed parcel delivery does not produce one stable, revisioned visual result. The delivery message survives only until the next simulation update, while the map and Three.js town marker continue to present the delivered town as the active destination.

## Current render path

```txt
mail-delivered event
  -> main copies parcel.message into simulation.state.message
  -> visual update and telemetry tick
  -> render one frame

next frame
  -> simulation.update replaces state.message
  -> mail.update returns null
  -> map reads unchanged destinationTownId
  -> town visuals read unchanged destinationTownId
  -> delivered destination remains highlighted
```

## Source-backed gaps

### Confirmation message has no projection lifetime

`simulation.state.message` is owned by flight simulation and rewritten every update. It is not a durable mission-message projection and has no message ID, mission revision, priority, acknowledgement or expiration policy.

### Map marker does not consume parcel phase

The parchment map computes the active town from `getParcel()?.destinationTownId`. It does not inspect `parcel.delivered` or a mission phase. The label `MAIL DESTINATION` therefore remains after completion.

### Three.js marker does not consume parcel phase

`createMailTownVisuals().update()` receives only `destinationTownId`. The destination envelope and ring continue pulsing after delivery because the active predicate is `townId === destinationTownId`.

### No visible-frame provenance

There is no result that connects:

```txt
delivery attempt
mission revision
parcel phase
message projection
map projection
town-marker projection
telemetry revision
rendered frame
```

## Required render contract

```txt
DeliveryCompletionResult
  -> completion projection adapter
  -> message projection with explicit lifetime
  -> map destination retirement or successor destination
  -> town-marker retirement or successor emphasis
  -> telemetry/public readback projection
  -> render frame
  -> FirstDeliveryCompletionFrameAck
```

## Required projection snapshot

```js
{
  runtimeSessionId,
  missionRevision,
  projectionRevision,
  parcelId,
  parcelPhase: "delivered",
  continuationKind,
  destinationTownId,
  activeDestinationTownId,
  completionMessage: {
    id,
    text,
    priority,
    expiresAfterAcknowledgement: false
  },
  mapMarkerState,
  townMarkerState
}
```

## Fixture matrix

```txt
first delivery frame shows committed confirmation
next frame preserves confirmation under policy
map removes delivered destination marker
Three.js town marker stops active pulse
next parcel atomically replaces destination markers
route-complete frame has no stale destination
campaign-complete frame has no stale destination
stale completion result cannot alter projection
first visible frame cites mission and projection revisions
source/build/Pages projections agree
```

## Non-claim

The current source proves a one-frame message assignment and persistent destination ID only. It does not prove durable confirmation, marker retirement, successor projection or visible-frame coherence.