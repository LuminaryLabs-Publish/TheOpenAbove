# Current Audit: TheOpenAbove WebGL Context-Loss Recovery

**Last aligned:** `2026-07-16T03-03-22-04-00`  
**Status:** `webgl-context-resource-recovery-authority-audited`  
**Reviewed pre-audit repository head:** `4de46a2f769624e8a65eabc6114185e4dcf738f5`  
**Reviewed runtime source revision:** `1417c80309218c7c61def3b2f09a977eaab8b953`

## Summary

The highest-value current gap is renderer liveness after WebGL context loss. The route owns renderer creation, GPU resources, update, render, resize, and ordinary disposal, but not loss/restoration events, resource generations, reconstruction ordering, verification, fallback, or a recovered-frame result.

## Plan ledger

**Goal:** isolate the smallest authority that preserves one coherent visible renderer/resource generation after loss without moving simulation, world, or gameplay truth into browser callbacks.

- [x] Compare the current Publish inventory, central ledgers, root `.agent` coverage, and heads.
- [x] Select only TheOpenAbove using the oldest synchronized rule.
- [x] Inspect main host, visual domain, HDR composer, volumetric clouds, package checks, deployment, and previous audits.
- [x] Preserve all 101 active named surfaces and service ownership.
- [x] Add the timestamped renderer-recovery audit family.
- [ ] Implement and prove forced loss, reconstruction, fallback, and first-recovered-frame contracts.

## Complete interaction loop

```txt
boot
  -> create renderer scene camera world HDR cloud and streamed resources
  -> load balloon and compose gameplay/presentation
  -> publish GameHost and begin RAF

frame
  -> update simulation Air Mail airstream balloon camera world and engine
  -> render clouds to private target
  -> render HDR composer to visible canvas
  -> mark firstFramePresented and schedule RAF

loss today
  -> context loss is not admitted by product code
  -> no generation is retired
  -> no presentation/simulation policy result exists
  -> no resource manifest is rebuilt
  -> no recovered frame or fallback is acknowledged
```

## Domains in use

```txt
workflow provider build artifact and Pages deployment
browser lifecycle RAF resize error projection and GameHost
WebGL capability context lifecycle renderer generation and recovery
balloon simulation telemetry presentation and camera
airstream Air Mail map and suspension
Nexus Engine telemetry Core World foundation features and landforms
world generation terrain vegetation grass flowers water and landmarks
quality dynamic resolution sky clouds HDR depth and color grading
GPU-resource registration reconstruction verification and retirement
validation browser fixtures and central tracking
```

## Kit and service census

```txt
local source-backed kits:           71
runtime-implied adapters:           13
Core World provider surfaces:       17
active documented total:           101
inactive or retired legacy:         13
planned recovery surfaces:          20
new runtime kit IDs:                 0
```

The complete kit-by-kit inventory and services are in `.agent/trackers/2026-07-16T03-03-22-04-00/project-breakdown.md`.

## Source-backed findings

```txt
one WebGLRenderer: present
recursive RAF: present
HDR targets and independent depth textures: present
cloud target and shader graph: present
streamed world GPU resources: present
ordinary disposal: present
webglcontextlost/restored listeners: absent
renderer/context/resource generation: absent
reconstruction registry: absent
stale callback/resource rejection: absent
recovery deadline and retry budget: absent
RenderLossResult: absent
RenderRecoveryResult: absent
RenderFallbackResult: absent
FirstRecoveredFrameAck: absent
```

## Required parent domain

`open-above-webgl-context-resource-recovery-authority-domain`

## Required transaction

```txt
RenderRecoveryAdmissionCommand
  -> bind document runtime renderer context and resource generations
  -> observe and classify loss once
  -> suspend stale presentation and apply simulation/input policy
  -> admit one restoration generation
  -> rebuild renderer composer cloud and world GPU resources in dependency order
  -> reject stale generation work
  -> enforce deadline retry budget and fallback policy
  -> publish RenderLossResult
  -> publish RenderRecoveryResult or RenderFallbackResult
  -> present and acknowledge FirstRecoveredFrameAck
```

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, shaders, gameplay, packages, tests, workflows, and deployment were not changed. No browser, build, artifact, or Pages fixture was run.