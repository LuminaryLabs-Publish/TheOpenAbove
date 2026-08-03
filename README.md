# The Open Above

The Open Above is a standalone hot-air-balloon exploration game and the release
showcase consumer for NexusEngine `0.0.4`.

The game owns its authored world, Three.js presentation, browser adapters, and
campaign rules. It consumes NexusEngine through an exact Git commit and uses
public semantic Domain subpaths; it does not contain or alias an Engine source
checkout.

## Run

```bash
npm ci --ignore-scripts --no-audit --no-fund
npm run check
npm run dev
```

Vite prints the local game URL. Press `F9` to open the on-demand release
diagnostics view.

## Controls

```txt
W / ArrowUp / Space       burner
S / ArrowDown / Shift    vent
A / ArrowLeft            steer left within the wind
D / ArrowRight           steer right within the wind
M                         sightseeing map
Escape                    close map
```

## NexusEngine Proof

```bash
npm run showcase:inspect
npm run showcase:plan
npm run showcase:prove
```

`showcase:prove` inspects the read-only project, plans all four targets through
MCP, applies Web targets after exact-hash authorization, proves repeated apply
is a no-op, restores the persistent receipt in a fresh Build instance, and
proves the runtime kernel continues after the MCP controller is discarded.

Android XR and PCVR use `src/native/balloon-flight-kernel.js` as their shared
portable entry. Their hosted jobs prove packages; hardware execution remains a
separate post-release activity.

Pages deployment is manual through `workflow_dispatch`. No push deploys the
game automatically.
