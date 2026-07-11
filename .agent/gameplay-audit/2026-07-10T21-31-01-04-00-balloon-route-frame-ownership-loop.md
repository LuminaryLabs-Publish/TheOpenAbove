# Gameplay Audit: Balloon Route Frame Ownership

**Timestamp:** `2026-07-10T21-31-01-04-00`

## Active loop

```txt
accepted browser boot
  -> create visual world
  -> create balloon and simulation
  -> install burner, vent, blur and wheel input
  -> create camera and telemetry
  -> publish GameHost
  -> advance one primary animation loop forever
```

A second compatibility loop is created by module evaluation rather than a gameplay command. It is not part of burner/vent control, simulation, camera, route state or GameHost lifecycle.

## Gameplay risk

Repeated boot, hot reload, script re-evaluation or future route restart can leave old frame chains and listeners alive. Those stale generations can continue reading scene state, animating legacy objects or competing with a new session. There is no authoritative `starting`, `running`, `stopping`, `stopped`, `failed` or `disposed` state.

## Required gameplay transaction

```txt
admission accepted
  -> allocate sessionId and generation
  -> construct kits while registering rollback handlers
  -> publish running result
  -> admit input only for active generation
  -> stop input
  -> cancel frames
  -> dispose resources in reverse order
  -> publish terminal result
  -> optionally restart with generation + 1
```

## Non-goals

Do not change balloon handling, wind, buoyancy, camera, terrain, grass, clouds, water, grading or HUD styling during this gate.