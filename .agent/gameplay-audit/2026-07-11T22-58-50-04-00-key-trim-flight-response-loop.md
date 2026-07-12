# Gameplay Audit: Key, Trim and Flight Response Loop

Timestamp: `2026-07-11T22-58-50-04-00`

## Summary

A/D steering now adds a small cross-current component without replacing wind-driven flight. The feel is intentionally limited, but the gameplay path reads ambient keys directly and has no sequenced input result, tick identity, restart retirement or parity fixture.

## Current loop

```txt
keydown A/D or arrow
  -> mutate internal key Set

simulation update
  -> derive steeringInput -1/0/1
  -> smooth lateralTrim toward +/-3.6
  -> derive lateralAcceleration
  -> construct right vector from sampled airstream
  -> add trim to wind
  -> derive heading and visualBank
  -> smooth velocity toward adjusted wind
  -> integrate position
  -> update distance and altitude

presentation
  -> root heading/bank
  -> envelope/gondola inertia
  -> steering-reactive camera
  -> trim HUD
```

## Preserved product intent

```txt
wind remains primary horizontal authority
steering is a limited correction
burner and vent remain vertical controls
airstream capture remains meaningful
camera response communicates steering without becoming a chase camera
```

## Gaps

```txt
input event sequence: absent
simulation tick identity: absent
steering policy version: absent
accepted/rejected steering result: absent
pause/visibility admission: absent
held-input restart retirement: absent
neutral-convergence result: absent
same-sequence replay proof: absent
```

## Gameplay risk

Variable RAF time and ambient input sampling can make the same physical key press produce different trim trajectories. A late keyup, blur, restart or duplicate frame loop can also leave simulation and visible inertia on different response phases.

## Required fixture matrix

```txt
30/60/120 Hz input playback
left hold, right hold and neutral release
rapid left-right reversal
blur while held
pause/resume while held
mission restart while trimmed
zero-airstream fallback
strong-current steering
world-boundary interaction
```

## Acceptance

```txt
same sequenced inputs + same fixed ticks
  -> same trim, heading, position and visible-response fingerprints

neutral/restart
  -> bounded convergence
  -> no predecessor input or presentation residue
```
