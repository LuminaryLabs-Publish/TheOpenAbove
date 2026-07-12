# Deploy Audit: Public Host Isolation Fixture Gate

**Timestamp:** `2026-07-12T02-29-50-04-00`

## Goal

Prevent local or Pages builds from reporting a healthy automation/debug surface while `window.GameHost` still exports live runtime owners or incoherent readback.

## Required static fixture

```txt
assert GameHost source does not export:
  engine
  NexusEngine
  THREE
  scene
  renderer
  camera
  balloon
  visual
  simulation
  airstream
  mail
  cameraRig
  balloonPresentation

assert public surface exports only:
  version
  sessionId
  capabilities
  getCommittedState
  getJournal
  submit
```

Static source checks are necessary but not sufficient.

## Required browser fixtures

```txt
fixture:host-public-key-surface
fixture:host-owner-handle-absence
fixture:host-read-model-detachment
fixture:host-read-model-deep-immutability
fixture:host-non-finite-command-rejection
fixture:host-out-of-band-tick-unavailable
fixture:host-mail-bypass-unavailable
fixture:host-direct-render-unavailable
fixture:host-stale-session-rejection
fixture:host-stale-mission-rejection
fixture:host-stale-frame-rejection
fixture:host-duplicate-command-rejection
fixture:host-command-result-frame-ack
fixture:host-capability-revocation
```

## Required Pages smoke

```txt
load deployed route
wait for first committed frame
read GameHost capabilities
verify no raw owner keys
mutate returned read-model copy
verify next committed read is unchanged
submit one allowed bounded command
verify typed result and matching later frame acknowledgement
submit invalid and stale commands
verify zero state mutation
verify local and Pages host schema versions match
```

## Failure policy

Deployment readiness is blocked when:

```txt
raw owner key is present
read record contains method-bearing or Three.js objects
read record mutation changes runtime state
invalid/stale command mutates state
command result lacks session/mission/frame provenance
host and HUD observations identify different committed frames
capability remains usable after runtime disposal
```

## Existing proof boundary

Current checks are primarily static and product-specific. No executable host-isolation, owner-absence, stale-command, read-detachment or command-to-frame fixture exists.

## Validation state

```txt
runtime source changed: no
workflow changed: no
fixtures added to executable suite: no
npm run check: not run
npm run build: not run
browser smoke: not run
Pages smoke: not run
```

No deployment host-safety claim is made.