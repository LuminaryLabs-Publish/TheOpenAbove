# Gameplay Audit: Provider Build to Air Mail Loop

## Interaction loop

```txt
accepted build candidate
  -> compose real NexusEngine Core World domains
  -> register authored landforms
  -> create visual world
  -> create balloon simulation
  -> create airstream routes and fields
  -> create Air Mail parcel, towns and delivery volumes
  -> initialize camera, map and presentation
  -> publish GameHost
  -> tick engine and simulation
  -> render world and delivery feedback
```

## Current contract improvement

The checked-out-provider test now proves that the authored `northern-wall` feature is registered, contributes to a compiled cell, samples near 500 meters and permits `engine.tick(0)`.

## Remaining gameplay evidence gap

The test does not prove:

```txt
browser route boot
balloon creation
terrain/landform visual adoption
airstream sampling in a visible world
Air Mail route and delivery operation
map/world agreement
first playable frame
provider identity during gameplay
```

## Required admission

A browser gameplay fixture must cite `BuildIdentityManifest`, wait for `GameHost`, verify its provider identity, inspect Core World feature state, advance one bounded gameplay step and acknowledge the first matching Air Mail frame.