# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-10T19-18-39-04-00`

## Primary gap

The route lacks a session identity and generation fence spanning construction, callbacks, listener ownership, animation frames, partial-start rollback, stop, disposal, restart, and GameHost readback.

## Current lifecycle gaps

```txt
createGame() returns no session owner.
The recursive requestAnimationFrame ID is discarded.
No cancelAnimationFrame path exists.
No callback checks an active session generation.
Simulation, camera, and visual dispose methods are never composed by the route.
Fatal startup after partial construction has no rollback.
GameHost exposes live mutable objects with no terminal snapshot.
No listener ownership ledger exists.
No resource ownership/disposal ledger exists.
No lifecycle or rejection journal exists.
No proof prevents parallel frame chains.
No proof prevents stale input or frame callbacks after restart.
No proof freezes old state after stop/dispose.
No lifecycle fixture exists.
```

## Input and callback race gaps

```txt
keydown, keyup, blur, wheel, and resize listeners are global.
Listener removal has no owner/session/result row.
Stop does not invalidate callbacks before teardown.
Held keyboard state has no restart policy.
A queued frame can continue through simulation and render after stop.
An old GameHost reference can remain reachable after restart.
```

## Render-resource gaps

```txt
visual.dispose() removes resize and disposes grass, terrain, and composer only.
The route does not call visual.dispose().
Renderer ownership is not classified.
Balloon geometry/material ownership is not classified.
Vegetation, landmarks, weather, sun, sky, clouds, aerial, water, and lens teardown is not centrally classified.
No terminal row distinguishes disposed, retained, unsupported, skipped, stale, or failed resources.
No soft-restart versus hard-destroy renderer policy exists in runtime code.
```

## Frame-phase gaps retained

```txt
Telemetry publishes before render.
Dynamic-resolution sampling can change scale during render.
Renderer statistics are written after telemetry publication.
HUD/GameHost.local can expose post-render stats with pre-sample scale.
GameHost.nexusEngine can represent an earlier phase.
No committed frame ID joins simulation, camera, visual, render, telemetry, HUD, and GameHost.
No input sequence range is attached to a committed frame.
Frame identity is not scoped under session identity.
```

## Required guarantees

```txt
one active session per canvas
one accepted generation at a time
one recursive frame chain per session
stale callbacks return rejected without mutation
stop prevents future state mutation
stop and dispose are idempotent
all owned listeners are removable and terminally recorded
all registered resources reach terminal status
partial startup rolls back in reverse order
restart creates a new sessionId and generation
held input is cleared at the session boundary
old GameHost authority cannot command the new session
terminal proof is immutable, bounded and JSON-safe
```

## Non-gaps for the next pass

```txt
The route boots through Vite.
Simulation, camera, visual, telemetry, smoke, and headless files are separated.
Simulation and camera expose listener-disposal methods.
Visual and composer expose partial resource-disposal methods.
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
frame proof without session identity
```

## Next safe ledge

```txt
TheOpenAbove Session Generation Fence + Terminal GameHost Fixture Gate
```
