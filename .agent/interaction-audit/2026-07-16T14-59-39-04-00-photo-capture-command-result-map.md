# Interaction Audit: Photo Capture Command and Result Map

## Summary

Keyboard and wheel handlers currently mutate camera/capture state directly. The shutter becomes a boolean `pendingShutter`, and the next update either creates a metadata record or does nothing.

## Current interaction map

```txt
C
  -> toggle cameraMode
  -> reset zoom when leaving mode

wheel while cameraMode
  -> prevent default
  -> change zoom
  -> mutate camera FOV and projection matrix

P or Enter while cameraMode
  -> pendingShutter = true

next ImageCapture.update
  -> read camera direction
  -> evaluate all Snap Points
  -> append capture metadata
  -> mark recognized point complete
  -> return capture record

Escape
  -> exit camera mode
```

## Missing command identity

```txt
CaptureRequestId: absent
request timestamp/frame: absent
expected route/session revision: absent
expected camera revision: absent
expected world/weather revision: absent
request deduplication: absent
terminal rejection result: absent
```

## Proposed commands

| Command | Result |
|---|---|
| `CameraModeCommand` | `CameraModeResult` with route and camera revision |
| `PhotoZoomCommand` | `PhotoZoomResult` with accepted projection revision |
| `PhotoCaptureCommand` | `PhotoCaptureResult` with accepted/rejected/failed status |
| `PhotoArtifactLoadCommand` | `PhotoArtifactLoadResult` for journal projection |
| `PhotoArtifactRetireCommand` | `PhotoArtifactRetirementResult` |

## Proposed shutter flow

```txt
browser evidence
  -> PhotoCaptureCommand
  -> command admission
  -> frame admission
  -> artifact encoding
  -> recognition/score settlement
  -> completion settlement
  -> journal projection
  -> terminal result and acknowledgements
```

## Rejection cases

- Camera mode is not active.
- Map or another blocking mode owns interaction.
- Request duplicates an inflight capture.
- Route/session/camera/world/renderer generation changed.
- Renderer or color source is unavailable.
- Encoding or storage failed.
- Route or document retired before completion.

## Boundary

No input behavior changed. The proposed command/result model is documentation only.