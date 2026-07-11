# Architecture Audit: Air Mail Restart Transaction DSK Map

**Timestamp:** `2026-07-11T07-18-44-04-00`

## Goal

Define the smallest composed domain that can restart the complete Air Mail mission without retaining stale simulation, input, route, delivery, camera or observation state.

## Current authority split

```txt
browser callbacks
  -> balloon simulation owns held keys

balloon simulation
  -> position
  -> velocity
  -> wind
  -> vertical velocity
  -> burner/vent
  -> elapsed
  -> distance
  -> current airstream sample

airstream domain
  -> active route
  -> influence
  -> capture state
  -> last sample

mail domain
  -> route identity
  -> parcel state
  -> selected airstream
  -> last delivery event
  -> town visuals

camera/presentation
  -> zoom
  -> camera mode and smoothing state

main host
  -> RAF timing
  -> telemetry publication
  -> HUD projection
  -> mutable GameHost exposure
```

No current owner can reset this graph as one transaction.

## Existing reset surface

```txt
open-above-mail-delivery-domain.reset()
  -> resetMailParcel(parcel)
  -> state.lastEvent = null
  -> return mail snapshot
```

This surface does not reset the simulation, airstream, camera, render, telemetry or host state.

## Required parent domain

```txt
open-above-air-mail-mission-domain
```

The parent should compose route authority, delivery authority and restart authority around one mission epoch.

## Required restart kits

```txt
open-above-mission-epoch-kit
  monotonic missionEpoch
  mission identity and generation
  stale generation rejection

open-above-reset-command-kit
  ResetMission envelope
  commandId and requestedAtTick
  source and reason

open-above-reset-admission-kit
  phase and session checks
  duplicate/no-op policy
  accepted/rejected result

open-above-input-retirement-kit
  release held burner/vent keys
  retire queued pre-reset commands
  reject stale input generations

open-above-balloon-reset-kit
  restore start position
  restore initial velocity and wind
  clear vertical velocity
  restore burner/vent defaults
  clear elapsed and distance
  rebuild deterministic initial sample

open-above-airstream-reset-kit
  clear active route and influence
  restore ambient capture state
  replace last sample with the new-epoch initial sample

open-above-mail-reset-transaction-kit
  clear parcel status and delivery time
  clear selected route and route-proof rows
  clear pending/last delivery result
  restore mission phase

open-above-camera-reset-kit
  restore declared zoom/mode
  clear stale smoothing history
  bind to the reset balloon state

open-above-reset-result-kit
  accepted/rejected/no-op/failed status
  before/after fingerprints
  retired command range
  new missionEpoch

open-above-first-post-reset-frame-kit
  first simulationTickId in new epoch
  first renderFrameId in new epoch
  state, mail, route and camera fingerprints
  render/HUD/telemetry/GameHost correlation

open-above-air-mail-restart-fixture-kit
  pure reset fixtures
  host command fixture
  first-frame correlation fixture
  repeated reset and stale-command fixtures
```

## Transaction order

```txt
ResetMission command
  -> validate active runtime session
  -> validate command generation
  -> enter restarting phase
  -> stop new gameplay command admission
  -> increment missionEpoch
  -> retire held and queued input
  -> reset simulation
  -> reset airstream observation
  -> reset parcel, route proof and delivery results
  -> reset camera/presentation state
  -> clear transient HUD/telemetry projections
  -> commit ResetResult
  -> admit first fixed simulation tick
  -> render first frame
  -> publish one detached RestartReceipt
  -> enter ready or in-transit phase
```

## Invariants

```txt
one accepted reset increments missionEpoch exactly once
old commands cannot mutate the new epoch
old route proof cannot complete the new parcel
old delivery events cannot appear in the new journal
balloon starts outside every destination delivery volume
first post-reset tick starts from declared initial state
first post-reset render identifies the new epoch
repeated reset commands are deterministic accepted/no-op results
reset failure retains the prior committed mission or enters explicit failed state
```

## Relationship to existing gates

```txt
runtime session lifecycle
  owns RAF/listener/resource lifetime

fixed-step clock
  owns command ordering and tick boundaries

Air Mail mission authority
  owns mission phase, route proof and delivery

restart transaction
  composes all three for one clean successor mission epoch
```
