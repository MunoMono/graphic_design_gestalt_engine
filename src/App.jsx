import { useEffect, useMemo, useRef, useState } from "react";
import { Theme } from "@carbon/react";
import AppHeader from "./components/AppHeader";
import BatchReview from "./components/BatchReview";
import CanvasStage from "./components/CanvasStage";
import ControlPanel from "./components/ControlPanel";
import ExportPanel from "./components/ExportPanel";
import StatusBar from "./components/StatusBar";
import { DEFAULT_MACHINE_STATE, ELEMENT_OPTIONS, PRINCIPLE_OPTIONS, PROCESS_OPTIONS, PRODUCT_NAME } from "./engine/constants";
import { buildExportFilename } from "./engine/exportNaming";
import { applyExportMetricsToState, getExportMetrics } from "./engine/exportSizing";
import { createGestaltEngine } from "./engine/gestaltEngine";

function isEditableTarget(target) {
  const tagName = target?.tagName;
  return tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT" || target?.isContentEditable;
}

export default function App() {
  const stageRef = useRef(null);
  const engineRef = useRef(null);
  const [engineReady, setEngineReady] = useState(false);
  const [engineState, setEngineState] = useState(applyExportMetricsToState(DEFAULT_MACHINE_STATE));
  const [seedInput, setSeedInput] = useState(String(DEFAULT_MACHINE_STATE.seed));
  const [batchCandidates, setBatchCandidates] = useState([]);
  const [batchLoading, setBatchLoading] = useState(false);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("g100");

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
        setEngineState(applyExportMetricsToState(initialState));
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
        await engineRef.current.exportPng(engineState);
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

  async function applyState(patch, options) {
    setError("");

    try {
      setEngineState((currentState) => applyExportMetricsToState({
        ...currentState,
        ...patch,
        activated: options?.activateMatrix ? true : currentState.activated,
      }));
    } catch (nextError) {
      setError(nextError.message);
    }
  }

  async function handleElementChange(value) {
    setBatchCandidates([]);
    await applyState({ element: value }, { activateMatrix: true });
  }

  async function handlePrincipleChange(value) {
    setBatchCandidates([]);
    await applyState({ principle: value }, { activateMatrix: true });
  }

  async function handleChaosChange(value) {
    setBatchCandidates([]);
    await applyState({ chaos: value }, { activateMatrix: true });
  }

  async function handleProofChange(value) {
    await applyState({ proof: value });
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

  const filenamePreview = useMemo(() => buildExportFilename(engineState, { includeExtension: true }), [engineState]);
  const exportMetrics = useMemo(() => getExportMetrics(engineState), [engineState]);
  const elementLabel = ELEMENT_OPTIONS.find((option) => option.value === engineState.element)?.label ?? engineState.element;
  const principleLabel = PRINCIPLE_OPTIONS.find((option) => option.value === engineState.principle)?.label ?? engineState.principle;
  const processLabel = PROCESS_OPTIONS.find((option) => option.value === engineState.process)?.label ?? engineState.process;
  const matrixSummary = `${elementLabel} × ${principleLabel} × Chaos ${engineState.chaos}`;

  return (
    <Theme theme={theme} className={`app-shell app-shell--${theme}`}>
      <AppHeader theme={theme} onToggleTheme={() => setTheme((currentTheme) => (currentTheme === "g100" ? "white" : "g100"))} />
      <main className="app-shell__content">
        <section className="app-shell__grid">
          <div className="app-shell__left">
            <ControlPanel
              state={engineState}
              seedInput={seedInput}
              onElementChange={handleElementChange}
              onPrincipleChange={handlePrincipleChange}
              onChaosChange={handleChaosChange}
              onProofChange={handleProofChange}
              onProcessChange={handleProcessChange}
              onProcessIntensityChange={handleProcessIntensityChange}
              onProcessScaleChange={handleProcessScaleChange}
              onTypeProofChange={handleTypeProofChange}
              onTypeLayoutChange={handleTypeLayoutChange}
              onSeedInputChange={setSeedInput}
              onLoadSeed={handleLoadSeed}
              onGenerateBatch={handleGenerateBatch}
              onRegenerateSeed={handleRegenerateSeed}
              disabled={!engineReady}
            />
          </div>

          <div className="app-shell__centre">
            <CanvasStage stageRef={stageRef} ready={engineReady} viewLabel={engineState.activated ? "Composition view" : "Blank view"} activated={engineState.activated} />
            <StatusBar state={{ ...engineState, element: elementLabel, principle: principleLabel, process: processLabel, exportWidth: exportMetrics.finalWidth, exportHeight: exportMetrics.finalHeight, matrixSummary }} error={error} />
          </div>

          <div className="app-shell__right">
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
              onExport={() => engineRef.current?.exportPng(engineState)}
              disabled={!engineReady}
            />
            <BatchReview candidates={batchCandidates} state={{ ...engineState, element: elementLabel, principle: principleLabel, process: processLabel, matrixSummary }} onCandidateSelect={handleCandidateSelect} loading={batchLoading} />
          </div>
        </section>
      </main>
    </Theme>
  );
}