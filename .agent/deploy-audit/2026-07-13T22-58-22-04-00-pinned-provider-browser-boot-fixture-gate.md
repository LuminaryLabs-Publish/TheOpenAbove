# Deploy Audit: Pinned Provider Browser Boot Fixture Gate

**Timestamp:** `2026-07-13T22-58-22-04-00`

## Summary

The new Node smoke uses a fake provider. Release confidence requires the same composition to succeed with the pinned Nexus Engine in source, production build and deployed Pages execution.

## Plan ledger

**Goal:** prevent a structurally correct fake-provider test from masking provider-export, dependency, duplicate-installation or browser-startup failures.

- [x] Inspect package check/build wiring.
- [x] Inspect the fake-provider test boundary.
- [x] Identify source/build/Pages fixtures.
- [x] Define release-blocking assertions.
- [ ] Execute fixtures.

## Required fixture matrix

```txt
real provider Node import
  assert required factory exports
  compose real engine
  assert worldFeatures and worldFoundation APIs

child policy
  assert childDomains:false
  assert no duplicate token providers
  assert one registry owner

feature registration
  empty set
  one mountain
  multiple valid landforms
  duplicate identical feature
  conflicting duplicate feature
  invalid later feature with zero partial adoption

browser source boot
  wait for GameHost
  assert fatal panel hidden
  assert composition/registry revisions
  assert first registered-world frame

production build boot
  run Vite build
  serve dist
  repeat browser assertions

Pages boot
  load deployed origin
  verify provider revision
  repeat readiness and frame assertions
```

## Release gate

A release must fail when the provider export manifest changes, a domain token has multiple owners, any required API is absent, feature registration is partial, the fatal panel appears, GameHost publishes before readiness, or the first frame does not match the accepted composition.

## Current validation

```txt
new fake-provider smoke present: yes
package check includes smoke: yes
combined status checks on reviewed commit: none
npm run check during audit: not run
npm run build during audit: not run
real provider fixture: absent
browser fixture: absent
Pages fixture: absent
```

No deployment behavior changed.