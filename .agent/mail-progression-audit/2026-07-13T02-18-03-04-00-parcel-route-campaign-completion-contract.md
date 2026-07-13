# Mail Progression Audit: Parcel, Route and Campaign Completion Contract

**Timestamp:** `2026-07-13T02-18-03-04-00`

## Summary

The source contains mail content and a one-shot parcel-delivery mutation, but it does not contain a mail progression aggregate. The missing aggregate must own the relationship between parcels, routes, campaign phases and continuation policy.

## Current content contract

```txt
route: meadow-mail-run
parcel: parcel-001
parcel destination: brookhaven
correct current: meadow-to-brookhaven
available towns: brookhaven, sunvale, cloudmere
```

The other two towns and routes are visible world content, not configured successor missions.

## Required campaign manifest

```js
{
  id: "open-above-air-mail-campaign-1",
  version: 1,
  routes: [
    {
      id,
      parcels: [
        {
          id,
          destinationTownId,
          requiredAirstreamId,
          completionPolicy
        }
      ],
      successorRouteId
    }
  ]
}
```

## Required aggregate state

```js
{
  runtimeSessionId,
  campaignId,
  campaignRevision,
  activeRouteId,
  routeRevision,
  activeParcelId,
  parcelRevision,
  parcelPhase,
  completedParcelIds,
  completedRouteIds,
  continuationKind,
  terminal
}
```

## Invariants

```txt
active parcel belongs to active route
active destination exists in town registry
required current exists in airstream registry
one parcel has one terminal completion result
completed parcel cannot return to in-transit without reset/replay command
next parcel cannot activate before predecessor completion commit
route completes only when its parcel policy is satisfied
campaign completes only when its route policy is satisfied
map and town markers derive from committed aggregate projection
```

## Reset and replay contract

```txt
ResetMailCampaignCommand
  -> expected campaign revision
  -> explicit reset generation
  -> detached initial candidate
  -> atomic install
  -> ResetMailCampaignResult
  -> first reset frame acknowledgement

ReplayMailCampaignCommand
  -> immutable command/result journal
  -> deterministic manifest identity
  -> deterministic transition order
  -> replay verification result
```

Directly calling `resetMailParcel()` is insufficient because it does not own campaign, route, marker, message, telemetry or persistence state.

## Persistence relationship

The previously audited flight-session persistence authority should persist the committed mail progression aggregate. Persistence must not invent progression semantics.

```txt
mail progression authority
  -> owns live mission truth

flight-session persistence authority
  -> stores/restores an admitted progression snapshot
```

## Required proof

```txt
manifest validation
parcel/route/town/current reference validation
exactly-once completion
next-parcel activation
route completion
campaign completion
reset generation
replay determinism
map/town/message projection parity
save/restore of completed and active progression
first visible transition frame
```

## Non-claim

Three authored towns do not prove a three-stop campaign. Only Brookhaven is part of the current active mail route definition.