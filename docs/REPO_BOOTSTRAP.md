# Repository Bootstrap

`LuminaryLabs-Publish/TheOpenAbove` is the product and publishing owner for The
Open Above. It is also a clean NexusEngine consumer.

```txt
package.json
  exact NexusEngine commit
  exact Three.js version
  target-specific nexusengineBuild entries

src/
  authored game, world, presentation, adapters, and portable flight kernel

~/.nexusengine/
  downloaded sources, toolchains, isolated stages, artifacts, and receipts
```

The repository does not embed Engine source, generated native projects,
toolchains, caches, or Build receipts. Pages deployment is manual only.
