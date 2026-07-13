# Render Audit: Provider Failure Visible-Surface Gap

**Timestamp:** `2026-07-13T05-19-21-04-00`

## Summary

The page contains a provider-independent HTML error panel, but the only function that reveals it is defined inside the module whose static provider imports can fail. A provider failure can therefore leave the black canvas and hidden error panel unchanged, with no visible terminal state or provider-generation provenance.

## Current visible path

```txt
HTML parses
  -> canvas is visible
  -> #error exists but is hidden
  -> browser loads src/main.js
  -> static providers resolve
  -> main.js evaluates
  -> showFatal() and boot() become available
  -> successful boot starts rendering
```

## Failure path

```txt
Three.js or NexusEngine fetch/MIME/syntax/export failure
  -> module graph rejects before evaluation
  -> showFatal() is never defined
  -> boot() is never called
  -> #error remains hidden
  -> no visible provider failure frame exists
```

## Missing render evidence

```txt
provider-set generation
provider IDs and exact revisions
admission result ID
failure classification
fallback identity, if any
render-surface adoption receipt
first provider-backed visible-frame acknowledgement
first provider-failure visible-frame acknowledgement
```

## Required projection contract

```txt
provider-independent bootstrap shell
  -> receives RuntimeProviderAdmissionResult
  -> renders loading, accepted, rejected or fallback-selected state
  -> never imports Three.js or NexusEngine to display failure
  -> exposes provider generation and bounded diagnostics
  -> acknowledges the first visible terminal frame
```

## Validation boundary

No browser failure injection, offline test, MIME test, API-drift test, screenshot comparison or Pages smoke was run.