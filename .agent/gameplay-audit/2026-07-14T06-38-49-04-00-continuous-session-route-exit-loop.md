# Gameplay Audit: Continuous Session Route Exit Loop

**Timestamp:** `2026-07-14T06-38-49-04-00`

## Plan ledger

**Goal:** prevent flight, delivery, world generation and telemetry from advancing after the owning route has stopped.

- [x] Trace simulation-to-render frame order.
- [x] Trace map-open pause behavior.
- [x] Trace available gameplay disposers.
- [x] Identify the missing stop boundary.
- [ ] Add deterministic stop and stale-callback fixtures.

## Current loop

```txt
frame callback
  -> update balloon simulation
  -> update delivery progress
  -> update airstream state
  -> apply and animate balloon
  -> update presentation and camera
  -> advance world and visual state
  -> tick Nexus Engine telemetry
  -> render
  -> queue next callback
```

Opening the map pauses most simulation work but does not create a terminal session state. Route exit, page teardown or failed replacement has no equivalent guard at all.

## Post-stop invariants

```txt
elapsed does not increase
distance does not increase
parcel state does not change
airstream active route does not change
world generation does not advance
balloon transform does not change
camera does not update
telemetry does not tick
render does not submit
map does not draw
no new RAF is queued
```

## Required gameplay result

```txt
RouteRuntimeRetirementResult
  -> cites final simulation snapshot
  -> cites final parcel and airstream revisions
  -> cites final telemetry frame
  -> proves all gameplay callbacks rejected after stop
  -> remains immutable after successor startup
```

## Risk

Without a route/session generation, a predecessor callback can mutate shared browser-visible objects after a successor route has started, making replay, diagnostics and visible-state proof ambiguous.