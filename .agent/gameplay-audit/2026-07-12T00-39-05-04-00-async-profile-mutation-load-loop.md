# Gameplay Audit: Async Profile Mutation Load Loop

Timestamp: `2026-07-12T00-39-05-04-00`

## Goal

Prevent profile mutation between load request and model construction from changing gameplay-visible balloon state.

## Current loop

```txt
caller or default profile reference
  -> loadHotAirBalloonModel(profile)
  -> requestAnimationFrame yield
  -> profile remains live and mutable
  -> buildHotAirBalloon(profile)
  -> scene install
```

The root default is also reachable through `window.OpenAboveHotAirBalloonObjectKit.profile`.

## Failure examples

```txt
scale changes during yield
  -> visual size differs from request-time intent

basket or rigging profile changes during yield
  -> attachment geometry differs

pattern palette changes during yield
  -> shell colors differ

overlapping loads
  -> later completion can install an obsolete profile generation
```

## Required rule

A load command must capture and freeze the complete profile before the first asynchronous boundary. All later build work must consume only that snapshot.

## Required fixtures

```txt
mutation immediately after load call does not affect build
public default mutation cannot affect admitted build
overlapping generations commit only the newest admitted generation
same canonical profile produces the same fingerprint
changed pattern or geometry produces a different fingerprint
restart retires predecessor model/profile state
```

## Validation boundary

Documentation only. No gameplay or model construction behavior changed.