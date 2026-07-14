# Interaction Audit: Provider Build Command and Result Map

## Goal

Replace implicit checkout/build continuation with typed provider-build admission.

## Commands

```txt
ProviderRevisionResolveCommand
ProductCheckoutAdmissionCommand
ProviderCheckoutAdmissionCommand
ProviderContractProofCommand
ProviderBundleAdmissionCommand
BrowserBuildIdentityAdmissionCommand
ProviderBuildIdentityRetireCommand
```

## Results

```txt
Accepted
Rejected
Conflict
Stale
MissingCheckout
ProviderContractFailed
BundleFailed
IdentityMismatch
BrowserAdmissionFailed
FrameTimeout
Retired
```

## Required correlation

Every command and result must carry:

```txt
workflowRunId
attemptId
productSha
providerPolicyRevision
providerSha
providerEntryFingerprint
buildIdentityManifestId
artifactId
browserGeneration
```

## Current untyped transitions

```txt
ref: main checkout success
shell environment mutation
Node process exit status
Vite alias resolution
compile-time SHA projection
GameHost assignment
```

These are useful implementation steps but not a complete admission result. Failures can stop the workflow, while local missing-checkout and `local-main` ambiguity lack a shared typed outcome.