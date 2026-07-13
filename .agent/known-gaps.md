# Known Gaps: TheOpenAbove World Generation Public Contract Proof

**Last aligned:** `2026-07-13T18-59-14-04-00`  
**Status:** `world-generation-public-contract-proof-authority-audited`

## Summary

The current tests pass conceptually through two different authorities: public-facade behavior and internal-source location. There is no manifest or proof result that distinguishes diagnostic source checks from canonical API, build, deployed and visible-runtime evidence.

## Plan ledger

**Goal:** keep proof gaps dependency ordered and tied to executable acceptance evidence.

- [ ] Canonical public contract manifest.
- [ ] Contract revision and fingerprint.
- [ ] Public-facade export proof.
- [ ] Internal module-graph diagnostics.
- [ ] Typed behavioral proof results.
- [ ] Build-artifact import and parity proof.
- [ ] Pages artifact identity and parity proof.
- [ ] Consumer revision correlation.
- [ ] First visible contract frame acknowledgement.
- [ ] Drift, stale artifact and source-layout fixtures.

## Identity gaps

```txt
WorldGenerationContractRevision: absent
WorldGenerationPublicContractManifest: absent
WorldGenerationModuleGraphRevision: absent
WorldGenerationSourceProofFingerprint: absent
WorldGenerationBuildProofFingerprint: absent
WorldGenerationPagesProofFingerprint: absent
WorldGenerationProofResult: absent
FirstContractRevisionFrameAck: absent
```

## Current authority split

```txt
world-generation-kit.js
  public runtime facade
  public re-exports
  behavioral test import

world-generation-support.js
  internal constant definitions
  internal helpers
  structural smoke import by file path
```

The split is valid implementation architecture. The gap is allowing physical file location to act as terminal proof of a public runtime contract.

## Structural-proof gaps

```txt
source regex assertions have no declared diagnostic-only status
public export parity is not compared with physical definitions
internal refactors are not distinguished from contract changes
source markers can pass without executing behavior
required-file checks have no module-graph receipt
```

## Behavioral-proof gaps

```txt
fixtures return process status only
no per-case typed result or fingerprint
no explicit public descriptor schema revision
no stale-contract rejection
no proof correlation with feature/foundation adoption
```

## Build and deployment gaps

```txt
built public exports are not imported and compared
built deterministic behavior is not compared with source
artifact revision is not bound to proof results
Pages artifact identity is not checked
source/build/Pages terminal parity result is absent
```

## Render and gameplay gaps

```txt
terrain consumer contract revision: absent
horizon consumer contract revision: absent
vegetation/flora consumer contract revision: absent
map consumer contract revision: absent
collision-height consumer contract revision: absent
visible frame contract revision: absent
mixed-revision rejection: absent
```

## Validation gaps

```txt
npm run check during this audit: not run
Vite production build during this audit: not run
source-to-build contract parity fixture: absent
Pages contract parity fixture: absent
browser visible-consumer fixture: absent
source-layout refactor fixture: absent
stale artifact fixture: absent
```

## Dependency order

```txt
public manifest
  -> contract revision and fingerprint
  -> source facade proof
  -> behavior proof
  -> build parity
  -> Pages parity
  -> consumer correlation
  -> visible-frame acknowledgement
```

## Do not claim

Do not claim that the current structural smoke proves the complete public contract, or that source, build, Pages and visible consumers share one revision.
