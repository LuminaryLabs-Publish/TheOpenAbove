# Provider Build Audit: Checkout, Bundle and Identity Contract

## Current strengths

```txt
real NexusEngine source is checked out
real provider is used by the composition test
Vite bundle resolves the same checkout path
exact checkout HEAD is recorded during CI
browser host exposes the recorded SHA
```

## Current gaps

```txt
product checkout ref: main
provider checkout ref: main
no provider policy revision
no product event-SHA equality check
no provider entry byte hash
no package lock or dependency fingerprint
no checked-in setup command for .nexus-engine
local fallback identity: local-main
no manifest inside dist
no browser identity assertion
no first-frame acknowledgement
```

## Contract

```txt
ProviderBuildIdentityCandidate
  productSha
  providerPolicyRevision
  providerSha
  providerEntrySha256
  dependencyFingerprint
  testPolicyRevision
  buildPolicyRevision

ProviderBuildIdentityResult
  candidateId
  nodeContractReceipt
  bundleReceipt
  artifactManifestId
  browserAdmissionReceipt
  firstFrameAck
  terminalStatus
```

## Admission rules

1. Product checkout must equal the workflow event SHA or an explicitly supplied immutable revision.
2. Provider policy must resolve to an exact SHA before checkout.
3. The provider entry hash must be calculated after checkout and before tests/build.
4. Tests and Vite must consume the same checkout generation.
5. `dist` must contain a manifest with product/provider identities and file hashes.
6. The browser must compare `GameHost` identity with the manifest before readiness.
7. One visible frame must acknowledge the accepted identity.
8. `local-main` cannot qualify as a releasable identity.

## Local development

Add a deterministic setup/preflight command that either resolves the configured provider revision into `.nexus-engine` or returns a typed missing-provider result. Do not rely on a manually prepared hidden directory.