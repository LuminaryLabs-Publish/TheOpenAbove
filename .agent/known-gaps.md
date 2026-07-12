# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-12T00-39-05-04-00`

## Primary ordered gaps

```txt
1. immutable runtime admission
2. import purity and single frame owner
3. balloon profile snapshot, schema, admission and fingerprint
4. balloon model assembly, load generation and resource ownership
5. runtime session/listener/resource ownership
6. fixed-step clock and sequenced input
7. product source and acceptance parity
8. Air Mail route and delivery authority
9. mission reset transaction and epoch
10. committed observation correlation
11. terrain source, LOD and atomic replacement
12. grass spatial identity and backend truth
13. world-surface consumer parity
14. balloon steering input/result authority
15. simulation/root/part/camera steering coherence
16. steering reset neutralization and visible-frame proof
```

## Balloon profile gaps

```txt
root default profile is mutable
default root profile aliases nested imported defaults
panel and pattern palette arrays are mutable
public window kit exposes the same root profile reference
load helper does not clone before asynchronous yield
no complete profile schema or compatibility version
no canonicalization or deterministic ordering
no deep validation of nested arrays and attachment inputs
no deep-frozen admitted snapshot
no profile ID, revision or fingerprint
no load command ID or load generation
no stale/cancelled profile-load rejection
no model/profile aggregate commit receipt
no profile provenance in GameHost or visible frames
```

## Corrected prior finding

```txt
integrated pattern metadata handoff: present
```

`buildEnvelopeAssembly()` passes `streamers.userData.pattern` into `buildEnvelopePanels()`. Do not continue treating the pattern-to-shell handoff as missing. The remaining issue is that the pattern policy is mutable and not included in an admitted fingerprinted profile.

## Retained model-resource gaps

```txt
no detached production load transaction
no complete geometry/material/texture inventory
no cross-component attachment validator
no root disposal/retirement receipt
no model-to-visible-frame provenance
```

## Steering input and state-owner gaps

```txt
ambient key Set instead of a sequenced command
no inputSampleId, inputSequence or fixed simulationTickId admission
no steering policy ID/version
simulation, root, presentation and camera own separate response state
no shared steering result/revision or atomic consumer commit
```

## Reset and lifecycle gaps

```txt
no transaction resets held input, trim, root response, part inertia and camera together
no mission epoch fences predecessor profile/model/steering state
no neutral-convergence result
no stale presentation/camera/model rejection
no first neutral replacement-frame receipt
```

## Observation gaps

```txt
model readback exposes readiness booleans only
profile ID/version/revision/fingerprint are absent
presentation transforms are absent
camera steering acknowledgement is absent
HUD is not correlated to a committed result
renderFrameId and visible model/steering receipts are absent
```

## Required profile fixtures

```txt
fixture:balloon-profile-schema
fixture:balloon-profile-canonicalization
fixture:balloon-default-alias-isolation
fixture:balloon-profile-mutation-during-yield
fixture:balloon-profile-fingerprint-stability
fixture:balloon-stale-load-generation
fixture:balloon-model-profile-receipt
fixture:balloon-first-visible-profile-frame
fixture:pages-model-profile-parity
```

Do not treat `modelReady`, `loadedDuringLevelSetup`, the root profile object, or a successful static smoke as proof of which profile produced the visible balloon.