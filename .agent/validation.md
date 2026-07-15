# Validation: TheOpenAbove HDR Depth Size Coherence

**Last aligned:** `2026-07-15T07-39-52-04-00`

## Scope

Documentation-only audit of the full Publish selection comparison, TheOpenAbove interaction loop, 101-surface inventory, quality-tier policy, dynamic-resolution sizing, EffectComposer target sizing, independent depth attachment sizing, cloud drawing-buffer correlation, resize lifecycle, validation gaps, and central tracking.

## Plan ledger

**Goal:** distinguish the source-backed color/depth dimension divergence from an unproven browser framebuffer or visual failure.

- [x] Enumerate all 11 accessible Publish repositories.
- [x] Exclude TheCavalryOfRome.
- [x] Confirm ten eligible central ledgers and root `.agent` states.
- [x] Confirm no new, missing, undocumented, root-agent-missing, or runtime-ahead repository.
- [x] Select TheOpenAbove using the oldest synchronized eligible rule.
- [x] Inspect quality, dynamic-resolution, visual, HDR composer, cloud, host, package, and Three.js sizing sources.
- [x] Preserve all domains, kits, adapters, providers, and services.
- [x] Inspect combined commit status; no statuses were returned.
- [x] Add and route the timestamped audit family.
- [ ] Execute browser, GPU, build, artifact, and Pages fixtures.

## Source inspection performed

```txt
LuminaryLabs-Publish organization inventory
LuminaryLabs-Dev/LuminaryLabs Publish repo ledger
latest HorrorCorridor selection comparison
TheOpenAbove current main head
.agent root documents and kit registry
src/visual/quality-tier-kit.js
src/visual/visual-domain.js
src/visual/post-process/hdr-composer-kit.js
src/visual/atmosphere/volumetric-cloud-kit.js
src/main.js
package.json
three@0.165.0 EffectComposer setPixelRatio and setSize behavior
```

## Confirmed by inspection

```txt
reviewed documentation head: 1417c80309218c7c61def3b2f09a977eaab8b953
current main head before audit: 1417c80309218c7c61def3b2f09a977eaab8b953
runtime-ahead commits: 0
selected by oldest synchronized rule: yes
quality DPR caps: 1.60 / 1.35 / 1.05
initial dynamic scales: 1.00 / 0.86 / 0.72
dynamic scale floor: 0.62
effective ratio passed to renderer: yes
effective ratio passed to EffectComposer: yes
EffectComposer target size uses effective ratio: yes
independent depth texture count: 2
local helper rewrites depth images to CSS size: yes
visual resize calls dynamic resize before local HDR resize: yes
shared physical render-surface descriptor: no
atomic resize result: no
FirstHdrResizeFrameAck: no
combined commit statuses returned: 0
```

## What source inspection proves

```txt
the color render targets are governed by the EffectComposer pixel ratio
the two independent depth texture image dimensions are manually overwritten after composer sizing
the overwrite uses CSS viewport dimensions rather than the derived physical dimensions
color and depth dimensions are not guaranteed equal when effective pixel ratio differs from 1
no typed result or frame acknowledgement proves an accepted coherent generation
```

## What is not proven

```txt
an actual incomplete framebuffer
an observed WebGL error
an observed depth-test defect
visible corruption or flicker
how Three.js or the driver recovers on each target device
measured performance or memory impact
correct behavior in production build artifact or Pages
production readiness
```

## Required fixtures

```txt
boot at high medium and low tiers -> exact color and depth dimensions
DPR 1 1.25 1.5 1.6 2 -> exact attachment equality
dynamic scale default to 0.62 and recovery -> stable generation transitions
window resize and orientation -> one atomic result per accepted size
framebuffer status -> complete for both composer targets
pass dimensions -> match accepted physical dimensions
cloud target -> derived from matching renderer drawing-buffer generation
context loss/recovery -> predecessor retired and successor acknowledged
visible frame -> RenderSurfaceResizeResult matches FirstHdrResizeFrameAck
source dist artifact Pages -> matching descriptor result and frame identity
```

## Change scope

```txt
documentation changed: yes
runtime JavaScript changed: no
shader changed: no
gameplay changed: no
render behavior changed: no
packages or dependencies changed: no
tests or workflows changed: no
deployment changed: no
branch created: no
pull request created: no

npm run check: not run
npm run build: not run
browser framebuffer fixture: not run
GPU capture: not run
artifact downloaded: no
Pages URL fetched: no
```

## Claims intentionally withheld

No claim is made for framebuffer failure, visible corruption, correct attachment sizing, resize safety, context-recovery safety, cloud/HDR frame coherence, artifact parity, deployed parity, or production readiness.