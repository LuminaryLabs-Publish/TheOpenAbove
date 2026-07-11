# Campaign Authority Audit: Meadow Lift Phase and Progress Contract

**Timestamp:** `2026-07-10T23-20-41-04-00`

## Declared campaign contract

```txt
campaign: the-open-above
region: meadow-lift
thermal target: 3
gate target: 5
return radius: 34
time limit: 300 seconds
unlock on completion: cloud-basin
world seed: open-above-meadow-lift
perch: { x: 0, y: 145, z: 190 }
```

## Current authority status

```txt
source exists: yes
source is immutable/fingerprinted: no
source is schema-validated: no
source target/count parity is checked: no
runtime objective entities exist: no
mission phase exists: no
progress reducer exists: no
completion/failure transaction exists: no
restart transaction exists: no
unlock transaction exists: no
bounded result journal exists: no
```

## Required source admission

One campaign manifest should validate:

```txt
CAMPAIGN.firstRegion resolves to a known region
thermalTarget equals generated thermalCount
gateTarget equals generated gateCount
return radius is positive and finite
perch coordinates are finite
mission limit is positive
unlock target resolves to a known region
source version and fingerprint are present
```

Admission must reject inconsistent source rather than silently constructing a partial route.

## Required mission phases

```txt
ready
active
returning
completed
failed
restarting
```

### Transition rules

```txt
ready -> active
  accepted mission start

active -> returning
  thermal and gate targets satisfied

active/returning -> failed
  time limit expired before completion

returning -> completed
  balloon enters valid perch zone

completed/failed -> restarting
  accepted restart command

restarting -> ready
  clean new generation committed
```

Invalid transitions return explicit rejected results and do not mutate state.

## Progress policy

```txt
thermals are counted once by stable thermal ID
gates are counted once by stable gate ID
gate order must be an explicit policy, not an incidental renderer order
returnReady derives from objective progress
perch contact before returnReady is recorded but cannot complete
completion and failure are mutually exclusive terminal results
unlock mutation occurs only from committed completion
```

## Required journals

```txt
command journal
objective-contact journal
progress journal
phase-transition journal
mission-result journal
unlock journal
```

Each journal must be bounded and contain detached JSON-safe rows.

## Required observation

```js
{
  missionId,
  regionId,
  generation,
  phase,
  elapsed,
  remainingSeconds,
  sourceFingerprint,
  thermals: { target, completedIds },
  gates: { target, completedIds, nextGateId },
  perch: { id, radius, returnReady, returned },
  unlocks,
  lastResult,
  stateFingerprint
}
```

## Fixture scenarios

```txt
source admission succeeds for current Meadow Lift config
mismatched gate target/count is rejected
same seed generates identical objective IDs/transforms
three unique thermal contacts satisfy thermal progress
repeated thermal contact is duplicate/no-op
five unique gate contacts satisfy gate progress
premature perch contact is rejected for completion
valid return commits exactly one completion
301-second incomplete run commits exactly one failure
restart after completion/failure creates clean generation
completion unlocks Cloud Basin exactly once
same scenario replay yields identical final fingerprint
```

## Next safe ledge

```txt
TheOpenAbove Meadow Lift Objective Authority
+ Deterministic Route Fixture Gate
```
