# Render Audit: Render Frame and Simulation Tick Separation Gap

**Timestamp:** `2026-07-11T00-49-45-04-00`

## Current path

```txt
RAF
  -> compute clamped frameMs and dt
  -> mutate simulation once
  -> update camera and visual state
  -> tick telemetry once
  -> render and HUD once
```

## Gap

The current path uses one cadence for browser presentation, authoritative simulation and Nexus telemetry. Slow frames do not create additional simulation ticks, fast frames create more telemetry frames, and hidden-tab pauses produce no suspension result.

## Required separation

```txt
render frame:
  browser cadence, frame cost, interpolation, camera and adaptive quality

simulation tick:
  fixed dt, input admission, physical mutation and mission-time advancement

committed observation:
  immutable state consumed by render, telemetry, HUD and GameHost
```

## Required render observation

```txt
sessionId
generation
renderFrameId
presentedSimulationTickId
interpolationAlpha
frameMs
renderScale
drawCalls
triangles
visibilityState
```

Camera smoothing and adaptive resolution may remain render-cadence services, but they must not mutate authoritative balloon or mission state.
