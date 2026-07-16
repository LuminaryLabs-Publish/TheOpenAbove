const TAU = Math.PI * 2;
const clamp = (value, min, max) => Math.max(min, Math.min(max, Number(value) || 0));
const toHex = (value, fallback = "#6b5132") => Number.isFinite(Number(value))
  ? `#${Math.max(0, Math.min(0xffffff, Number(value))).toString(16).padStart(6, "0")}`
  : fallback;

function createWorldMapCanvas(world, center, radius) {
  if (!world?.sampleMapColor || typeof document === "undefined") return null;
  const size = 96;
  const mapCanvas = document.createElement("canvas");
  mapCanvas.width = size;
  mapCanvas.height = size;
  const mapContext = mapCanvas.getContext("2d");
  const image = mapContext.createImageData(size, size);
  for (let py = 0; py < size; py += 1) {
    for (let px = 0; px < size; px += 1) {
      const nx = ((px + 0.5) / size) * 2 - 1;
      const nz = ((py + 0.5) / size) * 2 - 1;
      const offset = (py * size + px) * 4;
      if (Math.hypot(nx, nz) > 1) { image.data[offset + 3] = 0; continue; }
      const color = world.sampleMapColor(center.x + nx * radius, center.z + nz * radius);
      image.data[offset] = color[0]; image.data[offset + 1] = color[1]; image.data[offset + 2] = color[2]; image.data[offset + 3] = 220;
    }
  }
  mapContext.putImageData(image, 0, 0);
  return mapCanvas;
}

export function createParchmentMapOverlay({
  root, canvas, worldSurface, world = null, routes = [],
  getPlayerState = () => null, getSnapPoints = () => [], getCaptureState = () => null
} = {}) {
  if (!(root instanceof HTMLElement) || !(canvas instanceof HTMLCanvasElement)) throw new TypeError("Parchment map elements are required.");
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Parchment map canvas is unavailable.");
  let open = false, width = 1, height = 1, frame = 0;
  const center = worldSurface?.center ?? { x: 0, z: 0 };
  const radius = Math.max(1, Number(worldSurface?.radius) || 10000);
  let worldMapCanvas = null;
  let worldMapRevision = -1;

  function refreshWorldMap(force = false) {
    const revision = world?.getGenerationState?.().revision ?? 0;
    if (!force && worldMapCanvas && revision === worldMapRevision) return false;
    worldMapCanvas = createWorldMapCanvas(world, center, radius);
    worldMapRevision = revision;
    return true;
  }
  refreshWorldMap(true);

  function worldToMap(point = {}) {
    const scale = Math.min(width, height) * 0.72 / (radius * 2);
    return { x: width * 0.5 + ((Number(point.x) || 0) - (Number(center.x) || 0)) * scale,
      y: height * 0.5 + ((Number(point.z) || 0) - (Number(center.z) || 0)) * scale };
  }

  function resize() {
    const bounds = canvas.getBoundingClientRect();
    const ratio = Math.min(devicePixelRatio || 1, 2);
    width = Math.max(1, Math.floor(bounds.width));
    height = Math.max(1, Math.floor(bounds.height));
    canvas.width = Math.max(1, Math.floor(width * ratio));
    canvas.height = Math.max(1, Math.floor(height * ratio));
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function drawWorldBackground(mapRadius) {
    if (!worldMapCanvas) return;
    context.save(); context.beginPath(); context.arc(width * 0.5, height * 0.5, mapRadius, 0, TAU); context.clip();
    context.globalAlpha = 0.72; context.imageSmoothingEnabled = true;
    context.drawImage(worldMapCanvas, width * 0.5 - mapRadius, height * 0.5 - mapRadius, mapRadius * 2, mapRadius * 2);
    context.restore();
  }

  function drawRoute(route) {
    if ((route?.points?.length ?? 0) < 2) return;
    context.beginPath();
    route.points.forEach((point, index) => { const mapped = worldToMap(point); if (index === 0) context.moveTo(mapped.x, mapped.y); else context.lineTo(mapped.x, mapped.y); });
    context.save(); context.setLineDash([11, 8]); context.lineCap = "round"; context.lineJoin = "round";
    context.lineWidth = Math.max(3, Math.min(width, height) * 0.009); context.globalAlpha = 0.42;
    context.strokeStyle = toHex(route.color, "#70866a"); context.stroke(); context.restore();
  }

  function drawSnapPoint(point, completed) {
    const mapped = worldToMap(point.position);
    const scale = Math.min(width, height) * 0.72 / (radius * 2);
    const regionRadius = Math.max(14, point.searchRadius * scale);
    context.save(); context.translate(mapped.x, mapped.y);
    context.beginPath(); context.arc(0, 0, regionRadius, 0, TAU);
    context.fillStyle = completed ? "rgba(67,112,75,.18)" : "rgba(145,101,42,.13)"; context.fill();
    context.setLineDash([6, 6]); context.strokeStyle = completed ? "#476f4d" : "#8a612f"; context.lineWidth = 2; context.stroke();
    context.setLineDash([]); context.beginPath(); context.arc(0, 0, completed ? 7 : 5, 0, TAU);
    context.fillStyle = completed ? "#476f4d" : "#8a612f"; context.fill(); context.strokeStyle = "#f1dfb5"; context.stroke();
    context.textAlign = "center"; context.textBaseline = "top"; context.fillStyle = "#4b351e";
    context.font = `700 ${clamp(Math.min(width, height) * 0.022, 11, 18)}px Georgia, serif`;
    context.fillText(point.name, 0, regionRadius + 7); context.restore();
  }

  function drawReferenceCard(point, captureState) {
    if (!point) return;
    const cardWidth = clamp(width * 0.27, 190, 330);
    const cardHeight = clamp(height * 0.28, 150, 235);
    const x = width - cardWidth - 24, y = height - cardHeight - 24;
    const completed = captureState?.completed?.includes(point.id);
    context.save(); context.fillStyle = "rgba(245,226,184,.94)"; context.strokeStyle = "#62472b"; context.lineWidth = 2;
    context.fillRect(x, y, cardWidth, cardHeight); context.strokeRect(x, y, cardWidth, cardHeight);
    const imageX = x + 14, imageY = y + 14, imageW = cardWidth - 28, imageH = cardHeight * 0.48;
    const gradient = context.createLinearGradient(imageX, imageY, imageX, imageY + imageH);
    gradient.addColorStop(0, "#8ec8dc"); gradient.addColorStop(1, "#cfe7c4"); context.fillStyle = gradient; context.fillRect(imageX, imageY, imageW, imageH);
    context.fillStyle = "#657c58"; context.beginPath(); context.moveTo(imageX, imageY + imageH);
    context.lineTo(imageX + imageW * 0.18, imageY + imageH * 0.55); context.lineTo(imageX + imageW * 0.42, imageY + imageH * 0.72);
    context.lineTo(imageX + imageW * 0.68, imageY + imageH * 0.38); context.lineTo(imageX + imageW, imageY + imageH * 0.62); context.lineTo(imageX + imageW, imageY + imageH); context.closePath(); context.fill();
    context.fillStyle = "#3f2d1c"; context.textAlign = "left"; context.font = `700 ${clamp(cardWidth * 0.07, 14, 21)}px Georgia, serif`; context.fillText(point.name, x + 14, imageY + imageH + 24);
    context.font = `500 ${clamp(cardWidth * 0.045, 11, 15)}px Georgia, serif`; context.fillText(point.reference?.clue ?? "Find this landform.", x + 14, imageY + imageH + 49, cardWidth - 28);
    context.fillStyle = completed ? "#476f4d" : "#7c4d24"; context.font = `700 ${clamp(cardWidth * 0.045, 11, 15)}px Georgia, serif`;
    context.fillText(completed ? "PHOTOGRAPHED" : "REFERENCE VIEW", x + 14, y + cardHeight - 18); context.restore();
  }

  function drawPlayer() {
    const player = getPlayerState(); if (!player?.position) return;
    const mapped = worldToMap(player.position); context.save(); context.translate(mapped.x, mapped.y); context.rotate(-(Number(player.heading) || 0));
    context.beginPath(); context.moveTo(0, -11); context.lineTo(7.5, 8); context.lineTo(0, 4.5); context.lineTo(-7.5, 8); context.closePath();
    context.fillStyle = "#293e52"; context.fill(); context.strokeStyle = "#f5e5ba"; context.lineWidth = 2; context.stroke(); context.restore();
  }

  function draw() {
    refreshWorldMap();
    context.clearRect(0, 0, width, height); context.fillStyle = "rgba(87,59,29,.07)";
    for (let index = 0; index < 90; index += 1) { context.beginPath(); context.arc((index * 73.31) % width, (index * 41.77) % height, 0.8 + index % 3, 0, TAU); context.fill(); }
    const mapRadius = Math.min(width, height) * 0.36;
    drawWorldBackground(mapRadius);
    context.beginPath(); context.arc(width * 0.5, height * 0.5, mapRadius, 0, TAU); context.fillStyle = "rgba(92,139,89,.08)"; context.fill();
    context.save(); context.setLineDash([8, 7]); context.strokeStyle = "rgba(70,49,27,.62)"; context.lineWidth = 2; context.stroke(); context.restore();
    routes.forEach(drawRoute);
    const captureState = getCaptureState?.() ?? null;
    const points = getSnapPoints?.() ?? [];
    points.forEach((point) => drawSnapPoint(point, captureState?.completed?.includes(point.id)));
    drawPlayer(); drawReferenceCard(points.find((point) => !captureState?.completed?.includes(point.id)) ?? points[0], captureState);
    context.fillStyle = "#4a321c"; context.textAlign = "center";
    context.font = `700 ${clamp(Math.min(width, height) * 0.052, 22, 42)}px Georgia, serif`;
    context.fillText("The Open Above", width * 0.5, clamp(height * 0.09, 42, 70));
    context.font = `600 ${clamp(Math.min(width, height) * 0.024, 12, 19)}px Georgia, serif`;
    context.fillText("SIGHTSEEING JOURNAL", width * 0.5, clamp(height * 0.135, 65, 102));
  }

  function animate() { if (!open) return; draw(); frame = requestAnimationFrame(animate); }
  function setOpen(nextOpen) {
    open = Boolean(nextOpen); root.classList.toggle("is-open", open); root.setAttribute("aria-hidden", String(!open)); cancelAnimationFrame(frame);
    if (open) { resize(); refreshWorldMap(); frame = requestAnimationFrame(animate); }
    return open;
  }
  function onKeyDown(event) {
    if (event.repeat) return;
    if (event.code === "KeyM") { event.preventDefault(); setOpen(!open); }
    else if (event.code === "Escape" && open) { event.preventDefault(); setOpen(false); }
  }
  const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(canvas); addEventListener("keydown", onKeyDown); resize();

  return Object.freeze({
    isOpen: () => open, setOpen, refreshWorldMap,
    snapshot: () => Object.freeze({ open, mappedWorld: Boolean(worldMapCanvas), worldRevision: worldMapRevision }),
    dispose() { cancelAnimationFrame(frame); resizeObserver.disconnect(); removeEventListener("keydown", onKeyDown); }
  });
}
