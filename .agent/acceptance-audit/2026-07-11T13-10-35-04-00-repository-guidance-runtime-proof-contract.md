# Acceptance Audit: Repository Guidance and Runtime Proof Contract

**Timestamp:** `2026-07-11T13-10-35-04-00`

## Acceptance surfaces

```txt
ProductManifest
ControlContract
ObjectiveContract
README
AGENTS
HUD/help copy
telemetry and GameHost
headless project observation
npm source smoke
browser acceptance smoke
Pages acceptance smoke
```

## Current failure mode

These surfaces are independently authored. The source smoke can remain green while README and AGENTS describe a different product, controls and objectives than the runtime.

## Required contract

```txt
AcceptanceContract {
  schemaVersion
  productId
  productVersion
  modeId
  missionId
  controlRevision
  objectiveRevision
  documentationRevision
  requiredPureCases
  requiredBrowserCases
  requiredDeployCases
  fingerprint
}
```

## Commit policy

```txt
prepare all projections
  -> observe runtime bindings/rules
  -> compare expected and observed state
  -> commit README, AGENTS and HUD projections together
  -> execute pure and browser cases
  -> publish evidence only after the matching frame/build is observed
```

## Evidence policy

Every evidence row must be detached, JSON-safe, bounded and include:

```txt
product fingerprint
acceptance fingerprint
source revision
build revision
runtime session ID
mission epoch when available
case ID
expected result
observed result
status and reason code
```

## Completion rule

A source-pattern smoke is not product acceptance. Completion requires runtime binding proof, objective completion proof, documentation parity and deployed Pages evidence for the same product and acceptance fingerprints.
