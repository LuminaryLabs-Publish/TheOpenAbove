# START HERE: TheOpenAbove WebGL Context-Loss Recovery

**Last aligned:** `2026-07-16T03-03-22-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Reviewed pre-audit repository head:** `4de46a2f769624e8a65eabc6114185e4dcf738f5`  
**Reviewed runtime source revision:** `1417c80309218c7c61def3b2f09a977eaab8b953`  
**Status:** `webgl-context-resource-recovery-authority-audited`

## Summary

The application constructs one WebGL renderer and a large GPU-resource graph, then renders through an unbounded RAF loop. It has ordinary disposal but no product-owned context-loss/restoration admission, renderer generation, ordered resource reconstruction, stale-generation rejection, fallback, or first-recovered-frame acknowledgement.

## Plan ledger

**Goal:** recover one coherent renderer/resource generation after WebGL context loss or expose an actionable fallback without corrupting simulation, Air Mail, world, or presentation state.

- [x] Compare all 11 Publish repositories with the central ledger.
- [x] Exclude TheCavalryOfRome.
- [x] Confirm ten eligible ledgers, root `.agent` states, and synchronized heads.
- [x] Select only TheOpenAbove using the oldest synchronized timestamp.
- [x] Inspect renderer, HDR, cloud, world-resource, RAF, disposal, validation, and deployment surfaces.
- [x] Preserve all 101 active named surfaces and their services.
- [x] Add the `2026-07-16T03-03-22-04-00` renderer-recovery audit family.
- [ ] Implement and prove context-loss admission, resource rehydration, recovered-frame convergence, fallback, artifact, and Pages behavior.

## Read this pass first

```txt
.agent/trackers/2026-07-16T03-03-22-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-16T03-03-22-04-00.md
.agent/architecture-audit/2026-07-16T03-03-22-04-00-webgl-context-resource-recovery-dsk-map.md
.agent/render-audit/2026-07-16T03-03-22-04-00-context-loss-first-recovered-frame-gap.md
.agent/gameplay-audit/2026-07-16T03-03-22-04-00-render-loss-noninteractive-flight-loop.md
.agent/interaction-audit/2026-07-16T03-03-22-04-00-render-recovery-command-result-map.md
.agent/renderer-recovery-audit/2026-07-16T03-03-22-04-00-webgl-resource-rehydration-contract.md
.agent/deploy-audit/2026-07-16T03-03-22-04-00-context-loss-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-16T03-03-22-04-00-oldest-selection-renderer-recovery-reconciliation.md
```

## Source-backed state

```txt
single WebGLRenderer generation: present
HDR color/depth targets: present
cloud private target and shaders: present
streamed terrain/flora resources: present
ordinary disposal: present
webglcontextlost admission: absent
webglcontextrestored admission: absent
renderer/resource generation identity: absent
ordered GPU-resource reconstruction: absent
stale-generation rejection: absent
recovery deadline/retry budget: absent
RenderRecoveryResult: absent
RenderFallbackResult: absent
FirstRecoveredFrameAck: absent
```

## Required parent domain

`open-above-webgl-context-resource-recovery-authority-domain`

## Next safe ledge

Add loss/restoration observation, renderer generations, a dependency-ordered resource manifest, presentation and simulation policy, renderer/composer/cloud/world reconstruction, stale-work rejection, bounded retry/fallback, and first-recovered-frame proof.

## Do not claim

Do not claim renderer recovery, context restoration, GPU-resource rehydration, fallback correctness, recovered-frame convergence, artifact parity, Pages parity, or production readiness until the forced-loss fixture matrix passes.