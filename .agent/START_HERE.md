# START HERE: TheOpenAbove Cloud Low-Resolution Rendering

**Last aligned:** `2026-07-14T22-39-00-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Reviewed repository head:** `e407aa0c8ae98406f467e05c0fadfff988bdd304`  
**Reviewed runtime revision:** `0d9ea6f6f977b63d09f22f8ae36107bfccd81811`  
**Status:** `cloud-low-resolution-depth-upscale-authority-audited`

## Summary

The cloud LOD profile declares a cloud-only render scale of 0.50, 0.42 or 0.32, but the active renderer never consumes that value. The camera-centered, non-culled volumetric sphere is rendered by the main HDR scene pass at the same resolution as the rest of the world, while whole-scene dynamic resolution is the only resolution control.

## Plan ledger

**Goal:** make cloud `renderScale` an executed cloud-only target policy and prove ray march, depth-aware upscale, HDR composite, fallback and retirement as one frame result.

- [x] Compare all 11 Publish repositories with central tracking.
- [x] Exclude TheCavalryOfRome.
- [x] Confirm ten eligible central ledgers and root `.agent` states.
- [x] Confirm no priority exception and select only TheOpenAbove.
- [x] Inspect cloud LOD, volumetric shader, composer, dynamic resolution and terrain shadows.
- [x] Preserve all 101 active surfaces.
- [x] Add the `2026-07-14T22-39-00-04-00` audit family.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement and execute the cloud frame authority.

## Read this pass first

```txt
.agent/trackers/2026-07-14T22-39-00-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-14T22-39-00-04-00.md
.agent/architecture-audit/2026-07-14T22-39-00-04-00-cloud-low-resolution-depth-upscale-dsk-map.md
.agent/render-audit/2026-07-14T22-39-00-04-00-cloud-render-scale-execution-gap.md
.agent/gameplay-audit/2026-07-14T22-39-00-04-00-weather-to-cloud-visible-frame-loop.md
.agent/interaction-audit/2026-07-14T22-39-00-04-00-cloud-frame-command-result-map.md
.agent/cloud-system-audit/2026-07-14T22-39-00-04-00-raymarch-target-upscale-shadow-contract.md
.agent/deploy-audit/2026-07-14T22-39-00-04-00-cloud-resolution-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-14T22-39-00-04-00-oldest-selection-cloud-resolution-reconciliation.md
```

## Main finding

```txt
declared cloud renderScale: high 0.50, medium 0.42, low 0.32
renderScale consumed by cloud renderer: no
cloud-only render target: absent
cloud-only depth/transmittance target: absent
depth-aware upscaler: absent
temporal history/reprojection: absent
fallback impostors: false
cloud sphere radius: 4050
cloud sphere frustum culling: disabled
maximum shader view loop: 48
quality view samples: 36 / 26 / 14
maximum shader light loop: 8
quality light samples: 6 / 4 / 2
main HDR path: one RenderPass for the complete scene
active resolution control: whole-scene dynamic resolution
terrain shadow path: two fbm2 evaluations per terrain fragment
cloud pass timing/result receipt: absent
first cloud frame acknowledgement: absent
```

## Required parent domain

```txt
open-above-cloud-low-resolution-depth-upscale-authority-domain
```

## Next safe ledge

Render clouds into a cloud-only low-resolution color/transmittance/depth target using the existing LOD scale, upscale against scene depth, composite explicitly into HDR, include terrain cloud shadows in the same budget and publish `CloudFrameResult` plus `FirstVisibleCloudFrameAck`.

## Do not claim

Do not claim a performance improvement, equivalent cloud quality, correct edge reconstruction, target retirement, artifact parity or production readiness until GPU and browser fixtures pass.
