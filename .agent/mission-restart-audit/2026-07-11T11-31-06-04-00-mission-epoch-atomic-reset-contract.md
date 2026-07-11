# Mission Epoch Atomic Reset Contract

**Timestamp:** `2026-07-11T11-31-06-04-00`

## Authority record

```txt
sessionId
missionEpoch
missionPhase
resetTransactionId
lastCommittedSimulationTickId
lastCommittedRenderFrameId
stateFingerprint
routeProofRevision
parcelRevision
```

## Mission phases

```txt
ready
in-transit
approach
delivered
restarting
failed
stopped
```

## Transaction contract

1. Preflight the session, lifecycle, command ID and expected mission epoch.
2. Mark the current epoch `restarting` and stop new gameplay-command admission.
3. Retire held input and queued predecessor-epoch commands.
4. Stage canonical initial state for simulation, airstream, mail, camera and presentation.
5. Advance the mission epoch and invalidate predecessor route/delivery proof.
6. Commit all staged subsystem state or return one failed result.
7. Keep delivery admission closed until the first new-epoch simulation tick commits.
8. Commit the first new-epoch render frame.
9. Publish one detached reset receipt and bounded journal row.

## Rollback policy

Before the epoch commit, any staging failure preserves the predecessor mission and returns `failed-before-commit`. After epoch commit, a failure enters a terminal `failed` mission phase; it must not silently resume a mixed predecessor/successor state.

## Idempotency

A repeated `commandId` returns the original result. A reset request using an older `missionEpoch` returns `stale` without mutation. A reset requested while the same transaction is active returns `duplicate` or `already-restarting`.

## Observation contract

Every reset observation must be detached, JSON-safe and bounded. It must include before/after fingerprints plus the first committed simulation and render identities.
