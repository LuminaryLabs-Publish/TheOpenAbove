# Render Audit: Raw Render Owner Host Exposure Gap

**Timestamp:** `2026-07-12T02-29-50-04-00`

## Finding

`window.GameHost` exposes `scene`, `renderer`, `camera`, `balloon` and the complete `visual` domain. The visual owner also exposes composer, dynamic-resolution state, landscape owners, `update()`, `render()`, `resize()` and `dispose()`.

The public surface can therefore submit or alter pixels outside the normal frame sequence:

```txt
simulation update
  -> mission update
  -> airstream update
  -> balloon transforms
  -> presentation update
  -> camera update
  -> visual update
  -> telemetry tick
  -> visual render
  -> HUD commit
```

A public call to `visual.render()` or the raw renderer can submit a frame without the preceding state stages. A direct scene/camera mutation can affect the next render without a command result or state revision. A public `visual.dispose()` can retire render resources while the recursive RAF remains active.

## Missing evidence

```txt
renderFrameId
simulationTickId
missionEpoch
cameraRevision
visualRevision
sceneFingerprint
renderSubmitResult
HUDCommitResult
committedFramePointer
```

`GameHost.getState()` does not identify which visible frame consumed the returned values.

## Required rule

```txt
public callers receive no scene, renderer, camera, composer,
render-target, dynamic-resolution or visual-domain owner references
```

Permitted public rendering observations must be detached values from one committed frame:

```txt
canvas dimensions
physical buffer dimensions
render scale
quality tier
draw calls
triangles
camera mode and bounded pose
frame ID and state fingerprint
```

Any future capture or presentation command must be capability-scoped, revision-checked and acknowledged by the committed frame authority.

## Required fixtures

```txt
fixture:host-no-render-owner
fixture:host-no-scene-owner
fixture:host-no-camera-owner
fixture:host-direct-render-rejection
fixture:host-stale-frame-command
fixture:host-render-read-model-coherence
fixture:pages-host-render-isolation
```

## Completion boundary

Do not claim render isolation or frame coherence while public code can directly mutate the scene/camera or submit/dispose renderer work.