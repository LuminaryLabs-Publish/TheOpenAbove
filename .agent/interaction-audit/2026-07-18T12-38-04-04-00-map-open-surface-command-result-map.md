# Interaction Audit: Map-Open Surface Command/Result Map

**Timestamp:** `2026-07-18T12-38-04-04-00`  
**Status:** `map-open-dual-surface-render-work-budget-authority-audited`

## Current interaction path

```txt
KeyM
  -> parchment onKeyDown
  -> setOpen(!open)
  -> DOM class and aria-hidden update
  -> cancel prior map RAF handle
  -> resize and refresh map
  -> schedule map RAF when opening

Escape while open
  -> setOpen(false)
  -> DOM class and aria-hidden update
  -> cancel map RAF

Journey frame
  -> navigation.isMapOpen()
  -> update suppressed when open
  -> main Experience render remains active
```

## Current result surface

`setOpen()` returns only a boolean. Navigation snapshot returns:

```txt
open
mappedWorld
worldRevision
```

It does not return a map-open generation, accepted background policy, redraw reason, RAF lease identity, combined surface budget or visible-frame acknowledgement.

## Required command/result map

```txt
MapOpenCommand
  input:
    HostSessionId
    JourneyGeneration
    NavigationGeneration
    WorldRevision
    CaptureRevision
    PlayerPoseRevision
    ViewportRevision
  result:
    MapOpenGenerationResult

MapSurfacePlanCommand
  input:
    MapOpenGeneration
    overlay opacity and transition policy
    device and quality evidence
  result:
    MapSurfacePlanResult
    background policy
    background cadence
    map redraw policy

MapRedrawAdmissionCommand
  input:
    open/transition dirty flag
    world dirty flag
    capture dirty flag
    player dirty flag
    viewport dirty flag
  result:
    admitted | unchanged | stale | retired
    MapRedrawAdmissionResult

MapCloseCommand
  input:
    MapOpenGeneration
  result:
    cancelled RAF leases
    retired dirty state
    MapCloseResult

MapProjectionCommitCommand
  result:
    MapSurfaceDigest
    FirstMapBoundFrameAck
```

## Required interaction guarantees

- Key repeat cannot create additional map generations.
- Repeated `setOpen(true)` cannot create duplicate RAF leases.
- Close cancels every map-specific callback before return.
- Dirty evidence from an older generation is rejected.
- Resize while closed updates dimensions without starting a map loop.
- Resize while open admits exactly the required redraw.
- Escape closes the same accepted map generation.
- Player, Snap Point and completion projection use accepted revisions.
- The main background policy is visible in diagnostics.

## Claim boundary

The current key handling and cancellation code is present. Executable duplicate-loop, stale-work, resize and matching-frame fixtures are absent.