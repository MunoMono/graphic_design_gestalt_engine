// Change export sizes here.
const EXPORT_PRESETS = {
  wide: { key: "1", width: 3840, height: 2160, label: "16:9" },
  square: { key: "2", width: 2160, height: 2160, label: "1:1" },
  portrait: { key: "3", width: 2160, height: 3840, label: "9:16" },
};

const VIEW_MODES = {
  main: "main",
  batch: "batch",
};

const BATCH_REVIEW = {
  count: 12,
  columns: 3,
  rows: 4,
};

const STUDIES = {
  blank: {
    key: "blank",
    name: "Blank",
    slug: "blank",
  },
  fieldLines: {
    key: "fieldLines",
    name: "Field Lines",
    slug: "field-lines",
  },
  swissGrid: {
    key: "swissGrid",
    name: "Swiss Grid",
    slug: "swiss-grid",
  },
  weingartDisruption: {
    key: "weingartDisruption",
    name: "Weingart Disruption",
    slug: "weingart-disruption",
  },
  halftoneField: {
    key: "halftoneField",
    name: "Halftone Field",
    slug: "halftone-field",
  },
  diagonalPlanes: {
    key: "diagonalPlanes",
    name: "Diagonal Planes",
    slug: "diagonal-planes",
  },
  signalLines: {
    key: "signalLines",
    name: "Signal Lines",
    slug: "signal-lines",
  },
};

const PROOF_MODES = {
  white: {
    key: "white",
    label: "White",
    exportSegment: "-white",
    background: "#f7f5ef",
    lines: ["#17191c", "#444c52", "#6f777c"],
    accent: "#0f1113",
  },
  black: {
    key: "black",
    label: "Black",
    exportSegment: "-black",
    background: "#050607",
    lines: ["#f1ece2", "#bfc8ce", "#7f95a2"],
    accent: "#fff8ec",
  },
};

const GESTALT_ELEMENTS = {
  line: { key: "line", label: "Line", slug: "line" },
  space: { key: "space", label: "Space", slug: "space" },
  shape: { key: "shape", label: "Shape", slug: "shape" },
  form: { key: "form", label: "Form", slug: "form" },
  colour: { key: "colour", label: "Colour", slug: "colour" },
  texture: { key: "texture", label: "Texture", slug: "texture" },
  value: { key: "value", label: "Value", slug: "value" },
  typography: { key: "typography", label: "Typography", slug: "typography" },
};

const GESTALT_PRINCIPLES = {
  unityHarmony: { key: "unityHarmony", label: "Unity/Harmony", slug: "unity-harmony" },
  variety: { key: "variety", label: "Variety", slug: "variety" },
  balance: { key: "balance", label: "Balance", slug: "balance" },
  gradations: { key: "gradations", label: "Gradations", slug: "gradations" },
  emphasis: { key: "emphasis", label: "Emphasis", slug: "emphasis" },
  rhythm: { key: "rhythm", label: "Rhythm", slug: "rhythm" },
  movement: { key: "movement", label: "Movement", slug: "movement" },
  pattern: { key: "pattern", label: "Pattern", slug: "pattern" },
  proportion: { key: "proportion", label: "Proportion", slug: "proportion" },
};

const TYPE_LAYOUTS = {
  left: {
    key: "left",
    label: "Left",
  },
  centre: {
    key: "centre",
    label: "Centre",
  },
};

const COMPOSITION_BIASES = {
  balanced: {
    key: "balanced",
    label: "Balanced",
    exportSegment: "",
  },
  leftQuiet: {
    key: "leftQuiet",
    label: "Left Quiet",
    exportSegment: "-left-quiet",
  },
  centreQuiet: {
    key: "centreQuiet",
    label: "Centre Quiet",
    exportSegment: "-centre-quiet",
  },
  rightQuiet: {
    key: "rightQuiet",
    label: "Right Quiet",
    exportSegment: "-right-quiet",
  },
};

const ARTWORK_VIEWS = {
  artwork: {
    key: "artwork",
    label: "Artwork",
    exportSegment: "",
  },
  blank: {
    key: "blank",
    label: "Blank",
    exportSegment: "-blank-view",
  },
  linesOnly: {
    key: "linesOnly",
    label: "Lines Only",
    exportSegment: "-lines-only",
  },
  atmosphereOnly: {
    key: "atmosphereOnly",
    label: "Atmosphere Only",
    exportSegment: "-atmosphere-only",
  },
  contoursOnly: {
    key: "contoursOnly",
    label: "Contours Only",
    exportSegment: "-contours-only",
  },
};

let sandboxConfig = {
  enabled: false,
  lineMultiplier: 1,
  noiseScaleMultiplier: 1,
  strokeMultiplier: 1,
  contrastBoost: 0,
  circleOpacityMultiplier: 1,
  notes: "",
};

const DEFAULT_SANDBOX_CONFIG = { ...sandboxConfig };

// Safe preset tuning happens here. Change values, not object keys or structure.
// Palette values can shift mood. Density, noise, and contrast values should move gradually.
const ART_DIRECTION_PRESETS = {
  institutionalQuiet: {
    name: "Institutional Quiet",
    slug: "institutional-quiet",
    palette: {
      background: "#111315",
      lines: ["#c9c1b5", "#959089", "#5e676c"],
      accent: "#ece6dc",
    },
    atmosphereCount: 4,
    atmosphereAlpha: 10,
    rowCount: 48,
    stepsPerLine: 180,
    flowNoiseScale: 0.0012,
    amplitudeFactor: 0.024,
    strokeWeightMin: 1.0,
    strokeWeightMax: 1.35,
    strongLineAlpha: 52,
    softLineAlpha: 34,
    contourCount: 8,
    contourNoiseScale: 0.001,
    contourAccentAlpha: 42,
    contourLineAlpha: 22,
    contourWeightStart: 0.8,
    contourWeightEnd: 1.15,
    contourCenterMin: 0.36,
    contourCenterMax: 0.64,
    contourStretchMin: 0.92,
    contourStretchMax: 1.08,
  },
  archiveWarmth: {
    name: "Archive Warmth",
    slug: "archive-warmth",
    palette: {
      background: "#17130f",
      lines: ["#dcc8ae", "#a88767", "#6a5c4d"],
      accent: "#f4e8d0",
    },
    atmosphereCount: 6,
    atmosphereAlpha: 18,
    rowCount: 52,
    stepsPerLine: 180,
    flowNoiseScale: 0.0013,
    amplitudeFactor: 0.03,
    strokeWeightMin: 1.1,
    strokeWeightMax: 1.5,
    strongLineAlpha: 66,
    softLineAlpha: 44,
    contourCount: 9,
    contourNoiseScale: 0.0011,
    contourAccentAlpha: 52,
    contourLineAlpha: 28,
    contourWeightStart: 0.9,
    contourWeightEnd: 1.35,
    contourCenterMin: 0.33,
    contourCenterMax: 0.67,
    contourStretchMin: 0.9,
    contourStretchMax: 1.1,
  },
  eveningSignal: {
    name: "Evening Signal",
    slug: "evening-signal",
    palette: {
      background: "#0a0d14",
      lines: ["#f0e6d6", "#7fa1b8", "#315164"],
      accent: "#fff4e6",
    },
    atmosphereCount: 5,
    atmosphereAlpha: 16,
    rowCount: 62,
    stepsPerLine: 190,
    flowNoiseScale: 0.0016,
    amplitudeFactor: 0.036,
    strokeWeightMin: 1.2,
    strokeWeightMax: 1.75,
    strongLineAlpha: 88,
    softLineAlpha: 58,
    contourCount: 11,
    contourNoiseScale: 0.00125,
    contourAccentAlpha: 70,
    contourLineAlpha: 34,
    contourWeightStart: 1.0,
    contourWeightEnd: 1.6,
    contourCenterMin: 0.3,
    contourCenterMax: 0.7,
    contourStretchMin: 0.88,
    contourStretchMax: 1.12,
  },
  highContrastPrint: {
    name: "High Contrast Print",
    slug: "high-contrast-print",
    palette: {
      background: "#0d0f10",
      lines: ["#f2ede3", "#a9b0ad", "#505756"],
      accent: "#fffaf0",
    },
    atmosphereCount: 3,
    atmosphereAlpha: 9,
    rowCount: 58,
    stepsPerLine: 180,
    flowNoiseScale: 0.00145,
    amplitudeFactor: 0.028,
    strokeWeightMin: 1.2,
    strokeWeightMax: 1.65,
    strongLineAlpha: 92,
    softLineAlpha: 60,
    contourCount: 8,
    contourNoiseScale: 0.00105,
    contourAccentAlpha: 84,
    contourLineAlpha: 30,
    contourWeightStart: 1.0,
    contourWeightEnd: 1.45,
    contourCenterMin: 0.35,
    contourCenterMax: 0.65,
    contourStretchMin: 0.9,
    contourStretchMax: 1.07,
  },
};

let currentPreset = EXPORT_PRESETS.wide;
let seedValue = 20270709;
let showOverlay = true;
let showGridGuide = false;
let showTitleSafeGuide = false;
let viewMode = VIEW_MODES.main;
let batchCandidates = [];
let palette;
let currentStudyKey = "blank";
let currentArtPresetKey = "institutionalQuiet";
let currentArtworkViewKey = "artwork";
let currentCompositionBiasKey = "balanced";
let currentProofModeKey = "white";
let showTypeProof = false;
let currentTypeLayoutKey = "left";
let currentElementKey = "line";
let currentPrincipleKey = "balance";
let currentChaosLevel = 30;
let hasActivatedGestalt = false;
let elementSelect;
let principleSelect;
let chaosRange;
let chaosValue;
let seedInput;
let loadSeedButton;
let generateBatchButton;
let exportPngButton;
let toggleTypeProofButton;
let closeSandboxButton;
let applySnippetButton;
let clearSnippetButton;
let resetSandboxButton;
let viewStateIndicator;
let proofSelect;
let typeLayoutSelect;
let sandboxPanel;
let sandboxSnippet;
let sandboxStatus;
let isSandboxPanelOpen = false;

function setup() {
  pixelDensity(2);
  createCanvas(currentPreset.width, currentPreset.height);
  elementSelect = document.getElementById("element-select");
  principleSelect = document.getElementById("principle-select");
  chaosRange = document.getElementById("chaos-range");
  chaosValue = document.getElementById("chaos-value");
  proofSelect = document.getElementById("proof-select");
  typeLayoutSelect = document.getElementById("type-layout-select");
  seedInput = document.getElementById("seed-input");
  loadSeedButton = document.getElementById("load-seed");
  generateBatchButton = document.getElementById("generate-batch");
  exportPngButton = document.getElementById("export-png");
  toggleTypeProofButton = document.getElementById("toggle-type-proof");
  closeSandboxButton = document.getElementById("close-sandbox");
  applySnippetButton = document.getElementById("apply-snippet");
  clearSnippetButton = document.getElementById("clear-snippet");
  resetSandboxButton = document.getElementById("reset-sandbox");
  viewStateIndicator = document.getElementById("view-state");
  sandboxPanel = document.getElementById("sandbox-panel");
  sandboxSnippet = document.getElementById("sandbox-snippet");
  sandboxStatus = document.getElementById("sandbox-status");
  initializeSeedControls();
  noLoop();
  generateComposition();
}

function draw() {
  if (viewMode === VIEW_MODES.batch) {
    drawBatchReview();
    return;
  }

  renderBackdrop();
  if (showTypeProof) {
    drawTypeProof();
  }
  drawGuideOverlays();
  if (showOverlay) {
    drawOverlay();
  }
}

function windowResized() {
  updatePreviewScale();
}

function keyPressed() {
  if (isTypingInSeedInput()) {
    return;
  }

  const keyValue = key.toLowerCase();

  if (keyValue === "b") {
    generateBatchReview();
    return;
  }

  if (viewMode === VIEW_MODES.batch) {
    if (key === EXPORT_PRESETS.wide.key) {
      setPreset(EXPORT_PRESETS.wide);
    } else if (key === EXPORT_PRESETS.square.key) {
      setPreset(EXPORT_PRESETS.square);
    } else if (key === EXPORT_PRESETS.portrait.key) {
      setPreset(EXPORT_PRESETS.portrait);
    }

    return;
  }

  if (keyValue === "r") {
    seedValue = floor(random(1, 999999999));
    generateComposition();
    return;
  }

  if (keyValue === "s") {
    saveCanvas(getExportFilename(), "png");
    return;
  }

  if (keyValue === "h") {
    showOverlay = !showOverlay;
    redraw();
    return;
  }

  if (keyValue === "g") {
    showGridGuide = !showGridGuide;
    redraw();
    return;
  }

  if (keyValue === "t") {
    showTitleSafeGuide = !showTitleSafeGuide;
    redraw();
    return;
  }

  if (keyValue === "y") {
    toggleTypeProof();
    return;
  }

  if (key === EXPORT_PRESETS.wide.key) {
    setPreset(EXPORT_PRESETS.wide);
    return;
  }

  if (key === EXPORT_PRESETS.square.key) {
    setPreset(EXPORT_PRESETS.square);
    return;
  }

  if (key === EXPORT_PRESETS.portrait.key) {
    setPreset(EXPORT_PRESETS.portrait);
  }
}

function mousePressed() {
  if (viewMode !== VIEW_MODES.batch) {
    return;
  }

  const layout = getBatchLayout();
  for (let index = 0; index < layout.frames.length; index += 1) {
    const frame = layout.frames[index];
    if (mouseX >= frame.x && mouseX <= frame.x + frame.width && mouseY >= frame.y && mouseY <= frame.y + frame.height) {
      loadCandidateSeed(batchCandidates[index].seed);
      return;
    }
  }
}

function setPreset(preset) {
  currentPreset = preset;
  resizeCanvas(preset.width, preset.height);
  pixelDensity(2);

  if (viewMode === VIEW_MODES.batch) {
    rebuildBatchCandidates();
    return;
  }

  generateComposition();
}

function generateComposition() {
  palette = initializeSeedState(seedValue).palette;
  syncGestaltControls();
  syncSeedInput();
  syncProofSelect();
  syncTypeProofControls();
  updateViewStateIndicator();
  updatePreviewScale();
  redraw();
}

function initializeSeedControls() {
  if (
    !elementSelect ||
    !principleSelect ||
    !chaosRange ||
    !chaosValue ||
    !seedInput ||
    !loadSeedButton ||
    !generateBatchButton ||
    !exportPngButton ||
    !toggleTypeProofButton ||
    !closeSandboxButton ||
    !applySnippetButton ||
    !clearSnippetButton ||
    !resetSandboxButton ||
    !viewStateIndicator ||
    !proofSelect ||
    !typeLayoutSelect ||
    !sandboxPanel ||
    !sandboxSnippet ||
    !sandboxStatus
  ) {
    return;
  }

  syncGestaltControls();
  syncSeedInput();
  syncProofSelect();
  syncTypeProofControls();
  syncSandboxPanel();
  updateViewStateIndicator();
  document.addEventListener("keydown", handleGlobalKeydown);
  elementSelect.addEventListener("change", handleElementChange);
  principleSelect.addEventListener("change", handlePrincipleChange);
  chaosRange.addEventListener("input", handleChaosChange);
  proofSelect.addEventListener("change", handleProofChange);
  typeLayoutSelect.addEventListener("change", handleTypeLayoutChange);
  loadSeedButton.addEventListener("click", loadSeedFromInput);
  generateBatchButton.addEventListener("click", generateBatchReview);
  exportPngButton.addEventListener("click", exportPng);
  toggleTypeProofButton.addEventListener("click", toggleTypeProof);
  closeSandboxButton.addEventListener("click", closeSandboxPanel);
  applySnippetButton.addEventListener("click", applySandboxSnippet);
  clearSnippetButton.addEventListener("click", clearSandboxSnippet);
  resetSandboxButton.addEventListener("click", resetSandboxConfig);
  seedInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      loadSeedFromInput();
    }
  });
}

function handleGlobalKeydown(event) {
  if (event.key !== "Escape") {
    return;
  }

  if (viewMode === VIEW_MODES.batch) {
    event.preventDefault();
    exitBatchReview();
    return;
  }

  if (viewMode === VIEW_MODES.main) {
    event.preventDefault();
    closeSandboxPanel();
  }
}

function handleElementChange() {
  if (!elementSelect || !GESTALT_ELEMENTS[elementSelect.value]) {
    return;
  }

  currentElementKey = elementSelect.value;
  hasActivatedGestalt = true;
  if (viewMode === VIEW_MODES.batch) {
    rebuildBatchCandidates();
    return;
  }

  generateComposition();
}

function handlePrincipleChange() {
  if (!principleSelect || !GESTALT_PRINCIPLES[principleSelect.value]) {
    return;
  }

  currentPrincipleKey = principleSelect.value;
  hasActivatedGestalt = true;
  if (viewMode === VIEW_MODES.batch) {
    rebuildBatchCandidates();
    return;
  }

  generateComposition();
}

function handleChaosChange() {
  if (!chaosRange) {
    return;
  }

  currentChaosLevel = Number.parseInt(chaosRange.value, 10) || 0;
  hasActivatedGestalt = true;
  syncGestaltControls();
  if (viewMode === VIEW_MODES.batch) {
    rebuildBatchCandidates();
    return;
  }

  generateComposition();
}

function exportPng() {
  saveCanvas(getExportFilename(), "png");
}

function toggleSandboxPanel() {
  isSandboxPanelOpen = !isSandboxPanelOpen;
  syncSandboxPanel();
}

function closeSandboxPanel() {
  isSandboxPanelOpen = false;
  syncSandboxPanel();
}

function syncSandboxPanel() {
  if (!sandboxPanel) {
    return;
  }

  sandboxPanel.classList.toggle("sandbox-panel--hidden", !isSandboxPanelOpen);
}

function applySandboxSnippet() {
  if (!sandboxSnippet) {
    return;
  }

  const snippet = sandboxSnippet.value.trim();
  if (!snippet) {
    return;
  }

  const nextConfig = { ...sandboxConfig };
  console.log("[sandbox] before config", { ...sandboxConfig });

  try {
    const runner = new Function(
      "sandboxConfig",
      '"use strict";\nconst window = undefined;\nconst document = undefined;\nconst globalThis = undefined;\nconst localStorage = undefined;\nconst sessionStorage = undefined;\n' + snippet + "\nreturn sandboxConfig;"
    );
    const result = runner(nextConfig);
    sandboxConfig = sanitizeSandboxConfig(result);
    sandboxConfig.enabled = isSandboxVisuallyActive(sandboxConfig);
    console.log("[sandbox] after config", { ...sandboxConfig });
    setSandboxStatus(
      sandboxConfig.enabled
        ? `Sandbox applied. Line x${sandboxConfig.lineMultiplier}, Noise x${sandboxConfig.noiseScaleMultiplier}, Stroke x${sandboxConfig.strokeMultiplier}, Circle x${sandboxConfig.circleOpacityMultiplier}.`
        : "Sandbox applied, but values match the approved system so Sandbox remains Off.",
      false
    );
    generateComposition();
  } catch (error) {
    console.error("Sandbox snippet failed", error);
    setSandboxStatus(`Snippet error: ${error.message}`, true);
  }
}

function clearSandboxSnippet() {
  if (sandboxSnippet) {
    sandboxSnippet.value = "";
  }

  clearSandboxStatus();
}

function resetSandboxConfig() {
  sandboxConfig = { ...DEFAULT_SANDBOX_CONFIG };
  if (sandboxSnippet) {
    sandboxSnippet.value = "";
  }
  setSandboxStatus("Sandbox reset to the approved system defaults.", false);
  generateComposition();
}

function setSandboxStatus(message, isError) {
  if (!sandboxStatus) {
    return;
  }

  sandboxStatus.textContent = message;
  sandboxStatus.classList.remove("sandbox-panel__status--hidden", "sandbox-panel__status--error");
  if (isError) {
    sandboxStatus.classList.add("sandbox-panel__status--error");
  }
}

function clearSandboxStatus() {
  if (!sandboxStatus) {
    return;
  }

  sandboxStatus.textContent = "";
  sandboxStatus.classList.add("sandbox-panel__status--hidden");
  sandboxStatus.classList.remove("sandbox-panel__status--error");
}

function sanitizeSandboxConfig(config) {
  const source = config && typeof config === "object" ? config : {};
  return {
    enabled: Boolean(source.enabled),
    lineMultiplier: clampNumber(source.lineMultiplier, 0.25, 3, DEFAULT_SANDBOX_CONFIG.lineMultiplier),
    noiseScaleMultiplier: clampNumber(source.noiseScaleMultiplier, 0.25, 3, DEFAULT_SANDBOX_CONFIG.noiseScaleMultiplier),
    strokeMultiplier: clampNumber(source.strokeMultiplier, 0.25, 3, DEFAULT_SANDBOX_CONFIG.strokeMultiplier),
    contrastBoost: clampNumber(source.contrastBoost, -0.6, 1.2, DEFAULT_SANDBOX_CONFIG.contrastBoost),
    circleOpacityMultiplier: clampNumber(source.circleOpacityMultiplier, 0.2, 3, DEFAULT_SANDBOX_CONFIG.circleOpacityMultiplier),
    notes: typeof source.notes === "string" ? source.notes.slice(0, 160) : "",
  };
}

function clampNumber(value, minValue, maxValue, fallback) {
  return typeof value === "number" && Number.isFinite(value) ? constrain(value, minValue, maxValue) : fallback;
}

function isSandboxVisuallyActive(config = sandboxConfig) {
  return (
    config.lineMultiplier !== DEFAULT_SANDBOX_CONFIG.lineMultiplier ||
    config.noiseScaleMultiplier !== DEFAULT_SANDBOX_CONFIG.noiseScaleMultiplier ||
    config.strokeMultiplier !== DEFAULT_SANDBOX_CONFIG.strokeMultiplier ||
    config.contrastBoost !== DEFAULT_SANDBOX_CONFIG.contrastBoost ||
    config.circleOpacityMultiplier !== DEFAULT_SANDBOX_CONFIG.circleOpacityMultiplier
  );
}

function getExportFilename() {
  const proofSegment = getCurrentProofMode().exportSegment;
  const sandboxSegment = sandboxConfig.enabled ? "-sandbox" : "";
  const typeProofSegment = showTypeProof ? "-type-proof" : "";
  return `rca-biennale-${getCurrentElement().slug}-${getCurrentPrinciple().slug}-chaos-${currentChaosLevel}${proofSegment}${typeProofSegment}${sandboxSegment}-seed-${seedValue}-${width}x${height}`;
}

function handleProofChange() {
  if (!proofSelect || !PROOF_MODES[proofSelect.value]) {
    return;
  }

  currentProofModeKey = proofSelect.value;
  if (viewMode === VIEW_MODES.batch) {
    rebuildBatchCandidates();
    return;
  }

  generateComposition();
}

function handleTypeLayoutChange() {
  if (!typeLayoutSelect || !TYPE_LAYOUTS[typeLayoutSelect.value]) {
    return;
  }

  currentTypeLayoutKey = typeLayoutSelect.value;
  syncTypeProofControls();
  redraw();
}

function toggleTypeProof() {
  showTypeProof = !showTypeProof;
  syncTypeProofControls();
  redraw();
}

function loadSeedFromInput() {
  if (!seedInput) {
    return;
  }

  const nextSeed = parseSeedValue(seedInput.value);
  if (nextSeed === null) {
    syncSeedInput();
    return;
  }

  seedValue = nextSeed;
  viewMode = VIEW_MODES.main;
  generateComposition();
  seedInput.blur();
}

function parseSeedValue(value) {
  const trimmedValue = value.trim();
  if (!/^\d+$/.test(trimmedValue)) {
    return null;
  }

  const parsedValue = Number.parseInt(trimmedValue, 10);
  if (!Number.isSafeInteger(parsedValue) || parsedValue < 1) {
    return null;
  }

  return parsedValue;
}

function syncSeedInput() {
  if (seedInput) {
    seedInput.value = String(seedValue);
  }
}

function syncGestaltControls() {
  if (elementSelect) {
    elementSelect.value = currentElementKey;
  }

  if (principleSelect) {
    principleSelect.value = currentPrincipleKey;
  }

  if (chaosRange) {
    chaosRange.value = String(currentChaosLevel);
  }

  if (chaosValue) {
    chaosValue.textContent = String(currentChaosLevel);
  }
}

function syncProofSelect() {
  if (proofSelect) {
    proofSelect.value = currentProofModeKey;
  }
}

function syncTypeProofControls() {
  if (toggleTypeProofButton) {
    toggleTypeProofButton.textContent = `Type Proof ${showTypeProof ? "On" : "Off"}`;
    toggleTypeProofButton.setAttribute("aria-pressed", String(showTypeProof));
  }

  if (typeLayoutSelect) {
    typeLayoutSelect.value = currentTypeLayoutKey;
  }
}

function isTypingInSeedInput() {
  return (
    document.activeElement === seedInput ||
    document.activeElement === proofSelect ||
    document.activeElement === typeLayoutSelect ||
    document.activeElement === elementSelect ||
    document.activeElement === principleSelect ||
    document.activeElement === chaosRange ||
    document.activeElement === sandboxSnippet
  );
}

function generateBatchReview() {
  hasActivatedGestalt = true;
  rebuildBatchCandidates(createBatchSeeds(BATCH_REVIEW.count));
}

function rebuildBatchCandidates(seeds = batchCandidates.map((candidate) => candidate.seed)) {
  cleanupBatchCandidates();

  batchCandidates = seeds.map((candidateSeed) => ({
    seed: candidateSeed,
    thumbnail: createBatchThumbnail(candidateSeed),
  }));

  viewMode = VIEW_MODES.batch;
  updateViewStateIndicator();
  updatePreviewScale();
  redraw();
}

function createBatchThumbnail(candidateSeed) {
  const thumbnailSize = getBatchThumbnailSize();
  const thumbnail = createGraphics(thumbnailSize.width, thumbnailSize.height);
  thumbnail.pixelDensity(1);
  renderCompositionToTarget(thumbnail, candidateSeed, thumbnail.width, thumbnail.height);
  return thumbnail;
}

function getBatchThumbnailSize() {
  const aspectRatio = currentPreset.width / currentPreset.height;
  const longSide = 520;

  if (aspectRatio >= 1) {
    return {
      width: longSide,
      height: Math.round(longSide / aspectRatio),
    };
  }

  return {
    width: Math.round(longSide * aspectRatio),
    height: longSide,
  };
}

function getBatchLayout() {
  const outerPaddingX = width * 0.08;
  const outerPaddingY = height * 0.08;
  const gap = min(width, height) * 0.022;
  const topReserved = max(outerPaddingY + 100, height * 0.16);
  const usableWidth = width - outerPaddingX * 2 - gap * (BATCH_REVIEW.columns - 1);
  const usableHeight = height - topReserved - outerPaddingY - gap * (BATCH_REVIEW.rows - 1);
  const aspectRatio = currentPreset.width / currentPreset.height;

  let frameWidth = usableWidth / BATCH_REVIEW.columns;
  let frameHeight = frameWidth / aspectRatio;

  if (frameHeight * BATCH_REVIEW.rows > usableHeight) {
    frameHeight = usableHeight / BATCH_REVIEW.rows;
    frameWidth = frameHeight * aspectRatio;
  }

  const totalWidth = frameWidth * BATCH_REVIEW.columns + gap * (BATCH_REVIEW.columns - 1);
  const totalHeight = frameHeight * BATCH_REVIEW.rows + gap * (BATCH_REVIEW.rows - 1);
  const startX = (width - totalWidth) * 0.5;
  const startY = topReserved + max(0, (usableHeight - totalHeight) * 0.5);
  const frames = [];

  for (let row = 0; row < BATCH_REVIEW.rows; row += 1) {
    for (let column = 0; column < BATCH_REVIEW.columns; column += 1) {
      frames.push({
        x: startX + column * (frameWidth + gap),
        y: startY + row * (frameHeight + gap),
        width: frameWidth,
        height: frameHeight,
      });
    }
  }

  return { startX, startY, frames };
}

function createBatchSeeds(count) {
  const seeds = new Set();
  while (seeds.size < count) {
    seeds.add(Math.floor(Math.random() * 999999999) + 1);
  }

  return Array.from(seeds);
}

function loadCandidateSeed(candidateSeed) {
  seedValue = candidateSeed;
  viewMode = VIEW_MODES.main;
  generateComposition();
}

function exitBatchReview() {
  viewMode = VIEW_MODES.main;
  updateViewStateIndicator();
  redraw();
}

function cleanupBatchCandidates() {
  for (const candidate of batchCandidates) {
    if (candidate.thumbnail) {
      candidate.thumbnail.remove();
    }
  }
}

function initializeSeedState(renderSeed) {
  randomSeed(renderSeed);
  noiseSeed(renderSeed);
  return applySandboxToPreset(getCurrentArtPreset());
}

function applySandboxToPreset(artPreset) {
  const contrastFactor = 1 + sandboxConfig.contrastBoost;
  return {
    ...artPreset,
    palette: applySandboxToPalette(artPreset.palette),
    atmosphereAlpha: clampNumber(artPreset.atmosphereAlpha * sandboxConfig.circleOpacityMultiplier, 4, 180, artPreset.atmosphereAlpha),
    rowCount: Math.max(8, Math.round(artPreset.rowCount * sandboxConfig.lineMultiplier)),
    contourCount: Math.max(3, Math.round(artPreset.contourCount * sandboxConfig.lineMultiplier)),
    flowNoiseScale: artPreset.flowNoiseScale * sandboxConfig.noiseScaleMultiplier,
    contourNoiseScale: artPreset.contourNoiseScale * sandboxConfig.noiseScaleMultiplier,
    strokeWeightMin: artPreset.strokeWeightMin * sandboxConfig.strokeMultiplier,
    strokeWeightMax: artPreset.strokeWeightMax * sandboxConfig.strokeMultiplier,
    strongLineAlpha: clampNumber(artPreset.strongLineAlpha * contrastFactor, 8, 255, artPreset.strongLineAlpha),
    softLineAlpha: clampNumber(artPreset.softLineAlpha * contrastFactor, 6, 255, artPreset.softLineAlpha),
    contourAccentAlpha: clampNumber(artPreset.contourAccentAlpha * contrastFactor, 6, 255, artPreset.contourAccentAlpha),
    contourLineAlpha: clampNumber(artPreset.contourLineAlpha * contrastFactor, 6, 255, artPreset.contourLineAlpha),
  };
}

function applySandboxToPalette(paletteConfig) {
  const proofedPalette = applyProofModeToPalette(paletteConfig);
  return {
    background: adjustColorContrast(proofedPalette.background, -sandboxConfig.contrastBoost * 0.12),
    lines: proofedPalette.lines.map((lineColor) => adjustColorContrast(lineColor, sandboxConfig.contrastBoost * 0.08)),
    accent: adjustColorContrast(proofedPalette.accent, sandboxConfig.contrastBoost * 0.14),
  };
}

function applyProofModeToPalette(paletteConfig) {
  const proofMode = getCurrentProofMode();
  if (!proofMode) {
    return paletteConfig;
  }

  return {
    background: proofMode.background,
    lines: [...proofMode.lines],
    accent: proofMode.accent,
  };
}

function adjustColorContrast(colorValue, amount) {
  const parsed = color(colorValue);
  const redValue = constrain(red(parsed) + 255 * amount, 0, 255);
  const greenValue = constrain(green(parsed) + 255 * amount, 0, 255);
  const blueValue = constrain(blue(parsed) + 255 * amount, 0, 255);
  return `rgb(${Math.round(redValue)}, ${Math.round(greenValue)}, ${Math.round(blueValue)})`;
}

function getCurrentStudy() {
  return STUDIES[currentStudyKey];
}

function getCurrentArtPreset() {
  return ART_DIRECTION_PRESETS[currentArtPresetKey];
}

function getCurrentArtworkView() {
  return ARTWORK_VIEWS[currentArtworkViewKey];
}

function getCurrentCompositionBias() {
  return COMPOSITION_BIASES[currentCompositionBiasKey];
}

function getCurrentProofMode() {
  return PROOF_MODES[currentProofModeKey];
}

function getCurrentTypeLayout() {
  return TYPE_LAYOUTS[currentTypeLayoutKey];
}

function getCurrentElement() {
  return GESTALT_ELEMENTS[currentElementKey];
}

function getCurrentPrinciple() {
  return GESTALT_PRINCIPLES[currentPrincipleKey];
}

function renderBackdrop() {
  renderCompositionToTarget(createMainTarget(), seedValue, width, height);
}

function renderCompositionToTarget(target, renderSeed, renderWidth, renderHeight) {
  const artPreset = initializeSeedState(renderSeed);
  const renderPalette = artPreset.palette;
  target.background(renderPalette.background);
  if (!hasActivatedGestalt) {
    return;
  }

  renderGestaltMachine(target, renderPalette, renderWidth, renderHeight, renderSeed, artPreset);
}

function createMainTarget() {
  return {
    background: (...args) => background(...args),
    noStroke: () => noStroke(),
    fill: (...args) => fill(...args),
    circle: (...args) => circle(...args),
    ellipse: (...args) => ellipse(...args),
    line: (...args) => line(...args),
    rect: (...args) => rect(...args),
    vertex: (...args) => vertex(...args),
    noFill: () => noFill(),
    stroke: (...args) => stroke(...args),
    strokeWeight: (...args) => strokeWeight(...args),
    beginShape: () => beginShape(),
    curveVertex: (...args) => curveVertex(...args),
    endShape: (...args) => endShape(...args),
    color: (...args) => color(...args),
    push: () => push(),
    pop: () => pop(),
    translate: (...args) => translate(...args),
    rotate: (...args) => rotate(...args),
  };
}

function renderGestaltMachine(target, renderPalette, renderWidth, renderHeight, renderSeed, artPreset) {
  const element = getCurrentElement();
  const principle = getCurrentPrinciple();
  const chaos = currentChaosLevel / 100;
  const marginX = renderWidth * 0.08;
  const marginY = renderHeight * 0.09;
  const focusX = getPrincipleFocusX(principle, renderWidth);
  const focusY = getPrincipleFocusY(principle, renderHeight);

  drawGestaltAtmosphere(target, renderPalette, renderWidth, renderHeight, artPreset, focusX, focusY, chaos);

  switch (element.key) {
    case GESTALT_ELEMENTS.line.key:
      drawGestaltLines(target, renderPalette, renderWidth, renderHeight, artPreset, principle, chaos, focusX, focusY);
      return;
    case GESTALT_ELEMENTS.space.key:
      drawGestaltSpace(target, renderPalette, renderWidth, renderHeight, principle, chaos, marginX, marginY, focusX, focusY);
      return;
    case GESTALT_ELEMENTS.shape.key:
      drawGestaltShapes(target, renderPalette, renderWidth, renderHeight, principle, chaos, marginX, marginY, focusX, focusY);
      return;
    case GESTALT_ELEMENTS.form.key:
      drawGestaltForms(target, renderPalette, renderWidth, renderHeight, principle, chaos, focusX, focusY);
      return;
    case GESTALT_ELEMENTS.colour.key:
      drawGestaltColour(target, renderPalette, renderWidth, renderHeight, principle, chaos, marginX, marginY, focusX, focusY);
      return;
    case GESTALT_ELEMENTS.texture.key:
      drawGestaltTexture(target, renderPalette, renderWidth, renderHeight, principle, chaos, marginX, marginY);
      return;
    case GESTALT_ELEMENTS.value.key:
      drawGestaltValue(target, renderPalette, renderWidth, renderHeight, principle, chaos, marginX, marginY);
      return;
    case GESTALT_ELEMENTS.typography.key:
      drawGestaltTypography(target, renderPalette, renderWidth, renderHeight, principle, chaos, marginX, marginY, focusX, focusY);
      return;
    default:
      return;
  }
}

function drawGestaltAtmosphere(target, renderPalette, renderWidth, renderHeight, artPreset, focusX, focusY, chaos) {
  target.noStroke();
  const atmosphereCount = Math.round(10 + chaos * 24);

  for (let index = 0; index < atmosphereCount; index += 1) {
    const tone = target.color(index % 5 === 0 ? renderPalette.accent : renderPalette.lines[index % renderPalette.lines.length]);
    tone.setAlpha(10 + chaos * 24);
    const radius = random(renderWidth * 0.05, renderWidth * (0.13 + chaos * 0.12));
    const x = lerp(focusX, random(renderWidth * 0.1, renderWidth * 0.9), 0.72 + random() * 0.28);
    const y = lerp(focusY, random(renderHeight * 0.1, renderHeight * 0.9), 0.72 + random() * 0.28);
    target.fill(tone);
    target.circle(x, y, radius * 2);
  }

  const veilTone = target.color(renderPalette.background);
  veilTone.setAlpha(28);
  target.fill(veilTone);
  target.rect(renderWidth * 0.05, renderHeight * 0.06, renderWidth * 0.9, renderHeight * 0.88, 28);
}

function drawGestaltLines(target, renderPalette, renderWidth, renderHeight, artPreset, principle, chaos, focusX, focusY) {
  target.noFill();
  const lineCount = Math.round(18 + chaos * 48);
  const stepCount = 22;
  const strokeBase = map(renderWidth, 2160, 3840, 1.2, 2.2, true);

  for (let lineIndex = 0; lineIndex < lineCount; lineIndex += 1) {
    const tone = target.color(lineIndex % 6 === 0 ? renderPalette.accent : renderPalette.lines[lineIndex % renderPalette.lines.length]);
    tone.setAlpha(70 + chaos * 70);
    target.stroke(tone);
    target.strokeWeight(strokeBase + random() * (0.8 + chaos * 1.1));
    target.beginShape();

    for (let step = 0; step < stepCount; step += 1) {
      const progress = step / (stepCount - 1);
      const anchor = getPrincipleAxisPoint(principle, progress, lineIndex / lineCount, renderWidth, renderHeight, focusX, focusY);
      const offset = map(noise(lineIndex * 0.18, progress * 2.6, seedValue * 0.0001), 0, 1, -1, 1) * renderHeight * (0.02 + chaos * 0.12);
      target.curveVertex(anchor.x, anchor.y + offset);
    }

    target.endShape();
  }
}

function drawGestaltSpace(target, renderPalette, renderWidth, renderHeight, principle, chaos, marginX, marginY, focusX, focusY) {
  const frameTone = target.color(renderPalette.lines[1]);
  frameTone.setAlpha(90);
  const voidTone = target.color(renderPalette.background);
  voidTone.setAlpha(210);
  const edgeWeight = max(1.2, renderWidth * 0.0011);

  target.noFill();
  target.stroke(frameTone);
  target.strokeWeight(edgeWeight);
  target.rect(marginX, marginY, renderWidth - marginX * 2, renderHeight - marginY * 2, 24);

  const voidWidth = renderWidth * (0.2 + (principle.key === GESTALT_PRINCIPLES.emphasis.key ? 0.18 : 0.08) + chaos * 0.08);
  const voidHeight = renderHeight * (0.28 + chaos * 0.12);
  const voidX = constrain(focusX - voidWidth * 0.5, marginX * 1.2, renderWidth - marginX * 1.2 - voidWidth);
  const voidY = constrain(focusY - voidHeight * 0.5, marginY * 1.2, renderHeight - marginY * 1.2 - voidHeight);

  target.noStroke();
  target.fill(voidTone);
  target.rect(voidX, voidY, voidWidth, voidHeight, 22);

  for (let band = 0; band < 4; band += 1) {
    const bandTone = target.color(renderPalette.lines[band % renderPalette.lines.length]);
    bandTone.setAlpha(24 + chaos * 32);
    target.fill(bandTone);
    const bandHeight = renderHeight * (0.035 + band * 0.012);
    const y = lerp(marginY * 1.3, renderHeight - marginY * 1.7, band / 3);
    target.rect(marginX * 1.15, y, renderWidth - marginX * 2.3, bandHeight, 999);
  }
}

function drawGestaltShapes(target, renderPalette, renderWidth, renderHeight, principle, chaos, marginX, marginY, focusX, focusY) {
  target.noStroke();
  const count = Math.round(8 + chaos * 18);

  for (let index = 0; index < count; index += 1) {
    const size = min(renderWidth, renderHeight) * random(0.06, 0.18 + chaos * 0.16);
    const tone = target.color(index % 4 === 0 ? renderPalette.accent : renderPalette.lines[index % renderPalette.lines.length]);
    tone.setAlpha(85 + chaos * 75);
    const anchor = getPrinciplePlacement(principle, index, count, renderWidth, renderHeight, marginX, marginY, focusX, focusY);
    target.fill(tone);

    if ((index + currentChaosLevel) % 3 === 0) {
      target.circle(anchor.x, anchor.y, size);
    } else {
      target.push();
      target.translate(anchor.x, anchor.y);
      target.rotate(random(-0.4, 0.4) + chaos * 0.8);
      target.rect(-size * 0.5, -size * 0.35, size, size * random(0.55, 1.2), 18);
      target.pop();
    }
  }
}

function drawGestaltForms(target, renderPalette, renderWidth, renderHeight, principle, chaos, focusX, focusY) {
  const count = Math.round(5 + chaos * 10);
  for (let index = 0; index < count; index += 1) {
    const depth = index / max(1, count - 1);
    const baseWidth = renderWidth * (0.12 + depth * 0.16 + chaos * 0.07);
    const baseHeight = renderHeight * (0.07 + depth * 0.11 + chaos * 0.05);
    const x = lerp(focusX, random(renderWidth * 0.18, renderWidth * 0.82), 0.35 + depth * 0.5);
    const y = lerp(focusY, random(renderHeight * 0.18, renderHeight * 0.82), 0.35 + depth * 0.5);
    const shadowTone = target.color(renderPalette.background);
    shadowTone.setAlpha(58);
    const formTone = target.color(index % 2 === 0 ? renderPalette.accent : renderPalette.lines[index % renderPalette.lines.length]);
    formTone.setAlpha(70 + depth * 90);

    target.push();
    target.translate(x, y);
    target.rotate(getPrincipleRotation(principle, depth, chaos));
    target.noStroke();
    target.fill(shadowTone);
    target.rect(-baseWidth * 0.45 + renderWidth * 0.008, -baseHeight * 0.45 + renderWidth * 0.008, baseWidth, baseHeight, 20);
    target.fill(formTone);
    target.rect(-baseWidth * 0.45, -baseHeight * 0.45, baseWidth, baseHeight, 20);
    target.pop();
  }
}

function drawGestaltColour(target, renderPalette, renderWidth, renderHeight, principle, chaos, marginX, marginY, focusX, focusY) {
  const swatchCount = Math.round(6 + chaos * 8);
  for (let index = 0; index < swatchCount; index += 1) {
    const progress = index / max(1, swatchCount - 1);
    const tone = target.color(index % 3 === 0 ? renderPalette.accent : renderPalette.lines[index % renderPalette.lines.length]);
    tone.setAlpha(36 + progress * 120);
    const swatchWidth = renderWidth * (0.1 + progress * 0.18);
    const swatchHeight = renderHeight * (0.07 + progress * 0.08);
    const anchor = getPrinciplePlacement(principle, index, swatchCount, renderWidth, renderHeight, marginX, marginY, focusX, focusY);

    target.push();
    target.translate(anchor.x, anchor.y);
    target.rotate(getPrincipleRotation(principle, progress, chaos) * 0.65);
    target.noStroke();
    target.fill(tone);
    target.rect(-swatchWidth * 0.5, -swatchHeight * 0.5, swatchWidth, swatchHeight, 16);
    target.pop();
  }
}

function drawGestaltTexture(target, renderPalette, renderWidth, renderHeight, principle, chaos, marginX, marginY) {
  target.noStroke();
  const columns = Math.round(14 + chaos * 28);
  const rows = Math.round(10 + chaos * 22);
  const cellWidth = (renderWidth - marginX * 2) / columns;
  const cellHeight = (renderHeight - marginY * 2) / rows;

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const progress = getTextureProgress(principle, column, row, columns, rows);
      const tone = target.color(progress > 0.72 ? renderPalette.accent : renderPalette.lines[(row + column) % renderPalette.lines.length]);
      tone.setAlpha(26 + progress * 128);
      target.fill(tone);
      const x = marginX + column * cellWidth + cellWidth * 0.5;
      const y = marginY + row * cellHeight + cellHeight * 0.5;
      const radius = min(cellWidth, cellHeight) * (0.18 + progress * (0.7 + chaos * 0.35));
      target.circle(x, y, radius);
    }
  }
}

function drawGestaltValue(target, renderPalette, renderWidth, renderHeight, principle, chaos, marginX, marginY) {
  const bandCount = Math.round(7 + chaos * 10);
  const isHorizontal = principle.key === GESTALT_PRINCIPLES.balance.key || principle.key === GESTALT_PRINCIPLES.gradations.key;
  const bandSpan = isHorizontal ? (renderHeight - marginY * 2) / bandCount : (renderWidth - marginX * 2) / bandCount;

  target.noStroke();
  for (let index = 0; index < bandCount; index += 1) {
    const progress = index / max(1, bandCount - 1);
    const tone = target.color(index % 4 === 0 ? renderPalette.accent : renderPalette.lines[index % renderPalette.lines.length]);
    tone.setAlpha(18 + getValueAlpha(principle, progress) * (160 + chaos * 60));
    target.fill(tone);

    if (isHorizontal) {
      target.rect(marginX, marginY + index * bandSpan, renderWidth - marginX * 2, bandSpan * (0.85 + chaos * 0.18), 12);
    } else {
      target.rect(marginX + index * bandSpan, marginY, bandSpan * (0.85 + chaos * 0.18), renderHeight - marginY * 2, 12);
    }
  }
}

function drawGestaltTypography(target, renderPalette, renderWidth, renderHeight, principle, chaos, marginX, marginY, focusX, focusY) {
  const columnWidth = (renderWidth - marginX * 2) / 12;
  const ruleTone = target.color(renderPalette.lines[1]);
  ruleTone.setAlpha(88);
  const blockTone = target.color(renderPalette.accent);
  blockTone.setAlpha(110 + chaos * 70);

  target.stroke(ruleTone);
  target.strokeWeight(max(1.1, renderWidth * 0.0007));
  for (let column = 0; column <= 12; column += 1) {
    const x = marginX + column * columnWidth;
    target.line(x, marginY, x, renderHeight - marginY);
  }

  target.noStroke();
  target.fill(blockTone);
  const headlineWidth = principle.key === GESTALT_PRINCIPLES.emphasis.key ? columnWidth * 7.5 : columnWidth * 5.5;
  const headlineX = constrain(focusX - headlineWidth * 0.5, marginX, renderWidth - marginX - headlineWidth);
  const headlineY = constrain(focusY - renderHeight * 0.11, marginY * 1.2, renderHeight * 0.62);
  target.rect(headlineX, headlineY, headlineWidth, renderHeight * 0.12, 16);

  const textRows = Math.round(5 + chaos * 7);
  for (let index = 0; index < textRows; index += 1) {
    const widthFactor = 0.24 + ((index + 1) % 5) * 0.09 + random() * 0.08;
    const rowWidth = (renderWidth - marginX * 2) * min(widthFactor, 0.88);
    const rowX = principle.key === GESTALT_PRINCIPLES.balance.key ? renderWidth * 0.5 - rowWidth * 0.5 : lerp(marginX, renderWidth - marginX - rowWidth, noise(index * 0.24, chaos));
    const rowY = headlineY + renderHeight * 0.16 + index * renderHeight * 0.048;
    const rowTone = target.color(renderPalette.lines[index % renderPalette.lines.length]);
    rowTone.setAlpha(58 + chaos * 55);
    target.fill(rowTone);
    target.rect(rowX, rowY, rowWidth, renderHeight * 0.016, 999);
  }
}

function getPrincipleFocusX(principle, renderWidth) {
  switch (principle.key) {
    case GESTALT_PRINCIPLES.balance.key:
    case GESTALT_PRINCIPLES.unityHarmony.key:
      return renderWidth * 0.5;
    case GESTALT_PRINCIPLES.emphasis.key:
      return renderWidth * 0.68;
    case GESTALT_PRINCIPLES.movement.key:
      return renderWidth * 0.62;
    case GESTALT_PRINCIPLES.proportion.key:
      return renderWidth * 0.618;
    default:
      return renderWidth * lerp(0.32, 0.72, noise(renderWidth * 0.0004, currentChaosLevel * 0.02));
  }
}

function getPrincipleFocusY(principle, renderHeight) {
  switch (principle.key) {
    case GESTALT_PRINCIPLES.balance.key:
    case GESTALT_PRINCIPLES.pattern.key:
      return renderHeight * 0.5;
    case GESTALT_PRINCIPLES.emphasis.key:
      return renderHeight * 0.38;
    case GESTALT_PRINCIPLES.movement.key:
      return renderHeight * 0.44;
    case GESTALT_PRINCIPLES.proportion.key:
      return renderHeight * 0.382;
    default:
      return renderHeight * lerp(0.3, 0.7, noise(renderHeight * 0.0006, currentChaosLevel * 0.03));
  }
}

function getPrincipleAxisPoint(principle, progress, band, renderWidth, renderHeight, focusX, focusY) {
  switch (principle.key) {
    case GESTALT_PRINCIPLES.balance.key:
      return { x: renderWidth * (0.12 + progress * 0.76), y: lerp(renderHeight * 0.24, renderHeight * 0.76, band) };
    case GESTALT_PRINCIPLES.gradations.key:
      return { x: renderWidth * (0.14 + progress * 0.72), y: renderHeight * (0.18 + progress * 0.56 + band * 0.14) };
    case GESTALT_PRINCIPLES.movement.key:
      return { x: renderWidth * (0.08 + progress * 0.84), y: renderHeight * (0.16 + progress * 0.52 + band * 0.22) };
    case GESTALT_PRINCIPLES.pattern.key:
      return { x: renderWidth * (0.12 + progress * 0.76), y: renderHeight * (0.18 + ((band * 8) % 1) * 0.64) };
    case GESTALT_PRINCIPLES.emphasis.key:
      return { x: lerp(renderWidth * 0.16, focusX, progress), y: lerp(renderHeight * (0.18 + band * 0.5), focusY, 0.35) };
    default:
      return { x: renderWidth * (0.12 + progress * 0.76), y: renderHeight * (0.18 + band * 0.64) };
  }
}

function getPrinciplePlacement(principle, index, count, renderWidth, renderHeight, marginX, marginY, focusX, focusY) {
  const progress = index / max(1, count - 1);

  switch (principle.key) {
    case GESTALT_PRINCIPLES.balance.key:
      return {
        x: renderWidth * (index % 2 === 0 ? 0.34 : 0.66) + random(-renderWidth * 0.06, renderWidth * 0.06),
        y: lerp(marginY * 1.3, renderHeight - marginY * 1.3, progress),
      };
    case GESTALT_PRINCIPLES.rhythm.key:
      return {
        x: lerp(marginX * 1.3, renderWidth - marginX * 1.3, progress),
        y: renderHeight * (0.48 + sin(progress * TWO_PI * 2) * 0.16),
      };
    case GESTALT_PRINCIPLES.movement.key:
      return {
        x: lerp(marginX * 1.2, renderWidth - marginX * 1.2, progress),
        y: lerp(marginY * 1.2, renderHeight - marginY * 1.2, progress) + random(-renderHeight * 0.08, renderHeight * 0.08),
      };
    case GESTALT_PRINCIPLES.pattern.key:
      return {
        x: marginX + ((index % 4) + 0.5) * ((renderWidth - marginX * 2) / 4),
        y: marginY + (floor(index / 4) + 0.5) * ((renderHeight - marginY * 2) / ceil(count / 4)),
      };
    case GESTALT_PRINCIPLES.emphasis.key:
      return {
        x: index === 0 ? focusX : lerp(focusX, random(marginX, renderWidth - marginX), 0.58 + progress * 0.28),
        y: index === 0 ? focusY : lerp(focusY, random(marginY, renderHeight - marginY), 0.58 + progress * 0.28),
      };
    case GESTALT_PRINCIPLES.proportion.key:
      return {
        x: marginX + (renderWidth - marginX * 2) * (0.382 + (progress - 0.5) * 0.34),
        y: marginY + (renderHeight - marginY * 2) * (0.618 - (progress - 0.5) * 0.28),
      };
    default:
      return {
        x: lerp(marginX * 1.2, renderWidth - marginX * 1.2, progress),
        y: lerp(marginY * 1.3, renderHeight - marginY * 1.3, noise(index * 0.31, seedValue * 0.0002)),
      };
  }
}

function getPrincipleRotation(principle, progress, chaos) {
  switch (principle.key) {
    case GESTALT_PRINCIPLES.balance.key:
    case GESTALT_PRINCIPLES.unityHarmony.key:
      return random(-0.08, 0.08) + chaos * 0.12;
    case GESTALT_PRINCIPLES.movement.key:
      return -0.42 + progress * 0.84 + chaos * 0.18;
    case GESTALT_PRINCIPLES.variety.key:
      return random(-0.7, 0.7) * (0.7 + chaos * 0.4);
    default:
      return random(-0.28, 0.28) + chaos * 0.22;
  }
}

function getTextureProgress(principle, column, row, columns, rows) {
  const x = column / max(1, columns - 1);
  const y = row / max(1, rows - 1);

  switch (principle.key) {
    case GESTALT_PRINCIPLES.gradations.key:
      return (x + y) * 0.5;
    case GESTALT_PRINCIPLES.balance.key:
      return 1 - abs(x - 0.5) * 1.8;
    case GESTALT_PRINCIPLES.pattern.key:
      return ((column + row) % 4) / 4;
    case GESTALT_PRINCIPLES.rhythm.key:
      return (sin(x * TWO_PI * 4) + 1) * 0.5;
    case GESTALT_PRINCIPLES.emphasis.key:
      return 1 - constrain(dist(x, y, 0.68, 0.38) / 0.9, 0, 1);
    default:
      return noise(column * 0.18, row * 0.18);
  }
}

function getValueAlpha(principle, progress) {
  switch (principle.key) {
    case GESTALT_PRINCIPLES.gradations.key:
      return progress;
    case GESTALT_PRINCIPLES.balance.key:
      return 1 - abs(progress - 0.5) * 2;
    case GESTALT_PRINCIPLES.emphasis.key:
      return progress > 0.66 ? 1 : progress * 0.6;
    default:
      return 0.35 + progress * 0.65;
  }
}

// Study dispatcher. Keep each study renderer self-contained so visual tuning stays local.
function renderStudy(study, target, renderPalette, renderWidth, renderHeight, renderSeed, artPreset) {
  const activeArtworkView = getCurrentArtworkView();
  if (activeArtworkView.key === ARTWORK_VIEWS.blank.key) {
    return;
  }

  switch (study.key) {
    case STUDIES.blank.key:
      return;
    case STUDIES.fieldLines.key:
      renderFieldLinesStudy(target, renderPalette, renderWidth, renderHeight, renderSeed, artPreset);
      return;
    case STUDIES.swissGrid.key:
      renderSwissGrid(target, renderPalette, renderWidth, renderHeight, renderSeed, artPreset);
      return;
    case STUDIES.weingartDisruption.key:
      renderWeingartDisruption(target, renderPalette, renderWidth, renderHeight, renderSeed, artPreset);
      return;
    case STUDIES.halftoneField.key:
      renderHalftoneField(target, renderPalette, renderWidth, renderHeight, renderSeed, artPreset);
      return;
    case STUDIES.diagonalPlanes.key:
      renderDiagonalPlanes(target, renderPalette, renderWidth, renderHeight, renderSeed, artPreset);
      return;
    case STUDIES.signalLines.key:
      renderSignalLines(target, renderPalette, renderWidth, renderHeight, renderSeed, artPreset);
      return;
    default:
      return;
  }
}

function renderFieldLinesStudy(target, renderPalette, renderWidth, renderHeight, renderSeed, artPreset) {
  const activeArtworkView = getCurrentArtworkView();

  if (activeArtworkView.key === ARTWORK_VIEWS.artwork.key || activeArtworkView.key === ARTWORK_VIEWS.atmosphereOnly.key) {
    drawAtmosphere(target, renderPalette, renderWidth, renderHeight, artPreset);
  }

  if (activeArtworkView.key === ARTWORK_VIEWS.artwork.key || activeArtworkView.key === ARTWORK_VIEWS.linesOnly.key) {
    drawFlowField(target, renderPalette, renderWidth, renderHeight, artPreset);
  }

  if (activeArtworkView.key === ARTWORK_VIEWS.artwork.key || activeArtworkView.key === ARTWORK_VIEWS.contoursOnly.key) {
    drawContours(target, renderPalette, renderWidth, renderHeight, renderSeed, artPreset);
  }

  if (activeArtworkView.key === ARTWORK_VIEWS.artwork.key) {
    applyCompositionBiasVeil(target, renderPalette, renderWidth, renderHeight);
  }
}

function drawAtmosphere(target, renderPalette, renderWidth, renderHeight, artPreset) {
  target.noStroke();

  for (let index = 0; index < artPreset.atmosphereCount; index += 1) {
    const cx = random(renderWidth * 0.1, renderWidth * 0.9);
    const cy = random(renderHeight * 0.1, renderHeight * 0.9);
    const radius = random(renderWidth * 0.08, renderWidth * 0.22);
    const tint = target.color(random(renderPalette.lines));
    const quietStrength = getBiasQuietStrength(cx, cy, renderWidth, renderHeight);
    tint.setAlpha(artPreset.atmosphereAlpha * lerp(1, 0.45, quietStrength));
    target.fill(tint);
    target.circle(cx, cy, radius * 2);
  }
}

function drawFlowField(target, renderPalette, renderWidth, renderHeight, artPreset) {
  target.noFill();

  const marginX = renderWidth * 0.08;
  const marginY = renderHeight * 0.1;
  const rowCount = artPreset.rowCount; // Change line density here.
  const stepsPerLine = artPreset.stepsPerLine;
  const xStep = (renderWidth - marginX * 2) / (stepsPerLine - 1);
  const yStep = (renderHeight - marginY * 2) / (rowCount - 1);
  const noiseScale = artPreset.flowNoiseScale; // Change noise scale here.
  const amplitude = renderHeight * artPreset.amplitudeFactor;
  const strokeWeightBase = map(renderWidth, 2160, 3840, artPreset.strokeWeightMin, artPreset.strokeWeightMax, true); // Change stroke weight here.

  for (let row = 0; row < rowCount; row += 1) {
    const tone = target.color(renderPalette.lines[row % renderPalette.lines.length]);
    const baseAlpha = row % 7 === 0 ? artPreset.strongLineAlpha : artPreset.softLineAlpha;
    let previousPoint = null;

    for (let step = 0; step < stepsPerLine; step += 1) {
      const x = marginX + step * xStep;
      const baseY = marginY + row * yStep;
      const field = noise(x * noiseScale, baseY * noiseScale, row * 0.025);
      const drift = sin(field * TWO_PI * 2.0 + row * 0.18) * amplitude;
      const lift = map(noise(x * noiseScale * 0.5, row * 0.04), 0, 1, -amplitude * 0.7, amplitude * 0.7);
      const point = { x, y: baseY + drift + lift };

      if (previousPoint) {
        const midX = (previousPoint.x + point.x) * 0.5;
        const midY = (previousPoint.y + point.y) * 0.5;
        const quietStrength = getBiasQuietStrength(midX, midY, renderWidth, renderHeight);
        const shouldSkipSegment = quietStrength > 0.2 && noise(midX * 0.0021, midY * 0.0023, row * 0.09) < quietStrength * 0.16;

        if (!shouldSkipSegment) {
          const segmentTone = target.color(tone);
          segmentTone.setAlpha(baseAlpha * lerp(1, 0.38, quietStrength));
          target.stroke(segmentTone);
          target.strokeWeight((strokeWeightBase + row * 0.003) * lerp(1, 0.76, quietStrength));
          target.line(previousPoint.x, previousPoint.y, point.x, point.y);
        }
      }

      previousPoint = point;
    }
  }
}

function drawContours(target, renderPalette, renderWidth, renderHeight, renderSeed, artPreset) {
  target.noFill();
  const contourCount = artPreset.contourCount;
  const noiseScale = artPreset.contourNoiseScale;
  const centerX = renderWidth * random(artPreset.contourCenterMin, artPreset.contourCenterMax);
  const centerY = renderHeight * random(artPreset.contourCenterMin, artPreset.contourCenterMax);
  const maxRadius = min(renderWidth, renderHeight) * 0.34;

  for (let index = 0; index < contourCount; index += 1) {
    const progress = index / (contourCount - 1);
    const tone = target.color(index % 3 === 0 ? renderPalette.accent : random(renderPalette.lines));
    const quietStrength = getBiasQuietStrength(centerX, centerY, renderWidth, renderHeight);
    tone.setAlpha((index % 3 === 0 ? artPreset.contourAccentAlpha : artPreset.contourLineAlpha) * lerp(1, 0.52, quietStrength));
    target.stroke(tone);
    target.strokeWeight((artPreset.contourWeightStart + progress * artPreset.contourWeightEnd) * lerp(1, 0.82, quietStrength));
    target.beginShape();

    for (let angle = 0; angle <= TWO_PI + 0.05; angle += TWO_PI / 220) {
      const radialNoise = noise(
        cos(angle) * noiseScale * maxRadius + index * 0.1,
        sin(angle) * noiseScale * maxRadius + renderSeed * 0.0001,
        progress * 2.0
      );
      const radius = maxRadius * (0.18 + progress * 0.82) + map(radialNoise, 0, 1, -maxRadius * 0.08, maxRadius * 0.08);
      const x = centerX + cos(angle) * radius;
      const y = centerY + sin(angle) * radius * random(artPreset.contourStretchMin, artPreset.contourStretchMax);
      target.curveVertex(x, y);
    }

    target.endShape(CLOSE);
  }
}

function getBiasQuietStrength(x, y, renderWidth, renderHeight) {
  if (currentStudyKey !== STUDIES.fieldLines.key) {
    return 0;
  }

  const bias = getCurrentCompositionBias();
  if (bias.key === COMPOSITION_BIASES.balanced.key) {
    return 0;
  }

  const normalizedX = constrain(x / renderWidth, 0, 1);
  const normalizedY = constrain(y / renderHeight, 0, 1);

  if (bias.key === COMPOSITION_BIASES.leftQuiet.key) {
    return smoothZoneStrength(normalizedX, 0.06, 0.38);
  }

  if (bias.key === COMPOSITION_BIASES.rightQuiet.key) {
    return smoothZoneStrength(1 - normalizedX, 0.06, 0.38);
  }

  const horizontal = 1 - constrain(abs(normalizedX - 0.5) / 0.21, 0, 1);
  const vertical = 1 - constrain(abs(normalizedY - 0.42) / 0.24, 0, 1);
  return smoothstep(0, 1, horizontal * vertical);
}

function smoothZoneStrength(value, start, end) {
  return 1 - smoothstep(start, end, value);
}

function smoothstep(edge0, edge1, value) {
  const t = constrain((value - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function applyCompositionBiasVeil(target, renderPalette, renderWidth, renderHeight) {
  const bias = getCurrentCompositionBias();
  if (bias.key === COMPOSITION_BIASES.balanced.key) {
    return;
  }

  const veilColor = target.color(renderPalette.background);
  target.noStroke();

  if (bias.key === COMPOSITION_BIASES.leftQuiet.key) {
    veilColor.setAlpha(34);
    target.fill(veilColor);
    target.rect(renderWidth * 0.04, renderHeight * 0.08, renderWidth * 0.32, renderHeight * 0.8, 32);
    veilColor.setAlpha(18);
    target.fill(veilColor);
    target.rect(renderWidth * 0.12, renderHeight * 0.14, renderWidth * 0.18, renderHeight * 0.68, 28);
    return;
  }

  if (bias.key === COMPOSITION_BIASES.rightQuiet.key) {
    veilColor.setAlpha(34);
    target.fill(veilColor);
    target.rect(renderWidth * 0.64, renderHeight * 0.08, renderWidth * 0.32, renderHeight * 0.8, 32);
    veilColor.setAlpha(18);
    target.fill(veilColor);
    target.rect(renderWidth * 0.7, renderHeight * 0.14, renderWidth * 0.18, renderHeight * 0.68, 28);
    return;
  }

  veilColor.setAlpha(36);
  target.fill(veilColor);
  target.rect(renderWidth * 0.33, renderHeight * 0.16, renderWidth * 0.34, renderHeight * 0.52, 36);
  veilColor.setAlpha(18);
  target.fill(veilColor);
  target.rect(renderWidth * 0.4, renderHeight * 0.2, renderWidth * 0.2, renderHeight * 0.42, 28);
}

// Swiss grid study: disciplined modular composition with quiet type zones and subtle production marks.
function renderSwissGrid(target, renderPalette, renderWidth, renderHeight, renderSeed, artPreset) {
  const isLandscape = renderWidth > renderHeight * 1.08;
  const isPortrait = renderHeight > renderWidth * 1.08;
  const marginX = renderWidth * (isLandscape ? 0.092 : isPortrait ? 0.11 : 0.102);
  const marginY = renderHeight * (isPortrait ? 0.092 : 0.108);
  const cols = isLandscape ? 14 : isPortrait ? 10 : 12;
  const rows = isPortrait ? 14 : 12;
  const colWidth = (renderWidth - marginX * 2) / cols;
  const rowHeight = (renderHeight - marginY * 2) / rows;
  const thinWeight = max(1, renderWidth * 0.00034);
  const strongWeight = max(1.2, renderWidth * 0.0007);
  const accentWeight = max(1.4, renderWidth * 0.00095);
  const template = getSwissGridTemplate();
  const dominantAxis = snapSwissGridAxis(template.dominantAxis, cols, rows);
  const axisPlane = snapSwissGridRect(template.axisPlane, cols, rows);
  const quietZone = snapSwissGridRect(template.quietZone, cols, rows);
  const blocks = template.blocks.map((block) => ({
    ...snapSwissGridRect(block, cols, rows),
    tone: block.tone,
    alpha: block.alpha,
  }));
  const rules = template.rules.map((rule) => ({
    ...snapSwissGridRule(rule, cols, rows),
    tone: rule.tone,
    alpha: rule.alpha,
    weight: rule.weight,
  }));
  const indexBand = snapSwissGridRect(template.indexBand, cols, rows);
  const majorColumnStep = isPortrait ? 2 : 3;
  const majorRowStep = 3;

  const minorTone = target.color(renderPalette.lines[2]);
  const majorTone = target.color(renderPalette.lines[1]);
  const structuralTone = target.color(renderPalette.lines[0]);
  minorTone.setAlpha(18);
  majorTone.setAlpha(36);
  structuralTone.setAlpha(78);

  target.strokeWeight(thinWeight);
  for (let col = 0; col <= cols; col += 1) {
    const x = marginX + col * colWidth;
    const lineTone = target.color(col % majorColumnStep === 0 ? majorTone : minorTone);
    target.stroke(lineTone);
    target.line(x, marginY, x, renderHeight - marginY);
  }

  for (let row = 0; row <= rows; row += 1) {
    const y = marginY + row * rowHeight;
    const lineTone = target.color(row % majorRowStep === 0 ? majorTone : minorTone);
    target.stroke(lineTone);
    target.line(marginX, y, renderWidth - marginX, y);
  }

  const axisPlaneTone = target.color(
    template.axisPlane.tone === "accent" ? renderPalette.accent : renderPalette.lines[template.axisPlane.tone === "line0" ? 0 : 1]
  );
  axisPlaneTone.setAlpha(template.axisPlane.alpha);
  target.noStroke();
  target.fill(axisPlaneTone);
  target.rect(marginX + axisPlane.x * colWidth, marginY + axisPlane.y * rowHeight, axisPlane.w * colWidth, axisPlane.h * rowHeight);

  target.noStroke();
  for (const block of blocks) {
    const fillTone = target.color(
      block.tone === "accent" ? renderPalette.accent : renderPalette.lines[block.tone === "line0" ? 0 : block.tone === "line1" ? 1 : 2]
    );
    fillTone.setAlpha(block.alpha);
    target.fill(fillTone);
    target.rect(marginX + block.x * colWidth, marginY + block.y * rowHeight, block.w * colWidth, block.h * rowHeight);
  }

  const axisTone = target.color(template.dominantAxis.tone === "accent" ? renderPalette.accent : renderPalette.lines[0]);
  axisTone.setAlpha(template.dominantAxis.alpha);
  target.stroke(axisTone);
  target.strokeWeight(template.dominantAxis.weight === "accent" ? accentWeight : strongWeight);
  target.line(
    marginX + dominantAxis.x1 * colWidth,
    marginY + dominantAxis.y1 * rowHeight,
    marginX + dominantAxis.x2 * colWidth,
    marginY + dominantAxis.y2 * rowHeight
  );

  const quietRuleTone = target.color(structuralTone);
  quietRuleTone.setAlpha(112);
  target.stroke(quietRuleTone);
  target.strokeWeight(strongWeight);
  target.line(
    marginX + quietZone.x * colWidth,
    marginY + quietZone.y * rowHeight,
    marginX + (quietZone.x + quietZone.w) * colWidth,
    marginY + quietZone.y * rowHeight
  );
  target.line(
    marginX + quietZone.x * colWidth,
    marginY + (quietZone.y + quietZone.h) * rowHeight,
    marginX + (quietZone.x + quietZone.w) * colWidth,
    marginY + (quietZone.y + quietZone.h) * rowHeight
  );

  for (const rule of rules) {
    const tone = target.color(rule.tone === "accent" ? renderPalette.accent : renderPalette.lines[rule.tone === "line0" ? 0 : 1]);
    tone.setAlpha(rule.alpha);
    target.stroke(tone);
    target.strokeWeight(rule.weight === "accent" ? accentWeight : strongWeight);
    target.line(
      marginX + rule.x1 * colWidth,
      marginY + rule.y1 * rowHeight,
      marginX + rule.x2 * colWidth,
      marginY + rule.y2 * rowHeight
    );
  }

  drawSwissGridAlignmentMarks(
    target,
    renderPalette,
    marginX,
    marginY,
    renderWidth,
    renderHeight,
    colWidth,
    rowHeight,
    dominantAxis,
    quietZone,
    indexBand,
    strongWeight
  );

  drawSwissGridIndexBand(target, renderPalette, marginX, marginY, colWidth, rowHeight, dominantAxis, indexBand, thinWeight);
}

function getSwissGridTemplate() {
  const templates = [
    {
      dominantAxis: { x1: 0.5, y1: 0.1, x2: 0.5, y2: 0.86, tone: "line0", alpha: 138, weight: "strong" },
      axisPlane: { x: 0.56, y: 0.12, w: 0.24, h: 0.6, tone: "line0", alpha: 10 },
      quietZone: { x: 0.08, y: 0.18, w: 0.28, h: 0.46 },
      blocks: [
        { x: 0.56, y: 0.12, w: 0.26, h: 0.26, tone: "line1", alpha: 34 },
        { x: 0.62, y: 0.42, w: 0.2, h: 0.3, tone: "line2", alpha: 22 },
        { x: 0.5, y: 0.76, w: 0.34, h: 0.05, tone: "accent", alpha: 84 },
      ],
      rules: [
        { x1: 0.5, y1: 0.12, x2: 0.84, y2: 0.12, tone: "line0", alpha: 118, weight: "strong" },
        { x1: 0.56, y1: 0.4, x2: 0.84, y2: 0.4, tone: "line1", alpha: 78, weight: "strong" },
        { x1: 0.18, y1: 0.68, x2: 0.5, y2: 0.68, tone: "line1", alpha: 74, weight: "strong" },
      ],
      indexBand: { x: 0.56, y: 0.84, w: 0.12, h: 0.03 },
    },
    {
      dominantAxis: { x1: 0.44, y1: 0.12, x2: 0.44, y2: 0.84, tone: "line0", alpha: 132, weight: "strong" },
      axisPlane: { x: 0.1, y: 0.14, w: 0.28, h: 0.58, tone: "line0", alpha: 9 },
      quietZone: { x: 0.56, y: 0.18, w: 0.24, h: 0.48 },
      blocks: [
        { x: 0.1, y: 0.14, w: 0.28, h: 0.22, tone: "line0", alpha: 30 },
        { x: 0.16, y: 0.44, w: 0.22, h: 0.28, tone: "line2", alpha: 20 },
        { x: 0.1, y: 0.78, w: 0.34, h: 0.05, tone: "accent", alpha: 82 },
      ],
      rules: [
        { x1: 0.1, y1: 0.14, x2: 0.44, y2: 0.14, tone: "line0", alpha: 116, weight: "strong" },
        { x1: 0.1, y1: 0.38, x2: 0.44, y2: 0.38, tone: "line1", alpha: 74, weight: "strong" },
        { x1: 0.44, y1: 0.72, x2: 0.78, y2: 0.72, tone: "line1", alpha: 76, weight: "strong" },
      ],
      indexBand: { x: 0.22, y: 0.84, w: 0.12, h: 0.03 },
    },
    {
      dominantAxis: { x1: 0.16, y1: 0.62, x2: 0.84, y2: 0.62, tone: "accent", alpha: 116, weight: "accent" },
      axisPlane: { x: 0.5, y: 0.38, w: 0.3, h: 0.14, tone: "line1", alpha: 10 },
      quietZone: { x: 0.12, y: 0.18, w: 0.3, h: 0.34 },
      blocks: [
        { x: 0.56, y: 0.12, w: 0.2, h: 0.2, tone: "accent", alpha: 68 },
        { x: 0.5, y: 0.38, w: 0.3, h: 0.14, tone: "line1", alpha: 24 },
        { x: 0.58, y: 0.68, w: 0.22, h: 0.14, tone: "line2", alpha: 18 },
      ],
      rules: [
        { x1: 0.14, y1: 0.14, x2: 0.78, y2: 0.14, tone: "line0", alpha: 112, weight: "strong" },
        { x1: 0.5, y1: 0.12, x2: 0.5, y2: 0.52, tone: "line1", alpha: 72, weight: "strong" },
        { x1: 0.14, y1: 0.74, x2: 0.42, y2: 0.74, tone: "line1", alpha: 74, weight: "strong" },
      ],
      indexBand: { x: 0.6, y: 0.56, w: 0.14, h: 0.03 },
    },
    {
      dominantAxis: { x1: 0.24, y1: 0.16, x2: 0.24, y2: 0.82, tone: "line0", alpha: 128, weight: "strong" },
      axisPlane: { x: 0.1, y: 0.18, w: 0.22, h: 0.56, tone: "line0", alpha: 10 },
      quietZone: { x: 0.5, y: 0.2, w: 0.26, h: 0.32 },
      blocks: [
        { x: 0.1, y: 0.18, w: 0.22, h: 0.3, tone: "line1", alpha: 28 },
        { x: 0.1, y: 0.58, w: 0.16, h: 0.16, tone: "line2", alpha: 16 },
        { x: 0.46, y: 0.72, w: 0.34, h: 0.06, tone: "accent", alpha: 84 },
      ],
      rules: [
        { x1: 0.1, y1: 0.16, x2: 0.38, y2: 0.16, tone: "line0", alpha: 112, weight: "strong" },
        { x1: 0.46, y1: 0.2, x2: 0.8, y2: 0.2, tone: "line1", alpha: 72, weight: "strong" },
        { x1: 0.46, y1: 0.56, x2: 0.8, y2: 0.56, tone: "line1", alpha: 72, weight: "strong" },
      ],
      indexBand: { x: 0.1, y: 0.82, w: 0.12, h: 0.03 },
    },
  ];

  return templates[floor(random(templates.length))];
}

function snapSwissGridRect(rect, cols, rows) {
  const startX = constrain(floor(rect.x * cols), 0, cols - 1);
  const startY = constrain(floor(rect.y * rows), 0, rows - 1);
  const widthModules = constrain(round(rect.w * cols), 1, cols - startX);
  const heightModules = constrain(round(rect.h * rows), 1, rows - startY);
  return {
    x: startX,
    y: startY,
    w: widthModules,
    h: heightModules,
  };
}

function snapSwissGridRule(rule, cols, rows) {
  return {
    x1: constrain(round(rule.x1 * cols), 0, cols),
    y1: constrain(round(rule.y1 * rows), 0, rows),
    x2: constrain(round(rule.x2 * cols), 0, cols),
    y2: constrain(round(rule.y2 * rows), 0, rows),
  };
}

function snapSwissGridAxis(axis, cols, rows) {
  return {
    x1: constrain(round(axis.x1 * cols), 0, cols),
    y1: constrain(round(axis.y1 * rows), 0, rows),
    x2: constrain(round(axis.x2 * cols), 0, cols),
    y2: constrain(round(axis.y2 * rows), 0, rows),
  };
}

function drawSwissGridAlignmentMarks(target, renderPalette, marginX, marginY, renderWidth, renderHeight, colWidth, rowHeight, dominantAxis, quietZone, indexBand, weight) {
  const markTone = target.color(renderPalette.accent);
  markTone.setAlpha(124);
  const subtleTone = target.color(renderPalette.lines[0]);
  subtleTone.setAlpha(94);
  const secondaryTone = target.color(renderPalette.lines[1]);
  secondaryTone.setAlpha(76);
  const shortMark = min(colWidth, rowHeight) * 0.42;
  const axisIsVertical = dominantAxis.x1 === dominantAxis.x2;

  target.stroke(subtleTone);
  target.strokeWeight(weight);
  if (axisIsVertical) {
    const axisX = marginX + dominantAxis.x1 * colWidth;
    target.line(axisX, marginY - shortMark * 0.3, axisX, marginY + shortMark * 0.95);
    target.line(axisX, renderHeight - marginY - shortMark * 0.95, axisX, renderHeight - marginY + shortMark * 0.3);
    target.line(marginX, marginY, marginX + shortMark, marginY);
  } else {
    const axisY = marginY + dominantAxis.y1 * rowHeight;
    target.line(marginX - shortMark * 0.2, axisY, marginX + shortMark * 0.95, axisY);
    target.line(renderWidth - marginX - shortMark * 0.95, axisY, renderWidth - marginX + shortMark * 0.2, axisY);
    target.line(renderWidth - marginX, renderHeight - marginY - shortMark, renderWidth - marginX, renderHeight - marginY);
  }

  target.stroke(markTone);
  target.strokeWeight(max(1, weight * 0.72));
  target.line(
    marginX + quietZone.x * colWidth,
    marginY - shortMark * 0.45,
    marginX + quietZone.x * colWidth,
    marginY + shortMark * 0.65
  );
  target.line(
    marginX + (quietZone.x + quietZone.w) * colWidth,
    marginY - shortMark * 0.45,
    marginX + (quietZone.x + quietZone.w) * colWidth,
    marginY + shortMark * 0.65
  );
  target.line(
    marginX + indexBand.x * colWidth,
    marginY + (indexBand.y + indexBand.h) * rowHeight,
    marginX + indexBand.x * colWidth,
    marginY + (indexBand.y + indexBand.h) * rowHeight + shortMark * 0.6
  );

  target.stroke(secondaryTone);
  if (axisIsVertical) {
    const axisX = marginX + dominantAxis.x1 * colWidth;
    target.line(axisX - shortMark * 0.5, marginY + shortMark * 0.7, axisX, marginY + shortMark * 0.7);
  } else {
    const axisY = marginY + dominantAxis.y1 * rowHeight;
    target.line(renderWidth - marginX - shortMark * 0.7, axisY - shortMark * 0.4, renderWidth - marginX - shortMark * 0.7, axisY);
  }
}

function drawSwissGridIndexBand(target, renderPalette, marginX, marginY, colWidth, rowHeight, dominantAxis, indexBand, weight) {
  const markerTone = target.color(renderPalette.accent);
  const secondaryTone = target.color(renderPalette.lines[1]);
  const structuralTone = target.color(renderPalette.lines[0]);
  markerTone.setAlpha(164);
  secondaryTone.setAlpha(82);
  structuralTone.setAlpha(108);
  const axisIsVertical = dominantAxis.x1 === dominantAxis.x2;
  const segmentCount = axisIsVertical ? max(2, min(4, indexBand.w)) : max(3, min(5, indexBand.w));
  const gap = colWidth * 0.18;
  const segmentWidth = (indexBand.w * colWidth - gap * (segmentCount - 1)) / segmentCount;
  const bandX = marginX + indexBand.x * colWidth;
  const bandY = marginY + indexBand.y * rowHeight;
  const bandHeight = max(weight * 4.5, rowHeight * 0.22);

  target.noStroke();
  for (let index = 0; index < segmentCount; index += 1) {
    target.fill(index === 0 ? markerTone : index === segmentCount - 1 ? structuralTone : secondaryTone);
    target.rect(bandX + index * (segmentWidth + gap), bandY, segmentWidth, bandHeight);
  }
}

// Weingart-inspired study: disciplined structure with diagonal interruptions and broken rhythm.
function renderWeingartDisruption(target, renderPalette, renderWidth, renderHeight, renderSeed, artPreset) {
  const isLandscape = renderWidth > renderHeight * 1.08;
  const marginX = renderWidth * (isLandscape ? 0.078 : 0.092);
  const marginY = renderHeight * 0.095;
  const presetDensity = currentArtPresetKey === "highContrastPrint" ? 1 : currentArtPresetKey === "eveningSignal" ? 0.92 : currentArtPresetKey === "archiveWarmth" ? 0.78 : 0.7;
  const accentStrength = currentArtPresetKey === "highContrastPrint" ? 1 : currentArtPresetKey === "eveningSignal" ? 0.86 : 0.5;
  const proofMode = getCurrentProofMode().key;
  const templates = [
    {
      cols: 15,
      rows: 10,
      quietZone: { x: 1.1, y: 1.0, w: 4.1, h: 5.2 },
      denseGridPatches: [
        { x: 8.2, y: 0.9, w: 4.4, h: 3.4, angle: -0.18, alpha: 86 },
        { x: 9.0, y: 4.9, w: 3.6, h: 2.6, angle: -0.08, alpha: 74 },
      ],
      eventPlanes: [
        { x: 7.6, y: -0.2, w: 7.8, h: 1.85, angle: -0.22, tone: "dark", alpha: 112 },
        { x: 9.0, y: 4.8, w: 4.0, h: 1.55, angle: -0.06, tone: "mid", alpha: 46 },
        { x: 8.4, y: 3.8, w: 4.6, h: 2.0, angle: 0.14, tone: "light", alpha: 30 },
      ],
      rupture: [
        [7.8, 1.2],
        [14.8, -0.2],
        [11.8, 3.2],
        [8.6, 2.2],
      ],
      halftone: { x: 9.5, y: 4.35, w: 3.6, h: 2.9, angle: -0.06, cols: 28, rows: 16, alpha: 96 },
      stripeField: { x: 8.6, y: 1.4, w: 4.2, h: 2.2, angle: -0.2, density: 20, alpha: 108 },
      rules: [
        { x1: 8.1, y1: 1.0, x2: 13.1, y2: 1.0, alpha: 92, weight: "thin" },
        { x1: 8.8, y1: 3.7, x2: 8.8, y2: 7.4, alpha: 96, weight: "thin" },
        { x1: 2.4, y1: 1.4, x2: 14.2, y2: 7.8, alpha: 144, weight: "heavy", accent: true },
      ],
      indexBand: { x: 1.0, y: 0.65, w: 1.0, h: 0.28 },
      accentAllowed: true,
    },
    {
      cols: 14,
      rows: 11,
      quietZone: { x: 9.0, y: 1.0, w: 3.3, h: 4.8 },
      denseGridPatches: [
        { x: 1.5, y: 2.0, w: 4.8, h: 3.1, angle: 0.18, alpha: 84 },
        { x: 2.6, y: 5.4, w: 4.0, h: 2.7, angle: -0.12, alpha: 68 },
      ],
      eventPlanes: [
        { x: -0.3, y: 4.8, w: 7.4, h: 2.0, angle: -0.34, tone: "dark", alpha: 104 },
        { x: 1.3, y: 1.9, w: 5.0, h: 1.75, angle: 0.22, tone: "mid", alpha: 44 },
        { x: 6.9, y: 6.4, w: 5.2, h: 1.4, angle: 0.12, tone: "light", alpha: 30 },
      ],
      rupture: [
        [0.8, 6.1],
        [7.2, 2.5],
        [8.7, 4.9],
        [2.1, 7.8],
      ],
      halftone: { x: 2.8, y: 5.0, w: 3.8, h: 2.8, angle: -0.12, cols: 26, rows: 15, alpha: 92 },
      stripeField: { x: 1.8, y: 2.4, w: 4.2, h: 2.7, angle: 0.2, density: 22, alpha: 102 },
      rules: [
        { x1: 1.3, y1: 1.5, x2: 6.0, y2: 1.5, alpha: 90, weight: "thin" },
        { x1: 7.2, y1: 1.1, x2: 7.2, y2: 8.6, alpha: 96, weight: "thin" },
        { x1: 0.9, y1: 1.9, x2: 12.6, y2: 8.9, alpha: 140, weight: "heavy", accent: true },
      ],
      indexBand: { x: 10.8, y: 8.85, w: 1.0, h: 0.28 },
      accentAllowed: false,
    },
    {
      cols: 12,
      rows: 10,
      quietZone: { x: 1.0, y: 1.0, w: 4.0, h: 4.2 },
      denseGridPatches: [
        { x: 6.5, y: 1.2, w: 3.9, h: 2.9, angle: -0.24, alpha: 92 },
        { x: 7.0, y: 5.0, w: 3.5, h: 2.5, angle: -0.04, alpha: 72 },
      ],
      eventPlanes: [
        { x: 6.0, y: 5.8, w: 6.5, h: 1.6, angle: -0.04, tone: "dark", alpha: 110 },
        { x: 6.0, y: 1.0, w: 4.7, h: 1.85, angle: -0.3, tone: "mid", alpha: 46 },
        { x: 7.4, y: 4.6, w: 3.8, h: 2.0, angle: -0.02, tone: "light", alpha: 28 },
      ],
      rupture: [
        [5.7, 3.5],
        [11.2, 1.3],
        [11.4, 5.7],
        [7.3, 6.1],
      ],
      halftone: { x: 7.2, y: 4.6, w: 3.4, h: 2.7, angle: -0.03, cols: 25, rows: 15, alpha: 98 },
      stripeField: { x: 6.9, y: 1.6, w: 3.4, h: 2.3, angle: -0.24, density: 18, alpha: 108 },
      rules: [
        { x1: 6.2, y1: 1.0, x2: 10.4, y2: 1.0, alpha: 94, weight: "thin" },
        { x1: 6.3, y1: 3.9, x2: 10.3, y2: 3.9, alpha: 88, weight: "thin" },
        { x1: 1.8, y1: 2.0, x2: 11.0, y2: 7.9, alpha: 146, weight: "heavy", accent: true },
      ],
      indexBand: { x: 0.8, y: 0.68, w: 0.9, h: 0.28 },
      accentAllowed: true,
    },
    {
      cols: 15,
      rows: 10,
      quietZone: { x: 10.0, y: 1.0, w: 3.1, h: 4.2 },
      denseGridPatches: [
        { x: 2.0, y: 2.2, w: 4.2, h: 2.8, angle: 0.22, alpha: 88 },
        { x: 2.6, y: 5.0, w: 3.6, h: 2.3, angle: -0.08, alpha: 66 },
      ],
      eventPlanes: [
        { x: 0.2, y: 6.0, w: 7.6, h: 1.95, angle: -0.29, tone: "dark", alpha: 108 },
        { x: 1.7, y: 1.9, w: 5.0, h: 1.7, angle: 0.24, tone: "mid", alpha: 44 },
        { x: 7.8, y: 4.1, w: 4.4, h: 2.1, angle: 0.16, tone: "light", alpha: 24 },
      ],
      rupture: [
        [1.0, 5.9],
        [7.0, 1.9],
        [8.5, 3.9],
        [2.2, 7.4],
      ],
      halftone: { x: 2.6, y: 5.0, w: 3.8, h: 2.5, angle: -0.08, cols: 27, rows: 14, alpha: 90 },
      stripeField: { x: 2.0, y: 2.3, w: 4.0, h: 2.4, angle: 0.22, density: 20, alpha: 100 },
      rules: [
        { x1: 2.0, y1: 1.4, x2: 6.4, y2: 1.4, alpha: 92, weight: "thin" },
        { x1: 7.6, y1: 4.1, x2: 7.6, y2: 7.7, alpha: 88, weight: "thin" },
        { x1: 1.2, y1: 2.0, x2: 13.1, y2: 8.2, alpha: 142, weight: "heavy", accent: true },
      ],
      indexBand: { x: 12.0, y: 0.78, w: 1.0, h: 0.28 },
      accentAllowed: false,
    },
    {
      cols: 13,
      rows: 11,
      quietZone: { x: 1.1, y: 1.2, w: 4.0, h: 5.0 },
      denseGridPatches: [
        { x: 6.8, y: 1.4, w: 4.0, h: 3.1, angle: -0.26, alpha: 90 },
        { x: 7.6, y: 5.2, w: 3.6, h: 2.7, angle: 0.06, alpha: 70 },
      ],
      eventPlanes: [
        { x: 7.3, y: 0.2, w: 6.4, h: 1.75, angle: -0.3, tone: "dark", alpha: 116 },
        { x: 8.4, y: 4.7, w: 4.0, h: 1.65, angle: 0.06, tone: "mid", alpha: 42 },
        { x: 7.8, y: 3.5, w: 4.2, h: 2.0, angle: 0.18, tone: "light", alpha: 26 },
      ],
      rupture: [
        [6.9, 1.4],
        [13.0, -0.1],
        [11.2, 3.6],
        [8.0, 2.8],
      ],
      halftone: { x: 8.4, y: 4.6, w: 3.2, h: 3.0, angle: 0.08, cols: 24, rows: 17, alpha: 94 },
      stripeField: { x: 7.4, y: 1.8, w: 3.8, h: 2.5, angle: -0.2, density: 21, alpha: 106 },
      rules: [
        { x1: 7.0, y1: 1.1, x2: 11.4, y2: 1.1, alpha: 90, weight: "thin" },
        { x1: 8.2, y1: 4.0, x2: 8.2, y2: 8.3, alpha: 90, weight: "thin" },
        { x1: 2.0, y1: 1.8, x2: 12.2, y2: 7.9, alpha: 148, weight: "heavy", accent: true },
      ],
      indexBand: { x: 1.0, y: 0.72, w: 0.92, h: 0.28 },
      accentAllowed: true,
    },
  ];

  const template = random(templates);
  const cols = template.cols;
  const rows = template.rows;
  const gridWidth = renderWidth - marginX * 2;
  const gridHeight = renderHeight - marginY * 2;
  const colWidth = gridWidth / cols;
  const rowHeight = gridHeight / rows;
  const hairlineWeight = max(1, renderWidth * 0.00024);
  const ruleWeight = max(1.15, renderWidth * 0.00066);
  const heavyWeight = max(2.4, renderWidth * 0.0021);
  const toX = (value) => marginX + value * colWidth;
  const toY = (value) => marginY + value * rowHeight;
  const gridMinorTone = target.color(renderPalette.lines[2]);
  const gridMajorTone = target.color(renderPalette.lines[1]);
  const ruleTone = target.color(renderPalette.lines[0]);
  const darkTone = target.color(renderPalette.lines[2]);
  const midTone = target.color(renderPalette.lines[0]);
  const lightTone = target.color(renderPalette.lines[1]);
  const accentTone = target.color(renderPalette.accent);
  const backgroundTone = target.color(renderPalette.background);
  const accentEnabled = template.accentAllowed && accentStrength > 0.74;
  const darkBoost = currentArtPresetKey === "highContrastPrint" ? 18 : currentArtPresetKey === "eveningSignal" ? 10 : 0;
  const gridAlphaScale = proofMode === PROOF_MODES.white.key ? 1.15 : proofMode === PROOF_MODES.black.key ? 0.95 : 1;

  gridMinorTone.setAlpha((10 + presetDensity * 8) * gridAlphaScale);
  gridMajorTone.setAlpha((22 + presetDensity * 16) * gridAlphaScale);
  target.strokeWeight(hairlineWeight);
  for (let col = 0; col <= cols; col += 1) {
    const x = marginX + col * colWidth;
    target.stroke(col % 3 === 0 ? gridMajorTone : gridMinorTone);
    target.line(x, marginY, x, renderHeight - marginY);
  }
  for (let row = 0; row <= rows; row += 1) {
    const y = marginY + row * rowHeight;
    target.stroke(row % 3 === 0 ? gridMajorTone : gridMinorTone);
    target.line(marginX, y, renderWidth - marginX, y);
  }

  for (const patch of template.denseGridPatches) {
    target.push();
    target.translate(toX(patch.x), toY(patch.y));
    target.rotate(patch.angle);
    const patchTone = target.color(renderPalette.lines[0]);
    patchTone.setAlpha(patch.alpha * presetDensity);
    target.stroke(patchTone);
    target.strokeWeight(hairlineWeight);
    const patchWidth = patch.w * colWidth;
    const patchHeight = patch.h * rowHeight;
    const stepX = colWidth * 0.36;
    const stepY = rowHeight * 0.36;
    for (let x = 0; x <= patchWidth; x += stepX) {
      target.line(x, 0, x, patchHeight);
    }
    for (let y = 0; y <= patchHeight; y += stepY) {
      target.line(0, y, patchWidth, y);
    }
    target.pop();
  }

  const planeToneFor = (toneKey, alphaValue) => {
    const tone = target.color(toneKey === "dark" ? darkTone : toneKey === "mid" ? midTone : lightTone);
    tone.setAlpha(alphaValue * (toneKey === "dark" ? 1 : presetDensity));
    return tone;
  };

  for (const plane of template.eventPlanes) {
    const alphaValue = plane.tone === "dark" ? plane.alpha + darkBoost : plane.alpha;
    target.push();
    target.translate(toX(plane.x), toY(plane.y));
    target.rotate(plane.angle);
    target.noStroke();
    target.fill(planeToneFor(plane.tone, alphaValue));
    target.rect(0, 0, plane.w * colWidth, plane.h * rowHeight);
    if (plane.tone !== "dark") {
      const edgeTone = target.color(renderPalette.lines[0]);
      edgeTone.setAlpha(56 + presetDensity * 30);
      target.stroke(edgeTone);
      target.strokeWeight(ruleWeight * 0.8);
      target.line(0, plane.h * rowHeight, plane.w * colWidth, plane.h * rowHeight);
    }
    target.pop();
  }

  target.push();
  target.translate(toX(template.stripeField.x), toY(template.stripeField.y));
  target.rotate(template.stripeField.angle);
  const stripeTone = target.color(renderPalette.lines[0]);
  stripeTone.setAlpha(template.stripeField.alpha * presetDensity);
  target.stroke(stripeTone);
  target.strokeWeight(ruleWeight * 0.8);
  const stripeWidth = template.stripeField.w * colWidth;
  const stripeHeight = template.stripeField.h * rowHeight;
  for (let index = 0; index <= template.stripeField.density; index += 1) {
    const y = (index / template.stripeField.density) * stripeHeight;
    const inset = (index % 5) * stripeWidth * 0.03;
    target.line(inset, y, stripeWidth - inset * 0.4, y);
  }
  target.pop();

  target.push();
  target.translate(toX(template.halftone.x), toY(template.halftone.y));
  target.rotate(template.halftone.angle);
  const halftoneTone = target.color(accentEnabled ? renderPalette.accent : renderPalette.lines[1]);
  halftoneTone.setAlpha(template.halftone.alpha * (accentEnabled ? 1 : presetDensity));
  target.noStroke();
  target.fill(halftoneTone);
  const halftoneWidth = template.halftone.w * colWidth;
  const halftoneHeight = template.halftone.h * rowHeight;
  const stepX = halftoneWidth / max(1, template.halftone.cols - 1);
  const stepY = halftoneHeight / max(1, template.halftone.rows - 1);
  for (let row = 0; row < template.halftone.rows; row += 1) {
    for (let col = 0; col < template.halftone.cols; col += 1) {
      const stagger = row % 2 === 0 ? 0 : stepX * 0.4;
      const diameter = min(stepX, stepY) * (0.2 + ((row + col) % 4) * 0.05);
      target.circle(col * stepX + stagger, row * stepY, diameter);
    }
  }
  target.pop();

  backgroundTone.setAlpha(proofMode === PROOF_MODES.black.key ? 62 : 74);
  target.noStroke();
  target.fill(backgroundTone);
  target.beginShape();
  for (const [x, y] of template.rupture) {
    target.vertex(toX(x), toY(y));
  }
  target.endShape(CLOSE);

  const ruptureEdgeTone = target.color(renderPalette.lines[0]);
  ruptureEdgeTone.setAlpha(80 + presetDensity * 26);
  target.stroke(ruptureEdgeTone);
  target.strokeWeight(ruleWeight);
  for (let index = 0; index < template.rupture.length; index += 1) {
    const [x1, y1] = template.rupture[index];
    const [x2, y2] = template.rupture[(index + 1) % template.rupture.length];
    target.line(toX(x1), toY(y1), toX(x2), toY(y2));
  }

  for (const rule of template.rules) {
    const tone = target.color(rule.accent && accentEnabled ? accentTone : renderPalette.lines[0]);
    tone.setAlpha(rule.alpha);
    target.stroke(tone);
    target.strokeWeight(rule.weight === "heavy" ? heavyWeight : ruleWeight);
    target.line(toX(rule.x1), toY(rule.y1), toX(rule.x2), toY(rule.y2));
  }

  const quietMaskTone = target.color(renderPalette.background);
  quietMaskTone.setAlpha(proofMode === PROOF_MODES.black.key ? 48 : 58);
  target.noStroke();
  target.fill(quietMaskTone);
  target.rect(toX(template.quietZone.x), toY(template.quietZone.y), template.quietZone.w * colWidth, template.quietZone.h * rowHeight);

  ruleTone.setAlpha(96 + presetDensity * 22);
  target.stroke(ruleTone);
  target.strokeWeight(ruleWeight);
  target.line(toX(template.quietZone.x), toY(template.quietZone.y), toX(template.quietZone.x + template.quietZone.w), toY(template.quietZone.y));
  target.line(
    toX(template.quietZone.x + template.quietZone.w),
    toY(template.quietZone.y),
    toX(template.quietZone.x + template.quietZone.w),
    toY(template.quietZone.y + template.quietZone.h * 0.72)
  );

  const markerTone = target.color(accentEnabled ? renderPalette.accent : renderPalette.lines[1]);
  const markerSecondaryTone = target.color(renderPalette.lines[0]);
  markerTone.setAlpha(accentEnabled ? 162 : 102);
  markerSecondaryTone.setAlpha(92);
  const bandWidth = template.indexBand.w * colWidth;
  const bandHeight = max(hairlineWeight * 6, template.indexBand.h * rowHeight);
  const bandGap = colWidth * 0.16;
  const bandSegmentCount = 4;
  const bandSegmentWidth = (bandWidth - bandGap * (bandSegmentCount - 1)) / bandSegmentCount;
  target.noStroke();
  for (let index = 0; index < bandSegmentCount; index += 1) {
    target.fill(index === 0 ? markerTone : markerSecondaryTone);
    target.rect(toX(template.indexBand.x) + index * (bandSegmentWidth + bandGap), toY(template.indexBand.y), bandSegmentWidth, bandHeight);
  }
}

function getWeingartDisruptionTemplate() {
  const templates = [
    {
      quietZone: { x: 0.08, y: 0.16, w: 0.26, h: 0.42 },
      dominantPlane: { x: 0.44, y: 0.19, w: 0.46, h: 0.13, angle: -0.22, tone: 0, alpha: 60 },
      offsetPlanes: [
        { x: 0.58, y: 0.38, w: 0.26, h: 0.18, angle: 0.18, tone: 2, alpha: 32 },
        { x: 0.5, y: 0.62, w: 0.32, h: 0.1, angle: -0.08, tone: "accent", alpha: 82 },
      ],
      dominantRule: { x1: 0.16, y1: 0.16, x2: 0.92, y2: 0.74, tone: "accent", alpha: 136, weight: "heavy" },
      counterRule: { x1: 0.54, y1: 0.08, x2: 0.54, y2: 0.82, tone: 1, alpha: 118, weight: "rule" },
      textureFields: [
        { kind: "rules", x: 0.52, y: 0.22, w: 0.24, h: 0.22, angle: -0.22, tone: 1, alpha: 92, density: 20 },
        { kind: "dots", x: 0.6, y: 0.48, w: 0.2, h: 0.16, angle: 0.18, tone: 2, alpha: 80, cols: 20, rows: 11 },
      ],
      indexBand: { x: 0.56, y: 0.78, w: 0.18 },
      useAccentMark: true,
    },
    {
      quietZone: { x: 0.58, y: 0.14, w: 0.22, h: 0.46 },
      dominantPlane: { x: 0.1, y: 0.25, w: 0.46, h: 0.13, angle: 0.2, tone: 1, alpha: 54 },
      offsetPlanes: [
        { x: 0.2, y: 0.5, w: 0.3, h: 0.18, angle: -0.14, tone: 2, alpha: 30 },
        { x: 0.44, y: 0.66, w: 0.26, h: 0.09, angle: 0.12, tone: "accent", alpha: 76 },
      ],
      dominantRule: { x1: 0.1, y1: 0.24, x2: 0.86, y2: 0.8, tone: "accent", alpha: 128, weight: "heavy" },
      counterRule: { x1: 0.18, y1: 0.14, x2: 0.48, y2: 0.14, tone: 0, alpha: 118, weight: "rule" },
      textureFields: [
        { kind: "rules", x: 0.16, y: 0.28, w: 0.24, h: 0.26, angle: 0.2, tone: 0, alpha: 86, density: 20 },
        { kind: "dots", x: 0.3, y: 0.56, w: 0.18, h: 0.16, angle: -0.14, tone: 1, alpha: 76, cols: 18, rows: 11 },
      ],
      indexBand: { x: 0.18, y: 0.82, w: 0.16 },
      useAccentMark: false,
    },
    {
      quietZone: { x: 0.12, y: 0.14, w: 0.28, h: 0.34 },
      dominantPlane: { x: 0.46, y: 0.33, w: 0.38, h: 0.12, angle: -0.28, tone: 0, alpha: 58 },
      offsetPlanes: [
        { x: 0.58, y: 0.18, w: 0.2, h: 0.14, angle: 0.12, tone: 2, alpha: 28 },
        { x: 0.54, y: 0.58, w: 0.28, h: 0.11, angle: -0.06, tone: "accent", alpha: 72 },
      ],
      dominantRule: { x1: 0.16, y1: 0.26, x2: 0.9, y2: 0.72, tone: "accent", alpha: 132, weight: "heavy" },
      counterRule: { x1: 0.48, y1: 0.08, x2: 0.48, y2: 0.8, tone: 1, alpha: 108, weight: "rule" },
      textureFields: [
        { kind: "rules", x: 0.54, y: 0.28, w: 0.2, h: 0.2, angle: -0.28, tone: 1, alpha: 96, density: 16 },
        { kind: "dots", x: 0.6, y: 0.54, w: 0.2, h: 0.14, angle: -0.06, tone: 2, alpha: 80, cols: 20, rows: 9 },
      ],
      indexBand: { x: 0.56, y: 0.76, w: 0.18 },
      useAccentMark: true,
    },
  ];

  return templates[floor(random(templates.length))];
}

function drawWeingartRuleField(target, renderPalette, renderWidth, renderHeight, field, hairlineWeight, ruleWeight) {
  const tone = target.color(field.tone === "accent" ? renderPalette.accent : renderPalette.lines[field.tone]);
  tone.setAlpha(field.alpha);
  const fieldWidth = renderWidth * field.w;
  const fieldHeight = renderHeight * field.h;
  const step = fieldHeight / field.density;
  target.push();
  target.translate(renderWidth * field.x, renderHeight * field.y);
  target.rotate(field.angle);
  target.stroke(tone);
  target.strokeWeight(ruleWeight * 0.72);
  for (let index = 0; index <= field.density; index += 1) {
    const y = index * step;
    const inset = (index % 3) * fieldWidth * 0.06;
    target.line(inset, y, fieldWidth - inset * 0.5, y);
  }
  target.strokeWeight(hairlineWeight);
  target.line(0, 0, 0, fieldHeight);
  target.pop();
}

function drawWeingartDotField(target, renderPalette, renderWidth, renderHeight, field) {
  const tone = target.color(field.tone === "accent" ? renderPalette.accent : renderPalette.lines[field.tone]);
  tone.setAlpha(field.alpha);
  const fieldWidth = renderWidth * field.w;
  const fieldHeight = renderHeight * field.h;
  const xStep = fieldWidth / max(1, field.cols - 1);
  const yStep = fieldHeight / max(1, field.rows - 1);
  target.push();
  target.translate(renderWidth * field.x, renderHeight * field.y);
  target.rotate(field.angle);
  target.noStroke();
  target.fill(tone);
  for (let row = 0; row < field.rows; row += 1) {
    for (let col = 0; col < field.cols; col += 1) {
      const jitter = ((row + col) % 3) * 0.08;
      const size = min(xStep, yStep) * (0.18 + jitter);
      target.circle(col * xStep, row * yStep, size);
    }
  }
  target.pop();
}

// Halftone study: structured dot field with controlled density shifts, not free noise.
function renderHalftoneField(target, renderPalette, renderWidth, renderHeight, renderSeed, artPreset) {
  const spacing = max(10, round(min(renderWidth, renderHeight) * 0.018));
  const toneA = target.color(renderPalette.lines[0]);
  const toneB = target.color(renderPalette.lines[1]);

  for (let y = spacing; y < renderHeight - spacing; y += spacing) {
    for (let x = spacing; x < renderWidth - spacing; x += spacing) {
      const field = noise(x * 0.0024, y * 0.0022, renderSeed * 0.00001);
      const band = sin(x * 0.009 + y * 0.004) * 0.5 + 0.5;
      const radius = map(field * 0.65 + band * 0.35, 0, 1, spacing * 0.08, spacing * 0.62);
      const tone = target.color((x / spacing + y / spacing) % 3 === 0 ? toneA : toneB);
      tone.setAlpha(map(field, 0, 1, 48, 165));
      target.noStroke();
      target.fill(tone);
      target.circle(x, y, radius);
    }
  }
}

// Diagonal planes study: large graphic planes and overlaps for poster-like spatial tension.
function renderDiagonalPlanes(target, renderPalette, renderWidth, renderHeight, renderSeed, artPreset) {
  const planes = [
    { x: 0.08, y: 0.08, w: 0.68, h: 0.22, angle: -0.22, tone: renderPalette.lines[0], alpha: 58 },
    { x: 0.36, y: 0.36, w: 0.54, h: 0.18, angle: 0.28, tone: renderPalette.accent, alpha: 46 },
    { x: 0.14, y: 0.62, w: 0.5, h: 0.16, angle: -0.14, tone: renderPalette.lines[2], alpha: 54 },
  ];

  for (const plane of planes) {
    const fillTone = target.color(plane.tone);
    fillTone.setAlpha(plane.alpha);
    target.push();
    target.translate(renderWidth * plane.x, renderHeight * plane.y);
    target.rotate(plane.angle);
    target.noStroke();
    target.fill(fillTone);
    target.rect(0, 0, renderWidth * plane.w, renderHeight * plane.h);
    target.pop();
  }

  const ruleTone = target.color(renderPalette.lines[1]);
  ruleTone.setAlpha(120);
  target.stroke(ruleTone);
  target.strokeWeight(max(2, renderWidth * 0.0018));
  target.line(renderWidth * 0.08, renderHeight * 0.18, renderWidth * 0.9, renderHeight * 0.7);
  target.line(renderWidth * 0.22, renderHeight * 0.12, renderWidth * 0.78, renderHeight * 0.88);
}

// Signal lines study: controlled stripe systems with interference rhythm, kept clean enough for type.
function renderSignalLines(target, renderPalette, renderWidth, renderHeight, renderSeed, artPreset) {
  const vertical = renderSeed % 2 === 0;
  const count = round(map(renderWidth, 2160, 3840, 80, 140, true));
  const strokeTone = target.color(renderPalette.lines[0]);

  for (let index = 0; index < count; index += 1) {
    const progress = index / max(1, count - 1);
    const offset = sin(progress * TWO_PI * 6 + renderSeed * 0.00003) * 0.012;
    const alpha = map(noise(index * 0.12, renderSeed * 0.00002), 0, 1, 40, 150);
    const weight = map(noise(index * 0.07, renderSeed * 0.00004), 0, 1, renderWidth * 0.00045, renderWidth * 0.0026);
    strokeTone.setAlpha(alpha);
    target.stroke(strokeTone);
    target.strokeWeight(weight);

    if (vertical) {
      const x = renderWidth * (0.08 + progress * 0.84 + offset);
      target.line(x, renderHeight * 0.08, x, renderHeight * 0.92);
    } else {
      const y = renderHeight * (0.1 + progress * 0.8 + offset);
      target.line(renderWidth * 0.08, y, renderWidth * 0.92, y);
    }
  }

  const accentTone = target.color(renderPalette.accent);
  accentTone.setAlpha(72);
  target.stroke(accentTone);
  target.strokeWeight(max(2, renderWidth * 0.0012));
  if (vertical) {
    target.line(renderWidth * 0.66, renderHeight * 0.08, renderWidth * 0.66, renderHeight * 0.92);
  } else {
    target.line(renderWidth * 0.08, renderHeight * 0.38, renderWidth * 0.92, renderHeight * 0.38);
  }
}

function drawResearchTraces(target, renderPalette, renderWidth, renderHeight, renderSeed, artPreset) {
  drawTraceAtmosphere(target, renderPalette, renderWidth, renderHeight, artPreset);
  drawTraceFragments(target, renderPalette, renderWidth, renderHeight, artPreset);
  drawTraceResidues(target, renderPalette, renderWidth, renderHeight, renderSeed, artPreset);
  drawTraceMarks(target, renderPalette, renderWidth, renderHeight, artPreset);
}

function drawTraceAtmosphere(target, renderPalette, renderWidth, renderHeight, artPreset) {
  target.noStroke();
  const veilCount = Math.max(3, Math.floor(artPreset.atmosphereCount * 0.75));

  for (let index = 0; index < veilCount; index += 1) {
    const cx = random(renderWidth * 0.18, renderWidth * 0.82);
    const cy = random(renderHeight * 0.16, renderHeight * 0.84);
    const w = random(renderWidth * 0.16, renderWidth * 0.3);
    const h = random(renderHeight * 0.08, renderHeight * 0.18);
    const tint = target.color(index % 2 === 0 ? renderPalette.accent : random(renderPalette.lines));
    tint.setAlpha(Math.max(8, Math.floor(artPreset.atmosphereAlpha * 0.75)));
    target.fill(tint);
    target.ellipse(cx, cy, w, h);
  }
}

function drawTraceFragments(target, renderPalette, renderWidth, renderHeight, artPreset) {
  const fragmentCount = Math.round(artPreset.rowCount * 1.8);
  const quietZoneX = renderWidth * 0.62;
  const quietZoneY = renderHeight * 0.18;
  const quietZoneW = renderWidth * 0.22;
  const quietZoneH = renderHeight * 0.26;

  for (let index = 0; index < fragmentCount; index += 1) {
    const x = random(renderWidth * 0.08, renderWidth * 0.92);
    const y = random(renderHeight * 0.1, renderHeight * 0.9);

    if (x > quietZoneX && x < quietZoneX + quietZoneW && y > quietZoneY && y < quietZoneY + quietZoneH) {
      continue;
    }

    const length = random(renderWidth * 0.008, renderWidth * 0.028);
    const angle = noise(x * artPreset.flowNoiseScale * 1.2, y * artPreset.flowNoiseScale * 1.2, index * 0.04) * PI * 2.0;
    const tone = target.color(index % 5 === 0 ? renderPalette.accent : random(renderPalette.lines));
    tone.setAlpha(index % 5 === 0 ? artPreset.contourAccentAlpha : artPreset.softLineAlpha);
    target.stroke(tone);
    target.strokeWeight(random(0.8, map(renderWidth, 2160, 3840, artPreset.strokeWeightMin, artPreset.strokeWeightMax, true)));
    target.line(x, y, x + cos(angle) * length, y + sin(angle) * length);
  }
}

function drawTraceResidues(target, renderPalette, renderWidth, renderHeight, renderSeed, artPreset) {
  target.noFill();
  const clusterCount = Math.max(4, Math.floor(artPreset.contourCount * 0.75));

  for (let cluster = 0; cluster < clusterCount; cluster += 1) {
    const centerX = renderWidth * random(0.18, 0.72);
    const centerY = renderHeight * random(0.18, 0.82);
    const baseRadius = random(renderWidth * 0.035, renderWidth * 0.09);
    const ringCount = Math.floor(random(2, 5));

    for (let ring = 0; ring < ringCount; ring += 1) {
      const tone = target.color(ring % 2 === 0 ? renderPalette.accent : random(renderPalette.lines));
      tone.setAlpha(ring % 2 === 0 ? Math.max(18, artPreset.contourAccentAlpha - 22) : Math.max(12, artPreset.contourLineAlpha - 8));
      target.stroke(tone);
      target.strokeWeight(0.7 + ring * 0.35);
      target.beginShape();

      for (let angle = 0; angle <= TWO_PI + 0.05; angle += TWO_PI / 80) {
        const residueNoise = noise(
          cos(angle) * artPreset.contourNoiseScale * baseRadius + cluster * 0.2,
          sin(angle) * artPreset.contourNoiseScale * baseRadius + renderSeed * 0.00012,
          ring * 0.4
        );
        const radius = baseRadius * (0.75 + ring * 0.3) + map(residueNoise, 0, 1, -baseRadius * 0.28, baseRadius * 0.22);
        const x = centerX + cos(angle) * radius;
        const y = centerY + sin(angle) * radius * random(0.82, 1.08);
        target.curveVertex(x, y);
      }

      target.endShape(CLOSE);
    }
  }
}

function drawTraceMarks(target, renderPalette, renderWidth, renderHeight, artPreset) {
  target.noStroke();
  const markCount = Math.round(artPreset.rowCount * 1.4);

  for (let index = 0; index < markCount; index += 1) {
    const x = random(renderWidth * 0.08, renderWidth * 0.92);
    const y = random(renderHeight * 0.1, renderHeight * 0.9);
    const diameter = random(renderWidth * 0.0018, renderWidth * 0.006);
    const tone = target.color(index % 7 === 0 ? renderPalette.accent : random(renderPalette.lines));
    tone.setAlpha(index % 7 === 0 ? Math.max(22, artPreset.contourAccentAlpha - 18) : Math.max(12, artPreset.softLineAlpha - 16));
    target.fill(tone);
    target.circle(x, y, diameter);
  }
}

function drawTypeProof() {
  const activeProofMode = getCurrentProofMode();
  const activeTypeLayout = getCurrentTypeLayout();
  const textColor = getTypeProofColor(activeProofMode);
  const titleSize = min(width, height) * 0.048;
  const subheadSize = min(width, height) * 0.021;
  const footerSize = min(width, height) * 0.018;
  const leading = titleSize * 1.12;
  const subLeading = subheadSize * 1.5;
  const marginX = width * 0.1;
  const anchorY = height * (activeTypeLayout.key === "centre" ? 0.42 : 0.18);
  const anchorX = activeTypeLayout.key === "centre" ? width * 0.5 : marginX;

  push();
  noStroke();
  fill(textColor);
  textFont("Helvetica Neue");
  textAlign(activeTypeLayout.key === "centre" ? CENTER : LEFT, TOP);

  textSize(titleSize);
  text("RCA Research Biennale 2027", anchorX, anchorY);

  textSize(subheadSize);
  text("Public Research / Practice / Futures", anchorX, anchorY + leading + subLeading * 0.15);

  textSize(footerSize);
  text("Royal College of Art", anchorX, anchorY + leading + subLeading * 1.45);
  pop();
}

function getTypeProofColor(activeProofMode) {
  if (activeProofMode.key === PROOF_MODES.white.key) {
    return color(18, 20, 23, 232);
  }

  if (activeProofMode.key === PROOF_MODES.black.key) {
    return color(244, 239, 230, 236);
  }

  const backgroundColor = color(palette.background);
  const brightness = red(backgroundColor) * 0.299 + green(backgroundColor) * 0.587 + blue(backgroundColor) * 0.114;
  return brightness > 150 ? color(18, 20, 23, 232) : color(244, 239, 230, 236);
}

function drawOverlay() {
  const activeProofMode = getCurrentProofMode();
  const activeTypeLayout = getCurrentTypeLayout();
  const panelWidth = min(760, width * 0.58);
  const panelHeight = 166;
  const padding = 18;
  const activeElement = getCurrentElement();
  const activePrinciple = getCurrentPrinciple();

  fill(palette.accent);
  textFont("Helvetica Neue");
  textSize(min(width, height) * 0.012);
  textAlign(LEFT, TOP);
  text(
    hasActivatedGestalt
      ? `Element ${activeElement.label}  |  Principle ${activePrinciple.label}  |  Chaos ${currentChaosLevel}  |  Proof ${activeProofMode.label}  |  Seed ${seedValue}`
      : `Blank View  |  Element ${activeElement.label}  |  Principle ${activePrinciple.label}  |  Chaos ${currentChaosLevel}  |  Proof ${activeProofMode.label}  |  Seed ${seedValue}`,
    padding + 14,
    height - panelHeight
  );
  textSize(min(width, height) * 0.0085);
  text(
    `${currentPreset.label}  ${width}x${height}  |  Type Proof ${showTypeProof ? activeTypeLayout.label : "Off"}  |  Sandbox ${sandboxConfig.enabled ? "On" : "Off"}`,
    padding + 14,
    height - panelHeight + 28
  );
  text("Escape exits Batch Review. The canvas opens blank until Element, Principle, or Chaos is actively engaged.", padding + 14, height - panelHeight + 72);
  text("Choose Element, Principle, Chaos, Proof, Type Layout, and Load Seed in the top control bar. Generate Batch for shortlisting.", padding + 14, height - panelHeight + 94);
  text(`Export names retain element, principle, chaos, proof, and the literal seed for approval logging.`, padding + 14, height - panelHeight + 116);
}

function drawBatchReview() {
  const activeElement = getCurrentElement();
  const activePrinciple = getCurrentPrinciple();
  background("#111315");
  const layout = getBatchLayout();
  const headerX = layout.startX;
  const headerY = max(60, layout.startY - 64);

  noStroke();
  fill("#efe6d5");
  textFont("Helvetica Neue");
  textAlign(LEFT, TOP);
  textSize(min(width, height) * 0.016);
  text("Batch Review", headerX, headerY);
  fill(239, 230, 213, 150);
  textSize(min(width, height) * 0.0085);
  text(
    `${activeElement.label}  |  ${activePrinciple.label}  |  Chaos ${currentChaosLevel}  |  Click any candidate to load that seed into the main sketch. Press Escape to return without changing the current seed.`,
    headerX,
    headerY + 28
  );

  for (let index = 0; index < batchCandidates.length; index += 1) {
    const candidate = batchCandidates[index];
    const frame = layout.frames[index];

    image(candidate.thumbnail, frame.x, frame.y, frame.width, frame.height);

    noFill();
    stroke(239, 230, 213, 50);
    strokeWeight(max(1, width / 3200));
    rect(frame.x, frame.y, frame.width, frame.height, 18);

    noStroke();
    fill(0, 0, 0, 120);
    rect(frame.x + 12, frame.y + frame.height - 36, min(frame.width - 24, 190), 24, 999);
    fill("#efe6d5");
    textSize(min(width, height) * 0.0082);
    textAlign(LEFT, CENTER);
    text(`Seed ${candidate.seed}`, frame.x + 22, frame.y + frame.height - 24);
  }
}

function drawGuideOverlays() {
  if (showGridGuide) {
    drawGridGuide();
  }

  if (showTitleSafeGuide) {
    drawTitleSafeGuide();
  }
}

function drawGridGuide() {
  const marginX = width * 0.08;
  const marginY = height * 0.08;
  const columns = 12;
  const rows = 12;
  const gridColor = color(palette.accent);
  gridColor.setAlpha(42);

  push();
  stroke(gridColor);
  strokeWeight(max(1, width / 3840));

  for (let column = 0; column <= columns; column += 1) {
    const x = lerp(marginX, width - marginX, column / columns);
    line(x, marginY, x, height - marginY);
  }

  for (let row = 0; row <= rows; row += 1) {
    const y = lerp(marginY, height - marginY, row / rows);
    line(marginX, y, width - marginX, y);
  }

  noFill();
  strokeWeight(max(1.2, width / 3200));
  rect(marginX, marginY, width - marginX * 2, height - marginY * 2, 24);
  pop();
}

function drawTitleSafeGuide() {
  const safeMarginX = width * 0.12;
  const safeMarginY = height * 0.12;
  const guideColor = color(palette.accent);
  guideColor.setAlpha(90);

  push();
  noFill();
  stroke(guideColor);
  strokeWeight(max(1.4, width / 2800));
  rect(safeMarginX, safeMarginY, width - safeMarginX * 2, height - safeMarginY * 2, 28);

  const crosshairLength = min(width, height) * 0.018;
  const centerX = width * 0.5;
  const centerY = height * 0.5;
  line(centerX - crosshairLength, centerY, centerX + crosshairLength, centerY);
  line(centerX, centerY - crosshairLength, centerX, centerY + crosshairLength);

  noStroke();
  fill(guideColor);
  textFont("Helvetica Neue");
  textAlign(RIGHT, TOP);
  textSize(min(width, height) * 0.008);
  text("Title-safe area", width - safeMarginX, safeMarginY - min(height * 0.02, 40));
  pop();
}

function updateViewStateIndicator() {
  if (!viewStateIndicator) {
    return;
  }

  viewStateIndicator.textContent = viewMode === VIEW_MODES.batch ? "Batch Review" : hasActivatedGestalt ? "Main View" : "Blank View";
}

function updatePreviewScale() {
  const scaleFactor = min(windowWidth / width, windowHeight / height, 1);
  const canvas = document.querySelector("canvas");
  if (!canvas) {
    return;
  }

  canvas.style.width = `${Math.floor(width * scaleFactor)}px`;
  canvas.style.height = `${Math.floor(height * scaleFactor)}px`;
}
