# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-13T00-00-02-04-00`

## Plan ledger

**Goal:** implement a verified, revisioned save/restore boundary for flight and mail progress without hiding browser durability inside gameplay kits or regressing simulation and rendering.

### Gate 1: preserve upstream authority
- [ ] Pin Nexus Engine to an immutable revision.
- [ ] Establish one runtime session, lifecycle and frame owner.
- [ ] Add fixed-step input/simulation admission.
- [ ] Make telemetry snapshots and public readback immutable.

### Gate 2: define portable participant contracts
- [ ] Add `open-above-flight-session-persistence-authority-domain`.
- [ ] Add detached balloon, mail, airstream and compatibility snapshot/load-candidate adapters.
- [ ] Define schema `open-above-session-save/1`.
- [ ] Validate finite vectors, bounded scalars, route references and delivery invariants.
- [ ] Bind candidates to runtime, world, route and participant revisions.

### Gate 3: implement durable save commit
- [ ] Add command ID, save ID, writer ID and persistence generation.
- [ ] Canonicalize field order and calculate a deterministic fingerprint.
- [ ] Write to a staging generation.
- [ ] Read back and verify exact bytes, schema and fingerprint.
- [ ] Compare the expected active predecessor and writer lease.
- [ ] Atomically promote the verified active generation.
- [ ] Retain one bounded verified backup.
- [ ] Publish `SaveCommitResult` only after durable verification.

### Gate 4: implement atomic restore
- [ ] Resolve the active generation, then verified backup only when required.
- [ ] Migrate supported predecessor schemas.
- [ ] Quarantine corrupt, incompatible or unsupported records.
- [ ] Prepare all participant candidates outside live ownership.
- [ ] Suspend input and ticks during installation.
- [ ] Install all participants atomically or preserve the predecessor.
- [ ] Publish `RestoreCommitResult` and a first-restored-frame acknowledgement.

### Gate 5: lifecycle, reset and conflicts
- [ ] Add bounded save, restore and reset commands to `GameHost`.
- [ ] Add explicit autosave, delivery and lifecycle policies.
- [ ] Never claim page-lifecycle success without verified durable completion.
- [ ] Add multi-tab writer identity and expected-predecessor conflict handling.
- [ ] Make reset converge live and durable generations.

### Gate 6: proof
- [ ] Add canonicalization, fingerprint, migration and quarantine unit fixtures.
- [ ] Add browser save/reload/restore and multi-tab fixtures.
- [ ] Prove delivered mail remains delivered after reload.
- [ ] Prove mid-flight position, elapsed and distance restore consistently.
- [ ] Prove partial restore never reaches a visible frame.
- [ ] Prove source, build and Pages parity.

## Implementation order

```txt
1. participant snapshot/load-candidate adapters
2. schema and validation
3. command/session/save/generation identities
4. canonicalization and content fingerprint
5. browser storage staging and readback verification
6. active-pointer and backup commit
7. detached restore preparation and atomic installation
8. migration and quarantine
9. writer conflicts, lifecycle and reset
10. bounded GameHost surface
11. visible restored-frame acknowledgement
12. pure/browser/build/Pages fixtures
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
  detached snapshot/load-candidate adapters

src/gameplay/mail-delivery-domain/
  detached snapshot/load-candidate adapters

tests/
  session-persistence.mjs
  session-persistence-migration.mjs
  session-persistence-corruption.mjs
  session-persistence-browser.mjs
```

## Compatibility constraint

Preserve current controls, route data, parcel fields, map projection and telemetry field shapes during the first persistence cut.

## Central reconciliation state

Repo-local and central documentation are synchronized through the `2026-07-13T00-00-02-04-00` audit family.