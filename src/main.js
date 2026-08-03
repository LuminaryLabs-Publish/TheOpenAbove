import { createMeadowLiftScene } from "./scenes/meadow-lift-scene.js";
import { NEXUS_ENGINE_COMMIT } from "./release-identity.js";
import { installBuildDiagnostics } from "./release/build-diagnostics.js";

const canvas = document.querySelector("#game");
const mapRoot = document.querySelector("#mapOverlay");
const mapCanvas = document.querySelector("#mapCanvas");
const errorPanel = document.querySelector("#error");
const startupElements = Object.freeze({
  loader: document.querySelector("#startupLoader"),
  fill: document.querySelector("#startupProgressFill"),
  label: document.querySelector("#startupLabel"),
  error: document.querySelector("#startupError")
});

function showFatal(error) {
  errorPanel.hidden = false;
  errorPanel.textContent = String(error?.stack || error?.message || error);
}

async function boot() {
  canvas.setAttribute("aria-busy", "true");
  try {
    const scene = await createMeadowLiftScene({
      canvas,
      mapRoot,
      mapCanvas,
      startupElements,
      nexusEngineSha: NEXUS_ENGINE_COMMIT,
      onFatal: showFatal
    });
    window.GameHost = installBuildDiagnostics(scene.gameHost);
    canvas.setAttribute("aria-busy", "false");
    scene.start();
  } catch (error) {
    showFatal(error);
  }
}

boot();
