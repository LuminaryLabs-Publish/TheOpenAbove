# Gameplay Audit: Flight State to Map Navigation Loop

**Timestamp:** `2026-07-12T09-02-10-04-00`

## Plan ledger

**Goal:** ensure gameplay position, travel direction, current capture and parcel destination project into one trustworthy navigation state.

- [x] Trace simulation state production.
- [x] Trace airstream and mail route sources.
- [x] Trace map reads and draw-time derivation.
- [x] Identify cross-domain mismatches.
- [ ] Implement a committed navigation observation.
- [ ] Prove mission guidance and map geometry agree.

## Gameplay-to-map loop

```txt
simulation update
  -> sample airstream
  -> update wind and steering
  -> set heading from wind
  -> integrate velocity and position

airstream domain
  -> expose all routes
  -> track active route and capture state

mail domain
  -> expose towns
  -> expose parcel destination
  -> retain correct airstream ID

map overlay
  -> receives routes and towns once
  -> reads live player state and parcel per draw
  -> highlights destination town
  -> does not receive or project active route state
  -> does not receive or project correct airstream ID
  -> rotates player marker with an incompatible angle convention
```

## Gameplay consequence

The map can correctly place the balloon while showing its nose in the opposite direction. It also shows all currents with equal dashed treatment, even though gameplay knows both the currently captured route and the route required for the parcel.

```txt
player may steer toward the arrow
  -> arrow indicates opposite travel
  -> route capture state remains visually undisclosed
  -> destination town is highlighted but its required current is not
```

## Missing committed navigation state

```txt
missionEpoch
simulationStepId
positionRevision
bearingRevision
activeRouteId
correctRouteId
destinationTownId
routeCaptureState
projectionRevision
visibleMapFrameId
```

The overlay reads mutable owners independently during its own RAF. It does not consume one committed cross-domain navigation observation.

## Required gameplay projection

```txt
CommittedMapNavigationObservation
  missionEpoch
  simulationStepId
  position
  horizontalVelocity
  canonicalBearing
  activeRouteId
  routeCaptureState
  correctRouteId
  destinationTownId
  parcelStatus
  worldBoundsRevision
  contentRevision
```

## Required invariants

```txt
map bearing matches the committed gameplay movement vector
map active-route style matches airstream capture state
map destination-route style matches mail correctAirstreamId
map destination town matches parcel destinationTownId
one map frame consumes one observation revision
reset/restart retires predecessor navigation observations
stale mission epochs cannot project
```

## Required fixtures

```txt
fixture:north-east-south-west-bearing
fixture:steering-bearing-continuity
fixture:active-route-style
fixture:correct-route-destination-parity
fixture:parcel-reset-navigation-retirement
fixture:mission-epoch-stale-map-rejection
fixture:map-frame-navigation-revision
```

Documentation only. Gameplay behavior was not changed.