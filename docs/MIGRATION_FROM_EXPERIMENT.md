# Migration From Experiment

## Source experiment

Live experiment route:

```txt
https://luminarylabs-agents.github.io/NexusRealtime-Experiments/experiments/the-open-above-harness/
```

Source folders in the experiments repo:

```txt
experiments/the-open-above-harness/
experiments/the-open-above-v2/
```

## What the experiment proved

```txt
bird flight feel
assisted pitch / bank / boost
terrain patches
horizon terrain idea
sky/fog lighting
flocking concept
giant tree scale
wind streaks
smoke/cloud feel
follow camera
```

## What this repo changes

This repo turns the flight harness into a standalone game product.

First push:

```txt
self-contained Meadow Lift playable slice
local src/data campaign config
standalone index.html host
minimal HUD
GameHost debug state
basic smoke test
product docs
```

## What still needs to move over

The experiment has more advanced terrain/domain composition than this first standalone product slice.

Future migration should bring over or rebuild:

```txt
terrain patch LOD
horizon ring compression
sky/fog presets
smoke cloud particles
flocking behavior
ancient canopy tree archetypes
Nexus Engine / ProtoKit composition when ready
```

## Important rename note

The old experiment config referenced:

```txt
LuminaryLabs-Dev/NexusRealtime
```

The engine repo has been renamed to:

```txt
LuminaryLabs-Dev/NexusEngine
```

This standalone publishing repo does not need to use that dependency for the first slice, but any future engine-backed import should point to `NexusEngine`.

## Migration posture

Treat the old experiment as:

```txt
flight and rendering proof
```

Treat this repo as:

```txt
full game product
```

The first milestone is not to make the world larger.

The first milestone is to preserve flight feel, add objectives, and establish a product repo structure.
