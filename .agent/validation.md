# Validation: TheOpenAbove Route Runtime Resource Retirement

**Last aligned:** `2026-07-14T06-38-49-04-00`

## Scope

Documentation-only inspection of repository selection state, `src/main.js`, balloon simulation, airstream domain, mail delivery domain, parchment map overlay, visual domain, package checks, current `.agent` state and central ledger.

## Plan ledger

**Goal:** state exactly which lifecycle services exist, which parent authority is missing, and which executable evidence remains required.

- [x] Enumerate the full Publish organization inventory.
- [x] Compare ten eligible repos against central ledger coverage and current heads.
- [x] Exclude TheCavalryOfRome.
- [x] Select TheOpenAbove by oldest eligible central timestamp.
- [x] Inspect main boot and recursive gameplay RAF.
- [x] Inspect simulation input disposal.
- [x] Inspect airstream and mail visual disposal.
- [x] Inspect map RAF, observer and listener disposal.
- [x] Inspect visual-world disposal.
- [x] Inspect fatal-error and public GameHost behavior.
- [x] Preserve and update the complete kit/service inventory.
- [ ] Execute browser stop, rollback, re-entry and GPU-retirement proof.

## Source-backed observations

```txt
reviewed pre-audit head: 71a69d1bf4821bb985d4a1eb22658d1d1478ea5c
runtime source revision retained: 09bb6b95549d9480dfc2caa4517575ab4009ba98
provider revision retained: ea973811342fe3ba2a35bb018323d987d3fec4b5

recursive gameplay RAF: present
gameplay RAF request ID retained: no
route/session generation: absent
aggregate stop/dispose command: absent

simulation.dispose: present, not called by route
airstream.dispose: present, not called by route
mail.dispose: present, not called by route
map.dispose: present, not called by route
visual.dispose: present, not called by route

partial startup rollback: absent
per-owner retirement receipts: absent
renderer/context retirement result: absent
GameHost retirement: absent
same-document re-entry fixture: absent
first successor route frame acknowledgement: absent
```

## Existing proof

Source inspection proves local component disposers exist and that the route does not call them. Existing static and deterministic tests do not execute browser teardown or same-document re-entry.

## Required fixtures

```txt
start and first visible frame
normal stop
stop before first frame
failure after engine construction
failure after renderer construction
failure after balloon construction
failure after map construction
map open during stop
same-document replacement
second boot after retirement
stale predecessor callback
listener and observer counts
scene and WebGL resource counts
GameHost terminal state
first successor route frame
production build parity
Pages parity
```

## Validation result

```txt
documentation files changed: yes
runtime JavaScript changed: no
test source changed: no
package scripts changed: no
dependencies changed: no
workflow changed: no
deployment changed: no
branch created: no
pull request created: no

source inspected: yes
organization inventory compared: yes
central ledger compared: yes
component disposal surfaces inspected: yes
browser lifecycle fixture: not run
failure-injection fixture: not run
WebGL retirement fixture: not run
build fixture: not run
Pages fixture: not run
```

No complete route cleanup, startup rollback, stale-callback isolation, renderer/context retirement, re-entry safety, artifact parity or production-readiness claim is made.