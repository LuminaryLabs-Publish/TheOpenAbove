# Interaction Audit: Module Import and Compatibility Publication Result Map

**Timestamp:** `2026-07-13T21-58-55-04-00`

## Plan ledger

**Goal:** replace implicit browser-global mutation with one explicit, typed and reversible host interaction.

- [x] Identify current import-time interaction.
- [x] Define commands and terminal results.
- [x] Define collision, stale-generation and retirement outcomes.
- [ ] Implement and exercise the result map.

## Current interaction

```txt
browser imports grass-world-seed-kit.js
  -> module evaluates
  -> typeof window check passes
  -> window.OpenAboveGrassWorldSeedKit is overwritten
  -> caller receives no result
```

## Required interaction

```txt
host admits runtime generation
  -> CompatibilityTargetInspectCommand
  -> CompatibilityTargetInspectionResult
  -> CompatibilityPublicationCommand
  -> CompatibilityPublicationResult
  -> runtime uses immutable publication facade
  -> host retirement
  -> CompatibilityRetirementCommand
  -> CompatibilityRetirementResult
```

## Publication statuses

```txt
installed
already-installed
not-required
foreign-collision
incompatible-revision
stale-host-generation
invalid-target
failed
```

## Retirement statuses

```txt
retired
already-retired
not-owner
stale-publication
foreign-global-preserved
failed
```

## Command fields

```txt
commandId
moduleId
apiRevision
hostSessionId
hostGeneration
targetNamespace
expectedExistingPublicationId
policy
```

## Result fields

```txt
commandId
publicationId
moduleId
apiRevision
hostSessionId
hostGeneration
status
installed
owned
retired
collision
error
```

## Interaction rule

Importing the reusable module is not a compatibility-publication command. Only the admitted host may request publication, and every request must terminate with a typed result that can be correlated with later retirement.