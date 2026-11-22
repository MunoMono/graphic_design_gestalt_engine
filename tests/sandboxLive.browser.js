export async function runSandboxLiveAudit() {
  const editor = document.querySelector("#sandbox-code");
  if (!editor) throw new Error("Sandbox editor is unavailable.");

  const original = editor.value;
  const inputValue = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value").set;
  const edit = (value) => {
    inputValue.call(editor, value);
    editor.dispatchEvent(new Event("input", { bubbles: true }));
  };
  const waitFor = async (condition, message) => {
    for (let attempt = 0; attempt < 120; attempt += 1) {
      if (condition()) return;
      await new Promise(requestAnimationFrame);
    }
    throw new Error(message);
  };
  const button = (text) => [...document.querySelectorAll("button")].find((item) => item.textContent.trim() === text);

  try {
    const config = JSON.parse(original);
    config.gestaltControls.elements.line.active = true;
    config.gestaltControls.elements.line.mode = "implied";
    edit(JSON.stringify(config, null, 2));
    await waitFor(() => document.body.textContent.includes("Changes live"), "Valid edit did not update live.");

    button("Elements").click();
    await waitFor(() => button("Elements").getAttribute("aria-expanded") === "true", "Elements did not open.");
    button("Line").click();
    await waitFor(() => button("Line").getAttribute("aria-expanded") === "true", "Line did not open.");
    await waitFor(
      () => document.querySelector("#element-toggle-line")?.getAttribute("aria-checked") === "true" && document.querySelector("#element-mode-line")?.value === "implied",
      "Live edit did not update the toolbox.",
    );

    const incomplete = editor.value.slice(0, -1);
    edit(incomplete);
    await waitFor(() => document.body.textContent.includes("Live update paused"), "Incomplete edit was not reported.");
    if (editor.value !== incomplete || document.querySelector("#element-toggle-line").getAttribute("aria-checked") !== "true") {
      throw new Error("Incomplete edit did not preserve the draft and last valid state.");
    }

    config.gestaltControls.elements.line.mode = "actual";
    edit(JSON.stringify(config, null, 2));
    await waitFor(() => document.querySelector("#element-mode-line").value === "actual", "Live update did not resume.");
    button("Apply code").click();
    await waitFor(() => document.body.textContent.includes("Code applied"), "Apply code did not confirm the changes.");
    return { checks: 4, failures: [] };
  } finally {
    edit(original);
    await waitFor(() => document.body.textContent.includes("Changes live"), "Could not restore the original state.");
    button("Apply code").click();
  }
}
