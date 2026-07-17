# Render Audit: Fixed Wind Particle Cost and Frame Proof Gap

**Timestamp:** `2026-07-17T15-41-19-04-00`

## Summary

The new wind visual is materially simpler than the retired spline renderer and uses one `THREE.Points` draw. Its CPU simulation policy remains fixed at 3,200 particles per accepted flight frame, independent of quality tier, frame pressure or measured update cost.

## Implemented render path

```txt
3,200 local particle positions
  -> layered 3D flow noise per particle
  -> three scalar position writes per particle
  -> DynamicDraw BufferAttribute needsUpdate
  -> one PointsMaterial
  -> procedural 32x32 CanvasTexture
  -> NormalBlending / depth test / no depth write
  -> one player-centered Points object
  -> HDR scene render
```

## Source-backed strengths

- One draw surface replaces route spline trails.
- Position and phase arrays retain stable identities.
- The position attribute is marked `DynamicDrawUsage`.
- Particle texture, geometry and material are explicitly disposed.
- `depthWrite` is disabled, reducing transparent depth corruption.
- Map-open frames skip simulation updates.
- Source tests reject additive blending and legacy route visuals.

## Gap

```txt
quality-tier particle count: absent
quality-tier noise profile: absent
frame-pressure response: absent
update cadence policy: absent
CPU update duration: absent
scalar/upload byte budget: absent
adaptive degradation result: absent
wind sample revision in render diagnostics: absent
WindParticleFrameDigest: absent
FirstWindParticleBoundFrameAck: absent
runtime browser fixture: absent
```

At the default policy, every active flight frame performs 3,200 layered noise evaluations and 9,600 scalar writes before requesting a buffer upload. Source inspection does not establish whether this cost is negligible, material or device-dependent.

## Proposed render contract

```txt
accepted WindVisualAdmissionResult
  -> admitted capacity and noise profile
  -> bounded WindParticleUpdateResult
  -> WindVisualBudgetResult
  -> renderer consumes buffer revision
  -> WindParticleFrameDigest
  -> FirstWindParticleBoundFrameAck
```

## Required fixtures

- Warm-up and verify stable array, attribute, geometry, texture and material identities.
- Measure update duration and upload volume at low, medium and high quality tiers.
- Verify cadence or capacity degradation under synthetic frame pressure.
- Verify no visual update while map suspension is active.
- Verify stale wind generations cannot mutate the active buffer.
- Correlate accepted sample/policy/buffer revisions with the rendered frame.
- Compare source, Vite artifact and Pages behavior.

## Boundary

No render defect, optimization gain, accepted budget or production readiness is claimed. Runtime rendering was not changed by this audit.
