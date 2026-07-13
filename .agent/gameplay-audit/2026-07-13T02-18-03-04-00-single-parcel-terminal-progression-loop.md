# Gameplay Audit: Single-Parcel Terminal Progression Loop

**Timestamp:** `2026-07-13T02-18-03-04-00`

## Summary

The active Air Mail game loop has one parcel and one delivery transition. After delivery, flight continues indefinitely with no authoritative next objective, route completion, campaign completion or replay/reset command.

## Current gameplay loop

```txt
boot
  -> create meadow-mail-run
  -> create parcel-001 for Brookhaven
  -> expose three towns but one active destination

flight
  -> steer, burn and vent
  -> sample current
  -> approach destination volume

completion
  -> parcel becomes delivered exactly once
  -> one event is emitted

post-completion
  -> flight simulation continues
  -> parcel stays delivered
  -> updateDeliveryProgress returns null
  -> destination ID stays Brookhaven
  -> no successor objective is selected
  -> no terminal state is committed
```

## Missing gameplay state

```txt
mission ID
mission revision
parcel queue or mission manifest
active parcel index
route progress
completion count
route-complete state
campaign-complete state
continuation policy
next-parcel selection result
replay/reset admission
completion reward or score result
```

## Reachable outcomes

### Endless delivered state

The player can continue flying after delivery, but there is no new gameplay objective and no explicit completed mode.

### Stale objective projection

The same town remains active in the map and Three.js world even though the parcel is already delivered.

### Direct reset without aggregate policy

A low-level reset helper exists, but invoking it directly would recreate an in-transit parcel without advancing or validating mission state.

### Completion cannot be replayed deterministically

A replay cannot distinguish the accepted delivery attempt, mission successor, continuation decision and first visible completion frame because none has an identity or result.

## Required gameplay aggregate

```js
{
  runtimeSessionId,
  campaignId,
  campaignRevision,
  routeId,
  routeRevision,
  missionId,
  missionRevision,
  activeParcelId,
  parcelPhase,
  deliveredParcelIds,
  continuationKind,
  nextParcelId,
  nextRouteId,
  completed
}
```

## Required transitions

```txt
in-transit
  -> delivery-candidate
  -> delivered
  -> next-parcel | route-complete | campaign-complete

route-complete
  -> next-route | campaign-complete

campaign-complete
  -> replay-command | reset-command | terminal
```

Every transition requires an expected predecessor and a typed result.

## Required fixtures

```txt
one delivery commits once
same command returns same result
stale delivery is rejected without mutation
first parcel advances to configured successor
last parcel completes route
last route completes campaign
completed campaign does not silently revert to in-transit
reset requires explicit command and increments revision
replay reproduces mission transitions
post-completion frame matches aggregate state
```

## Non-claim

The existing one-shot parcel mutation is not evidence of a complete Air Mail progression loop.