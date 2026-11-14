export async function runResponsiveLayoutAudit() {
  if (window.innerWidth > 1240) {
    throw new Error("Run the responsive layout audit at a viewport width of 1240px or less.");
  }

  const control = document.querySelector(".gestalt-accordion--root button");
  const controlPanel = document.querySelector(".app-shell__left");
  const preview = document.querySelector(".canvas-stage-frame");
  const sandbox = document.querySelector("#sandbox-code");

  if (!control || !controlPanel || !preview || !sandbox) {
    throw new Error("The application controls, preview, or sandbox are unavailable.");
  }

  const failures = [];
  let checks = 0;
  const initialScroll = { x: window.scrollX, y: window.scrollY };
  const check = (condition, label) => {
    checks += 1;
    if (!condition) failures.push(label);
  };
  const position = async (element) => {
    element.scrollIntoView({ block: "center", inline: "nearest" });
    await new Promise(requestAnimationFrame);
    await new Promise(requestAnimationFrame);
    return element.getBoundingClientRect();
  };
  const canHit = (element, rect) => element.contains(
    document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2),
  );
  const overlaps = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;

  try {
    check(document.documentElement.scrollWidth <= window.innerWidth, "No horizontal page overflow");

    const controlRect = await position(control);
    const previewRect = preview.getBoundingClientRect();
    check(canHit(control, controlRect), "Controls are not covered");
    check(previewRect.bottom > 48 && previewRect.top < window.innerHeight, "Preview is visible while editing");
    if (window.innerWidth <= 880) {
      check(previewRect.bottom <= controlRect.top, "Mobile preview does not cover the control");
    }

    const sandboxRect = await position(sandbox);
    check(canHit(sandbox, sandboxRect), "Sandbox is not covered");
    check(!overlaps(controlPanel.getBoundingClientRect(), sandboxRect), "Controls do not overlap the sandbox");
    check(!overlaps(preview.getBoundingClientRect(), sandboxRect), "Preview does not overlap the sandbox");
  } finally {
    window.scrollTo(initialScroll.x, initialScroll.y);
  }

  return { checks, failures };
}
