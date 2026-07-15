# Gameplay Audit: Weather to Low-Resolution Cloud Frame

**Timestamp:** `2026-07-15T02-09-29-04-00`

## Summary

Cloud rendering is presentation-owned and does not alter balloon or Air Mail truth. Weather values feed both the new low-resolution volume and the separate terrain-shadow shader, but no single frame result proves that weather, cloud color, scene depth, terrain shadows, telemetry, and the visible frame used matching revisions.

## Plan ledger

**Goal:** preserve gameplay independence while correlating every weather-driven cloud presentation participant to one accepted frame.

- [x] Trace weather, sun, camera, cloud, terrain-shadow, HDR, and visible-frame flow.
- [x] Separate gameplay truth from presentation truth.
- [x] Identify mixed-revision and unreceipted paths.
- [ ] Add frame identity and executable correlation proof.

## Interaction loop

```txt
balloon and mail simulation
  -> advance flight state
  -> evaluate airstream and mail systems
  -> publish gameplay and telemetry state

visual update
  -> weather.update(dt, elapsed)
  -> sun.update(flight position, elapsed)
  -> sky.update(camera, sun direction)
  -> clouds.update(camera, sun direction, elapsed)
  -> terrain.update(camera, weather state)
  -> remaining world and post-process updates

visual render
  -> cloud target rendered from current cloud uniforms and camera
  -> main scene rendered through HDR composer
  -> fullscreen cloud composite participates in main scene
  -> terrain shadows use their own procedural weather-shaped path
  -> final frame is presented
```

## Domain boundary

```txt
balloon flight and Air Mail: authoritative gameplay
weather map: deterministic presentation input
volumetric target: presentation candidate
terrain cloud shadow: presentation candidate
HDR frame: presentation result
```

No cloud render failure should mutate delivery, flight, route, parcel, or progression state. A rejected cloud frame should preserve a safe predecessor or use an explicit fallback.

## Missing correlation

```txt
WeatherRevision: absent
CloudLodProfileRevision: absent
CloudTargetGeneration: implicit only
SceneDepthRevision: absent
TerrainCloudShadowResult: absent
CloudFrameResult: absent
FirstVisibleCloudFrameAck: absent
```

## Required rule

```txt
one accepted FrameId
  -> one weather revision
  -> one camera and scene-depth revision
  -> one cloud target generation
  -> one terrain-shadow policy
  -> one HDR composite result
  -> one visible-frame acknowledgement
```

## Validation boundary

No gameplay behavior changed. No claim is made that current flight or mail results are incorrect.