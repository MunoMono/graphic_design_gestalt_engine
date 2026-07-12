import { Button, InlineNotification, Tag, TextArea, Tile } from "@carbon/react";

export default function SandboxPanel({ code, onCodeChange, onApply, onReset, status, disabled }) {
  return (
    <Tile className="app-panel app-panel--sandbox">
      <div className="panel-heading panel-heading--row">
        <div>
          <p className="panel-eyebrow">Live machine state sandbox</p>
          <h2>Sandbox</h2>
        </div>
        <Tag type="purple">JSON</Tag>
      </div>

      <div className="panel-stack panel-stack--tight">
        <p className="panel-note">Edit the controlled config that drives the current composition, then apply it back into the React machine state.</p>

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
      </div>
    </Tile>
  );
}