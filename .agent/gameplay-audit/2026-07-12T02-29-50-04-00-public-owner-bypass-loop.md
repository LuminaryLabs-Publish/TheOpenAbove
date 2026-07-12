# Gameplay Audit: Public Owner Bypass Loop

**Timestamp:** `2026-07-12T02-29-50-04-00`

## Finding

The Air Mail gameplay loop has no exclusive public command boundary. `window.GameHost` exposes the live simulation, airstream and mail owners used by the active RAF.

## Reachable bypasses

### Out-of-band simulation

```txt
public caller
  -> simulation.update(dt)
  -> elapsed, position, velocity, burner, vent, steering and distance mutate
  -> no host tick ID
  -> no mail/airstream/presentation/render sequence
  -> no typed result
```

### Out-of-band delivery

```txt
public caller
  -> mutate simulation.state.position or mail.parcel
  -> call mail.update() or mail.reset()
  -> parcel status changes without mission command admission
  -> no mission epoch, delivery proof or first matching frame
```

### Split subsystem state

```txt
public caller
  -> call airstream.sample/update independently
  -> airstream domain state changes
  -> simulation.state.airstream can still represent a different sample
  -> telemetry, HUD and visuals can describe different route state
```

### Partial retirement

```txt
public caller
  -> dispose simulation/mail/airstream
  -> recursive RAF remains active
  -> next frame uses partially retired owners
```

## Consequences

```txt
mission completion can bypass route and command policy
simulation can advance twice inside one displayed frame
telemetry can publish a state not produced by the host clock
restart and epoch plans cannot fence public owner calls
HUD, world and GameHost readback can disagree
failure can be caused without a typed command or journal row
```

## Required gameplay boundary

The public host may expose only typed commands that route to existing authoritative services. Candidate commands must remain deliberately small:

```txt
ReadCommittedState
ReadJournal
RequestMissionReset
SetCameraZoom
SetDebugVisibility
```

Gameplay mutation commands must include:

```txt
commandId
capabilityId
expectedSessionId
expectedMissionEpoch
expectedSimulationTickId when applicable
finite bounded payload
```

Direct simulation advancement, parcel mutation, route mutation and owner disposal are never public capabilities.

## Required fixtures

```txt
fixture:host-no-simulation-owner
fixture:host-no-mail-owner
fixture:host-no-airstream-owner
fixture:host-out-of-band-tick-rejection
fixture:host-delivery-bypass-rejection
fixture:host-stale-mission-command
fixture:host-partial-disposal-rejection
fixture:host-gameplay-frame-coherence
```