# Deploy Audit: Tiered Check, Build and Pages Fixture Gate

**Timestamp:** `2026-07-16T13-39-49-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

## Summary

`npm run build` depends on the tiered check, but the check can finish successfully with failed assertions. Deployment evidence therefore needs a structured validation identity, not only a zero process exit.

## Intent

Block artifact and Pages readiness unless every required suite has an accepted typed result and every non-blocking drift has a valid scoped record.

## Current gate

```txt
npm run check
  -> tiered runner
  -> zero errors, any number of warnings
  -> exit zero

npm run build
  -> check passes
  -> Vite build
  -> artifact eligible for Pages path
```

## Required gate

```txt
source revision
  -> required suite registry
  -> structured ValidationSuiteResults
  -> explicit finding severity
  -> active drift/waiver validation
  -> ReleaseValidationResult
  -> Vite artifact embeds result ID and digest
  -> deployment records artifact/result pair
  -> Pages startup reports matching identity
  -> FirstValidatedReleaseFrameAck
```

## Fixture gates

### Runner policy

- [ ] Unknown assertion failure blocks.
- [ ] Known drift requires stable finding ID.
- [ ] Expired drift blocks.
- [ ] Infrastructure failure blocks.
- [ ] Warning count alone cannot establish eligibility.

### Product invariants

- [ ] Mutated weather layer count blocks.
- [ ] Mutated weather coverage floor blocks.
- [ ] Mutated route protection blocks.
- [ ] Missing required runtime file blocks.
- [ ] Broken cloud source contract blocks unless explicitly admitted as drift.
- [ ] Terrain streaming and overlay failures block.

### Artifact and Pages

- [ ] `npm run check` emits machine-readable result artifact.
- [ ] `npm run build` requires accepted result for the same source/provider revisions.
- [ ] Built output includes validation result ID and digest.
- [ ] Pages deployment records the same artifact/result pair.
- [ ] Browser readback reports matching release identity.
- [ ] First stable frame acknowledges that identity.

## Required evidence

```txt
source SHA
Nexus Engine provider SHA
validation policy revision
required suite IDs and versions
suite result IDs
finding IDs and classes
waiver/drift IDs and expiry
ReleaseValidationResult ID and digest
artifact ID, hash and size
Pages deployment/run identity
browser readback and first-frame acknowledgement
```

## Claim boundary

No check, build, artifact download or Pages smoke was executed during this documentation audit.