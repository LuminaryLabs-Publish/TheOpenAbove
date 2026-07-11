# Architecture Audit: Air Mail Route Authority DSK Map

**Timestamp:** `2026-07-11T05-25-29-04-00`

## Goal

Define one composed authority that owns Air Mail source identity, route traversal, delivery admission, reset and detached observations while reusing the new source-backed kits.

## Current composition

```txt
main
  -> open-above-airstream-domain
       -> route-kit
       -> sampler-kit
       -> field-kit
       -> visual-kit
       -> debug-kit
  -> open-above-balloon-simulation-kit
       -> airstream-balloon-force-kit
  -> open-above-mail-delivery-domain
       -> parcel-kit
       -> mail-route-kit
       -> delivery-volume-kit
       -> delivery-progress-kit
       -> mail-town-kit
  -> telemetry / HUD / GameHost
```

## Current authority split

```txt
airstream route source owns geometric current definitions
mail route source owns parcel, towns and correctAirstreamId
simulation owns live position and selected flow
mail progress owns delivery mutation
main owns ordering
HUD owns some product wording
legacy CAMPAIGN still owns reported region identity
```

No object owns the full mission transaction.

## Required composed domain

```txt
open-above-air-mail-authority-domain
  -> open-above-air-mail-manifest-kit
  -> open-above-air-mail-source-revision-kit
  -> open-above-air-mail-mission-phase-kit
  -> open-above-airstream-traversal-ledger-kit
  -> open-above-airstream-route-proof-kit
  -> open-above-delivery-admission-kit
  -> open-above-delivery-result-kit
  -> open-above-delivery-receipt-kit
  -> open-above-mail-reset-transaction-kit
  -> open-above-air-mail-observation-kit
  -> open-above-air-mail-route-fixture-kit
  -> open-above-air-mail-frame-correlation-fixture-kit
```

## Required authority flow

```txt
versioned manifest
  -> admitted burner/vent/reset commands
  -> fixed simulation ticks
  -> route samples
  -> route entry/dwell/segment/exit rows
  -> correct-current proof
  -> destination-volume sample
  -> delivery admission
  -> accepted/rejected/no-op result
  -> committed delivery receipt
  -> render/HUD/telemetry/GameHost projections
```

## Reuse rules

```txt
keep airstream-route-kit as immutable route normalization
keep airstream-sampler-kit as pure geometric sampling
keep airstream-field-kit as pure route blending
keep airstream-balloon-force-kit as simulation adapter
keep delivery-volume-kit as pure geometry
update delivery-progress-kit to consume admission results rather than decide authority alone
keep visual kits renderer-neutral consumers of committed descriptors
```

## Invariants

```txt
correctAirstreamId must exist in the active airstream manifest
destinationTownId must exist in the active town manifest
one mission epoch has one parcel identity
route evidence must be ordered by simulation tick
wrong-current and ambient arrivals cannot complete delivery
delivery is idempotent within an epoch
reset retires prior traversal and delivery evidence
all observation rows are detached and JSON-safe
```

## Upstream dependencies

The domain should be activated after immutable runtime admission, import purity, root lifecycle ownership and fixed-step clock/input authority. It should not create a second clock, input queue or frame journal.