import { Accordion, AccordionItem, Tag, Toggle } from "@carbon/react";
import { GESTALT_CONTROL_SECTIONS } from "../engine/constants";
import GestaltSliderGroup from "./GestaltSliderGroup";

export default function ElementsAccordion({ values, selectedKey, onControlChange, onToggleChange, disabled }) {
  return (
    <Accordion align="start" className="gestalt-accordion gestalt-accordion--nested">
      {GESTALT_CONTROL_SECTIONS.elements.map((item) => {
        const itemValues = values[item.key];

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
              <GestaltSliderGroup
                prefix={`element-${item.key}`}
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