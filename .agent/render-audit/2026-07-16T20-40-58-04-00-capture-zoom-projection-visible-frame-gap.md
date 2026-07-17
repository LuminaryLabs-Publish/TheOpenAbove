# Render Audit: Capture Zoom Projection Visible Frame Gap

**Timestamp:** `2026-07-16T20-40-58-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

## Summary

Sightseeing zoom is not bound to the camera projection that survives the full frame update and reaches rendering.

## Current render path

```txt
wheel on renderer canvas
  -> Image Capture changes private zoom
  -> Image Capture writes camera.fov
  -> event can also reach global Camera Rig wheel listener
  -> Camera Rig changes follow distance

next update
  -> Camera Rig computes position and target
  -> Camera Rig writes camera.fov from first-person blend
  -> camera projection matrix is updated
  -> Image Capture scores with its private zoom scalar
  -> Experience renders the Camera Rig projection
```

## Visible-frame gap

The player-facing frame is controlled by the last FOV write from the Camera Rig, while the capture record and score use the Image Capture scalar. The two values have no shared revision, result or frame acknowledgement.

```txt
capture zoom scalar: present
camera-rig follow distance: present
camera FOV writes from two owners: present
single committed projection descriptor: absent
score-to-projection binding: absent
rendered frame acknowledgement: absent
```

The same wheel event may also move the camera farther from or nearer to the balloon while the player expects optical zoom, changing framing through position rather than projection.

## Required render contract

```txt
accepted zoom intent
  -> resolve active mode owner
  -> derive one camera position/look descriptor
  -> derive one projection descriptor
  -> commit both under CameraProjectionRevision
  -> render
  -> inspect the rendered camera revision
  -> publish FirstZoomBoundFrameAck
```

## Required evidence

- Effective FOV and projection matrix revision.
- Follow-distance value and active camera mode.
- Sightseeing optical magnification.
- Viewport/aspect revision.
- Render frame identity.
- Capture-score evidence referencing the same projection revision.

## Validation boundary

No browser rendering or visual comparison was performed. The gap is derived from source ordering and independent camera writes; it does not prove the severity of visible drift on every device.