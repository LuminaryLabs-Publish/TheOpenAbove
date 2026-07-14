# Deploy Audit: Module Environment Import Fixture Gate

**Timestamp:** `2026-07-13T21-58-55-04-00`

## Plan ledger

**Goal:** prove the same grass-seed API imports safely and without ambient mutation in Node, browser, worker, Vite output and Pages output.

- [x] Identify current package and headless paths.
- [x] Record missing environment and publication fixtures.
- [x] Define source/build/Pages acceptance evidence.
- [ ] Execute the gate on `main`.

## Current proof path

```txt
npm run check
  -> tests/smoke.mjs
  -> tests/grass-field.mjs
  -> synthetic globalThis.window
  -> deterministic grass assertions

npm run headless:world
  -> headless editor
  -> npm run check

npm run build
  -> npm run check
  -> Vite build
```

The latest guard allows the Node path to evaluate the seed module without requiring a real browser. Current proof does not assert zero global mutation, explicit installation, disposal, worker importability, built-module parity or Pages parity.

## Required fixture matrix

```txt
source Node import without window
source Node import with synthetic window and no mutation
source worker import
source browser import and no implicit global
explicit browser compatibility install
collision and stale-generation rejection
owned disposal
Vite artifact import parity
Vite browser compatibility install
Pages module fingerprint parity
Pages browser compatibility install
first matching world/grass/flower frame
```

## Required terminal result

```txt
ModuleEnvironmentProofResult
  sourceRevision
  apiRevision
  nodeImport
  workerImport
  browserImport
  buildImport
  pagesImport
  implicitMutationCount
  compatibilityInstall
  compatibilityRetirement
  consumerFrameAck
  status
```

## Acceptance rule

Deployment is not proven by a successful Vite bundle alone. The source, built and deployed module must expose the same deterministic API revision, perform zero implicit global writes, and pass the same explicit compatibility installation and retirement contract.