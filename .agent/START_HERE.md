# START HERE: TheOpenAbove HDR Depth Size Coherence

**Last aligned:** `2026-07-15T07-39-52-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Reviewed documentation head:** `1417c80309218c7c61def3b2f09a977eaab8b953`  
**Status:** `hdr-dynamic-resolution-depth-attachment-size-coherence-authority-audited`

## Summary

The active HDR path creates two independent depth textures, but browser resize handling sizes the EffectComposer color targets in effective physical pixels and then rewrites those depth textures to unscaled CSS viewport dimensions. The color/depth size invariant is therefore undocumented and source-permitted to diverge whenever the effective render pixel ratio is not exactly `1`.

## Plan ledger

**Goal:** make renderer, composer targets, independent depth attachments, cloud target sizing, resize retirement, telemetry, and the first visible HDR frame consume one versioned physical render-surface descriptor.

- [x] Compare all 11 Publish repositories with the central ledger.
- [x] Exclude TheCavalryOfRome.
- [x] Confirm ten eligible ledgers and ten root `.agent` states.
- [x] Confirm no new, missing, undocumented, root-agent-missing, or runtime-ahead priority case.
- [x] Select only TheOpenAbove using the oldest synchronized rule.
- [x] Inspect the complete interaction loop, domains, kits, adapters, providers, and offered services.
- [x] Add the `2026-07-15T07-39-52-04-00` tracker and HDR audit family.
- [x] Preserve all 101 active named surfaces.
- [ ] Implement and prove render-surface size coherence across boot, resize, DPR, quality, dynamic-scale, and context recovery.

## Read this pass first

```txt
.agent/trackers/2026-07-15T07-39-52-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-15T07-39-52-04-00.md
.agent/architecture-audit/2026-07-15T07-39-52-04-00-hdr-depth-size-coherence-dsk-map.md
.agent/render-audit/2026-07-15T07-39-52-04-00-dynamic-resolution-depth-attachment-size-gap.md
.agent/gameplay-audit/2026-07-15T07-39-52-04-00-flight-to-hdr-frame-size-coherence-loop.md
.agent/interaction-audit/2026-07-15T07-39-52-04-00-render-surface-resize-command-result-map.md
.agent/hdr-audit/2026-07-15T07-39-52-04-00-color-depth-target-coherence-contract.md
.agent/deploy-audit/2026-07-15T07-39-52-04-00-hdr-depth-size-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-15T07-39-52-04-00-oldest-selection-hdr-depth-reconciliation.md
```

## Source-backed state

```txt
dynamic effective pixel ratio: capped device DPR * dynamic scale
EffectComposer color target size: CSS viewport * effective pixel ratio
independent depth texture size after host resize: CSS viewport
color/depth equality when effective pixel ratio = 1: yes
color/depth equality guaranteed for other ratios: no
attachment generation identity: absent
resize adoption result: absent
first matching HDR frame acknowledgement: absent
```

## Required parent domain

```txt
open-above-hdr-render-target-depth-size-coherence-authority-domain
```

## Next safe ledge

Create one immutable render-surface descriptor containing CSS size, effective pixel ratio, physical size, quality revision, dynamic-scale revision, target generation, formats, samples, and attachment ownership. Use it to size both composer targets and every depth attachment before atomically adopting the new generation.

## Do not claim

Do not claim framebuffer incompleteness, visible corruption, correct depth attachment sizing, resize safety, context-recovery safety, artifact parity, deployed parity, or production readiness until the browser and GPU fixture matrix passes.