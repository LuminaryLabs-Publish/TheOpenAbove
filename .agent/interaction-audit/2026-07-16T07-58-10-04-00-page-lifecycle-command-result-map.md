# Interaction Audit: Page-Lifecycle Command and Result Map

**Timestamp:** `2026-07-16T07-58-10-04-00`

## Summary

Browser lifecycle events should produce evidence only. The product needs one command/result path that prevents visibility callbacks from directly mutating flight, world, input or rendering state.

## Plan ledger

**Goal:** define command, result, rejection and acknowledgement surfaces for every lifecycle transition.

- [x] Identify evidence producers.
- [x] Identify affected consumers.
- [x] Define command and result payloads.
- [x] Define stale and duplicate rejection.
- [ ] Implement and validate the path.

## Evidence producers

```txt
document.visibilitychange
window.pagehide
window.pageshow
Document freeze event where supported
Document resume event where supported
window.blur as secondary input-cancellation evidence
```

## Admission command

```txt
PageLifecycleTransitionCommand {
  commandId,
  documentGeneration,
  routeGeneration,
  sessionRevision,
  expectedLifecycleRevision,
  evidenceType,
  evidenceRevision,
  visibilityState,
  persisted,
  observedAt
}
```

## Candidate classification

```txt
hidden visibility -> suspend candidate
visible after accepted hidden -> resume candidate
pagehide persisted=true -> BFCache suspend candidate
pageshow persisted=true -> BFCache restore candidate
pagehide persisted=false -> retire candidate
freeze -> stronger suspend candidate
resume -> resume candidate
```

## Settlement results

```txt
PageLifecycleSuspendResult
PageLifecycleResumeResult
PageLifecycleRetireResult
PageLifecycleRejectedResult
PageLifecycleFailureResult
HeldInputCancellationResult
ResumeClockRebaseResult
FirstResumedFrameAck
```

## Consumer map

| Consumer | Input | Required output |
|---|---|---|
| balloon simulation | accepted suspend/resume result | flight suspension/resume snapshot |
| input owner | accepted suspension | held-action cancellation receipt |
| Air Mail | accepted suspension policy | delivery-state preservation result |
| airstream | accepted suspension policy | route/field suspension result |
| world generation | accepted lifecycle result | work-budget pause/resume result |
| camera rig | accepted lifecycle result | transition freeze/resume result |
| map overlay | accepted lifecycle result | map RAF and state settlement |
| visual domain | accepted lifecycle result | render submission suspend/resume result |
| host clock | accepted resume | rebased clock revision |
| GameHost | immutable results | lifecycle diagnostic snapshot |

## Rejection map

```txt
duplicate evidenceRevision -> rejected duplicate
retired documentGeneration -> rejected stale document
retired routeGeneration -> rejected stale route
resume with incompatible suspensionRevision -> rejected stale resume
pre-suspension RAF callback -> rejected stale scheduler generation
FirstResumedFrameAck with mismatched clock/simulation/frame -> rejected incoherent frame
```

## Exactly-once requirements

```txt
one accepted suspension per lifecycle revision
one held-input cancellation per suspension revision
one clock rebase per resume revision
one scheduler restart per resume revision
one FirstResumedFrameAck per resume revision
```

## Validation boundary

No lifecycle command, result or acknowledgement is implemented. This file defines the required interaction contract only.