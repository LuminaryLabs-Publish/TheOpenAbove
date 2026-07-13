# Provider Admission Audit: Module Source, Integrity and Parity Contract

**Timestamp:** `2026-07-13T05-19-21-04-00`

## Summary

The runtime currently treats URL resolution and successful ESM evaluation as sufficient provider admission. Production needs an explicit contract covering immutable source identity, content verification, API compatibility, browser/headless parity, atomic adoption, terminal failure and visible proof.

## Current provider inventory

```txt
provider: Three.js
browser source: cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js
identity quality: exact package version, no recorded content fingerprint or admission result
package ownership: absent

provider: NexusEngine
browser source: cdn.jsdelivr.net/gh/LuminaryLabs-Dev/NexusEngine@main/src/index.js
identity quality: mutable branch reference
headless source: actions/checkout of LuminaryLabs-Dev/NexusEngine ref main
shared immutable browser/headless revision: absent
package ownership: absent
```

## Required manifest entry

```txt
RuntimeProviderDescriptor {
  providerId,
  sourceKind,
  sourceUrl,
  immutableRevision,
  expectedFingerprint,
  requiredExports,
  apiContractVersion,
  allowedFallbacks,
  timeoutMs
}
```

## Required verification order

```txt
1. validate manifest schema
2. require immutable source revision
3. resolve source under bounded timeout
4. verify bytes or approved integrity policy
5. evaluate module in the bootstrap boundary
6. verify required exports
7. probe API contract without mutating gameplay
8. compare browser/headless provider identities
9. atomically commit one provider-set generation
10. publish typed result and visible receipt
```

## Required terminal results

```txt
accepted
rejected-manifest
rejected-source-not-immutable
rejected-fetch
rejected-integrity
rejected-module-evaluation
rejected-export-contract
rejected-api-compatibility
rejected-browser-headless-parity
fallback-selected
```

## Required fixtures

```txt
mutable-branch-reference-rejected
exact-revision-accepted
fingerprint-mismatch-rejected
missing-export-rejected
API-contract-drift-rejected
provider-timeout-rejected
partial-provider-set-never-published
same-command-id-same-result
stale-generation-zero-mutation
browser-headless-revision-parity
provider-independent-failure-visible
first-provider-frame-cites-generation
source-build-pages-provider-parity
```

## Non-claim

No security, integrity, availability, fallback or browser/headless parity guarantee is currently proven.