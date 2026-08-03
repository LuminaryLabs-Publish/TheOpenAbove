# The Open Above Game Design

## Identity

```txt
Genre: balloon exploration and wind-navigation adventure
Core fantasy: pilot a small balloon through a vast readable sky-world
Main verbs: burn, vent, steer with the wind, navigate, photograph, deliver
Current region: Meadow Lift
```

The player succeeds by reading airflow rather than overpowering it. Altitude
changes expose different currents; bounded steering lets the player shape a
route while preserving the balloon fantasy.

## Core Loop

```txt
prepare the balloon and world
read the map, landmarks, weather, and visible airflow
change altitude to enter a useful current
steer within that current
visit a destination or photographic Snap Point
continue sightseeing or restart the route
```

## Interaction Rule

The normal first screen is the world itself. Guidance belongs in landmarks,
wind particles, balloon motion, map marks, and short contextual messages.
Operational evidence is on demand through `F9`; it is not a gameplay HUD.

## Current Product Boundary

Meadow Lift owns authored campaign data, terrain, atmosphere, navigation,
balloon presentation, airstreams, mail-delivery behavior, and image capture.
NexusEngine supplies reusable runtime and semantic Domain contracts, not game
content or platform presentation.
