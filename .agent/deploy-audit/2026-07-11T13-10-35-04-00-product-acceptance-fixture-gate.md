# Deploy Audit: Product Acceptance Fixture Gate

**Timestamp:** `2026-07-11T13-10-35-04-00`

## Current gate

```txt
npm run check
  -> required-file checks
  -> source-regex checks
  -> pure airstream/mail checks

npm run build
  -> npm run check
  -> Vite build
```

Neither command proves that the documented controls and objectives are executable in the browser or deployed Pages artifact.

## Required fixture layers

```txt
pure
  fixture:product-manifest
  fixture:acceptance-contract
  fixture:control-parity
  fixture:objective-parity
  fixture:documentation-projection

host
  fixture:runtime-binding-observation
  fixture:hud-docs-agent-parity
  fixture:headless-acceptance-parity

browser
  fixture:browser-acceptance
  fixture:browser-control-contract
  fixture:browser-objective-contract
  fixture:browser-restart-availability

publish
  fixture:pages-acceptance
  fixture:pages-product-fingerprint
```

## Required failure cases

```txt
README advertises a missing control
AGENTS requires a missing objective
HUD mode differs from manifest mode
runtime binding exists without a public contract
R restart advertised before ResetMission exists
browser smoke cannot complete declared objective
built or deployed acceptance fingerprint differs from source
```

## Deployment rule

Do not treat a successful Vite build as product acceptance. Pages deployment should be gated on a matching product manifest, generated documentation projections, runtime binding proof, browser objective proof and deployed acceptance fingerprint.

## Audit validation

```txt
runtime source changed: no
workflow changed: no
package scripts changed: no
commands run: no
browser smoke run: no
Pages smoke run: no
```
