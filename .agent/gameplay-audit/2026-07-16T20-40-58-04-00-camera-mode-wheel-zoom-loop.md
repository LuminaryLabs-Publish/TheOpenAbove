# Gameplay Audit: Camera Mode Wheel Zoom Loop

**Timestamp:** `2026-07-16T20-40-58-04-00`

## Interaction loop

```txt
player presses C
  -> sightseeing camera mode becomes active

player scrolls over the game canvas
  -> capture zoom moves by 0.2
  -> camera FOV is written from capture zoom
  -> flight camera follow distance also moves by its wheel step

next frame
  -> camera rig updates follow position and first-person blend
  -> camera rig replaces FOV
  -> pending shutter is scored with capture zoom
  -> rendered frame uses the rig projection
```

## Gameplay consequence

Sightseeing asks the player to frame a landmark and rewards an ideal zoom near `2.2`. The score currently trusts the capture-domain scalar even though camera position and rendered projection are controlled by a second owner. The player can therefore receive zoom credit from a value that is not authoritative for the visible composition.

## Required result

```txt
SightseeingZoomCommand
  -> accepted only while sightseeing mode is active
  -> changes optical projection without changing follow distance
  -> commits one effective zoom/FOV result
  -> supplies that exact result to recognition scoring
  -> renders one matching frame
```

Outside sightseeing mode, the same wheel source may continue to control follow distance. Inside sightseeing mode, follow-distance mutation should be rejected or explicitly configured as part of one combined policy.

## Proof cases

- Enter sightseeing mode and scroll one step: only optical projection changes.
- Leave sightseeing mode and scroll one step: only follow distance changes.
- Capture immediately after scrolling: score evidence matches rendered FOV.
- Scroll during map state or after route retirement: no stale zoom applies.
- Repeat across trackpad, pixel-wheel, line-wheel and page-wheel input.

## Boundary

No gameplay values or camera behavior were changed by this audit.