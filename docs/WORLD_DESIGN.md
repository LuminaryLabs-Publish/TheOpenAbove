# World Design

The world is a bounded curved landscape whose airspace is as important as its
terrain. Readability comes from altitude layers, weather, routes, settlements,
water, vegetation, mountains, and distant silhouettes.

## Meadow Lift

```txt
10 km bounded disk surface
procedurally generated terrain and biomes
northern 500 m mountain feature
ground fog plus four cloud layers
route airstreams and ambient wind
streamed near terrain and compressed horizon
town, landmark, navigation, and photographic descriptors
```

World state remains renderer neutral until the game-owned visual Domain projects
it through Three.js. Authored presets and complete region behavior stay in this
repository; only universal deterministic atoms belong in NexusEngine.

## Feedback

```txt
wind particles reveal current direction
balloon bank reveals steering pressure
cloud layers reveal altitude bands
terrain and water reveal scale and route clearance
map marks reveal destinations and Snap Points
startup presentation reveals world preparation progress
```
