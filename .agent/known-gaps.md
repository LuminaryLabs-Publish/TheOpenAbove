# Known Gaps: TheOpenAbove Cloud Depth Composite

**Last aligned:** `2026-07-15T02-09-29-04-00`  
**Status:** `cloud-low-resolution-composite-depth-occlusion-authority-audited`

## Summary

The cloud LOD scale, private scene, low-resolution half-float color target, explicit offscreen render, fullscreen composite, size readback, and disposal now exist. The primary remaining gap is relative depth: no cloud depth is produced, no scene depth is sampled, and the composite is fixed at far clip depth.

## Plan ledger

**Goal:** keep the remaining depth, reconstruction, lifecycle, telemetry, fallback, shadow, and proof work dependency ordered.

- [x] Execute cloud `renderScale`.
- [x] Add cloud-only color target.
- [x] Add offscreen dispatch, composite, size readback, and disposal.
- [ ] Add frame and target-generation identity.
- [ ] Add representative cloud depth and explicit transmittance semantics.
- [ ] Expose and linearize accepted scene depth.
- [ ] Add edge-aware depth reconstruction.
- [ ] Add explicit HDR composite and fallback results.
- [ ] Add target retirement and stale-frame rejection.
- [ ] Add cloud and terrain-shadow telemetry.
- [ ] Add first visible cloud-frame acknowledgement.
- [ ] Prove source, build, artifact, and Pages parity.

## Implemented state

```txt
renderScale consumer: present
private cloud scene: present
cloud-only color target: present
color target format: RGBA HalfFloat
cloud target depth buffer: absent by design
low-resolution dispatch: present
main-scene composite: present
render-size readback: present
disposal: present
```

## Primary depth and composite gaps

```txt
representative cloud-depth output: absent
separate transmittance target: absent
scene-depth input to composite: absent
scene/cloud depth linearization contract: absent
relative cloud/geometry depth comparison: absent
edge-aware or bilateral reconstruction: absent
composite fragment depth: fixed far plane
explicit composite result: absent
```

## Cost and telemetry gaps

```txt
executed sample receipt: absent
cloud GPU timing: absent
cloud CPU timing receipt: absent
target byte estimate receipt: absent
terrain shadow cost receipt: absent
fallback reason readback: absent
CloudFrameResult: absent
FirstVisibleCloudFrameAck: absent
```

## Lifecycle gaps

```txt
target resize implementation: present
target generation identity: absent
resize retirement receipt: absent
quality-transition fence: absent
context-recovery receipt: absent
late predecessor result rejection: absent
in-flight target reference tracking: absent
```

## Source-permitted failure paths

### Cloud in front of distant geometry

```txt
ray march accumulates nearer cloud
  -> target stores color and alpha only
  -> composite emits far-plane depth
  -> distant geometry depth is still less than far depth
  -> geometry can occlude the nearer cloud
```

### Low-resolution silhouette edge

```txt
neighboring low-resolution cloud samples span a terrain or balloon edge
  -> texture is linearly sampled
  -> no full-resolution scene-depth discontinuity is consulted
  -> cloud color can be accepted or rejected without edge-aware reconstruction
```

### Resize or quality transition

```txt
target is resized in place
  -> no target-generation result is published
  -> no stale-frame or in-flight predecessor fence exists
```

These paths are derived from source. They were not reproduced in a browser.

## Dependency order

```txt
frame and target identity
  -> cloud depth/transmittance output
  -> accepted scene-depth exposure
  -> linear depth reconstruction
  -> explicit HDR composite
  -> fallback and terrain-shadow policy
  -> timing and visible-frame receipts
  -> lifecycle and parity fixtures
```

## Retained gaps

Ground-contact delivery, provider/build identity, route lifecycle, world adoption, terrain/vegetation proof, Air Mail history, and flight persistence remain unresolved.

## Do not claim

Do not claim correct cloud occlusion, edge reconstruction, visual equivalence, measured performance improvement, resource retirement, artifact parity, or production readiness until the required fixtures pass.