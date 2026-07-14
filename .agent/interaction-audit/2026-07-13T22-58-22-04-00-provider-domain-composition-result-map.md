# Interaction Audit: Provider Domain Composition Result Map

**Timestamp:** `2026-07-13T22-58-22-04-00`

## Summary

Startup currently communicates composition failure through a thrown error and the fatal text panel. A typed command/result map is needed so diagnostics, retry, GameHost and visible readiness observe the same terminal state.

## Plan ledger

**Goal:** replace ambient factory calls and exception-only reporting with explicit commands, receipts and terminal results.

- [x] Map current inputs and outputs.
- [x] Map success and failure observations.
- [x] Define typed command/result surfaces.
- [ ] Implement and expose them.

## Current map

```txt
input
  NexusEngine module object
  getSnapshot callback
  WORLD.features.landforms

ambient operations
  defineResource
  defineEvent
  defineRuntimeKit
  create domain kits
  createRealtimeGame
  read engine.n.worldFeatures
  register each feature

success observation
  returned engine
  later GameHost.engine

failure observation
  thrown TypeError
  error panel text
```

## Required command map

```txt
ProviderAdmissionCommand
  -> ProviderAdmissionResult

WorldDomainCompositionCommand
  -> DomainPreparationReceipt[]
  -> WorldDomainCompositionResult

FeatureSetRegistrationCommand
  -> FeatureRegistrationReceipt[]
  -> FeatureSetRegistrationResult

VisualBootstrapCommand
  -> VisualBootstrapResult
  -> FirstRegisteredWorldFrameAck
```

## Terminal statuses

```txt
accepted
already-current
provider-incompatible
factory-missing
dependency-missing
duplicate-provider
child-policy-conflict
api-probe-failed
feature-conflict
feature-registration-failed
visual-bootstrap-failed
stale-generation
visible-frame-timeout
```

## Public readback

GameHost diagnostics should expose immutable provider, composition, registry and visible-frame revisions rather than only the mutable raw engine.

## Validation boundary

No interaction or public-host behavior changed.