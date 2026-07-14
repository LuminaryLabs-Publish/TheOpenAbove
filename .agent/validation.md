# Validation: TheOpenAbove Provider Build Identity

**Last aligned:** `2026-07-14T12-38-21-04-00`

## Scope

Documentation-only inspection of repository selection, four ahead commits, four changed files, workflow/build/provider identity flow, current kit/service inventory and central tracking.

## Plan ledger

**Goal:** state exactly what the new checked-out-provider path proves and what remains unexecuted.

- [x] Enumerate the full Publish organization inventory.
- [x] Compare ten eligible repos against central ledger and root `.agent` coverage.
- [x] Compare all eligible current heads with recorded documentation heads.
- [x] Exclude TheCavalryOfRome.
- [x] Select TheOpenAbove as the sole runtime-ahead repository.
- [x] Inspect commits `0ff6d20`, `6613698`, `1994b0d` and `0d9ea6f`.
- [x] Inspect workflow, Vite config, browser entry and real-provider test.
- [x] Preserve and update the full kit/service inventory.
- [x] Inspect the combined commit-status surface.
- [ ] Execute workflow, local setup, tests, build, browser, artifact and Pages proof.

## Source-backed observations

```txt
reviewed pre-audit head: 0d9ea6f6f977b63d09f22f8ae36107bfccd81811
ahead commits from prior docs: 4
changed files: 4

product checkout ref: main
NexusEngine checkout ref: main
provider checkout path: .nexus-engine
provider SHA recording: present
Vite @nexus-engine alias: present
compile-time SHA projection: present
GameHost.nexusEngineSha: present
real-provider composition test: present
fake-provider composition test: removed
local fallback identity: local-main
package lock: not found
combined commit statuses: empty
```

## What source inspection proves

```txt
the Node composition test imports the checked-out provider
the test checks World Features and World Foundation APIs
the authored northern-wall is registered
a compiled cell receives one contribution
elevation samples near 500 meters
engine.tick(0) is expected not to throw
Vite resolves the browser provider from the same checkout path
CI records the provider checkout HEAD
GameHost exposes the embedded provider SHA string
```

## What is not proven

```txt
a workflow run succeeded for the reviewed head
the product checkout equaled the workflow event commit
the provider was selected by an immutable policy
the real-provider test passed in an executed environment
the Vite alias produced a valid browser bundle
the embedded SHA matched provider entry bytes
the browser booted with the accepted provider
a rendered frame cited the accepted build identity
the artifact and deployed origin matched source identity
```

## Required fixtures

```txt
immutable product checkout
immutable provider resolution
missing/wrong local checkout
provider entry hash
lock-governed install
real-provider Node contract
Vite provider alias bundle
embedded SHA-to-manifest equality
browser GameHost identity
first visible Air Mail frame
artifact/deployment identity
source/build/Pages parity
```

## Validation result

```txt
documentation files changed: yes
runtime JavaScript changed by audit: no
test source changed by audit: no
package or dependencies changed by audit: no
workflow changed by audit: no
deployment implementation changed by audit: no
branch created: no
pull request created: no

organization inventory compared: yes
central ledger compared: yes
all eligible heads compared: yes
source and diffs inspected: yes
combined status inspected: yes, empty result
workflow run inspected: no
npm install/check/build: not run
browser fixture: not run
artifact downloaded: no
Page URL fetched: no
```

No immutable provider admission, bundle provenance, browser/provider identity, visible-frame convergence, artifact parity or production-readiness claim is made.