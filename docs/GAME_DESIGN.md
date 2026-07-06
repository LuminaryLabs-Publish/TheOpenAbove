# The Open Above Game Design

## Game identity

```txt
Title: The Open Above
Genre: free-flight exploration / traversal adventure
Core fantasy: become a bird moving through a vast living sky-world
Main verbs: fly, carve, dive, glide, boost, discover
First slice: Meadow Lift
```

## Player promise

The player becomes a small bird learning to read the sky.

The world pushes back with altitude, terrain, wind gates, thermals, distance, and timing.

The satisfying moment is diving low, catching rising air, carving through a route, and returning safely above the canopy.

## Core loop

```txt
Launch from perch.
Read the sky route.
Dive or glide toward a gate.
Catch thermal lift.
Clear route gates.
Return to a high perch.
Unlock the next region.
Repeat with harder wind/weather.
```

## First playable slice: Meadow Lift

### Objective

```txt
Catch 3 thermals.
Fly through 5 wind gates.
Return to the sky perch.
Complete the route in under 5 minutes.
```

### Failure

```txt
Hit terrain.
Miss the time window.
Lose the route and restart.
```

### Controls

```txt
W / ArrowUp      pitch up
S / ArrowDown    pitch down
A / ArrowLeft    bank left
D / ArrowRight   bank right
Space            boost
R                restart
```

## Regions

```txt
1. Meadow Lift
2. Pine Wall
3. Cloud Basin
4. Storm Shelf
5. Glacier Above
6. Sunspire Expanse
```

Each region should add one new flight pressure:

```txt
Meadow Lift      basic thermals and gates
Pine Wall        tighter forest valleys
Cloud Basin      cloud cover and altitude reading
Storm Shelf      gusts and lightning fronts
Glacier Above    thin air and long dives
Sunspire Expanse high-altitude mastery route
```

## Objective types

```txt
Ring route
  Fly through wind rings before they fade.

Thermal climb
  Find updrafts and climb above cloud line.

Signal dive
  Dive into valley markers and pull out safely.

Flock rescue
  Guide smaller birds through wind corridors.

Storm crossing
  Cross a dangerous weather front without stalling.
```

## UI rule

Keep UI almost invisible.

Visible UI budget:

```txt
1. tiny objective/status HUD
2. tiny controls/diagnostic readout inside the same HUD
3. optional world-space prompt/marker
```

The world should communicate first through gates, thermals, perches, light, wind streaks, and landmarks.
