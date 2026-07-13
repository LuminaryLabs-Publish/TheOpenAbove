# Validation: TheOpenAbove

**Last aligned:** `2026-07-13T13-39-10-04-00`

## Scope

Documentation-only audit of staged procedural world generation at runtime revision `a47cb530963e01a07fcc839ca1dcce2f70bd169f`.

## Plan ledger

**Goal:** distinguish source-backed generation behavior from executable proof of continuous scheduling, atomic consumer adoption, rollback and visible parity.

- [x] Compare all ten accessible Publish repositories against central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove` because its staged-generation runtime is newer than central documentation.
- [x] Inspect the generation core, phase processors, visual scheduling and all major consumers.
- [x] Inspect tests, package scripts, headless validation and Pages workflow.
- [x] Confirm phased generation and public API compatibility by source.
- [x] Confirm map-open generation starvation by source ordering.
- [x] Confirm missing consumer-adoption and rollback results.
- [x] Preserve the full kit and service inventory.
- [x] Change no runtime source, dependency, package script or workflow.
- [x] Create no branch or pull request.
- [ ] Execute generation, browser, build and Pages fixtures.

## Source-backed checks

```txt
height/erosion/flow/climate/biome phases: present
incremental merge-sort flow ordering: present
fixed unit work budget: present
first-frame fallback sampling: present
public sampling signatures preserved: yes
active world retained during reset: present
active array swap through one assignment: present
progress, phase, history, timing and failure diagnostics: present
reset and disposal APIs: present
terrain revision refresh: present
vegetation/grass/flower ready refresh: present
map revision-aware cache refresh: present
generation work while map open: absent
elapsed-time work receipt: absent
consumer registry and prepare results: absent
budgeted consumer adoption: absent
rollback after consumer failure: absent
first visible adopted-world acknowledgement: absent
```

## Source inspected

```txt
src/world/world-generation-kit.js
src/world/world-generation-phases.js
src/world/world-generation-support.js
src/visual/visual-domain.js
src/visual/landscape/terrain-surface-kit.js
src/visual/landscape/terrain-chunk-streaming-kit.js
src/visual/landscape/terrain-horizon-streaming-kit.js
src/visual/landscape/vegetation-cluster-kit.js
src/visual/grass-field/grass-field-domain.js
src/visual/flower-field/flower-field-domain.js
src/ui/parchment-map-overlay.js
src/main.js
tests/world-generation.mjs
package.json
tools/headless-editor-environment.mjs
.github/workflows/deploy-pages.yml
root .agent documentation
central repository ledger
```

## Existing executable proof observed

```txt
tests/world-generation.mjs:
  deterministic same-seed sampling
  staged output equals synchronous output
  fallback before ready
  monotonic progress and phase history
  fixed-budget multi-update convergence
  active-world retention during reset
  disposal rejection

headless:world:
  declared in package scripts
  invoked by Pages workflow
  performs source-marker inspection
  then invokes npm run check
```

The staged test file is not part of `npm run check`, so the advertised headless world-generation command and production build do not execute its assertions.

## Missing executable proof

```txt
node tests/world-generation.mjs in the standard gate
map-open generation progress
frame-time budget under browser load
completion-frame adoption cost
consumer dependency order
consumer failure rollback
reset and disposal during browser scheduling
sampling/terrain/vegetation/flora/map revision parity
first visible adopted-world acknowledgement
source/dist/Pages parity
```

## Commands not run

```txt
npm install
npm run check
node tests/world-generation.mjs
npm run headless:world
npm run headless:check
npm run build
browser map-open generation fixture
consumer-failure injection fixture
built-dist browser smoke
GitHub Pages smoke
```

## Change-state validation

```txt
runtime JavaScript changed: no
HTML or CSS changed: no
package scripts changed: no
dependencies changed: no
gameplay changed: no
render behavior changed: no
map behavior changed: no
deployment workflow changed: no
branch created: no
pull request created: no
.agent documentation changed: yes
central ledger synchronization: pending at repo-local validation write
central internal change log: pending at repo-local validation write
```

## Completion boundary

No deterministic browser cadence, map-open continuity, bounded adoption cost, consumer rollback, first-visible-world parity or production-readiness claim is made.