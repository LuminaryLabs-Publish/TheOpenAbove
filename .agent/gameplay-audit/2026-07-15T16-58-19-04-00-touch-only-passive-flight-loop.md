# Gameplay Audit: Touch-Only Passive Flight Loop

**Timestamp:** `2026-07-15T16-58-19-04-00`  
**Status:** `device-control-action-coverage-authority-audited`

## Summary

The intended loop requires altitude selection, steering trim, route reading, map access, and camera control. The active touch-only path supplies none of those actions. The balloon can continue ambient drift, but the player cannot intentionally enter an airstream, regulate altitude, inspect the route map, or control the view.

## Plan ledger

**Goal:** ensure every admitted device profile can complete the same Air Mail loop without changing flight physics or delivery rules.

- [x] Identify the actions required by the flight loop.
- [x] Trace current keyboard and wheel producers.
- [x] Trace the touch-only path.
- [x] Separate passive simulation from controllable gameplay.
- [ ] Add complete touch and gamepad profiles.
- [ ] Prove route completion and failure recovery for each profile.

## Intended gameplay loop

```txt
read parcel destination
  -> inspect map and route
  -> use burner or vent to choose altitude
  -> enter or leave airstreams
  -> trim left or right across the current
  -> adjust camera distance or basket view
  -> approach destination town
  -> satisfy delivery volume
  -> receive completion state
```

## Current keyboard/mouse path

```txt
Space W ArrowUp -> burner
S ArrowDown Shift -> vent
A D ArrowLeft ArrowRight -> steering
M -> map toggle
Escape -> map close
wheel -> camera zoom
```

## Current touch-only path

```txt
touch gameplay canvas
  -> default touch behavior suppressed by touch-action none
  -> no pointer or touch producer
  -> no FlightActionCommand
  -> burner remains ambient
  -> vent remains zero
  -> steering remains zero
  -> map remains keyboard-gated
  -> zoom remains wheel-gated
  -> passive flight continues without intentional control
```

## Gameplay consequence

The active runtime does not admit a complete touch profile. A delivery might occur through accidental passive drift, but the authored control and route-reading loop is not available. This is an action-coverage failure, not proof that every touch session is mathematically unable to intersect a destination volume.

## Required acceptance criteria

```txt
every admitted profile covers burner vent steer map and zoom
held actions cancel on blur hide map transition and retirement
map actions do not leak into flight actions
hybrid devices do not double-apply actions
control surfaces remain visible and reachable
same seeded scenario is completable with keyboard touch and gamepad
first action effect is correlated with the accepted action generation
```

## Validation boundary

No physical touch device, gamepad, mobile browser, hybrid device, or route-completion fixture was run. No touch playability or cross-device parity claim is made.
