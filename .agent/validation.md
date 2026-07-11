# Validation: TheOpenAbove

**Last aligned:** `2026-07-11T00-49-45-04-00`

## Scope

Documentation-only breakdown. Runtime source, package scripts, dependencies, route behavior, rendering and deployment were unchanged.

## Validation performed

```txt
full Publish inventory reviewed: yes
central ledger timestamps compared: yes
nine eligible repositories tracked with root .agent: yes
TheCavalryOfRome excluded: yes
selected only TheOpenAbove: yes
recent commits reviewed: yes
campaign/world source read: yes
main frame composition read: yes
simulation input and dt behavior read: yes
telemetry frame publication read: yes
camera dt consumption read: yes
smoke/package coverage read: yes
runtime source changed: no
branch created: no
pull request created: no
push target: main
```

## Existing commands

```txt
npm run check
npm run build
npm run headless:status
npm run headless:inspect
npm run headless:renderer
npm run headless:check
npm run headless:build
```

## Missing commands

```txt
npm run fixture:runtime-admission
npm run fixture:runtime-lifecycle
npm run fixture:clock-parity
npm run fixture:meadow-lift-route
```

## Commands not run

```txt
npm install
npm run check
npm run build
headless commands
browser smoke
Pages smoke
```

## Source-inspection proof

```txt
main computes frameMs = min(80, now - last)
main computes dt = min(1/30, frameMs / 1000)
main advances simulation, camera, visual and telemetry once per RAF
simulation increments elapsed by clamped dt and polls a mutable key Set
telemetry reports Nexus frame without simulation tick identity
campaign declares timeLimitSeconds: 300
no visibilitychange listener or fixed-step accumulator exists
```

## Required proof

```txt
20/30/60/120 Hz schedules produce equal authoritative fingerprints
input sequences are consumed once at target ticks
long frames are bounded and return overrun results
visibility suspend/resume follows one declared policy
mission elapsed derives from fixed ticks
telemetry distinguishes session/render/tick IDs
```

## Push state

```txt
repo-local docs pushed to main: yes
central ledger updated: yes
central internal change log added: yes
```
