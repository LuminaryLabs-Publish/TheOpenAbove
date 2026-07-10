# Interaction Audit: Keyboard Wheel Source Result Map

Timestamp: `2026-07-10T13-21-23-04-00`

## Current keyboard path

```txt
createBalloonSimulation
  -> addEventListener("keydown", onKeyDown)
  -> keys.add(event.code)
  -> addEventListener("keyup", onKeyUp)
  -> keys.delete(event.code)
  -> addEventListener("blur", onBlur)
  -> keys.clear()
  -> update(dt) reads Space/W/ArrowUp for burner and S/ArrowDown/Shift for vent
```

## Current wheel path

```txt
createBalloonCameraRig
  -> addEventListener("wheel", onWheel, { passive: true })
  -> state.zoom = clamp(state.zoom + Math.sign(deltaY) * wheelStep, 0, maxZoom)
  -> camera blend and mode derive from zoom
```

## Gap

Input mutates state without result rows.

Missing result vocabulary:

```txt
accepted_burner_on
accepted_burner_off
accepted_vent_on
accepted_vent_off
accepted_blur_clear
accepted_wheel_zoom
clamped_wheel_zoom_min
clamped_wheel_zoom_max
no_change_duplicate_key
rejected_unknown_key
rejected_invalid_wheel_payload
```

## Next proof

Add `open-above-input-result-ledger-kit` and prove representative keyboard/wheel rows in the DOM-free source fixture before simulation retuning or camera changes.
