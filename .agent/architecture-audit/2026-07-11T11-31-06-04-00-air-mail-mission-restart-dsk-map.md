# Air Mail Mission Restart DSK Map

**Timestamp:** `2026-07-11T11-31-06-04-00`

## Current ownership

```txt
open-above-keyboard-input-kit
  burner and vent held-key state
  no KeyR command

open-above-balloon-simulation-kit
  position, velocity, wind, elapsed, distance and input listeners
  no reset service

open-above-mail-delivery-domain
  parcel and delivery event state
  reset clears parcel fields only

open-above-airstream-domain
  active route, influence and last sample
  no reset service

open-above-balloon-camera-rig-kit
  zoom, mode, blend, target and position
  no reset service

open-above-balloon-telemetry-kit
  publishes current snapshot resources
  no mission epoch or reset receipt
```

## Defect

No single domain owns the mission boundary. A caller can reset the parcel without resetting the position that determines delivery admission, allowing immediate redelivery on the next update.

## Required parent domain

```txt
open-above-mission-restart-authority-domain
```

## Existing DSK updates first

```txt
open-above-balloon-simulation-kit
open-above-mail-delivery-domain
open-above-airstream-domain
open-above-balloon-camera-rig-kit
open-above-balloon-presentation-domain
open-above-balloon-telemetry-kit
open-above-visual-domain
open-above-runtime-composer-kit
open-above-keyboard-input-kit
open-above-gamehost-legacy-readback-kit
open-above-headless-editor-environment
```

## Coordinating kits

```txt
open-above-mission-session-kit
open-above-mission-epoch-kit
open-above-reset-command-kit
open-above-reset-admission-kit
open-above-input-retirement-kit
open-above-initial-mission-snapshot-kit
open-above-simulation-reset-adapter-kit
open-above-airstream-reset-adapter-kit
open-above-mail-reset-adapter-kit
open-above-camera-reset-adapter-kit
open-above-presentation-reset-adapter-kit
open-above-telemetry-reset-adapter-kit
open-above-reset-transaction-kit
open-above-reset-result-kit
open-above-reset-journal-kit
open-above-post-reset-delivery-lock-kit
open-above-first-post-reset-frame-kit
open-above-reset-fixture-kit
```

## Boundary rule

```txt
ResetMission command
  -> session and epoch admission
  -> input retirement
  -> stage all subsystem resets
  -> invalidate predecessor route/delivery proof
  -> atomic epoch commit
  -> first simulation tick
  -> first rendered frame
  -> typed result and bounded journal
```

Keep mission-specific adapters local. Promote only generic epoch, transaction and result services after another product proves the same contract.