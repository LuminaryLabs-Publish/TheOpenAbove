# Gameplay Audit: Altitude Cloud Experience Loop

## Summary

The balloon can travel through a large vertical world, but atmosphere behavior is not authored as a progression or navigation layer. The new reference describes distinct low, middle and high-altitude experiences that are not represented as gameplay-readable state.

## Plan ledger

**Goal:** define how atmosphere layers should affect flight readability without moving flight truth into the renderer.

- [x] Trace balloon, world, weather and atmosphere updates.
- [x] Identify current altitude-sensitive fog behavior.
- [x] Compare gameplay-readable state with the reference target.
- [x] Preserve simulation, Air Mail and airstream ownership.
- [ ] Add accepted atmosphere-state descriptors before gameplay adoption.

## Current loop

```txt
player applies burner, vent and steering input
  -> balloon simulation updates position and altitude
  -> airstream domain contributes wind force
  -> visual weather updates coverage and density
  -> clouds render from one fixed altitude slab
  -> aerial fog clears gradually with camera altitude
  -> Air Mail and map consume no atmosphere-layer identity
```

## Missing gameplay-readable state

```txt
current atmosphere layer: absent
entered/exited fog bank result: absent
cloud-bank navigation state: absent
visibility-zone result: absent
layer-specific wind relation: absent
terrain/moisture atmosphere state: absent
map atmosphere projection: absent
Air Mail atmosphere modifier: absent
altitude-band telemetry: absent
```

The reference should not directly prescribe balance. A future adoption result may remain visual-only, or it may intentionally expose visibility, wind or route effects. That decision must be explicit and owned by gameplay domains rather than inferred from shader density.

## Required interaction contract

```txt
accepted AtmosphereLayerState
  -> balloon telemetry may report current band
  -> map may project known fog/cloud regions
  -> airstream may expose a compatible wind relationship
  -> Air Mail may opt into authored visibility or route modifiers
  -> renderer presents matching layers
  -> no gameplay effect occurs unless a named consumer adopts it
```

## Safe dependency order

```txt
reference manifest
  -> runtime layer descriptors
  -> visible-frame proof
  -> optional gameplay consumer registry
  -> explicit no-effect or adopted-effect result
  -> replay and persistence proof if gameplay meaning is added
```

## Validation boundary

No flight, Air Mail, map, airstream, visibility, collision, timer or progression behavior changed.