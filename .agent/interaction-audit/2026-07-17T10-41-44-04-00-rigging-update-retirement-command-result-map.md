# Interaction Audit: Rigging Update and Retirement Command/Result Map

**Timestamp:** `2026-07-17T10-41-44-04-00`

## Current implicit flow

```txt
animateHotAirBalloon(balloon, time, burnerHeat, flightState)
  -> derive tension
  -> animateRigging(rigging, time, tension)
  -> updateSoftRope(rope, start, end, time)
  -> mutate BufferAttributes
```

The functions return no typed update, budget, stale-rejection, resource, retirement, or frame result.

## Proposed flow

```txt
RiggingResourceAdmissionCommand
  -> RiggingResourceAdmissionResult

RiggingFrameUpdateCommand
  -> RiggingFrameUpdateResult
  -> RiggingFrameBudgetResult

RiggingResourceRetirementCommand
  -> RiggingResourceRetirementResult

RiggingFrameCommitCommand
  -> RiggingFrameDigest
  -> FirstRiggingBoundFrameAck
```

## Required identities

```txt
HostSessionId
RouteRevision
BalloonModelGeneration
RiggingGeneration
RopeGeneration
SimulationRevision
TensionRevision
RiggingFramePlanRevision
RopeBufferRevision
RenderFrameId
```

## Rejection reasons

```txt
stale-host-session
stale-route
stale-balloon-model
stale-rigging-generation
retired-rope
invalid-topology
missing-resource-manifest
budget-not-admitted
already-retired
```

## Boundary

The runtime currently mutates live Three.js objects directly. This file documents a proposed interaction contract only.