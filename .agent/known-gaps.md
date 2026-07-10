# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-10T17-51-35-04-00`

## Primary gap

The route has no runtime-session authority spanning construction, listener installation, animation-frame ownership, partial-start rollback, stop, disposal, restart, and lifecycle readback.

## Current lifecycle gaps

```txt
createGame() returns no session owner.
The recursive requestAnimationFrame handle is not retained.
There is no cancelAnimationFrame path.
simulation.dispose() is never called by the route composer.
cameraRig.dispose() is never called by the route composer.
visual.dispose() is never called by the route composer.
GameHost exposes no stop, dispose, restart, or lifecycle state.
Fatal startup after partial construction has no rollback path.
No pagehide, unload, or HMR disposal policy exists.
No listener ownership ledger exists.
No resource ownership/disposal ledger exists.
No session transition journal exists.
No proof prevents parallel frame chains on repeated creation.
No proof prevents stale listeners from consuming new-session input.
No proof shows old state remains frozen after stop/dispose.
No lifecycle restart fixture exists.
```

## Render-resource gaps

```txt
visual.dispose() removes resize and disposes grass, terrain, and composer only.
The renderer is not explicitly disposed by the visual-domain path.
Balloon geometry/material ownership is not included in root teardown.
Vegetation, landmarks, weather, sun, sky, clouds, aerial, water, and lens teardown is not centrally classified.
No row distinguishes retained, unsupported, skipped, disposed, or failed resources.
No soft-restart versus hard-destroy renderer policy is documented in runtime code.
```

## Existing frame-phase gaps retained

```txt
Telemetry publishes before render.
Dynamic-resolution sampling can change scale during render.
Renderer statistics are written after telemetry publication.
HUD/GameHost.local can expose post-render stats with pre-sample scale.
GameHost.nexusEngine can represent an earlier telemetry phase.
No committed frame ID joins simulation, camera, visual, render, telemetry, HUD, and GameHost.
No input sequence range is attached to a committed frame.
```

## Required lifecycle rows

```txt
session-created
session-starting
component-created
listener-installed
resource-registered
frame-requested
session-running
stop-requested
frame-cancelled
listener-removed
resource-dispose-requested
resource-disposed
resource-retained
resource-dispose-skipped
resource-dispose-failed
session-stopped
dispose-requested
session-disposed
restart-requested
session-restarted
startup-failed
rollback-completed
operation-rejected
fixture-summary
```

## Required lifecycle statuses

```txt
created
starting
running
stopping
stopped
disposing
disposed
restarting
failed
already-running
already-stopped
already-disposed
accepted
rejected
skipped
unsupported
partial-failure
```

## Required guarantees

```txt
one active session per canvas
one recursive frame chain per session
stop prevents all future state mutation
dispose is idempotent
all owned listeners are removable
all registered resources reach terminal teardown status
partial startup failure rolls back in reverse order
restart creates a new sessionId
stale callbacks cannot mutate the new session
GameHost reports terminal status for disposed sessions
journals are bounded and JSON-safe
```

## Non-gaps for the next pass

```txt
The route boots through Vite.
Simulation, camera, visual, telemetry, smoke, and headless files are separated.
Simulation and camera already expose listener-disposal methods.
Visual and composer already expose partial resource-disposal methods.
The active grass system is deterministic by world seed and chunk coordinates.
Build already depends on npm run check.
```

## Do not prioritize next

```txt
visual fidelity expansion
renderer replacement
terrain/cloud/water/grass rewrite
camera framing changes
balloon geometry changes
simulation constant changes
new regions or objectives
quality threshold retuning
legacy grass deletion
frame-proof implementation that lacks session identity
```

## Next safe ledge

```txt
TheOpenAbove Runtime Session Lifecycle Authority + Dispose/Reboot Fixture Gate
```
