# Flight Model

## Current model

The first slice uses an arcade-assisted bird flight model.

The player controls:

```txt
pitch
bank
boost
```

The simulation derives:

```txt
yaw from bank
forward vector from yaw and pitch
speed from cruise/boost/drag
vertical motion from gravity, speed lift, and thermals
terrain strike failure
```

## Current values

Configured in:

```txt
src/data/campaign.config.js
```

Important values:

```txt
minSpeed
cruiseSpeed
maxSpeed
drag
gravity
lift
pitchRate
rollRate
yawFromRoll
boostImpulse
boostCooldown
thermalLift
terrainClearance
```

## Feel target

The bird should feel:

```txt
small
light
fast enough to carve
stable enough for new players
responsive while banking
rewarding when diving and pulling into lift
```

## Next model improvements

```txt
terrain avoidance assist
stall warning and recovery
near-miss ground lift
speed-reactive camera shake
wind volume influence
thermal spiral drift
flock influence / guidance
```
