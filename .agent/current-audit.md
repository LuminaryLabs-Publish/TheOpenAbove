# Current Audit: TheOpenAbove Cloud Depth Composite

**Last aligned:** `2026-07-15T02-09-29-04-00`  
**Status:** `cloud-low-resolution-composite-depth-occlusion-authority-audited`  
**Reviewed pre-audit documentation head:** `b1590e1e1e82a56f656db2954870c8252e4213c9`  
**Reviewed runtime head:** `af3f5b96f28a32b1521c6ab7227c26d0c727370b`

## Summary

The previously unused cloud `renderScale` is now executed. The volume renders into a private low-resolution half-float target and a fullscreen mesh composites cloud color and alpha through the main HDR scene. The implementation does not output representative cloud depth or sample scene depth; its fullscreen geometry is fixed at far clip depth, so all depth-writing scene geometry can occlude the cloud sample regardless of actual cloud distance.

## Plan ledger

**Goal:** reconcile the implemented optimization and define the smallest remaining reliable cloud-depth composite boundary.

- [x] Compare the full Publish inventory, central ledger, root `.agent` coverage, and current heads.
- [x] Select only TheOpenAbove because it is runtime-ahead by two commits.
- [x] Inspect cloud target allocation, shader outputs, composite shader, material state, visual-domain render order, and disposal.
- [x] Preserve all 101 active named surfaces and service ownership.
- [x] Add and route the timestamped audit family.
- [ ] Implement and prove cloud/geometry relative-depth reconstruction and typed frame results.

## Complete interaction loop

```txt
browser and workflow admission
  -> checkout product and provider
  -> test bundle upload deploy
  -> compose gameplay world visual and UI domains
  -> create renderer scene camera and HDR composer
  -> enter RAF

frame update
  -> advance balloon airstream and Air Mail truth
  -> update weather sun sky cloud uniforms terrain vegetation grass flowers water and camera

cloud pass
  -> query drawing-buffer dimensions
  -> resize cloud target to dimensions * LOD renderScale
  -> bind RGBA HalfFloat target without depth buffer
  -> clear transparent black
  -> ray march private cloud sphere
  -> write accumulated color and alpha
  -> restore renderer target clear color alpha and autoClear

HDR pass
  -> draw the full main scene and scene depth
  -> draw transparent fullscreen cloud plane
  -> sample low-resolution color and alpha only
  -> compare fixed far-plane fragment depth with scene depth
  -> grade and present the frame
  -> sample total frame time for whole-scene dynamic resolution

teardown
  -> remove cloud composite and private mesh
  -> dispose both geometries both materials and target
  -> dispose remaining visual resources
```

## Domains in use

```txt
GitHub workflow provider checkout Vite build artifact and Pages
browser route import map RAF input errors and GameHost
Nexus Engine telemetry Core World foundations features and landforms
balloon flight telemetry presentation camera and clipping
airstream routes fields forces visuals and debugging
Air Mail parcels routes towns volumes and progress
staged world generation terrain vegetation grass flowers water landmarks
quality tiers whole-scene dynamic resolution and cloud LOD
weather sky sun aerial perspective cloud lighting and ray marching
private low-resolution target dispatch and lifecycle
scene depth cloud depth reconstruction HDR composite and color grading
terrain procedural cloud shadows
parchment map headless validation tests and central tracking
```

## Kit and service census

```txt
local source-backed kits:           71
runtime-implied adapters:           13
Core World surfaces:                17
active documented total:           101
inactive or retired legacy:         13
planned cloud authority surfaces:   20
new runtime kit IDs:                 0
```

The complete kit-by-kit service inventory is in the timestamped tracker and `.agent/kit-registry.json`.

## Source-backed findings

```txt
cloud LOD renderScale consumed: yes
private cloud scene: yes
cloud-only target: yes
cloud target type: RGBA HalfFloat
cloud target depth buffer: no
cloud target scale: 0.50 / 0.42 / 0.32
view/light budgets retained: yes
separate transmittance target: no
representative cloud-depth target: no
scene-depth sampler in composite: no
edge-aware reconstruction: no
composite clip depth: far plane
composite depth test: enabled
relative cloud/geometry comparison: no
render-size readback: yes
cloud disposal: yes
terrain shadow cost joined to result: no
CloudFrameResult: no
GPU timing receipt: no
FirstVisibleCloudFrameAck: no
```

## Required parent domain

```txt
open-above-cloud-low-resolution-depth-upscale-authority-domain
```

## Required transaction

```txt
CloudDepthCompositeCommand
  -> bind FrameId renderer quality viewport DPR weather camera and scene-depth revisions
  -> admit one target generation
  -> ray march color transmittance and representative cloud depth
  -> receipt scale and view/light sample execution
  -> reconstruct reduced-resolution samples against linear scene depth
  -> preserve clouds in front of farther geometry
  -> reject bleeding across nearer terrain balloon rope town and vegetation silhouettes
  -> composite into HDR before color grading
  -> classify Full Reduced ColorOnly FarDepthFallback Disabled or Rejected
  -> publish CloudFrameResult and retirement receipts
  -> publish FirstVisibleCloudFrameAck
```

## Validation boundary

Documentation only. The runtime commits were inspected but not changed by this audit. No browser, GPU, build, artifact, or Pages fixture was run.