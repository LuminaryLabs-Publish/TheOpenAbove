# Deploy Audit: Grounded Delivery Fixture Gate

**Timestamp:** `2026-07-14T17-39-01-04-00`

## Plan ledger

**Goal:** require source, built artifact and Pages execution to agree that terrain contact cannot silently complete Air Mail.

- [x] Define deterministic source fixtures.
- [x] Define browser and visible-frame fixtures.
- [x] Define artifact and Pages parity requirements.
- [ ] Implement and execute the fixture matrix.

## Required source fixtures

```txt
Brookhaven center at ground + 30 -> RejectedGrounded
Brookhaven center at safe altitude -> Accepted once
hard downward impact inside volume -> HardLanding and no delivery
outside radius at safe altitude -> no delivery
contact and delivery in same step -> contact settles first
velocity.y and verticalVelocity -> matching settled values
stale terrain revision -> rejected without parcel mutation
duplicate accepted command -> idempotent duplicate result
```

## Required browser fixtures

```txt
boot exact product/provider artifact
place balloon in deterministic test states
advance one bounded step
read ContactRevision and MailDeliveryResult
capture first matching visible frame
assert delivered text is absent for grounded rejection
assert accepted delivery frame cites the result ID
```

## Artifact and Pages gate

```txt
source fixture receipt
  == built artifact result schema
  == browser GameHost readback
  == Pages-origin result
  == renderer frame acknowledgement
```

Record product SHA, provider SHA, route revision, terrain revision, fixture ID, artifact hash, deployed URL, frame ID and image hash.

## Current proof state

```txt
source path inspected: yes
mathematical grounded case derived: yes
headless fixture: unavailable
browser fixture: unavailable
built artifact fixture: unavailable
Pages fixture: unavailable
visible-frame acknowledgement: unavailable
```

No deployment or production-readiness claim is made.