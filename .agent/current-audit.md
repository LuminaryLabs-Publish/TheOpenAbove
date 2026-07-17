# Current Audit: TheOpenAbove Camera Capture Zoom Projection

**Last aligned:** `2026-07-16T20-40-58-04-00`  
**Status:** `camera-capture-zoom-projection-authority-audited`  
**Previous central repo-local head:** `7f8de3ab0b6c8540992a22a9605586ef993e14e3`  
**Reviewed pre-audit repository head:** `7f8de3ab0b6c8540992a22a9605586ef993e14e3`

## Summary

The active Meadow Lift scene retains Journey, Ballooning, Sky, Land, Navigation, Image Capture and Experience. The current focused gap is shared camera ownership: normal follow zoom and sightseeing optical zoom independently consume wheel evidence and independently write camera state.

## Intent

Make one committed projection result authoritative for what the player sees and what sightseeing recognition scores.

## What needs to happen

```txt
CameraZoomIntentCommand
  -> bind route, session, camera, mode and viewport revisions
  -> normalize wheel units
  -> choose exactly one active owner
  -> publish CameraZoomIntentResult

CameraProjectionCommitCommand
  -> combine camera-rig pose with the accepted optical policy
  -> commit one FOV/projection revision
  -> publish CameraProjectionResult

PhotoZoomEvidenceCommand
  -> score from the committed projection result
  -> render one matching frame
  -> publish FirstZoomBoundFrameAck
```

## Interaction loop

```txt
boot
  -> compose semantic Meadow Lift domains
  -> Experience creates shared camera and renderer
  -> Camera Rig binds global wheel input
  -> Image Capture binds renderer-canvas wheel input

flight mode
  -> wheel changes camera-rig follow distance

sightseeing mode
  -> canvas wheel changes capture zoom and FOV
  -> the same event can reach global Camera Rig input
  -> Camera Rig also changes follow distance

next frame
  -> Experience updates Camera Rig
  -> Camera Rig writes position, look target and FOV
  -> Image Capture evaluates with private capture zoom
  -> Experience renders Camera Rig projection
```

## Domains in use

```txt
Journey: session, map policy, RAF and aggregate snapshots
Ballooning: balloon simulation, steering, terrain contact and pose
Sky: airstreams, Weather/Layered Weather and local wind particles
Land: Core World configuration, features, foundation and terrain readback
Navigation: map lifecycle, routes, Snap Points and journal projection
Image Capture: camera mode, capture zoom, shutter, recognition and score
Experience: renderer, camera, Camera Rig, visual update and render
Nexus Engine: World, Foundation, Features, Landforms, Atmosphere, Weather and Layered Weather
Build/deploy: validation, Vite artifact and GitHub Pages
```

## Current finding

```txt
flight follow-distance wheel owner: present
sightseeing optical wheel owner: present
shared bubbling wheel source: present
direct FOV writes from both camera paths: present
capture score private zoom: present

single mode-aware owner: absent
ordered camera projection commit: absent
actual FOV/effective zoom result: absent
score-to-projection binding: absent
FirstZoomBoundFrameAck: absent
```

The Image Capture listener prevents default browser behavior but does not stop the event from reaching the global Camera Rig listener. The Camera Rig then overwrites FOV during `Experience.update()` before capture evaluation and rendering. No specific player incident was reproduced.

## Inventory

The complete 121-surface kit/provider/adapter inventory and offered services are recorded in:

```txt
.agent/trackers/2026-07-16T20-40-58-04-00/project-breakdown.md
```

## Required parent domain

`open-above-sightseeing-camera-zoom-projection-authority-domain`

## Boundary

Documentation only. Runtime, rendering, input, gameplay, tests, build and deployment were not changed.