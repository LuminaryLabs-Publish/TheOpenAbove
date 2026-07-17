# Architecture Audit: Gaussian Cloud LOD Membership DSK Map

**Timestamp:** `2026-07-17T02-32-08-04-00`  
**Status:** `gaussian-cloud-lod-membership-transition-authority-audited`

## Summary

The runtime now has a complete close-cloud generation and projection path, but the accepted visible membership remains adapter-local and ephemeral. The missing architectural boundary is not another cloud renderer; it is one authority that binds field identity, live weather, camera evidence, capacity, LOD membership, transitions and frame proof.

## Current DSK/domain map

```txt
Meadow Lift Scene
├─ Journey Domain
├─ Ballooning Domain
├─ Sky Domain
│  ├─ Airstream Domain
│  ├─ Wind Particle Field Kit
│  └─ Cloud Bank Field Kit
│     ├─ deterministic bank generation
│     ├─ volume-reach query
│     ├─ five Gaussian LOD tiers
│     └─ deterministic splat sampler
├─ Land Domain
│  └─ Core World / Foundation / Features / Atmosphere
├─ Navigation Domain
├─ Image Capture Domain
└─ Experience Domain
   └─ Visual Domain
      ├─ Cloud Weather Map Kit
      │  └─ Core Weather + Layered Weather
      ├─ Volumetric Cloud Kit
      │  └─ high-cloud + cirrus
      └─ Gaussian Cloud Render Adapter
         ├─ close-layer weather visibility
         ├─ camera-distance LOD
         ├─ nearest-first capacity truncation
         ├─ far-to-near transparency order
         └─ instance-buffer replacement
```

## Ownership that exists

| Surface | Current ownership |
|---|---|
| Field source | `WORLD.weather.layers`, `WORLD.surface`, `WORLD.seed` |
| Bank placement | `open-above-cloud-bank-field-kit` |
| LOD thresholds and splat counts | `CLOUD_SPLAT_LOD_TIERS` |
| Live opacity | `open-above-cloud-weather-map-kit` and Layered Weather snapshots |
| Quality capacity | `open-above-gaussian-cloud-render-adapter` |
| Candidate selection | renderer-local candidate array and sort/truncate sequence |
| GPU projection | renderer-local `InstancedBufferGeometry` attributes |
| Diagnostics | adapter-local mutable state read through Experience snapshot |

## Missing DSK authority

`open-above-gaussian-cloud-lod-membership-transition-authority-domain`

```txt
CloudFieldAdmissionCommand
  -> CloudFieldAdmissionResult
  -> CloudFieldRevision
  -> CloudFieldDigest

CloudSplatBudgetCommand
  -> CloudSplatBudgetResult
  -> stable per-bank quotas
  -> nearest-first overflow policy

CloudMembershipTransitionCommand
  -> CloudLodMembershipResult
  -> hysteresis and predecessor retention
  -> enter/leave/tier crossfade
  -> stale rebatch rejection

CloudProjectionCommitCommand
  -> immutable instance-buffer generation
  -> CloudProjectionDigest
  -> CloudProjectionResult
  -> FirstGaussianCloudFrameAck
```

## Planned coordinating surfaces

1. `open-above-gaussian-cloud-lod-membership-transition-authority-domain`
2. `cloud-field-generation-admission-kit`
3. `cloud-field-revision-kit`
4. `cloud-bank-query-kit`
5. `cloud-bank-volume-reach-kit`
6. `cloud-splat-lod-policy-kit`
7. `cloud-splat-budget-admission-kit`
8. `cloud-bank-quota-kit`
9. `cloud-membership-retention-kit`
10. `cloud-lod-hysteresis-kit`
11. `cloud-splat-crossfade-kit`
12. `cloud-rebatch-generation-kit`
13. `stale-cloud-rebatch-rejection-kit`
14. `cloud-weather-visibility-binding-kit`
15. `gaussian-instance-buffer-commit-kit`
16. `cloud-projection-digest-kit`
17. `cloud-lod-membership-result-kit`
18. `cloud-projection-result-kit`
19. `first-gaussian-cloud-frame-ack-kit`
20. `cloud-transition-fixture-kit`

## Integration rule

Keep bank generation renderer-neutral in Sky. Keep Three.js buffer mutation in the visual adapter. Place admission, stable membership and transition policy between them as immutable command/result contracts. The visual adapter should consume one accepted projection result rather than recomputing semantic membership privately.

## Boundary

This audit proposes targeted ownership around the new Gaussian path. It does not propose restructuring Journey, Ballooning, Land, Navigation, Image Capture, the Core World family or the distant volumetric renderer.