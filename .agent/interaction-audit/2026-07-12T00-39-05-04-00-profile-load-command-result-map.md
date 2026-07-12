# Interaction Audit: Profile Load Command and Result Map

Timestamp: `2026-07-12T00-39-05-04-00`

## Goal

Replace implicit mutable-profile loading with an explicit command, admission result and commit receipt.

## Current interaction

```txt
loadHotAirBalloonModel(profile?, options?)
  -> no command identity
  -> no session/epoch admission
  -> no profile snapshot
  -> no result classification
  -> returns a mutable THREE.Group
```

## Required command

```txt
BalloonLoadCommand {
  commandId
  runtimeSessionId
  missionEpoch
  requestedProfile
  expectedProfileSchemaVersion
  requestedAt
}
```

## Required admission result

```txt
accepted
rejected-invalid-profile
rejected-incompatible-version
rejected-stale-session
rejected-stale-epoch
rejected-duplicate-command
cancelled
superseded
failed-build
failed-resource-allocation
committed
```

## Required committed result

```txt
BalloonModelProfileReceipt {
  commandId
  loadGeneration
  modelId
  profileId
  profileRevision
  profileFingerprint
  resourceInventoryRevision
  commitRevision
}
```

## Interaction rules

```txt
public callers submit data, never mutable canonical objects
admission clones before yielding
invalid input returns a typed result without scene mutation
only the current generation may commit
GameHost exposes clone-safe results and observations
mission reset retires prior profile/model authority
```

## Validation boundary

No command API or runtime interaction behavior was implemented.