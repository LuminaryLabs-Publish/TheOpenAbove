# Known Gaps: TheOpenAbove Ground Contact and Delivery Eligibility

**Last aligned:** `2026-07-14T17-39-01-04-00`  
**Status:** `ground-contact-delivery-eligibility-settlement-authority-audited`

## Summary

Terrain penetration is resolved by a positional clamp, but no authoritative contact state governs mail delivery. Brookhaven's configured altitude tolerance includes the clamp altitude, making grounded delivery source-permitted.

## Plan ledger

**Goal:** keep contact, delivery, presentation and proof gaps dependency ordered.

- [ ] Flight-step identity.
- [ ] Versioned terrain-contact sample.
- [ ] Contact classification and immutable result.
- [ ] Atomic position and velocity settlement.
- [ ] Impact and landing events.
- [ ] Versioned mail-clearance policy.
- [ ] Delivery admission bound to contact state.
- [ ] Typed rejection, duplicate and conflict results.
- [ ] Telemetry and GameHost correlation.
- [ ] First matching visible frame.
- [ ] Source/build/Pages fixture parity.

## Contact-state gaps

```txt
RunId and StepId: absent
terrain sample ID and revision: absent
ContactRevision: absent
Airborne/SoftLanding/HardLanding/Grounded classification: absent
impact-speed result: absent
landing event: absent
impact event: absent
```

## State-settlement gaps

```txt
position clamp: present
verticalVelocity nonnegative clamp: present
velocity.y settlement in contact branch: absent
single terrain sample shared by contact and altitude: absent
atomic settlement receipt: absent
late/stale contact rejection: absent
```

## Delivery-admission gaps

```txt
destination geometry: present
parcel idempotency boolean: partial
contact-state requirement: absent
airborne-clearance policy: absent
hard-landing exclusion: absent
contact/delivery same-step precedence: implicit
typed grounded rejection: absent
immutable delivery result and fingerprint: absent
```

## Confirmed geometric case

```txt
Brookhaven safe altitude: 92
Brookhaven altitude tolerance: 72
accepted altitude interval: 20..164
balloon terrain clamp: 30
delta at town center: 62
current geometric admission: inside
```

## Telemetry and render gaps

```txt
ContactRevision readback: absent
GroundContactResultId: absent
MailDeliveryResultId: absent
contact-aware message descriptor: absent
renderer generation correlation: absent
frame ID and image hash: absent
FirstMailDeliveryFrameAck: absent
```

## Validation gaps

```txt
headless grounded-delivery fixture: unavailable
soft/hard landing fixture: unavailable
vertical-state coherence fixture: unavailable
same-step precedence fixture: unavailable
browser result/frame fixture: unavailable
built artifact fixture: unavailable
Pages fixture: unavailable
```

## Dependency order

```txt
flight and terrain identity
  -> contact classification
  -> atomic state settlement
  -> contact revision
  -> delivery clearance policy
  -> delivery result
  -> telemetry/presentation
  -> visible frame acknowledgement
  -> source/build/Pages parity
```

## Retained gaps

Immutable provider/build identity, lifecycle retirement, startup rollback, renderer cleanup, world adoption, terrain/vegetation proof, Air Mail completion history and flight persistence remain unresolved.

## Do not claim

Do not describe grounded delivery as browser-observed, and do not claim the path is fixed until executable fixtures prove the new authority.