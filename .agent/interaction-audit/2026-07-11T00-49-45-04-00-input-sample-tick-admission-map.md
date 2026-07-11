# Interaction Audit: Input Sample to Simulation Tick Admission

**Timestamp:** `2026-07-11T00-49-45-04-00`

## Current input path

```txt
keydown -> add code to Set
keyup -> delete code from Set
blur -> clear Set
RAF update -> poll Set -> derive burner/vent -> mutate state
```

## Gap

The runtime cannot identify which browser event changed burner state, when it was observed, which simulation tick consumed it, whether it was accepted, or how replay should reproduce it.

## Required input row

```txt
sessionId
generation
sequence
observedAtMs
source
code
pressed
targetTickId
status
reason
```

## Admission policy

```txt
browser events append sequenced samples
the clock owner drains samples at a declared tick boundary
each sequence is consumed at most once
blur emits explicit releases or clear-all result
restart fences stale samples by generation
```

Wheel zoom may remain presentation-only but should carry session/generation and render-frame correlation for diagnostics.
