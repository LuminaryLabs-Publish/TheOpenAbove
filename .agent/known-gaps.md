# Known Gaps: TheOpenAbove WebGL Context-Loss Recovery

**Last aligned:** `2026-07-16T03-03-22-04-00`  
**Status:** `webgl-context-resource-recovery-authority-audited`

## Summary

The product has a sophisticated WebGL presentation graph and ordinary disposal, but no owned loss/restoration transaction or executable recovered-frame evidence.

## Plan ledger

**Goal:** keep renderer identity, loss admission, resource reconstruction, gameplay policy, fallback, proof, and retained product gaps dependency ordered.

- [x] Identify renderer and GPU-resource owners.
- [x] Confirm context-loss/restoration listeners are absent.
- [x] Separate normal disposal from recovery.
- [x] Define recovery command, result, manifest, deadline, fallback, and acknowledgement surfaces.
- [ ] Implement loss/restoration admission.
- [ ] Implement resource registration and reconstruction.
- [ ] Implement stale-generation rejection and bounded fallback.
- [ ] Prove source, build, artifact, and Pages behavior.

## Implemented state

```txt
WebGLRenderer creation: present
shadow/color-space renderer state: present
HDR composer and half-float targets: present
independent depth textures: present
volumetric-cloud target and shaders: present
terrain vegetation grass flowers water landmarks: present
balloon airstream and town presentation resources: present
dynamic resolution and resize: present
ordinary visual disposal: present
```

## Primary recovery gaps

```txt
RenderCapabilityRevision: absent
RendererGeneration: absent
ContextGeneration: absent
ResourceManifestRevision: absent
webglcontextlost listener: absent
webglcontextrestored listener: absent
loss deduplication: absent
presentation suspension result: absent
simulation/input loss policy: absent
GPU-resource registration manifest: absent
renderer reconstruction: absent
composer/depth reconstruction: absent
cloud-target reconstruction: absent
terrain/flora reconstruction: absent
stale-generation rejection: absent
```

## Deadline, fallback, and evidence gaps

```txt
recovery deadline: absent
retry budget: absent
repeated-loss policy: absent
unsupported-restoration result: absent
RenderLossResult: absent
ResourceRehydrationResult: absent
RenderRecoveryResult: absent
RenderFallbackResult: absent
FirstRecoveredFrameAck: absent
forced-loss browser fixture: absent
source/build/artifact/Pages parity: unproven
```

## Gameplay-coherence gaps during loss

```txt
simulation continue/suspend policy: absent
elapsed-time policy: absent
Air Mail settlement policy: absent
held-input cancellation policy: absent
map-state policy: absent
accepted recovery snapshot revision: absent
resume/catch-up/rollback rule: absent
```

## Dependency order

```txt
capability and generation identity
  -> context-loss admission
  -> stale presentation suspension
  -> simulation/input policy
  -> restoration admission
  -> dependency-ordered resource reconstruction
  -> verification and adoption
  -> first recovered frame
  -> acknowledgement or fallback
  -> artifact and Pages parity
```

## Retained product gaps

Game audio, device-control coverage, host-clock fixed steps, HDR/depth attachment coherence, cloud relative depth, ground-contact delivery eligibility, provider/build identity, route retirement, world adoption, terrain/vegetation proof, Air Mail history, and flight persistence remain unresolved.

## Do not claim

Do not claim renderer recovery, context restoration, resource rehydration, stale-generation safety, fallback correctness, first-recovered-frame convergence, artifact parity, Pages parity, or production readiness until the required fixtures pass.