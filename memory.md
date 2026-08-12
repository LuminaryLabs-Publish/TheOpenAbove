# Repository Memory

## Purpose

The Open Above is a standalone balloon exploration game and a clean consumer
proof for NexusEngine `0.0.4`.

## Architecture Decisions

- Pin NexusEngine to an exact immutable commit; never use `.nexus-engine`, a
  local symlink, a Vite Engine alias, or a moving branch.
- Import Engine behavior only from the root runtime contract and generated
  semantic Domain subpaths.
- Keep Three.js, DOM presentation, authored content, and product rules in this
  repository. NexusEngine runtime Domains remain platform neutral.
- Use `src/main.js` for Web targets and the deterministic
  `src/native/balloon-flight-kernel.js` for Android XR and PCVR package proof.
- Keep all generated stages, toolchains, artifacts, and receipts outside the
  source project through `n:build`.
- Expose release evidence on demand through `GameHost.getBuildDiagnostics()`
  and `F9`; do not add a persistent debug HUD.
- Deploy Pages only through an explicitly dispatched workflow.
- Keep only active policy, handoff, registry, and latest per-category proof in
  `.agent`; preserve chronological agent evidence outside the public tree.
- Run the read-only repository sanitization check before publishing changes.

## Proof Boundary

Web targets must run the complete game with a clean browser console. Native
targets must produce structurally valid packages from the shared portable
kernel and OpenXR host. Hardware execution and a full native presentation
adapter are separate from the `0.0.4` package claim.
