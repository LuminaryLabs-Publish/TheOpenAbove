# Deploy Audit: Deterministic Route Fixture Gate

**Timestamp:** `2026-07-10T23-20-41-04-00`

## Current deployment gate

```txt
npm run build
  -> npm run check
       -> tests/smoke.mjs
  -> vite build
```

The current smoke test checks file existence and source-text patterns for the visual stack. It does not execute the campaign source, simulation mission loop, objective progress, completion, failure, restart, unlock, telemetry projection, or GameHost readback.

## Deployment risk

A build can pass while the deployed product cannot complete the milestone described by README and `AGENTS.md`. The current route can drift indefinitely with no thermals, gates, recognized perch return, timeout, restart, or region unlock.

## Required new command

```json
{
  "scripts": {
    "fixture:meadow-lift-route": "node tests/meadow-lift-route.fixture.mjs",
    "check": "npm run fixture:runtime-admission && npm run fixture:runtime-lifecycle && npm run fixture:meadow-lift-route && node tests/smoke.mjs"
  }
}
```

The exact composition can change, but the route fixture must be a build-blocking Node test.

## Required fixture outputs

```txt
source manifest accepted
source fingerprint
objective generation fingerprint
thermal IDs/transforms
wind-gate IDs/transforms
perch zone descriptor
command/contact/progress/transition/result rows
final mission snapshot
final state fingerprint
unlock result
render descriptor IDs
GameHost observation shape
```

## Required scenarios

```txt
same-seed generation parity
thermal target completion
wind-gate target completion
duplicate contact idempotence
premature perch rejection
valid return completion
timeout failure
restart generation reset
Cloud Basin unlock causality
same-command replay parity
```

## Browser and Pages smoke after Node proof

```txt
load route without fatal error
confirm exactly one active session/frame owner
confirm three thermal projections
confirm five gate projections
confirm perch projection
complete one thermal and one gate
press R and confirm a clean generation
confirm GameHost campaign observation is JSON-safe
```

## Non-goals

```txt
visual retuning
new shaders
new route content
Cloud Basin implementation
renderer migration
```

## Current conclusion

No existing build gate proves the advertised Meadow Lift interaction loop. Runtime and deployment behavior were not changed in this audit; the fixture remains proposed and unavailable.
