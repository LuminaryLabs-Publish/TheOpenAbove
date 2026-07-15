# Validation: TheOpenAbove Cloud Depth Composite

**Last aligned:** `2026-07-15T02-09-29-04-00`

## Scope

Documentation-only reconciliation of two runtime cloud-performance commits, the full Publish selection comparison, the 101-surface inventory, low-resolution target allocation, offscreen ray marching, main-scene composite behavior, disposal, remaining depth ownership, and central tracking.

## Plan ledger

**Goal:** distinguish the implemented low-resolution color path from unproven depth-aware reconstruction, measured performance, and deployed parity.

- [x] Enumerate all 11 Publish repositories.
- [x] Exclude TheCavalryOfRome.
- [x] Confirm ten eligible central ledgers and root `.agent` states.
- [x] Compare current eligible heads with recorded documentation heads.
- [x] Select TheOpenAbove as the sole runtime-ahead repository.
- [x] Inspect both runtime commits and changed source files.
- [x] Preserve all kits, adapters, providers, domains, and services.
- [x] Inspect combined commit statuses.
- [x] Add and route the timestamped audit family.
- [ ] Execute source, browser, GPU, build, artifact, and Pages fixtures.

## Source inspection performed

```txt
LuminaryLabs-Publish organization inventory
LuminaryLabs-Dev/LuminaryLabs Publish repo ledger
all eligible root .agent entrypoints
commit 71f286d818d8ea8b308815f759c59b419fcfe508
commit af3f5b96f28a32b1521c6ab7227c26d0c727370b
src/visual/atmosphere/volumetric-cloud-kit.js
src/visual/visual-domain.js
.agent/kit-registry.json
```

## Confirmed by inspection

```txt
reviewed pre-audit documentation head: b1590e1e1e82a56f656db2954870c8252e4213c9
reviewed runtime head: af3f5b96f28a32b1521c6ab7227c26d0c727370b
runtime commits ahead: 2
cloud renderScale consumed: yes
private cloud scene: yes
cloud-only target: yes
target type: RGBA HalfFloat
target depth buffer: false
target scale: 0.50 / 0.42 / 0.32
explicit offscreen render before composer: yes
render-size readback: yes
cloud resource disposal: yes
representative cloud depth: no
scene-depth sampler: no
edge-aware reconstruction: no
composite fixed at far clip depth: yes
composite depth test enabled: yes
relative cloud/geometry depth comparison: no
typed CloudFrameResult: no
first visible cloud-frame acknowledgement: no
combined commit statuses returned: 0
```

## What source inspection proves

```txt
the LOD scale now controls a cloud-only target
the cloud ray march no longer executes in the shared full-resolution scene pass
the low-resolution target stores accumulated color and alpha
the main scene contains a fullscreen cloud composite
the cloud target and materials are disposed on visual teardown
the composite does not have enough data to compare actual cloud and geometry depth
```

## What is not proven

```txt
current frame-time or GPU cost on any device
measured performance improvement
visual equivalence to the previous path
an observed occlusion or silhouette defect
correct cloud-versus-geometry depth reconstruction
target-generation safety during resize or context loss
source build artifact or Pages parity
production readiness
```

## Required fixtures

```txt
high medium low profile -> exact cloud target dimensions and sample budgets
cloud scale transition -> cloud target changes and main scene remains independently admitted
cloud before mountain -> cloud survives
cloud behind mountain -> mountain occludes cloud
terrain balloon rope town vegetation edges -> no silhouette bleed
resize DPR quality context change -> predecessor target retired
fallback profiles -> typed reason and result
terrain shadow policy -> matching weather and quality receipt
GPU timing -> cloud dispatch and composite measurements
visible frame -> CloudFrameResult correlates with FirstVisibleCloudFrameAck
source dist artifact Pages -> matching result and frame identity
```

## Change scope

```txt
documentation changed: yes
runtime JavaScript changed by audit: no
shader changed by audit: no
gameplay changed: no
render behavior changed by audit: no
packages or dependencies changed: no
tests or workflows changed: no
deployment changed: no
branch created: no
pull request created: no

npm install/check/build: not run
browser fixture: not run
GPU timing or capture: not run
artifact downloaded: no
Pages URL fetched: no
```

## Claims intentionally withheld

No claim is made for correct depth-aware compositing, visual equivalence, measured performance improvement, temporal stability, target retirement, artifact parity, deployed parity, or production readiness.