# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-12T05-11-46-04-00`

## Status

```txt
status: hdr-attachment-resolution-lifecycle-authority-audited
repository revision reviewed: 270f8471a582dc8e01128dbd51bd8566972e95d6
runtime source changed by this pass: no
branch: main
root .agent state: refreshed
central ledger sync: complete
central internal change log: complete
```

## Summary

The visual stack does not commit renderer size, composer target size and depth attachments as one aggregate. Browser resize applies the effective pixel ratio through the dynamic-resolution controller, then calls a second HDR resize that writes the tracked depth texture images back to CSS dimensions.

The HDR constructor also assigns an initial depth texture before replacing both composer depth attachments with new textures. Only the replacements are tracked in the returned array, so the predecessor attachment has no explicit ownership-transfer or retirement result.

## Plan ledger

**Goal:** define one HDR surface transaction from CSS/DPR observation through physical-size planning, compatible color/depth preparation, atomic commit, rollback, resource retirement and visible-frame acknowledgement.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central and root `.agent` coverage.
- [x] Avoid newer unsynchronized `PrehistoricRush` audit work.
- [x] Select only `TheOpenAbove`.
- [x] Review `AGENTS.md`, visual source, quality policy, HDR composer and smoke checks.
- [x] Trace startup allocation, resize sources, dynamic-scale changes and disposal.
- [x] Preserve the complete 59-kit source-backed inventory and service map.
- [x] Define attachment identity, resize generation, dimension admission, framebuffer results, commit, rollback and retirement.
- [x] Add timestamped tracker and system audits.
- [x] Refresh root `.agent` routing state and kit registry.
- [x] Synchronize the central ledger and internal change log.
- [ ] Implement runtime changes and execute browser/Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

PrehistoricRush    2026-07-12T03-51-15-04-00 skipped: newer repo-local audit commits were not yet centrally synchronized
TheOpenAbove       2026-07-12T04-00-32-04-00 selected: oldest stable fully synchronized eligible repository
IntoTheMeadow      2026-07-12T04-11-54-04-00
PhantomCommand     2026-07-12T04-18-44-04-00
HorrorCorridor     2026-07-12T04-28-03-04-00
ZombieOrchard      2026-07-12T04-38-12-04-00
TheUnmappedHouse   2026-07-12T04-44-36-04-00
AetherVale         2026-07-12T04-50-41-04-00
MyCozyIsland       2026-07-12T05-00-19-04-00
TheCavalryOfRome   excluded
```

## Interaction loop

```txt
visual startup
  -> detect hardware quality tier
  -> create WebGL renderer
  -> allocate HDR render target at CSS dimensions
  -> attach one depth texture to the supplied target
  -> create EffectComposer and clone its second render target
  -> replace both composer depth attachments with two new textures
  -> create dynamic-resolution controller

browser resize
  -> sample CSS width, CSS height and devicePixelRatio
  -> derive effective pixel ratio from DPR cap and dynamic scale
  -> resize renderer and EffectComposer to physical dimensions
  -> call HDR composer resize a second time
  -> force tracked depth texture image dimensions back to CSS dimensions
  -> render with no attachment revision or completeness result

dynamic-scale sample
  -> smooth frame time
  -> every 90 samples raise or lower dynamic scale
  -> resize renderer and EffectComposer through the resolution controller only
  -> do not execute the HDR wrapper's CSS-size depth rewrite

dispose
  -> dispose the two replacement depth textures
  -> dispose target and composer
  -> retain no explicit lease for the original depth texture that was replaced
```

## Source-backed findings

### Browser resize mixes CSS and physical dimensions

`resolution.resize()` computes the effective pixel ratio, applies it to the renderer and composer, and invokes `composer.setSize(width, height)`. The HDR wrapper is then called separately and writes each tracked depth image to the unscaled CSS width and height.

### Resize sources are not behaviorally equivalent

Dynamic-scale degradation or recovery calls `resolution.resize()` only. Browser resize calls both `resolution.resize()` and `hdrComposer.resize()`. The final attachment state therefore depends on the resize source.

### Initial depth ownership is incomplete

The supplied HDR target receives a depth texture. After `EffectComposer` adopts and clones the target, both composer depth attachments are replaced. The returned disposal surface tracks only the two replacements.

### No admission or rollback boundary exists

There is no render-surface ID, resize generation, target ID, attachment ID, compatibility check, framebuffer-completeness result, fallback result, atomic commit, rollback or predecessor-retirement receipt.

### Existing proof is static

`tests/smoke.mjs` verifies file presence and selected source patterns. It does not create a WebGL context, inspect target/attachment dimensions, check framebuffer completeness, drive DPR changes or measure resource retirement.

## Concrete dimension example

```txt
tier: high
CSS surface: 1920 × 1080
DPR cap: 1.6
dynamic scale: 1.0
effective pixel ratio: 1.6

composer color target plan: 3072 × 1728
manual tracked depth image assignment: 1920 × 1080
```

## Domains in use

```txt
browser shell, DOM, Vite and Pages
runtime admission, session, failure and RAF ownership
keyboard, blur, wheel and variable frame time
balloon simulation, airstream, steering, clearance and snapshots
mail route, town, volume, delivery progress and reset
balloon profile, model assembly, async loading and resources
envelope, basket, burner, rigging, rope and presentation
camera follow, zoom, clipping and steering response
quality-tier admission and hardware classification
render-surface CSS size, DPR and effective pixel ratio
dynamic-resolution sampling and scale transitions
Three.js renderer drawing-buffer allocation
EffectComposer target allocation and resize
HDR color target and multisample policy
depth-texture attachment identity, dimensions and lifecycle
framebuffer attachment compatibility and completeness
render-surface revision, commit, rollback and visible-frame acknowledgement
terrain, grass, atmosphere, water, lighting and lens response
telemetry, HUD, GameHost and headless inspection
checks, tests, build and deployment
```

## Kit inventory and services

```txt
runtime/gameplay source-backed kits: 15
balloon/object/presentation source-backed kits: 15
visual-environment source-backed kits: 26
tooling/proof source-backed kits: 3
active source-backed total: 59
runtime-implied adapters: 12
inactive legacy kits: 11
planned HDR attachment/resolution kits: 24 including parent
```

Services cover runtime boot, input, wind-driven simulation, airstream force, mail delivery, balloon construction and presentation, camera response, terrain/grass/atmosphere rendering, quality classification, dynamic resolution, HDR target/depth creation, color grading, telemetry, HUD, diagnostics, tests, build and deployment. The exact per-kit map is in the timestamped tracker and `.agent/kit-registry.json`.

## Required parent domain

```txt
open-above-hdr-attachment-resolution-authority-domain
```

## Required services

```txt
surface, quality-state, resize-generation, target and attachment identity
CSS/DPR/dynamic-scale observation
effective-pixel-ratio and physical-size planning
color/depth aggregate preparation
dimension compatibility and framebuffer completeness
stale generation rejection
atomic commit and predecessor rollback
attachment replacement and explicit lease transfer
exactly-once target and attachment retirement
detached surface observations
first-visible-frame surface acknowledgement
local browser and deployed Pages fixtures
```

## Required invariants

```txt
one admitted surface plan owns renderer, composer color targets and depth attachments
physical color and depth dimensions match for every committed target
CSS dimensions, DPR, dynamic scale and physical dimensions remain distinct observations
browser resize and dynamic-scale transitions use the same transaction
only the latest resize generation can commit
attachment replacement transfers ownership explicitly
every replaced attachment is retired exactly once
framebuffer completeness is checked before commit
failed allocation or incomplete framebuffer preserves the previous committed surface
telemetry and GameHost cite the committed surface revision
the first rendered frame acknowledges the same surface and attachment set
```

## Ordered safe ledges

```txt
1. runtime admission and module identity
2. import purity and frame ownership
3. model/profile and runtime lifecycle
4. fixed-step simulation and ordered input
5. mission, committed observation, host capability and frame failure
6. terrain and grass streaming authorities
7. world-surface and steering coherence
8. HDR attachment and render-surface resolution authority
```

Documentation only. No runtime source, dependency, rendering or deployment behavior changed.
