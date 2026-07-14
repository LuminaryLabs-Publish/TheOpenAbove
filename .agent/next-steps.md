# Next Steps: TheOpenAbove Ground Contact and Delivery Eligibility

**Last aligned:** `2026-07-14T17-39-01-04-00`  
**Status:** `ground-contact-delivery-eligibility-settlement-authority-audited`

## Plan ledger

**Goal:** introduce the smallest authoritative boundary that makes terrain contact and Air Mail completion coherent without restructuring existing flight, world or rendering systems.

### Gate 1: flight-step and terrain identity

- [ ] Allocate `RunId`, `StepId` and accepted flight revision.
- [ ] Sample terrain once for contact settlement.
- [ ] Record terrain provider, generation and sample identity.
- [ ] Reject stale or superseded terrain samples.

### Gate 2: contact classification and settlement

- [ ] Add `GroundContactSettlementCommand`.
- [ ] Classify Airborne, SoftLanding, HardLanding and Grounded.
- [ ] Settle position, `verticalVelocity` and `velocity.y` atomically.
- [ ] Publish impact and landing events with one `ContactRevision`.
- [ ] Preserve existing buoyancy, wind and steering behavior outside contact.

### Gate 3: delivery eligibility

- [ ] Add a versioned mail-clearance policy.
- [ ] Require every delivery attempt to cite the accepted `ContactRevision`.
- [ ] Reject Grounded, HardLanding, unresolved and stale contact states.
- [ ] Keep destination radius and altitude geometry as necessary but insufficient conditions.
- [ ] Publish immutable accepted, rejected, duplicate and conflict results.

### Gate 4: telemetry and presentation

- [ ] Add contact state and result identity to telemetry.
- [ ] Project accepted delivery and grounded rejection from immutable descriptors.
- [ ] Correlate `GameHost` readback with the accepted contact and mail results.
- [ ] Publish `FirstMailDeliveryFrameAck` with renderer generation, frame ID and image hash.

### Gate 5: deterministic fixtures

- [ ] Prove grounded Brookhaven-center delivery is rejected.
- [ ] Prove airborne safe-altitude delivery is accepted once.
- [ ] Prove hard landing inside the volume does not deliver.
- [ ] Prove full vertical-velocity settlement.
- [ ] Prove same-step contact precedence, stale rejection and idempotency.

### Gate 6: artifact and deployment parity

- [ ] Run the fixture against source and built artifact.
- [ ] Run a browser fixture against local build and Pages.
- [ ] Bind product/provider revisions, result IDs and frame evidence.
- [ ] Preserve the existing provider-build identity and route-retirement gates.

## Recommended file cut

```txt
src/runtime/ground-contact/
  ground-contact-settlement-authority-domain.js
  terrain-contact-sample-kit.js
  ground-contact-classification-kit.js
  contact-velocity-settlement-kit.js
  ground-contact-result-kit.js

src/gameplay/mail-delivery-domain/
  mail-clearance-policy-kit.js
  mail-delivery-eligibility-result-kit.js
  contact-delivery-admission-kit.js

tests/
  ground-contact-delivery-eligibility.mjs
```

## Compatibility constraints

Preserve the existing balloon simulation API, terrain-height provider, route data, town visuals, Air Mail state, map behavior and visual domain. Add typed admission around their existing data flow rather than moving gameplay ownership into `main.js`.

## Retained next steps

Immutable provider/build identity, route retirement, startup rollback, WebGL cleanup, Core World revision adoption, grass publication, mail completion history and flight persistence remain open.

## Do not claim

Do not claim safe landing, grounded-delivery exclusion, exact contact settlement, visible-frame convergence or deployment parity until all gates pass.