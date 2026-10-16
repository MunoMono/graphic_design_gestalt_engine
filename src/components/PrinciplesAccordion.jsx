import { Accordion, AccordionItem, Select, SelectItem, Tag, Toggle } from "@carbon/react";
import { GESTALT_CONTROL_SECTIONS } from "../engine/constants";
import GestaltSliderGroup from "./GestaltSliderGroup";

export default function PrinciplesAccordion({ values, selectedKey, onControlChange, onToggleChange, disabled }) {
  return (
    <Accordion align="start" className="gestalt-accordion gestalt-accordion--nested">
      {GESTALT_CONTROL_SECTIONS.principles.map((item) => {
        const itemValues = values[item.key];

        return (
          <AccordionItem key={item.key} title={item.title} open={itemValues.active || item.key === selectedKey}>
            <div className="accordion-item__content">
              <p className="panel-note">{item.description}</p>
              <div className="accordion-item__controls">
                <Toggle
                  id={`principle-toggle-${item.key}`}
                  labelText="Add / Remove"
                  labelA="Inactive"
                  labelB="Active"
                  toggled={itemValues.active}
                  disabled={disabled}
                  onToggle={(value) => onToggleChange(item.key, value)}
                />
                {itemValues.active ? <Tag type="green">Added</Tag> : <Tag type="cool-gray">Inactive</Tag>}
              </div>
              {item.modeOptions ? (
                <Select
                  id={`principle-mode-${item.key}`}
                  labelText={`${item.title} Mode`}
                  value={itemValues.mode}
                  disabled={disabled || !itemValues.active}
                  onChange={(event) => onControlChange(item.key, { mode: event.target.value })}
                >
                  {item.modeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} text={option.label} />
                  ))}
                </Select>
              ) : null}
              <GestaltSliderGroup
                prefix={`principle-${item.key}`}
                values={itemValues}
                disabled={disabled || !itemValues.active}
                onChange={(patch) => onControlChange(item.key, patch)}
              />
            </div>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}