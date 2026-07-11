# Input Admission and Readiness Map

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Timestamp:** `2026-07-10T19-58-34-04-00`

## Current input ownership

```txt
createBalloonSimulation()
  -> keydown
  -> keyup
  -> blur
createBalloonCameraRig()
  -> wheel
createVisualDomain()
  -> resize
```

These listeners are installed during construction. There is no route-level admission state that proves required remote capabilities before construction begins, and no boot result joins source admission to listener ownership.

## Current interaction sequence

```txt
browser module graph succeeds
  -> simulation installs keyboard listeners
  -> camera installs wheel listener
  -> user input mutates intent/state
  -> frame consumes burner, vent and zoom state
```

## Missing interaction results

```txt
runtime-unresolved
runtime-source-rejected
runtime-capability-missing
boot-not-running
stale-boot
stale-session
input-owner-missing
input-accepted
input-cleared-on-failure
```

## Required rules

```txt
install no interactive listener before required dependency admission passes
register each listener under bootId, sessionId and generation
reject events when boot or session state is not running
clear held burner/vent state on failed construction, stop and restart
record accepted/rejected input without retaining raw browser events
remove listeners during reverse-order rollback
project listener count and terminal status through diagnostics
```

## Readiness projection

```txt
boot.readiness.sources
boot.readiness.capabilities
boot.readiness.construction
session.readiness.input
session.readiness.simulation
session.readiness.rendering
session.readiness.telemetry
```

## Fixture rows

```txt
rejected source admission installs zero listeners
accepted admission installs expected listener set once
construction failure removes already-installed listeners
input before running returns boot-not-running
input after invalidation returns stale-session
restart clears held input and installs one fresh listener set
```

## Next safe ledge

```txt
TheOpenAbove Immutable Runtime Admission + Boot Capability Fixture Gate
```