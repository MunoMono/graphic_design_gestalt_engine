import { useRef, useState } from "react";
import { Button, InlineNotification, Select, SelectItem, TextArea, Tile } from "@carbon/react";
import { getSandboxChoice } from "../engine/sandboxChoices";
import { highlightSandboxCode } from "../engine/sandboxHighlight";

export default function SandboxPanel({ code, dirty, onCodeChange, onApply, onReset, onDownload, onImport, status, disabled }) {
  const importInputRef = useRef(null);
  const highlightRef = useRef(null);
  const [selection, setSelection] = useState(null);
  const choice = selection?.source === code ? selection.choice : null;

  function handleImportButtonClick() {
    importInputRef.current?.click();
  }

  async function handleImportChange(event) {
    const [file] = event.target.files ?? [];
    event.target.value = "";
    await onImport?.(file);
  }

  return (
    <Tile className="app-panel app-panel--sandbox">
      <div className="panel-heading panel-heading--row">
        <div>
          <p className="panel-eyebrow">Live machine state sandbox</p>
          <h2>Sandbox</h2>
        </div>
      </div>

      <div className="panel-stack panel-stack--tight">
        <p className="panel-note">Edit the settings to update the composition live. Use Apply code to confirm your edits or repair minor JSON mistakes.</p>

        <input
          ref={importInputRef}
          type="file"
          accept="application/json,.json,text/plain,.txt"
          hidden
          onChange={handleImportChange}
        />

        <div className="sandbox-panel__code">
          <label className="cds--label" htmlFor="sandbox-code">Live code/config</label>
          <div className="sandbox-panel__legend" aria-hidden="true">
            <span className="sandbox-token--element">Elements</span>
            <span className="sandbox-token--principle">Principles</span>
            <span className="sandbox-token--key">Settings</span>
            <span className="sandbox-token--value">Values</span>
          </div>
          <Select
            id="sandbox-choice"
            labelText={choice ? `Choose ${choice.label}` : "Choose a value"}
            helperText="Click an active value, mode, process or colour preset in the code to choose here."
            value={choice?.options.find(({ value, label }) => value === choice.value || label === choice.value)?.value ?? ""}
            disabled={disabled || !choice}
            onChange={(event) => {
              const option = choice.options.find(({ value }) => value === event.target.value);
              if (!option) return;
              const value = choice.useLabels ? option.label : option.value;
              const replacement = choice.boolean ? value : JSON.stringify(value);
              const nextCode = code.slice(0, choice.start) + replacement + code.slice(choice.end);
              onCodeChange(nextCode);
              setSelection({
                source: nextCode,
                choice: { ...choice, value, end: choice.start + replacement.length },
              });
            }}
          >
            {!choice || !choice.options.some(({ value, label }) => value === choice.value || label === choice.value) ? (
              <SelectItem value="" text="Select a value" />
            ) : null}
            {choice?.options.map(({ value, label }) => (
              <SelectItem key={value} value={value} text={label} />
            ))}
          </Select>
          <div className="sandbox-panel__editor">
            <pre ref={highlightRef} className="sandbox-panel__highlight" aria-hidden="true">
              {highlightSandboxCode(code).map(({ text, type }, index) => (
                <span key={index} className={type ? `sandbox-token--${type}` : undefined}>{text}</span>
              ))}{"\n"}
            </pre>
            <TextArea
              id="sandbox-code"
              labelText="Live code/config"
              hideLabel
              value={code}
              disabled={disabled}
              rows={24}
              spellCheck={false}
              wrap="off"
              onChange={(event) => onCodeChange(event.target.value)}
              onSelect={(event) => setSelection({
                source: event.currentTarget.value,
                choice: getSandboxChoice(event.currentTarget.value, event.currentTarget.selectionStart),
              })}
              onScroll={(event) => {
                if (highlightRef.current) {
                  highlightRef.current.scrollTop = event.currentTarget.scrollTop;
                  highlightRef.current.scrollLeft = event.currentTarget.scrollLeft;
                }
              }}
            />
          </div>
        </div>

        {dirty ? (
          <InlineNotification
            kind="info"
            lowContrast
            hideCloseButton
            title="Editing sandbox"
            subtitle="Toolbox changes won't appear here until you apply or reset. Further edits may replace those changes."
          />
        ) : null}

        {status ? (
          <InlineNotification
            kind={status.kind}
            lowContrast
            hideCloseButton
            title={status.title}
            subtitle={status.subtitle}
          />
        ) : null}

        <div className="panel-actions panel-actions--split">
          <Button kind="primary" size="lg" onClick={onApply} disabled={disabled}>
            Apply code
          </Button>
          <Button kind="secondary" size="lg" onClick={onReset} disabled={disabled}>
            Reset code
          </Button>
        </div>

        <div className="panel-actions panel-actions--split">
          <Button kind="tertiary" size="lg" onClick={onDownload} disabled={disabled}>
            Download code
          </Button>
          <Button kind="tertiary" size="lg" onClick={handleImportButtonClick} disabled={disabled}>
            Import code
          </Button>
        </div>
      </div>
    </Tile>
  );
}