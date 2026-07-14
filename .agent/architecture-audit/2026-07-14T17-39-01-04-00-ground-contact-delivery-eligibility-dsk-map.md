# Architecture Audit: Ground Contact and Delivery Eligibility DSK Map

**Timestamp:** `2026-07-14T17-39-01-04-00`

## Plan ledger

**Goal:** assign one authority to terrain contact, landing classification, delivery eligibility and matching result publication.

- [x] Map current producer and consumer ownership.
- [x] Identify the missing transaction boundary.
- [x] Preserve existing simulation, mail, terrain and render kits.
- [ ] Implement the authority family and fixtures.

## Current ownership

```txt
open-above-balloon-simulation-kit
  owns key state, buoyancy, velocity, position and terrain clamp
  does not publish ground contact or landing results

open-above-terrain-surface-kit / streamed terrain
  offer terrainHeight sampling
  do not publish a sample revision to contact or delivery

open-above-mail-delivery-domain
  owns parcel, route, towns, progress and visuals

open-above-delivery-volume-kit
  computes horizontal distance and altitude delta
  does not consume contact or clearance state

open-above-delivery-progress-kit
  marks delivery when volume.inside
  does not require airborne, route or contact settlement

open-above-balloon-telemetry-kit / GameHost
  publish snapshots
  do not expose ContactRevision or delivery eligibility receipts

open-above-visual-domain / balloon presentation
  render the post-update state
  do not acknowledge grounded versus airborne delivery identity
```

## Required parent domain

```txt
open-above-ground-contact-delivery-eligibility-settlement-authority-domain
```

## Required subkits

```txt
open-above-flight-step-identity-kit
open-above-terrain-contact-sample-kit
open-above-ground-contact-classification-kit
open-above-contact-position-settlement-kit
open-above-contact-velocity-settlement-kit
open-above-impact-event-kit
open-above-landing-event-kit
open-above-contact-revision-kit
open-above-mail-clearance-policy-kit
open-above-delivery-contact-admission-kit
open-above-delivery-volume-revision-kit
open-above-mail-delivery-eligibility-result-kit
open-above-contact-delivery-conflict-kit
open-above-grounded-delivery-rejection-kit
open-above-contact-telemetry-projection-kit
open-above-delivery-presentation-descriptor-kit
open-above-first-mail-delivery-frame-ack-kit
open-above-contact-delivery-fixture-kit
```

## Command graph

```txt
FlightStepCommand
  -> TerrainContactSample
  -> GroundContactSettlementCommand
  -> GroundContactResult + ContactRevision
  -> MailDeliveryEligibilityCommand
  -> MailDeliveryResult or GroundedDeliveryRejected
  -> telemetry and presentation descriptors
  -> FirstMailDeliveryFrameAck
```

## Compatibility rule

Keep the existing terrain sampler, balloon integration, mail domain, route descriptors and town visuals. Add explicit contact and eligibility results around them rather than moving terrain or mail ownership into the browser host.