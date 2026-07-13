# Persistence Audit: Session Schema, Commit and Restore Contract

**Timestamp:** `2026-07-12T23-50-01-04-00`

## Required portable record

```txt
schemaVersion
saveId
persistenceGeneration
createdAt
updatedAt
runtimeBuildFingerprint
worldRevision
worldSurfaceRevision
routeRevision
participants
  balloon
  mail
  airstream
  optionalCamera
sourceRevisions
contentFingerprint
predecessorFingerprint
commitReason
```

## Balloon record

```txt
position[3]
velocity[3]
wind[3]
verticalVelocity
altitude
burner
vent
steeringInput
lateralTrim
lateralAcceleration
visualBank
heading
elapsed
distance
airstream observation
message
```

## Mail record

```txt
routeId
parcelId
destinationTownId
correctAirstreamId
selectedAirstreamId
status
delivered
deliveredAt
message
```

## Commit protocol

```txt
collect detached participant snapshots
  -> canonicalize finite values and stable field order
  -> validate schema and cross-participant references
  -> compute fingerprint
  -> write candidate generation
  -> read back exact bytes
  -> verify fingerprint and expected predecessor
  -> atomically update active pointer
  -> retain bounded verified backup
  -> publish SaveCommitResult
```

## Restore protocol

```txt
read active pointer
  -> verify active generation
  -> fall back only to a verified backup
  -> migrate supported predecessor schema
  -> quarantine corrupt or incompatible records
  -> build detached participant candidates
  -> validate route/world compatibility
  -> install all participants atomically
  -> publish RestoreCommitResult
```

## Conflict policy

A save must include an expected active generation or writer lease. When another tab or session has advanced the record, the command returns `conflict` and performs no active-pointer mutation.

## Reset policy

Reset is a durable transaction. It must either commit a verified default generation or explicitly remove the active record and publish a terminal reset result. Resetting only live memory is insufficient.

## Security and privacy

The record contains gameplay state only. It should not store credentials, personal identifiers or arbitrary executable data. Parsing must treat storage bytes as untrusted input.