# Deploy Audit: Camera Zoom Browser Fixture Gate

**Timestamp:** `2026-07-16T20-40-58-04-00`

## Release question

Does the source build, Vite artifact and deployed Pages origin apply one wheel gesture to one camera policy and render the same projection used by sightseeing scoring?

## Required source fixtures

- Assert that sightseeing mode has one wheel owner.
- Assert that normal flight mode has one wheel owner.
- Assert that Image Capture does not independently overwrite the final camera projection.
- Assert that recognition scoring receives `CameraProjectionResult` evidence.
- Assert that map open, route retirement and disposal reject stale zoom intents.

## Required browser matrix

```txt
mouse wheel with pixel units
mouse wheel with line units
page-mode wheel event
trackpad low-amplitude sequence
trackpad momentum sequence
rapid C mode toggle during wheel input
map open/close during wheel input
resize and DPR change during optical zoom
```

For each case record:

```txt
accepted ZoomIntentId
accepted owner
follow distance before/after
FOV before/after
CameraProjectionRevision
capture score projection revision
render frame acknowledgement
```

## Artifact gate

```txt
source fixture passes
  -> npm run check
  -> npm run build
  -> inspect built module behavior
  -> serve artifact locally
  -> run browser matrix
  -> publish Pages artifact
  -> run same matrix at deployed origin
```

## Reject release when

- one wheel gesture changes both follow distance and optical projection without an explicit combined policy;
- the rendered FOV differs from the score evidence;
- source and built artifact select different owners;
- a stale map/route intent applies after settlement;
- `FirstZoomBoundFrameAck` is missing.

## Current boundary

None of these fixtures were executed in this documentation pass. Build and deployed parity remain unproven.