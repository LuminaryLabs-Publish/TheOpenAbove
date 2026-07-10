# START HERE: TheOpenAbove

**Last aligned:** `2026-07-10T16-20-09-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

## Summary

`TheOpenAbove` is a Vite-hosted cinematic hot-air-balloon drift route using Three.js and NexusEngine from public CDN imports. The route already has source-backed simulation, camera, visual, terrain, volumetric atmosphere, grass, post-process, telemetry, smoke, and headless-editor boundaries.

The newest audit finding is a frame-phase authority split: telemetry is sampled before render, dynamic resolution makes its decision during render, render statistics are written after draw submission, and HUD/GameHost consume a mixed post-render object whose `renderScale` can still describe the pre-sample state.

## Current safe ledge

```txt
TheOpenAbove Render Phase Authority Ledger + Adaptive Resolution Fixture Gate
```

## Read this first

```txt
.agent/trackers/2026-07-10T16-20-09-04-00/project-breakdown.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
```

Then read:

```txt
.agent/architecture-audit/2026-07-10T16-20-09-04-00-render-phase-authority-dsk-map.md
.agent/render-audit/2026-07-10T16-20-09-04-00-telemetry-render-scale-phase-skew.md
.agent/gameplay-audit/2026-07-10T16-20-09-04-00-balloon-drift-frame-phase-loop.md
.agent/interaction-audit/2026-07-10T16-20-09-04-00-input-to-frame-consumption-map.md
.agent/grass-system-audit/2026-07-10T16-20-09-04-00-grass-field-kit-truth-map.md
.agent/telemetry-audit/2026-07-10T16-20-09-04-00-pre-render-snapshot-publication-gap.md
.agent/deploy-audit/2026-07-10T16-20-09-04-00-render-phase-fixture-check-gate.md
.agent/turn-ledger/2026-07-10T16-20-09-04-00.md
```

## Active frame loop

```txt
requestAnimationFrame
  -> simulation.update(dt)
  -> apply balloon transform
  -> animate balloon and presentation
  -> cameraRig.update(dt, state)
  -> visual.update(...)
       copies resolution.state.scale into visual state
  -> engine.tick(dt)
       publishes a pre-render snapshot
  -> visual.render(dt, frameMs)
       submits composer render
       samples frame cost
       may change resolution scale and resize
       writes draw-call and triangle totals
  -> updateHud()
       reads the shared visual state after render
  -> GameHost.getState()
       local snapshot is generated on demand
       Nexus snapshot remains the earlier telemetry publication
```

## Main finding

The current state surfaces do not represent one committed frame phase:

```txt
Nexus telemetry:
  pre-render draw statistics
  pre-sample render scale

HUD and GameHost.local after render:
  current draw statistics
  pre-sample render scale

GameHost.nexusEngine:
  last telemetry tick, which predates the current render submission
```

`createDynamicResolutionController.sample()` can change scale every 90 samples, but the changed scale is not copied back into `visual.state.renderScale` until the next `visual.update()`. This makes adaptive-quality decisions difficult to prove and can create one-frame disagreement across telemetry, HUD, and GameHost.

## Kit truth correction

The active grass path is `open-above-grass-field-domain` plus world-seed, biome-density, exclusion-mask, chunk-placement, LOD, and compute-culling kits. `open-above-grass-detail-kit` still exists in source but is not imported by `visual-domain.js`; treat it as a legacy inactive implementation, not the active grass service.

## Guardrails

```txt
Push only to main.
Do not create branches or pull requests.
Do not work on TheCavalryOfRome.
Do not retune visible simulation, camera, terrain, clouds, water, grass, lighting, or post-process behavior during the proof pass.
Preserve GameHost.local and GameHost.nexusEngine compatibility.
Add phase and adaptive-quality readback additively.
Keep journals bounded, deterministic, JSON-safe, and disposable.
Do not delete the legacy grass-detail implementation until compatibility and replacement evidence are explicit.
```