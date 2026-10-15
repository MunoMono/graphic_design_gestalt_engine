import { useEffect, useMemo, useRef, useState } from "react";
import { InlineNotification, Theme } from "@carbon/react";
import AppHeader from "./components/AppHeader";
import BatchReview from "./components/BatchReview";
import CanvasStage from "./components/CanvasStage";
import ControlPanel from "./components/ControlPanel";
import ExportPanel from "./components/ExportPanel";
import SandboxPanel from "./components/SandboxPanel";
import { DEFAULT_MACHINE_STATE, PROCESS_OPTIONS, PRODUCT_NAME, createDefaultGestaltControls, getActiveGestaltItems } from "./engine/constants";
import { buildExportFilename } from "./engine/exportNaming";
import { applyExportMetricsToState, getExportMetrics } from "./engine/exportSizing";
import { createGestaltEngine, normalizeMachineState } from "./engine/gestaltEngine";

function isEditableTarget(target) {
  const tagName = target?.tagName;
  return tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT" || target?.isContentEditable;
}

function hydrateMachineState(state) {
  return applyExportMetricsToState(normalizeMachineState(state));
}

function buildSandboxStateSnapshot(state) {
  return {
    element: state.element,
    principle: state.principle,
    chaos: state.chaos,
    proof: state.proof,
    backgroundColor: state.backgroundColor,
    backgroundOpacity: state.backgroundOpacity,
    colourPreset: state.colourPreset,
    colourHue: state.colourHue,
    colourSaturation: state.colourSaturation,
    colourBrightness: state.colourBrightness,
    process: state.process,
    processIntensity: state.processIntensity,
    processScale: state.processScale,
    seed: state.seed,
    typeProof: state.typeProof,
    typeLayout: state.typeLayout,
    gestaltControls: state.gestaltControls,
  };
}

function serializeSandboxState(state) {
  return JSON.stringify(buildSandboxStateSnapshot(state), null, 2);
}

function buildActiveSummary(state) {
  const activeElements = getActiveGestaltItems(state.gestaltControls, "elements");
  const activePrinciples = getActiveGestaltItems(state.gestaltControls, "principles");

  if (activeElements.length === 0) {
    return "Blank canvas";
  }

  const formatItems = (items, singularLabel, pluralLabel) => {
    if (items.length === 1) {
      return items[0].title;
    }

    if (items.length === 2) {
      return `${items[0].title} + ${items[1].title}`;
    }

    return `${items.length} ${pluralLabel}`;
  };

  const elementLabel = formatItems(activeElements, "Element", "Elements");

  if (activePrinciples.length === 0) {
    return activeElements.length === 1 ? `${elementLabel} active` : `${elementLabel} active`;
  }

  const principleLabel = formatItems(activePrinciples, "Principle", "Principles");
  return `${elementLabel} × ${principleLabel} active`;
}

export default function App() {
  const stageRef = useRef(null);
  const engineRef = useRef(null);
  const [engineReady, setEngineReady] = useState(false);
  const [engineState, setEngineState] = useState(() => hydrateMachineState(DEFAULT_MACHINE_STATE));
  const [seedInput, setSeedInput] = useState(String(DEFAULT_MACHINE_STATE.seed));
  const [batchCandidates, setBatchCandidates] = useState([]);
  const [batchLoading, setBatchLoading] = useState(false);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("g100");
  const [sandboxCode, setSandboxCode] = useState(() => serializeSandboxState(hydrateMachineState(DEFAULT_MACHINE_STATE)));
  const [sandboxDirty, setSandboxDirty] = useState(false);
  const [sandboxStatus, setSandboxStatus] = useState(null);

  useEffect(() => {
    document.title = PRODUCT_NAME;
  }, []);

  useEffect(() => {
    if (!stageRef.current) {
      return undefined;
    }

    const controller = createGestaltEngine(stageRef.current, { initialState: engineState });

    engineRef.current = controller;

    controller.ready
      .then((initialState) => {
        setEngineReady(true);
        setEngineState(hydrateMachineState(initialState));
        setSeedInput(String(initialState.seed));
      })
      .catch((nextError) => {
        setError(nextError.message);
      });

    return () => {
      controller.destroy();
    };
  }, []);

  useEffect(() => {
    if (!engineReady || !engineRef.current) {
      return;
    }

    engineRef.current.updateGestaltEngine(engineState);
  }, [engineReady, engineState]);

  useEffect(() => {
    setSeedInput(String(engineState.seed));
  }, [engineState.seed]);

  useEffect(() => {
    if (!sandboxDirty) {
      setSandboxCode(serializeSandboxState(engineState));
    }
  }, [engineState, sandboxDirty]);

  useEffect(() => {
    const handleKeyDown = async (event) => {
      if (!engineReady || !engineRef.current || isEditableTarget(event.target)) {
        return;
      }

      const keyValue = event.key.toLowerCase();

      if (keyValue === "r") {
        event.preventDefault();
        await handleRegenerateSeed();
        return;
      }

      if (keyValue === "b") {
        event.preventDefault();
        await handleGenerateBatch();
        return;
      }

      if (keyValue === "s") {
        event.preventDefault();
        await handleExport();
        return;
      }

      if (keyValue === "y") {
        event.preventDefault();
        await handleTypeProofChange(!engineState.typeProof);
        return;
      }

      if (event.key === "1") {
        event.preventDefault();
        await handleFormatChange("wide");
        return;
      }

      if (event.key === "2") {
        event.preventDefault();
        await handleFormatChange("square");
        return;
      }

      if (event.key === "3") {
        event.preventDefault();
        await handleFormatChange("portrait");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [engineReady, engineState]);

  async function applyState(patchOrUpdater) {
    setError("");

    try {
      setEngineState((currentState) => {
        const nextState = typeof patchOrUpdater === "function"
          ? patchOrUpdater(currentState)
          : { ...currentState, ...patchOrUpdater };

        return hydrateMachineState(nextState);
      });
    } catch (nextError) {
      setError(nextError.message);
    }
  }

  async function handleElementChange(value) {
    setBatchCandidates([]);
    await applyState({ element: value });
  }

  async function handlePrincipleChange(value) {
    setBatchCandidates([]);
    await applyState({ principle: value });
  }

  async function handleChaosChange(value) {
    setBatchCandidates([]);
    await applyState({ chaos: value });
  }

  async function handleBackgroundChange(patch) {
    setBatchCandidates([]);
    await applyState(patch);
  }

  async function handleColourChange(patch) {
    setBatchCandidates([]);
    await applyState(patch);
  }

  async function handleProcessChange(value) {
    setBatchCandidates([]);
    await applyState({ process: value });
  }

  async function handleProcessIntensityChange(value) {
    setBatchCandidates([]);
    await applyState({ processIntensity: value });
  }

  async function handleProcessScaleChange(value) {
    setBatchCandidates([]);
    await applyState({ processScale: value });
  }

  async function handleGestaltControlChange(section, key, patch) {
    setBatchCandidates([]);
    await applyState((currentState) => ({
      ...currentState,
      [section === "elements" ? "element" : "principle"]: key,
      gestaltControls: {
        ...currentState.gestaltControls,
        [section]: {
          ...currentState.gestaltControls[section],
          [key]: {
            ...currentState.gestaltControls[section][key],
            ...patch,
          },
        },
      },
    }));
  }

  async function handleTypeProofChange(value) {
    await applyState({ typeProof: value });
  }

  async function handleTypeLayoutChange(value) {
    await applyState({ typeLayout: value });
  }

  async function handleLoadSeed() {
    if (!engineRef.current || !/^\d+$/.test(seedInput.trim())) {
      return;
    }

    setError("");

    try {
      setEngineState((currentState) => engineRef.current.loadSeed(Number.parseInt(seedInput.trim(), 10), currentState));
    } catch (nextError) {
      setError(nextError.message);
    }
  }

  async function handleRegenerateSeed() {
    if (!engineRef.current) {
      return;
    }

    setError("");

    try {
      setEngineState((currentState) => engineRef.current.randomizeSeed(currentState));
    } catch (nextError) {
      setError(nextError.message);
    }
  }

  async function handleGenerateBatch() {
    if (!engineRef.current) {
      return;
    }

    setBatchLoading(true);
    setError("");

    try {
      const result = await engineRef.current.generateBatchCandidates({ ...engineState, activated: true }, 12);
      setEngineState((currentState) => applyExportMetricsToState({ ...currentState, activated: true }));
      setBatchCandidates(result.candidates);
    } catch (nextError) {
      setError(nextError.message);
    } finally {
      setBatchLoading(false);
    }
  }

  async function handleCandidateSelect(seed) {
    if (!engineRef.current) {
      return;
    }

    setError("");

    try {
      setEngineState((currentState) => engineRef.current.loadSeed(seed, currentState));
    } catch (nextError) {
      setError(nextError.message);
    }
  }

  async function handleFormatChange(format) {
    setBatchCandidates([]);
    await applyState({ format });
  }

  async function handleScaleChange(value) {
    await applyState({ scale: Number.parseInt(String(value).replace("x", ""), 10) || 1 });
  }

  async function handleDpiChange(value) {
    if (value === "custom") {
      await applyState({ dpiMode: "custom", dpi: engineState.customDpi || engineState.dpi });
      return;
    }

    await applyState({ dpiMode: "preset", dpi: Number.parseInt(value, 10) || engineState.dpi });
  }

  async function handleCustomDpiChange(value) {
    const nextDpi = Number.parseInt(String(value), 10);
    await applyState({
      dpiMode: "custom",
      customDpi: Number.isFinite(nextDpi) && nextDpi > 0 ? nextDpi : engineState.customDpi,
      dpi: Number.isFinite(nextDpi) && nextDpi > 0 ? nextDpi : engineState.dpi,
    });
  }

  async function handleCustomWidthChange(value) {
    setBatchCandidates([]);
    const nextWidth = Number.parseInt(String(value), 10);
    await applyState({ customWidth: Number.isFinite(nextWidth) && nextWidth > 0 ? nextWidth : engineState.customWidth });
  }

  async function handleCustomHeightChange(value) {
    setBatchCandidates([]);
    const nextHeight = Number.parseInt(String(value), 10);
    await applyState({ customHeight: Number.isFinite(nextHeight) && nextHeight > 0 ? nextHeight : engineState.customHeight });
  }

  async function handleExport() {
    setError("");

    try {
      await engineRef.current.exportPng(engineState);
    } catch (nextError) {
      setError(nextError.message);
    }
  }

  function handleSandboxCodeChange(value) {
    setSandboxDirty(true);
    setSandboxStatus(null);
    setSandboxCode(value);
  }

  async function handleSandboxApply() {
    setError("");

    try {
      const parsedConfig = JSON.parse(sandboxCode);

      if (!parsedConfig || typeof parsedConfig !== "object" || Array.isArray(parsedConfig)) {
        throw new Error("Sandbox input must be a JSON object.");
      }

      const nextState = hydrateMachineState({
        ...engineState,
        ...parsedConfig,
        ...(parsedConfig.proof && parsedConfig.backgroundColor === undefined
          ? { backgroundColor: undefined }
          : {}),
        gestaltControls: parsedConfig.gestaltControls ?? engineState.gestaltControls,
      });

      setBatchCandidates([]);
      setEngineState(nextState);
      setSandboxCode(serializeSandboxState(nextState));
      setSandboxDirty(false);
      setSandboxStatus({
        kind: "success",
        title: "Code applied",
        subtitle: "The composition state was updated from the sandbox JSON.",
      });
    } catch (nextError) {
      setSandboxStatus({
        kind: "error",
        title: "Code error",
        subtitle: nextError.message,
      });
    }
  }

  function handleSandboxReset() {
    setSandboxCode(serializeSandboxState(engineState));
    setSandboxDirty(false);
    setSandboxStatus({
      kind: "info",
      title: "Sandbox reset",
      subtitle: "The editor was restored from the current React machine state.",
    });
  }

  async function handleClearCanvas() {
    setBatchCandidates([]);
    setSandboxStatus({
      kind: "info",
      title: "Canvas cleared",
      subtitle: "All elements and principles were deactivated and their sliders were reset.",
    });
    setSandboxDirty(false);

    await applyState((currentState) => ({
      ...currentState,
      element: DEFAULT_MACHINE_STATE.element,
      principle: DEFAULT_MACHINE_STATE.principle,
      gestaltControls: createDefaultGestaltControls(),
    }));
  }

  const filenamePreview = useMemo(() => buildExportFilename(engineState, { includeExtension: true }), [engineState]);
  const exportMetrics = useMemo(() => getExportMetrics(engineState), [engineState]);
  const processLabel = PROCESS_OPTIONS.find((option) => option.value === engineState.process)?.label ?? engineState.process;
  const matrixSummary = buildActiveSummary(engineState);

  return (
    <Theme theme={theme} className={`app-shell app-shell--${theme}`}>
      <AppHeader theme={theme} onToggleTheme={() => setTheme((currentTheme) => (currentTheme === "g100" ? "white" : "g100"))} />
      <main className="app-shell__content">
        <section className="app-shell__grid">
          <div className="app-shell__left">
            <ControlPanel
              state={engineState}
              seedInput={seedInput}
              summaryLabel={matrixSummary}
              onChaosChange={handleChaosChange}
              onBackgroundChange={handleBackgroundChange}
              onColourChange={handleColourChange}
              onProcessChange={handleProcessChange}
              onProcessIntensityChange={handleProcessIntensityChange}
              onProcessScaleChange={handleProcessScaleChange}
              onElementChange={handleElementChange}
              onPrincipleChange={handlePrincipleChange}
              onElementControlChange={(key, patch) => handleGestaltControlChange("elements", key, patch)}
              onPrincipleControlChange={(key, patch) => handleGestaltControlChange("principles", key, patch)}
              onTypeProofChange={handleTypeProofChange}
              onTypeLayoutChange={handleTypeLayoutChange}
              onSeedInputChange={setSeedInput}
              onLoadSeed={handleLoadSeed}
              onGenerateBatch={handleGenerateBatch}
              onRegenerateSeed={handleRegenerateSeed}
              onClearCanvas={handleClearCanvas}
              disabled={!engineReady}
            />
          </div>

          <div className="app-shell__centre">
            {error ? <InlineNotification kind="error" lowContrast hideCloseButton title="Engine error" subtitle={error} /> : null}
            <CanvasStage stageRef={stageRef} ready={engineReady} viewLabel={engineState.activated ? "Composition view" : "Blank view"} activated={engineState.activated} />
          </div>

          <div className="app-shell__right">
            <SandboxPanel
              code={sandboxCode}
              status={sandboxStatus}
              onCodeChange={handleSandboxCodeChange}
              onApply={handleSandboxApply}
              onReset={handleSandboxReset}
              disabled={!engineReady}
            />
            <ExportPanel
              filename={filenamePreview}
              state={engineState}
              metrics={exportMetrics}
              onFormatChange={handleFormatChange}
              onScaleChange={handleScaleChange}
              onDpiChange={handleDpiChange}
              onCustomDpiChange={handleCustomDpiChange}
              onCustomWidthChange={handleCustomWidthChange}
              onCustomHeightChange={handleCustomHeightChange}
              onExport={handleExport}
              disabled={!engineReady}
            />
            <BatchReview candidates={batchCandidates} state={{ ...engineState, process: processLabel, matrixSummary }} onCandidateSelect={handleCandidateSelect} loading={batchLoading} />
          </div>
        </section>
      </main>
    </Theme>
  );
}