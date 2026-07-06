import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { setTimeout as wait } from "node:timers/promises";
import { chromium } from "playwright";

const port = 4173;
const url = `http://127.0.0.1:${port}/TheOpenAbove/`;

function startPreview() {
  const child = spawn("npx", ["vite", "preview", "--host", "127.0.0.1", "--port", String(port)], {
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, CI: "1" }
  });

  child.stdout.on("data", (chunk) => process.stdout.write(chunk));
  child.stderr.on("data", (chunk) => process.stderr.write(chunk));
  return child;
}

async function waitForServer() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // keep waiting
    }
    await wait(250);
  }
  throw new Error(`Timed out waiting for preview server: ${url}`);
}

const server = startPreview();
let browser;
try {
  await waitForServer();
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => Boolean(window.GameHost?.engine?.openAbove?.getState), null, { timeout: 30000 });
  await page.waitForTimeout(1500);

  const state = await page.evaluate(() => {
    const gameHost = window.GameHost;
    return {
      hasNexusEngine: Boolean(gameHost?.NexusEngine?.createRealtimeGame),
      installOrder: gameHost?.engine?.game?.installOrder ?? [],
      nexusState: gameHost?.engine?.openAbove?.getState?.(),
      localState: gameHost?.getState?.()?.local,
      hudText: document.querySelector("#hud")?.textContent ?? "",
      canvasWidth: document.querySelector("#game")?.width ?? 0,
      canvasHeight: document.querySelector("#game")?.height ?? 0
    };
  });

  assert.equal(state.hasNexusEngine, true, "NexusEngine API should be present");
  assert.ok(state.installOrder.includes("open-above-flight-telemetry-kit"), "runtime kit should install");
  assert.equal(state.nexusState?.region, "meadow-lift", "Nexus Engine state should publish mission region");
  assert.equal(state.localState?.region, "meadow-lift", "local state should publish mission region");
  assert.match(state.hudText, /Nexus Engine Realtime Core/);
  assert.ok(state.canvasWidth > 0 && state.canvasHeight > 0, "canvas should be sized");
  assert.deepEqual(errors, [], `browser errors: ${errors.join("\n")}`);

  console.log("The Open Above browser smoke passed.");
} finally {
  if (browser) await browser.close();
  server.kill("SIGTERM");
}
