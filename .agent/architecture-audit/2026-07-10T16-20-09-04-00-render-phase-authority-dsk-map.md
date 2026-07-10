# Architecture Audit — Render Phase Authority DSK Map

Timestamp: `2026-07-10T16-20-09-04-00`

## Current composition

```txt
route-shell
  -> runtime-composer
       -> campaign/world source
       -> balloon-simulation-kit
       -> hot-air-balloon-object-kit
       -> balloon-presentation-domain
       -> balloon-camera-rig-kit
       -> visual-domain
            -> quality-tier-kit
            -> dynamic-resolution-kit
            -> illumination/atmosphere/landscape/post kits
            -> grass-field-domain and supporting grass kits
       -> balloon-telemetry-kit
       -> HUD projection
       -> GameHost readback
  -> static smoke
  -> headless editor adapter
```

## Authority boundaries

### Simulation authority

Owns elapsed time, burner/vent smoothing, wind, vertical integration, terrain clearance, altitude, distance, position, velocity, and snapshots.

### Camera authority

Owns wheel-mutated zoom, first-person blend, camera mode, camera position, target, FOV, and clipping fade.

### Visual pre-render authority

Owns weather, sun, sky, clouds, fog, terrain streaming, grass update, water, lens response, composer state, and the pre-render copy of `resolution.state.scale`.

### Render authority

Owns composer submission, frame-cost sampling, possible dynamic-scale mutation, resize, draw-call totals, and triangle totals.

### Telemetry authority

Owns Nexus resources/events, but currently samples before render authority completes.

### Presentation authority

HUD and GameHost consume mutable/latest state but do not identify which phase produced each field.

## DSK problem

The existing kits are individually useful, but there is no parent DSK that owns the transition from pre-render state to one immutable committed frame. Therefore downstream consumers infer authority from call order rather than a typed result.

## Required parent domain

```txt
open-above-frame-phase-authority-kit
```

It should own:

```txt
frameId
input sequence range
pre-render visual row
render result row
adaptive-quality decision row
post-sample render scale
renderer statistics
committed frame snapshot
consumer publication rows
bounded journals
```

## Proposed service contract

```js
beginFrame({ now, frameMs, dt, inputRange })
recordSimulation(snapshot)
recordCamera(snapshot)
recordVisualPreRender(snapshot)
recordRenderResult(result)
commitFrame()
getLatestFrame()
getFrameJournal()
getQualityDecisionJournal()
```

## Kit classification

### Active source-backed

Simulation, telemetry, balloon object, camera, clipping, presentation, visual, quality, dynamic resolution, illumination, atmosphere, terrain, vegetation, active grass-field stack, water, landmarks, post-process, headless editor, and smoke kits.

### Inactive source-backed

`open-above-grass-detail-kit` exists but is not imported by the active visual domain.

### Runtime-implied

Route shell, import map, composer, keyboard input, wheel input, HUD, error panel, GameHost adapter, and CDN adapter.

### Next-cut

Frame-phase authority, adaptive-quality decision ledger, render result row, committed-frame snapshot, telemetry publication row, GameHost proof, grass kit truth, and fixture kits.

## Next safe ledge

`TheOpenAbove Render Phase Authority Ledger + Adaptive Resolution Fixture Gate`