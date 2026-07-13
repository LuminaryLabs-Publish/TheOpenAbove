# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-12T23-50-01-04-00`

## Plan ledger

**Goal:** establish a verified, revisioned save/restore boundary for flight and mail progress without hiding browser storage inside gameplay kits or regressing existing simulation and rendering behavior.

### Gate 1: preserve upstream runtime authority
- [ ] Pin Nexus Engine to an immutable revision.
- [ ] Establish one runtime session and fixed-step/frame authority.
- [ ] Keep telemetry readback immutable and revisioned.

### Gate 2: define portable participant contracts
- [ ] Add `open-above-flight-session-persistence-authority-domain`.
- [ ] Add explicit balloon, mail, airstream and world snapshot/load adapters.
- [ ] Define canonical schema `open-above-session-save/1`.
- [ ] Reject non-finite vectors, invalid route references and inconsistent delivery state.
- [ ] Bind every candidate to runtime, world, route and participant revisions.

### Gate 3: implement durable save commit
- [ ] Add command ID, save ID and persistence generation.
- [ ] Canonicalize field order and calculate a deterministic fingerprint.
- [ ] Write to a staging generation.
- [ ] Read back and verify exact bytes, schema and fingerprint.
- [ ] Compare expected active predecessor and writer lease.
- [ ] Atomically promote the verified active generation.
- [ ] Retain one bounded verified backup.
- [ ] Publish `SaveCommitResult` only after durable verification.

### Gate 4: implement atomic restore
- [ ] Resolve active generation, then verified backup only when required.
- [ ] Migrate supported predecessor schemas.
- [ ] Quarantine corrupt, incompatible or unsupported records.
- [ ] Prepare all participant candidates outside live ownership.
- [ ] Suspend input/ticks during installation.
- [ ] Install all authoritative participants atomically or restore the predecessor truthfully.
- [ ] Publish `RestoreCommitResult` and first-restored-frame acknowledgement.

### Gate 5: lifecycle, reset and conflicts
- [ ] Add explicit save and reset commands to a bounded host API.
- [ ] Add typed autosave/delivery/pagehide policy.
- [ ] Do not claim page-lifecycle success without verified durable completion.
- [ ] Add multi-tab writer identity and expected-predecessor conflict handling.
- [ ] Make reset replace or remove the durable active generation.

### Gate 6: proof
- [ ] Add pure canonicalization, fingerprint, migration and quarantine fixtures.
- [ ] Add browser save/reload/restore and multi-tab fixtures.
- [ ] Prove delivered mail remains delivered after reload.
- [ ] Prove mid-flight position, elapsed and distance restore consistently.
- [ ] Prove partial restore never reaches a visible frame.
- [ ] Prove source, build and Pages persistence parity.

## Implementation order

```txt
1. persistence schema and participant adapters
2. command/session/save/generation identities
3. canonicalization and validation
4. content fingerprint
5. browser storage staging adapter
6. readback verification
7. active-pointer and backup commit
8. restore preparation and atomic installation
9. migration and quarantine
10. conflict and page-lifecycle policy
11. bounded GameHost command/readback surface
12. visible restored-frame receipt
13. source/build/Pages fixtures
```

## Recommended file cut

```txt
src/runtime/persistence/
  flight-session-persistence-authority-domain.js
  persistence-schema-kit.js
  persistence-canonicalization-kit.js
  persistence-fingerprint-kit.js
  browser-storage-adapter-kit.js
  persistence-commit-kit.js
  persistence-restore-kit.js
  persistence-migration-kit.js
  persistence-quarantine-kit.js
  persistence-conflict-kit.js

src/runtime/balloon-simulation-kit.js
  add detached snapshot/load candidate adapters

src/gameplay/mail-delivery-domain/
  add detached snapshot/load candidate adapters

tests/
  session-persistence.mjs
  session-persistence-migration.mjs
  session-persistence-corruption.mjs
  session-persistence-browser.mjs
```

## Compatibility constraint

Preserve the current flight controls, route data, parcel fields, map projection and telemetry field shapes during the first cut. Persistence installation must not silently alter simulation, delivery or render semantics.

## Central reconciliation state

The repo-local audit and root `.agent` state are aligned at `2026-07-12T23-50-01-04-00`. The central ledger and internal change log must cite the final repo documentation head from this pass.