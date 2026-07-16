# Render Audit: Render-Owned Weather Revision Gap

**Timestamp:** `2026-07-16T10-58-20-04-00`  
**Status:** `weather-simulation-clock-projection-ownership-authority-audited`

## Summary

The five-layer cloud renderer is implemented, but its input adapter mutates Core Weather before projection. The visible frame has no receipt proving that cloud, fog, terrain and telemetry consumed one accepted weather/layer revision.

## Plan ledger

**Goal:** make rendering consume a frozen weather projection and acknowledge the exact revision presented.

- [x] Inspect cloud weather adaptation, volumetric uniforms and visual frame ordering.
- [x] Confirm five layer uniforms and sample budgets exist.
- [x] Confirm the visual adapter advances Core Weather.
- [x] Confirm no weather-bound frame acknowledgement exists.
- [ ] Make the adapter read-only.
- [ ] Publish frame convergence proof.

## Current render path

```txt
visual.update
  -> weather.update(dt, elapsed, cameraAltitude)
     -> n:weather.advance(dt)
     -> n:weather:layered.advance(0, weatherSnapshot)
  -> clouds.update
     -> sort up to five layers
     -> allocate per-layer steps
     -> upload altitude, coverage, density, opacity, offset and profile uniforms
  -> aerial.update
  -> terrain.update
  -> visual state stores layered snapshot

visual.render
  -> render low-resolution cloud target
  -> depth-tested full-screen composite
  -> HDR composer
```

## Missing render contract

```txt
WeatherProjectionSnapshot: absent
expected weather revision on render: absent
expected layered revision on render: absent
cloud uniform upload receipt: absent
fog/terrain snapshot identity: absent
stale projection rejection: absent
FirstWeatherBoundFrameAck: absent
```

## Required convergence

```txt
accepted WeatherAdvanceResult
  -> immutable WeatherProjectionSnapshot
  -> cloud/fog/terrain/telemetry adapters consume same snapshot
  -> render frame N
  -> acknowledge {
       frame: N,
       weatherRevision,
       layeredWeatherRevision,
       layerIds,
       renderSize,
       qualityTier
     }
```

## Proof rows

```txt
normal flight tick
map-open policy
paused policy
hidden/resume policy
bounded catch-up
low/medium/high quality
0, 80, 320, 900, 2000 and 3200 altitude
source, artifact and Pages
```

No claim is made that the current cloud frame is visually incorrect. The gap is revision ownership and proof.