# Gameplay Audit: Map Pause and Resume Flight Loop

**Timestamp:** `2026-07-12T08-50-32-04-00`

## Summary

The parchment map stops the host from calling gameplay updates, but it does not suspend gameplay input. The simulation's global key listeners remain active and continue mutating the held-key set while the map is open.

## Plan ledger

**Goal:** make map pause a gameplay transaction that freezes all participants and resumes under a fresh, explicitly admitted input generation.

- [x] Trace flight controls and held-key state.
- [x] Trace host pause gating.
- [x] Trace map keyboard handling.
- [x] Identify resume and stale-input failure paths.
- [ ] Implement atomic pause/resume and gameplay fixtures.

## Current loop

```txt
flight
  -> keydown adds code to simulation Set
  -> simulation.update reads Set
  -> balloon, mail, airstream, camera and world advance

open map
  -> M toggles map Boolean
  -> host stops calling update functions
  -> simulation Set remains live

while map open
  -> gameplay keydown/keyup continue changing Set
  -> map draws independently

close map
  -> host immediately calls simulation.update
  -> current Set is consumed as flight input
```

## Concrete failure cases

```txt
1. Hold W, open map, release W only after close
   First resumed frame still sees burner input.

2. Press A while map is open and close before keyup
   First resumed frames apply left trim even though the command began in map context.

3. Press W while map is open and switch browser visibility before keyup
   Blur may clear state, but visibility alone has no explicit policy.

4. Open and close rapidly
   No transition ID or generation distinguishes predecessor callbacks.
```

## Participant mismatch

The host pauses these owners:

```txt
balloon simulation
mail delivery
current visual update
balloon transform and animation
balloon presentation
camera rig
visual world update
Nexus telemetry
```

It does not pause or retire:

```txt
flight keyboard listener
wheel camera listener
main RAF
3D render submission
map keyboard listener
map ResizeObserver
map RAF while open
```

## Required gameplay contract

```txt
MapOpenCommand
  -> stop admitting flight commands
  -> resolve held-key policy
  -> publish input-generation retirement
  -> collect pause-ready results
  -> commit one pause revision

MapCloseCommand
  -> allocate fresh gameplay input generation
  -> clear map-context key state
  -> collect resume-ready results
  -> resume all gameplay participants together
  -> acknowledge first resumed simulation step and frame
```

## Held-key policy

The default safe policy should be:

```txt
opening map clears all transient flight keys
map-context key events never enter gameplay state
closing map starts with neutral flight input
new physical keydown after close is required to command flight
```

A future accessibility option may explicitly preserve selected controls, but that must be declared in the transition result rather than inferred from a shared mutable Set.

## Required fixtures

```txt
fixture:map-open-clears-flight-keys
fixture:map-context-key-isolation
fixture:map-close-neutral-first-step
fixture:held-key-open-close-ordering
fixture:blur-and-visibility-during-map
fixture:rapid-map-toggle-idempotency
fixture:stale-map-generation-input-rejection
fixture:pause-participant-parity
```

The current map is visually functional, but it is not yet an authoritative gameplay pause.