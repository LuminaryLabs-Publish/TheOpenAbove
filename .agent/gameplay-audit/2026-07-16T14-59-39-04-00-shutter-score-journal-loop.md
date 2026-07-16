# Gameplay Audit: Shutter, Score and Journal Loop

## Summary

The active experience is now sightseeing rather than Air Mail. The player flies, searches the map for Snap Point regions, enters camera mode, frames a landform and records a scored journal entry.

## Current gameplay loop

```txt
fly with burner, vent and wind-relative steering
  -> open map and locate incomplete Snap Point region
  -> return to flight
  -> press C for camera mode
  -> zoom with wheel
  -> press P or Enter
  -> geometric recognition selects best Snap Point
  -> score and rating settle
  -> capture metadata appended
  -> Snap Point becomes complete
  -> message reports result
  -> map shows completed region
```

## Implemented gameplay services

- Immediate steering within ±15 degrees of sampled horizontal flow.
- Altitude-driven wind/airstream exploration.
- Camera-mode toggle and 1x-4x zoom.
- Landform-derived Snap Points and search radii.
- Facing, distance and zoom scoring.
- Ratings: Not identified, Recognized, Good photo and Postcard.
- Capture history and completed Snap Point set.
- Map regions, labels, completion stamps and next reference card.

## Gameplay authority gap

Completion is accepted from geometric metadata without requiring an image artifact. A capture can therefore complete the journal even though the game owns no photograph for that entry.

```txt
recognized score: sufficient for completion
accepted image artifact: not required
artifact failure state: absent
journal image loading state: absent
capture retry/replace policy: absent
best-photo policy: absent
storage budget: absent
```

## Required gameplay result

`PhotoCaptureResult` must distinguish:

```txt
rejected-not-camera-mode
rejected-map-suspended
rejected-stale-generation
captured-unidentified
captured-recognized
artifact-failed
artifact-retired
journal-projected
```

Snap Point completion should consume an accepted recognized artifact result, not a pre-render heuristic alone.

## Boundary

The current geometric recognition logic may be adequate. This audit only identifies the missing artifact dependency and terminal result model.