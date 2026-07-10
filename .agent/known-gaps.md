# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-10T16-20-09-04-00`

## Primary gap

The runtime has no committed-frame authority spanning visual update, telemetry publication, render submission, adaptive-resolution sampling, render statistics, HUD projection, and GameHost readback.

## Current gaps

```txt
src/main.js calls engine.tick(dt) before visual.render(dt, frameMs).
visual.update() copies resolution.state.scale before resolution.sample() runs.
visual.render() can change scale and resize after telemetry has already sampled state.
visual.render() writes drawCalls and triangles after telemetry publication.
HUD reads a shared mutable visual state after render, but renderScale can still be pre-sample.
GameHost.local is generated on demand and can contain a different phase mix than GameHost.nexusEngine.
No row records scaleBefore, scaleAfter, smoothedMs, sampleFrames, decision reason, or resize result.
No frame ID joins simulation, camera, visual update, telemetry, render, HUD, and GameHost.
No input sequence range is attached to a committed frame.
No bounded frame-phase or adaptive-quality decision journal exists.
No DOM-free fixture drives the 90-sample dynamic-resolution decision boundary.
The headless environment reports static inspection rather than runtime frame-phase proof.
The static smoke checks source text and required files but cannot detect phase disagreement.
The prior kit registry lists open-above-grass-detail-kit as implemented without marking it inactive.
The active grass-field domain and its six supporting kits were not fully represented in the prior kit inventory.
The legacy grass-detail implementation has no explicit deprecation, compatibility, or removal ledger.
```

## Required proof rows

```txt
frame-begin row
input-range row
simulation row
balloon-presentation row
camera row
visual-pre-render row
render-submission row
adaptive-quality-decision row
renderer-statistics row
committed-frame row
telemetry-publication row
HUD-projection row
GameHost-projection row
grass-kit-truth row
fixture-summary row
```

## Required quality-decision statuses

```txt
sampled
held
warming-up
downscaled
upscaled
at-minimum
at-tier-cap
resized
no-change
rendered
published
projected
skipped
failed
```

## Grass registry truth

### Active

```txt
open-above-grass-world-seed-kit
open-above-grass-biome-density-kit
open-above-grass-exclusion-mask-kit
open-above-grass-chunk-placement-kit
open-above-grass-lod-kit
open-above-grass-compute-culling-kit
open-above-grass-field-domain
```

### Source-backed but inactive

```txt
open-above-grass-detail-kit
```

## Non-gaps for the next pass

```txt
The Balloon Drift route boots through Vite.
The runtime already separates simulation, camera, presentation, visual, telemetry, smoke, and headless files.
Dynamic resolution already has bounded scale changes and a 90-sample cadence.
The active grass system is deterministic by world seed and chunk coordinates.
GameHost already exposes compatibility state and live runtime objects.
Build already depends on npm run check.
```

## Do not prioritize next

```txt
visual fidelity expansion
renderer replacement
terrain extraction
cloud, water, lighting, or grass retuning
camera framing changes
balloon geometry changes
simulation constant changes
new regions or objectives
quality threshold changes before decision proof
legacy grass deletion without compatibility evidence
```

## Next safe ledge

```txt
TheOpenAbove Render Phase Authority Ledger + Adaptive Resolution Fixture Gate
```