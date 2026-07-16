# Render Audit: Warning-Admitted Build and Visible Frame Gap

**Timestamp:** `2026-07-16T13-39-49-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

## Summary

The visual runtime is protected by assertions covering cloud shader contracts, world composition, weather layers, terrain overlays and streaming. The new runner can downgrade any broadly matched assertion failure to a warning, allowing the build to continue without proving that the affected rendered contract is intentionally waived.

## Intent

Bind every rendered release to an accepted validation result whose warning rows are explicit, scoped and non-expired.

## Current visible-frame path

```txt
source contracts and integration suites
  -> tiered runner
  -> broad assertion signature
  -> WARNING
  -> check exits zero when no other errors exist
  -> Vite build remains eligible
  -> artifact can contain the affected visual implementation
  -> browser renders without a validation-generation acknowledgement
```

## Render-relevant assertion families

```txt
five weather-layer count, kinds, floors and altitude composition
cloud shader source contract
world feature and provider composition
route-protected terrain behavior
terrain streaming and overlays
required renderer and presentation modules
map and visual-domain source contracts
```

## Gap

```txt
render contract finding ID: absent
visual invariant severity: implicit
expected render drift record: absent
waiver owner/expiry: absent
artifact validation generation: absent
render startup required validation revision: absent
FirstValidatedReleaseFrameAck: absent
```

A warning can be legitimate when a source-shape assertion is stale after an intentional implementation improvement. It is not legitimate to infer that from `AssertionError` alone.

## Required projection contract

```txt
accepted ReleaseValidationResult
  -> artifact embeds validation result ID and source revision
  -> browser startup reads accepted identity
  -> renderer reports the same identity with provider/build revisions
  -> first stable visual frame acknowledges that identity
  -> stale, missing or rejected validation blocks readiness
```

## Checklist

- [x] Identify visual suites affected by the broad warning rule.
- [x] Separate assertion drift from visual invariant failure.
- [x] Define artifact and first-frame binding.
- [ ] Add intentionally failing weather, cloud, terrain and route rows.
- [ ] Prove blocking behavior for unclassified failures.
- [ ] Prove approved drift remains visible and bounded.

## Claim boundary

No incorrect cloud, terrain or atmosphere frame was reproduced. The gap is validation-to-render traceability and release admission.