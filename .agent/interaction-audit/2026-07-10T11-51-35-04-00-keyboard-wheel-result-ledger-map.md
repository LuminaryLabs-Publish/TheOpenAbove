# Interaction audit: keyboard and wheel result ledger map

Timestamp: `2026-07-10T11-51-35-04-00`

## Current interactions

```txt
keyboard down
  -> add event.code to simulation keys Set

keyboard up
  -> delete event.code from simulation keys Set

blur
  -> clear simulation keys Set

wheel
  -> cameraRig state.zoom += sign(deltaY) * wheelStep, clamped to profile max
```

## Current accepted controls

```txt
Space / KeyW / ArrowUp -> burner
KeyS / ArrowDown / ShiftLeft / ShiftRight -> vent
wheel -> zoom
blur -> clear held keys
```

## Gap

Interactions mutate state but do not emit input result rows.

Missing rows:

```txt
accepted_key_down
accepted_key_up
accepted_blur_clear
accepted_wheel_zoom
no_change_duplicate_key_down
no_change_missing_key_up
ignored_unsupported_key
clamped_zoom_min
clamped_zoom_max
invalid_payload
```

## Why this matters

The next source fixture needs to prove current behavior without requiring browser play.

Input rows should feed:

```txt
source acceptance ledger
simulation source consumer ledger
camera source consumer ledger
GameHost source readback
headless source fixture
```
