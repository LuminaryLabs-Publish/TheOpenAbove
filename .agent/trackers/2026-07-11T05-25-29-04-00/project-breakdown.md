# Project Breakdown: TheOpenAbove Air Mail Route Authority

**Timestamp:** `2026-07-11T05-25-29-04-00`

## Summary

This documentation-only pass reconciles the new Air Mail runtime on `main`. It maps the altitude-routing loop, all new airstream and mail kits, horizon-terrain consumption, and the missing authority required to prove that delivery used the declared correct current.

## Plan ledger

**Goal:** leave an implementation-ready contract for deterministic route traversal, correct-current delivery, reset, frame correlation, and near+horizon terrain proof without changing gameplay or rendering.

- [x] Enumerate the ten accessible Publish repositories.
- [x] Compare all eligible repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are tracked with root `.agent` state.
- [x] Detect runtime commit `a67cc952995727a3ddb29e61ed66a72f338a58fd` newer than the ledger.
- [x] Select only `LuminaryLabs-Publish/TheOpenAbove`.
- [x] Read repository instructions and the prior terrain audit.
- [x] Trace browser input through airstream force, mail progress, render, telemetry and GameHost.
- [x] Identify all active domains.
- [x] Identify all kit services.
- [x] Catalog active, implied, inactive and proposed kits.
- [x] Derive the new near+horizon source workload census.
- [x] Add architecture, render, gameplay, interaction, airstream, mail, terrain and deploy audits.
- [x] Refresh `START_HERE.md`, `current-audit.md`, `known-gaps.md`, `next-steps.md`, `validation.md` and `kit-registry.json`.
- [x] Push repository-local documentation directly to `main`.
- [x] Update the central repo ledger.
- [x] Add the central internal change-log entry.
- [ ] Implement runtime authority and fixture gates in a later runtime pass.

## Selection result

All eligible repositories were already documented. `TheOpenAbove` was selected before the oldest fallback because its Air Mail runtime commit landed after the last central audit.

## Principal finding

`correctAirstreamId` is declared as `meadow-to-brookhaven`, but delivery progress never consumes it. Entering Brookhaven's volume commits delivery after any route or ambient drift. The route needs a durable traversal proof and typed delivery admission before completion can be authoritative.

## Next safe ledge

```txt
TheOpenAbove Air-Mail Route Authority
+ Correct-Current Delivery and Frame-Correlation Fixture Gate
```

## Validation state

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser smoke: not run
repo-local docs pushed to main: yes
central ledger synchronized: yes
```