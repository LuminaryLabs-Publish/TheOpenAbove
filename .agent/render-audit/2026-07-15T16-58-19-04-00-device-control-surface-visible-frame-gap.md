# Render Audit: Device-Control Surface Visible-Frame Gap

**Timestamp:** `2026-07-15T16-58-19-04-00`  
**Status:** `device-control-action-coverage-authority-audited`

## Summary

The WebGL canvas and parchment map render accepted world state, but the active document renders no flight-control surface for touch or gamepad users. No frame receipt proves that a required on-screen control profile is visible, correctly sized, unobscured, and bound to the same control generation as simulation consumption.

## Plan ledger

**Goal:** make visible controls an admitted render surface whose generation is correlated with semantic action ownership and the first resulting game frame.

- [x] Inspect the active HTML canvas and map surfaces.
- [x] Confirm the gameplay canvas uses `touch-action: none`.
- [x] Confirm no on-screen flight, map, or zoom controls are mounted.
- [x] Define control-surface and action-effect acknowledgements.
- [ ] Implement responsive visible controls.
- [ ] Prove CSS, backing-store, safe-area, orientation, and action-frame correlation.

## Current surface state

```txt
WebGL gameplay canvas: present
Canvas2D parchment map: present
map dialog shell: present
error panel: present
visible burner control: absent
visible vent control: absent
visible steering control: absent
visible map button: absent
visible zoom controls: absent
control surface generation: absent
control layout revision: absent
safe-area policy: absent
FirstDeviceControlSurfaceFrameAck: absent
FirstDeviceActionEffectFrameAck: absent
```

## Required frame chain

```txt
DeviceControlAdmissionResult
  -> ControlSurfaceDescriptor
  -> layout against viewport safe area and map state
  -> DOM or renderer projection
  -> FirstDeviceControlSurfaceFrameAck
  -> accepted FlightActionCommand
  -> simulation camera or map result
  -> WebGL Canvas2D and DOM projection
  -> FirstDeviceActionEffectFrameAck
```

## Frame acknowledgement fields

```txt
documentGeneration
runtimeGeneration
controlGeneration
controlProfileId
controlLayoutRevision
viewportRevision
safeAreaRevision
renderedActionMapRevision
visibleRequiredActions
occludedRequiredActions
simulationRevision
cameraRevision
mapRevision
frameId
timestamp
```

## Evidence gap

A screenshot showing controls would not prove the controls belong to the admitted producer generation or that their actions affect the same simulation revision. Required proof must correlate control admission, visible layout, semantic action acceptance, simulation/camera/map result, and final presented frame.

## Validation boundary

No browser or screenshot fixture ran. No claim is made for touch visibility, hit-target size, safe-area correctness, orientation behavior, control-action convergence, artifact parity, deployed parity, or production readiness.
