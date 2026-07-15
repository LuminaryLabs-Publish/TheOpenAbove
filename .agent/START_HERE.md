# START HERE: TheOpenAbove Cloud Depth Composite

**Last aligned:** `2026-07-15T02-09-29-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Reviewed pre-audit documentation head:** `b1590e1e1e82a56f656db2954870c8252e4213c9`  
**Reviewed runtime head:** `af3f5b96f28a32b1521c6ab7227c26d0c727370b`  
**Status:** `cloud-low-resolution-composite-depth-occlusion-authority-audited`

## Summary

The cloud renderer now consumes the declared LOD scale. It ray marches into a private low-resolution RGBA half-float target and composites that texture through the main HDR scene. The remaining gap is relative depth: the target contains no cloud depth, the composite samples no scene depth, and the fullscreen plane is fixed at far clip depth.

## Plan ledger

**Goal:** preserve the implemented cloud-only performance path while making cloud-versus-geometry occlusion, results, telemetry, resource retirement, and visible proof explicit.

- [x] Compare all 11 Publish repositories with central tracking.
- [x] Exclude TheCavalryOfRome.
- [x] Confirm ten eligible central ledgers and root `.agent` states.
- [x] Select only TheOpenAbove as the sole runtime-ahead repository.
- [x] Reconcile both cloud-performance commits.
- [x] Preserve all 101 active named surfaces and services.
- [x] Add the `2026-07-15T02-09-29-04-00` tracker and audit family.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Implement and execute representative cloud-depth, reconstruction, telemetry, and parity fixtures.

## Read this pass first

```txt
.agent/trackers/2026-07-15T02-09-29-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-15T02-09-29-04-00.md
.agent/architecture-audit/2026-07-15T02-09-29-04-00-cloud-depth-composite-dsk-map.md
.agent/render-audit/2026-07-15T02-09-29-04-00-far-plane-cloud-occlusion-gap.md
.agent/gameplay-audit/2026-07-15T02-09-29-04-00-weather-to-low-resolution-cloud-frame-loop.md
.agent/interaction-audit/2026-07-15T02-09-29-04-00-cloud-depth-composite-command-result-map.md
.agent/cloud-system-audit/2026-07-15T02-09-29-04-00-low-resolution-depth-ownership-contract.md
.agent/deploy-audit/2026-07-15T02-09-29-04-00-cloud-depth-composite-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-15T02-09-29-04-00-runtime-ahead-cloud-depth-reconciliation.md
```

## Reconciled implementation

```txt
renderScale consumed: yes
private cloud scene: yes
cloud-only color target: yes
color target: RGBA HalfFloat
render size: drawing buffer * 0.50 / 0.42 / 0.32
explicit cloud render before composer: yes
cloud resources disposed: yes
representative cloud depth: no
scene-depth sampling: no
depth-aware upscale: no
composite depth: fixed far plane
CloudFrameResult: no
FirstVisibleCloudFrameAck: no
```

## Required parent domain

```txt
open-above-cloud-low-resolution-depth-upscale-authority-domain
```

## Next safe ledge

Extend the existing volumetric-cloud output with representative linear cloud depth, expose the accepted scene-depth revision, reconstruct reduced-resolution samples without silhouette bleed, compare cloud and geometry depth in one coordinate space, and publish one typed frame result.

## Do not claim

Do not claim correct depth-aware compositing, equivalent cloud quality, measured performance improvement, target retirement, artifact parity, or production readiness until browser and GPU fixtures pass.