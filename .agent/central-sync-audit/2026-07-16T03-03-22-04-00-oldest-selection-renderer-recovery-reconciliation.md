# Central-Sync Audit: Oldest Selection and Renderer-Recovery Reconciliation

**Timestamp:** `2026-07-16T03-03-22-04-00`

## Summary

The live Publish inventory and central ledger comparison selected TheOpenAbove by the oldest synchronized timestamp. The local audit is prepared for reconciliation into `LuminaryLabs-Dev/LuminaryLabs` after the final repo-local documentation head is known.

## Plan ledger

**Goal:** record why this repository was selected and exactly what the central ledger must retain.

- [x] Enumerate 11 accessible Publish repositories.
- [x] Exclude TheCavalryOfRome.
- [x] Confirm ten central ledgers and ten root `.agent` states.
- [x] Compare all ten current heads with documented repo-local heads.
- [x] Confirm zero new, missing, undocumented, root-agent-missing, or runtime-ahead eligible repositories.
- [x] Select TheOpenAbove at `2026-07-15T22-00-36-04-00`.
- [x] Add the renderer-recovery audit family locally.
- [ ] Bind the final repo-local documentation head in the central ledger and change log.

## Comparison

```txt
TheOpenAbove       2026-07-15T22-00-36-04-00 selected
ZombieOrchard      2026-07-15T22-40-29-04-00
TheUnmappedHouse   2026-07-15T23-00-03-04-00
PhantomCommand     2026-07-16T00-00-40-04-00
AetherVale         2026-07-16T00-26-16-04-00
TheLongHaul        2026-07-16T00-38-29-04-00
MyCozyIsland       2026-07-16T00-59-16-04-00
IntoTheMeadow      2026-07-16T01-38-56-04-00
PrehistoricRush    2026-07-16T02-03-42-04-00
HorrorCorridor     2026-07-16T02-40-29-04-00
```

## Central record required

```txt
repo-ledger/LuminaryLabs-Publish/TheOpenAbove.md
internal-change-log/2026-07-16T03-03-22-04-00-the-open-above-webgl-context-resource-recovery.md
```

## Status transition

```txt
local:   webgl-context-resource-recovery-authority-audited
central: webgl-context-resource-recovery-authority-central-reconciled
```

## Retained state

Retain all previous game-audio, device-control, fixed-step, HDR/depth, cloud, delivery, provider/build, route-lifecycle, world, terrain/flora, map, Air Mail, and persistence findings. This audit adds context-loss recovery; it does not supersede those gaps.

## Boundary

Documentation only. No branch or pull request was created.