# Gameplay Audit: Balloon Drift Runtime Source Loop

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Timestamp:** `2026-07-09T19-21-19-04-00`

## Current gameplay loop

```txt
Space / W / ArrowUp -> burnerPressed
S / ArrowDown / Shift -> ventPressed
wheel -> camera zoom and basket blend intent
update(dt)
  -> burner and vent lerp
  -> wind angle and speed update
  -> buoyancy, damping, ceiling softness, and vertical velocity integrate
  -> velocity lerps toward wind and vertical velocity
  -> position integrates
  -> ground clearance clamps altitude
  -> altitude and distance update
  -> balloon transform follows state
  -> animateHotAirBalloon(balloon, performance.now(), state.burner)
  -> wind ribbons drift
engine.tick(dt)
  -> openAbove.balloonSnapshot resource
  -> openAbove.balloonTicked event
draw(dt)
  -> camera blend and first-person visibility
  -> renderer.render(scene, camera)
updateHud()
```

## Gameplay source mismatch

```txt
README controls still describe pitch, bank, boost, and restart.
package description still says standalone free-flight exploration.
campaign config still describes thermal targets, wind gates, return radius, perch, FLIGHT speed/lift/boost fields.
Runtime gameplay is Balloon Drift: burner, vent, wind, buoyancy, altitude, camera blend, basket view.
```

## Next gameplay ledge

```txt
Add Balloon Drift config source.
Mark legacy free-flight config as compatibility-only.
Add altitude bands and route descriptors.
Add source acceptance rows for copy/config/runtime parity.
Expose source status through GameHost.
Validate through DOM-free source fixture.
```

## Do not do next

```txt
Do not retune burner, vent, wind, buoyancy, or camera values.
Do not add route progression.
Do not remove legacy FLIGHT fields before explicit compatibility handling exists.
```