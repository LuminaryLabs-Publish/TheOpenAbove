# Interaction Audit: Delivery Event, Result and Continuation Map

**Timestamp:** `2026-07-13T02-18-03-04-00`

## Current map

```txt
position enters delivery volume
  -> updateDeliveryProgress mutates parcel
  -> returns transient mail-delivered object
  -> host copies message into simulation state
  -> render
  -> next simulation update overwrites message
```

There is no command/result boundary between geometric evidence and accepted mission progression.

## Required map

```txt
delivery candidate observation
  -> DeliveryAttemptCommand
  -> validate runtime, mission, route, parcel and evidence
  -> commit parcel and mission successor
  -> DeliveryCompletionResult
  -> project message, map, town marker and telemetry
  -> choose next parcel, route-complete or campaign-complete
  -> first visible completion frame acknowledgement
```

## Identity chain

```txt
runtimeSessionId
missionRevision
commandId
deliveryAttemptId
routeId
parcelId
destinationTownId
evidenceRevision
deliveryResultId
projectionRevision
visibleFrameId
```

## Result vocabulary

```txt
accepted
already-completed
duplicate
stale-session
stale-mission
route-mismatch
parcel-mismatch
destination-mismatch
outside-volume
wrong-current
invalid-evidence
continuation-unavailable
projection-failed
failed
```

## Continuation vocabulary

```txt
next-parcel
route-complete
next-route
campaign-complete
replay-available
reset-required
```

## Consumer receipts

```txt
mail aggregate receipt
flight-message receipt
map projection receipt
Three.js town-marker receipt
telemetry receipt
public GameHost readback receipt
visible-frame receipt
```

A consumer failure must not rewrite the accepted mission result. It must produce a separate projection failure and preserve the committed aggregate.

## Timing rules

```txt
do not derive completion identity from RAF frame number alone
do not let the next simulation update erase an unacknowledged completion message
do not advance to the next parcel before the accepted result is committed
do not keep a delivered destination visually active unless policy says so
do not reuse a transient event object as a replay record
do not invoke reset as an implicit continuation
```

## Fixture map

```txt
candidate -> accepted result -> first visible frame
same candidate -> same prior result
stale candidate -> zero mutation
accepted result -> map and town marker retirement
accepted result -> durable message projection
accepted result -> next parcel projection
last parcel -> route complete
last route -> campaign complete
projection failure -> aggregate remains committed
```

## Non-claim

The current `mail-delivered` object is a local mutation signal, not a complete interaction result.