# Render Audit: Runtime, HUD and Documentation Product Identity Gap

**Timestamp:** `2026-07-11T13-10-35-04-00`

## Render-facing problem

The visible canvas and HUD present Air Mail, but public documentation and agent guidance present Meadow Lift bird flight. No frame-level product revision proves which source the rendered experience represents.

## Current projections

```txt
canvas object: hot-air-balloon
HUD title: The Open Above: Air Mail
HUD objective: deliver mail to Brookhaven
telemetry status: mail-flight
telemetry region: meadow-lift
README/AGENTS product: bird free-flight Meadow Lift
```

## Gap

```txt
shared product revision: absent
shared control revision: absent
shared objective revision: absent
HUD projection result: absent
documentation projection result: absent
visible-frame product acknowledgement: absent
deployed-frame acceptance evidence: absent
```

A frame can truthfully show Air Mail while the repository still instructs reviewers to validate bird controls, thermals, gates and perch completion.

## Required render contract

```txt
accepted ProductManifest
  -> product/controls/objectives fingerprint
  -> HUD projection preparation
  -> visible help/control projection
  -> render frame with product revision
  -> frame acknowledgement
  -> browser evidence capture
  -> compare against README/AGENTS projection revision
```

## Required proof

```txt
HUD title and mission copy derive from admitted source
telemetry region and mode identity do not conflict
canvas acknowledgement includes product and acceptance fingerprints
browser smoke captures the declared mode and controls
Pages smoke reports the same revision as the built documentation
```
