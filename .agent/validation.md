# Validation: TheOpenAbove

**Last aligned:** `2026-07-12T02-29-50-04-00`

## Scope

Documentation-only audit of the browser-global `window.GameHost`, raw owner exposure, public command admission and committed read-model coherence through source revision `0e5ede8760e32d9082e19f880992380b0c5e9cb4`.

## Plan ledger

**Goal:** distinguish source-backed evidence of an authority leak from executable proof that the public host is isolated, capability-scoped and correlated to one visible frame.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove` as the oldest eligible documented repository.
- [x] Review root guidance and retained audit state.
- [x] Read startup host, RAF ordering and public host publication.
- [x] Read simulation, mail, airstream, camera, presentation, visual and telemetry APIs.
- [x] Confirm raw owner handles are exported publicly.
- [x] Confirm those handles expose mutable state and imperative methods.
- [x] Confirm readback lacks shared tick/frame/epoch/fingerprint provenance.
- [x] Reconcile the active source-backed kit count to 59.
- [x] Define static, browser and Pages proof requirements.
- [x] Change no runtime source, dependency, script or workflow.
- [x] Create no branch or pull request.

## Source-backed behavior

```txt
window.GameHost exports engine, NexusEngine and THREE
window.GameHost exports scene, renderer, camera and balloon
window.GameHost exports visual, simulation, airstream and mail domains
window.GameHost exports camera rig and balloon presentation domains
simulation exposes mutable state, update and dispose
mail exposes mutable parcel/state, update, reset and dispose
airstream exposes mutable state, sample, update and dispose
visual exposes renderer graph, update, render, resize and dispose
camera rig exposes mutable state, update and dispose
getState separately reads Nexus telemetry and a local snapshot
```

## Source-backed gaps

```txt
no owner-handle quarantine
no versioned capability descriptor
no public command envelope or command ID
no session, mission or frame revision admission
no finite-value public payload policy
no duplicate/stale rejection
no typed public command result
no immutable committed read model
no shared state fingerprint
no command-result to visible-frame acknowledgement
no capability revocation policy
```

## Existing proof surface

Current static checks and pure fixtures do not execute:

```txt
public key-surface assertion
raw owner absence
read-model detachment
read-model mutation isolation
non-finite command rejection
out-of-band simulation prevention
mail-delivery bypass prevention
direct render prevention
stale session/mission/frame rejection
duplicate command rejection
capability revocation
command-result and first-frame correlation
local/Pages host-contract parity
```

## Required static fixtures

```txt
fixture:host-public-key-surface
fixture:host-owner-handle-absence
fixture:host-no-engine-or-library-owner
fixture:host-no-render-owner
fixture:host-no-gameplay-owner
```

## Required browser fixtures

```txt
fixture:host-read-model-detachment
fixture:host-read-model-deep-immutability
fixture:host-non-finite-command-rejection
fixture:host-invalid-payload-zero-mutation
fixture:host-stale-session-command
fixture:host-stale-mission-command
fixture:host-stale-frame-command
fixture:host-duplicate-command
fixture:host-command-result-frame-ack
fixture:host-capability-revocation
```

## Required Pages smoke

```txt
load deployed route
wait for committed frame
verify public key surface
verify raw owner absence
verify read record is detached
submit one allowed command
verify typed result and matching frame acknowledgement
submit invalid and stale commands
verify zero mutation
compare local and deployed schema/capability versions
```

## Commands not run

```txt
npm install
npm run check
npm run headless:check
npm run build
browser smoke
Pages smoke
```

The connector environment provided repository source and write access, not a checked-out browser runtime. No command execution is claimed.

## Change-state validation

```txt
runtime JavaScript changed: no
package scripts changed: no
dependencies changed: no
gameplay changed: no
render behavior changed: no
deployment workflow changed: no
branch created: no
pull request created: no
.agent documentation changed: yes
```

## Completion boundary

Do not claim public-host isolation, command safety, read-model coherence or frame correlation until raw owners are removed, rejected commands prove zero mutation, accepted commands route to one authoritative owner, and browser/Pages fixtures tie results to one committed visible frame.