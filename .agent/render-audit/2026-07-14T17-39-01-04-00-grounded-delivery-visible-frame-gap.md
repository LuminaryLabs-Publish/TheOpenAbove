# Render Audit: Grounded Delivery Visible-Frame Gap

**Timestamp:** `2026-07-14T17-39-01-04-00`

## Plan ledger

**Goal:** make a visible delivery frame prove the same settled contact and mail result used by gameplay.

- [x] Trace simulation, mail and rendering order.
- [x] Identify the missing frame correlation fields.
- [x] Preserve current Three.js, HDR, balloon and town presentation.
- [ ] Add exact result-to-frame admission and browser proof.

## Current frame order

```txt
simulation.update(dt)
  -> terrain clamp may move balloon to ground + 30
mail.update(clamped position)
  -> parcel may become delivered
balloon and town presentation update
visual.update(...)
engine.tick(dt)
visual.render(...)
```

## Gap

A frame can render the balloon at the terrain clamp while the parcel message says delivery completed. The frame does not cite:

```txt
RunId
StepId
ContactRevision
GroundContactResultId
MailDeliveryResultId
renderer generation
frame ID
image hash
```

No presentation descriptor distinguishes airborne delivery, safe landing, hard impact or grounded rejection. `GameHost.getState()` can expose mutable snapshots, but it does not prove that the pixels and gameplay result share one accepted revision.

## Required render contract

```txt
MailDeliveryPresentationDescriptor
  contactRevision
  contactState
  parcelId
  destinationTownId
  deliveryResultId
  deliveryStatus
  message

FirstMailDeliveryFrameAck
  rendererGeneration
  frameId
  contactRevision
  deliveryResultId
  imageHash
```

## Required visual cases

```txt
airborne accepted delivery -> delivered message and matching frame
grounded delivery attempt -> rejection/landing message, no delivered frame
hard landing in volume -> impact presentation, no delivery presentation
stale contact revision -> no frame adoption
duplicate accepted result -> no duplicate visible transition
```

## Validation boundary

No browser image or renderer readback was captured. The gap is derived from source ordering and missing correlation data.