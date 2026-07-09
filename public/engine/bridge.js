(function () {
  const FORMAT_PRESETS = {
    wide: () => EXPORT_PRESETS.wide,
    square: () => EXPORT_PRESETS.square,
    portrait: () => EXPORT_PRESETS.portrait,
  };

  function getCurrentFormatKey() {
    if (currentPreset.width === EXPORT_PRESETS.square.width && currentPreset.height === EXPORT_PRESETS.square.height) {
      return "square";
    }

    if (currentPreset.width === EXPORT_PRESETS.portrait.width && currentPreset.height === EXPORT_PRESETS.portrait.height) {
      return "portrait";
    }

    return "wide";
  }

  function getStateSnapshot() {
    return {
      element: currentElementKey,
      principle: currentPrincipleKey,
      chaos: currentChaosLevel,
      proof: currentProofModeKey,
      typeProof: showTypeProof,
      typeLayout: currentTypeLayoutKey,
      seed: seedValue,
      activated: hasActivatedGestalt,
      format: getCurrentFormatKey(),
      width,
      height,
      viewMode,
      filename: `${getExportFilename()}.png`,
    };
  }

  function dispatchUpdate() {
    const state = getStateSnapshot();
    window.dispatchEvent(new CustomEvent("gestalt-engine:update", { detail: state }));
    return state;
  }

  function ensureSketchReady() {
    if (typeof generateComposition !== "function" || typeof renderCompositionToTarget !== "function") {
      throw new Error("The p5 engine host is not ready yet.");
    }
  }

  function normalizeSeed(seed) {
    if (!Number.isSafeInteger(seed) || seed < 1) {
      throw new Error("Seed must be a positive integer.");
    }

    return seed;
  }

  function applyState(patch = {}, options = {}) {
    ensureSketchReady();

    if (patch.element && GESTALT_ELEMENTS[patch.element]) {
      currentElementKey = patch.element;
    }

    if (patch.principle && GESTALT_PRINCIPLES[patch.principle]) {
      currentPrincipleKey = patch.principle;
    }

    if (typeof patch.chaos === "number" && Number.isFinite(patch.chaos)) {
      currentChaosLevel = constrain(Math.round(patch.chaos), 0, 100);
    }

    if (patch.proof && PROOF_MODES[patch.proof]) {
      currentProofModeKey = patch.proof;
    }

    if (typeof patch.typeProof === "boolean") {
      showTypeProof = patch.typeProof;
    }

    if (patch.typeLayout && TYPE_LAYOUTS[patch.typeLayout]) {
      currentTypeLayoutKey = patch.typeLayout;
    }

    if (typeof patch.seed === "number") {
      seedValue = normalizeSeed(patch.seed);
    }

    if (patch.format && FORMAT_PRESETS[patch.format]) {
      currentPreset = FORMAT_PRESETS[patch.format]();
      resizeCanvas(currentPreset.width, currentPreset.height);
      pixelDensity(2);
    }

    if (options.activateMatrix) {
      hasActivatedGestalt = true;
    }

    viewMode = VIEW_MODES.main;
    generateComposition();
    return dispatchUpdate();
  }

  function loadSeed(seed) {
    return applyState({ seed: normalizeSeed(seed) });
  }

  function randomizeSeed() {
    ensureSketchReady();
    seedValue = Math.floor(Math.random() * 999999999) + 1;
    viewMode = VIEW_MODES.main;
    generateComposition();
    return dispatchUpdate();
  }

  function setFormat(formatKey) {
    return applyState({ format: formatKey });
  }

  function exportPng() {
    ensureSketchReady();
    saveCanvas(getExportFilename(), "png");
    return { state: dispatchUpdate() };
  }

  function renderBatchCandidates(seeds) {
    ensureSketchReady();
    hasActivatedGestalt = true;

    const uniqueSeeds = Array.from(new Set(seeds.map((seed) => normalizeSeed(seed))));
    const candidates = uniqueSeeds.map((candidateSeed) => {
      const thumbnail = createBatchThumbnail(candidateSeed);
      const canvas = thumbnail.elt || thumbnail.canvas;
      const imageUrl = canvas.toDataURL("image/png");
      thumbnail.remove();

      return {
        seed: candidateSeed,
        imageUrl,
        element: currentElementKey,
        principle: currentPrincipleKey,
        chaos: currentChaosLevel,
        proof: currentProofModeKey,
        typeProof: showTypeProof,
        typeLayout: currentTypeLayoutKey,
      };
    });

    viewMode = VIEW_MODES.main;
    generateComposition();
    return { candidates, state: dispatchUpdate() };
  }

  function initializeBridge() {
    if (
      typeof generateComposition !== "function" ||
      typeof randomSeed !== "function" ||
      typeof noiseSeed !== "function" ||
      typeof redraw !== "function" ||
      !document.querySelector("canvas")
    ) {
      window.setTimeout(initializeBridge, 50);
      return;
    }

    showOverlay = false;
    showGridGuide = false;
    showTitleSafeGuide = false;
    redraw();
    dispatchUpdate();
  }

  window.gestaltEngineApi = {
    getState: () => {
      ensureSketchReady();
      return getStateSnapshot();
    },
    applyState,
    loadSeed,
    randomizeSeed,
    setFormat,
    exportPng,
    renderBatchCandidates,
  };

  initializeBridge();
})();