# Architecture Audit: Camera Capture Zoom Projection DSK Map

**Timestamp:** `2026-07-16T20-40-58-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

## Summary

The current architecture has two uncoordinated camera-zoom policies.

```txt
open-above-image-capture-domain
  -> owns sightseeing mode and a private optical-zoom value
  -> listens on the renderer canvas
  -> writes camera FOV directly

open-above-balloon-camera-rig-kit
  -> owns follow distance and first-person blend
  -> listens on the browser window
  -> writes camera position, target and FOV every update
```

One wheel event can enter both paths. No domain owns arbitration, an ordered camera commit or projection evidence for photo scoring.

## Existing domain map

```txt
Journey -> frame, map-pause and session progression
Ballooning -> simulation and balloon state
Experience -> camera rig, visual update and render
Image Capture -> camera mode, capture zoom, shutter and score
Navigation -> map state and camera-intent suspension context
```

## Required parent domain

`open-above-sightseeing-camera-zoom-projection-authority-domain`

## Proposed DSK breakdown

1. `camera-zoom-intent-admission-kit`
   - creates intent identity;
   - binds route, session, camera, viewport and mode revisions;
   - normalizes wheel units;
   - rejects stale or retired evidence.

2. `camera-zoom-owner-arbitration-kit`
   - resolves one owner: flight follow distance or sightseeing optical projection;
   - prevents one event from mutating both policies.

3. `flight-follow-distance-zoom-kit`
   - applies only outside sightseeing mode;
   - changes camera-rig distance and first-person transition policy.

4. `sightseeing-optical-zoom-kit`
   - applies only in sightseeing mode;
   - derives target FOV and effective magnification;
   - does not mutate follow distance.

5. `camera-projection-policy-kit`
   - merges rig mode, optical zoom, near/far plane and aspect policy;
   - produces an immutable projection descriptor.

6. `camera-projection-commit-kit`
   - commits camera position, target and projection once per frame;
   - publishes `CameraProjectionResult`.

7. `photo-zoom-evidence-kit`
   - reads the committed projection result;
   - supplies effective FOV and magnification to recognition scoring;
   - rejects scalar/projection mismatches.

8. `camera-zoom-settlement-kit`
   - settles map open, mode exit, route exit and disposal;
   - publishes terminal results exactly once.

9. `first-zoom-bound-frame-ack-kit`
   - verifies that the rendered frame used the accepted projection revision.

## Ownership rule

```txt
wheel evidence
  -> one admitted intent
  -> one active owner
  -> one camera commit
  -> one projection result
  -> one rendered-frame acknowledgement
```

Image Capture may request optical zoom but should not write the shared camera independently. The Camera Rig may derive position and target but should not overwrite an accepted sightseeing projection.

## Compatibility boundary

Preserve balloon dynamics, wind-relative steering, follow-camera feel, first-person blend, sightseeing scoring structure, map pause, world/weather composition and rendering.