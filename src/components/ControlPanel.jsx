import { Button, Select, SelectItem, Slider, Tile } from "@carbon/react";
import { ELEMENT_OPTIONS, PRINCIPLE_OPTIONS, PROCESS_OPTIONS, PROOF_OPTIONS } from "../engine/constants";
import SeedControls from "./SeedControls";
import TypeProofControls from "./TypeProofControls";

export default function ControlPanel({
  state,
  seedInput,
  onElementChange,
  onPrincipleChange,
  onChaosChange,
  onProofChange,
  onProcessChange,
  onProcessIntensityChange,
  onProcessScaleChange,
  onTypeProofChange,
  onTypeLayoutChange,
  onSeedInputChange,
  onLoadSeed,
  onGenerateBatch,
  onRegenerateSeed,
  disabled,
}) {
  const processControlsDisabled = disabled || state.process === "clean";

  return (
    <Tile className="app-panel app-panel--controls">
      <div className="panel-heading">
        <p className="panel-eyebrow">Matrix and process controls</p>
        <h2>Controls</h2>
      </div>

      <div className="panel-stack">
        <Select id="element-select" labelText="Element" value={state.element} onChange={(event) => onElementChange(event.target.value)}>
          {ELEMENT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value} text={option.label} />
          ))}
        </Select>

        <Select id="principle-select" labelText="Principle" value={state.principle} onChange={(event) => onPrincipleChange(event.target.value)}>
          {PRINCIPLE_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value} text={option.label} />
          ))}
        </Select>

        <Slider
          id="chaos-slider"
          labelText="Chaos"
          min={0}
          max={100}
          step={1}
          value={state.chaos}
          hideTextInput={false}
          onChange={({ value }) => onChaosChange(Number(value))}
        />

        <Select id="proof-select" labelText="Proof" value={state.proof} onChange={(event) => onProofChange(event.target.value)}>
          {PROOF_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value} text={option.label} />
          ))}
        </Select>

        <Select id="process-select" labelText="Process" value={state.process} onChange={(event) => onProcessChange(event.target.value)}>
          {PROCESS_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value} text={option.label} />
          ))}
        </Select>

        <Slider
          id="process-intensity-slider"
          labelText="Process Intensity"
          min={0}
          max={100}
          step={1}
          value={state.processIntensity}
          hideTextInput={false}
          disabled={processControlsDisabled}
          onChange={({ value }) => onProcessIntensityChange(Number(value))}
        />

        <Slider
          id="process-scale-slider"
          labelText="Process Scale"
          min={0}
          max={100}
          step={1}
          value={state.processScale}
          hideTextInput={false}
          disabled={processControlsDisabled}
          onChange={({ value }) => onProcessScaleChange(Number(value))}
        />

        <TypeProofControls
          typeProof={state.typeProof}
          typeLayout={state.typeLayout}
          onTypeProofChange={onTypeProofChange}
          onTypeLayoutChange={onTypeLayoutChange}
        />

        <SeedControls value={seedInput} onChange={onSeedInputChange} onLoad={onLoadSeed} onRegenerate={onRegenerateSeed} disabled={disabled} />

        <div className="panel-actions">
          <Button kind="secondary" onClick={onGenerateBatch} disabled={disabled}>
            Generate Batch
          </Button>
        </div>
      </div>
    </Tile>
  );
}