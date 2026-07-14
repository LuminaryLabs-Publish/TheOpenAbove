# Interaction Audit: Provider Admission Result Map

**Timestamp:** `2026-07-14T01-39-09-04-00`

## Summary

The current browser interaction has only two startup outcomes: continue silently or show fatal text. The provider pin needs a typed result map so invalid exports, malformed domain contracts, unsatisfied dependencies, duplicate ownership, failed aliases, feature conflicts, stale startup work, and visible-frame timeout are distinguishable.

## Plan ledger

**Goal:** define explicit commands and terminal results for provider admission, composition, feature registration, visual adoption, and retirement.

- [x] Map the current implicit startup path.
- [x] Identify missing identities and terminal states.
- [x] Define command/result boundaries.
- [x] Define stale and duplicate handling.
- [ ] Implement the protocol and browser projection.

## Current map

```txt
boot()
  -> createGame()
  -> success: no structured result
  -> failure: showFatal(error)
```

## Required command chain

```txt
OpenProviderCommand
  -> ProviderModuleResult

InspectCapabilityContractsCommand
  -> ProviderCapabilityContractResult

ComposeWorldDomainsCommand
  -> WorldDomainCompositionResult

RegisterFeatureSetCommand
  -> FeatureSetRegistrationResult

PrepareVisualWorldCommand
  -> VisualWorldPreparationResult

EnterPlayableWorldCommand
  -> FirstProviderContractWorldFrameAck

RetireFailedStartupCommand
  -> StartupRetirementResult
```

## Provider result statuses

```txt
Accepted
RejectedMissingExport
RejectedMalformedDomainPath
RejectedInvalidParentPath
RejectedUnsatisfiedDependency
RejectedDuplicateProvider
RejectedApiOverwrite
RejectedInstallAlias
RejectedFeatureConflict
FailedImport
FailedComposition
FailedRegistration
FailedVisualPreparation
TimedOut
Cancelled
Stale
Superseded
Retired
```

## Required identities

```txt
ProviderRevision
ProviderModuleFingerprint
ProviderContractFingerprint
HostGeneration
CompositionAttemptId
CompositionRevision
FeatureSetFingerprint
FeatureRegistryRevision
FoundationRevision
VisualPreparationId
RendererGeneration
FrameId
```

## Duplicate and stale policy

```txt
same commandId + same fingerprint -> return prior result
same commandId + different payload -> reject conflict
older host generation -> Stale
accepted successor already exists -> Superseded
late async import or visual callback -> quarantine
late frame from predecessor revisions -> reject
```

## Browser projection

The error panel should project a stable result code, provider revision, failing domain or token, and retry eligibility. It should not be the authority for startup state.

## Validation boundary

No protocol implementation, retry, stale-callback fixture, or browser projection test exists.