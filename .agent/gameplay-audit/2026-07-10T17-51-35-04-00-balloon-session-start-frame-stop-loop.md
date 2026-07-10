# Gameplay Audit: Balloon Session Start/Frame/Stop Loop

**Timestamp:** `2026-07-10T17-51-35-04-00`

## Current gameplay loop

```txt
create simulation
  -> install global keyboard listeners
  -> initialize balloon state
  -> start frame recursion
       -> consume current key set
       -> update wind/buoyancy/vent/damping/clearance
       -> update position/velocity/altitude/distance
       -> apply balloon transform
       -> animate balloon and presentation
       -> update camera
       -> update visual state
       -> publish telemetry
       -> render
       -> update HUD
       -> queue next frame
```

The loop has no gameplay-session boundary around it.

## Session gap

Gameplay state can be advanced only by the live frame callback. There is no root service for:

```txt
start
pause
resume
stop
dispose
restart
single-step
deterministic reset
session snapshot
session result journal
```

`simulation.dispose()` removes keyboard listeners, but the route never calls it. Cancelling input alone would not stop the simulation because the recursive frame callback would continue to update drift, distance, camera, visual state, telemetry, render, and HUD.

## Authority problem

```txt
simulation owns state mutation
main owns frame cadence
browser owns queued callback execution
GameHost exposes both as live objects
no session owner controls all three
```

A stopped session must guarantee:

```txt
no additional simulation elapsed time
no additional distance accumulation
no balloon transform changes
no camera updates
no telemetry ticks
no render submissions
no HUD updates
no next frame queued
```

## Required gameplay lifecycle rows

```txt
session-created
session-started
frame-requested
frame-begun
frame-committed
frame-cancelled
stop-requested
session-stopped
restart-requested
session-restarted
dispose-requested
session-disposed
operation-rejected
```

## Deterministic fixture scenario

```txt
create session A
step 3 synthetic frames
capture state A3
stop session A
attempt 3 more callbacks
prove state remains A3
restart as session B
step 3 synthetic frames with the same initial seed/input
prove session B IDs differ
prove only session B advances
prove session A journal is terminal and immutable
```

## Relationship to frame-phase work

The previously documented committed-frame authority should live inside the lifecycle session:

```txt
sessionId
  -> frameId
     -> input range
     -> simulation result
     -> camera result
     -> render result
     -> telemetry/HUD/GameHost projections
```

Without `sessionId`, frame IDs can collide or become ambiguous after restart.

## Main finding

The Balloon Drift gameplay loop is continuous and functional, but it is not a managed session. The next proof boundary must make start, frame ownership, stop, disposal, and restart deterministic before browser re-entry or lifecycle-sensitive tests are added.
