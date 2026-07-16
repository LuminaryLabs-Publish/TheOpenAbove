# START HERE: TheOpenAbove Page-Lifecycle Suspension and Resume

**Last aligned:** `2026-07-16T07-58-10-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Reviewed pre-audit repository head:** `d1d48c49ff687d2a6aa10c1ffd152eb6a771b3ff`  
**Reviewed runtime source revision:** `1417c80309218c7c61def3b2f09a977eaab8b953`  
**Status:** `page-lifecycle-flight-suspension-resume-authority-audited`

## Summary

The flight route owns a recursive RAF loop, simulation, Air Mail, airstreams, world generation, map animation, camera transitions, input listeners and rendering. It clears held keys on `blur`, but it does not own `visibilitychange`, `pagehide`, `pageshow`, `freeze` or `resume`; background suspension and restoration are therefore left to browser timing rather than a typed product result.

## Plan ledger

**Goal:** make every document visibility or lifecycle transition settle as one revision-bound suspend, resume or retire result before simulation, input, world work and visible frames continue.

- [x] Compare all 11 Publish repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm ten eligible ledgers and root `.agent` states.
- [x] Select only TheOpenAbove using the oldest synchronized timestamp.
- [x] Trace RAF, input, map, simulation, Air Mail, world-generation and rendering ownership.
- [x] Preserve the complete 101-surface kit and service inventory.
- [x] Add the `2026-07-16T07-58-10-04-00` lifecycle audit family.
- [ ] Implement and prove suspension, held-input cancellation, clock rebase, BFCache restoration and first-resumed-frame convergence.

## Read this pass first

```txt
.agent/trackers/2026-07-16T07-58-10-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-16T07-58-10-04-00.md
.agent/architecture-audit/2026-07-16T07-58-10-04-00-page-lifecycle-suspension-resume-dsk-map.md
.agent/render-audit/2026-07-16T07-58-10-04-00-hidden-resume-visible-frame-gap.md
.agent/gameplay-audit/2026-07-16T07-58-10-04-00-background-flight-resume-loop.md
.agent/interaction-audit/2026-07-16T07-58-10-04-00-page-lifecycle-command-result-map.md
.agent/lifecycle-audit/2026-07-16T07-58-10-04-00-visibility-pagehide-freeze-resume-contract.md
.agent/deploy-audit/2026-07-16T07-58-10-04-00-page-lifecycle-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-16T07-58-10-04-00-oldest-selection-lifecycle-reconciliation.md
```

## Source-backed state

```txt
recursive flight RAF: present
separate map RAF while open: present
frame interval clamp: present
simulation dt clamp: present
window blur held-key clearing: present
document visibility admission: absent
pagehide/pageshow admission: absent
freeze/resume admission: absent
owned suspension reason: absent
resume clock rebase result: absent
BFCache restoration policy: absent
stale lifecycle-generation rejection: absent
PageLifecycleResult: absent
FirstResumedFrameAck: absent
```

## Required parent domain

`open-above-page-lifecycle-flight-suspension-resume-authority-domain`

## Next safe ledge

Add lifecycle observers, monotonic document/session generations, one suspension policy across simulation and presentation, held-input cancellation, clock rebasing, BFCache-safe restoration, stale-event rejection and first-resumed-frame proof.

## Do not claim

Do not claim background suspension correctness, held-input safety, BFCache compatibility, resume-time continuity, first-resumed-frame convergence, artifact parity, Pages parity or production readiness until the lifecycle fixture matrix passes.