# Architecture Audit: Product Acceptance Contract DSK Map

**Timestamp:** `2026-07-11T13-10-35-04-00`

## Problem

Product identity, controls, objectives, HUD copy, README guidance, AGENTS manual smoke and test acceptance are independently authored. They can drift without any startup rejection or build failure.

## Current ownership split

```txt
campaign.config.js
  -> legacy Meadow Lift and Cloud Basin identity

README.md / AGENTS.md
  -> bird controls, thermals, gates, perch and R restart

balloon-simulation-kit
  -> burner and vent bindings

mail-delivery-domain
  -> Brookhaven route and delivery objective

main.js
  -> Air Mail HUD and GameHost projection

tests/smoke.mjs
  -> file/source-pattern assertions
```

## Required parent domain

```txt
open-above-product-acceptance-authority-domain
```

## Coordinating kits

```txt
open-above-acceptance-contract-schema-kit
open-above-product-mode-admission-kit
open-above-control-contract-kit
open-above-objective-contract-kit
open-above-manual-smoke-contract-kit
open-above-documentation-projection-kit
open-above-agent-guidance-projection-kit
open-above-hud-contract-projection-kit
open-above-runtime-binding-observation-kit
open-above-acceptance-parity-result-kit
open-above-acceptance-fingerprint-kit
open-above-acceptance-evidence-kit
open-above-acceptance-journal-kit
open-above-product-acceptance-fixture-kit
open-above-browser-acceptance-smoke-kit
open-above-pages-acceptance-smoke-kit
```

## Transaction

```txt
admit ProductManifest
  -> validate selected mode and supersession
  -> derive ControlContract
  -> derive ObjectiveContract
  -> derive ManualSmokeContract
  -> prepare README, AGENTS and HUD projections
  -> observe installed runtime bindings and rules
  -> compare expected and observed contracts
  -> commit all projections or reject all
  -> execute acceptance fixtures
  -> publish product/acceptance fingerprint and evidence
```

## Ownership rule

Reusable contract schema, fingerprinting and parity-result mechanics belong in NexusEngine. `TheOpenAbove` owns Air Mail mode identity, bindings, objectives, public copy, manual smoke policy and product-specific browser acceptance adapters.

## Required invariants

```txt
one session admits one product mode
all advertised controls have installed consumers
all installed public controls are declared
all public objectives resolve to executable rules
restart is advertised only when ResetMission is installed
README, AGENTS, HUD, telemetry and headless tools share one revision
browser and Pages evidence share the accepted fingerprint
partial projection commits are forbidden
```
