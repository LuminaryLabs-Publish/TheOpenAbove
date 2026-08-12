# Sanitization Evidence

`report.json` is the redacted tree/history scan result. `validation.json`
records dependency, product, build, scope, and preservation proof.

The pre-cleanup `.agent` tree contained 896 files. Every file was preserved in
a private archive and verified against its SHA-256 checksum before repetitive
public copies were removed. The current tree retains root policy/index files,
the latest tracker and turn handoff, all live registry references, and the
latest summary in each audit category.

No existing Git history was rewritten. Historical evidence remains available
through Git, while the current checkout is intentionally concise.
