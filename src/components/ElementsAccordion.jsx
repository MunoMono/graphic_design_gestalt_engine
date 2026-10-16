import { Accordion, AccordionItem, Select, SelectItem, Slider, Tag, Toggle } from "@carbon/react";
import { COLOUR_PRESET_OPTIONS } from "../engine/colourPresets";
import { GESTALT_CONTROL_SECTIONS } from "../engine/constants";
import BackgroundPicker from "./BackgroundPicker";
import GestaltSliderGroup from "./GestaltSliderGroup";

export default function ElementsAccordion({ values, selectedKey, onControlChange, onToggleChange, colourState, onColourChange, onBackgroundChange, disabled }) {
  return (
    <Accordion align="start" className="gestalt-accordion gestalt-accordion--nested">
      {GESTALT_CONTROL_SECTIONS.elements.map((item) => {
        const itemValues = values[item.key];
        const colourControlsDisabled = disabled || !itemValues.active || colourState.colourPreset === "mono";

        return (
          <AccordionItem key={item.key} title={item.title} open={itemValues.active || item.key === selectedKey}>
            <div className="accordion-item__content">
              <p className="panel-note">{item.description}</p>
              <div className="accordion-item__controls">
                <Toggle
                  id={`element-toggle-${item.key}`}
                  labelText="Add / Remove"
                  labelA="Inactive"
                  labelB="Active"
                  toggled={itemValues.active}
                  disabled={disabled}
                  onToggle={(value) => onToggleChange(item.key, value)}
                />
                {itemValues.active ? <Tag type="green">Added</Tag> : <Tag type="cool-gray">Inactive</Tag>}
              </div>

              {item.key === "colour" ? (
                <>
                  <p className="panel-note">Choose a palette and adjust hue, saturation, and brightness for the active colour study.</p>
                  <Select id="colour-select" labelText="Colour" value={colourState.colourPreset} disabled={disabled || !itemValues.active} onChange={(event) => onColourChange({ colourPreset: event.target.value })}>
                    {COLOUR_PRESET_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value} text={option.label} />
                    ))}
                  </Select>

                  {[
                    { key: "colourHue", label: "Colour Hue Shift", min: -180, max: 180 },
                    { key: "colourSaturation", label: "Colour Saturation", min: 0, max: 200 },
                    { key: "colourBrightness", label: "Colour Brightness", min: -100, max: 100 },
                  ].map(({ key, label, min, max }) => (
                    <Slider
                      key={key}
                      id={`${key}-slider`}
                      labelText={label}
                      min={min}
                      max={max}
                      step={1}
                      value={colourState[key]}
                      hideTextInput={false}
                      disabled={colourControlsDisabled}
                      onChange={({ value }) => onColourChange({ [key]: Number(value) })}
                    />
                  ))}

                  <p className="panel-note">Set the background surface underneath the current colour study.</p>
                  <BackgroundPicker color={colourState.backgroundColor} opacity={colourState.backgroundOpacity} onChange={onBackgroundChange} disabled={disabled || !itemValues.active} />
                </>
              ) : (
                <GestaltSliderGroup
                  prefix={`element-${item.key}`}
                  values={itemValues}
                  disabled={disabled || !itemValues.active}
                  onChange={(patch) => onControlChange(item.key, patch)}
                />
              )}
            </div>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}