# Aero-Glide Kit Extraction Reference

## Source

This reference is based on the uploaded `Aero-Glide // Aerodynamic Flight Simulator` single-file prototype.

That prototype mixes UI, input, flight physics, chase camera, HUD, scoring, procedural world generation, collision, audio, and game loop logic in one HTML file.

## Extraction rule

Do not copy the whole prototype into The Open Above.

Use it as a reference for extracting reusable flight-game kit patterns.

## Immediate kit target for The Open Above

The Open Above should use only the flight-body pieces first:

```text
bird-flight-input-kit
bird-flight-physics-kit
bird-posture-kit
bird-camera-kit
```

These kits should remain renderer-light and game-specific enough for The Open Above while keeping the logic isolated.

## Kit 1: bird-flight-input-kit

Source ideas from Aero-Glide:

```text
keyboard input
mouse drag input
touch drag input
invert pitch toggle
sensitivity
inputX / inputY normalization
```

Open Above output contract:

```js
{
  pitchInput,
  rollInput,
  invertPitch,
  sensitivity,
  source
}
```

Purpose:

```text
Normalize player intent before physics reads it.
```

## Kit 2: bird-flight-physics-kit

Source ideas from Aero-Glide:

```text
arcade flight mode
simulation flight mode
gravity
lift
drag
stall warning
boost speed
velocity update
position update
```

Open Above output contract:

```js
{
  pitch,
  yaw,
  roll,
  velocity,
  speed,
  verticalSpeed,
  diveIntensity,
  wingTuck,
  angleOfAttack,
  liftMultiplier,
  dragMultiplier,
  turnStiffness,
  pulloutLoad,
  cameraShakeHint
}
```

Purpose:

```text
Own the truth of flight state and stop visuals from inventing flight direction.
```

## Kit 3: bird-posture-kit

Source ideas from Aero-Glide:

```text
body transform follows flight angle
wing trails imply motion
banking should visibly roll the body
pitch should visibly tilt the nose
```

Open Above output contract:

```js
{
  bodyPitch,
  bodyYaw,
  bodyRoll,
  wingTuck,
  tailCompression,
  pulloutPose
}
```

Purpose:

```text
Make the bird look like a living flight body.
```

## Kit 4: bird-camera-kit

Source ideas from Aero-Glide:

```text
chase camera behind vehicle
camera uses body quaternion direction
speed FOV
camera shake
bank-follow camera roll
```

Open Above output contract:

```js
{
  trailDistance,
  lift,
  lookAhead,
  speedShake,
  bankRollHint
}
```

Purpose:

```text
Frame the bird from behind and slightly above without controlling physics.
```

## Deferred kit candidates

These are useful later but not part of the current bird-feel fix:

```text
flight-hud-kit
flight-events-kit
procedural-flight-world-kit
audio-wind-kit
collision-near-miss-kit
```

## Current implementation status

The Open Above now has these first-pass files:

```text
src/bird-flight-input-kit.js
src/bird-flight-physics-kit.js
src/bird-posture-kit.js
src/bird-camera-kit.js
src/bird-dive-domain-kit.js
```

`bird-dive-domain-kit.js` composes the four active bird kits.

## Next hardening step

Move the remaining direct `main.js` pose and input ownership into these kits.

The most important direct ownership to remove from `main.js` is:

```text
raw key interpretation
bird.rotation.set(...)
wing flap writes
camera chase writes
```

After that, The Open Above will have one clean control path:

```text
input kit
→ physics kit
→ posture kit
→ camera kit
```
