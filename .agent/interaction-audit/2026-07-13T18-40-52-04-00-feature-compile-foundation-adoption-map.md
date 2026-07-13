# Interaction Audit: Feature Compile to Foundation Adoption

**Timestamp:** `2026-07-13T18-40-52-04-00`

## Summary

The user does not directly command the mountain, but every flight frame depends on the boot-time feature compile and later staged-world activation. The current path has no command identity, terminal result, cancellation, stale rejection, or recovery state.

## Plan ledger

**Goal:** turn boot-time feature compilation and ready-time adoption into explicit command/result interactions.

- [x] Trace boot registration.
- [x] Trace global-cell compilation.
- [x] Trace ready-time consumer refresh.
- [x] Identify stale, failure, and retry behavior.
- [ ] Add command/result admission.

## Current map

```txt
create telemetry engine
  -> install Core World child domains
  -> register mountain
  -> no registration result retained

create visual domain
  -> compile global cell immediately
  -> set compiled=true
  -> no artifact or failure projection

base generator ready
  -> elevation starts applying
  -> consumers refresh from callbacks
  -> no common adoption result

later feature change/reset
  -> compiled flag remains true
  -> no automatic recompile or stale rejection
```

## Required interaction

```txt
WorldFeatureCompileCommand
  -> Accepted | Duplicate | Stale | Invalid | Failed | Cancelled

ResolvedWorldFoundationArtifact
  -> prepared but not yet visible

WorldFoundationAdoptionCommand
  -> Complete | Partial | Failed | Stale | Superseded | Cancelled

FirstVisibleLandformFrameAck
  -> completes the accepted interaction
```

Diagnostics and `GameHost` should expose detached, bounded results rather than raw mutable engine/domain objects.
