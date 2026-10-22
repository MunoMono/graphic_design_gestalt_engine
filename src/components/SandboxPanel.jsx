import { useRef } from "react";
import { Button, InlineNotification, TextArea, Tile } from "@carbon/react";

export default function SandboxPanel({ code, onCodeChange, onApply, onReset, onDownload, onImport, status, disabled }) {
  const importInputRef = useRef(null);

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
        <p className="panel-note">Edit the controlled config that drives the current composition, then apply it back into the React machine state.</p>

        <input
          ref={importInputRef}
          type="file"
          accept="application/json,.json,text/plain,.txt"
          hidden
          onChange={handleImportChange}
        />

        <TextArea
          id="sandbox-code"
          labelText="Live code/config"
          className="sandbox-panel__editor"
          value={code}
          disabled={disabled}
          rows={24}
          onChange={(event) => onCodeChange(event.target.value)}
        />

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
          <Button kind="primary" onClick={onApply} disabled={disabled}>
            Apply Code
          </Button>
          <Button kind="secondary" onClick={onReset} disabled={disabled}>
            Reset Code
          </Button>
        </div>

        <div className="panel-actions panel-actions--split">
          <Button kind="tertiary" onClick={onDownload} disabled={disabled}>
            Download Code
          </Button>
          <Button kind="tertiary" onClick={handleImportButtonClick} disabled={disabled}>
            Import Code
          </Button>
        </div>
      </div>
    </Tile>
  );
}