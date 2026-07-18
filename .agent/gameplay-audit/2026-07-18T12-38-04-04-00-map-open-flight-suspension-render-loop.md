# Gameplay Audit: Map-Open Flight Suspension and Render Loop

**Timestamp:** `2026-07-18T12-38-04-04-00`  
**Status:** `map-open-dual-surface-render-work-budget-authority-audited`

## Summary

The map correctly suspends active flight simulation. Burner, vent, steering, wind-particle updates, camera progression, capture evaluation and engine ticking do not advance through the Meadow Lift update path while the map is open. Presentation does continue on both the 3D and parchment surfaces.

## Interaction loop

```txt
player presses M
  -> map overlay opens
  -> Journey reads navigation.isMapOpen() as true
  -> Journey status becomes map
  -> Journey skips update()
  -> Journey calls Experience.render(dt=0)
  -> map overlay RAF redraws map

player presses M or Escape
  -> map overlay closes
  -> map RAF is cancelled
  -> Journey resumes update on the next frame
```

## Gameplay strengths

- map-open state freezes elapsed flight time;
- Balloon Simulation is not advanced through the scene update path;
- no new sightseeing capture is evaluated through the scene update path;
- map state is visible in Journey snapshots;
- close returns to the same retained flight state;
- map keyboard behavior suppresses repeat toggles;
- map and Journey disposal paths are explicit.

## Gameplay/presentation gap

The gameplay pause policy and presentation policy are not settled together. A paused map state currently implies:

```txt
simulation cadence: zero
main 3D render cadence: primary RAF cadence
map redraw cadence: independent RAF cadence
```

That may be visually desirable, but it is not an explicit product result. The runtime has no result that says whether the world behind the translucent map is live, reduced, frozen or suspended, and no receipt that the map markers correspond to the retained gameplay state.

## Required gameplay result

```txt
MapOpenGameplayCommand
  -> freeze accepted flight generation
  -> publish retained player/capture/world revisions
  -> select presentation policy
  -> publish MapOpenGameplayResult

MapCloseGameplayCommand
  -> retire map-open generation
  -> restore accepted flight progression once
  -> publish MapCloseGameplayResult
```

## Proof required

- repeated open/close preserves identical flight state;
- elapsed time does not advance while open;
- no burner, vent, steering or shutter action mutates gameplay while open;
- player marker and capture completion match retained state;
- no duplicate RAF lease survives close;
- resumed frame uses one accepted dt boundary;
- map and flight surfaces expose matching generation diagnostics.

## Claim boundary

No gameplay defect was reproduced. The identified gap is explicit convergence between gameplay suspension and the two continuing presentation paths.