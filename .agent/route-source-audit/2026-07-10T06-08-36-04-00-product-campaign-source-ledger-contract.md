# Route Source Audit: Product Campaign Source Ledger Contract

**Timestamp:** `2026-07-10T06-08-36-04-00`

## Current source split

The live route is Balloon Drift.

The repo still has source split across current and legacy layers:

```txt
index.html:
  current route title and canvas shell for Balloon Drift.

package.json:
  current description and scripts for hot-air-balloon wind drift plus headless editor commands.

README.md:
  older free-flight exploration, thermal/gate/perch, pitch/bank/boost controls, and long-term flight model language.

src/data/campaign.config.js:
  current CAMPAIGN/WORLD fields mixed with legacy FLIGHT fields.

src/main.js:
  actual current route composer and GameHost surface.

tests/smoke.mjs:
  current renderer/build contract assertions, not source authority assertions.

tools/headless-editor-environment.mjs:
  current headless editor static validation harness, not source fixture harness yet.
```

## Required source classes

```txt
current_authoritative:
  package description
  index title/meta
  src/main.js Balloon Drift composition
  balloon simulation start position and snapshot shape
  visual-domain route consumer
  GameHost legacy local/nexus shape
  smoke/headless renderer contract shape

legacy_compatible:
  README free-flight copy
  README thermals/gates/perch objectives
  README pitch/bank/boost controls
  CAMPAIGN objective labels not consumed by current route
  FLIGHT constants not consumed by current Balloon Drift runtime

deferred:
  source manifest module
  source fingerprint module
  source snapshot module
  source acceptance ledger module
  GameHost .source block
  source fixture script
  headless project.check source rows
```

## Source ledger gap

No module currently emits a stable ledger of:

```txt
source_id
source_file
source_status
consumer_file
consumer_status
fingerprint
acceptance_reason
fixture_assertion
```

## Next contract

Add source modules and readback rows without changing visible gameplay.

Expected future GameHost shape:

```txt
window.GameHost.getState()
  -> local
  -> nexusEngine
  -> source
       -> manifest
       -> fingerprint
       -> snapshot
       -> acceptanceRows
       -> consumerRows
       -> fixtureVersion
```

## Next safe ledge

```txt
TheOpenAbove Source Fixture Ledger Refresh + GameHost Headless Gate
```
