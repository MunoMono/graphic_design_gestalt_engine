import { Accordion, AccordionItem, Button, Select, SelectItem, Slider, Tag, Tile } from "@carbon/react";
import { PROCESS_OPTIONS, PROOF_OPTIONS } from "../engine/constants";
import ElementsAccordion from "./ElementsAccordion";
import PrinciplesAccordion from "./PrinciplesAccordion";
import SeedControls from "./SeedControls";
import TypeProofControls from "./TypeProofControls";

export default function ControlPanel({
  state,
  seedInput,
  summaryLabel,
  onChaosChange,
  onProofChange,
  onProcessChange,
  onProcessIntensityChange,
  onProcessScaleChange,
  onElementControlChange,
  onPrincipleControlChange,
  onClearCanvas,
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
      <div className="panel-heading panel-heading--row">
        <div>
          <p className="panel-eyebrow">Graphic design learning instrument</p>
          <h2>Controls</h2>
        </div>
        <Tag type={state.activated ? "blue" : "cool-gray"}>{summaryLabel}</Tag>
      </div>

      <div className="panel-stack">
        <div className="panel-note-block panel-note-block--actions">
          <p className="panel-note">Start with a blank canvas, add visual language parts deliberately, and adjust only the studies you have activated.</p>
          <Button kind="secondary" onClick={onClearCanvas} disabled={disabled}>
            Clear canvas
          </Button>
        </div>

        <Accordion align="start" className="gestalt-accordion gestalt-accordion--root">
          <AccordionItem title="Elements" open>
            <div className="accordion-group">
              <p className="panel-eyebrow">Add visual building blocks</p>
              <ElementsAccordion
                values={state.gestaltControls.elements}
                selectedKey={state.element}
                disabled={disabled}
                onToggleChange={(key, active) => onElementControlChange(key, { active })}
                onControlChange={onElementControlChange}
              />
            </div>
          </AccordionItem>

          <AccordionItem title="Principles">
            <div className="accordion-group">
              <p className="panel-eyebrow">Modify how active elements organise themselves</p>
              <PrinciplesAccordion
                values={state.gestaltControls.principles}
                selectedKey={state.principle}
                disabled={disabled}
                onToggleChange={(key, active) => onPrincipleControlChange(key, { active })}
                onControlChange={onPrincipleControlChange}
              />
            </div>
          </AccordionItem>
        </Accordion>

        <div className="panel-stack panel-stack--tight panel-section">
          <div className="panel-heading panel-heading--compact">
            <p className="panel-eyebrow">Engine and proof controls</p>
          </div>

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
        </div>

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