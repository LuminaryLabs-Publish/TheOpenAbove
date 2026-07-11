# Deploy Audit: Air Mail Restart Fixture Gate

**Timestamp:** `2026-07-11T07-18-44-04-00`

## Goal

Define executable proof that `R` and programmatic restart create a clean Air Mail mission epoch and a correlated first rendered frame.

## Existing proof

`tests/airstream-mail.mjs` currently proves only that `resetMailParcel(parcel)` clears parcel delivery fields. It does not construct the browser host, simulation, camera, airstream domain, visual domain, telemetry or GameHost.

## Required fixture commands

```txt
npm run fixture:air-mail-reset-pure
npm run fixture:air-mail-reset-host
npm run fixture:air-mail-reset-held-input
npm run fixture:air-mail-reset-stale-proof
npm run fixture:air-mail-reset-first-frame
npm run fixture:air-mail-reset-repeat
```

## Pure transaction matrix

```txt
delivered mission -> accepted reset -> new epoch
in-transit mission -> accepted reset -> new epoch
failed mission -> accepted reset -> new epoch
restarting mission + duplicate command -> declared no-op/rejection
stale command epoch -> rejected without mutation
old route proof -> rejected after reset
old delivery receipt -> cannot become active state
```

## Host matrix

```txt
KeyR produces one sequenced ResetMission command
keyboard auto-repeat does not produce duplicate accepted resets
GameHost reset uses the same command adapter
held burner is retired before first post-reset tick
held vent is retired before first post-reset tick
balloon returns to declared start transform
camera returns to declared start framing
mail remains undelivered on first post-reset tick
active/selected route is cleared or deterministically initialized
```

## Immediate-redelivery regression

```txt
1. place balloon inside Brookhaven volume
2. commit delivery
3. issue ResetMission
4. commit new mission epoch and start transform
5. execute first post-reset tick
6. assert parcel.delivered === false
7. assert no delivery result was emitted
8. assert balloon is outside Brookhaven volume
```

## First-frame correlation matrix

```txt
reset result missionEpoch == simulation missionEpoch
simulation missionEpoch == mail missionEpoch
mail missionEpoch == render frame missionEpoch
render frame missionEpoch == HUD missionEpoch
HUD missionEpoch == telemetry missionEpoch
telemetry missionEpoch == GameHost observation missionEpoch
first simulation tick and first render frame are explicit
all fingerprints are detached and JSON-safe
```

## Repetition and lifecycle matrix

```txt
reset twice from identical state -> declared deterministic policy
reset after root session stop -> rejected
reset during disposal -> rejected
restart full runtime then reset mission -> no old listener or command reuse
old GameHost reference -> invalidated or detached
```

## Pipeline order

```txt
source/schema checks
  -> fixed-step command fixture
  -> pure reset transaction fixture
  -> held-input/stale-proof fixtures
  -> host KeyR fixture
  -> first-frame correlation fixture
  -> npm run check
  -> npm run headless:check
  -> npm run build
  -> browser smoke
  -> Pages smoke
```

## Browser smoke

```txt
load Air Mail
fly away from start
hold burner and press R
confirm clean start position and released burner
complete Brookhaven delivery
press R while inside destination area
confirm parcel remains in transit after restart
confirm HUD and GameHost report a new mission epoch
confirm no duplicate RAF, input or delivery event
```
