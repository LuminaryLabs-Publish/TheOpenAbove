# Validation: TheOpenAbove

**Last aligned:** `2026-07-12T05-11-46-04-00`

## Scope

Documentation-only audit of HDR target/depth ownership and render-surface resize behavior through repository revision `270f8471a582dc8e01128dbd51bd8566972e95d6`.

## Plan ledger

**Goal:** distinguish source-backed color/depth sizing and ownership defects from executable proof that attachment replacement is compatible, atomic, rollback-safe and leak-free.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Avoid active unsynchronized `PrehistoricRush` documentation.
- [x] Select only `TheOpenAbove`.
- [x] Read `AGENTS.md`, root `.agent` state, visual domain, quality kit, HDR composer and smoke test.
- [x] Trace initial target creation and depth attachment replacement.
- [x] Trace browser resize and dynamic-scale paths.
- [x] Confirm no target/attachment IDs, compatibility result or rollback exists.
- [x] Preserve all 59 active source-backed kits and services.
- [x] Define static, pure, browser and Pages proof requirements.
- [x] Change no runtime source, dependency, script or workflow.
- [x] Create no branch or pull request.

## Source-backed behavior

```txt
HDR target is created at initial CSS dimensions
initial target receives one depth texture
EffectComposer adopts the target and clones a second target
both composer depth textures are replaced
dynamic-resolution resize applies effective pixel ratio
visual browser resize calls dynamic-resolution resize
visual browser resize then calls HDR wrapper resize
HDR wrapper manually sets tracked depth images to CSS dimensions
dynamic-scale changes call only dynamic-resolution resize
disposal explicitly iterates only the two replacement depth textures
```

## Source-backed gaps

```txt
no explicit ownership record for the replaced initial depth texture
no unified browser/dynamic resize transaction
no physical color/depth dimension parity check
no framebuffer-completeness result
no resize generation or stale result rejection
no candidate surface preparation
no atomic commit or rollback
no target/attachment lease transfer
no exactly-once retirement receipt
no actual dimensions in telemetry or GameHost
no visible-frame surface acknowledgement
```

## Required static fixtures

```txt
fixture:hdr-authority-present
fixture:hdr-single-resize-path-present
fixture:hdr-explicit-attachment-ownership-present
fixture:hdr-framebuffer-admission-present
fixture:hdr-rollback-present
fixture:hdr-visible-frame-receipt-present
```

## Required pure fixtures

```txt
fixture:effective-pixel-ratio-plan
fixture:physical-size-plan
fixture:resize-generation-ordering
fixture:stale-resize-rejection
fixture:attachment-lease-transfer
fixture:retirement-exactly-once
fixture:fallback-policy
```

## Required browser fixtures

```txt
create WebGL renderer and EffectComposer
test DPR 1.0, 1.25, 1.6 and 2.0
test high, medium and low tiers
test startup and browser resize
force dynamic degradation and recovery
inspect renderer drawing buffer
inspect both composer color targets
inspect both depth attachments
check framebuffer completeness before and after every transition
inject candidate allocation and completeness failures
verify predecessor surface remains visible
verify resource counts return to a bounded baseline
verify first frame and readback cite the committed revision
```

## Required Pages smoke

```txt
load deployed route
capture initial surface revision and dimensions
resize through three viewport/DPR combinations
force degradation and recovery
confirm continuous flight and HUD updates
confirm no framebuffer errors
confirm final target/depth parity
confirm bounded resource inventory
```

## Commands not run

```txt
npm install
npm run check
npm run headless:check
npm run build
browser WebGL attachment matrix
Pages render-surface smoke
```

The connector environment supplied repository source and write access, not a checked-out WebGL browser runtime. No command execution or GPU correctness claim is made.

## Change-state validation

```txt
runtime JavaScript changed: no
package scripts changed: no
dependencies changed: no
gameplay changed: no
render behavior changed: no
deployment workflow changed: no
branch created: no
pull request created: no
.agent documentation changed: yes
```

## Completion boundary

Do not claim HDR resize correctness or resource cleanup until executable browser and Pages proof shows one resize transaction, matching physical color/depth dimensions, complete framebuffers, stale-generation rejection, atomic rollback, exactly-once retirement and a first-visible-frame receipt.
