# The Open Above

The Open Above is a free-flight exploration game about carving, gliding, diving, boosting, and discovering a vast living sky-world.

This repository is the standalone publishing/game repo for The Open Above.

## Current milestone

The first milestone is **Meadow Lift**:

```txt
Start above an ancient canopy.
Catch three thermals.
Fly through five wind gates.
Return to the sky perch.
Unlock Cloud Basin.
```

## Run locally

```bash
npm install
npm start
```

Then open the local URL printed by Vite.

## Controls

```txt
W / ArrowUp      pitch up
S / ArrowDown    pitch down
A / ArrowLeft    bank left
D / ArrowRight   bank right
Space            boost
R                restart mission
```

## Architecture

The game starts as a standalone flight slice with a clean route toward a fuller mission-based game.

Long-term shape:

```txt
Host loop
Flight model
World generation
Mission objectives
Progression / save state
Renderer / camera / effects
```

The first push keeps the game self-contained and playable while docs define how the experiment becomes a full product.
