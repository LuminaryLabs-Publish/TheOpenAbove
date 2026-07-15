# Known Gaps: TheOpenAbove Cloud Low-Resolution Rendering

**Last aligned:** `2026-07-14T22-39-00-04-00`  
**Status:** `cloud-low-resolution-depth-upscale-authority-audited`

## Summary

The cloud LOD descriptor contains a scale that has no execution owner. Clouds render in the shared HDR scene pass, while the only active resolution controller scales the entire world.

## Plan ledger

**Goal:** keep target, ray-march, upscale, shadow, fallback, retirement and proof gaps dependency ordered.

- [ ] Frame and profile identity.
- [ ] Cloud-only target allocation.
- [ ] Executed sample receipts.
- [ ] Temporal history ownership and reset.
- [ ] Scene-depth correlation.
- [ ] Depth-aware upscale.
- [ ] Explicit HDR composite order.
- [ ] Terrain shadow budget.
- [ ] Fallback classification.
- [ ] Target and history retirement.
- [ ] GPU timing and visible-frame acknowledgement.
- [ ] Source, build and Pages parity.

## Descriptor and execution gaps

```txt
renderScale descriptor: present
renderScale consumer: absent
temporalJitter descriptor: present
history owner: absent
maxDistance descriptor: present, shader uses fixed 4200 cap
fallbackImpostors: false
execution profile result: absent
```

## Target and composite gaps

```txt
cloud-only color target: absent
transmittance target: absent
cloud depth target: absent
scene-depth input to cloud composite: absent
depth-aware upscale: absent
explicit cloud HDR composite pass: absent
```

## Cost and telemetry gaps

```txt
view/light budgets: configured
actual executed sample receipt: absent
cloud GPU timer: absent
terrain shadow cost receipt: absent
cloud target dimensions readback: absent
history generation readback: absent
fallback reason readback: absent
```

## Retirement gaps

```txt
cloud target retirement: not applicable because targets do not exist
future target-generation fence: absent
history retirement: absent
late cloud-result rejection: absent
context-loss recovery receipt: absent
```

## Validation gaps

```txt
low-resolution target fixture: unavailable
depth-edge fixture: unavailable
history/reset fixture: unavailable
fallback fixture: unavailable
terrain-shadow policy fixture: unavailable
GPU timing capture: not run
browser visible-frame fixture: not run
built artifact fixture: not run
Pages fixture: not run
```

## Dependency order

```txt
frame/profile identity
  -> target allocation
  -> ray march
  -> optional history
  -> depth-aware upscale
  -> HDR composite
  -> shadow/fallback result
  -> telemetry and visible frame
  -> artifact parity
```

## Retained gaps

Ground-contact delivery, provider/build identity, lifecycle retirement, world adoption, terrain/vegetation proof, Air Mail history and flight persistence remain unresolved.

## Do not claim

Do not claim faster rendering, equivalent cloud quality, correct silhouette reconstruction, target retirement, artifact parity or production readiness until GPU and browser fixtures pass.
