# Validation: TheOpenAbove

**Last aligned:** `2026-07-13T09-40-27-04-00`

## Scope

Documentation-only audit of map/world dual-surface frame coherence at repository revision `0af1b7c8d3131c2af6f60bcc0d655bf399f52ef5`.

## Plan ledger

**Goal:** distinguish source-backed scheduler and rendering structure from executable proof that WebGL world and Canvas2D map surfaces cite one committed state envelope and produce a coherent visible result.

- [x] Compare all ten accessible Publish repositories and central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `TheOpenAbove` under the oldest eligible rule.
- [x] Inspect `src/main.js`, `src/ui/parchment-map-overlay.js`, `src/visual/visual-domain.js` and `package.json`.
- [x] Confirm the world and map own separate recursive RAF chains.
- [x] Confirm world rendering continues while map-open pauses state updates.
- [x] Confirm map-open visibility precedes its first scheduled map draw by source ordering.
- [x] Confirm map projection reads live simulation and parcel getters.
- [x] Confirm no shared frame envelope, projection results or dual-surface commit receipt exists.
- [x] Preserve all 68 active source-backed kits, 12 implied adapters and services.
- [x] Add the timestamped tracker and complete audit family.
- [x] Change no runtime source, dependency, script or workflow.
- [x] Create no branch or pull request.

## Source-backed checks

```txt
world recursive RAF: present
map recursive RAF: present
world render while map open: present
simulation/mail/visual/telemetry pause while map open: present
map overlay CSS visibility before first map draw: source-order confirmed
map live player-state getter: present
map live parcel getter: present
shared immutable frame envelope: absent
flight/mail source revisions: absent
map transition generation: absent
world projection result: absent
map projection result: absent
dual-surface commit result: absent
partial-frame recovery receipt: absent
first coherent map frame acknowledgement: absent
public dual-surface readback receipt: absent
```

## Source inspected

```txt
src/main.js
src/ui/parchment-map-overlay.js
src/visual/visual-domain.js
package.json
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
central repository ledger entries
current repository inventory and heads
```

## Existing executable proof observed

```txt
source/static smoke scripts: declared
terrain streaming tests: declared
world route protection tests: declared
terrain overlay tests: declared
headless project and renderer commands: declared
Vite production build: declared
Pages deployment: declared
```

These surfaces were read, not executed in this documentation pass. None of the declared Node/headless checks proves concurrent browser WebGL/Canvas2D frame coherence.

## Missing proof

```txt
immutable frame-envelope capture
flight/mail revision correlation
map transition command and generation
world/map projection result correlation
first map frame nonblank/current
rapid open-close stale callback rejection
map resize revision handling
partial world/map commit recovery
visible pixel or bounded render readback
GameHost/telemetry dual-surface receipt
source/dist/Pages parity
```

## Commands not run

```txt
npm install
npm run check
npm run headless:check
npm run build
browser map-open fixture
WebGL/Canvas2D frame-correlation fixture
built-dist browser smoke
Pages browser smoke
```

## Change-state validation

```txt
runtime JavaScript changed: no
HTML changed: no
package scripts changed: no
dependencies changed: no
gameplay changed: no
render behavior changed: no
map behavior changed: no
deployment workflow changed: no
branch created: no
pull request created: no
.agent documentation changed: yes
central ledger synchronized: pending at repo-local validation write
central internal change log added: pending at repo-local validation write
```

## Completion boundary

No map/world atomicity, first-map-frame correctness, stale-callback fencing, partial-frame recovery, visible parity or production-readiness claim is made.