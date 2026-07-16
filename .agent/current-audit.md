# Current Audit: TheOpenAbove Sightseeing Photo Frame Artifact

**Last aligned:** `2026-07-16T14-59-39-04-00`  
**Status:** `sightseeing-photo-frame-artifact-authority-audited`  
**Previous central repo-local head:** `aac119fd0b793ea4a86edee7167f87d4d740275b`  
**Reviewed pre-audit repository head:** `d0677937043224bb295bd3b270c336aed0e2a2b1`

## Summary

The active Meadow Lift route is now composed from Journey, Ballooning, Sky, Land, Navigation, Image Capture and Experience domains. Air Mail is retired from the scene. Sightseeing capture recognizes landforms from camera direction, distance and zoom, then records metadata and updates the map journal.

The capture domain does not read rendered pixels or create an image artifact. The shutter result settles before `engine.tick(dt)` and before `experience.render(...)`, so the recorded result is not bound to a presented frame.

## Intent

Make one exact rendered frame the authority for photo bytes, score, journal state and visible confirmation.

## What needs to happen

```txt
PhotoCaptureCommand
  -> bind request, route, session, camera and frame revisions
  -> bind world, weather, renderer and capture-policy revisions
  -> admit one post-update capture frame
  -> create immutable image bytes and digest
  -> score recognition from the same accepted camera/frame state
  -> publish PhotoCaptureResult
  -> project actual photo into the journal
  -> publish FirstPhotoArtifactAck and FirstJournalPhotoFrameAck
```

## Checklist

- [x] Compare the current Publish inventory and central coverage.
- [x] Select one priority repository only.
- [x] Inspect the semantic composition, image capture, map, steering and wind-particle changes.
- [x] Identify the current interaction loop and domain boundaries.
- [x] Inventory 121 active named surfaces and their services.
- [x] Define the photo-frame artifact authority and proof boundary.
- [ ] Implement bitmap capture, immutable identity, storage and retirement.
- [ ] Execute capture, journal, build, artifact and deployed-origin fixtures.

## Interaction loop

```txt
boot
  -> create Core World/Weather engine
  -> create Land and Experience
  -> mount Ballooning, Sky, Navigation and Image Capture
  -> create Journey frame ownership

flight frame
  -> Ballooning updates simulation and immediate wind-relative steering
  -> Sky updates airstream visualization and 3,200 local wind particles
  -> Experience updates balloon, camera and visual world
  -> Image Capture evaluates a pending shutter request
  -> engine ticks
  -> Experience renders

map frame
  -> simulation dt becomes zero while map is open
  -> parchment map redraws world, routes, Snap Points and generic reference card
```

## Domains in use

```txt
Journey: session, region, map policy, RAF and snapshots
Ballooning: balloon object, controls, buoyancy, drift, steering and terrain contact
Sky: airstreams, Core Weather access and local wind visualization
Land: world configuration, Core World surfaces, terrain and generation readback
Navigation: map lifecycle, world projection, routes and Snap Point journal
Image Capture: camera mode, zoom, shutter, recognition, score and metadata records
Experience: renderer, camera, visual world, balloon presentation and render
Nexus Engine: World, Foundation, Features, Landforms, Atmosphere, Weather and Layered Weather
Build/deploy: tiered validation, Vite artifact and GitHub Pages
```

## Current finding

```txt
semantic capture record: present
camera-mode and zoom controls: present
landmark recognition and score: present
Snap Point completion: present
journal/map status projection: present

rendered pixel capture: absent
capture frame identity: absent
camera matrix receipt: absent
world/weather generation binding: absent
photo bytes and digest: absent
artifact persistence/retirement: absent
actual-photo journal projection: absent
PhotoCaptureResult: absent
FirstPhotoArtifactAck: absent
FirstJournalPhotoFrameAck: absent
```

## Required parent domain

`open-above-sightseeing-photo-frame-artifact-authority-domain`

## Boundary

Documentation only. Runtime, rendering, controls, world generation, tests and deployment were not changed by this audit.