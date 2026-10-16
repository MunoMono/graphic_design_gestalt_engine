import { Select, SelectItem, Slider, Tile } from "@carbon/react";
import { ALIGNMENT_MODE_OPTIONS } from "../engine/constants";

const HIERARCHY_CONTROLS = [
  {
    key: "sizeHierarchy",
    label: "Size Hierarchy",
    helper: "Larger elements command more attention.",
  },
  {
    key: "contrastHierarchy",
    label: "Contrast Hierarchy",
    helper: "Higher contrast pushes focal separation harder.",
  },
  {
    key: "alignmentHierarchy",
    label: "Alignment Discipline",
    helper: "Higher alignment snaps forms and text to stronger structural axes.",
  },
  {
    key: "proximityHierarchy",
    label: "Proximity Grouping",
    helper: "Higher proximity pulls related elements into clearer clusters.",
  },
];

export default function HierarchyControls({ state, onChange, disabled }) {
  return (
    <Tile className="app-panel app-panel--hierarchy">
      <div className="panel-heading panel-heading--compact">
        <p className="panel-eyebrow">Hierarchy controls</p>
      </div>

      <div className="panel-stack panel-stack--tight">
        <p className="panel-note">Shape focal order with size, contrast, alignment, and proximity instead of only changing the active element or principle.</p>
        {HIERARCHY_CONTROLS.map((control) => (
          <div key={control.key} className="panel-stack panel-stack--micro">
            {control.key === "alignmentHierarchy" ? (
              <Select
                id="alignment-mode-select"
                labelText="Alignment Guide"
                value={state.alignmentMode}
                disabled={disabled}
                onChange={(event) => onChange({ alignmentMode: event.target.value })}
              >
                {ALIGNMENT_MODE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value} text={option.label} />
                ))}
              </Select>
            ) : null}
            <Slider
              id={`${control.key}-slider`}
              labelText={control.label}
              min={0}
              max={100}
              step={1}
              value={state[control.key]}
              hideTextInput={false}
              disabled={disabled}
              onChange={({ value }) => onChange({ [control.key]: Number(value) })}
            />
            <p className="panel-note">{control.helper}</p>
          </div>
        ))}
      </div>
    </Tile>
  );
}