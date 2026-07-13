# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-13T02-18-03-04-00`

## Plan ledger

**Goal:** implement an exactly-once Air Mail completion lifecycle that advances parcel, route and campaign truth while keeping message, map, town-marker, telemetry and visible-frame projections coherent.

### Gate 1: preserve upstream authority

- [ ] Pin Nexus Engine to an immutable revision.
- [ ] Establish one runtime session, lifecycle and frame owner.
- [ ] Add fixed-step input/simulation admission.
- [ ] Make telemetry snapshots and public readback immutable.
- [ ] Preserve the separate flight-session persistence authority.

### Gate 2: define mail campaign content and state

- [ ] Add `open-above-mail-delivery-completion-lifecycle-authority-domain`.
- [ ] Define a versioned Air Mail campaign manifest.
- [ ] Make parcel-to-route, route-to-town and route-to-airstream references explicit.
- [ ] Define campaign, route, mission and parcel revisions.
- [ ] Define parcel phases: `in-transit`, `delivery-candidate`, `delivered`.
- [ ] Define continuation outcomes: `next-parcel`, `route-complete`, `next-route`, `campaign-complete`.

### Gate 3: admit delivery exactly once

- [ ] Add command ID, delivery-attempt ID and runtime-session ID.
- [ ] Capture immutable position, volume and current evidence.
- [ ] Validate the expected mission predecessor.
- [ ] Validate route, parcel and destination identity.
- [ ] Apply route policy for required-current evidence.
- [ ] Cache and return the prior result for duplicate command IDs.
- [ ] Reject stale attempts with zero mutation.
- [ ] Commit parcel and mission successor state atomically.
- [ ] Publish `DeliveryCompletionResult`.

### Gate 4: make continuation explicit

- [ ] Add deterministic next-parcel selection.
- [ ] Add route-complete and campaign-complete transitions.
- [ ] Define behavior when the current manifest has no successor parcel.
- [ ] Keep reset and replay as explicit commands with expected-predecessor validation.
- [ ] Never call the low-level parcel-reset helper as an implicit continuation.

### Gate 5: synchronize projections

- [ ] Move completion messaging out of the per-frame flight guidance field.
- [ ] Define message priority, lifetime and acknowledgement policy.
- [ ] Retire or replace the map destination marker after delivery.
- [ ] Retire or replace the Three.js town-marker emphasis after delivery.
- [ ] Publish mission and projection revisions through telemetry and `GameHost`.
- [ ] Add consumer receipts for map, town, message and telemetry projections.
- [ ] Add first-visible-completion-frame acknowledgement.

### Gate 6: connect persistence

- [ ] Persist the admitted mail progression aggregate through the flight-session persistence authority.
- [ ] Restore active parcel, completed parcels, route phase and campaign phase atomically.
- [ ] Validate manifest compatibility during restore.
- [ ] Prove delivered state and successor objectives survive reload.

### Gate 7: proof

- [ ] Add manifest and reference-validation fixtures.
- [ ] Add exactly-once, duplicate and stale-attempt fixtures.
- [ ] Add next-parcel, route-complete and campaign-complete fixtures.
- [ ] Add completion-message and marker-retirement browser fixtures.
- [ ] Add reset and replay fixtures.
- [ ] Add first-visible-completion-frame fixture.
- [ ] Add source, build and Pages parity fixtures.

## Implementation order

```txt
1. campaign manifest and aggregate schema
2. mission, route and parcel revisions
3. command, attempt and result identities
4. delivery evidence and admission
5. atomic successor commit
6. continuation policy
7. message, map and town-marker projection adapters
8. telemetry and GameHost receipts
9. reset and replay commands
10. persistence participant adapter
11. first visible completion frame acknowledgement
12. pure, browser, build and Pages fixtures
```

## Recommended file cut

```txt
src/gameplay/mail-progression/
  mail-delivery-completion-lifecycle-authority-domain.js
  mail-campaign-manifest-kit.js
  mail-mission-state-kit.js
  delivery-command-envelope-kit.js
  delivery-evidence-kit.js
  delivery-admission-kit.js
  delivery-result-kit.js
  mail-continuation-policy-kit.js
  destination-projection-kit.js
  delivery-reset-command-kit.js
  delivery-journal-kit.js

src/gameplay/mail-delivery-domain/
  adapt existing route, parcel, volume, progress and town services

src/ui/parchment-map-overlay.js
  consume committed destination projection

src/main.js
  compose authority and projection receipts

tests/
  mail-campaign-manifest.mjs
  mail-delivery-completion.mjs
  mail-delivery-browser.mjs
  mail-delivery-replay.mjs
```

## Compatibility constraints

Preserve current controls, route geometry, town locations, parcel field names, map visual style, airstream sampling and balloon-flight behavior during the first completion-lifecycle cut.

## Current documentation state

Repo-local documentation is aligned through the `2026-07-13T02-18-03-04-00` delivery-completion audit family. Runtime implementation and executable proof remain open.