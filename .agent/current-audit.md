# Current Audit: TheOpenAbove Ground Contact and Delivery Eligibility

**Last aligned:** `2026-07-14T17-39-01-04-00`  
**Status:** `ground-contact-delivery-eligibility-settlement-authority-audited`  
**Reviewed repository head:** `542b6db53269d1c5a78825f0e70b0f630dd0fbd8`  
**Reviewed runtime revision:** `0d9ea6f6f977b63d09f22f8ae36107bfccd81811`

## Summary

The current flight step resolves terrain penetration by moving the balloon to `terrainHeight + 30`, but it publishes no contact state and does not settle the complete velocity vector. Mail delivery is evaluated immediately afterward from geometry alone. Brookhaven's delivery altitude band includes the clamp altitude, so a grounded delivery is permitted by the current source.

## Plan ledger

**Goal:** make every delivery result cite an accepted, versioned ground-contact result from the same flight step.

- [x] Compare the full Publish inventory with central tracking.
- [x] Exclude TheCavalryOfRome.
- [x] Confirm ten eligible ledgers and ten root `.agent` states.
- [x] Confirm no new, missing or runtime-ahead repository.
- [x] Select only TheOpenAbove as the oldest aligned eligible repository.
- [x] Inspect all contact and delivery producer/consumer paths.
- [x] Preserve the 101 active kit and adapter surfaces.
- [x] Define the authority, typed results and fixture gate.
- [x] Change documentation only.
- [ ] Implement and execute settlement authority.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible non-Cavalry repositories: 10
central ledger entries: 10
root .agent states: 10
new or ledger missing: 0
root-agent missing: 0
runtime ahead: 0
selected: LuminaryLabs-Publish/TheOpenAbove
reason: oldest aligned eligible repository
prior alignment: 2026-07-14T12-38-21-04-00
```

## Complete interaction loop

```txt
browser boot
  -> compose Nexus Engine, Core World and visual domains
  -> create balloon, flight simulation, airstream, mail and map
  -> publish GameHost
  -> enter RAF

flight step
  -> read burner, vent and steering
  -> sample airstream and integrate buoyancy
  -> update full velocity and position
  -> sample terrain
  -> clamp position to ground + 30 on penetration
  -> clamp verticalVelocity nonnegative
  -> publish altitude from a second terrain sample
  -> mail samples destination volume from the clamped position
  -> parcel may become delivered
  -> presentation, telemetry and render advance
```

## Domains in use

```txt
workflow/provider/build/Pages lifecycle
browser route, input, RAF and GameHost
Nexus Engine telemetry and Core World
balloon flight and terrain contact
airstream route, sampling, forces and visuals
mail parcel, route, town, volume and progress
terrain/world streaming and height sampling
balloon, camera, map and HDR presentation
validation and audit governance
```

## Kit and service census

```txt
local source-backed kits:           71
runtime-implied adapters:           13
Core World surfaces:                17
active documented total:           101
inactive or retired legacy:         13
planned contact authority family:   19
```

The complete kit-by-kit list and service map are in the timestamped tracker and `.agent/kit-registry.json`.

## Source-backed findings

### Terrain contact is an implicit mutation

The simulation computes `ground = terrainHeight(x, z) + 30`, sets `position.y = ground` when penetrated and makes `verticalVelocity` nonnegative. It publishes no `ContactRevision`, landing class, impact speed or contact event.

### Full velocity settlement is not explicit

The contact branch settles `verticalVelocity`, but it does not explicitly settle `state.velocity.y` in the same branch. Consumers can therefore observe two vertical-motion values without a common settlement receipt.

### Delivery ignores contact state

The main frame calls `mail.update()` immediately after simulation. Delivery progress accepts when the geometric delivery volume reports `inside`; it does not require airborne clearance or an accepted contact result.

### Brookhaven includes the ground clamp

```txt
safe altitude: 92
altitude tolerance: 72
accepted band: 20..164
terrain clamp altitude: 30
delta: 62 <= 72
```

At the destination center, the clamped position qualifies geometrically.

### Visible-frame identity is absent

No renderer frame cites a `GroundContactResultId`, `ContactRevision` or `MailDeliveryResultId`.

## Required parent domain

```txt
open-above-ground-contact-delivery-eligibility-settlement-authority-domain
```

## Required transaction

```txt
GroundContactSettlementCommand
  -> bind RunId, StepId, terrain revision and pre-contact state
  -> classify Airborne, SoftLanding, HardLanding or Grounded
  -> settle position and both vertical-velocity representations
  -> publish GroundContactResult and ContactRevision

MailDeliveryEligibilityCommand
  -> bind parcel, route, destination and ContactRevision
  -> sample one versioned delivery volume
  -> apply explicit clearance and contact policy
  -> reject grounded, hard-impact, unresolved and stale candidates
  -> publish one immutable MailDeliveryResult
  -> acknowledge one matching visible frame
```

## Validation boundary

Documentation only. Source and configuration were inspected. No runtime, test, build, browser, artifact or Pages fixture was executed.