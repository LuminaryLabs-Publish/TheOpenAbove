# Interaction Audit: Keyboard and Wheel Event Result Correlation Map

**Timestamp:** `2026-07-10T14-50-38-04-00`

## Current keyboard path

```txt
keydown -> add event.code to hidden Set
keyup   -> delete event.code from hidden Set
blur    -> clear hidden Set
frame   -> derive burnerPressed and ventPressed
        -> lerp burner and vent values
```

## Current wheel path

```txt
wheel event
  -> sign(deltaY) * wheelStep
  -> clamp current zoom to [0, maxZoom]
  -> later frame derives firstPersonBlend and camera mode
```

## Missing result vocabulary

Keyboard and wheel handlers currently produce no explicit outcomes. The minimum stable vocabulary should be:

```txt
accepted
released
cleared
repeated
unsupported
clamped
no-change
ignored
```

Reasons should remain separate from statuses:

```txt
burner-key
vent-key
wheel-zoom-in
wheel-zoom-out
already-held
not-held
window-blur
unsupported-code
minimum-zoom
maximum-zoom
zero-delta
```

## Required input result row

```js
{
  inputId,
  sequence,
  timestamp,
  device: "keyboard" | "wheel" | "window",
  code,
  phase,
  requestedValue,
  previousValue,
  resolvedValue,
  status,
  reason
}
```

## Correlation behavior

At the beginning of each animation frame, the runtime composer should snapshot the highest consumed input sequence. The resulting frame row should record the inclusive sequence range consumed by the simulation and camera paths.

```txt
frame 1042
  keyboard sequences 80..82
  wheel sequence 83
  simulation snapshot sim-1042
  camera snapshot cam-1042
  render row render-1042
```

Events that do not alter state still need rows. Without rejected, repeated, clamped, and no-change rows, fixture parity and user-facing diagnostics cannot distinguish silence from a missing handler.

## Guardrails

```txt
Do not change key bindings.
Do not prevent default browser behavior unless separately approved.
Do not change wheelStep or zoom limits.
Do not move the event listeners into a new framework.
Do not expose raw browser Event objects through GameHost.
Serialize only normalized fields.
```

## Main finding

The interaction code is small and functional. The gap is explicit input outcomes and their correlation to the frame that consumed them.

## Next safe ledge

```txt
Add keyboard, wheel, and blur result rows, then bind consumed sequence ranges into the shared frame-correlation ledger.
```