# Known Gaps: TheOpenAbove Provider Build Identity

**Last aligned:** `2026-07-14T12-38-21-04-00`  
**Status:** `checked-out-provider-build-browser-identity-authority-audited`

## Summary

The real provider now powers both the composition test and Vite bundle, and CI records its checkout SHA. Exact source selection, local setup, byte identity, artifact provenance and browser-frame acknowledgement remain incomplete.

## Plan ledger

**Goal:** keep identity gaps dependency ordered and prevent an observed checkout SHA from being promoted into reproducible build proof.

- [ ] Immutable product checkout.
- [ ] Immutable provider policy and checkout.
- [ ] Local provider setup/preflight.
- [ ] Provider entry and dependency fingerprints.
- [ ] Real-provider test receipt bound to revisions.
- [ ] Vite bundle identity receipt.
- [ ] Build identity manifest and file hashes.
- [ ] Browser `GameHost` identity admission.
- [ ] First matching visible frame.
- [ ] Source/build/Pages identity parity.

## Source and checkout gaps

```txt
product checkout ref: mutable main
provider checkout ref: mutable main
workflow event-to-product checkout equality: unproved
provider policy revision: absent
rerun provider reproducibility: absent
branch-moved classification: absent
```

## Local development gaps

```txt
.nexus-engine setup command: absent
checkout existence preflight: implicit module-resolution failure
checkout revision validation: absent
local fallback identity: local-main
release rejection for local-main: absent
```

## Byte and dependency identity gaps

```txt
provider entry SHA-256: absent
provider manifest fingerprint: absent
package lock: not found
lock-governed install: absent
bundle file hashes: absent
product build identity manifest: absent
```

## Test and bundle gaps

```txt
real-provider Node contract test: present
World Features/Foundation and northern-wall proof: present in source
independent execution by this audit: not performed
browser boot proof: absent
Vite alias resolution fixture: absent
embedded SHA-to-provider-byte comparison: absent
mixed-provider artifact rejection: absent
```

## Browser and render gaps

```txt
GameHost.nexusEngineSha projection: present
manifest comparison: absent
product SHA projection: absent
renderer generation binding: absent
frame ID binding: absent
image hash: absent
FirstBuildIdentityFrameAck: absent
```

## Artifact and deployment gaps

```txt
artifact manifest and hashes: absent
artifact identity retained in repo evidence: absent
deployment identity retained: absent
post-deploy HTTP and browser admission: absent
source/build/Pages identity parity: absent
```

## Status and validation gaps

```txt
combined commit statuses observed: empty
workflow run inspected: no
job logs inspected: no
npm install/check/build executed: no
browser fixture run: no
artifact downloaded: no
Page URL fetched: no
```

The empty status surface is not proof of success or failure.

## Dependency order

```txt
immutable product/provider revisions
  -> local setup and byte fingerprints
  -> lock-governed dependencies
  -> real-provider test receipt
  -> Vite bundle identity receipt
  -> build identity manifest
  -> artifact/deployment identity
  -> GameHost admission
  -> visible frame acknowledgement
  -> source/build/Pages parity
```

## Retained gaps

Route retirement, startup rollback, stale callback rejection, WebGL cleanup, provider capability contract proof, Core World revision adoption, grass publication, Air Mail completion and flight persistence remain open.

## Do not claim

Do not treat a recorded checkout SHA or `GameHost.nexusEngineSha` as proof that immutable provider bytes produced the built or deployed visible frame.