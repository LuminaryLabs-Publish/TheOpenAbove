# START HERE: TheOpenAbove

**Last aligned:** `2026-07-12T05-11-46-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`

## Summary

The current audit isolates HDR render-surface ownership. Browser resize sizes the renderer and EffectComposer using the effective pixel ratio, then the HDR wrapper manually rewrites its tracked depth textures to unscaled CSS dimensions. Startup also replaces an initial depth attachment without an explicit resource lease or retirement receipt.

## Plan ledger

**Goal:** make renderer, composer color targets and depth attachments commit as one compatible revisioned surface with rollback, exactly-once retirement and first-visible-frame proof.

- [x] Compare the complete Publish organization inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Skip newer unsynchronized `PrehistoricRush` audit work.
- [x] Select only `TheOpenAbove` as the oldest stable eligible repository.
- [x] Trace quality admission, dynamic scale, renderer resize, composer targets, depth attachments and disposal.
- [x] Identify the interaction loop, domains, all kits and every offered service.
- [x] Define the missing HDR attachment and resolution authority.
- [x] Add a timestamped tracker, turn ledger and system audits.
- [x] Refresh root `.agent` state and kit registry.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Implement the transaction and executable browser/Pages fixtures.

## Read this first

```txt
.agent/trackers/2026-07-12T05-11-46-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-12T05-11-46-04-00-hdr-attachment-resolution-authority-dsk-map.md
.agent/render-audit/2026-07-12T05-11-46-04-00-color-depth-physical-size-parity-gap.md
.agent/gameplay-audit/2026-07-12T05-11-46-04-00-resize-quality-visible-flight-loop.md
.agent/interaction-audit/2026-07-12T05-11-46-04-00-resize-source-surface-result-map.md
.agent/hdr-surface-audit/2026-07-12T05-11-46-04-00-attachment-identity-lifecycle-commit-contract.md
.agent/deploy-audit/2026-07-12T05-11-46-04-00-hdr-attachment-resolution-fixture-gate.md
.agent/turn-ledger/2026-07-12T05-11-46-04-00.md
.agent/kit-registry.json
```

Retained audits remain authoritative for runtime admission, import purity, balloon profile/model ownership, lifecycle, mission reset, committed observation, public host isolation, frame failure, terrain, grass, world-surface and steering boundaries.

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

## Kits and services

```txt
active source-backed kits: 59
  runtime/gameplay: 15
  balloon/object/presentation: 15
  visual environment: 26
  tooling/proof: 3
runtime-implied adapters: 12
inactive legacy kits: 11
```

The exact kit names and per-kit service map are recorded in the timestamped tracker and `.agent/kit-registry.json`.

## Main finding

```txt
initial target depth texture is replaced without an explicit lease
browser resize invokes composer sizing twice
effective-DPR color target dimensions are followed by CSS-size depth assignments
dynamic-scale transitions use a different resize path
no attachment identity or surface revision exists
no framebuffer-completeness result exists
no rollback or retirement receipt exists
no visible-frame surface acknowledgement exists
```

## Required parent domain

```txt
open-above-hdr-attachment-resolution-authority-domain
  -> render-surface and resize-generation identity
  -> effective-pixel-ratio and physical-size planning
  -> composer color/depth attachment aggregate
  -> dimension and framebuffer-completeness admission
  -> stale resize rejection
  -> atomic commit and rollback
  -> attachment replacement, leases and retirement results
  -> detached observations and visible-frame acknowledgement
  -> browser and Pages DPR/quality fixtures
```

## Ordered implementation queue

```txt
1. immutable runtime admission
2. import purity and single frame ownership
2a. balloon profile authority
2b. balloon model/resource authority
3. runtime session lifecycle and ordered disposal
4. fixed-step clock and sequenced input
4a. product source and acceptance parity
5. Air Mail route and delivery authority
5a. mission restart transaction and epoch
5b. committed observation frame authority
5c. public host capability authority
5d. frame-stage failure containment
6. terrain source and LOD transition authority
6a. bounded terrain build and atomic replacement
7. grass spatial identity and backend truth
7a. world-surface consumer parity
8. balloon steering and presentation authority
9. HDR attachment and render-surface resolution authority
```

## Next safe ledge

```txt
HDR Attachment and Render-Surface Resolution Authority
+ Unified Browser/Dynamic Resize Transaction
+ Color/Depth Physical-Size Parity
+ Attachment Ownership and Exactly-Once Retirement
+ Framebuffer Rollback and Visible-Frame Receipt
```
