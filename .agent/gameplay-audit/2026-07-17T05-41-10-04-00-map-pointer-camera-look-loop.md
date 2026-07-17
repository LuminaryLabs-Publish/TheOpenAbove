# Gameplay Audit: Map Pointer to Camera-Look Loop

**Timestamp:** `2026-07-17T05-41-10-04-00`

## Player loop

```txt
fly balloon
  -> steer relative to the active airstream
  -> drag to inspect the world around the balloon
  -> release
  -> keep the chosen view for five seconds
  -> camera eases back toward flight heading
  -> open parchment map to inspect routes and Snap Points
  -> interact with the map
  -> close map and resume flight
```

## Implemented behavior

- Dragging updates camera yaw and pitch immediately.
- The active pointer ID is enforced for movement and terminal events.
- Yaw and pitch are clamped.
- After five seconds without look input, the camera recenters toward the current wind-relative heading.
- Camera smoothing is faster during an active drag.

## Gameplay gap

The pointer listener does not distinguish the flight canvas from the map canvas. The map overlay becomes pointer-interactive when open, but a primary drag on it is still admitted by the Camera Rig. This can alter the post-map flight view without the player's map interaction being classified as camera input.

The input path also has no explicit settlement for lost capture, page visibility, route retirement, rig replacement, or disposal. A stale drag state can therefore remain an unproven gameplay input until another terminal event or blur arrives.

## Required gameplay invariants

```txt
flight canvas primary drag -> camera look admitted
map overlay/map canvas drag -> camera look rejected
error panel interaction -> camera look rejected
secondary pointer -> camera look rejected or classified separately
pointer capture loss -> gesture settles once
map open -> active camera gesture settles before map control
map close -> no hidden camera delta is applied
rig replacement -> previous gesture and listeners retire first
five-second recenter -> measured from accepted settlement/input revision
```

## Required result chain

```txt
CameraLookGestureAdmissionResult
  -> CameraLookDeltaResult*
  -> CameraLookGestureSettlementResult
  -> CameraLookPoseResult
  -> CameraLookProjectionResult
  -> FirstCameraLookFrameAck
```

## Acceptance fixtures

- Drag left/right/up/down on `#game`; verify bounded yaw/pitch and immediate response.
- Repeat identical normalized drags at multiple DPR and viewport sizes.
- Drag on `#mapCanvas`; verify no camera pose revision.
- Open map while dragging; verify one terminal settlement.
- Force `lostpointercapture`; verify no further deltas until a new admission.
- Dispose and rebind Experience; verify one listener generation and one gesture owner.
- Wait 4.9 seconds and 5.1 seconds on the simulation clock; verify recenter phase boundaries.

No player-visible failure is claimed until browser fixtures reproduce one.