# Deploy Audit: Provider Build Identity Fixture Gate

## Required fixtures

```txt
immutable-product-checkout
immutable-provider-resolution
provider-entry-hash
missing-local-checkout
local-main-release-rejection
real-provider-node-contract
vite-alias-bundle
embedded-sha-to-manifest-match
artifact-file-hash
browser-GameHost-identity
first-visible-Air-Mail-frame
source-build-Pages-identity-parity
```

## Release gate

A Pages release is accepted only when one evidence manifest binds:

```txt
workflow event
product SHA
provider policy revision
provider SHA
provider entry hash
Node contract result
bundle result
artifact hashes
deployment identity
Page URL
GameHost identity
renderer frame acknowledgement
```

## Current validation state

```txt
source inspection: complete
four ahead diffs inspected: complete
combined commit statuses: none returned
workflow run: not inspected
real-provider test: not independently run
Vite build: not independently run
browser fixture: unavailable
artifact and Pages identity fixtures: unavailable
```

No release-readiness claim is permitted until the fixture family executes against the exact candidate artifact.