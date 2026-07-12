# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-11T22-58-50-04-00`

## Primary ordered gaps

```txt
1. immutable runtime admission
2. import purity and single frame owner
3. balloon model descriptor, profile admission and fingerprint
4. detached model loading, resource inventory and retirement
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

## Retained balloon model gaps

```txt
no canonical model schema/version/revision/fingerprint
no detached production load transaction
no complete geometry/material/texture inventory
no cross-component attachment validator
no root disposal/retirement receipt
no model-to-visible-frame provenance
integrated pattern metadata is not handed to the unified shell call
```

## Steering input gaps

```txt
ambient key Set instead of a sequenced command
no inputSampleId or inputSequence
no simulationTickId admission
no steering policy ID/version
no accepted/rejected/duplicate/stale result
blur clears input without a retirement result
variable RAF sampling controls response timing
```

## Steering state-owner gaps

```txt
simulation owns lateralTrim, acceleration, bank and heading
balloon root applies separate transform state
presentation owns envelope and gondola smoothing state
camera owns steeringLook and camera smoothing state
no shared steeringResultId
no shared response revision
no atomic consumer commit
```

## Reset and lifecycle gaps

```txt
no transaction resets held input, trim, root response, part inertia and camera look together
no mission epoch fences predecessor steering state
no neutral-convergence result
no stale presentation/camera rejection
no first neutral replacement-frame receipt
```

## Observation gaps

```txt
simulation snapshot includes input, trim, bank and heading
presentation transforms are absent
camera steeringLook/target/position acknowledgement is absent
HUD is not correlated to a steering result
GameHost cannot identify the steering result rendered
renderFrameId and visible steering-frame receipt are absent
```

## Required steering fixtures

```txt
fixture:steering-input-sequence
fixture:steering-left-right-symmetry
fixture:steering-reversal
fixture:steering-neutral-convergence
fixture:steering-cadence-parity-30-60-120
fixture:steering-blur-retirement
fixture:steering-mission-reset
fixture:steering-stale-duplicate-rejection
fixture:steering-consumer-ack-parity
fixture:steering-first-visible-frame
fixture:pages-steering-presentation-parity
```

Do not treat the HUD trim value or simulation snapshot as proof that envelope, gondola and camera response reached the same visible frame.
