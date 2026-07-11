# Balloon Runtime Admission Loop

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Timestamp:** `2026-07-10T19-58-34-04-00`

## Current gameplay loop

```txt
module admission is implicit
  -> construct simulation
  -> install burner, vent and blur listeners
  -> construct balloon/camera/visual/telemetry
  -> start recursive frames
  -> update drift, altitude, velocity and terrain clearance
  -> update presentation and camera
  -> render environment
  -> project HUD and GameHost state
```

## Gameplay authority gap

Gameplay cannot distinguish these route states:

```txt
loading required runtime
required runtime unavailable
required runtime incompatible
visual construction failed
simulation construction failed
telemetry degraded
fully running
```

The browser either reaches `createGame()` or fails before route state exists. No gameplay-level readiness result prevents input installation or session allocation when required capabilities are absent.

## Required admission states

```txt
unresolved
resolving
resolved
preflighting
accepted
degraded
rejected
constructing
running
failed
```

## Required gameplay guarantees

```txt
burner and vent input are disabled until admission is accepted
no elapsed time or distance advances before running
no session identity is allocated for rejected admission
optional telemetry degradation is explicit rather than silent
required simulation, camera and visual capabilities reject boot
startup failure produces one terminal result
accepted source identity is retained for every gameplay snapshot
restart reuses policy but creates a new boot/session identity
```

## Fixture rows

```txt
pinned Three.js and NexusEngine sources accepted
mutable NexusEngine branch rejected by production policy
missing required NexusEngine export rejected
optional telemetry capability missing -> degraded only when policy permits
required visual capability missing -> rejected
construction failure after simulation -> rollback handoff recorded
rejected admission installs no input listeners
accepted admission reaches running once
source fingerprint remains stable through gameplay snapshots
```

## Next safe ledge

```txt
TheOpenAbove Immutable Runtime Admission + Boot Capability Fixture Gate
```