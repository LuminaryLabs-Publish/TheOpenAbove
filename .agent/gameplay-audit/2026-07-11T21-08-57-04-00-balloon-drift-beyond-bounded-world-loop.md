# Gameplay Audit: Balloon Drift Beyond the Bounded World

**Timestamp:** `2026-07-11T21-08-57-04-00`

## Summary

The balloon simulation uses the bounded terrain sampler for vertical clearance but has no horizontal world-membership policy. Ambient wind and airstream velocity can therefore carry the balloon outside the disk while the simulation continues normally and the terrain renderer removes unsupported chunks.

## Current loop

```txt
held burner/vent input
  -> sample airstream or fallback wind
  -> update horizontal and vertical velocity
  -> add velocity to balloon position
  -> sample bounded terrain height
  -> clamp only vertical clearance
  -> update altitude, distance and message
  -> camera follows balloon
  -> terrain and grass stream around camera under different membership rules
```

## Boundary behavior

```txt
inside disk
  terrain height: procedural terrain blended by edge mask
  near/horizon terrain: admitted
  grass: admitted by camera chunk and LOD

outside disk
  terrain height: edgeFloor (-120)
  near/horizon terrain: rejected when bounds no longer intersect
  grass: still eligible and generated at edgeFloor
  balloon: unrestricted horizontal motion
  mission: no explicit out-of-bounds phase or recovery
```

## Missing gameplay authority

```txt
currentWorldSurfaceId
currentSurfaceRevision
inside/edge/outside classification
signed distance to boundary
out-of-bounds command admission
boundary response policy
boundary response result
re-entry plan
route and destination membership validation
mission failure or recovery semantics
stale boundary-result rejection
```

## Candidate policies

The architecture must support one explicit selected policy, not silently choose one:

```txt
soft redirect through wind force
hard movement clamp
world-space wrap
mission recovery teleport
out-of-bounds failure
larger or streamed world-surface replacement
```

## Required transaction

```txt
candidate position
  -> query committed world surface
  -> classify membership and edge distance
  -> admit movement or derive boundary response
  -> apply movement and response atomically
  -> update mission and message state
  -> render matching terrain/grass membership
  -> publish typed simulation and frame receipts
```

## Required fixtures

```txt
fixture:balloon-edge-approach
fixture:balloon-outside-policy
fixture:boundary-reentry
fixture:route-content-inside-surface
fixture:destination-inside-surface
fixture:simulation-render-membership-parity
fixture:boundary-visible-frame
```

## Completion boundary

Do not treat the edge-floor height sample as a complete gameplay boundary. It changes vertical clearance only; it does not define whether horizontal movement, mission continuation, route content or rendering remains valid.